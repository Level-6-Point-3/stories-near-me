d3.json('bushfires.json', function(stories) {
	console.log(stories);
	stories_to_pics(stories);
})

var marker = undefined;
function placeMarker(pic) {
    if(marker != undefined) {
		map.removeLayer(marker)
	}
	marker = L.marker([pic.lat, pic.lon]).addTo(map);
}

function stories_to_pics(stories) {

	var pics = [];
	
	for (var date in stories) {

		stories[date].forEach(function(story) {
			var img = story["Primary image"];
			var url = story["URL"];
			var lon = story["Longitude"]
			var lat = story["Latitude"]
			var title = story["Title"]
			
			if (img === "") {
				/// got to xml and get random picture from there
				// d3.xml("http://www.abc.net.au/local/photos/2013/08/28/3836057-mediarss.xml", function(data) {
				// 	console.log("success:", data);
				// })
			} else {
				pics.push({img: img, url: url, lon: lon, lat: lat, title: title});
			}
		})
	}

	var contents = $('#image-tiles')
	for(var row=0;row<50;row++) {
		var div = $('<div>', {'class': 'tile'}).appendTo(contents)
		var img = $('<img>').appendTo(div)
		img.mouseover(
			function(pic) {
				return function() { placeMarker(pic); }
			}(pics[row])
		)
		img.attr('src', pics[row].img).css('height', '100px').css('width', 'auto')
		img.attr('title', pics[row].title)
	}

	console.log(pics);

}