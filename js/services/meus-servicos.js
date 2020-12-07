angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function($resource) {  //factory retorna um objeto com as propriedades do angular

                                        //null para usar a quary string, url com interrogação, parametros igual a tanto, etc.
    return $resource('v1/fotos/:fotoId', null, {  //$resouce faz a mesma coisa que $http, porém fica "escondido" mas a requisição ao banco é a mesma
        update : {
            method: 'PUT'
        }
    });   
})
.factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope) {

    var servico = {};
    var evento = 'fotoCadastrada';

    servico.cadastrar = function(foto) {
        return $q(function(resolve, reject) {      //$q permite criar promisses, é passado dois parametros, resolve e reject, sera passada para o then e o catch.
            if(foto._id) {
                recursoFoto.update({fotoId: foto._id}, foto, function() {
                   
                    $rootScope.$broadcast(evento);
                   
                    resolve({
                        mensagem: 'foto ' + foto.titulo + ' atualizada com sucesso',
                        inclusao: false     //inclusão é false pq aqui ele altera
                    });
                }, function(erro) {
                    console.log(erro)
                    reject({
                       mensagem: 'Não foi possível alterar a foto ' + foto.titulo
                    });
                });

            }else {

                recursoFoto.save(foto, function() {
                    
                    $rootScope.$broadcast(evento);
                    
                    resolve({
                        mensagem: 'Foto ' + foto.titulo + ' incluida com sucesso',
                        inclusao: true    //aqui ele inclui
                    });
                }, function(erro) {
                    console.log(erro)
                    reject('Não foi possível incluir a foto ' + foto.titulo);
                });    
            }
        });
    };

    return servico
});

