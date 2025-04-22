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

function verificarPreso() {
    var act = app.actions.create({
        grid: true,
        buttons: [
            [
                {
                    text: 'Camera',
                    icon: '<img src="img/camera.png" width="48">',
                    onClick: function() {
                        camera()
                    }
                }
            ]
        ]
    })
    act.open()
}

function camera() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        saveToPhotoAlbum: true,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        correctOrientation: true,
        destinationType: Camera.DestinationType.FILE_URI
    });

    //CASO DE SUCESSO AO TIRAR FOTO 
    function onSuccess(imageURI) {
        var image = document.getElementById('foto');
        app.preloader.show();

        // //LOCALIZAÇÃO LOCAL DA FOTO
        //alert(imageURI);

        //FUNÇÃO DE UPLOAD
        function uploadFile(localPath, fileName, remoteUrl, callback) {

            // loads local file with http GET request
            var xhrLocal = new XMLHttpRequest()
            xhrLocal.open('get', localPath)
            xhrLocal.responseType = 'blob'
            xhrLocal.onerror = () => {
                callback(Error('An error ocurred getting localpath on' + localPath))
            }
            xhrLocal.onload = () => {

                // when data is loaded creates a file reader to read data
                var fr = new FileReader()
                fr.onload = function (e) {
                    // fetch the data and accept the blob
                    console.log(e)
                    fetch(e.target.result)
                        .then(res => res.blob())
                        .then((res) => {
                            // now creates another http post request to upload the file
                            var formData = new FormData()
                            formData.append('file', res, fileName)
                            // post form data
                            const xhrRemote = new XMLHttpRequest()
                            //xhrRemote.responseType = 'json'
                            // log response
                            xhrRemote.onerror = () => {
                                callback(Error('An error ocurred uploading the file to ' + remoteUrl))
                            }
                            xhrRemote.onload = () => {
                                if (typeof callback === 'function') {
                                    //desativar o comentario abaixo enquanto tiver testando
                                    //alert(xhrRemote.response);

                                    //passar para o input nome_foto o nome da foto
                                    $('#nome_foto').val(xhrRemote.response);
                                    image.src = url_img + xhrRemote.response;
                                    callback(null, 'Upload de Arquivo Realizado: ' + xhrRemote.response)
                                }
                            }

                            // create and send the reqeust
                            xhrRemote.open('POST', remoteUrl)
                            xhrRemote.send(formData)
                        })
                }
                fr.readAsDataURL(xhrLocal.response) // async call
            }
            xhrLocal.send()
        }


        uploadFile(imageURI,
            'myfile.jpg',
            url_api + 'fotos/upload.php',
            (err, res) => {
                if (err) {
                    //alert(err)
                } else {
                    //alert(res)
                    app.preloader.hide();
                }
            })

    }

    function onFail(message) {
        alert('Falhou. Motivo: ' + message, 'FALHOU!');
    }
}