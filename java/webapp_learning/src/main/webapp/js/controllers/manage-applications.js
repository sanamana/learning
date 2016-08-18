'use strict';

/* Controllers */

/**
 * Retrieve all Applications for management.
 */
function ManageApplicationsCtrl($scope, $rootScope, $http, $route, $location, applicationsService, 
        applicationDataService, localStorageService, $timeout, errorHandlingService) {
    applicationDataService.setRootData('manage-applications');
    
    $scope.includeUrl = 'partials/manage-applications.html';
    
    $scope.applications = applicationsService;
    
    updateApplicationsList();
    
    $scope.startNew = function() {
        $scope.newApplication = true;
        $scope.newApplicationName = undefined;
        $scope.newApplicationPlaceholder = "Enter Project Name Here";
    };
    
    $scope.cancelNew = function() {
        clearNewApplicationData();
    };
    
    $scope.saveNew = function() {
        $scope.newSpinner = true;
        // create new application
        $http({
            method : 'POST',
            url : '/maiweb/Application',
            data : {name : $scope.newApplicationName},
            headers : {
                'Content-Type' : 'text/plain;charset=UTF-8',
                'Authorization' : localStorageService.get('token'),
                'corpuser' : localStorageService.get('corpuser')
            }
        }).success(function(data, status, headers, config) {
            clearNewApplicationData();
            applicationsService.list.push(data);
            data.highlightChange = true;
            
            // turn off highlight afterward animation and scroll finished.
            $timeout(function() {
                data.highlightChange = false;
            }, 3000);
        }).error(function(data, status, headers, config) {
            $scope.newSpinner = false;
            updateApplicationsList();
            if(data != undefined) {
                $scope.newErrors = data.errors;
            } else {
                $scope.newErrors = "There was a problem creating Project. Please check with technical support.";
            }
            // scroll to top of screen to see errors.
            window.scrollTo(0, 0);
        });
    };
    
    $scope.startEdit = function(application) {
        application.editing = true;
        application.editApplicationName = application.name;
    };
    
    $scope.cancelEdit = function(application) {
        clearEditApplicationData(application);
    };
    
    $scope.saveEdit = function(application) {
        application.editSpinner = true;
        // update existing application
        $http({
            method : 'PUT',
            url : '/maiweb/Application/id/' + application.id,
            data : {'name' : application.editApplicationName},
            headers : {
                'Content-Type' : 'text/plain;charset=UTF-8',
                'Authorization' : localStorageService.get('token'),
                'corpuser' : localStorageService.get('corpuser')
            }
        }).success(function(data, status, headers, config) {
            clearEditApplicationData(application);
            var indexToEdit = findIndexById(application.id);
            applicationsService.list[indexToEdit] = data;
            data.highlightChange = true;
            
            // turn off highlight afterward animation and scroll finished.
            $timeout(function() {
                data.highlightChange = false;
            }, 3000);
        }).error(function(data, status, headers, config) {
            application.editSpinner = false;
            if(data != undefined) {
                $scope.editErrors = errorHandlingService.getErrors(data);
            } else {
                $scope.editErrors = "There was a problem saving Project. Please check with technical support.";
            }
            // scroll to top of screen to see errors.
            window.scrollTo(0, 0);
        });
    };
    
    $scope.deleteApplication = function(application) {
        application.deleteSpinner = true;
        $http({
            method : 'DELETE',
            url : '/maiweb/Application/id/' + application.id,
            headers: {
                'Authorization' : localStorageService.get('token'),
                'corpuser' : localStorageService.get('corpuser')
            }
        }).success(function(data, status, headers, config) {
            application.deleteSpinner = false;
            /**
            var indexToDelete = findIndexById(deleteId);
            applicationsService.list.splice(indexToDelete, 1);
            **/
            updateApplicationsList();
        }).error(function(data, status, headers, config) {
            application.deleteSpinner = false;
            updateApplicationsList();
            $scope.deleteErrors = errorHandlingService.getErrors(data);
            
            // scroll to top of screen to see errors.
            window.scrollTo(0, 0);
        });
    };
    
    function clearNewApplicationData() {
        $scope.newApplication = false;
        $scope.newApplicationName = undefined;
        $scope.newApplicationPlaceholder = undefined;
        $scope.newErrors = undefined;
        $scope.newSpinner = false;
    };
    
    function clearEditApplicationData(application) {
        application.editSpinner = false;
        application.editing = false;
        application.editApplicationName = undefined;
        $scope.editErrors = undefined;
    };
    
    function findIndexById(id) {
        for (var i = 0; i < applicationsService.list.length; i++) {
            var application = applicationsService.list[i];
            if (application.id == id) {
                return i;
            }
        }
        return undefined;
    }
    
    function updateApplicationsList() {
        // get applications.
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
    };
}