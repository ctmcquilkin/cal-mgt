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

.controller('ListCtrl', function($scope, $rootScope, Foods) {
  $scope.pageClass = 'page-food';
  $scope.foods = Foods;
})

.controller('AuthCtrl', [
  '$scope', '$rootScope', '$firebaseAuth', function($scope, $rootScope, $firebaseAuth) {
    var ref = new Firebase('https://eat-right.firebaseio.com/favoritelist/');
    $rootScope.auth = $firebaseAuth(ref);
    
    $scope.signIn = function () {
      $rootScope.auth.$login('password', {
        email: $scope.email,
        password: $scope.password
      }).then(function(user) {
        $rootScope.alert.message = '';
        $rootScope.auth.user = $scope.auth.user;
      }, function(error) {
        if (error = 'INVALID_EMAIL') {
          console.log('email invalid or not signed up — trying to sign you up!');
          $scope.signUp();
        } else if (error = 'INVALID_PASSWORD') {
          console.log('wrong password!');
        } else {
          console.log(error);
        }
      });
    }

    $scope.signUp = function() {
      $rootScope.auth.$createUser($scope.email, $scope.password, function(error, user) {
        if (!error) {
          $rootScope.alert.message = '';
        } else {
          $rootScope.alert.class = 'danger';
          $rootScope.alert.message = 'The username and password combination you entered is invalid.';
        }
      });
    }
  }
])

.controller('AlertCtrl', [
  '$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.alert = {};
  }
])

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