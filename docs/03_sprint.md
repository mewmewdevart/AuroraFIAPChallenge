# 📖 Enterprise Challenge - Etapa 3: Entrega Final & Otimizações Sênior

Este markdown é o detalhamento técnico e funcional completo do projeto entregue no **Enterprise Challenge (People First Cup: Parceria FIAP × Aurora × Google)**!

## 🔗 Acessos
- 🌐 **Deploy Principal (Vercel):** [Aurora B2B Platform](https://aurora-ctrl-people-2026.vercel.app/)
- 💻 **Repositório GitHub:** [mewmewdevart/AuroraFIAPChallenge](https://github.com/mewmewdevart/AuroraFIAPChallenge)

## 👥 Integrantes - Grupo Ctrl + People
- **Ingrid Silva de Lima** - RM 570149
- **Larissa Cristina Benedito** - RM 570970
- **Mayla Mayumi Motobe** - RM 571213

## 1. 📌 Introdução e Escopo da Entrega Final

A **Etapa 3** marca a consolidação e entrega final do projeto **Aurora**, uma plataforma B2B SaaS de People Analytics e Gestão de Performance. Desenvolvida como solução para o Enterprise Challenge "People First Cup" (FIAP × Aurora × Google), a entrega apresenta uma aplicação web 100% autoral (~10.000 linhas de código sem o uso de builders, templates ou frameworks CSS externos), responsiva, acessível, segura e com deploy online operacional com CI/CD via Vercel.

### 🌟 Pilares e Indicadores de Qualidade da Entrega Final:
- **Auditoria Estática Sênior:** 18 pontos de qualidade visual, acessibilidade, código e performance identificados e rigorosamente corrigidos.
- **Otimização Extrema de Performance:** Redução de mais de **85% no peso total dos ativos de imagem** (ex: primeira tela do hero reduzida de 834 KB para 50 KB — economia de 94%), servida em formato `.webp` com `<picture>` e fallback `.png`, utilizando `fetchpriority="high"` e `decoding="async"` para acelerar o LCP (Largest Contentful Paint).
- **Acessibilidade WCAG 2.1 AAA:** Validações manuais e automatizadas, menus acessíveis por teclado, atalhos de salto rápido (Skip Links - WCAG 2.4.1), botão *scroll-to-top* dinâmico, suporte a `prefers-reduced-motion` e suíte oficial VLibras.
- **Segurança em Camadas:** Sanitização ativa de entradas contra XSS, resiliência contra prompt-injection no chatbot, rate-limiting, controle de payload (10KB) e headers HTTP de proteção.
- **Arquitetura Híbrida de IA:** Backend Node.js/Express (`server.js`) para execução local e Serverless Function (`api/chat.js`) orquestrada via `vercel.json` em nuvem, ambas integradas ao SDK oficial do Google Gemini.

## 2. 🎯 Tabela Comparativa de Evolução e Impacto Técnico

| Módulo / Funcionalidade | Implementação Técnica na Etapa 3 | Impacto na Experiência & Performance |
| :--- | :--- | :--- |
| **Hero Image & Carrossel** | Redução da imagem LCP de 834 KB para 50 KB (94% menor) com formato `.webp` + `fetchpriority="high"`. | Carregamento da página principal instantâneo e nota alta no Core Web Vitals. |
| **Trusted Strip (Logos)** | Carrossel CSS infinito com 10 marcas, que pausa em `:hover` e respeita `@media (prefers-reduced-motion)`. | Prova social dinâmica sem causar desconforto visual a usuários com sensibilidade. |
| **Depoimentos em Vídeo** | 1 vídeo real produzido (573KB) + 3 placeholders com legendas `.vtt` (WebVTT) e Schema `VideoObject`. | Prova social acessível com SEO de vídeo otimizado. |
| **Simulador de ROI** | Calculadora bidirecional com sliders/inputs sincronizados via `rafThrottle`, gráfico SVG e region `aria-live`. | Tangibilização financeira do valor B2B com acessibilidade em tempo real. |
| **Formulário Multi-Etapas** | Validação inline com filtro de 22 domínios pessoais de e-mail e gerador de datas úteis dinâmico. | Captação qualificada de leads B2B e redução de fricção. |
| **Portal LGPD (`politicas.html`)** | Portal com 950 linhas de CSS dedicado, busca em tempo real, formulário de DPO (Art. 18 LGPD) gerando protocolo `AUR-XXXXXX`. | Conformidade jurídica completa e transparência sobre o escopo acadêmico. |
| **Inclusão & Suporte** | Widget oficial VLibras com avatar 3D + Chatbot IRIS flutuante com Google Gemini SDK. | Inclusão de pessoas surdas (LIBRAS) e atendimento consultivo por IA. |

## 3. 🧠 Detalhamento Técnico das Seções e Componentes

### 3.1 Cabeçalho Fixo e Navegação (`<header>` / `<nav>`)
- Menu fixo no topo com navegação por âncoras para 6 seções principais e botão CTA.
- Menu hambúrguer mobile com transição animada de ícones (`fa-bars` → `fa-xmark`), fechamento por tecla Escape, *click-outside* e restauração de foco (`botaoMenu.focus()`).
- **Atalhos de Acessibilidade (Skip Links - WCAG 2.4.1):** Menu oculto `<nav class="links-salto">` contendo 6 links de salto direto acionáveis via teclado (Tab).
- **Scroll-to-top Inteligente:** Botão flutuante acessível no canto inferior direito exibido dinamicamente após a rolagem da página.

### 3.2 Hero Section — Fundo Fluido Aurora Boreal
- Fundo temático Aurora Boreal em CSS puro com gradientes radiais animados (`@keyframes aurora-shift`) e campo de estrelas via `radial-gradient`.
- Carrossel de mockup com 8 telas dinâmicas do produto alternando a cada 8 segundos.
- Subtítulo com `color: white` sólido e `text-shadow` de contraste para legibilidade absoluta sobre os gradientes animados.

### 3.3 Faixa de Marcas Parceiras (Trusted Strip)
- Carrossel infinito CSS-only com `@keyframes parceiros-scroll` e duplicação de itens DOM (`aria-hidden="true"` nos clones).
- 10 logos tipográficos estilizados com cores autênticas via Design Tokens CSS (`--color-brand-nubank`, `--color-brand-ifood`, etc.).
- Disclaimer acadêmico explícito: *"Exemplos de marcas em cenários de estudo (Projeto Acadêmico FIAP)"*.

### 3.4 Seção de Problemas & Soluções (6 Cards)
- Estrutura espelhada em 3 pares de alto contraste (Planilhas isoladas → Painel em tempo real; Achismos → Avaliações objetivas; Turnover desavisado → Alertas preditivos).
- Ajuste de contraste `color-mix(in srgb, var(--color-neutral-black) 75%, transparent)` garantindo razão de contraste > 7:1 (WCAG AAA).

### 3.5 Como Funciona — Checklist Interativo
- 5 passos de implementação com checklist interativo (`role="checkbox"`, `aria-checked`) e toggle funcional via JavaScript.
- Ícones semânticos da biblioteca Font Awesome com `aria-hidden="true"`.

### 3.6 Depoimentos em Vídeo & Texto
- 4 vídeos-cases (1 vídeo real produzido de 573KB + 3 placeholders estilizados).
- Legendas acessíveis em WebVTT (`.vtt`) com `<track kind="captions" srclang="pt-BR">` e texto de fallback em `<p>`.
- Player customizado com pausa automática de vídeos concorrentes e proteção contra download (`controlsList="nodownload"`, `oncontextmenu="return false"`).
- Carrossel de texto com ARIA `tablist` e navegação circular por teclado (Setas, Home, End).

### 3.7 Simulador Interativo de ROI de Turnover
- Calculadora financeira com 3 parâmetros (Colaboradores, Salário Médio e Turnover %).
- Sincronização bidirecional instantânea (slider ↔ input) tratada com `debounce()` e `rafThrottle()`.
- Gráfico SVG dinâmico proporcional em 3 pilares: Recrutamento (30%), Onboarding (25%) e Produtividade Perdida (45%).
- Anúncio acessível para leitores de tela via `aria-live="polite"` e alternativa estática oculta (`sr-only`).
- Bloco de resiliência `<noscript>` estilizado para navegadores com execução de JavaScript desabilitada.

### 3.8 Métricas de Impacto & Metodologia
- 4 indicadores de alto impacto (-25% turnover, +40h/mês devolvidas, +15% engajamento, 3× retenção).
- Timeline vertical em 4 passos com gradientes e ícones representativos.

### 3.9 Fluxo de Implementação (Metodologia em 4 Passos) 
- Timeline vertical com 4 etapas visuais: Passo 1: Conheça seu time, Passo 2: Coloque os insights em prática, Passo 3: Acompanhamento especializado, Passo 4: Resultados nos números; 
- Ícones diferenciados por etapa com cores da paleta Aurora; 
- Linha inferior decorativa com gradiente da marca. 

### 3.10 Formulário de Captação Multi-Etapas
- **Etapa 1:** Filtro de e-mail corporativo bloqueando 22 domínios de e-mails pessoais (Gmail, Outlook, Yahoo, Hotmail, etc.) com revalidação contínua e suporte a `aria-invalid`.
- **Etapa 2:** Gerador dinâmico de datas úteis (`gerarDatasAgendamento`) excluindo finais de semana, 8 horários disponíveis, stepper com `role="progressbar"` (0% → 100%) e Toast notification com `aria-live="assertive"`.

### 3.11 FAQ (Perguntas Frequentes)
- 5 acordeões interativos com Schema.org `FAQPage` em JSON-LD com 3 perguntas indexáveis.

### 3.12 Newsletter 
- Input de e-mail com validação por regex e feedback inline; 
- Mensagem de erro acessível via aria-invalid e aria-describedby com aria-live="polite"; 
- Posicionada dentro do <main> (corrigido para semântica HTML5 correta). 

### 3.13 Rodapé Institucional 
- 3 blocos de navegação: Navegação, Recursos, Legal e Privacidade; 
- Dados de contato com placeholder acadêmico (+55 (11) 00000-0000); 
- Redes sociais com target="_blank", rel="noopener noreferrer" e aria-label descritivo em cada link; 
- Disclaimer acadêmico: Informação clara de que é um projeto FIAP/Enterprise Challenge; 
- Logo clicável no rodapé com link para a página inicial. 

### 3.14 Banner de Cookies (LGPD) 
- Texto contextualizado: "Projeto Acadêmico FIAP: Este site foi criado exclusivamente para fins educacionais de estudo. Os dados e marcas exibidos são ilustrativos."; 
- Consentimento gerenciado via localStorage.setItem('cookiesAccepted', 'true'); 
- Aparição com delay de 500ms para não interromper o carregamento visual da página.

### 3.15 Ferramentas Globais de Inclusão e Suporte (VLibras e Chatbot)
- **VLibras:** Integração ponta-a-ponta com a suíte oficial VLibras do Governo Federal. A ferramenta disponibiliza um avatar 3D interativo na lateral da tela capaz de traduzir todo o conteúdo textual e semântico do site para a Língua Brasileira de Sinais (LIBRAS), garantindo total aderência à Lei Brasileira de Inclusão.
-  **Chatbot IRIS (Assistente IA):** Implementação de um assistente conversacional inteligente posicionado no canto inferior. O widget de chat atua como um canal de suporte e conversão imediato, permitindo tirar dúvidas sobre a plataforma em tempo real sem abandonar a landing page. 
    - Arquitetura Híbrida de Backend: O Chatbot IRIS foi desenvolvido com suporte duplo de execução: servidor local Node.js/Express (server.js) para ambiente de desenvolvimento local, e Serverless Function (api/chat.js) orquestrada via vercel.json para o ambiente de produção em nuvem da Vercel (Configurado mas não funcional devido ao contexto educacional do projeto e custos adicionais de hospedagem). Ambas realizam a integração segura com a API do Google Gemini via SDK oficial. 

### 3.16 Portal de Políticas e Governança LGPD (`politicas.html`)
- Página autônoma com 950 linhas de CSS dedicado.
- Termos de Uso e Política de Privacidade estruturados com bases legais da LGPD.
- **Formulário de Direitos do Titular (Art. 18 LGPD):** Gera código de protocolo único `AUR-XXXXXX` para o solicitante.
- **Painel de Gestão de Cookies:** Controle interativo de consentimento via `localStorage`.
- **Busca em Tempo Real:** Filtro imediato de cláusulas por palavra-chave (ex: "Gemini", "turnover", "cookies") com highlight visual.

## 4. ♿ Recursos de Acessibilidade e Inclusão (WCAG 2.1 AAA)

- **Menu de Links de Salto (Skip Links):** `<nav class="links-salto">` no início do `<body>`.
- **Navegação Por Teclado:** Suporte completo a Tab, Shift+Tab, Enter, Espaço, Setas e Escape em menus, carrosséis, formulários e acionadores.
- **Trap de Foco & Foco Restaurado:** Foco mantido dentro de modais/menus ativos e devolvido ao botão acionador ao fechar (`botaoMenu.focus()`).
- **Suíte VLibras:** Avatar 3D do Governo Federal integrado para tradução em LIBRAS.
- **Contraste Extremo:** Cores e textos auditados com contraste mínimo de 7:1 (WCAG AAA).
- **Animações Reduzidas:** Respeito integral às preferências do usuário via `@media (prefers-reduced-motion: reduce)`.

## 5. 🤖 Uso Ético de Inteligência Artificial no Desenvolvimento

Durante todo o ciclo de vida do projeto, ferramentas de Inteligência Artificial Generativa foram empregadas como aceleradores de produtividade e apoio técnico:

1. **Geração de Vídeos Placeholders:** Criação de atores e cenários para os depoimentos fictícios de empresas (Nubank, iFood, TOTVS).
2. **Validações e Code Review:** Pair programming com LLMs para auditoria de WCAG, Core Web Vitals e prevenção de vulnerabilidades.
3. **Engenharia de Prompt (Chatbot IRIS):** Testes de *red teaming* contra injeções de prompt e estruturação da persona da IRIS via SDK do Google Gemini.
4. **Massa de Dados e Roteiros:** Apoio na criação de textos verossímeis B2B, roteiros de vídeos (`00_prompts_videos_depoimentos.md`), FAQs e legendas WebVTT.

## 6. 🛡️ Segurança, Governança e Backend Educacional

- **Arquitetura de Backend Híbrida:** Servidor local Node.js/Express (`server.js`) para desenvolvimento local e Vercel Serverless Function (`api/chat.js`) para ambiente em nuvem.
- **Esclarecimento do Backend em Produção:** O repositório contém toda a **lógica de backend construída e pronta** no código. No entanto, no deploy online na Vercel, a aplicação executa em modo de demonstração simulada para evitar custos de infraestrutura e proteger chaves de API.
- **Sanitização & Defesa em Profundidade:** Escape rigoroso de caracteres contra XSS, limitação de payload a 10KB, restrição de prompts a 500 caracteres e envio de Headers HTTP de proteção (`X-Frame-Options`, `Content-Security-Policy`, `Referrer-Policy`).

## 7. 📚 Referências Bibliográficas e Técnicas

- **MDN Web Docs (Mozilla):** Semântica HTML5, formulários e JavaScript nativo ES6+. [Acessar MDN](https://developer.mozilla.org/pt-BR/)
- **W3C e Diretrizes WCAG 2.1:** Especificações internacionais de acessibilidade web. [Acessar WCAG](https://www.w3.org/TR/WCAG21/)
- **Web.dev (Google):** Otimização de imagens, Core Web Vitals e performance web. [Acessar Web.dev](https://web.dev/)
- **Documentação Oficial do Google Gemini API:** Integração do SDK `@google/generative-ai` e System Prompts. [Acessar Google AI](https://ai.google.dev/docs)
- **A11y Project:** Guias práticos sobre acessibilidade e leitores de tela. [Acessar A11y Project](https://www.a11yproject.com/)
- **Material de Aula FIAP:** Diretrizes do Enterprise Challenge e gestão de Sprints corporativas.
