app.factory('OrdersFactory', function($http){
	function getData(response){
		return response.data;
	}

	return {
		allOrders: function(){
			return $http.get('/api/order')
			.then(getData)
		}
	}
})