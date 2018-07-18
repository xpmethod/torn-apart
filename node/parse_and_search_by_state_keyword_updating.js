//Parses the iceFacs csv (assuming it is in the same folder), saves to nested array, then searches all of newsapi for each facility, associating the results with the strCounty.)
const NewsAPI = require("newsapi");

const newsapi = new NewsAPI("ba69330e8028431b8409c31ccab1913b");

var parse = require("csv-parse");
var shell = require("shelljs"); // I seem to need this in order to construct intermediate directories if they don't already exist in the final step where I write to the directory structure. fs-extras and the standard mkdir can do the final directory, but not intermediate ones, or so it seems. Or maybe I implemented them wrong.
var fs = require("fs");

// Read in the news list and get the associated domains
fs.readFile("../data/news-crawl-output.csv", function(err, data) {
	if (err) {
		throw "error";
	}		

	var input = data;//i.e. the content of csv file is set to "input"
	parse(input, {comment: "#"}, function(err, output){ //this parses "input" , i.e. the filestream into a nested array called output

	var singlecolumn_output = [];  

// output has four columns: county, link, name, state
// We only care about the link.

// The first row just has the names of the columns, so skip that
	for (var i=1; i<9; i++) //change this to first 10 counties to avoid rate-limiting output.length
	{
		singlecolumn_output.push(output[i][1]); //puts the bits of output I'm going to use in query into a new array called "singlecolumnoutput"
	}


		//actual newsapi search
		// use ".map" to loop over all entries in "domains", and execute a function (the newsapi call) on each enty
		singlecolumn_output.map( (row, i) => {
								newsapi.v2.everything({
								q: '("ICE" AND ("detainee" OR "detainees" OR "detention" OR "enforcement" OR "agents" OR "refugee" OR "refugees" OR "immigration" OR "immigrant" OR "asylum")) OR ("TRUMP" AND ("detention center" OR "border crisis"))', 
								language: "en",
								pageSize: 100, 
								domains: String(row)				
				}).then(response => {
		//console.log("Response is" + JSON.stringify(response));
	
										
		var folderString = "../data/keywords-only/"; 
		
		shell.mkdir("-p", folderString); //creates folders if they don't already exist. It does not overwrite existing folders.
		var fileString = folderString + String(i) + ".json"; //going to write it to files numbered by the chunk, because multiple domains per api call, so nothing useful to name them after. we'll have to iterate over the json later and grab the domain for each result and use that to look up state/county from our csv.
		
			fs.writeFile(fileString, JSON.stringify(response), function() {});
							});//end then
					});//end map



		});// end parse

});	// end fs.readfile


