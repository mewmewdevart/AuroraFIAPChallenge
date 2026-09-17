<div align="center">
  <img src="https://github.com/user-attachments/assets/b1d64065-5c87-48d7-a9a4-e271366ac246" width="300" alt="Aurora Logo" />

  <h1>🚀 Landing Page - Aurora </h1>
  
  <p>
    <b>People First Cup - Enterprise Challenge (FIAP x Aurora x Google)</b>
  </p>

  <p>
    Uma plataforma HR Tech de People Analytics e Gestão de Performance que transforma dados de desempenho, cultura e engajamento em insights valiosos para líderes e gestores tomarem as melhores decisões.
  </p>

  <p align="center">
    <a href="https://aurora-ctrl-people-2026.vercel.app/">🔗 Acessar o Projeto (Deploy na Vercel)</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Etapa-03%20(Entrega%20Final)-11BCAA?style=for-the-badge&logo=headspace&logoColor=white" alt="Etapa 3 - Entrega Final" />
    <img src="https://img.shields.io/badge/Status-Conclu%C3%ADdo-11BCAA?style=for-the-badge&logo=github&logoColor=white" alt="Status Concluído" />
    <img src="https://img.shields.io/badge/Projeto-Acad%C3%Aamico-11BCAA?style=for-the-badge&logo=bookstack&logoColor=white" alt="Projeto Acadêmico" />
  </p>
</div>

<br>

## 📌 Resumo do Projeto

Este projeto consolida a **Entrega Final (Etapa 3) do Enterprise Challenge (People First Cup: Parceria FIAP × Aurora × Google)**. A solução culmina em uma **aplicação web B2B de People Analytics 100% autoral, funcional, responsiva, acessível (WCAG 2.1 AAA), segura e com deploy online operacional**.

O projeto entrega uma experiência B2B completa (~10.000 linhas de código sem uso de builders, templates ou frameworks CSS externos), articulando a proposta de valor B2B por meio de um fluxo narrativo PAS (Problem → Agitate → Solve), simulador de ROI interativo com gráfico SVG dinâmico, formulário de conversão multi-etapas com filtro corporativo e gerador de datas úteis, assistente virtual IRIS com IA (Google Gemini SDK), portal de governança LGPD (`politicas.html`) e otimização extrema de performance (>85% no peso dos ativos visuais).

<img width="1896" height="862" alt="Printscreen do site Aurora" src="https://github.com/user-attachments/assets/7b3d289f-5c39-4e6f-a86e-3729c32fe905" />


## 💡 Principais Soluções e Diferenciais da Aurora

* **📊 People Analytics Centralizado:** Cruza dados de clima, engajamento e desempenho em um dashboard integrado, facilitando uma visão ampla sobre o cenário da organização.
* **🎯 Planos de Ação Personalizados:** Transforma dados e insights em recomendações práticas e planos de desenvolvimento direcionados às necessidades de cada equipe.
* **📈 Avaliações Baseadas em Dados:** Apoia decisões de desempenho, promoção e sucessão por meio de análises objetivas e históricos, reduzindo decisões baseadas em achismos.
* **🔮 Análise Preditiva de Turnover:** Identifica sinais e riscos de saída de talentos, permitindo que a liderança atue preventivamente na retenção.
* **👥 Gestão Estratégica de Liderança e Times:** Oferece relatórios e insights para apoiar líderes na compreensão de suas equipes e na definição de ações mais assertivas.
* **💰 Mensuração de Impacto e ROI:** Simula o custo do turnover e permite visualizar a economia potencial gerada pela redução de desligamentos, tornando o impacto da gestão de pessoas mensurável.
* **🤖 Assistente Virtual IRIS com IA:** Chatbot integrado à API do Google Gemini via SDK oficial (`@google/generative-ai`) com suporte local (Express) e nuvem (Vercel Serverless Function - [Não aplicado mas configurado por se tratar de um projeto academico e custar dinheiro a hospedagem]), incluindo fallback e resiliência.
* **🛡️ Governança, Privacidade e LGPD:** Portal dedicado (`politicas.html`) com busca em tempo real, protocolo automático de direitos do titular (Art. 18 LGPD) e gestão interativa de cookies.
* **♿ Acessibilidade como Pilar (WCAG 2.1 AAA):** Navegação completa por teclado, foco visível, `aria-live`, `prefers-reduced-motion`, atalhos de salto rápido (Skip Links), botão topo dinâmico e integração com o widget VLibras.
* **🚀 SEO/AEO e Performance Extrema:** Marcação de dados estruturados JSON-LD (`Organization`, `WebSite`, `SoftwareApplication`, `VideoObject`, `FAQPage`), otimização de imagens hero (redução de 94% no peso LCP) e headers de segurança HTTP.


## 🎓 Escopo Acadêmico e Arquitetura de Backend

* **Projeto Acadêmico FIAP:** Desenvolvido exclusivamente para fins de avaliação educacional no Enterprise Challenge (FIAP × Aurora × Google) pelo **Grupo Ctrl + People**.
* **Arquitetura de Backend (Lógica vs. Produção):** O código-fonte contém toda a **lógica de backend construída e estruturada** (servidor Node.js/Express em `server.js` e Serverless Function `api/chat.js` para Vercel com integração ao SDK do Google Gemini, sanitização anti-XSS, rate limiting e protocolos LGPD).
* **Modo de Demonstração em Produção:** No ambiente publicado na Vercel, o projeto opera em modo de demonstração simulada para fins educacionais, evitando custos de infraestrutura e protegendo credenciais de API.


## 📖 Navegação da Documentação

Para manter a organização e escalabilidade do repositório, o detalhamento das etapas, justificativas de design e decisões técnicas estão documentados separadamente na pasta [`docs/`](./docs/):

| Etapa | Documentação | Descrição |
| :---: | :--- | :--- |
| **01** | [**Sprint 01 - Protótipo da Landing Page**](./docs/01_sprint.md) | Estruturação de conteúdo, identidade visual, acessibilidade e decisões técnicas. |
| **02** | [**Sprint 02 - Protótipo Funcional & Deploy**](./docs/02_sprint.md) | Deploy online, formulário de captação funcional, calculadora de ROI e assistente IRIS. |
| **03** | [**Sprint 03 - Entrega Final & Otimizações Sênior**](./docs/03_sprint.md) | Entrega final, otimização de performance (>85%), WCAG 2.1 AAA, auditoria estática e backend de IA. |


## 📂 Estrutura do Projeto

```bash
.
├── api/              # Serverless Function da Vercel (api/chat.js - Chatbot Gemini)
├── assets/
│   ├── css/          # Estilos e Design System (style.css, politicas.css)
│   ├── img/          # Imagens otimizadas (.webp, logos, favicon, mockups)
│   ├── js/           # Scripts autorais (main.js, politicas.js, etc.)
│   └── video/        # Vídeos institucionais e legendas WebVTT (.vtt)
├── docs/             # Documentação detalhada das Sprints (01, 02 e 03)
├── .env.example      # Modelo de configuração de variáveis de ambiente
├── .gitignore        # Arquivos ignorados pelo Git (inclui .env)
├── index.html        # Estrutura principal da Landing Page Aurora
├── politicas.html    # Portal de Políticas, Privacidade e Governança LGPD
├── package.json      # Dependências do backend Node.js (Express & Gemini SDK)
├── server.js         # Servidor Express — integração local com a API do Google Gemini
├── vercel.json       # Configuração de orquestração para deploy Serverless na Vercel
├── LICENSE           # Licença do projeto
└── README.md         # Documentação principal da entrega final
```


## 🛠️ Tecnologias Utilizadas

A stack foi escolhida priorizando a performance, acessibilidade e controle total sobre a interface:

**Frontend:**
- **HTML5 Semântico** (Acessível WCAG 2.1 AAA)
- **CSS3 Puro** (Custom Properties, Design System, Responsividade, Flexbox/Grid)
- **JavaScript Vanilla** (sem frameworks externos)
- **Figma / Canva** (Prototipação e Identidade Visual)

**Backend & IA (Chatbot IRIS):**
- **Node.js** com **Express** (`server.js` para ambiente local)
- **Vercel Serverless Functions** (`api/chat.js` para produção na Vercel)
- **Google Gemini API** (`@google/generative-ai`) — SDK oficial do Google
- **dotenv** & **cors** — segurança e variáveis de ambiente


## 🚀 Como Executar Localmente

### 🌐 Opção 1 — Landing Page (Modo Cliente / Demonstrativo)

**Pré-requisitos:** Git e um navegador web atualizado.

1. Clone o repositório:
```bash
git clone https://github.com/mewmewdevart/AuroraFIAPChallenge.git
```

2. Acesse a pasta do projeto:
```bash
cd AuroraFIAPChallenge/
```

3. Abra o `index.html` diretamente no navegador ou via extensão *Live Server* do VSCode.

> O chatbot **IRIS** funcionará em modo offline com respostas pré-cadastradas.


### 🤖 Opção 2 — Execução com Chatbot IRIS Ativo (API Google Gemini)

**Pré-requisitos adicionais:** [Node.js](https://nodejs.org/) instalado (v18+).

1. Clone e acesse a pasta do projeto (passos acima).

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` copiando o modelo de exemplo:
```bash
cp .env.example .env
```

4. Insira sua chave de API do Google Gemini no arquivo `.env`:
```env
GEMINI_API_KEY=sua_chave_aqui
```
> 🔑 Obtenha uma chave gratuitamente no [Google AI Studio](https://aistudio.google.com/).

5. Inicie o servidor backend local:
```bash
npm start
```

6. Acesse `http://localhost:3000` ou abra `index.html`. O chatbot IRIS responderá em tempo real através da API do Google Gemini.


## 👥 Integrantes — Grupo Ctrl + People

* **Ingrid Silva de Lima** — RM 570149 — [rm570149@fiap.com.br](mailto:rm570149@fiap.com.br)
* **Larissa Cristina Benedito** — RM 570970 — [rm570970@fiap.com.br](mailto:rm570970@fiap.com.br)
* **Mayla Mayumi Motobe** — RM 571213 — [rm571213@fiap.com.br](mailto:rm571213@fiap.com.br)


## 📚 Referências

* **MDN Web Docs (Mozilla):** HTML5 semântico, acessibilidade ARIA e APIs nativas JS.
* **W3C e Diretrizes WCAG 2.1:** Requisitos de acessibilidade digital.
* **Web.dev (Google):** Otimização de imagens e Core Web Vitals.
* **Google Gemini API Documentation:** SDK oficial e engenharia de prompts.
* **ABNT NBR 17225:2025:** Acessibilidade em interfaces digitais.
* **Material de Aula FIAP:** Diretrizes do Enterprise Challenge e gestão de Sprints.
