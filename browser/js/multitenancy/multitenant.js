app.config(function ($stateProvider) {
    $stateProvider.state('tenant', {
        url: '/store/:userId',
        controller: 'MultitenancyCtrl',
        templateUrl: 'js/products/products.html',
        resolve: {
        	allProducts: function (ProductFactory, $stateParams) {
        		return ProductFactory.fetchStore($stateParams.userId);
        	},
            theOwner: function(UserFactory, $stateParams) {
                return UserFactory.fetchOne($stateParams.userId)
            }
        }
    });
});

app.controller('MultitenancyCtrl', function ($scope, allProducts, theOwner, ProductFactory) {
	$scope.products = allProducts;
    $scope.title = theOwner.firstName + " " + theOwner.lastName + "'s Store"
})