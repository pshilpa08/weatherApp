'use strict';

/**
 * @ngdoc function
 * @name weatherappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherappApp
 */
angular.module('weatherappApp')
  .controller('MainCtrl', function ($scope, $http) {

  	$scope.requestURL= 'api.openweathermap.org/data/2.5/weather';
  	$scope.date = new Date();
  	$scope.showFurtherMore = false;
  	$scope.futherMoreDetail= [];
	  $scope.cityname = "";
	var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=1397c83e02f0c1946dc7ba8cbbd64026';
	var forecastURL =  'http://api.openweathermap.org/data/2.5/forecast?units=metric&APPID=1397c83e02f0c1946dc7ba8cbbd64026';
	  //var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?id=2643743&units=metric&APPID=1397c83e02f0c1946dc7ba8cbbd64026';
	  //var forecastURL =  'http://api.openweathermap.org/data/2.5/forecast?id=2643743&units=metric&APPID=1397c83e02f0c1946dc7ba8cbbd64026';
	  var weatherJSONURL =  '../../resources/testWeather.json';
	var forecastJSONURL = '../../resources/testForecast.json';

    $scope.loadFurtherDetails = function(index){
     	$scope.showFurtherMore = true;
     	$scope.futureMoreDetail=[];
     	for(var i=0; i<8 ; i++){
     		$scope.futureMoreDetail.push($scope.forecast.list[index+i]);
     	}
    };

    $scope.loadWeather = function(location){
		var locationURL = weatherURL + "&q=" + location;
		$http.get(locationURL)
			.then(function(response) {
				$scope.currentCity = location;
				$scope.response = response.data;
			});
	};

	$scope.loadFutureWeather = function(location) {
		var locationForecast = forecastURL + "&q=" + location;

		$http.get(locationForecast)
			.then(function(response) {
				$scope.forecast = response.data;
			});
	};

	$scope.loadAllWeather = function(){
		var searchedLocation;
		if($scope.cityname != "") {
			searchedLocation = $scope.cityname;
		}else {
			searchedLocation = "London,UK";
		}
		$scope.loadWeather(searchedLocation);
		$scope.loadFutureWeather(searchedLocation);
	};

	  $scope.loadWeather("London");
	  $scope.loadFutureWeather("London");
  })
	.directive('currentWeather', function() {
		return {
			templateUrl: "../../views/directives/currentWeather.html"
		};
	})
	.directive('furtherWeather', function () {
		return {
			templateUrl: "../../views/directives/furtherWeather.html"
		}
	})
	.directive('furtherDetails', function () {
		return {
			templateUrl: "../../views/directives/furtherDetails.html"
		}
	});

