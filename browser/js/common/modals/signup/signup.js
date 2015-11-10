app.controller('signupCtrl', function (UserFactory, AuthService, $scope, $uibModalInstance, $state) {
	$scope.signup = function (user) {
		//signup and login here
		UserFactory.signup(user)
		.then( function (user) {			
			AuthService.getLoggedInUser(user)
		})	
		.then( function (user) {
			$uibModalInstance.dismiss()
			$state.go('home');	
		})
	}
})