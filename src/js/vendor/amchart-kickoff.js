var Chart = {};

Chart.render = function(id,data,options) {

	var element = document.getElementById(id);
	if (!element) {
		return;
	}

	options = options || {};
	var reversed = options.reversed || false;

	element.className += ' chart-wrapper';
	element.style.height = (element.offsetWidth * .5) + 'px';

	var chart = new AmCharts.AmSerialChart();
	chart.pathToImages = "http://www.amcharts.com/lib/images/";
	chart.dataProvider = data;
	chart.autoMargins = true;
	chart.marginRight = 10;
	chart.marginTop = 30;
	chart.categoryField = "date";
	chart.color = "#ddddd";
	chart.numberFormatter = {
		precision:-1,
		decimalSeparator:',',
		thousandsSeparator:'.'
	};

	var categoryAxis = chart.categoryAxis;
	categoryAxis.parseDates = true;
	categoryAxis.minPeriod = "DD";
	categoryAxis.axisColor = "#dddddd";
	categoryAxis.gridAlpha = .2;
	categoryAxis.color = "#555555";
	categoryAxis.fontSize = 12;
	categoryAxis.dashLength = 4;
	categoryAxis.tickLength = 0;

	// value
	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.axisAlpha = 1;
	valueAxis.axisColor = "#dddddd";
	valueAxis.inside = false;
	valueAxis.gridAlpha = .1;
	valueAxis.color = "#555555";
	valueAxis.fontSize = 12;
	valueAxis.tickLength = 0;
	valueAxis.reversed = reversed;
	chart.addValueAxis(valueAxis);

	// graph
	var graph = new AmCharts.AmGraph();
	graph.type = "smoothedLine";
	graph.lineColor = "#ff1c58";
	graph.bullet = "round";
	graph.bulletSize = 8;
	graph.bulletBorderColor = "#ffffff";
	graph.bulletBorderThickness = 1;
	graph.lineThickness = 3;
	graph.valueField = "value";
	chart.addGraph(graph);

	// write
	chart.write(id);

	// append copy right
	element.innerHTML += '<a class="copyright" href="http://www.amcharts.com" target="_blank">Chart by amcharts.com</a>';
};