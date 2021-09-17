

var app = angular.module("wellness",['ngCookies']);

app.controller("emotionalController",function($scope,$cookieStore){

	console.log("Hi");

	$scope.count = 1;

	$scope.questionss = [{"ques":"... that I have little or no interest in things around me"}];

	$scope.ques = [

	{"ques":"... irritated by something"},
	{"ques":"... satisfied and content"},
	{"ques":"... that i have little or no interest in things around me"},
	{"ques":"... irritated by something"},
	{"ques":"... satisfied and content"}
	];

	$scope.emotionvalue = function(q,v){

		/*console.log(q+1,v);*/
		if($scope.ques.length != $scope.questionss.length){
			$scope.questionss[++q] = $scope.ques[q];

			// console.log($scope.questionss.length + "" + $scope.ques.length)
			
		}

		// $scope.buttonshow = true;
        console.log(q+1 + "" + $scope.ques.length);

		if($scope.ques.length == q+1){

                    $scope.buttonshow = true;
                    
			}

		$scope.count = $scope.questionss.length;
		$scope.progressvalue = $scope.questionss.length;
	}


})