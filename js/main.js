// Módulo principal

angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'meusServicos']) //comando universal do angular, criando um módulo com o nome do projeto, passando array para CRIAR
                                //se o array não for passado, quer dizer que você quer criar um módulo já existente.
                                //para conseguir usar as diretivas, deve se importar minhasDiretivas no módulo principal, assim como outros módulos podem depender do principal também.
.config(function($routeProvider, $locationProvider){ //artefato do angular que é configurado as rotas que rodam no client

        $locationProvider.html5Mode(true);  //ativa o modo html5 onde não será mais necessário o uso de # no endereço

        $routeProvider.when('/fotos',{     // carrega a pagina através do html principal, passando o endereço /fotos com o # por padrão no endereço, e associado com o controller, e a principal html será inserida na ng-view 
            templateUrl: 'partials/principal.html', //aqui é selecionado a view que deseja carregar, ou seja, se passar um enderço "new" e um new.html ou o nome que for, ele carregará o conteudo dentro dessa view, se passado o endereço corretamente na página, assim abrindo outra página
            controller: 'FotosController'
        });
        $routeProvider.when('/fotos/new',{
            templateUrl: 'partials/foto.html',
            controller: 'FotoController'
        });
        $routeProvider.when('/fotos/edit/:fotoId', {
			templateUrl: 'partials/foto.html',
			controller: 'FotoController as ctrl'
		});
        
        $routeProvider.otherwise({ redirectTo: '/fotos' }); //redireciona o usuario para a pagina principal caso o endereço digitado não exista
});
