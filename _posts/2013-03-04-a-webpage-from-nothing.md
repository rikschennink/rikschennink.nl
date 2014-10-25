---
layout: post
title: A Webpage from Nothing
tags:
- Tutorial
- CSS
- HTML5
- Responsive
---

Lately I’ve been thinking about the role of HTML within a webdesign process. Usually we base our HTML on a visual design and have to think hard about what HTML element should be used where (semantics) and how we are going to make it all work within the rules laid out by [HTML5 sectioning](http://coding.smashingmagazine.com/2013/01/18/the-importance-of-sections/). Even if you’ve been working closely with the designer, stuff will end up in places where it don’t belong and your content hierarchy will suffer. Having an invalid content hierarchy will make it near impossible to create the perfect responsive website.

Instead of basing our HTML document on a visual design we should be basing our visual design on the HTML document. As conveying information is at the core of almost any webpage, and HTML is designed to give meaning to information, HTML should play a central role in the webdesign process. So I asked myself:

"How would the webdesign process look if we put HTML at the center of it?"


## HTML Centered Webdesign

Suppose you’re about to begin a new web project, you’ve got some ideas about the information you’re going to share and you’re ready to get started. At this moment it doesn’t matter if you haven’t got all the information you want to share, as long as you’ve got an overall idea of it’s structure you should be fine.


## HyperText Markup Language

Let’s postpone thinking about design elements for now, we’ve got other things to do first. Namely, things that have to do with that information you’re planning to share. Open your text editor of choice and let’s start to write some HTML to give that information meaning. We are going to write the HTML as if we are writing a report. You’ve got headings in there, subheadings, an index probably, a title, some paragraphs, quotes, lists, etc. It’s all about the document structure, if you mix up the headings and subheading, or skip a heading, your content order and thus your information will no longer make sense. All these familiar elements have their HTML counterparts, see this [HTML5 element list](https://developer.mozilla.org/en-US/docs/HTML/HTML5/HTML5_element_list) for information on the available HTML elements.


## Typography

Now that we have the HTML set and done let’s open it in your favorite browser. Continue with typography, define comfortable font sizes, weights, leadings, colors, all that fancy font stuff. Resize the browser window to a width where your paragraphs contain on average 12 to 13 words per line in your base font size. Make sure your document is readable, printable, and as a result nicely consumable. Don’t do any layout related stuff, that’s for another time. Be sure to read the [100% Easy-2-Read Standard](http://informationarchitects.net/blog/100e2r/), as it contains a lot of information on how to get near perfect readability.


## Going Mobile

Refresh the document once more, maybe print it, do lines wrap nicely? Does the page look good overall? Vertical rhythm okay? Great! Now, resize your browser window so it’s really tiny, say average mobile phone width. Does everything still look right? Awesome! No? The menu might be too big or you might have too few words on a single line? Too much whitespace maybe? If so, the time has come to fire up your favorite design application to do some sketching.


## Sketching

Visualize the stuff that doesn’t look right in the current viewport. Keep your document structure in mind, it should always have priority. The visuals you add should support your content and make the reading experience more pleasant. If you’ve decided some new interaction patterns are required, build some quick prototypes to test what works and what not. Once you’re happy with the resulting sketches and prototypes, translate them to CSS (and maybe some JavaScript), save your code and refresh the browser window. If all looks and functions okay, onward to the next step!


## Unleash the Power of Media Queries

Begin resizing the browser window, make it wider till your design starts showing some of the stuff we discussed in the previous step. Find the exact width at which things start breaking, it could be different widths for different parts of the document. Set the width of the current viewport as a min-width media query ([use proportional units](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/)) and start making sketches this new situation, applying the resulting styles within the media query. If a certain style you defined earlier is no longer required at the current window width, add a max-width media query.


## Repeat Till Happy

You can repeat the above process till you reach a width where you think you’ve got enough use cases covered. Now when you open your website in any device it should render perfectly, be it a mobile phone, a printer, a plasma screen, or a device we don’t yet know about.
