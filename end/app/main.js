/**
 * Copyright (c) 2013 GDG Guadalajara - http://gdgguadalajara.org
 * License: MIT
 */

angular
  .module('main.application', ['controllers', 'services'])

  .config(function($routeProvider) {
    $routeProvider
      .when('/products', {
        controller: 'ProductsCtrl',
        templateUrl: 'app/partials/products.html'
      })

      .when('/products/new', {
        controller: 'NewProductCtrl',
        templateUrl: 'app/partials/form.html'
      })

      .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'app/partials/login.html'
      })

      .otherwise({redirectTo:'/products'});
  })

  .run(function($rootScope, $location, AuthService) {
    $rootScope.currentUser = null;
    $rootScope.isUserLoggedOn = AuthService.isUserLoggedOn;

    $rootScope.$on('$routeChangeStart', function($event, next, current) {
      if (['/login'].indexOf($location.path()) != -1 && $rootScope.isUserLoggedOn()) {
        $location.path('/products');
      }

      if (!$rootScope.isUserLoggedOn()) {
        $location.path('/login');
      }
    });

    $rootScope.$on('auth.loginRequired', function(loggedOn) {
      if (!$rootScope.isUserLoggedOn()) {
        $location.path('/login');
      }
    });

    $rootScope.$on('auth.loginConfirmed', function(loggedOn) {
      $rootScope.currentUser = AuthService.getCurrentUser();

      console.log(JSON.stringify($rootScope.currentUser));
      $location.path('/products');
    });
  });