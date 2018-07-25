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
  const scaling = width*0.000567; //this scales the dots radius appropriately 
  // for different widths of svg
  const scaled_width = width*0.8; //this is the scaling factor for 
  // determining the centres of each cluster

  // this dictionary allows us to grab an x-coordinate to have a node pushed
  // towards, on the basis of its financial year (from a column I added to the
  // data, since each financial year was handled by different worksheets in the
  // original spreadsheet). The values for the centres of each cluster are
  // determined by approximating the cluster as a circle, assuming similar
  // distribution of dots in each, and figuring out from the number of nodes per
  // FY the proportional differences in radius between each, then kind of
  // handwaving the rest and fiddling with the final term until it looks okay.
  // At the very minimum, we should probably replace the hardcoded number of
  // nodes for each FY with the number as grabbed from the data dynamically.
  const xCenter = { 
    2014: scaled_width*4/155+width/15, 
    2015: scaled_width*(12+22)/155+width/15, 
    2016: scaled_width*(14+22+31)/155+width/15, 
    2017: scaled_width*(12+22+31+42)/155+width/15, 
    2018: scaled_width*(12+22+30+42+47)/155+width/15
  };
  
  // a dictionary here is overkill, but just in case you want to change it to a
  // more nuanced set of colours, e.g. for the 'year' column instead.
  const uniqueness_colour = {"multi-year": green, "unique": purple}; 
  
  var simulation = forceSimulation(Data) 
    .force("x", forceX().strength(0.8).x( d => xCenter[d.financial_year]))
    .force("y", forceY(height/1.8).strength(0.3))
    .force("collision", forceCollide().radius( d => {
      return (Math.ceil(scaling*(Math.sqrt(d.current_total_value_of_award)/600+11))); 
      // if you want more space around the larger dots (i.e. padding as
      // proportional to radius), increase the number you divide by (currently
      // 600). If you want more padding around all dots evenly, increase the
      // additional constant (+8). The ceil is to make sure we don't end up
      // with anything under 1 pixel radius.
    }))
    .stop();
  // stop the simulation here. This means it doesn't do all its initial stuff
  // in the public eye.
  
  //this is now making the simulation run a few times without drawing anything,
  //so you don't get all the wibbly wobbly.The higher you make this number, the
  //more clustered the result will be but the longer it will take to load
  const ticks = 15;
  for (let i = 0; i < ticks; i = i + 1){
    simulation.tick(); 
  }

  var labels = [2014, 2015, 2016, 2017, 2018];

  const svg = select("#galaxy-svg")
    .attr("width", width)
    .attr("height", height);
  const defs = svg.append("defs");
  const filter = defs.append("filter").attr("id","filter-glow");
  filter.append("feGaussianBlur")
    .attr("stdDeviation","3.5")
    .attr("result","coloredBlur");
  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in","coloredBlur");
  feMerge.append("feMergeNode").attr("in","SourceGraphic");  

  const g = svg.append("g").attr("id", "galaxy-g");
  g.selectAll("circle")
    .data(Data).enter()
    .append("circle")
    .style("fill", d => uniqueness_colour[d.uniqueness])
    .attr("r", d => scaling*(Math.ceil(Math.sqrt(d.current_total_value_of_award)/700+2)))
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .each(d => {
      d.id = `${d.financial_year}-${d.award_id_piid}`;
      d.tooltip = `<strong>${d.recipient_name}</strong><br />
    &#36;${format(",")(Math.round(d.current_total_value_of_award))}`; // rounded for style
      d.mouseOver = () => {
        select(`#circle-${d.id}`) 
          .attr("filter", "url(#filter-glow)");
      };
      d.mouseOut = () => {
        select(`#circle-${d.id}`)
          .attr("filter", "");
      };
    })
    .attr("id", d => `circle-${d.id}`)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);  
    

  svg.selectAll("text")
    .data(labels).enter()
    .append("text")
    .text( d => `FY ${d}`)
    .attr("x", d => xCenter[d] - 30)
  //this -50 needs to be replaced with something proportional to the text size
    .attr("y", 20)
    .attr("class", "label");

}

