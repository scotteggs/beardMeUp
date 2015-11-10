app.directive('cart', function(UserFactory){
	return {
		restrict: 'E',
		scope: {
			cart: '=',
			user: '='
		},
		templateUrl: '/js/common/directives/cart/cart.html',
		link: function($scope){
			$scope.remove = function(item){
				$scope.cart = $scope.cart.filter(function(cartItem){
					return item._id !== cartItem._id
				})
				UserFactory.updateOne($scope.user._id, {cart: $scope.cart});

			}

			$scope.changeQuantity = function(idx, amount){
				$scope.cart[idx].qty += amount;
				if($scope.cart[idx].qty < 0) $scope.cart[idx].qty = 0;
				UserFactory.updateOne($scope.user._id, {cart: $scope.cart});
			}

			$scope.cartTotal = function(){
				var total = 0;
				$scope.cart.forEach(function(cartItem){
					total += cartItem.qty * cartItem.price;
				})
				return total;
			}

			$scope.imageUrl = function(cartItem) {
				if (cartItem.color) {
					return cartItem.product.imageUrl.slice(0,-4) + '-' + cartItem.color + '.jpg';
						} else return cartItem.product.imageUrl;
				}
			}
		}
	})

