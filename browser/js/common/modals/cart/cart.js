app.controller('CartCtrl', function (theCart, $scope, theUser) {
	$scope.cart = theCart;
	console.log($scope.cart)
	$scope.remove = function(item){
		$scope.cart = $scope.cart.filter(function(cartItem){
			return item._id !== cartItem._id
		})
		
	}

	$scope.changeQuantity = function(idx, amount){
		$scope.cart[idx].qty += amount;
		if($scope.cart[idx].qty < 0) $scope.cart[idx].qty = 0;
	}
})