var app = angular.module("myApp", []);
app.controller("sController", function($scope, $http) {
	$scope.name="Suresh";
	var names = ["Suresh Anamanamuri", "Pratap Manne", "Anu Jag", "Arch Jag", "Sai Pa"];
	console.log("Suresh Anamanamuri" > "Sai Pa");
	names = sortLastName(names);
	console.log(names);
	$scope.name=names;
	
	var url = "http://www.w3schools.com/website/Customers_JSON.php"
	$http.get(url).success(function(response) { 
								response.sort(function(a, b) { 
									return (a.Name > b.Name) ? 1 : ((a.Name < b.Name) ? -1 : 0);
								});
								$scope.names = response 
						});
	});
	

var app2 = angular.module("app2", ["ngroute"]);
app2.config(function($routeProvider) {
	$routeProvider.when("/index", {
		templateUrl: "index.html",
		controller: "sController"
	}).
	when("index2", {
		templateUrl: "index2.html"
	});
});