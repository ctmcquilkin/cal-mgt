angular.module('eatRight', ['ngRoute', 'ngAnimate', 'firebase'])

.value('fbURL', 'https://eat-right.firebaseio.com/favoritelist/food-items/')

/*
URL Scheme will be three lists, on for activities, 
one for food and one for totals in the following format:

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

To convert minutes of exercise to calories:

Men:
Calories Burned = [(Age x 0.2017) — (Weight x 0.09036) + (Heart Rate x 0.6309) — 55.0969] x Time / 4.184.

Women:
Calories Burned = [(Age x 0.074) — (Weight x 0.05741) + (Heart Rate x 0.4472) — 20.4022] x Time / 4.184.

*/

.factory('Foods', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL));
})

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'views/list.html'
    })
    .when('/edit/:foodId', {
      controller:'EditCtrl',
      templateUrl:'views/detail.html'
    })
    .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'views/detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('ListCtrl', function($scope, Foods) {
  $scope.pageClass = 'page-food';
  $scope.orderList = "name";
  $scope.foods = Foods;
  var list = $scope.foods;
  var arrayLength = list.length;
  imageArray = [];

 //  var list = $scope.foods    
 //  var arrayLength = list.length;

 //  function getImage($scope,index){
 //      $scope.foods[index].image = 'img/png/food-'+index+'.png';
 //  }; 
   
 //  // Get a new image for each friend in the array
 // for(var i=0;i<arrayLength;i++){                      
 //    getImage($scope, i);
 //  }
  // for (var i=0; i < arrayLength; i++) {
  //   $scope.foods[index].image = 'img/png/food-'+i+'.png';
  // }
    // Load the array of images
    // var img = imageArray.push('i');
    // Foods.imageURL = "img/png/food-"+i+".png";
    // console.log(Foods.length);
    // for (i=0; i<arrayLength; i++) {
    //   imageArray.push(i);
    // }
    // getImage = function() {
    //   for (i=0; i<arrayLength; i++) {
    //     imageArray.push(i);
    //       // imageArray.push[i] = "img/png/food-"+i+".png";
    //   }
    // };
    // getImage();

    // console.log(imageArray);

    // picture.setIcon(imageArray[]);

  // Reverse Order Button
  $scope.reverse = function(){
    if($scope.orderList == "name"){
      $scope.orderList = "-name";
    } else {
      $scope.orderList = "name";
    }
  };
})

.controller('CreateCtrl', function($scope, $location, $timeout, Foods) {
  $scope.pageClass = 'page-add-food';
  $scope.save = function() {
    Foods.$add($scope.food, function() {
      $timeout(function() { $location.path('/'); });
    });
  };
})

.controller('EditCtrl',
  function($scope, $location, $routeParams, $firebase, fbURL) {
    $scope.pageClass = 'page-activity';
    var foodUrl = fbURL + $routeParams.foodId;
    $scope.food = $firebase(new Firebase(foodUrl));

    $scope.destroy = function() {
      $scope.food.$remove();
      $location.path('/');
    };

    $scope.save = function() {
      $scope.food.$save();
      $location.path('/');
    };
});