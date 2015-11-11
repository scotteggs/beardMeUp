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
    $scope.cutoutUrl = $scope.product.imageUrl.slice(0,-4) + '-cutout.png';
    $scope.streaming = false;

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

    $scope.stream = function() {
        $scope.streaming = !$scope.streaming;
        $('.take-selfie').css('height', $scope.streaming ? '850px' : '300px');
        $('#selfie-spacer').css('height', $('.take-selfie').css('height'));
        var video = document.querySelector("#videoElement");
        
        // var canvas = $('#canvas');
        // console.log(canvas)
        // canvas.css('height', video.css('height'));
        // canvas.css('width', video.css('width'));
        // var ctx = canvas[0].getContext('2d');
        // ctx.fillStyle = '#AAA';
        // ctx.fillRect(0,0,canvas.width,canvas.height);
 
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
        if (navigator.getUserMedia) {       
            navigator.getUserMedia({video: true}, handleVideo, videoError);
        }
         
        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }

        function videoError(e) {
            console.log(e);
        }
    }

    $scope.takePhoto = function() {
        var video = document.querySelector('#videoElement');
        video.pause();
        // var canvas = $('#canvas');
        // var ctx = canvas[0].getContext('2d');
        // ctx.drawImage(video, 0,0, canvas.css('width'), canvas.css('height'));
        // var data = canvas.toDataUrl('image/png');
        // console.log(data);

    }
})