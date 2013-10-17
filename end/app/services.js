/**
 * Copyright (c) 2013 GDG Guadalajara - http://gdgguadalajara.org
 * License: MIT
 */

angular
  .module('services', [])

  .value('productCollection', [])
  .value('currentUser', null)

  .factory('ProductService', function(productCollection) {
    return {

      // GET /api/products
      all: function() {
        return productCollection;
      },

      // PUT /api/products/new
      insert: function(product) {
        product.createdAt = new Date();
        productCollection.push(product);
      },

      // DELETE /api/products/:productId
      remove: function(index) {
        productCollection.splice(index, 1);
      }
    };
  })

  .factory('AuthService', function(currentUser) {
    return {
      // POST /api/auth
      sign: function(credentials) {
        currentUser = credentials;
      },

      // DELETE /api/auth
      logout: function() {
        currentUser = null;
      },

      getCurrentUser: function() {
        return currentUser;
      },

      isUserLoggedOn: function() {
        return !!currentUser;
      }
    };
  });