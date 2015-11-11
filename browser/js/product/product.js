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

    window.twttr = (function(d, s, id) {
        console.log("in twitter functino with ", d,s,id)
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

