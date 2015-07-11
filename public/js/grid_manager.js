function GridManager() {

  var svg;

  function _init() {
    console.log("GridManager::Init");
    svg = d3.select("body").append("svg")
          .attr("id", "grid")
          .attr("width", width)
          .attr("height", height);

  }

  function _get_coordinates(width, height, number) {
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

  function _hover_action(story) {
    console.log("TODO: show description on the Pane", story);
  }

  function _hexagon_str(mul) {
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

  function _drawPentagons(selected_pics) {

    console.log("GridManager::DrawPentagons");
    svg.html("");

    d3.hexbin();

    var points = _get_coordinates(width, height, selected_pics.length);

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
          .attr("points", _hexagon_str(0.6))
          .attr("transform", function(d) { return "translate(" + d[0] + "," + d[1] + ")"; })
          .attr("class", "hexagon")


        var images = svg.selectAll("image-hexagon").data(points).enter()
        .append("a")
          .attr("xlink:href", function(d,i){ return selected_pics[i].url })
        .append("image")
          .attr("clip-path",  function(d, i) { return "url(#hexagon_" + i + ")"})
          .attr("xlink:href",  function(d, i) { return (selected_pics[i] !== undefined) ? selected_pics[i].img : "";})
          .attr("height", "40%")
          .attr("width", "40%")
          .attr("style", "position: absolute")
          .attr("x", function(d, i) { return d[0] - 200; })
          .attr("y", function(d) { return d[1]; })
          .attr("preserveAspectRatio", "xMidYMin slice")
          .on("mouseover", function(d,i){ _hover_action(selected_pics[i]) })

  }

  function _update() {
    console.log("GridManager::update()");
  }

  _init();

  return {
    init: _init,
    update: _update,
    drawPentagons: _drawPentagons,
  }
}