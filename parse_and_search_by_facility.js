
var parse = require('csv-parse');

var fs = require('fs');

//reads in iceFacs.csv (must be in same folder), and puts into a nested array.This is so we can associate facility names with their identifiers.
fs.readFile('iceFacs.csv', function(err, data) {
	if (err) {
		return console.log(err);
	}		
  
	var input = data;//i.e. the content of csv file is set to "data"
	parse(input, {comment: '#'}, function(err, output){ //this parses "data" , i.e. the filestream into a nested array
	
	var i;
	for (i=0;i<output.length; i++) //for every row in CSV, i.e. every item in array
	{
		newsapi.v2.everything({
		q: output[i][7], //search name of facility (column 7)
		from: '2018-06-08',
		to: '2018-07-07',
		language: 'en',
		sortBy: 'relevancy',
		page: 1 // probably only need 1 page since most seem to have at max up to 5 results. MAYBE for some of them we will need more than 1 page. Can explore that later.
	}).then(response => {
		console.log(output[i][6], response); //logs DETLOC : result
		});

	};
});

}); // oh oh, somehow I fucked up the indenting but this isn't python so I don't care enough to go back and fix it.

