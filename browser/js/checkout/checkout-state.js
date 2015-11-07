app.config(function($stateProvider){
	$stateProvider.state('checkout', {
		templateUrl: 'js/checkout/checkout.template.html',
		controller: 'checkoutCtrl',
		url: '/checkout',
		resolve: {
			theUser: function(AuthService){
				return AuthService.getLoggedInUser();
			}
		}
	})
})