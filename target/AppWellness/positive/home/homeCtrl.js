var app = angular.module("wellness", [ 'ngCookies', 'toaster' ]);

app
		.controller(
				"admincontroller",
				function($scope, globalServerName, $http, toaster) {

					console.log("hi");
					$scope.user = "";
					$scope.userdemo = "";
					$scope.userfeedback = "";
					$scope.userresponse = "";
					$scope.userscore = "";

					$scope.admin = function() {

						$http(
								{

									url : globalServerName.getUrlName()
											+ "admin/userinfo",
									method : "GET",
									headers : {
										'Content-Type' : 'application/json'
									}

								}).success(function(res) {
									//console.log("try");

							console.log(res);
							$scope.user = res;

						}).error(function(res) {

							console.log(res);
						})

					}

					$scope.admin();

					$scope.users = [];
					$scope.exportData = function() {

						for ( var i in $scope.user) {

							$scope.users.push({

								User_id : $scope.user[i].user_id,
								Name : $scope.user[i].name,
								Email : $scope.user[i].email,
								Phone : $scope.user[i].phone
							})
						}
						alasql(
								'SELECT * INTO XLSX("user.xlsx",{headers:true}) FROM ?',
								[ $scope.users ]);
					}

					$scope.userdemo = function() {

						$http(
								{

									url : globalServerName.getUrlName()
											+ "admin/userdemographic",
									method : "GET",
									headers : {
										'Content-Type' : 'application/json'
									}

								})
								.success(
										function(res) {
											$scope.userdemo = res;
											console.log($scope.userdemo);

											for ( var i in $scope.userdemo) {

												console
														.log($scope.userdemo[i].education);

												// education
												if ($scope.userdemo[i].education == "1") {

													$scope.userdemo[i].education = "High school";

												} else if ($scope.userdemo[i].education == "2") {

													$scope.userdemo[i].education = "Pre-university";
												} else if ($scope.userdemo[i].education == "3") {

													$scope.userdemo[i].education = "Under-graduation";
												} else if ($scope.userdemo[i].education == "4") {

													$scope.userdemo[i].education = "Post graduation";
												}

												// best currently
												if ($scope.userdemo[i].best_currently == "1") {

													$scope.userdemo[i].best_currently = "Working";
												} else if ($scope.userdemo[i].best_currently == "2") {

													$scope.userdemo[i].best_currently = "Studying";
												} else if ($scope.userdemo[i].best_currently == "3") {

													$scope.userdemo[i].best_currently = "Being a homemaker";
												} else if ($scope.userdemo[i].best_currently == "4") {

													$scope.userdemo[i].best_currently = "Searching for a job";
												} else if ($scope.userdemo[i].best_currently == "5") {

													$scope.userdemo[i].best_currently = "Retired";
												}

												// seek_mental_prof_help

												if ($scope.userdemo[i].seek_mental_prof_help == "1") {

													$scope.userdemo[i].seek_mental_prof_help = "Yes, I am on medication for mental health issues";
												} else if ($scope.userdemo[i].seek_mental_prof_help == "2") {

													$scope.userdemo[i].seek_mental_prof_help = "Yes, I am meeting a counselor";
												} else if ($scope.userdemo[i].seek_mental_prof_help == "1,2") {

													$scope.userdemo[i].seek_mental_prof_help = "I am on medication for mental health issues, I am meeting a counselor";
												}else if ($scope.userdemo[i].seek_mental_prof_help == "3") {

													$scope.userdemo[i].seek_mental_prof_help = "No";
												}
												
												
												// distress
												if ($scope.userdemo[i].distress == "1") {

													$scope.userdemo[i].distress = "Very uncomfortable";
												} else if ($scope.userdemo[i].distress == "2") {

													$scope.userdemo[i].distress = "Uncomfortable";
												} else if ($scope.userdemo[i].distress == "3") {

													$scope.userdemo[i].distress = "Neither uncomfortable nor comfortable";
												} else if ($scope.userdemo[i].distress == "4") {

													$scope.userdemo[i].distress = "Comfortable";
												} else if ($scope.userdemo[i].distress == "5") {

													$scope.userdemo[i].distress = "Very comfortable";
												}
												
												// consult
												if ($scope.userdemo[i].consult == "1") {

													$scope.userdemo[i].consult = "Extremely Unlikely";
												} else if ($scope.userdemo[i].consult == "2") {

													$scope.userdemo[i].consult = "Unlikely";
												} else if ($scope.userdemo[i].consult == "3") {

													$scope.userdemo[i].consult = "Unsure";
												} else if ($scope.userdemo[i].consult == "4") {

													$scope.userdemo[i].consult = "Likely";
												} else if ($scope.userdemo[i].consult == "5") {

													$scope.userdemo[i].consult = "Extremely Likely";
												}
												
												
												// personal
												if ($scope.userdemo[i].personal == "1") {

													$scope.userdemo[i].personal = "Extremely Unlikely";
												} else if ($scope.userdemo[i].personal == "2") {

													$scope.userdemo[i].personal = "Unlikely";
												} else if ($scope.userdemo[i].personal == "3") {

													$scope.userdemo[i].personal = "Unsure";
												} else if ($scope.userdemo[i].personal == "4") {

													$scope.userdemo[i].personal = "Likely";
												} else if ($scope.userdemo[i].personal == "5") {

													$scope.userdemo[i].personal = "Extremely Likely";
												}

											}

										}).error(function(res) {

									console.log(res);
								})

					}

					$scope.userdemo();

					$scope.exportData1 = function() {

						$scope.userdemos = [];

						for ( var i in $scope.userdemo) {

							$scope.userdemos
									.push({

										
										User_id : $scope.userdemo[i].user_id,
										Name : $scope.userdemo[i].name,							
										Gender : $scope.userdemo[i].gender,
										Age : $scope.userdemo[i].age,
										City : $scope.userdemo[i].city,
										Work : $scope.userdemo[i].work,
										Martial_status : $scope.userdemo[i].martial_status,
										Education : $scope.userdemo[i].education,
										Best_currently : $scope.userdemo[i].best_currently,
										Mental_health_prof_help : $scope.userdemo[i].mental_health_prof_help,
										Current_mental_helath_prob : $scope.userdemo[i].current_mental_helath_prob,
										Seek_mental_prof_help : $scope.userdemo[i].seek_mental_prof_help,
										Distress : $scope.userdemo[i].distress,
										Consult : $scope.userdemo[i].consult,
										Personal : $scope.userdemo[i].personal

									})

						}

						alasql(
								'SELECT * INTO XLSX("usersdemo.xlsx",{headers:true}) FROM ?',
								[ $scope.userdemos ]);
					}

					$scope.userfeed = function() {

						$http(
								{

									url : globalServerName.getUrlName()
											+ "admin/userfeedback",
									method : "GET",
									headers : {
										'Content-Type' : 'application/json'
									}

								})
								.success(
										function(res) {

											console.log(res);
											$scope.userfeedback = res;

											for ( var i in $scope.userfeedback) {

												// feedback2
												if ($scope.userfeedback[i].feedback2 == "1") {

													$scope.userfeedback[i].feedback2 = "Very likely";
												} else if ($scope.userfeedback[i].feedback2 == "2") {

													$scope.userfeedback[i].feedback2 = "Likely";
												} else if ($scope.userfeedback[i].feedback2 == "3") {

													$scope.userfeedback[i].feedback2 = "Unsure";
												} else if ($scope.userfeedback[i].feedback2 == "4") {

													$scope.userfeedback[i].feedback2 = "Unlikely";
												} else if ($scope.userfeedback[i].feedback2 == "5") {

													$scope.userfeedback[i].feedback2 = "Very unlikely";
												}
												
												
												// feedback3
												if ($scope.userfeedback[i].feedback3 == "1") {

													$scope.userfeedback[i].feedback3 = "Very uncomfortable";
												} else if ($scope.userfeedback[i].feedback3 == "2") {

													$scope.userfeedback[i].feedback3 = "Uncomfortable";
												} else if ($scope.userfeedback[i].feedback3 == "3") {

													$scope.userfeedback[i].feedback3 = "Neither uncomfortable nor comfortable";
												} else if ($scope.userfeedback[i].feedback3 == "4") {

													$scope.userfeedback[i].feedback3 = "Comfortable";
												} else if ($scope.userfeedback[i].feedback3 == "5") {

													$scope.userfeedback[i].feedback3 = "Very comfortable";
												}

												// feedback4
												if ($scope.userfeedback[i].feedback4 == "1") {

													$scope.userfeedback[i].feedback4 = "Extremely Unlikely";
												} else if ($scope.userfeedback[i].feedback4 == "2") {

													$scope.userfeedback[i].feedback4 = "Unlikely";
												} else if ($scope.userfeedback[i].feedback4 == "3") {

													$scope.userfeedback[i].feedback4 = "Unsure";
												} else if ($scope.userfeedback[i].feedback4 == "4") {

													$scope.userfeedback[i].feedback4 = "Likely";
												} else if ($scope.userfeedback[i].feedback4 == "5") {

													$scope.userfeedback[i].feedback4 = "Extremely Likely";
												}

												// feedback5
												if ($scope.userfeedback[i].feedback5 == "1") {

													$scope.userfeedback[i].feedback5 = "Extremely Unlikely";
												} else if ($scope.userfeedback[i].feedback5 == "2") {

													$scope.userfeedback[i].feedback5 = "Unlikely";
												} else if ($scope.userfeedback[i].feedback5 == "3") {

													$scope.userfeedback[i].feedback5 = "Unsure";
												} else if ($scope.userfeedback[i].feedback5 == "4") {

													$scope.userfeedback[i].feedback5 = "Likely";
												} else if ($scope.userfeedback[i].feedback5 == "5") {

													$scope.userfeedback[i].feedback5 = "Extremely Likely";
												}

											}

										}).error(function(res) {

								})
					}

					$scope.userfeed();
					$scope.exportData2 = function() {

						$scope.userfeedbacks = [];

						for ( var i in $scope.userfeedback) {

							$scope.userfeedbacks.push({

								User_id : $scope.userfeedback[i].user_id,
								Name : $scope.userfeedback[i].name,								
								Feedback1 : $scope.userfeedback[i].feedback1,
								Feedback2 : $scope.userfeedback[i].feedback2,
								Feedback3 : $scope.userfeedback[i].feedback3,
								Feedback4 : $scope.userfeedback[i].feedback4,
								Feedback5 : $scope.userfeedback[i].feedback5

							})

						}

						alasql(
								'SELECT * INTO XLSX("userfeedback.xlsx",{headers:true}) FROM ?',
								[ $scope.userfeedbacks ]);

					}

					// user responses

					$scope.userresponse = function() {

						$http(
								{

									url : globalServerName.getUrlName()
											+ "admin/userresponse",
									method : "GET",
									headers : {
										'Content-Type' : 'application/json'
									}

								})
								.success(
										function(res) {
											
											console.log(res);
											

											var array = JSON.parse("["
													+ res[0].response + "]");
											
											
											$scope.userresponse = res;

											for ( var i in $scope.userresponse) {
												
												//to display total score in the userresponses page
												//var totalsum2=JSON.parse($scope.userresponse[i].totalsum);
												//alert(totalsum2);
												//$scope.userresponse[i].total=$scope.userresponse[i].totalsum;
												
												//var array = JSON.parse("[" + $scope.userresponse[i].totalsum + "]");
												/*var array1 = $scope.userresponse[i].totalsum;
												var obj = JSON.parse(array1);
												
												//alert(obj);
												
										
												
												
												if ($scope.userresponse[i].section_id == "S1") {
													
													//alert( array[0] );
														
														$scope.userresponse[i].sa = obj[0];
														$scope.userresponse[i].mc = obj[1];
														$scope.userresponse[i].pr = obj[2];
														$scope.userresponse[i].eg = obj[3];
														$scope.userresponse[i].overall = obj[4];
												
													}
												else if($scope.userresponse[i].section_id == "S2") {
													$scope.userresponse[i].pa = obj[1];
													$scope.userresponse[i].na = obj[0];
													
												}
												
												else if($scope.userresponse[i].section_id == "S3") {
													$scope.userresponse[i].swb = obj[0];
													
													
												}
												else if($scope.userresponse[i].section_id == "S4") {
													$scope.userresponse[i].distress = obj[0];
													
													
												}
												else {
													
													$scope.userresponse[i].hedonic = obj[0];
													$scope.userresponse[i].eudemonic = obj[1];
													
												}*/
													
													
													
												
												
												
												if ($scope.userresponse[i].section_id == "S1") {

													if ($scope.userresponse[i].response[1] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q1 = "strongly disagree";
														$scope.userresponse[i].q1 = "6";
													} else if ($scope.userresponse[i].response[1] == "2") {

														//$scope.userresponse[i].q1 = "disagree somewhat";
														$scope.userresponse[i].q1 = "5";
													}

													else if ($scope.userresponse[i].response[1] == "3") {

														//$scope.userresponse[i].q1 = "disagree slightly";
														$scope.userresponse[i].q1 = "4";
													} else if ($scope.userresponse[i].response[1] == "4") {

														//$scope.userresponse[i].q1 = "agree slightly";
														$scope.userresponse[i].q1 = "3";
													} else if ($scope.userresponse[i].response[1] == "5") {

														//$scope.userresponse[i].q1 = "agree somewhat";
														$scope.userresponse[i].q1 = "2";
													} else {

														$scope.userresponse[i].q1 = "1";
													}

													if ($scope.userresponse[i].response[3] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q2 = "strongly disagree";
														$scope.userresponse[i].q2 = "1";
													} else if ($scope.userresponse[i].response[3] == "2") {

														//$scope.userresponse[i].q2 = "disagree somewhat";
														$scope.userresponse[i].q2 = "2";
													}

													else if ($scope.userresponse[i].response[3] == "3") {

														//$scope.userresponse[i].q2 = "disagree slightly";
														$scope.userresponse[i].q2 = "3";
													} else if ($scope.userresponse[i].response[3] == "4") {

														//$scope.userresponse[i].q2 = "agree slightly";
														$scope.userresponse[i].q2 = "4";
													} else if ($scope.userresponse[i].response[3] == "5") {

														//$scope.userresponse[i].q2 = "agree somewhat";
														$scope.userresponse[i].q2 = "5";
													} else {

														//$scope.userresponse[i].q2 = "strongly agree";
														$scope.userresponse[i].q2 = "6";
													}

													if ($scope.userresponse[i].response[5] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q3 = "strongly disagree";
														$scope.userresponse[i].q3 = "1";
													} else if ($scope.userresponse[i].response[5] == "2") {

														//$scope.userresponse[i].q3 = "disagree somewhat";
														$scope.userresponse[i].q3 = "2";
													}

													else if ($scope.userresponse[i].response[5] == "3") {

														//$scope.userresponse[i].q3 = "disagree slightly";
														$scope.userresponse[i].q3 = "3";
													} else if ($scope.userresponse[i].response[5] == "4") {

														//$scope.userresponse[i].q3 = "agree slightly";
														$scope.userresponse[i].q3 = "4";
													} else if ($scope.userresponse[i].response[5] == "5") {

														//$scope.userresponse[i].q3 = "agree somewhat";
														$scope.userresponse[i].q3 = "5";
													} else {

														//$scope.userresponse[i].q3 = "strongly agree";
														$scope.userresponse[i].q3 = "6";
													}

													if ($scope.userresponse[i].response[7] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q4 = "strongly disagree";
														$scope.userresponse[i].q4 = "6";
													} else if ($scope.userresponse[i].response[7] == "2") {

														//$scope.userresponse[i].q4 = "disagree somewhat";
														$scope.userresponse[i].q4 = "5";
													}

													else if ($scope.userresponse[i].response[7] == "3") {

														//$scope.userresponse[i].q4 = "disagree slightly";
														$scope.userresponse[i].q4 = "4";
													} else if ($scope.userresponse[i].response[7] == "4") {

														//$scope.userresponse[i].q4 = "agree slightly";
														$scope.userresponse[i].q4 = "3";
													} else if ($scope.userresponse[i].response[7] == "5") {

														//$scope.userresponse[i].q4 = "agree somewhat";
														$scope.userresponse[i].q4 = "2";
													} else {

														//$scope.userresponse[i].q4 = "strongly agree";
														$scope.userresponse[i].q4 = "1";
													}

													if ($scope.userresponse[i].response[9] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q5 = "strongly disagree";
														$scope.userresponse[i].q5 = "1";
													} else if ($scope.userresponse[i].response[9] == "2") {

														//$scope.userresponse[i].q5 = "disagree somewhat";
														$scope.userresponse[i].q5 = "2";
													}

													else if ($scope.userresponse[i].response[9] == "3") {

														//$scope.userresponse[i].q5 = "disagree slightly";
														$scope.userresponse[i].q5 = "3";
													} else if ($scope.userresponse[i].response[9] == "4") {

														//$scope.userresponse[i].q5 = "agree slightly";
														$scope.userresponse[i].q5 = "4";
													} else if ($scope.userresponse[i].response[9] == "5") {

														//$scope.userresponse[i].q5 = "agree somewhat";
														$scope.userresponse[i].q5 = "5";
													} else {

														//$scope.userresponse[i].q5 = "strongly agree";
														$scope.userresponse[i].q5 = "6";
													}

													if ($scope.userresponse[i].response[11] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q6 = "strongly disagree";
														$scope.userresponse[i].q6 = "1";
													} else if ($scope.userresponse[i].response[11] == "2") {

														//$scope.userresponse[i].q6 = "disagree somewhat";
														$scope.userresponse[i].q6 = "2";
													}

													else if ($scope.userresponse[i].response[11] == "3") {

														//$scope.userresponse[i].q6 = "disagree slightly";
														$scope.userresponse[i].q6 = "3";
													} else if ($scope.userresponse[i].response[11] == "4") {

														//$scope.userresponse[i].q6 = "agree slightly";
														$scope.userresponse[i].q6 = "4";
													} else if ($scope.userresponse[i].response[11] == "5") {

														//$scope.userresponse[i].q6 = "agree somewhat";
														$scope.userresponse[i].q6 = "5";
													} else {

														//$scope.userresponse[i].q6 = "strongly agree";
														$scope.userresponse[i].q6 = "6";
													}

													if ($scope.userresponse[i].response[13] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q7 = "strongly disagree";
														$scope.userresponse[i].q7 = "1";
													} else if ($scope.userresponse[i].response[13] == "2") {

														//$scope.userresponse[i].q7 = "disagree somewhat";
														$scope.userresponse[i].q7 = "2";
													}

													else if ($scope.userresponse[i].response[13] == "3") {

														//$scope.userresponse[i].q7 = "disagree slightly";
														$scope.userresponse[i].q7 = "3";
													} else if ($scope.userresponse[i].response[13] == "4") {

														//$scope.userresponse[i].q7 = "agree slightly";
														$scope.userresponse[i].q7 = "4";
													} else if ($scope.userresponse[i].response[13] == "5") {

														//$scope.userresponse[i].q7 = "agree somewhat";
														$scope.userresponse[i].q7 = "5";
													} else {

														//$scope.userresponse[i].q7 = "strongly agree";
														$scope.userresponse[i].q7 = "6";
													}

													if ($scope.userresponse[i].response[15] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q8 = "strongly disagree";
														$scope.userresponse[i].q8 = "6";
													} else if ($scope.userresponse[i].response[15] == "2") {

														//$scope.userresponse[i].q8 = "disagree somewhat";
														$scope.userresponse[i].q8 = "5";
													}

													else if ($scope.userresponse[i].response[15] == "3") {

														//$scope.userresponse[i].q8 = "disagree slightly";
														$scope.userresponse[i].q8 = "4";
													} else if ($scope.userresponse[i].response[15] == "4") {

														//$scope.userresponse[i].q8 = "agree slightly";
														$scope.userresponse[i].q8 = "3";
													} else if ($scope.userresponse[i].response[15] == "5") {

														//$scope.userresponse[i].q8 = "agree somewhat";
														$scope.userresponse[i].q8 = "2";
													} else {

														//$scope.userresponse[i].q8 = "strongly agree";
														$scope.userresponse[i].q8 = "1";
													}

													if ($scope.userresponse[i].response[17] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q9 = "strongly disagree";
														$scope.userresponse[i].q9 = "1";
													} else if ($scope.userresponse[i].response[17] == "2") {

														//$scope.userresponse[i].q9 = "disagree somewhat";
														$scope.userresponse[i].q9 = "2";
													}

													else if ($scope.userresponse[i].response[17] == "3") {

														//$scope.userresponse[i].q9 = "disagree slightly";
														$scope.userresponse[i].q9 = "3";
													} else if ($scope.userresponse[i].response[17] == "4") {

														//$scope.userresponse[i].q9 = "agree slightly";
														$scope.userresponse[i].q9 = "4";
													} else if ($scope.userresponse[i].response[17] == "5") {

														//$scope.userresponse[i].q9 = "agree somewhat";
														$scope.userresponse[i].q9 = "5";
													} else {

														$scope.userresponse[i].q9 = "6";
													}

													if ($scope.userresponse[i].response[19] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q10 = "strongly disagree";
														$scope.userresponse[i].q10 = "6";
													} else if ($scope.userresponse[i].response[19] == "2") {

														//$scope.userresponse[i].q10 = "disagree somewhat";
														$scope.userresponse[i].q10 = "5";
													}

													else if ($scope.userresponse[i].response[19] == "3") {

														//$scope.userresponse[i].q10 = "disagree slightly";
														$scope.userresponse[i].q10 = "4";
													} else if ($scope.userresponse[i].response[19] == "4") {

														//$scope.userresponse[i].q10 = "agree slightly";
														$scope.userresponse[i].q10 = "3";
													} else if ($scope.userresponse[i].response[19] == "5") {

														//$scope.userresponse[i].q10 = "agree somewhat";
														$scope.userresponse[i].q10 = "2";
													} else {

														//$scope.userresponse[i].q10 = "strongly agree";
														$scope.userresponse[i].q10 = "1";
													}

													if ($scope.userresponse[i].response[21] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q11 = "strongly disagree";
														$scope.userresponse[i].q11 = "6";
													} else if ($scope.userresponse[i].response[21] == "2") {

														//$scope.userresponse[i].q11 = "disagree somewhat";
														$scope.userresponse[i].q11 = "5";
													}

													else if ($scope.userresponse[i].response[21] == "3") {

														//$scope.userresponse[i].q11 = "disagree slightly";
														$scope.userresponse[i].q11 = "4";
													} else if ($scope.userresponse[i].response[21] == "4") {

														//$scope.userresponse[i].q11 = "agree slightly";
														$scope.userresponse[i].q11 = "3";
													} else if ($scope.userresponse[i].response[21] == "5") {

														//$scope.userresponse[i].q11 = "agree somewhat";
														$scope.userresponse[i].q11 = "2";
													} else {

														//$scope.userresponse[i].q11 = "strongly agree";
														$scope.userresponse[i].q11 = "1";
													}

													if ($scope.userresponse[i].response[23] == "1") {

														//$scope.userresponse[i].q12 = "strongly disagree";
														$scope.userresponse[i].q12 = "6";
													} else if ($scope.userresponse[i].response[23] == "2") {

														//$scope.userresponse[i].q12 = "disagree somewhat";
														$scope.userresponse[i].q12 = "5";
													}

													else if ($scope.userresponse[i].response[23] == "3") {

														//$scope.userresponse[i].q12 = "disagree slightly";
														$scope.userresponse[i].q12 = "4";
													} else if ($scope.userresponse[i].response[23] == "4") {

														//$scope.userresponse[i].q12 = "agree slightly";
														$scope.userresponse[i].q12 = "3";
													} else if ($scope.userresponse[i].response[23] == "5") {

														//$scope.userresponse[i].q12 = "agree somewhat";
														$scope.userresponse[i].q12 = "2";
													} else {

														//$scope.userresponse[i].q12 = "strongly agree";
														$scope.userresponse[i].q12 = "1";
													}

													if ($scope.userresponse[i].response[25] == "1") {

														//$scope.userresponse[i].q13 = "strongly disagree";
														$scope.userresponse[i].q13 = "1";
													} else if ($scope.userresponse[i].response[25] == "2") {

														//$scope.userresponse[i].q13 = "disagree somewhat";
														$scope.userresponse[i].q13 = "2";
													}

													else if ($scope.userresponse[i].response[25] == "3") {

														//$scope.userresponse[i].q13 = "disagree slightly";
														$scope.userresponse[i].q13 = "3";
													} else if ($scope.userresponse[i].response[25] == "4") {

														//$scope.userresponse[i].q13 = "agree slightly";
														$scope.userresponse[i].q13 = "4";
													} else if ($scope.userresponse[i].response[25] == "5") {

														//$scope.userresponse[i].q13 = "agree somewhat";
														$scope.userresponse[i].q13 = "5";
													} else {

														//$scope.userresponse[i].q13 = "strongly agree";
														$scope.userresponse[i].q13 = "6";
													}

													if ($scope.userresponse[i].response[27] == "1") {

														//$scope.userresponse[i].q14 = "strongly disagree";
														$scope.userresponse[i].q14 = "6";
													} else if ($scope.userresponse[i].response[27] == "2") {

														//$scope.userresponse[i].q14 = "disagree somewhat";
														$scope.userresponse[i].q14 = "5";
													}

													else if ($scope.userresponse[i].response[27] == "3") {

														//$scope.userresponse[i].q14 = "disagree slightly";
														$scope.userresponse[i].q14 = "4";
													} else if ($scope.userresponse[i].response[27] == "4") {

														//$scope.userresponse[i].q14 = "agree slightly";
														$scope.userresponse[i].q14 = "3";
													} else if ($scope.userresponse[i].response[27] == "5") {

														//$scope.userresponse[i].q14 = "agree somewhat";
														$scope.userresponse[i].q14 = "2";
													} else {

														//$scope.userresponse[i].q14 = "strongly agree";
														$scope.userresponse[i].q14 = "1";
													}

													if ($scope.userresponse[i].response[29] == "1") {

														//$scope.userresponse[i].q15 = "strongly disagree";
														$scope.userresponse[i].q15 = "1";
													} else if ($scope.userresponse[i].response[29] == "2") {

														//$scope.userresponse[i].q15 = "disagree somewhat";
														$scope.userresponse[i].q15 = "2";
													}

													else if ($scope.userresponse[i].response[29] == "3") {

														//$scope.userresponse[i].q15 = "disagree slightly";
														$scope.userresponse[i].q15 = "3";
													} else if ($scope.userresponse[i].response[29] == "4") {

														//$scope.userresponse[i].q15 = "agree slightly";
														$scope.userresponse[i].q15 = "4";
													} else if ($scope.userresponse[i].response[29] == "5") {

														//$scope.userresponse[i].q15 = "agree somewhat";
														$scope.userresponse[i].q15 = "5";
													} else {

														//$scope.userresponse[i].q15 = "strongly agree";
														$scope.userresponse[i].q15 = "6";
													}

													if ($scope.userresponse[i].response[31] == "1") {

														//$scope.userresponse[i].q16 = "strongly disagree";
														$scope.userresponse[i].q16 = "1";
													} else if ($scope.userresponse[i].response[31] == "2") {

														//$scope.userresponse[i].q16 = "disagree somewhat";
														$scope.userresponse[i].q16 = "2";
													}

													else if ($scope.userresponse[i].response[31] == "3") {

														//$scope.userresponse[i].q16 = "disagree slightly";
														$scope.userresponse[i].q16 = "3";
													} else if ($scope.userresponse[i].response[31] == "4") {

														//$scope.userresponse[i].q16 = "agree slightly";
														$scope.userresponse[i].q16 = "4";
													} else if ($scope.userresponse[i].response[31] == "5") {

														//$scope.userresponse[i].q16 = "agree somewhat";
														$scope.userresponse[i].q16 = "5";
													} else {

														//$scope.userresponse[i].q16 = "strongly agree";
														$scope.userresponse[i].q16 = "6";
													}

													if ($scope.userresponse[i].response[33] == "1") {

														//$scope.userresponse[i].q17 = "strongly disagree";
														$scope.userresponse[i].q17 = "1";
													} else if ($scope.userresponse[i].response[33] == "2") {

														//$scope.userresponse[i].q17 = "disagree somewhat";
														$scope.userresponse[i].q17 = "2";
													}

													else if ($scope.userresponse[i].response[33] == "3") {

														//$scope.userresponse[i].q17 = "disagree slightly";
														$scope.userresponse[i].q17 = "3";
													} else if ($scope.userresponse[i].response[33] == "4") {

														//$scope.userresponse[i].q17 = "agree slightly";
														$scope.userresponse[i].q17 = "4";
													} else if ($scope.userresponse[i].response[33] == "5") {

														//$scope.userresponse[i].q17 = "agree somewhat";
														$scope.userresponse[i].q17 = "5";
													} else {

														//$scope.userresponse[i].q17 = "strongly agree";
														$scope.userresponse[i].q17 = "6";
													}

													if ($scope.userresponse[i].response[35] == "1") {

														//$scope.userresponse[i].q18 = "strongly disagree";
														$scope.userresponse[i].q18 = "1";
													} else if ($scope.userresponse[i].response[35] == "2") {

														//$scope.userresponse[i].q18 = "disagree somewhat";
														$scope.userresponse[i].q18 = "2";
													}

													else if ($scope.userresponse[i].response[35] == "3") {

														//$scope.userresponse[i].q18 = "disagree slightly";
														$scope.userresponse[i].q18 = "3";
													} else if ($scope.userresponse[i].response[35] == "4") {

														//$scope.userresponse[i].q18 = "agree slightly";
														$scope.userresponse[i].q18 = "4";
													} else if ($scope.userresponse[i].response[35] == "5") {

														//$scope.userresponse[i].q18 = "agree somewhat";
														$scope.userresponse[i].q18 = "5";
													} else {

														//$scope.userresponse[i].q18 = "strongly agree";
														$scope.userresponse[i].q18 = "6";
													}

													if ($scope.userresponse[i].response[37] == "1") {

														//$scope.userresponse[i].q19 = "strongly disagree";
														$scope.userresponse[i].q19 = "6";
													} else if ($scope.userresponse[i].response[37] == "2") {

														//$scope.userresponse[i].q19 = "disagree somewhat";
														$scope.userresponse[i].q19 = "5";
													}

													else if ($scope.userresponse[i].response[37] == "3") {

														//$scope.userresponse[i].q19 = "disagree slightly";
														$scope.userresponse[i].q19 = "4";
													} else if ($scope.userresponse[i].response[37] == "4") {

														//$scope.userresponse[i].q19 = "agree slightly";
														$scope.userresponse[i].q19 = "3";
													} else if ($scope.userresponse[i].response[37] == "5") {

														//$scope.userresponse[i].q19 = "agree somewhat";
														$scope.userresponse[i].q19 = "2";
													} else {

														//$scope.userresponse[i].q19 = "strongly agree";
														$scope.userresponse[i].q19 = "1";
													}

													if ($scope.userresponse[i].response[39] == "1") {

														//$scope.userresponse[i].q20 = "strongly disagree";
														$scope.userresponse[i].q20 = "6";
													} else if ($scope.userresponse[i].response[39] == "2") {

														//$scope.userresponse[i].q20 = "disagree somewhat";
														$scope.userresponse[i].q20 = "5";
													}

													else if ($scope.userresponse[i].response[39] == "3") {

														//$scope.userresponse[i].q20 = "disagree slightly";
														$scope.userresponse[i].q20 = "4";
													} else if ($scope.userresponse[i].response[39] == "4") {

														//$scope.userresponse[i].q20 = "agree slightly";
														$scope.userresponse[i].q20 = "3";
													} else if ($scope.userresponse[i].response[39] == "5") {

														//$scope.userresponse[i].q20 = "agree somewhat";
														$scope.userresponse[i].q20 = "2";
													} else {

														//$scope.userresponse[i].q20 = "strongly agree";
														$scope.userresponse[i].q20 = "1";
													}

												}

												else if ($scope.userresponse[i].section_id == "S2") {

													if ($scope.userresponse[i].response[1] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q1 = "not at all";
														$scope.userresponse[i].q1 = "1";
													} else if ($scope.userresponse[i].response[1] == "2") {

														//$scope.userresponse[i].q1 = "a little";
														$scope.userresponse[i].q1 = "2";
													}

													else if ($scope.userresponse[i].response[1] == "3") {

														//$scope.userresponse[i].q1 = "moderately";
														$scope.userresponse[i].q1 = "3";
													} else if ($scope.userresponse[i].response[1] == "4") {

														//$scope.userresponse[i].q1 = "quite a bit";
														$scope.userresponse[i].q1 = "4";
													}

													else {

														//$scope.userresponse[i].q1 = "extremely";
														$scope.userresponse[i].q1 = "5";
													}

													if ($scope.userresponse[i].response[3] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q2 = "not at all";
														$scope.userresponse[i].q2 = "1";
													} else if ($scope.userresponse[i].response[3] == "2") {

														//$scope.userresponse[i].q2 = "a little";
														$scope.userresponse[i].q2 = "2";
													}

													else if ($scope.userresponse[i].response[3] == "3") {

														//$scope.userresponse[i].q2 = "moderately";
														$scope.userresponse[i].q2 = "3";
													} else if ($scope.userresponse[i].response[3] == "4") {

														//$scope.userresponse[i].q2 = "quite a bit";
														$scope.userresponse[i].q2 = "4";
													}

													else {

														//$scope.userresponse[i].q2 = "extremely";
														$scope.userresponse[i].q2 = "5";
													}

													if ($scope.userresponse[i].response[5] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q3 = "not at all";
														$scope.userresponse[i].q3 = "1";
													} else if ($scope.userresponse[i].response[5] == "2") {

														//$scope.userresponse[i].q3 = "a little";
														$scope.userresponse[i].q3 = "2";
													}

													else if ($scope.userresponse[i].response[5] == "3") {

														//$scope.userresponse[i].q3 = "moderately";
														$scope.userresponse[i].q3 = "3";
													} else if ($scope.userresponse[i].response[5] == "4") {

														//$scope.userresponse[i].q3 = "quite a bit";
														$scope.userresponse[i].q3 = "4";
													}

													else {

														//$scope.userresponse[i].q3 = "extremely";
														$scope.userresponse[i].q3 = "5";
													}

													if ($scope.userresponse[i].response[7] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q4 = "not at all";
														$scope.userresponse[i].q4 = "1";
													} else if ($scope.userresponse[i].response[7] == "2") {

														//$scope.userresponse[i].q4 = "a little";
														$scope.userresponse[i].q4 = "2";
													}

													else if ($scope.userresponse[i].response[7] == "3") {

														//$scope.userresponse[i].q4 = "moderately";
														$scope.userresponse[i].q4 = "3";
													} else if ($scope.userresponse[i].response[7] == "4") {

														//$scope.userresponse[i].q4 = "quite a bit";
														$scope.userresponse[i].q4 = "4";
													}

													else {

														//$scope.userresponse[i].q4 = "extremely";
														$scope.userresponse[i].q4 = "5";
													}

													if ($scope.userresponse[i].response[9] == "1") {

														console.log("hellow");
														//$scope.userresponse[i].q5 = "not at all";
														$scope.userresponse[i].q5 = "1";
													} else if ($scope.userresponse[i].response[9] == "2") {

														//$scope.userresponse[i].q5 = "a little";
														$scope.userresponse[i].q5 = "2";
													}

													else if ($scope.userresponse[i].response[9] == "3") {

														//$scope.userresponse[i].q5 = "moderately";
														$scope.userresponse[i].q5 = "3";
													} else if ($scope.userresponse[i].response[9] == "4") {

														//$scope.userresponse[i].q5 = "quite a bit";
														$scope.userresponse[i].q5 = "4";
													}

													else {

														//$scope.userresponse[i].q5 = "extremely";
														$scope.userresponse[i].q5 = "5";
													}

													if ($scope.userresponse[i].response[11] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q6 = "not at all";
														$scope.userresponse[i].q6 = "1";
													} else if ($scope.userresponse[i].response[11] == "2") {

														//$scope.userresponse[i].q6 = "a little";
														$scope.userresponse[i].q6 = "2";
													}

													else if ($scope.userresponse[i].response[11] == "3") {

														//$scope.userresponse[i].q6 = "moderately";
														$scope.userresponse[i].q6 = "3";
													} else if ($scope.userresponse[i].response[11] == "4") {

														//$scope.userresponse[i].q6 = "quite a bit";
														$scope.userresponse[i].q6 = "4";
													}

													else {

														//$scope.userresponse[i].q6 = "extremely";
														$scope.userresponse[i].q6 = "5";
													}
													
													
													if ($scope.userresponse[i].response[13] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q7 = "not at all";
														$scope.userresponse[i].q7 = "1";
													} else if ($scope.userresponse[i].response[13] == "2") {

														//$scope.userresponse[i].q7 = "a little";
														$scope.userresponse[i].q7 = "2";
													}

													else if ($scope.userresponse[i].response[13] == "3") {

														//$scope.userresponse[i].q7 = "moderately";
														$scope.userresponse[i].q7 = "3";
													} else if ($scope.userresponse[i].response[13] == "4") {

														//$scope.userresponse[i].q7 = "quite a bit";
														$scope.userresponse[i].q7 = "4";
													}

													else {

														//$scope.userresponse[i].q7 = "extremely";
														$scope.userresponse[i].q7 = "5";
													}
													
													
													if ($scope.userresponse[i].response[15] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q8 = "not at all";
														$scope.userresponse[i].q8 = "1";
													} else if ($scope.userresponse[i].response[15] == "2") {

														//$scope.userresponse[i].q8 = "a little";
														$scope.userresponse[i].q8 = "2";
													}

													else if ($scope.userresponse[i].response[15] == "3") {

														//$scope.userresponse[i].q8 = "moderately";
														$scope.userresponse[i].q8 = "3";
													} else if ($scope.userresponse[i].response[15] == "4") {

														//$scope.userresponse[i].q8 = "quite a bit";
														$scope.userresponse[i].q8 = "4";
													}

													else {

														//$scope.userresponse[i].q8 = "extremely";
														$scope.userresponse[i].q8 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[17] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q9 = "not at all";
														$scope.userresponse[i].q9 = "1";
													} else if ($scope.userresponse[i].response[17] == "2") {

														//$scope.userresponse[i].q9 = "a little";
														$scope.userresponse[i].q9 = "2";
													}

													else if ($scope.userresponse[i].response[17] == "3") {

														//$scope.userresponse[i].q9 = "moderately";
														$scope.userresponse[i].q9 = "3";
													} else if ($scope.userresponse[i].response[17] == "4") {

														//$scope.userresponse[i].q9 = "quite a bit";
														$scope.userresponse[i].q9 = "4";
													}

													else {

														//$scope.userresponse[i].q9 = "extremely";
														$scope.userresponse[i].q9 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[19] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q10 = "not at all";
														$scope.userresponse[i].q10 = "1";
													} else if ($scope.userresponse[i].response[19] == "2") {

														//$scope.userresponse[i].q10 = "a little";
														$scope.userresponse[i].q10 = "2";
													}

													else if ($scope.userresponse[i].response[19] == "3") {

														//$scope.userresponse[i].q10 = "moderately";
														$scope.userresponse[i].q10 = "3";
													} else if ($scope.userresponse[i].response[19] == "4") {

														//$scope.userresponse[i].q10 = "quite a bit";
														$scope.userresponse[i].q10 = "4";
													}

													else {

														//$scope.userresponse[i].q10 = "extremely";
														$scope.userresponse[i].q10 = "5";
													}
													
													
													
													
													
													if ($scope.userresponse[i].response[21] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q11 = "not at all";
														$scope.userresponse[i].q11 = "1";
													} else if ($scope.userresponse[i].response[21] == "2") {

														//$scope.userresponse[i].q11 = "a little";
														$scope.userresponse[i].q11 = "2";
													}

													else if ($scope.userresponse[i].response[21] == "3") {

														//$scope.userresponse[i].q11 = "moderately";
														$scope.userresponse[i].q11 = "3";
													} else if ($scope.userresponse[i].response[21] == "4") {

														//$scope.userresponse[i].q11 = "quite a bit";
														$scope.userresponse[i].q11 = "4";
													}

													else {

														//$scope.userresponse[i].q11 = "extremely";
														$scope.userresponse[i].q11 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[23] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q12 = "not at all";
														$scope.userresponse[i].q12 = "1";
													} else if ($scope.userresponse[i].response[23] == "2") {

														//$scope.userresponse[i].q12 = "a little";
														$scope.userresponse[i].q12 = "2";
													}

													else if ($scope.userresponse[i].response[23] == "3") {

														//$scope.userresponse[i].q12 = "moderately";
														$scope.userresponse[i].q12 = "3";
													} else if ($scope.userresponse[i].response[23] == "4") {

														//$scope.userresponse[i].q12 = "quite a bit";
														$scope.userresponse[i].q12 = "4";
													}

													else {

														//$scope.userresponse[i].q12 = "extremely";
														$scope.userresponse[i].q12 = "5";
													}
													
													
													
													
													
													
													if ($scope.userresponse[i].response[25] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q13 = "not at all";
														$scope.userresponse[i].q13 = "1";
													} else if ($scope.userresponse[i].response[25] == "2") {

														//$scope.userresponse[i].q13 = "a little";
														$scope.userresponse[i].q13 = "2";
													}

													else if ($scope.userresponse[i].response[25] == "3") {

														//$scope.userresponse[i].q13 = "moderately";
														$scope.userresponse[i].q13 = "3";
													} else if ($scope.userresponse[i].response[25] == "4") {

														//$scope.userresponse[i].q13 = "quite a bit";
														$scope.userresponse[i].q13 = "4";
													}

													else {

														//$scope.userresponse[i].q13 = "extremely";
														$scope.userresponse[i].q13 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[27] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q14 = "not at all";
														$scope.userresponse[i].q14 = "1";
													} else if ($scope.userresponse[i].response[27] == "2") {

														//$scope.userresponse[i].q14 = "a little";
														$scope.userresponse[i].q14 = "2";
													}

													else if ($scope.userresponse[i].response[27] == "3") {

														//$scope.userresponse[i].q14 = "moderately";
														$scope.userresponse[i].q14 = "3";
													} else if ($scope.userresponse[i].response[27] == "4") {

														//$scope.userresponse[i].q14 = "quite a bit";
														$scope.userresponse[i].q14 = "4";
													}

													else {

														//$scope.userresponse[i].q14 = "extremely";
														$scope.userresponse[i].q14 = "5";
													}
													
													
													
													
													
													if ($scope.userresponse[i].response[29] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q15 = "not at all";
														$scope.userresponse[i].q15 = "1";
													} else if ($scope.userresponse[i].response[29] == "2") {

														//$scope.userresponse[i].q15 = "a little";
														$scope.userresponse[i].q15 = "2";
													}

													else if ($scope.userresponse[i].response[29] == "3") {

														//$scope.userresponse[i].q15 = "moderately";
														$scope.userresponse[i].q15 = "3";
													} else if ($scope.userresponse[i].response[29] == "4") {

														//$scope.userresponse[i].q15 = "quite a bit";
														$scope.userresponse[i].q15 = "4";
													}

													else {

														//$scope.userresponse[i].q15 = "extremely";
														$scope.userresponse[i].q15 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[31] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q16 = "not at all";
														$scope.userresponse[i].q16 = "1";
													} else if ($scope.userresponse[i].response[31] == "2") {

														//$scope.userresponse[i].q16 = "a little";
														$scope.userresponse[i].q16 = "2";
													}

													else if ($scope.userresponse[i].response[31] == "3") {

														//$scope.userresponse[i].q16 = "moderately";
														$scope.userresponse[i].q16 = "3";
													} else if ($scope.userresponse[i].response[31] == "4") {

														//$scope.userresponse[i].q16 = "quite a bit";
														$scope.userresponse[i].q16 = "4";
													}

													else {

														//$scope.userresponse[i].q16 = "extremely";
														$scope.userresponse[i].q16 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[33] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q17 = "not at all";
														$scope.userresponse[i].q17 = "1";
													} else if ($scope.userresponse[i].response[33] == "2") {

														//$scope.userresponse[i].q17 = "a little";
														$scope.userresponse[i].q17 = "2";
													}

													else if ($scope.userresponse[i].response[33] == "3") {

														//$scope.userresponse[i].q17 = "moderately";
														$scope.userresponse[i].q17 = "3";
													} else if ($scope.userresponse[i].response[33] == "4") {

														//$scope.userresponse[i].q17 = "quite a bit";
														$scope.userresponse[i].q17 = "4";
													}

													else {

														//$scope.userresponse[i].q17 = "extremely";
														$scope.userresponse[i].q17 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[35] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q18 = "not at all";
														//$scope.userresponse[i].q18 = "1";
													} else if ($scope.userresponse[i].response[35] == "2") {

														//$scope.userresponse[i].q18 = "a little";
														$scope.userresponse[i].q18 = "2";
													}

													else if ($scope.userresponse[i].response[35] == "3") {

														//$scope.userresponse[i].q18 = "moderately";
														$scope.userresponse[i].q18 = "3";
													} else if ($scope.userresponse[i].response[35] == "4") {

														//$scope.userresponse[i].q18 = "quite a bit";
														$scope.userresponse[i].q18 = "4";
													}

													else {

														//$scope.userresponse[i].q18 = "extremely";
														$scope.userresponse[i].q18 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[37] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q19 = "not at all";
														$scope.userresponse[i].q19 = "1";
													} else if ($scope.userresponse[i].response[37] == "2") {

														//$scope.userresponse[i].q19 = "a little";
														$scope.userresponse[i].q19 = "2";
													}

													else if ($scope.userresponse[i].response[37] == "3") {

														//$scope.userresponse[i].q19 = "moderately";
														$scope.userresponse[i].q19 = "3";
													} else if ($scope.userresponse[i].response[37] == "4") {

														//$scope.userresponse[i].q19 = "quite a bit";
														$scope.userresponse[i].q19 = "4";
													}

													else {

														//$scope.userresponse[i].q19 = "extremely";
														$scope.userresponse[i].q19 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[39] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q20 = "not at all";
														$scope.userresponse[i].q20 = "1";
													} else if ($scope.userresponse[i].response[39] == "2") {

														//$scope.userresponse[i].q20 = "a little";
														$scope.userresponse[i].q20 = "2";
													}

													else if ($scope.userresponse[i].response[39] == "3") {

														//$scope.userresponse[i].q20 = "moderately";
														$scope.userresponse[i].q20 = "3";
													} else if ($scope.userresponse[i].response[39] == "4") {

														//$scope.userresponse[i].q20 = "quite a bit";
														$scope.userresponse[i].q20 = "4";
													}

													else {

														//$scope.userresponse[i].q20 = "extremely";
														$scope.userresponse[i].q20 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[41] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q21 = "not at all";
														$scope.userresponse[i].q21 = "1";
													} else if ($scope.userresponse[i].response[41] == "2") {

														//$scope.userresponse[i].q21 = "a little";
														$scope.userresponse[i].q21 = "2";
													}

													else if ($scope.userresponse[i].response[41] == "3") {

														//$scope.userresponse[i].q21 = "moderately";
														$scope.userresponse[i].q21 = "3";
													} else if ($scope.userresponse[i].response[41] == "4") {

														//$scope.userresponse[i].q21 = "quite a bit";
														$scope.userresponse[i].q21 = "4";
													}

													else {

														$scope.userresponse[i].q21 = "extremely";
														$scope.userresponse[i].q21 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[43] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q22 = "not at all";
														$scope.userresponse[i].q22 = "1";
													} else if ($scope.userresponse[i].response[43] == "2") {

														//$scope.userresponse[i].q22 = "a little";
														$scope.userresponse[i].q22 = "2";
													}

													else if ($scope.userresponse[i].response[43] == "3") {

														//$scope.userresponse[i].q22 = "moderately";
														$scope.userresponse[i].q22 = "3";
													} else if ($scope.userresponse[i].response[43] == "4") {

														//$scope.userresponse[i].q22 = "quite a bit";
														$scope.userresponse[i].q22 = "4";
													}

													else {

														//$scope.userresponse[i].q22 = "extremely";
														$scope.userresponse[i].q22 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[45] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q23 = "not at all";
														$scope.userresponse[i].q23 = "1";
													} else if ($scope.userresponse[i].response[45] == "2") {

														//$scope.userresponse[i].q23 = "a little";
														$scope.userresponse[i].q23 = "2";
													}

													else if ($scope.userresponse[i].response[45] == "3") {

														//$scope.userresponse[i].q23 = "moderately";
														$scope.userresponse[i].q23 = "3";
													} else if ($scope.userresponse[i].response[45] == "4") {

														//$scope.userresponse[i].q23 = "quite a bit";
														$scope.userresponse[i].q23 = "4";
													}

													else {

														//$scope.userresponse[i].q23 = "extremely";
														$scope.userresponse[i].q23 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[47] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q24 = "not at all";
														$scope.userresponse[i].q24 = "1";
													} else if ($scope.userresponse[i].response[47] == "2") {

														//$scope.userresponse[i].q24 = "a little";
														$scope.userresponse[i].q24 = "2";
													}

													else if ($scope.userresponse[i].response[47] == "3") {

														//$scope.userresponse[i].q24 = "moderately";
														$scope.userresponse[i].q24 = "3";
													} else if ($scope.userresponse[i].response[47] == "4") {

														//$scope.userresponse[i].q24 = "quite a bit";
														$scope.userresponse[i].q24 = "4";
													}

													else {

														//$scope.userresponse[i].q24 = "extremely";
														$scope.userresponse[i].q24 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[49] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q25 = "not at all";
														$scope.userresponse[i].q25 = "1";
													} else if ($scope.userresponse[i].response[49] == "2") {

														//$scope.userresponse[i].q25 = "a little";
														$scope.userresponse[i].q25 = "2";
													}

													else if ($scope.userresponse[i].response[49] == "3") {

														//$scope.userresponse[i].q25 = "moderately";
														$scope.userresponse[i].q25 = "3";
													} else if ($scope.userresponse[i].response[49] == "4") {

														//$scope.userresponse[i].q25 = "quite a bit";
														$scope.userresponse[i].q25 = "4";
													}

													else {

														//$scope.userresponse[i].q25 = "extremely";
														$scope.userresponse[i].q25 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[51] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q26 = "not at all";
														$scope.userresponse[i].q26 = "1";
													} else if ($scope.userresponse[i].response[51] == "2") {

														//$scope.userresponse[i].q26 = "a little";
														$scope.userresponse[i].q26 = "2";
													}

													else if ($scope.userresponse[i].response[51] == "3") {

														//$scope.userresponse[i].q26 = "moderately";
														$scope.userresponse[i].q26 = "3";
													} else if ($scope.userresponse[i].response[51] == "4") {

														//$scope.userresponse[i].q26 = "quite a bit";
														$scope.userresponse[i].q26 = "4";
													}

													else {

														//$scope.userresponse[i].q26 = "extremely";
														$scope.userresponse[i].q26 = "5";
													}
													

												}
												
												
												

												else if ($scope.userresponse[i].section_id == "S3") {

													if ($scope.userresponse[i].response[1] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q1 = "yes";
														$scope.userresponse[i].q1 = "6";
													} else if ($scope.userresponse[i].response[1] == "2") {

														//$scope.userresponse[i].q1 = "yes";
														$scope.userresponse[i].q1 = "5";
													}

													else if ($scope.userresponse[i].response[1] == "3") {

														//$scope.userresponse[i].q1 = "yes";
														$scope.userresponse[i].q1 = "4";
													} else if ($scope.userresponse[i].response[1] == "4") {

														//$scope.userresponse[i].q1 = "no";
														$scope.userresponse[i].q1 = "3";
													} else if ($scope.userresponse[i].response[1] == "5") {

														//$scope.userresponse[i].q1 = "no";
														$scope.userresponse[i].q1 = "2";
													}

													else {

														//$scope.userresponse[i].q1 = "no";
														$scope.userresponse[i].q1 = "1";
													}

													if ($scope.userresponse[i].response[3] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q2 = "yes";
														$scope.userresponse[i].q2 = "6";
													} else if ($scope.userresponse[i].response[3] == "2") {

														//$scope.userresponse[i].q2 = "yes";
														$scope.userresponse[i].q2 = "5";
													}

													else if ($scope.userresponse[i].response[3] == "3") {

														//$scope.userresponse[i].q2 = "yes";
														$scope.userresponse[i].q2 = "4";
													} else if ($scope.userresponse[i].response[3] == "4") {

														//$scope.userresponse[i].q2 = "no";
														$scope.userresponse[i].q2 = "3";
													}

													else if ($scope.userresponse[i].response[3] == "5") {

														//$scope.userresponse[i].q2 = "no";
														$scope.userresponse[i].q2 = "2";
													}

													else {

														//$scope.userresponse[i].q2 = "no";
														$scope.userresponse[i].q2 = "1";
													}

													if ($scope.userresponse[i].response[5] == "1") {

														//$scope.userresponse[i].q3 = "yes";
														$scope.userresponse[i].q3 = "1";
													} else if ($scope.userresponse[i].response[5] == "2") {

														//$scope.userresponse[i].q3 = "yes";
														$scope.userresponse[i].q3 = "2";
													}

													else if ($scope.userresponse[i].response[5] == "3") {

														//$scope.userresponse[i].q3 = "yes";
														$scope.userresponse[i].q3 = "3";
													} else if ($scope.userresponse[i].response[5] == "4") {

														//$scope.userresponse[i].q3 = "no";
														$scope.userresponse[i].q3 = "4";
													}
													else if ($scope.userresponse[i].response[5] == "5") {

														//$scope.userresponse[i].q3= "no";
														$scope.userresponse[i].q3= "5";
													}

													else {

														//$scope.userresponse[i].q3 = "no";
														$scope.userresponse[i].q3 = "6";
													}

													if ($scope.userresponse[i].response[7] == "1") {

														console.log("hellow");
														//$scope.userresponse[i].q4 = "yes";
														$scope.userresponse[i].q4 = "6";
													} else if ($scope.userresponse[i].response[7] == "2") {

														//$scope.userresponse[i].q4 = "yes";
														$scope.userresponse[i].q4 = "5";
													}

													else if ($scope.userresponse[i].response[7] == "3") {

														//$scope.userresponse[i].q4 = "yes";
														$scope.userresponse[i].q4 = "4";
													} else if ($scope.userresponse[i].response[7] == "4") {

														//$scope.userresponse[i].q4 = "no";
														$scope.userresponse[i].q4 = "3";
													}
													else if ($scope.userresponse[i].response[7] == "5") {

														//$scope.userresponse[i].q4 = "no";
														$scope.userresponse[i].q4 = "2";
													}

													else {

														//$scope.userresponse[i].q4 = "no";
														$scope.userresponse[i].q4 = "1";
													}

													if ($scope.userresponse[i].response[9] == "1") {

														console.log("hellow");
														//$scope.userresponse[i].q5 = "yes";
														$scope.userresponse[i].q5 = "6";
													} else if ($scope.userresponse[i].response[9] == "2") {

														//$scope.userresponse[i].q5 = "yes";
														$scope.userresponse[i].q5 = "5";
													}

													else if ($scope.userresponse[i].response[9] == "3") {

														//$scope.userresponse[i].q5 = "yes";
														$scope.userresponse[i].q5 = "4";
													} else if ($scope.userresponse[i].response[9] == "4") {

														//$scope.userresponse[i].q5 = "no";
														$scope.userresponse[i].q5 = "3";
													}
													else if ($scope.userresponse[i].response[9] == "5") {

														//$scope.userresponse[i].q5 = "no";
														$scope.userresponse[i].q5 = "2";
													}

													else {

														//$scope.userresponse[i].q5 = "no";
														$scope.userresponse[i].q5 = "1";
													}
													
													

													if ($scope.userresponse[i].response[11] == "1") {

														
														//$scope.userresponse[i].q6 = "yes";
														$scope.userresponse[i].q6 = "6";
													} else if ($scope.userresponse[i].response[11] == "2") {

														//$scope.userresponse[i].q6 = "yes";
														$scope.userresponse[i].q6 = "5";
													}

													else if ($scope.userresponse[i].response[11] == "3") {

														//$scope.userresponse[i].q6 = "yes";
														$scope.userresponse[i].q6 = "4";
													} else if ($scope.userresponse[i].response[11] == "4") {

														//$scope.userresponse[i].q6 = "no";
														$scope.userresponse[i].q6 = "3";
													}
													else if ($scope.userresponse[i].response[11] == "5") {

														//$scope.userresponse[i].q6 = "no";
														$scope.userresponse[i].q6 = "2";
													}

													else {

														//$scope.userresponse[i].q6 = "no";
														$scope.userresponse[i].q6 = "1";
													}

													
													
													if ($scope.userresponse[i].response[13] == "1") {

														//$scope.userresponse[i].q7 = "yes";
														$scope.userresponse[i].q7 = "6";
													} else if ($scope.userresponse[i].response[13] == "2") {

														//$scope.userresponse[i].q7 = "yes";
														$scope.userresponse[i].q7 = "5";
													}

													else if ($scope.userresponse[i].response[13] == "3") {

														//$scope.userresponse[i].q7 = "yes";
														$scope.userresponse[i].q7 = "4";
													} else if ($scope.userresponse[i].response[13] == "4") {

														//$scope.userresponse[i].q7 = "no";
														$scope.userresponse[i].q7 = "3";
													}
													else if ($scope.userresponse[i].response[13] == "5") {

														//$scope.userresponse[i].q7 = "no";
														$scope.userresponse[i].q7 = "2";
													}

													else {

														//$scope.userresponse[i].q7 = "no";
														$scope.userresponse[i].q7 = "1";
													}
													
													

													if ($scope.userresponse[i].response[15] == "1") {

														//$scope.userresponse[i].q8 = "yes";
														$scope.userresponse[i].q8 = "6";
													} else if ($scope.userresponse[i].response[15] == "2") {

														//$scope.userresponse[i].q8 = "yes";
														$scope.userresponse[i].q8 = "5";
													}

													else if ($scope.userresponse[i].response[15] == "3") {

														//$scope.userresponse[i].q8 = "yes";
														$scope.userresponse[i].q8 = "4";
													} else if ($scope.userresponse[i].response[15] == "4") {

														//$scope.userresponse[i].q8 = "no";
														$scope.userresponse[i].q8 = "3";
													}
													
													else if ($scope.userresponse[i].response[15] == "5") {

														//$scope.userresponse[i].q8 = "no";
														$scope.userresponse[i].q8 = "2";
													}

													else {

														//$scope.userresponse[i].q8 = "no";
														$scope.userresponse[i].q8 = "1";
													}

													if ($scope.userresponse[i].response[17] == "1") {

														//$scope.userresponse[i].q9 = "yes";
														$scope.userresponse[i].q9 = "6";
													} else if ($scope.userresponse[i].response[17] == "2") {

														//$scope.userresponse[i].q9 = "yes";
														$scope.userresponse[i].q9 = "5";
													}

													else if ($scope.userresponse[i].response[17] == "3") {

														//$scope.userresponse[i].q9 = "yes";
														$scope.userresponse[i].q9 = "4";
													} else if ($scope.userresponse[i].response[17] == "4") {

														//$scope.userresponse[i].q9 = "no";
														$scope.userresponse[i].q9 = "3";
													}
													else if ($scope.userresponse[i].response[17] == "5") {

														//$scope.userresponse[i].q9 = "no";
														$scope.userresponse[i].q9 = "2";
													}

													else {

														//$scope.userresponse[i].q9 = "no";
														$scope.userresponse[i].q9 = "1";
													}

												}

												else if ($scope.userresponse[i].section_id == "S4") {

													if ($scope.userresponse[i].response[1] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q1 = "none";
														$scope.userresponse[i].q1 = "1";
													} else if ($scope.userresponse[i].response[1] == "2") {

														//$scope.userresponse[i].q1 = "a little";
														$scope.userresponse[i].q1 = "2";
													}

													else if ($scope.userresponse[i].response[1] == "3") {

														//$scope.userresponse[i].q1 = "sometime";
														$scope.userresponse[i].q1 = "3";
													} else if ($scope.userresponse[i].response[1] == "4") {

														//$scope.userresponse[i].q1 = "most";
														$scope.userresponse[i].q1 = "4";
													}

													else {

														//$scope.userresponse[i].q1 = "alltime";
														$scope.userresponse[i].q1 = "5";
													}

													if ($scope.userresponse[i].response[3] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q2 = "none";
														$scope.userresponse[i].q2 = "1";
													} else if ($scope.userresponse[i].response[3] == "2") {

														//$scope.userresponse[i].q2 = "a little";
														$scope.userresponse[i].q2 = "2";
													}

													else if ($scope.userresponse[i].response[3] == "3") {

														//$scope.userresponse[i].q2 = "sometime";
														$scope.userresponse[i].q2 = "3";
													} else if ($scope.userresponse[i].response[3] == "4") {

														//$scope.userresponse[i].q2 = "most";
														$scope.userresponse[i].q2 = "4";
													}

													else {

														//$scope.userresponse[i].q2 = "alltime";
														$scope.userresponse[i].q2 = "5";
													}

													if ($scope.userresponse[i].response[5] == "1") {

														// console.log("hellow");
														//$scope.userresponse[i].q3 = "none";
														$scope.userresponse[i].q3 = "1";
													} else if ($scope.userresponse[i].response[5] == "2") {

														//$scope.userresponse[i].q3 = "a little";
														$scope.userresponse[i].q3 = "2";
													}

													else if ($scope.userresponse[i].response[5] == "3") {

														//$scope.userresponse[i].q3 = "sometime";
														$scope.userresponse[i].q3 = "3";
													} else if ($scope.userresponse[i].response[5] == "4") {

														//$scope.userresponse[i].q3 = "most";
														$scope.userresponse[i].q3 = "4";
													}

													else {

														//$scope.userresponse[i].q3 = "alltime";
														$scope.userresponse[i].q3 = "5";
													}

													if ($scope.userresponse[i].response[7] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q4 = "none";
														$scope.userresponse[i].q4 = "1";
													} else if ($scope.userresponse[i].response[7] == "2") {

														//$scope.userresponse[i].q4 = "a little";
														$scope.userresponse[i].q4 = "2";
														
													}
													

													else if ($scope.userresponse[i].response[7] == "3") {

														//$scope.userresponse[i].q4 = "sometime";
														$scope.userresponse[i].q4 = "3";
													} else if ($scope.userresponse[i].response[7] == "4") {

														$scope.userresponse[i].q4 = "most";
														$scope.userresponse[i].q4 = "4";
													}

													else {

														$scope.userresponse[i].q4 = "alltime";
														$scope.userresponse[i].q4 = "5";
													}

													if ($scope.userresponse[i].response[9] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q5 = "none";
														$scope.userresponse[i].q5 = "1";
													} else if ($scope.userresponse[i].response[9] == "2") {

														//$scope.userresponse[i].q5 = "a little";
														$scope.userresponse[i].q5 = "2";
													}

													else if ($scope.userresponse[i].response[9] == "3") {

														//$scope.userresponse[i].q5 = "sometime";
														$scope.userresponse[i].q5 = "3";
													} else if ($scope.userresponse[i].response[9] == "4") {

														//$scope.userresponse[i].q5 = "most";
														$scope.userresponse[i].q5 = "4";
														
													}

													else {

														//$scope.userresponse[i].q5 = "alltime";
														$scope.userresponse[i].q5 = "5";
													}
													
													
													

													if ($scope.userresponse[i].response[11] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q6 = "none";
														$scope.userresponse[i].q6 = "1";
													} else if ($scope.userresponse[i].response[11] == "2") {

														//$scope.userresponse[i].q6 = "a little";
														$scope.userresponse[i].q6 = "2";
													}

													else if ($scope.userresponse[i].response[11] == "3") {

														//$scope.userresponse[i].q6 = "sometime";
														$scope.userresponse[i].q6 = "3";
													} else if ($scope.userresponse[i].response[11] == "4") {

														//$scope.userresponse[i].q6 = "most";
														$scope.userresponse[i].q6 = "4";
													}

													else {

														//$scope.userresponse[i].q6 = "alltime";
														$scope.userresponse[i].q6 = "5";
													}
													
													
													
													
													
													if ($scope.userresponse[i].response[13] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q7 = "none";
														$scope.userresponse[i].q7 = "1";
													} else if ($scope.userresponse[i].response[13] == "2") {

														//$scope.userresponse[i].q7 = "a little";
														$scope.userresponse[i].q7 = "2";
													}

													else if ($scope.userresponse[i].response[13] == "3") {

														//$scope.userresponse[i].q7 = "sometime";
														$scope.userresponse[i].q7 = "3";
													} else if ($scope.userresponse[i].response[13] == "4") {

														//$scope.userresponse[i].q7 = "most";
														$scope.userresponse[i].q7 = "4";
													}

													else {

														//$scope.userresponse[i].q7 = "alltime";
														$scope.userresponse[i].q7 = "5";
													}
													
													
													
													
													
													if ($scope.userresponse[i].response[15] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q8 = "none";
														$scope.userresponse[i].q8 = "1";
													} else if ($scope.userresponse[i].response[15] == "2") {

														//$scope.userresponse[i].q8 = "a little";
														$scope.userresponse[i].q8 = "2";
													}

													else if ($scope.userresponse[i].response[15] == "3") {

														//$scope.userresponse[i].q8 = "sometime";
														$scope.userresponse[i].q8 = "3";
													} else if ($scope.userresponse[i].response[15] == "4") {

														//$scope.userresponse[i].q8 = "most";
														$scope.userresponse[i].q8 = "4";
													}

													else {

														//$scope.userresponse[i].q8 = "alltime";
														$scope.userresponse[i].q8 = "5";
													}
													
													
													
													
													
													if ($scope.userresponse[i].response[17] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q9 = "none";
														$scope.userresponse[i].q9 = "1";
													} else if ($scope.userresponse[i].response[17] == "2") {

														//$scope.userresponse[i].q9 = "a little";
														$scope.userresponse[i].q9 = "2";
													}

													else if ($scope.userresponse[i].response[17] == "3") {

														//$scope.userresponse[i].q9 = "sometime";
														$scope.userresponse[i].q9 = "3";
													} else if ($scope.userresponse[i].response[17] == "4") {

														//$scope.userresponse[i].q9 = "most";
														$scope.userresponse[i].q9 = "4";
													}

													else {

														//$scope.userresponse[i].q9 = "alltime";
														$scope.userresponse[i].q9 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[19] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q10 = "none";
														$scope.userresponse[i].q10 = "1";
													} else if ($scope.userresponse[i].response[19] == "2") {

														//$scope.userresponse[i].q10 = "a little";
														$scope.userresponse[i].q10 = "2";
													}

													else if ($scope.userresponse[i].response[19] == "3") {

														//$scope.userresponse[i].q10 = "sometime";
														$scope.userresponse[i].q10 = "3";
													} else if ($scope.userresponse[i].response[19] == "4") {

														//$scope.userresponse[i].q10 = "most";
														$scope.userresponse[i].q10 = "4";
													}

													else {

														//$scope.userresponse[i].q10 = "alltime";
														$scope.userresponse[i].q10 = "5";
													}
													
													
													

												}

												
												
												
												
												
												else {

													if ($scope.userresponse[i].response[1] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q1 = "rarely";
														$scope.userresponse[i].q1 = "1";
													} else if ($scope.userresponse[i].response[1] == "2") {

														//$scope.userresponse[i].q1 = "sometimes";
														$scope.userresponse[i].q1 = "2";
													}

													else if ($scope.userresponse[i].response[1] == "3") {

														//$scope.userresponse[i].q1 = "often";
														$scope.userresponse[i].q1 = "3";
													} else if ($scope.userresponse[i].response[1] == "4") {

														//$scope.userresponse[i].q1 = "very often";
														$scope.userresponse[i].q1 = "4";
													}

													else {

														//$scope.userresponse[i].q1 = "regularly";
														$scope.userresponse[i].q1 = "5";
													}
													
													
													

													if ($scope.userresponse[i].response[3] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q2 = "rarely";
														$scope.userresponse[i].q2 = "1";
													} else if ($scope.userresponse[i].response[3] == "2") {

														//$scope.userresponse[i].q2 = "sometimes";
														$scope.userresponse[i].q2 = "2";
													}

													else if ($scope.userresponse[i].response[3] == "3") {

														//$scope.userresponse[i].q2 = "often";
														$scope.userresponse[i].q2 = "3";
													} else if ($scope.userresponse[i].response[3] == "4") {

														//$scope.userresponse[i].q2 = "very often";
														$scope.userresponse[i].q2 = "4";
													}

													else {

														//$scope.userresponse[i].q2 = "regularly";
														$scope.userresponse[i].q2 = "5";
													}

													if ($scope.userresponse[i].response[5] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q3 = "rarely";
														$scope.userresponse[i].q3 = "1";
													} else if ($scope.userresponse[i].response[5] == "2") {

														//$scope.userresponse[i].q3 = "sometimes";
														$scope.userresponse[i].q3 = "2";
													}

													else if ($scope.userresponse[i].response[5] == "3") {

														//$scope.userresponse[i].q3 = "often";
														$scope.userresponse[i].q3 = "3";
													} else if ($scope.userresponse[i].response[5] == "4") {

														//$scope.userresponse[i].q3 = "very often";
														$scope.userresponse[i].q3 = "4";
													}

													else {

														//$scope.userresponse[i].q3 = "regularly";
														$scope.userresponse[i].q3 = "5";
													}

													if ($scope.userresponse[i].response[7] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q4 = "rarely";
														$scope.userresponse[i].q4 = "1";
													} else if ($scope.userresponse[i].response[7] == "2") {

														//$scope.userresponse[i].q4 = "sometimes";
														$scope.userresponse[i].q4 = "2";
													}

													else if ($scope.userresponse[i].response[7] == "3") {

														//$scope.userresponse[i].q4 = "often";
														$scope.userresponse[i].q4 = "3";
													} else if ($scope.userresponse[i].response[7] == "4") {

														//$scope.userresponse[i].q4 = "very often";
														$scope.userresponse[i].q4 = "4";
													}

													else {

														//$scope.userresponse[i].q4 = "regularly";
														$scope.userresponse[i].q4 = "5";
													}

													if ($scope.userresponse[i].response[9] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q5 = "rarely";
														$scope.userresponse[i].q5 = "1";
													} else if ($scope.userresponse[i].response[9] == "2") {

														//$scope.userresponse[i].q5 = "sometimes";
														$scope.userresponse[i].q5 = "2";
													}

													else if ($scope.userresponse[i].response[9] == "3") {

														//$scope.userresponse[i].q5 = "often";
														$scope.userresponse[i].q5 = "3";
													} else if ($scope.userresponse[i].response[9] == "4") {

														//$scope.userresponse[i].q5 = "very often";
														$scope.userresponse[i].q5 = "4";
													}

													else {

														//$scope.userresponse[i].q5 = "regularly";
														$scope.userresponse[i].q5 = "5";
													}

													if ($scope.userresponse[i].response[11] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q6 = "rarely";
														$scope.userresponse[i].q6 = "1";
													} else if ($scope.userresponse[i].response[11] == "2") {

														//$scope.userresponse[i].q6 = "sometimes";
														$scope.userresponse[i].q6 = "2";
													}

													else if ($scope.userresponse[i].response[11] == "3") {

														//$scope.userresponse[i].q6 = "often";
														$scope.userresponse[i].q6 = "3";
													} else if ($scope.userresponse[i].response[11] == "4") {

														//$scope.userresponse[i].q6 = "very often";
														$scope.userresponse[i].q6 = "4";
													}

													else {

														//$scope.userresponse[i].q6 = "regularly";
														$scope.userresponse[i].q6 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[13] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q7 = "rarely";
														$scope.userresponse[i].q7 = "1";
													} else if ($scope.userresponse[i].response[13] == "2") {

														//$scope.userresponse[i].q7 = "sometimes";
														$scope.userresponse[i].q7 = "2";
													}

													else if ($scope.userresponse[i].response[13] == "3") {

														//$scope.userresponse[i].q7 = "often";
														$scope.userresponse[i].q7 = "3";
													} else if ($scope.userresponse[i].response[13] == "4") {

														//$scope.userresponse[i].q7 = "very often";
														$scope.userresponse[i].q7 = "4";
													}

													else {

														//$scope.userresponse[i].q7 = "regularly";
														$scope.userresponse[i].q7 = "5";
													}
													
													
													if ($scope.userresponse[i].response[15] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q8 = "rarely";
														$scope.userresponse[i].q8 = "1";
													} else if ($scope.userresponse[i].response[15] == "2") {

														//$scope.userresponse[i].q8 = "sometimes";
														$scope.userresponse[i].q8 = "2";
													}

													else if ($scope.userresponse[i].response[15] == "3") {

														//$scope.userresponse[i].q8 = "often";
														$scope.userresponse[i].q8 = "3";
													} else if ($scope.userresponse[i].response[15] == "4") {

														//$scope.userresponse[i].q8 = "very often";
														$scope.userresponse[i].q8 = "4";
													}

													else {

														//$scope.userresponse[i].q8 = "regularly";
														$scope.userresponse[i].q8 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[17] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q9 = "rarely";
														$scope.userresponse[i].q9 = "1";
													} else if ($scope.userresponse[i].response[17] == "2") {

														//$scope.userresponse[i].q9 = "sometimes";
														$scope.userresponse[i].q9 = "2";
													}

													else if ($scope.userresponse[i].response[17] == "3") {

														//$scope.userresponse[i].q9 = "often";
														$scope.userresponse[i].q9 = "3";
													} else if ($scope.userresponse[i].response[17] == "4") {

														//$scope.userresponse[i].q9 = "very often";
														$scope.userresponse[i].q9 = "4";
													}

													else {

														//$scope.userresponse[i].q9 = "regularly";
														$scope.userresponse[i].q9 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[19] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q10 = "rarely";
														$scope.userresponse[i].q10 = "1";
													} else if ($scope.userresponse[i].response[19] == "2") {

														//$scope.userresponse[i].q10 = "sometimes";
														$scope.userresponse[i].q10 = "2";
													}

													else if ($scope.userresponse[i].response[19] == "3") {

														//$scope.userresponse[i].q10 = "often";
														$scope.userresponse[i].q10 = "3";
													} else if ($scope.userresponse[i].response[19] == "4") {

														//$scope.userresponse[i].q10 = "very often";
														$scope.userresponse[i].q10 = "4";
													}

													else {

														//$scope.userresponse[i].q10 = "regularly";
														$scope.userresponse[i].q10 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[21] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q11 = "rarely";
														$scope.userresponse[i].q11 = "1";
													} else if ($scope.userresponse[i].response[21] == "2") {

														//$scope.userresponse[i].q11 = "sometimes";
														$scope.userresponse[i].q11 = "2";
													}

													else if ($scope.userresponse[i].response[21] == "3") {

														//$scope.userresponse[i].q11 = "often";
														$scope.userresponse[i].q11 = "3";
													} else if ($scope.userresponse[i].response[21] == "4") {

														//$scope.userresponse[i].q11 = "very often";
														$scope.userresponse[i].q11 = "4";
													}

													else {

														//$scope.userresponse[i].q11 = "regularly";
														$scope.userresponse[i].q11 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[23] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q12 = "rarely";
														$scope.userresponse[i].q12 = "1";
													} else if ($scope.userresponse[i].response[23] == "2") {

														//$scope.userresponse[i].q12 = "sometimes";
														$scope.userresponse[i].q12 = "2";
													}

													else if ($scope.userresponse[i].response[23] == "3") {

														//$scope.userresponse[i].q12 = "often";
														$scope.userresponse[i].q12 = "3";
													} else if ($scope.userresponse[i].response[23] == "4") {

														//$scope.userresponse[i].q12 = "very often";
														$scope.userresponse[i].q12 = "4";
													}

													else {

														//$scope.userresponse[i].q12 = "regularly";
														$scope.userresponse[i].q12 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[25] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q13 = "rarely";
														$scope.userresponse[i].q13 = "1";
													} else if ($scope.userresponse[i].response[25] == "2") {

														//$scope.userresponse[i].q13 = "sometimes";
														$scope.userresponse[i].q13 = "2";
													}

													else if ($scope.userresponse[i].response[25] == "3") {

														//$scope.userresponse[i].q13 = "often";
														$scope.userresponse[i].q13 = "3";
													} else if ($scope.userresponse[i].response[25] == "4") {

														//$scope.userresponse[i].q13 = "very often";
														$scope.userresponse[i].q13 = "4";
													}

													else {

														//$scope.userresponse[i].q13 = "regularly";
														$scope.userresponse[i].q13 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[27] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q14 = "rarely";
														$scope.userresponse[i].q14 = "1";
													} else if ($scope.userresponse[i].response[27] == "2") {

														//$scope.userresponse[i].q14 = "sometimes";
														$scope.userresponse[i].q14 = "2";
													}

													else if ($scope.userresponse[i].response[27] == "3") {

														//$scope.userresponse[i].q14 = "often";
														$scope.userresponse[i].q14 = "3";
													} else if ($scope.userresponse[i].response[27] == "4") {

														//$scope.userresponse[i].q14 = "very often";
														$scope.userresponse[i].q14 = "4";
													}

													else {

														//$scope.userresponse[i].q14 = "regularly";
														$scope.userresponse[i].q14 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[29] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q15 = "rarely";
														$scope.userresponse[i].q15 = "1";
													} else if ($scope.userresponse[i].response[29] == "2") {

														//$scope.userresponse[i].q15 = "sometimes";
														$scope.userresponse[i].q15 = "2";
													}

													else if ($scope.userresponse[i].response[29] == "3") {

														//$scope.userresponse[i].q15 = "often";
														$scope.userresponse[i].q15 = "3";
													} else if ($scope.userresponse[i].response[29] == "4") {

														//$scope.userresponse[i].q15 = "very often";
														$scope.userresponse[i].q15 = "4";
													}

													else {

														//$scope.userresponse[i].q15 = "regularly";
														$scope.userresponse[i].q15 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[31] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q16 = "rarely";
														$scope.userresponse[i].q16 = "1";
													} else if ($scope.userresponse[i].response[31] == "2") {

														//$scope.userresponse[i].q16 = "sometimes";
														$scope.userresponse[i].q16 = "2";
													}

													else if ($scope.userresponse[i].response[31] == "3") {

														//$scope.userresponse[i].q16 = "often";
														$scope.userresponse[i].q16 = "3";
													} else if ($scope.userresponse[i].response[31] == "4") {

														//$scope.userresponse[i].q16 = "very often";
														$scope.userresponse[i].q16 = "4";
													}

													else {

														//$scope.userresponse[i].q16 = "regularly";
														$scope.userresponse[i].q16 = "5";
													}
													
													
													
													

													if ($scope.userresponse[i].response[33] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q17 = "rarely";
														$scope.userresponse[i].q17 = "1";
													} else if ($scope.userresponse[i].response[33] == "2") {

														//$scope.userresponse[i].q17 = "sometimes";
														$scope.userresponse[i].q17 = "2";
													}

													else if ($scope.userresponse[i].response[33] == "3") {

														//$scope.userresponse[i].q17 = "often";
														$scope.userresponse[i].q17 = "3";
													} else if ($scope.userresponse[i].response[33] == "4") {

														//$scope.userresponse[i].q17 = "very often";
														$scope.userresponse[i].q17 = "4";
													}

													else {

														//$scope.userresponse[i].q17 = "regularly";
														$scope.userresponse[i].q17 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[35] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q18 = "rarely";
														$scope.userresponse[i].q18 = "1";
													} else if ($scope.userresponse[i].response[35] == "2") {

														//$scope.userresponse[i].q18 = "sometimes";
														$scope.userresponse[i].q18 = "2";
													}

													else if ($scope.userresponse[i].response[35] == "3") {

														//$scope.userresponse[i].q18 = "often";
														$scope.userresponse[i].q18 = "3";
													} else if ($scope.userresponse[i].response[35] == "4") {

														//$scope.userresponse[i].q18 = "very often";
														$scope.userresponse[i].q18 = "4";
													}

													else {

														//$scope.userresponse[i].q18 = "regularly";
														$scope.userresponse[i].q18 = "5";
													}
													
													
													
													
													if ($scope.userresponse[i].response[37] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q19 = "rarely";
														$scope.userresponse[i].q19 = "1";
													} else if ($scope.userresponse[i].response[37] == "2") {

														//$scope.userresponse[i].q19 = "sometimes";
														$scope.userresponse[i].q19 = "2";
													}

													else if ($scope.userresponse[i].response[37] == "3") {

														//$scope.userresponse[i].q19 = "often";
														$scope.userresponse[i].q19 = "3";
													} else if ($scope.userresponse[i].response[37] == "4") {

														//$scope.userresponse[i].q19 = "very often";
														$scope.userresponse[i].q19 = "4";
													}

													else {

														//$scope.userresponse[i].q19 = "regularly";
														$scope.userresponse[i].q19 = "5";
													}
													
													
													
													if ($scope.userresponse[i].response[39] == "1") {

														//console.log("hellow");
														//$scope.userresponse[i].q20 = "rarely";
														$scope.userresponse[i].q20 = "1";
													} else if ($scope.userresponse[i].response[39] == "2") {

														//$scope.userresponse[i].q20 = "sometimes";
														$scope.userresponse[i].q20 = "2";
													}

													else if ($scope.userresponse[i].response[39] == "3") {

														//$scope.userresponse[i].q20 = "often";
														$scope.userresponse[i].q20 = "3";
													} else if ($scope.userresponse[i].response[39] == "4") {

														//$scope.userresponse[i].q20 = "very often";
														$scope.userresponse[i].q20 = "4";
													}

													else {

														//$scope.userresponse[i].q20 = "regularly";
														$scope.userresponse[i].q20 = "5";
													}												

												}
												
											}
											
											
											

										}).error(function(res) {

								})
					}

					$scope.userresponse();
					
					//for checking
					console.log($scope.userresponse);
					
					$scope.exportDat32 = function() {

						$scope.userresponses = [];

						for ( var i in $scope.userresponse) {

							$scope.userresponses
									.push({

										User_id : $scope.userresponse[i].user_id,
										Name : $scope.userresponse[i].name,
										Section_id : $scope.userresponse[i].section_id,
										Section_attempt : $scope.userresponse[i].section_count,
										Timestamp : $scope.userresponse[i].time,
										Q1 : $scope.userresponse[i].q1,
										Q2 : $scope.userresponse[i].q2,
										Q3 : $scope.userresponse[i].q3,
										Q4 : $scope.userresponse[i].q4,
										Q5 : $scope.userresponse[i].q5,
										Q6 : $scope.userresponse[i].q6,
										Q7 : $scope.userresponse[i].q7,
										Q8 : $scope.userresponse[i].q8,
										Q9 : $scope.userresponse[i].q9,
										Q10 : $scope.userresponse[i].q10,
										Q11 : $scope.userresponse[i].q11,
										Q12 : $scope.userresponse[i].q12,
										Q13 : $scope.userresponse[i].q13,
										Q14 : $scope.userresponse[i].q14,
										Q15 : $scope.userresponse[i].q15,
										Q16 : $scope.userresponse[i].q16,
										Q17 : $scope.userresponse[i].q17,
										Q18 : $scope.userresponse[i].q18,
										Q19 : $scope.userresponse[i].q19,
										Q20 : $scope.userresponse[i].q20,
										Q21 : $scope.userresponse[i].q21,
										Q22 : $scope.userresponse[i].q22,
										Q23 : $scope.userresponse[i].q23,
										Q24 : $scope.userresponse[i].q24,
										Q25 : $scope.userresponse[i].q25,
										Q26 : $scope.userresponse[i].q26
										/*TotalScore: $scope.userresponse[i].total*/
										

									})

						}

						alasql(
								'SELECT * INTO XLSX("userresponse.xlsx",{headers:true}) FROM ?',
								[ $scope.userresponses ]);

					}
					
					// totalscore code

					/*$scope.userresponse = function() {

						$http(
								{

									url : globalServerName.getUrlName()
											+ "admin/userresponse",
									method : "GET",
									headers : {
										'Content-Type' : 'application/json'
									}

								})
								.success(
										function(res) {
											
											console.log(res);
											

											var array = JSON.parse("["
													+ res[0].response + "]");
											
											
											$scope.userresponse = res;

											for ( var i in $scope.userresponse) {
												
												//to display total score in the userresponses page
												//var totalsum2=JSON.parse($scope.userresponse[i].totalsum);
												//alert(totalsum2);
												//$scope.userresponse[i].total=$scope.userresponse[i].totalsum;
												
												//var array = JSON.parse("[" + $scope.userresponse[i].totalsum + "]");
												var array1 = $scope.userresponse[i].totalsum;		
												//alert(array1);
												var obj = JSON.parse(array1);
												//alert(obj);
												
												
												if ($scope.userresponse[i].section_id == "S1") {
													
														
														$scope.userresponse[i].s1a = obj[0];
														$scope.userresponse[i].s1b = obj[1];
														$scope.userresponse[i].s1c = obj[2];
														$scope.userresponse[i].s1d = obj[3];
														$scope.userresponse[i].s1 = obj[4];
												
													}
												else if($scope.userresponse[i].section_id == "S2") {
													$scope.userresponse[i].s2a = obj[1];
													$scope.userresponse[i].s2b = obj[0];
													if(obj[4]==null) {
														$scope.userresponse[i].s2c = "null";
													}
													else {
														$scope.userresponse[i].s2c = obj[4];
													}
													
													
													
												}
												
												else if($scope.userresponse[i].section_id == "S3") {
													$scope.userresponse[i].s3 = obj[0];
													
													
												}
												else if($scope.userresponse[i].section_id == "S4") {
													$scope.userresponse[i].s4 = obj[0];
													
													
												}
												else {
													
													$scope.userresponse[i].s5a = obj[0];
													$scope.userresponse[i].s5b = obj[1];
													
												}
												
											}
											
											
											

										}).error(function(res) {

								})
					}

					$scope.userresponse();
					
					//for checking
					console.log($scope.userresponse);
					
					$scope.exportDat32 = function() {

						$scope.userresponses = [];

						for ( var i in $scope.userresponse) {

							$scope.userresponses
									.push({

										User_id : $scope.userresponse[i].user_id,
										Name : $scope.userresponse[i].name,
										Section_id : $scope.userresponse[i].section_id,
										Section_attempt : $scope.userresponse[i].section_count,
										S1 : $scope.userresponse[i].s1,
										S1A : $scope.userresponse[i].s1a,
										S1B : $scope.userresponse[i].s1b,
										S1C : $scope.userresponse[i].s1c,
										S1D : $scope.userresponse[i].s1d,
										S2A : $scope.userresponse[i].s2a,
										S2B : $scope.userresponse[i].s2b,
										S2C : $scope.userresponse[i].s2c,
										S3 : $scope.userresponse[i].s3,
										S4 : $scope.userresponse[i].s4,
										S5A : $scope.userresponse[i].s5a,
										S5B : $scope.userresponse[i].s5b
										
										

									})

						}

						alasql(
								'SELECT * INTO XLSX("userresponse.xlsx",{headers:true}) FROM ?',
								[ $scope.userresponses ]);

					}
					*/
					
					
					//total score code new rest
					
					$scope.userscore = function() {

						$http(
								{

									url : globalServerName.getUrlName()
											+ "admin/userscore",
									method : "GET",
									headers : {
										'Content-Type' : 'application/json'
									}

								})
								.success(
										function(res) {
											
											console.log(res);
											

											/*var array = JSON.parse("["
													+ res[0].response + "]");*/
											
											
											$scope.userscore = res;

											for ( var i in $scope.userscore) {
												
												//to display total score in the userresponses page
												//var totalsum2=JSON.parse($scope.userresponse[i].totalsum);
												//alert(totalsum2);
												//$scope.userresponse[i].total=$scope.userresponse[i].totalsum;
												
												//var array = JSON.parse("[" + $scope.userresponse[i].totalsum + "]");
												var array1 = $scope.userscore[i].totalsum;		
												//alert(array1);
												var obj = JSON.parse(array1);
												//alert(obj);
												
												
												if ($scope.userscore[i].section_id == "S1") {
													
														
														$scope.userscore[i].s1a = obj[0];
														$scope.userscore[i].s1b = obj[1];
														$scope.userscore[i].s1c = obj[2];
														$scope.userscore[i].s1d = obj[3];
														$scope.userscore[i].s1 = obj[4];
												
													}
												else if($scope.userscore[i].section_id == "S2") {
													$scope.userscore[i].s2a = obj[1];
													$scope.userscore[i].s2b = obj[0];
													if(obj[4]==null) {
														$scope.userscore[i].s2c = "null";
													}
													else {
														$scope.userscore[i].s2c = obj[4];
													}
													
													
													
												}
												
												else if($scope.userscore[i].section_id == "S3") {
													$scope.userscore[i].s3 = obj[0];
													
													
												}
												else if($scope.userscore[i].section_id == "S4") {
													$scope.userscore[i].s4 = obj[0];
													
													
												}
												else {
													
													$scope.userscore[i].s5a = obj[0];
													$scope.userscore[i].s5b = obj[1];
													
												}
												
											}
											
											
											

										}).error(function(res) {

								})
					}

					$scope.userscore();
					
					//for checking
					console.log($scope.userscore);
					
					$scope.exportData4 = function() {

						$scope.userscores = [];

						for ( var i in $scope.userscore) {

							$scope.userscores
									.push({

										User_id : $scope.userscore[i].user_id,
										Name : $scope.userscore[i].name,
										Section_id : $scope.userscore[i].section_id,
										Section_attempt : $scope.userscore[i].section_count,
										S1 : $scope.userscore[i].s1,
										S1A : $scope.userscore[i].s1a,
										S1B : $scope.userscore[i].s1b,
										S1C : $scope.userscore[i].s1c,
										S1D : $scope.userscore[i].s1d,
										S2A : $scope.userscore[i].s2a,
										S2B : $scope.userscore[i].s2b,
										S2C : $scope.userscore[i].s2c,
										S3 : $scope.userscore[i].s3,
										S4 : $scope.userscore[i].s4,
										S5A : $scope.userscore[i].s5a,
										S5B : $scope.userscore[i].s5b
										
										

									})

						}

						alasql(
								'SELECT * INTO XLSX("userscore.xlsx",{headers:true}) FROM ?',
								[ $scope.userscores ]);

					}
					
					
					

				})