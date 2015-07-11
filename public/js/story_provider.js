'use strict';

function StoryProvider() {

  var _all_stories = [];
  var _date_buckets = [];
  var _parsed_stories = [];

  /// populates _date_buckets
  function _generate_buckets(stories) {

    stories.forEach(function(story, id) {
      var short_date = dateHelper.make_short_date(story["Date"])

      if (_date_buckets[short_date] === undefined) {
        _date_buckets[short_date] = [id];
      } else {
        _date_buckets[short_date].push(id);
      }

    })

    console.log('StoryProvider::GenerateBucket');
  }

  function _transform_stories(stories) {
    stories.forEach(function(story) {
      var img = story["Primary image"];
      var url = story["URL"];
      var lon = story["Longitude"]
      var lat = story["Latitude"]
      var title = story["Title"]
      var desc = story["Primary image caption"]
      var colour = 'white'

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

      // console.log("story:", story);

      if (img === "") {
        /// got to xml and get random picture from there
        // d3.xml("http://www.abc.net.au/local/photos/2013/08/28/3836057-mediarss.xml", function(data) {
        //  console.log("success:", data);
        // })
      } else {
        _parsed_stories.push({
          img: img,
          url: url,
          lon: lon,
          lat: lat,
          title: title,
          colour: colour,
          desc: desc});
      }
    })

    console.log('StoryProvider::TransformStories');
  }

  function _readJson(callback) {
    /// get stories in their original format
    d3.json('stories.json', function(stories) {

        _generate_buckets(stories);
        _transform_stories(stories);
        callback();

    })
  }


  /// get 30 stories
  function _get_selection() {

    // console.log("before: ", stories);

    var selected = [];

    while (selected.length < 30) {

      var rnd = Math.floor(Math.random() * _parsed_stories.length);
      selected.push(_parsed_stories[rnd])
    }

      // circles.forEach(function(c) {
      //   map.removeLayer(c);
      // })
      // circles = [];

      // /// get only 10
      // if(centre_pic != undefined) {
      //   console.log("SORTING:, ", centre_pic)

      //   pics.sort(function(a,b) {
      //     dist_a  = Math.abs(centre_pic.lat - a.lat) + Math.abs(centre_pic.lon - a.lon);
      //     dist_b  = Math.abs(centre_pic.lat - b.lat) + Math.abs(centre_pic.lon - b.lon);

      //     scale = dist_a > dist_b ? dist_a : dist_b;
      //     scale *= 0.5;

      //     dist_a += Math.random() * scale;
      //     dist_b += Math.random() * scale;
      //     return dist_a - dist_b;
      //   })


      //   if(!("title" in centre_pic)) {
      //     centre_pic = pics[0];
      //   }

      //   $("#info").html("")

      //     $("#info").html('<div id="fadebox"><a href=""><h1>' +
      //        centre_pic.title + '</h1></a><h3>' +
      //        centre_pic.desc + '</h3></div>')
      //        .css("background-image", 'url('+centre_pic.img+')')
      //        .css("background-size", "100%");
      // }

      // var selected_pics = [];
      // var len = 30>pics.length ? pics.length : 30;
      // for (var i = 0; i < len; i++) {
      //   selected_pics.push(pics[i]);
      // }

    return selected;

  }

  return {
    readJson: _readJson,
    parsed:   _parsed_stories,
    date_buckets: _date_buckets,
    get_selection: _get_selection
  }
}