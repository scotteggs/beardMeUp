app.factory('UserFactory', function ($http) {
	var UserFactory = {};

	function getData(response){
		return response.data;
	}
	function logError(err){
		console.error(err);
		throw err; // @OB/ND don't forget to bubble the error onwards!
	}

	UserFactory.fetchAll = function () {
		return $http.get('/api/user/')
		.then(getData)
		.catch(logError)
	}

	UserFactory.fetchOne = function(id) {
		return $http.get('/api/user/' + id)
		.then(getData)
		.catch(logError)
	}

	UserFactory.updateOne = function(id, params) {
		return $http.put('/api/user/' + id, params)
		.then(getData)
		.catch(logError)
	}

	UserFactory.getCart = function(userId) {
		return $http.get('/api/user/' + userId + '/cart')
		.then(getData)
		.catch(logError)
	}

	

	return UserFactory;
})