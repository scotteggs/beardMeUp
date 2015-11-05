app.config(function ($stateProvider) {
	$stateProvider.state('userProfile', {
		url: '/user-profile',
		controller: 'UserProfile',
		templateUrl: 'js/user-profile/user-profile.html',
		resolve: {
			theUser: function (AuthService) {
				return AuthService.getLoggedInUser()
			}
		}
	});
});

app.controller('UserProfile', function ($scope, theUser) {
		$scope.user = theUser;

})