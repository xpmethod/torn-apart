import $ from "jquery";
import { select } from "d3-selection";
import { forceSimulation, forceCollide, forceY, forceX } from "d3-force";
import { scaleThreshold, scaleOrdinal } from "d3-scale";
import tip from "d3-tip";
import { ckmeans } from "simple-statistics";
import addGlowFilter from "../add-glow-filter";
import { rem, green, purple } from "../constants";
import { bigMoneyFormat } from "../utils";
import Data from "../../data/rain/rainData.csv";
import spinner from "../spinner";
import rainLegend from "./legend";

export default function() {
  const width = $("#rain-viz").width();
  const height = $("#v2-div").height() - $("#rain-header").height() - rem;
  const svg = addGlowFilter(select("#rain-svg"))
    .attr("width", width)
    .attr("height", height);
  const bins = ckmeans(Data.map(d => d.currentValue), 5);
  bins.shift();
  const circleSizes = window.matchMedia("(max-width: 576px)").matches
    ? [1.5, 3, 7, 10, 13]
    : [1.5, 10, 20, 30, 40];
  const r = scaleThreshold()
    .domain(bins.map(bin => bin[0]))
    .range(circleSizes);
  const lightColor = scaleOrdinal()
    .domain(["FALSE", "TRUE"])
    .range([green, purple]);
  const darkColor = scaleOrdinal() //for darkening on mouseover
    .domain(["FALSE", "TRUE"])
    .range(["#2d715c", "#344873"]);
  const theTip = tip()
    .attr("class", "tooltip")
    .offset([-10, 0])
    .html(
      d => `<strong>${d.name}</strong><br />
    $${bigMoneyFormat(d.currentValue)}`
    );
  svg.call(theTip);

  const scaled_width = width * 0.8; //this is the scaling factor for
  // determining the centres of each cluster

  const xCenter = {
    2014: (scaled_width * 4) / 155 + width / 15,
    2015: (scaled_width * (12 + 22)) / 155 + width / 15,
    2016: (scaled_width * (14 + 22 + 31)) / 155 + width / 15,
    2017: (scaled_width * (12 + 22 + 31 + 42)) / 155 + width / 15,
    2018: (scaled_width * (12 + 22 + 30 + 42 + 47)) / 155 + width / 15
  };

  const yCenter = window.matchMedia("(max-width: 576px)").matches
    ? {
        2014: height / 4,
        2015: height / 3,
        2016: height / 2.5,
        2017: height / 2,
        2018: height / 2
      }
    : {
        2014: height / 3.4,
        2015: height / 2.8,
        2016: height / 2.4,
        2017: height / 2,
        2018: height / 1.8
      };

  let forces = window.matchMedia("(max-width: 576px)").matches
    ? { x: 2, y: 0.2, collision1: 3, collision2: 8 }
    : { x: 0.8, y: 0.3, collision1: 1, collision2: 1 };

  // if (window.matchMedia("(min-width: 1000px)").matches) {
  //   forces = { x: 0.7, y: 0.2, collision1: 9, collision2: 9 };
  // }

  var simulation = forceSimulation(Data)
    .force(
      "x",
      forceX()
        .strength(forces.x)
        .x(d => xCenter[d.fiscalYear])
    )
    .force(
      "y",
      forceY()
        .strength(forces.y)
        .y(d => yCenter[d.fiscalYear])
    )
    // .force("y", forceY(height/1.8).strength(0.3))
    .force(
      "collision",
      forceCollide().radius(d => {
        return (
          Math.max(8 / forces.collision2, r(d.currentValue)) * forces.collision1
        );
      })
    )
    .stop();
  // stop the simulation here. This means it doesn't do all its initial stuff
  // in the public eye.

  //this is now making the simulation run a few times without drawing anything,
  //so you don't get all the wibbly wobbly.The higher you make this number, the
  //more clustered the result will be but the longer it will take to load
  const ticks = 15;
  for (let i = 0; i < ticks; i = i + 1) {
    simulation.tick();
  }

  const g = svg.append("g").attr("id", "rain-g");
  g.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .style("fill", d => lightColor(d.multiYear))
    .attr("r", d => r(d.currentValue))
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("opacity", 0.9)
    .attr("class", function(d) {
      return "node" + d.duns;
    }) //this lets us grab them later for mouseover colouring purposes
    .classed("rain-drop", true)
    // .attr("opacity", 0)
    // .attr("transform", d => `translate(0, ${-1 * d.y})`)
    .on("mouseover", function(d) {
      theTip.show(d, this);
      select("#rain-g")
        .selectAll(".node" + d.duns)
        .style("fill", darkColor(d.multiYear));
    })
    .on("mouseout", function(d) {
      select("#rain-g")
        .selectAll(".node" + d.duns)
        .style("fill", lightColor(d.multiYear));
      theTip.hide(d, this);
    });

  svg
    .append("g")
    .attr("id", "rain-subheads-g")
    .selectAll("text")
    .data([2014, 2015, 2016, 2017, 2018])
    .enter()
    .append("text")
    .text(d => `FY ${d}`)
    .classed("subhead", true)
    .classed("centered", true)
    .attr("x", d => xCenter[d])
    .attr("y", 1.75 * rem);

  spinner.stop();

  rainLegend(svg, r, circleSizes);
}
