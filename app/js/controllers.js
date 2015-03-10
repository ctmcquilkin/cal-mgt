'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('HomeCtrl', ['$scope',
        function($scope) {

        }
    ])
    .controller('AddFoodCtrl', ['$scope', 'categoryList', 'calService', 'alertService', function($scope, categoryList, calService, alertService) {
            $scope.categories = categoryList;
            $scope.submit = function() {
            	calService.saveFood($scope.food);
				//alertService.add("danger", "Error: Something went wrong! ", 3000);
				alertService.add("success", $scope.food.description + " saved successfully! ", 3000);
				$scope.addForm.$setPristine(); // not working. Don't know why
        	};
        }
    ])
  .controller('ViewSummaryCtrl', ['$scope','calService','categoryList',function($scope,calService,categoryList) {
		$scope.foods = calService.getFood();
		$scope.summaryData = [];
		
		categoryList.forEach(function(item) {
				var catTotal = calService.getCategoryTotal(item);
				$scope.summaryData.push({
					category: item,
					amount: catTotal
				});
		});
		$scope.remove = function(food) {
        		var index = $scope.foods.indexOf(food);
        		var prefix = 'cal-mgr';
        		var prefixLength = prefix.length;
    			$scope.foods.splice(index, 1);
    			Object.keys(localStorage)
				  .forEach(function(key) {
					if (key.substring(0, prefixLength) == prefix) {
					  var item = localStorage[key]
					  item = JSON.parse(item)
					  if (item.description == food.description) {
						localStorage.removeItem(key);
					  }
					}
				  });
        };
    } 
  ])
  .controller('NavigationCtrl',['$scope','$location',function($scope,$location){
		var navigator=function(incrementer){
			var pages=['/','/add-food','/view-summary'];

					var nextUrl="";
					var currentPage = $location.path();
					var lastPageIndex= pages.length-1;
					var pageIndex= pages.indexOf(currentPage);
		
			var direction= pageIndex+incrementer;
			if(direction===-1)direction=lastPageIndex;
			if(direction>lastPageIndex)incrementer=0;
			nextUrl=pages[direction];
			$location.url(nextUrl);
			$scope.direction=(incrementer===1)?'slide-right':'slide-left';

		};
        $scope.goLeft=function(){
            navigator(-1);
		};
		$scope.goRight=function(){
			navigator(1);
		};
}]);