app.factory('CustomerEditModal',function(UserFactory){
	return function(id){
		return{
			animation: true,
			templateUrl: '/js/common/modals/customers/customer-edit.template.html',
			controller: 'editCustomerCtrl',
			size: 'lg',
			resolve: {
				theCustomer: function(UserFactory){
					return UserFactory.fetchOne(id);
				}
			}
		}
	}
})