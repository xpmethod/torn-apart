# Torn Apart / Separados

Please see [our site](http://xpmethod.plaintext.in/torn-apart/) for a thorough
discussion of what our project and its goals are. This README is here more
just to satisfy people curious as to how this was all technically done.

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
