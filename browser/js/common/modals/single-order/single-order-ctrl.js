app.factory("singleOrderModal", function(){
	return function(orderId){
		return {
			animation: true,
			templateUrl: '/js/common/modals/single-order/single-order.template.html',
			controller: 'singleOrderCtrl',
			size: 'lg',
			resolve: {
				theOrder: ['OrdersFactory', function(OrdersFactory){
					return OrdersFactory.getOrderById(orderId)
				}]
			}
		}
	}
})

app.controller('singleOrderCtrl', ['$scope', 'theOrder', 'OrdersFactory', '$state', '$uibModalInstance', function($scope, theOrder, OrdersFactory, $state, $uibModalInstance){		
	console.log('$uibModalInstance', $uibModalInstance)
	$scope.order = theOrder;
	$scope.statusMessage;
	$scope.fulfillOrder = function(){
		console.log("fulfilling Order")
		theOrder.status = "fulfilled"
		OrdersFactory.updateOrder($scope.order._id, theOrder)
		.then(function(updatedOrder){
		})
		$scope.statusMessage = "Order was marked fulfilled."
		$state.reload();
		setTimeout(function(){$uibModalInstance.dismiss('cancel')}, 1000);
	}
	$scope.order.datePlaced = $scope.order.datePlaced.replace(/T.+/,"");
	$scope.updateOrder = function(){
		OrdersFactory.updateOrder($scope.order._id, {status: $scope.order.status, deliveryAddress:[$scope.order.deliveryAddress[0]]})
		.then(function(order){
		})
		$scope.statusMessage = "Order has been updated."
		$state.reload();
		setTimeout(function(){$uibModalInstance.dismiss('cancel')}, 1000);
	}
}])