app.factory('OrdersFactory', function($http){
	function getData(response){
		return response.data;
	}

	return {
		allOrders: function(){
			return $http.get('/api/order')
			.then(getData)
		},
		getOrdersByUser: function(userId) {
			return $http.get('/api/order')
			.then(getData)
			.then(function (orders) {
				return orders.filter(function (order) {
					return order.user === userIdgit
				})
			})
		},
		checkout: function(order){
			return $http.post('/api/checkout', order)
			.then(getData)
		}
	}
})