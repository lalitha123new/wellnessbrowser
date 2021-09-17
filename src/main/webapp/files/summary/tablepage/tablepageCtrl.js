angular.module('wellness',['ngCookies'])

.controller("tablepageController", function($scope,$http,globalServerName,$cookies,$filter){
	
	$scope.user_id = localStorage.getItem("userid");
	
	
	//link to home page
	$scope.homeclick = function(){
		
		window.location.href="../../../index.html";
		
	}
	
	//link to bulb image page
	 $scope.mypage = function(){
			
			window.location.href="../../../files/sections/sections.html";
			
		}
	 
	 //alert( globalServerName.getUrlName() +"Section/individualResponse?userid=" +$scope.user_id);
	 
	 //service url to get the latest score for each section 
	$http({
			url : globalServerName.getUrlName()
						+"Section/individualResponse?userid=" +$scope.user_id ,
				method : "GET",
				headers : {
					'Content-Type' : 'application/json'
				}
			}).success(function(res) {
				
						//console.log(res);
						var age = res[0].user_id;
						//console.log(age);
						for(var i in res){
							
						if(res[i].section_id == "S1"){
							
						console.log(res[i].totalsum);
						var array_s1 = JSON.parse("[" + res[0].totalsum + "]");
						//console.log(array_s1[0][0]);
						
						//overall score
						if( array_s1[0][4] < 74){
						//$scope.overall_low = array_s1[0][4];
						$('#row1_col1').addClass("red");
						}
						else if( array_s1[0][4] >=75 &&  array_s1[0][4] <= 101){
						//$scope.overall_avg = array_s1[0][4];
							$('#row1_col2').addClass("green");
					
						}
						else if( array_s1[0][4] >= 102 &&  array_s1[0][4] <= 120){
						//$scope.overall_high = array_s1[0][4];
							$('#row1_col3').addClass("blue");
						}
						
						//sense of mastery and competence
						if(array_s1[0][1] >=6 && array_s1[0][1] <= 19){
						//$scope.mc_low = array_s1[0][1];
						$('#row3_col1').addClass("red");
						}
						else if(array_s1[0][1] >=20 && array_s1[0][1] <= 30){
						//$scope.mc_avg = array_s1[0][1];
						$('#row3_col2').addClass("green");
						}
						else if(array_s1[0][1]>=31 && array_s1[0][1] <= 36){
						//$scope.mc_high = array_s1[0][1];
						$('#row3_col3').addClass("blue");
						}
						
						//positive relations score
						if(array_s1[0][2] >= 5 && array_s1[0][2] <= 16){
						//$scope.pr_low = array_s1[0][2];
						$('#row4_col1').addClass("red");
						
						}
						else if(array_s1[0][2] >= 17 && array_s1[0][2] <= 25){
						//$scope.pr_avg = array_s1[0][2];
						$('#row4_col2').addClass("green");
						}
						else if(array_s1[0][2] >= 26 && array_s1[0][2] <= 30){
						//$scope.pr_high = array_s1[0][2];
						$('#row4_col3').addClass("blue");
						}
						
						//self-acceptance score
						if(array_s1[0][0] >= 4 && array_s1[0][0] <= 15){
						//$scope.sa_low = array_s1[0][0];
						$('#row5_col1').addClass("red");
						}
						else if(array_s1[0][0] >= 16 && array_s1[0][0] <= 22){
						//$scope.sa_avg = array_s1[0][0];
						$('#row5_col2').addClass("green");
						}
						else if(array_s1[0][0] >= 23 && array_s1[0][0] <= 24){
						//$scope.sa_high = array_s1[0][0];
						$('#row5_col3').addClass("blue");
						}
						
						//engagement and growth score
						if(array_s1[0][3] >= 5 && array_s1[0][3] <=20){
						//$scope.eg_low = array_s1[0][3];
						$('#row6_col1').addClass("red");
						}
						else if(array_s1[0][3] >= 21 && array_s1[0][3] <= 28){
						//$scope.eg_avg= array_s1[0][3];
						$('#row6_col2').addClass("green");
						}
						else if(array_s1[0][3] >=29 && array_s1[0][3] <= 30){
						//$scope.eg_high = array_s1[0][3];
						$('#row6_col3').addClass("blue");
						}
						
						}
						
						else if(res[i].section_id == "S2"){
							var array_s2 = JSON.parse("[" + res[1].totalsum + "]");
							
							
							//console.log(array_s2[0]);
							
							if(age >= 18 && age <= 35){
								
							//positive effect score
							if(array_s2[0][1] >= 13 && array_s2[0][1] <= 32){
							//$scope.pa_low = array_s2[0][1];
							$('#row7_col1').addClass("red");
							}
							else if(array_s2[0][1] >= 33 && array_s2[0][1] <= 47){
							//$scope.pa_avg = array_s2[0][1];
							$('#row7_col2').addClass("green");
							}
							else if(array_s2[0][1] >= 48 && array_s2[0][1] <= 65){
							//$scope.pa_high = array_s2[0][1];
							$('#row7_col3').addClass("blue");
							}
							
							//negative score
							
							if(array_s2[0][0] >= 13 && array_s2[0][0] <= 22){
							//$scope.na_low = array_s2[0][0];
							//$('#row8_col1').addClass("red");
							$('#row8_col3').addClass("blue");
							}
							else if(array_s2[0][0] >= 23 && array_s2[0][0] <= 37){
							//$scope.na_avg = array_s2[0][0];
							$('#row8_col2').addClass("green");
							}
							else if(array_s2[0][0] >= 38 && array_s2[0][0] <= 65){
							//$scope.na_high = array_s2[0][0];
							//$('#row8_col3').addClass("blue");
							$('#row8_col1').addClass("red");
							}
							
							}
							else if(age > 35){
								
								//positive effect score
								if(array_s2[0][1] >= 13 && array_s2[0][1] <= 35){
								//$scope.pa_low = array_s2[0][1];
								$('#row7_col1').addClass("red");
								}
								else if(array_s2[0][1] >= 36 && array_s2[0][1] <= 50){
								//$scope.pa_avg = array_s2[0][1];
								$('#row7_col2').addClass("green");
								}
								else if(array_s2[0][1] >= 51 && array_s2[0][1] <= 65){
								//$scope.pa_high = array_s2[0][1];
								$('#row7_col3').addClass("blue");
								}
								
								//negative score
								
								if(array_s2[0][0] >= 13 && array_s2[0][0] <= 20){
								//$scope.na_low = array_s2[0][0];
								//$('#row8_col1').addClass("red");
								$('#row8_col3').addClass("blue");
								}
								else if(array_s2[0][0] >= 21 && array_s2[0][0] <= 31){
								//$scope.na_avg = array_s2[0][0];
								$('#row8_col2').addClass("green");
								}
								else if(array_s2[0][0] >= 32 && array_s2[0][0] <= 65){
								//$scope.na_high = array_s2[0][0];
								//$('#row8_col3').addClass("blue");
								$('#row8_col1').addClass("red");
								}
								
							}
							
							//positivity ratio
							if(array_s2[0][4] != null){
							
							//$scope.ratio_avg = array_s2[0][4];
							$('#row9_col2').addClass("green");
							
							}
							else
								$scope.ratio_avg = "Not yet calculated";
							
							}
						
						else if(res[i].section_id == "S3"){
							
							var array_s3 = JSON.parse("[" + res[2].totalsum + "]");
							//console.log(array_s3[0]);
							
							if(age >= 18 && age <= 35){
							
							//social well being score
							if(array_s3[0][0] >= 9 && array_s3[0][0] <= 33){
							//$scope.social_low = array_s3[0][0];
							$('#row10_col1').addClass("red");
							}
							else if(array_s3[0][0] >= 34 && array_s3[0][0] <= 43){
							//$scope.social_avg = array_s3[0][0];
							$('#row10_col2').addClass("green");
							}
							else if(array_s3[0][0] >= 44 && array_s3[0][0] <= 54){
							//$scope.social_high = array_s3[0][0];
							$('#row10_col3').addClass("blue");
							}
							}
							
							else if(age > 35) {
								
							if(array_s3[0][0] >= 9 && array_s3[0][0] <= 36){
							//$scope.social_low = array_s3[0][0];
							$('#row10_col1').addClass("red");
							}
							else if(array_s3[0][0] >= 37 && array_s3[0][0] <= 46){
							//$scope.social_avg = array_s3[0][0];
							$('#row10_col2').addClass("green");
							}
							else if(array_s3[0][0] >= 47 && array_s3[0][0] <= 50){
							//$scope.social_high = array_s3[0][0];
							$('#row10_col3').addClass("blue");
							}
								
							}
							
							}
						
						else if(res[i].section_id == "S4"){
							
							var array_s4 = JSON.parse("[" + res[3].totalsum + "]");
							//console.log(array_s4[0]);
							
							if(age >= 18 && age <= 35){
							
							if(array_s4[0][0] >= 10 && array_s4[0][0] <= 19){
							//$scope.distress_low = array_s4[0][0];
							//$('#row11_col1').addClass("red");
							$('#row11_col3').addClass("blue");
							}
							else if(array_s4[0][0] >= 20 && array_s4[0][0] <= 24){
							//$scope.distress_avg = array_s4[0][0];
							$('#row11_col2').addClass("green");
							}
							else if(array_s4[0][0] >= 25 && array_s4[0][0] <= 50){
							//$scope.distress_high = array_s4[0][0];
							//$('#row11_col3').addClass("blue");
							$('#row11_col1').addClass("red");
							}
							}
							else if(age > 35){
								
								if(array_s4[0][0] >= 10 && array_s4[0][0] <= 19){
									//$scope.distress_low = array_s4[0][0];
									//$('#row11_col1').addClass("red");
									$('#row11_col3').addClass("blue");
									}
									else if(array_s4[0][0] >= 20 && array_s4[0][0] <= 24){
									//$scope.distress_avg = array_s4[0][0];
									$('#row11_col2').addClass("green");
									}
									else if(array_s4[0][0] >= 25 && array_s4[0][0] <= 50){
									//$scope.distress_high = array_s4[0][0];
									//$('#row11_col3').addClass("blue");
									$('#row11_col1').addClass("red");
									}
								
								
							}
							
							}
						
						else if(res[i].section_id == "S5"){
							
							var array_s5 = JSON.parse("[" + res[4].totalsum + "]");
							console.log(array_s5[0]);
							
							//hedonic score
							
							if(age >= 18 && age <= 35){
								
							if(array_s5[0][0] >= 10 && array_s5[0][0] <= 16){
							//$scope.hedonic_low = array_s5[0][0];
							$('#row12_col1').addClass("red");
							}
							else if(array_s5[0][0] >= 17 && array_s5[0][0] <= 27){
							//$scope.hedonic_avg = array_s5[0][0];
							$('#row12_col2').addClass("green");
							}
							else if(array_s5[0][0] >= 28 && array_s5[0][0] <= 50){
							//$scope.hedonic_high = array_s5[0][0];
							//$('#row12_col3').addClass("blue");
							$('#row12_col1').addClass("red");
							}
							
							}
							
							else if(age > 35){
								
								if(array_s5[0][0] >= 10 && array_s5[0][0] <= 13){
									//$scope.hedonic_low = array_s5[0][0];
									$('#row12_col1').addClass("red");
									}
									else if(array_s5[0][0] >= 14 && array_s5[0][0] <= 22){
									//$scope.hedonic_avg = array_s5[0][0];
									$('#row12_col2').addClass("green");
									}
									else if(array_s5[0][0] >= 23 && array_s5[0][0] <= 50){
									//$scope.hedonic_high = array_s5[0][0];
									//$('#row12_col3').addClass("blue");
									$('#row12_col1').addClass("red");
									}
							}
							
							//eudemonic score
							if(array_s5[0][1] >= 10 && array_s5[0][1] <= 22){
							//$scope.eudemonic_low = array_s5[0][1];
							$('#row13_col1').addClass("red");
							}
							else if(array_s5[0][1] >= 23 && array_s5[0][1] <= 33){
							//$scope.eudemonic_avg = array_s5[0][1];
							$('#row13_col2').addClass("green");
							}
							else if(array_s5[0][1] >= 34 && array_s5[0][1] <= 50){
							//$scope.eudemonic_high = array_s5[0][1];
							$('#row13_col3').addClass("blue");
							}
							
								
							}
							
							
						
						
						}
						/*//console.log(res);
						var obj = res;
						// alert(res[0]['section_id']);
						var index = 0;
						// var inp=[];
						$scope.totalarrindScore = [];
						angular.forEach(obj, function(value, key) {
					    //console.log(obj[key]);
					    console.log(obj[totalsum]);
						var totalscore = value.total_score_sum;
						//console.log(totalscore);
						var sections_id = value.sections_id;
						$scope.totalarrindScore[key] = sections_id + '_'+ totalscore;
						
						index = index + 1;
 			});
				
 			console.log("console for new  "+$scope.totalarrindScore);*/
				
		
				

	}).error(function(res) {
		
		console.log("error block  "+res);
        alert("error block");
    
	})


	 
	

  });
