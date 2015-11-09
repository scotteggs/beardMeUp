app.controller('editProductCtrl', function (theProduct, $scope, ProductFactory, $uibModalInstance, theOwners, $state) {
	console.log("the product is ", theProduct)
	$scope.owners = theOwners;
	console.log("owners is ",$scope.owners)

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
			$state.go($state.current, {}, {reload: true});
		})
	}
})