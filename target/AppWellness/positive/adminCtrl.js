var app = angular.module("wellness", ['ngCookies','toaster']);

app.controller("admincontroller", function($scope, globalServerName, $http,toaster) {

	$scope.admin = function() {

		$scope.adminobject = {

			"username" : $scope.username,
			"password" : $scope.password
		}
		console.log($scope.adminobject);

		$http({

			url : globalServerName.getUrlName() + "admin/login",
			method : "POST",
			data : $scope.adminobject,
			headers : {
				'Content-Type' : 'application/json'
			}
			
		}).success(function(res) {
			
			if(res == 1){
				
				toaster.pop('success',"Login success");
				window.location.href="home/index.html";
			}else if(res == 0){
				
				toaster.pop('error',"Error","Please check username or password");
			}

			
			console.log(res);

		}).error(function(res){
			
			
			console.log(res);
		})

	}

})
