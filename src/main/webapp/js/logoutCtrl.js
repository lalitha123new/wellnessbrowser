var app = angular.module("wellness", [ 'ngCookies', 'toaster','angular-loading-bar']);

app.controller("logoutcontroller", function($scope, $rootScope, $http,
		globalServerName, $cookies, $rootScope, toaster,$filter,cfpLoadingBar) {

	
	$scope.user_id = "";
	$scope.flg = '';
	
	
	
	$scope.token = localStorage.getItem("token");
	$scope.user_id = localStorage.getItem("userid");
	
	$scope.logout = function() {
		alert("hellow");
		
	    $scope.startdate = window.localStorage.getItem("date");
		$scope.enddate = $filter('date')(new Date(),"dd-MM-yyyy hh:mm:ss");
		
		$scope.dates = {
				
				"start": $scope.startdate,
				"end" :  $scope.enddate
		}
		$http({
			url : globalServerName.getUrlName() + "user/logout/"+$scope.user_id,
			method : "POST",
			data: $scope.dates,
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : $scope.token
			}
		})
		.success(function(res){
			
			localStorage.removeItem("userid");
			localStorage.removeItem("token");
			localStorage.removeItem("flg");
			if ($(window).width() < 500) {
			window.location.href="index.html";	
			}
			else
			
			window.location.href = "files/sections/sections.html";
		})
		.error(function(res){
			
		})
	}

	

	

	

	


	$scope.flag = localStorage.getItem("flg");

	
	
   
   
    
	
	
	
    
	
	
	

	

})

      app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

        cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar-spinner"><div><img src="../angular/loading/loading.gif" width="50%"></div></div>';


      }])