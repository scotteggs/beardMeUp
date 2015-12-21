app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'js/home/home.html',
        resolve: {
        	allProducts: function(ProductFactory){
        		return ProductFactory.fetchAll();
        	}
        }
    });
});

app.controller('HomeController', ['$scope', 'allProducts', function ($scope, allProducts) {
    $scope.products = allProducts.slice(0,6); 
}])