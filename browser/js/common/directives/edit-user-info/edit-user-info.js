app.directive('editUserInfo', function(UserFactory) {
	return {
		restrict: 'E',
		scope: {
			theUser: '='
		},
		templateUrl: 'js/common/directives/edit-user-info/edit-user-info.html',
		link: function(scope, element, attribute) {
			scope.updateInfo = function(user) {
				UserFactory.updateOne(user._id, user)
				.then(function(user) {
					//console.log(user);
				})
				.catch(function(err) {
					console.log(err);
				})
			}
			scope.restore = function() {
				UserFactory.fetchOne(scope.theUser._id)
				.then(function(user) {
					scope.theUser = user;
				})
			}
		}
	}
})