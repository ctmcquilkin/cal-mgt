var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate', 'firebase'])
.constant('FIREBASE_ROOT_URL', 'https://eat-right.firebaseio.com/favoritelist/');

/*
URL Scheme will be three lists, on for activities, 
one for food and one for totals in the followin format:

// https://eat-right.firebaseio.com/favoritelist/
{
  // https://eat-right.firebaseio.com/favoritelist/food-items
  "food-items": {
 
    // https://eat-right.firebaseio.com/favoritelist/food-items/milk
    "milk": {
 
      // https://eat-right.firebaseio.com/favoritelist/food-items/milk/name
      "name": "Milk",
 
      // https://eat-right.firebaseio.com/favoritelist/food-items/milk/addedByUser
      "addedByUser": "David"
    },
 
    "pizza": {
      "name": "Pizza",
      "addedByUser": "Alice"
    },
  }
}

*/

/*

To convert minutes to calories:

Men:

Calories Burned = [(Age x 0.2017) — (Weight x 0.09036) + (Heart Rate x 0.6309) — 55.0969] x Time / 4.184.

Women:

Calories Burned = [(Age x 0.074) — (Weight x 0.05741) + (Heart Rate x 0.4472) — 20.4022] x Time / 4.184.

*/

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

animateApp.controller('activityController', function($scope, $firebaseArray, FIREBASE_ROOT_URL) {
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

      // Sync to Firebase as Array
      this.activityList = $firebaseArray(new Firebase(FIREBASE_ROOT_URL + 'activity-items'));

      // Add Activity
      this.addActivity = function () {

        this.activityList.$add({
          name: this.name,
          date: new Date().valueOf()
        });

        this.name = null;
      }.bind(this);

      // Remove Activity
      this.removeItem = function (item) {
        this.activityList.$remove(item);
      };

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

animateApp.controller('favoriteFoodCtrl', function($scope, $firebaseArray, FIREBASE_ROOT_URL) {
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

      // Sync to Firebase as Array
      this.foodList = $firebaseArray(new Firebase(FIREBASE_ROOT_URL + 'food-items'));

      // Add Food
      this.addFood = function () {

        this.foodList.$add({
          name: this.name,
          date: new Date().valueOf()
        });

        this.name = null;
      }.bind(this);

      // Remove Food
      this.removeItem = function (item) {
        this.foodList.$remove(item);
      };

      
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