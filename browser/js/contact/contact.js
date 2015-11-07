app.config(function ($stateProvider) {
	$stateProvider.state('contact', {
		url: '/contact',
		controller: 'ContactController',
		templateUrl: 'js/contact/contact.html'
	});
});

// app.controller('ContactController', function ($scope) {
// 	$scope.submit = function () {
// 		//submit function 
// 	}
// })