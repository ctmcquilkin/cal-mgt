'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
  .value('version', '0.1')
  .value('categoryList',["Fat", "Carbs", "Sugar", "Protein"])
    .factory('Foods', ['$resource', function($resource) {
      return $resource('/api/food/:id', {id: '@id'}, {
        markAsDone: {
          url: '/api/food/:id/done',
          method: 'POST',
          isArray: true
        }
      });
    }])
  .factory('alertService', function($rootScope, $timeout) {
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
});