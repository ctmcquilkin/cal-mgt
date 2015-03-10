'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ngTouch',
  'ngAnimate'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/add-food', {templateUrl:'partials/add-food.html', controller: 'AddFoodCtrl'});
  $routeProvider.when('/view-summary', {templateUrl:'partials/view-summary.html', controller: 'ViewSummaryCtrl'});
 $routeProvider.otherwise({redirectTo: '/'});
}]);