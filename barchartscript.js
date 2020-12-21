// Input Test Variable
drawBarChart({First: 50, Second: 30, Third: 40}, {valuePosition: "top"}, $("body"));

function drawBarChart(data, options, element){

  // General Variables
  let values = Object.values(data);
  let length = Object.keys(data).length;
  let total = values.reduce((a, b) => a + b, 0);

  // Width + Height Variables
  let chartWidth = Math.max(300, Math.min($(window).width()-100, 1000));
  let axisLabelWidth = 25;
  let barWidth = chartWidth-axisLabelWidth;
  let barHeight = 300;

  // Initialization
  createChart();
  createBars();
  setWidth();

  // Adjust width and margins of bars on window resize
  $(window).resize(function() {
    chartWidth = Math.max(300, Math.min($(window).width()-100, 1000));
    barWidth = chartWidth-axisLabelWidth;
    setWidth();
  });

  // Lay down HTML for chart axes and title
  function createChart(){
    element.prepend('<div id="bar-chart-lib"><div id="title"><p>Bar Chart Title</p></div><div id="chart"><ul id="axis-labels"><li><span>100%</span></li><li><span>75%</span></li><li><span>50%</span></li><li><span>25%</span></li></ul><ul id="bars"></ul></div></div>')
  }

  // Create bars and assign horizontal value based on % of total data value
  function createBars(){
    let index = 0;
    $.each(data,function(property, value){
      $("#bars").append('<li><div class="bar"><span class=bar-value>'+value+'</span></div><span class=bar-title>'+property+'</span></li>')
      $(".bar").eq(index)
      .height(barHeight * value/total)
      ;
      index++;
    });
  }

  // Set width and margins of chart and bars
  function setWidth(){
    $("#chart").width(chartWidth);
    $("#axis-labels").width(axisLabelWidth);
    $("#bars").width(barWidth);
    $("#bars li").width(barWidth / length);
    $(".bar").css("margin-left", barWidth * 0.15 / length);
    }
}
