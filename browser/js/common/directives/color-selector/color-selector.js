app.directive('colorSelector', function() {
	return {
		restrict: 'E',
		scope: {
			theColors: '=',
			color: '=ngModel'
		},
		templateUrl: 'js/common/directives/color-selector/color-selector.html',
		link: function(scope, element, attribute) {
			scope.switchColor = function(color) {
				scope.color = color.split(' ').join('');
			}
			scope.colorMap = {
				'black': '#202020',
				'dark brown': '#390E0E',
				'brown': '#6A4711',
				'blond': '#d7d822',
				'red': '#ce1111',
				'green': '#64bf40',
				'blue': '#3399FF',
				'gray': '#444444'
			}
		}
	}
})