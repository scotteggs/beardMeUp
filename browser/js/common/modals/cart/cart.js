app.controller('CartCtrl', ['theCart', '$scope', 'theUser', 'UserFactory', '$state', '$uibModalInstance', function (theCart, $scope, theUser, UserFactory, $state, $uibModalInstance) {
	console.log("in cart control");
	$scope.user = theUser;
	$scope.cart = theCart;
	$scope.checkout = function(){
		$uibModalInstance.dismiss()
		$state.go('checkout')
	}
}])