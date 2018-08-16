import $ from "jquery";
import _ from "lodash";
import { select } from "d3-selection";
import { forceSimulation, forceCollide, forceY, forceX} from "d3-force";
import { format } from "d3-format";
import { scaleThreshold, scaleOrdinal } from "d3-scale";
import tip from "d3-tip";
import { ckmeans } from "simple-statistics";
import rainSizeLegend from "./size-legend";
import addGlowFilter from "../add-glow-filter";
import { fillV2DivHeight } from "../utils";
import { rem, green, purple } from "../constants";
import Data from "../../data/rain/rainData.csv";

export default function(){  
  const width = $("#rain-viz").width();
  const height = fillV2DivHeight("#rain-header");
  const svg = addGlowFilter(select("#rain-svg"))
    .attr("width", width)
    .attr("height", height);
  const bins = ckmeans(Data.map(d => d.currentValue), 5);
  bins.shift();
  const circleSizes = [1.5, 10, 20, 30, 40];
  const r = scaleThreshold()
    .domain(bins.map(bin => bin[0]))
    .range(circleSizes);
  const color = scaleOrdinal()
    .domain([ "TRUE", "FALSE" ])
    .range([ purple, green ]);
  const theTip = tip()
    .attr("class", "tooltip")
    .offset([-10, 0])
    .html(d => `<strong>${d.name}</strong><br />
    &#36;${format(",")(Math.round(d.currentValue))}`);
  svg.call(theTip);

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

  const yCenter = {
    2014: height/3.4,
    2015: height/2.8, 
    2016: height/2.4, 
    2017: height/2, 
    2018: height/1.8
  };
  
  var simulation = forceSimulation(Data) 
    .force("x", forceX().strength(0.8).x( d => xCenter[d.fiscalYear]))
    .force("y", forceY().strength(0.3).y( d => yCenter[d.fiscalYear]))
    // .force("y", forceY(height/1.8).strength(0.3))
    .force("collision", forceCollide().radius( d => {
      return Math.max(8, 1.5 * r(d.currentValue));
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

  const g = svg.append("g").attr("id", "rain-g");
  g.selectAll("circle")
    .data(Data).enter()
    .append("circle")
    .style("fill", d => color(d.multiYear))
    .attr("r", d => r(d.currentValue))
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("opacity", 0.9)
    .each(d => {
      d.id = `${d.fiscalYear}-${d.awardID}`;
    })
    .attr("id", d => `circle-${d.id}`)
    .classed("rain-drop", true)
    // .attr("opacity", 0)
    // .attr("transform", d => `translate(0, ${-1 * d.y})`)
    .on("mouseover", theTip.show)
    .on("mouseout", theTip.hide);  
    

  svg.append("g").attr("id", "rain-subheads-g")
    .selectAll("text")
    .data([2014, 2015, 2016, 2017, 2018]).enter()
    .append("text")
    .text( d => `FY ${d}`)
    .classed("subhead", true)
    .classed("centered", true)
    .attr("x", d => xCenter[d])
    .attr("y", 1.75 * rem);

  // Alas…
  // g.selectAll("circle.rain-drop")
  //   .transition()
  //   .delay(4000)
  //   .duration(2000)
  //   .ease(easeElastic)
  //   .attr("opacity", 1)
  //   .attr("transform", "translate(0,0)");

  const legendG = svg.append("g")
    .attr("id", "rain-legend")
    .classed("legend", true);

  const sizeLegendContent = rainSizeLegend(r);
  // const colorLegendContent = rainColorLegend(color);

  // legendG.append("g")
  //   .attr("id", "rain-color-legend")
  //   .call(colorLegendContent);
    
  legendG.append("g")
    .attr("id", "rain-size-legend")
    // 50 = shapePadding in size-legend.js
    // .attr("transform", `translate(${$("#rain-color-legend")[0].getBBox().width + 50},0)`)
    .call(sizeLegendContent)
    .selectAll("circle")
    .attr("fill", purple);

  const rainLegendWidth = $("#rain-size-legend")[0].getBBox().width;
  _.each([
    { text: "Unique contracts", y: 12 },
    { text: "Renewed contracts", y: 35 }
  ], d => {
    select("#rain-size-legend").select("g")
      .append("text")
      .attr("transform", `translate(${rainLegendWidth}, ${d.y})`)
      .text(d.text);
  });
  
  legendG.attr("transform", `translate(30, ${svg.attr("height") - 
    $("#rain-legend")[0].getBBox().height})`)
    .selectAll(".legendTitle")
    .attr("transform", "translate(0, -15)")
    .classed("subsubhead", true);

  select("#rain-size-legend .legendCells")
    .selectAll(".cell")
    .append("circle")
    .each(function(d, i) {
      svg.append("clipPath")
        .attr("id", `rain-size-legend-clip-path-${i}`)
        .append("rect")
        .attr("transform", `translate(${circleSizes[i] * -1},0)`)
        .attr("width", 2 * circleSizes[i])
        .attr("height", circleSizes[i]);
    })
    .attr("clip-path", (d, i) => `url(#rain-size-legend-clip-path-${i}`)
    .attr("fill", green)
    .attr("r", (d, i) => circleSizes[i] );
}

