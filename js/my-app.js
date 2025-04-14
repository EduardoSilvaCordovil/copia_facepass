// Variáveis globais para PWA
var myPrompt;
var pwaAlert;
var btnPwa;

// App de câmera
var cameraApp = {
    initialize: function () {
        // Não chamamos bindEvents aqui para evitar recursão
    },
    bindEvents: function () {
        // Removido o addEventListener para deviceready para evitar recursão
    },
    capturePhoto: function () {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });

        function onSuccess(imageData) {
            let img = document.getElementById('fotoPreso');
            img.style.display = "block";
            img.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
};

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

    var mainView = framework7App.views.create('.view-main', {
        url: '/index/'
    });

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
        // variavel para pegar a rota que estamos
        var nome = framework7App.views.main.router.url;
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
var framework7App = new Framework7({
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
            path: '/login/',
            url: 'login.html',
            on: {
                pageInit: function (event, page) {
                    //Chamar pagina inicial Home
                    framework7App.views.main.router.navigate('/login/');
                }
            }
        },

        {
            path: '/index/',
            url: 'index.html',
            on: {
                pageInit: function (event, page) {
                    //Chamar pagina inicial Home                      
                    framework7App.views.main.router.navigate('/login/');
                }
            }
        },
        {
            path: '/home/',
            url: 'home.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
        {
            path: '/dashboard/',
            url: 'dashboard.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
        {
            path: '/usuarios/',
            url: 'usuarios.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
        {
            path: '/pessoas/',
            url: 'pessoas.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
        {
            path: '/policiais/',
            url: 'policiais.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
        {
            path: '/relatorios/',
            url: 'relatorios.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
        {
            path: '/suporte/',
            url: 'suporte.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
        {
            path: '/sobre/',
            url: 'sobre.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
        {
            path: '/contato/',
            url: 'contato.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
        {
            path: '/config/',
            url: 'config.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
        {
            path: '/verificar_preso/',
            url: 'verificar_preso.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
        {
            path: '/verificar_preso_2/',
            url: 'verificar_preso_2.html',
            on: {
                pageInit: function (event, page) {
                    //CONTEÚDO DA PÁGINA PRINCIPAL AQUI
                    framework7App.panel.close();
                }
            }
        },
    ],
    // ... other parameters
});

var $$ = Dom7;

// Registrar o evento deviceready uma única vez
document.addEventListener('deviceready', onDeviceReady, false);

/*var myPrompt;
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

        {
            path: '/verificar_preso_2/',
            url: 'verificar_preso_2.html',
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

}*/
