// @OB/ND possible suggestion
app.value('OrderSuccessModal', {
	animation: true,
	templateUrl: '/js/common/modals/order-success/order-success.html',
	controller: 'OrderSuccessCtrl',
	size: 'lg',
	resolve: {
		order: function(){
			return order;
		}
	}

});

app.controller('OrderSuccessCtrl', function($scope, $uibModalInstance, order){
	console.log("in order success ctrl");
	$scope.order = order;
	$scope.checkout = function(){
		console.log("in checkout modal")
		$uibModalInstance.dismiss();
		$state.go('home');
	}
})