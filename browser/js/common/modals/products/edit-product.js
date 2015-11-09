app.controller('editProductCtrl', function (theProduct, $scope, ProductFactory, $uibModalInstance) {
	theProduct.price = theProduct.price/100;
	var colorsObject = {};
	theProduct.colors.forEach(function(color) {
		colorsObject[color] = true;
	})
	theProduct.colors = colorsObject;
	$scope.beardColors = ['black', 'blond', 'brown', 'dark brown', 'red', 'green', 'blue', 'gray'];
	theProduct.tags = theProduct.tags.join(', ')
	$scope.theProduct = theProduct;
	$scope.updateStatus = '';
	$scope.submitEdit = function(){
		ProductFactory.editProduct($scope.theProduct)
		.then(function(edited){
			$scope.updateStatus = 'Update Successful';
		})
	}
})