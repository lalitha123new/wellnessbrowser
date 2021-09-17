angular.module('wellness',['ngCookies'])

.controller("summaryController", function($scope,$http,globalServerName,$cookies,$filter){

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
				
			})

		
	}
	 $scope.mypage = function(){
			
			window.location.href="../../../files/sections/sections.html";
		}
	 
	 
	$scope.nextbutton = function(){
		
		window.location.href="../social/summary.html";
	}
	
    $scope.backbutton = function(){
		
		window.location.href="../psychological/summary.html";
	}


$http({
	
	url : globalServerName.getUrlName() + "Section/sectionresponce/S2/"+$scope.user_id,
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

	url : globalServerName.getUrlName() + "Section/sectionScore/"+$scope.user_id+"/S2",
	method : "GET",
	headers : {
		'Content-Type' : 'application/json',
		'Authorization' : $scope.token
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
			
		    if($scope.totalratio >= 1.70){
		    	
		    	$scope.prhigh = true;
		    	
		    }else if(($scope.totalratio >= 0.65) && ($scope.totalratio <= 1.69)){
		    	
		    	$scope.praverage = true;
		    	
		    }else if($scope.totalratio <= 0.64){
			
			$scope.prlow = true;
			
		     }
			
			
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
		        var myChart = Highcharts.chart('container', {
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
		        var myChart = Highcharts.chart('container2', {
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
		        var myChart = Highcharts.chart('container', {
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
		        var myChart = Highcharts.chart('container2', {
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

})