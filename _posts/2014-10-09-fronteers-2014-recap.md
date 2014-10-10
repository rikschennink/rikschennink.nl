---
layout: post
title: Fronteers 2014 Recap
tags: 
- CSS
- JavaScript
- Performance
---

A quick, list based, recap of what was said during [Fronteers 2014](https://fronteers.nl/congres/2014).

Links to the presentations will be added as they come available. I’ll update the content with references to resources and photos in the coming days.

## Day 1

It’s gotta be said, [Jake Archibald](https://twitter.com/jaffathecake) kicked of this conference like a boss. He talked about being nice, the location of fire exists, picking the right fire exit, being nice to fire, fire not being a requirement for a conference, no need to start a fire then, plus, some excuses about the british people pissing walls after football matches. To the first talk!

### [Getting nowhere with CSS best practices](http://slides.com/heydon/getting-nowhere-with-css-best-practices) - [Heydon Pickering](http://twitter.com/heydonworks)

- Heydon runs Ubuntu, which causes a little problem with the projector at first. After things get sorted out he leaves the mouse pointer in middle of the screen, I have to admit, I’ve got problems with that sort of stuff.
- CSS best practise topics overlap with overall code quality topics like readability, maintainability and flexibility.
- Are white space discussions valuable to look back on when lying on your dead bed. It’s a good thing to ask yourself. Because one day, you will die.
- Mouse pointer is still in the center of the screen, how do you cope with this Heydon, my god!
- We can view HTML as the interface and CSS as being “just” the branding
- The trick is to use correct HTML elements instead of classes. There’s a lot of elements out there and they bring semantics to your code. Including aria attributes like `role=“navigation”` instead of `.main-nav` makes your HTML more accessible.
- Use conventions, but pick the right convention for the job. Once you’ve chosen one, it often sticks till the end of a project.
- Use `role=“tab”` to describe a tab element. 

I wonder if a blind user understands the concept of a tab. Do we need to communicate the fact that it’s an explicit tab control instead of an on page index?

- [Aria states](http://www.w3.org/TR/wai-aria/states_and_properties), there’s a lot of them, so there’s almost no excuse to use class names. [Be careful to not misuse aria attributes though.](https://www.ssbbartgroup.com/blog/2014/06/05/how-not-to-misuse-aria-states-properties-and-roles/)
- Compares class and attribute selector performance. A Greyhound race visualisation is shown, the difference is extremely minimal. Also, when other factors like images come into play selector performance is micro optimisation.
- Links without `href` attributes are nonsense and also cannot be focussed.
- An overkill of web animations and parallaxing can make people physically sick. Be kind to your users.

<div class="cinema">
<blockquote class="twitter-tweet" lang="en"><p>Web animations &amp; parallax make people with vestibular issues sick! The only way they can turn them off is to disable CSS &amp; JavaScript. <a href="https://twitter.com/hashtag/a11y?src=hash">#a11y</a></p>&mdash; Jeffrey Zeldman (@zeldman) <a href="https://twitter.com/zeldman/status/492805247455072256">July 25, 2014</a></blockquote>
    <script async src="http://platform.twitter.com/widgets.js"></script>
</div>

- Complexity originates from: Funders obligatory widgets, social media, carousels, feedback widgets, all sorts of stuff that is not intended for the user and/or has not been usability tested.
- Heydon rearranges pages in an actual George Orwell’s book illustrating that content turns into garbage when structure breaks down.
- 400+ links on [Sky Sports](http://www.skysports.com) website, not one of them has a focus outline, also no underline, a lot of the links are black. A family member of Heydon has Parkinsons disease and is therefor unable to use the website, hovering over text to find the links is difficult with this condition.
- If you think about it, we pay accessibility consultants to push our tab key. If we’d push our tab key a little more a lot of these accessibility issues would reveal themselves.
- Tell your client “the functionality is finished”, they’ll stop suggesting tweaks.
- Animation can be a useful tool to make a focus state more obvious and at the same time easier on the eyes.

Great talk, funny and very sharp!


### [Making maps, the role of frontend infrastructure at Etsy](http://talks.desp.in/fronteers2014/) - [Daniel Espeset](https://twitter.com/danielespeset)

- [Etsy](https://www.etsy.com) has 1 million active sellers
- At Etsy, anybody can touch anything, everyone deploys, if something goes wrong, it’s a sign things need to be improved in (for example) the areas of automation or culture. 
- Continuos deployment, many small changes over short periods of time are less risky than a lot of changes at once.
- Designers at Etsy write and push code as well.
- Using an in house tool called **Deployinator** for continuos deployment.
- They’ve got lots of graphs and charts to keep a close eye on the production environment.
- There’s 25 to 50 pushes a day (each push takes approximately 15 minutes).
- There’s a flag file which enables new features for a percentage of users on the production environment.
- Features are all A/B tested in a prototype phase (on production) these phases are called experiments.
- Deleting code, refactoring, automated testing, are all very difficult because the quick way in which code keeps changing.
- To regain control they build a tool called Ranger. Ranger displays dependency graphs between JS and CSS files.
- They can use it to create all kinds of cross sections of the frontend interface making people more comfortable altering code.
- A small script called Shrinkray detects unused CSS on the production server (1% of users will have the script loaded). It compares CSS selectors to results of `querySelector` calls to determine selector validity.
- Color definitions in Etsy CSS have grown out of control.
- Moving to SCSS to get this under control, but not using all functionality for now. Everyone needs to be able to work on the code (designers and developers) introducing complex functionality would hinder this. Also it’s easy to generate a lot of CSS with just a couple of lines of SCSS.
- A lot of the discussed tooling will be made open source.

Some really great advice on how to regain control of your codebase.


### Do we need to write markup? - [Nathan Ford](https://twitter.com/nathan_ford)

Jake is a Progressive Enhancement guy so states he’ll shoot Nathan in the face if things get too ugly.

- Nathan has been busy redesigning the webpages of CERN, the place where the web was originally invented by Tim Berners Lee.
- Tim intended HTML to be generated by machines. Also it was meant for content.
- HTML translates the intend of the content so the browser can understand what it’s all about.
- Markup is not code (as it does not run anything). It’s more about design, and it’s easy. It’s also unforgiving (for instance, no error reporting when you forget to close a tag).
- [Markdown](http://daringfireball.net/projects/markdown/) is an optimisation of Markup.
- Can we make HTML easier to grasp for people in other professions.
- Nathan things we could look at HTML from a list point of view.
- He build [a tool which you can use to create HTML trees](https://github.com/nathanford/html-list-builder) by dragging and dropping HTML nodes. It enforces semantics and has validation build in, it’s an interface for learning and pushes smart defaults.
- This sort of tooling allows others in your team to also feel responsible for markup.

I’m glad to report that Nathan survived the talk without getting shot.


### Pushing the real-time web forward - [Arnout Kazemier](https://twitter.com/3rdEden)

A talk about all sorts of bugs encountered when doing async client server communication.

- Long polling requests cannot take longer than 25 seconds. If they are still open after 25 seconds the browser will kill the request.
- Polling triggers loading indicator and will communicate mixed signals to your visitors. There’s iframe hacks around this, yes, iframe hacks.
- Caching is, as with everything, the big problem with asynchronous communication.
- But there’s light at the end of the tunnel and it’s named [WebSockets](https://developer.mozilla.org/en/docs/WebSockets).
- WebSocket support available since IE10 and Android 4.3 so, basically pretty good. 

Everyone is in a state of joy.

- Some really intense WebSocket bugs causing crashes on mobile phones and OSX. Also, press ESC on Firefox 20 closes the connection.
- There’s all sorts of stuff blocking WebSockets: certain networks, load balancers, virus scanners block web sockets, it’s mayhem.

By this point, you can hear people sobbing.

- [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) is a nice and very simple alternative but unsupported by IE11 (and earlier of course). Initial revision of spec is not cross domain though.

For now, it might be a good plan to use something like [socket.io](http://socket.io)

- For the future, [WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) might be the way to go.

An excellent summary of various methods to handle asynchronous communication. Also, very clear code samples illustrating ways around the various bugs.


### State of the Animation 2014 - [Rachel Nabors](https://twitter.com/rachelnabors)

Jake: “If you want to go full Michael Bay on your visitors, wrap your site in a blink tag”

- Rachel speaks the words “blink” and “tag”, next thing you know, full system failure.
- Animation improves adoption rate of new interfaces, change can be easier comprehended when it’s gradual, especially for the young and elderly.
- Products with animation will outcompete products without it, see Google Material Design animation comparison videos. People will start to expect animation to be there.
- There’s some excellent animation libraries out there:
— [GSAP](https://greensock.com/gsap), GreenSock Animation Platform, previously a flash library
— [Velocity.js](http://velocityjs.org), An alternative to jQueries Animate
- `will-change` is [alternative for translateZ(0)](https://dev.opera.com/articles/css-will-change-property/) which is kind of a hacky way to promote elements to there own render layer.
- [Animation API](http://updates.html5rocks.com/2014/05/Web-Animations---element-animate-is-now-in-Chrome-36) it seems is not ready for production yet.


### Gaming in the browser - various speakers

#### [Thomas Palef](https://twitter.com/thomaspalef) - [LessMilk](http://www.lessmilk.com)

- If you’re a developer and gamer, try to make your own game, it’s a great experience. 

I can advice you to do this, it’s awesome, you’ll learn a lot about code and interaction patterns. Also, you can tell people you’re a game developer, that rings bells.

- It can be tough to pick the right game framework, writing you’re own is an option but is a big undertaking.
- Use [Phaser](http://phaser.io) to create HTML5 web games, it has a lot of possibilities and very popular.

I’ve personally played around with Phaser, it’s very good, has a lot of options to create various kinds of games out of the box. Also lot’s of example projects, which will come in handy if you’ve never attempted to create a game before.

- Don’t set your goals to high, try to make something small so you’ll finish it in time and you’ll stay motivated to make your next game.


#### [Luc Bloom](https://twitter.com/LucieBloom) - [Blue Giraffe](http://bluegiraffe.nl)

- The web is a great platform because of the reach and the multi device nature of it. There’s no install required and it’s a new market, so lot’s of things to explore.
- As native c++ developers there were a lot of concerns about frontend development, like security, DRM, offline play, performance, javascript learning curve, return on investment.
- Also decided to develop there games with Phaser as it was widely used already.


#### [Dominic Szablewski](https://twitter.com/phoboslab) - [Phoboslab](http://phoboslab.org)

- Wanted to build a first person shooter in 7 days, but missed deadline by a year. Resulted in [Xibalba](http://phoboslab.org/xibalba/), which, because it’s a web game works on a wide range of devices.
- Demos ImpactJS the engine powering Xibalba. Very cool stuff, awesome map editor and a lot of controls to work with.
- Shows how to quickly create a secret room with a rocket launcher using the map editor. Then cheats his way through the first level of the game, what a bastard.


### WebRTC: a front-end perspective - [Shwetank Dixit](https://twitter.com/shwetank)

- Shows old school lock “screen” on landline phone.
- In remote parts of the world people access the web over wireless, they never had land lines and probably never will.
- [Sqwiggle](https://www.sqwiggle.com) uses WebRTC to allow you to communicate and collaborate with others on the web.
- `getUserMedia` combined with [CSS filters](http://css-tricks.com/almanac/properties/f/filter/) is an easy way to create nice effects.
- Shows a demo where audio is processed and where volume controls a rotating CSS animation. If you want to do actual speech recognition [PocketSphinxJS](http://syl22-00.github.io/pocketsphinx.js/) might be interesting to look at.
- Shows demo where a word is written by pointing at letters using the webcam. 
- `navigator.getUserMedia( … )` will become `navigator.mediaDevices.getUserMedia( … )`, also this new API will be [promise](http://www.html5rocks.com/en/tutorials/es6/promises/) based.
- Upcoming [Media Stream API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_API) will allow camera control, think of white balance, zoom, exposure and red eye reduction.
- It’s a challenge to get users permission to access camera or microphone. The dialogs are not very visible, users tend to ignore or close them quickly. A lot of sites use an explanatory text to make you aware of the choice they have to make to use their service.
- If you’re on HTTPS the browser will remember the choice.
- An other part of WebRTC is [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection).
- [Web RTC Glossary](http://www.webrtcglossary.com) contains a list of acronyms used in the WebRTC docs.
- [DataChannels](http://www.html5rocks.com/en/tutorials/webrtc/datachannels/) provide a way to deliver low latency high performance peer to peer connectivity.
- They work very similar to WebSockets. Offer a lot of control over connection, for example, ordering of data packets and amount of retransmits.
- Currently no support in IE and Safari. 

Maybe in a decade or so we’ll be more lucky.

- ORTC is a possible future replacement for WebRTC. It might also be called WebRTC 1.1, this is as confusing as it gets.


### Offline First: Faster, more fun, and more robust (web) apps - [Alex Feyerke](http://alexfeyerke.com)

- Works on [Hoodie](http://hood.ie) which is a framework that allows you to quickly and easily build web apps. Also, all the apps build with Hoodie are offline capable by default.
- Shows [Microsoft](https://www.youtube.com/watch?v=a6cNdhOKwi0) and [Google](https://www.youtube.com/watch?v=v1uyQZNg2vE) future visions. Explains they are a bit unrealistic. For instance, the future Microsoft paints contains people working everywhere and lacks self driving cars. While Google’s only contains happy people doing happy stuff in their happy lives. Also, in both videos, all technology works flawlessly.
- Reading tip Alex gives us: [Tobias Revell Critical Design / Design Fiction](http://blog.tobiasrevell.com/2013/12/critical-design-design-fiction-lecture.html)
- [British Post Office future vision](https://www.youtube.com/watch?v=VN3hF8dX8TM) of the 60s for the 90s is a closer match. They’ve got a lot of stuff right, also, they focus on the mundane, things go wrong in their vision, they don’t sketch a perfect world.
- Mobile is normal, no connection is normal. Connections fail.
- Being offline should not throw errors, it’s a fact of normal life. It’s a different state your app can be in. Having a connection is an enhancement.
- Our web apps should work offline. And to do that, you have to start at offline.
- To be offline first you have to embrace Progressive Enhancement. 
- You need to make the apps data assets and itself offline available.
- Hoodie apps only talk to a local hoodie store object which talks to `localStorage` (could store somewhere else also) which is synced with a REST service. So if the REST service is not there, a part of the data still is locally available.
- The communication is done only with Messages and Tasks, the store throws events when things have changed or a message arrives.
- It uses [CoucheDB](http://couchdb.apache.org) to sync data between client and server.
- To be offline first, you need to tackle syncing, Alex tell us this is tough. But luckily Hoodie solves this for you.
- People take screenshots of their apps because they don’t trust the app to retain their data.
- There are still a couple of hurdles to take with offline first:
— Save vs. sync, how do you communicate these different states to the user, are you going to use different labels or maybe different colours. Do users understand syncing?
— Order of Messages might get jumbled / meaning might change or messages might appear out of view when synced. There are interesting UX problems to solve.
- By going offline first we can easier compete with native apps. Offline apps feel faster, more robust, and as a result give a better experience.
- Explicit saving is not required, it’s done automatically.
- Offline is the new standard. Progressive Enhancement has a new starting point.

<div class="cinema">
<blockquote class="twitter-tweet" lang="en"><p>I would not say offline-first is the new Progressive Enhancement. &#10;&#10;Progressive Enhancement just has a new starting point. <a href="https://twitter.com/hashtag/fronteers14?src=hash">#fronteers14</a></p>&mdash; Rik Schennink (@rikschennink) <a href="https://twitter.com/rikschennink/status/520232375918555136">October 9, 2014</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

It’s a bit tricky though as javascript is required for syncing. Still we could store content offline with app cache and layer on server syncing and certain interaction patterns as an enrichment.

- Even with increasing network coverage offline first will stay relevant because there will be glitches. For instance when large groups of people come together and there’s just too many connections.

And that’s it for day one. A great start to a great conference.
