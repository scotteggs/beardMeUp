app.controller('AllProductsCtrl', function($scope, allProducts){
	$scope.allProducts = allProducts;
	$scope.orderFilter = "all";
	$scope.addProduct = true;
	$scope.editProduct = function(id){
		console.log(id);
	}
})