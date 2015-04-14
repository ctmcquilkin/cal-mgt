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
    .factory('calService', [ function() {
      return {
			getCategoryTotal: function(category) {
			var categoryTotal = 0;
			Object.keys(localStorage)
			  .forEach(function(key) {
				if (key === 'foodData') {
				  var foodArray = localStorage[key]
				  foodArray = JSON.parse(foodArray)
				  console.log(foodArray);
				  foodArray.forEach(function(item) {
				  	if (item.category == category) {
				  		categoryTotal += parseFloat(item.calories);
				  	}
				  });
				}
			  });
			return categoryTotal;
		  }
	   };
    }])
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