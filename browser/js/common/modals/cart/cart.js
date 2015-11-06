app.controller('CartCtrl', function (theCart, $scope) {
	$scope.cart = theCart;
	console.log($scope.cart)
})