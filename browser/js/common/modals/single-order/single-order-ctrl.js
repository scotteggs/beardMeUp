app.factory("singleOrderModal", function(){
	return function(orderId){
		return {
			animation: true,
			templateUrl: '/js/common/modals/single-order/single-order.template.html',
			controller: 'singleOrderCtrl',
			size: 'lg',
			resolve: {
				theOrder: function(OrdersFactory){
					return OrdersFactory.getOrderById(orderId)
				}
			}
		}
	}
})

app.controller('singleOrderCtrl', function($scope, theOrder, OrdersFactory, $state){
	$scope.order = theOrder;
	$scope.updateOrder = function(){
		OrdersFactory.updateOrder($scope.order._id, {status: $scope.order.status, deliveryAddress:[$scope.order.deliveryAddress[0]]})
		.then(function(order){
			$state.go($state.current, {}, {reload: true});
		})
	}
})