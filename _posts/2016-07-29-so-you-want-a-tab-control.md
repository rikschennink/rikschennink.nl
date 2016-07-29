---
layout: post
title: So you want a Tab control?
tags:
- Opinion
- Responsive
- HTML
- CSS
- JavaScript
- Mobile
- Accessibility
---
Somehow someway you ended up with the task to build some tabs, how hard can it be, it’s just a simple tab control, right?

I thought it would be an interesting exercise to collect a list of relevant questions to ask when given the task to build a tab control. It turns out to nicely illustrates the complexity of a task perceived as relatively simple.

So here they are, 32 mostly unordered thoughts.

- What kind of HTML correctly describes this component?
- Is the number of tabs fixed?
- If not, how many should comfortably fit on a single line?
- Can tabs be nested?
- What happens when there's too much tabs to fit on a single line?
- How to handle spaces in tab labels, are the labels allowed to wrap?
- What happens with these tabs on a small viewport? Are they even tabs in that situation?
- Will the tab control be used in different width containers?
- Will we lower font size and margins between tabs as the view gets narrower?
- Do they need to play nice with right to left text?
- Can the tab labels contain icons?
- How do these tabs look on super wide viewports?
- How does the active state look?
- Is there a hover state?
- What about the focus state for keyboard users?
- And how do these states look together, hover over active, focus over active?
- Will the contents of the tab load immediately or is the content to be found on a separate page?
- Do we have to remember the active tab when the page reloads?
- Will we communicate the active tab state in an accessible manner? Using ARIA or just plain HTML elements?
- Is ARIA tab a useful role here or is this actually just a page index disguised as a tabs?
- Is this a new tab style, how is this style related to other styles?
- Will components in this control be re-used later on?
- In what situations will this tab control be used?
- Are we handling zooming of text correctly?
- How many versions of this tab control exist? Different sizes, colours?
- How will the tab control affect other components? 
- Will interactive components be loaded in the inactive tabs and will that affect their initialisation?
- After switching tabs is it clear the active content has changed?
- Are there any animations or transitions to be used when switching tabs?
- Should we use JavaScript to setup the interaction or will we use :target?
- When using JavaScript how do we setup the JavaScript-Crashed or is unavailable fallback?
- What about print styles?

Missed any good ones?