app.directive('navbar', [ '$rootScope', 'AuthService', 'AUTH_EVENTS', '$state', '$uibModal', 'cartModal', 'CartFactory', function ($rootScope, AuthService, AUTH_EVENTS, $state, $uibModal, cartModal, CartFactory) {

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
                { label: 'Profile', state: 'userProfile', auth: true }
            ];

            scope.adminItems = [
                { label: 'Orders', state: 'allOrders' },
                { label: 'Customers', state: 'allCustomers' },
                { label: 'Stockroom', state: 'allProducts' }
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

            scope.cartItems = CartFactory.getCartCount;


            scope.open = function() {
                var modalInstance = $uibModal.open(cartModal)
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

            var num = 230;
            $(window).bind('scroll', function() {
                if($(window).scrollTop() > num) {
                    $('.nav-sticky').addClass('fixed');
                } else {
                    $('.nav-sticky').removeClass('fixed');

                }
            })

        }

    };

}]);
