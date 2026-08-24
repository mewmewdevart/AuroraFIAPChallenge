const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de CORS restrita: apenas origens locais podem chamar a API.
// Em produção, adicione aqui o domínio real do seu site (ex: 'https://meusite.com.br')
const origensPermitidas = [
  'http://localhost',
  'http://127.0.0.1',
  'null' // Necessário para abrir index.html diretamente via file:// no navegador
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origensPermitidas.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  },
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

// Limite de tamanho do body JSON para prevenir ataques de payload excessivo (DoS)
app.use(express.json({ limit: '10kb' }));

// Validar se a chave de API do Gemini existe
if (!process.env.GEMINI_API_KEY) {
  console.warn("AVISO: A variável GEMINI_API_KEY não está configurada no arquivo .env.");
}

// Inicializar a API do Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");

// Função para sanitizar strings de entrada (prevenir XSS e injeção simples)
function sanitizarEntrada(texto) {
  if (typeof texto !== 'string') return '';
  return texto
    .trim()
    .slice(0, 500) // Limita a 500 caracteres por segurança e economia de tokens
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Rota do Chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { mensagem } = req.body;

    if (!mensagem || typeof mensagem !== 'string') {
      return res.status(400).json({ erro: 'Mensagem inválida ou ausente.' });
    }

    const mensagemSanitizada = sanitizarEntrada(mensagem);

    if (mensagemSanitizada.length === 0) {
      return res.status(400).json({ erro: 'A mensagem não pode conter apenas caracteres especiais ou vazios.' });
    }

    const instrucaoSistema =
      "Você é a IRIS, a assistente virtual inteligente da plataforma Aurora (uma solução premium de People Analytics e Gestão de Performance). " +
      "Seu nome é inspirado na deusa do arco-íris e nas cores da Aurora Boreal, conectando com o visual vibrante da nossa plataforma. " +
      "Seu objetivo é ajudar os usuários a entenderem como a Aurora ajuda empresas e equipes de RH a tomarem decisões baseadas em dados, reduzir turnover e aumentar engajamento. " +
      "Responda em português brasileiro. Seja sempre extremamente profissional, cordial, concisa e focada em ajudar. " +
      "Se o usuário perguntar algo fora do escopo de RH, People Analytics, Gestão de Performance ou sobre a própria Aurora, responda gentilmente que seu foco é ajudar com dúvidas sobre a Aurora e People Analytics.";

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction: instrucaoSistema
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: mensagemSanitizada }] }],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      }
    });

    const respostaTexto = result.response.text();
    res.json({ resposta: respostaTexto });

  } catch (error) {
    // Nunca expor detalhes internos do erro para o cliente
    console.error('Erro na integração com o Gemini:', error);
    res.status(500).json({ erro: 'Erro interno ao processar a resposta.' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor da IRIS rodando na porta ${PORT}`);
});
