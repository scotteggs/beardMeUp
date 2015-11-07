app.controller('EditUserCtrl', function (theUser, $scope, $state, UserFactory, $uibModalInstance) {
	$scope.theUser = theUser;

	$scope.updateInfo = function (user) {
		UserFactory.updateOne(user._id, user)
		.then(function() {
			$uibModalInstance.dismiss()
			$state.go($state.current, {}, {reload: true});
		})
		.catch(function(err) {
			console.log(err);
		})
	};
	$scope.restore = function () {
		$uibModalInstance.dismiss()
		$state.go($state.current, {}, {reload: true});
	}

})