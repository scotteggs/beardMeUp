app.controller('signupCtrl', function (UserFactory, AuthService, $scope, $uibModalInstance, $state) {
	$scope.signup = function (user) {
		//signup and login here
		UserFactory.signup(user)
		.then( function (auser) {			
			AuthService.getLoggedInUser(auser)
		})	
		.then( function () {
			$uibModalInstance.dismiss()
			$state.go('home');	
		})
	}
})