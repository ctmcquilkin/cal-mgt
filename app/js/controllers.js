'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('HomeCtrl', ['$scope',
        function($scope) {

        }
    ])
    .controller('AddFoodCtrl', ['$scope', 'categoryList', 'calService', function($scope, categoryList, calService) {
            $scope.categories = categoryList;
            $scope.submit = function() {
              calService.saveFood($scope.food);
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
