import { stdout } from "process";

export default function(vendor){
  // vendor has four properties:
  // duns: duns number. Not to be touched.
  // origName: the name used in follow_the_money_data.csv
  // vendorName: the name from the internet. Can be undefined.
  // url: corporate url. Can be undefined.
  
  // const states = ["AK", "AZ", "AR", "CA", "CO", "CT", "FL", "GA", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "MD", "MA", "MI", "MN", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"] 
  const stateRegex = "/(\bAK\b|\bAZ\b|\bAR\b|\bCA\b|\bCO\b|\bCT\b|\bFL\b|\bGA\b|\bID\b|\bIL\b|\bIN\b|\bIA\b|\bKS\b|\bKY\b|\bLA\b|\bMD\b|\bMA\b|\bMI\b|\bMN\b|\bMO\b|\bMT\b|\bNE\b|\bNV\b|\bNH\b|\bNJ\b|\bNM\b|\bNY\b|\bNC\b|\bND\b|\bOH\b|\bOK\b|\bOR\b|\bPA\b|\bRI\b|\bSC\b|\bSD\b|\bTN\b|\bTX\b|\bUT\b|\bVT\b|\bVA\b|\bWA\b|\bWV\b|\bWI\b|\bWY\b)/i"; //all the state abbrevs except for those that are real two-letter words that might plausibly appear in the dataset (ME, DE, MS, HI)

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

  // Non regexable: (some now caught with the alteration to "city of and friends" line above 
  if(vendor.cleanName === "ENVIRONMENTAL QUALITY, TEXAS COMMISSION ON"){
    vendor.cleanName = "Texas Commission on Environmental Quality";
  }
  if(vendor.cleanName === "MCKINSEY & COMPANY, INC. WASHINGTON D.C."){
    vendor.cleanName = "McKinsey & Company";
  }
  if(vendor.cleanName === "Mckinsey & Company, Inc. Washington D.C."){
    vendor.cleanName = "McKinsey & Company";
  }
  /* if(vendor.cleanName === "MOTOR VEHICLES, NEW YORK STATE DEPARTMENT OF"){
   vendor.cleanName = "New York State Department of Motor Vehicles";
  }
  if(vendor.cleanName === "Public Safety & Correctional Services, Maryland Dept Of"){
   vendor.cleanName = "Maryland Dept. of Public Safety & Correctional Services";
  }
  if(vendor.cleanName === "STATE POLICE, MICHIGAN DEPARTMENT OF"){
    vendor.cleanName = "Michigan Department of State Police";
  }
  if(vendor.cleanName === "State Police, Michigan Department Of"){
    vendor.cleanName = "Michigan Department of State Police";
  }*/
  if(vendor.cleanName === "IMPERIAL, COUNTY"){
    vendor.cleanName = "County of Imperial";
  }
  if(vendor.cleanName === "FORBES, INC., C."){
    vendor.cleanName = "Forbes";
  }
  if(vendor.cleanName === "Potter, Kevin"){
    vendor.cleanName = "Kevin Potter"; // nb: aka KRP Data Systems?
  }
  if(vendor.cleanName === "VONHOF, JEANNE M ARBITRATOR AND MEDIATOR"){
    vendor.cleanName = "Jeanne M. Vonhof, Arbitrator and Mediator";
  }
  if(vendor.cleanName === "Marquardt, Jennifer"){
    vendor.cleanName = "Jennifer Marquardt";
  }
  if(vendor.cleanName === "Donoghue, John M"){
    vendor.cleanName = "John M. Donoghue";
  }
  if(vendor.cleanName === "AIKEN, R P & SON"){
    vendor.cleanName = "R. P. Aiken & Son";
  }
  if(vendor.cleanName === "PALMER, PAUL"){
    vendor.cleanName = "Paul Palmer";
  }
  if(vendor.cleanName === "Hibler, Neil S PHD ABBP"){
    vendor.cleanName = "Neil S. Hibler, PhD. ABBP";
  }
  if(vendor.cleanName === "TIFT, RICHARD T"){
    vendor.cleanName = "Richard T. Tift";
  }
  if(vendor.cleanName === "RADVANY, PAUL"){
    vendor.cleanName = "Paul Radvany";
  }
  if(vendor.cleanName === "Radford, Todd"){
    vendor.cleanName = "Todd Radford";
  }
  if(vendor.cleanName === "Howell, Nathaniel"){
    vendor.cleanName = "Nathaniel Howell";
  }
  if(vendor.cleanName === "MacQueen, Michael C"){
    vendor.cleanName = "Michael C. MacQueen";
  }

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
      .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(" ")
      .replace(/\bu\.? ?s\.? ?a?\.? ?\b/i, "USA") //cos now I have caused the Usa problem
      .replace(stateRegex, function(match){return match.toUpperCase();}); //fix state abbreviations that have been lowercased
    //this appears unnecessary now - the earlier data required it. Oh well.
   
   
    //fix some of the acronyms that have been lowercased:
   
    //detect words that start with three consonants, as they can't be real words (except S--, Mc- and thr)
    // Can't do anything about mid-word, since exaMPLes, truCKSTop and other real words have three or more consonants across syllable boundaries
    var foundTripleCons = vendor.cleanName.search(/\b(?=[a-z]{3})[^aeiouy]{3}.*?\b/i);
    if(foundTripleCons !==-1){
      if(vendor.cleanName.substr(foundTripleCons, 2)!=="Mc" && !vendor.cleanName.substr(foundTripleCons, 2).match(/th/i)===true && !vendor.cleanName.substr(foundTripleCons, 1).match(/[sS]/)===true){ 
        vendor.cleanName = vendor.cleanName.replace(/\b(?=[a-z]{3})[^aeiouy]{3}.*?\b/i, function(match){return match.toUpperCase();});
     }
     
    }
    /*  
 //There's no point in this bit after all. It only catches 13 matches, and it turns out on Googling them, about half are not normally capitalised acronyms anyway (like mLINQS, or KWizCom). So might as well just brute-force them. 
   //double consonant at start of word -- of more than 2 letters, otherwise we get US states again 
   var foundDoubleCons = vendor.cleanName.search(/\b(?=[a-z]{2})[^aeiouy]{2}[a-z].*?\b/i);
   if(foundDoubleCons!==-1){; 
    if(!vendor.cleanName.substr(foundDoubleCons, 2).match(/bl|br|ch|cl|cr|dr|fl|fr|gl|gr|kn|pl|ph|pr|mc|sc|sh|sk|sl|sm|sn|sp|st|sq|sw|th|tr|tw|wh|wr|mr|ms/)===false){ //these are allowed initial consonant clusters in English words. If it's not one of these, it's probably an acronym
      vendor.cleanName = vendor.cleanName.replace(/\b(?=[a-z]{2})[^aeiouy]{2}[a-z].*?\b/i,function(match){return match.toUpperCase();}); 
    }
   }
*/   
   

  }
  vendor.cleanName = vendor.cleanName.replace(/(-[a-z])/, function(match){return match.toUpperCase();}); //deals with things like Outlook-nebraska. We could handle them by expanding the split ' ' to include - but there are also examples like Washington-brede that were already problematic and not all caps initially.
  
  
  if(vendor.cleanName === "Mlinqs"){
    vendor.cleanName = "mLINQS";
  }
  if(vendor.cleanName === "Pma-13"){
    vendor.cleanName = "PMA-13";
  }
  if(vendor.cleanName === "Csi Aviation"){
    vendor.cleanName = "CSI Aviation";
  }
  if(vendor.cleanName === "Cbt Nuggets"){
    vendor.cleanName = "CBT Nuggets";
  }
  
  if(vendor.cleanName === "Mmi Outdoor"){
    vendor.cleanName = "MMI Outdoor";
  }

  if(vendor.cleanName === "Npee"){
    vendor.cleanName = "NPEE";
  }
  if(vendor.cleanName === "Kwizcom Corporation"){
    vendor.cleanName = "KWizCom Corporation";
  }
  
  if(vendor.cleanName === "Cookie's Dme"){
    vendor.cleanName = "Cookie's DME";
  }

  if(vendor.cleanName === "Jsi Telecom"){
    vendor.cleanName = "JSI Telecom";
  }
  if(vendor.cleanName === "Cjen"){
    vendor.cleanName = "CJEN";
  }

  if(vendor.cleanName === "Lc Industries"){
    vendor.cleanName = "LC Industries";
  }

  if(vendor.cleanName === "Palantir Usg"){
    vendor.cleanName = "Palantir USG";
  }  
  
  if(vendor.cleanName === "4imprint"){
    vendor.cleanName = "4Imprint";
  }  
 
  if(vendor.cleanName === "Faac"){
    vendor.cleanName = "FAAC";
  } 

  if(vendor.cleanName === "Msab"){
    vendor.cleanName = "MSAB";
  }
  
  if(vendor.cleanName === "Dialtoneservices"){
    vendor.cleanName = "DialToneServices";
  }
  if(vendor.cleanName === "Green It Systems Group"){
    vendor.cleanName = "Green IT Systems Group";
  }

  
  vendor.cleanName.replace("Kcorp", "KCorp"); //this one turns up inside a couple of different names

  vendor.cleanName.replace("At&t", "AT&T");


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
    .replace(/^the /i, "The ");

  stdout.write(`${vendor.cleanName}          ---- (${vendor.vendorName})\n`);


  return vendor;
}
