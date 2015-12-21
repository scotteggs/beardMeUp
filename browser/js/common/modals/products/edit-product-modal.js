app.factory('EditProductModal', function(ProductFactory, UserFactory){
	return function(id){
		return {
			animation: true,
			templateUrl: '/js/common/modals/products/edit-product.html',
			controller: 'editProductCtrl',
			size: 'lg',
			resolve: {
				theProduct: ['ProductFactory', function(ProductFactory){
					return ProductFactory.fetchOne(id);
				}],
				theOwners: ['UserFactory', function(UserFactory){
					return UserFactory.getStoreOwners();
				}]
			}
		}
	}
})