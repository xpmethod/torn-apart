const DCOs = { 
  "ATL": "ATLANGA",
  "BAL": "BALHOLD",
  "BOS": "BOSHOLD",
  "BUF": "BUFHOLD",
  "CHI": "CHIHOLD",
  "DAL": "DALHOLD",
  "DEN": "DENHOLD",
  "DET": "DETHOLD",
  "DLR": "DLRHOLD",
  "ELP": "ELPHOLD",
  "EPC": "EPC",
  "HAR": "HARHOLD",
  "HLG": "HLGHOLD",
  "HOU": "HOUHOLD",
  "KRO": "KRO",
  "LOS": "LOSHOLD",
  "MIA": "MIAHOLD",
  "NEW": "NEWHOLD",
  "NYC": "NYCHOLD",
  "OKC": "OKCHOLD",
  "PHI": "PHIHOLD",
  "PIT": "PITHOLD",
  "PHO": "PHOHOLD",
  "POO": "POOHOLD",
  "SEA": "SEAHOLD",
  "SFR": "SFRHOLD",
  "SLC": "SLCHOLD",
  "SNA": "SNAHOLD",
  "SND": "SNDHOLD",
  "TAM": "TAMHOLD",
  "VRK": "VRK",
  "WAS": "WASHOLD"
};

const OfficialICEDCs = {
  "features": [{
    "type": "point",
    "lat": 34.0166,
    "lon": -86.0124,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/etowah-county-detention-center'>Etowah County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        827 Forrest Avenue              </div>\n              <span class='locality'>Gadsden</span>,               <span class='region'>AL</span>,               <span class='postal-code'>35901</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 33.0442,
    "lon": -111.377,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/central-arizona-correctional-center'>Central Arizona Correctional Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1155 North Pinal Parkway              </div>\n              <span class='locality'>Florence</span>,               <span class='region'>AZ</span>,               <span class='postal-code'>85132</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 32.8177,
    "lon": -111.52,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/eloy-detention-center'>Eloy Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1705 E Hanna Rd              </div>\n              <span class='locality'>Eloy </span>,               <span class='region'>AZ</span>,               <span class='postal-code'>85131</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 33.0371,
    "lon": -111.371,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/florence-correctional-center'>Florence Correctional Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1100 Bowling Road              </div>\n              <span class='locality'>Florence</span>,               <span class='region'>AZ</span>,               <span class='postal-code'>85132</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 33.0637,
    "lon": -111.379,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/florence-spc'>Florence SPC</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        3250 N. Pinal Parkway              </div>\n              <span class='locality'>Florence</span>,               <span class='region'>AZ</span>,               <span class='postal-code'>85132</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 34.5592,
    "lon": -117.441,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/adelanto-ice-processing-center'>Adelanto ICE Processing Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        Adelanto East 10400 Rancho Road | Adelanto West 10250 Rancho Road              </div>\n              <span class='locality'>Adelanto</span>,               <span class='region'>CA</span>,               <span class='postal-code'>92301</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 37.9944,
    "lon": -122.354,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/contra-costa-west-county-detention-facility'>Contra Costa West County Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        5555 Giant Highway              </div>\n              <span class='locality'>Richmond</span>,               <span class='region'>CA</span>,               <span class='postal-code'>94806</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 33.7483,
    "lon": -117.874,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/santa-ana-city-jail'>Santa Ana City Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        62 Civic Center Plaza              </div>\n              <span class='locality'>Santa Ana</span>,               <span class='region'>CA</span>,               <span class='postal-code'>92701</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 39.1411,
    "lon": -121.587,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/yuba-county-jail'>Yuba County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        215 5th St.              </div>\n              <span class='locality'>Marysville</span>,               <span class='region'>CA</span>,               <span class='postal-code'>95901</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 39.7606,
    "lon": -104.849,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/denver-contract-detention-facility'>Denver Contract Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        3130 North Oakland Street              </div>\n              <span class='locality'>Aurora</span>,               <span class='region'>CO</span>,               <span class='postal-code'>80010</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 30.2957,
    "lon": -82.1222,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/baker-county-facility'>Baker County Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1 Sheriff&#039;s Office Drive              </div>\n              <span class='locality'>MacClenny</span>,               <span class='region'>FL</span>,               <span class='postal-code'>32063</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 26.2772,
    "lon": -80.151,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/broward-transitional-center'>Broward Transitional Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        3900 N. Powerline Road              </div>\n              <span class='locality'>Pompano Beach</span>,               <span class='region'>FL</span>,               <span class='postal-code'>33073</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 26.8386,
    "lon": -81.1247,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/glades-county-detention-center'>Glades County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1297 East SR 78              </div>\n              <span class='locality'>Moore Haven</span>,               <span class='region'>FL</span>,               <span class='postal-code'>33471</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 25.7543,
    "lon": -80.4891,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/krome-service-processing-center'>Krome Service Processing Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        18201 SW 12th Street              </div>\n              <span class='locality'>Miami</span>,               <span class='region'>FL</span>,               <span class='postal-code'>33194</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 30.1966,
    "lon": -84.3773,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/wakulla-county-facility'>Wakulla County Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        15 Oak Street              </div>\n              <span class='locality'>Crawfordville</span>,               <span class='region'>FL</span>,               <span class='postal-code'>32327</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 33.7473,
    "lon": -84.3955,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/atlanta-city-detention-center'>Atlanta City Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        254 Peachtree Street              </div>\n              <span class='locality'>Southwest Atlanta</span>,               <span class='region'>GA</span>,               <span class='postal-code'>30303</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 31.5781,
    "lon": -83.253,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/irwin-county-detention-center'>Irwin County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        132 Cotton Drive              </div>\n              <span class='locality'>Ocilla</span>,               <span class='region'>GA</span>,               <span class='postal-code'>31774</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 32.0366,
    "lon": -84.7718,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/stewart-detention-center'>Stewart Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        146 CCA Road              </div>\n              <span class='locality'>Lumpkin</span>,               <span class='region'>GA</span>,               <span class='postal-code'>31815</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 38.3143,
    "lon": -88.9027,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/jefferson-county-justice-center'>Jefferson County Justice Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        911 Casey Ave.              </div>\n              <span class='locality'>Mount Vernon</span>,               <span class='region'>IL</span>,               <span class='postal-code'>62864</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 42.3405,
    "lon": -88.4409,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/mchenry-county-adult-correctional-facility'>McHenry County Adult Correctional Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        2200 N. Seminary Ave.              </div>\n              <span class='locality'>Woodstock</span>,               <span class='region'>IL</span>,               <span class='postal-code'>60098</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 37.269,
    "lon": -89.1641,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/pulaski-county-detention-center'>Pulaski County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1026 Shawnee College Road              </div>\n              <span class='locality'>Ullin</span>,               <span class='region'>IL</span>,               <span class='postal-code'>62992</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 39.5237,
    "lon": -87.119,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/clay-county-jail'>Clay County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        611 East Jackson Street              </div>\n              <span class='locality'>Brazil</span>,               <span class='region'>IN</span>,               <span class='postal-code'>47834</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 42.3601,
    "lon": -93.0976,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/hardin-county-correctional-center'>Hardin County Correctional Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1116 14th Avenue              </div>\n              <span class='locality'>Eldora</span>,               <span class='region'>IA</span>,               <span class='postal-code'>50627</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 39.0366,
    "lon": -84.7283,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/boone-county-jail'>Boone County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        3020 Conrad Lane              </div>\n              <span class='locality'>Burlington</span>,               <span class='region'>KY</span>,               <span class='postal-code'>41005</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 31.7083,
    "lon": -92.1524,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/lasalle-ice-processing-center'>LaSalle ICE Processing Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        830 Pine Hill Road              </div>\n              <span class='locality'>Jena</span>,               <span class='region'>LA</span>,               <span class='postal-code'>71342</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 38.1699,
    "lon": -75.376,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/worcester-county-detention-center'>Worcester County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        5022 Joyner Road              </div>\n              <span class='locality'>Snow Hill</span>,               <span class='region'>MD</span>,               <span class='postal-code'>21863</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.6657,
    "lon": -70.9949,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/bristol-county-house-corrections'>Bristol County House of Corrections</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        400 Faunce Corner Road              </div>\n              <span class='locality'>North Dartmouth</span>,               <span class='region'>MA</span>,               <span class='postal-code'>02747</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.9305,
    "lon": -70.6542,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/plymouth-county-correctional-facility'>Plymouth County Correctional Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        26 Long Pond Road              </div>\n              <span class='locality'>Plymouth</span>,               <span class='region'>MA</span>,               <span class='postal-code'>02360</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 42.3344,
    "lon": -71.0677,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/suffolk-county-house-corrections-south-bay'>Suffolk County House of Corrections (South Bay)</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        20 Bradston Street              </div>\n              <span class='locality'>Boston</span>,               <span class='region'>MA</span>,               <span class='postal-code'>02118</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 42.3157,
    "lon": -85.1767,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/calhoun-county-correctional-center'>Calhoun County Correctional Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        185 E. Michigan Street              </div>\n              <span class='locality'>Battle Creek</span>,               <span class='region'>MI</span>,               <span class='postal-code'>49014</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.8956,
    "lon": -83.3933,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/monroe-county-jail'>Monroe County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        7000 East Dunbar Road              </div>\n              <span class='locality'>Monroe</span>,               <span class='region'>MI</span>,               <span class='postal-code'>48161</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 43.646,
    "lon": -93.368,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/freeborn-county-jail-services'>Freeborn County Jail Services</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        411 S. Broadway Ave.              </div>\n              <span class='locality'>Albert Lea</span>,               <span class='region'>MN</span>,               <span class='postal-code'>56007</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 44.9567,
    "lon": -93.086,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/ramsey-county-adult-detention-center'>Ramsey County Adult Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        425 Grove Street              </div>\n              <span class='locality'>St. Paul</span>,               <span class='region'>MN</span>,               <span class='postal-code'>55101</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 45.3047,
    "lon": -93.6206,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/sherburne-county-jail-services'>Sherburne County Jail Services</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        13880 Business Center Drive NW              </div>\n              <span class='locality'>Elk River</span>,               <span class='region'>MN</span>,               <span class='postal-code'>55330</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 38.9097,
    "lon": -91.5349,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/montgomery-county-jail'>Montgomery County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        211 East Main              </div>\n              <span class='locality'>Montgomery City</span>,               <span class='region'>MO</span>,               <span class='postal-code'>63361</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.2534,
    "lon": -95.9384,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/douglas-county-department-corrections'>Douglas County Department of Corrections</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        710 South 17th Street              </div>\n              <span class='locality'>Omaha</span>,               <span class='region'>NE</span>,               <span class='postal-code'>68102</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 40.9269,
    "lon": -98.3281,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/hall-county-department-corrections'>Hall County Department of Corrections</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        110 Public Safety Drive              </div>\n              <span class='locality'>Grand Island</span>,               <span class='region'>NE</span>,               <span class='postal-code'>68801</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 40.8733,
    "lon": -74.0401,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/bergen-county-jail'>Bergen County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        160 South River Street              </div>\n              <span class='locality'>Hackensack</span>,               <span class='region'>NJ</span>,               <span class='postal-code'>Jersey</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 40.7182,
    "lon": -74.1286,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/delaney-hall-detention-facility'>Delaney Hall Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        Delaney Hall Detention Facility (DHDF)              </div>\n              <span class='locality'>451 Doremus Avenue</span>,               <span class='region'>NJ</span>                                                  </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 40.6661,
    "lon": -74.1897,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/elizabeth-contract-detention-facility'>Elizabeth Contract Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        625 Evans Street              </div>\n              <span class='locality'>Elizabeth</span>,               <span class='region'>NJ</span>,               <span class='postal-code'>07201</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 40.7212,
    "lon": -74.1272,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/essex-county-correctional-facility'>Essex County Correctional Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        354 Doremus Avenue              </div>\n              <span class='locality'>Newark</span>,               <span class='region'>NJ</span>,               <span class='postal-code'>07105</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 40.7279,
    "lon": -74.1084,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/hudson-county-correctional-facility'>Hudson County Correctional Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        30-35 Hackensack Avenue              </div>\n              <span class='locality'>Kearny</span>,               <span class='region'>NJ</span>,               <span class='postal-code'>07032</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 40.2677,
    "lon": -74.2871,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/monmouth-county-correctional-institution'>Monmouth County Correctional Institution</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1 Waterworks Road              </div>\n              <span class='locality'>Freehold</span>,               <span class='region'>NJ</span>,               <span class='postal-code'>07728</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 32.0768,
    "lon": -106.255,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/otero-county-processing-center'>Otero County Processing Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        26 McGregor Range Road              </div>\n              <span class='locality'>Chaparral</span>,               <span class='region'>NM</span>,               <span class='postal-code'>88081</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 43.0202,
    "lon": -78.2026,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/buffalo-federal-detention-facility'>Buffalo Federal Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        4250 Federal Drive              </div>\n              <span class='locality'>Batavia</span>,               <span class='region'>NY</span>,               <span class='postal-code'>York</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.4049,
    "lon": -74.3595,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/orange-county-correctional-facility'>Orange County Correctional Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        110 Wells Farm Road              </div>\n              <span class='locality'>Goshen</span>,               <span class='region'>NY</span>,               <span class='postal-code'>10924</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.4053,
    "lon": -81.498,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/bedford-heights-city-jail'>Bedford Heights City Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        5661 Perkins Road              </div>\n              <span class='locality'>Bedford Heights</span>,               <span class='region'>OH</span>,               <span class='postal-code'>44146</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 39.3881,
    "lon": -84.5559,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/butler-county-correctional-complex'>Butler County Correctional Complex</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        705 Hanover Street              </div>\n              <span class='locality'>Hamilton</span>,               <span class='region'>OH</span>,               <span class='postal-code'>45011</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 40.56,
    "lon": -82.8067,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/morrow-county-correctional-facility'>Morrow County Correctional Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        101 Home Road              </div>\n              <span class='locality'>Mt. Gilead</span>,               <span class='region'>OH</span>,               <span class='postal-code'>43338</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.0796,
    "lon": -83.2082,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/seneca-county-jail'>Seneca County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        3040 South State Route 100              </div>\n              <span class='locality'>Tiffin</span>,               <span class='region'>OH</span>,               <span class='postal-code'>44883</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 36.1573,
    "lon": -95.9993,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/david-l-moss-criminal-justice-center'>David L. Moss Criminal Justice Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        300 N. Denver Ave.              </div>\n              <span class='locality'>Tulsa</span>,               <span class='region'>OK</span>,               <span class='postal-code'>74103</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.1509,
    "lon": -77.3497,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/clinton-county-correctional-facility'>Clinton County Correctional Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        58 Pine Mountain Road              </div>\n              <span class='locality'>McElhattan</span>,               <span class='region'>PA</span>,               <span class='postal-code'>17748&lt;p&gt;North</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.3886,
    "lon": -75.0719,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/pike-county-correctional-facility'>Pike County Correctional Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        175 Pike County Blvd.              </div>\n              <span class='locality'>Lords Valley</span>,               <span class='region'>PA</span>,               <span class='postal-code'>18428</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 39.9865,
    "lon": -76.6608,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/york-county-prison'>York County Prison</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        3400 Concord Road              </div>\n              <span class='locality'>York</span>,               <span class='region'>PA</span>,               <span class='postal-code'>17402</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 31.7939,
    "lon": -106.369,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/el-paso-processing-center'>El Paso Processing Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        8915 Montana Ave.              </div>\n              <span class='locality'>El Paso</span>,               <span class='region'>TX</span>,               <span class='postal-code'>79925</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 29.9497,
    "lon": -95.3122,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/houston-contract-detention-facility'>Houston Contract Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        15850 Export Plaza Drive              </div>\n              <span class='locality'>Houston</span>,               <span class='region'>TX</span>,               <span class='postal-code'>77032</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 30.3358,
    "lon": -95.4481,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/joe-corley-detention-facility'>Joe Corley Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        500 Hilbig Rd              </div>\n              <span class='locality'>Conroe</span>,               <span class='region'>TX</span>,               <span class='postal-code'>77301</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 32.372,
    "lon": -97.3891,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/johnson-county-detention-center'>Johnson County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1800 Ridgemar Drive              </div>\n              <span class='locality'>Cleburne</span>,               <span class='region'>TX</span>,               <span class='postal-code'>76031</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 28.8858,
    "lon": -97.9112,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/karnes-county-residential-center'>Karnes County Residential Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        409 FM 1144              </div>\n              <span class='locality'>Karnes City</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78118</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 27.5289,
    "lon": -99.4479,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/laredo-detention-center'>Laredo Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        4702 East Saunders              </div>\n              <span class='locality'>Laredo</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78401</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 30.6977,
    "lon": -95.0061,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/iah-secure-adult-detention-facility'>IAH Secure Adult Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        3400 FM 350 South              </div>\n              <span class='locality'>Livingston</span>,               <span class='region'>TX</span>,               <span class='postal-code'>77351</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 26.155,
    "lon": -97.3383,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/port-isabel-service-processing-center'>Port Isabel Service Processing Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        27991 Buena Vista Blvd.              </div>\n              <span class='locality'>Los Fresnos</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78566</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 33.1714,
    "lon": -99.7201,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/rolling-plains-correctional-facility'>Rolling Plains Correctional Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        118 County Road 206              </div>\n              <span class='locality'>Haskell</span>,               <span class='region'>TX</span>,               <span class='postal-code'>79521</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 28.895,
    "lon": -99.1212,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/south-texas-detention-complex'>South Texas Detention Complex</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        566 Veterans Drive              </div>\n              <span class='locality'>Pearsall</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78061</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 30.5653,
    "lon": -97.4198,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/t-don-hutto-residential-center'>T. Don Hutto Residential Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1001 Welch St.              </div>\n              <span class='locality'>Taylor</span>,               <span class='region'>TX</span>,               <span class='postal-code'>76574</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 31.1666,
    "lon": -105.352,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/west-texas-detention-facility'>West Texas Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        401 S. Vaquero Avenue              </div>\n              <span class='locality'>Sierra Blanca</span>,               <span class='region'>TX</span>,               <span class='postal-code'>79851</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 40.1489,
    "lon": -111.66,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/utah-county-jail'>Utah County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        3075 North Main              </div>\n              <span class='locality'>Spanish Fork</span>,               <span class='region'>UT</span>,               <span class='postal-code'>84660</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.2445,
    "lon": -111.996,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/weber-county-correctional-facility'>Weber County Correctional Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        721 W. 12th Street              </div>\n              <span class='locality'>Ogden</span>,               <span class='region'>UT</span>,               <span class='postal-code'>84401</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 37.3239,
    "lon": -78.437,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/farmville-detention-center'>Farmville Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        508 Waterworks Road              </div>\n              <span class='locality'>Farmville</span>,               <span class='region'>VA</span>,               <span class='postal-code'>23901</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 47.2491,
    "lon": -122.421,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/tacoma-northwest-detention-center'>Tacoma Northwest Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1623 E J Street, Suite 2              </div>\n              <span class='locality'>Tacoma</span>,               <span class='region'>WA</span>,               <span class='postal-code'>98421-1615</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 43.4076,
    "lon": -88.7041,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/dodge-detention-facility'>Dodge Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        141 N. Main Street              </div>\n              <span class='locality'>Juneau</span>,               <span class='region'>WI</span>,               <span class='postal-code'>53039</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 42.5943,
    "lon": -87.9119,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/kenosha-county-detention-center'>Kenosha County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        4777 88th Avenue              </div>\n              <span class='locality'>Kenosha</span>,               <span class='region'>WI</span>,               <span class='postal-code'>53144</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 28.6579,
    "lon": -99.2004,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/south-texas-family-residential-center'>South Texas Family Residential Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        300 El Rancho Way              </div>\n              <span class='locality'>Dilley</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78017</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 38.3063,
    "lon": -121.422,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/rio-cosumnes-correctional-center'>Rio Cosumnes Correctional Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        12500 Bruceville Road              </div>\n              <span class='locality'>Elk Grove</span>,               <span class='region'>CA</span>,               <span class='postal-code'>95757</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 30.7886,
    "lon": -92.4231,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/pine-prairie-ice-processing-center'>Pine Prairie ICE Processing Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1133 Hampton Dupre Road              </div>\n              <span class='locality'>Pine Prairie</span>,               <span class='region'>LA</span>,               <span class='postal-code'>70576</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 35.38,
    "lon": -119.006,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/mesa-verde-ice-processing-facility'>Mesa Verde ICE Processing Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        425 Golden State Avenue              </div>\n              <span class='locality'>Bakersfield</span>,               <span class='region'>CA</span>,               <span class='postal-code'>93301 </span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 37.2166,
    "lon": -76.6036,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/virginia-peninsula-regional-jail'>Virginia Peninsula Regional Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        9320 Merrimac Trail              </div>\n              <span class='locality'>Williamsburg</span>,               <span class='region'>VA</span>,               <span class='postal-code'>23185 </span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 39.3655,
    "lon": -77.4136,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/frederick-county-detention-center'>Frederick County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        7300 Marcies Choice Lane              </div>\n              <span class='locality'>Frederick</span>,               <span class='region'>MD</span>,               <span class='postal-code'>21704</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.5047,
    "lon": -81.1915,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/geauga-county-safety-center'>Geauga County Safety Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        12450 Merritt Road              </div>\n              <span class='locality'>Chardon</span>,               <span class='region'>OH</span>,               <span class='postal-code'>44024</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 39.1694,
    "lon": -76.7818,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/howard-county-detention-center'>Howard County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        7301 Waterloo Rd              </div>\n              <span class='locality'>Jessup</span>,               <span class='region'>MD</span>,               <span class='postal-code'>20794</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 33.6625,
    "lon": -117.703,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/james-musick-facility'>James A. Musick Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        13502 Musick Road              </div>\n              <span class='locality'>Irvine</span>,               <span class='region'>CA</span>,               <span class='postal-code'>92618</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 33.7818,
    "lon": -117.888,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/theo-lacy-facility'>Theo Lacy Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        501 The City Drive              </div>\n              <span class='locality'>South Orange</span>,               <span class='region'>CA</span>,               <span class='postal-code'>92868 </span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 42.7516,
    "lon": -73.8162,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/albany-county-correctional-facility'>Albany County Correctional Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        840 Albany Shaker Road              </div>\n              <span class='locality'>Albany</span>,               <span class='region'>NY</span>,               <span class='postal-code'>12211</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 42.2056,
    "lon": -78.0097,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/allegany-county-jail'>Allegany County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        4884 State Route 19              </div>\n              <span class='locality'>Belmont</span>,               <span class='region'>NY</span>,               <span class='postal-code'>14813</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 42.2546,
    "lon": -79.5036,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/chautauqua-county-jail'>Chautauqua County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        15 E. Chautauqua Street              </div>\n              <span class='locality'>Mayville</span>,               <span class='region'>NY</span>,               <span class='postal-code'>14757</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 44.7202,
    "lon": -73.4672,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/clinton-county-jail'>Clinton County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        25 McCarthy Drive              </div>\n              <span class='locality'>Plattsburgh</span>,               <span class='region'>NY</span>,               <span class='postal-code'>12901</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 40.3793,
    "lon": -76.0195,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/berks-family-residential-center'>Berks Family Residential Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1040 Berks Road              </div>\n              <span class='locality'>Leesport</span>,               <span class='region'>PA</span>,               <span class='postal-code'>19533</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 44.789,
    "lon": -93.5933,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/carver-county-jail-services'>Carver County Jail Services</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        600 East 4th Street              </div>\n              <span class='locality'>Chaska</span>,               <span class='region'>MN</span>,               <span class='postal-code'>55318 </span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 41.0112,
    "lon": -95.8831,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/cass-county-jail-services'>Cass County Jail Services</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        336 Main Street              </div>\n              <span class='locality'>Plattsmouth</span>,               <span class='region'>NE</span>,               <span class='postal-code'>68048</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 42.9423,
    "lon": -82.4795,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/st-clair-county-jail'>St. Clair County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1170 Michigan Road              </div>\n              <span class='locality'>Port Huron</span>,               <span class='region'>MI</span>,               <span class='postal-code'>48060</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 38.943,
    "lon": -105.151,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/teller-county-detention-center'>Teller County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        288 County Road 29              </div>\n              <span class='locality'>Divide</span>,               <span class='region'>CO</span>,               <span class='postal-code'>80814</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 38.7879,
    "lon": -104.779,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/el-paso-county-criminal-justice-center'>El Paso County Criminal Justice Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        2739 East Las Vegas Street              </div>\n              <span class='locality'>Colorado Springs</span>,               <span class='region'>CO</span>,               <span class='postal-code'>80906</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 34.7673,
    "lon": -106.019,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/torrance-county-detention-facility'>Torrance County Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        209 County Road A049              </div>\n              <span class='locality'>Estancia</span>,               <span class='region'>NM</span>,               <span class='postal-code'>87016</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 43.0676,
    "lon": -77.0322,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/wayne-county-jail'>Wayne County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        7368 Route 31              </div>\n              <span class='locality'>Lyons</span>,               <span class='region'>NY</span>,               <span class='postal-code'>14489</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 42.5959,
    "lon": -72.6138,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/franklin-county-house-correction'>Franklin County House of Correction</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        160 Elm Street              </div>\n              <span class='locality'>Greenfield</span>,               <span class='region'>MA</span>,               <span class='postal-code'>01301</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 43.2187,
    "lon": -70.9351,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/strafford-county-house-corrections'>Strafford County House of Corrections</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        266 County Farm Road              </div>\n              <span class='locality'>Dover</span>,               <span class='region'>NH</span>,               <span class='postal-code'>03820</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 36.031,
    "lon": -114.979,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/henderson-detention-center'>Henderson Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        18 S. Water St.              </div>\n              <span class='locality'>Henderson</span>,               <span class='region'>NV</span>,               <span class='postal-code'>89015</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 36.253,
    "lon": -115.975,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/nevada-southern-detention-center'>Nevada Southern Detention Center </a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        2190 E Mesquite Avenue              </div>\n              <span class='locality'>Pahrump</span>,               <span class='region'>NV</span>,               <span class='postal-code'>89048</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 39.5741,
    "lon": -119.811,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/washoe-county-jail'>Washoe County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        911 E Parr Blvd              </div>\n              <span class='locality'>Reno</span>,               <span class='region'>NV</span>,               <span class='postal-code'>89512</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 30.7454,
    "lon": -98.2461,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/burnet-county-jail'>Burnet County Jail</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        900 County Lane              </div>\n              <span class='locality'>Burnet</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78611</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 27.2479,
    "lon": -98.1268,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/brooks-county-detention-center'>Brooks County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        901 County Road 201              </div>\n              <span class='locality'>Falfurrias</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78355 </span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 26.2966,
    "lon": -97.9181,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/east-hidalgo-detention-center'>East Hidalgo Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1300 E Hwy 107              </div>\n              <span class='locality'>La Villa</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78562</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 29.4236,
    "lon": -98.4973,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/central-texas-detention-facility-geo'>Central Texas Detention Facility (GEO)</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        218 South Laredo Street              </div>\n              <span class='locality'>San Antonio</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78207</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 31.5493,
    "lon": -97.0814,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/jack-harwell-detention-center'>Jack Harwell Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n         3101 E. Marlin Hwy              </div>\n              <span class='locality'>Waco</span>,               <span class='region'>TX</span>,               <span class='postal-code'>76705</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 29.3732,
    "lon": -100.848,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/val-verde-county-detention-center'>Val Verde County Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        253 FM 2523 Hamilton Lane              </div>\n              <span class='locality'>Del Rio</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78840</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 26.4676,
    "lon": -97.7681,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/willacy-county-regional-detention-facility'>Willacy County Regional Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1601 Buffalo Drive              </div>\n              <span class='locality'>Raymondville</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78580</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 28.8831,
    "lon": -97.9114,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/karnes-county-correctional-center'>Karnes County Correctional Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        810 Commerce Street              </div>\n              <span class='locality'>Karnes City</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78118</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 27.3777,
    "lon": -99.4901,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/rio-grande-detention-center'>Rio Grande Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1001 San Rio Blvd              </div>\n              <span class='locality'>Laredo</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78046</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 32.6908,
    "lon": -115.398,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/imperial-regional-detention-facility'>Imperial Regional Detention Facility</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1572 Gateway Road              </div>\n              <span class='locality'>Calexico</span>,               <span class='region'>CA</span>,               <span class='postal-code'>92231</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 32.575,
    "lon": -116.915,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/otay-mesa-detention-center'>Otay Mesa Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        7488 Calzada de la Fuente              </div>\n              <span class='locality'>San Diego</span>,               <span class='region'>CA</span>,               <span class='postal-code'>92231</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 28.0462,
    "lon": -99.3527,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/la-salle-county-regional-detention-center'>La Salle County Regional Detention Center</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        832 E. Texas 44              </div>\n              <span class='locality'>Encinal</span>,               <span class='region'>TX</span>,               <span class='postal-code'>78019</span>\n                                              </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 32.4195,
    "lon": -97.1969,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/prairieland-detention-center-pdc'>Prairieland Detention Center (PDC)</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        1209 Sunflower Lane              </div>\n              <span class='locality'>Alvarado</span>,               <span class='region'>TX</span>,               <span class='postal-code'>76009</span>\n                      <div class='tel'>\n        <abbr class='type' title='voice'>Phone:</abbr>\n        <span class='value'>(817) 409-3995</span>\n      </div>\n                                  </div>\n  </div>\n\n"
  }, {
    "type": "point",
    "lat": 31.8313,
    "lon": -106.379,
    "popup": "<strong><a href='https://www.ice.gov/detention-facility/fsl-la-tuna'>FSL La Tuna</a></strong>\n<div class='location vcard'>\n  <div class='adr'>\n              <div class='street-address'>\n        SSG Sims Road                  <span class='additional'>\n             Building 11636          </span>\n              </div>\n              <span class='locality'>El Paso</span>,               <span class='region'>TX</span>,               <span class='postal-code'>79906</span>\n                                              </div>\n  </div>\n\n"
  }]
};
