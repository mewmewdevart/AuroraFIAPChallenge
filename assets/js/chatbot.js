document.addEventListener('DOMContentLoaded', () => {
    inicializarChatbot();
});

function inicializarChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotBadge = document.getElementById('chatbot-badge');

    if (!chatbotToggle || !chatbotWindow || !chatbotClose || !chatbotForm || !chatbotInput || !chatbotMessages) {
        return;
    }

    const isLocalCustomPort = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && 
        window.location.port !== '3000' && window.location.port !== '';
    const API_URL = isLocalCustomPort ? 'http://localhost:3000/api/chat' : '/api/chat';

    // Base de Conhecimento Local (Perguntas Frequentes - Resposta Instantânea)
    const FAQ_DATABASE = {
        aurora: {
            titulo: "O que é a Aurora?",
            resposta: "A <strong>Aurora</strong> é uma plataforma de People Analytics e Gestão de Performance que cruza dados de clima, engajamento e desempenho para gerar insights automáticos para equipes de RH e líderes tomarem melhores decisões de gestão."
        },
        turnover: {
            titulo: "Como ela reduz turnover?",
            resposta: "A Aurora utiliza algoritmos avançados para analisar padrões de engajamento, feedbacks e histórico de avaliações. Ela detecta precocemente o risco de saída de colaboradores chave e sugere planos de ação preventivos e direcionados."
        },
        integrantes: {
            titulo: "Quais os integrantes do grupo?",
            resposta: "Este projeto foi desenvolvido pelo seguinte time da FIAP:<br>• <strong>Ingrid Silva de Lima</strong> (RM570149)<br>• <strong>Larissa Cristina Benedito</strong> (RM570970)<br>• <strong>Mayla Mayumi Motobe</strong> (RM571213)"
        },
        demo: {
            titulo: "Como agendar uma demonstração?",
            resposta: "Para agendar uma demonstração gratuita do sistema Aurora, basta rolar até o final da página e preencher o formulário de contato, ou clicar no botão <strong>Agendar Demonstração</strong> no cabeçalho do site!"
        },
        analytics: {
            titulo: "Como funciona o People Analytics?",
            resposta: "Coletamos dados de múltiplas fontes (pesquisas de clima, avaliações de desempenho, feedbacks) e estruturamos tudo em um painel integrado. A liderança tem visibilidade completa de indicadores em tempo real para tomada de decisões justas."
        },
        projeto: {
            titulo: "Este site é um trabalho acadêmico?",
            resposta: "Sim! 🎓 A Aurora é um <strong>projeto acadêmico</strong> desenvolvido para o <strong>Enterprise Challenge 'People First Cup'</strong>, realizado pela <strong>FIAP</strong> (Faculdade de Informática e Administração Paulista) em parceria com a Aurora e Google.<br><br>Este site é um <strong>protótipo funcional completo</strong> (Etapa 2 do Challenge), com deploy real no Vercel e backend integrado à API do Google Gemini. Toda a implementação — HTML, CSS, JavaScript, acessibilidade (WCAG 2.2) e este chatbot — é autoral, feita pelo time do grupo."
        },
        roi: {
            titulo: "O que é o Simulador de ROI?",
            resposta: "O <strong>Simulador de ROI</strong> é um diferencial exclusivo da Aurora que permite calcular em tempo real o retorno financeiro esperado ao investir na plataforma. Basta informar o número de colaboradores, o investimento mensal e a taxa atual de turnover — a Aurora calcula em dois modos: ROI Direto e ROI Composto ao longo do tempo, com gráficos interativos."
        }
    };

    // Abre a janela do chat e ajusta foco/acessibilidade
    const abrirChat = () => {
        chatbotWindow.classList.remove('chatbot-window--hidden');
        chatbotWindow.setAttribute('aria-hidden', 'false');
        chatbotToggle.setAttribute('aria-expanded', 'true');
        
        // Focar no primeiro elemento interativo (ou no input)
        setTimeout(() => {
            chatbotInput.focus();
        }, 100);

        if (chatbotBadge) {
            chatbotBadge.style.display = 'none';
        }
    };

    // Fecha a janela do chat e restaura o foco
    const fecharChat = () => {
        chatbotWindow.classList.add('chatbot-window--hidden');
        chatbotWindow.setAttribute('aria-hidden', 'true');
        chatbotToggle.setAttribute('aria-expanded', 'false');
        
        // Retorna o foco ao botão que abriu o chat para navegação fluida por teclado
        chatbotToggle.focus();
    };

    chatbotToggle.addEventListener('click', abrirChat);
    chatbotClose.addEventListener('click', fecharChat);

    // Fechar ao pressionar a tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !chatbotWindow.classList.contains('chatbot-window--hidden')) {
            fecharChat();
        }
    });

    // Armadilhar o foco do Tabulador (Tab Trap) para acessibilidade WCAG
    chatbotWindow.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        // Elementos interativos dentro do chat
        const elementosFocaveis = chatbotWindow.querySelectorAll('button, input');
        const primeiroElemento = elementosFocaveis[0];
        const ultimoElemento = elementosFocaveis[elementosFocaveis.length - 1];

        if (e.shiftKey) {
            // Se pressionar Shift + Tab e estiver no primeiro elemento, manda para o último
            if (document.activeElement === primeiroElemento) {
                ultimoElemento.focus();
                e.preventDefault();
            }
        } else {
            // Se pressionar Tab e estiver no último elemento, manda para o primeiro
            if (document.activeElement === ultimoElemento) {
                primeiroElemento.focus();
                e.preventDefault();
            }
        }
    });

    // Enviar mensagem pelo formulário
    chatbotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const textoOriginal = chatbotInput.value.trim();
        if (!textoOriginal) return;

        // Segurança: limita o tamanho da mensagem no cliente antes de enviar
        if (textoOriginal.length > 500) {
            adicionarMensagem('Sua mensagem é muito longa. Por favor, limite a 500 caracteres.', 'bot');
            return;
        }

        chatbotInput.value = '';
        processarInteracaoUsuario(textoOriginal);
    });

    // Processa a mensagem do usuário (Filtra se é FAQ ou envia para a API)
    async function processarInteracaoUsuario(mensagemText) {
        adicionarMensagem(mensagemText, 'user');
        const idDigitando = mostrarIndicadorDigitando();

        // Aguarda um pequeno delay de 500ms para simular digitação natural
        await new Promise(resolve => setTimeout(resolve, 500));

        // 1. Procurar correspondência de palavras-chave na base local
        const chaveFAQ = encontrarFAQPorPalavraChave(mensagemText);

        if (chaveFAQ) {
            removerIndicadorDigitando(idDigitando);
            adicionarMensagem(FAQ_DATABASE[chaveFAQ].resposta, 'bot');
            mostrarChipsSugestoes();
            return;
        }

        // 2. Se não achou resposta instantânea, tenta chamar a API do NodeJS / Gemini
        try {
            const resposta = await enviarMensagemParaBackend(mensagemText);
            removerIndicadorDigitando(idDigitando);
            adicionarMensagem(resposta, 'bot');
        } catch (error) {
            removerIndicadorDigitando(idDigitando);
            adicionarMensagem(
                "Não consegui conectar com o servidor da API. Mas posso responder instantaneamente sobre os tópicos abaixo. Clique em um deles:",
                'bot'
            );
            mostrarChipsSugestoes();
        }
    }

    // Procura palavra-chave na mensagem do usuário
    function encontrarFAQPorPalavraChave(mensagem) {
        const msgNormalizada = mensagem.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        if (msgNormalizada.includes('o que e') || msgNormalizada.includes('o que significa') || msgNormalizada.includes('aurora')) {
            return 'aurora';
        }
        if (msgNormalizada.includes('turnover') || msgNormalizada.includes('rotatividade') || msgNormalizada.includes('reduzir') || msgNormalizada.includes('sair')) {
            return 'turnover';
        }
        if (msgNormalizada.includes('integrante') || msgNormalizada.includes('grupo') || msgNormalizada.includes('time') || msgNormalizada.includes('alunos') || msgNormalizada.includes('criador') || msgNormalizada.includes('equipe')) {
            return 'integrantes';
        }
        if (msgNormalizada.includes('demonstracao') || msgNormalizada.includes('agendar') || msgNormalizada.includes('contato') || msgNormalizada.includes('testar') || msgNormalizada.includes('cadastro')) {
            return 'demo';
        }
        if (msgNormalizada.includes('people analytics') || msgNormalizada.includes('funcionamento') || msgNormalizada.includes('dados') || msgNormalizada.includes('analytics')) {
            return 'analytics';
        }
        // Contexto acadêmico — FIAP / Enterprise Challenge
        if (msgNormalizada.includes('faculdade') || msgNormalizada.includes('fiap') || msgNormalizada.includes('trabalho') || msgNormalizada.includes('challenge') || msgNormalizada.includes('academico') || msgNormalizada.includes('projeto') || msgNormalizada.includes('aluno') || msgNormalizada.includes('etapa') || msgNormalizada.includes('enterprise')) {
            return 'projeto';
        }
        // Simulador de ROI
        if (msgNormalizada.includes('roi') || msgNormalizada.includes('retorno') || msgNormalizada.includes('simulador') || msgNormalizada.includes('calculadora') || msgNormalizada.includes('investimento')) {
            return 'roi';
        }
        return null;
    }

    // Adiciona chips/botões de sugestões de perguntas na janela de chat
    function mostrarChipsSugestoes() {
        const sugestoesAntigas = document.querySelector('.chatbot-window__suggestions-container');
        if (sugestoesAntigas) sugestoesAntigas.remove();

        const containerChips = document.createElement('div');
        containerChips.className = 'chatbot-window__suggestions-container';

        const itens = [
            { texto: 'O que é a Aurora?', chave: 'aurora' },
            { texto: 'Projeto FIAP 🎓', chave: 'projeto' },
            { texto: 'Redução de Turnover', chave: 'turnover' },
            { texto: 'Simulador de ROI', chave: 'roi' },
            { texto: 'Agendar Demo', chave: 'demo' }
        ];

        itens.forEach(item => {
            const botaoChip = document.createElement('button');
            botaoChip.className = 'chatbot-window__suggestion-chip';
            botaoChip.textContent = item.texto;
            botaoChip.setAttribute('type', 'button');
            botaoChip.addEventListener('click', () => {
                containerChips.remove();
                processarInteracaoUsuario(FAQ_DATABASE[item.chave].titulo);
            });
            containerChips.appendChild(botaoChip);
        });

        chatbotMessages.appendChild(containerChips);
        rolarParaFinal();
    }

    // Escapar caracteres perigosos
    function escaparHTML(texto) {
        return texto
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;");
    }

    // A11 — Região assistiva dedicada para anunciar mensagens do bot com aria-live="assertive"
    // Separada do log (polite) para que mensagens do bot não sejam perdidas durante digitação
    const anunciadorBot = document.createElement('div');
    anunciadorBot.setAttribute('aria-live', 'assertive');
    anunciadorBot.setAttribute('aria-atomic', 'true');
    anunciadorBot.className = 'sr-only';
    anunciadorBot.id = 'chatbot-anunciador-bot';
    chatbotWindow.appendChild(anunciadorBot);

    // Adicionar balão de mensagem no chat
    function adicionarMensagem(texto, remetente) {
        const elementoMensagem = document.createElement('div');
        elementoMensagem.className = `chatbot-window__message chatbot-window__message--${remetente}`;
        
        let textoFormatado = (remetente.includes('bot')) ? texto : escaparHTML(texto);
        
        // Formatações simples de Markdown (negrito e quebras de linha)
        textoFormatado = textoFormatado.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        textoFormatado = textoFormatado.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
        textoFormatado = textoFormatado.replace(/\n/g, '<br>');
        
        elementoMensagem.innerHTML = textoFormatado;
        chatbotMessages.appendChild(elementoMensagem);

        // A11 — Anuncia mensagens do bot via região assertive para leitores de tela
        if (remetente === 'bot') {
            // Remove HTML tags para o anúncio de texto puro
            anunciadorBot.textContent = '';
            setTimeout(() => {
                anunciadorBot.textContent = elementoMensagem.textContent;
            }, 50);
        }

        rolarParaFinal();
    }


    // Mostrar balão com animação de carregamento
    function mostrarIndicadorDigitando() {
        const id = 'typing-' + Date.now();
        const elementoDigitando = document.createElement('div');
        elementoDigitando.id = id;
        elementoDigitando.className = 'chatbot-window__message chatbot-window__message--bot chatbot-window__message--typing';
        
        elementoDigitando.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        
        chatbotMessages.appendChild(elementoDigitando);
        rolarParaFinal();
        return id;
    }

    function removerIndicadorDigitando(id) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.remove();
        }
    }

    // Rolagem suave, com detecção de redução de movimento para acessibilidade
    function rolarParaFinal() {
        const prefereReducaoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        chatbotMessages.scrollTo({
            top: chatbotMessages.scrollHeight,
            behavior: prefereReducaoMovimento ? 'auto' : 'smooth'
        });
    }

    async function enviarMensagemParaBackend(mensagem) {
        const controller = new AbortController();
        // Timeout de 15 segundos para evitar que o chat fique travado indefinidamente
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mensagem }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.status === 429) {
                // Rate limit atingido — informa o usuário sem expor detalhes técnicos
                const dataErro = await response.json().catch(() => ({}));
                throw new Error(dataErro.erro || 'Muitas mensagens enviadas. Aguarde um momento.');
            }

            if (!response.ok) {
                const dataErro = await response.json().catch(() => ({}));
                throw new Error(dataErro.erro || 'Falha do servidor.');
            }

            const dados = await response.json();
            return dados.resposta;

        } catch (err) {
            clearTimeout(timeoutId);
            if (err.name === 'AbortError') {
                throw new Error('A resposta demorou demais. Tente novamente.');
            }
            throw err;
        }
    }

    // Mostrar sugestões iniciais logo após a primeira mensagem
    setTimeout(() => {
        mostrarChipsSugestoes();
    }, 1000);
}
