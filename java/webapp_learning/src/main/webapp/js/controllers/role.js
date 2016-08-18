	'use strict';

/* Controllers */

/**
 * Retrieve all Applications for management.
 */
function ManageRolesCtrl($scope, $routeParams, $rootScope, $http, $route, $location, applicationsService, 
        applicationDataService, localStorageService) {
	$scope.page = $routeParams.page;
	$scope.includeUrl = 'partials/modules/role/'+$scope.page+'.html';
	
}

function RoleListCtrl($scope, $routeParams, $rootScope, $http, $route, $location, applicationsService, 
        applicationDataService, localStorageService, errorHandlingService) {
	$scope.query = '';
	if($routeParams.q){
        $scope.query = $routeParams.q;
    }
	$scope.load = function(){
		$http({
	        method : 'GET',
	        url : '/maiweb/Role/?q='+$scope.query,
	        headers : {
	            'Content-Type' : 'text/plain;charset=UTF-8',
	            'Authorization' : localStorageService.get('token'),
	            'corpuser' : localStorageService.get('corpuser')
	        }
	    }).success(function(data, status, headers, config) {
	    	$scope.roles = data.roles;
	    }).error(function(data, status, headers, config) {
	        // if status is forbidden, don't show list and show error.
	        if(status == 403) {
	            $scope.errors = ["You do not have access to role management."];
	            $scope.hideContent = true;
	        } else {
    	        if(data != undefined && data.errors != undefined) {
    	            $scope.errors = errorHandlingService.getErrors(data);
    	        } else {
    	            $scope.errors = ["There was a problem getting Roles. Please check with technical support."];
    	        }
	        }
	    });
	};
	
	$scope.findRoles = function(){
		$location.search({q: $scope.query ? $scope.query : ""});
	};
	$scope.deleteRole = function(role){
		role.deleteSpinner = true;
		$http({
	        method : 'DELETE',
	        url : '/maiweb/Role/id/'+role.id,
	        headers : {
	            'Content-Type' : 'text/plain;charset=UTF-8',
	            'Authorization' : localStorageService.get('token'),
	            'corpuser' : localStorageService.get('corpuser')
	        }
	    }).success(function(data, status, headers, config) {
	        role.deleteSpinner = false;
	    	$scope.load();
	    	$scope.successMessage = [role.name+' was successfully deleted.'];
	    }).error(function(data, status, headers, config) {
	        role.deleteSpinner = false;
	        if(data != undefined) {
	            $scope.errors = errorHandlingService.getErrors(data);
	        } else {
	            $scope.errors = [{domain: "Service", message: "There was a problem deleting "+name +"."}];
	        }
	    });
	};
	
	$scope.load();
}

function RoleEditCtrl($scope, $routeParams, $rootScope, $http, $route, $location, applicationsService, 
        applicationDataService, localStorageService) {
	$scope.mode = $routeParams.id == undefined ? "new" : "edit";

	
	$scope.load = function(){
		$http({
	        method : 'GET',
	        url : '/maiweb/Role/id/'+$routeParams.id,
	        headers : {
	            'Content-Type' : 'text/plain;charset=UTF-8',
	            'Authorization' : localStorageService.get('token'),
	            'corpuser' : localStorageService.get('corpuser')
	        }
	    }).success(function(data, status, headers, config) {
	    	$scope.role = data;
	    	$scope.loadApplications();
	    	$scope.loadAllUsers();
	    	$scope.loadUsers();
	    	if($routeParams.saved){
				$scope.success = "Role "+$scope.role.name+" was successfully saved.";
			}
	    }).error(function(data, status, headers, config) {
	        $scope.newSpinner = false;
	        if(data != undefined) {
	            $scope.newErrors = data.errors;
	        } else {
	            $scope.newErrors = [{domain: "Service", message: "There was a problem getting role. Please check with technical support."}];
	        }
	    });
	};
	
	$scope.loadApplications = function(){
		$http({
	        method : 'GET',
	        url : '/maiweb/Application',
	        headers : {
	            'Authorization' : localStorageService.get('token'),
	            'corpuser' : localStorageService.get('corpuser')
	        }
	    }).success(function(data, status, headers, config) {
	    	$scope.applicationSet = data.applications;
	    }).error(function(data, status, headers, config) {
	        if(data.errors != undefined) {
	            $scope.newErrors = data.errors;
	        } else {
	            $scope.newErrors = [{domain: "Service", message: "There was a problem loading application. Please check with technical support."}];
	        }
	    });
	};
	
	$scope.switchInputApplication = function(application) {
        $scope.applicationName = application.name;
    };
	
	$scope.addApplication = function(){
		if($scope.role.applications == undefined){
			$scope.role.applications = [];
		}
		var inApplicationSet = false;
		for(var i=0; i<$scope.applicationSet.length; i++){
			if($scope.applicationSet[i].name == $scope.applicationName){
			    inApplicationSet = true;
				
			    // check if it already exists in the roles applications
			    var found = contains($scope.role.applications, 'name', $scope.applicationName);
				
				if(!found){
					$scope.role.applications.push($scope.applicationSet[i]);
					$scope.applicationName = undefined;
					$scope.newErrors = undefined;
					break;
				}
			}
		}
		if(!inApplicationSet) {
		    $scope.newErrors = ["Application " + $scope.applicationName + " doesn't exist in the system"];
		}
	};
	
	function contains(list, propertyName, toCompare) {
	    var found = false;
	    for(var j=0; j<list.length; j++){
            if(list[j][propertyName] == toCompare){
                found = true;
                break;
            }
        }
	    return found;
	}
	
	$scope.remove = function(data, object){
	    data.splice(data.indexOf(object), 1);
	    if (data.length == 0) {
	    	data = undefined;
	    }
	};
	
	$scope.removeValue = function(data, field, index){
	    data[field].splice(index, 1);
	    if (data[field].length == 0) {
	        data[field] = undefined;
	    }
	};
	
	$scope.saveRole = function(){
	    $scope.saveSpinner = true;
		$http({
	        method : $scope.mode == 'edit' ? 'PUT' : 'POST',
	        url : $scope.mode == 'edit' ? '/maiweb/Role/id/'+$scope.role.id : '/maiweb/Role',
	        data : $scope.role,
	        headers : {
	            'Content-Type' : 'text/plain;charset=UTF-8',
	            'Authorization' : localStorageService.get('token'),
	            'corpuser' : localStorageService.get('corpuser')
	        }
	    }).success(function(data, status, headers, config) {
	        $scope.saveSpinner = false;
	    	if($scope.mode == 'new'){
	    		$location.path("admin/role/edit").search({id: data.id, saved: true});
	    		$location.replace();
	    	}
	    	$scope.success = "Role "+$scope.role.name+" was successfully saved.";
            $scope.clearSavedUsersMessage();
            $scope.updateSavedUsersMessage();
	    	$scope.newErrors = undefined;
	    }).error(function(data, status, headers, config) {
	        $scope.saveSpinner = false;
            $scope.clearSavedUsersMessage();
            $scope.success = '';
	        if(data != undefined) {
	            $scope.newErrors = data.errors;
	        } else {
	            $scope.newErrors = [{domain: "Service", message: "There was a problem getting Roles. Please check with technical support."}];
	        }
	    });
	};
	
	if($scope.mode == 'edit'){
		$scope.load();
	}else{
		$scope.role = {name:"", applications:[]};
    	$scope.loadApplications();
	}
	
	$scope.loadUsers = function(){
		$http({
	        method : 'GET',
	        url : '/maiweb/Role/id/'+$routeParams.id+"/users",
	        headers : {'Authorization' : localStorageService.get('token'),
	            'corpuser' : localStorageService.get('corpuser')}
	    }).success(function(data, status, headers, config) {
	    	$scope.users = data.users;
	    	$scope.addUserString($scope.users);
	    }).error(function(data, status, headers, config) {
	        if(data.errors != undefined) {
	            $scope.newErrors = data.errors;
	        } else {
	            $scope.newErrors = [{domain: "Service", message: "There was a problem loading users. Please check with technical support."}];
	        }
	    });
	};
	
	$scope.loadAllUsers = function(){
        $http({
            method : 'GET',
            url : '/maiweb/User',
            headers : {
                'Authorization' : localStorageService.get('token'),
                'corpuser' : localStorageService.get('corpuser')
            }
        }).success(function(data, status, headers, config) {
            $scope.userSet = data.users;
            $scope.addUserString(data.users);
            $scope.availableUsers = $scope.getAvailableUsers($scope.userSet);
        }).error(function(data, status, headers, config) {
            if(data.errors != undefined) {
                $scope.newErrors = data.errors;
            } else {
                $scope.newErrors = [{domain: "Service", message: "There was a problem loading application. Please check with technical support."}];
            }
        });
    };
    
    $scope.getAvailableUsers = function(userSet) {
        if($scope.role.name == 'ADMIN') {
            var userSetWithoutNonCorps = [];
            for(var i = 0; i < userSet.length; i++) {
                if(userSet[i].corpuser) {
                    userSetWithoutNonCorps.push(userSet[i]);
                }
            }
            return userSetWithoutNonCorps;
        }
        
        return userSet;
    };
    
    $scope.addUserString = function(userSet) {
        for(var i = 0; i < userSet.length; i++) {
            var user = userSet[i];
            user.printString = $scope.getUserString(user);
        }
    };
    
    $scope.switchInputUser = function(user) {
        $scope.username = user.printString;
    };
	
    $scope.addUser = function(){
        if($scope.users == undefined){
            $scope.users = [];
        }
        var inUserSet = false;
        
        var endOfUsername = $scope.username.indexOf('(');
        if(endOfUsername == -1) {endOfUsername = $scope.username.length;}
        var username = $scope.username.substring(0, endOfUsername).trim();
        for(var i=0; i<$scope.userSet.length; i++){
            // check if it already exists in the roles applications
            if($scope.userSet[i].username == username){
                inUserSet = true;
                
                
                var found = contains($scope.users, 'username', username);
                
                if(!found){
                    $scope.users.push($scope.userSet[i]);
                    $scope.username = undefined;
                    $scope.userErrors = undefined;
                    break;
                }
            }
        }
        if(!inUserSet) {
            $scope.userErrors = ["User " + $scope.username + " doesn't exist in the system"];
        }
    };
	
	$scope.saveUsers = function(){
	    $scope.saveUsersSpinner = true;
		$http({
	        method : 'POST',
	        url : '/maiweb/Role/id/'+$scope.role.id+'/users',
	        data : $scope.users,
	        headers : {
	            'Content-Type' : 'text/plain;charset=UTF-8',
	            'Authorization' : localStorageService.get('token'),
                'corpuser' : localStorageService.get('corpuser')
	        }
	    }).success(function(data, status, headers, config) {
	        $scope.saveUsersSpinner = false;
            $scope.clearSavedUsersMessage();
            $scope.savedSomeUsers = true;
            // if there was a partial save, show the partial message.
            if(status == 202) {
                $scope.userPartialSuccess = data.message;
                $scope.loadUsers();
                $scope.userSuccess = undefined;
            } else {
                $scope.updateSavedUsersMessage();
            }
	    }).error(function(data, status, headers, config) {
	        $scope.saveUsersSpinner = false;
            $scope.clearSavedUsersMessage();
	        $scope.userSuccess = undefined;
	        if(data != undefined) {
	            $scope.userErrors = data.errors;
	        } else {
	            $scope.userErrors = [{domain: "Service", message: "There was a problem saving users. Please check with technical support."}];
	        }
	    });
	};

    $scope.updateSavedUsersMessage = function() {
        if ($scope.savedSomeUsers) {
            $scope.userSuccess = "Users saved to "+$scope.role.name;
        }
    };

    $scope.clearSavedUsersMessage = function() {
        $scope.userSuccess = '';
        $scope.userErrors = undefined;
    };
    
    $scope.getUserString = function(user) {
        if(user != undefined) {
            var userString = user.username + " (" + user.firstName + " " + user.lastName + ")";
            if(user.corpuser) {
                userString += "[c]";
            }
            return userString;
        }
    };
    
    $scope.matchUserFields = function(user) {
        if (user.username.indexOf($scope.username) != -1 || user.firstName.indexOf($scope.username)!=-1) {
            return true;
        }
        return false;
    }
}