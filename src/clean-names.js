import { stdout } from "process";
import _ from "lodash";
import States from "./states";

export default function(vendor){
  // vendor has four properties:
  // duns: duns number. Not to be touched.
  // origName: the name used in follow_the_money_data.csv
  // vendorName: the name from the internet. Can be undefined.
  // url: corporate url. Can be undefined.
  
  var stateRegex = createStateRegex(States); //not actually convinced this function is more concise than the previous stateRegex definition below. Maybe there's a better way to do it than either option, so feel free to change.
  
  //  const stateRegex = "/(\bAK\b|\bAZ\b|\bAR\b|\bCA\b|\bCO\b|\bCT\b|\bFL\b|\bGA\b|\bID\b|\bIL\b|\bIA\b|\bKS\b|\bKY\b|\bLA\b|\bMD\b|\bMA\b|\bMI\b|\bMN\b|\bMO\b|\bMT\b|\bNE\b|\bNV\b|\bNH\b|\bNJ\b|\bNM\b|\bNY\b|\bNC\b|\bND\b|\bOH\b|\bOK\b|\bPA\b|\bRI\b|\bSC\b|\bSD\b|\bTN\b|\bTX\b|\bUT\b|\bVT\b|\bVA\b|\bWA\b|\bWV\b|\bWI\b|\bWY\b)/i"; //all the state abbrevs except for those that are real two-letter words that might plausibly appear in the dataset (OR, IN, ME, DE, MS, HI)

  //the pairs of names where we want to brute force things because we can't predict the capitalisation or order or whatever (note: the input names are the OUTPUT of the rest of the script, because this happens last. That makes it easiest for people who spot a problem in the csv later to drop it and the correction in here.)

  const unpredictables = [
    ["Mlinqs", "mLINQS"],
    ["Csi Aviation","CSI Aviation" ],
    ["Cbt Nuggets", "CBT Nuggets"],
    ["Mmi Outdoor", "MMI Outdoor"],
    ["Npee", "NPEE"],
    ["Kwizcom Corporation", "KWizCom Corporation"],
    ["Cookie's Dme", "Cookie's DME"],
    ["Jsi Telecom", "JSI Telecom"],
    ["Cjen", "CJEN"],
    ["Lc Industries", "LC Industries"],
    ["Palantir Usg", "Palantir USG"],
    ["4imprint", "4Imprint"],
    ["Faac", "FAAC"],
    ["Msab", "MSAB"],
    ["Dialtoneservices", "DialToneServices"],
    ["Green It Systems Group", "Green IT Systems Group"],
    ["Green It Systems Group", "Green IT Systems Group"],
    ["Aeec", "AEEC"],
    ["Ems Safety Services", "EMS Safety Services"],
    ["Ceb", "CEB"],
    ["Capp", "CAPP"],
    ["Tu", "TU"],
    ["Nyp", "NYP"],
    ["Kp Electronics", "KP Electronics"],
    ["Nc4", "NC4"],
    ["Ase Direct", "ASE Direct"],
    ["Wecsys", "WECsys"],
    ["Allworld Language Consultants", "AllWorld Language Consultants"],
    ["Ruag Ammotec USA", "RUAG Ammotec USA"],
    ["Clearavenue", "clearAvenue"],
    ["Emtec", "EMTEC"],
    ["Justicetrax", "JusticeTrax"],
    ["Smartystreets", "SmartyStreets"],
    ["Reconrobotics", "ReconRobotics"],
    ["Accessdata Group", "AccessData Group"],
    ["Mcp Computer Products", "MCP Computer Products"],
    ["Howell, Nathaniel", "Nathaniel Howell"],
    ["MacQueen, Michael C", "Michael C. MacQueen"],
    ["Marquardt, Jennifer", "Jennifer Marquardt"],
    ["Donoghue, John M", "John M. Donoghue"],
    ["Potter, Kevin", "Kevin Potter"],
    ["Mckinsey & Company, Inc. Washington D.c.", "McKinsey & Company"],
    ["Radford, Todd", "Todd Radford"],
    ["Environmental Quality, Texas Commission on", "Texas Commission on Environmental Quality"],
    ["Imperial, County", "County of Imperial"],
    ["Forbes, Inc., C.", "Forbes"],
    ["Vonhof, Jeanne M Arbitrator and Mediator", "Jeanne M. Vonhof, Arbitrator and Mediator"],
    ["Aiken, R P & Son", "R. P. Aiken & Son"],
    ["Palmer, Paul", "Paul Palmer"],
    ["Hibler, Neil S PHD ABBP", "Neil S. Hibler, PhD. ABBP"],
    ["Tift, Richard T", "Richard T. Tift"],
    ["Radvany, Paul", "Paul Radvany"],
    ["G4s Secure Solutions USA", "G4S Secure Solutions USA"],
    ["Caci-Iss", "CACI-ISS"]
  ]; 
  

  vendor.vendorName = vendor.vendorName || vendor.origName;

  // Now the fun begins:
  
  // 1. Endings:
  // trailing spaces
  vendor.cleanName = vendor.vendorName.trim()
    // ", The". This has to go first to catch "inc., the"
    .replace(/^(.*), \(?the\)?$/i, "THE $1")
    // ", Inc." and friends.
    .replace(/,? \(?(rllp|ehf|a(b|g)|p\.?c\.?|l?\.? ?l\.? ?(c|p)|ltd|inc|corp)\.?\)?$/i, "")
    .replace(/,(ltd|inc)\.$/i, "") // two exceptions
    .replace(/ inc. oy$/i, "") // one exception
    .replace(/ inc. \(oh\)$/i, "") // one exception
    .replace(/ inc.-ny$/i, "") // one exception
    .replace(/-mgb na$/i, "") // one exception
    .replace(/ .3626.$/i, "") // one exception
    .replace(/,? (incorporated|limited( liability company)?)/i, "")
    // ", The". and once more to catch ", the, inc."
    .replace(/^(.*), \(?the\)?$/i, "THE $1")
    .replace(/, ?$/, "") // pesky trailing commas
  //  ", City Of" and friends.
    .replace(/^(.*), (.*) of$/i, "$2 OF $1")
  // 2. "(U.S.A.)"
    .replace(/\(u\.? ?s\.? ?a?\.? ?\)/i, "USA")
  // 3. apostrophes
    .replace(/'/g, "’");

  // Dunno if these are correct.
  // if(vendor.cleanName === "Senevirante, Anusha"){
  //   vendor.cleanName = "Anusha Senevirante";
  // }
  // if(vendor.cleanName === "Ibeagha, Anthony"){
  //   vendor.cleanName = "Anthony Ibeagha";
  // }

  if(vendor.cleanName.toUpperCase() === vendor.cleanName){
  // it's in ALL CAPS.
  
    vendor.cleanName = vendor.cleanName.split(" ") 
      .map(w => _.capitalize(w))
      .join(" ")
      .replace(/\bu\.? ?s\.? ?a?\.? ?\b/i, "USA") //cos now I have caused the Usa problem
      .replace(stateRegex, function(match){return match.toUpperCase();}); //fix state abbreviations that have been lowercased
    //this appears unnecessary now - the earlier data required it. Oh well.
   
   
    //fix some of the acronyms that have been lowercased:
   
    // detect words that start with three consonants, as they can't be real
    //words (except S--, Mc- and thr) Can't do anything about mid-word, since
    //exaMPLes, truCKSTop and other real words have three or more consonants
    //across syllable boundaries

    var foundTripleCons = vendor.cleanName.search(/\b(?=[a-z]{3})[^aeiouy]{3}.*?\b/i);
    if(foundTripleCons !==-1){
      if(vendor.cleanName.substr(foundTripleCons, 2)!=="Mc" && !vendor.cleanName.substr(foundTripleCons, 2).match(/th/i)===true && !vendor.cleanName.substr(foundTripleCons, 1).match(/[sS]/)===true){ 
        vendor.cleanName = vendor.cleanName.replace(/\b(?=[a-z]{3})[^aeiouy]{3}.*?\b/i, function(match){return match.toUpperCase();});
      }
     
    }
  }
  vendor.cleanName = vendor.cleanName.replace(/(-[a-z])/, match => match.toUpperCase()); 
  //deals with things like Outlook-nebraska. We could handle them by
  //expanding the split ' ' to include - but there are also examples like
  //Washington-brede that were already problematic and not all caps
  //initially.


  // Global capitalization, since even mixed names often don't
  // respect title case.
  vendor.cleanName = vendor.cleanName
    .replace(/ de /ig, " de ")
    .replace(/ in /ig, " in ")
    .replace(/ at /ig, " at ")
    .replace(/ and /ig, " and ")
    .replace(/ of /ig, " of ")
    .replace(/ for /ig, " for ")
    .replace(/ the /ig, " the ")
    .replace(/\bon\b/ig, "on") //word boundaries not spaces because of "Environmental Quality, Texas Commission On" etc
    .replace(/^the /i, "The ");

  //Now we brute force replace a bunch of names because they are stupidly unpredictably capitalised
 
  for(let i = 0; i < unpredictables.length; i= i+1){
    scrub(unpredictables[i][0], unpredictables[i][1], vendor);
  }
 

  //Below is how you can just change one part of the name. Should use for names that have a single acronym repeated in multiple names, e.g. KCorp Solutions, KCorp Group, etc, and only if the part you are replacing is sufficiently distinctive it won't turn up in other words/phrases you don't want to alter.
  vendor.cleanName = vendor.cleanName.replace("Kcorp", "KCorp"); //this one turns up inside a couple of different names
  vendor.cleanName = vendor.cleanName.replace("At&t", "AT&T");
  vendor.cleanName = vendor.cleanName.replace("Nc4", "NC4");
  vendor.cleanName = vendor.cleanName.replace("Bae Systems", "BAE Systems");

  stdout.write(`${vendor.cleanName}          ---- (${vendor.vendorName})\n`);


  return vendor;
}



function createStateRegex(States){
  
  const states = States.map(s => s.abbreviation); //from Moacir's list we get the 2-letter abbrevs
  const statesLeftOut = ["OR", "IN", "ME", "DE", "MS", "HI"]; // these are real words so we can't include them
  
  //so filter the first list to only include items that aren't in the second
  var statesSubset = states.filter(function(item){
    return statesLeftOut.indexOf(item) === -1;
  });

  //and now build some regex that includes anything from that subset list, surrounded by word boundaries, so we can plug it in later
  var stateRegex = "/(";
  for(let i = 0; i<statesSubset.length-1; i=i+1){
    stateRegex = stateRegex + "\\b" + statesSubset[i] + "\\b|";
  }
  
  return stateRegex + "\\b" + states[statesSubset.length-1] + "\\b)/i";
}
  
function scrub(string, correction, vendor){
  if(vendor.cleanName === string){
    vendor.cleanName = correction;
  }
}
