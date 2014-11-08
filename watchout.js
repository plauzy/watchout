// start slingin' some d3 here.

var canvas = d3.select("body").append("svg")
              .attr({"width" : 1000, "height" : 1000});


var player = canvas.selectAll("player").data([1])
             .enter().append("circle")
             .attr({'id' : 'player', "cx" : function(d, i) {return 300}, "cy" : function(d, i){ return 300}, "r" : 10 });

// var circle = canvas.append("circle").attr({"cx" : 100, "cy" : 100, "r" : 10});  
// var enemyData = new Array(20);
var enemyData = d3.range(20);

var enemies = canvas.selectAll("circle").data(enemyData).enter()
              .append("circle")
              .attr({'class' : 'enemies', "cx" : function(d, i) {return i * 50}, "cy" : function(d, i){ return i * 50}, "r" : 10});

var color = d3.scale.category20b();
var randomizer = function(numPixels) {
  return Math.floor( Math.random() * numPixels )
}
setInterval( function() {
  enemies.transition()
    .duration(3000)
    .attr({"cx" : function() { return randomizer(1000) },
                                          "cy" : function() { return randomizer(1000) }, 
                                          "r" : 10
                                        })
    .style('fill', color(Math.floor((Math.random()*20)+1)));
}, 3000) 

var score = 0;
setInterval( function() {
  // var mouseCoord = d3.mouse(this);
  d3.selectAll('.enemies').each( function(d, i) {
    // if (this !== null) {
      console.log( d3.select(this).attr("cx") );
    // }
  })

  d3.selectAll('.current').text("Current Score: " + score)
  score++;
  // enemies.forEach(function(element, i, enemies) {
  //   console.log(element.attr('cx'))
  // })
  
  // console.log(d3.select('.enemies').attr('cx'));
}, 100);

// console.log(d3.select(".mynode").attr("cx"));

var mouseCoord;
canvas.on("mousemove", function() {
  mouseCoord = d3.mouse(this);
  //why doesn't it work without a d3 circle/rect? it just looks for html tag tag
  canvas.select('#player').attr({"cx" : mouseCoord[0], "cy" : mouseCoord[1]});
});