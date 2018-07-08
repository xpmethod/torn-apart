//Parses the iceFacs csv (assuming it is in the same folder), saves to nested array, then searches all of newsapi for each facility, associating the results with the DETLOC. Call with "node parse_and_search_by_facility.js > log-file.txt" to save results to text file. Hopefully doesn't quite exceed the API limit but we'll see (haven't tested because already exceeded my api limit for this six hour period)
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ba71f465561b460cb50f98c1cb3320fc');

var parse = require('csv-parse');
var shell = require('shelljs'); // I seem to need this in order to construct intermediate directories if they don't already exist in the final step where I write to the directory structure. fs-extras and the standard mkdir can do the final directory, but not intermediate ones, or so it seems. Or maybe I implemented them wrong.
var fs = require('fs');

//reads in iceFacs.csv (must be in same folder), and puts into a nested array.This is so we can associate facility names with their identifiers.
fs.readFile('iceFacs.csv', function(err, data) {
	if (err) {
		return console.log(err);
	}		
  
	var input = data;//i.e. the content of csv file is set to "input"
	parse(input, {comment: '#'}, function(err, output){ //this parses "input" , i.e. the filestream into a nested array
	
	var i;
	for (i=0;i<output.length; i++) //for every row in CSV, i.e. every item in array
	{
		
		newsapi.v2.everything({
		q: output[i][7], //search name of facility (column 7)
		from: '2018-06-08', //can only go back 1 month for now with free api
		to: '2018-07-07',
		language: 'en',
		sortBy: 'relevancy', //actually, am not sure about this. We should sort by date if we are ever going to have multiple pages, otherwise I think we could run into some issues (a documented problem with some of the other news apis I looked at. It's possible it's not a problem for this one though). And probably only need 1 page since most seem to have at max up to 5 results. MAYBE for some of them we will need more than 1 page. Can explore that later.
		pageSize: 100
	}).then(response => {
		//console.log(output[i][6], response); //logs DETLOC : result
			
		var folderString = "data/news-sniffer-reports/" + output[i][6]; // if we are lucky, this should save the output in the same format as muziejus's report system: each facility's report to /data/news-sniffer-reports/${DETLOC}/everything.json 
		shell.mkdir('-p', folderString); //creates folders if they don't already exist. It does not overwrite existing folders.
		var fileString = folderString + "/everything.json";
		fs.writeFile(fileString, response, function(){
			 console.log("wrote a file");
			});
			//	console.log('Saved file ' + fileString);
		});
	};
});

}); // oh oh, somehow I screwed up the indenting but this isn't python so I don't care enough to go back and fix it.

