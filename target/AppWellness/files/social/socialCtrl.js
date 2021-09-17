var app = angular.module("wellness", [ 'rzModule', 'ui.bootstrap', 'ngCookies','toaster','angular-loading-bar']);

app.controller("socialController", function($scope, globalServerName, $http, $cookies,toaster,$filter,cfpLoadingBar) {
	
	$scope.token = localStorage.getItem("token");
	$scope.user_id = localStorage.getItem("userid");
	console.log($scope.user_id);
	
	if($scope.user_id == null){
		alert("Please login");
		window.location.href="../../index.html";
	}
	
	$scope.homeclick = function(){
		
		window.location.href="../../index.html";
	}
	 
	$scope.logout = function() {
		
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
			window.location.href="../../index.html";
			
		})
		.error(function(res){
			
		})
		
	}
	
	$http({

		url : globalServerName.getUrlName() + "Section/sectionsCount/"+$scope.user_id,
		method : "GET",
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : $scope.token
		}

	}).success(function(res) {
		$scope.countarray = res.length;
		console.log($scope.countarray);
		
		if($scope.countarray >=3){
			
			$scope.countarray = true;
			
		}else{
			
			$scope.countarray = false;
		}
		
	}).error(function(res){
		
		console.log(res);
		
	})
	
	 $scope.mypage = function(){
			
			window.location.href="../../files/sections/sections.html";
		}


	$scope.v1 = "";
	$scope.v2 = "";
	$scope.v3 = "";
	$scope.v4 = "";
	$scope.v5 = "";
	$scope.v6 = "";
	$scope.v7 = "";
	$scope.v8 = "";
	$scope.v9 = "";
	$scope.ans1 = [];
	$scope.sectionID = "";

	$scope.b = [ "", "a", "b", "c", "", "d", "e", "f" ];

	$scope.qleft = [];
	$scope.qright = [];

	for (var i = 0; i <= $scope.b.length; i++) {

		$scope.slider_ticks_values = {
			value : 4,
			options : {
				ceil : 7,
				floor : 1,
				showTicksValues : true,
				translate : function(value) {
					return $scope.b[value];
				}
			}
		}

		$scope.slider_ticks_values1 = {
			value : 4,
			options : {
				ceil : 7,
				floor : 1,
				showTicksValues : true,
				translate : function(value) {
					return $scope.b[value];
				}
			}
		}
		$scope.slider_ticks_values2 = {
			value : 4,
			options : {
				ceil : 7,
				floor : 1,
				showTicksValues : true,
				translate : function(value) {
					return $scope.b[value];
				}
			}
		}
		$scope.slider_ticks_values3 = {
			value : 4,
			options : {
				ceil : 7,
				floor : 1,
				showTicksValues : true,
				translate : function(value) {
					return $scope.b[value];
				}
			}
		}
		$scope.slider_ticks_values4 = {
			value : 4,
			options : {
				ceil : 7,
				floor : 1,
				showTicksValues : true,
				translate : function(value) {
					return $scope.b[value];
				}
			}
		}
		$scope.slider_ticks_values5 = {
			value : 4,
			options : {
				ceil : 7,
				floor : 1,
				showTicksValues : true,
				translate : function(value) {
					return $scope.b[value];
				}
			}
		}
		$scope.slider_ticks_values6 = {
			value : 4,
			options : {
				ceil : 7,
				floor : 1,
				showTicksValues : true,
				translate : function(value) {
					return $scope.b[value];
				}
			}
		}
		$scope.slider_ticks_values7 = {
			value : 4,
			options : {
				ceil : 7,
				floor : 1,
				showTicksValues : true,
				translate : function(value) {
					return $scope.b[value];
				}
			}
		}
		$scope.slider_ticks_values8 = {
			value : 4,
			options : {
				ceil : 7,
				floor : 1,
				showTicksValues : true,
				translate : function(value) {
					return $scope.b[value];
				}
			}
		}

	}

	$scope.socialsection = function() {

		$http({

			url : globalServerName.getUrlName() + "Section/getSection/3",
			method : "GET",
			headers : {
				'Content-Type' : 'application/json'
			}

		}).success(function(res) {
			
			 console.log(res);
		        //$scope.len = localStorage.getItem("len");
			 $scope.len = sessionStorage.getItem("len");
				
				$scope.sectionID = res.ID;
				//alert("	        $scope.len "+$scope.len);
				if( $scope.len == 'eng'){
					
					$scope.language = res.english;
					$scope.questionss = res.english.questions;
					
				}else if( $scope.len == 'hin'){
					
					$scope.language = res.hindi;
					$scope.questionss = res.hindi.questions;
					
				}else {
			    	
			    	$scope.language = res.english;
			    	$scope.questionss = res.english.questions;
			    	
			    }
						
			
			$scope.scobutton = true;
			//$scope.hindi=" हिन्दी";
						
				 
				     $scope.languages=function(l){
					 
	                // localStorage.setItem("len", l);
				    	 sessionStorage.setItem("len", l);
					 
					 //$scope.len = localStorage.getItem("len");
				    	 $scope.len = sessionStorage.getItem("len");
					
					    if($scope.len == 'eng'){
					    	
					    	$scope.language = res.english;
					    	$scope.questionss = res.english.questions;
					    	
					    }else if($scope.len == 'hin'){
					    	
					    	$scope.language = res.hindi;
					    	$scope.questionss = res.hindi.questions;
					    	
					    }
			    	
			    }
			
		}).error(function(res) {

			console.log(res);
		})
	}

	$scope.socialsection();
	

	console.log($scope.user_id);
	$scope.socialSubmit = function(m) {
		$scope.ans = [];

		$scope.v1 = $scope.slider_ticks_values.value;
		$scope.v2 = $scope.slider_ticks_values1.value;
		$scope.v3 = $scope.slider_ticks_values2.value;
		$scope.v4 = $scope.slider_ticks_values3.value;
		$scope.v5 = $scope.slider_ticks_values4.value;
		$scope.v6 = $scope.slider_ticks_values5.value;
		$scope.v7 = $scope.slider_ticks_values6.value;
		$scope.v8 = $scope.slider_ticks_values7.value;
		$scope.v9 = $scope.slider_ticks_values8.value;
		
		//console.log($scope.v1);

		if (($scope.v1 == 4) || ($scope.v2 == 4) || ($scope.v3 == 4)
				|| ($scope.v4 == 4) || ($scope.v5 == 4) || ($scope.v6 == 4)
				|| ($scope.v7 == 4) || ($scope.v8 == 4) || ($scope.v9 == 4)) {
			

			toaster.pop('error',"Error","Please answer all questions");

		}

		else {
			
			cfpLoadingBar.start();
			$scope.sbutton = true;

			if ($scope.v1 >= 5) {

				$scope.v1 = $scope.v1 - 1;
			}if($scope.v2 >= 5){
				
				$scope.v2 = $scope.v2 - 1;
				
			}if($scope.v3 >= 5){
				
				$scope.v3 = $scope.v3 - 1;
				
			}if($scope.v4 >= 5){
				
				$scope.v4 = $scope.v4 - 1;
				
			}if($scope.v5 >= 5){
				
				$scope.v5 = $scope.v5 - 1;
				
			}if($scope.v6 >= 5){
				
				$scope.v6 = $scope.v6 - 1;
				
			}if($scope.v7 >= 5){
				$scope.v7 = $scope.v7 - 1;
				
			} if($scope.v8 >= 5){
				
				$scope.v8 = $scope.v8 - 1;
			}if($scope.v9 >= 5){
				
				$scope.v9 = $scope.v9 - 1;
			}
					
			
			

			$scope.ans.push($scope.v1, $scope.v2, $scope.v3, $scope.v4,
					$scope.v5, $scope.v6, $scope.v7, $scope.v8, $scope.v9);

			$scope.anwser = {

				"ans" : $scope.ans
			}
			
			console.log($scope.anwser);

			$http(
					{

						url : globalServerName.getUrlName()
								+ "Section/addResponse/" + $scope.user_id + "/"
								+ $scope.sectionID,
						method : "POST",
						data : $scope.anwser,
						headers : {
							'Content-Type' : 'application/json',
							'Authorization' : $scope.token
						}
					}).success(function(res) {

				console.log(res);
				
				console.log(m);
				if(m == 'submit'){
					
					//window.location.href="../../files/sections/sections.html";
					
					window.location.href="../../files/summary/social/summary.html";
					
				}else if(m == 'next'){
					
					 window.location.href="../../files/distress/distress.html";
				}
			}).error(function(res) {

				console.log(res);
			})
		}

	}
	
	

	// language code here
	/* $http({

			url : globalServerName.getUrlName() + "Section/getSection/3",
			method : "GET",
			headers : {
				'Content-Type' : 'application/json'
			}

		}).success(function(res) {
			
			 console.log(res);
		        $scope.len = localStorage.getItem("len");
				
				$scope.sectionID = res.ID;
				//alert("	        $scope.len "+$scope.len);
				if( $scope.len == 'eng'){
				
					$scope.language = res.english;
					$scope.questionss = res.english.questions;
					
				}else if( $scope.len == 'hin'){
				
					$scope.language = res.hindi;
					$scope.questionss = res.hindi.questions;
					
				}else {
			    	
			    	$scope.language = res.english;
			    	$scope.questionss = res.english.questions;
			    	
			    }
			
			
			
			$scope.scobutton = true;
			//$scope.hindi=" हिन्दी";
			
			
				 
				 $scope.languages=function(l){
	                 localStorage.setItem("len", l);
					 
					 $scope.len = localStorage.getItem("len");
					
					    if($scope.len == 'eng'){
					    	
					    	$scope.language = res.english;
					    	$scope.questionss = res.english.questions;
					    	
					    }else if($scope.len == 'hin'){
					    	
					    	$scope.language = res.hindi;
					    	$scope.questionss = res.hindi.questions;
					    	
					    }
			    	
			    }
			
		}).error(function(res) {

			console.log(res);
		})*/

})

      app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

        cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar-spinner"><div><img src="../../angular/loading/loading.gif" width="50%"></div></div>';


      }])