$(document).ready(function() {
  init();
});
  
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

function drawPentagons(pics) {

  console.log("drawing pentanons");
  
  d3.hexbin();

  width = 700;
  height = 700;

  var points =[[200, 150], [350, 150], [275, 300]];

  var hexbin = d3.hexbin()
      .size([width, height])
      .radius(20);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var hexagon = svg.append("g")
        .attr("class", "hexagons")
      .selectAll("polygon")
        .data(hexbin(points))
        // data(hexbin.mesh())
      .enter().append("g");

      hexagon.append("clipPath")
        .attr("id", function (d, i) { return "hexagon_" + i;} )
        .append("polygon")
        .attr("points", hexagon_str(0.6))
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("class", "hexagon");



      var images = hexagon.append("image")
      .attr("clip-path",  function(d, i) { return "url(#hexagon_" + i + ")"})
      .attr("xlink:href",  function(d, i) { return pics[i].img;})
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("preserveAspectRatio", "xMidYMin slice")
      // height="100%" width="100%" xlink:href="https://sphotos-b.xx.fbcdn.net/hphotos-frc1/902130_10151601296353689_541866262_o.jpg"  />
        // .style("fill", function(d) { return color(d.length); });
}

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

var svg = document.getElementById("svg-elem");

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
        //  console.log("success:", data);
        // })
      } else {
        pics.push({img: img, url: url, lon: lon, lat: lat, title: title});
      }
    })
  }

  // var contents = $('#image-tiles')
  // for(var row=0;row<50;row++) {
  //  var div = $('<div>', {'class': 'tile'}).appendTo(contents)
  //  var img = $('<img>').appendTo(div)
  //  img.mouseover(
  //    function(pic) {
  //      return function() { placeMarker(pic); }
  //    }(pics[row])
  //  )
  //  img.attr('src', pics[row].img).css('height', '100px').css('width', 'auto')
  //  img.attr('title', pics[row].title)
  // }

  console.log(pics);
  drawPentagons(pics);

}