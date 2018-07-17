//Parses the iceFacs csv (assuming it is in the same folder), saves to nested array, then searches all of newsapi for each facility, associating the results with the DETLOC.)
import config from "./environment";

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(config().newsApiKey);

var parse = require('csv-parse');
var shell = require('shelljs'); // I seem to need this in order to construct intermediate directories if they don't already exist in the final step where I write to the directory structure. fs-extras and the standard mkdir can do the final directory, but not intermediate ones, or so it seems. Or maybe I implemented them wrong.
var fs = require('fs');

//reads in iceFacs.csv (must be in same folder), and puts into a nested array.This is so we can associate facility names with their identifiers.
fs.readFile('../data/facilities-for-news-sniffing.csv', function(err, data) {
	if (err) {
		return console.log(err);
	}		
  
	var input = data;//i.e. the content of csv file is set to "input"
	parse(input, {comment: '#'}, function(err, output){ //this parses "input" , i.e. the filestream into a nested array
	
	var i;
	var DETLOC = "";
	for (i=1;i<3; i++) //change this to first 200 detention centres to avoid rate-limiting
	{
		
		DETLOC = output[i][0];
		locations = [ DETLOC ];

		//actual newsapi search
		locations.map( location => {
                               newsapi.v2.everything({
                                   q: output[i][1], //search name of facility (column 7)
                                   language: 'en',
                                   pageSize: 100
				}).then(response => {
			
		console.log(location);
										
		var folderString = "../data/news-sniffer-reports/" + location; // if we are lucky, this should save the output in the same format as muziejus's report system: each facility's report to /data/news-sniffer-reports/${DETLOC}/everything.json 
		
		shell.mkdir('-p', folderString); //creates folders if they don't already exist. It does not overwrite existing folders.
		var fileString = folderString + "/everything.json";
		
											fs.writeFile(fileString, JSON.stringify(response), function() {
                                            console.log("wrote a file: " + fileString);
                                        });
                                   });    //end then
                            });    //end map


	};    // end for loop
        });   // end parse

});  // end fs.readfile


