app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/product/:productId',
        controller: 'ProductController',
        templateUrl: 'js/product/product.html',
        resolve: {
        	theProduct: function (ProductFactory, $stateParams) {
        		return ProductFactory.fetchOne($stateParams.productId);
        	}
        }
    });
});

app.controller('ProductController', function ($scope, theProduct) {
	$scope.product = theProduct;
    $scope.color;
    $scope.addToCart = function() {
        // CartFactory.add()
    }
})