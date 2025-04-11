let myPrompt;
const pwaAlert = document.querySelector('.pwa_alert');
const btnPwa = document.querySelector('.pwa_alert_btn');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration) => {
                console.log('Registration successful', registration);
            }).catch((error) => {
                console.log('Service Worker registration failed, error: ', error);
            });
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    console.log('Pronto para instalar', e);
    myPrompt = e;

    pwaAlert.style.display = 'block';
});

btnPwa.addEventListener('click', () => {
    pwaAlert.style.display = 'none';
    myPrompt.prompt();
    myPrompt.userChoice.then((choiceResult => {
        if (choiceResult === 'accepted') {
            console.log('Usuário aceitou');
        } else {
            console.log('Usuário cancelou o prompt');

        }
    }))
})

document.addEventListener('deviceready', onDeviceReady.bind(this), false);

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Framework7',
    // App id
    id: 'br.com.meuapp',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [
        {
            path: '/index/',
            url: 'index.html',
            on: {
                // modificar
                pageInit: function (event, page) {
                    //Chamar pagina inicial Home						
                    app.views.main.router.navigate('/home/');
                }
            }
        },

        {
            path: '/home/',
            url: 'home.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close()
                }
            }
        },

        {
            path: '/dashboard/',
            url: 'dashboard.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close()
                }
            }
        },

        {
            path: '/usuarios/',
            url: 'usuarios.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close()
                }
            }
        },

        {
            path: '/pessoas/',
            url: 'pessoas.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close()
                }
            }
        },

        {
            path: '/policiais/',
            url: 'policiais.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close()
                }
            }
        },

        {
            path: '/relatorios/',
            url: 'relatorios.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close()
                }
            }
        },

        {
            path: '/suporte/',
            url: 'suporte.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close()
                }
            }
        },

        {
            path: '/sobre/',
            url: 'sobre.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close()
                }
            }
        },

        {
            path: '/contato/',
            url: 'contato.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close()
                }
            }
        },

        {
            path: '/config/',
            url: 'config.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close()
                }
            }
        },

        {
            path: '/verificar_preso/',
            url: 'verificar_preso.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close()
                }
            }
        },

    ],
    // ... other parameters
});

var $$ = Dom7;

function onDeviceReady() {

    var mainView = app.views.create('.view-main', {
        url: '/index/'
    });

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
        // variavel para pegar a rota que estamos
        var nome = app.views.main.router.url;
    }

}

// Elementos do DOM
const videoElement = document.getElementById('videoElement');
const canvasElement = document.getElementById('canvasElement');
const capturedImage = document.getElementById('capturedImage');
const captureButton = document.getElementById('captureButton');
const switchCameraButton = document.getElementById('switchCamera');

// Variáveis de estado
let currentStream = null;
let facingMode = "environment"; // Padrão: câmera traseira ("environment")

// Função para iniciar a câmera
async function startCamera() {
    // Parar o stream atual, se existir
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
        video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
        },
        audio: false
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        currentStream = stream;
    } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
        alert("Não foi possível acessar a câmera. Por favor, verifique as permissões.");
    }
}

// Função para capturar foto
function capturePhoto() {
    if (!currentStream) return;

    // Ajustar o canvas para o tamanho do vídeo
    const videoSettings = currentStream.getVideoTracks()[0].getSettings();
    canvasElement.width = videoSettings.width;
    canvasElement.height = videoSettings.height;

    // Desenhar o frame atual do vídeo no canvas
    const context = canvasElement.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    // Converter canvas para imagem e exibir
    capturedImage.src = canvasElement.toDataURL('image/jpeg');
    capturedImage.style.display = 'block';

    // Aqui você pode adicionar código para salvar a foto ou processá-la
    // Por exemplo: savePhoto(canvasElement.toDataURL('image/jpeg'));
}

// Função para trocar entre câmeras
function switchCamera() {
    facingMode = facingMode === "user" ? "environment" : "user";
    startCamera();
}

// Event Listeners
captureButton.addEventListener('click', capturePhoto);
switchCameraButton.addEventListener('click', switchCamera);

// Iniciar a câmera quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    startCamera();
});

// Opcional: Verificar se a API MediaDevices é suportada
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('A API de câmera não é suportada neste navegador.');
}