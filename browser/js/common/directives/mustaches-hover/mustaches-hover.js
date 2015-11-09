app.directive('mustachesHover', function() {
	return {
		restrict: 'E',
		scope: {
			rating: '=ngModel'
		},
		templateUrl: 'js/common/directives/mustaches-hover/mustaches-hover.html',
		link: function(scope, element, attribute) {
			scope.rating = null;
			scope.images = [];
			for(var i = 0; i < 5; i++) {
				scope.images.push('no_beard')
			}

			scope.updateImages = function(idx) {
				if(!scope.rating) {
					for(var i = 0; i < 5; i++) {
						if(i <= idx) scope.images[i] = 'one_beard_gray';
						else scope.images[i] = 'no_beard';
					}
				}
			}

			scope.setRating = function(idx) {
				for(var i = 0; i < 5; i++) {
					if(i <= idx) scope.images[i] = 'one_beard';
					else scope.images[i] = 'no_beard';
				}
				scope.rating = idx + 1;
				console.log(scope.rating)
			}

		}
	}
})