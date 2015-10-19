// Function to draw your map
var drawMap = function() {

  // Create map and set view
	var map = L.map('map').setView([37.91, -99.36], 5);

  // Create a tile layer variable using the appropriate url
	var layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'alisonwong.nnkmmn0n',
	    accessToken: 'pk.eyJ1IjoiYWxpc29ud29uZyIsImEiOiJjaWZ1Zmhxc3IxeG81dXVrc2lwMTFuOGI1In0.aWY6wmIEl7QA3GUAfDLifA'
	}); 

  // Add the layer to your map
	layer.addTo(map); 

  // Execute your function to get data
	getData(map); 
}

// Function for getting data
var getData = function(map) {

// Execute an AJAX request to get the data in data/response.js
	var data; 

	$.ajax({
		url: "data/response.json",
		dataType: "json",
		// When your request is successful, call your customBuild function
		success: function(dat) {
			data = dat
			customBuild(data, map)
		}
	});
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(json, map) {
	var unknown = new L.LayerGroup();
	var white = new L.LayerGroup();
	var black = new L.LayerGroup();
	var asian = new L.LayerGroup();
	var indian = new L.LayerGroup();
	var pacific = new L.LayerGroup();

	for (var key in json) {
		if (json.hasOwnProperty(key)) {
			if (json[key]["Hit or Killed?"] == "Killed") {
				if (json[key].Race == "Unknown") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'red', fillOpacity: 0.5})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(unknown);	
				} else if (json[key].Race == "White") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'red', fillOpacity: 0.5})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(white);	
				} else if (json[key].Race == "Black or African American") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'red', fillOpacity: 0.5})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(black);	
				} else if (json[key].Race == "Asian") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'red', fillOpacity: 0.5})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(asian);	
				} else if (json[key].Race == "American Indian or Alaska Native") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'red', fillOpacity: 0.5})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(indian);	
				} else if (json[key].Race == "Native Hawaiian or Other Pacific Islander") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'red', fillOpacity: 0.5})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(pacific);	
				}
			}
				if (json[key].Race == "Unknown") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'white', fillOpacity: 0.3})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(unknown);	
				} else if (json[key].Race == "White") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'white', fillOpacity: 0.3})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(white);	
				} else if (json[key].Race == "Black or African American") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'white', fillOpacity: 0.3})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(black);	
				} else if (json[key].Race == "Asian") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'white', fillOpacity: 0.3})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(asian);	
				} else if (json[key].Race == "American Indian or Alaska Native") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'white', fillOpacity: 0.3})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(indian);	
				} else if (json[key].Race == "Native Hawaiian or Other Pacific Islander") {
					L.circleMarker([json[key].lat, json[key].lng], {stroke: false, fillColor: 'white', fillOpacity: 0.3})
					.bindPopup("Location: " + json[key].City + ", " + json[key].State + "<br>" + json[key].Summary).addTo(pacific);	
				}

		}
	}

	// Be sure to add each layer to the map
	var overlayMaps = {
		"Unknown": unknown,
		"White": white,
		"Black or African American": black,
		"Asian": asian,
		"American Indian or Alaska Native": indian,
		"Native Hawaiian or Other Pacific Islander": pacific
	};

	// Once layers are on the map, add a leaflet controller that shows/hides layers
	L.control.layers(null, overlayMaps).addTo(map);

	var femaleKilled = 0;
	var femaleHit = 0;
	var maleKilled = 0;
	var maleHit = 0;

	for (var key in json) {
		if (json.hasOwnProperty(key)) {
			if (json[key]["Hit or Killed?"] =="Killed" && json[key]["Victim's Gender"] == "Female") {
				femaleKilled++;
			} else if (json[key]["Hit or Killed?"] =="Killed" && json[key]["Victim's Gender"] == "Male") {
				maleKilled++;
			} else if (json[key]["Hit or Killed?"] =="Hit" && json[key]["Victim's Gender"] == "Female") {
				femaleHit++;
			} else if (json[key]["Hit or Killed?"] =="Hit" && json[key]["Victim's Gender"] == "Male") {
				maleHit++;
			}
		}
	}

	var table = document.getElementById("table");

	var row1 = table.insertRow(0);
	var row2 = table.insertRow(1);
	var row3 = table.insertRow(2);

	
	var cell1 = row1.insertCell(0);
	var cell2 = row1.insertCell(1);
	var cell3 = row1.insertCell(2);
	cell1.innerHTML = "";
	cell2.innerHTML = "Hit";
	cell3.innerHTML = "Killed";

	var cell4 = row2.insertCell(0);
	var cell5 = row2.insertCell(1);
	var cell6 = row2.insertCell(2);
	cell4.innerHTML = "Female";
	cell5.innerHTML = femaleHit;
	cell6.innerHTML = femaleKilled;

	var cell7 = row3.insertCell(0);
	var cell8 = row3.insertCell(1);
	var cell9 = row3.insertCell(2);
	cell7.innerHTML = "Male";
	cell8.innerHTML = maleHit;
	cell9.innerHTML = maleKilled;
}

