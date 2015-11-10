app.controller('editCustomerCtrl', function (theCustomer, $scope, UserFactory) {
	$scope.theCustomer = theCustomer;
	$scope.updateStatus = '';
	$scope.submitEdit = function(){
		var customerID = $scope.theCustomer._id;
		delete $scope.theCustomer._id;
		UserFactory.updateOne(customerID, $scope.theCustomer)
		.then(function(){
			$scope.updateStatus = 'Update Successful';
		})
	}
})