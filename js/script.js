d3.json('bushfires.json', function(stories) {
	console.log(stories);
	stories_to_pics(stories);
})

function stories_to_pics(stories) {

	var pics = [];

	for (var date in stories) {

		stories[date].forEach(function(story) {
			var url = story["Primary image"];

			if (url === "") {
				/// got to xml and get random picture from there
				// d3.xml("http://www.abc.net.au/local/photos/2013/08/28/3836057-mediarss.xml", function(data) {
				// 	console.log("success:", data);
				// })
			} else {
				pics.push(url);
			}
		})

	}

	console.log(pics);

}