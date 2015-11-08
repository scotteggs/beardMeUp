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

app.controller('UserProfile', function ($scope, theUser, $uibModal, AuthService, OrdersFactory) {
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
			$uibModal.open({
				animation: true,
			  templateUrl: '/js/common/modals/edit-user/edit-user.html',
			  controller: 'EditUserCtrl',
			  size: 'lg',
			  resolve: {
			    theUser: function(AuthService){
			        return AuthService.getLoggedInUser();
			    }
			  }
			})
		};
		$scope.openUserOrders = function() {
			$uibModal.open({
				animation: true,
			  templateUrl: '/js/common/modals/user-orders/user-orders.html',
			  controller: 'UserOrdersCtrl',
			  size: 'lg',
			  resolve: {
			    theUser: function(AuthService){
			      return AuthService.getLoggedInUser();
			    },
			    theOrders: function(OrdersFactory, AuthService){
			    	return AuthService.getLoggedInUser().then( function (user) {
			    		return OrdersFactory.getOrdersByUser(user.id);
			    	})
			    }
			  }
			});
		}
})