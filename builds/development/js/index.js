var friendsList = angular.module("root", []);

friendsList.controller("index", ["$scope", "$http", function ($scope, $http) {
     $scope.orderList = "name";
     $scope.query;
		$scope.foods = [
      {name: "Apple", category: "fruit", calories: "95", image: "http://lorempixel.com/food/200/200/"},
      {name: "Coffee", category: "drink", calories: "1"},
      {name: "Milk (nonfat)", category: "drink", calories: "83"},
      {name: "Cereal", category: "grain", calories: "210"},
      {name: "Salad (endless summer)", category: "vegetable", calories: "150"},
      {name: "Salad (spinach)", category: "vegetable", calories: "140"},
    ];
      var list = $scope.foods;		
      var arrayLength = list.length;
      
      // Using $http to fetch JSON data
      function getImage($scope, $http, index){
              $http({
              method: 'GET', 
              url: 'http://lorempixel.com/food/200/200/'
      })
      .success(function(data, status, headers, config) {
      				// Set image key = random JSON image
                $scope.foods[index].image = data.image_urls.normal;
            }, $scope).error(function(data, status, headers, config) { alert(status); });
      }; 
       
      // Get a new image for each friend in the array
		 for(var i=0;i<arrayLength;i++){                      
				getImage($scope, $http, i);
      }
      
		 // Reverse Order Button
      $scope.reverse = function(){
      	if($scope.orderList == "name"){
      		$scope.orderList = "-name";
        } else {
      		$scope.orderList = "name";
        }
      };
      
		 // Add New User Button
      $scope.addUser = function() {
      	if($scope.query !== ''){
            $scope.newGender = $scope.newGender.toLowerCase();
            $scope.foods.push({name: $scope.newName, gender: $scope.newGender, number: $scope.newNumber});
            getImage($scope, $http, arrayLength);
      		 $scope.newName = '';
      		 $scope.newGender = '';
      		 $scope.newNumber = '';
      
      	}
      };
      
	}]);