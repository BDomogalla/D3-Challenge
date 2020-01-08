// You need to create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.
// Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. 
// You'll code this graphic in the app.js file of your homework directory—make sure you pull in the data from data.csv by using the d3.csv function. 
// Your scatter plot should ultimately appear like the image at the top of this section.

// Include state abbreviations in the circles.
// Create and situate your axes and labels to the left and bottom of the chart.

var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(function(journalismData) {

    //Parse Data/Cast as numbers
    journalismData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(journalismData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([2, d3.max(journalismData, d => d.healthcare)])
      .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis)
      .attr('class', 'chart');

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(journalismData)
    .enter()
    .append("circle")
    .classed('stateCircle', true)
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("opacity", ".5")

    // Add text to circles
    chartGroup.selectAll("text")
    .data(journalismData)
    .enter()
    .append("text")
    .classed("stateText", true)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr('stroke', 'black')
    .attr('font-size', "10px")
    .text(d => d.abbr)
   
    // Step 6: Initialize tool tip
    // ==============================
    // var toolTip = d3.tip()
    //   .attr("class", "d3-tip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`% In Poverty: ${d.poverty}<br>% Lacking Healthcare: ${d.healthcare}`);
    //   });

    // // Step 7: Create tooltip in the chart
    // // ==============================
    
    // chartGroup.call(toolTip);

    // // Step 8: Create event listeners to display and hide the tooltip
    // // ==============================
    // circlesGroup.on("click", function(data) {
    //   toolTip.show(data, this);
    // })
    //   // onmouseout event
    //   .on("mouseout", function(data, index) {
    //     toolTip.hide(data);
    //   });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "aText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "aText")
      .text("In Poverty (%)");
  }).catch(function(error) {
    console.log(error);
  });
