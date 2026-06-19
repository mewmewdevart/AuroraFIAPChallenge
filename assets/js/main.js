document.addEventListener('DOMContentLoaded', () => {
    initVideoPlayers();
    initMobileMenu();
    initScrollToTop();
    initCookieBanner();
});

/**
 * Inicializa os players de vídeo dos depoimentos
 */
function initVideoPlayers() {
    const videoContainers = document.querySelectorAll('.avaliacoes__grade-videos > div');
    const allVideos = document.querySelectorAll('.avaliacoes__grade-videos video');

    if (videoContainers.length === 0) return;

    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const overlay = container.querySelector('.avaliacoes__sobreposicao');
        
        if (!video || !overlay) return;

        // Quando o usuário clicar no overlay, toca o vídeo
        overlay.addEventListener('click', () => {
            video.play();
        });

        // Sincroniza o overlay e mostra os controles nativos quando tocar
        video.addEventListener('play', () => {
            // Pausa todos os outros vídeos automaticamente para não ter sobreposição de áudio
            allVideos.forEach(v => {
                if (v !== video && !v.paused) {
                    v.pause();
                }
            });

            container.classList.add('is-reproduzindo');
            video.setAttribute('controls', 'controls');
        });

        // Função auxiliar para restaurar o estado visual do player
        const resetVideoState = () => {
            container.classList.remove('is-reproduzindo');
            video.removeAttribute('controls');
        };

        video.addEventListener('pause', resetVideoState);
        video.addEventListener('ended', resetVideoState);
    });
}

/**
 * Inicializa o menu mobile e sua navegação
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.cabecalho__botao-menu');
    const navLinks = document.querySelector('.cabecalho__lista-navegacao');

    if (!menuBtn || !navLinks) return;

    const closeMenu = () => {
        menuBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-ativo');
    };

    const toggleMenu = () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('is-ativo');
    };

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que o evento de fechar "clicar fora" seja acionado
        toggleMenu();
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('is-ativo')) {
            closeMenu();
        }
    });

    // Fechar ao pressionar a tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('is-ativo')) {
            closeMenu();
            menuBtn.focus(); // Devolve foco para o botão para acessibilidade
        }
    });
}

/**
 * Inicializa o botão de voltar ao topo
 */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollTopBtn) return;

    // Usa 'passive: true' para otimizar o desempenho do evento de scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('is-visivel');
        } else {
            scrollTopBtn.classList.remove('is-visivel');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Inicializa o banner de cookies da LGPD
 */
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('aceitar-cookies');

    if (!cookieBanner || !acceptBtn) return;

    // Verifica se o usuário já aceitou
    if (!localStorage.getItem('cookiesAccepted')) {
        // Mostra o banner com um pequeno delay para suavidade
        setTimeout(() => {
            cookieBanner.classList.add('is-visible');
        }, 500);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('is-visible');
    });
}
