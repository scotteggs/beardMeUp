app.directive('address', function(){
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/address/address.template.html',
		scope: {
			address: '='
		},
		link: function(scope){

		}
	}
})