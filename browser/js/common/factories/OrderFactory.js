app.factory('OrdersFactory', function($http){
	function getData(response){
		return response.data;
	}

	return {
		allOrders: function(){
			return $http.get('/api/order')
			.then(getData)	
		},
		getOrdersByUser: function(user) {
			return $http.get('/api/order/user/' + user._id)
			.then(getData)
			.then(function (orders) {
				return orders
			})
		},
		checkout: function(order){
			return $http.post('/api/checkout', order)
			.then(getData)
		},
		getOrderById: function(orderId){
			return $http.get('api/order/' + orderId)
			.then(getData)
		},
		updateOrder: function(orderId, update){
			return $http.put('/api/order/' + orderId, update)
			.then(getData)
		}
	}
})
