app.factory('CartFactory', function ($http, AuthService, $uibModal) {
	var CartFactory = {};
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
})