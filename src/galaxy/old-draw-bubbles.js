import { handleMouseOver, handleMouseOut } from "../tooltip"; //Moacir added this so we can all use the same tooltip code
import { green } from "../constants";
import Data from "../../data/galaxyVizData.csv";
import { select } from "d3-selection";
import { forceSimulation, forceCollide, forceCenter} from "d3-force";
import { format } from "d3-format";


export default function(){	
  var  svg = select("svg");
  var dataEntries = Data;
  const width = 900; //600/300  are chosen kind of at random because larger numbers make the whole thing zoom off to the bottom right for no good reason.
  const height = 500;


  //force directed layout code. Supposedly stops things colliding. Need to fiddle with radius calculation.  A lot of it is based on this: https://medium.freecodecamp.org/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46
  
  forceSimulation(dataEntries) 
    .force("center", forceCenter(width / 2, height / 2))
    .force("collision", forceCollide().radius(function(d) {
      return (Math.sqrt(d.current_total_value_of_award)/400+1) + 2;
    }))	
    .on("tick", ticked); 

  function ticked() { 
    node .attr("cx", function(d) { return d.x; }) 
      .attr("cy", function(d) { return d.y; }) 
      .style("visibility", "visible"); //this is an attempt to deal with the problem of everything showing up on the far left first. (Make it invisible until the simulation has started).
  }

  //creates a circle from every item in the data, with radius set so that the total area of the circle approximately scales based on the value of award. I'm not doing anything with other column in the sheet right now, but we can animate based on year, and colour based on something. 
  
  var node = svg.selectAll("circle")
    .data(dataEntries)
    .enter()
    .append("circle")
    .style("fill", green) //you could tie the colour to a data element but I don't know which one would be good for this.
    .style("visibility", "hidden")
    .attr("r", function(d) { return (Math.sqrt(d.current_total_value_of_award)/400+1); })
  //  .attr("transform", "translate(" + [width / 2, height / 2] + ")")
    .each(d => {
      d.tooltip = `<strong>${d.recipient_name}</strong><br />
          &#36;${format(",")(Math.round(d.current_total_value_of_award))}`; //rounded to nearest whole number, because the period before the cents was hard to see and made the numbers look bigger than they really are, plus it was doing .4 and .3 instead of .40, .30, etc.
      d.mouseOver = () => {
        select(this)
          .attr("fill", green)
          .attr("filter", "url(#filter-glow)");
        d.mouseOut = () => {
          select(this)
            .attr("fill", "black")
            .attr("filter", "");
        };
      };
    })
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

}
