'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource'])
    .controller('HomeCtrl', ['$scope',
        function($scope) {

        }
    ])
    .controller('AddFoodCtrl', ['Foods', function(Foods) {
      var self = this;
      self.items = [];
      self.newFoodItem = {};
      var fetchFoodItems = function() {
        self.items = Foods.query();
      };

      fetchFoodItems();

      self.done = function(food) {
        Foods.markAsDone(food, function(foods) {
          self.items = foods;
        });
      };

      self.add = function() {
        Foods.save(self.newFoodItem).$promise
            .then(fetchFoodItems)
            .then(function() {
              self.newTodo = {};
            });
      };

    }])
  .controller('ViewSummaryCtrl', ['$scope','Foods','categoryList',function($scope, Foods,categoryList) {
// 		$scope.foods = calService.getFood();
		$scope.summaryData = [
			{ category: "Fat", amount: 180 },
			{ category: "Carbs", amount: 250 },
			{ category: "Sugar", amount: 80 },
			{ category: "Protein", amount: 350 }
		];
		
// 		categoryList.forEach(function(item) {
// 				var catTotal = calService.getCategoryTotal(item);
// 				$scope.summaryData.push({
// 					category: item,
// 					amount: catTotal
// 				});
// 		});
// 		function updateCatTotal( cat, value ) {
// 		   for (var i in $scope.summaryData) {
// // 		   	 console.log($scope.summaryData[i].category);
// // 		   	 console.log($scope.summaryData[i].amount);
// // 			 console.log(cat);
// // 			 console.log(value);
// 			 if ($scope.summaryData[i].category === cat) {
// 				$scope.summaryData[i].amount -= value;
// 				$scope.$digest();
// 				break;
// 			 }
// 		   }
// 		}
// 		$scope.remove = function(food) {
//         		var index = $scope.foods.indexOf(food);
//     			$scope.foods.splice(index, 1);
// 				calService.deleteFood(food.description);
// 				updateCatTotal(food.category, food.amount);
//         };
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