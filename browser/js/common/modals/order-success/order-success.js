app.controller('OrderSuccessCtrl', function($scope, $uibModalInstance, order){
	console.log("in order success ctrl");
	$scope.order = order;
	$scope.checkout = function(){
		console.log("in checkout modal")
		$uibModalInstance.dismiss();
		$state.go('home');
	}
})