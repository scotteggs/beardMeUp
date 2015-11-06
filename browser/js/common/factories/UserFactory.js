app.factory('UserFactory', function ($http) {
	var UserFactory = {};

	UserFactory.fetchAll = function () {
		return $http.get('/api/user/')
		.then(function (response) {
			return response.data;
		})
		.catch(function(err) {
			console.error(err);
		})
	}

	UserFactory.fetchOne = function(id) {
		return $http.get('/api/user/' + id)
		.then(function (response) {
			return response.data;
		})
		.catch(function(err) {
			console.error(err);
		})
	}

	UserFactory.updateOne = function(id, params) {
		return $http.put('/api/user/' + id, params)
		.then(function (response) {
			return response.data;
		})
		.catch(function(err) {
			console.error(err);
		})
	}

	UserFactory.getCart = function(userId) {
		return $http.get('/api/user/' + userId + '/cart')
		.then(function (response) {
			return response.data;
		})
		.catch(function(err) {
			console.error(err);
		})
	}

	

	return UserFactory;
})