app.config(function($stateProvider){
	$stateProvider.state('allProducts', {
		url: '/allProducts',
		templateUrl: 'js/all-products/all-products.template.html',
		controller: 'AllProductsCtrl',
		resolve: {
			allProducts: function(ProductFactory){
				return ProductFactory.fetchAllAdmin();
			}
		}
	})
})