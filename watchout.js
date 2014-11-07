// start slingin' some d3 here.

var canvas = d3.select("body").append("svg")
              .attr({"width" : 1000, "height" : 1000});
// var circle = canvas.append("circle").attr({"cx" : 100, "cy" : 100, "r" : 10});  
var enemyData = new Array(20);
var enemies = canvas.selectAll("circle").data(enemyData).enter()
              .append("circle")
              .attr({"cx" : function(d, i) {return i * 50}, "cy" : function(d, i){ return i * 50}, "r" : 10});