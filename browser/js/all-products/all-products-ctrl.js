app.controller('AllProductsCtrl', function($scope, allProducts){
	$scope.allProducts = allProducts;
	$scope.orderFilter = "all";
	$scope.addProduct = true;
})