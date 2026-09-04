# 📖 Enterprise Challenge - Etapa 2: Protótipo Funcional & Deploy

> **People First Cup — Enterprise Challenge (FIAP x Aurora x Google)**  
> Documentação técnica e justificativa das tomadas de decisão para a entrega da **Etapa 2**.

---

## 👥 Integrantes do Grupo (Ordem Alfabética)

* **Ingrid Silva de Lima** — RM570149 ([rm570149@fiap.com.br](mailto:rm570149@fiap.com.br))
* **Larissa Cristina Benedito** — RM570970 ([rm570970@fiap.com.br](mailto:rm570970@fiap.com.br))
* **Mayla Mayumi Motobe** — RM571213 ([rm571213@fiap.com.br](mailto:rm571213@fiap.com.br))

---

## 🔗 Links Oficiais de Acesso e Publicação

* 🌐 **Deploy da Landing Page (GitHub Pages):** [https://mewmewdevart.github.io/AuroraFIAPChallenge/](https://mewmewdevart.github.io/AuroraFIAPChallenge/)
* 🌐 **Deploy Alternativo (Vercel):** [https://aurora-ctrl-people-2026.vercel.app/](https://aurora-ctrl-people-2026.vercel.app/)
* 💻 **Repositório Público no GitHub:** [https://github.com/mewmewdevart/AuroraFIAPChallenge](https://github.com/mewmewdevart/AuroraFIAPChallenge)

---

## 1. 📌 Introdução e Contextualização do Projeto

A **Aurora** é uma plataforma de **People Analytics e Gestão de Performance B2B** desenvolvida para capacitar empresas a tomarem decisões mais conscientes, justas e estratégicas sobre pessoas com base em dados. 

Na **Etapa 2 do Enterprise Challenge**, a landing page ganha vida através de um **deploy online operacional, formulário de captação de leads totalmente funcional, diferenciais interativos (calculadora de ROI e assistente virtual inteligente) e conformidade avançada com padrões de acessibilidade**. A experiência foi desenhada para comunicar a proposta de valor da solução ao público corporativo, gerar autoridade de mercado e conduzir o visitante a agendar uma demonstração personalizada.

### 🎯 Público-Alvo Principal
* **Lideranças de RH:** CHROs, Heads de Pessoas, Gerentes de DHO e Business Partners (BPs) Sênior.
* **C-Level e Gestores:** CEOs, COOs e líderes de equipes em empresas de médio e grande porte (+50 colaboradores) nos setores de Tecnologia, Serviços, Indústria e Varejo.

---

## 2. 🧠 Justificativa das Decisões Tomadas

### 2.1 Estrutura e Arquitetura da Informação (Framework PAS)

A Landing Page foi estruturada utilizando o framework narrativo **PAS (*Problem → Agitate → Solve*)**, conduzindo o visitante por uma jornada lógica de descoberta, conscientização do problema e conversão:

* **Menu de Navegação Fixo e Acessível (`<header>` / `<nav>`):**  
  Fixo no topo da tela com acesso direto por âncoras para as seções principais (*A Solução, Como Funciona, Depoimentos, Resultados, Dúvidas*) e botão de destaque para a ação principal (*Agendar Demonstração*), que rola suavemente até o formulário. Conta com menu responsivo (*hamburguer*) com suporte completo a leitores de tela e navegação por teclado.  
  *(Printscreen do Menu e Navegação no Topo)*

* **Hero Section com Fundo Dinâmico Aurora Boreal:**  
  Primeiro contato do visitante com a proposta de valor: título de alto impacto, subtítulo esclarecedor, botão de conversão e um mockup realista do dashboard da Aurora. O fundo conta com camadas de gradientes CSS fluidos inspirados no fenômeno da Aurora Boreal e transição suave em formato de nuvem.  
  *(Printscreen da Hero Section com o Dashboard e Efeito Aurora)*

* **Faixa de Prova Social (*Trusted Strip*):**  
  Faixa com rolagem horizontal contínua e infinita exibindo marcas de grande relevância no mercado (Nubank, iFood, TOTVS, Itaú, Magalu, Stone, QuintoAndar, RD Station, Ambev e Natura). Funciona como selo imediato de autoridade e credibilidade antes mesmo de o visitante se aprofundar nas funcionalidades.  
  *(Printscreen da Faixa de Parceiros / Trusted Strip)*

* **A Solução ("Sua empresa vive algum desses cenários?"):**  
  Seis cards de alto contraste que mapeiam as dores mais críticas do RH moderno (dados espalhados, dificuldade em criar planos de ação, avaliações por achismo, perda silenciosa de talentos, líderes sem direção clara e o custo invisível do turnover), apresentando para cada uma como a inteligência da Aurora atua na resolução.  
  *(Printscreen da Seção A Solução / Cards de Problemas e Soluções)*

* **Benefícios Estratégicos & Carrossel Interativo de Depoimentos:**  
  Apresentação das transformações práticas geradas pela Aurora Pro na rotina da empresa, acompanhada de um carrossel de depoimentos dinâmico e acessível (estruturado com abas ARIA `role="tablist"`, navegação por setas e teclado, e pausa inteligente ao receber foco ou passar o mouse).  
  *(Printscreen da Seção de Benefícios e Carrossel de Depoimentos)*

* **Checklist Interativo de Autoavaliação:**  
  Ferramenta de engajamento ativo que permite ao decisor marcar caixas de seleção interativas para identificar quais problemas sua organização enfrenta atualmente, culminando em um botão de chamada para ação direcionado.  
  *(Printscreen do Checklist Interativo e Botão de Ação)*

* **Depoimentos em Vídeo ("Quem usa a Aurora, conta"):**  
  Bloco de prova social com players de vídeo que contam com controles inteligentes (pausa automática de vídeos concorrentes para não sobrepor áudios) e links diretos para conexão com as empresas no LinkedIn.  
  *(Printscreen da Seção de Depoimentos em Vídeo)*

* **Diferencial Inovador: Simulador Interativo de ROI:**  
  Calculadora financeira que permite ao cliente simular o retorno sobre o investimento em dois modos: **ROI Direto** e **ROI Composto (no tempo)**. Apresenta gráficos vetoriais dinâmicos em SVG desenhados com curvas suaves de Bézier (Catmull-Rom), inputs com sliders e digitação sincronizados, formatação em Real (BRL) e anúncios dinâmicos de acessibilidade (`aria-live`).  
  *(Printscreen da Calculadora / Simulador Interativo de ROI)*

* **Resultados e Métricas de Impacto (ROI de Mercado):**  
  Painel de métricas que traduz o valor da Aurora em dados objetivos (25% menos turnover nos primeiros 6 meses, 40h mensais devolvidas ao RH, +15% de engajamento e 3x mais retenção segundo estudo da Deloitte 2024).  
  *(Printscreen da Seção de Resultados / Métricas)*

* **Como a Aurora Funciona na Prática (Fluxo em 4 Passos):**  
  Demonstração didática e sequencial da esteira de uso da plataforma (1. Conheça seu time a fundo → 2. Coloque os insights em prática → 3. Conte com acompanhamento especializado → 4. Veja o resultado nos números).  
  *(Printscreen da Seção de Metodologia e Fluxo em 4 Passos)*

* **Formulário de Captação de Leads 100% Funcional:**  
  CTA final de agendamento com validação rigorosa em tempo real:
  - Campos de Nome, E-mail corporativo, Empresa, Cargo e Faixa de colaboradores;
  - **Filtro de E-mail Corporativo:** Bloqueio automático de e-mails de uso pessoal (Gmail, Outlook, Yahoo, Hotmail, etc.);
  - Seletores interativos de data e horário de preferência;
  - Feedback visual e acessível via notificação animada (*Toast de Sucesso*) com simulação assíncrona de envio (`aria-busy`).  
  *(Printscreen do Formulário de Captação e Mensagem de Sucesso)*

* **Perguntas Frequentes (FAQ):**  
  Acordeão nativo e acessível com tags `<details>` e `<summary>`, respondendo a objeções sobre segurança de dados, adequação à LGPD, prazo de implantação, integrações com softwares de folha/RH e modelo de investimento.  
  *(Printscreen da Seção de FAQ Aberto e Fechado)*

* **Newsletter & Rodapé Institucional:**  
  Módulo de inscrição em novidades de People Analytics e rodapé completo com dados legais da empresa, links de navegação, canais de contato direto (WhatsApp e E-mail), redes sociais e links para o portal de privacidade.  
  *(Printscreen do Rodapé e Newsletter)*

* **Assistente Virtual Inteligente IRIS (Chatbot com IA):**  
  Chatbot interativo flutuante integrado à API do Google Gemini via backend Node.js, contando com fallback imediato para base de conhecimento local e total acessibilidade por teclado (Tab Trap).  
  *(Printscreen do Chatbot IRIS Aberto em Conversação)*

* **Portal de Políticas e Governança (`politicas.html`):**  
  Página dedicada contendo Termos de Uso, Política de Privacidade e Portal de Direitos dos Titulares de Dados sob a LGPD.  
  *(Printscreen da Página politicas.html)*

---

### 2.2 Identidade Visual e Design System

A identidade visual foi concebida para transmitir inovação, precisão analítica e confiança institucional:

* **Paleta de Cores:**
  * **Cor Principal (Roxo Aurora):** `#6a509d`
  * **Cor Secundária (Púrpura Profundo):** `#7e61a7`
  * **Destaque Rosa (Energia e Ação):** `#cf4793`
  * **Destaque Teal (Dados e Confiança):** `#31b4a6`
  * **Tons Neutros e Superfícies:** `#ffffff`, `#f8f9fa`, `#1e1333`
* **Tipografia:** Família tipográfica **Outfit** (Google Fonts), aplicada em toda a interface por seu desenho geométrico contemporâneo e excelente legibilidade em telas de alta densidade.
* **Iconografia:** Ícones em formato de linha (*line style*) da biblioteca **Font Awesome 6**, garantindo coesão visual minimalista.
* **Micro-interações:** Efeitos sutis de elevação ao passar o mouse (*hover*), transições com aceleração cúbica natural e gradientes refinados.

---

### 2.3 Decisões Técnicas de Engenharia de Software

* **Stack Leve e Performática:** HTML5 semântico, CSS3 com variáveis nativas (*Custom Properties*) e JavaScript Vanilla modular (sem frameworks pesados no frontend), garantindo tempo de carregamento mínimo e alta pontuação no Google Lighthouse.
* **Responsividade Multiplataforma:** Layout fluido projetado com CSS Grid e Flexbox, adaptando-se com precisão para smartphones (320px - 576px), tablets (768px - 992px) e desktops ultrawide (>1440px).
* **SEO e AEO (Answer Engine Optimization):**
  * Meta tags completas (`title`, `description`, `keywords`, `robots`, `theme-color`, `canonical`);
  * Open Graph e Twitter Cards para compartilhamento enriquecido;
  * Marcação estruturada **JSON-LD** (`Organization`, `WebSite`, `SoftwareApplication` e `FAQPage`), preparando a página para motores de busca e mecanismos de busca por IA.
* **Conformidade LGPD:** Banner de consentimento de cookies com persistência em `localStorage` e link para o portal de privacidade.

---

## 3. ♿ Recursos de Acessibilidade Implementados (WCAG 2.2 / ABNT NBR 17225:2025)

A acessibilidade foi projetada como pilar central de desenvolvimento:

| Recurso de Acessibilidade | Detalhamento Técnico |
| :--- | :--- |
| **Link de Salto (*Skip Link*)** | Link oculto no topo que se torna visível ao pressionar <kbd>Tab</kbd>, permitindo pular direto para o `#conteudo-principal`. |
| **Estrutura Semântica Rigorosa** | Uso exclusivo de elementos HTML5 nativos: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<details>` e `<summary>`. |
| **Hierarquia de Títulos (Headings)** | Estrutura estrita com um único `<h1>` por página, seguido por `<h2>` e `<h3>` ordenados logicamente. |
| **Navegação Plena por Teclado** | 100% dos elementos interativos (botões, links, abas, sliders, modais, checkboxes) operáveis via <kbd>Tab</kbd>, <kbd>Shift + Tab</kbd>, <kbd>Enter</kbd>, <kbd>Espaço</kbd>, <kbd>Esc</kbd> e setas direcionais. |
| **Indicador de Foco Visível Customizado** | Estilização `:focus-visible` com contorno de alto contraste em destaque teal (`#31b4a6`), espessura de 2px e `outline-offset: 3px`. |
| **Armadilha de Foco (*Tab Trap*) & Escape** | Implementada no Chatbot e no Menu Mobile, mantendo o foco restrito à janela ativa e devolvendo-o ao botão de origem após fechar com <kbd>Esc</kbd>. |
| **Atributos ARIA Completos** | Uso de `aria-expanded`, `aria-label`, `aria-controls`, `aria-invalid`, `aria-describedby`, `aria-busy`, `aria-live="polite"` e `role="tablist"` / `role="tab"` / `role="tabpanel"`. |
| **Validação Acessível de Formulários** | Erros vinculados aos campos por `aria-describedby` e foco automático no primeiro campo inválido para correção ágil. |
| **Contraste de Cores (WCAG AA/AAA)** | Taxas de contraste cromático superiores a 4.5:1 em todos os textos e componentes de controle. |
| **Respeito a `prefers-reduced-motion`** | O JavaScript e o CSS desativam automaticamente rotações e transições intensas para usuários que configuraram redução de movimento no sistema operacional. |
| **Textos Alternativos & Ocultação Decorativa** | Imagens com `alt` descritivo e ícones puramente decorativos marcados com `aria-hidden="true"`. |

---

## 4. 📂 Organização dos Arquivos no Repositório

```bash
AuroraFIAPChallenge/
├── index.html            # Landing Page principal (HTML5 Semântico e Acessível)
├── politicas.html        # Portal de Privacidade, Termos de Uso e LGPD
├── server.js             # Servidor Express com integração Google Gemini AI
├── package.json          # Gerenciador de dependências do backend
├── README.md             # Documentação principal do repositório
├── docs/                 # Documentação acadêmica e entregas
│   ├── 01_sprint.md      # Documentação da Etapa 1
│   ├── 02_sprint.md      # Documentação da Etapa 2 (Protótipo Funcional & Deploy)
│   └── roteiro_video_pitch.md # Roteiro de pitch para etapas futuras
└── assets/
    ├── css/
    │   ├── style.css         # Design System, variáveis e estilos globais
    │   ├── simulador-roi.css # Estilos do simulador interativo de ROI
    │   └── politicas.css     # Estilos da página de políticas e LGPD
    ├── js/
    │   ├── main.js           # Menu, carrosséis, checklist, formulário e toast
    │   ├── chatbot.js        # Lógica do assistente virtual IRIS com IA/Fallback
    │   ├── simulador-roi.js  # Motor matemático e gráficos SVG do ROI
    │   └── politicas.js      # Navegação e âncoras da página de privacidade
    ├── img/                  # Logotipos, ícones e mockups
    └── video/                # Depoimentos em vídeo
```

---

## 5. 🚀 Evoluções Futuras e Roadmap

1. **Integração com VLibras:** Tradução automática em Língua Brasileira de Sinais para inclusão de pessoas surdas.
2. **Progressive Web App (PWA):** Instalação facilitada em dispositivos móveis e suporte a cache offline via Service Workers.
3. **Integração com WhatsApp Business:** Início de atendimento direto com mensagens pré-configuradas.
4. **Degustação Interativa de Dashboard na Hero:** Versão interativa com filtros dinâmicos na seção principal do site.
5. **Modelos Preditivos de IA:** Cruzamento avançado de dados com predição de turnover e análise de clima organizacional em tempo real.

---

## 📚 Referências Normativas e Bibliográficas

* **ABNT NBR 17225:2025** — Acessibilidade em interfaces da Web e aplicações digitais.
* **W3C / WAI** — *Web Content Accessibility Guidelines (WCAG) 2.2*.
* **NIELSEN, Jakob** — *10 Usability Heuristics for User Interface Design*. Nielsen Norman Group.
* **BRASIL** — *Lei Geral de Proteção de Dados Pessoais (LGPD)*, Lei nº 13.709/2018.
* **DELOITTE** — *Global Human Capital Trends: The data-driven future of HR and talent retention*, 2024.
