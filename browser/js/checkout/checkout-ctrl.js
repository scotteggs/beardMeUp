app.controller('checkoutCtrl', function($scope, theUser, $state, OrdersFactory, ProductFactory, $uibModal){
	$scope.user = theUser;
	$scope.cart= $scope.user.cart;
	$scope.billing = theUser.primaryAddress[0]||{};


	function sendOrderEmail(user){

	}


	$scope.placeOrder = function(){
		var order = {};
		order.cart = $scope.cart;
		order.user = $scope.user;
		order.deliveryAddress = $scope.delivery;
		// order.billing = $scope.billing;
		// order.card = $scope.card;

		OrdersFactory.checkout(order)
		.then(function(order){
			console.log("the order is ", order)
			console.log("about to open our modal")
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