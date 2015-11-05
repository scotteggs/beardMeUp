app.controller('AllOrdersCtrl', function($scope, allOrders){
	$scope.allOrders = allOrders;
	console.log("allOrders is ", $scope.allOrders)
	$scope.pendingCount = allOrders.filter(function(order){
		return order.status.toLowerCase() !== "fulfilled";
	}).length;
})