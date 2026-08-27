/**
 * Simulador de ROI — ROI direto / ROI composto
 * Sem dependências externas. Requer os elementos definidos em roi-calculator.html.
 */
(function () {
  "use strict";

  // =========================================================================
  // Helpers gerais
  // =========================================================================
  const fmtBRL0 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
  const fmtBRL2 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const brl = (n) => "R$ " + fmtBRL0.format(Math.round(n));
  const brl2 = (n) => "R$ " + fmtBRL2.format(n);
  const pct1 = (n) => (n >= 0 ? "+" : "") + n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%";
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function parseMoneyInput(str, min, max, fallback) {
    const n = parseFloat(String(str).replace(/[^\d]/g, ""));
    return clamp(Number.isNaN(n) ? fallback : n, min, max);
  }

  function parsePercentInput(str, min, max, fallback) {
    const n = parseFloat(String(str).replace(",", ".").replace(/[^\d.]/g, ""));
    return clamp(Number.isNaN(n) ? fallback : n, min, max);
  }

  /** Throttle via requestAnimationFrame: mantém a interação fluida mesmo
   *  arrastando o slider rapidamente, evitando reconstruir o SVG mais
   *  vezes do que o navegador consegue pintar. */
  function rafThrottle(fn) {
    let scheduled = false;
    let lastArgs = null;
    return function throttled(...args) {
      lastArgs = args;
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        fn.apply(null, lastArgs);
      });
    };
  }

  /** Debounce simples: usado para não "spamar" leitores de tela com
   *  atualizações de aria-live a cada micro-movimento do slider. */
  function debounce(fn, wait) {
    let t = null;
    return function debounced(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(null, args), wait);
    };
  }

  function syncRangeFill(range) {
    const min = parseFloat(range.min);
    const max = parseFloat(range.max);
    const val = parseFloat(range.value);
    const pct = ((val - min) / (max - min)) * 100;
    range.style.background =
      "linear-gradient(90deg, var(--color-brand-primary, rgb(106, 80, 157)) 0%, var(--color-brand-pink, rgb(207, 71, 147)) " +
      pct + "%, color-mix(in srgb, var(--color-brand-primary, rgb(106, 80, 157)) 12%, white) " + pct +
      "%, color-mix(in srgb, var(--color-brand-primary, rgb(106, 80, 157)) 12%, white) 100%)";
  }

  // Catmull-Rom -> curva suave em Bézier cúbica
  function smoothPath(points) {
    if (points.length < 2) return "";
    let d = "M" + points[0].x.toFixed(1) + "," + points[0].y.toFixed(1) + " ";
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += "C" + c1x.toFixed(1) + "," + c1y.toFixed(1) + " " + c2x.toFixed(1) + "," + c2y.toFixed(1) + " " + p2.x.toFixed(1) + "," + p2.y.toFixed(1) + " ";
    }
    return d;
  }

  function niceStep(maxVal, ticks) {
    const raw = maxVal / ticks;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / mag;
    let step;
    if (norm < 1.5) step = 1;
    else if (norm < 3) step = 2;
    else if (norm < 7) step = 5;
    else step = 10;
    return step * mag;
  }

  const SVG_NS = "http://www.w3.org/2000/svg";
  function svgEl(tag, attrs) {
    const e = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function svgText(x, y, content, attrs) {
    const t = svgEl("text", Object.assign({ x, y }, attrs));
    t.textContent = content;
    return t;
  }

  // =========================================================================
  // Motor de gráfico compartilhado (usado pelas duas abas)
  // =========================================================================
  const CW = 760, CH = 300;
  const PAD = { top: 16, right: 18, bottom: 30, left: 46 };
  const GRID_COLOR = "rgba(106, 80, 157, 0.08)";
  const AXIS_LABEL_COLOR = "rgba(17, 17, 17, 0.65)";

  function makeChart(svgEl_) {
    svgEl_.innerHTML = "";
    svgEl_.setAttribute("viewBox", "0 0 " + CW + " " + CH);
    svgEl_.setAttribute("role", "img");
    const innerW = CW - PAD.left - PAD.right;
    const innerH = CH - PAD.top - PAD.bottom;
    return { svg: svgEl_, innerW, innerH };
  }

  function drawXTicks(chart, period, formatTick) {
    const ticks = 4;
    const X = (t) => PAD.left + (t / period) * chart.innerW;
    for (let i = 0; i <= ticks; i++) {
      const t = (period * i) / ticks;
      const x = X(t);
      chart.svg.appendChild(svgEl("line", { x1: x, y1: PAD.top, x2: x, y2: PAD.top + chart.innerH, stroke: GRID_COLOR, "stroke-width": 1 }));
      const anchor = i === 0 ? "start" : i === ticks ? "end" : "middle";
      chart.svg.appendChild(svgText(x, CH - 8, formatTick(t, i), { "text-anchor": anchor, "font-size": 11, fill: AXIS_LABEL_COLOR }));
    }
  }

  function drawYGrid(chart, topGrid, step) {
    const Y = (v) => PAD.top + chart.innerH - (v / topGrid) * chart.innerH;
    const count = Math.round(topGrid / step);
    for (let g = 0; g <= count; g++) {
      const val = step * g;
      const y = Y(val);
      chart.svg.appendChild(svgEl("line", { x1: PAD.left, y1: y, x2: CW - PAD.right, y2: y, stroke: GRID_COLOR, "stroke-width": 1 }));
      const lbl = val >= 1000 ? Math.round(val / 1000) + " mil" : Math.round(val);
      chart.svg.appendChild(svgText(PAD.left - 8, y + 4, "R$ " + lbl, { "text-anchor": "end", "font-size": 10.5, fill: AXIS_LABEL_COLOR }));
    }
  }

  function drawGradientArea(chart, points, gradientId, color, floorY) {
    const defs = svgEl("defs", {});
    const grad = svgEl("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1" });
    grad.appendChild(svgEl("stop", { offset: "0%", "stop-color": color, "stop-opacity": 0.38 }));
    grad.appendChild(svgEl("stop", { offset: "100%", "stop-color": color, "stop-opacity": 0.02 }));
    defs.appendChild(grad);
    chart.svg.appendChild(defs);

    const areaD = smoothPath(points) + " L" + points[points.length - 1].x.toFixed(1) + "," + floorY + " L" + points[0].x.toFixed(1) + "," + floorY + " Z";
    chart.svg.appendChild(svgEl("path", { d: areaD, fill: "url(#" + gradientId + ")", stroke: "none" }));
  }

  function drawLine(chart, points, color, opts) {
    const o = opts || {};
    chart.svg.appendChild(svgEl("path", {
      d: smoothPath(points),
      fill: "none",
      stroke: color,
      "stroke-width": o.width || 2.5,
      "stroke-linecap": "round",
      "stroke-dasharray": o.dashed ? "6 5" : undefined,
    }));
  }

  function drawEndMarker(chart, point, color) {
    chart.svg.appendChild(svgEl("circle", { cx: point.x, cy: point.y, r: 5, fill: color }));
  }

  // =========================================================================
  // ABA: ROI DIRETO
  // =========================================================================
  const dInvRange = document.getElementById("d-inv-range");
  const dRetRange = document.getElementById("d-ret-range");
  const dPeriodRange = document.getElementById("d-period-range");
  const dInvBox = document.getElementById("d-inv-box");
  const dRetBox = document.getElementById("d-ret-box");
  const dPeriodBox = document.getElementById("d-period-box");
  const dInsight = document.getElementById("d-insight-text");

  /** Valor da curva "direta" (decorativa) em um instante t qualquer.
   *  Usada tanto para desenhar a série completa quanto para o hover,
   *  garantindo que o ponto do tooltip caia exatamente sobre a linha. */
  function directPointValue(finalVal, period, amplitude, phase, t) {
    if (t >= period) return finalVal;
    const progress = t / period;
    const base = finalVal * (0.28 + 0.72 * progress);
    const wave = finalVal * amplitude * Math.sin(progress * Math.PI * 2.4 + phase) * (1 - progress);
    return Math.max(0, base + wave);
  }

  function directGenerateSeries(finalVal, period, amplitude, phase) {
    const N = 48;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const t = (period * i) / N;
      pts.push({ t, v: directPointValue(finalVal, period, amplitude, phase, t) });
    }
    return pts;
  }

  const INV_WAVE = { amplitude: 0.05, phase: 0.6 };
  const RET_WAVE = { amplitude: 0.12, phase: 2.1 };

  /** Última escala usada para desenhar o gráfico direto — o hover lê
   *  daqui para posicionar o cursor exatamente sobre as curvas atuais. */
  let directScale = null;

  function renderDirectChart(inv, ret, period) {
    const chart = makeChart(document.getElementById("chart-direct"));
    chart.svg.setAttribute("aria-label", "Evolução do investimento e do retorno ao longo de " + period + " meses. Passe o mouse para ver valores mês a mês.");

    const invSeries = directGenerateSeries(inv, period, INV_WAVE.amplitude, INV_WAVE.phase);
    const retSeries = directGenerateSeries(ret, period, RET_WAVE.amplitude, RET_WAVE.phase);
    const maxV = Math.max(inv, ret, ...invSeries.map((p) => p.v), ...retSeries.map((p) => p.v)) * 1.18;

    directScale = { inv, ret, period, maxV };

    const X = (t) => PAD.left + (t / period) * chart.innerW;
    const Y = (v) => PAD.top + chart.innerH - (v / maxV) * chart.innerH;
    const floorY = (PAD.top + chart.innerH).toFixed(1);

    drawXTicks(chart, period, (t, i) => (i === 0 ? "0" : Math.round(t) + "m"));

    const retPts = retSeries.map((p) => ({ x: X(p.t), y: Y(p.v) }));
    const invPts = invSeries.map((p) => ({ x: X(p.t), y: Y(p.v) }));

    drawGradientArea(chart, retPts, "retGrad", "rgb(207, 71, 147)", floorY);
    drawLine(chart, retPts, "rgb(106, 80, 157)", { width: 2.5 });
    drawLine(chart, invPts, "rgb(49, 180, 166)", { width: 2.2, dashed: true });
    drawEndMarker(chart, retPts[retPts.length - 1], "rgb(106, 80, 157)");
    drawEndMarker(chart, invPts[invPts.length - 1], "rgb(49, 180, 166)");
  }

  const announceDirectInsight = debounce((text) => {
    if (dInsight) dInsight.textContent = text;
  }, 400);

  function updateDirect() {
    const inv = parseFloat(dInvRange.value);
    const ret = parseFloat(dRetRange.value);
    const period = parseInt(dPeriodRange.value, 10);

    dInvBox.value = brl(inv);
    dRetBox.value = brl(ret);
    dPeriodBox.value = period + " meses";
    dInvRange.setAttribute("aria-valuetext", brl(inv));
    dRetRange.setAttribute("aria-valuetext", brl(ret));
    dPeriodRange.setAttribute("aria-valuetext", period + " meses");
    syncRangeFill(dInvRange);
    syncRangeFill(dRetRange);
    syncRangeFill(dPeriodRange);

    const roiPct = ((ret - inv) / inv) * 100;
    const gain = ret - inv;
    const perReal = ret / inv;

    document.getElementById("d-roi-pct").textContent = pct1(roiPct);
    document.getElementById("d-gain").textContent = brl(gain);
    document.getElementById("d-total").textContent = brl(ret);
    document.getElementById("d-per-real").textContent = brl2(perReal);
    document.getElementById("d-insight-val").textContent = brl2(perReal);
    announceDirectInsight("A cada R$ 1 investido, o cenário retorna " + brl2(perReal) + ".");

    renderDirectChart(inv, ret, period);
  }
  const updateDirectThrottled = rafThrottle(updateDirect);

  dInvRange.addEventListener("input", updateDirectThrottled);
  dRetRange.addEventListener("input", updateDirectThrottled);
  dPeriodRange.addEventListener("input", updateDirectThrottled);

  function bindMoneyBox(box, range, min, max, fallback) {
    box.addEventListener("focus", () => box.select());
    box.addEventListener("keydown", (e) => {
      if (e.key === "Enter") box.blur();
    });
    box.addEventListener("change", () => {
      range.value = parseMoneyInput(box.value, min, max, fallback);
      updateDirect();
    });
  }
  bindMoneyBox(dInvBox, dInvRange, 5000, 200000, 25000);
  bindMoneyBox(dRetBox, dRetRange, 5000, 500000, 35000);

  dPeriodBox.addEventListener("focus", () => dPeriodBox.select());
  dPeriodBox.addEventListener("keydown", (e) => { if (e.key === "Enter") dPeriodBox.blur(); });
  dPeriodBox.addEventListener("change", () => {
    dPeriodRange.value = clamp(parseInt(dPeriodBox.value, 10) || 12, 1, 60);
    updateDirect();
  });

  // =========================================================================
  // ABA: ROI COMPOSTO
  // =========================================================================
  const cInvRange = document.getElementById("c-inv-range");
  const cRateRange = document.getElementById("c-rate-range");
  const cPeriodRange = document.getElementById("c-period-range");
  const cInvBox = document.getElementById("c-inv-box");
  const cRateBox = document.getElementById("c-rate-box");
  const cPeriodBox = document.getElementById("c-period-box");

  function renderCompoundChart(principal, rate, period) {
    const chart = makeChart(document.getElementById("chart-compound"));
    chart.svg.setAttribute("aria-label", "Comparação entre crescimento composto e linear ao longo de " + period + " meses");

    const N = Math.max(24, period);
    const r = rate / 100;
    const finalComp = principal * Math.pow(1 + r, period);
    const finalLin = principal + principal * r * period;
    const maxV = Math.max(finalComp, finalLin) * 1.12;
    const step = niceStep(maxV, 4);
    const topGrid = Math.ceil(maxV / step) * step;

    compoundScale = { principal, rate, period, topGrid };

    const X = (t) => PAD.left + (t / period) * chart.innerW;
    const Y = (v) => PAD.top + chart.innerH - (v / topGrid) * chart.innerH;
    const floorY = (PAD.top + chart.innerH).toFixed(1);

    drawYGrid(chart, topGrid, step);
    drawXTicks(chart, period, (t, i) => (i === 0 ? "0" : Math.round(t) + "m"));

    const compPts = [], linPts = [];
    for (let i = 0; i <= N; i++) {
      const t = (period * i) / N;
      compPts.push({ x: X(t), y: Y(principal * Math.pow(1 + r, t)) });
      linPts.push({ x: X(t), y: Y(principal + principal * r * t) });
    }

    drawGradientArea(chart, compPts, "compGrad", "rgb(106, 80, 157)", floorY);
    drawLine(chart, linPts, "rgb(49, 180, 166)", { width: 2.2, dashed: true });
    drawLine(chart, compPts, "rgb(106, 80, 157)", { width: 2.6 });
    drawEndMarker(chart, compPts[compPts.length - 1], "rgb(106, 80, 157)");
    drawEndMarker(chart, linPts[linPts.length - 1], "rgb(49, 180, 166)");
  }

  /** Última escala usada para desenhar o gráfico composto — o hover lê
   *  daqui para posicionar o cursor exatamente sobre as curvas atuais. */
  let compoundScale = null;

  function updateCompound() {
    const principal = parseFloat(cInvRange.value);
    const rate = parseFloat(cRateRange.value);
    const period = parseInt(cPeriodRange.value, 10);
    const rateLabel = rate.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

    cInvBox.value = brl(principal);
    cRateBox.value = rateLabel + "%";
    cPeriodBox.value = period + " meses";
    cInvRange.setAttribute("aria-valuetext", brl(principal));
    cRateRange.setAttribute("aria-valuetext", rateLabel + "% ao mês");
    cPeriodRange.setAttribute("aria-valuetext", period + " meses");
    syncRangeFill(cInvRange);
    syncRangeFill(cRateRange);
    syncRangeFill(cPeriodRange);

    const r = rate / 100;
    const finalComp = principal * Math.pow(1 + r, period);
    const finalLin = principal + principal * r * period;
    const returnPct = ((finalComp - principal) / principal) * 100;
    const gain = finalComp - principal;
    const perReal = finalComp / principal;

    document.getElementById("c-final-value").textContent = brl(finalComp);
    document.getElementById("c-return-pct").textContent = pct1(returnPct);
    document.getElementById("c-legend-rate").textContent = rateLabel;
    document.getElementById("c-gain").textContent = "+" + brl(gain);
    document.getElementById("c-final2").textContent = brl(finalComp);
    document.getElementById("c-final-linear").textContent = brl(finalLin);
    document.getElementById("c-per-real").textContent = brl2(perReal);

    renderCompoundChart(principal, rate, period);
  }
  const updateCompoundThrottled = rafThrottle(updateCompound);

  cInvRange.addEventListener("input", updateCompoundThrottled);
  cRateRange.addEventListener("input", updateCompoundThrottled);
  cPeriodRange.addEventListener("input", updateCompoundThrottled);

  bindMoneyBox(cInvBox, cInvRange, 1000, 1000000, 25000);

  cRateBox.addEventListener("focus", () => cRateBox.select());
  cRateBox.addEventListener("keydown", (e) => { if (e.key === "Enter") cRateBox.blur(); });
  cRateBox.addEventListener("change", () => {
    cRateRange.value = parsePercentInput(cRateBox.value, 0.1, 10, 3.5);
    updateCompound();
  });

  cPeriodBox.addEventListener("focus", () => cPeriodBox.select());
  cPeriodBox.addEventListener("keydown", (e) => { if (e.key === "Enter") cPeriodBox.blur(); });
  cPeriodBox.addEventListener("change", () => {
    cPeriodRange.value = clamp(parseInt(cPeriodBox.value, 10) || 24, 1, 60);
    updateCompound();
  });

  function bindStepper(buttonId, range, delta, min, max, decimals, onUpdate) {
    document.getElementById(buttonId).addEventListener("click", () => {
      const next = clamp(parseFloat(range.value) + delta, min, max);
      range.value = decimals ? next.toFixed(decimals) : next;
      onUpdate();
    });
  }
  bindStepper("c-inv-minus", cInvRange, -1000, 1000, 1000000, 0, updateCompound);
  bindStepper("c-inv-plus", cInvRange, 1000, 1000, 1000000, 0, updateCompound);
  bindStepper("c-rate-minus", cRateRange, -0.1, 0.1, 10, 1, updateCompound);
  bindStepper("c-rate-plus", cRateRange, 0.1, 0.1, 10, 1, updateCompound);
  bindStepper("c-period-minus", cPeriodRange, -1, 1, 60, 0, updateCompound);
  bindStepper("c-period-plus", cPeriodRange, 1, 1, 60, 0, updateCompound);

  // =========================================================================
  // TABS (padrão ARIA APG: tablist / tab / tabpanel, com navegação por setas)
  // =========================================================================
  const tabs = Array.from(document.querySelectorAll(".simulador-roi__tab"));
  const panels = {
    direct: [document.getElementById("panel-left-direct"), document.getElementById("panel-right-direct")],
    compound: [document.getElementById("panel-left-compound"), document.getElementById("panel-right-compound")],
  };

  function activateTab(tab) {
    tabs.forEach((t) => {
      const isActive = t === tab;
      t.setAttribute("aria-selected", String(isActive));
      t.tabIndex = isActive ? 0 : -1;
    });

    const target = tab.getAttribute("data-tab");
    Object.keys(panels).forEach((key) => {
      panels[key].forEach((panel) => {
        panel.hidden = key !== target;
      });
    });

    if (target === "compound") updateCompound();
    else updateDirect();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (e) => {
      let newIndex = null;
      if (e.key === "ArrowRight") newIndex = (index + 1) % tabs.length;
      else if (e.key === "ArrowLeft") newIndex = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") newIndex = 0;
      else if (e.key === "End") newIndex = tabs.length - 1;
      if (newIndex !== null) {
        e.preventDefault();
        tabs[newIndex].focus();
        activateTab(tabs[newIndex]);
      }
    });
  });

  // =========================================================================
  // TOOLTIP DO GRÁFICO (hover / toque) — só aparece com o ponteiro em cima
  // =========================================================================
  /**
   * Liga um tooltip interativo a um gráfico: ao mover o mouse (ou arrastar
   * o dedo) sobre o SVG, calcula o mês exato sob o cursor, desenha uma
   * linha-guia com pontos sobre as duas curvas e posiciona uma caixinha
   * HTML com os valores daquele mês. Tudo some ao tirar o ponteiro.
   *
   * getScale()  → objeto com os parâmetros do último render (ou null se
   *               ainda não houve render), usado para inverter a posição
   *               do mouse em "mês" e para escalar os valores de volta.
   * computeAtT(scale, t) → { titulo, linhas:[{cor,label,valor}], pontos:[{x,y,cor}] }
   */
  function attachChartHover(svgId, wrapId, tooltipId, getScale, computeAtT) {
    const svg = document.getElementById(svgId);
    const wrap = document.getElementById(wrapId);
    const tooltip = document.getElementById(tooltipId);
    let hoverLayer = null;

    function hide() {
      if (hoverLayer) {
        hoverLayer.remove();
        hoverLayer = null;
      }
      tooltip.classList.remove("is-visivel");
    }

    function show(clientX, clientY) {
      const scale = getScale();
      if (!scale) return hide();

      const rect = svg.getBoundingClientRect();
      if (rect.width === 0) return hide();

      const innerW = CW - PAD.left - PAD.right;
      const innerH = CH - PAD.top - PAD.bottom;
      const svgX = ((clientX - rect.left) / rect.width) * CW;
      let t = ((svgX - PAD.left) / innerW) * scale.period;
      t = clamp(t, 0, scale.period);

      const info = computeAtT(scale, t);
      const xPix = PAD.left + (t / scale.period) * innerW;

      if (hoverLayer) hoverLayer.remove();
      hoverLayer = svgEl("g", { "pointer-events": "none" });
      hoverLayer.appendChild(svgEl("line", {
        x1: xPix, y1: PAD.top, x2: xPix, y2: PAD.top + innerH,
        stroke: "#C7BEE0", "stroke-width": 1, "stroke-dasharray": "3 4",
      }));
      info.pontos.forEach((p) => {
        hoverLayer.appendChild(svgEl("circle", { cx: xPix, cy: p.y, r: 5, fill: p.cor, stroke: "#fff", "stroke-width": 1.5 }));
      });
      svg.appendChild(hoverLayer);

      const topY = Math.min(...info.pontos.map((p) => p.y));
      tooltip.style.left = ((xPix / CW) * 100) + "%";
      tooltip.style.top = ((topY / CH) * 100) + "%";
      tooltip.innerHTML =
        '<div class="tt-titulo">' + info.titulo + "</div>" +
        info.linhas.map((l) => '<div class="tt-linha ' + l.cor + '">' + l.label + ": <b>" + l.valor + "</b></div>").join("");
      tooltip.classList.add("is-visivel");
    }

    svg.addEventListener("pointerenter", (e) => show(e.clientX, e.clientY));
    svg.addEventListener("pointermove", (e) => show(e.clientX, e.clientY));
    svg.addEventListener("pointerleave", hide);
    svg.addEventListener("pointercancel", hide);
    wrap.addEventListener("pointerup", hide);
  }

  attachChartHover("chart-direct", "chart-direct-wrap", "tooltip-direct", () => directScale, (scale, t) => {
    const retV = directPointValue(scale.ret, scale.period, RET_WAVE.amplitude, RET_WAVE.phase, t);
    const invV = directPointValue(scale.inv, scale.period, INV_WAVE.amplitude, INV_WAVE.phase, t);
    const Y = (v) => PAD.top + (CH - PAD.top - PAD.bottom) - (v / scale.maxV) * (CH - PAD.top - PAD.bottom);
    return {
      titulo: Math.round(t) + " meses",
      linhas: [
        { cor: "roxo", label: "Retorno", valor: brl(retV) },
        { cor: "teal", label: "Investimento", valor: brl(invV) },
      ],
      pontos: [
        { y: Y(retV), cor: "#7C3AED" },
        { y: Y(invV), cor: "#14B8A6" },
      ],
    };
  });

  attachChartHover("chart-compound", "chart-compound-wrap", "tooltip-compound", () => compoundScale, (scale, t) => {
    const r = scale.rate / 100;
    const compV = scale.principal * Math.pow(1 + r, t);
    const linV = scale.principal + scale.principal * r * t;
    const Y = (v) => PAD.top + (CH - PAD.top - PAD.bottom) - (v / scale.topGrid) * (CH - PAD.top - PAD.bottom);
    return {
      titulo: Math.round(t) + " meses",
      linhas: [
        { cor: "rosa", label: "Composto", valor: brl(compV) },
        { cor: "teal", label: "Linear", valor: brl(linV) },
      ],
      pontos: [
        { y: Y(compV), cor: "#7C3AED" },
        { y: Y(linV), cor: "#14B8A6" },
      ],
    };
  });

  // =========================================================================
  // Inicialização
  // =========================================================================
  updateDirect();
  updateCompound();
})();
