app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/product/:productId',
        controller: 'ProductController',
        templateUrl: 'js/product/product.html',
        resolve: {
        	theProduct: function (ProductFactory, $stateParams) {
        		return ProductFactory.fetchOne($stateParams.productId);
        	},
            theReviews: function(ProductFactory, $stateParams) {
                return ProductFactory.fetchReviews($stateParams.productId)
            }
        }
    });
});

app.controller('ProductController', function ($scope, theProduct, theReviews, ProductFactory) {
	$scope.product = theProduct;
    $scope.reviews = theReviews;
    $scope.averageRating = ProductFactory.averageRating(theReviews);
    $scope.showReviewForm = false;
    $scope.toggleReviewForm = function() {
        $scope.showReviewForm = !$scope.showReviewForm
    }
    $scope.color;
    $scope.addToCart = function() {
        // CartFactory.add()
    }

})