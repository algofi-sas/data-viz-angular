'use strict';

/**
 * @ngdoc function
 * @name myFirstAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myFirstAppApp
 */
angular.module('myFirstAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
