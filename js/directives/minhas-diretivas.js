//diretivas do angular usadas para simplificar o codigo em HTML, criando uma tag como diretiva <meu-painel> que é igual a meuPainel

angular.module('minhasDiretivas', []).directive('meuPainel', function(){ //diretiva criado com o nome meuPainel, no mesmo padrão que o controller
    
    var ddo ={};                 //declara um variável ddo(directive definition object) passando um objeto
    
    ddo.restric = "AE";         //AE = atribute element | define a restrição dela | usar só elemento "A", só atributo "E", os dois "AE"    

        ddo.scope = {          //esse scope é só da diretiva, diferente do $scope do controller
            titulo: '@'       //cada painel tem um titulo, cada view tem uma diretiva | o @titulo(se for só @ representa um valor em String que será passado em {{foto.titulo}} no valor titulo) ou o que for, substitui o valor passado na diretiva <meu-painel titulo="leão ou {{foto.titulo}}"></meu-painel>
        };

        ddo.transclude = true;
   
        ddo.templateUrl = 'js/directives/meu-painel.html'  //template linkando o htlm meu-painel.html para nao passar tudo como string concatenado aqui.
   
    return ddo;             //retorna o ddo

})

.directive('minhaFoto', function() {

	var ddo = {};

	ddo.restrict = "AE";
	ddo.transclude = true;

	ddo.scope = {
		//url: '@url', //ou
		url: '@',  // quando os nomes forem iguais
		titulo: '@'
	};

	ddo.templateUrl = 'js/directives/minha-foto.html';

	return ddo;
})

.directive('meuBotaoPerigo',function(){

	var ddo = {};
	//restrição E -> elemento 
	ddo.restrict = "E";

	ddo.scope = {
		nome:'@',  //indica uma string
		acao:'&'  //indicando que sera passado uma expressao ao banco de dados
	};

	ddo.template = '<button ng-click="acao(foto)" class="btn btn-danger btn-block" >{{nome}}</button>';

	return ddo;
})

.directive('meuFocus', function() {
	var ddo = {};

	ddo.restric = "A"

	/*ddo.scope = {
		focado: '='    //comunicação bi direcional, qualquer alteração que a diretiva faça na propriedade o controller fica sabendo, e qualquer alteração que o controller faça, a diretiva fica sabendo
	};*/

	ddo.link = function(scope, element) {
		scope.$on('fotoCadastrada', function() {
			element[0].focus();
		
		/*scope.$watch('focado', function() { //essa função será executada sempre que a propriedade focada for alterada
			if(scope.focado) { //se focus for true, ele pega o elemento do DOM passado e executa com o focus
				element[0].focus();
				scope.focado = false; //o botão voltar ganha o foco, então é só apertar enter pra voltar, dpois disso, ele ganha falso, pra não permanecer sempre focado
			}*/
		});
	};

	return ddo;
});