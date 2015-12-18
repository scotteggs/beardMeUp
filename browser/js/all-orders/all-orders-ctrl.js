app.controller('AllOrdersCtrl', function($scope, allOrders, singleOrderModal, $uibModal){
	$scope.allOrders = allOrders;
	$scope.filters = ['All', 'Pending', 'Finished'];
	$scope.changeFilter = function(newFilter){
		$scope.orderFilter = newFilter;
	};

	$scope.orderFilter = "all";

	$scope.correctOrder = function(order){
		if(order.status === 'fulfilled' && $scope.orderFilter === 'finished') return true;
		if((order.status === 'unfulfilled' || order.status === 'overdue') && $scope.orderFilter === 'pending') return true;
		if($scope.orderFilter === 'all') return true;
		return false;
	}
	$scope.pendingCount = allOrders.filter(function(order){
		return order.status.toLowerCase() !== "fulfilled";
	}).length;

	$scope.viewOrder = function(orderId){
		console.log($uibModal);
		$uibModal.open(singleOrderModal(orderId))
	}
})