app.controller('editProductCtrl', ['theProduct', '$scope', 'ProductFactory', '$uibModalInstanc', 'theOwners', '$state', function (theProduct, $scope, ProductFactory, $uibModalInstanc, theOwners, $state) {
	console.log("the product is ", theProduct)
	$scope.owners = theOwners;
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
		console.log($scope.theProduct)
		ProductFactory.editProduct($scope.theProduct)
		.then(function(edited){
			$scope.updateStatus = 'Update Successful';
			$state.reload();
			setTimeout(function(){$uibModalInstanc.dismiss('cancel')}, 1000);
		})
	}
}])