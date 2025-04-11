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

                    //click do botao salvar
                    $('.btn-salvar').on("click", function () {
                        app.dialog.confirm('Voce deseja confirmar?', "Titulo", function () {
                            toastBottom = app.toast.create({
                                text: 'This is default bottom positioned toast',
                                closeTimeout: 2000,
                            });
                            // Open it
                            toastBottom.open();

                        });
                    })

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