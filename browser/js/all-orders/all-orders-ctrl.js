app.controller('AllOrdersCtrl', function($scope, allOrders){
	$scope.allOrders = allOrders;
	console.log("allOrders is ", $scope.allOrders)
})