app.controller('AllProductsCtrl', function ($scope, allProducts, ProductFactory, $uibModal){
	$scope.allProducts = allProducts;
	$scope.types = ['All', 'Beard', 'Mustache'];
	$scope.orderFilter = "all";
	$scope.changeFilter = function(newFilter){
		$scope.orderFilter = newFilter;
	};
	$scope.editProduct = function(id){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/js/common/modals/products/edit-product.html',
			controller: 'editProductCtrl',
			size: 'lg',
			resolve: {
				theProduct: function(){
					return ProductFactory.fetchOne(id);
				}
			}
		})
	}
	$scope.addProduct = function(){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/js/common/modals/products/add-product.html',
			controller: 'addProductCtrl',
			size: 'lg'
		}) 
	}
})