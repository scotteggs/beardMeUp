app.directive('mustaches', function() {
	return {
		restrict: 'E',
		scope: {
			num: '='
		},
		templateUrl: 'js/common/directives/mustaches/mustaches.html',
		link: function(scope, element, attribute) {
			scope.images = [];
			for(var i = 0; i < 5; i++) {
				scope.images.push('no_beard');
			}
			for(var i = 0; i < scope.num; i++) {
				scope.images[i] = 'one_beard';
			}
			if (scope.num%1 !== 0) {
				var index = scope.num-.5
				scope.images[index] = 'half-beard';
			}
		}
	}
})