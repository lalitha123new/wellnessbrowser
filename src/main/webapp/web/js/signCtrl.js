var app = angular.module("wellness", [ 'ngCookies', 'toaster' ]);

app.controller("signController", function($scope, toaster, globalServerName,
		$http, $cookies) {

	var parameters = location.search.substring(1).split("&");
	var temp = parameters[0].split("=");
	l = unescape(temp[1]);
	console.log("val of l = " + l);
	var dec = window.atob(l);
	$scope.email = dec;
	console.log($scope.email);
	$scope.fupdate = {

		"email" : $scope.email
	}
	$scope.user_id = "";
	$scope.username = "";

	$scope.signup = function() {
	//	alert()

		
		$scope.register = {

			"email" : $scope.email,
			"username" : $scope.username,
			"password" : $scope.password
		}
         if($scope.password.length <= 3){
        	 
        	 toaster.pop('error', "Error", "Password should contain atleast 4 characters");
         }
		else if ($scope.password != $scope.cpassword) {

			toaster.pop('error', "Error", "Password is not matching");
		} else {

			console.log($scope.register);

			$http({

				url : globalServerName.getUrlName() + "user/createUser",
				method : "POST",
				data : $scope.register,
				headers : {
					'Content-Type' : 'application/json'
				}

			}).success(function(res) {

				if (res == 0) {

					toaster.pop('warning', "Email already exits");

				}
				else if(res == -1){
					
					toaster.pop('warning', "Username already exits, please try another username");
				}
				
				else {

					toaster.pop('success', "User Created");
					console.log(res);
					localStorage.setItem("userid",res);
					window.location.href = "index.html";

				}

			}).error(function(res) {

				console.log(res);
			})
		}
	}

	$scope.forgotonload = function() {
		//alert($scope.fupdate);

		$http({

			url : globalServerName.getUrlName() + "user/getuserid",
			method : "POST",
			data : $scope.fupdate,
			headers : {
				'Content-Type' : 'application/json'
			}

		}).success(function(res) {

			console.log(res);
			$scope.user_id = res.userid;
			$scope.username = res.name;
		}).error(function(res) {

			console.log(res);
		})
	}

	$scope.forgotonload();

	$scope.forgot = function() {
		//alert($scope.fpassword);

		$scope.fupdate = {

				"forgot" : $scope.fpassword
		}
        
		if($scope.fpassword.length <= 3){
       	 
       	 toaster.pop('error', "Error", "Password should contain atleast 4 characters");
        }
		else if ($scope.fpassword != $scope.fcpassword) {

			toaster.pop('error', "Error", "Password is not matching");
		} else {

			$http(
					{

						url : globalServerName.getUrlName()
								+ "user/forgotpwdupdate/" + $scope.user_id,
						method : "POST",
						data : $scope.fupdate,
						headers : {
							'Content-Type' : 'application/json'
						}

					}).success(function(res) {
						toaster.pop('success',"Password changed successfully");
						window.location.href = "../index.html";
						
				console.log(res);
			}).error(function(res) {

				console.log(res);
			})
		}

	}

})
