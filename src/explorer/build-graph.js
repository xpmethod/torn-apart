import { writeFile, readFile } from "fs";
import { stdout } from "process";
import path from "path";
import parse from "csv-parse";
import _ from "lodash";

readFile(path.join("data", "explorer", "explorer.csv"), (err, data) => {
  if(err) throw err;
  parse(data, {columns: true}, (err, awards) => {
    if(err) throw err;
    const award_ids = [];
    const companies = [];
    const parents = [];
    const cities = [];
    const states = [];
    const current_values = [];
    const potential_values = [];
    const awarding_offices = [];
    const sub_offices = [];
    const products = [];
    const product_categories = [];
    const award_details = [];
    
    _.each(awards, (award) => {
      award_ids.push(award.award_id); companies.push(award.recipient_name);
      parents.push(award.parent_name); cities.push(award.recipient_city);
      states.push(award.recipient_state); current_values.push(award.current_total_value);
      potential_values.push(award.potential_total_value); awarding_offices.push(award.awarding_office_name);
      sub_offices.push(award.awarding_office_cat); products.push(award.naics_description);
      product_categories.push(award.naics_cat); award_details.push(award.award_description);
      
    }); // close each
    const companies_uniq = _.uniq(companies);
    const parents_uniq = _.uniq(parents);
    const products_uniq = _.uniq(products);
    const product_categories_uniq = _.uniq(product_categories);

    const graph = { nodes: [], links: [] };

    _.each([
      { source_array: product_categories_uniq,
        category: "product category",
        source_column: "naics_cat",
        target_column: "naics_description" 
      },
      { source_array: products_uniq,
        category: "product",
        source_column: "naics_description", 
        target_column: "recipient_name"
      },
      { source_array: parents_uniq,
        category: "parent",
        source_column: "parent_name",
        target_column: "recipient_name"
      }
    ], (sources) => {
      _.each(sources.source_array, (source) => {
        graph.nodes.push({ name: source, category: sources.category});
        const targets_all = awards.map((award) => {
          if(award[sources.source_column] === source){
            return award[sources.target_column];
          } // close if
        }); // close awards.map
        _.each(_.uniq(targets_all), (target) => {
          graph.links.push({ source: source, target: target });
        }); // close each on targets_all
      }); // close each on sources.source_array
    }); // close _each on our array of objects.   

    _.each(companies_uniq, (company) => {
      graph.nodes.push({ name: company, category: "company"});
    }); // close the each on products_uniq

    graph.links = graph.links.filter(link => link.target !== undefined);

    writeFile(path.join("data", "explorer", "graph.json"), 
      JSON.stringify(graph, null, 2), (err) => {
        if(err) throw err;
        stdout.write("WE DID THE THING 🚀\n");
      }); // close writeFile callback.
    
  }); // close parse;

}); // close readFile 
