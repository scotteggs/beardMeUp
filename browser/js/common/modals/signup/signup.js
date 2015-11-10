app.controller('signupCtrl', function (UserFactory, AuthService, $scope, $uibModalInstance, $state) {
	$scope.signup = function (user) {
		console.log('user from form', user)
		//signup and login here
		UserFactory.signup(user)
		.then( function (user) {
			var loginInfo = {
				email: user.email, 
				password: user.password
			}
			console.log('loginInfo', loginInfo)
			AuthService.login(loginInfo)
		//	$uibModalInstance.dismiss()
		//	$state.go('home', {}, {reload: true});
		})


	}
})