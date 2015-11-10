app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $uibModal) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        $scope.error = null;
        console.log(loginInfo)
        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });
    };
    $scope.signup = function() {
        $uibModal.open({
          animation: true,
          templateUrl: '/js/common/modals/signup/signup.html',
          controller: 'signupCtrl',
          size: 'lg'
        })
    };

});