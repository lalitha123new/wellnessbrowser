var app = angular.module("wellness",['ngCookies']);

app.controller("linkController", function($scope){
	
	$scope.homeClick = function(){
		
		window.location.href="../../index.html";
	}
	
	$scope.myPage = function(){
		
		window.location.href="../sections/sections.html";
	}
	
})
