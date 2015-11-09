app.controller('AllProductsCtrl', function ($scope, allProducts, ProductFactory, $uibModal, UserFactory){
	$scope.allProducts = allProducts;
	$scope.types = ['All', 'Beard', 'Mustache'];
	$scope.productFilter = "all";
	$scope.changeFilter = function(newFilter){
		$scope.productFilter = newFilter;
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
				},
				theOwners: function(){
					return UserFactory.getStoreOwners()
				}
			}
		})
	}
	$scope.addProduct = function(){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/js/common/modals/products/add-product.html',
			controller: 'addProductCtrl',
			size: 'lg',
			resolve: {
				theOwners: function(){
					return UserFactory.getStoreOwners()
				}
			}
		}) 
	}
})