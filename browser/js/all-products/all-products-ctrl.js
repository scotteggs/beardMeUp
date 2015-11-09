app.controller('AllProductsCtrl', function ($scope, allProducts, ProductFactory, $uibModal, addProduct, EditProductModal){
	$scope.allProducts = allProducts;
	$scope.types = ['All', 'Beard', 'Mustache'];
	$scope.productFilter = "all";
	$scope.changeFilter = function(newFilter){
		$scope.productFilter = newFilter;
	};
	$scope.editProduct = function(id){
		var modalInstance = $uibModal.open(EditProductModal(id))
	}
	$scope.addProduct = function(){
		var modalInstance = $uibModal.open(addProduct) 
	}
})

app.value('addProduct', {
	animation: true,
	templateUrl: '/js/common/modals/products/add-product.html',
	controller: 'addProductCtrl',
	size: 'lg'
})