//Parses the news-crawl-output list and then searches each domain for some keywords relating to the border crisis. Saves results to files named for the counties of each domain (appending when there is already an existing file).
const NewsAPI = require("newsapi");

const newsapi = new NewsAPI("YOUR KEY HERE");

var parse = require("csv-parse");
var shell = require("shelljs"); // I seem to need this in order to construct intermediate directories if they don't already exist in the final step where I write to the directory structure. fs-extras and the standard mkdir can do the final directory, but not intermediate ones, or so it seems. Or maybe I implemented them wrong.
var fs = require("fs");

// Read in the news list and get the associated domains
fs.readFile("../data/news-crawl-output.csv", function(err, data) {
  if (err) throw err;

  var input = data; //i.e. the content of csv file is set to "input"
  parse(input, { comment: "#" }, function(err, output) {
    //this parses "input" , i.e. the filestream into a nested array

    var twocolumn_output = [];

    // output has four columns: county, link, name, state
    // We want to extract the first two columns, county and the domain
    // The first row just has the names of the columns, so skip that

    //for (i=1; i<output.length; i++) //change this to first 3 counties to avoid rate-limiting output.length
    for (
      let i = 1;
      i < 390;
      i++ //change this to first 10 counties to avoid rate-limiting output.length
    ) {
      twocolumn_output.push(output[i]);
    }

    // twocolumn_output.map( (row) => {
    //       // console.log(row[0]);
    //       // console.log(row[1]);
    // });

    //actual newsapi search
    // use ".map" to loop over all entries in "domains", and execute a function (the newsapi call) on each enty
    //seems to need http and www to be stripped now though, weirdly
    twocolumn_output.map(row => {
      newsapi.v2
        .everything({
          q:
            "'ICE' OR 'refugee' OR 'refugees' OR 'immigration' OR 'asylum' OR 'detention center' OR 'border crisis' OR 'undocumented immigrant' OR 'illegal immigrant'",
          language: "en",
          pageSize: 100,
          domains: String(row[1])
        })
        .then(response => {
          // console.log("Response is" + JSON.stringify(response));
          //console.log(row);
          //console.log("Domain is " + row[1]);

          var folderString = "../data/news-sniffer-reports/keywords-only/";

          shell.mkdir("-p", folderString); //creates folders if they don't already exist. It does not overwrite existing folders.
          var fileString = folderString + row[0] + ".json";

          fs.appendFile(fileString, JSON.stringify(response), function() {
            //has to be appendFile instead of writeFile because each county can appear multiple times in our domain list csv
            // console.log("wrote a file: " + fileString);
          });
        }); //end then
    }); //end map
  }); // end parse
}); // end fs.readfile
