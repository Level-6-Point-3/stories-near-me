"strict mode";

$(document).ready(function() {
  init();
});

var svg;

// var width = $(window).width();
var width = 30;
var height = $(window).height();

function init() {
  setupInputRange();

  storyProvider.readJson(function() {

    var stories = storyProvider.get_selection();
    gridManager.drawPentagons(stories);


  });


  // listen("refresh", function(args) {
  //   var pics = storyProvider.get(30, {
  //     range: args.range,
  //     coords: args.coords
  //   });
  //   gridManager.draw(pics)
  //   map.draw(pics)
  // });

}

function setupInputRange() {

    // Determine month

  //$('#timeline-range').on("change mousemove", function() {
  $('#timeline-range').on("change", function() {
    // Grab value from input range
    var value = $(this).val();

    var short_month = dateHelper.spell_month_short(value % 12);
    var long_month  = dateHelper.spell_month(value % 12);

    var year = Math.floor(value / 12) + 2009;

    // Update the text label
    $('#timeline-date').html(long_month + ", " + year);

      // d3.json('../stories.json', function(stories) {
      //   console.log(short_month + "-" + year);
      //   pics = stories_to_pics(short_month + "-" + year);
      // })
  });
}

var dateHelper    = DateHelper();
var storyProvider = StoryProvider();
var gridManager   = GridManager();
var infoPane      = InfoPane();
var mapView       = MapView();

function populate_grid(centre_pic) {


  var contents = $('#image-tiles')
  contents.html("")

  // console.log("picx:", pics)
  drawPentagons(selected_pics);
  for(var row=0;row< selected_pics.length; row++) {
    placeMarker(selected_pics[row]);
  }

}