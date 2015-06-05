'use strict';

(function () {

  var app = angular.module('ks', ['ngRoute', 'angularFileUpload']);

  app.config(['$routeProvider', '$locationProvider',

    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {templateUrl: '/html/category-list.html'})
        .when('/category/:categoryId', {templateUrl: '/html/category.html'})
        .when('/profile', {templateUrl: '/html/profile.html'})
        .otherwise({redirectTo: '/'});

      $locationProvider.html5Mode({enabled: true, requireBase: false});

    }]);

  app.controller('CategoryListCtrl', ['$http', function ($http) {
    var ctrl = this;
    ctrl.list = [];

    ctrl.loadAll = function () {
      $http.get('/api/categories.json').success(function (data) {
        ctrl.list = data.categories;
      });
    };
    ctrl.loadAll();
  }]);

  app.directive('navMenu', function(){
    return {
      restrict: 'E',
      templateUrl: '/html/nav-menu.html'
    };
  });

})();