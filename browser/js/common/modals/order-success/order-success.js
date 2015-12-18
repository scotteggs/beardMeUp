app.controller('OrderSuccessCtrl', ['$scope', '$uibModalInstance', 'order', function($scope, $uibModalInstance, order){
	$scope.order = order;
	$scope.checkout = function(){
		console.log("in checkout modal")
		$uibModalInstance.dismiss();
		$state.go('home');
	}
}])