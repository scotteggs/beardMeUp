app.directive('productBox', function (ProductFactory) {
	return {
		restrict: 'E',
		scope: {
			theProduct: '='
		},
		templateUrl: 'js/common/directives/product-box/product-box.html'
		// link: function(scope, element, attr) {
		// 	scope.product;
		// 	ProductFactory.fetchOne(scope.productId)
		// 	.then(function(p) {
		// 		scope.product = p;
		// 	})
		// }
	}
})