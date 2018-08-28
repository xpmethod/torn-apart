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
order: 3
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

Florence Nightingale had a mission. It was crucial to persuade the British
Army, over the protestations of its generals who were convinced they knew
better than some woman, that terrible hygiene was killing off their troops
faster than enemy bullets. Half a year after her arrival at the Scutari
Barracks, now the Selimiye Barracks in the Üsküdar district of Istanbul, the
mortality rate of British soldiers dropped from 42.7% to 2.2%.[^cohen] She was certain
it was the introduction of sanitation measures that caused the decrease, but
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
prompting the design of the “batwings” diagrams that treated the year as a
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

Despite the fact that, for some reason, the years go from right to left
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
this chart makes it look like soldiers are effectively *only* dying of
infectious disease, with a negligible number dying from causes more proximate
to war. To achieve this effect, Nightingale mobilizes an ancient “trick” of
the visualization trade, using two dimensions to represent a one-dimensional
variable.  

<div id="stackedbar-div"></div>

When the “batwings” are converted to a more familiar visualization, that of
the stacked bar chart, it’s still clear that soldiers are dying mostly of
zymotic diseases. However, the role of the other two causes of death is not as
obliterated as in the batwings. The reason is clear: the *area* of the purple
rectangles is proportionate to how much larger the mortality rate is to that
of the other two causes. Though I rely on a second dimension to give the bars
width, every observation enjoys the same, constant width, meaning the areas
remain proportional. We can assume each bar is one unit wide and *n* units
tall, meaning the only important value is the height, as the width cancels out
when multiplying area.

It’s important to put “trick” in scare quotes, because though Nightingale
would improve on the batwings, it remains the case that Nightingale wanted to
use the data, in their visual forms, to not just tell a story, but, rather,
*make an argument*.

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
Furthermore, expecting people to accurately compare areas as opposed to
lengths is a tall order. We can tell which line is longer than which, and
typically we can tell about how much longer (two times, three times). With
area, it’s a bit trickier.

<div id="circles-div">
<svg id="circles-svg"></svg>
</div>

Which circle is two times larger than the leftmost? And how much larger is the
other circle? It’s hard to tell, since we can’t visually stack the bars like
mental Cuisenaire rods. In both visualizations—batwings and roses—Nightingale
gets an effect from the fuzzy visual area calculations. In the first set, the
result is massive distortion in favor of her argument. In the second, it’s a
slight distortion against.

But it is a fiction to assume that one rendering is more “correct” than the
other; rather, the question is what distortions are within the realm of the
reasonable in terms of making the narrative and persuasive point one wants to.
As Mark Monmonier explains in opening _How to Lie with Maps_, maps are only
readable and coherent because they have distortions. As Lewis Carroll, Jorge
Luis Borges, and Umberto Eco (among others?) remind us, if maps were “true,”
they would be unusable.

## Volume 1

The first volume of _Torn Apart / Separados_ challenged us with several
questions in terms of visualization, some of which were then discussed in
several of the first reflections. There was a temptation, for example, to size
the various dots in proportion with certain data associated with them, such as
average daily population of detention facilities used by ICE.

But that would have distracted somewhat from the other, competing desires. If
the goal is to show that ICE is everywhere, then scaling the markers based on
average daily population will make some facilities jump out and others
disappear into view. The story becomes different and more focused. In
“[Clinks](/torn-apart/volume/1/visualizations.html#clinks)”
and “[Charts](/torn-apart/volume/1/visualizations.html#charts),” by making all the in-use facilities look the same on first
blush, the banal repeatability of ICE as it infects our national body seems
more thorough.

On the other hand, in
“[Banned](/torn-apart/volume/1/visualizations.html#banned),” we rely on
cartographic distortion to overstate a case. This visualization draws a map of
contiguous United States whose combined population is close to but less than
the approximate number people banned from entry into the United States at the
moment, blocked by the upheld “Muslim Ban.” Yet as sparsely populated mountain
or plains state after state is added to the growing black shape, it soon seems
like nearly all of America would be banned. We trick the eye, then, into
thinking that American population is evenly distributed across the United
States. But it isn’t.

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

The red candidate understands that this map is making an argument, that the
totality of red space gives the visual illusion of an America standing behind
him as President, as the true voice of the majority, and of an overwhelming
majority at that.

## Volume 2

The second volume, however, also presents challenges in terms of
representation. “[Lines](/torn-apart/volume/2/visualizations.html#lines),” for example, shows how pervasive the American
removal engine is. Yet the number of deportations at a specific port of
entry can be single digits or it can be over 1,000. Furthermore, simply
drawing lines devalues the fact that each individual removal is its own
story that’s the most important in the world to the deportee and their family
and loved ones. But somehow the difference between one and 1,000 also needs to
be indicated. The solution to me was to use a logarithmic scale. Now, 1,000 is
a line that’s four times longer than the line for a single removal, and
every soul gets a wedge cutting across the face of the United States as it
continues to expel.

In this way, “Lines” has it both ways. It shows the extent of the problem of
removals across the world as a whole (after all, the US has no problem
removing souls from points of entry like Ireland), but also makes clear that
even one removal is a scar on the national image.

### The Banality of ICE

Both [Freezer](/torn-apart/volume/2/visualizations.html#freezer)
visualizations work from literally the same data set, indicating that the same
hierarchically grouped data can represent radically different modes of being
and interacting with the government contracting machine. In one
visualization, a messy ball of yarn shows how interconnected companies are
with the various governmental needs in the awards they win. A company like
CoreCivic provides “security guards and patrol
services” (which we categorize under “The Threat of Violence”), “correctional
institutions” (“Walls”), and “facilities support services” (“Surveillance”).
Companies like CoreCivic, or even more abstract management and consulting firms
like Booz Hamilton, have their fingers in various ICE contracting pies.

Nevertheless, there are not actually that many companies that are that
promiscuously pie-fingering. A company like Spectrum Security Services simply
provides “security guards and patrol services” over and over until they have
made $180m in ICE awards for 2018. In “ICE Tray,” that focus is shown in having
Spectrum Security services with just one square (but a large one) inside the
“The Threat of Violence” category, where all “security guards and patrol
services” awards land. CoreCivic, on the other hand, has several boxes
throughout the tray in several differently colored areas, to show its
relatively broad reach.

In the other visualization, however, our nine invented categories of
government awards are more or less laid atop each other, giving the impression
of a Gordian knot of governmental impenetrability. Neither visualization is
right; they just aim to highlight different aspects of the same data to make a
similar, underlying argument.

That underlying argument is, in both cases, underscoring how banal most ICE
funding is.  The outrage over the zero tolerance policy in part relies on
characterizing ICE as a bunch of special forces cosplayers, kicking people of
color with steel-tipped boots and throwing their children in cages.  But it’s
not just that, else ICE funding would go exclusively to boots and cages. It’s
also the massive apparatus that keeps white-collar, Hillary-voting, _Pod Save
America_-listening Northern Virginia technocrats who make sure
[RStudio](https://www.rstudio.com/) is running correctly on ICE computers fed,
technocrats largely represented by Democrats in Congress.

The oversized role of these technocrats is hinted at in every visualization
for volume 2 save “Lines.” In
“[Districts](torn-apart/volume/2/visualizations.html#districts),” we see that
ICE funding is not evenly distributed around the US, with about 16
Congressional districts taking home the lion’s share of the ICE budget since 2014. Yet of those districts getting ICE largesse, several are DC-adjacent,
where companies like Phacil and Widepoint Integrated Solutions pull in
millions of dollars from ICE despite (and because of) being, basically, IT
consultants.  This explosion of money to the IT sector happens to be [a
trademark of Representative Gerry Connolly’s work in
Congress](https://fcw.com/articles/2015/03/30/gerry-connolly-fitara-force-multiplier.aspx).
So it should be no surprise that his district is the most remunerated by ICE.
Since 2014, $1.3B has been showered over the Clinton-by-39-points district,
much of it to IT companies.

<div id="districts-div">
<svg id="districts-svg"></svg>
</div>

A brief look at the over $9B in ICE spending since 2014 shows how those 16
districts chew up the budget. The 17th, marked in orange above, is Washington,
DC., which while another ICE fat cat, also marks the turn towards vanishingly
small turns at the authoritarian trough. About 100 districts, or just under a
quarter of the total, haven’t seen a dime from ICE. Perhaps they need to get
in the consulting, computing, constructing, and coercing businesses.

The bipartisan nature of the grotesque gluttony also expresses itself in these
top districts, where the pitiful Democrats, shut out of every avenue of access
in Washington, or so they tell us, still manage to bring home the fat at a
clip outpacing their GOP counterparts. As a final note tying “Districts” to
other current events, Duncan Hunter may be
[woeful with his family
budgeting](https://www.nytimes.com/2018/08/26/us/duncan-hunter-corruption-scandal.html),
but his district has done well under the ICE regime, as Spectrum Security
Services has brought in $860M to parts of San Diego and Riverside Counties.
California’s 50th is the fourth most remunerated district.

The concentrated ICE spending also lets minority- and women-owned
organizations to shine in the glow of government awards, as we see in
“[Gain](/torn-apart/volume/2/visualizations.html#gain).” Much of the $890M
going to Alaska ends up in Akima’s coffers for services rendered mostly in
running the [Krome detention center in
Miami](https://www.ice.gov/detention-facility/krome-service-processing-center)
and the [Buffalo facility in Batavia,
NY](https://www.ice.gov/detention-facility/buffalo-federal-detention-facility).
Akima is owned by more than 14k Iñupiat shareholders, and Akima’s ability to
win awards for various detention-related services make Alaska’s At-Large
District the third most flush with ICE cash. In the meantime,

> [Many of our shareholders](http://www.akima.com/about/#heritage) still reside in their ancestral villages, relying
on the land for subsistence just as their people have done for 10,000 years.
Akima understands the cultural and spiritual importance of this lifestyle that
bridges generations and connects our shareholders to each other, to their
ancestors, and to their land.

Back in the Beltway, Phacil, based in Virginia’s 8th District (5th best
remunerated), has the dubious distinction of being the most-remunerated “Black
American–owned” business regarding ICE, which has paid $310M since 2014 for
various IT-related services. Phacil brags on their website about their start
as “a small, minority owned business” that has, obviously, “[always embraced
diversity and inclusion](https://www.phacil.com/about/diversity-inclusion/),”
but the idea that the money ICE has paid them has gone towards encouraging
racial equality in the United States is an offensive joke. The minority-owned
companies receiving over $1B from ICE since 2014 are, it seems, largely in the
various banal businesses of logistics and IT. Though some, like Akima, are
actively in the business of jailing their “fellow” people of color, most
contribute to the more abstract carceral regimes of the state, in facilitating
the ways in a laser printer helps keep another child separated from their
parents.

Speaking of laser printers, finally, in
“[Rain](/torn-apart/volume/2/visualizations.html#rain),” we see how ICE’s
awarding has grown since 2014. But the tiny dots in the visualization hide a
simple detail visible only if one happens to mouse over them in just the right
way that causes nearly the whole visualization to suddenly become darker. Of
the 5.5k awards represented in “Rain” (and in “Gain” and “Districts,” for that
matter), over 1k of them went to one company, North Carolina’s Net Direct
Systems. The $28M Net Direct has brought to North Carolina’s 2nd district is
comparable chump change on the ICE scale, but the idea that someone in the ICE
office, one out of every six times, has awarded a contract to Net Direct
boggles the mind and fully delineates how the ICE funding apparatus works. If
there is an entity to which nearly 20% of my purchases (in terms of number,
not in terms money spent) goes, it would probably be a grocery store. These
are the near daily purchases that provide the fuel that keep me running.
Similarly, the laptops, tablets, and computers ICE constantly buys from Net
Direct are also the fuel that keeps this system running.

[^cohen]: I. Bernard Cohen, “Florence Nightingale,” _Scientific American_ 250 (1984), 131. Most of my retelling of the Nightingale story is based on Cohen’s account.

[^nightingale]: Florence Nightingale, _Mortality of the British Army, at Home, at Home and Abroad, and During the Russian War, as Compared with the Mortality of the Civil Population in England_ (London: Harrison and Sons, 1858), 1.

[^monmonier]: Mark Monmonier, _How to Lie with Maps_ (Chicago, University of Chicago Press, 1991), 1.

---

{: .bio-slug}
[Moacir P. de Sá Pereira](http://moacir.com) ([@muziejus](http://twitter.com/muziejus)) is Assistant Professor / Faculty Fellow of English at New York University.
