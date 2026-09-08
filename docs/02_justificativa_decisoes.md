# 🧠 Justificativa das Decisões Tomadas — Landing Page Aurora

> **People First Cup — Enterprise Challenge (FIAP × Aurora × Google)**  
> Documentação técnica das justificativas de design, arquitetura e engenharia para a **Etapa 2**.

---

## 1. 📋 Contexto: O que evoluiu da Etapa 1 para a Etapa 2

A Etapa 1 entregou o **protótipo estático** da landing page — um documento PDF descrevendo a estrutura planejada, a identidade visual e as intenções de acessibilidade. A Etapa 2 transforma esse protótipo em um **produto funcional e publicado**, atendendo integralmente aos critérios de avaliação do challenge.

### 1.1 Linha de Base — O que existia na Etapa 1

O PDF da Etapa 1 documentou os seguintes elementos **planejados** (não necessariamente implementados em código funcional):

| Elemento | Status na Etapa 1 |
|---|---|
| Header com logo, links de navegação e botão CTA | ✅ Planejado — com seletor de tema claro/escuro |
| Hero Section com título e CTA | ✅ Planejado |
| Seção de funcionalidades e benefícios | ✅ Planejado |
| Métricas de ROI (estáticas) | ✅ Planejado — apenas texto com os 4 números |
| Fluxo em 4 passos ("Como funciona") | ✅ Planejado |
| Formulário de captação de lead (campos básicos) | ✅ Planejado |
| FAQ | ✅ Planejado |
| Rodapé institucional | ✅ Planejado |
| Responsividade | ✅ Planejado (breakpoints 992px / 768px / 576px) |
| Acessibilidade básica (semântica HTML5, contraste WCAG 2.1) | ✅ Parcial |
| **Fundo Aurora Boreal animado** | ❌ Não implementado |
| **Trusted Strip (carrossel de marcas)** | ❌ Não implementado |
| **Carrossel de depoimentos com ARIA** | ❌ Não implementado |
| **Checklist interativo de autoavaliação** | ❌ Não implementado |
| **Depoimentos em vídeo** | ❌ Não implementado |
| **Simulador interativo de ROI (com gráfico SVG)** | ❌ Não implementado — apenas métricas estáticas |
| **Chatbot IRIS com IA (Google Gemini)** | ❌ Previsto como evolução futura |
| **Portal de Políticas / LGPD (`politicas.html`)** | ❌ Não implementado |
| **Deploy online** | ❌ Não implementado |
| **Acessibilidade avançada (WCAG 2.2, Tab Trap, Skip Link, ARIA completo)** | ❌ Previsto como evolução futura |
| **Integração com VLibras (Acessibilidade Libras)** | ❌ Previsto como evolução futura |

---

### 1.2 O que foi evoluído, refinado ou implementado do zero na Etapa 2

A tabela abaixo mapeia cada critério de avaliação da Etapa 2 com as entregas concretas realizadas:

#### ✅ Deploy online com URL pública

| Item | Entrega |
|---|---|
| **Deploy primário** | [aurora-ctrl-people-2026.vercel.app](https://aurora-ctrl-people-2026.vercel.app/) — Vercel com CI/CD automático via GitHub |
| **Deploy alternativo** | [mewmewdevart.github.io/AuroraFIAPChallenge](https://mewmewdevart.github.io/AuroraFIAPChallenge/) — GitHub Pages |
| **Repositório público** | [github.com/mewmewdevart/AuroraFIAPChallenge](https://github.com/mewmewdevart/AuroraFIAPChallenge) |
| **Backend Node.js** | Servidor Express hospedado no Vercel, com integração à API do Google Gemini |

---

#### ✅ Estrutura de conteúdo completa — Seções refinadas

Todas as seções planejadas na Etapa 1 foram **implementadas em código funcional** e **enriquecidas**:

| Seção | Evolução em relação à Etapa 1 |
|---|---|
| **Header / Navbar** | Removido o seletor de tema claro/escuro (simplificação de escopo); adicionado hamburguer mobile totalmente acessível por teclado; link `#simulador-roi` renomeado para "Simular Impacto" (mais assertivo do ponto de vista de copy B2B) |
| **Hero Section** | Fundo estático → **fundo animado Aurora Boreal** em camadas de gradiente CSS fluido com efeito de estrelas e transição em nuvem; adicionado mockup realista do dashboard |
| **Prova social** | Menção textual a empresas → **Trusted Strip**: carrossel CSS infinito e contínuo com 10 marcas reais do mercado brasileiro |
| **Seção de Problemas** | Texto de identificação de desafios → **6 cards interativos** Problem → Solution com ícones, contraste elevado e padrão visual consistente |
| **Depoimentos** | Depoimentos textuais básicos → **carrossel com padrão ARIA** (`role="tablist"`, navegação por setas, pausa inteligente) + **bloco de vídeos** com pausa automática entre players |
| **Checklist de autoavaliação** | Não existia → **componente interativo** com checkboxes que cria engajamento ativo antes do CTA |
| **ROI** | 4 métricas estáticas → **Simulador interativo** com sliders + inputs sincronizados, dois modos de cálculo (ROI Direto e ROI Composto), gráficos SVG com curvas de Bézier e `aria-live` para acessibilidade |
| **Fluxo em 4 passos** | Mantido com refinamento visual |
| **Formulário de lead** | Campos básicos → validação em tempo real, **filtro de e-mail corporativo** (regex blocklist de domínios pessoais), seletores de data/horário, feedback visual acessível via Toast + `aria-busy` |
| **FAQ** | Mantido com `<details>/<summary>` nativos |
| **Newsletter + Rodapé** | Rodapé expandido com newsletter funcional, dados legais, WhatsApp, redes sociais e link para portal de políticas |

---

#### ✅ Identidade visual aplicada

A paleta definida na Etapa 1 foi **mantida integralmente** e aprofundada:

- Roxo Aurora `#6a509d`, Púrpura `#7e61a7`, Rosa `#cf4793`, Teal `#31b4a6` — aplicados via CSS Custom Properties em todo o sistema de design
- Tipografia **Outfit** (Google Fonts) — mantida com hierarquia de pesos refinada
- Iconografia **Font Awesome 6** (line style) — mantida
- **Novidade Etapa 2:** Gradiente Aurora Boreal animado (`@keyframes`) aplicado tanto na Hero do `index.html` quanto na Hero da `politicas.html`, unificando a identidade entre as duas páginas

---

#### ✅ Formulário de captação de lead funcionando

O formulário da Etapa 1 era descritivo. Na Etapa 2:

- Validação em tempo real com feedback acessível (`aria-describedby`, foco no primeiro campo inválido)
- **Filtro de e-mail corporativo**: bloqueio automático de Gmail, Outlook, Yahoo, Hotmail e similares — garantindo qualidade dos leads
- Seletores de data e horário de preferência para agendamento
- Toast de sucesso animado com simulação assíncrona de envio (`aria-busy`)

---

#### ✅ Responsividade para diferentes dispositivos

Breakpoints da Etapa 1 mantidos (`992px`, `768px`, `576px`) e **expandidos**:

- Ajuste dedicado para smartphones a partir de `320px`
- Suporte a desktops ultrawide `>1440px`
- Hamburguer menu com Tab Trap e Escape para mobile
- Todos os componentes novos (trusted strip, carrossel, simulador ROI, chatbot) com layout adaptado

---

#### ✅ Recursos de acessibilidade — Evolução de WCAG 2.1 para WCAG 2.2 / ABNT NBR 17225:2025

A Etapa 1 documentou acessibilidade básica. A Etapa 2 implementou **acessibilidade avançada** como pilar central:

| Recurso | Etapa 1 | Etapa 2 |
|---|---|---|
| Semântica HTML5 | ✅ Básica | ✅ Rigorosa (todos os landmarks) |
| Contraste WCAG | ✅ 2.1 AA | ✅ 2.2 AA/AAA (>4.5:1 em todos os elementos) |
| Foco visível customizado | ❌ Previsto | ✅ `:focus-visible` com outline teal `#31b4a6` |
| Navegação por teclado 100% | ❌ Parcial | ✅ Tab, Shift+Tab, Enter, Espaço, Esc, setas |
| Tab Trap em modais | ❌ Não implementado | ✅ Chatbot e menu mobile |
| Skip Link | ❌ Não implementado | ✅ Link de salto oculto ("Ir para Agendar Demonstração") visível ao Tab — direciona para `#contato` (formulário de conversão), permitindo que usuários de teclado pulem direto ao CTA principal |
| ARIA completo | ❌ Básico | ✅ `aria-expanded`, `aria-live`, `aria-controls`, `aria-invalid`, `aria-describedby`, `role="tablist"` |
| `prefers-reduced-motion` | ❌ Não implementado | ✅ Animações desativadas automaticamente |
| Textos alternativos e `aria-hidden` | ✅ Básico | ✅ Todos os ícones decorativos marcados |
| Validação acessível de formulário | ❌ Básica | ✅ Erros vinculados por `aria-describedby` + foco automático |
| Tradução em Libras (VLibras) | ❌ Não implementado | ✅ Widget VLibras integrado nativamente em todas as páginas |

---

#### ✅ Diferenciais inovativos — além dos requisitos mínimos

Itens que **superam** os critérios obrigatórios da Etapa 2:

| Diferencial | Descrição |
|---|---|
| **Chatbot IRIS com IA** | Integração real com Google Gemini API via backend Node.js; fallback local; rate limiter; proteção contra prompt injection; context de projeto acadêmico FIAP embutido no system prompt |
| **Simulador de ROI interativo** | Gráficos SVG com curvas Catmull-Rom, dois modos de cálculo, `aria-live` para anúncio de resultados |
| **Portal de Políticas (`politicas.html`)** | Página de conformidade LGPD completa com busca em tempo real, sidebar com ScrollSpy, formulário de exercício de direitos (Art. 18), painel de gestão de cookies, e navbar idêntica ao `index.html` |
| **SEO/AEO avançado** | JSON-LD `Organization`, `WebSite`, `SoftwareApplication` e `FAQPage`; Open Graph; Twitter Cards; `canonical` |
| **Segurança no backend** | Headers HTTP de segurança (`X-Frame-Options`, `CSP`, `Referrer-Policy`), sanitização XSS, rate limiting em memória, safetySettings da API Gemini |
| **Tradução Automática em Libras** | Integração do widget do Governo Federal (VLibras) garantindo a inclusão e acessibilidade para pessoas surdas usuárias de Libras em todo o portal. |

---

## 2. 🧠 Justificativa das Decisões Tomadas

### 2.1 Estrutura e Arquitetura da Informação (Framework PAS)

A landing page foi arquitetada utilizando o framework narrativo **PAS (*Problem → Agitate → Solve*)**, estruturando a jornada cognitiva do decisor B2B desde a identificação da dor até a conversão. Cada seção foi posicionada intencionalmente para guiar o visitante por um fluxo lógico de descoberta, conscientização e ação:

---

#### 🔝 Cabeçalho Fixo e Acessível (`<header>` / `<nav>`)

Menu fixo no topo com navegação por âncoras para todas as seções principais (*A Solução, Como Funciona, Depoimentos, Resultados, Dúvidas*) e botão de destaque para o CTA principal (*Agendar Demonstração*), garantindo rolagem suave até o formulário. Inclui suporte a menu hamburguer mobile, completamente acessível via teclado e leitores de tela.

**Justificativa:** A fixação do menu mantém o CTA sempre visível, reduzindo a fricção de conversão em qualquer ponto da leitura. A navegação por âncoras antecipa as dúvidas do decisor e permite que ele navegue diretamente às seções mais relevantes ao seu perfil.

*(Printscreen do Menu e Navegação no Topo)*

---

#### 🌌 Hero Section com Fundo Dinâmico Aurora Boreal

Primeiro contato do visitante com a proposta de valor: título de alto impacto, subtítulo esclarecedor, botão de conversão principal e um mockup fidedigno do dashboard da plataforma. O fundo é composto por camadas de gradientes CSS fluidos — inspirados no fenômeno da Aurora Boreal — com transição suave em formato de nuvem.

**Justificativa:** O efeito visual de Aurora Boreal reforça a identidade de marca e cria memorabilidade imediata. O mockup do dashboard funciona como prova de produto logo no primeiro contato, ancorando a credibilidade da solução antes de qualquer argumento textual.

*(Printscreen da Hero Section com o Dashboard e Efeito Aurora)*

---

#### 🏢 Faixa de Prova Social (*Trusted Strip*)

Carrossel contínuo e infinito de marcas líderes de mercado — **Nubank, iFood, TOTVS, Itaú, Magalu, Stone, QuintoAndar, FIAP, Ambev e Natura** — exibido imediatamente após a Hero Section.

**Justificativa:** A prova social por associação de marca é um dos gatilhos de autoridade mais eficazes no marketing B2B. Posicioná-la antes do detalhamento técnico estabelece credibilidade institucional no momento em que o visitante ainda está avaliando se deve continuar lendo.

*(Printscreen da Faixa de Parceiros / Trusted Strip)*

---

#### 🔍 Seção de Problemas & Soluções (*"Sua empresa vive algum desses cenários?"*)

Seis cards de alto contraste mapeando as dores mais críticas do RH contemporâneo:

| # | Dor Identificada | Como a Aurora Resolve |
|---|---|---|
| 1 | Dados espalhados e sem cruzamento | Dashboard centralizado com métricas integradas |
| 2 | Dificuldade em criar planos de ação | Insights acionáveis gerados automaticamente |
| 3 | Avaliações de desempenho por achismo | Análise baseada em dados objetivos e históricos |
| 4 | Perda silenciosa de talentos (turnover oculto) | Alertas preditivos de risco de saída |
| 5 | Líderes sem direcionamento claro | Relatórios individuais de liderança e time |
| 6 | Custo invisível das demissões | Simulador de ROI com projeção financeira real |

**Justificativa:** A estrutura de problema-solução em pares ativa o reconhecimento imediato nas lideranças de RH e C-Level, que se identificam com as situações descritas. Essa técnica de espelhamento reduz a resistência do comprador e acelera a percepção de valor.

*(Printscreen da Seção A Solução / Cards de Problemas e Soluções)*

---

#### ✅ Benefícios Estratégicos & Carrossel Interativo de Depoimentos

Apresentação das transformações práticas geradas pela Aurora Pro na rotina da empresa, acompanhada de um carrossel de depoimentos dinâmico e completamente acessível:

- Estruturado com padrões ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`;
- Navegação por setas direcionais e teclado;
- Pausa inteligente ao passar o mouse (*hover*) ou ao receber foco de teclado;
- Indicadores visuais de aba ativa com transição suave.

**Justificativa:** O carrossel de depoimentos combina prova social com benefício concreto, apresentando resultados reais de usuários da plataforma. A pausa inteligente ao receber foco garante que usuários de tecnologia assistiva não percam o conteúdo durante a navegação, atendendo ao critério **2.2.2 do WCAG 2.2**.

*(Printscreen da Seção de Benefícios e Carrossel de Depoimentos)*

---

#### ☑️ Checklist Interativo de Autoavaliação

Componente interativo que permite ao visitante marcar caixas de seleção para identificar quais problemas sua organização enfrenta atualmente, culminando em um botão de CTA direcionado e contextualizado.

**Justificativa:** A autoavaliação cria **engajamento ativo** — em contraste com a leitura passiva — gerando comprometimento cognitivo com o problema antes do botão de conversão. Quanto mais caixas o decisor marca, mais ele próprio confirma a necessidade da solução, reduzindo a resistência à conversão.

*(Printscreen do Checklist Interativo e Botão de Ação)*

---

#### 🎥 Depoimentos em Vídeo (*"Quem usa a Aurora, conta"*)

Bloco de prova social com players de vídeo que exibem depoimentos reais de usuários da plataforma. Recursos técnicos implementados:

- **Pausa automática de vídeos concorrentes:** evita sobreposição de áudios quando mais de um vídeo é iniciado;
- **Links diretos para LinkedIn:** conectam o depoimento à identidade profissional real da pessoa, elevando a credibilidade;
- Controles nativos acessíveis do elemento `<video>`.

**Justificativa:** O vídeo é o formato de maior taxa de conversão no marketing B2B (fonte: HubSpot State of Marketing Report). A pausa automática entre vídeos é uma decisão de UX que elimina ruído auditivo e melhora a experiência sem qualquer intervenção do usuário.

*(Printscreen da Seção de Depoimentos em Vídeo)*

---

#### 📊 Diferencial Inovador: Simulador Interativo de ROI

Calculadora financeira que permite ao cliente simular o retorno sobre o investimento em dois modos distintos:

- **Modo 1 — ROI Direto:** cálculo pontual baseado em headcount e taxa de turnover informados;
- **Modo 2 — ROI Composto (no tempo):** projeção de retorno acumulado ao longo de meses, exibida em gráfico SVG dinâmico.

**Recursos técnicos do componente:**

| Recurso | Detalhe de Implementação |
|---|---|
| Gráficos SVG dinâmicos | Curvas suaves de Bézier (algoritmo Catmull-Rom) desenhadas via JavaScript |
| Inputs sincronizados | Sliders e campos de texto atualizados em tempo real de forma bidirecional |
| Formatação monetária | Valores exibidos em Real Brasileiro (BRL) com `Intl.NumberFormat` |
| Acessibilidade dinâmica | Região `aria-live="polite"` anuncia resultados para leitores de tela a cada cálculo |

**Justificativa:** Transformar o argumento de custo em uma experiência interativa e personalizada é o gatilho de conversão mais poderoso para decisores B2B orientados a resultado. O simulador faz o visitante calcular seu próprio problema com seus próprios dados — tornando a Aurora indispensável antes mesmo da demonstração.

*(Printscreen da Calculadora / Simulador Interativo de ROI)*

---

#### 📈 Resultados e Métricas de Impacto (ROI de Mercado)

Painel de métricas que traduz o valor da Aurora em dados objetivos e verificáveis:

| Métrica | Resultado |
|---|---|
| Redução de turnover | **-25%** nos primeiros 6 meses |
| Horas devolvidas ao RH | **+40h mensais** por gestor |
| Aumento de engajamento | **+15%** em média |
| Retenção de talentos | **3×** mais retidos (Deloitte, 2024) |

**Justificativa:** Números concretos ancorados em fontes reconhecidas (Deloitte 2024) eliminam ceticismo e funcionam como prova de eficácia independente de depoimentos. A escolha de métricas operacionais (horas, percentuais, múltiplos) é deliberada para falar a linguagem do CFO e do COO, não apenas do RH.

*(Printscreen da Seção de Resultados / Métricas)*

---

#### 🔄 Como a Aurora Funciona na Prática (Fluxo em 4 Passos)

Demonstração didática e sequencial da esteira de uso da plataforma:

1. **Conheça seu time a fundo** — Coleta e cruzamento de dados de clima, engajamento e desempenho;
2. **Coloque os insights em prática** — Geração automática de planos de ação personalizados;
3. **Conte com acompanhamento especializado** — Suporte de especialistas em People Analytics;
4. **Veja o resultado nos números** — Dashboard de acompanhamento de metas e ROI.

**Justificativa:** O fluxo linear em 4 passos reduz a percepção de complexidade de implementação — uma das principais objeções de compra em software B2B. A numeração sequencial cria uma narrativa de progresso e facilita a memorização da proposta.

*(Printscreen da Seção de Metodologia e Fluxo em 4 Passos)*

---

#### 📋 Formulário de Captação de Leads 100% Funcional

CTA final de agendamento com validação rigorosa em tempo real. Campos coletados:

- Nome completo;
- E-mail **corporativo** (com filtro ativo);
- Empresa e Cargo;
- Faixa de colaboradores;
- Seletores interativos de data e horário de preferência.

**Recursos de validação e UX:**

| Recurso | Implementação |
|---|---|
| Filtro de e-mail corporativo | Bloqueio automático de domínios pessoais (Gmail, Outlook, Yahoo, Hotmail, etc.) via regex |
| Feedback de erro acessível | Erros vinculados a campos via `aria-describedby`; foco automático no primeiro campo inválido |
| Toast de Sucesso animado | Notificação visual com animação e `aria-busy` durante envio assíncrono simulado |

**Justificativa:** O filtro de e-mail corporativo garante a qualidade dos leads capturados, entregando ao time comercial apenas contatos de decisores com e-mail institucional verificado. O feedback em tempo real reduz a taxa de abandono de formulário ao guiar o usuário proativamente na correção de erros.

*(Printscreen do Formulário de Captação e Mensagem de Sucesso)*

---

#### ❓ Perguntas Frequentes (FAQ)

Acordeão nativo e acessível com as tags semânticas `<details>` e `<summary>`, respondendo objetivamente às principais objeções de compra:

- Segurança dos dados e conformidade com a **LGPD**;
- Prazo e complexidade de implantação;
- Integrações com softwares de Folha e RH existentes;
- Modelo de investimento e licenciamento.

**Justificativa:** O uso das tags nativas `<details>/<summary>` elimina JavaScript desnecessário, garante acessibilidade por teclado sem nenhuma implementação adicional e é nativamente interpretável por motores de busca — contribuindo para a marcação `FAQPage` em JSON-LD.

*(Printscreen da Seção de FAQ Aberto e Fechado)*

---

#### 📩 Newsletter & Rodapé Institucional

Módulo de inscrição em novidades de People Analytics e rodapé completo contendo:

- Dados legais da empresa (CNPJ, endereço);
- Links de navegação interna;
- Canais de contato direto (WhatsApp e E-mail);
- Redes sociais;
- Links para o portal de privacidade e LGPD.

**Justificativa:** O rodapé institucional completo é requisito de conformidade legal e transmite maturidade corporativa — aspecto crítico para a confiança do comprador B2B. A newsletter captura leads em estágio inicial de interesse, alimentando um funil de nutrição de longo prazo.

*(Printscreen do Rodapé e Newsletter)*

---

#### 🤖 Assistente Virtual Inteligente IRIS (Chatbot com IA)

Chatbot interativo flutuante integrado à **API do Google Gemini** via backend **Node.js** (`server.js`), com as seguintes características:

| Característica | Detalhe |
|---|---|
| Integração com IA | API Google Gemini com prompt de sistema especializado em People Analytics |
| Fallback local | Base de conhecimento embutida ativa imediatamente caso a API esteja indisponível |
| Acessibilidade total | Tab Trap implementado (foco restrito ao chatbot enquanto aberto), navegação por teclado completa |
| Segurança | Chave de API protegida no backend Node.js — nunca exposta no frontend |

**Justificativa:** O IRIS transforma o atendimento passivo em uma experiência de descoberta ativa. Um decisor que interage com o chatbot antes de preencher o formulário chega à demonstração mais qualificado e com menos objeções. O fallback local garante disponibilidade 100% independente de quotas ou instabilidades da API.

*(Printscreen do Chatbot IRIS Aberto em Conversação)*

---

#### 🔒 Portal de Políticas e Governança (`politicas.html`)

Página dedicada e autônoma — com deploy no mesmo domínio — que centraliza toda a documentação jurídica e de conformidade da plataforma Aurora. Estruturada em **6 seções temáticas independentes**, acessadas por navegação lateral e por âncoras da URL, tornando a consulta rápida e rastreável.

**Conteúdo coberto:**

| # | Seção | Escopo |
|---|---|---|
| 1 | **Visão Geral e Identificação Institucional** | Apresentação da entidade, escopo de aplicação e princípios de Privacy by Design |
| 2 | **Política de Privacidade de Dados** | Papéis de Controladora/Operadora (Art. 5º LGPD), inventário completo de dados coletados por módulo com base legal |
| 3 | **Termos de Uso** | Condições de acesso, responsabilidades do usuário, propriedade intelectual e limitação de responsabilidade |
| 4 | **Portal de Direitos dos Titulares (LGPD)** | Formulário funcional para exercício de direitos (Art. 18): acesso, retificação, anonimização e exclusão de dados |
| 5 | **Política de Cookies & Armazenamento** | Painel interativo de gestão de consentimento com localStorage e botão de revogação em tempo real |
| 6 | **IA Ética & Segurança (Google Gemini)** | Transparência sobre o funcionamento do chatbot IRIS, tratamento de dados na IA e medidas de segurança |

---

**Decisões de design e arquitetura:**

**Navbar padrão Aurora (mesmas classes CSS do `index.html`):**  
A `politicas.html` utiliza exatamente o mesmo componente `<header class="cabecalho">` da landing page principal, com os mesmos tokens de tamanho, espaçamento e breakpoints responsivos definidos no `style.css`. Os links da navbar foram contextualizados para as seções internas da página de políticas (Privacidade, Termos de Uso, Portal LGPD, Cookies, IA & Segurança) e o botão de CTA "Voltar ao Site" usa a classe `.botao-cta` com gradiente Aurora — criando consistência visual imediata entre as duas páginas.

**Justificativa:** Manter o mesmo header elimina o custo de manutenção de dois sistemas de navegação distintos e garante que o usuário reconheça imediatamente que ainda está dentro do ecossistema Aurora, sem a sensação de ter sido redirecionado para um site externo.

*(Printscreen da Navbar da politicas.html — desktop e mobile)*

---

**Hero Section com fundo Aurora Boreal e busca integrada:**  
A seção de entrada da página segue o mesmo padrão visual da Hero do `index.html` — gradientes CSS em camadas simulando a Aurora Boreal — aplicando a identidade da marca mesmo em uma página utilitária/jurídica. Inclui:
- **Pré-título** com referência à LGPD (Lei nº 13.709/2018);
- **H1 expressivo** com destaque tipográfico em cor de marca;
- **Barra de busca em tempo real** (`<input>` + debounce de 200ms) que filtra visualmente todas as seções jurídicas conforme o usuário digita, com botão de limpeza e região `role="status"` para anunciar resultados a leitores de tela;
- **Pills de acesso rápido** (`role="navigation"`) com ícones e links âncora para cada uma das 6 seções, posicionadas logo abaixo da busca;
- **Metadados de versão** (última atualização e versão do documento).

**Justificativa:** Aplicar o visual Aurora Boreal até em páginas de política reforça que a transparência e a identidade da marca são inseparáveis. A busca em tempo real é especialmente valiosa em documentos jurídicos longos — o usuário corporativo em due diligence busca termos específicos ("Gemini", "turnover", "LGPD", "cookies") sem precisar rolar centenas de linhas.

*(Printscreen da Hero com Busca e Pills de Acesso Rápido)*

---

**Sidebar fixa com ScrollSpy (Índice do Portal):**  
Menu lateral acessível (`<aside>`) com links para as 6 seções, que destaca automaticamente a seção visível no viewport via `IntersectionObserver`. Inclui um card de contato direto com o DPO (Encarregado de Dados), exibindo o e-mail `privacidade@aurorapro.com.br`.

**Justificativa:** O índice lateral com ScrollSpy é uma convenção consolidada em documentação técnica e jurídica (ex.: GDPR pages de grandes empresas). Ele elimina a desorientação em documentos longos e reduz o tempo de localização de cláusulas específicas — uma necessidade real do advogado ou analista jurídico que acessa a página durante avaliação de fornecedor.

*(Printscreen da Sidebar com Item Ativo Destacado)*

---

**Seções jurídicas com estrutura semântica e callouts visuais:**  
Cada seção é delimitada por `<section id="...">` com `aria-labelledby` apontando para seu `<h2>`. Os artigos internos seguem hierarquia `<article>` → `<h3>` → parágrafos e listas com ícones. Callouts coloridos (`legal-callout--info`, `legal-callout--warning`) destacam cláusulas críticas. Tabelas de dados (inventário de módulos, bases legais LGPD) são estruturadas com `<thead>` e `<th scope>` para acessibilidade com leitores de tela.

**Justificativa:** A estrutura semântica rigorosa garante que ferramentas de análise jurídica automatizada (como crawlers de conformidade) consigam extrair e indexar corretamente as cláusulas. As tabelas de inventário de dados atendem à recomendação do Art. 37 da LGPD, que orienta a manutenção de registros de operações de tratamento.

*(Printscreen de uma Seção Jurídica com Callout e Tabela)*

---

**Formulário funcional de Exercício de Direitos (Portal LGPD):**  
Formulário com campos de Nome, E-mail, Tipo de Solicitação (seletor) e Descrição, com simulação assíncrona de envio (1.2s delay) e geração de número de protocolo (`AUR-XXXXXX`). O toast de confirmação usa `role="alert"` + `aria-live="assertive"` para anúncio imediato a leitores de tela.

**Justificativa:** O Art. 18 da LGPD obriga o controlador a fornecer mecanismo de exercício de direitos pelos titulares. O formulário funcional demonstra conformidade real, e o protocolo gerado simula o fluxo esperado em ambiente de produção — critério avaliado em auditorias de conformidade.

*(Printscreen do Formulário LGPD com Toast de Confirmação)*

---

**Painel interativo de gestão de Cookies:**  
Componente que exibe o status atual do consentimento (armazenado em `localStorage`) e permite ao usuário aceitar ou revogar cookies com um único clique, sem precisar limpar o navegador manualmente.

**Justificativa:** A Resolução CD/ANPD nº 2/2022 e as diretrizes do Comitê Europeu de Proteção de Dados (EDPB) exigem que o consentimento seja tão fácil de revogar quanto de conceder. O painel interativo atende a esse princípio de forma auditável e demonstrável.

*(Printscreen do Painel de Cookies com Status Ativo/Inativo)*

---

> **Nota:** Todos os itens marcados com *(Printscreen...)* devem ser substituídos pelas capturas de tela reais correspondentes na versão final de entrega.

