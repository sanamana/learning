function ServiceTestCtrl($scope,$routeParams,$rootScope,$http, localStorageService, errorHandlingService) {
    applicationDataService.setRootData();
    
    $scope.module = 'service-test';
    $scope.moduleUrl = 'partials/modules/service-test.html';


    $http({
        method: 'GET', 
        url: '/maiweb/hello',
        headers : {
            'Authorization' : localStorageService.get('token'),
            'corpuser' : localStorageService.get('corpuser')
        }
    }).success(function(data, status, headers, config) {
        $scope.serviceTestData = data;
    }).error(function(data, status, headers, config) {
        $scope.errors = errorHandlingService.getErrors(data);
    });

}