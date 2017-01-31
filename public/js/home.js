var app = angular.module('app', ['ngSanitize']);
app.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
app.controller('mainCtrl', function ($scope, $filter, $q, $http, $httpParamSerializer) {
$scope.test =  "<a href=\"https://maps.google.com/maps/contrib/103604256726242948850/photos\">Hula Bula Bar</a>";
  
  $scope.searchLoading = false;

  $scope.going = function(place){

    try {

      
    //ui control
    place.goingLoading = true;
    place.user_clicked = !place.user_clicked;
    if(place.user_clicked){
      place.my_place_count++;
    }
    else{
      place.my_place_count--;
    }

    // ui control end


      $http.post('/api/going',{
        place_id:place.place_id,
        address:place.formatted_address,
        name:place.name
      }).
        then(function (response) {
          place.goingLoading = false;
          // console.log(response);
          console.log(response.data);
          // console.log(response.status);
          // $scope.results = data;
        }).
        catch(function (err) {
          console.log(err);
          if(err.status == 302){
            window.location.href = '/login/auth/google';
          }
          
        });
        
       
    } catch (e) {

    }

  }

  $scope.search = function () {


    try {
      if ($scope.keywords && $scope.keywords.trim()) {

        $scope.searchLoading = true;

        $http.get('/api/restaurants?keywords='+$scope.keywords).
        success(function (data) {
          
          $scope.searchLoading = false;
          
          $scope.results = data;
        }).
        error(function (data) {
          console.log(data);
        });
      }
    } catch (e) {
      console.log(e);
    }

  }


});
