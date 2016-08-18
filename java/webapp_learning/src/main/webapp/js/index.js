"use strict";
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	x.innerHTML = "Latitude: " + position.coords.latitude + 
	"<br>Longitude: " + position.coords.longitude;	
}

function alertAndLog() {
	var x = 5;
	console.log(typeof x);
	var y = new Number(5);
	console.log(typeof y);
	var xr = [1, 2];
	console.log(typeof xr);
	var xz = [1, 2];
	var xy = new Array(1, 2);
	console.log(typeof xy);
	console.log(xr == xy);
	console.log(xr === xz);
}



function sort(names) {
	return simpleSort(names);
}

function simpleSort(names) {
	names.sort(function(a, b) {
		return (a > b) ? 1 : ((a < b) ? -1 : 0);
	});
	return names;
}

function sortLastName(names) {
	var nO = [];
	var x;
	for(x in names) {
		var z = names[x].split(" ");
		nO.push(z);
	}
	nO.sort(function(a, b) {
		var i;
		if (a[1] > b[1]) {
			i = 1;
		}
		else if (a[1] < b[1]) {
			i = -1;
		}
		else {
			i = 0;
		}
		return i;
	});
	var result = [];
	var y;
	for(y in nO) {
		result[result.length] = (nO[y])[0] + " " + (nO[y])[1];
	}
	return result;
}


