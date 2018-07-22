
import { green } from "../constants";

// Why is there a galaxyVizData.csv also in src? I've moved it into src/galaxy
// for now, but you all should only have one copy of the csv lying around!
import Data from "../../data/galaxyVizData.csv";
import { event, select } from "d3-selection";
import { forceSimulation, forceCollide, forceX, forceY, forceManyBody} from "d3-force";
import $ from "jquery";
import { format } from "d3-format";


export default function(){	
  var  svg = select("svg");
  var dataEntries = Data;
  var width = 600; //these are chosen kind of at random because larger numbers make the whole thing zoom off to the bottom right for no good reason.
  var height = 300;
  var forceStrength = 0.05;
  var center = {x: width / 2, y: height / 2};
  const toolTip = select("body").append("div")
    .classed("tooltip", true)
    .style("opacity", 0);

  //force directed layout code. Supposedly stops things colliding. Need to fiddle with radius calculation.  A lot of it is based on this: https://medium.freecodecamp.org/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46
  forceSimulation(dataEntries) 
    .force("charge", forceManyBody().strength(charge)) 
    .force("x", forceX().strength(forceStrength).x(center.x))
    .force("y", forceY().strength(forceStrength).y(center.y))
    .force("collision", forceCollide().radius(function(d) {
      return (Math.sqrt(d.current_total_value_of_award)/400+1) + 2;
    }))	
    .on("tick", ticked); 
	
  function charge(d) { //this is making sure the forcestrength is proportional to radius of each bubble
    return -forceStrength * Math.pow((Math.sqrt(d.current_total_value_of_award)/400+1), 2.0);
  }
	
  function ticked() { 
    node.attr("cx", function(d) { return d.x; }) 
      .attr("cy", function(d) { return d.y; }); 
  }

  //creates a circle from every item in the data, with radius set so that the total area of the circle approximately scales based on the value of award. I'm not doing anything with other column in the sheet right now, but we can animate based on year, and colour based on something. 
  var node = svg.selectAll("circle")
    .data(dataEntries)
    .enter()
    .append("circle")
    .style("fill", green) //you could tie the colour to a data element but I don't know which one would be good for this.
    .attr("r", function(d) { return (Math.sqrt(d.current_total_value_of_award)/400+1); })
    .attr("transform", "translate(" + [width / 2, height / 2] + ")")
    .on("mouseover", function(d){
      select(this)
        .attr("fill", green)
        .attr("filter", "url(#filter-glow)");
      toolTip
        .html(`<strong>${d.recipient_name}</strong><br /> $ 
          ${format(",")(d.current_total_value_of_award)}`)
        .style("left", function(){
          const toolTipWidth = $(".tooltip").width();
          if(toolTipWidth > event.pageX){
            return event.pageX + "px";
          } else {
            return (event.pageX - toolTipWidth) + "px";
          }
        })
        .style("top", function(){
          const toolTipHeight = $(".tooltip").height();
          if(($(window).height() - event.pageY) < toolTipHeight){
            return (event.pageY - toolTipHeight) + "px";
          } else {
            return event.pageY + "px";
          }
        })
        .transition().delay(750).duration(500)
        .style("opacity", 1);
    })
    .on("mouseout", function(){
      select(this)
        .attr("fill", "black")
        .attr("filter", "");
      toolTip.style("opacity", 0);
    });
}
	
	

