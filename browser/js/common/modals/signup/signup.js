app.controller('signupCtrl', ['$http', 'UserFactory', 'AuthService', '$scope', '$uibModalInstance', '$state', function ($http, UserFactory, AuthService, $scope, $uibModalInstance, $state) {
	$scope.signup = function (user) {
		//signup and login here
		UserFactory.signup(user)
		.then( function (user) {			
			AuthService.getLoggedInUser(user)
		})	
		.then( function (user){
			$uibModalInstance.dismiss()
			$state.go('home');	
		})
	}

	$scope.googleSignup = function() {
		return;
	}
}])