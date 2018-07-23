import $ from "jquery";
import { handleMouseOver, handleMouseOut } from "../tooltip"; //Moacir added this so we can all use the same tooltip code
import { rem, green, purple } from "../constants";
import Data from "../../data/galaxyVizData.csv";
import { select } from "d3-selection";
import { forceSimulation, forceCollide, forceY, forceX} from "d3-force";
import { format } from "d3-format";

export default function(){	
  const width = $(window).width() - 4 * rem;
  const height = $("#v2-div").position().top + $("#v2-div").height() - $("#galaxy-svg").position().top;

  var xCenter = {2014: width/6, 2015: width/6*2, 2016: width/6*3, 2017: width/6*4, 2018: width/6*5}; //this dictionary allows us to grab an x-coordinate to have a node pushed towards, on the basis of its financial year (from a column I added to the data, since each financial year was handled by different worksheets in the original spreadsheet).

  var uniqueness_colour = {"multi-year": green, "unique": purple}; //a dictionary here is overkill, but just in case you want to change it to a more nuanced set of colours, e.g. for the 'year' column instead.

  var simulation = forceSimulation(Data) 
    .force("x", forceX().strength(0.5).x(function(d) {
      return xCenter[d.financial_year];
    }))
    .force("y", forceY(height/2))
    .force("collision", forceCollide().radius(function(d) {
      return (Math.ceil(Math.sqrt(d.current_total_value_of_award)/600+8)); // if you want more space around the larger dots (i.e. padding as proportional to radius), increase the number you divide by (currently 600). If you want more padding around all dots evenly, increase the additional constant (+5)
    }))

    .stop();//stop the simulation here. This means it doesn't do all its initial stuff in the public eye.
	

  for (var i = 0; i < 10; ++i) simulation.tick(); //this is now making the simulation run a few times without drawing anything, so you don't get all the wibbly wobbly.The higher you make this number, the more clustered the result will be but the longer it will take to load

  var labels = [2014, 2015, 2016, 2017, 2018];

  const svg = select("#galaxy-svg")
    .attr("width", width)
    .attr("height", height);
  var text = svg
    .selectAll("text")
    .data(labels);
    
  text.enter()
    .append("text")
    .text(function(d){
      return "FY " + d;
    })
    .attr("x", function(d){
      return xCenter[d] -50;
    })
    .attr("y", 20)
    .attr("class", "label")
  ;



  var node = svg.selectAll("circle")
    .data(Data);
  node.enter().append("circle")
    .style("fill", d => uniqueness_colour[d.uniqueness])
    .attr("r", function(d) { return (Math.ceil(Math.sqrt(d.current_total_value_of_award)/700+2)); })
    // .merge(node)
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .each(d => {
      d.tooltip = `<strong>${d.recipient_name}</strong><br />
		&#36;${format(",")(Math.round(d.current_total_value_of_award))}`; //rounded to nearest whole number, because the period before the cents was hard to see and made the numbers look bigger than they really are, plus it was doing .4 and .3 instead of .40, .30, etc.
      d.mouseOver = () => {
        select(this) //I don't think these lines are working and I don't know why. No filter glow. 
          .attr("filter", "url(#filter-glow)");
      };
      d.mouseOut = () => {
        select(this)
          .attr("filter", "");
      };
    })
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
	

}
