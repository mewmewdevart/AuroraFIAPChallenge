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
    <a href="https://mewmewdevart.github.io/AuroraFIAPChallenge/">🔗 Acessar o Projeto (Deploy)</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Etapa-01-11BCAA?style=for-the-badge&logo=headspace&logoColor=white" alt="Etapa 1" />
    <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-11BCAA?style=for-the-badge&logo=github&logoColor=white" alt="Status" />
    <img src="https://img.shields.io/badge/Projeto-Acadêmico-11BCAA?style=for-the-badge&logo=bookstack&logoColor=white" alt="Acadêmico" />
  </p>
</div>

<br>

## 📌 Resumo do Projeto

Este projeto é a entrega da **Etapa 1 do Enterprise Challenge**, cujo foco é a construção de uma **Landing Page B2B** para a plataforma **Aurora**. 

O objetivo principal desta fase foi estruturar a narrativa, definir a identidade visual e criar uma experiência de navegação fluida e atrativa (utilizando o framework narrativo PAS - *Problem, Agitate, Solve*). A página busca comunicar de forma clara a proposta de valor, captando a atenção de líderes de RH e conduzindo-os ao agendamento de uma demonstração.

<img width="1900" height="870" alt="image" src="https://github.com/user-attachments/assets/1890ddec-c0de-4cd3-b25b-4199b33db51f" />


## 💡 Principais Soluções da Aurora

A landing page destaca as principais soluções que a plataforma oferece:
- **📊 Dados Centralizados:** Reúne informações sobre performance, clima e engajamento em um único painel.
- **🎯 Planos de Ação Direcionados:** Auxilia na criação de planos de desenvolvimento personalizados com recomendações baseadas em dados.
- **⚖️ Avaliações baseadas em dados:** Traz clareza para decisões de promoção, aumento ou sucessão.
- **📉 Redução do Turnover:** Identifica riscos de saída com análises comportamentais e inteligência artificial.

## 📖 Navegação da Documentação

Para manter a organização e escalabilidade do repositório, o detalhamento das etapas, justificativas de design e decisões técnicas estão documentados separadamente:

| Etapa | Documentação | Descrição |
| :---: | :--- | :--- |
| **01** | [**Sprint 01 - Protótipo da Landing Page**](./docs/01_sprint.md) | Estruturação de conteúdo, identidade visual, acessibilidade e decisões técnicas. |
| **02** | [**Sprint 02 - Protótipo Funcional & Deploy**](./docs/02_sprint.md) | Deploy online, formulário de captação funcional, calculadora de ROI e assistente IRIS. |

## 📂 Estrutura do Projeto

```bash
.
├── assets/
│   ├── css/          # Estilos e formatação visual (variáveis CSS e Design System)
│   ├── img/          # Imagens, logos e mockups
│   ├── js/           # Scripts de interatividade (main.js + chatbot.js)
│   └── video/        # Arquivos de vídeo utilizados na página
├── docs/             # Documentação do projeto (sprints, pdfs)
├── .env.example      # Modelo de configuração de variáveis de ambiente
├── .gitignore        # Arquivos ignorados pelo Git (inclui .env com a chave de API)
├── index.html        # Estrutura principal da Landing Page
├── package.json      # Dependências do backend Node.js (chatbot IRIS)
├── server.js         # Servidor Express — integração com a API do Google Gemini
├── LICENSE           # Licença do projeto
└── README.md         # Documentação principal do repositório
```

## 🛠️ Tecnologias Utilizadas

A stack foi escolhida priorizando a performance, acessibilidade e controle total sobre a interface:

**Frontend:**
- **HTML5** (Semântico e Acessível — WCAG)
- **CSS3** (Custom Properties, Design System, Responsividade, Flexbox/Grid)
- **JavaScript** (Vanilla — sem frameworks)
- **Figma / Canva** (Prototipação e Identidade Visual)

**Backend (Chatbot IRIS):**
- **Node.js** com **Express** — servidor local da API
- **Google Gemini API** (`@google/generative-ai`) — IA generativa
- **dotenv** — gerenciamento seguro de variáveis de ambiente
- **cors** — controle de origens permitidas

## 🚀 Como Executar

### 🌐 Opção 1 — Apenas a Landing Page (sem chatbot com IA)

**Pré-requisitos:** Git e um navegador web atualizado.

1. Clone o repositório:
```bash
git clone https://github.com/mewmewdevart/AuroraFIAPChallenge.git
```

2. Acesse a pasta do projeto:
```bash
cd AuroraFIAPChallenge/
```

3. Abra o `index.html` no navegador ou use a extensão *Live Server* do VSCode.

> O chatbot **IRIS** funcionará no modo offline (respostas pré-cadastradas), sem necessidade do backend.

---

### 🤖 Opção 2 — Com o Chatbot IRIS completo (IA via Gemini)

**Pré-requisitos adicionais:** [Node.js](https://nodejs.org/) instalado (v18+).

1. Clone e acesse o projeto (mesmos passos acima).

2. Instale as dependências do backend:
```bash
npm install
```

3. Crie o arquivo de configuração copiando o exemplo:
```bash
cp .env.example .env
```

4. Abra o arquivo `.env` e adicione sua chave de API do Google Gemini:
```env
GEMINI_API_KEY=sua_chave_aqui
```
> 🔑 Obtenha uma chave gratuitamente em [Google AI Studio](https://aistudio.google.com/).

5. Inicie o servidor backend:
```bash
npm start
```

6. Com o servidor rodando em `http://localhost:3000`, abra o `index.html` no navegador. O chatbot IRIS estará totalmente funcional com respostas geradas pela IA do Google.

> ⚠️ **Segurança:** O arquivo `.env` está listado no `.gitignore` e **nunca** será enviado ao repositório público. Nunca compartilhe sua chave de API.

## 👥 Integrantes

* **Ingrid Silva de Lima** — [rm570149@fiap.com.br](mailto:rm570149@fiap.com.br)
* **Larissa Cristina Benedito** — [rm570970@fiap.com.br](mailto:rm570970@fiap.com.br)
* **Mayla Mayumi Motobe** — [rm571213@fiap.com.br](mailto:rm571213@fiap.com.br)

## 📚 Referências

* **ABNT NBR 17225:2025** - Acessibilidade em interfaces digitais.
* **NIELSEN, Jakob.** - 10 Usability Heuristics for User Interface Design.
