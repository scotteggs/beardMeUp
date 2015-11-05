app.config(function($stateProvider){
	$stateProvider.state('allOrders', {
		url: '/allOrders',
		templateUrl: 'js/all-orders/all-orders.template.html',
		controller: 'AllOrdersCtrl',
		resolve: {
			allOrders: function(OrdersFactory){
				return OrdersFactory.allOrders();
			}
		}
	})
})