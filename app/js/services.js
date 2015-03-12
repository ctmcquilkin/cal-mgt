'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')
  .value('categoryList',["Fat", "Carbs", "Sugar", "Protein"])
  .factory('calService', [function() {
    var prefix = 'cal-mgr';
    return {
      saveFood: function(data) {
        var timeStamp = Math.round(new Date().getTime());
        var key = prefix + timeStamp;
        data = JSON.stringify(data);
        localStorage[key] = data;
      },
      deleteFood: function(description) {
        	var prefixLength = prefix.length;
			Object.keys(localStorage)
		  .forEach(function(key) {
			if (key.substring(0, prefixLength) == prefix) {
			  var item = localStorage[key]
			  item = JSON.parse(item)
			  if (item.description == description) {
				localStorage.removeItem(key);
			  }
			}
		  });
      },
      getFood: function() {
        var foods = [];
        var prefixLength = prefix.length;
        Object.keys(localStorage)
          .forEach(function(key) {
             if (key.substring(0, prefixLength) == prefix) {
               var item = window.localStorage[key];
               item = JSON.parse(item);
               foods.push(item);
             }
          });
        return foods;
      },
      getCategoryTotal: function(category) {
        var categoryTotal = 0;
        var prefixLength = prefix.length;
        Object.keys(localStorage)
          .forEach(function(key) {
            if (key.substring(0, prefixLength) == prefix) {
              var item = localStorage[key]
              item = JSON.parse(item)
              if (item.category == category) {
                categoryTotal += parseFloat(item.amount);
              }
            }
          });
        return categoryTotal;
      }
    };
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