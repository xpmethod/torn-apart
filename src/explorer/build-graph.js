import { writeFile, readFile } from "fs";
import { stdout } from "process";
import path from "path";
import parse from "csv-parse";
import _ from "lodash";

readFile(path.join("data", "explorer", "explorer.csv"), (err, data) => {
  if(err) throw err;
  parse(data, {columns: true}, (err, awards) => {
    if(err) throw err;
    const companies = [];
    const products = [];
    const product_categories = [];
    const sub_offices = [];
    _.each(awards, (award) => {
      companies.push(award.recipient_name);
      products.push(award.naics_description);
      product_categories.push(award.naics_cat);
      sub_offices.push(award.awarding_office_cat);
    }); // close each
    const companies_uniq = _.uniq(companies);
    const products_uniq = _.uniq(products);
    const product_categories_uniq = _.uniq(product_categories);
    const sub_offices_uniq = _.uniq(sub_offices);

    const graph = { nodes: [], links: [] };

    _.each([
      { source_array: sub_offices_uniq,
        category: "suboffice",
        source_column: "awarding_office_cat",
        target_column: "naics_cat" 
      },
      { source_array: product_categories_uniq,
        category: "product category",
        source_column: "naics_cat",
        target_column: "naics_description" 
      },
      { source_array: companies_uniq,
        category: "company",
        source_column: "recipient_name",
        target_column: "naics_description"
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

    _.each(products_uniq, (product) => {
      graph.nodes.push({ name: product, 
        category: "product", 
        child_of: _.find(awards, award => award.naics_description === product).naics_cat 
      });
    }); // close the each on products_uniq

    graph.links = graph.links.filter(link => link.target !== undefined);

    _.each(companies_uniq, company => {
      _.each(graph.links.filter( link => link.source === company ), link => {
        const value = _.reduce(awards.filter(award => award.recipient_name === link.source && award.naics_description === link.target),
          (sum, award) => {
            return sum + _.toInteger(award.current_total_value_of_award);
          }, 0);
        link.value = value;
      });
      _.find(graph.nodes, node => node.name === company)
        .total_value = _.reduce(graph.links.filter( link => link.source === company ), 
          (sum, link) => link.value + sum, 0);
    });

    writeFile(path.join("data", "explorer", "graph.json"), 
      JSON.stringify(graph, null, 2), (err) => {
        if(err) throw err;
        stdout.write("WE DID THE THING 🚀\n");
      }); // close writeFile callback.
    
  }); // close parse;

}); // close readFile 
