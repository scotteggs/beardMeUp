app.directive('addProduct', function(ProductFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/product/single-product.html',
		link: function(scope){
			scope.colors = ['black', 'blond', 'brown', 'dark brown', 'red', 'green', 'blue', 'gray'];
			scope.newProduct = {};
			scope.newProduct.beardType = "Beard"; //setting initial beard type on add new product page
			scope.addProduct = function(){
				ProductFactory.addProduct(scope.newProduct);
			}
		}
	}
	
})