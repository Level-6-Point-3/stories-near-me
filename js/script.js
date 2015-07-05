$(document).ready(function() {
  init();
});

var svg;

var width = $(window).width();
var height = $(window).height();

function setupInputRange() {
  $('#timeline-range').on("change mousemove", function() {
    // Grab value from input range
    var value = $(this).val();
    var month, year;

      // Determine month
      switch(value % 12) {
        case 0:
          month = "January";
          break;
        case 1:
          month = "February";
          break;
        case 2:
          month = "March";
          break;
        case 3:
          month = "April";
          break;
        case 4:
          month = "May";
          break;
        case 5:
          month = "June";
          break;
        case 6:
          month = "July";
          break;
        case 7:
          month = "August";
          break;
        case 8:
          month = "September";
          break;
        case 9:
          month = "October";
          break;
        case 10:
          month = "November";
          break;
        case 11:
          month = "December";
          break;
      }

      // Determine year
      switch (Math.floor(value / 12)) {
        case 0:
          year = 2009;
          break;
        case 1:
          year = 2010;
          break;
        case 2:
          year = 2011;
          break;
        case 3:
          year = 2012;
          break;
        case 4:
          year = 2013;
          break;
        case 5:
          year = 2014;
          break;
      }

      // Update the text label
      $('#timeline-date').html(month + ", " + year);
  });
}

function setupOnTileSelect() {
  $('.tile a').on("click", function() {
    // Open the modal when tile selected
  });
}

function init() {
  setupInputRange();
  setupOnTileSelect();

  

  svg = d3.select("body").append("svg")
		.attr("id", "grid")
        .attr("width", width)
        .attr("height", height);

}

// returns string 
function hexagon_str(mul) {
//"135,0 0,80 0,242.5 135,322.5 280,242.5 280,80"
  var str = (135 * mul).toString()   + ", 0 0, " +
            (80 * mul).toString()    + " 0, "    +
            (242.5 * mul).toString() + " "       +
            (135 * mul).toString()   + ", "      +
            (322.5 * mul).toString() + " "       +
            (280 * mul).toString()   + ", "      +
            (242.5 * mul).toString() + " "       +
            (280 * mul).toString()   + ", "      +
            (80 * mul).toString();

  return str;
}

function get_coordinates(width, height, number) {
  var size_x = 175;
  var size_y = 150;

  var points = [];
  var count_x = Math.sqrt(number);

  var x0 = 0;
  var y0 = 0;

  var row = 0;

  var x_offset = 0;
  var y_offset = 0;

  var i = 0;
  while (i < number) {
    for (var j = 0; j < count_x; j++) {
      points.push([x0 + x_offset, y0 + y_offset]);
      x_offset += size_x;
      i++;
    }
    row += 1;
    x_offset = ((row % 2) == 0) ? 0 : 85;
    y_offset += size_y;
    
  }

  return points;

}

function drawPentagons(pics) {

  console.log("drawing pentanons");
  
  d3.hexbin();

  

  var points = get_coordinates(width, height, pics.length);


  console.log("points:", points);


    var hexagon = svg.append("g")
        .attr("class", "hexagons")
      .selectAll("polygon")
        .data(points)
        // data(hexbin.mesh())
      .enter().append("g");

      hexagon.append("clipPath")
        .attr("id", function (d, i) { return "hexagon_" + i;} )
        .append("polygon")
        .attr("points", hexagon_str(0.6))
        .attr("transform", function(d) { return "translate(" + d[0] + "," + d[1] + ")"; })
        .attr("class", "hexagon");

      var images = svg.selectAll("image").data(points).enter().append("image")
      .attr("clip-path",  function(d, i) { return "url(#hexagon_" + i + ")"})
      .attr("xlink:href",  function(d, i) { return (pics[i] !== undefined) ? pics[i].img : "";})
      .attr("height", "40%")
      .attr("width", "40%")
      .attr("style", "position: absolute")
      .attr("x", function(d) { return d[0]; })
      .attr("y", function(d) { return d[1]; })
      .attr("preserveAspectRatio", "xMidYMin slice")
      // .on("click", function(d, i){console.log( pics[i] ) })
      .on("click", function(d, i){ populate_grid(pics[i]) })
      // height="100%" width="100%" xlink:href="https://sphotos-b.xx.fbcdn.net/hphotos-frc1/902130_10151601296353689_541866262_o.jpg"  />
        // .style("fill", function(d) { return color(d.length); });
}

d3.json('bushfires.json', function(stories) {
  console.log(stories);
  stories_to_pics(stories);
})

var circles = [];
function placeMarker(pic) {
    
	circles.push(L.circle([pic.lat, pic.lon], 500, {
		color: pic.colour,
		fillColor: pic.colour,
		fillOpacity: 0.5
	}).addTo(map));
}

var pics = [];
function stories_to_pics(stories) {
	
	for (var date in stories) {
		stories[date].forEach(function(story) {
			var img = story["Primary image"];
			var url = story["URL"];
			var lon = story["Longitude"]
			var lat = story["Latitude"]
			var title = story["Title"]
			var desc = story["Primary image caption"]
			var colour = 'gray'
			
			var keywords = story["Keywords"]
			
			var colours = [
				{keyword: "fire",       colour: "red"   },
				{keyword: "flood",      colour: "blue"  },
				{keyword: "history",    colour: "green" },
				{keyword: "indigenous", colour: "orange"}
			]
			
			colours.forEach(function(c) {
				if(keywords.toLowerCase().indexOf(c.keyword) >= 0) {
					colour = c.colour;
				}
			})
			
			if (img === "") {
				/// got to xml and get random picture from there
				// d3.xml("http://www.abc.net.au/local/photos/2013/08/28/3836057-mediarss.xml", function(data) {
				// 	console.log("success:", data);
				// })
			} else {
				pics.push({
					img: img,
					url: url, 
					lon: lon,
					lat: lat,
					title: title,
					colour: colour,
					desc: desc});
			}
		})
	}
	populate_grid(undefined);

	// console.log(pics);
}

function populate_grid(centre_pic) {
  console.log("circles", circles)
	circles.forEach(function(c) {
		map.removeLayer(c);
	})
	circles = [];


  /// get only 10

  if(centre_pic != undefined) {
    pics.sort(function(a,b) {
      dist_a = Math.abs(centre_pic.lat - a.lat) + Math.abs(centre_pic.lon - a.lon);
      dist_b = Math.abs(centre_pic.lat - b.lat) + Math.abs(centre_pic.lon - b.lon);
      return dist_a - dist_b;
    })
	
	$("#info").html(
		'<a href=""><h1>' + centre_pic.title + '</h1></a><h3>' + centre_pic.desc + '</h3>'
	);
  } else {
	$("#info").html("")
  }

  var selected_pics = [];

  for (var i = 0; i < 30; i++) {
    var elem = Math.floor(Math.random() * pics.length);
    selected_pics.push(pics[elem]);
  }

  console.log(selected_pics);

		var contents = $('#image-tiles')
	contents.html("")

  // console.log("picx:", pics);

  drawPentagons(selected_pics);
	for(var row=0;row< selected_pics.length; row++) {

		placeMarker(selected_pics[row]);
	}

}

function onMapClick(e) {
	populate_grid({lat: e.latlng.lat, lon: e.latlng.lng})
}

map.on('click', onMapClick);
