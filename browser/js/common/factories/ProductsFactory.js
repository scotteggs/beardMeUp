app.factory('ProductsFactory', function ($http) {
	var ProductsFactory = {};

	ProductsFactory.fetchAll = function () {
		return $http.get('/api/products/')
		.then(function (response) {
			return response.data;
		})
	}

	return ProductsFactory;
})