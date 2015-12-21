app.value('cartModal', {
  animation: true,
  templateUrl: '/js/common/modals/cart/cart.html',
  controller: 'CartCtrl',
  size: 'lg',
  resolve: {
    theCart: ['UserFactory', 'AuthService', function (UserFactory, AuthService) {
      return AuthService.getLoggedInUser()
      .then(function(user) {
        return UserFactory.getCart(user._id);
      })
    }],
    theUser: ['AuthService', function(AuthService){
        return AuthService.getLoggedInUser();
    }]
  }
                
})