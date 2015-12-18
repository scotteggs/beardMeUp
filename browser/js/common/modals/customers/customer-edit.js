app.controller('editCustomerCtrl', ['theCustomer', '$scope', 'UserFactory', '$uibModalInstance', function (theCustomer, $scope, UserFactory, $uibModalInstance) {
	$scope.theCustomer = theCustomer;
	$scope.updateStatus = '';
	$scope.submitEdit = function(){
		var customerID = $scope.theCustomer._id;
		delete $scope.theCustomer._id;
		UserFactory.updateOne(customerID, $scope.theCustomer)
		.then(function(edited){
			$scope.updateStatus = 'Update Successful';
		})
	}
}])