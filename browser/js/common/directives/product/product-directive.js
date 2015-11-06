app.directive('addProduct', function(ProductFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/product/single-product.html',
		// scope: {
		// 	colors: "=",
		// },
		link: function(scope){
			scope.colors = ['black', 'blond', 'brown', 'dark brown', 'red', 'green', 'blue', 'gray'],
			scope.theColors = {},
			scope.addProduct = function(data){

				ProductFactory.addProduct(data);
			}
		}
	}
	
})