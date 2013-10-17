/**
 * Copyright (c) 2013 GDG Guadalajara - http://gdgguadalajara.org
 * License: MIT
 */

angular
  .module('controllers', ['firebase'])

  .controller('ProductsCtrl', function($scope, ProductService) {
    $scope.loadProducts = function() {
      $scope.products = [];
      angular.forEach(ProductService.all(), function(product, index) {
        $scope.products.push(product);
      });
    };

    $scope.remove = function(productId) {
      ProductService.remove(productId);

      $scope.loadProducts();
    };
  })

  .controller('NewProductCtrl', function($scope, $location, ProductService) {
    $scope.save = function() {
      ProductService.insert($scope.newProduct);

      $location.path('/products');
    };
  })

  .controller('LoginCtrl', function($scope, AuthService) {
    $scope.sign = function() {
      AuthService.sign($scope.usr);

      $scope.$emit('auth.loginConfirmed');
    };

    $scope.logout = function() {
      AuthService.logout();

      $scope.$emit('auth.logoutConfirmed');
    };
  })

  .controller('ChatCtrl', function($scope, angularFire) {
    $scope.messages = [];

    var ref = new Firebase('https://jn6h.firebaseio.com/chat');

    angularFire(ref.limit(15), $scope, "messages");

    // $scope.username = 'Guest' + Math.floor(Math.random()*101);

    $scope.addMessage = function() {
      $scope.messages[ref.push().name()] = {
        from: $scope.currentUser.email, content: $scope.message
      };
      $scope.message = "";
    };
  });