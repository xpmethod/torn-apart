import { writeFile, readFile } from "fs";
import { stdout } from "process";
import path from "path";
import parse from "csv-parse";
import _ from "lodash";

readFile(path.join("data", "freezer", "freezer.csv"), (err, data) => {
  if(err) throw err;
  parse(data, {columns: true}, (err, awards) => {
    if(err) throw err;
    const companies = [];
    const products = [];
    const product_categories = [];
    const parent_companies = [];
    _.each(awards, (award) => {
      companies.push(award.company_combo);
      products.push(award.product_combo);
      product_categories.push(award.naics_cat);
      parent_companies.push(award.parent_name);
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
        source_column: "parent_name",
        target_column: "company_combo"
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
        source_column: "company_combo",
        target_column: "product_combo",
        combo: true
      }
    ], (sources) => {
      _.each(sources.source_array, (source) => {
        const name = () => sources.combo ? source.split("||")[0] : source;
        const childOf = () => sources.combo ? source.split("||")[1] : null;
        graph.nodes.push({ id: source, name: name(), childOf: childOf(), category: sources.category });
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
        stdout.write("WE DID THE THING 🚀\n");
      }); // close writeFile callback.

  }); // close parse;
}); // close readFile
