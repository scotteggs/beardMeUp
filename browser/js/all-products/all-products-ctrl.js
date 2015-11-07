app.controller('AllProductsCtrl', function ($scope, allProducts, ProductFactory, $uibModal){
	$scope.allProducts = allProducts;
	$scope.orderFilter = "all";
	$scope.addProduct = true;
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
})