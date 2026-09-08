document.addEventListener('DOMContentLoaded', () => {
    inicializarReprodutoresVideo();
    inicializarMenuMobile();
    inicializarVoltarAoTopo();
    inicializarBannerCookies();
    inicializarCarrosselDepoimentos();
    inicializarChecklistInterativo();
    inicializarValidacaoFormulario();
    inicializarNewsletter();
});

/**
 * Inicializa os players de vídeo dos depoimentos
 */
function inicializarReprodutoresVideo() {
    const recipientesVideo = document.querySelectorAll('.avaliacoes__grade-videos > div');
    const todosVideos = document.querySelectorAll('.avaliacoes__grade-videos video');

    if (recipientesVideo.length === 0) return;

    recipientesVideo.forEach(recipiente => {
        const videoDepoimento = recipiente.querySelector('video');
        const sobreposicao = recipiente.querySelector('.avaliacoes__sobreposicao');
        
        if (!videoDepoimento || !sobreposicao) return;

        const linkEmpresaLinkedin = sobreposicao.querySelector('.avaliacoes__link-linkedin');

        if (linkEmpresaLinkedin) {
            linkEmpresaLinkedin.addEventListener('click', (evento) => {
                evento.stopPropagation();
            });
        }

        // Quando o usuário clicar na sobreposição, toca o vídeo
        sobreposicao.addEventListener('click', () => {
            videoDepoimento.play();
        });

        // Sincroniza a sobreposição e mostra os controles nativos quando tocar
        videoDepoimento.addEventListener('play', () => {
            // Pausa todos os outros vídeos automaticamente para não ter sobreposição de áudio
            todosVideos.forEach(outroVideo => {
                if (outroVideo !== videoDepoimento && !outroVideo.paused) {
                    outroVideo.pause();
                }
            });

            recipiente.classList.add('is-reproduzindo');
            videoDepoimento.setAttribute('controls', 'controls');
        });

        // Função auxiliar para restaurar o estado visual do player
        const restaurarEstadoVideo = () => {
            recipiente.classList.remove('is-reproduzindo');
            videoDepoimento.removeAttribute('controls');
        };

        videoDepoimento.addEventListener('pause', restaurarEstadoVideo);
        videoDepoimento.addEventListener('ended', restaurarEstadoVideo);
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
            // A16 — remove aria-hidden quando visível para leitores de tela alcançarem o botão
            botaoSubirTopo.removeAttribute('aria-hidden');
        } else {
            botaoSubirTopo.classList.remove('is-visivel');
            // A16 — oculta de leitores de tela quando não está visível
            botaoSubirTopo.setAttribute('aria-hidden', 'true');
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
 * Validação e fluxo de etapas do formulário de captação (Multi-step)
 */
/**
 * 🔴2 — Gera os próximos N dias úteis a partir de hoje (exclui sábado e domingo)
 * e preenche o fieldset de seleção de data com opções dinâmicas
 */
function gerarDatasAgendamento() {
    const containerDatas = document.querySelector('.captacao__opcoes-data');
    if (!containerDatas) return;

    const DIAS_SEMANA_ABREV = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const diasUteis = [];
    const hoje = new Date();
    let cursor = new Date(hoje);
    cursor.setDate(cursor.getDate() + 1); // começa no próximo dia

    while (diasUteis.length < 6) {
        const diaSemana = cursor.getDay();
        if (diaSemana !== 0 && diaSemana !== 6) { // 0 = domingo, 6 = sábado
            diasUteis.push(new Date(cursor));
        }
        cursor.setDate(cursor.getDate() + 1);
    }

    containerDatas.innerHTML = diasUteis.map((data, idx) => {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const valorData = `${dia}/${mes}`;
        const abrevDia = DIAS_SEMANA_ABREV[data.getDay()];
        const required = idx === 0 ? 'required' : '';
        return `<label class="captacao__opcao"><input class="captacao__opcao-input" type="radio" name="data" value="${valorData}" ${required}><span class="captacao__opcao-conteudo"><small>${abrevDia}</small><strong>${dia}</strong></span></label>`;
    }).join('');
}

function inicializarValidacaoFormulario() {
    const formulario = document.getElementById('form-captacao');
    const botaoEnviar = document.getElementById('btn-agendar');
    const btnProximaEtapa = document.getElementById('btn-proxima-etapa');
    const btnEtapaAnterior = document.getElementById('btn-etapa-anterior');
    const etapa1 = document.getElementById('etapa-1');
    const etapa2 = document.getElementById('etapa-2');
    const stepIndicador1 = document.getElementById('step-indicador-1');
    const stepIndicador2 = document.getElementById('step-indicador-2');
    const linhaProgresso = document.getElementById('stepper-progresso-linha');
    const subtitulo = document.getElementById('captacao-subtitulo');
    const resumoLeadNomeEmpresa = document.getElementById('resumo-lead-nome-empresa');

    if (!formulario || !botaoEnviar || !etapa1 || !etapa2) return;

    // 🔴2 — Gera as datas dinamicamente ao inicializar
    gerarDatasAgendamento();

    const camposEtapa1 = Array.from(etapa1.querySelectorAll('.captacao__input'));
    const gruposOpcoes = [
        { nome: 'data', erro: document.getElementById('erro-data') },
        { nome: 'horario', erro: document.getElementById('erro-horario') }
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

        // Valida sintaxe e formato de e-mail (aceita e-mails corporativos e provedores comuns como Gmail, Hotmail, etc.)
        if (eValido && input.type === 'email') {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(valor)) {
                eValido = false;
                mensagemErro = 'Insira um endereço de e-mail válido.';
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

    const validarGrupoOpcoes = (grupo) => {
        const opcoes = formulario.querySelectorAll(`input[name="${grupo.nome}"]`);
        const selecionado = formulario.querySelector(`input[name="${grupo.nome}"]:checked`);
        const eValido = Boolean(selecionado);

        if (grupo.erro) {
            grupo.erro.textContent = eValido ? '' : 'Selecione uma opção.';
            grupo.erro.classList.toggle('sr-only', eValido);
        }

        opcoes.forEach(opcao => opcao.setAttribute('aria-invalid', eValido ? 'false' : 'true'));
        return eValido;
    };

    const validarEtapa1 = () => {
        let etapaValida = true;
        let primeiroInvalido = null;

        camposEtapa1.forEach(input => {
            const valido = validarCampo(input);
            if (!valido) {
                etapaValida = false;
                if (!primeiroInvalido) primeiroInvalido = input;
            }
        });

        if (!etapaValida && primeiroInvalido) {
            primeiroInvalido.focus();
        }

        return etapaValida;
    };

    const validarEtapa2 = () => {
        let etapaValida = true;
        let primeiroInvalido = null;

        gruposOpcoes.forEach(grupo => {
            if (!validarGrupoOpcoes(grupo)) {
                etapaValida = false;
                if (!primeiroInvalido) {
                    primeiroInvalido = formulario.querySelector(`input[name="${grupo.nome}"]`);
                }
            }
        });

        if (!etapaValida && primeiroInvalido) {
            primeiroInvalido.focus();
        }

        return etapaValida;
    };

    const irParaEtapa = (numeroEtapa) => {
        // A15 — Atualiza o progressbar para comunicar progresso a leitores de tela
        const stepperEl = document.getElementById('captacao-stepper');

        if (numeroEtapa === 2) {
            etapa1.classList.remove('is-ativa');
            etapa1.hidden = true;

            etapa2.classList.add('is-ativa');
            etapa2.hidden = false;

            if (stepIndicador1) {
                stepIndicador1.classList.remove('is-active');
                stepIndicador1.classList.add('is-completed');
                stepIndicador1.setAttribute('aria-selected', 'false');
            }

            if (stepIndicador2) {
                stepIndicador2.classList.add('is-active');
                stepIndicador2.setAttribute('aria-selected', 'true');
            }

            if (stepperEl) {
                stepperEl.setAttribute('aria-valuenow', '2');
                stepperEl.setAttribute('aria-label', 'Etapa 2 de 2: Data e Horário');
            }

            if (linhaProgresso) {
                linhaProgresso.style.width = '100%';
            }

            if (subtitulo) {
                subtitulo.textContent = 'Escolha o melhor dia e horário para a sua sessão guiada de 30 minutos.';
            }

            // Atualiza resumo do Lead na Etapa 2
            const nomeLead = formulario.querySelector('#captacao-nome')?.value.trim() || 'Você';
            const empresaLead = formulario.querySelector('#captacao-empresa')?.value.trim() || 'Sua Empresa';
            if (resumoLeadNomeEmpresa) {
                resumoLeadNomeEmpresa.textContent = `${nomeLead} • ${empresaLead}`;
            }

            // Foca suavemente no primeiro radio da Etapa 2
            const primeiroRadioData = etapa2.querySelector('input[name="data"]');
            if (primeiroRadioData) {
                primeiroRadioData.focus();
            }
        } else {
            etapa2.classList.remove('is-ativa');
            etapa2.hidden = true;

            etapa1.classList.add('is-ativa');
            etapa1.hidden = false;

            if (stepIndicador2) {
                stepIndicador2.classList.remove('is-active');
                stepIndicador2.setAttribute('aria-selected', 'false');
            }

            if (stepIndicador1) {
                stepIndicador1.classList.remove('is-completed');
                stepIndicador1.classList.add('is-active');
                stepIndicador1.setAttribute('aria-selected', 'true');
            }

            if (stepperEl) {
                stepperEl.setAttribute('aria-valuenow', '1');
                stepperEl.setAttribute('aria-label', 'Etapa 1 de 2: Seus Dados');
            }

            if (linhaProgresso) {
                linhaProgresso.style.width = '0%';
            }

            if (subtitulo) {
                subtitulo.textContent = 'Preencha seus dados corporativos e agende sua sessão exclusiva em 30 minutos.';
            }

            const primeiroCampo = etapa1.querySelector('#captacao-nome');
            if (primeiroCampo) {
                primeiroCampo.focus();
            }
        }
    };

    // Listeners de validação em tempo real para campos da Etapa 1
    camposEtapa1.forEach(input => {
        input.addEventListener('blur', () => {
            validarCampo(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('is-invalido')) {
                validarCampo(input);
            }
        });
    });

    // Listeners para limpar erro de seleção de rádio em tempo real na Etapa 2
    gruposOpcoes.forEach(grupo => {
        const opcoes = formulario.querySelectorAll(`input[name="${grupo.nome}"]`);
        opcoes.forEach(opcao => {
            opcao.addEventListener('change', () => {
                validarGrupoOpcoes(grupo);
            });
        });
    });

    // Avançar para Etapa 2
    if (btnProximaEtapa) {
        btnProximaEtapa.addEventListener('click', () => {
            if (validarEtapa1()) {
                irParaEtapa(2);
            }
        });
    }

    // Voltar para Etapa 1
    if (btnEtapaAnterior) {
        btnEtapaAnterior.addEventListener('click', () => {
            irParaEtapa(1);
        });
    }

    // Envio final do formulário
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        // Garante que a etapa 1 está preenchida
        if (!validarEtapa1()) {
            irParaEtapa(1);
            return;
        }

        // Valida etapa 2
        if (!validarEtapa2()) {
            return;
        }

        // Simulação assíncrona de agendamento com feedback visual
        botaoEnviar.setAttribute('aria-busy', 'true');
        botaoEnviar.disabled = true;
        const elementoTextoOriginal = botaoEnviar.querySelector('.botao-cta__texto');
        const textoOriginal = elementoTextoOriginal ? elementoTextoOriginal.textContent : 'Confirmar Agendamento';
        if (elementoTextoOriginal) elementoTextoOriginal.textContent = 'Confirmando agendamento...';

        const nomeLead = formulario.querySelector('#captacao-nome')?.value || 'Parceiro';

        setTimeout(() => {
            botaoEnviar.setAttribute('aria-busy', 'false');
            botaoEnviar.disabled = false;
            if (elementoTextoOriginal) elementoTextoOriginal.textContent = textoOriginal;

            // Mostra toast de sucesso com o primeiro nome do lead
            mostrarToastSucesso(nomeLead);
            
            // Reseta o formulário e retorna à Etapa 1
            formulario.reset();
            
            // Limpa mensagens de erro e atributos inválidos
            camposEtapa1.forEach(input => {
                input.classList.remove('is-invalido');
                input.setAttribute('aria-invalid', 'false');
                const erroEl = document.getElementById(`erro-${input.id.split('-')[1]}`);
                if (erroEl) {
                    erroEl.textContent = '';
                    erroEl.classList.add('sr-only');
                }
            });
            gruposOpcoes.forEach(grupo => {
                if (grupo.erro) {
                    grupo.erro.textContent = '';
                    grupo.erro.classList.add('sr-only');
                }
            });

            irParaEtapa(1);
        }, 1500);
    });
}

function inicializarNewsletter() {
    const formularioNewsletter = document.getElementById('form-newsletter');
    const campoEmailNewsletter = document.getElementById('newsletter-email');
    const mensagemNewsletter = document.getElementById('newsletter-mensagem');
    // 🔴3 — Elemento de erro acessível com aria-live, vinculado ao campo via aria-describedby
    const erroNewsletter = document.getElementById('newsletter-erro');

    if (!formularioNewsletter || !campoEmailNewsletter || !mensagemNewsletter) return;

    const limparErro = () => {
        if (erroNewsletter) {
            erroNewsletter.textContent = '';
            erroNewsletter.hidden = true;
        }
        campoEmailNewsletter.setAttribute('aria-invalid', 'false');
    };

    const mostrarErro = (mensagem) => {
        if (erroNewsletter) {
            erroNewsletter.textContent = mensagem;
            erroNewsletter.hidden = false;
        }
        campoEmailNewsletter.setAttribute('aria-invalid', 'true');
        campoEmailNewsletter.focus();
    };

    // Limpa erro ao digitar
    campoEmailNewsletter.addEventListener('input', limparErro);

    formularioNewsletter.addEventListener('submit', (evento) => {
        evento.preventDefault();
        limparErro();

        const valor = campoEmailNewsletter.value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!valor) {
            mostrarErro('Por favor, informe seu e-mail.');
            return;
        }

        if (!regexEmail.test(valor)) {
            mostrarErro('Insira um endereço de e-mail válido (ex: voce@empresa.com).');
            return;
        }

        mensagemNewsletter.textContent = 'Inscrição realizada! Em breve você receberá nossas novidades.';
        formularioNewsletter.reset();
    });
}

/**
 * A18 — Toast de sucesso: usa elemento estático no DOM (pré-existente no HTML)
 * para garantir que o aria-live seja reconhecido por leitores de tela ao carregar a página.
 * Apenas o conteúdo é atualizado dinamicamente, nunca o elemento em si.
 */
function mostrarToastSucesso(nome) {
    const notificacao = document.getElementById('toast-sucesso');
    if (!notificacao) return;

    notificacao.querySelector('.toast-sucesso__mensagem').textContent =
        `Obrigado, ${nome.split(' ')[0]}! Demonstração agendada com sucesso. Entraremos em contato.`;

    notificacao.classList.add('is-visivel');

    // Auto-ocultar após 5s
    setTimeout(() => {
        notificacao.classList.remove('is-visivel');
        // Limpa após a animação de saída
        setTimeout(() => {
            notificacao.querySelector('.toast-sucesso__mensagem').textContent = '';
        }, 400);
    }, 5000);
}
