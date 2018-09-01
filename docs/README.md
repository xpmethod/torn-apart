# Torn Apart / Separados - docs/

This folder holds the [Jekyll](http://jekyllrb.com) installation for the
website. Please see the root README to learn how to spin up this project on
your local machine.

## Structure

### Under version control:

* `_includes` Partials
  * `charts.html` The layout of the Charts viz.
  * `footer.html` The footer
  * `google_analytics.html` Google analytics code loaded in production.
  * `header.html` The header. Includes all of the assertions in
`<head></head>`. 
  * `navbar.html` The navbar. Only loaded for non-index and non-viz pages,
unless on mobile, where all pages load it.
  * `scripts.html` The list of JavaScript files to load. 
* `_layouts` Layouts
  * `article.html` Wraps content in `<article></article>`.
  * `default.html` Parent layout for most of the site.
  * `index.html` Special layout for index and viz pages.
  * `page.html` Wraps content in `<main class="page"></main>`.
* `_reflections` The reflections
* `_sass` [Sass](http://sass-lang.com) style files.
  * `buttons.scss` Styling for buttons.
  * `charts.scss` Styling for charts.
  * `leaflet.scss` Styling for maps and viz.
  * `navbar.scss` Styling for navbar.
  * `page.scss` Styling for pages.
  * `theme.scss` Parent stylesheet importing all of the above.
* `assets` “static” assets
  * `css/style.scss` Dummy css file receiving contents of `_sass/`.
  * `docs/` Files
  * `figures/` Images
  * `imgs/` Image assets for favico and Twitter/OG metadata.
  * `js/` Should only have `.bundle.js` files fed in via Webpack from
`../src`.
  * `markdown/` Markdown files that get imported by JavaScript.
* `404.html` The 404 template.
* `_config.yml` Configurations for Jekyll.
* `*.md` Markdown files that are templates for static pages.
* `Gemfile` The gems used by Jekyll.

### Not under version control:

* `_site/` The compiled Jekyll site.
