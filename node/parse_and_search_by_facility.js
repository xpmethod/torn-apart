/*Because the API returns its results asynchronously, and the "for" loop keeps circling merrily despite the API not having completed, it's hard to specify that the results from the API call should be written to the relevant folder named $DETLOC unless the $DETLOC variable is contained in the API results somehow. So I've modified the code for the newsapi package so that it allows us to pass an extra parameter to it, which is then returned unchanged, which lets us to pass the DETLOC along. This means this script only works if you replace the index.js file in the newsapi module folder with the new one*/

//Parses the iceFacs csv (assuming it is in the same folder), saves to nested array, then searches all of newsapi for each facility, associating the results with the DETLOC.)
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ba71f465561b460cb50f98c1cb3320fc');

var parse = require('csv-parse');
var shell = require('shelljs'); // I seem to need this in order to construct intermediate directories if they don't already exist in the final step where I write to the directory structure. fs-extras and the standard mkdir can do the final directory, but not intermediate ones, or so it seems. Or maybe I implemented them wrong.
var fs = require('fs');

//reads in iceFacs.csv (must be in same folder), and puts into a nested array.This is so we can associate facility names with their identifiers.
fs.readFile('../data/iceFacs.csv', function(err, data) {
	if (err) {
		return console.log(err);
	}		
  
	var input = data;//i.e. the content of csv file is set to "input"
	parse(input, {comment: '#'}, function(err, output){ //this parses "input" , i.e. the filestream into a nested array
	
	var i;
	var DETLOC = "";
	for (i=1;i<output.length; i++) //for every row in CSV, i.e. every item in array
	{
		
		DETLOC = output[i][6];
		console.log(DETLOC);
	
		//actual newsapi search
		newsapi.v2.everything(DETLOC, {
		q: output[i][7], //search name of facility (column 7)
		language: 'en',
		pageSize: 100
	}).then(response => {
                var DetentionLocation = response[0];
                var responseBody = response[1];
               // console.log(response[1]);

			 var folderString = "../data/news-sniffer-reports/" + DetentionLocation;
			 console.log("\n\nDetentionLocation = " + DetentionLocation + "\n\n");
			 shell.mkdir('-p', folderString); //creates folders if they don't already exist.
			 var fileString = folderString + "/everything.json";
			 fs.writeFile(fileString, JSON.stringify(responseBody), function(){
			 console.log("wrote a file: " + fileString);
			});
				
		}); 
	}; // end for loop
});



}); // oh oh, somehow I screwed up the indenting but this isn't python so I don't care enough to go back and fix it.


