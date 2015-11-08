app.controller('CartCtrl', function (theCart, $scope, theUser, UserFactory, $state, $uibModalInstance) {
	$scope.user = theUser;
	$scope.cart = theCart;
	$scope.checkout = function(){
		$uibModalInstance.dismiss()
		$state.go('checkout')
	}	

})