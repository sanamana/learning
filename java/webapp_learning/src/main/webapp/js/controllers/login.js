'use strict';

/* Controllers */

Date.prototype.addMinutes = function(minutes) {
    this.setMinutes(this.getMinutes()+minutes);
    return this;
};

function LoginCtrl($scope, $routeParams, $rootScope, $http, $location, localStorageService, userDataService) {
    $scope.username = undefined;
    $scope.password = undefined;
    $scope.corpuser = false;
    $scope.login = function() {
        $scope.errors = undefined;
        $http({method: 'POST', url: '/maiweb/Login',
            headers: {
                'Authorization':'IP', 
                'Content-Type' : 'application/json',
            },
            data: {username: $scope.username, password: $scope.password}
        }).success(function(data, status, headers, config){
            userDataService.clearUserData();
            localStorageService.add('token', data.token);
            localStorageService.add('currentUser', $scope.username);
            localStorageService.add('corpuser', data.corpuser);
            localStorageService.add('expiration', (new Date()).addMinutes(60*12));
            localStorageService.add('isAdmin', (data.hasAdminRole ? 'true' : 'false'));

            $scope.errors = [];
            $scope.password = undefined;
            $rootScope.currentUser = localStorageService.get('currentUser');
            $location.path('/projects');
            $rootScope.authErrors = undefined;
        }).error(function(data, status, headers, config){
            /* errorHandlingService is irrelevant here */
            $scope.errors = ["The username or password you entered is incorrect."];
        });
    };
}


function RegisterCtrl($scope, $routeParams, $rootScope, $http, $location, localStorageService, errorHandlingService) {
    $scope.register = function() {
    	$scope.success = undefined;
    	$scope.errors = undefined;
        $http({method: 'POST', url: '/maiweb/User',
            headers: {
                'Authorization': 'IP',
                'Content-Type' : 'application/json'
            },
            data: {
                username: $scope.user.username, password: $scope.user.password, firstName: $scope.user.firstname,
                lastName: $scope.user.lastname, emailAddress: $scope.user.emailAddress, corpuser: $scope.user.corpuser, 
                corpPassword: $scope.user.corpPassword
            }
        }).success(function(data, status, headers, config){
        	// TODO: add email in above (data) and below (cleanup) when allowed in schema.
            $scope.errors = undefined;
        	$scope.user.username = undefined;
        	$scope.user.password = undefined;
        	$scope.user.firstname = undefined;
        	$scope.user.lastname = undefined;
        	$scope.user.corpuser = false;
        	$scope.user.email = undefined;
        	$scope.success = "An account has been created for " + data.username
        		+ ". An email has been sent to the administrator to approve your account request.";
        }).error(function(data, status, headers, config){
            $scope.errors = errorHandlingService.getErrors(data);
        });
    };
    
    $scope.clearPasswords = function() {
        $scope.user.password = undefined;
        $scope.user.password2 = undefined;
        $scope.user.corpPassword = undefined;
    };
}