app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/login',
		templateUrl: 'js/login/signup.html',
		controller: 'SignupCtrl'
	});
});

app.controller('SignupCtrl', function ($scope, AuthService, $state) {
	
})