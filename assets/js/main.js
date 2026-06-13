// @TODO - Verificar se pode entregar com o JS desenvolvido
// document.addEventListener('DOMContentLoaded', () => {
//     const videoContainers = document.querySelectorAll('.customer-video-wrapper > div');
//     const allVideos = document.querySelectorAll('.customer-video-wrapper video');

//     videoContainers.forEach(container => {
//         const video = container.querySelector('video');
//         const overlay = container.querySelector('.video-overlay');
        
//         if (!video || !overlay) return;

//         // Quando o usuário clicar no overlay, toca o vídeo
//         overlay.addEventListener('click', () => {
//             video.play();
//         });

//         // Sincroniza o overlay e mostra os controles nativos quando tocar
//         video.addEventListener('play', () => {
//             // Pausa todos os outros vídeos automaticamente
//             allVideos.forEach(v => {
//                 if (v !== video && !v.paused) {
//                     v.pause();
//                 }
//             });

//             container.classList.add('is-playing');
//             video.setAttribute('controls', 'controls');
//         });

//         // Restaura o overlay e esconde os controles nativos quando pausar ou acabar
//         video.addEventListener('pause', () => {
//             container.classList.remove('is-playing');
//             video.removeAttribute('controls');
//         });

//         video.addEventListener('ended', () => {
//             container.classList.remove('is-playing');
//             video.removeAttribute('controls');
//         });
//     });

//     // Toggle menu mobile
//     const menuBtn = document.querySelector('.header__menu-btn');
//     const navLinks = document.querySelector('.header__nav__links');

//     if (menuBtn && navLinks) {
//         menuBtn.addEventListener('click', () => {
//             const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
//             menuBtn.setAttribute('aria-expanded', !isExpanded);
//             navLinks.classList.toggle('is-active');
//         });

//         // Fechar ao clicar fora
//         document.addEventListener('click', (e) => {
//             if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
//                 menuBtn.setAttribute('aria-expanded', 'false');
//                 navLinks.classList.remove('is-active');
//             }
//         });

//         // Fechar ao pressionar Escape
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape' && navLinks.classList.contains('is-active')) {
//                 menuBtn.setAttribute('aria-expanded', 'false');
//                 navLinks.classList.remove('is-active');
//                 menuBtn.focus(); // devolve foco para o botão
//             }
//         });
//     }

//     // Scroll to Top
//     const scrollTopBtn = document.getElementById('scrollTopBtn');
//     if (scrollTopBtn) {
//         window.addEventListener('scroll', () => {
//             if (window.scrollY > 300) {
//                 scrollTopBtn.classList.add('is-visible');
//             } else {
//                 scrollTopBtn.classList.remove('is-visible');
//             }
//         });

//         scrollTopBtn.addEventListener('click', () => {
//             window.scrollTo({
//                 top: 0,
//                 behavior: 'smooth'
//             });
//         });
//     }
// });
