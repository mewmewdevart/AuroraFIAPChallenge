// Simulador de custo do turnover x retorno com a Aurora.
(function () {
  "use strict";

  // Helpers gerais
  const fmtBRL0 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

  const brl = (n) => "R$ " + fmtBRL0.format(Math.round(n));
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const colaboradoresLabel = (n) => n === 1 ? "1 colaborador" : Math.round(n).toLocaleString("pt-BR") + " colaboradores";

  function parseMoneyInput(str, min, max, fallback) {
    const n = parseFloat(String(str).replace(/[^\d]/g, ""));
    return clamp(Number.isNaN(n) ? fallback : n, min, max);
  }

  function parsePercentInput(str, min, max, fallback) {
    const n = parseFloat(String(str).replace(",", ".").replace(/[^\d.]/g, ""));
    return clamp(Number.isNaN(n) ? fallback : n, min, max);
  }

  function debounce(fn, wait) {
    let t = null;
    return function debounced(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(null, args), wait);
    };
  }

  function rafThrottle(fn) {
    let scheduled = false;
    return function throttled(...args) {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        fn.apply(null, args);
      });
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

  function bindMoneyBox(box, range, min, max, fallback, onUpdate) {
    box.addEventListener("focus", () => box.select());
    box.addEventListener("keydown", (e) => { if (e.key === "Enter") box.blur(); });
    box.addEventListener("change", () => {
      range.value = parseMoneyInput(box.value, min, max, fallback);
      onUpdate();
    });
  }

  function bindPercentBox(box, range, min, max, fallback, onUpdate) {
    box.addEventListener("focus", () => box.select());
    box.addEventListener("keydown", (e) => { if (e.key === "Enter") box.blur(); });
    box.addEventListener("change", () => {
      range.value = parsePercentInput(box.value, min, max, fallback);
      onUpdate();
    });
  }

  function bindIntBox(box, range, min, max, fallback, onUpdate) {
    box.addEventListener("focus", () => box.select());
    box.addEventListener("keydown", (e) => { if (e.key === "Enter") box.blur(); });
    box.addEventListener("change", () => {
      const n = parseInt(String(box.value).replace(/[^\d]/g, ""), 10);
      range.value = clamp(Number.isNaN(n) ? fallback : n, min, max);
      onUpdate();
    });
  }

  const SVG_NS = "http://www.w3.org/2000/svg";
  function svgEl(tag, attrs) {
    const e = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) if (attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
    return e;
  }
  function svgText(x, y, content, attrs) {
    const t = svgEl("text", Object.assign({ x, y }, attrs));
    t.textContent = content;
    return t;
  }

  function roundedTopRectPath(x, y, w, h, r) {
    r = Math.max(0, Math.min(r, w / 2, h));
    if (h <= 0) return "";
    return (
      "M" + x + "," + (y + h) +
      " L" + x + "," + (y + r) +
      " Q" + x + "," + y + " " + (x + r) + "," + y +
      " L" + (x + w - r) + "," + y +
      " Q" + (x + w) + "," + y + " " + (x + w) + "," + (y + r) +
      " L" + (x + w) + "," + (y + h) + " Z"
    );
  }
  const temaEl = document.querySelector(".simulador-roi") || document.documentElement;
  const temaStyle = getComputedStyle(temaEl);
  const cssVar = (nome, fallback) => temaStyle.getPropertyValue(nome).trim() || fallback;

  // Elementos
  const colabRange = document.getElementById("i-colaboradores-range");
  const colabBox = document.getElementById("i-colaboradores-box");
  const salarioRange = document.getElementById("i-salario-range");
  const salarioBox = document.getElementById("i-salario-box");
  const turnoverRange = document.getElementById("i-turnover-range");
  const turnoverBox = document.getElementById("i-turnover-box");
  const insightSR = document.getElementById("d-insight-text");

  if (!colabRange || !salarioRange || !turnoverRange) return;

  // Premissas fixas (nao editaveis; explicadas em texto no painel esquerdo)
  const MESES_REPOSICAO = 7; // custo médio de reposição, em salários mensais
  const REDUCAO_PCT = 25; // redução média de turnover em clientes Aurora

  // Composição ilustrativa do custo de reposição (referência de mercado)
  const COMPOSICAO = { recrutamento: 0.30, onboarding: 0.25, produtividade: 0.45 };

  // Gráfico de barras: custo hoje x com a Aurora
  const CW = 760, CH = 300;
  const PAD = { top: 30, right: 60, bottom: 34, left: 60 };
  const BAR_W = 150;
  const COR_ALERTA = cssVar("--color-feedback-error", "rgb(181, 59, 129)");
  const COR_ROXO = cssVar("--color-brand-primary", "rgb(106, 80, 157)");
  const COR_TEAL = cssVar("--color-brand-teal", "rgb(49, 180, 166)");
  const COR_TEXTO_SECUNDARIO = cssVar("--color-text-secondary", "rgba(17, 17, 17, .65)");
  const COR_BORDA = cssVar("--color-border-default", "rgba(8, 8, 8, 0.1)");

  let chartHit = null; // geometria atual, usada pelo hover

  function renderChart(dados) {
    const svg = document.getElementById("chart-comparativo");
    svg.innerHTML = "";
    svg.setAttribute("viewBox", "0 0 " + CW + " " + CH);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label",
      "Comparação entre o custo anual do turnover hoje (" + brl(dados.custoHoje) +
      ") e o novo custo estimado com a Aurora (" + brl(dados.novoCusto) + ")");

    const innerH = CH - PAD.top - PAD.bottom;
    const baseline = PAD.top + innerH;
    const maxV = Math.max(dados.custoHoje, dados.novoCusto) * 1.18 || 1;

    const cx1 = PAD.left + BAR_W / 2 + 30;
    const cx2 = CW - PAD.right - BAR_W / 2 - 30;

    svg.appendChild(svgEl("line", { x1: PAD.left - 10, y1: baseline, x2: CW - PAD.right + 10, y2: baseline, stroke: COR_BORDA, "stroke-width": 1 }));

    const h1 = (dados.custoHoje / maxV) * innerH;
    const y1 = baseline - h1;
    svg.appendChild(svgEl("path", { d: roundedTopRectPath(cx1 - BAR_W / 2, y1, BAR_W, h1, 10), fill: COR_ALERTA, "fill-opacity": 0.85 }));
    svg.appendChild(svgText(cx1, y1 - 12, brl(dados.custoHoje), { "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: COR_ALERTA }));
    svg.appendChild(svgText(cx1, CH - 8, "Hoje (sem Aurora)", { "text-anchor": "middle", "font-size": 11.5, fill: COR_TEXTO_SECUNDARIO }));

    const h2 = (dados.novoCusto / maxV) * innerH;
    const y2 = baseline - h2;
    svg.appendChild(svgEl("path", { d: roundedTopRectPath(cx2 - BAR_W / 2, y2, BAR_W, h2, 10), fill: COR_ROXO, "fill-opacity": 0.85 }));
    svg.appendChild(svgText(cx2, y2 - 12, brl(dados.novoCusto), { "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: COR_ROXO }));
    svg.appendChild(svgText(cx2, CH - 8, "Com a Aurora", { "text-anchor": "middle", "font-size": 11.5, fill: COR_TEXTO_SECUNDARIO }));

    svg.appendChild(svgEl("line", { x1: cx1, y1: y1 - 26, x2: cx2, y2: y1 - 26, stroke: COR_ROXO, "stroke-opacity": 0.3, "stroke-width": 1, "stroke-dasharray": "3 4" }));

    chartHit = {
      bar1: { x0: cx1 - BAR_W / 2 - 14, x1: cx1 + BAR_W / 2 + 14, topY: y1, xCenter: cx1,
        html: '<div class="tt-titulo">Custo do turnover hoje</div>' +
          '<div class="tt-linha alerta">Total: <b>' + brl(dados.custoHoje) + "</b></div>" +
          '<div class="tt-linha">' + colaboradoresLabel(dados.saidasAno) + " saem por ano</div>" +
          '<div class="tt-linha">Custo médio: <b>' + brl(dados.custoPorSaida) + "</b> por saída</div>" },
      bar2: { x0: cx2 - BAR_W / 2 - 14, x1: cx2 + BAR_W / 2 + 14, topY: y2, xCenter: cx2,
        html: '<div class="tt-titulo">Com a Aurora</div>' +
          '<div class="tt-linha roxo">Novo custo: <b>' + brl(dados.novoCusto) + "</b></div>" +
          '<div class="tt-linha teal">Economia: <b>' + brl(dados.economia) + "</b></div>" },
    };
  }

  function attachBarHover() {
    const svg = document.getElementById("chart-comparativo");
    const wrap = document.getElementById("chart-wrap");
    const tooltip = document.getElementById("tooltip-comparativo");

    function hide() { tooltip.classList.remove("is-visivel"); }

    function move(evt) {
      if (!chartHit) return hide();
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0) return hide();
      const svgX = ((evt.clientX - rect.left) / rect.width) * CW;

      let alvo = null;
      if (svgX >= chartHit.bar1.x0 && svgX <= chartHit.bar1.x1) alvo = chartHit.bar1;
      else if (svgX >= chartHit.bar2.x0 && svgX <= chartHit.bar2.x1) alvo = chartHit.bar2;

      if (!alvo) return hide();
      const topYSeguro = Math.max(alvo.topY, 130);
      tooltip.style.left = ((alvo.xCenter / CW) * 100) + "%";
      tooltip.style.top = ((topYSeguro / CH) * 100) + "%";
      tooltip.innerHTML = alvo.html;
      tooltip.classList.add("is-visivel");
    }

    svg.addEventListener("pointerenter", move);
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerleave", hide);
    svg.addEventListener("pointercancel", hide);
    wrap.addEventListener("pointerup", hide);
  }

  // Cálculo principal
  const announceInsight = debounce((text) => {
    if (insightSR) insightSR.textContent = text;
  }, 400);

  function atualizar() {
    const colaboradores = parseInt(colabRange.value, 10);
    const salario = parseFloat(salarioRange.value);
    const turnoverPct = parseFloat(turnoverRange.value);

    colabBox.value = colaboradores.toLocaleString("pt-BR");
    salarioBox.value = brl(salario);
    turnoverBox.value = turnoverPct + "%";

    colabRange.setAttribute("aria-valuetext", colaboradores.toLocaleString("pt-BR") + " colaboradores");
    salarioRange.setAttribute("aria-valuetext", brl(salario));
    turnoverRange.setAttribute("aria-valuetext", turnoverPct + "% ao ano");

    [colabRange, salarioRange, turnoverRange].forEach(syncRangeFill);

    const saidasAno = Math.round(colaboradores * (turnoverPct / 100));
    const custoPorSaida = salario * MESES_REPOSICAO;
    const custoHoje = saidasAno * custoPorSaida;

    const saidasEvitadas = Math.round(saidasAno * (REDUCAO_PCT / 100));
    const novoCusto = custoHoje * (1 - REDUCAO_PCT / 100);
    const economia = custoHoje - novoCusto;

    const compRecrutamento = custoHoje * COMPOSICAO.recrutamento;
    const compOnboarding = custoHoje * COMPOSICAO.onboarding;
    const compProdutividade = custoHoje * COMPOSICAO.produtividade;

    document.getElementById("r-custo-hoje").textContent = brl(custoHoje);
    document.getElementById("r-saidas").textContent = colaboradoresLabel(saidasAno);
    document.getElementById("r-custo-por-saida").textContent = brl(custoPorSaida);

    document.getElementById("r-comp-recrutamento").textContent = brl(compRecrutamento);
    document.getElementById("r-comp-onboarding").textContent = brl(compOnboarding);
    document.getElementById("r-comp-produtividade").textContent = brl(compProdutividade);
    document.getElementById("r-comp-recrutamento-fill").style.width = (COMPOSICAO.recrutamento * 100) + "%";
    document.getElementById("r-comp-onboarding-fill").style.width = (COMPOSICAO.onboarding * 100) + "%";
    document.getElementById("r-comp-produtividade-fill").style.width = (COMPOSICAO.produtividade * 100) + "%";

    document.getElementById("r-economia").textContent = brl(economia);
    document.getElementById("r-reducao-badge").textContent = "-" + REDUCAO_PCT + "% de turnover";
    document.getElementById("r-retidos").textContent = colaboradoresLabel(saidasEvitadas);
    document.getElementById("r-novo-custo").textContent = brl(novoCusto);

    const insightVal = document.getElementById("d-insight-val");
    if (insightVal) insightVal.textContent = colaboradoresLabel(saidasEvitadas);
    announceInsight(
      "Com a Aurora, o custo do turnover cairia de " + brl(custoHoje) + " para " + brl(novoCusto) +
      " por ano, uma economia de " + brl(economia) + "."
    );

    renderChart({ custoHoje, novoCusto, economia, saidasAno, custoPorSaida });
  }

  const atualizarThrottled = rafThrottle(atualizar);

  [colabRange, salarioRange, turnoverRange].forEach((r) => r.addEventListener("input", atualizarThrottled));

  bindIntBox(colabBox, colabRange, 10, 2000, 150, atualizar);
  bindMoneyBox(salarioBox, salarioRange, 1500, 30000, 6000, atualizar);
  bindPercentBox(turnoverBox, turnoverRange, 3, 50, 18, atualizar);

  // Inicialização
  attachBarHover();
  atualizar();
})();
