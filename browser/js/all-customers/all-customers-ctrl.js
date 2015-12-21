app.controller('AllCustomersCtrl', ['$scope', 'allCustomers', 'allOrders', 'UserFactory', '$uibModal', 'CustomerEditModal', function($scope, allCustomers, allOrders, UserFactory, $uibModal, CustomerEditModal){
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
	
	$scope.editCustomer = function(id){
		var modalInstance = $uibModal.open(CustomerEditModal(id))
	}
}])