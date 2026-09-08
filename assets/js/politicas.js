/**
 * ==========================================================================
 * AURORA - PORTAL DE POLÍTICAS, TERMOS E LGPD
 * Scripts de Interatividade, Acessibilidade, Busca e Gestão de Privacidade
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    inicializarMenuMobileLegal();
    inicializarNavegacaoSidebar();
    inicializarDeepLinkingHash();
    inicializarBuscaTermos();
    inicializarFormularioLGPD();
    inicializarPainelCookies();
    inicializarBotaoTopoLegal();
});

/**
 * Controla o destaque do item ativo na barra lateral conforme o scroll (ScrollSpy)
 */
/**
 * Menu mobile hamburguer para a navbar padrão do portal de políticas
 * (replica o comportamento de inicializarMenuMobile em main.js)
 */
function inicializarMenuMobileLegal() {
    const botaoMenu = document.querySelector('.cabecalho__botao-menu');
    const linksNavegacao = document.querySelector('.cabecalho__lista-navegacao');

    if (!botaoMenu || !linksNavegacao) return;

    const icone = botaoMenu.querySelector('i');

    const fecharMenu = () => {
        botaoMenu.setAttribute('aria-expanded', 'false');
        botaoMenu.setAttribute('aria-label', 'Abrir menu');
        linksNavegacao.classList.remove('is-ativo');
        if (icone) { icone.className = 'fa-solid fa-bars'; }
    };

    const alternarMenu = () => {
        const estaExpandido = botaoMenu.getAttribute('aria-expanded') === 'true';
        botaoMenu.setAttribute('aria-expanded', String(!estaExpandido));
        botaoMenu.setAttribute('aria-label', estaExpandido ? 'Abrir menu' : 'Fechar menu');
        linksNavegacao.classList.toggle('is-ativo', !estaExpandido);
        if (icone) { icone.className = estaExpandido ? 'fa-solid fa-bars' : 'fa-solid fa-xmark'; }
    };

    botaoMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        alternarMenu();
    });

    document.addEventListener('click', (e) => {
        if (!botaoMenu.contains(e.target) && !linksNavegacao.contains(e.target) && linksNavegacao.classList.contains('is-ativo')) {
            fecharMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && linksNavegacao.classList.contains('is-ativo')) {
            fecharMenu();
            botaoMenu.focus();
        }
    });
}

function inicializarNavegacaoSidebar() {
    const secoes = document.querySelectorAll('.legal-secao');
    const linksSidebar = document.querySelectorAll('.legal-sidebar__link');
    const cabecalho = document.querySelector('.cabecalho');

    if (secoes.length === 0 || linksSidebar.length === 0) return;

    // Sombra no cabeçalho ao rolar
    window.addEventListener('scroll', () => {
        if (cabecalho) {
            cabecalho.classList.toggle('is-scrolled', window.scrollY > 20);
        }
    }, { passive: true });

    // IntersectionObserver para detectar seção visível
    const opcoesObserver = {
        root: null,
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const idSecao = entry.target.getAttribute('id');
                linksSidebar.forEach((link) => {
                    const href = link.getAttribute('href');
                    const estaAtivo = href === `#${idSecao}`;
                    link.classList.toggle('is-ativo', estaAtivo);
                    link.setAttribute('aria-current', estaAtivo ? 'true' : 'false');
                });
            }
        });
    }, opcoesObserver);

    secoes.forEach((secao) => observer.observe(secao));
}

/**
 * Trata rolagem suave ao carregar com âncoras na URL (#privacidade, #termos, #lgpd, #cookies, etc.)
 */
function inicializarDeepLinkingHash() {
    const tratarHash = () => {
        const hash = window.location.hash;
        if (!hash) return;

        const elementoAlvo = document.querySelector(hash);
        if (elementoAlvo) {
            setTimeout(() => {
                const headerOffset = 100;
                const elementPosition = elementoAlvo.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Efeito de destaque temporário no card alvo
                elementoAlvo.style.outline = '2px solid var(--color-brand-teal)';
                elementoAlvo.style.outlineOffset = '6px';
                setTimeout(() => {
                    elementoAlvo.style.outline = '';
                    elementoAlvo.style.outlineOffset = '';
                }, 2000);
            }, 150);
        }
    };

    tratarHash();
    window.addEventListener('hashchange', tratarHash);
}

/**
 * Busca em tempo real e destaque de termos pesquisados nos artigos
 */
function inicializarBuscaTermos() {
    const inputBusca = document.getElementById('busca-legal');
    const botaoLimpar = document.getElementById('limpar-busca');
    const secoes = document.querySelectorAll('.legal-secao');
    const containerVazio = document.getElementById('busca-vazia');
    const totalResultados = document.getElementById('total-resultados-busca');

    if (!inputBusca) return;

    let debounceTimer;

    inputBusca.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        const termo = inputBusca.value.trim().toLowerCase();

        if (botaoLimpar) {
            botaoLimpar.classList.toggle('is-visivel', termo.length > 0);
        }

        debounceTimer = setTimeout(() => {
            executarFiltro(termo);
        }, 200);
    });

    if (botaoLimpar) {
        botaoLimpar.addEventListener('click', () => {
            inputBusca.value = '';
            botaoLimpar.classList.remove('is-visivel');
            executarFiltro('');
            inputBusca.focus();
        });
    }

    function executarFiltro(termo) {
        if (!termo) {
            secoes.forEach(secao => {
                secao.classList.remove('is-hidden');
            });
            if (containerVazio) containerVazio.classList.remove('is-visivel');
            return;
        }

        let encontrouAlgum = false;
        const termoNormalizado = normalizarTexto(termo);

        secoes.forEach(secao => {
            const textoSecao = normalizarTexto(secao.textContent);
            const corresponde = textoSecao.includes(termoNormalizado);

            secao.classList.toggle('is-hidden', !corresponde);
            if (corresponde) encontrouAlgum = true;
        });

        if (containerVazio) {
            containerVazio.classList.toggle('is-visivel', !encontrouAlgum);
            if (totalResultados) {
                totalResultados.textContent = `Nenhum resultado encontrado para "${inputBusca.value}".`;
            }
        }
    }

    function normalizarTexto(str) {
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
}

/**
 * Formulário de Solicitação de Direitos do Titular LGPD
 */
function inicializarFormularioLGPD() {
    const form = document.getElementById('form-direitos-lgpd');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = form.querySelector('[name="titular-nome"]')?.value || 'Titular';
        const tipoRequisicao = form.querySelector('[name="titular-tipo"]')?.value || 'Informações';
        const botaoEnvio = form.querySelector('.form-lgpd__btn');

        if (botaoEnvio) {
            botaoEnvio.disabled = true;
            botaoEnvio.textContent = 'Processando Solicitação...';
        }

        // Simulação assíncrona com protocolo seguro
        setTimeout(() => {
            const numeroProtocolo = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
            
            mostrarToastFeedback(
                `Solicitação enviada com sucesso! Protocolo: ${numeroProtocolo}. O Encarregado de Dados (DPO) responderá em até 15 dias.`
            );

            form.reset();

            if (botaoEnvio) {
                botaoEnvio.disabled = false;
                botaoEnvio.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Solicitação Oficial';
            }
        }, 1200);
    });
}

/**
 * Painel Interativo de Gestão de Cookies
 */
function inicializarPainelCookies() {
    const botaoReset = document.getElementById('btn-reset-cookies');
    const statusTexto = document.getElementById('status-cookies-texto');

    if (!botaoReset || !statusTexto) return;

    const atualizarStatusVisual = () => {
        const aceito = localStorage.getItem('cookiesAccepted') === 'true';
        if (aceito) {
            statusTexto.innerHTML = '<strong>Status atual:</strong> Você aceitou o uso de cookies de navegação e desempenho.';
            botaoReset.textContent = 'Revogar Consentimento de Cookies';
        } else {
            statusTexto.innerHTML = '<strong>Status atual:</strong> Nenhum cookie de personalização ativo (padrão restrito).';
            botaoReset.textContent = 'Aceitar Cookies da Plataforma';
        }
    };

    atualizarStatusVisual();

    botaoReset.addEventListener('click', () => {
        const aceito = localStorage.getItem('cookiesAccepted') === 'true';
        if (aceito) {
            localStorage.removeItem('cookiesAccepted');
            mostrarToastFeedback('Seu consentimento de cookies foi revogado com sucesso.');
        } else {
            localStorage.setItem('cookiesAccepted', 'true');
            mostrarToastFeedback('Preferências de cookies salvas com sucesso.');
        }
        atualizarStatusVisual();
    });
}

/**
 * Botão Voltar ao Topo
 */
function inicializarBotaoTopoLegal() {
    const botaoTopo = document.getElementById('botao-topo') || document.getElementById('btn-topo-legal');
    if (!botaoTopo) return;

    window.addEventListener('scroll', () => {
        botaoTopo.classList.toggle('is-visivel', window.scrollY > 300);
    }, { passive: true });

    botaoTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Notificação visual (Toast) elegante aderente aos tokens de design da Aurora
 */
function mostrarToastFeedback(mensagem) {
    const toast = document.createElement('div');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = 'var(--gradient-aurora)';
    toast.style.color = 'var(--color-neutral-white)';
    toast.style.padding = 'var(--spacing-medium) var(--spacing-large)';
    toast.style.borderRadius = 'var(--border-radius-small)';
    toast.style.boxShadow = 'var(--shadow-soft)';
    toast.style.zIndex = '999999';
    toast.style.fontFamily = 'var(--font-primary)';
    toast.style.fontWeight = 'var(--font-weight-bold)';
    toast.style.fontSize = 'var(--font-size-base)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = 'var(--spacing-small)';
    toast.style.maxWidth = '460px';
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    toast.style.transition = 'all var(--transition-bounce)';

    toast.innerHTML = `
        <i class="fa-solid fa-circle-check" style="font-size: var(--font-size-medium); color: var(--color-brand-teal-light);"></i>
        <span>${mensagem}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}
