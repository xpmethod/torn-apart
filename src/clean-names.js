import { stdout } from "process";

export default function(vendor){
  // vendor has four properties:
  // duns: duns number. Not to be touched.
  // origName: the name used in follow_the_money_data.csv
  // vendorName: the name from the internet. Can be undefined.
  // url: corporate url. Can be undefined.

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
    // ", City Of" and friends.
    .replace(/^(.*), (city|town|county|state) of$/i, "$2 OF $1")
  // 2. "(U.S.A.)"
    .replace(/\(u\.? ?s\.? ?a?\.? ?\)/i, "USA")
  // 3. apostrophes
    .replace(/'/g, "’");

  // Non regexable:
  if(vendor.cleanName === "ENVIRONMENTAL QUALITY, TEXAS COMMISSION ON"){
    vendor.cleanName = "Texas Commission on Environmental Quality";
  }
  if(vendor.cleanName === "MCKINSEY & COMPANY, INC. WASHINGTON D.C."){
    vendor.cleanName = "McKinsey & Company";
  }
  if(vendor.cleanName === "Mckinsey & Company, Inc. Washington D.C."){
    vendor.cleanName = "McKinsey & Company";
  }
  if(vendor.cleanName === "MOTOR VEHICLES, NEW YORK STATE DEPARTMENT OF"){
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
  }
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

  // if(vendor.cleanName.toUpperCase() === vendor.cleanName){
  //   // it's in ALL CAPS.
  //   // Do stuff.
  // }


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
