app.factory('ProductFactory', function ($http) {
	var ProductFactory = {};

	function getData(response){
		return response.data;
	}
	function logError(err){
		console.error(err);
	}

	ProductFactory.updateProduct = function(product){
		return $http.put('/api/product/' + product._id)
		.then(getData)
		.catch(logError)
	}


	ProductFactory.fetchAll = function () {
		return $http.get('/api/product/')
		.then(getData)
		.catch(logError)
	}

	ProductFactory.fetchOne = function(id) {
		return $http.get('/api/product/' + id)
		.then(getData)
		.catch(logError)
	}

	ProductFactory.addProduct = function(newProduct) {
		var colors = [];
		for(var color in newProduct.theColors) {
			if(newProduct.theColors[color]==true) {
				colors.push(color)
			}
		}
		newProduct.type = newProduct.beardType; //.type causing error on Angular side, switching from beardType to type for back end
		delete newProduct.beardType;
		newProduct.colors = colors;
		delete newProduct.theColors;
		newProduct.price = (newProduct.price)/100
		newProduct.tags = newProduct.tags.split(", ")
		return $http.post('/api/product', newProduct)
	}

	return ProductFactory;
})