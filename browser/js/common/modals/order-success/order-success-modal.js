app.factory('orderSuccess',function(){
	return function(order){
		return{
			animation: true,
			templateUrl: '/js/common/modals/order-success/order-success.html',
			controller: 'OrderSuccessCtrl',
			size: 'lg',
			resolve: {
				order: function(){
					return order;
				}
			}
		}
	}
})