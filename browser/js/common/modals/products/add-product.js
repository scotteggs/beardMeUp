app.controller('addProductCtrl', ['$scope', 'ProductFactory', '$uibModalInstance', '$state', function ($scope, ProductFactory, $uibModalInstance, $state) {
	$scope.newProduct = {};
	$scope.colors = ['black', 'blond', 'brown', 'dark brown', 'red', 'green', 'blue', 'gray'];
	$scope.addProduct = function(){
		ProductFactory.addProduct($scope.newProduct)
		.then(function(newItem){
			$uibModalInstance.dismiss();
			$state.go($state.current, {}, {reload: true});
		})
	}
}])