'use strict';

/* Controllers */

function ApplicationsCtrl($scope, $routeParams, $rootScope, $http, $location,
        applicationsService, applicationDataService, localStorageService, errorHandlingService) {
    applicationDataService.setRootData();
    
    $rootScope.applicationsLink = function() {
        if($rootScope.applicationName != undefined && $rootScope.applicationId != undefined &&
                $rootScope.applicationName != '' && $rootScope.applicationId != '') {
            return '#/projects/' + $rootScope.applicationName + '/' + $rootScope.applicationId;
        }
        return '#/projects/';
    };
    
    
    if (localStorageService.get('application')) {
        $rootScope.applicationName = localStorageService.get('application').name;
        $rootScope.applicationId = localStorageService.get('application').id;
        // make sure the application exists.
        $http({
            method : 'GET',
            url : '/maiweb/Application/id/' + $rootScope.applicationId,
            headers : {
                'Authorization' : localStorageService.get('token'),
                'corpuser' : localStorageService.get('corpuser')
            }
        }).success(function(data, status, headers, config) {
            var path, app;

            app = localStorageService.get('application');

            if (!app) {
                app = {'name': $rootScope.applicationName,
                        'id': $rootScope.applicationId};
            }
            // in case the name changed, update it.
            $rootScope.applicationName = data.name;
            app.name = data.name;
            localStorageService.set('application', app);
            path = '/modules/' + $rootScope.applicationName + "/" + $rootScope.applicationId;

            if (app.module !== undefined) {
                path = path + '/' + app.module;
            }
            $location.path(path);
        }).error(function(data, status, headers, config) {
            // if the application is not valid, delete the local data and just show the general application page.
            $rootScope.applicationName = undefined;
            $rootScope.applicationId = undefined;
            localStorageService.remove('application');
        });
    }
    
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

function ModulesCtrl($scope, $routeParams, $rootScope, $http, 
        moduleService, applicationDataService, applicationsService, localStorageService, errorHandlingService) {
    applicationDataService.setRootData();
    
    $scope.module = $routeParams.module;
    if ($scope.module != undefined) {
        $scope.moduleUrl = 'partials/modules/' + $routeParams.module + '.html';
    }

    moduleService.getModules(function(data) {
        $scope.modules = data.modules;
    }, function(data) {
        $scope.errors = errorHandlingService.getErrors(data);
    });
    
    $scope.displayApplicationFlyout = false;
    $scope.applications = applicationsService;
    
    $scope.saveModule = function(moduleName) {
        var module = $rootScope.getModuleCode(moduleName);
        var app = localStorageService.get('application');
        app.module = module;
        localStorageService.set('application', app);
    };

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
    
    if($rootScope.applicationName != undefined && $rootScope.applicationId != undefined &&
            $rootScope.applicationName != '' && $rootScope.applicationId != '') {
        localStorageService.set('application', {
            'name': $rootScope.applicationName,
            'id': $rootScope.applicationId
        });
    } else if (localStorageService.get('application') !== undefined) {
        var app = localStorageService.get('application');
        var path = '/modules/' + $rootScope.applicationName + "/" + $rootScope.applicationId;
        $rootScope.applicationName = app.name;
        $rootScope.applicationId = app.id;

        if (app.module !== undefined) {
            path = path + '/' + app.module;
        }
        $location.path(path);
    }
}
