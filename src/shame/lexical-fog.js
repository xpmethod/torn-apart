//Currently using a very small subset of the data. And it isn't cleaned correctly. I just removed duplicate names, whereas in actual fact, we should add together the award amounts for each company that appears multiple times.


//import { handleMouseOver, handleMouseOut } from "../tooltip"; //Moacir added this so we can all use the same tooltip code
import { rem, green, purple, orange } from "../constants";
import Data from "../../data/tempWordCloudData.csv";
import { select } from "d3-selection";
import * as cloud from "d3-cloud";
import { scaleLinear } from "d3-scale";
import { titleUp } from "../utils";
//import { format } from "d3-format";


//still needs a lot of formatting work, colouring from something in the data, and adding tooltips or something so you can get info about each org/contract. Maybe html links from each org name to the org's "contact us" page or direct to email links? So you can write and complain easily. 

export default function(){  

var colour = [green, purple, orange, "pink", "lime" ]; //obvs we colour according to something non-random eventually. But we do need distinct colours to make sure we can see where one org name ends and the next starts.

const width = $(window).width() - 4 * rem;
const height = $("#v2-div").position().top + $("#v2-div").height() - $("#lexical-fog-svg").position().top; //I just adapted this from galaxy viz without knowing how it works, so it's no surprise that it really doesn't.
  
//  console.log(String(width)+ " and height is " + String(height));
  const positionx = width/2;
  const positiony = height/2;

    cloud().size([width-width/6, height])
            .words(Data)
			.text(function(d) { return d.recipient_name; }) 
            .rotate(0)
            .fontSize(function(d) {return Math.ceil(Math.sqrt(d.current_total_value_of_award)); })
			.padding(3)
			.font("Impact")
            .on("end", draw)
            .start();

    function draw(words) {
       select("#lexical-fog-svg")
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(600, 0)") //like, I dunno. Replacing the numbers here with width/height variables doesn't work and I don't know why not.
                .selectAll("text")
                .data(words)
                .enter().append("text")
				.attr("text-anchor", "middle")
				.style("font-family", "Impact")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", function(d) {return colour[Math.floor(Math.random() * 5)];}) //I dunno why this isn't always colouring the text. Sometimes it stays black.
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return titleUp(d.recipient_name); });
    }
  
}
