app.factory('EditProductModal', function(){
	return function(id){
		return {
			animation: true,
			templateUrl: '/js/common/modals/products/edit-product.html',
			controller: 'editProductCtrl',
			size: 'lg',
			resolve: {
				theProduct: function(ProductFactory){
					return ProductFactory.fetchOne(id);
				},
				theOwners: function(UserFactory){
					return UserFactory.getStoreOwners();
				}
			}
		}
	}
})