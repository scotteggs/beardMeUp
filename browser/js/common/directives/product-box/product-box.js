app.directive('productBox', function (ProductFactory) {
	return {
		restrict: 'E',
		scope: {
			theProduct: '='
		},
		templateUrl: 'js/common/directives/product-box/product-box.html'
	}
})