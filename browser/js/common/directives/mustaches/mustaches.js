app.directive('mustaches', function() {
	return {
		restrict: 'E',
		scope: {
			numStaches: '='
		},
		templateUrl: 'js/common/directives/mustaches/mustaches.html',
		link: function(scope, element, attribute) {
			scope.$watch("numStaches", function() {
				scope.images = [];
				for(var i = 0; i < 5; i++) {
					scope.images.push('no_beard');
				}
				for(var i = 0; i < scope.numStaches; i++) {
					scope.images[i] = 'one_beard';
				}
				if (scope.numStaches%1 !== 0) {
					var index = scope.numStaches-.5
					scope.images[index] = 'half-beard';
				}
			})
		}
	}
})