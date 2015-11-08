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

	ProductFactory.fetchReviews = function(id) {
		return $http.get('/api/review')
		.then(function(response) {
			return response.data;
		})
		.then(function(reviews) {
			return reviews.filter(function(review) {
				return review.product === id;
			})
		})
	}

	ProductFactory.averageRating = function(reviews) {
		var total = 0;
		for(var i = 0; i < reviews.length; i++) {
			total += reviews[i].rating;
		}
		return total/reviews.length;
	}

	ProductFactory.addProduct = function(newProduct) {
		var colors = [];
		for(var color in newProduct.colors) {
			if(newProduct.colors[color]==true) {
				colors.push(color)
			}
		}
		newProduct.colors = colors;
		newProduct.price = (newProduct.price)*100
		newProduct.tags = newProduct.tags.split(", ")
		return $http.post('/api/product', newProduct)
	}

	ProductFactory.editProduct = function(theProduct) {
		var colors = [];
		var edited = {};
		angular.copy(theProduct, edited);
		for(var color in edited.colors) {
			if(edited.colors[color]==true) {
				colors.push(color)
			}
		}
		edited.colors = colors;
		edited.price = edited.price*100
		edited.tags = edited.tags.split(", ")
		return $http.put('/api/product/' + edited._id, edited)
		// .then(function(response){
		// 	console.log("response****************", response)
		// 	return res.json(response);
		// })
	}


	ProductFactory.addReview = function(review, productId) {
		review.product = productId;
		return $http.post('/api/review', review)
		.then(function(response) {
			return response.data;
		})
	}

	return ProductFactory;
})