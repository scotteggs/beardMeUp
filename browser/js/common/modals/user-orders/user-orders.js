app.controller('UserOrdersCtrl', ['theOrders', 'theUser', '$scope', '$modalInstance', function (theOrders, theUser, $scope, $modalInstance) {
	$scope.user = theUser;
	$scope.orders = theOrders;
	$scope.closeWindow = function(result){
		$modalInstance.close(result);
	};
}])