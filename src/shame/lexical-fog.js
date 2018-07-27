//Currently using a very small subset of the data. And it isn"t cleaned correctly. I just removed duplicate names, whereas in actual fact, we should add together the award amounts for each company that appears multiple times.

// simple test

//import { handleMouseOver, handleMouseOut } from "../tooltip"; //Moacir added this so we can all use the same tooltip code
import Data from "../../data/tempWordCloudData.csv";
import { select } from "d3-selection";
import * as cloud from "d3-cloud";
import * as colorscale from "d3-scale-chromatic";


//still needs a lot of formatting work, colouring from something in the data, and adding tooltips or something so you can get info about each org/contract. Maybe html links from each org name to the org"s "contact us" page or direct to email links? So you can write and complain easily. 
//still TODO - need to style the tooltips and bring them to the top

export default function(chart){  

  const width = chart.width;
  const height = chart.height;

  var colour = colorscale.schemeSet2; 
  var svg = select("#lexical-fog-svg")
    .attr("class", "wordcloud")
    .append("g")
    // without the transform, words would get cutoff to the left and top, they would
    // appear outside of the SVG area
    .attr("transform", "translate("+ width/2 + "," + height/2 + ")");  

  var tip = svg.append("g")
    .attr("id","cloud_tooltip")
    .attr("position","absolute");

  cloud().size([width, height-height*0.2])
    .words(Data)
    .text(function(d) { return d.name; }) 
    .rotate(0)
    .fontSize(function(d) {return (Math.ceil(Math.pow(d.total_value, 0.26))/4 +6); })
    .padding(1)
    .font("Impact")
    .on("end", draw)
    .start();

  function draw(words) {
    svg.selectAll("text")
      .data(words)
      .enter().append("text")
      .attr("text-anchor", "middle")
      .style("font-family", "Impact")
      .style("font-size", function(d) { return (Math.ceil(Math.pow(d.total_value, 0.26))/4 +4) + "px"; })
      .style("fill", function(d) {return colour[5-d.years];}) 
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.name; })
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
  }
  
  //Hovering handlers
  function handleMouseOver(d){ 
    //Lighten text
    select(this).style("opacity",0.7);
		
    //Show tooltip
    var base = d.y - d.size; //Calculate position of text

    tip.append("text")
      .attr("id","cloud_tooltip_text")
      .attr("x",d.x)
      .attr("y",base)
      .attr("text-anchor", "middle")
      .style("font-size","1.25rem")
      .style("fill", colour[5-d.years])
      .text("$" + d.total_value);

    tip.append("rect")
      .attr("id","cloud_tooltip_rect")
      .attr("width",select("#cloud_tooltip_text").node().getBBox().width)
      .attr("height",select("#cloud_tooltip_text").node().getBBox().height)
      .attr("x",select("#cloud_tooltip_text").node().getBBox().x)
      .attr("y",select("#cloud_tooltip_text").node().getBBox().y)
      .attr("fill","black")
      .style("opacity",0.3);
  }
  function handleMouseOut() {
    select(this)
      .style("opacity",1);

    //Remove tooltip
    select("#cloud_tooltip_text").remove(); 
    select("#cloud_tooltip_rect").remove();
  }
	
  // Number.prototype.formatMoney = function(c, d, t){
  //   var n = this, 
  //     c = isNaN(c = Math.abs(c)) ? 2 : c, 
  //     d = d === undefined ? "." : d, 
  //     t = t === undefined ? "," : t, 
  //     s = n < 0 ? "-" : "", 
  //     i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
  //     j = (j = i.length) > 3 ? j % 3 : 0;
	
  //   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  // };
}
