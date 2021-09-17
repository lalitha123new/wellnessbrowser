var app = angular.module("wellness",['rzModule', 'ui.bootstrap']);

app.controller("socialController",function($scope){


	$scope.slider_ticks_values = {
        value: 5,
        options: {
            ceil: 6,
            floor: 1,
            showTicksValues: true
        }
    };

    $scope.slider_ticks_values1 = {
        value: 5,
        options: {
            ceil: 6,
            floor: 1,
            showTicksValues: true
        }
    };

    $scope.socialSubmit = function(){

          console.log($scope.slider_ticks_values.value);

    }

  

    $scope.question = [{"lques":"I feel I am accepted by other people","rques":"I do not feel I am accepted by other people"},
                       {"lques":"I think the world is beoming a better place to live","rques":"I do not think the world is beoming a better place to live"},
                       {"lques":"I do not feel connected to the society","rques":"I feel connected to the society"},
                       {"lques":"I think the society has the potential for positive changes","rques":"I do not think the society has the potential for positive changes"},];





})