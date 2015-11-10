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

app.controller('ProductController', function ($scope, $rootScope, AuthService, theProduct, theReviews, ProductFactory, CartFactory) {
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
        if($scope.theSelfieUrl) return $scope.theSelfieUrl;
        if ($scope.color) {
            return $scope.product.imageUrl.slice(0,-4) + '-' + $scope.color + '.jpg';
        } else return $scope.product.imageUrl;
    }

    window.plot = function(x, y, w, h) {
        console.log("plot has been called", x, y, w, h)
        var rect = document.createElement('div');
        document.querySelector('#productImage').appendChild(rect);
        rect.classList.add('rect');
        rect.style.width = w + 'px';
        rect.style.height = h + 'px';
        rect.style.left = (x) + 'px';
        rect.style.top = (y) + 'px';
    };

    var el = document.getElementById('upload-selfie');
    el.addEventListener('change', function() {
        document.getElementById('productImage').className = "product-image"
        var theImage = this.files[0];
        $scope.theSelfieUrl = window.URL.createObjectURL(theImage);
        $scope.uploaded = true;
        $scope.$digest();

        var img = document.getElementById('preview-img')

        var tracker = new tracking.ObjectTracker(['face', 'mouth']);
        tracker.setStepSize(1.7);
        tracking.track('#product-img', tracker);
        tracker.on('track', function(event){
            console.log(event)
            event.data.forEach(function(rect){
                window.plot(rect.x, rect.y, rect.width, rect.height);
            })
        })
        // tracker.emit('track')



    })



})