app.config(function ($stateProvider) {
	$stateProvider.state('userProfile', {
		url: '/user-profile',
		controller: 'UserProfile',
		templateUrl: 'js/user-profile/user-profile.html',
		resolve: {
			theUser: function (AuthService) {
				return AuthService.getLoggedInUser(true)
			}
		}
	});
});

app.controller('UserProfile', function ($scope, theUser, $uibModal, AuthService) {
		$scope.user = theUser;
		$scope.showOrders = false;
		$scope.showEditInfo = false;

		$scope.toggleOrderView = function() {
			$scope.showOrders = !$scope.showOrders;
		}

		$scope.toggleEditInfoView = function() {
			$scope.showEditInfo = !$scope.showEditInfo;
		}

		$scope.openUserInfo = function() {
			var modalInstance = $uibModal.open({
				animation: true,
			  templateUrl: '/js/common/modals/edit-user/edit-user.html',
			  controller: 'EditUserCtrl',
			  size: 'lg',
			  resolve: {
			  //   theCart: function (UserFactory, AuthService) {
			  //     return AuthService.getLoggedInUser()
			  //     .then(function(user) {
			  //       return UserFactory.getCart(user._id);
			  //     })
			  //   },
			    theUser: function(AuthService){
			        return AuthService.getLoggedInUser();
			    }
			  }
			})
		}
})