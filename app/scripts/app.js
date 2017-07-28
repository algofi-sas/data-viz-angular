'use strict';

/**
 * @ngdoc overview
 * @name myFirstAppApp
 * @description
 * # myFirstAppApp
 *
 * Main module of the application.
 */

var myApp = angular
  .module('myFirstAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'config'
  ]);

myApp.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
}]);

myApp
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        title: 'Home'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        title: 'About'
      })
      .when('/quandl_time_series', {
        templateUrl: 'views/quandl_time_series.html',
        controller: 'quandlCtrl',
        controllerAs: 'quandl',
        title: 'Quandl Time Series'
      })
      .when('/bitcoin_markets', {
        templateUrl: 'views/bitcoin_markets.html',
        controller: 'bitcoinMarketCtrl',
        controllerAs: 'bitcoin_markets',
        title: 'Bitcoin Markets'
      })
      .otherwise({
        redirectTo: '/'
      });
  });