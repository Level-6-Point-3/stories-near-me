var map=L.map('map').setView([ -25.892, 130.844],4)
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'kevinleomonash.6763534e',
	accessToken: 'pk.eyJ1Ijoia2V2aW5sZW9tb25hc2giLCJhIjoiZGNjMDc0Mzc1YzBkY2VlMDczNzViYmM0NDcxZGVhYjAifQ.CreJ4UYnBFvHnpinXZ_39g'
}).addTo(map);