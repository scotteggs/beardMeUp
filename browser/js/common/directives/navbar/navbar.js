app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, $uibModal) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Products', state: 'products' },
                { label: 'About', state: 'about' },
                { label: 'Contact', state: 'contact' },
                { label: 'My Profile', state: 'userProfile', auth: true }
            ];

            scope.adminItems = [
                { label: 'Orders', state: 'allOrders' },
                { label: 'Customers', state: 'allCustomers' },
                { label: 'Products', state: 'allProducts' }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.isSiteAdmin = function(){
                return scope.user && scope.user.role === 'siteAdmin';
            }

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            scope.open = function() {
                var modalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: '/js/common/modals/cart/cart.html',
                  controller: 'CartCtrl',
                  size: 'lg',
                  resolve: {
                    theCart: function (UserFactory, AuthService) {
                      return AuthService.getLoggedInUser()
                      .then(function(user) {
                        return UserFactory.getCart(user._id);
                      })
                    }
                  }
                })
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
