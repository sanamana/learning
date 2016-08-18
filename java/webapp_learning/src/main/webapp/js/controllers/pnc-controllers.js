'use strict';

/* Controllers */

/**
 * General controller for most pages. Gets actual url and modules.
 */
function PncCtrl($scope, $routeParams, $rootScope, moduleService, $http, 
        appProvisionService, applicationDataService, applicationsService,
        localStorageService, errorHandlingService) {
    applicationDataService.setRootData();
    
    $scope.module = 'pnc';
    $scope.page = $routeParams.page;
    
    // go to the list if there are appProvisions and it is the first pnc page.
    appProvisionService.getAppProvisions($rootScope.applicationId, function(data) {
        $scope.appProvisions = data.appProvisions;
        if($scope.page == undefined && $scope.appProvisions.length != 0) {
            $scope.moduleUrl = 'partials/modules/pnc/list.html';
        }
    }, function(data) {
        $scope.errors = errorHandlingService.getErrors(data);
    });
    
    // create actual url of page to include.
    if ($scope.page != undefined) {
        $scope.moduleUrl = 'partials/modules/pnc/' + $scope.page + '.html';
    } else {
        $scope.moduleUrl = 'partials/modules/pnc/welcome.html';
    }

    // get available modules
    moduleService.getModules(function(data) {
        $scope.modules = data.modules;
    }, function(data) {
        $scope.errors = errorHandlingService.getErrors(data);
    });
    
    // switch code to display text.
    $scope.environmentName = function(environmentCode) {
        if(environmentCode == 'qa') {
            return 'Testing/QA';
        } else {
            return 'Production';
        }
    };
    
    $scope.notificationSystemDisplay = function(notificationSystem) {
        if(notificationSystem == 'apns') {
            return 'iOS(APNS)';
        } else if(notificationSystem == 'gcm') {
            return 'Android(GCM)';
        }
    };
    
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

/**
 * Posts the new AppProvision to service.
 */
function PncAppProvisionFormCtrl($scope, $rootScope, $http, $location, localStorageService, fileReader, errorHandlingService) {
    
    $http({
        method : 'GET',
        url : '/maiweb/Environment',
        data : $scope.appProvision,
        headers : {
            'Content-Type' : 'text/plain;charset=UTF-8',
            'Authorization' : localStorageService.get('token'),
            'corpuser' : localStorageService.get('corpuser')
        }
    }).success(function(data, status, headers, config) {
        $scope.environmentText = $scope.getEnvironmentText(data.environment);
    }).error(function(data, status, headers, config) {
         
    });
    
    $http({
        method : 'GET',
        url : '/maiweb/Provider',
        headers : {
            'Content-Type' : 'text/plain;charset=UTF-8',
            'Authorization' : localStorageService.get('token'),
            'corpuser' : localStorageService.get('corpuser')
        }
    }).success(function(data, status, headers, config) {
        $scope.providers = data;
    }).error(function(data, status, headers, config) {
         
    });
    
    // switch code to display text.
    $scope.getEnvironmentText = function(environment) {
        if(environment != 'production') {
            return 'Testing/QA';
        } else {
            return 'Production';
        }
    };
    
    //an array of files selected
    $scope.file = undefined;
    $scope.fileContents;

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.file = args.file;
            getFile();
        });
    });
    
    function getFile() {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          $scope.appProvision.certFile = result;
                      });
    };

    $scope.appProvision = {};
    $scope.newSpinner = false;
    $scope.save = function() {
        $scope.newSpinner = true;
        $scope.appProvision.applicationId = $rootScope.applicationId;
        $http({
            method : 'POST',
            url : '/maiweb/AppProvision',
            data : $scope.appProvision,
            headers : {
                'Content-Type' : 'text/plain;charset=UTF-8',
                'Authorization' : localStorageService.get('token'),
                'corpuser' : localStorageService.get('corpuser')
            }
        }).success(function(data, status, headers, config) {
            $scope.newSpinner = false;
            $scope.page = 'base';
            $location.path('/modules/' + $rootScope.applicationName + "/" + $rootScope.applicationId + '/pnc/list');
        }).error(function(data, status, headers, config) {
            $scope.newSpinner = false;
            if(data != undefined) {
                $scope.errors = errorHandlingService.getErrors(data);
            } else {
                $scope.errors = "There was a problem creating AppProvision. Please check with technical support.";
            }
        });
    };
}

/**
 * Updates an AppProvision to the service when APNS credentials have changed.
 */
function PncAppProvisionUpdateCtrl($scope, $rootScope, $http, $location, localStorageService, fileReader, errorHandlingService) {
    

    //an array of files selected
    $scope.file = undefined;
    $scope.fileContents;

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.file = args.file;
            getFile();
        });
    });
    
    function getFile() {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          $scope.appProvision.certFile = result;
                      });
    };

    $scope.editSpinner = false;
    $scope.save = function() {
        $scope.editSpinner = true;
        $scope.errors=null;
        $scope.appProvision.applicationId = $rootScope.applicationId;
        $http({
            method : 'PUT',
            url : '/maiweb/AppProvision/id/' + $scope.appProvision.id,
            data : $scope.appProvision,
            headers : {
                'Content-Type' : 'text/plain;charset=UTF-8',
                'Authorization' : localStorageService.get('token'),
                'corpuser' : localStorageService.get('corpuser')
            }
        }).success(function(data, status, headers, config) {
            $scope.editSpinner = false;
            $scope.errors = undefined;
            $scope.appProvision = data;
            $scope.success = "You have updated the AppProvision successfully.";
            
            // remove file input value so that button is enabled when same file is uploaded again.
            $('input[type="file"]').val(null);
        }).error(function(data, status, headers, config) {
            $scope.editSpinner = false;
            $scope.success = undefined;
            if(data != undefined) {
                $scope.errors = errorHandlingService.getErrors(data);
            } else {
                $scope.errors = "There was a problem updating the AppProvision. Please check with technical support.";
            }
        });
    };
}

/**
 * Retrieve a specific AppProvision to show details.
 */
function PncAppProvisionCtrl($scope, $routeParams, $http, localStorageService, errorHandlingService) {
    var appProvisionId = $routeParams.id;
    $scope.loadSpinner = true;
    if (appProvisionId != undefined) {
        $http({
            method : 'GET',
            url : '/maiweb/AppProvision/id/' + appProvisionId,
            headers : {
                'Authorization' : localStorageService.get('token'),
                'corpuser' : localStorageService.get('corpuser')
            }
        }).success(function(data, status, headers, config) {
            $scope.appProvision = data;
            $scope.loadSpinner = false;
        }).error(function(data, status, headers, config) {
            $scope.errors = errorHandlingService.getErrors(data);
            $scope.loadSpinner = false;
        });
    }
    
    // return class based on status.
    $scope.statusClass = function(status) {
        if (status == "Ready") {
            return "label-success";
        } else {
            return "label-important";
        }
    };
    
    $scope.volumeEstimateDisplay = function(id) {
        if(id == '100') {
            return '1 - 100';
        } else if(id == '1k') {
            return '101 - 1000';
        } else if(id == '10k') {
            return '1001 - 10,000';
        } else if(id == '100k') {
            return '10,000 - 100,000';
        } else if(id == '1m') {
            return '100,000 - 1 million';
        } else {
            return 'billions and billions...';
        }
    };    
}

/**
 * Retrieve all AppProvisions to list in a table.
 */
function PncAppProvisionListCtrl($scope, $rootScope, $http, $route, $location, appProvisionService, errorHandlingService) {
    // get available appProvisions
    appProvisionService.getAppProvisions($rootScope.applicationId, function(data) {
        $scope.appProvisions = data.appProvisions;
    }, function(data) {
        $scope.errors = errorHandlingService.getErrors(data);
    });

    // return class based on status.
    $scope.rowClass = function(status) {
        if (status == "Ready") {
            return "success";
        } else {
            return "warning";
        }
    };

    // Show detail page for specific AppProvision.
    $scope.details = function(id) {
        $location.path('/modules/' + $rootScope.applicationName + '/' + $rootScope.applicationId + '/pnc/details/' + id);
    };
}

/**
 * Show report card of what has been completed in app provisioning.
 */
function PncAppProvisionReportCardCtrl($scope, $routeParams, $http, localStorageService, errorHandlingService) {
    var appProvisionId = $routeParams.id;
    $scope.appProvisionLoaded = false;
    $http({
        method : 'GET',
        url : '/maiweb/ReportCard/id/' + appProvisionId,
        headers : {
            'Authorization' : localStorageService.get('token'),
            'corpuser' : localStorageService.get('corpuser')
        }
    }).success(function(data, status, headers, config) {
        $scope.appProvision = data.appProvision;
        $scope.appProvisionErrors = data.appProvisionErrors;
        $scope.appProvisionLoaded = true;
        $scope.esamsChannelErrors = data.esamsErrors;
        $scope.esamsChannelResult = data.esamsResult;
        $scope.esamsChannelResultLoaded = true;
        $scope.mdnsViConfigErrors = data.mdnsViErrors;
        $scope.mdnsViConfigResult = data.mdnsViResult;
        $scope.mdnsViConfigResultLoaded = true;
    }).error(function(data, status, headers, config) {
        $scope.maiException = errorHandlingService.getErrors(data);
    });
}