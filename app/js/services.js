'use strict';

/* Services */

angular.module('myApp.services', ['ngResource'])
  .value('version', '0.1')
  .value('categoryList',["Fat", "Carbs", "Sugar", "Protein"])
    .factory('foodService', ['$resource', function($resource) {
      return $resource('/api/food/:id', {id: '@id'}, {
        markAsRemoved: {
          url: '/api/food/:id/remove',
          method: 'POST',
          isArray: true
        }
      });
    }])
//     .factory('calService', 'categoryList', [function(categoryList) {
//       return {
//         getCategoryTotal: function(category) {
// //           var categoryTotal = 0;
// 			 foods.forEach()
// //           return categoryTotal;
//         }
//       };
//     }])
  .factory('alertService', [function($rootScope, $timeout) {
    var alertService = {};
    // create an array of alerts available globally
    $rootScope.alerts = [];
    alertService.add = function(type, msg, timeout) {
     
     $rootScope.alerts.push({
            type: type,
            msg: msg,
            close: function() {
                return alertService.closeAlert(this);
            }
        });

        if (timeout) {
        	//console.log("Inside Timeout :" + timeout);
            $timeout(function(){ 
                alertService.closeAlert(this); 
            }, timeout); 
        }
    };
    alertService.closeAlert = function(index) {
    	$rootScope.alerts.splice(index, 1);
    };
    return alertService;
}]);