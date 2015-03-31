'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource', 'angularLocalStorage'])
    .controller('HomeCtrl', ['$scope',
        function($scope, storage) {

        }
    ])
	.controller('AddFoodCtrl', ['$scope', 'storage', 'foodService', 'categoryList', function ($scope, storage, foodService, categoryList) {
		storage.bind($scope, 'foodData', {
		foods : [
		  {description: 'Steak', category: 'Protein', calories: 380, id: 1},
		  {description: 'Candy', category: 'Sugar', calories: 50, id: 2},
		  {description: 'Bread', category: 'Carbs', calories: 150, id: 3, }

		]});
		$scope.categories = categoryList;
		$scope.newFoodItem = {};
		
		var fetchFoodItems = function() {
			$scope.foodData = foodService.query();
		};
		
		fetchFoodItems();
		
		$scope.remove = function(food) {
// 			console.log(food);
// 			console.log(food.id);
			foodService.markAsRemoved(food, function(foods) {
			  $scope.foodData = foods;
			});
		};
	
		$scope.add = function() {
			if($scope.foodData.indexOf($scope.newFoodItem) === -1) {
				$scope.foodData.push($scope.newFoodItem);
			}
			foodService.save($scope.newFoodItem).$promise
				.then(fetchFoodItems)
				.then(function() {
				  $scope.newFoodItem = {};
				});
		};
    
	}])
  .controller('ViewSummaryCtrl', ['$scope','foodService','categoryList', function($scope, foodService, categoryList) {
		$scope.foods = foodService.query();
// 		$scope.summaryData = [];
		$scope.summaryData = [
			{ category: "Fat", amount: 180 },
			{ category: "Carbs", amount: 250 },
			{ category: "Sugar", amount: 80 },
			{ category: "Protein", amount: 350 }
		];
				
// 		categoryList.forEach(function(category, key) {
// 			var catTotal = 0;
// 			$scope.foods.forEach(function(amount, key) {
// 					catTotal += parseFloat(key);
// 			});
// 			$scope.summaryData.push({
// 				category: category,
// 				amount: catTotal
// 			});
// 		});
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