# 📖 Enterprise Challenge - Etapa 1: Protótipo

## 🔗 Acessos
- 🌐 **Deploy:** [Aurora Landing Page](https://mewmewdevart.github.io/AuroraFIAPChallenge/)
- 💻 **Repositório:** [GitHub](https://github.com/mewmewdevart/AuroraFIAPChallenge)

## 👥 Integrantes
- **Ingrid Silva de Lima** - RM570149
- **Larissa Cristina Benedito** - RM570970
- **Mayla Mayumi Motobe** - RM571213

---

## 1. 📌 Introdução e Escopo do Desafio
A primeira etapa do **Enterprise Challenge (People First Cup)** marca o início da construção da landing page da **Aurora**, uma plataforma de People Analytics B2B. 

O foco desta etapa é estruturar o conteúdo, definir a identidade visual e criar uma experiência de navegação convincente para o público B2B antes de avançar para o deploy final e as funcionalidades complexas.

**O que deve estar presente na entrega:**
- Estrutura geral da landing page com seções adequadas para comunicar a solução.
- Identidade visual aplicada (paleta de cores, tipografia, tom visual).
- Formulário de captação de lead presente.
- Navegação funcional entre as seções (âncoras).

## 2. 🎯 Público-Alvo
Líderes de RH (CHROs, Heads de Pessoas, BPs Sênior), CEOs e gestores de equipe em empresas de médio e grande porte, com ao menos 50 colaboradores, principalmente nos setores de Tecnologia, Serviços, Indústria e Varejo.

## 3. 🧠 Justificativa das Decisões Tomadas

### 3.1 Estrutura e Arquitetura da Informação
A Landing Page foi organizada seguindo o framework narrativo **PAS (Problem → Agitate → Solve)**, conduzindo o visitante por uma jornada lógica de descoberta:

- **Menu de navegação:** Fixo no topo, com acesso direto às seções principais e botão CTA.
- **Hero Section:** Primeiro contato do visitante com o título da proposta de valor e um mockup estático do dashboard.
- **Carrossel de Logos:** Faixa com rolagem exibindo logos de empresas reconhecidas, atuando como prova social.
- **A Solução:** Cards apresentando as principais dores do público-alvo (dados espalhados, achismo, turnover) e a solução correspondente.
- **Benefícios e Depoimentos:** Ganhos estratégicos suportados por relatos reais de clientes.
- **Desafios e CTA:** Apresentação de problemas de gestão seguida de um convite para conversão.
- **Resultados e ROI:** Blocos de métricas evidenciando o valor em números.
- **Fluxo de Uso:** Explicação visual do funcionamento da Aurora em 4 passos.
- **Formulário de Conversão:** Captação de leads interessados em demonstrações.
- **FAQ e Footer:** Perguntas frequentes para reduzir objeções e links úteis.

### 3.2 Identidade Visual
Criada a partir das diretrizes da marca, visando inovação, confiança e profissionalismo analítico:
- **Paleta de Cores:** Base institucional (`#6a509d`, `#7e61a7`), com destaques vibrantes (`#cf4793`, `#31b4a6`). Gradientes foram aplicados para evidenciar chamadas de ação.
- **Tipografia:** Uso da família **Outfit** (Google Fonts), trazendo um ar contemporâneo e tecnológico. Pesos variados garantem forte hierarquia visual.
- **Iconografia:** Ícones em estilo "line" usando *Font Awesome 6*, garantindo estética minimalista.
- **Tom Visual:** Utilização de áreas de contraste, superfícies modernas e elementos visuais de dashboard para destacar o caráter de "People Analytics".

### 3.3 Decisões Técnicas
- **Stack:** HTML5 semântico, CSS3 (variáveis customizadas) e JavaScript vanilla para interatividade. Frameworks pesados foram evitados para garantir máxima performance.
- **CSS Architecture:** Arquitetura limpa usando variáveis CSS para padronização global.
- **Responsividade:** Breakpoints otimizados para 992px, 768px e 576px.
- **SEO e LGPD:** Inclusão de Meta tags, Open Graph, JSON-LD e Banner de consentimento de cookies.

## 4. ♿ Recursos de Acessibilidade
- **Semântica:** Uso apropriado de tags HTML (`<nav>`, `<main>`, `<section>`, `<details>`, `<summary>`).
- **Contraste:** Combinações de cores que atendem às recomendações WCAG 2.1.
- **Formulários:** Integração adequada de `id`, `placeholder` e atributos `aria-label`.
- **Navegação:** Design inteiramente responsivo e botão *Scroll To Top* para facilitar movimentação vertical.

## 5. 🚀 Evoluções Previstas
Caminhos futuros identificados para a plataforma:
- Aumentar áreas de respiro e uso de superfícies claras para maior contraste e foco.
- Evolução dos atributos ARIA e suporte pleno para navegação por teclado com foco visível customizado.
- Versão interativa do mockup do dashboard na Hero Section.
- Inclusão do VLibras (tradução automática em Libras).
- Aprimorar o SEO voltado ao contexto de **AEO (Answer Engine Optimization)** e transformá-la em um PWA.
- Inclusão de um Chatbot e atalhos diretos para atendimento via WhatsApp.