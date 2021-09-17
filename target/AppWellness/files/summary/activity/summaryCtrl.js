angular.module('wellness',['ngCookies'])

.controller("summaryController", function($scope,$http,globalServerName,$cookies,$filter){
	
	$scope.hedonic = "";
	$scope.eudemonic = "";
	$scope.age = "";
	$scope.token = localStorage.getItem("token");
	
	$scope.user_id = localStorage.getItem("userid");
	console.log($scope.user_id);
	
	if($scope.user_id == null){
		alert("Please login");
		window.location.href="../../../index.html";
	}
	
	$scope.homeclick = function(){
		
		window.location.href="../../../index.html";
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
				window.location.href="../../../index.html";
				
			})
			.error(function(res){
				
				console.log(res);
				
			})

		
	}
	 $scope.mypage = function(){
			
			window.location.href="../../../files/sections/sections.html";
		}
	
	$http({
	
	url : globalServerName.getUrlName() + "Section/sectionresponce/S5/"+$scope.user_id,
	method : "GET",
	headers : {
		'Content-Type' : 'application/json',
		'Authorization' : $scope.token
			
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

		url : globalServerName.getUrlName() + "Section/sectionScore/"+$scope.user_id+"/S5",
		method : "GET",
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : $scope.token
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
			
			url : globalServerName.getUrlName() + "user/getAge/" + $scope.user_id,
			method : "GET",
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : $scope.token
			}
		}).success(function(res){
			console.log(res);
			$scope.age = res;
			
			if($scope.age <= 35){
				
				angular.element(document).ready(function (event) {

		  

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
				      var myChart = Highcharts.chart('container', {
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
					
					angular.element(document).ready(function (event) {


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
					      var myChart = Highcharts.chart('container', {
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
		angular.element(document).ready(function (event) {
			


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
		      var myChart = Highcharts.chart('container2', {
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

	
$scope.backbutton = function(){
		
		window.location.href="../distress/summary.html";
	}

  $scope.nextbutton = function(){
	  
	  window.location.href="../feedback/feedback.html";
  }
})