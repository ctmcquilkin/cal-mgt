var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

animateApp.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'views/page-home.html',
            controller: 'mainController'
    	})
    	.when('/activity', {
    		templateUrl: 'views/page-activity.html',
            controller: 'activityController'
    	})
        .when('/add-activity', {
            templateUrl: 'views/page-add-activity.html',
            controller: 'addActivityController'
        })
        .when('/dashboard', {
            templateUrl: 'views/page-dashboard.html',
            controller: 'dashboardController'
        })
    	.when('/food', {
    		templateUrl: 'views/page-food.html',
            controller: 'favoriteFoodCtrl'
    	})
        .when('/add-food', {
            templateUrl: 'views/page-add-food.html',
            controller: 'addFoodController'
        });

});

animateApp.controller('mainController', function($scope) {
    $scope.pageClass = 'page-home';
});

animateApp.controller('activityController', function($scope) {
    $scope.pageClass = 'page-activity';
     $scope.orderList = "name";
     $scope.query;
    $scope.activities = [
      {name: "Walking", category: "aerobic", calories: 4.78},
      {name: "Running", category: "aerobic", calories: 1},
      {name: "Bicycling", category: "aerobic", calories: 14},
      {name: "Swimming", category: "aerobic", calories: 8},
    ];
      var list = $scope.activities;    
      var arrayLength = list.length;
      
     // Add New Activity Button
      $scope.addActivity = function() {
        if($scope.query !== ''){
            $scope.newCategory = $scope.newCategory.toLowerCase();
            // Need to add method to convert minutes to calories
            $scope.activities.push({name: $scope.newName, category: $scope.newCategory, calories: $scope.newMinutes});
            // getImage($scope, $http, arrayLength); // To Do: need to add icon for each category
           $scope.newName = '';
           $scope.newCategory = '';
           $scope.newMinutes = '';
      
        }
      };

});

animateApp.controller('addActivityController', function($scope) {
    $scope.pageClass = 'page-add-activity';
});

animateApp.controller('favoriteFoodCtrl', function($scope) {
    $scope.pageClass = 'page-food';
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
      
         // Add New Food Button
      $scope.addFavoriteFood = function() {
        if($scope.query !== ''){
            $scope.newCategory = $scope.newCategory.toLowerCase();
            $scope.foods.push({name: $scope.newName, category: $scope.newCategory, calories: $scope.newCalories});
            // getImage($scope, $http, arrayLength); // o Do: need to add icon for each category
             $scope.newName = '';
             $scope.newCategory = '';
             $scope.newCalories = '';
           console.log($scope.newCalories);
        }
      };
});

animateApp.controller('addFoodController', function($scope) {
    $scope.pageClass = 'page-add-food';
});

animateApp.controller('dashboardController', function($scope) {
    $scope.pageClass = 'page-dashboard';
    $scope.today = new Date();
       $scope.orderList = "name";
       $scope.query;
      $scope.activities = [
        {name: "340 Burned", category: "aerobic", calories: 4.78},
        {name: "545 Carbs", category: "aerobic", calories: 14},
        {name: "589 Protien", category: "aerobic", calories: 8},
        {name: "955 Fat", category: "aerobic", calories: 8},
      ];
        var list = $scope.activities;    
        var arrayLength = list.length;
        
       // Add New Activity Button
        $scope.addActivity = function() {
          if($scope.query !== ''){
              $scope.newCategory = $scope.newCategory.toLowerCase();
              // Need to add method to convert minutes to calories
              $scope.activities.push({name: $scope.newName, category: $scope.newCategory, calories: $scope.newMinutes});
              // getImage($scope, $http, arrayLength); // To Do: need to add icon for each category
             $scope.newName = '';
             $scope.newCategory = '';
             $scope.newMinutes = '';
        
          }
        };
});