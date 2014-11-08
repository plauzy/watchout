// start slingin' some d3 here.

var canvas = d3.select("body").append("svg")
              .attr({"width" : 1000, "height" : 1000});
// var circle = canvas.append("circle").attr({"cx" : 100, "cy" : 100, "r" : 10});  
// var enemyData = new Array(20);
var enemyData = d3.range(1,21)
var enemies = canvas.selectAll("circle").data(enemyData).enter()
              .append("circle")
              .attr({"cx" : function(d, i) {return i * 50}, "cy" : function(d, i){ return i * 50}, "r" : 10});

var player = canvas.selectAll("player").data([1])
             .enter().append("rect")
             .attr({"x" : function(d, i) {return 300}, "y" : function(d, i){ return 300}, "width" : 20, "height" :20, "fill" : "blue"});

var randomizer = function(numPixels) {
  return Math.floor( Math.random() * numPixels )
}
setInterval( function() {
  enemies.transition().duration(3000).attr({"cx" : function() { return randomizer(1000) },
                                          "cy" : function() { return randomizer(1000) }, 
                                          "r" : 10});
}, 3000) 

canvas.on("mousemove", function() {
  var mouseCoord = d3.mouse(this);

  //why doesn't it work without a d3 circle/rect? it just looks for html tag tag
  canvas.select('rect').attr({"x" : mouseCoord[0], "y" : mouseCoord[1]});

});

// var svg_track = d3.select('#track_cursor_svg');
// svg_track.on("mousemove", function() {
//   var m = d3.mouse(this);

//   svg_track.selectAll('circle')
//     .attr("cx", m[0])
//     .attr("cy", m[1]);
// });

// svg_track.on('mouseenter', function(){
//   svg_track.selectAll('circle').attr('opacity', 1.0);
// });

// svg_track.on('mouseleave', function(){
//   svg_track.selectAll('circle').attr('opacity', 0.0);
// });


//set a variable equal to svg dom element, which has id of track_cursor_svg
//this var is used to bind the mousemove, mousleave, and mouseenter events
//d3 mousemove event tracks the mouse position using hte d3 object d3.mouse
//d3.mosue object returns an array, the first element is in x position of cursor, second element is in y position of cursor, relative to svg dom element

