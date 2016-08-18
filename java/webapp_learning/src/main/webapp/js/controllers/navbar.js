'use strict';

/* Controllers */

function NavBarCtrl($scope, $rootScope, $location, localStorageService, applicationsService, userDataService) {
    $rootScope.currentUser = localStorageService.get('currentUser');
    
    $scope.logout = function() {
        userDataService.clearUserData();
    };
}
