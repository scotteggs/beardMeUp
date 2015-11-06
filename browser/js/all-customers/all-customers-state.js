app.config(function($stateProvider){
	$stateProvider.state('allCustomers', {
		url: '/allCustomers',
		templateUrl: 'js/all-customers/all-customers.template.html',
		controller: 'AllCustomersCtrl',
		resolve: {
			allCustomers: function(UserFactory){
				return UserFactory.fetchAll();
			},
			allOrders: function(OrdersFactory){
				return OrdersFactory.allOrders();
			}
		}
	})
})