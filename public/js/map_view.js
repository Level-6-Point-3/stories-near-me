function MapView() {

  var map=L.map('map').setView([ -29, 132], 4)
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'kevinleomonash.6763534e',
    accessToken: 'pk.eyJ1Ijoia2V2aW5sZW9tb25hc2giLCJhIjoiZGNjMDc0Mzc1YzBkY2VlMDczNzViYmM0NDcxZGVhYjAifQ.CreJ4UYnBFvHnpinXZ_39g'
  }).addTo(map);


  function _placeMarker(pic) {

    circles.push(L.circle([pic.lat, pic.lon], 50000, {
      color: pic.colour,
      fillColor: pic.colour,
      fillOpacity: 0.5
    }).addTo(map));
  }

  function onMapClick(e) {

    console.log("TODO: emit signal to select new stories");
    // populate_grid({lat: e.latlng.lat, lon: e.latlng.lng})
  }

  map.on('click', onMapClick);


  function _update() {
    console.log("MapView::update()");
  }

  return {
    update: _update  
  }
}