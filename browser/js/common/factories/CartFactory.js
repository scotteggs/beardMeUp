app.factory('CartFactory', [ '$http', 'AuthService', '$uibModal', '$rootScope', function ($http, AuthService, $uibModal, $rootScope) {
	var CartFactory = {};
	var cartItemCount = 0;
	function getCartItems(){
        return AuthService.getLoggedInUser(true)
        .then(function(theUser){
            var cartTotal=0;
            var userCart = theUser.cart;
            userCart.forEach(function(item){
                cartTotal += item.qty;
            })
            return cartItemCount = cartTotal;
        });
    }

    $rootScope.$on('auth-logout-success', function(){
    	cartItemCount = 0;
    })

    $rootScope.$on('auth-login-success', function(){
    	getCartItems();
    })

    CartFactory.zeroCart = function(){
    	cartItemCount = 0;
    }

    CartFactory.getCartCount = function(){
    	return cartItemCount;
    }

    getCartItems();
	CartFactory.add = function (product, color) {
		AuthService.getLoggedInUser()
		.then(function(user) {
			$http.post('/api/user/' + user._id + '/cart', {
				qty: 1,
				product: product._id,
				color: color,
				price: product.price
			})
			.then(function() {
				cartItemCount++;
				var modalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: '/js/common/modals/cart/cart.html',
                  controller: 'CartCtrl',
                  size: 'lg',
                  resolve: {
                    theCart: function (UserFactory, AuthService) {
                      return AuthService.getLoggedInUser()
                      .then(function(user) {
                        return UserFactory.getCart(user._id);
                      })
                    },
                    theUser: function(AuthService){
                        return AuthService.getLoggedInUser();
                    }
                  }
                })
			})
		})
	}
	return CartFactory;
}])