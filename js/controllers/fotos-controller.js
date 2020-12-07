                                                                            //$resource substituirá o $http
angular.module('alurapic').controller('FotosController', function($scope, $resource, recursoFoto){ //cria um controller através do comando universal angular module
                                                                      //primeiro recebe o nome do controller FotosController(começa com maiúscula)
                                                                      //segundo recebe a função que define esse controller | $http faz requisição pro servidor
                                                                      //$scope usado para injetar a depêndencia e carregar dados do scopo para a view com o controller
    $scope.fotos = [];
    $scope.filtro =''; //captura o que foi digitado no input, dentro do filtro e mostra no escopo
    $scope.mensagem = '';

    var recursoFoto = $resource('v1/fotos/:fotoId')    //$resouce faz a mesma coisa que $http, porém fica "escondido" mas a requisição ao banco é a mesma

    recursoFoto.query(function(fotos) {     //query = consulta
        $scope.fotos = fotos;
    }, function(erro) {                     
        console.log(erro);
    });    

   /* $http.get('v1/fotos')       //forma simplificada
        .success(function(fotos){   // se teve sucesso, cria uma função recebendo fotos, com os dados vindos do servidor  
            $scope.fotos = fotos;   // o escopo recebe fotos, assim fazendo o retorno como no data
        })
        .error(function(erro){      // se não, é passado uma função de erro e assim exibindo o erro
            console.log(erro);
        });                         //ao todo, é feito uma integração direto com o back-end para importar as fotos do servidor

    var promise = $http.get('v1/fotos'); //faz uma promessa de pegar os dados de fotos via http
    promise.then(function(retorno){ //se conseguir, passa uma função de retorno
        $scope.fotos = retorno.data //assim carregando o escopo de fotos retornando os dados

    }).catch(function(error){ //se não comprir a promessa, apresenta um erro
        console.log(error);

    });*/

    $scope.remover = function(foto){  //remove a foto

        recursoFoto.delete({fotoId : foto._id}, function() {   
            var indiceFoto = $scope.fotos.indexOf(foto); //pega o indice da foto dentro da lista, e o retorna para indiceFoto
            $scope.fotos.splice(indiceFoto, 1); //splice modifica a lista que ele está operando, essa linha de comando remove uma foto do scopo, de onde? do indiceFotos, remove 1
            $scope.mensagem = 'Foto ' + foto.titulo + ' foi removida com sucesso!';
        
        }, function(erro) {
            console.log(erro)
            $scope.mensagem = 'não foi possível remover a foto ' + foto.titulo;

        });
    };

});