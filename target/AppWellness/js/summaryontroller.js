angular.module('wellness',['chart.js'])

.controller("summaryController", function($scope){


	console.log("hi");


	$scope.labels = ['Possible Range', 'Average', 'My Score'];

	$scope.data = [
	[65, 59, 80]

	];


	$scope.v=1;
	$scope.colours = [{backgroundColor: "#36A2EB"}];


	/*$scope.options = { legend: { display: true } };*/

	$scope.nextbutton = function(index){

		$scope.v=++index;

        if ($scope.v == 2) {

			$scope.colours = [{backgroundColor: "#FF6384"}];

		} else if ($scope.v == 3) {

			$scope.colours = [{backgroundColor: "#36A2EB"}];

		}else if ($scope.v == 4) {

			$scope.colours = [{backgroundColor: "#FF6384"}];

		}else if ($scope.v == 5) {

			$scope.colours = [{backgroundColor: "#FF6384"}];

		}
		

	}
	
	$scope.backbutton=function(i){

       $scope.v=--i;


        	 if ($scope.v == 2) {

			$scope.colours = [{backgroundColor: "#FF6384"}];

		} else if ($scope.v == 3) {

			$scope.colours = [{backgroundColor: "#36A2EB"}];

		}else if ($scope.v == 4) {

			$scope.colours = [{backgroundColor: "#FF6384"}];

		}else if ($scope.v == 5) {

			$scope.colours = [{backgroundColor: "#FF6384"}];

		}
	}

})