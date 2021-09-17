angular.module('wellness',['ngCookies'])

.controller("summaryController", function($scope,$http,globalServerName,$cookies,$filter,$window){
	
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
				
			})

		
	}
	 $scope.mypage = function(){
			
			window.location.href="../../../files/sections/sections.html";
		}
	 
	 $http({
		 
		 url : globalServerName.getUrlName() + "Section/sectionresponce/S1/"+$scope.user_id,
			method : "GET",
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : $scope.token
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
		        	min: 4,
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
		        	min: 6,
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
		        	min: 5,
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
		        	min: 5,
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

		url : globalServerName.getUrlName() + "Section/sectionScore/"+$scope.user_id+"/S1",
		method : "GET",
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : $scope.token
		}

	}).success(function(res) {
		//console.log(res);	
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

	
	$scope.nextbutton = function(){
		
		window.location.href="../emotional/summary.html";
	
	}

	  

})