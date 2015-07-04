d3.json('bushfires.json', function(stories) {
	console.log(stories);
	stories_to_pics(stories);
})

function stories_to_pics(stories) {

	var pics = [];

	// stories.forEach(function(dates) {
	for (var date in stories) {

		// console.log(date);

		stories[date].forEach(function(story) {
			pics.push(story["Primary image"]);
		})

	}
	// })

	console.log(pics);

}