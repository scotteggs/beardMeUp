app.controller('AllOrdersCtrl', function($scope, allOrders){
	$scope.allOrders = allOrders;

	//fulfilled, unfulfilled, all
	$scope.orderFilter = "all";

	$scope.correctOrder = function(order){
		if(order.status === 'fulfilled' && $scope.orderFilter === 'fulfilled') return true;
		if((order.status === 'unfulfilled' || order.status === 'overdue') && $scope.orderFilter === 'unfulfilled') return true;
		if($scope.orderFilter === 'all') return true;
		return false;
	}
	console.log("allOrders is ", $scope.allOrders)
	$scope.pendingCount = allOrders.filter(function(order){
		return order.status.toLowerCase() !== "fulfilled";
	}).length;
})