var app = angular.module("wellness", ['toaster']);

app.controller("resourcecontroller", function($scope, $http, globalServerName,toaster) {
	
	$scope.homeClick = function(){
		
		window.location.href="../../index.html";
	}
	
	$scope.myPage = function(){
		
		window.location.href="../sections/sections.html";
	}

	$scope.resourcesection = function() {

		$http({

			url : globalServerName.getUrlName() + "Section/getSection/6",
			method : "GET",
			headers : {
				'Content-Type' : 'application/json'
			}

		}).success(function(res) {

			console.log(res);
		}).error(function(res) {

			console.log(res);
		})

		$http({

			url : globalServerName.getUrlName() + "Section/getSection/7",
			method : "GET",
			headers : {
				'Content-Type' : 'application/json'
			}

		}).success(function(res) {

			console.log(res);
			$scope.questionss = [];
			res.questions.forEach(function(q){
				var obj = {
						value:q		
				};
				$scope.questionss.push(obj);
			});
			console.log($scope.questionss);
			console.log(res.ID);
			$scope.sectionID = res.ID;
		}).error(function(res) {

			console.log(res);
		})
	}

	$scope.resourcesection();
	
	$scope.array = [];
	$scope.q="";
	$scope.v="";
	$scope.total=0;
	
	$scope.resourceSubmit = function(){
	
		var sum = 0;
		$scope.ques = '';
		if($scope.resourceform.$invalid){
			
			toaster.pop('warning',"Please ensure that you have listed the change you wished to make in yourself.Please complete all questions");
			
		}else if($scope.q1 == undefined){
			
			toaster.pop('warning',"Please ensure that you have listed the change you wished to make in yourself.Please complete all questions");
			
		}else{
			$scope.questionss.forEach(function(q){
				
				
				$scope.ques = q.ans;
				if(q.ans > 3){
					sum+=1
				}
				
				
			});
			
			if($scope.ques == undefined){
				
				toaster.pop('warning',"Please ensure that you have listed the change you wished to make in yourself.Please complete all questions");
			}else{
				
				if(($scope.q1==7) || ($scope.q1==8)){
					
					if(sum >= 6){
						
						$("#myModaltable").modal('show');
						
					}else if(sum < 6){
						
						$("#myModaltable2").modal('show');
					}
					
				}
				else if(($scope.q1==5) || ($scope.q1==6)){
					
		             if(sum >= 6){
						
		            	 $("#myModaltable3").modal('show');
						
					}else if(sum < 6){
						
						$("#myModaltable4").modal('show');
						
					} 
					
				}
			}
			

			
		}
		

	}
    
	
	$scope.modelclose = function(){
		
		$('#myModaltable').modal('hide');
		 $('#myModal').modal('hide');
		 $('#myModaltable2').modal('hide');
		 $('#myModal').modal('hide');
		 $('#myModaltable3').modal('hide');
		 $('#myModal').modal('hide');
		 $('#myModaltable4').modal('hide');
		 $('#myModal').modal('hide');
	}
	
})