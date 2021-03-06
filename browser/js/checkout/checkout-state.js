app.config(function($stateProvider){
	$stateProvider.state('checkout', {
		templateUrl: 'js/checkout/checkout.template.html',
		controller: 'checkoutCtrl',
		url: '/checkout',
		resolve: {
			theUser: function(AuthService){
				return AuthService.getLoggedInUser(true);
			},
			theCart: function(UserFactory, theUser){
				return UserFactory.getCart(theUser._id);
			}
		}
	})
})