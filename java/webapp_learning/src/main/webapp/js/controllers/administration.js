'use strict';

/* Controllers */

function AdministrationCtrl($scope, $routeParams, $rootScope, $http, 
        moduleService, applicationDataService, applicationsService,
        localStorageService, errorHandlingService) {
    applicationDataService.setRootData();
    
    $scope.module = 'administration';
    $scope.moduleUrl = 'partials/modules/administration.html';
    
    moduleService.getModules(function(data) {
        $scope.modules = data.modules;
    }, function(data) {
        $scope.errors = errorHandlingService.getErrors(data);
    });

    $http({
        method : 'GET',
        url : '/maiweb/User',
        headers : {
            'Authorization' : localStorageService.get('token'),
            'corpuser' : localStorageService.get('corpuser')
        }
    }).success(function(data, status, headers, config) {
        $scope.users = data.users;
    }).error(function(data, status, headers, config) {
        $scope.errors = errorHandlingService.getErrors(data);
    });
    
    $scope.applications = applicationsService;
    
    $http({
        method : 'GET',
        url : '/maiweb/Application',
        headers : {
            'Authorization' : localStorageService.get('token'),
            'corpuser' : localStorageService.get('corpuser')
        }
    }).success(function(data, status, headers, config) {
        applicationsService.list = data.applications;
    }).error(function(data, status, headers, config) {
            $scope.errors = errorHandlingService.getErrors(data);
    });
}