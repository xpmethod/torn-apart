# Torn Apart / Separados

Please see [our site](http://xpmethod.plaintext.in/torn-apart/) for a thorough
discussion of what our project and its goals are. This README is here more
just to satisfy people curious as to how this was all technically done.

## Installation

Upon cloning or pulling the repo, run:

```
npm i
```

to install the Node dependencies. If this presents some kind of error, make
sure you have Node installed. See [this
link](https://nodejs.org/en/download/current/) to download your appropriate
Node installer.

To serve the website locally, change into the `docs/` directory and run
bundler there. Something like this:

```
cd docs/
gem install bundler
bundle install
jekyll serve
```

This will make the website available at `http://localhost:4000/torn-apart/`.

This distribution assumes a current installation of Ruby, namely 2.5.1. If you
have an earlier version, you can use [rvm]() to set up a local environment.
Assuming rvm is not installed, run this instead of the code above:

```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
\curl -sSL https://get.rvm.io | bash -s stable
rvm install ruby-2.5.1
cd docs/
gem install bundler
bundle install
jekyll serve
```

The presence of the files `.ruby-version` and `.ruby-gemset` in `docs/` should
trigger the use of Ruby 2.5.1 and create and use a gemset called “torn-apart.”

When Nokogiri invariably fails to install on `bundle install`, run `gem
install nokogiri -v '1.8.3'` and then `bundle install` again.

To stop serving the webserver, type control-C.

## Structure

### Under version control:

* `data/` All data, saved as csv or json, should be in this folder. In future
versions, it should have only csvs, all of which are packed up into the
JavaScript bundle where needed.
* `docs/` The [Jekyll](http://jekyllrb.com) website. See its README for
details.
* `ruby/` All of the Ruby scripts. Using them may require rerunning `bundle
install` and installing Nokogiri.
* `src/` All of the JavaScript.
  * `src/i18n/` The internationalization json files.
* `.eslintrc.yml` A yaml version of the [ESLint](http://eslint.org) configuration.
* `README.md` This file!
* `TA-S-logo.ai` An Adobe Illustrator file of our logo, as it were.
* `frequencies.py` A Python script.
* `package.json` and `package-lock.json` The configuration files for the Node
environment.
* `webpack.config.babel.js` The configuration file for
[Webpack](http://webpack.js.org).

### Not under version control:

* `cache/`
* `dist/` Source of built and transpiled Node files.
* `node_modules/` All of the Node dependencies.

## Backend

Data was gathered by our team and put into various Google spreadsheets. Once
the data reached an appropriate level of correctness, it was frozen and
converted either into a CSV or a JSON file. The data is all publicly
available. 

## Frontend

Thank heavens for the following:

* [Leaflet](http://leafletjs.com), which powers the maps
* [d3](http://d3js.org), which provides the charts and more complex
visualizations
* [Bootstrap](http://getbootstrap.com), which allowed us to quickly develop a
coherent visual style
* [Jekyll](http://jekyllrb.com), which provides the structural frame for the
project
* [GitHub](http://github.com), which hosts everything… well…
* [Imgur](http://imgur.com), except the images, which are hosted on Imgur
* [Google Maps Platform](http://cloud.google.com/maps-platform/), which
provides the static overhead images for the various visualizations
  site.
* Esri, who provide the basemap
* And everyone who’s written tutorials or answered questions or written API
documentation!

This is all based on
[muziejus/leaflet-quickstart](http://github.com/muziejus/leaflet-quickstart),
which lets learners build much, much simpler maps online quickly.
