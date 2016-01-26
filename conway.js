
var settings = {
  width: 500,
  height: 500,
  xCellCount: 50, 
  yCellCount: 50,
  lifeCount: 400,
  lifeData: []
};

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
  //setup cells as data coordinates
  var cellWidth = settings.width / settings.xCellCount;
  var cellHeight = settings.height / settings.yCellCount;
  var life = d3.select('.board')
               .selectAll('rect')
               .data(settings.lifeData);
  life.enter()
      .append('rect')
      .attr('class','cell')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
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
  //choose cells to be alive to start
  //draw lives as rects
}

$(document).ready(function() {
  setupBoard();
  // animate();
})
