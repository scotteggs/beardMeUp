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