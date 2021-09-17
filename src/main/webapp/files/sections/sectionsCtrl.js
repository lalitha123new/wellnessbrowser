var app = angular.module("wellness", [ 'ngCookies', 'toaster',
		'angular-loading-bar', 'ionic' ]);

app
		.controller(
				"sectionController",
				function($scope, $cookieStore, $cookies, $http,
						globalServerName, toaster, $filter) {

					$scope.ebuttonshow = true;
					$scope.sbuttonshow = true;
					$scope.dbuttonshow = true;
					$scope.abuttonshow = true;
					$scope.sectionArray = '';
					$scope.navenable = "";
					$scope.username = "";
					$scope.countArray = "";
					$scope.progresstext = "";
					$scope.color = "red";

					$scope.token = localStorage.getItem("token");

					$scope.user_id = localStorage.getItem("userid");
					console.log($scope.user_id);

					$scope.psy = true;
					$scope.emo = true;
					$scope.sco = true;
					$scope.dist = true;
					$scope.act = true;

					$scope.resource = function() {

						window.location.href = "../resources/resources.html";
					}
					/*$scope.overall_summary = function() {

						window.location.href = "../summary/tablepage/tablepage.html";
					}*/

					$scope.link = function() {

						window.location.href = "../../files/links/link.html";
					}

					console.log($(window).width());

					/*if ($(window).width() < 500) {

						$('#mobilepopup').modal('show');

					}*/

					if ($scope.user_id == null) {
						alert("Please login");
						window.location.href = "../../index.html";
					}

					$scope.homeclick = function() {

						window.location.href = "../../index.html";
					}

					$scope.logout = function() {

						$scope.startdate = window.localStorage.getItem("date");
						$scope.enddate = $filter('date')(new Date(),
								"dd-MM-yyyy hh:mm:ss");

						$scope.dates = {

							"start" : $scope.startdate,
							"end" : $scope.enddate
						}
						$http(
								{
									url : globalServerName.getUrlName()
											+ "user/logout/" + $scope.user_id,
									method : "POST",
									data : $scope.dates,
									headers : {
										'Content-Type' : 'application/json',
										'Authorization' : $scope.token
									}
								}).success(function(res) {

							localStorage.removeItem("userid");
							window.location.href = "../../index.html";
						}).error(function(res) {

						})
					}

					$http(
							{
								url : globalServerName.getUrlName()
										+ "user/getName/" + $scope.user_id,
								method : "GET",
								headers : {
									'Content-Type' : 'application/json',
									'Authorization' : $scope.token
								}
							}).success(function(res) {

						console.log(res);
						$scope.username = res;
					}).error(function(res) {

						if (res.status == 400) {

							localStorage.removeItem("userid");
							localStorage.removeItem("token");
							window.location.href = "../../index.html";
						}

						console.log(res);
					})
					$http(
							{

								url : globalServerName.getUrlName()
										+ "Section/sectionsCount/"
										+ $scope.user_id,
								method : "GET",
								headers : {
									'Content-Type' : 'application/json',
									'Authorization' : $scope.token
								}

							})
							.success(
									function(res) {

										$scope.navenable = res.length;
										console.log($scope.navenable);

										$scope.loading = false;

									/*	if ($scope.navenable == 0) {

											$scope.psy = false;

										} else if ($scope.navenable == 1) {

											$scope.psy = false;
											$scope.emo = false;
										} else if ($scope.navenable == 2) {
											$scope.psy = false;
											$scope.emo = false;
											$scope.sco = false;
										} else if ($scope.navenable == 3) {

											$scope.psy = false;
											$scope.emo = false;
											$scope.sco = false;
											$scope.dist = false;
										}
										if ($scope.navenable >= 4) {

											$scope.psy = false;
											$scope.emo = false;
											$scope.sco = false;
											$scope.dist = false;
											$scope.act = false;

										}
										*/
										
										// begin code for disabling each section after completing it for first time users
  
										if (($scope.navenable == 0) || ($scope.navenable >= 5)){

											$scope.psy = false;

										}
										
										if (($scope.navenable == 1) || ($scope.navenable >= 5)){

											//$scope.psy = false;
											$scope.emo = false;
										}
										
									  if (($scope.navenable == 2) || ($scope.navenable >= 5)) {
											//$scope.psy = false;
											//$scope.emo = false;
											$scope.sco = false;
										}
										
									 if (($scope.navenable == 3) || ($scope.navenable >= 5)) {

											//$scope.psy = false;
											//$scope.emo = false;
											//$scope.sco = false;
											$scope.dist = false;
										}
										
										if (($scope.navenable == 4) || ($scope.navenable >= 5)) {

											//$scope.psy = false;
											//$scope.emo = false;
											//$scope.sco = false;
											//$scope.dist = false;
											$scope.act = false;

										}
										
										//end of code for disabling each section after completing it for first time users
										
										$scope.resumeclick = function() {

											if ($scope.navenable == 0) {

												window.location.href = "../../files/psychological/psychological.html";
											} else if ($scope.navenable == 1) {

												window.location.href = "../../files/emotion/emotional.html";
											} else if ($scope.navenable == 2) {

												window.location.href = "../../files/social/social.html";
											} else if ($scope.navenable == 3) {

												window.location.href = "../../files/distress/distress.html";
											}
											if ($scope.navenable == 4) {

												window.location.href = "../../files/activity/activity.html";
											}
										}
										$scope.summary = function() {

											if ($scope.navenable <= 4) {
												toaster
														.pop('error', "Error",
																"Please complete all the sections");
											} else {

												window.location.href = "../../files/summary/psychological/summary.html";
											}
										}
										
										$scope.overall_summary = function() {

											if ($scope.navenable <= 4) {
												toaster
														.pop('error', "Error",
																"Please complete all the sections");
											} else {

												window.location.href = "../summary/tablepage/tablepage.html";
											}
										}
									}).error(function(res) {

								console.log(res);
							})

					$scope.psychological = function() {

						window.location.href = "../../files/psychological/psychological.html";
					}
					$scope.emotion = function() {

						window.location.href = "../../files/emotion/emotional.html";
					}
					$scope.social = function() {

						window.location.href = "../../files/social/social.html";
					}
					$scope.distress = function() {

						window.location.href = "../../files/distress/distress.html";
					}
					$scope.activity = function() {

						window.location.href = "../../files/activity/activity.html";
					}

				})

app.filter('capitalize', function() {
	return function(input) {
		return (!!input) ? input.charAt(0).toUpperCase()
				+ input.substr(1).toLowerCase() : '';
	}
});