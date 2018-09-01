import _ from "lodash";

export default function(data) {
  const results = [];
  _.each(data, row => {
    _.each(["09", "10", "11", "12", "13", "14", "15", "16", "17", "18"], yr => {
      const pair = {
        place: row["c20" + yr],
        count: +row["20" + yr].replace(/,/, "")
      };
      const place = _.find(results, p => p.place === pair.place);
      if (place) {
        place["20" + yr] = pair.count;
      } else {
        const newObj = {
          place: pair.place,
          "2018": 0,
          "2017": 0,
          "2016": 0,
          "2015": 0,
          "2014": 0,
          "2013": 0,
          "2012": 0,
          "2011": 0,
          "2010": 0,
          "2009": 0
        };
        newObj["20" + yr] = pair.count;
        results.push(newObj);
      }
    });
  });
  return results;
}
