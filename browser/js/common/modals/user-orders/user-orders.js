app.controller('UserOrdersCtrl', function (theOrders, theUser, $scope, $modalInstance) {
	$scope.user = theUser;
	$scope.orders = theOrders;
	$scope.closeWindow = function(result){
		$modalInstance.close(result);
	};
})