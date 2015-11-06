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
		$scope.showOrders = false;

		$scope.toggleOrderView = function() {
			$scope.showOrders = !$scope.showOrders;
		}

		$scope.showEditInfo = false;

		$scope.toggleEditInfoView = function() {
			$scope.showEditInfo = !$scope.showEditInfo;
		}
})