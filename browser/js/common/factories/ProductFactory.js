app.factory('ProductFactory', function ($http) {
	var ProductFactory = {};

	ProductFactory.fetchAll = function () {
		return $http.get('/api/product/')
		.then(function (response) {
			return response.data;
		})
		.catch(function(err) {
			console.log(err);
		})
	}

	ProductFactory.fetchOne = function(id) {
		return $http.get('/api/product/' + id)
		.then(function (response) {
			return response.data;
		})
		.catch(function(err) {
			console.log(err);
		})
	}

	ProductFactory.addProduct = function(data) {
		return $http.post('/api/product', data)
		.then(function(response){
			return res.status(201).json(response);
		})

	}

	return ProductFactory;
})