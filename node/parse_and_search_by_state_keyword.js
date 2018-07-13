//Parses the iceFacs csv (assuming it is in the same folder), saves to nested array, then searches all of newsapi for each facility, associating the results with the strCounty.)
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('YOUR API KEY HERE');

var parse = require('csv-parse');
var shell = require('shelljs'); // I seem to need this in order to construct intermediate directories if they don't already exist in the final step where I write to the directory structure. fs-extras and the standard mkdir can do the final directory, but not intermediate ones, or so it seems. Or maybe I implemented them wrong.
var fs = require('fs');


//reads in iceFacs.csv (must be in same folder), and puts into a nested array.This is so we can associate facility names with their identifiers.
fs.readFile('../data/news-crawl-output.csv', function(err, data) {
	if (err) {
		return console.log(err);
	}		
  
	var input = data;//i.e. the content of csv file is set to "input"
	parse(input, {comment: '#'}, function(err, output){ //this parses "input" , i.e. the filestream into a nested array
	
	var i;
	var strDomain;
	for (i=1;i<10; i++) //change this to first 200 counties to avoid rate-limiting output.length
	{
		
		strDomain = output[i][1];
		domains = [ strDomain ];

		console.log(strDomain);
		
		//actual newsapi search
		domains.map( domain => {
                               newsapi.v2.everything({
                                   q: "'ICE' OR 'refugee' OR 'refugees' OR 'immigration' OR 'asylum' OR 'detention center' OR 'border crisis' OR 'undocumented immigrant' OR 'illegal immigrant'", 
                                   language: 'en',
                                   pageSize: 100, 
								   domains: strDomain
								   
				}).then(response => {
			
		console.log(domain);
										
		var folderString = "../data/news-sniffer-reports/keywords-only" + domain; 
		
		shell.mkdir('-p', folderString); //creates folders if they don't already exist. It does not overwrite existing folders.
		var fileString = folderString + ".json";
		
											fs.writeFile(fileString, JSON.stringify(response), function() {
                                            console.log("wrote a file: " + fileString);
                                        });
                                   });    //end then
                            });    //end map


	};    // end for loop
        });   // end parse

});  // end fs.readfile


