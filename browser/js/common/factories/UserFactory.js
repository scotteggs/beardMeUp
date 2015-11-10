app.factory('UserFactory', function ($http) {
	var UserFactory = {};

	function getData(response){
		return response.data;
	}

	UserFactory.fetchAll = function () {
		return $http.get('/api/user/')
		.then(getData)
	}

	UserFactory.fetchOne = function(id) {
		return $http.get('/api/user/' + id)
		.then(getData)
	}

	UserFactory.updateOne = function(id, params) {
		return $http.put('/api/user/' + id, params)
		.then(getData)
	}

	UserFactory.getCart = function(userId) {
		return $http.get('/api/user/' + userId + '/cart')
		.then(getData)
	}

	UserFactory.getStoreOwners = function(){
		return $http.get('/api/user/owners/get')
		.then(getData)
	}

	UserFactory.handlePayment = function(userId, token, amount){
		return $http.post('/api/user/' + userId + '/payment', {token: token, amount: amount})
	}

	

	return UserFactory;
})