var app = angular.module("wellness",[]);

app.controller("stressController",function($scope){

	console.log("HI");

	$scope.count = 1;

	$scope.ques = [

    {"ques":"During the last 30 days, about how often did you feel tired out for no good reason?"},
    {"ques":"During the last 30 days, about how often did you feel tired out for no good reason?"}];
})