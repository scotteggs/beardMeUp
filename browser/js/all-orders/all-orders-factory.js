app.factory('OrdersFactory', function($http){
	function getData(response){
		return response.data;
	}

	// function Order(){

	// }

	// Order.prototype.getTotal = function(){
		
	// }

	return {
		allOrders: function(){
			return $http.get('/api/order')
			.then(getData)
		}
	}
})