var w = 1000;
var h = 700;

var canvas = d3.select("body").append("svg")
              .attr({"width" : w, "height" : h});


// possibly adjust border
var borderPath = canvas.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", h)
  .attr("width", w)
  .style("stroke", 'pink')
  .style("fill", "none")
  .style("stroke-width", '10px');             


var player = canvas.selectAll("player").data([1])
             .enter().append("circle")
             .attr({'id' : 'player', "cx" : function(d, i) {return 300}, "cy" : function(d, i){ return 300}, "r" : 10 });

var enemyData = d3.range(20);

var smartEnemyData = d3.range(3);

var enemies = canvas.selectAll("circle").data(enemyData).enter()
              .append("circle")
              .attr({'class' : 'enemies simple', "cx" : -20, "cy" : function(d, i){ return i * 35}, "r" : 10, 'fill': 'white'});

var smartEnemies = canvas.selectAll("smartEnemies").data(smartEnemyData).enter()
              .append("circle")
              .attr({'class' : 'enemies smart', "cx" : 900, "cy" : function(d, i){ return 50 + (i  * 300)}, "r" : 10, 'fill': 'grey'})
              .style('stroke', 'red')
              .style('stroke-width', '3px')

var color = d3.scale.category20b();

var randomizer = function(numPixels) {
  return Math.floor( Math.random() * numPixels )
}

var smartMove = function(target, range){
  if (Math.random() > 0.2){
    return target - 20 + randomizer(40);
  }else{
    return randomizer(range);
  }
}

var interval = 3000;
var data = [30,80,150,90,20,200,180];
var state = 0;

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
var collisionHappening;
var collisions = 0;
var exploding;
setInterval( function() {


  removeElementsByClass('ring');

  enemies.transition()
    .duration(interval)
    .attr({"cx" : function() { return randomizer(w) },
        "cy" : function() { return randomizer(h) }, 
        "r" : 10
    })
    .style('fill', color(Math.floor((Math.random()*20)+1)));

  smartEnemies.transition()
    .duration(interval/2)
    .attr({"cx" : function() { return smartMove(mouseCoord[0], w)},
        "cy" : function() { return smartMove(mouseCoord[1], h)}, 
        "r" : 10
    })
  
  d3.selectAll('.smart').each( function(d){
    var xCo = d3.select(this).attr("cx");
    var yCo = d3.select(this).attr("cy");
    console.log('x0', xCo);
    canvas.selectAll("radar").data([1]).enter().append('circle')
      .attr({ 'class' : 'ring', 'cx':xCo, 'cy': yCo , 'r': 10, 'fill-opacity' : 0})
      .style('stroke', 'lightgreen')
      .style('stroke-width', '3px')
    });
  
  d3.selectAll('.ring').transition()
    .duration(1000)
    .attr('r', 700)
    .style('stroke-opacity', 0)
    .style('stroke-width', '1px')
  
  interval = interval * 0.97;

  if (collisionHappening) {
    collisions+=1;
    collisionHappening = false;
    interval = 3000;
  }
  exploding = false;

}, interval) 


var mouseCoord = [0,0];
canvas.on("mousemove", function() {
  mouseCoord = d3.mouse(this);
  //why doesn't it work without a d3 circle/rect? it just looks for html tag tag
  canvas.select('#player').attr({"cx" : mouseCoord[0], "cy" : mouseCoord[1]});
});


var highScore = 0;
var score = 0;
setInterval( function() {
  d3.selectAll('.enemies').each( function(d, i) {
    var enemyX = d3.select(this).attr("cx");
    var enemyY =  d3.select(this).attr("cy");
    //we should change to pythagorean circle collsion
    if ( Math.abs(enemyX - mouseCoord[0]) <= 25 && Math.abs(enemyY - mouseCoord[1]) <= 25)  {
      
      if (!exploding) {
        d3.selectAll('#player').each( function(d){
          var xCo = d3.select(this).attr("cx");
          var yCo = d3.select(this).attr("cy");
          console.log('x0', xCo);
          canvas.selectAll("radar").data([1]).enter().append('circle')
            .attr({ 'class' : 'player-ring', 'cx':xCo, 'cy': yCo , 'r': 10, 'fill-opacity' : 0})
            .style('stroke', 'red')
            .style('stroke-width', '10px')
          });
        
        d3.selectAll('.player-ring').transition()
          .duration(1000)
          .attr('r', 100)
          .style('stroke-opacity', 0)
          .style('stroke-width', '1px')
          exploding = true;
      }

      collisionHappening = true;
      score = 0;
    }
  });
  if (highScore <= score) {
    highScore = score;
  }
  
  d3.selectAll('.high').text("High score: " + highScore);
  d3.selectAll('.collisions').text("Collisions: " + collisions);
  d3.selectAll('.current').text("Current Score: " + score);
  score++;

}, 40);

