// Variáveis globais para PWA
var myPrompt;
var pwaAlert;
var btnPwa;

// Registrar o evento deviceready uma única vez
document.addEventListener('deviceready', onDeviceReady.bind(this), false);

// Esta função será chamada quando o dispositivo estiver pronto
function onDeviceReady() {
    console.log('Device ready event fired');

    // Inicializamos elementos UI do PWA depois que o dispositivo está pronto
    pwaAlert = document.querySelector('.pwa_alert');
    btnPwa = document.querySelector('.pwa_alert_btn');

    // Configuramos botão PWA
    if (btnPwa) {
        btnPwa.addEventListener('click', () => {
            if (pwaAlert) pwaAlert.style.display = 'none';
            if (myPrompt) {
                myPrompt.prompt();
                myPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('Usuário aceitou');
                    } else {
                        console.log('Usuário cancelou o prompt');
                    }
                });
            }
        });
    }

    var mainView = app.views.create('.view-main', {
        url: '/index/'
    });

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
        // variavel para pegar a rota que estamos
        var nome = app.views.main.router.url;
        // Adicione sua lógica de navegação aqui com base na rota atual
    }
}

// Service Worker Registration
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

// Install prompt handling
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    console.log('Pronto para instalar', e);
    myPrompt = e;

    if (pwaAlert) pwaAlert.style.display = 'block';
});

// Framework7 initialization
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

        /*{
            path: '/login/',
            url: 'login.html',
            on: {
                pageInit: function (event, page) {
                    //Chamar pagina inicial Home
                    app.views.main.router.navigate('/login/');
                }
            }
        },*/

        {
            path: '/index/',
            url: 'index.html',
            on: {
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
                    app.panel.close();
                }
            }
        },
        {
            path: '/dashboard/',
            url: 'dashboard.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close();
                }
            }
        },
        {
            path: '/usuarios/',
            url: 'usuarios.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close();
                }
            }
        },
        {
            path: '/pessoas/',
            url: 'pessoas.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close();
                }
            }
        },
        {
            path: '/policiais/',
            url: 'policiais.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close();
                }
            }
        },
        {
            path: '/relatorios/',
            url: 'relatorios.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close();
                }
            }
        },
        {
            path: '/suporte/',
            url: 'suporte.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close();
                }
            }
        },
        {
            path: '/sobre/',
            url: 'sobre.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close();
                }
            }
        },
        {
            path: '/contato/',
            url: 'contato.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close();
                }
            }
        },
        {
            path: '/config/',
            url: 'config.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close();
                }
            }
        },
        {
            path: '/verificar_preso/',
            url: 'verificar_preso.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    app.panel.close();
                }
            }
        }
    ],
    // ... other parameters
});

var application = {
    // Inicializa a aplicação
    initialize: function () {
        this.bindEvents();
    },

    // Associa eventos necessários
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // Chamado quando o dispositivo estiver pronto
    onDeviceReady: function () {
        console.log('Dispositivo pronto!');
        // Aqui você poderia preparar outras coisas se quiser
    },

    // Função para capturar o rosto
    verificarRosto: function () {
        navigator.camera.getPicture(
            this.onSuccess,
            this.onFail,
            {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                saveToPhotoAlbum: true
            }
        );
    },

    // Se captura com sucesso
    onSuccess: function (imageData) {
        var image = document.getElementById('minhaImagem');
        image.style.display = "block";
        image.src = "data:image/jpeg;base64," + imageData;
    },

    // Se falhar
    onFail: function (message) {
        alert('Falhou porque: ' + message);
    }
};

// Inicializa ao carregar a página
application.initialize();