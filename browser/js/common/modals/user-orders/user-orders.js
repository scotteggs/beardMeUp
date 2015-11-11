app.controller('UserOrdersCtrl', function (ProductFactory, theOrders, theUser, $scope) {
	$scope.user = theUser;
	$scope.orders = theOrders;
	//replace date with format easy to read
	for (var i= 0; i<$scope.orders.length; i++) {
		$scope.orders[i].datePlaced = $scope.orders[i].datePlaced.replace(/T.+/,"");
		// for(var j=0; j<$scope.orders[i].cart.length; j++) {
		// 	var theProduct = $scope.orders[i].cart[j].product
		// 	ProductFactory.fetchOne(theProduct)
		// 	.then(function (product) {
		// 		theProduct.name = product.name
		// 	})
		// 	$scope.orders[i].cart[j].product = theProduct
		// 	console.log($scope.orders[i].cart[j].product)
		// }	
	} 
})