var favoriteFoodsList = angular.module("root", []);

favoriteFoodsList.controller("FavoriteFoodCtrl", ["$scope", "$http", function ($scope, $http) {
     $scope.orderList = "name";
     $scope.query;
		$scope.foods = [
      {name: "Apple", category: "fruit", calories: 95},
      {name: "Coffee", category: "drink", calories: 1},
      {name: "Milk (nonfat)", category: "drink", calories: 83},
      {name: "Cereal", category: "grain", calories: 210},
      {name: "Salad (endless summer)", category: "vegetable", calories: 150},
      {name: "Salad (spinach)", category: "vegetable", calories: 140},
    ];
      var list = $scope.foods;		
      var arrayLength = list.length;
      
		 // Add New Favorite Food Button
      $scope.addFavoriteFood = function() {
      	if($scope.query !== ''){
            $scope.newCategory = $scope.newCategory.toLowerCase();
            $scope.foods.push({name: $scope.newName, category: $scope.newCategory, calories: $scope.newCalories});
            getImage($scope, $http, arrayLength);
      		 $scope.newName = '';
      		 $scope.newCategory = '';
      		 $scope.newCalories = 0;
      
      	}
      };
      
	}])
favoriteFoodsList.controller("FavoriteActivityCtrl", ["$scope", "$http", function ($scope, $http) {
     $scope.orderList = "name";
     $scope.query;
    $scope.foods = [
      {name: "Walking", category: "aerobic", calories: 4.78},
      {name: "Running", category: "aerobic", calories: 1},
      {name: "Bicycling", category: "aerobic", calories: 14},
      {name: "Swimming", category: "aerobic", calories: 8},
    ];
      var list = $scope.foods;    
      var arrayLength = list.length;
      
     // Add New Favorite Food Button
      $scope.addFavoriteFood = function() {
        if($scope.query !== ''){
            $scope.newCategory = $scope.newCategory.toLowerCase();
            $scope.foods.push({name: $scope.newName, category: $scope.newCategory, calories: $scope.newCalories});
            getImage($scope, $http, arrayLength);
           $scope.newName = '';
           $scope.newCategory = '';
           $scope.newCalories = 0;
      
        }
      };
      
  }]);