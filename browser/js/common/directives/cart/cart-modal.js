app.value('cartModal', {
  animation: true,
  templateUrl: '/js/common/modals/cart/cart.html',
  controller: 'CartCtrl',
  size: 'lg',
  resolve: {
    // theCart: function (UserFactory, AuthService) {
    //   return AuthService.getLoggedInUser()
    //   .then(function(user) {
    //     return UserFactory.getCart(user._id);
    //   })
    // },
    // theUser: function(AuthService){
    //     return AuthService.getLoggedInUser();
    // }
  }
                
})