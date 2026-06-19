document.addEventListener('DOMContentLoaded', () => {
    inicializarReprodutoresVideo();
    inicializarMenuMobile();
    inicializarVoltarAoTopo();
    inicializarBannerCookies();
    inicializarCarrosselDepoimentos();
    inicializarChecklistInterativo();
    inicializarValidacaoFormulario();
});

/**
 * Inicializa os players de vídeo dos depoimentos
 */
function inicializarReprodutoresVideo() {
    const recipientesVideo = document.querySelectorAll('.avaliacoes__grade-videos > div');
    const todosVideos = document.querySelectorAll('.avaliacoes__grade-videos video');

    if (recipientesVideo.length === 0) return;

    recipientesVideo.forEach(recipiente => {
        const video = recipiente.querySelector('video');
        const sobreposicao = recipiente.querySelector('.avaliacoes__sobreposicao');
        
        if (!video || !sobreposicao) return;

        // Quando o usuário clicar na sobreposição, toca o vídeo
        sobreposicao.addEventListener('click', () => {
            video.play();
        });

        // Sincroniza a sobreposição e mostra os controles nativos quando tocar
        video.addEventListener('play', () => {
            // Pausa todos os outros vídeos automaticamente para não ter sobreposição de áudio
            todosVideos.forEach(v => {
                if (v !== video && !v.paused) {
                    v.pause();
                }
            });

            recipiente.classList.add('is-reproduzindo');
            video.setAttribute('controls', 'controls');
        });

        // Função auxiliar para restaurar o estado visual do player
        const restaurarEstadoVideo = () => {
            recipiente.classList.remove('is-reproduzindo');
            video.removeAttribute('controls');
        };

        video.addEventListener('pause', restaurarEstadoVideo);
        video.addEventListener('ended', restaurarEstadoVideo);
    });
}

/**
 * Inicializa o menu mobile e sua navegação com acessibilidade (ARIA)
 */
function inicializarMenuMobile() {
    const botaoMenu = document.querySelector('.cabecalho__botao-menu');
    const linksNavegacao = document.querySelector('.cabecalho__lista-navegacao');

    if (!botaoMenu || !linksNavegacao) return;

    const icone = botaoMenu.querySelector('i');

    const fecharMenu = () => {
        botaoMenu.setAttribute('aria-expanded', 'false');
        botaoMenu.setAttribute('aria-label', 'Abrir menu');
        if (icone) {
            icone.className = 'fa-solid fa-bars';
        }
        linksNavegacao.classList.remove('is-ativo');
    };

    const alternarMenu = () => {
        const estaExpandido = botaoMenu.getAttribute('aria-expanded') === 'true';
        botaoMenu.setAttribute('aria-expanded', !estaExpandido);
        botaoMenu.setAttribute('aria-label', estaExpandido ? 'Abrir menu' : 'Fechar menu');
        if (icone) {
            icone.className = estaExpandido ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';
        }
        linksNavegacao.classList.toggle('is-ativo');
    };

    botaoMenu.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que o evento de fechar "clicar fora" seja acionado
        alternarMenu();
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
        if (!botaoMenu.contains(e.target) && !linksNavegacao.contains(e.target) && linksNavegacao.classList.contains('is-ativo')) {
            fecharMenu();
        }
    });

    // Fechar ao pressionar a tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && linksNavegacao.classList.contains('is-ativo')) {
            fecharMenu();
            botaoMenu.focus(); // Devolve foco para o botão para acessibilidade
        }
    });
}

/**
 * Inicializa o botão de voltar ao topo
 */
function inicializarVoltarAoTopo() {
    const botaoSubirTopo = document.getElementById('botao-topo');
    
    if (!botaoSubirTopo) return;

    // Usa 'passive: true' para otimizar o desempenho do evento de scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            botaoSubirTopo.classList.add('is-visivel');
        } else {
            botaoSubirTopo.classList.remove('is-visivel');
        }
    }, { passive: true });

    botaoSubirTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Inicializa o banner de cookies da LGPD
 */
function inicializarBannerCookies() {
    const bannerCookies = document.getElementById('cookie-banner');
    const botaoAceitar = document.getElementById('aceitar-cookies');

    if (!bannerCookies || !botaoAceitar) return;

    // Verifica se o usuário já aceitou os cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Mostra o banner com um pequeno delay para suavidade
        setTimeout(() => {
            bannerCookies.classList.add('is-visible');
        }, 500);
    }

    botaoAceitar.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        bannerCookies.classList.remove('is-visible');
    });
}

/**
 * Inicializa o carrossel de depoimentos com suporte pleno a acessibilidade (WCAG 2.2 tablist)
 */
function inicializarCarrosselDepoimentos() {
    const carrossel = document.querySelector('.cartao-depoimento');
    if (!carrossel) return;

    const slides = Array.from(carrossel.querySelectorAll('.cartao-depoimento__slide'));
    const pontos = Array.from(carrossel.querySelectorAll('.cartao-depoimento__ponto'));
    const botaoAnterior = carrossel.querySelector('.cartao-depoimento__seta-navegacao--anterior');
    const botaoProximo = carrossel.querySelector('.cartao-depoimento__seta-navegacao--proximo');

    if (slides.length === 0) return;

    let indiceAtual = 0;
    let intervaloAutoPlay = null;
    const atrasoAutoPlay = 5000;

    const mostrarSlide = (index) => {
        // Normaliza o índice circularmente
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        indiceAtual = index;

        // Toca transição de slides
        slides.forEach((slide, idx) => {
            const isActive = idx === indiceAtual;
            if (isActive) {
                slide.style.display = 'block';
                // Pequeno reflow para disparar animação CSS de fade-in
                void slide.offsetWidth;
                slide.classList.add('is-ativo');
                slide.setAttribute('aria-hidden', 'false');
            } else {
                slide.style.display = 'none';
                slide.classList.remove('is-ativo');
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        // Sincroniza indicadores ARIA
        pontos.forEach((ponto, idx) => {
            const isActive = idx === indiceAtual;
            ponto.classList.toggle('is-ativo', isActive);
            ponto.setAttribute('aria-selected', isActive ? 'true' : 'false');
            ponto.setAttribute('tabindex', isActive ? '0' : '-1');
        });
    };

    const proximoSlide = () => mostrarSlide(indiceAtual + 1);
    const anteriorSlide = () => mostrarSlide(indiceAtual - 1);

    if (botaoAnterior) botaoAnterior.addEventListener('click', () => {
        anteriorSlide();
        reiniciarAutoPlay();
    });
    if (botaoProximo) botaoProximo.addEventListener('click', () => {
        proximoSlide();
        reiniciarAutoPlay();
    });

    pontos.forEach((ponto, idx) => {
        ponto.addEventListener('click', () => {
            mostrarSlide(idx);
            reiniciarAutoPlay();
        });

        // Navegação por teclado nas abas do carrossel
        ponto.addEventListener('keydown', (e) => {
            let indiceDestino = -1;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                indiceDestino = idx + 1;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                indiceDestino = idx - 1;
            } else if (e.key === 'Home') {
                indiceDestino = 0;
            } else if (e.key === 'End') {
                indiceDestino = slides.length - 1;
            }

            if (indiceDestino !== -1) {
                e.preventDefault();
                if (indiceDestino < 0) indiceDestino = slides.length - 1;
                if (indiceDestino >= slides.length) indiceDestino = 0;
                mostrarSlide(indiceDestino);
                pontos[indiceDestino].focus();
                reiniciarAutoPlay();
            }
        });
    });

    // Gestão do Autoplay respeitando preferências do SO
    const iniciarAutoPlay = () => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return; // Não rotacionar se preferir redução de movimentos
        intervaloAutoPlay = setInterval(proximoSlide, atrasoAutoPlay);
    };

    const pararAutoPlay = () => {
        if (intervaloAutoPlay) {
            clearInterval(intervaloAutoPlay);
            intervaloAutoPlay = null;
        }
    };

    const reiniciarAutoPlay = () => {
        pararAutoPlay();
        iniciarAutoPlay();
    };

    // Pausa e retoma carrossel para navegação segura
    carrossel.addEventListener('mouseenter', pararAutoPlay);
    carrossel.addEventListener('mouseleave', iniciarAutoPlay);
    carrossel.addEventListener('focusin', pararAutoPlay);
    carrossel.addEventListener('focusout', iniciarAutoPlay);

    // Renderiza primeiro slide e inicia timer
    mostrarSlide(0);
    iniciarAutoPlay();
}

/**
 * Inicializa as caixas de seleção interativas do checklist de problemas
 */
function inicializarChecklistInterativo() {
    const caixasSelecao = document.querySelectorAll('.funcionalidades__caixa-selecao');

    caixasSelecao.forEach(caixa => {
        const alternarCaixaSelecao = () => {
            const estaSelecionada = caixa.getAttribute('aria-checked') === 'true';
            caixa.setAttribute('aria-checked', !estaSelecionada);
            caixa.classList.toggle('is-selecionada', !estaSelecionada);
        };

        caixa.addEventListener('click', (e) => {
            e.preventDefault();
            alternarCaixaSelecao();
        });

        caixa.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                alternarCaixaSelecao();
            }
        });
    });
}

/**
 * Validação de formulário acessível e verificação de e-mail corporativo
 */
function inicializarValidacaoFormulario() {
    const formulario = document.getElementById('form-captacao');
    const botaoEnviar = document.getElementById('btn-agendar');

    if (!formulario || !botaoEnviar) return;

    const campos = Array.from(formulario.querySelectorAll('.captacao__input'));

    // Lista de domínios públicos de e-mail comuns a serem rejeitados
    const dominiosPublicos = [
        'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'yahoo.com.br',
        'bol.com.br', 'uol.com.br', 'terra.com.br', 'ig.com.br', 'globomail.com',
        'live.com', 'aol.com', 'icloud.com', 'protonmail.com', 'zoho.com'
    ];

    const validarCampo = (input) => {
        const id = input.id;
        const valor = input.value.trim();
        const elementoErro = document.getElementById(`erro-${id.split('-')[1]}`);
        let eValido = true;
        let mensagemErro = '';

        // Limpa estado anterior
        input.classList.remove('is-invalido');
        input.setAttribute('aria-invalid', 'false');
        if (elementoErro) {
            elementoErro.textContent = '';
            elementoErro.classList.add('sr-only');
        }

        // Valida campo obrigatório
        if (input.hasAttribute('required') && valor === '') {
            eValido = false;
            mensagemErro = 'Este campo é obrigatório.';
        }

        // Valida sintaxe e tipo corporativo de e-mail
        if (eValido && input.type === 'email') {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(valor)) {
                eValido = false;
                mensagemErro = 'Insira um endereço de e-mail válido.';
            } else {
                const dominio = valor.split('@')[1].toLowerCase();
                if (dominiosPublicos.includes(dominio)) {
                    eValido = false;
                    mensagemErro = 'Por favor, insira um e-mail corporativo (evite Gmail, Hotmail, etc.).';
                }
            }
        }

        // Aplica estilizações e ativa avisos de erro em leitores de tela
        if (!eValido) {
            input.classList.add('is-invalido');
            input.setAttribute('aria-invalid', 'true');
            if (elementoErro) {
                elementoErro.textContent = mensagemErro;
                elementoErro.classList.remove('sr-only');
            }
        }

        return eValido;
    };

    campos.forEach(input => {
        input.addEventListener('blur', () => {
            validarCampo(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('is-invalido')) {
                validarCampo(input);
            }
        });
    });

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        let formularioEValido = true;
        let primeiroCampoInvalido = null;

        // Valida todos os campos ao enviar
        campos.forEach(input => {
            const eCampoValido = validarCampo(input);
            if (!eCampoValido) {
                formularioEValido = false;
                if (!primeiroCampoInvalido) {
                    primeiroCampoInvalido = input;
                }
            }
        });

        if (!formularioEValido) {
            // Foca no primeiro campo com erro para facilitar a correção via teclado
            if (primeiroCampoInvalido) {
                primeiroCampoInvalido.focus();
            }
            return;
        }

        // Simulação assíncrona de agendamento
        botaoEnviar.setAttribute('aria-busy', 'true');
        botaoEnviar.disabled = true;
        const elementoTextoOriginal = botaoEnviar.querySelector('.botao-cta__texto');
        const textoOriginal = elementoTextoOriginal.textContent;
        elementoTextoOriginal.textContent = 'Enviando...';

        setTimeout(() => {
            botaoEnviar.setAttribute('aria-busy', 'false');
            botaoEnviar.disabled = false;
            elementoTextoOriginal.textContent = textoOriginal;

            // Mostra toast de sucesso com o primeiro nome do lead
            mostrarToastSucesso(formulario.querySelector('[name="nome"]').value);
            formulario.reset();
        }, 1500);
    });
}

/**
 * Cria e anima uma notificação (toast) de sucesso premium após envio do form
 */
function mostrarToastSucesso(nome) {
    const notificacao = document.createElement('div');
    notificacao.setAttribute('role', 'alert');
    notificacao.setAttribute('aria-live', 'assertive');
    
    // Estilos inline do Toast Premium da Aurora
    notificacao.style.position = 'fixed';
    notificacao.style.bottom = '32px';
    notificacao.style.right = '32px';
    notificacao.style.background = 'var(--gradient-aurora)';
    notificacao.style.color = '#ffffff';
    notificacao.style.padding = '18px 28px';
    notificacao.style.borderRadius = 'var(--border-radius-small)';
    notificacao.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.25)';
    notificacao.style.zIndex = '1000000';
    notificacao.style.fontFamily = 'var(--font-primary)';
    notificacao.style.fontWeight = 'var(--font-weight-bold)';
    notificacao.style.fontSize = 'var(--font-size-base)';
    notificacao.style.display = 'flex';
    notificacao.style.alignItems = 'center';
    notificacao.style.gap = '12px';
    notificacao.style.transform = 'translateY(100px)';
    notificacao.style.opacity = '0';
    notificacao.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    notificacao.innerHTML = `
        <i class="fa-solid fa-circle-check" style="font-size: 20px; color: var(--color-highlight-teal);"></i>
        <span>Obrigado, ${nome.split(' ')[0]}! Demonstração agendada com sucesso. Entraremos em contato.</span>
    `;

    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.style.transform = 'translateY(0)';
        notificacao.style.opacity = '1';
    }, 100);

    // Auto-destruição após 5s
    setTimeout(() => {
        notificacao.style.transform = 'translateY(100px)';
        notificacao.style.opacity = '0';
        setTimeout(() => {
            notificacao.remove();
        }, 400);
    }, 5000);
}
