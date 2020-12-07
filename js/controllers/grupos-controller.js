angular.module('alurapic').controller('GruposController', function($scope, $http) {

    $scope.grupos = [];

    $http.get('v1/grupos')
    .success(function(grupos) {
        $scope.grupos = grupos; //ira capturar os dados do servidor e inserir em scope.grupos
    })
    .error(function(erro) {
        console.log(erro)
    })

})