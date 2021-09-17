var app = angular.module("wellness", [ 'ngCookies', 'toaster' ]);

app
		.controller(
				"admincontroller",
				function($scope, globalServerName, $http, toaster,$filter,$cookies,$window) {

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

												//console.log($scope.userdemo[i].education);

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
												
												
												/* personal
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
												}*/

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
										Consult : $scope.userdemo[i].consult
										//Personal : $scope.userdemo[i].personal

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
												
												
										      //begin user summary page display
												
											    $scope.summary = function(user_id){
											    	
												$scope.user_id = user_id;	
												//$scope.token = localStorage.getItem("token");
											    //alert($scope.userresponse[index].user_id);
												$scope.summary1 = function(){
												$scope.array = [];
												$scope.overallscore1 = "";
												$scope.overallscore2 = "";
												$scope.self = "";
												$scope.sense = "";
												$scope.positive = "";
												$scope.growth = "";
												$scope.overallmeter = "";
												$scope.selfmeter = "";
												$scope.sensemeter = "";
												$scope.positivemeter = "";
												$scope.growthmeter = "";
												$scope.psychologiccal = "";
												$scope.overallfeedback = [];
												$scope.ofeedback = "";
												$scope.sfeedback = "";
												$scope.pfeedback = "";
												$scope.timedate1 = "";
												$scope.timedate2 = "";
												$scope.arraylength = "";
												
												$http({
													 
													 url : globalServerName.getUrlName() + "Section/sectionresponce1/S1/"+user_id,
														method : "GET",
														headers : {
															'Content-Type' : 'application/json',
															//'Authorization' : $scope.token
														}
													 
												 })
												 .success(function(res){
													 console.log(res[0].percentile);
													 $scope.arraylength = res.length;
													 if(res.length == 1){

														 $scope.overallsum = JSON.parse("[" + res[0].totalsum + "]");
													     $scope.timedate1 =  res[0].time;
													     $scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");			 
													     $scope.overallscore1 = $scope.overallsum[0][4];	
														 $scope.selfscore1 =  $scope.overallsum[0][0];
														 $scope.sensescore1 = $scope.overallsum[0][1];
														 $scope.pscore1 =  $scope.overallsum[0][2];
														 $scope.growthscore1 =  $scope.overallsum[0][3];
														 $scope.overallbar = [{
												            	color: 'rgb(43, 144, 143)',
												                name: 'Possible Range',
												                y: 120,
												                drilldown: 'Possible Range'
												            }, {
												            	color:'rgb(247, 163, 92)',
												                name: 'Average',
												                y: 87.82,
												                drilldown: 'Average'
												            }, 
												            {
												            	color:'rgb(144, 237, 125)',
												            	name: 'My score\n('+$scope.date1+')',
												                y: $scope.overallscore1,
												                drilldown: 'My score'
												            }];
														 
														 $scope.selfbar =  [{
												                name: 'Possible Range',
												                color: 'rgb(43, 144, 143)',
												                y: 24,
												                drilldown: 'Possible Range'
												            }, {
												                name: 'Average',
												                color:'rgb(247, 163, 92)',
												                y: 18.39,
												                drilldown: 'Average'
												            }, 
												            {
												                name: 'My score\n('+$scope.date1+')',
												                color:'rgb(144, 237, 125)',
												                y: $scope.selfscore1,
												                drilldown: 'My score'
												            }];
														 
														 $scope.pbar = [{
												                name: 'Possible Range',
												                color: 'rgb(43, 144, 143)',
												                y: 30,
												                drilldown: 'Possible Range'
												            }, {
												                name: 'Average',
												                color:'rgb(247, 163, 92)',
												                y: 21.15,
												                drilldown: 'Average'
												            }, 
												            {
												                name: 'My score\n('+$scope.date1+')',
												                color:'rgb(144, 237, 125)',
												                y: $scope.pscore1,
												                drilldown: 'My score'
												            }];
														 
														 $scope.sensebar = [{
												                name: 'Possible Range',
												                color: 'rgb(43, 144, 143)',
												                y: 36,
												                drilldown: 'Possible Range'
												            }, {
												                name: 'Average',
												                color:'rgb(247, 163, 92)',
												                y: 24.41,
												                drilldown: 'Average'
												            },
												            {
												                name: 'My score\n('+$scope.date1+')',
												                color:'rgb(144, 237, 125)',
												                y: $scope.sensescore1,
												                drilldown: 'My score'
												            }];
														 
														 $scope.growthbar = [{
												                name: 'Possible Range',
												                color: 'rgb(43, 144, 143)',
												                y: 30,
												                drilldown: 'Possible Range'
												            }, {
												                name: 'Average',
												                color:'rgb(247, 163, 92)',
												                y: 23.87,
												                drilldown: 'Average'
												            }, 
												            {
												                name: 'My score\n('+$scope.date1+')',
												                color:'rgb(144, 237, 125)',
												                y: $scope.growthscore1,
												                drilldown: 'My score'
												            }];
													 }
													 else{
														 
														 console.log(res.length);
														 $scope.overallsum1 = JSON.parse("[" + res[0].totalsum + "]");
														 $scope.overallsum2 = JSON.parse("[" + res[1].totalsum + "]");
														 $scope.timedate1 =  res[0].time;
														 $scope.timedate2 =  res[1].time;
														 $scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");
														 $scope.date2 = $filter('date')(new Date($scope.timedate2),"dd-MM-yyyy");		 
														 $scope.overallscore1 = $scope.overallsum1[0][4];
														 $scope.overallscore2 = $scope.overallsum2[0][4];
														 $scope.selfscore1 =  $scope.overallsum1[0][0];
														 $scope.selfscore2 =  $scope.overallsum2[0][0];
														 $scope.sensescore1 =  $scope.overallsum1[0][1];
														 $scope.sensescore2 =  $scope.overallsum2[0][1];
														 $scope.pscore1 =  $scope.overallsum1[0][2];
														 $scope.pscore2 =  $scope.overallsum2[0][2];
														 $scope.growthscore1 =  $scope.overallsum1[0][3];
														 $scope.growthscore2 =  $scope.overallsum2[0][3];					
																$scope.overallbar = [{
													            	color: 'rgb(43, 144, 143)',
													                name: 'Possible Range',
													                y: 120,
													                drilldown: 'Possible Range'
													            }, {
													            	color:'rgb(247, 163, 92)',
													                name: 'Average',
													                y: 87.82,
													                drilldown: 'Average'
													            },{
																	color:'rgb(144, 237, 125)',
																	name: 'My score ('+$scope.date2+')',
														            y: $scope.overallscore2,
														            drilldown: 'My score'
														        }, 
													            {
													            	color:'rgb(144, 237, 125)',
													            	name: 'My score\n('+$scope.date1+')',
													                y: $scope.overallscore1,
													                drilldown: 'My score'
													            }];
																
																$scope.selfbar =  [{
													                name: 'Possible Range',
													                color: 'rgb(43, 144, 143)',
													                y: 24,
													                drilldown: 'Possible Range'
													            }, {
													                name: 'Average',
													                color:'rgb(247, 163, 92)',
													                y: 18.39,
													                drilldown: 'Average'
													            }, {
																	color:'rgb(144, 237, 125)',
																	name: 'My score ('+$scope.date2+')',
														            y: $scope.selfscore2,
														            drilldown: 'My score'
														        },
													            {
													                name: 'My score\n('+$scope.date1+')',
													                color:'rgb(144, 237, 125)',
													                y: $scope.selfscore1,
													                drilldown: 'My score'
													            }];
																 $scope.pbar = [{
														                name: 'Possible Range',
														                color: 'rgb(43, 144, 143)',
														                y: 30,
														                drilldown: 'Possible Range'
														            }, {
														                name: 'Average',
														                color:'rgb(247, 163, 92)',
														                y: 21.15,
														                drilldown: 'Average'
														            },{	
																		color:'rgb(144, 237, 125)',
																		name: 'My score ('+$scope.date2+')',
															            y: $scope.pscore2,
															            drilldown: 'My score'
																   } ,
														            {
														                name: 'My score\n('+$scope.date1+')',
														                color:'rgb(144, 237, 125)',
														                y: $scope.pscore1,
														                drilldown: 'My score'
														            }];
																 $scope.sensebar = [{
														                name: 'Possible Range',
														                color: 'rgb(43, 144, 143)',
														                y: 36,
														                drilldown: 'Possible Range'
														            }, {
														                name: 'Average',
														                color:'rgb(247, 163, 92)',
														                y: 24.41,
														                drilldown: 'Average'
														            },{	
																		color:'rgb(144, 237, 125)',
																		name: 'My score ('+$scope.date2+')',
															            y: $scope.sensescore2,
															            drilldown: 'My score'
																    },
														            {
														                name: 'My score\n('+$scope.date1+')',
														                color:'rgb(144, 237, 125)',
														                y: $scope.sensescore1,
														                drilldown: 'My score'
														            }];
																
																 $scope.growthbar = [{
														                name: 'Possible Range',
														                color: 'rgb(43, 144, 143)',
														                y: 30,
														                drilldown: 'Possible Range'
														            }, {
														                name: 'Average',
														                color:'rgb(247, 163, 92)',
														                y: 23.87,
														                drilldown: 'Average'
														            },{	
																		color:'rgb(144, 237, 125)',
																		name: 'My score ('+$scope.date2+')',
															            y: $scope.growthscore2,
															            drilldown: 'My score'
																    }, 
														            {
														                name: 'My score\n('+$scope.date1+')',
														                color:'rgb(144, 237, 125)',
														                y: $scope.growthscore1,
														                drilldown: 'My score'
														            }];
														 
													 }
													 
													 $(function () { 
													        var myChart = Highcharts.chart('container', {
													        chart: {
													        	backgroundColor: "#3C3C3C",
													            type: 'column'
													        },
													        title: {
													            text: 'Overall psychological well being',
													            style: {
													                color: 'white',
													             }
													        },
													        xAxis: {
													            type: 'category'
													        },
													        yAxis: {
													        	min: 20,
													            max: 120,
													            endOnTick:false,
													            tickInterval:20,
													            title: {
													            	style: {
													                    color: 'white'
													                },
													                text: ' '
													            },
													            labels: {
													                style: {
													                    color: 'white'
													                }
													            },
													        

													        },
													        legend: {
													            enabled: false
													        },
													        plotOptions: {
													            series: {
													                borderWidth: 0,
													                dataLabels: {
													                    enabled: true,
													                    format: '{point.y:.1f}'
													                }
													            }
													        },

													        tooltip: {
													            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													            pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
													        },
													        series: [{
													            name: 'Overall psychological well being',
													            colorByPoint: true,
													            data: $scope.overallbar
													        }]
													    });
													    });
													 
													 
													 
													    
													    $(function () { 
													        var myChart = Highcharts.chart('container2', {
													        chart: {
													        	backgroundColor: "#3C3C3C",
													            type: 'column'
													        },
													        title: {
													            text: '<h5>Self - acceptance</h5>',
													            	 style: {
															                color: 'white',
															             }
													        },
													        labels: {
												                style: {
												                    color: 'white'
												                }
												            },
													        xAxis: {
													            type: 'category'
													        },
													        yAxis: {
													        	min: 0,
													            max: 24,
													            endOnTick:false,
													            tickInterval:4,
													            title: {
													            	style: {
													                    color: 'white'
													                },
													                text: ' '
													            },
													            labels: {
													                style: {
													                    color: 'white'
													                }
													            },

													        },
													        legend: {
													            enabled: false
													        },
													        plotOptions: {
													            series: {
													                borderWidth: 0,
													                dataLabels: {
													                    enabled: true,
													                    format: '{point.y:.1f}'
													                }
													            }
													        },

													        tooltip: {
													            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													            pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
													        },

													        series: [{
													            name: 'Self - acceptance',
													            colorByPoint: true,
													            data:$scope.selfbar 
													        }]
													    });
													    });
													    
													    $(function () { 
													        var myChart = Highcharts.chart('container3', {
													        chart: {
													        	backgroundColor: "#3C3C3C",
													            type: 'column'
													        },
													        title: {
													            text: 'Sense of mastery and competence',
													            style: {
													                color: 'white',
													             }
													        },
													        labels: {
												                style: {
												                    color: 'white'
												                }
												            },
													        xAxis: {
													            type: 'category'
													        },
													        yAxis: {
													        	min: 0,
													            max: 36,
													            endOnTick:false,
													            tickInterval:6,
													            title: {
													            	style: {
													                    color: 'white'
													                },
													                text: ' '
													            },
													            labels: {
													                style: {
													                    color: 'white'
													                }
													            },

													        },
													        legend: {
													            enabled: false
													        },
													        plotOptions: {
													            series: {
													                borderWidth: 0,
													                dataLabels: {
													                    enabled: true,
													                    format: '{point.y:.1f}'
													                }
													            }
													        },

													        tooltip: {
													            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													            pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
													        },

													        series: [{
													            name: 'Sense of mastery and competence',
													            colorByPoint: true,
													            data:$scope.sensebar 
													        }]
													    });
													    });
													    
													    $(function () { 
													        var myChart = Highcharts.chart('container4', {
													        chart: {
													        	backgroundColor: "#3C3C3C",
													            type: 'column'
													        },
													        title: {
													            text: 'Positive relations',
													            style: {
													                color: 'white',
													             }
													        },
													        labels: {
												                style: {
												                    color: 'white'
												                }
												            },
													        xAxis: {
													            type: 'category'
													        },
													        yAxis: {
													        	min: 0,
													            max: 30,
													            endOnTick:false,
													            tickInterval:5,
													            title: {
													            	style: {
													                    color: 'white'
													                },
													                text: ' '
													            },
													            labels: {
													                style: {
													                    color: 'white'
													                }
													            },

													        },
													        legend: {
													            enabled: false
													        },
													        plotOptions: {
													            series: {
													                borderWidth: 0,
													                dataLabels: {
													                    enabled: true,
													                    format: '{point.y:.1f}'
													                }
													            }
													        },

													        tooltip: {
													            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													            pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
													        },

													        series: [{
													            name: 'Positive relations',
													            colorByPoint: true,
													            data: $scope.pbar
													        }]
													    });
													    });
													    
													    $(function () { 
													        var myChart = Highcharts.chart('container5', {
													        chart: {
													        	backgroundColor: "#3C3C3C",
													            type: 'column'
													        },
													        title: {
													            text: 'Sense of engagement and growth',
													            style: {
													                color: 'white',
													             }
													        },
													        labels: {
												                style: {
												                    color: 'white'
												                }
												            },
													        xAxis: {
													            type: 'category'
													        },
													        yAxis: {
													        	min: 0,
													            max: 30,
													            endOnTick:false,
													            tickInterval:5,
													            title: {
													            	style: {
													                    color: 'white'
													                },
													                text: ' '
													            },
													            labels: {
													                style: {
													                    color: 'white'
													                }
													            },

													        },
													        legend: {
													            enabled: false
													        },
													        plotOptions: {
													            series: {
													                borderWidth: 0,
													                dataLabels: {
													                    enabled: true,
													                    format: '{point.y:.1f}'
													                }
													            }
													        },

													        tooltip: {
													            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													            pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
													        },

													        series: [{
													            name: 'Sense of engagement and growth',
													            colorByPoint: true,
													            data:$scope.growthbar 
													        }]
													    });
													    });

												 })
												 .error(function(res){
													 
													 console.log(res);
												 })

												
												$http({

													url : globalServerName.getUrlName() + "Section/sectionScore1/"+user_id+"/S1",
													method : "GET",
													headers : {
														'Content-Type' : 'application/json',
														//'Authorization' : $scope.token
													}

												}).success(function(res) {
													console.log(res);	
													$scope.self = parseInt(res[0][0]);
													$scope.sense = parseInt(res[0][1]);
													$scope.positive = parseInt(res[0][2]);
													$scope.growth = parseInt(res[0][3]);
													
													
													console.log(String(res[1][4]));
													
													//self
											        if(res[1][0].trim() == "High"){
														
														$scope.shigh = true;
														
													}else if(res[1][0].trim() == "Average"){
														
														$scope.saverage = true;
														
													}else if(res[1][0].trim() == "Low"){
														
														$scope.slow = true;
													}
											        
											        //sense
											        if(res[1][1].trim() == "High"){
														
														$scope.ehigh = true;
														
													}else if(res[1][1].trim() == "Average"){
														
														$scope.eaverage = true;
														
													}else if(res[1][1].trim() == "Low"){
														
														$scope.elow = true;
													}

											        
											        //positive
											       if(res[1][2].trim() == "High"){
														
														$scope.phigh = true;
														
													}else if(res[1][2].trim() == "Average"){
														
														$scope.paverage = true
														
													}else if(res[1][2].trim() == "Low"){
														
														$scope.plow = true;
													}
											        
											       //growth
											       if(res[1][3].trim() == "High"){
														
														$scope.ghigh = true;
													
													}else if(res[1][3].trim() == "Average"){
														
														$scope.gaverage = true;
														
													}else if(res[1][3].trim() == "Low"){
														
														$scope.glow  = true;
													}
													
												    //overall
													if(res[1][4].trim() == "High"){
														
														$scope.ohigh = true
														
													}else if(res[1][4].trim() == "Average"){
														
														$scope.oaverage = true;
														
													}else if(res[1][4].trim() == "Low"){
														
														$scope.olow = true;
													}
													
													

													
													
													$scope.selfp = res[2][0];
													$scope.sensep = res[2][1];
													$scope.positivep = res[2][2];
													$scope.growthp = res[2][3];
													$scope.psychologiccal = res[2][4];		
													$scope.selfmeter = parseInt(res[3][0]);
													$scope.sensemeter = parseInt(res[3][1]);
													$scope.positivemeter = parseInt(res[3][2]);
													$scope.growthmeter = parseInt(res[3][3]);
													$scope.overallmeter = parseInt(res[3][4]);
													
													
													
													angular.element(document).ready(function ($) {
													


											            var anchorGradient = {
											                type: 'radialGradient',
											                x0: 0.35,
											                y0: 0.35,
											                r0: 0.0,
											                x1: 0.35,
											                y1: 0.35,
											                r1: 1,
											                colorStops: [{ offset: 0, color: 'blue' },
											                { offset: 1, color: '#252E32'}]
											            };

											      
											            $('#overall').jqRadialGauge({
											                background: '#F7F7F7',
											                border: {
											                    lineWidth: 10,
											                    strokeStyle: 'green',
											                    padding: 16
											                },
											                shadows: {
											                    enabled: true
											                },
											                anchor: {
											                    visible: true,
											                    fillStyle: anchorGradient,
											                    radius: 0.10
											                },
											                tooltips: {
											                    disabled: false,
											                    highlighting: true
											                },
											                animation: {
											                    duration: 1
											                },
											                scales: [
											                {
											                   minimum: 0,
											                   maximum: 100,
											                   startAngle: 180,
											                   endAngle: 360,
											                   majorTickMarks: {
											                       length: 12,
											                       lineWidth: 2,
											                       interval: 10,
											                       offset: 0.84
											                   },
											                   minorTickMarks: {
											                       visible: true,
											                       length: 8,
											                       lineWidth: 2,
											                       interval: 2,
											                       offset: 0.84
											                   },
											                   labels: {
											                       orientation: 'horizontal',
											                       interval: 10,
											                       offset: 1.00
											                   },
											                   needles: [
											                   {
											                    value: $scope.overallmeter,
											                    type: 'pointer',
											                    outerOffset: 0.8,
											                    mediumOffet: 0.7,
											                    width: 10,
											                    fillStyle: '#252E32'
											                }
											                ]
											            }
											            ]
											        });
											            
											            $('#self').jqRadialGauge({
											                background: '#F7F7F7',
											                border: {
											                    lineWidth: 10,
											                    strokeStyle: 'green',
											                    padding: 16
											                },
											                shadows: {
											                    enabled: true
											                },
											                anchor: {
											                    visible: true,
											                    fillStyle: anchorGradient,
											                    radius: 0.10
											                },
											                tooltips: {
											                    disabled: false,
											                    highlighting: true
											                },
											                animation: {
											                    duration: 1
											                },
											                scales: [
											                {
											                   minimum: 0,
											                   maximum: 100,
											                   startAngle: 180,
											                   endAngle: 360,
											                   majorTickMarks: {
											                       length: 12,
											                       lineWidth: 2,
											                       interval: 10,
											                       offset: 0.84
											                   },
											                   minorTickMarks: {
											                       visible: true,
											                       length: 8,
											                       lineWidth: 2,
											                       interval: 2,
											                       offset: 0.84
											                   },
											                   labels: {
											                       orientation: 'horizontal',
											                       interval: 10,
											                       offset: 1.00
											                   },
											                   needles: [
											                   {
											                    value: $scope.selfmeter,
											                    type: 'pointer',
											                    outerOffset: 0.8,
											                    mediumOffet: 0.7,
											                    width: 10,
											                    fillStyle: '#252E32'
											                }
											                ]
											            }
											            ]
											        });
											            
											            $('#sense').jqRadialGauge({
											                background: '#F7F7F7',
											                border: {
											                    lineWidth: 10,
											                    strokeStyle: 'green',
											                    padding: 16
											                },
											                shadows: {
											                    enabled: true
											                },
											                anchor: {
											                    visible: true,
											                    fillStyle: anchorGradient,
											                    radius: 0.10
											                },
											                tooltips: {
											                    disabled: false,
											                    highlighting: true
											                },
											                animation: {
											                    duration: 1
											                },
											                scales: [
											                {
											                   minimum: 0,
											                   maximum: 100,
											                   startAngle: 180,
											                   endAngle: 360,
											                   majorTickMarks: {
											                       length: 12,
											                       lineWidth: 2,
											                       interval: 10,
											                       offset: 0.84
											                   },
											                   minorTickMarks: {
											                       visible: true,
											                       length: 8,
											                       lineWidth: 2,
											                       interval: 2,
											                       offset: 0.84
											                   },
											                   labels: {
											                       orientation: 'horizontal',
											                       interval: 10,
											                       offset: 1.00
											                   },
											                   needles: [
											                   {
											                    value: $scope.sensemeter,
											                    type: 'pointer',
											                    outerOffset: 0.8,
											                    mediumOffet: 0.7,
											                    width: 10,
											                    fillStyle: '#252E32'
											                }
											                ]
											            }
											            ]
											        });
											            
											            $('#positive').jqRadialGauge({
											                background: '#F7F7F7',
											                border: {
											                    lineWidth: 10,
											                    strokeStyle: 'green',
											                    padding: 16
											                },
											                shadows: {
											                    enabled: true
											                },
											                anchor: {
											                    visible: true,
											                    fillStyle: anchorGradient,
											                    radius: 0.10
											                },
											                tooltips: {
											                    disabled: false,
											                    highlighting: true
											                },
											                animation: {
											                    duration: 1
											                },
											                scales: [
											                {
											                   minimum: 0,
											                   maximum: 100,
											                   startAngle: 180,
											                   endAngle: 360,
											                   majorTickMarks: {
											                       length: 12,
											                       lineWidth: 2,
											                       interval: 10,
											                       offset: 0.84
											                   },
											                   minorTickMarks: {
											                       visible: true,
											                       length: 8,
											                       lineWidth: 2,
											                       interval: 2,
											                       offset: 0.84
											                   },
											                   labels: {
											                       orientation: 'horizontal',
											                       interval: 10,
											                       offset: 1.00
											                   },
											                   needles: [
											                   {
											                    value: $scope.positivemeter,
											                    type: 'pointer',
											                    outerOffset: 0.8,
											                    mediumOffet: 0.7,
											                    width: 10,
											                    fillStyle: '#252E32'
											                }
											                ]
											            }
											            ]
											        });
											            
											            $('#growth').jqRadialGauge({
											                background: '#F7F7F7',
											                border: {
											                    lineWidth: 10,
											                    strokeStyle: 'green',
											                    padding: 16
											                },
											                shadows: {
											                    enabled: true
											                },
											                anchor: {
											                    visible: true,
											                    fillStyle: anchorGradient,
											                    radius: 0.10
											                },
											                tooltips: {
											                    disabled: false,
											                    highlighting: true
											                },
											                animation: {
											                    duration: 1
											                },
											                scales: [
											                {
											                   minimum: 0,
											                   maximum: 100,
											                   startAngle: 180,
											                   endAngle: 360,
											                   majorTickMarks: {
											                       length: 12,
											                       lineWidth: 2,
											                       interval: 10,
											                       offset: 0.84
											                   },
											                   minorTickMarks: {
											                       visible: true,
											                       length: 8,
											                       lineWidth: 2,
											                       interval: 2,
											                       offset: 0.84
											                   },
											                   labels: {
											                       orientation: 'horizontal',
											                       interval: 10,
											                       offset: 1.00
											                   },
											                   needles: [
											                   {
											                    value: $scope.growthmeter,
											                    type: 'pointer',
											                    outerOffset: 0.8,
											                    mediumOffet: 0.7,
											                    width: 10,
											                    fillStyle: '#252E32'
											                }
											                ]
											            }
											            ]
											        });
												    });
													
												}).error(function(res) {

													console.log(res);
												})
											    };
												
											 // begin emotional well being summary 
 												$scope.summary2 = function(){	
 													

																								
 													console.log("come fast");
													
													 $scope.bb = 22;
														$scope.positive = "";
														$scope.negative = "";
														$scope.age = "";
														$scope.pvratio = "";
														$scope.nvratio = "";
														$scope.totalratio = "";
														$scope.posfeedback = "";
														$scope.prshow = "";
														$scope.prfshow = "";
														
														$http({
															
															url : globalServerName.getUrlName() + "Section/sectionresponce1/S2/"+user_id,
															method : "GET",
															headers : {
																'Content-Type' : 'application/json',
																//'Authorization' : $scope.token
															}
															
														}).success(function(res){
															
															console.log(res);
															
															if(res.length == 1){
																
																 $scope.overallsum = JSON.parse("[" + res[0].totalsum + "]");
															     $scope.timedate1 =  res[0].time;
															     $scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");			 
																 $scope.negativescore1 = $scope.overallsum[0][0];
																 $scope.positivescore1 = $scope.overallsum[0][1];
																 
																 $scope.negativebar = [{
														             name: 'Possible Range',
														             color: 'rgb(43, 144, 143)',
														             y: 65,
														             drilldown: 'Possible Range'
														         }, {
														             name: 'Average',
														             color:'rgb(247, 163, 92)',
														             y: 29.61,
														             drilldown: 'Average'
														         },  
														         {
														         	name: 'My score\n('+$scope.date1+')',
														         	color:'rgb(144, 237, 125)',
														             y: $scope.negativescore1,
														             drilldown: 'Myscore'
														         }];
																 
																 $scope.positivebar = [{
														             name: 'Possible Range',
														             color: 'rgb(43, 144, 143)',
														             y: 65,
														             drilldown: 'Possible Range'
														         }, {
														             name: 'Average',
														             color:'rgb(247, 163, 92)',
														             y: 40.08,
														             drilldown: 'Average'
														         }, 
														         {
														         	name: 'My score\n('+$scope.date1+')',
														         	color:'rgb(144, 237, 125)',
														             y: $scope.positivescore1,
														             drilldown: 'Myscore'
														         }];
																
																
															}else{
																
															    $scope.overallsum1 = JSON.parse("[" + res[0].totalsum + "]");
																$scope.overallsum2 = JSON.parse("[" + res[1].totalsum + "]");
																$scope.timedate1 =  res[0].time;
																$scope.timedate2 =  res[1].time;
																$scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");
																$scope.date2 = $filter('date')(new Date($scope.timedate2),"dd-MM-yyyy");	
															    $scope.negativescore1 = $scope.overallsum1[0][0];
																$scope.negativescore2 = $scope.overallsum2[0][0];
																$scope.positivescore1 = $scope.overallsum1[0][1];
																$scope.positivescore2 = $scope.overallsum2[0][1];
																
																$scope.positivebar = [{
														            name: 'Possible Range',
														            color: 'rgb(43, 144, 143)',
														            y: 65,
														            drilldown: 'Possible Range'
														        }, {
														            name: 'Average',
														            color:'rgb(247, 163, 92)',
														            y: 40.08,
														            drilldown: 'Average'
														        },
														        {
																	color:'rgb(144, 237, 125)',
																	name: 'My score ('+$scope.date2+')',
														            y: $scope.positivescore2,
														            drilldown: 'My score'
														        },    
														        {
														        	name: 'My score\n('+$scope.date1+')',
														        	color:'rgb(144, 237, 125)',
														            y: $scope.positivescore1,
														            drilldown: 'Myscore'
														        }];
																
																 $scope.negativebar = [{
														             name: 'Possible Range',
														             color: 'rgb(43, 144, 143)',
														             y: 65,
														             drilldown: 'Possible Range'
														         },{
														             name: 'Average',
														             color:'rgb(247, 163, 92)',
														             y: 29.61,
														             drilldown: 'Average'
														         },{
																	color:'rgb(144, 237, 125)',
																	name: 'My score ('+$scope.date2+')',
															        y: $scope.negativescore2,
															        drilldown: 'My score'
															        },{
														         	name: 'My score\n('+$scope.date1+')',
														         	color:'rgb(144, 237, 125)',
														             y: $scope.negativescore1,
														             drilldown: 'Myscore'
														         }];
																
															}
															
														}).error(function(res){
															
															
														})
														
														
														$http({

	url : globalServerName.getUrlName() + "Section/sectionScore1/"+user_id+"/S2",
	method : "GET",
	headers : {
		'Content-Type' : 'application/json',
		//'Authorization' : $scope.token
	}

}).success(function(res) {
	
     
	console.log(res);
	
	$scope.negative = parseInt(res[0][0]);
	$scope.positive = parseInt(res[0][1]);
	
	
	$scope.nratio = res[0][2];
	$scope.pratio = res[0][3];
	
	console.log(res[0][2]);
	console.log(res[0][4]);
	
	
	$scope.totalratio = parseFloat(res[0][4]);
	console.log($scope.totalratio);
	
	if($scope.totalratio == "Infinity"){
		
		$scope.totalratio = 0;
		
	}else if(isNaN($scope.totalratio)){
		
		$scope.totalratio = 0;
	}
	
    if(res[0][4].trim() == "null"){
    	$scope.prfshow = true;
    	$scope.ratioshow = false;
    	$scope.prshow = false;
    }else{
    	
    	$scope.prfshow = false;
    	$scope.ratioshow = true;
    	$scope.prshow = true;
    }

	 if(res[1][0].trim() == "High"){
			
			$scope.nhigh = true;
			
		}else if(res[1][0].trim() == "Average"){
			
			$scope.naverage = true;
			
		}else if(res[1][0].trim() == "Low"){
			
			$scope.nlow = true;
		}
	 if(res[1][1].trim() == "High"){
			
			$scope.phigh = true;
			
		}else if(res[1][1].trim() == "Average"){
			
			$scope.paverage = true;
			
		}else if(res[1][1].trim() == "Low"){
			
			$scope.plow = true;
		}
	
	$scope.negativeperv = res[2][0];
	$scope.positiveperv = res[2][1];
	
	$scope.negativeper = parseInt(res[3][0]);
	$scope.positiveper = parseInt(res[3][1]);
	//user age 20-35	
	$http({
		
		url : globalServerName.getUrlName() + "user/getAge1/" + user_id,
		method : "GET",
		headers : {
			'Content-Type' : 'application/json',
			//'Authorization' : $scope.token
		}
	}).success(function(res){
		console.log(res);
		$scope.age = res;
		
		if($scope.age <= 35){
			
		    if($scope.totalratio >= 1.70){
		    	
		    	$scope.prhigh = true;
		    	
		    }else if(($scope.totalratio >= 0.65) && ($scope.totalratio <= 1.69)){
		    	
		    	$scope.praverage = true;
		    	
		    }else if($scope.totalratio <= 0.64){
			
			$scope.prlow = true;
			
		     }
			
			
			angular.element(document).ready(function ($) {
				  
				 var anchorGradient = {
			                type: 'radialGradient',
			                x0: 0.35,
			                y0: 0.35,
			                r0: 0.0,
			                x1: 0.35,
			                y1: 0.35,
			                r1: 1,
			                colorStops: [{ offset: 0, color: 'blue' },
			                { offset: 1, color: '#252E32'}]
			            };

			            $('#negative').jqRadialGauge({
			                background: '#F7F7F7',
			                border: {
			                    lineWidth: 10,
			                    strokeStyle: 'green',
			                    padding: 16
			                },
			                shadows: {
			                    enabled: true
			                },
			                anchor: {
			                    visible: true,
			                    fillStyle: anchorGradient,
			                    radius: 0.10
			                },
			                tooltips: {
			                    disabled: false,
			                    highlighting: true
			                },
			                animation: {
			                    duration: 1
			                },
			                scales: [
			                {
			                   minimum: 0,
			                   maximum: 100,
			                   startAngle: 180,
			                   endAngle: 360,
			                   majorTickMarks: {
			                       length: 12,
			                       lineWidth: 2,
			                       interval: 10,
			                       offset: 0.84
			                   },
			                   minorTickMarks: {
			                       visible: true,
			                       length: 8,
			                       lineWidth: 2,
			                       interval: 2,
			                       offset: 0.84
			                   },
			                   labels: {
			                       orientation: 'horizontal',
			                       interval: 10,
			                       offset: 1.00
			                   },
			                   needles: [
			                   {
			                    value: $scope.negativeper,
			                    type: 'pointer',
			                    outerOffset: 0.8,
			                    mediumOffet: 0.7,
			                    width: 10,
			                    fillStyle: '#252E32'
			                }
			                ]
			            }
			            ]
			        });
			            
			            $('#positive2').jqRadialGauge({
			                background: '#F7F7F7',
			                border: {
			                    lineWidth: 10,
			                    strokeStyle: 'green',
			                    padding: 16
			                },
			                shadows: {
			                    enabled: true
			                },
			                anchor: {
			                    visible: true,
			                    fillStyle: anchorGradient,
			                    radius: 0.10
			                },
			                tooltips: {
			                    disabled: false,
			                    highlighting: true
			                },
			                animation: {
			                    duration: 1
			                },
			                scales: [
			                {
			                   minimum: 0,
			                   maximum: 100,
			                   startAngle: 180,
			                   endAngle: 360,
			                   majorTickMarks: {
			                       length: 12,
			                       lineWidth: 2,
			                       interval: 10,
			                       offset: 0.84
			                   },
			                   minorTickMarks: {
			                       visible: true,
			                       length: 8,
			                       lineWidth: 2,
			                       interval: 2,
			                       offset: 0.84
			                   },
			                   labels: {
			                       orientation: 'horizontal',
			                       interval: 10,
			                       offset: 1.00
			                   },
			                   needles: [
			                   {
			                    value: $scope.positiveper,
			                    type: 'pointer',
			                    outerOffset: 0.8,
			                    mediumOffet: 0.7,
			                    width: 10,
			                    fillStyle: '#252E32'
			                }
			                ]
			            }
			            ]
			        });
						
			      
			    });

		    $(function () { 
		        var myChart = Highcharts.chart('ratio', {
		            chart: {
		                type: 'column',
		                backgroundColor: "#3C3C3C"
		            },
		            xAxis: {
		            	style: {
			                color: 'white',
			             },
		                categories: ['Average', 'My ratio']
		            },
		            title: {
			        	 style: {
				                color: 'white',
				             },
			            text: 'Positivity ratio'
			        },
		            yAxis: {
		                min: 0,
		                title: {
		                	style: {
			                    color: 'white'
			                },
		                    text: ' '
		                },
		                labels: {
			                style: {
			                    color: 'white'
			                }
			            },
		                stackLabels: {
		                    enabled: false,
		                    style: {
		                        fontWeight: 'bold',
		                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'white'
		                    }
		                }
		            },
		            legend: {
		                align: 'right',
		                x: -30,
		                verticalAlign: 'top',
		                y: 25,
		                floating: true,
		                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
		                borderColor: '#CCC',
		                borderWidth: 1,
		                shadow: false
		            },
		           /* tooltip: {
		                headerFormat: '<b>{point.x}</b><br/>',
		                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
		            },*/
		            plotOptions: {
		                column: {
		                    stacking: 'normal',
		                    dataLabels: {
		                        enabled: true,
		                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
		                    }
		                }
		            },
		            series: [{
		                name: 'Positive',
		                color:'#38ACEC',
		                data: [1.52, $scope.totalratio]
		            }, {
		                name: 'Negative',
		                color:'rgb(223, 83, 83)',
		                data: [1, 1]
		            }]
		        });
		    });
			
		    
		    $(function () { 
		        var myChart = Highcharts.chart('container6', {
		        chart: {
		            type: 'column',
		            backgroundColor: "#3C3C3C"
		        },
		        title: {
		        	 style: {
			                color: 'white',
			             },
		            text: 'Negative Emotion'
		        },
		        xAxis: {
		            type: 'category'
		        },
		        yAxis: {
		        	min: 13,
		            max: 65,
		            endOnTick:false,
		            tickInterval:13,
		            title: {
		            	style: {
		                    color: 'white'
		                },
		                text: ' '
		            },
		            labels: {
		                style: {
		                    color: 'white'
		                }
		            },

		        },
		        legend: {
		            enabled: false
		        },
		        plotOptions: {
		            series: {
		                borderWidth: 0,
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.y:.1f}'
		                }
		            }
		        },

		        tooltip: {
		            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		            pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
		        },
		        series: [{
		            name: 'Negative Affect',
		            colorByPoint: true,
		            data:$scope.negativebar 
		        }]
		    });
		    });
		    
		    $(function () { 
		        var myChart = Highcharts.chart('container7', {
		        chart: {
		        	backgroundColor: "#3C3C3C",
		            type: 'column'
		        },
		        title: {
		        	 style: {
			                color: 'white',
			             },
		            text: 'Positive Emotion'
		        },
		        xAxis: {
		            type: 'category'
		        },
		        yAxis: {
		        	min: 13,
		            max: 65,
		            endOnTick:false,
		            tickInterval:13,
		            title: {
		            	style: {
		                    color: 'white'
		                },
		                text: ' '
		            },
		            labels: {
		                style: {
		                    color: 'white'
		                }
		            },

		        },
		        legend: {
		            enabled: false
		        },
		        plotOptions: {
		            series: {
		                borderWidth: 0,
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.y:.1f}'
		                }
		            }
		        },

		        tooltip: {
		            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		            pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
		        },

		        series: [{
		            name: 'Positive Emotion',
		            colorByPoint: true,
		            data: $scope.positivebar
		        }]
		    });
		    });		
		}
		
		//user age 36-60
		else if($scope.age >= 36){
			
		    if($scope.totalratio >= 2.23){
		    	
		    	$scope.prhigh = true;
		    	
		    }else if(($scope.totalratio >= 0.80) && ($scope.totalratio <= 2.22)){
		    	
		    	$scope.praverage = true;
		    	
		    }else if($scope.totalratio <= 0.79){
			
			$scope.prlow = true;
			
		     }
			
			
			angular.element(document).ready(function ($) {
				

	            var anchorGradient = {
	                type: 'radialGradient',
	                x0: 0.35,
	                y0: 0.35,
	                r0: 0.0,
	                x1: 0.35,
	                y1: 0.35,
	                r1: 1,
	                colorStops: [{ offset: 0, color: 'blue' },
	                { offset: 1, color: '#252E32'}]
	            };

	            $('#negative').jqRadialGauge({
	                background: '#F7F7F7',
	                border: {
	                    lineWidth: 10,
	                    strokeStyle: 'green',
	                    padding: 16
	                },
	                shadows: {
	                    enabled: true
	                },
	                anchor: {
	                    visible: true,
	                    fillStyle: anchorGradient,
	                    radius: 0.10
	                },
	                tooltips: {
	                    disabled: false,
	                    highlighting: true
	                },
	                animation: {
	                    duration: 1
	                },
	                scales: [
	                {
	                   minimum: 0,
	                   maximum: 100,
	                   startAngle: 180,
	                   endAngle: 360,
	                   majorTickMarks: {
	                       length: 12,
	                       lineWidth: 2,
	                       interval: 10,
	                       offset: 0.84
	                   },
	                   minorTickMarks: {
	                       visible: true,
	                       length: 8,
	                       lineWidth: 2,
	                       interval: 2,
	                       offset: 0.84
	                   },
	                   labels: {
	                       orientation: 'horizontal',
	                       interval: 10,
	                       offset: 1.00
	                   },
	                   needles: [
	                   {
	                    value: $scope.negativeper,
	                    type: 'pointer',
	                    outerOffset: 0.8,
	                    mediumOffet: 0.7,
	                    width: 10,
	                    fillStyle: '#252E32'
	                }
	                ]
	            }
	            ]
	        });
	            
	            $('#positive2').jqRadialGauge({
	                background: '#F7F7F7',
	                border: {
	                    lineWidth: 10,
	                    strokeStyle: 'green',
	                    padding: 16
	                },
	                shadows: {
	                    enabled: true
	                },
	                anchor: {
	                    visible: true,
	                    fillStyle: anchorGradient,
	                    radius: 0.10
	                },
	                tooltips: {
	                    disabled: false,
	                    highlighting: true
	                },
	                animation: {
	                    duration: 1
	                },
	                scales: [
	                {
	                   minimum: 0,
	                   maximum: 100,
	                   startAngle: 180,
	                   endAngle: 360,
	                   majorTickMarks: {
	                       length: 12,
	                       lineWidth: 2,
	                       interval: 10,
	                       offset: 0.84
	                   },
	                   minorTickMarks: {
	                       visible: true,
	                       length: 8,
	                       lineWidth: 2,
	                       interval: 2,
	                       offset: 0.84
	                   },
	                   labels: {
	                       orientation: 'horizontal',
	                       interval: 10,
	                       offset: 1.00
	                   },
	                   needles: [
	                   {
	                    value: $scope.positiveper,
	                    type: 'pointer',
	                    outerOffset: 0.8,
	                    mediumOffet: 0.7,
	                    width: 10,
	                    fillStyle: '#252E32'
	                }
	                ]
	            }
	            ]
	        });
				
			    });
			
		    
		    $(function () { 
		        var myChart = Highcharts.chart('container6', {
		        chart: {
		        	backgroundColor: "#3C3C3C",
		            type: 'column'
		        },
		        title: {
		        	 style: {
			                color: 'white',
			             },
		            text: 'Negative Affect'
		        },
		        xAxis: {
		            type: 'category'
		        },
		        yAxis: {
		        	min: 13,
		            max: 65,
		            endOnTick:false,
		            tickInterval:13,
		            title: {
		                text: ' '
		            },
		            labels: {
		                style: {
		                    color: 'white'
		                }
		            },

		        },
		        legend: {
		            enabled: false
		        },
		        plotOptions: {
		            series: {
		                borderWidth: 0,
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.y:.1f}'
		                }
		            }
		        },

		        tooltip: {
		            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		            pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
		        },
		        series: [{
		            name: 'Negative Affect',
		            colorByPoint: true,
		            data: $scope.negativebar 
		        }]
		    });
		    });
		    
		    $(function () { 
		        var myChart = Highcharts.chart('ratio', {
		            chart: {
		                type: 'column',
		                backgroundColor: "#3C3C3C"
		            },
		            title: {
			        	 style: {
				                color: 'white',
				             },
			            text: 'Positivity ratio'
			        },
		            xAxis: {
		                categories: ['Average', 'My ratio']
		            },
		            yAxis: {
		                min: 0,
		                title: {
		                    text: ' '
		                },
		                stackLabels: {
		                    enabled: false,
		                    style: {
		                        fontWeight: 'bold',
		                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
		                    }
		                }
		            },
		            legend: {
		                align: 'right',
		                x: -30,
		                verticalAlign: 'top',
		                y: 25,
		                floating: true,
		                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
		                borderColor: '#CCC',
		                borderWidth: 1,
		                shadow: false
		            },
		            tooltip: {
		                headerFormat: '<b>{point.x}</b><br/>',
		                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
		            },
		            plotOptions: {
		                column: {
		                    stacking: 'normal',
		                    dataLabels: {
		                        enabled: true,
		                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
		                    }
		                }
		            },
		            series: [{
		                name: 'Positive',
		                color:'#38ACEC',
		                data: [1.95, $scope.totalratio]
		            }, {
		                name: 'Negative',
		                color:'rgb(223, 83, 83)',
		                data: [1, 1]
		            }]
		        });
		    });
		    
		    $(function () { 
		        var myChart = Highcharts.chart('container7', {
		        chart: {
		            type: 'column',
		            backgroundColor: "#3C3C3C"
		        },
		        title: {
		        	 style: {
			                color: 'white',
			             },
		            text: 'Positive Affect'
		        },
		        xAxis: {
		            type: 'category'
		        },
		        yAxis: {
		        	min: 13,
		            max: 65,
		            endOnTick:false,
		            tickInterval:13,
		            title: {
		            	style: {
		                    color: 'white'
		                },
		                text: ' '
		            },
		            labels: {
		                style: {
		                    color: 'white'
		                }
		            },

		        },
		        legend: {
		            enabled: false
		        },
		        plotOptions: {
		            series: {
		                borderWidth: 0,
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.y:.1f}'
		                }
		            }
		        },

		        tooltip: {
		            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		            pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
		        },

		        series: [{
		            name: 'Positive Affect',
		            colorByPoint: true,
		            data: $scope.positivebar
		        }]
		    });
		    });
		    
		 
		}
		
	}).error(function(res){
		
		console.log(res);
	})
	
	console.log(res);
}).error(function(res) {

	console.log(res);
})


		
 												};
 												
 												//end emotional well being summary
												
 												

												
												//begin social well being summary
												$scope.summary3 = function(){
													$scope.social = "";
													$scope.age = "";
													$scope.socialpercentile = "";
													$http({
														
														url : globalServerName.getUrlName() + "Section/sectionresponce1/S3/"+user_id,
														method : "GET",
														headers : {
															'Content-Type' : 'application/json',
															//'Authorization' : $scope.token
														}
														
													})
													.success(function(res){
														
														if(res.length == 1){
															
															$scope.overallsum = JSON.parse("[" + res[0].totalsum + "]");
														    $scope.timedate1 =  res[0].time;
														    $scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");			 
															$scope.socialscore1 = $scope.overallsum[0][0];
															
															$scope.socialbar = [{
													              name: 'Possible Range',
													              color: 'rgb(43, 144, 143)',
													              y: 54,
													              drilldown: 'Possible Range'
													          }, {
													              name: 'Average',
													              color:'rgb(247, 163, 92)',
													              y: 38.49,
													              drilldown: 'Average'
													          }, 
													            {
													            	name: 'My score\n('+$scope.date1+')',
													            	color:'rgb(144, 237, 125)',
													                y: $scope.socialscore1,
													                drilldown: 'Myscore'
													            }];
															
														}
														else{
															
															 $scope.overallsum1 = JSON.parse("[" + res[0].totalsum + "]");
														     $scope.overallsum2 = JSON.parse("[" + res[1].totalsum + "]");
															 $scope.timedate1 =  res[0].time;
															 $scope.timedate2 =  res[1].time;
															 $scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");
															 $scope.date2 = $filter('date')(new Date($scope.timedate2),"dd-MM-yyyy");		 
															 $scope.socialscore1 = $scope.overallsum1[0][0];
															 $scope.socialscore2 = $scope.overallsum2[0][0];
															 
																$scope.socialbar = [{
														              name: 'Possible Range',
														              color: 'rgb(43, 144, 143)',
														              y: 54,
														              drilldown: 'Possible Range'
														          }, {
														              name: 'Average',
														              color:'rgb(247, 163, 92)',
														              y: 38.49,
														              drilldown: 'Average'
														          }, {
																		color:'rgb(144, 237, 125)',
																		name: 'My score ('+$scope.date2+')',
															            y: $scope.socialscore2,
															            drilldown: 'My score'
															        },
														            {
														            	name: 'My score\n('+$scope.date1+')',
														            	color:'rgb(144, 237, 125)',
														                y: $scope.socialscore1,
														                drilldown: 'Myscore'
														            }];
														}
														
														console.log(res);
													})
													.error(function(res){
														
													})
													
													$http({

	url : globalServerName.getUrlName() + "Section/sectionScore1/"+user_id+"/S3",
	method : "GET",
	headers : {
		'Content-Type' : 'application/json',
		//'Authorization' : $scope.token
	}

}).success(function(res) {


	console.log(res);	
	$scope.social = parseInt(res[0][0]);
	$scope.percentile = res[2][0];
	$scope.socialpercentile = parseInt(res[3][0]);
	
	if(res[1][0].trim() == "High"){
		
		$scope.shigh = true;
		
	}else if(res[1][0].trim() == "Average"){
		
		$scope.saverage = true;
		
	}else if(res[1][0].trim() == "Low"){
		
		$scope.slow = true;
	}
$http({
		
		url : globalServerName.getUrlName() + "user/getAge1/" + user_id,
		method : "GET",
		headers : {
			'Content-Type' : 'application/json',
			//'Authorization' : $scope.token
		}
	}).success(function(res){
		
		console.log(res);
		$scope.age = res;
		
		if($scope.age <= 35){
			
			angular.element(document).ready(function ($) {


	            var anchorGradient = {
	                type: 'radialGradient',
	                x0: 0.35,
	                y0: 0.35,
	                r0: 0.0,
	                x1: 0.35,
	                y1: 0.35,
	                r1: 1,
	                colorStops: [{ offset: 0, color: 'blue' },
	                { offset: 1, color: '#252E32'}]
	            };

	            $('#social').jqRadialGauge({
	                background: '#F7F7F7',
	                border: {
	                    lineWidth: 10,
	                    strokeStyle: 'green',
	                    padding: 16
	                },
	                shadows: {
	                    enabled: true
	                },
	                anchor: {
	                    visible: true,
	                    fillStyle: anchorGradient,
	                    radius: 0.10
	                },
	                tooltips: {
	                    disabled: false,
	                    highlighting: true
	                },
	                animation: {
	                    duration: 1
	                },
	                scales: [
	                {
	                   minimum: 0,
	                   maximum: 100,
	                   startAngle: 180,
	                   endAngle: 360,
	                   majorTickMarks: {
	                       length: 12,
	                       lineWidth: 2,
	                       interval: 10,
	                       offset: 0.84
	                   },
	                   minorTickMarks: {
	                       visible: true,
	                       length: 8,
	                       lineWidth: 2,
	                       interval: 2,
	                       offset: 0.84
	                   },
	                   labels: {
	                       orientation: 'horizontal',
	                       interval: 10,
	                       offset: 1.00
	                   },
	                   needles: [
	                   {
	                    value: $scope.socialpercentile,
	                    type: 'pointer',
	                    outerOffset: 0.8,
	                    mediumOffet: 0.7,
	                    width: 10,
	                    fillStyle: '#252E32'
	                }
	                ]
	            }
	            ]
	        });

			  });
			  
			  $(function () { 
			      var myChart = Highcharts.chart('container8', {
			      chart: {
			    	  backgroundColor: "#3C3C3C",
			          type: 'column'
			      },
			      title: {
			    	  style: {
			                color: 'white',
			             },
			          text: 'Social Well Being'
			      },
			      xAxis: {
			          type: 'category'
			      },
			      yAxis: {
			      	min: 9,
			          max: 54,
			          endOnTick:false,
			          tickInterval:9,
			          title: {
			        	  style: {
			                    color: 'white'
			                },
			              text: ' '
			          },
			      labels: {
		                style: {
		                    color: 'white'
		                }
		            },

			      },
			      
			      legend: {
			          enabled: false
			      },
			      plotOptions: {
			          series: {
			              borderWidth: 0,
			              dataLabels: {
			                  enabled: true,
			                  format: '{point.y:.1f}'
			              }
			          }
			      },

			      tooltip: {
			          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			          pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
			      },

			      series: [{
			          name: 'Social Well Being',
			          colorByPoint: true,
			          data:$scope.socialbar 
			      }]
			  });
			  });
			
			
		}else if($scope.age >= 36){
			
			angular.element(document).ready(function ($) {


	            var anchorGradient = {
	                type: 'radialGradient',
	                x0: 0.35,
	                y0: 0.35,
	                r0: 0.0,
	                x1: 0.35,
	                y1: 0.35,
	                r1: 1,
	                colorStops: [{ offset: 0, color: 'blue' },
	                { offset: 1, color: '#252E32'}]
	            };

	            $('#social').jqRadialGauge({
	                background: '#F7F7F7',
	                border: {
	                    lineWidth: 10,
	                    strokeStyle: 'green',
	                    padding: 16
	                },
	                shadows: {
	                    enabled: true
	                },
	                anchor: {
	                    visible: true,
	                    fillStyle: anchorGradient,
	                    radius: 0.10
	                },
	                tooltips: {
	                    disabled: false,
	                    highlighting: true
	                },
	                animation: {
	                    duration: 1
	                },
	                scales: [
	                {
	                   minimum: 0,
	                   maximum: 100,
	                   startAngle: 180,
	                   endAngle: 360,
	                   majorTickMarks: {
	                       length: 12,
	                       lineWidth: 2,
	                       interval: 10,
	                       offset: 0.84
	                   },
	                   minorTickMarks: {
	                       visible: true,
	                       length: 8,
	                       lineWidth: 2,
	                       interval: 2,
	                       offset: 0.84
	                   },
	                   labels: {
	                       orientation: 'horizontal',
	                       interval: 10,
	                       offset: 1.00
	                   },
	                   needles: [
	                   {
	                    value: $scope.socialpercentile,
	                    type: 'pointer',
	                    outerOffset: 0.8,
	                    mediumOffet: 0.7,
	                    width: 10,
	                    fillStyle: '#252E32'
	                }
	                ]
	            }
	            ]
	        });

			  });
			  
			  $(function () { 
			      var myChart = Highcharts.chart('container8', {
			      chart: {
			    	  backgroundColor: "#3C3C3C",
			          type: 'column'
			      },
			      title: {
			    	  style: {
			                color: 'white',
			             },
			          text: 'Social Well Being'
			      },
			      xAxis: {
			          type: 'category'
			      },
			      yAxis: {
			      	min: 9,
			          max: 54,
			          endOnTick:false,
			          tickInterval:9,
			          title: {
			              text: ' '
			          }

			      },
			      legend: {
			          enabled: false
			      },
			      plotOptions: {
			          series: {
			              borderWidth: 0,
			              dataLabels: {
			                  enabled: true,
			                  format: '{point.y:.1f}'
			              }
			          }
			      },

			      tooltip: {
			          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			          pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
			      },

			      series: [{
			          name: 'Social Well Being',
			          colorByPoint: true,
			          data: $scope.socialbar
			      }]
			  });
			  });
			
			
		}		
	}).error(function(res){
		
		console.log(res);
	})
	
	



	
}).error(function(res) {

	console.log(res);
})
													
												};
												
												//end of social well being summary
												
												//begin distress summary
												
												$scope.summary4 = function(){
													$scope.distress = "";
													$scope.age = "";
													
													$http({
														
														url : globalServerName.getUrlName() + "Section/sectionresponce1/S4/"+user_id,
														method : "GET",
														headers : {
															'Content-Type' : 'application/json',
															//'Authorization' : $scope.token
														}
														
													})
													.success(function(res){
														
														console.log(res);
														
														if(res.length == 1){
															
															
															$scope.overallsum = JSON.parse("[" + res[0].totalsum + "]");
														    $scope.timedate1 =  res[0].time;
														    $scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");			 
															$scope.distressscore1 = $scope.overallsum[0][0];
															
															$scope.distressbar = [{
													            name: 'Possible Range',
													            color: 'rgb(43, 144, 143)',
													            y: 50,
													            drilldown: 'Possible Range'
													        }, {
													            name: 'Average',
													            color:'rgb(247, 163, 92)',
													            y: 21.86,
													            drilldown: 'Average'
													        },  
													          {
													          	name: 'My score\n('+$scope.date1+')',
													          	color:'rgb(144, 237, 125)',
													              y: $scope.distressscore1,
													              drilldown: 'Myscore'
													          }];
															
														}
														else{
															
															$scope.overallsum1 = JSON.parse("[" + res[0].totalsum + "]");
														    $scope.overallsum2 = JSON.parse("[" + res[1].totalsum + "]");
															$scope.timedate1 =  res[0].time;
															$scope.timedate2 =  res[1].time;
															$scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");
															$scope.date2 = $filter('date')(new Date($scope.timedate2),"dd-MM-yyyy");		 
															$scope.distressscore1 = $scope.overallsum1[0][0];
															$scope.distressscore2 = $scope.overallsum2[0][0];
															
															$scope.distressbar = [{
													            name: 'Possible Range',
													            color: 'rgb(43, 144, 143)',
													            y: 50,
													            drilldown: 'Possible Range'
													        }, {
													            name: 'Average',
													            color:'rgb(247, 163, 92)',
													            y: 21.86,
													            drilldown: 'Average'
													        },  {
																color:'rgb(144, 237, 125)',
																name: 'My score ('+$scope.date2+')',
													            y: $scope.distressscore2,
													            drilldown: 'My score'
													        }, 
													          {
													          	name: 'My score\n('+$scope.date1+')',
													          	color:'rgb(144, 237, 125)',
													              y: $scope.distressscore1,
													              drilldown: 'Myscore'
													          }];
														}
													})
													.error(function(res){
														
													})
													
													$http({

	url : globalServerName.getUrlName() + "Section/sectionScore1/"+user_id+"/S4",
	method : "GET",
	headers : {
		'Content-Type' : 'application/json',
		//'Authorization' : $scope.token
	}

}).success(function(res) {

	console.log(res);
	$scope.distress = parseInt(res[0][0]);
	$scope.percentile = res[2][0];
	$scope.percentilevalue = parseInt(res[3][0]);
	
	   if(res[1][0].trim() == "High"){
			
			$scope.dhigh = true;
			
		}else if(res[1][0].trim() == "Average"){
			
			$scope.daverage = true;
			
		}else if(res[1][0].trim() == "Low"){
			
			$scope.dlow = true;
		}
	
	console.log($scope.age);
	
$http({
		
		url : globalServerName.getUrlName() + "user/getAge1/" + user_id,
		method : "GET",
		headers : {
			'Content-Type' : 'application/json',
			//'Authorization' : $scope.token
		}
	}).success(function(res){
		
		console.log(res);
		$scope.age = res;
		
		if($scope.age <= 35){
			
			angular.element(document).ready(function ($) {

		 

		        var anchorGradient = {
		            type: 'radialGradient',
		            x0: 0.35,
		            y0: 0.35,
		            r0: 0.0,
		            x1: 0.35,
		            y1: 0.35,
		            r1: 1,
		            colorStops: [{ offset: 0, color: 'blue' },
		            { offset: 1, color: '#252E32'}]
		        };

		        $('#distress').jqRadialGauge({
		            background: '#F7F7F7',
		            border: {
		                lineWidth: 10,
		                strokeStyle: 'green',
		                padding: 16
		            },
		            shadows: {
		                enabled: true
		            },
		            anchor: {
		                visible: true,
		                fillStyle: anchorGradient,
		                radius: 0.10
		            },
		            tooltips: {
		                disabled: false,
		                highlighting: true
		            },
		            animation: {
		                duration: 1
		            },
		            scales: [
		            {
		               minimum: 0,
		               maximum: 100,
		               startAngle: 180,
		               endAngle: 360,
		               majorTickMarks: {
		                   length: 12,
		                   lineWidth: 2,
		                   interval: 10,
		                   offset: 0.84
		               },
		               minorTickMarks: {
		                   visible: true,
		                   length: 8,
		                   lineWidth: 2,
		                   interval: 2,
		                   offset: 0.84
		               },
		               labels: {
		                   orientation: 'horizontal',
		                   interval: 10,
		                   offset: 1.00
		               },
		               needles: [
		               {
		                value: $scope.percentilevalue,
		                type: 'pointer',
		                outerOffset: 0.8,
		                mediumOffet: 0.7,
		                width: 10,
		                fillStyle: '#252E32'
		            }
		            ]
		        }
		        ]
		    });

			   
			  });
			
			 $(function () { 
			      var myChart = Highcharts.chart('container9', {
			          chart: {
				    	  backgroundColor: "#3C3C3C",
				          type: 'column'
				      },
				      title: {
				    	  style: {
				                color: 'white',
				             },
				          text: 'Distress'
				      },
				      xAxis: {
				          type: 'category'
				      },
				      yAxis: {
				      	min: 10,
				          max: 50,
				          endOnTick:false,
				          tickInterval:10,
				          title: {
			                	style: {
				                    color: 'white'
				                },
				              text: ' '
				          },
				      labels: {
			                style: {
			                    color: 'white'
			                }
			            },

				      },
				      legend: {
				          enabled: false
				      },
				      plotOptions: {
				          series: {
				              borderWidth: 0,
				              dataLabels: {
				                  enabled: true,
				                  format: '{point.y:.1f}'
				              }
				          }
				      },

				      tooltip: {
				          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				          pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
				      },

				      series: [{
				          name: 'Hedonic',
				          colorByPoint: true,
				          data:$scope.distressbar 
				      }]
			  });
			  });
			}
			else if($scope.age >= 36){		
			angular.element(document).ready(function ($) {
		        var anchorGradient = {
		            type: 'radialGradient',
		            x0: 0.35,
		            y0: 0.35,
		            r0: 0.0,
		            x1: 0.35,
		            y1: 0.35,
		            r1: 1,
		            colorStops: [{ offset: 0, color: 'blue' },
		            { offset: 1, color: '#252E32'}]
		        };

		        $('#distress').jqRadialGauge({
		            background: '#F7F7F7',
		            border: {
		                lineWidth: 10,
		                strokeStyle: 'green',
		                padding: 16
		            },
		            shadows: {
		                enabled: true
		            },
		            anchor: {
		                visible: true,
		                fillStyle: anchorGradient,
		                radius: 0.10
		            },
		            tooltips: {
		                disabled: false,
		                highlighting: true
		            },
		            animation: {
		                duration: 1
		            },
		            scales: [
		            {
		               minimum: 0,
		               maximum: 100,
		               startAngle: 180,
		               endAngle: 360,
		               majorTickMarks: {
		                   length: 12,
		                   lineWidth: 2,
		                   interval: 10,
		                   offset: 0.84
		               },
		               minorTickMarks: {
		                   visible: true,
		                   length: 8,
		                   lineWidth: 2,
		                   interval: 2,
		                   offset: 0.84
		               },
		               labels: {
		                   orientation: 'horizontal',
		                   interval: 10,
		                   offset: 1.00
		               },
		               needles: [
		               {
		                value: $scope.percentilevalue,
		                type: 'pointer',
		                outerOffset: 0.8,
		                mediumOffet: 0.7,
		                width: 10,
		                fillStyle: '#252E32'
		            }
		            ]
		        }
		        ]
		    });			   
			  });			
				 $(function () { 
				      var myChart = Highcharts.chart('container9', {
				      chart: {
				    	  backgroundColor: "#3C3C3C",
				          type: 'column'
				      },
				      title: {
			        	  style: {
			                    color: 'white'
			                },
				          text: 'Distress'
				      },
				      xAxis: {
				          type: 'category'
				      },
				      yAxis: {
				      	min: 10,
				          max: 50,
				          endOnTick:false,
				          tickInterval:10,
				          title: {
				              text: ' '
				          },labels: {
				                style: {
				                    color: 'white'
				                }
				            },

				      },
				      legend: {
				          enabled: false
				      },
				      plotOptions: {
				          series: {
				              borderWidth: 0,
				              dataLabels: {
				                  enabled: true,
				                  format: '{point.y:.1f}'
				              }
				          }
				      },

				      tooltip: {
				          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				          pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
				      },

				      series: [{
				          name: 'Distress',
				          colorByPoint: true,
				          data: $scope.distressbar
				      }]
				  });
				  });
				
			}
	}).error(function(res){
		
		console.log(res);
	}) 
	  
}).error(function(res) {

	console.log(res);
})
												}
												//end of distress summary
												
												//begin activity summary
												
												$scope.summary5 = function(){
													$scope.hedonic = "";
													$scope.eudemonic = "";
													$scope.age = "";
													$http({
														
														url : globalServerName.getUrlName() + "Section/sectionresponce1/S5/"+user_id,
														method : "GET",
														headers : {
															'Content-Type' : 'application/json',
															//'Authorization' : $scope.token
																
														}
														
													}).success(function(res){
														
														console.log(res);
														
														if(res.length == 1){
															
															 $scope.overallsum = JSON.parse("[" + res[0].totalsum + "]");
														     $scope.timedate1 =  res[0].time;
														     $scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");			 
															 $scope.hedonicscore1 = $scope.overallsum[0][0];
															 $scope.edumonicscore1 = $scope.overallsum[0][1];	
															 
															 $scope.hedonicbar = [{
													             name: 'Possible Range',
													             color: 'rgb(43, 144, 143)',
													             y: 50,
													             drilldown: 'Possible Range'
													         }, {
													             name: 'Average',
													             color:'rgb(247, 163, 92)',
													             y: 22.61,
													             drilldown: 'Average'
													         },           
													           {
													           	name: 'My score\n('+$scope.date1+')',
													           	color:'rgb(144, 237, 125)',
													               y: $scope.hedonicscore1,
													               drilldown: 'Myscore'
													           }];
															 
															 $scope.edumonicbar = [{
													             name: 'Possible Range',
													             color: 'rgb(43, 144, 143)',
													             y: 50,
													             drilldown: 'Possible Range'
													         }, {
													             name: 'Average',
													             color:'rgb(247, 163, 92)',
													             y: 28.94,
													             drilldown: 'Average'
													         },             
													           {
													           	name: 'My score\n('+$scope.date1+')',
													           	color:'rgb(144, 237, 125)',
													               y: $scope.edumonicscore1,
													               drilldown: 'Myscore'
													           }];
															
														}else{
															
														    $scope.overallsum1 = JSON.parse("[" + res[0].totalsum + "]");
															$scope.overallsum2 = JSON.parse("[" + res[1].totalsum + "]");
															$scope.timedate1 =  res[0].time;
															$scope.timedate2 =  res[1].time;
															$scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");
															$scope.date2 = $filter('date')(new Date($scope.timedate2),"dd-MM-yyyy");	
														    $scope.hedonicscore1 = $scope.overallsum1[0][0];
															$scope.hedonicscore2 = $scope.overallsum2[0][0];
															$scope.edumonicscore1 = $scope.overallsum1[0][1];
															$scope.edumonicscore2 = $scope.overallsum2[0][1];
															
															 $scope.hedonicbar = [{
													             name: 'Possible Range',
													             color: 'rgb(43, 144, 143)',
													             y: 50,
													             drilldown: 'Possible Range'
													         }, {
													             name: 'Average',
													             color:'rgb(247, 163, 92)',
													             y: 22.61,
													             drilldown: 'Average'
													         }, {
																	color:'rgb(144, 237, 125)',
																	name: 'My score ('+$scope.date2+')',
														            y: $scope.hedonicscore2,
														            drilldown: 'My score'
														        },          
													           {
													           	name: 'My score\n('+$scope.date1+')',
													           	color:'rgb(144, 237, 125)',
													               y: $scope.hedonicscore1,
													               drilldown: 'Myscore'
													           }];
															 
															 $scope.edumonicbar = [{
													             name: 'Possible Range',
													             color: 'rgb(43, 144, 143)',
													             y: 50,
													             drilldown: 'Possible Range'
													         },{
													             name: 'Average',
													             color:'rgb(247, 163, 92)',
													             y: 28.94,
													             drilldown: 'Average'
													         },{
																	color:'rgb(144, 237, 125)',
																	name: 'My score ('+$scope.date2+')',
														            y: $scope.edumonicscore2,
														            drilldown: 'My score'
														        },{
													           	name: 'My score\n('+$scope.date1+')',
													           	color:'rgb(144, 237, 125)',
													               y: $scope.edumonicscore1,
													               drilldown: 'Myscore'
													           }];		
														}
														
													}).error(function(res){
														
														console.log(res);
													})
														$http({

		url : globalServerName.getUrlName() + "Section/sectionScore1/"+user_id+"/S5",
		method : "GET",
		headers : {
			'Content-Type' : 'application/json',
			//'Authorization' : $scope.token
		}

	}).success(function(res) {
		
		console.log(res);
		
		$scope.hedonic = parseInt(res[0][0]);
		$scope.eudemonic = parseInt(res[0][1]);
		
		   if(res[1][0].trim() == "High"){
				
				$scope.hhigh = true;
				
			}else if(res[1][0].trim() == "Average"){
				
				$scope.haverage = true;
				
			}else if(res[1][0].trim() == "Low"){
				
				$scope.hlow = true;
			}
		   
		   if(res[1][1].trim() == "High"){
				
				$scope.ehigh = true;
				
			}else if(res[1][1].trim() == "Average"){
				
				$scope.eaverage = true;
				
			}else if(res[1][1].trim() == "Low"){
				
				$scope.elow = true;
			}
		
		$scope.hedonicperv = res[2][0];
		$scope.eudemonicperv = res[2][1];
		
		$scope.hedonicper = parseInt(res[3][0]);
		$scope.eudemonicper = parseInt(res[3][1]);
		
		console.log($scope.eudemonicper);
$http({
			
			url : globalServerName.getUrlName() + "user/getAge1/" + user_id,
			method : "GET",
			headers : {
				'Content-Type' : 'application/json',
				//'Authorization' : $scope.token
			}
		}).success(function(res){
			console.log(res);
			$scope.age = res;
			
			if($scope.age <= 35){
				
				angular.element(document).ready(function ($) {

		  

		            var anchorGradient = {
		                type: 'radialGradient',
		                x0: 0.35,
		                y0: 0.35,
		                r0: 0.0,
		                x1: 0.35,
		                y1: 0.35,
		                r1: 1,
		                colorStops: [{ offset: 0, color: 'blue' },
		                { offset: 1, color: '#252E32'}]
		            };

		            $('#hedonic').jqRadialGauge({
		                background: '#F7F7F7',
		                border: {
		                    lineWidth: 10,
		                    strokeStyle: 'green',
		                    padding: 16
		                },
		                shadows: {
		                    enabled: true
		                },
		                anchor: {
		                    visible: true,
		                    fillStyle: anchorGradient,
		                    radius: 0.10
		                },
		                tooltips: {
		                    disabled: false,
		                    highlighting: true
		                },
		                animation: {
		                    duration: 1
		                },
		                scales: [
		                {
		                   minimum: 0,
		                   maximum: 100,
		                   startAngle: 180,
		                   endAngle: 360,
		                   majorTickMarks: {
		                       length: 12,
		                       lineWidth: 2,
		                       interval: 10,
		                       offset: 0.84
		                   },
		                   minorTickMarks: {
		                       visible: true,
		                       length: 8,
		                       lineWidth: 2,
		                       interval: 2,
		                       offset: 0.84
		                   },
		                   labels: {
		                       orientation: 'horizontal',
		                       interval: 10,
		                       offset: 1.00
		                   },
		                   needles: [
		                   {
		                    value: $scope.hedonicper,
		                    type: 'pointer',
		                    outerOffset: 0.8,
		                    mediumOffet: 0.7,
		                    width: 10,
		                    fillStyle: '#252E32'
		                }
		                ]
		            }
		            ]
		        });
				  });
				
				  $(function () { 
				      var myChart = Highcharts.chart('container10', {
				      chart: {
				    	  backgroundColor: "#3C3C3C",
				          type: 'column'
				      },
				      title: {
				    	  style: {
				                color: 'white',
				             },
				          text: 'Pleasure-oriented Activities (Hedonic)'
				      },
				      xAxis: {
				          type: 'category'
				      },
				      yAxis: {
				      	min: 10,
				          max: 50,
				          endOnTick:false,
				          tickInterval:10,
				          title: {
			                	style: {
				                    color: 'white'
				                },
				              text: ' '
				          },
				      labels: {
			                style: {
			                    color: 'white'
			                }
			            },

				      },
				      legend: {
				          enabled: false
				      },
				      plotOptions: {
				          series: {
				              borderWidth: 0,
				              dataLabels: {
				                  enabled: true,
				                  format: '{point.y:.1f}'
				              }
				          }
				      },

				      tooltip: {
				          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				          pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
				      },

				      series: [{
				          name: 'Hedonic',
				          colorByPoint: true,
				          data: $scope.hedonicbar
				      }]
				  });
				  });
				}
				else if($scope.age >= 36){
					
					angular.element(document).ready(function ($) {


			            var anchorGradient = {
			                type: 'radialGradient',
			                x0: 0.35,
			                y0: 0.35,
			                r0: 0.0,
			                x1: 0.35,
			                y1: 0.35,
			                r1: 1,
			                colorStops: [{ offset: 0, color: 'blue' },
			                { offset: 1, color: '#252E32'}]
			            };

			            $('#hedonic').jqRadialGauge({
			                background: '#F7F7F7',
			                border: {
			                    lineWidth: 10,
			                    strokeStyle: 'green',
			                    padding: 16
			                },
			                shadows: {
			                    enabled: true
			                },
			                anchor: {
			                    visible: true,
			                    fillStyle: anchorGradient,
			                    radius: 0.10
			                },
			                tooltips: {
			                    disabled: false,
			                    highlighting: true
			                },
			                animation: {
			                    duration: 1
			                },
			                scales: [
			                {
			                   minimum: 0,
			                   maximum: 100,
			                   startAngle: 180,
			                   endAngle: 360,
			                   majorTickMarks: {
			                       length: 12,
			                       lineWidth: 2,
			                       interval: 10,
			                       offset: 0.84
			                   },
			                   minorTickMarks: {
			                       visible: true,
			                       length: 8,
			                       lineWidth: 2,
			                       interval: 2,
			                       offset: 0.84
			                   },
			                   labels: {
			                       orientation: 'horizontal',
			                       interval: 10,
			                       offset: 1.00
			                   },
			                   needles: [
			                   {
			                    value: $scope.hedonicper,
			                    type: 'pointer',
			                    outerOffset: 0.8,
			                    mediumOffet: 0.7,
			                    width: 10,
			                    fillStyle: '#252E32'
			                }
			                ]
			            }
			            ]
			        });
					    
					  });
					
					  $(function () { 
					      var myChart = Highcharts.chart('container10', {
					      chart: {
					    	  backgroundColor: "#3C3C3C",
					          type: 'column'
					      },
					      title: {
					    	  style: {
					                color: 'white',
					             },
					          text: 'Pleasure-oriented Activities (Hedonic)'
					      },
					      xAxis: {
					          type: 'category'
					      },
					      yAxis: {
					      	min: 10,
					          max: 50,
					          endOnTick:false,
					          tickInterval:10,
					          title: {
				                	style: {
					                    color: 'white'
					                },
					              text: ' '
					          },labels: {
					                style: {
					                    color: 'white'
					                }
					            },

					      },
					      legend: {
					          enabled: false
					      },
					      plotOptions: {
					          series: {
					              borderWidth: 0,
					              dataLabels: {
					                  enabled: true,
					                  format: '{point.y:.1f}'
					              }
					          }
					      },

					      tooltip: {
					          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
					          pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
					      },

					      series: [{
					          name: 'Hedonic',
					          colorByPoint: true,
					          data: $scope.hedonicbar
					      }]
					  });
					  });
					
				}
			
		}).error(function(res){
			
			console.log(res);
		})		  
		angular.element(document).ready(function ($) {
			


            var anchorGradient = {
                type: 'radialGradient',
                x0: 0.35,
                y0: 0.35,
                r0: 0.0,
                x1: 0.35,
                y1: 0.35,
                r1: 1,
                colorStops: [{ offset: 0, color: 'blue' },
                { offset: 1, color: '#252E32'}]
            };

            $('#eudemonic').jqRadialGauge({
                background: '#F7F7F7',
                border: {
                    lineWidth: 10,
                    strokeStyle: 'green',
                    padding: 16
                },
                shadows: {
                    enabled: true
                },
                anchor: {
                    visible: true,
                    fillStyle: anchorGradient,
                    radius: 0.10
                },
                tooltips: {
                    disabled: false,
                    highlighting: true
                },
                animation: {
                    duration: 1
                },
                scales: [
                {
                   minimum: 0,
                   maximum: 100,
                   startAngle: 180,
                   endAngle: 360,
                   majorTickMarks: {
                       length: 12,
                       lineWidth: 2,
                       interval: 10,
                       offset: 0.84
                   },
                   minorTickMarks: {
                       visible: true,
                       length: 8,
                       lineWidth: 2,
                       interval: 2,
                       offset: 0.84
                   },
                   labels: {
                       orientation: 'horizontal',
                       interval: 10,
                       offset: 1.00
                   },
                   needles: [
                   {
                    value: $scope.eudemonicper,
                    type: 'pointer',
                    outerOffset: 0.8,
                    mediumOffet: 0.7,
                    width: 10,
                    fillStyle: '#252E32'
                }
                ]
            }
            ]
        });
		});
		  
		  $(function () { 
		      var myChart = Highcharts.chart('container11', {
		      chart: {
		    	  backgroundColor: "#3C3C3C",
		          type: 'column'
		      },
		      title: {
		    	  style: {
		                color: 'white',
		             },
		          text: 'Meaning-oriented Activities (Eudemonic)'
		      },
		      xAxis: {
		          type: 'category'
		      },
		      yAxis: {
		      	min: 10,
		          max: 50,
		          endOnTick:false,
		          tickInterval:10,
		          title: {
		        	  style: {
		                    color: 'white'
		                },
		              text: ' '
		          },labels: {
		                style: {
		                    color: 'white'
		                }
		            },

		      },
		      legend: {
		          enabled: false
		      },
		      plotOptions: {
		          series: {
		              borderWidth: 0,
		              dataLabels: {
		                  enabled: true,
		                  format: '{point.y:.1f}'
		              }
		          }
		      },

		      tooltip: {
		          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		          pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
		      },

		      series: [{
		          name: 'Eudemonic',
		          colorByPoint: true,
		          data: $scope.edumonicbar
		      }]
		  });
		  });
	}).error(function(res) {

		console.log(res);
	})
												}
												//end of acitivity summary
												
											    };
												//end of user summary page display
												
												
												var resarray=JSON.parse($scope.userresponse[i].totalsum);
												//console.log(resarray);
												
												//s1q1
												if(resarray[0]==1 ){
													$scope.userresponse[i].s1q1 = "6";
												}
												else if(resarray[0]==2){
													$scope.userresponse[i].s1q1 = "5";
												}
												else if(resarray[0]==3){
													$scope.userresponse[i].s1q1 = "4";
												}
												else if(resarray[0]==4){
													$scope.userresponse[i].s1q1 = "3";
												}
												
												else if(resarray[0]==5){
													$scope.userresponse[i].s1q1 = "2";
												}
												else if(resarray[0]==6){
													$scope.userresponse[i].s1q1 = "1";
												}
												
												
												
												
												//$scope.userresponse[i].s1q1 = resarray[0];
												//$scope.userresponse[i].s1q2 = resarray[1];
												if(resarray[1]==1 ){
													$scope.userresponse[i].s1q2 = "1";
												}
												else if(resarray[1]==2){
													$scope.userresponse[i].s1q2 = "2";
												}
												else if(resarray[1]==3){
													$scope.userresponse[i].s1q2 = "3";
												}
												else if(resarray[1]==4){
													$scope.userresponse[i].s1q2 = "4";
												}
												
												else if(resarray[1]==5){
													$scope.userresponse[i].s1q2 = "5";
												}
												else if(resarray[1]==6){
													$scope.userresponse[i].s1q2 = "6";
												}
												
												//$scope.userresponse[i].s1q3 = resarray[2];
												if(resarray[2]==1 ){
													$scope.userresponse[i].s1q3 = "1";
												}
												else if(resarray[2]==2){
													$scope.userresponse[i].s1q3 = "2";
												}
												else if(resarray[2]==3){
													$scope.userresponse[i].s1q3 = "3";
												}
												else if(resarray[2]==4){
													$scope.userresponse[i].s1q3 = "4";
												}
												
												else if(resarray[2]==5){
													$scope.userresponse[i].s1q3 = "5";
												}
												else if(resarray[2]==6){
													$scope.userresponse[i].s1q3 = "6";
												}
												
												 if(resarray[3]==1 ){
													$scope.userresponse[i].s1q4 = "6";
												}
												else if(resarray[3]==2){
													$scope.userresponse[i].s1q4 = "5";
												}
												else if(resarray[3]==3){
													$scope.userresponse[i].s1q4 = "4";
												}
												else if(resarray[3]==4){
													$scope.userresponse[i].s1q4 = "3";
												}
												
												else if(resarray[3]==5){
													$scope.userresponse[i].s1q4 = "2";
												}
												else if(resarray[3]==6){
													$scope.userresponse[i].s1q4 = "1";
												}
												//$scope.userresponse[i].s1q4 = resarray[3];
												 
												//$scope.userresponse[i].s1q5 = resarray[4];
												 if(resarray[4]==1 ){
														$scope.userresponse[i].s1q5 = "1";
													}
													else if(resarray[4]==2){
														$scope.userresponse[i].s1q5 = "2";
													}
													else if(resarray[4]==3){
														$scope.userresponse[i].s1q5 = "3";
													}
													else if(resarray[4]==4){
														$scope.userresponse[i].s1q5 = "4";
													}
													
													else if(resarray[4]==5){
														$scope.userresponse[i].s1q5 = "5";
													}
													else if(resarray[4]==6){
														$scope.userresponse[i].s1q5 = "6";
													}
												 
												//$scope.userresponse[i].s1q6 = resarray[5];
												 if(resarray[5]==1 ){
														$scope.userresponse[i].s1q6 = "1";
													}
													else if(resarray[5]==2){
														$scope.userresponse[i].s1q6 = "2";
													}
													else if(resarray[5]==3){
														$scope.userresponse[i].s1q6 = "3";
													}
													else if(resarray[5]==4){
														$scope.userresponse[i].s1q6 = "4";
													}
													
													else if(resarray[5]==5){
														$scope.userresponse[i].s1q6 = "5";
													}
													else if(resarray[5]==6){
														$scope.userresponse[i].s1q6 = "6";
													}
												 
												//$scope.userresponse[i].s1q7 = resarray[6];
												 if(resarray[6]==1 ){
														$scope.userresponse[i].s1q7 = "1";
													}
													else if(resarray[6]==2){
														$scope.userresponse[i].s1q7 = "2";
													}
													else if(resarray[6]==3){
														$scope.userresponse[i].s1q7 = "3";
													}
													else if(resarray[6]==4){
														$scope.userresponse[i].s1q7 = "4";
													}
													
													else if(resarray[6]==5){
														$scope.userresponse[i].s1q7 = "5";
													}
													else if(resarray[6]==6){
														$scope.userresponse[i].s1q7 = "6";
													}
												
												//$scope.userresponse[i].s1q8 = resarray[7];
												if(resarray[7]==1 ){
													$scope.userresponse[i].s1q8 = "6";
												}
												else if(resarray[7]==2){
													$scope.userresponse[i].s1q8 = "5";
												}
												else if(resarray[7]==3){
													$scope.userresponse[i].s1q8 = "4";
												}
												else if(resarray[7]==4){
													$scope.userresponse[i].s1q8 = "3";
												}
												
												else if(resarray[7]==5){
													$scope.userresponse[i].s1q8 = "2";
												}
												else if(resarray[7]==6){
													$scope.userresponse[i].s1q8 = "1";
												}
												
												
												//$scope.userresponse[i].s1q9 = resarray[8];
												if(resarray[8]==1 ){
													$scope.userresponse[i].s1q9 = "1";
												}
												else if(resarray[8]==2){
													$scope.userresponse[i].s1q9 = "2";
												}
												else if(resarray[8]==3){
													$scope.userresponse[i].s1q9 = "3";
												}
												else if(resarray[8]==4){
													$scope.userresponse[i].s1q9 = "4";
												}
												
												else if(resarray[8]==5){
													$scope.userresponse[i].s1q9 = "5";
												}
												else if(resarray[8]==6){
													$scope.userresponse[i].s1q9 = "6";
												}
												
												//$scope.userresponse[i].s1q10 = resarray[9];
												if(resarray[9]==1 ){
													$scope.userresponse[i].s1q10 = "6";
												}
												else if(resarray[9]==2){
													$scope.userresponse[i].s1q10 = "5";
												}
												else if(resarray[9]==3){
													$scope.userresponse[i].s1q10 = "4";
												}
												else if(resarray[9]==4){
													$scope.userresponse[i].s1q10 = "3";
												}
												
												else if(resarray[9]==5){
													$scope.userresponse[i].s1q10 = "2";
												}
												else if(resarray[9]==6){
													$scope.userresponse[i].s1q10 = "1";
												}
												
												
												//$scope.userresponse[i].s1q11 = resarray[10];
												if(resarray[10]==1 ){
													$scope.userresponse[i].s1q11 = "6";
												}
												else if(resarray[10]==2){
													$scope.userresponse[i].s1q11 = "5";
												}
												else if(resarray[10]==3){
													$scope.userresponse[i].s1q11 = "4";
												}
												else if(resarray[10]==4){
													$scope.userresponse[i].s1q11 = "3";
												}
												
												else if(resarray[10]==5){
													$scope.userresponse[i].s1q11 = "2";
												}
												else if(resarray[10]==6){
													$scope.userresponse[i].s1q11 = "1";
												}
												
												
												//$scope.userresponse[i].s1q12 = resarray[11];
												if(resarray[11]==1 ){
													$scope.userresponse[i].s1q12 = "6";
												}
												else if(resarray[11]==2){
													$scope.userresponse[i].s1q12 = "5";
												}
												else if(resarray[11]==3){
													$scope.userresponse[i].s1q12 = "4";
												}
												else if(resarray[11]==4){
													$scope.userresponse[i].s1q12 = "3";
												}
												
												else if(resarray[11]==5){
													$scope.userresponse[i].s1q12 = "2";
												}
												else if(resarray[11]==6){
													$scope.userresponse[i].s1q12 = "1";
												}
												
												
												//$scope.userresponse[i].s1q13 = resarray[12];
												if(resarray[12]==1 ){
													$scope.userresponse[i].s1q13 = "1";
												}
												else if(resarray[12]==2){
													$scope.userresponse[i].s1q13 = "2";
												}
												else if(resarray[12]==3){
													$scope.userresponse[i].s1q13 = "3";
												}
												else if(resarray[12]==4){
													$scope.userresponse[i].s1q13 = "4";
												}
												
												else if(resarray[12]==5){
													$scope.userresponse[i].s1q13 = "5";
												}
												else if(resarray[12]==6){
													$scope.userresponse[i].s1q13 = "6";
												}
												
												
												//$scope.userresponse[i].s1q14 = resarray[13];
												if(resarray[13]==1 ){
													$scope.userresponse[i].s1q14 = "6";
												}
												else if(resarray[13]==2){
													$scope.userresponse[i].s1q14 = "5";
												}
												else if(resarray[13]==3){
													$scope.userresponse[i].s1q14 = "4";
												}
												else if(resarray[13]==4){
													$scope.userresponse[i].s1q14 = "3";
												}
												
												else if(resarray[13]==5){
													$scope.userresponse[i].s1q14 = "2";
												}
												else if(resarray[13]==6){
													$scope.userresponse[i].s1q14 = "1";
												}
												
												
												//$scope.userresponse[i].s1q15 = resarray[14];
												
												if(resarray[14]==1 ){
													$scope.userresponse[i].s1q15 = "1";
												}
												else if(resarray[14]==2){
													$scope.userresponse[i].s1q15 = "2";
												}
												else if(resarray[14]==3){
													$scope.userresponse[i].s1q15 = "3";
												}
												else if(resarray[14]==4){
													$scope.userresponse[i].s1q15 = "4";
												}
												
												else if(resarray[14]==5){
													$scope.userresponse[i].s1q15 = "5";
												}
												else if(resarray[14]==6){
													$scope.userresponse[i].s1q15 = "6";
												}
												
												//$scope.userresponse[i].s1q16= resarray[15];
												if(resarray[15]==1 ){
													$scope.userresponse[i].s1q16 = "1";
												}
												else if(resarray[15]==2){
													$scope.userresponse[i].s1q16 = "2";
												}
												else if(resarray[15]==3){
													$scope.userresponse[i].s1q16 = "3";
												}
												else if(resarray[15]==4){
													$scope.userresponse[i].s1q16 = "4";
												}
												
												else if(resarray[15]==5){
													$scope.userresponse[i].s1q16 = "5";
												}
												else if(resarray[15]==6){
													$scope.userresponse[i].s1q16 = "6";
												}
												
												
												//$scope.userresponse[i].s1q17= resarray[16];
												if(resarray[16]==1 ){
													$scope.userresponse[i].s1q17 = "1";
												}
												else if(resarray[16]==2){
													$scope.userresponse[i].s1q17 = "2";
												}
												else if(resarray[16]==3){
													$scope.userresponse[i].s1q17 = "3";
												}
												else if(resarray[16]==4){
													$scope.userresponse[i].s1q17 = "4";
												}
												
												else if(resarray[16]==5){
													$scope.userresponse[i].s1q17 = "5";
												}
												else if(resarray[16]==6){
													$scope.userresponse[i].s1q17 = "6";
												}
												
												
												//$scope.userresponse[i].s1q18= resarray[17];
												if(resarray[17]==1 ){
													$scope.userresponse[i].s1q18 = "1";
												}
												else if(resarray[17]==2){
													$scope.userresponse[i].s1q18 = "2";
												}
												else if(resarray[17]==3){
													$scope.userresponse[i].s1q18 = "3";
												}
												else if(resarray[17]==4){
													$scope.userresponse[i].s1q18 = "4";
												}
												
												else if(resarray[17]==5){
													$scope.userresponse[i].s1q18 = "5";
												}
												else if(resarray[17]==6){
													$scope.userresponse[i].s1q18 = "6";
												}
												
												
												
												//$scope.userresponse[i].s1q19= resarray[18];
												if(resarray[18]==1 ){
													$scope.userresponse[i].s1q19 = "6";
												}
												else if(resarray[18]==2){
													$scope.userresponse[i].s1q19 = "5";
												}
												else if(resarray[18]==3){
													$scope.userresponse[i].s1q19 = "4";
												}
												else if(resarray[18]==4){
													$scope.userresponse[i].s1q19 = "3";
												}
												
												else if(resarray[18]==5){
													$scope.userresponse[i].s1q19 = "2";
												}
												else if(resarray[18]==6){
													$scope.userresponse[i].s1q19 = "1";
												}
												//$scope.userresponse[i].s1q20= resarray[19];
												if(resarray[19]==1 ){
													$scope.userresponse[i].s1q20 = "6";
												}
												else if(resarray[19]==2){
													$scope.userresponse[i].s1q20 = "5";
												}
												else if(resarray[19]==3){
													$scope.userresponse[i].s1q20 = "4";
												}
												else if(resarray[19]==4){
													$scope.userresponse[i].s1q20 = "3";
												}
												
												else if(resarray[19]==5){
													$scope.userresponse[i].s1q20 = "2";
												}
												else if(resarray[19]==6){
													$scope.userresponse[i].s1q20 = "1";
												}
												
												//$scope.userresponse[i].s2q1 = resarray[20];
												if(resarray[20]==1 ){
													$scope.userresponse[i].s2q1 = "1";
												}
												else if(resarray[20]==2){
													$scope.userresponse[i].s2q1 = "2";
												}
												else if(resarray[20]==3){
													$scope.userresponse[i].s2q1 = "3";
												}
												else if(resarray[20]==4){
													$scope.userresponse[i].s2q1 = "4";
												}
												
												else if(resarray[20]==5){
													$scope.userresponse[i].s2q1 = "5";
												}
												else if(resarray[20]==6){
													$scope.userresponse[i].s2q1 = "6";
												}
												
												//$scope.userresponse[i].s2q2 = resarray[21];
												if(resarray[21]==1 ){
													$scope.userresponse[i].s2q2 = "1";
												}
												else if(resarray[21]==2){
													$scope.userresponse[i].s2q2 = "2";
												}
												else if(resarray[21]==3){
													$scope.userresponse[i].s2q2 = "3";
												}
												else if(resarray[21]==4){
													$scope.userresponse[i].s2q2 = "4";
												}
												
												else if(resarray[21]==5){
													$scope.userresponse[i].s2q2 = "5";
												}
												else if(resarray[21]==6){
													$scope.userresponse[i].s2q2 = "6";
												}
												
												
												//$scope.userresponse[i].s2q3 = resarray[22];
												if(resarray[22]==1 ){
													$scope.userresponse[i].s2q3 = "1";
												}
												else if(resarray[22]==2){
													$scope.userresponse[i].s2q3 = "2";
												}
												else if(resarray[22]==3){
													$scope.userresponse[i].s2q3 = "3";
												}
												else if(resarray[22]==4){
													$scope.userresponse[i].s2q3 = "4";
												}
												
												else if(resarray[22]==5){
													$scope.userresponse[i].s2q3 = "5";
												}
												else if(resarray[22]==6){
													$scope.userresponse[i].s2q3 = "6";
												}
												
												
												//$scope.userresponse[i].s2q4 = resarray[23];
												if(resarray[23]==1 ){
													$scope.userresponse[i].s2q4 = "1";
												}
												else if(resarray[23]==2){
													$scope.userresponse[i].s2q4 = "2";
												}
												else if(resarray[23]==3){
													$scope.userresponse[i].s2q4 = "3";
												}
												else if(resarray[23]==4){
													$scope.userresponse[i].s2q4 = "4";
												}
												
												else if(resarray[23]==5){
													$scope.userresponse[i].s2q4 = "5";
												}
												else if(resarray[23]==6){
													$scope.userresponse[i].s2q4 = "6";
												}
												
												//$scope.userresponse[i].s2q5 = resarray[24];
												if(resarray[24]==1 ){
													$scope.userresponse[i].s2q5 = "1";
												}
												else if(resarray[24]==2){
													$scope.userresponse[i].s2q5 = "2";
												}
												else if(resarray[24]==3){
													$scope.userresponse[i].s2q5 = "3";
												}
												else if(resarray[24]==4){
													$scope.userresponse[i].s2q5 = "4";
												}
												
												else if(resarray[24]==5){
													$scope.userresponse[i].s2q5 = "5";
												}
												else if(resarray[24]==6){
													$scope.userresponse[i].s2q5 = "6";
												}
												
												//$scope.userresponse[i].s2q6 = resarray[25];
												if(resarray[25]==1 ){
													$scope.userresponse[i].s2q6 = "1";
												}
												else if(resarray[25]==2){
													$scope.userresponse[i].s2q6 = "2";
												}
												else if(resarray[25]==3){
													$scope.userresponse[i].s2q6 = "3";
												}
												else if(resarray[25]==4){
													$scope.userresponse[i].s2q6 = "4";
												}
												
												else if(resarray[25]==5){
													$scope.userresponse[i].s2q6 = "5";
												}
												else if(resarray[25]==6){
													$scope.userresponse[i].s2q6 = "6";
												}
												
												//$scope.userresponse[i].s2q7 = resarray[26];
												if(resarray[26]==1 ){
													$scope.userresponse[i].s2q7 = "1";
												}
												else if(resarray[26]==2){
													$scope.userresponse[i].s2q7 = "2";
												}
												else if(resarray[26]==3){
													$scope.userresponse[i].s2q7 = "3";
												}
												else if(resarray[26]==4){
													$scope.userresponse[i].s2q7 = "4";
												}
												
												else if(resarray[26]==5){
													$scope.userresponse[i].s2q7 = "5";
												}
												else if(resarray[26]==6){
													$scope.userresponse[i].s2q7 = "6";
												}
												
												
												//$scope.userresponse[i].s2q8 = resarray[27];
												if(resarray[27]==1 ){
													$scope.userresponse[i].s2q8 = "1";
												}
												else if(resarray[27]==2){
													$scope.userresponse[i].s2q8 = "2";
												}
												else if(resarray[27]==3){
													$scope.userresponse[i].s2q8 = "3";
												}
												else if(resarray[27]==4){
													$scope.userresponse[i].s2q8 = "4";
												}
												
												else if(resarray[27]==5){
													$scope.userresponse[i].s2q8 = "5";
												}
												else if(resarray[27]==6){
													$scope.userresponse[i].s2q8 = "6";
												}
												
												
												//$scope.userresponse[i].s2q9 = resarray[28];
												if(resarray[28]==1 ){
													$scope.userresponse[i].s2q9 = "1";
												}
												else if(resarray[28]==2){
													$scope.userresponse[i].s2q9 = "2";
												}
												else if(resarray[28]==3){
													$scope.userresponse[i].s2q9 = "3";
												}
												else if(resarray[28]==4){
													$scope.userresponse[i].s2q9 = "4";
												}
												
												else if(resarray[28]==5){
													$scope.userresponse[i].s2q9 = "5";
												}
												else if(resarray[28]==6){
													$scope.userresponse[i].s2q9 = "6";
												}
												
												//$scope.userresponse[i].s2q10 = resarray[29];
												if(resarray[29]==1 ){
													$scope.userresponse[i].s2q10 = "1";
												}
												else if(resarray[29]==2){
													$scope.userresponse[i].s2q10 = "2";
												}
												else if(resarray[29]==3){
													$scope.userresponse[i].s2q10 = "3";
												}
												else if(resarray[29]==4){
													$scope.userresponse[i].s2q10 = "4";
												}
												
												else if(resarray[29]==5){
													$scope.userresponse[i].s2q10 = "5";
												}
												else if(resarray[29]==6){
													$scope.userresponse[i].s2q10 = "6";
												}
												
												
												//$scope.userresponse[i].s2q11 = resarray[30];
												if(resarray[30]==1 ){
													$scope.userresponse[i].s2q11 = "1";
												}
												else if(resarray[30]==2){
													$scope.userresponse[i].s2q11 = "2";
												}
												else if(resarray[30]==3){
													$scope.userresponse[i].s2q11 = "3";
												}
												else if(resarray[30]==4){
													$scope.userresponse[i].s2q11 = "4";
												}
												
												else if(resarray[30]==5){
													$scope.userresponse[i].s2q11 = "5";
												}
												else if(resarray[30]==6){
													$scope.userresponse[i].s2q11 = "6";
												}
												
												
												//$scope.userresponse[i].s2q12 = resarray[31];
												if(resarray[31]==1 ){
													$scope.userresponse[i].s2q12 = "1";
												}
												else if(resarray[31]==2){
													$scope.userresponse[i].s2q12 = "2";
												}
												else if(resarray[31]==3){
													$scope.userresponse[i].s2q12 = "3";
												}
												else if(resarray[31]==4){
													$scope.userresponse[i].s2q12 = "4";
												}
												
												else if(resarray[31]==5){
													$scope.userresponse[i].s2q12 = "5";
												}
												else if(resarray[31]==6){
													$scope.userresponse[i].s2q12 = "6";
												}
												
												
												//$scope.userresponse[i].s2q13 = resarray[32];
												
												if(resarray[32]==1 ){
													$scope.userresponse[i].s2q13 = "1";
												}
												else if(resarray[32]==2){
													$scope.userresponse[i].s2q13 = "2";
												}
												else if(resarray[32]==3){
													$scope.userresponse[i].s2q13 = "3";
												}
												else if(resarray[32]==4){
													$scope.userresponse[i].s2q13 = "4";
												}
												
												else if(resarray[32]==5){
													$scope.userresponse[i].s2q13 = "5";
												}
												else if(resarray[32]==6){
													$scope.userresponse[i].s2q13 = "6";
												}
												
												
												//$scope.userresponse[i].s2q14 = resarray[33];
												if(resarray[33]==1 ){
													$scope.userresponse[i].s2q14 = "1";
												}
												else if(resarray[33]==2){
													$scope.userresponse[i].s2q14 = "2";
												}
												else if(resarray[33]==3){
													$scope.userresponse[i].s2q14 = "3";
												}
												else if(resarray[33]==4){
													$scope.userresponse[i].s2q14 = "4";
												}
												
												else if(resarray[33]==5){
													$scope.userresponse[i].s2q14 = "5";
												}
												else if(resarray[33]==6){
													$scope.userresponse[i].s2q14 = "6";
												}
												
												
												//$scope.userresponse[i].s2q15 = resarray[34];
												if(resarray[34]==1 ){
													$scope.userresponse[i].s2q15 = "1";
												}
												else if(resarray[34]==2){
													$scope.userresponse[i].s2q15 = "2";
												}
												else if(resarray[34]==3){
													$scope.userresponse[i].s2q15 = "3";
												}
												else if(resarray[34]==4){
													$scope.userresponse[i].s2q15 = "4";
												}
												
												else if(resarray[34]==5){
													$scope.userresponse[i].s2q15 = "5";
												}
												else if(resarray[34]==6){
													$scope.userresponse[i].s2q15 = "6";
												}
												
												
												//$scope.userresponse[i].s2q16 = resarray[35];
												if(resarray[35]==1 ){
													$scope.userresponse[i].s2q16 = "1";
												}
												else if(resarray[35]==2){
													$scope.userresponse[i].s2q16 = "2";
												}
												else if(resarray[35]==3){
													$scope.userresponse[i].s2q16 = "3";
												}
												else if(resarray[35]==4){
													$scope.userresponse[i].s2q16 = "4";
												}
												
												else if(resarray[35]==5){
													$scope.userresponse[i].s2q16 = "5";
												}
												else if(resarray[35]==6){
													$scope.userresponse[i].s2q16 = "6";
												}
												
												
												
												//$scope.userresponse[i].s2q17= resarray[36];
												if(resarray[36]==1 ){
													$scope.userresponse[i].s2q17 = "1";
												}
												else if(resarray[36]==2){
													$scope.userresponse[i].s2q17 = "2";
												}
												else if(resarray[36]==3){
													$scope.userresponse[i].s2q17 = "3";
												}
												else if(resarray[36]==4){
													$scope.userresponse[i].s2q17 = "4";
												}
												
												else if(resarray[36]==5){
													$scope.userresponse[i].s2q17 = "5";
												}
												else if(resarray[36]==6){
													$scope.userresponse[i].s2q17 = "6";
												}
												
												
												//$scope.userresponse[i].s2q18 = resarray[37];
												if(resarray[37]==1 ){
													$scope.userresponse[i].s2q18 = "1";
												}
												else if(resarray[37]==2){
													$scope.userresponse[i].s2q18 = "2";
												}
												else if(resarray[37]==3){
													$scope.userresponse[i].s2q18 = "3";
												}
												else if(resarray[37]==4){
													$scope.userresponse[i].s2q18 = "4";
												}
												
												else if(resarray[37]==5){
													$scope.userresponse[i].s2q18 = "5";
												}
												else if(resarray[37]==6){
													$scope.userresponse[i].s2q18 = "6";
												}
												
												
												//$scope.userresponse[i].s2q19 = resarray[38];
												if(resarray[38]==1 ){
													$scope.userresponse[i].s2q19 = "1";
												}
												else if(resarray[38]==2){
													$scope.userresponse[i].s2q19 = "2";
												}
												else if(resarray[38]==3){
													$scope.userresponse[i].s2q19 = "3";
												}
												else if(resarray[38]==4){
													$scope.userresponse[i].s2q19 = "4";
												}
												
												else if(resarray[38]==5){
													$scope.userresponse[i].s2q19 = "5";
												}
												else if(resarray[38]==6){
													$scope.userresponse[i].s2q19 = "6";
												}
												
												
												//$scope.userresponse[i].s2q20 = resarray[39];
												if(resarray[39]==1 ){
													$scope.userresponse[i].s2q20 = "1";
												}
												else if(resarray[39]==2){
													$scope.userresponse[i].s2q20 = "2";
												}
												else if(resarray[39]==3){
													$scope.userresponse[i].s2q20 = "3";
												}
												else if(resarray[39]==4){
													$scope.userresponse[i].s2q20 = "4";
												}
												
												else if(resarray[39]==5){
													$scope.userresponse[i].s2q20 = "5";
												}
												else if(resarray[39]==6){
													$scope.userresponse[i].s2q20 = "6";
												}
												
												
												//$scope.userresponse[i].s2q21 = resarray[40];
												if(resarray[40]==1 ){
													$scope.userresponse[i].s2q21 = "1";
												}
												else if(resarray[40]==2){
													$scope.userresponse[i].s2q21 = "2";
												}
												else if(resarray[40]==3){
													$scope.userresponse[i].s2q21 = "3";
												}
												else if(resarray[40]==4){
													$scope.userresponse[i].s2q21 = "4";
												}
												
												else if(resarray[40]==5){
													$scope.userresponse[i].s2q21 = "5";
												}
												else if(resarray[40]==6){
													$scope.userresponse[i].s2q21 = "6";
												}
												
												
												//$scope.userresponse[i].s2q22 = resarray[41];
												if(resarray[41]==1 ){
													$scope.userresponse[i].s2q22 = "1";
												}
												else if(resarray[41]==2){
													$scope.userresponse[i].s2q22 = "2";
												}
												else if(resarray[41]==3){
													$scope.userresponse[i].s2q22 = "3";
												}
												else if(resarray[41]==4){
													$scope.userresponse[i].s2q22 = "4";
												}
												
												else if(resarray[41]==5){
													$scope.userresponse[i].s2q22 = "5";
												}
												else if(resarray[41]==6){
													$scope.userresponse[i].s2q22 = "6";
												}
												
												
												//$scope.userresponse[i].s2q23 = resarray[42];
												if(resarray[42]==1 ){
													$scope.userresponse[i].s2q23 = "1";
												}
												else if(resarray[42]==2){
													$scope.userresponse[i].s2q23 = "2";
												}
												else if(resarray[42]==3){
													$scope.userresponse[i].s2q23 = "3";
												}
												else if(resarray[42]==4){
													$scope.userresponse[i].s2q23 = "4";
												}
												
												else if(resarray[42]==5){
													$scope.userresponse[i].s2q23 = "5";
												}
												else if(resarray[42]==6){
													$scope.userresponse[i].s2q23 = "6";
												}
												
												
												//$scope.userresponse[i].s2q24 = resarray[43];
												if(resarray[43]==1 ){
													$scope.userresponse[i].s2q24 = "1";
												}
												else if(resarray[43]==2){
													$scope.userresponse[i].s2q24 = "2";
												}
												else if(resarray[43]==3){
													$scope.userresponse[i].s2q24 = "3";
												}
												else if(resarray[43]==4){
													$scope.userresponse[i].s2q24 = "4";
												}
												
												else if(resarray[43]==5){
													$scope.userresponse[i].s2q24 = "5";
												}
												else if(resarray[43]==6){
													$scope.userresponse[i].s2q24 = "6";
												}
												
												
												//$scope.userresponse[i].s2q25 = resarray[44];
												if(resarray[44]==1 ){
													$scope.userresponse[i].s2q25 = "1";
												}
												else if(resarray[44]==2){
													$scope.userresponse[i].s2q25 = "2";
												}
												else if(resarray[44]==3){
													$scope.userresponse[i].s2q25 = "3";
												}
												else if(resarray[44]==4){
													$scope.userresponse[i].s2q25 = "4";
												}
												
												else if(resarray[44]==5){
													$scope.userresponse[i].s2q25 = "5";
												}
												else if(resarray[44]==6){
													$scope.userresponse[i].s2q25 = "6";
												}
												
												
												//$scope.userresponse[i].s2q26 = resarray[45];
												if(resarray[45]==1 ){
													$scope.userresponse[i].s2q26 = "1";
												}
												else if(resarray[45]==2){
													$scope.userresponse[i].s2q26 = "2";
												}
												else if(resarray[45]==3){
													$scope.userresponse[i].s2q26 = "3";
												}
												else if(resarray[45]==4){
													$scope.userresponse[i].s2q26 = "4";
												}
												
												else if(resarray[45]==5){
													$scope.userresponse[i].s2q26 = "5";
												}
												else if(resarray[45]==6){
													$scope.userresponse[i].s2q26 = "6";
												}
												
												
												//$scope.userresponse[i].s3q1 = resarray[46];
												//$scope.userresponse[i].s3q1 = resarray[46];
												if(resarray[46]==1 ){
													$scope.userresponse[i].s3q1 = "6";
												}
												else if(resarray[46]==2){
													$scope.userresponse[i].s3q1 = "5";
												}
												else if(resarray[46]==3){
													$scope.userresponse[i].s3q1 = "4";
												}
												else if(resarray[46]==4){
													$scope.userresponse[i].s3q1 = "3";
												}
												
												else if(resarray[46]==5){
													$scope.userresponse[i].s3q1 = "2";
												}
												else if(resarray[46]==6){
													$scope.userresponse[i].s3q1 = "1";
												}
												
												
												
												
												//$scope.userresponse[i].s3q2 = resarray[47];
												if(resarray[47]==1 ){
													$scope.userresponse[i].s3q2 = "6";
												}
												else if(resarray[47]==2){
													$scope.userresponse[i].s3q2 = "5";
												}
												else if(resarray[47]==3){
													$scope.userresponse[i].s3q2 = "4";
												}
												else if(resarray[47]==4){
													$scope.userresponse[i].s3q2 = "3";
												}
												
												else if(resarray[47]==5){
													$scope.userresponse[i].s3q2 = "2";
												}
												else if(resarray[47]==6){
													$scope.userresponse[i].s3q2 = "1";
												}
												
												//$scope.userresponse[i].s3q3 = resarray[48];
												if(resarray[48]==1 ){
													$scope.userresponse[i].s3q3 = "1";
												}
												else if(resarray[48]==2){
													$scope.userresponse[i].s3q3 = "2";
												}
												else if(resarray[48]==3){
													$scope.userresponse[i].s3q3 = "3";
												}
												else if(resarray[48]==4){
													$scope.userresponse[i].s3q3 = "4";
												}
												
												else if(resarray[48]==5){
													$scope.userresponse[i].s3q3 = "5";
												}
												else if(resarray[48]==6){
													$scope.userresponse[i].s3q3 = "6";
												}
												
												
												//$scope.userresponse[i].s3q4 = resarray[49];
												if(resarray[49]==1 ){
													$scope.userresponse[i].s3q4 = "6";
												}
												else if(resarray[49]==2){
													$scope.userresponse[i].s3q4 = "5";
												}
												else if(resarray[49]==3){
													$scope.userresponse[i].s3q4 = "4";
												}
												else if(resarray[49]==4){
													$scope.userresponse[i].s3q4 = "3";
												}
												
												else if(resarray[49]==5){
													$scope.userresponse[i].s3q4 = "2";
												}
												else if(resarray[49]==6){
													$scope.userresponse[i].s3q4 = "1";
												}
												
												//$scope.userresponse[i].s3q5 = resarray[50];
												if(resarray[50]==1 ){
													$scope.userresponse[i].s3q5 = "6";
												}
												else if(resarray[50]==2){
													$scope.userresponse[i].s3q5 = "5";
												}
												else if(resarray[50]==3){
													$scope.userresponse[i].s3q5 = "4";
												}
												else if(resarray[50]==4){
													$scope.userresponse[i].s3q5 = "3";
												}
												
												else if(resarray[50]==5){
													$scope.userresponse[i].s3q5 = "2";
												}
												else if(resarray[50]==6){
													$scope.userresponse[i].s3q5 = "1";
												}
												
												//$scope.userresponse[i].s3q6 = resarray[51];
												if(resarray[51]==1 ){
													$scope.userresponse[i].s3q6 = "6";
												}
												else if(resarray[51]==2){
													$scope.userresponse[i].s3q6 = "5";
												}
												else if(resarray[51]==3){
													$scope.userresponse[i].s3q6 = "4";
												}
												else if(resarray[51]==4){
													$scope.userresponse[i].s3q6 = "3";
												}
												
												else if(resarray[51]==5){
													$scope.userresponse[i].s3q6 = "2";
												}
												else if(resarray[51]==6){
													$scope.userresponse[i].s3q6 = "1";
												}
												
												//$scope.userresponse[i].s3q7 = resarray[52];
												if(resarray[52]==1 ){
													$scope.userresponse[i].s3q7 = "6";
												}
												else if(resarray[52]==2){
													$scope.userresponse[i].s3q7 = "5";
												}
												else if(resarray[52]==3){
													$scope.userresponse[i].s3q7 = "4";
												}
												else if(resarray[52]==4){
													$scope.userresponse[i].s3q7 = "3";
												}
												
												else if(resarray[52]==5){
													$scope.userresponse[i].s3q7 = "2";
												}
												else if(resarray[52]==6){
													$scope.userresponse[i].s3q7 = "1";
												}
												
												//$scope.userresponse[i].s3q8 = resarray[53];
												if(resarray[53]==1 ){
													$scope.userresponse[i].s3q8 = "6";
												}
												else if(resarray[53]==2){
													$scope.userresponse[i].s3q8 = "5";
												}
												else if(resarray[53]==3){
													$scope.userresponse[i].s3q8 = "4";
												}
												else if(resarray[53]==4){
													$scope.userresponse[i].s3q8 = "3";
												}
												
												else if(resarray[53]==5){
													$scope.userresponse[i].s3q8 = "2";
												}
												else if(resarray[53]==6){
													$scope.userresponse[i].s3q8 = "1";
												}
												
												//$scope.userresponse[i].s3q9 = resarray[54];
												if(resarray[54]==1 ){
													$scope.userresponse[i].s3q9 = "6";
												}
												else if(resarray[54]==2){
													$scope.userresponse[i].s3q9 = "5";
												}
												else if(resarray[54]==3){
													$scope.userresponse[i].s3q9 = "4";
												}
												else if(resarray[54]==4){
													$scope.userresponse[i].s3q9 = "3";
												}
												
												else if(resarray[54]==5){
													$scope.userresponse[i].s3q9 = "2";
												}
												else if(resarray[54]==6){
													$scope.userresponse[i].s3q9 = "1";
												}
												
												//$scope.userresponse[i].s4q1 = resarray[55];
												if(resarray[55]==1 ){
													$scope.userresponse[i].s4q1 = "1";
												}
												else if(resarray[55]==2){
													$scope.userresponse[i].s4q1 = "2";
												}
												else if(resarray[55]==3){
													$scope.userresponse[i].s4q1 = "3";
												}
												else if(resarray[55]==4){
													$scope.userresponse[i].s4q1 = "4";
												}
												
												else if(resarray[55]==5){
													$scope.userresponse[i].s4q1 = "5";
												}
												
												
												
												//$scope.userresponse[i].s4q2 = resarray[56];
												if(resarray[56]==1 ){
													$scope.userresponse[i].s4q2 = "1";
												}
												else if(resarray[56]==2){
													$scope.userresponse[i].s4q2 = "2";
												}
												else if(resarray[56]==3){
													$scope.userresponse[i].s4q2 = "3";
												}
												else if(resarray[56]==4){
													$scope.userresponse[i].s4q2 = "4";
												}
												
												else if(resarray[56]==5){
													$scope.userresponse[i].s4q2 = "5";
												}
												
												
												//$scope.userresponse[i].s4q3 = resarray[57];
												if(resarray[57]==1 ){
													$scope.userresponse[i].s4q3 = "1";
												}
												else if(resarray[57]==2){
													$scope.userresponse[i].s4q3 = "2";
												}
												else if(resarray[57]==3){
													$scope.userresponse[i].s4q3 = "3";
												}
												else if(resarray[57]==4){
													$scope.userresponse[i].s4q3 = "4";
												}
												
												else if(resarray[57]==5){
													$scope.userresponse[i].s4q3 = "5";
												}
												
												
												
												//$scope.userresponse[i].s4q4 = resarray[58];
												if(resarray[58]==1 ){
													$scope.userresponse[i].s4q4 = "1";
												}
												else if(resarray[58]==2){
													$scope.userresponse[i].s4q4 = "2";
												}
												else if(resarray[58]==3){
													$scope.userresponse[i].s4q4 = "3";
												}
												else if(resarray[58]==4){
													$scope.userresponse[i].s4q4 = "4";
												}
												
												else if(resarray[58]==5){
													$scope.userresponse[i].s4q4 = "5";
												}
												
												
												//$scope.userresponse[i].s4q5 = resarray[59];
												if(resarray[59]==1 ){
													$scope.userresponse[i].s4q5 = "1";
												}
												else if(resarray[59]==2){
													$scope.userresponse[i].s4q5 = "2";
												}
												else if(resarray[59]==3){
													$scope.userresponse[i].s4q5 = "3";
												}
												else if(resarray[59]==4){
													$scope.userresponse[i].s4q5 = "4";
												}
												
												else if(resarray[59]==5){
													$scope.userresponse[i].s4q5 = "5";
												}
												
												
												//$scope.userresponse[i].s4q6 = resarray[60];
												if(resarray[60]==1 ){
													$scope.userresponse[i].s4q6 = "1";
												}
												else if(resarray[60]==2){
													$scope.userresponse[i].s4q6 = "2";
												}
												else if(resarray[60]==3){
													$scope.userresponse[i].s4q6 = "3";
												}
												else if(resarray[60]==4){
													$scope.userresponse[i].s4q6 = "4";
												}
												
												else if(resarray[60]==5){
													$scope.userresponse[i].s4q6 = "5";
												}
												
												
												//$scope.userresponse[i].s4q7 = resarray[61];
												if(resarray[61]==1 ){
													$scope.userresponse[i].s4q7 = "1";
												}
												else if(resarray[61]==2){
													$scope.userresponse[i].s4q7 = "2";
												}
												else if(resarray[61]==3){
													$scope.userresponse[i].s4q7 = "3";
												}
												else if(resarray[61]==4){
													$scope.userresponse[i].s4q7 = "4";
												}
												
												else if(resarray[61]==5){
													$scope.userresponse[i].s4q7 = "5";
												}
												
												
												//$scope.userresponse[i].s4q8 = resarray[62];
												if(resarray[62]==1 ){
													$scope.userresponse[i].s4q8 = "1";
												}
												else if(resarray[62]==2){
													$scope.userresponse[i].s4q8 = "2";
												}
												else if(resarray[62]==3){
													$scope.userresponse[i].s4q8 = "3";
												}
												else if(resarray[62]==4){
													$scope.userresponse[i].s4q8 = "4";
												}
												
												else if(resarray[62]==5){
													$scope.userresponse[i].s4q8 = "5";
												}
												
												
												
												//$scope.userresponse[i].s4q9 = resarray[63];
												//$scope.userresponse[i].s4q8 = resarray[62];
												if(resarray[63]==1 ){
													$scope.userresponse[i].s4q9 = "1";
												}
												else if(resarray[63]==2){
													$scope.userresponse[i].s4q9 = "2";
												}
												else if(resarray[63]==3){
													$scope.userresponse[i].s4q9 = "3";
												}
												else if(resarray[63]==4){
													$scope.userresponse[i].s4q9 = "4";
												}
												
												else if(resarray[63]==5){
													$scope.userresponse[i].s4q9 = "5";
												}
												
												
												
												//$scope.userresponse[i].s4q10 = resarray[64];
												if(resarray[64]==1 ){
													$scope.userresponse[i].s4q10 = "1";
												}
												else if(resarray[64]==2){
													$scope.userresponse[i].s4q10 = "2";
												}
												else if(resarray[64]==3){
													$scope.userresponse[i].s4q10 = "3";
												}
												else if(resarray[64]==4){
													$scope.userresponse[i].s4q10 = "4";
												}
												
												else if(resarray[64]==5){
													$scope.userresponse[i].s4q10 = "5";
												}
												
												
												
												//$scope.userresponse[i].s5q1 = resarray[65];
												if(resarray[65]==1 ){
													$scope.userresponse[i].s5q1 = "1";
												}
												else if(resarray[65]==2){
													$scope.userresponse[i].s5q1 = "2";
												}
												else if(resarray[65]==3){
													$scope.userresponse[i].s5q1 = "3";
												}
												else if(resarray[65]==4){
													$scope.userresponse[i].s5q1 = "4";
												}
												
												else if(resarray[65]==5){
													$scope.userresponse[i].s5q1 = "5";
												}
												
												
												//$scope.userresponse[i].s5q2 = resarray[66];
												if(resarray[66]==1 ){
													$scope.userresponse[i].s5q2 = "1";
												}
												else if(resarray[66]==2){
													$scope.userresponse[i].s5q2 = "2";
												}
												else if(resarray[66]==3){
													$scope.userresponse[i].s5q2 = "3";
												}
												else if(resarray[66]==4){
													$scope.userresponse[i].s5q2 = "4";
												}
												
												else if(resarray[66]==5){
													$scope.userresponse[i].s5q2 = "5";
												}
												
												//$scope.userresponse[i].s5q3 = resarray[67];
												if(resarray[67]==1 ){
													$scope.userresponse[i].s5q3 = "1";
												}
												else if(resarray[67]==2){
													$scope.userresponse[i].s5q3 = "2";
												}
												else if(resarray[67]==3){
													$scope.userresponse[i].s5q3 = "3";
												}
												else if(resarray[67]==4){
													$scope.userresponse[i].s5q3 = "4";
												}
												
												else if(resarray[67]==5){
													$scope.userresponse[i].s5q3 = "5";
												}
												
												
												//$scope.userresponse[i].s5q4 = resarray[68];
												if(resarray[68]==1 ){
													$scope.userresponse[i].s5q4 = "1";
												}
												else if(resarray[68]==2){
													$scope.userresponse[i].s5q4 = "2";
												}
												else if(resarray[68]==3){
													$scope.userresponse[i].s5q4 = "3";
												}
												else if(resarray[68]==4){
													$scope.userresponse[i].s5q4 = "4";
												}
												
												else if(resarray[68]==5){
													$scope.userresponse[i].s5q4 = "5";
												}
												
												
												//$scope.userresponse[i].s5q5 = resarray[69];
												
												if(resarray[69]==1 ){
													$scope.userresponse[i].s5q5 = "1";
												}
												else if(resarray[69]==2){
													$scope.userresponse[i].s5q5 = "2";
												}
												else if(resarray[69]==3){
													$scope.userresponse[i].s5q5 = "3";
												}
												else if(resarray[69]==4){
													$scope.userresponse[i].s5q5 = "4";
												}
												
												else if(resarray[69]==5){
													$scope.userresponse[i].s5q5 = "5";
												}
												
												//$scope.userresponse[i].s5q6 = resarray[70];
												if(resarray[70]==1 ){
													$scope.userresponse[i].s5q6 = "1";
												}
												else if(resarray[70]==2){
													$scope.userresponse[i].s5q6 = "2";
												}
												else if(resarray[70]==3){
													$scope.userresponse[i].s5q6 = "3";
												}
												else if(resarray[70]==4){
													$scope.userresponse[i].s5q6 = "4";
												}
												
												else if(resarray[70]==5){
													$scope.userresponse[i].s5q6 = "5";
												}
												
												
												//$scope.userresponse[i].s5q7 = resarray[71];
												if(resarray[71]==1 ){
													$scope.userresponse[i].s5q7 = "1";
												}
												else if(resarray[71]==2){
													$scope.userresponse[i].s5q7 = "2";
												}
												else if(resarray[71]==3){
													$scope.userresponse[i].s5q7 = "3";
												}
												else if(resarray[71]==4){
													$scope.userresponse[i].s5q7 = "4";
												}
												
												else if(resarray[71]==5){
													$scope.userresponse[i].s5q7 = "5";
												}
												
												
												//$scope.userresponse[i].s5q8 = resarray[72];
												if(resarray[72]==1 ){
													$scope.userresponse[i].s5q8 = "1";
												}
												else if(resarray[72]==2){
													$scope.userresponse[i].s5q8 = "2";
												}
												else if(resarray[72]==3){
													$scope.userresponse[i].s5q8 = "3";
												}
												else if(resarray[72]==4){
													$scope.userresponse[i].s5q8 = "4";
												}
												
												else if(resarray[72]==5){
													$scope.userresponse[i].s5q8 = "5";
												}
												
												//$scope.userresponse[i].s5q9 = resarray[73];
												if(resarray[73]==1 ){
													$scope.userresponse[i].s5q9 = "1";
												}
												else if(resarray[73]==2){
													$scope.userresponse[i].s5q9 = "2";
												}
												else if(resarray[73]==3){
													$scope.userresponse[i].s5q9 = "3";
												}
												else if(resarray[73]==4){
													$scope.userresponse[i].s5q9 = "4";
												}
												
												else if(resarray[73]==5){
													$scope.userresponse[i].s5q9 = "5";
												}
												
												
												//$scope.userresponse[i].s5q10 = resarray[74];
												if(resarray[74]==1 ){
													$scope.userresponse[i].s5q10 = "1";
												}
												else if(resarray[74]==2){
													$scope.userresponse[i].s5q10 = "2";
												}
												else if(resarray[74]==3){
													$scope.userresponse[i].s5q10 = "3";
												}
												else if(resarray[74]==4){
													$scope.userresponse[i].s5q10 = "4";
												}
												
												else if(resarray[74]==5){
													$scope.userresponse[i].s5q10 = "5";
												}
												
												
												//$scope.userresponse[i].s5q11 = resarray[75];
												if(resarray[75]==1 ){
													$scope.userresponse[i].s5q11 = "1";
												}
												else if(resarray[75]==2){
													$scope.userresponse[i].s5q11 = "2";
												}
												else if(resarray[75]==3){
													$scope.userresponse[i].s5q11 = "3";
												}
												else if(resarray[75]==4){
													$scope.userresponse[i].s5q11 = "4";
												}
												
												else if(resarray[75]==5){
													$scope.userresponse[i].s5q11 = "5";
												}
												
												
												//$scope.userresponse[i].s5q12 = resarray[76];
												if(resarray[76]==1 ){
													$scope.userresponse[i].s5q12 = "1";
												}
												else if(resarray[76]==2){
													$scope.userresponse[i].s5q12 = "2";
												}
												else if(resarray[76]==3){
													$scope.userresponse[i].s5q12 = "3";
												}
												else if(resarray[76]==4){
													$scope.userresponse[i].s5q12 = "4";
												}
												
												else if(resarray[76]==5){
													$scope.userresponse[i].s5q12 = "5";
												}
												
												
												//$scope.userresponse[i].s5q13 = resarray[77];
												if(resarray[77]==1 ){
													$scope.userresponse[i].s5q13 = "1";
												}
												else if(resarray[77]==2){
													$scope.userresponse[i].s5q13 = "2";
												}
												else if(resarray[77]==3){
													$scope.userresponse[i].s5q13 = "3";
												}
												else if(resarray[77]==4){
													$scope.userresponse[i].s5q13 = "4";
												}
												
												else if(resarray[77]==5){
													$scope.userresponse[i].s5q13 = "5";
												}
												
												//$scope.userresponse[i].s5q14 = resarray[78];
												if(resarray[78]==1 ){
													$scope.userresponse[i].s5q14 = "1";
												}
												else if(resarray[78]==2){
													$scope.userresponse[i].s5q14 = "2";
												}
												else if(resarray[78]==3){
													$scope.userresponse[i].s5q14 = "3";
												}
												else if(resarray[78]==4){
													$scope.userresponse[i].s5q14 = "4";
												}
												
												else if(resarray[78]==5){
													$scope.userresponse[i].s5q14 = "5";
												}
												
												
												//$scope.userresponse[i].s5q15 = resarray[79];
												if(resarray[79]==1 ){
													$scope.userresponse[i].s5q15 = "1";
												}
												else if(resarray[79]==2){
													$scope.userresponse[i].s5q15 = "2";
												}
												else if(resarray[79]==3){
													$scope.userresponse[i].s5q15 = "3";
												}
												else if(resarray[79]==4){
													$scope.userresponse[i].s5q15 = "4";
												}
												
												else if(resarray[79]==5){
													$scope.userresponse[i].s5q15 = "5";
												}
												
												
												//$scope.userresponse[i].s5q16= resarray[80];
												if(resarray[80]==1 ){
													$scope.userresponse[i].s5q16 = "1";
												}
												else if(resarray[80]==2){
													$scope.userresponse[i].s5q16 = "2";
												}
												else if(resarray[80]==3){
													$scope.userresponse[i].s5q16 = "3";
												}
												else if(resarray[80]==4){
													$scope.userresponse[i].s5q16 = "4";
												}
												
												else if(resarray[80]==5){
													$scope.userresponse[i].s5q16 = "5";
												}
												
												
												//$scope.userresponse[i].s5q17= resarray[81];
												if(resarray[81]==1 ){
													$scope.userresponse[i].s5q17 = "1";
												}
												else if(resarray[81]==2){
													$scope.userresponse[i].s5q17 = "2";
												}
												else if(resarray[81]==3){
													$scope.userresponse[i].s5q17 = "3";
												}
												else if(resarray[81]==4){
													$scope.userresponse[i].s5q17 = "4";
												}
												
												else if(resarray[81]==5){
													$scope.userresponse[i].s5q17 = "5";
												}
												
												
												
												//$scope.userresponse[i].s5q18= resarray[82];
												if(resarray[82]==1 ){
													$scope.userresponse[i].s5q18 = "1";
												}
												else if(resarray[82]==2){
													$scope.userresponse[i].s5q18 = "2";
												}
												else if(resarray[82]==3){
													$scope.userresponse[i].s5q18 = "3";
												}
												else if(resarray[82]==4){
													$scope.userresponse[i].s5q18 = "4";
												}
												
												else if(resarray[82]==5){
													$scope.userresponse[i].s5q18 = "5";
												}
												
												
												//$scope.userresponse[i].s5q19= resarray[83];
												if(resarray[83]==1 ){
													$scope.userresponse[i].s5q19 = "1";
												}
												else if(resarray[83]==2){
													$scope.userresponse[i].s5q19 = "2";
												}
												else if(resarray[83]==3){
													$scope.userresponse[i].s5q19 = "3";
												}
												else if(resarray[83]==4){
													$scope.userresponse[i].s5q19 = "4";
												}
												
												else if(resarray[83]==5){
													$scope.userresponse[i].s5q19 = "5";
												}
												
												
												//$scope.userresponse[i].s5q20= resarray[84];
												if(resarray[84]==1 ){
													$scope.userresponse[i].s5q20 = "1";
												}
												else if(resarray[84]==2){
													$scope.userresponse[i].s5q20 = "2";
												}
												else if(resarray[84]==3){
													$scope.userresponse[i].s5q20 = "3";
												}
												else if(resarray[84]==4){
													$scope.userresponse[i].s5q20 = "4";
												}
												
												else if(resarray[84]==5){
													$scope.userresponse[i].s5q20 = "5";
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
										Timestamp :$scope.userresponse[i].time,
										Section_attempt : $scope.userresponse[i].section_count,
										PWBQ1 : $scope.userresponse[i].s1q1,
										PWBQ2 : $scope.userresponse[i].s1q2,
										PWBQ3 : $scope.userresponse[i].s1q3,
										PWBQ4 : $scope.userresponse[i].s1q4,
										PWBQ5 : $scope.userresponse[i].s1q5,
										PWBQ6 : $scope.userresponse[i].s1q6,
										PWBQ7 : $scope.userresponse[i].s1q7,
										PWBQ8 : $scope.userresponse[i].s1q8,
										PWBQ9 : $scope.userresponse[i].s1q9,
										PWBQ10 : $scope.userresponse[i].s1q10,
										PWBQ11 : $scope.userresponse[i].s1q11,
										PWBQ12 : $scope.userresponse[i].s1q12,
										PWBQ13 : $scope.userresponse[i].s1q13,
										PWBQ14 : $scope.userresponse[i].s1q14,
										PWBQ15 : $scope.userresponse[i].s1q15,
										PWBQ16 : $scope.userresponse[i].s1q16,
										PWBQ17 : $scope.userresponse[i].s1q17,
										PWBQ18 : $scope.userresponse[i].s1q18,
										PWBQ19 : $scope.userresponse[i].s1q19,
										PWBQ20 : $scope.userresponse[i].s1q20,
										EWBQ1 : $scope.userresponse[i].s2q1,
										EWBQ2 : $scope.userresponse[i].s2q2,
										EWBQ3 : $scope.userresponse[i].s2q3,
										EWBQ4 : $scope.userresponse[i].s2q4,
										EWBQ5 : $scope.userresponse[i].s2q5,
										EWBQ6 : $scope.userresponse[i].s2q6,
										EWBQ7 : $scope.userresponse[i].s2q7,
										EWBQ8 : $scope.userresponse[i].s2q8,
										EWBQ9 : $scope.userresponse[i].s2q9,
										EWBQ10 : $scope.userresponse[i].s2q10,
										EWBQ11 : $scope.userresponse[i].s2q11,
										EWBQ12 : $scope.userresponse[i].s2q12,
										EWBQ13 : $scope.userresponse[i].s2q13,
										EWBQ14 : $scope.userresponse[i].s2q14,
										EWBQ15 : $scope.userresponse[i].s2q15,
										EWBQ16 : $scope.userresponse[i].s2q16,
										EWBQ17 : $scope.userresponse[i].s2q17,
										EWBQ18 : $scope.userresponse[i].s2q18,
										EWBQ19 : $scope.userresponse[i].s2q19,
										EWBQ20 : $scope.userresponse[i].s2q20,
										EWBQ21 : $scope.userresponse[i].s2q21,
										EWBQ22 : $scope.userresponse[i].s2q22,
										EWBQ23 : $scope.userresponse[i].s2q23,
										EWBQ24 : $scope.userresponse[i].s2q24,
										EWBQ25 : $scope.userresponse[i].s2q25,
										EWBQ26 : $scope.userresponse[i].s2q26,	
										SWBQ1 : $scope.userresponse[i].s3q1,
										SWBQ2 : $scope.userresponse[i].s3q2,
										SWBQ3 : $scope.userresponse[i].s3q3,
										SWBQ4 : $scope.userresponse[i].s3q4,
										SWBQ5 : $scope.userresponse[i].s3q5,
										SWBQ6 : $scope.userresponse[i].s3q6,
										SWBQ7 : $scope.userresponse[i].s3q7,
										SWBQ8 : $scope.userresponse[i].s3q8,
										SWBQ9 : $scope.userresponse[i].s3q9,								
										YDQ1 : $scope.userresponse[i].s4q1,
										YDQ2 : $scope.userresponse[i].s4q2,
										YDQ3 : $scope.userresponse[i].s4q3,
										YDQ4 : $scope.userresponse[i].s4q4,
										YDQ5 : $scope.userresponse[i].s4q5,
										YDQ6 : $scope.userresponse[i].s4q6,
										YDQ7 : $scope.userresponse[i].s4q7,
										YDQ8 : $scope.userresponse[i].s4q8,
										YDQ9 : $scope.userresponse[i].s4q9,
										YDQ10 : $scope.userresponse[i].s4q10,
										YAPQ1 : $scope.userresponse[i].s5q1,
										YAPQ2 : $scope.userresponse[i].s5q2,
										YAPQ3 : $scope.userresponse[i].s5q3,
										YAPQ4 : $scope.userresponse[i].s5q4,
										YAPQ5 : $scope.userresponse[i].s5q5,
										YAPQ6 : $scope.userresponse[i].s5q6,
										YAPQ7 : $scope.userresponse[i].s5q7,
										YAPQ8 : $scope.userresponse[i].s5q8,
										YAPQ9 : $scope.userresponse[i].s5q9,
										YAPQ10 : $scope.userresponse[i].s5q10,
										YAPQ11 : $scope.userresponse[i].s5q11,
										YAPQ12 : $scope.userresponse[i].s5q12,
										YAPQ13 : $scope.userresponse[i].s5q13,
										YAPQ14 : $scope.userresponse[i].s5q14,
										YAPQ15 : $scope.userresponse[i].s5q15,
										YAPQ16 : $scope.userresponse[i].s5q16,
										YAPQ17 : $scope.userresponse[i].s5q17,
										YAPQ18 : $scope.userresponse[i].s5q18,
										YAPQ19 : $scope.userresponse[i].s5q19,
										YAPQ20 : $scope.userresponse[i].s5q20
										
										/*TotalScore: $scope.userresponse[i].total*/
										

									})

						}

						alasql(
								'SELECT * INTO XLSX("userresponse.xlsx",{headers:true}) FROM ?',
								[ $scope.userresponses ]);

					}
					
					
					
					
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
											
											//console.log(res);
											

											/*var array = JSON.parse("["
													+ res[0].response + "]");*/
											
											
											$scope.userscore = res;
											//console.log(res);
											
											

											for ( var i in $scope.userscore) {
												var obj3 = [];
												 var obj3 = JSON.parse($scope.userscore[i].totalsum);
												// console.log(obj3);
												
												$scope.userscore[i].s1a = obj3[0];
												$scope.userscore[i].s1b = obj3[1];
												$scope.userscore[i].s1c = obj3[2];
												$scope.userscore[i].s1d = obj3[3];
												$scope.userscore[i].s1 = obj3[4];
												
												$scope.userscore[i].s2b = obj3[6];
												$scope.userscore[i].s2a = obj3[5];
												$scope.userscore[i].s2c = obj3[9];
												
												/*if(obj3[9]=="null") {
													$scope.userscore[i].s2c = "null";
												}
												
												else {
													$scope.userscore[i].s2c = obj3[9];
												}*/
												
													
												$scope.userscore[i].s3 = obj3[10];
												
												$scope.userscore[i].s4 = obj3[11];
												
												$scope.userscore[i].s5a = obj3[12];
												$scope.userscore[i].s5b = obj3[13];
												
												
												
												
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
										Timestamp : $scope.userscore[i].time,
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