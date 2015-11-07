app.controller('checkoutCtrl', function($scope, theUser, $state){
	$scope.user = theUser;
	$scope.cart= $scope.user.cart;
	$scope.billing = theUser.primaryAddress[0]||{};

	$scope.placeOrder = function(){
		$state.go('home');
	}
})