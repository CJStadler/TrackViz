var get_athlete = function() {
	if (!path) { console.log("athlete path is not defined"); }
	
	var url = path + ".json";
	console.log(url);

	d3.json(url, function(error, data) {

		if (error) return console.warn(error);
		
		console.log(data)
	})
}

var log_json = function(athlete) {
	if (!athlete) { console.log("athlete is not defined"); }
	
	console.log(athlete);

}

var graph_performances = function(data) {
	// data is a list of performances
	// do graphing
	if (!data) { console.log("data missing") };
	console.log(data);
	
	// adapted from http://bl.ocks.org/mbostock/3883245
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	//var format = d3.time.format("%Y-%m-%dT%H:%M:%SZ"); // "2014-07-21T20:47:00.000Z"
	//var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S0Z").parse;
	var parseDate = d3.time.format.iso.parse;


	var x = d3.time.scale()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var line = d3.svg.line()
		.x(function(d) { return x(d.race_datetime); })
		.y(function(d) { return y(d.time); });

	var svg = d3.select("#viz").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	data.forEach( function(d) {
		d.race_datetime = parseDate(d.race_datetime);
	});

	x.domain(d3.extent(data, function(d) { return d.race_datetime; }));
	y.domain(d3.extent(data, function(d) { return d.time; }));

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Time in Seconds");

	// Add data points
	svg.selectAll(".point")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "point")
		.attr("r", 5)
		.attr("cx", function(d) { return x(d.race_datetime); })
		.attr("cy", function(d) { return y(d.time); })
		.append("title")
		.text(function(d) { return "Time: " + d.time + ", Meet: " + d.meet; });
	
	// connect the dots
	svg.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", line);


}