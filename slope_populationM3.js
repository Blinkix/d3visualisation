// DEFINE DRAWING AREA SIZING
var heightB2 = 380;
var widthB2 = 120;
var marginB2top = 100;
var marginB2side = 160;


/*
const textwrap = require('d3-textwrap');
d3.textwrap = textwrap.textwrap;
*/

//CUSTOM TRANSFORM WITH MAP
var widthB1map = 800;

// CREATE DRAWING PART MOVED 30,30 FROM SVG

var chart = d3.select("#C-chart")
	.attr("width", widthB2 + 2*marginB2side)
	.attr("height", heightB2 + 2*marginB2top)
	.attr("transform", "translate(" + widthB1map + "," + 20 + ")")
		.append("g")
		.attr("transform", "translate(" + (marginB2side) + "," + marginB2top + ")");

		
// create a text wrapping function
var wrap = d3.textwrap()
	.bounds({height: 150, width: widthB2+ 2*marginB2side});
	//.method('tspans');

var titleB2 = d3.select("#C-chart")
		.append("g")
		.attr("class","description")
		//.attr("transform", "translate(" + 0 + "," + 0 + ")")
		.append("text")
		.text("Les villages représentaient la plus grande proportion d'habitants en 1968, mais les bourgs et petites villes sont prépondérantes en proportion en 2014");
		
var text = d3.selectAll('.description');	
text.call(wrap);

// PREPARE ANOTATION MAP
const annotationsSlope1 = [
	{ note: { 
	  	label: "En 1968, 40 % de la population habitait dans un village",
	  	wrap: 110
	  }, 
	  x: 100, y:180, dy: 20, dx: -45, subject: { radius: 200, radiusPadding: 10 }
	}
];
const annotationsSlope2 = [
	{ note: { 
	  	label: "plus que 29% en 2014, alors que les villages devenus bourgs concernent uniquement 1/10 d'entre eux",
	  	wrap: 130
	  }, 
	  x: 325, y:265, dy: 15, dx: 55, subject: { radius: 200, radiusPadding: 10 }
	}
];
/*
const annotationsCircle = [
	{
	  note: { label: "",lineType:"none",},
	  x: 305, y:160, dy: 0, dx: 0,
	  subject: { radius: 35, radiusPadding: 10 },
	  connector: { type: "none" }
	}
];
*/

d3.annotation().annotations(annotationsSlope1);
d3.annotation().annotations(annotationsSlope2);
//d3.annotation().annotations(annotationsCircle);

const makeAnnotationsSlope1 = d3.annotation()
	  .type(d3.annotationLabel)
	  .annotations(annotationsSlope1);

const makeAnnotationsSlope2 = d3.annotation()
	  .type(d3.annotationLabel)
	  .annotations(annotationsSlope2);
/*	  
const makeAnnotationsCircle = d3.annotation()
	  .type(d3.annotationCalloutCircle)
	  .annotations(annotationsCircle);
*/
d3.select("#C-chart").append("g")
	  .attr("class", "annotation-groupSlope")
	  .call(makeAnnotationsSlope1);
	  
d3.select("#C-chart").append("g")
	  .attr("class", "annotation-groupSlope")
	  .style("text-anchor","end")
	  .call(makeAnnotationsSlope2);
/*	  
d3.select("#C-chart").append("g")
	  .attr("class", "annotation-groupSlope")
	  .call(makeAnnotationsCircle);
*/
d3.json("data/summary_population.json", function(data) {
	console.log(data);
	
	var total1968 = 0;
	var total2014 = 0;
	
	data.forEach( (d) => {
		total1968 += d.sum1968;
		total2014 += d.sum2014;
	});
	
	console.log("total1968: ",total1968);
	console.log("total2014: ",total2014);
	
	data.forEach( (d) => {
		d.proportion1968 = d.sum1968 / total1968;
		d.proportion2014 = d.sum2014 / total2014;
	});
	
	console.log(data);
  
	// use same scale for both sides
	var yScale = d3.scaleLinear()
		.range([heightB2,0])
		.domain([0,0.5]);
  
	// Bind data
	var lines = chart.selectAll('line.slopeline')
	.data(data)
	.enter()
	.append('line')	
	.attr("class", "slopeline")
	.attr("x1",0)
	.attr("x2",widthB2)
	.attr("y1", 
		(d,i) => {return yScale(d.proportion1968);})
	.attr("y2", 
		(d,i) => {return yScale(d.proportion2014);})
	.style("stroke", 
		(d,i) => {return colorCat(d.categorie);})
		
	// CALL Y AXIS
	//chart.append("g").call(d3.axisRight(yScale));
	
	// LABELS FOR THE COUNTRIES
	var leftLabels = chart.selectAll(".labelsleft")
	.data(data)
	.enter()
	.append('text')
	.attr("class", "labelsleft")
        .attr("x",0)
        .attr("y",
        	(d,i) => { return yScale(d.proportion1968);})
        .text((d,i) => { return formatperc(d.proportion1968) + "   " ;})
        .style('text-anchor','end')
        .attr("transform", "translate(" + (-10) + ",0)");
        
    var rightLabels = chart.selectAll(".labelsright")
	.data(data)
	.enter()
	.append('text')
	.attr("class", "labelsright")
        .attr("x",widthB2)
        .attr("y",
        	(d,i) => {return yScale(d.proportion2014);})
        .text((d,i) => { return formatperc(d.proportion2014) + "   " ;})
        .attr("transform", "translate(" + 10 + ",0)");
	
	
	// LABELS FOR THE YEAR
	var leftTitle = chart.append('text')
		.attr("class", "labelyear")
        .attr("x",0)
        .attr("y",heightB2+20)
        .text("1968")
        .style('text-anchor','end');

    var rightTitle = chart.append('text')
    	.attr("class", "labelyear")
        .attr("x",widthB2 + marginB2side/2-30)
        .attr("y",heightB2+20)
        .text("2014")
        .style('text-anchor','end');
   
   var subtitle = chart.append('text')
    	.attr("class", "smallDescription")
        .attr("x",-marginB2side)
        .attr("y",0)
        .text("Pourcentage d'habitants par catégorie")
        .style('text-anchor','start');


});
