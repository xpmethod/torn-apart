//for now this file assumes you have a single results file in the same directory, specifically California.json



var fs = require("fs");

//Alternatively could grab the text directly from the api results as it comes in instead of going back to where we've written it to files.


var resultsArray = [];
var notLocalised = []; 
var newsStatesArray = [];

//put the json news sources in reverse order so can look up url and get state
fs.readFile("data/news-sources-by-state.json", "utf8", function (err, data) {
  if (err) throw err;
  var newsSources = JSON.parse(data);
  for (var key in newsSources) {
    
    for (let i = 0; i<newsSources[key].length; i++){
      newsStatesArray.push([newsSources[key][i], key]);
    } //now we have an array with items that are sorted by URL then State for easy look-up purposes 
    
  }

  var obj;
  fs.readFile("data/news-sniffer-reports/TELLECO/Colorado.json", "utf8", function (err, data) {//going to need to do this for every file in the folder tree, and in my case they will be called "everything.json"
    if (err) throw err;
    obj = JSON.parse(data);
    // var resultsnumber = obj.totalResults;
    var sourcesArray = obj.articles;
    for (var i = 0; i<sourcesArray.length; i++){
      
      var resultsURL = sourcesArray[i].url; // get the url for each story in the json file
      
      //check every URL in Alex's list (which has been read into newsStatesArray) against the resultsURL to see if resultsURL contains any of Alex's URLs as a substring.
      for (var item in newsStatesArray) {
        if (resultsURL.indexOf(newsStatesArray[item][0]) >=0) {
          resultsArray.push([newsStatesArray[item][1],sourcesArray[i]]);
        }
        else {
          notLocalised.push(sourcesArray[i]); // at the moment I'm not doing anything with these - not even writing them to file. I should, because then we can maybe search them for placenames or something.
        }
      }
    }
  

    //write the successfully localised results to a comma-delimited string
    var results = "";
    for ( item in resultsArray){
      results = results + "\n" +  resultsArray[item][0] + ", " + JSON.stringify(resultsArray[item][1]);
    }
  
    fs.open("localised.csv", "w+", function(err, data) {
      if (err) throw err;
      fs.write(data, results, function(err) {
        if (err) throw err;
        fs.close(data, function() {
          // console.log("wrote a file");
        });
      });
    });
    
  }); 
});
