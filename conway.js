
var settings = {
  width: 500,
  height: 500,
  xCellCount: 30, 
  yCellCount: 30,
  lifeCount: 400,
  lifeData: [],
  stepInterval: 150
};

$(document).ready(function() {
  setupBoard();
  animate();
})

function setupBoard() {
  d3.select('.board')
    .attr('width', settings.width)
    .attr('height', settings.height);
  for(var i = 0; i < settings.xCellCount * settings.yCellCount; i++) {
    settings.lifeData[i] = [];
    if(Math.random() > settings.lifeCount / (settings.xCellCount * settings.yCellCount)) {
        settings.lifeData[i] = 0;
    }
    else {
      settings.lifeData[i] = 1;
    }
  }
  var cellWidth = settings.width / settings.xCellCount;
  var cellHeight = settings.height / settings.yCellCount;
  d3.select('.board')
    .selectAll('rect')    
    .data(settings.lifeData)
    .enter()
    .append('rect')
    .attr('class','cell')
    .attr('width', cellWidth)
    .attr('height', cellHeight)
    .attr('ry', 2)
    .attr('rx', 2);
  placeOnBoard();
}

function animate() {
  setInterval(function() {
    var newData = []
    var lifeData = settings.lifeData;
    var xCellCount = settings.xCellCount;
    for(var i = 0; i < lifeData.length; i++) {
      //check conditions for life
      //create array of neighbors
      var neighbors = [lifeData[i+1], lifeData[i-1], lifeData[i + xCellCount], 
        lifeData[i - xCellCount], lifeData[i + xCellCount + 1], 
        lifeData[i + xCellCount - 1], lifeData[i - xCellCount + 1], lifeData[i - xCellCount - 1]];
      var lifeCount = _.reduce(neighbors, function(a, b) {
        return a + b;
      })
      if(lifeData[i]) {
        //start alive
        if(lifeCount === 2 || lifeCount === 3) {
          newData[i] = 1;
        }
        else {
          newData[i] = 0;
        }
      }
      else {
        //start dead
        if(lifeCount === 3) {
          newData[i] = 1;
        }
        else {
          newData[i] = 0;
        }
      }
    }
    settings.lifeData = newData;
    placeOnBoard();
  }, settings.stepInterval);
}

function placeOnBoard() {
  var cellWidth = settings.width / settings.xCellCount;
  var cellHeight = settings.height / settings.yCellCount; 
  d3.selectAll('rect')
      .data(settings.lifeData)
      .transition()
      .duration(settings.stepInterval * 0.7)
      .attr('x', function(d,i) {
        return (i % settings.xCellCount) * cellWidth;
      })
      .attr('y', function(d,i) {
        return Math.floor(i / settings.yCellCount) * cellHeight;
      })
      .attr('fill', function(d) {
        if(d) {return 'blue';}
        else {return 'white';}
      });
}