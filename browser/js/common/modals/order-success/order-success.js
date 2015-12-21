app.controller('OrderSuccessCtrl', ['$scope', '$uibModalInstance', 'order', function($scope, $uibModalInstance, order){
	$scope.order = order;
	$scope.checkout = function(){
		$uibModalInstance.dismiss();
		$state.go('home');
	}
}])