app.controller('AllCustomersCtrl', function($scope, allCustomers, allOrders){
	$scope.allCustomers = allCustomers;
	$scope.numOrders = {};
	$scope.totalSpent = {};
	allOrders.forEach(function(order){
		var user = order.user._id.toString();
		if (!$scope.numOrders[user]) $scope.numOrders[user] = 0;
		$scope.numOrders[user]++
		if (!$scope.totalSpent[user]) $scope.totalSpent[user] = 0;
		$scope.totalSpent[user] += order.orderTotal;
	});
	// console.log("totalSpent is ", $scope.totalSpent)

	// console.log($scope.numOrders);
})