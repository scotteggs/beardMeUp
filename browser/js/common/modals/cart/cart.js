app.controller('CartCtrl', function (theCart, $scope, theUser, UserFactory, $state, $uibModalInstance) {
	$scope.cart = theCart;
	console.log($scope.cart)
	$scope.remove = function(item){
		$scope.cart = $scope.cart.filter(function(cartItem){
			return item._id !== cartItem._id
		})
		UserFactory.updateOne(theUser._id, {cart: $scope.cart});

	}

	$scope.changeQuantity = function(idx, amount){
		$scope.cart[idx].qty += amount;
		if($scope.cart[idx].qty < 0) $scope.cart[idx].qty = 0;
		UserFactory.updateOne(theUser._id, {cart: $scope.cart});
	}

	$scope.cartTotal = function(){
		var total = 0;
		$scope.cart.forEach(function(cartItem){
			total += cartItem.qty * cartItem.price;
		})
		return total;
	}

	$scope.checkout = function(){
		$uibModalInstance.dismiss()
		$state.go('checkout')
	}	

})