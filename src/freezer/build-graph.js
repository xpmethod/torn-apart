import { writeFile, readFileSync, readFile } from "fs";
import { stdout } from "process";
import path from "path";
import parse from "csv-parse";
import parseSync from "csv-parse/lib/sync";
import _ from "lodash";
import titleUp from "../title-up";


export default function(decorations){
  readFile(path.join("data", "follow_the_money_data.csv"), (err, data) => {
    if(err) throw err;
    parse(data, {columns: true}, (err, rawAwards) => {
      if(err) throw err;
      const product_taxonomy = parseSync(
        readFileSync(path.join("data", "products_taxonomy.csv")),
        { columns: true });
      _.each(product_taxonomy, row => { row.tas_taxonomy = row.tas_taxonomy.trim(); });
      const awards = rawAwards.filter(award => award.fiscal_year === "2018");
      const companies = [];
      const products = [];
      const parent_companies = [];
      const product_categories = [];
      _.each(awards, (award) => {
        award.naics_cat = _.find(product_taxonomy, { "naics_description": award.naics_description }).tas_taxonomy;
        award.product_combo = award.naics_description + "||" + award.naics_cat;
        award.company_combo = award.recipient_duns + "||" + award.recipient_parent_duns;
        companies.push(award.company_combo);
        products.push(award.product_combo);
        product_categories.push(award.naics_cat);
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
          // source_column: "recipient_duns",
          source_column: "recipient_parent_duns",
          target_column: "company_combo",
          // target_column: "recipient_duns"
        },
        { source_array: product_categories_uniq,
          category: "product category",
          source_column: "naics_cat",
          target_column: "product_combo"
        },
        { source_array: companies_uniq,
          category: "company",
          source_column: "company_combo",
          target_column: "product_combo",
          combo: true,
        }
      ], (sources) => {
        _.each(sources.source_array, (source) => {
          // source = duns, naics_cat, company_combo
          const origName = sources.combo ? source.split("||")[0] : source;
          const childOf = sources.combo ? source.split("||")[1] : null;
          const name = origName.match(/^\d*$/) ? _.find(decorations, { duns: origName }).cleanName : origName;
          graph.nodes.push({ id: source, name, childOf, category: sources.category });
          const targets_all = awards.map((award) => {
            if(award[sources.source_column] === source){
              return award[sources.target_column];
            } // close if
          }); // close awards.map
          _.each(_(targets_all).uniq().compact().value(), (target) => {
            if( source !== target || source !== target.replace(/\|.*$/, "")){
              const localSource = sources.combo && source.split("||")[0] === source.split("||")[1] ? source.split("||")[1] : source;
              graph.links.push({ source: localSource, target });
            }
          }); // close each on targets_all
        }); // close each on sources.source_array
      }); // close _each on our array of objects.

      _.each(products_uniq, (product) => {
        const name = product.split("||")[0];
        const childOf = product.split("||")[1];
        const productAwards = _.filter(awards,
          { naics_description: name, naics_cat: childOf })
          .map(thinAward);
        const total_value = productAwards.reduce( (sum, award) => {
          return sum + _.toInteger(award.current_total_value_of_award);
        }, 0);
		stdout.write("just before first titleUp");
        graph.nodes.push({ 
          name: titleUp(name),
          childOf,
          id: product,
          category: "product",
          awards: productAwards,
          total_value
        });

      }); // close the each on products_uniq

      // graph.links = _.uniq(graph.links.filter(link => link.target !== undefined));
      graph.links = _(graph.links)
        .filter(link => link.target !== undefined)
        .filter(link => link.target !== link.source + "||" + link.source)
        .uniq();
      graph.nodes = _(graph.nodes)
        .uniqBy("id")
        .filter(node => node.id !== node.childOf)
        .filter(node => node.id !== node.childOf + "||" + node.childOf);

      _(graph.nodes.filter(node => node.category === "parent company"))
        .each(parentCompany => {
          parentCompany.awards = awards.filter(award => award.recipient_parent_duns === parentCompany.id)
            .map(thinAward);
          parentCompany.total_value = parentCompany.awards.reduce( (sum, award) => {
            return sum + _.toInteger(award.current_total_value_of_award);
          }, 0);
        });

      _(graph.nodes.filter(node => node.category === "company"))
        .each(company => {
          company.awards = awards.filter(award => award.recipient_duns === company.id.replace(/\|.*$/, ""))
            .map(thinAward);
          company.total_value = company.awards.reduce( (sum, award) => {
            return sum + _.toInteger(award.current_total_value_of_award);
          }, 0);
        });

      _(graph.nodes)
        .filter(node => node.category.match(/company/))
        .each(companyNode => {
          _(graph.links)
            .filter(link => link.source === companyNode.id)
            .each(companyLink => {
              companyLink.contract_value = _.reduce(awards.filter(award => award.recipient_duns === companyNode.id && award.product_combo === companyLink.target),
                (sum, award) => {
                  return sum + _.toInteger(award.current_total_value_of_award);
                }, 0);
            });

          _(graph.nodes.filter(node => node.category === "product category"))
            .each(productCategory => {
              productCategory.awards = awards.filter(award => award.naics_cat === productCategory.name)
                .map(thinAward);
              productCategory.total_value = productCategory.awards.reduce( (sum, award) => {
                return sum + _.toInteger(award.current_total_value_of_award);
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
                      return sum + _.toInteger(award.current_total_value_of_award);
                    }, 0);
                });


            });

        });

      writeFile(path.join("data", "freezer", "graph.json"),
        JSON.stringify(graph, null, 2), (err) => {
          if(err) throw err;
          stdout.write("WE DID THE FREEZER THING 🚀\n");
        }); // close writeFile callback.

      function thinAward(award){
        return {
          current_total_value_of_award: award.current_total_value_of_award,
          award_description: titleUp(award.award_description.replace(/^IGF\S*/, "")),
          recipient_city: award.recipient_city_name.split(" ").map(word => _.capitalize(word)).join(" "),
          recipient_state: award.recipient_state_code,
          // recipient_duns: award.recipient_duns,
          recipient_name: _.find(decorations, { duns: award.recipient_duns }).cleanName,
          naics_cat: award.naics_cat,
          naics_description: titleUp(award.naics_description)
        };
      }

    }); // close parse;
  }); // close readFile

}
