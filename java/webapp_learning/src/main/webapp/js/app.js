var app = angular.module('maiweb', ['LocalStorageModule', 'ui.bootstrap', 'ui.keypress']).
    config([ '$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl : 'partials/login.html'}).
        when('/projects', {
            templateUrl : 'partials/applications.html',
            controller : ApplicationsCtrl}).
        when('/admin/role/:page', {
            templateUrl : 'partials/admin.html',
            controller : ManageRolesCtrl}).
        when('/projects/manage', {
            templateUrl : 'partials/applications.html',
            controller : ManageApplicationsCtrl}).
        when('/projects/:applicationName/:applicationId', {
            templateUrl : 'partials/applications.html',
            controller : ApplicationsCtrl}).
        when('/modules/:applicationName/:applicationId', {
            templateUrl : 'partials/modules.html',
            controller : ModulesCtrl}).
        when('/modules/:applicationName/:applicationId/administration', {
            templateUrl : 'partials/modules.html',
            controller : AdministrationCtrl}).
        when('/modules/:applicationName/:applicationId/pnc', {
            templateUrl : 'partials/modules.html',
            controller : PncCtrl}).
        when('/modules/:applicationName/:applicationId/pnc/:page', {
            templateUrl : 'partials/modules.html',
            controller : PncCtrl}).
        when('/modules/:applicationName/:applicationId/pnc/:page/:id', {
            templateUrl : 'partials/modules.html',
            controller : PncCtrl}).
        when('/modules/:applicationName/:applicationId/service-test', {
            templateUrl : 'partials/modules.html',
            controller : ServiceTestCtrl}).
        when('/modules/:applicationName/:applicationId/:module', {
            templateUrl : 'partials/modules.html',
            controller : ModulesCtrl}).
        otherwise({
            redirectTo : '/projects'
    });
} ]);

app.service('moduleService', function($http, $rootScope, localStorageService) {
    return {
        getModules : function(successCallback, errorCallback) {
            $http({
                method : 'GET',
                url : '/maiweb/Module/appId/' + $rootScope.applicationId,
                headers : {
                    'Authorization' : localStorageService.get('token'),
                    'corpuser' : localStorageService.get('corpuser')
                }
            }).success(successCallback).error(errorCallback);
        }
    };
});

app.service('appProvisionService', function($http, localStorageService) {
    return {
        getAppProvisions : function(applicationId, successCallback, errorCallback) {
            $http({
                method : 'GET',
                url : '/maiweb/AppProvision/appId/' + applicationId,
                headers : {
                    'Authorization' : localStorageService.get('token'),
                    'corpuser' : localStorageService.get('corpuser')
                }
            }).success(successCallback).error(errorCallback);
        }
    };
});

app.service("applicationsService", function(){
    return {list: null};
});

app.service('applicationDataService', function($rootScope, $routeParams) {
    return {
        setRootData : function(applicationName) {
            
            if(applicationName == undefined) {
                $rootScope.applicationName = $routeParams.applicationName;
            } else {
                $rootScope.applicationName = applicationName;
            }
            $rootScope.applicationId = $routeParams.applicationId;
            
            if($rootScope.applicationName != undefined && $rootScope.applicationId != undefined &&
                    $rootScope.applicationName != '' && $rootScope.applicationId != '') {
                $rootScope.applicationLink = '#/projects/' + $rootScope.applicationName + '/' + $rootScope.applicationId;
            } else if ($rootScope.applicationName != undefined && $rootScope.applicationName != '') {
                $rootScope.applicationLink = '#/projects/' + $rootScope.applicationName;
            } else {
                $rootScope.applicationLink = '#/projects/';
            }
        }
    };
});

/*
Parses service response for error messages to display.
errorData.errors typically contains validation errors;
errorData.errorMessage.error contains errors from Exception
 */
app.service('errorHandlingService', function($rootScope, $routeParams) {
    return {
        getErrors : function(errorData) {
            if(errorData.errors != undefined) {
                return errorData.errors;
            } else {
                var errors = [];
                var maiErrors = errorData.errorMessage.error;
                for(var i = 0; i < maiErrors.length; i++) {
                    errors.push(maiErrors[i].message);
                }
                return errors;
            }
        }
    };
});

app.service('userDataService', function($rootScope, applicationsService, localStorageService) {
    return {
        clearUserData: function() {
            localStorageService.remove('token');
            localStorageService.remove('currentUser');
            localStorageService.remove('corpuser');
            localStorageService.remove('expiration');
            localStorageService.remove('isAdmin');

            $rootScope.currentUser = undefined;
            applicationsService.list = [];
        }
    };
});

app.factory('myHttpInterceptor', function ($q, $location, $rootScope, localStorageService, userDataService) {
    return function (promise) {
        return promise.then(function (response) {
            // success
            return response;
        }, function (response) {
            var path = $location.path;
            if(response.status == 401 && $location.path() != '/login') {
                userDataService.clearUserData();
                $location.path('/login');
                $rootScope.authErrors = ['You are not authenticated to use the site. Please login.'];
            }
            // do something on error
            return $q.reject(response);
        });
    };
});
app.config(function ($httpProvider) {
    $httpProvider.responseInterceptors.push('myHttpInterceptor');
});

app.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
});

app.directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});

app.directive('scrollIf', function() {
	return function(scope, element, attributes) {
		setTimeout(function() {
			if (scope.$eval(attributes.scrollIf)) {
				window.scrollTo(0, element[0].offsetTop - 100);
			}
		});
	};
});

app.directive('ngConfirmClick', [ function() {
	return {
		priority : 100,
		restrict : 'A',
		link : function(scope, element, attrs) {
			element.bind('click', function(e) {
				var message = attrs.ngConfirmClick;
				if (message && !confirm(message)) {
					e.stopImmediatePropagation();
					e.preventDefault();
				}
			});
		}
	};
} ]);

var NAME_REGEXP = /^[a-zA-Z]\w+$/;
app.directive('alphanumeric', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if(viewValue == null || viewValue == ''){
					return undefined;
				}
				if (NAME_REGEXP.test(viewValue)) {
					// it is valid
					ctrl.$setValidity('alphanumeric', true);
					return viewValue;
				} else {
					// it is invalid, return undefined (no model update)
					ctrl.$setValidity('alphanumeric', false);
					return undefined;
				}
			});
		}
	};
});

app.directive('uiValidateEquals', function() {

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            function validateEqual(myValue, otherValue) {
                if (myValue === otherValue) {
                    ctrl.$setValidity('equal', true);
                    return myValue;
                } else {
                    ctrl.$setValidity('equal', false);
                    return undefined;
                }
            }

            scope.$watch(attrs.uiValidateEquals, function(otherModelValue) {
                validateEqual(ctrl.$viewValue, otherModelValue);               
            });

            ctrl.$parsers.unshift(function(viewValue) {
                return validateEqual(viewValue, scope.$eval(attrs.uiValidateEquals));
            });

            ctrl.$formatters.unshift(function(modelValue) {
                return validateEqual(modelValue, scope.$eval(attrs.uiValidateEquals));                
            });
        }
    };
}); 

app.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }

    };
});

app.run(function ($rootScope, localStorageService) {
    // this is an exact copy of the MAI_MODULE database. If any
    // modules are added to the database, it needs to be added here as well.
    // Eventually we need to add codes to MAI_MODULE so we can use smaller strings
    // in the urls.
    var moduleList = {
//        "Administration":"administration",
//        "Dashboard":"dashboard",
//        "Push Composer":"push-composer",
        "Push Notification Config":"pnc"
    };
    
    $rootScope.getModuleCode = function(moduleName) {
        return moduleList[moduleName];
    };
    
    $rootScope.isAdmin = function() {
        if (localStorageService.get('isAdmin') === 'true') {
            return true;
        }
        return false;
    };

    $rootScope.isCorpUser = function() {
        if (localStorageService.get('corpuser') === 'true') {
            return true;
        }
        return false;
    };

    $rootScope.isSystemRole = function(rolename) {
        if ((rolename === 'ADMIN')
                || (rolename === 'USER')) {
            return true;
        }
        return false;
    };
    
    $rootScope.getApplicationTooltip = function(name) {
        // only return the name if it is larger than 21 characters and therefore shortened.
        if(name.length > 21) {
            return name;
        }
        
        // otherwise don't show tooltip.
        return "";
    };
    
    $rootScope.getPasswordPlaceholderName = function(notificationSystem) {
        if(notificationSystem == 'apns') {
            return "certificate";
        } else {
            return "auth";
        }
    };
});
