//Parses the iceFacs csv (assuming it is in the same folder), saves to nested array, then searches all of newsapi for each facility, associating the results with the strCounty.)
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a5a80fb12bee48bdb7599a9e89e9b363');

var parse = require('csv-parse');
var shell = require('shelljs'); // I seem to need this in order to construct intermediate directories if they don't already exist in the final step where I write to the directory structure. fs-extras and the standard mkdir can do the final directory, but not intermediate ones, or so it seems. Or maybe I implemented them wrong.
var fs = require('fs');

// Read in the news list and get the associated domains
fs.readFile('../data/news-crawl-output.csv', function(err, data) {
	if (err) {
		return console.log(err);
	}		
  
	var input = data;//i.e. the content of csv file is set to "input"
	parse(input, {comment: '#'}, function(err, output){ //this parses "input" , i.e. the filestream into a nested array
	
	var i;
	var strDomain;
        // Note we start the loop at row 1, because row zero contains the headers, i.e. names of the columns
        // There are four columns: county, link, name, state

	for (i=1;i<10; i++) //change i< to first 350 counties to avoid rate-limiting output.length
	{

		strDomain = output[i][1]; // row i, column "link"
		domains = [ strDomain ];
		//console.log(output[0][1]);

		console.log(strDomain);
		
		//actual newsapi search:
		domains.map( domain => {
								newsapi.v2.everything({ q: "ICE" }).then(response => { //close domains.map 

			
		//console.log(domain);
										
		var folderString = "../data/news-sniffer-reports/keywords-only/";
		shell.mkdir('-p', folderString); //creates folders if they don't already exist. It does not overwrite existing folders.
		var fileString = folderString + domain + ".json";
		
                fs.writeFile(fileString, JSON.stringify(response), function() {
                                            console.log("wrote a file: " + fileString);
                                        });
                                   });    //end then
                            });    //end map


	};    // end for loop
        });   // end parse

});  // end fs.readfile


