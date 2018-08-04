---
layout: article
title: 
  "long": "Representation Matters"
  "short": "Representation Matters"
doi:
author: 
  creator: "Sá Pereira, Moacir P. de"
  name: Moacir P. de Sá Pereira
  shortname: Moacir
  bio: "Moacir P. de Sá Pereira ([@muziejus](http://twitter.com/muziejus)) is Assistant Professor / Faculty Fellow of English at New York University."
  date: 2018-06-23
  url: https://moacir.com
issue: 2
order: 1
abstract: ""
language: en
dcType: article
---

# Representation Matters

{: .author-credit }
by [Moacir P. de Sá Pereira](http://moacir.com/)

> Diagrams are of great utility for illustrating certain questions of vital
statistics by conveying ideas on the subject through the eye, which cannot be
so readily grasped when contained in figures.[^nightingale]

> Not only is it easy to lie with maps, it’s essential.[^monmonier]

Florence Nightingale had a mission. It was essential to persuade the British
Army, over the protestations of its generals who were convinced they knew
better than some woman, that terrible hygiene was killing off their troops
faster than enemy bullets. Half a year after her arrival at the Scutari
Barracks, now the Selimiye Barracks in the Üsküdar district of Istanbul, the
mortality rate of British soldiers dropped from 42.7% to 2.2%.[^cohen] She was certain
it was the introduction of sanitation measures that cause the decrease, but
how could she show it to drive home the difference her efforts made?

For Nightingale, familiar with the pioneering statistical work of Adolphe
Quetelet and William Farr, aggregating data about individual outcomes to draw
a larger picture seemed the best way to make a convincing argument, reversing
the adage about tragedy and statistics typically misattributed to Stalin.
Instead of flattening each individual’s tragedy in dying from poor sanitation,
Nightingale compounded the tragedies into one greater than the sum of its
parts, an emergent entity that carried extra affective weight from its simple
proposals: more medical supplies, more nurses, less filth.

But as Nightingale explains in the opening of 1858 pamphlet on the mortality of the
British Army, a diagram will be more useful to carry this affective weight,
prompting the design of the “batwings,” diagrams that treated the year as a
cycle and drew a line around the calendar to show trends in mortality.

<div id="batwing-div">
<h2>Diagrams <small>representing the relative Mortality from <span class="purple">ZYMOTIC
DISEASES</span>, from <span class="green">WOUNDS</span>, and from <span
class="orange">ALL OTHER CAUSES</span> in the HOSPITALS of the ARMY in the
EAST</small></h2>
<div class="row">
<div id="batwing-2-div" class="col-md-6">
<h3>April 1855 – March 1856</h3>
<svg id="batwing-2-svg"></svg>
</div>
<div id="batwing-1-div" class="col-md-6">
<h3>April 1854 – March 1855</h3>
<svg id="batwing-1-svg"></svg>
</div>
</div>
</div>

Despite the fact that for some reason the years go from right to left
(reproduced from Nightingale’s original) and that the visualizations begin on
April 1, or what is 9 o’clock on the calendar wheels, these diagrams
demonstrate *very* clearly that the bulk of soldiers were dying of infection,
or “zymotic diseases.” Wounds and other causes are barely a blip in the chart.
Yet Nightingale engages in a bit of sleight of hand to make the salient
political point here.  During the time period covered in these diagrams,
14,476 soldiers died from zymotic diseases, as opposed to 3,486 of wounds and
other causes. In other words, about four times as many soldiers died of
zymotic diseases.

Does the purple batwing look four times larger than the other two batwings
combined? 

With an *n* of one (my mom), the answer is clearly no. Nightingale is not
wrong to suggest that too many soldiers are dying of infectious disease. But
this chart makes it look like soldiers are *only* dying of infectious disease,
with a negligible number dying from causes more proximate to war. To achieve
this effect, Nightingale mobilizes an ancient “trick” of the visualization trade,
using two dimensions to represent a one-dimensional variable.
<div id="stackedbar-div"></div>

When the “batwings” are converted to a more familiar visualization, that of
the stacked bar chart, it’s still clear that soldiers are dying mostly of
zymotic diseases. However, the role of the other two causes of death is not as
obliterated as in the batwings. The reason is clear: the *area* of the purple
rectangles is proportionate to how much larger the mortality rate is to that
of the other two causes. Though I rely on a second dimension to give the bars
width, every variable enjoys the same, constant width, meaning the areas
remain proportional. We can assume each bar is one unit wide and *n* units
tall, meaning the only important value is the height, as the width cancels out
in multiplying area.

It’s important to put “trick” in scare quotes, because though Nightingale
would improve on the batwings to create the polar area chart or “rose”
visualization, which does not visually distort the data, it remains the case
that Nightingale wanted to use the data, in its visual forms, to not just tell
a story, but, rather, *make an argument*.

<div id="rose-div">
<div class="row">
<div id="rose-2-div" class="col-md-6">
<h3>April 1855 – March 1856</h3>
<svg id="rose-2-svg"></svg>
</div>
<div id="rose-1-div" class="col-md-6">
<h3>April 1854 – March 1855</h3>
<svg id="rose-1-svg"></svg>
</div>
</div>

Nightingale returns in 1859 and “corrects” the batwing diagrams
with the diagrams above, now known as polar area charts or Nightingale roses.
This is more “correct” in that the one-dimensional variable of mortality rate
is reproduced as the single variable of area, meaning that the wedges are
appropriately proportionate to each other. However, unlike with the stacked
bar chart, here area is measured from the center, meaning part of many of the
purple wedges is covered up by orange and green. So while, still, zymotic
disease remains a runaway killer, now it’s, oddly, underrepresented.

Other than reminding the reader of Nightingale’s pioneering use of data
visualizations, discussing mortality among British soldiers during the Crimean
War also highlights how Nightingale had several choice available when deciding
how to present the visualizations. It is a fiction to assume that one
rendering is more “correct” than the other; rather, the question is what
distortions are within the realm of the reasonable in terms of making the
narrative point one wants to. As Mark Monmonier explains in opening _How to
Lie with Maps_, maps are only readable and coherent because they have
distortions. If maps were “true,” they would be unusable.

## Volume 1

The first volume of _Torn Apart / Separados_ challenged us with several
questions in terms of visualization, some of which were then discussed in
several of the first reflections. There was a temptation, for example, to size
the various dots in proportion with certain data associated with them, such as
average daily population of detention facilities used by ICE. 

But that would have distracted somewhat from the other, competing desires. If
the goal is to show that ICE is everywhere, then scaling the markers based on
average daily population will make some facilities jump out and others
disappear into view. The story becomes different and more focused. In “Clinks”
and “Charts,” by making all the in-use facilities look the same on first
blush, the banal repeatability of ICE as it infects our national body seems
more thorough.

On the other hand, in “Banned,” we rely on cartographic distortion to
overstate a case. This visualization draws a map of contiguous United States
whose combined population is close to but less than the approximate number
people banned from entry into the United States at the moment, blocked by the
upheld “Muslim Ban.” Yet as sparsely populated mountain or plains state after
state is added to the growing black shape, it soon seems like nearly all of
America would be banned. We trick the eye, then, into thinking that American
population is evenly distributed across the United States. But it isn’t.

This is, unfortunately, a common design choice in choropleth maps, and it
resembles the “error” in Nightingale’s batwing, as well. I, at least, would
not make such a map under normal circumstances.

But these are not normal circumstances. In this way, “Banned” is a response to
the famous map of the 2016 Presidential Election hanging in the West Wing, [as
tweeted by Trey
Yingst](https://twitter.com/TreyYingst/status/862669407868391424):

![Spotted: A map to be hung somewhere in the West
Wing](https://i.imgur.com/xR1nLrd.png)

So just as fewer people voted for the red candidate than the blue, “Banned”
exaggerates the size of the US that would be banned from entry.

## Volume 2

The second volume, however, also presents challenges in terms of
representation. “Lines,” for example, shows how pervasive the American
deportation engine is. Yet the number of deportations at a specific port of
entry can be single digits or it can be over 1,000. Simply drawing lines
devalues the fact that each individual deportation is its own story that’s the
most important in the world to the deportee and their family and loved ones.
But somehow the difference between one and 1,000 also needs to be indicated.
The solution is to use a logarithmic scale. Now, 1,000 is a line that’s four
times longer than the line for a single deportation, and every soul gets a
wedge cutting across the face of the United States as it continues to expel.



[^cohen]: I. Bernard Cohen, “Florence Nightingale,” _Scientific American_ 250 (1984), 131. Most of my retelling of the Nightingale story is based on Cohen’s account.

[^nightingale]: Florence Nightingale, _Mortality of the British Army, at Home, at Home and Abroad, and During the Russian War, as Compared with the Mortality of the Civil Population in England_ (London: Harrison and Sons, 1858), 1.

[^monmonier]: Mark Monmonier, _How to Lie with Maps_ (Chicago, University of Chicago Press, 1991), 1.

---

{: .bio-slug}
[Moacir P. de Sá Pereira](http://moacir.com) ([@muziejus](http://twitter.com/muziejus)) is Assistant Professor / Faculty Fellow of English at New York University.
