app.controller('checkoutCtrl', function($scope, theUser, theCart, $state, OrdersFactory, ProductFactory, $uibModal, orderSuccess, UserFactory){
	$scope.user = theUser;
	$scope.cart= theCart;
	$scope.billing = theUser.primaryAddress[0]||{};

	$scope.showDelivery = false;
	$scope.showDelivery = function(){
		if($scope.showDelivery) $scope.delivery = $scope.billing;
		$scope.delivery = {}
	}

	$scope.placeOrder = function(){
		window.Stripe.card.createToken({
			number: '4242424242424242',
			exp_month: '12',
			exp_year: '16'
		}, $scope.handleStripe)

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
			$uibModal.open(orderSuccess(order))
		})
		.catch(function(err){
			console.error(err)
		})
	}

	$scope.cartTotal = function(){
		var total = 0;
		$scope.cart.forEach(function(cartItem){
			total += cartItem.qty * cartItem.price;
		})
		return total;
	}

	$scope.handleStripe = function(status, response){
		if(response.error){
			console.error(response.error)
		}
		else{
			var token = response.id;
			var amount = $scope.cartTotal()
			UserFactory.handlePayment(theUser._id, token, amount)
		}
	}


})