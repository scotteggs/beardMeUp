app.controller('checkoutCtrl', function($scope, theUser, theCart, $state, OrdersFactory, ProductFactory, $uibModal, OrderSuccessModal){
	$scope.user = theUser;
	$scope.cart= theCart;
	$scope.billing = theUser.primaryAddress[0]||{};

	$scope.placeOrder = function(){
		var order = {};
		order.cart = $scope.cart;
		order.user = $scope.user;
		order.deliveryAddress = $scope.delivery;
		// order.billing = $scope.billing;
		// order.card = $scope.card;

		OrdersFactory.checkout(order)
		.then(function(order){
			$scope.cart = [];
			$scope.billing = [];
			$state.go('home');
			$uibModal.open(OrderSuccessModal);
		})
		.catch(function(err){
			console.error(err)
		})
	}

})