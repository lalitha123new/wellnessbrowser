var app = angular.module("wellness", ['ngCookies','toaster','angular-loading-bar']);

app.controller("feedbackController", function($scope,$http,$cookies,globalServerName,toaster,cfpLoadingBar){
	
	console.log("hello");
	$scope.feddbackvalue = '';
	var count = 0;
	
	$scope.user_id = localStorage.getItem("userid");
	console.log($scope.user_id);
	$scope.token = localStorage.getItem("token");
	
	if($scope.user_id == null){
		alert("Please login");
		window.location.href="../../../index.html";
	}
	
	$scope.homeclick = function(){
		
		window.location.href="../../../index.html";
	}
	 
	$scope.logout = function() {

		localStorage.removeItem("userid");
		window.location.href="../../../index.html";
		
	}
	 $scope.mypage = function(){
			
			window.location.href="../../../files/sections/sections.html";
		}
	 
	 $scope.next_page_button = function(){
		 window.location.href="../tablepage/tablepage.html";
		 
	 }
	
	 
	 $http({
			url : globalServerName.getUrlName()
						+"Section/getFeedbackcount?userid="+$scope.user_id,

				method : "GET",
				headers : {
					'Content-Type' : 'application/json'
				}
			}).success(function(res){
				
				console.log(res);
				count = res;
				
				//$('#feedModal').modal('show');
				
			})
			.error(function(res){
				
				console.log("error");
			})
	
			
			
	$scope.feedback = function(){
		 
		
		 if($scope.feedbackForm.$invalid){
			 if(count >= 1){
					window.location.href="../tablepage/tablepage.html";
				}
			 else
			
			toaster.pop('error',"Error","Please complete all feedbacks");
			
	
		}else{
			
			var arr = [];
			angular.forEach($scope.checkboxModel, function(value, key){
				//alert(value);
				if(value){
					//alert(key);
					if(key=="value1"){
						
						 arr.push(1);
					}else if(key=="value2"){
						 arr.push(2);
						
					}
					else if(key=="value3"){
						 arr.push(3);
						
					}
					else if(key=="value4"){
						 arr.push(4);
						
					}
					else if(key=="value5"){
						 arr.push(5);
						
					}
					else if(key=="value6"){
						 arr.push(6);
						
					}
					else if(key=="value7"){
						 arr.push(7);
						
					}
					else if(key=="value8"){
						 arr.push(8);
						
					}
					
					
					 
				}
			   
			});
			
			//alert("hello"+arr);
			console.log(arr);
			
			$scope.checkboxModel2 = JSON.stringify(arr);
			
		          /* $.each(checkboxModel2, function (key, value) {
		              if(checkboxModel2[value]=="True"){
		              $scope.checkboxModel2 = checkboxModel2[key];
		           }
		           });*/
			
			$scope.feedbackvalue = {
					

					"feedback1" : $scope.feedback1,
					"feedback2" : $scope.feedback2,
					"feedback3" : $scope.feedback3,
					"feedback4" : $scope.feedback4,
					"feedback5" : $scope.checkboxModel2
			
					/*"feedback5" : $scope.feedback5,
					"feedback6" : $scope.feedback6,
					"feedback7" : $scope.feedback7,
					"feedback8" : $scope.feedback8,
					"feedback9" : $scope.feedback9,
					"feedback10" : $scope.feedback10,
					"feedback11" : $scope.feedback11,
					"feedback12" : $scope.feedback12*/
			}
			
			
			cfpLoadingBar.start();
			$scope.feedbackbutton = true;
			console.log($scope.feedbackvalue);	
			$http({
				
				url : globalServerName.getUrlName() + "Section/feedback/" + $scope.user_id,
				method : "POST",
				data:$scope.feedbackvalue,
				headers : {
					'Content-Type' : 'application/json',
					'Authorization' : $scope.token
				}
				
			})
			.success(function(res){
				
				console.log("success");
				//$('#feedModal').modal('show');
				
			})
			.error(function(res){
				
				console.log("error");
			})
			
			window.location.href="../tablepage/tablepage.html";
			
			
			
		}	

	}
	
	
	
	/*$scope.backbutton = function(){
		
		window.location.href="../../../files/summary/activity/summary.html";
	}*/
	
	$scope.modelclose = function(){
		
		window.location.href="../../../files/sections/sections.html";
	}
	
});

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

    cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar-spinner"><div><img src="../../../angular/loading/loading.gif" width="50%"></div></div>';


  }])
