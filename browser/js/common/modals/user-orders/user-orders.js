app.controller('UserOrdersCtrl', function (theOrders, theUser, $scope) {
	$scope.user = theUser;
	$scope.orders = theOrders;

})