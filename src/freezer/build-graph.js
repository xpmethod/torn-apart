import { writeFile, readFile } from "fs";
import { stdout } from "process";
import path from "path";
import parse from "csv-parse";
import _ from "lodash";

export default function(){
  readFile(path.join("data", "follow_the_money_data.csv"), (err, data) => {
  // readFile(path.join("data", "freezer", "freezer.csv"), (err, data) => {
    if(err) throw err;
    parse(data, {columns: true}, (err, rawAwards) => {
      if(err) throw err;
      const awards = rawAwards.filter(award => award.fiscal_year === "2018");
      const companies = [];
      const products = [];
      const product_categories = [
        "Those that belong to the emperor",
        "Embalmed ones",
        "Those that are trained",
        "Suckling pigs",
        "Mermaids (or Sirens)",
        "Fabulous ones",
        "Stray dogs",
        "Those that are included in this classification",
        "Those that tremble as if they were mad",
        "Innumerable ones",
        "Those drawn with a very fine camel hair brush",
        "Et cetera",
        "Those that have just broken the flower vase",
        "Those that, at a distance, resemble flies"
      ];
      // const product_categories = [];
      const parent_companies = [];
      _.each(awards, (award) => {
        award.naics_cat = _.shuffle(product_categories)[0];
        award.product_combo = award.naics_description + "||" + award.naics_cat;
        companies.push(award.recipient_duns);
        products.push(award.product_combo);
        // products.push(award.naics_description);
        // product_categories.push(award.product_category);
        parent_companies.push(award.recipient_parent_duns);
      }); // close each
      const companies_uniq = _.uniq(companies);
      const products_uniq = _.uniq(products);
      const product_categories_uniq = _.uniq(product_categories);
      const parent_companies_uniq = _.uniq(parent_companies);

      const graph = { nodes: [], links: [] };

      _.each([
        { source_array: parent_companies_uniq,
          category: "parent company",
          // combo_col: "company_combo",
          source_column: "recipient_parent_duns",
          target_column: "recipient_duns"
        },
        { source_array: product_categories_uniq,
          category: "product category",
          // combo_col: "product_combo",
          source_column: "naics_cat",
          target_column: "product_combo"
        },
        { source_array: companies_uniq,
          // combo_col: "company_combo",
          category: "company",
          source_column: "recipient_duns",
          target_column: "product_combo",
          // target_column: "naics_description",
          // combo: true
        }
      ], (sources) => {
        _.each(sources.source_array, (source) => {
          const name = sources.combo ? source.split("||")[0] : source;
          const childOf = sources.combo ? source.split("||")[1] : null;
          graph.nodes.push({ id: source, name, childOf, category: sources.category });
          const targets_all = awards.map((award) => {
            if(award[sources.source_column] === source){
              return award[sources.target_column];
            } // close if
          }); // close awards.map
          _.each(_.uniq(targets_all), (target) => {
            if(target){
              if( source !== target && source !== target.replace(/\|.*$/, "")){
                const localSource = () => sources.combo && source.split("||")[0] === source.split("||")[1] ? source.split("||")[1] : source;
                graph.links.push({ source: localSource(), target });
              }
            }
          }); // close each on targets_all
        }); // close each on sources.source_array
      }); // close _each on our array of objects.

      _.each(products_uniq, (product) => {
        const name = product.split("||")[0];
        const childOf = product.split("||")[1];
        const productAwards = _.filter(awards,
          { naics_description: name, naics_cat: childOf });
        const total_value = productAwards.reduce( (sum, award) => {
          return sum + _.toInteger(award.current_total_value);
        }, 0);
        graph.nodes.push({ name,
          childOf,
          id: product,
          category: "product",
          awards: productAwards,
          total_value
        });

      }); // close the each on products_uniq

      graph.links = _.uniq(graph.links.filter(link => link.target !== undefined));
      graph.nodes = _(graph.nodes).uniqBy("id").filter(node => node.name !== node.childOf);

      _(graph.nodes.filter(node => node.category === "parent company"))
        .each(parentCompany => {
          parentCompany.awards = awards.filter(award => award.parent_name === parentCompany.name);
          parentCompany.total_value = parentCompany.awards.reduce( (sum, award) => {
            return sum + _.toInteger(award.current_total_value);
          }, 0);
        });

      _(graph.nodes.filter(node => node.category === "company"))
        .each(company => {
          company.awards = awards.filter(award => award.recipient_name === company.name);
          company.total_value = company.awards.reduce( (sum, award) => {
            return sum + _.toInteger(award.current_total_value);
          }, 0);
        });

      _(graph.nodes)
        .filter(node => node.category.match(/company/))
        .each(companyNode => {
          _(graph.links)
            .filter(link => link.source === companyNode.id)
            .each(companyLink => {
              companyLink.contract_value = _.reduce(awards.filter(award => award.recipient_name === companyNode.name && award.product_combo === companyLink.target),
                (sum, award) => {
                  return sum + _.toInteger(award.current_total_value);
                }, 0);
            });

          _(graph.nodes.filter(node => node.category === "product category"))
            .each(productCategory => {
              productCategory.awards = awards.filter(award => award.naics_cat === productCategory.name);
              productCategory.total_value = productCategory.awards.reduce( (sum, award) => {
                return sum + _.toInteger(award.current_total_value);
              }, 0);
            });

          _(graph.nodes)
            .filter(node => node.category.match(/product category/))
            .each(productCategoryNode => {
              _(graph.links)
                .filter(link => link.source === productCategoryNode.id)
                .each(productCategoryLink => {
                  productCategoryLink.contract_Value = _.reduce(awards.filter(award => award.naics_cat === productCategoryNode.name && award.product_combo === productCategoryLink.target),
                    (sum, award) => {
                      return sum + _.toInteger(award.current_total_value);
                    }, 0);
                });


            });

        });

      writeFile(path.join("data", "freezer", "graph.json"),
        JSON.stringify(graph, null, 2), (err) => {
          if(err) throw err;
          stdout.write("WE DID THE FREEZER THING 🚀\n");
        }); // close writeFile callback.

    }); // close parse;
  }); // close readFile
}
