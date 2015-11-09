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

app.controller('ProductController', function ($scope, AuthService, theProduct, theReviews, ProductFactory, CartFactory) {
	$scope.product = theProduct;
    $scope.reviews = theReviews;
    $scope.areReviews = !!$scope.reviews.length;
    $scope.averageRating = ProductFactory.averageRating($scope.reviews);
    $scope.showReviewForm = false;
    $scope.alreadyReviewed = false;
    $scope.loggedIn = false;
    AuthService.getLoggedInUser()
    .then(function(user) {
        if (user) $scope.loggedIn = true;
    });
    $scope.toggleReviewForm = function() {
        $scope.showReviewForm = !$scope.showReviewForm
    }
    $scope.addToCart = function() {
        CartFactory.add(theProduct, $scope.color);
    }
    $scope.submitReview = function() {
        ProductFactory.addReview($scope.newReview, theProduct._id)
        .then(function(review) {
            $scope.reviews.push(review);
            $scope.averageRating = ProductFactory.averageRating($scope.reviews);
            $scope.showReviewForm = false;
            $scope.areReviews = true;
            $scope.alreadyReviewed = true;
        })
    }
    $scope.imageUrl = function() {
        if ($scope.color) {
            return $scope.product.imageUrl.slice(0,-4) + '-' + $scope.color + '.jpg';
        } else return $scope.product.imageUrl;
    }

})