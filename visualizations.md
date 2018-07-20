# How visualizations work in v2

Every TA/S visualization makes certain demands of the preëxisting
infrastructure of the site. I’m going to try to describe them in this
document, which will attempt to be comprehensive and a reference.

In brief, there are three demands: html, css, and javascript.

## HTML

Yay. The easy part. The v2 visualizations all fall into one of two categories:
map viz and non map viz. The former require a bit of creativity to get
working, and I won’t describe that here, but the latter are straight forward:

* Assuming the names `shame`, `contracts`, `explorer`, and `galaxy`,
* Every viz has a corresponding `<div>` like `#shame-viz`
* That is inside the larger, fullscreen `<div>` `#v2-div`
* And whose html resides in the file `docs/_includes/v2-viz.html`.

You’re more than welcome to add Jekyll includes on that file (I recommend
doing so) and building a single HTML page with the framework of your div.

The only other key thing to keep in mind when writing HTML is that textual
content is under i18n. That is, instead of filling an `<h2>` (though of course
you can with default text), we code that `<h2>` with a `data-i18n` attribute
that holds the key that tells the i18n software what message to paste in. For
example, `<h2 data-i18n="ta-v2-shame-title"></h2>` makes a call to the i18n
software for the message attached to `ta-v2-shame-title` in whatever language
the user is using. The software returns, for the time being, with “I am the
shame viz.” 

Authors creating things that write to the DOM in JS or in HTML should keep in
mind i18n and use the data attribute appropriately while also populating the
three i18n language files in `src/i18n` with the new keys and some default
text. Once you make your additions to `src/i18n/en.json`, copy them to
`es.json` and `fr.json`, so the translators will know there are new messages
to translate.

## CSS

There are two kinds of CSS used in TA/S: organizational CSS and straight up
for the look CSS. 

### Organizational CSS

For the purposes of the chart-like (no map) visualizations, the key
organizational CSS classes to use are:

* `markdownify`. This class signals to the JS that the i18n message that tag
is receiving to its related `data-i18n` key is in Markdown and to format it
into html on the fly.
* If I think of others... `viz-hide` is a class used to hide visualizations
when transitioning from one viz to another, but the specific `#shame-viz` etc
already have that class and it doesn’t need to be inherited.

### For the look CSS

Most importantly, TA/S builds on the [Bootstrap](http://getbootstrap.com "Get
Bootstrap") model of CSS styling. That means distributing things into columns,
etc., is done with special Bootstrap classes. On TA/S, we break at the
Bootstrap `-md-` point, meaning if you plan on different layouts for mobile
and non-, they should break at `-md-`. 

If you have no idea what I mean by breakpoints or need to catch up on how
Bootstrap lays out, see [their documentation on
layout](https://getbootstrap.com/docs/4.1/layout/overview/), especially the
section on the Grid. The sass mixins, etc., can be mostly skipped.

Please write HTML semantically and then use classes to style text. So no “this
has to be big, so I’ll `<h1>` it.” Instead use the appropriate class, which in
this case could be `.big-number`.

Speaking of, when special classes *are* needed, please populate
`docs/_sass/v2-viz.scss` with them. That sass is all wrapped inside the sass
for `#v2-div`, meaning that classes defined and changed in there only affect
your visualizations.

We have five color constants defined in sass: `$green`, `$purple`, `$orange`,
`$pink`, `$lime`. That’s also the list of in which order you should use them.
As in, use `$lime` basically never. 

## JS

### Getting the environment up

Here things get hilarious. Assuming you’re starting from nothing with this
repo, you must at least have [Ruby 2.5.1](http://rvm.io) installed and
[Node](https://nodejs.org/en/download/current/) installed. Once they’re
installed and you’re in the `torn-apart/` repo:

```
npm i
cd docs/
gem install bundler
bundle install
cd ..
```

When Nokogiri complains and crashes during the `bundle install`, just run the
specific command the error spits out (`gem install nokogiri....`) and then run
`bundle install` again.

The first command installs all the Node modules needed to write JS for TA/S.
The third installs, most importantly, Jekyll for pre-building the site and
providing a means of serving it. 

Now you need to fire up the constantly updating JS and HTML servers. Open a
new terminal window. In it, from the `torn-apart/` directory, do:

```
cd docs/
jekyll serve
```

This will open up a local version of the page at
`http://localhost:4000/torn-apart/` with which you can party hard. But if you
edit the JavaScript, the changes won’t propagate, unless, in yet *another*
terminal window, you run:

```
npm run watch
```

And leave it running. It listens for changes to files in `src/` and recompiles
the changes into bundled JS files the webpages use. 

### `src/` structure

The `src/` directory is where all the JavaScript sits. Each of your
visualizations has a file in there corresponding to your viz’s short name, so
like `src/shame.js`. The *single function* in there is executed when the user
clicks on the “Shame” visualization button, so I’ll walk through the file
here:

```javascript
import $ from "jquery";

export default function(){
  $("#v2-div").show();
  $("#shame-viz").show();
}
```

The first line imports the `$` variable from jQuery and makes it available
throughout the function. Next, is the *single function* that fires. As you can
see, it does two things: it shows the `#v2-div`, which is normally hidden, and
the `#shame-viz` div, which is also normally hidden. If you want it to do
more, like you define a `drawPieChart()` function, that would go in a separate
file in `src/shame/draw-pie-chart.js`, and you would import it and use it like
this:

```javascript
import $ from "jquery";
import drawPieChart from "./shame/draw-pie-chart";

export default function(){
  $("#v2-div").show();
  $("#shame-viz").show();
  drawPieChart();
}
```

Then, the subsequent `src/shame/draw-pie-chart.js` file could look something
like:

```javascript
import $ from "jquery";
import { pie } from "d3-shape";
import { purple } from "../constants";
import Data from "../../data/shameVizData.csv";

export default function(){
	const thePie = pie()
  // etc.
}
```

Keep your code lean and separated into smaller, manageable files in the
relevant directories (like `src/shame/`). 

### DRY

So you don’t repeat yourself, here’s a list of things you already have
available:

* `constants.js` Provides a bunch of constants, but these are most relevant:
  * `rem` The size of a REM.
  * `green` Our color green.
  * `orange` ...
  * `purple` ...
* `file-utils.js` Provides some Node shortcuts to making files. You should not
need to use these.
* `utils.js` provides a few functions:
  * `defaultRadius()` returns the default radius size, calculated based on the
size of the view port. This is for drawing dots in leaflet, mostly.
  * `titleUp(string)` will title case whatever string is sent to it. It works
just OK.

If you want to, say, load `purple` so you can color something purple in
JavaScript, do:

```javascript
import { purple } from "./constants"
```

With one or two `.` depending on whether you’re editing a file in `src/` or
`src/VIZNAME/`. 

### Committing

The system is wired to lint and build the JavaScript with every commit. To
skip that linting and building, pass the `--no-verify` flag to `git commit`.
If you do this just to avoid fixing linting errors, I will be very, very
cross. If you have problems delinting, ask me.

In general: ASK ME. It will typically take me much less time to answer, and I
want to teach. All I ask in return is that you make an effort to learn and not
keep asking the same things over and over (this is a subtweet…).
 
