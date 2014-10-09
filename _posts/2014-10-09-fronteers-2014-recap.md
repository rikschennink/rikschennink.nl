---
layout: post
title: Fronteers 2014 Recap
tags: 
- CSS
- JavaScript
- Performance
---

A quick list based recap of what was said during Fronteers 2014.

Links to the presentations will be added as they come available. I’ll update the content with references to resources and photos in the coming days.

## Day 1

It’s gotta be said, Jake Archibald kicked of this conference like a boss. He talked about being nice, the location of fire exists, picking the right fire exit, being nice to fire, fire not being a requirement for a conference, no need to start a fire then, plus, some excuses about the british people pissing walls after football matches. To the first talk!

### Getting nowhere with CSS best practices - Heydon Pickering

- Heydon runs Ubuntu, which causes a little problem with the projector at first. After things get on the way he leaves the mouse pointer in middle of the screen, I have to admit, I’ve got problems with that sort of stuff.
- CSS best practise topics overlap with overall code quality topics like readability, maintainability and flexibility.
- Are white space discussions valuable to look back on when lying on your dead bed. It’s a good thing to ask yourself.
- Mouse pointer is still in the center of the screen, how do you cope with this Heydon, my god!
- We can view HTML as the interface and CSS as being “just” the branding (tweet)
- The trick is to use correct HTML elements instead of classes. There’s a lot of elements out there and they bring semantics to your code. Including aria attributes like `role=“navigation”` instead of `.main-nav` makes your HTML more accessible.
- Use conventions, but pick the right convention for the job. Once you’ve chosen one, it often sticks till the end of a project.
- Use `role=“tab”` to describe a tab element. I wonder if a blind user understands the concept of a tab. Do we need to communicate the fact that it’s an explicit tab control instead of an on page index?
- Aria states, there’s a lot of them, so there’s almost no excuse to use classnames.
- Compares class and attribute selector performance. A Greyhound race visualisation is shown, the difference is extremely minimal. Also, when other factors like images come into play selector performance is micro optimisation.
- Links without `href` attributes are of course nonsense but also not focusable.
- Zeldman (tweet), Overkill web animations and parallaxing can make people physically sick. So be gentle with these tricks.
- Complexity originates from: Funders obligatory widgets, social media, carousels, feedback widgets, all sorts of stuff that is not intended for the user and/or has not been usability tested.
- Rearranges pages in an actual George Orwell’s book indicating content turns into garbage when structure breaks down.
- 400+ links on sports website, not one of them has a focus outline, also no underline, links are black. A family member of Heydon has Parkinsons disease and is therefor unable to use the website, hovering over everything to find the links is difficult.
- If you think about it, we pay accessibility consultants to push our tab key. If we’d push our tab key a little more a lot of these accessibility issues would reveal themselves.
- Tell your client “the functionality is finished”, they’ll stop suggesting tweaks.
- Animation can be a useful tool to make a focus state more obvious and at the same time easier on the eyes.


### Making maps, the role of frontend infrastructure at Etsy - Daniel Espeset

- Resources for this talk can be found at [talks.desp.in/fronteers2014](http://talks.desp.in/fronteers2014)
- Etsy has 1 million active sellers
- Anybody can touch anything, everyone deploys, if something goes wrong, it’s a sign things need to be improved in for example the areas of automation or cultural areas. 
- Continues deployment, many small changes result in less risk than large long interval codebase changes.
- Designers write and push code as well.
- Using an in house tool called **Deployinator** for continues deployment.
- Lot’s of graphs and charts to keep a close eye on the production environment.
- 25 to 50 pushes a day (each push takes approximately 15 minutes)
- There’s a flag file which enables new features for a percentage of users on the production environment.
- Features are all A/B tested in a prototype phase (on production) these phases are called experiments.
- Deleting code, refactoring, automated testing, are all very difficult because of continues code changes and codebase growth.
- To regain control they use internal tool called Ranger. Ranger displays dependency graphs between JS and CSS files.
- Ranger can be used to create all kinds of cross sections of the frontend interface so people are more comfortable altering code.
- They use a small script called Shrinkray to detect unused CSS on the production server (a percentage of users will have the script loaded). It compares CSS selectors to results of `querySelector` calls to determine validity.
- Color definitions in Etsy CSS have gone haywire.
- Moving to SCSS to get this under control, but not using all functionality for now. Everyone needs to be able to work on the code (designers and developers) introducing complex functionality would hinder this. Also it’s easy to generate crazy amounts of CSS with just a couple of lines of SCSS.
- A lot of the discussed tooling is already or soon will become open source.
- All in all, some really great tips on how to get a grip on your codebase.


### Do we need to write markup? - Nathan Ford

- Jake is very pro Progressive Enhancement (rightly so) so states he’ll shoot Nathan in the face if things get too ugly.
- Been busy redesigning the webpages of CERN, the place where the web was originally invented by Tim Berners Lee.
- Tim intended HTML to be generated by machines. Also it was meant for content and for everyone.
- HTML translates the intend of the content so the browser can understand what it’s all about.
- Markup is not code (as it does not run anything). It’s more about design, and, it’s easy, but it’s also unforgiving (for instance, no error reporting when you forget to close a tag).
- Markdown is an optimisation of Markup.
- Can we make HTML easier to grasp for people in other professions.
- Nathan things we should be looking at HTML from a list point of view.
- He build a tool which you can use to create HTML trees by dragging and dropping HTML nodes. It enforces semantics and has validation build in, it’s an interface for learning and pushes smart defaults.
- This sort of tooling allows others in your team to take responsibility and control of markup.
- I’m glad to report that Nathan survived the talk without getting shot.


### Pushing the real-time web forward - Arnout Kazemier

- Long polling requests cannot take longer than 25 seconds. If it’s longer your browser will kill the request.
- Polling triggers loading indicator and will communicate mixed signals to your visitors.
- Caching is, as always, the big problem with asynchronous communication.
- WebSocket support available since IE10 and Android 4.3 so, basically pretty good. Everyone is happy now.
- Some really intense web sockets bugs causing crashes on mobile phones and osx. Also, press ESC on Firefox 20 closes connection.
- Networks block web sockets, load balancers, virus scanners block web sockets, it’s mayhem.
- By this point, there’s people crying.
- EventSource is nice and very simple alternative but unsupported by IE11 (and earlier of course). Initial revision of spec is not cross domain though.
- For now, it might be a good plan to use something like socket.io
- For the future, WebRTC might be the way to go.
- A good summary of various methods to handle asynchronous communication. Also, very clear code samples for solving all the described bugs.


### State of the Animation 2014 - Rachel Nabors

Jake: If you want to go full Michael Bay on your visitors, wrap your site in a blink tag

- Rachel says the words “blink” and “tag” next thing you know, full system failure. These words are clearly cursed.
- Animation improves adoption rate of new interfaces, change can be easier comprehended when it’s gradual, especially for the young and elderly.
- Products with animation will outcompete products without it, see Google Material Design animation comparison videos.
- There’s some excellent animation libraries out there:
— GSAP, GreenSock Animation Platform, previously a flash library
— Velocity.js, Alternative to jQueries Animate
- `will-change` is [alternative for translateZ(0)](https://dev.opera.com/articles/css-will-change-property/) which is kind of a hacky way to promote elements to there own render layer.
- [Animation API](http://updates.html5rocks.com/2014/05/Web-Animations---element-animate-is-now-in-Chrome-36) is not ready for production yet.


### Gaming in the browser - various speakers

#### Thomas Palef - LessMilk

- If you’re a developer and gamer, try to make your own game, it’s a great experience. 

I can advice you to do this, it’s awesome, you’ll learn a lot about code and interaction patterns. Also, you can tell people you’re a game developer, that rings bells.

- It can be tough to pick the right game framework, writing you’re own is also an option but could also quickly drive you mad.
- Use Phaser to create HTML5 web games, a lot of possibilities and very popular.

I’ve personally played around with Phaser, it’s very good, has a lot of options to create various kinds of games out of the box. Also lot’s of example projects.

- Don’t set your goals to high, try to make something small so you’ll finish it in time and you’ll stay motivated.


#### Luc Bloom - BlueGiraffe

- The web is a great platform because of the reach and the multi device nature. There’s no install required and it’s a new market, so lot’s to explore.
- As native c++ developers there we’re a lot of concerns about frontend development, like security, DRM, offline play, performance, javascript learning curve, return on investment.
- Also developing in Phaser as it was widely used already.


#### Dominic Szablewski - phoboslab

- Wanted to build a first person shooter in 7 days, but missed deadline by a year. Resulted in Xibalba, which, because it’s a web game works on a wide range of devices.
- Demos ImpactJS the engine powering Xibalba. Very cool stuff, awesome map editor and lot’s of options to choose from.
- Shows how to quickly create a secret room with a rocket launcher using the map editor. Then cheats his way through the first level of the game, what a bastard.


### WebRTC: a front-end perspective - Shwetank Dixit

- Shows old school lock “screen” on landline phone.
- In remote parts of the world people access the web over wireless, they never had land lines and probably never will.
- Sqwiggle uses WebRTC to allow you to communicate with others on the web.
- `getUserMedia` combined with CSS filters is an easy way to create nice effects.
- Shows a demo where audio is processed and where volume controls a rotating CSS animation. If you want to do actual speech recognition [PocketSphinxJS](http://syl22-00.github.io/pocketsphinx.js/) might be interesting to look at.
- Shows demo where a word is written by pointing at letters using the webcam, all inspirational stuff.
- `navigator.getUserMedia( … )` will become `navigator.mediaDevices.getUserMedia( … )`, also this new API will be promise based.
- Upcoming Media Stream API will allow camera control, think of white balance, zoom, exposure and red eye reduction.
- It’s a challenge to get users permission to access camera or microphone. The dialogs are not very visible, users tend to ignore or close them quickly. A lot of sites use an explanatory text to make you aware of the choice you have to make.
- If you’re on HTTPS the browser will remember the choice.
- An other part of WebRTC is RTCPeerConnection.
- [Web RTC Glossary](http://www.webrtcglossary.com) contains a list of acronyms used in the WebRTC docs.
- DataChannels provide a way to deliver low latency high performance p2p connectivity.
- They work very similar to WebSockets. Offer a lot of control over connection, ordering of data packets and amount of retransmits.
- Currently no support in IE and Safari. Maybe in a decade or so we’ll be more lucky.
- ORTC is a possible future replacement for WebRTC. It might also be called WebRTC 1.1, this is as confusing as it gets.


### Offline First: Faster, more fun, and more robust (web) apps - Alex Feyerke

- Works on [Hoodie](http://hood.ie) which allows you to build web apps really easy. Also, all the apps build with Hoodie are offline capable by default.
- Shows Microsoft and Google Future Visions, but states they are a bit unrealistic. For instance, Microsofts future contains people working everywhere and lacks self driving cars. While Google’s only contains happy people doing happy stuff in their happy lives. 
- Reading tip Alex gives us: Tobias Revell Critical Design / Design Fiction
- British Post Office future vision of the 60s for the 90s is a closer match. They’ve got a lot of stuff right, also, they focus on the mundane, things go wrong in their vision, they don’t sketch a perfect world.
- Mobile is normal, no connection is normal. Connections fail.
- Being offline should not throw errors, it’s a fact of normal life. It’s a different state your app can be in. Connection is an enhancement.
- To be offline first you have to embrace Progressive Enhancement. 
- You need to make the apps data assets and itself offline available.
- Hoodie apps only talk to a local hoodie store object which talks to local storage (could store somewhere else) which is synced with a REST service. So if the REST service is not there, a part of the data still is locally available and the app doesn’t care.
- The communication is done only with Messages and Tasks, the store throws events when things change.
- It uses CoucheDB to sync data between client and server.
- To be offline first, you need to tackle syncing, and this is tough. But luckily Hoodie solves this for you.
- People take screenshots of their apps because they don’t trust the app to retain the data.
- There’s still a couple of hurdles to take with offline first:
— Save vs. sync, how do you communicate these different states to the user
— Different labels on buttons what’s best?
— Coloured bars to indicated connection/sync state?
— Order of messages might get jumbled/meaning might change or messages might appear out of view when synced, interesting ux problems.
- By going offline first we can easier compete with native apps.
- Offline apps feel faster, more robust, and as a result give a better experience.
- Explicit saving is not required, it’s done automatically in local storage.
- Offline is the new standard, Progressive Enhancement has a new starting point. It’s tricky though as javascript is required for syncing but still you could store content offline with app cache and layer on server syncing and certain interaction patterns as an enrichment.
- Even with increasing network coverage offline first will stay relevant because there will be glitches. For instance when large groups of people come together and there’s just too many connections.

And that’s it for day one. A great start to a great conference.
