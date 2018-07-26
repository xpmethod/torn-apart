import { select, selectAll } from "d3-selection";
import "d3-transition";



export default function(){
	
  //I don't know why, since I'm not using this data, but I somehow have to create and bind some data to the text thing else no text shows up later.
  const labelData = [ { "key": "value"}];
	
  // choose the slice that was clicked.
  const slice = select(this);
  selectAll(".clicked")
    .transition().delay(0).duration(250)
    .style("stroke-width", 0)
    .style("opacity", "0.7");

  if (!slice.classed("clicked")){
    selectAll(`.${slice.attr("data-group")}-slice`).classed("clicked", true)
      .transition().delay(0).duration(250)
      .style("stroke-width", 5)
      .style("opacity", "1");

    //I create a new <text></text> element inside the #gender-text-svg svg. It is empty.
    var textContainer = select("#gender-text-svg");
    const textsvg = textContainer
      .selectAll("text")
      .data(labelData)	
      .enter()
      .append("text");
	
    //I define segmentLabel as the taName for the currently clicked segment (because I can add this to "<ta-v2-" and ">" later for translation purposes. And I set labelColor to the current segment colour
    var segmentLabel = `${slice.attr("taName")}`;
    var labelColor = `${slice.attr("fill")}`;

    //This actually creates a text label. The text is set to "segmentLabel" with the color "labelColor"
    textsvg
      .attr("x", 0)
      .attr("y", 20)
      .attr("class", "dynamic-legend")
	  .attr("id", "text-container")
      .style("font-size", "1rem")
      .style("font-weight", "bold")
      .attr("fill", function() { return labelColor; })
    //obviously this next bit is generating only the inside bit of the data-i18n="" thingo at the moment. I'm just printing it to the page for now.
      .text(function () {var textlabel = "ta-v2-" + segmentLabel; return textlabel; }); //function () {var textlabel = "ta-v2-" + segmentLabel; return textlabel; })

	 
	  

    //And if you de-click something, then:
  } else {
    slice.transition().delay(0).duration(250)
      .style("stroke-width", 0)
      .style("opacity", "0.7");
	  
//this now removes the legend item when de-clicked
	  select("#text-container")	
      .remove("text");
 
 //this sets the state to 'unclicked' so if you take this out it will never let you select anything else, dummy.
	selectAll(".clicked")
        .classed("clicked", false);
  }
}
