# 📖 Enterprise Challenge - Etapa 2: Protótipo Funcional

Este markdown é um resumo do PDF entregue na atividade!

## 🔗 Acessos
- 🌐 **Deploy Principal:** [Vercel](https://aurora-ctrl-people-2026.vercel.app/)
- 🌐 **Deploy Alternativo:** [GitHub Pages](https://mewmewdevart.github.io/AuroraFIAPChallenge)
- 💻 **Repositório:** [GitHub](https://github.com/mewmewdevart/AuroraFIAPChallenge)
- ⚙️ **Backend:** Node.js (Servidor Express local temporário)

## 👥 Integrantes
- **Ingrid Silva de Lima** - RM570149
- **Larissa Cristina Benedito** - RM570970
- **Mayla Mayumi Motobe** - RM571213

## 1. 📌 Introdução e Evolução do Projeto
Na Etapa 2, o projeto evoluiu da prototipação estática para uma **aplicação web completa, 100% interativa, responsiva, acessível e com deploy online**. O foco central é comunicar a proposta de valor B2B, gerar credibilidade e converter visitantes em leads por meio de um formulário funcional.

## 2. 🎯 Evoluções e Implementações Principais
Todas as seções planejadas na Etapa 1 foram implementadas em código funcional e enriquecidas:
- **Carrossel de Empresas (Trusted Strip):** CSS infinito e contínuo com 10 marcas reais.
- **Depoimentos em Vídeo:** Pausa automática de vídeos concorrentes e links diretos para LinkedIn.
- **Simulador de ROI (Interativo):** Calculadora de custo de turnover com gráfico SVG comparativo atualizado em tempo real e acessibilidade dinâmica (`aria-live`).
- **Formulário de Captação (100% Funcional):** Validação em tempo real, filtro de e-mail corporativo, seletores de data/hora e Toast de sucesso animado.
- **Página de Políticas:** Portal independente para transparência sobre Segurança, LGPD e Privacidade.
- **Responsividade:** Breakpoints ajustados para mobile (a partir de 320px) até desktops ultrawide (>1440px), com menu hamburguer interativo.

## 3. 🧠 Justificativa das Decisões Tomadas

### 3.1 Estrutura e Arquitetura (Framework PAS)
A Landing Page segue a jornada **Problem → Agitate → Solve**:
- **Menu e CTA Fixos:** Reduzem a fricção de conversão e antecipam dúvidas.
- **Hero Section (Aurora Boreal):** Efeito visual fluido cria memorabilidade imediata, ancorado pelo mockup do dashboard (prova de produto).
- **Problemas & Soluções (Cards):** Espelhamento das dores do RH para gerar identificação rápida no decisor B2B.
- **Resultados e Métricas:** Uso deliberado de números (ex: 25% redução, 40h devolvidas) para falar a linguagem de CFOs/COOs.
- **Fluxo de 4 Passos:** Simplifica a percepção técnica da solução, contornando a objeção de complexidade na adoção de novos softwares.

### 3.2 Design e Arquitetura da Página de Políticas
- **Consistência Visual:** Navbar mantida com o mesmo estilo, garantindo a sensação de continuidade no ecossistema da Aurora.
- **Hero de Buscas:** Barra de pesquisa em tempo real para due diligence corporativa ágil em termos como "LGPD" ou "Cookies".
- **Sidebar com ScrollSpy:** Facilita a navegação nos textos longos jurídicos.
- **Painel de Cookies e Formulário LGPD (Art. 18):** Práticas reais de conformidade, demonstrando maturidade e segurança para o comprador.

## 4. ♿ Acessibilidade Avançada
Acessibilidade foi um pilar central desta etapa:
- **Tab Trap** implementado nos modais (Chatbot e Menu Mobile).
- **Foco visível** (`:focus-visible`) e **Skip Link** oculto.
- Integração com **VLibras Widget** em todas as páginas para tradução automática em Língua Brasileira de Sinais.
- Validação acessível nos formulários via `aria-describedby` e `aria-live`.
- Desativação de animações via `prefers-reduced-motion`.

## 5. 🚀 Diferenciais Inovativos
- **Chatbot IRIS com IA:** Assistente flutuante integrado à **API do Google Gemini** via Node.js, com *fallback local* e proteção contra prompt injection, respondendo sobre People Analytics.
- **Simulador de ROI de Mercado:** Transforma o problema do turnover em impacto financeiro com transparência nas premissas e sem "caixas pretas", aumentando o engajamento ativo do lead.
- **Integração com VLibras Widget:** Inclusão da suíte VLibras em todas as páginas para tradução automática em Língua Brasileira de Sinais, promovendo a inclusão de pessoas surdas.
- **Portal de Governança (politicas.html):** Aplicação de *Privacy by Design* com gestão de consentimento de cookies interativa e simulador de exercício de direitos dos titulares (LGPD).
- **SEO/AEO Avançado:** Uso de JSON-LD estruturado, Open Graph, Twitter Cards e tags canônicas para otimização em motores de busca e inteligência artificial.
- **Segurança no Backend:** Proteção reforçada via Node.js com Headers HTTP (X-Frame-Options, CSP, Referrer-Policy), sanitização XSS e rate limiting em memória.
