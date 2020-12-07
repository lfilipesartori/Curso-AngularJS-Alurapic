//através do foto-controller, são executadas as diretivas do angular passadas no foto.html
//através dessas diretivas são executadas funções que apresentam dados na tela, como foto, e titulo, e url armazenando os mesmos em um servidor, via ajax, ou imrpimindo num console.log

            /*
             * @ valor que for passado dentro do atributo 
             * & indicando que sera passado uma expressao 
             * = permite que qualquer alteracao na propriedade sera avisado pelo controller 
            */


angular.module('alurapic').controller('FotoController', function($scope, $routeParams, recursoFoto, cadastroDeFotos){ //recursoFoto e cadastroDeFotos, nome passado do service

    $scope.foto = {};
    $scope.mensagem = '';

    if($routeParams.fotoId){ //se foi passado o parametro da rota
        
        recursoFoto.get({fotoId : $routeParams.fotoId}, function(foto) {
            $scope.foto = foto;
        }, function() {
            console.log(erro);
            $scope.mensagem = 'Não foi possível obter a foto';
        }); 
        
        /*.success(function(foto){ //se tiver sucesso, pega foto
            $scope.foto = foto; //escopo da foto, recebe foto
        })
        .error(function(erro) {
            console.log(erro);
            $scope.mensagem = 'Não foi possível obter a foto';
        })*/
    }

    $scope.submeter = function() {
        if($scope.formulario.$valid){
                    //código simplificado com mensagens passadas do service
            cadastroDeFotos.cadastrar($scope.foto)
            .then(function(dados) {
                $scope.mensagem = dados.mensagem;   //passando a mensagem que será exibida para o usuário, mensagem vem lá do service
                if(dados.inclusao) $scope.foto = {};  //se tiver uma inclusao, escopo será limpo
            })
            .catch(function(erro) {
                $scope.mensagem = erro.mensagem;
            })


                        //ANTES DO SERVICE cadastroDeFotos
            /*if($scope.foto._id) {       //se a foto já tem ID, é porque eu quero alterar, se não, é porque quero incluir, ou seja, ou ela já esta no banco, ou é uma foto nova
                
                recursoFoto.update({fotoId : $scope.foto._id}, $scope.foto, function() {   //passa o id da foto, a foto em sí, e no final captura o resultado com a function
                    $scope.mensagem = 'A foto ' + $scope.foto.titulo + ' Foi alterada com sucesso';
                }, function(erro) {
                    console.log(erro);
                    $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
                    $scope.focado = true;

                });

            }else{
                recursoFoto.save($scope.foto, function() {
                    $scope.foto = {};
                    $scope.mensagem = 'Foto incluída com sucesso';
                }, function() {
                    $scope.mensagem = 'Não foi possível incluir a foto';
                    console.log(erro);
                })*/
        }
    }
});