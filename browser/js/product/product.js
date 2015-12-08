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
    
    $scope.stream = function() {
        $scope.streaming = true;
        $('.take-selfie').css("height", "800px");
        $('#selfie-spacer').css("height", "800px");
        $('#beardmeup').hide();
        // Grab elements, create settings, etc.
        var canvas = document.getElementById("photo-canvas"),
            context = canvas.getContext("2d"),
            video = document.getElementById("video-stream"),
            videoObj = {"video": true},
            errBack = function(error) {
                console.log("Video capture error: ", error.code); 
            };
        var photoViewer = document.getElementById('photo-preview');

        // Put video listeners into place
        if(navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia(videoObj, function(stream){
                video.src = window.URL.createObjectURL(stream);
                video.play();
            }, errBack);
        }
        else if(navigator.mozGetUserMedia) { // Firefox-prefixed
            navigator.mozGetUserMedia(videoObj, function(stream){
                video.src = window.URL.createObjectURL(stream);
                video.play();
            }, errBack);
        }

        document.getElementById("snap-photo").addEventListener("click", function() {
            context.drawImage(video, 0, 0, 640, 480);
            var data = canvas.toDataURL('image/png');
            video.style.display = 'none';
            photoViewer.setAttribute('src', data);
        });

    };
    $scope.socialMedia = false;


    if(navigator.userAgent.toString().match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/i)) {
        $scope.isMobile = true;
    }
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

    

    window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
     
      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };
     
      return t;
    }(document, "script", "twitter-wjs"));
    // window.twttr.widgets.load()

    // (function(d, s, id) {
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s); js.id = id;
    //   js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));


})

