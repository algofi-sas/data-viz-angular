'use strict';

/**
 * @ngdoc overview
 * @name myFirstAppApp
 * @description
 * # myFirstAppApp
 *
 * Main module of the application.
 */
angular
  .module('myFirstAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/quandl_time_series', {
        templateUrl: 'views/quandl_time_series.html',
        controller: 'quandlCtrl',
        controllerAs: 'quandl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });