app.controller('checkoutCtrl', function($scope, theUser, $state, OrdersFactory, ProductFactory, $uibModal){
	console.log("in checkout control theUser is ", theUser)
	$scope.user = theUser;
	$scope.cart= $scope.user.cart;
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
			$uibModal.open({
				animation: true,
				templateUrl: '/js/common/modals/order-success/order-success.html',
				controller: 'OrderSuccessCtrl',
				size: 'lg',
				resolve: {
					order: function(){
						return order;
					}
				}

			})
		})
		.catch(function(err){
			console.error(err)
		})
	}

})