app.factory('UserFactory', function ($http) {
	var UserFactory = {};

		UserFactory.fetchAll = function () {
		return $http.get('/api/user/')
		.then(function (response) {
			return response.data;
		})
		.catch(function(err) {
			console.log(err);
		})
	}

	UserFactory.fetchOne = function(id) {
		return $http.get('/api/user/' + id)
		.then(function (response) {
			return response.data;
		})
		.catch(function(err) {
			console.log(err);
		})
	}

	UserFactory.updateOne = function(id, params) {
		return $http.put('/api/user/' + id, params)
		.then(function (response) {
			return response.data;
		})
		.catch(function(err) {
			console.log(err);
		})
	}

	return UserFactory;
})