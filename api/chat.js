const { GoogleGenerativeAI } = require('@google/generative-ai');

function sanitizarEntrada(texto) {
  if (typeof texto !== 'string') return '';
  return texto
    .trim()
    .slice(0, 500)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

module.exports = async function handler(req, res) {
  // Configuração de CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido. Utilize POST.' });
  }

  try {
    const { mensagem } = req.body || {};

    if (!mensagem || typeof mensagem !== 'string') {
      return res.status(400).json({ erro: 'Mensagem inválida ou ausente.' });
    }

    const mensagemSanitizada = sanitizarEntrada(mensagem);

    if (mensagemSanitizada.length === 0) {
      return res.status(400).json({ erro: 'A mensagem não pode conter apenas caracteres especiais ou vazios.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('AVISO: A variável GEMINI_API_KEY não está configurada no ambiente.');
      return res.status(500).json({ erro: 'Chave de API do Gemini não configurada nas variáveis de ambiente da Vercel.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const instrucaoSistema =
      "Você é a IRIS, a assistente virtual inteligente da plataforma Aurora (uma solução premium de People Analytics e Gestão de Performance). " +
      "Seu nome é inspirado na deusa do arco-íris e nas cores da Aurora Boreal, conectando com o visual vibrante da nossa plataforma. " +
      "Seu objetivo é ajudar os usuários a entenderem como a Aurora ajuda empresas e equipes de RH a tomarem decisões baseadas em dados, reduzir turnover e aumentar engajamento. " +
      "Responda em português brasileiro. Seja sempre extremamente profissional, cordial, concisa e focada em ajudar. " +
      "Se o usuário perguntar algo fora do escopo de RH, People Analytics, Gestão de Performance ou sobre a própria Aurora, responda gentilmente que seu foco é ajudar com dúvidas sobre a Aurora e People Analytics.";

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: instrucaoSistema
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: mensagemSanitizada }] }],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      }
    });

    const respostaTexto = result.response.text();
    return res.status(200).json({ resposta: respostaTexto });

  } catch (error) {
    console.error('Erro na integração com o Gemini:', error);
    return res.status(500).json({ erro: 'Erro interno ao processar a resposta.' });
  }
};
