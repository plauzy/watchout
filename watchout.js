// start slingin' some d3 here.

var canvas = d3.select("body").append("svg")
              .attr({"width" : 1000, "height" : 1000});
// var circle = canvas.append("circle").attr({"cx" : 100, "cy" : 100, "r" : 10});  
var enemyData = new Array(20);
var enemies = canvas.selectAll("circle").data(enemyData).enter()
              .append("circle")
              .attr({"cx" : function(d, i) {return i * 50}, "cy" : function(d, i){ return i * 50}, "r" : 10});

var randomizer = function(numPixels) {
  return Math.floor( Math.random() * numPixels )
}
setInterval( function() {
  enemies.transition().duration(3000).attr({"cx" : function() { return randomizer(1000) },
                                          "cy" : function() { return randomizer(1000) }, 
                                          "r" : 10});
}, 3000) 
