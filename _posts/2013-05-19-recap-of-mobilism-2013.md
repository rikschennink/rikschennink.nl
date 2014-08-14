---
layout: post
title: Recap of Mobilism 2013
tags:
- CSS
- Development
- Frontend
- HTML5
- Mobile
- Performance
- Responsive
---

Last week I attended the 2013 edition of Mobilism which, in short, was pretty awesome. Below is a quick summary of what was presented to help you decide on what’s interesting for you to watch. I’ve also added some of the notes I jotted down.

The common theme running through all talks was that in order to create the beautiful, fast and maintainable webpages of tomorrow we need to embrace content structure and put it at the core of our web dev process.

## Day 1

### [Dave Shea - Responsive Anti Patterns](http://mezzoblue.com/presentations/2013/mobilism/)
- Once you ship a mobile site or responsive site, research data shows an average 100% increase in sales within a couple weeks.
- Users who feel they are taken seriously are more willing to buy.
- App alert/landing pages should be presented in the right context. Users are probably browsing your site for information, presenting them with an option to switch to your app is only getting in the way of the information they are looking for.
- Move out of Photoshop, device testing is too important and can’t be done in a static design environment.
- This does not mean you should design in your browser. Don’t design in your browser, decide in your browser.
- Although we have moved away from the “fold”, data points out key action buttons should be above the “fold” for better conversion. This is often quite the challenge on mobile devices.
- Don’t rely on invisible interactions. They are a nice way to enhance the experience but often users don’t know they are there.
- Note A table on mobile requires small screen specific styles to fit multiple columns, content-first instead of mobile-first.

[Video of Dave Shea’s talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/67996449)

### [Stephen Hay – Revenge of the Web](https://speakerdeck.com/stephenhay/the-new-photoshop-part-2-the-revenge-of-the-web)
- Designers, in every branch, are familiar with the medium they design for, in the web they often are not. How boring would fashion be if fashion designers never worked with actual fabric.
- Web based mockups, watch out, these are not for production, clients need to understand this or they might think the product is finished on first presentation.
- Draw on the device in a sketch app using a pen to get a good feel of the space you’ve got.
- Design around content structure. Content structure should always be leading. Without structure, design is just some colors slabbed on a canvas.
- Use static site generators for mockups, for instance [Jekyll](http://jekyllrb.com/).
- [Dexy](http://www.dexy.it/) is a site generator specifically built for documentation or style guides.
- We need more ways to do layouting in CSS. It’s about time for Flexbox, Grid layout, Template layout.
- User mockups for fake design presentation and UX testing.

[Video of Stephan Hay’s talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/67996448)


### [Anna Debenham – Console Browsers](https://speakerdeck.com/anna/console-browsers-the-ultimate-torture-test)
- Kids often have some sort of game console at their disposal.
- Consoles have a huge range of input methods. Gesture, D-Pad, Voice.
- `x-webkit-speech` attribute allows form fields data entering through speech.
- *Note* Web dev companies should take their medium serious and own a broad selection of devices to test on.
- Consoles and WebTVs might have limited memory and have other performance issues. They might kill your site once it takes to long to load, or it might be impossible to interact with your site because it’s just to sluggish.
- *Note* Console browsers are a mess, should we even try to fix this? I think not, we should however try to make interacting easier by, for instance, using `:focus` styles.
- *Note* The broad range of browsers makes it even more important for Interaction Designers to actually test prototypes with actual users on these various devices.
- More information can be found at A List Apart – Testing Websites in Game Console Browsers

[Video of Anna Debenham’s talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/68003064)


### [John Cleveley – Scale and adept, BBC](http://www.slideshare.net/jcleveley/mobilism-2013-a-story-of-how-we-built-responsive-bbc-news)
- Responsive is not screen size alone but other things as well, like input method, connection, etc. Don’t target the device, target the web.
- Worldwide there are five times as many normal phones as smartphones.
- Focus on content structure.
- Divide browsers into two categories, old and new, using `querySelector`, `addEventListener` and `localStorage` test.
- Because of this division, testing and developing new features is easier.
- Decide on a performance budget: BBC aims for 10 seconds on GPRS to be acceptable, this leaves around 100Kb for a single page. Less is, of course, better.
- Scaling images is CPU intensive, so be careful with this. Most mobile devices have slow CPU’s.
- Responsive images technique used on BBC: Empty div’s with data attributes pointing to image source, div size passed to server, server returns correctly scaled image.
- Use an AMD loader like [RequireJS](http://requirejs.org/).
- [Cucumber](http://cukes.info/) for testing.
- Leverage the power of [PhantomJS](http://phantomjs.org/) and [netsniff.js](http://code.google.com/p/phantomjs/source/browse/examples/netsniff.js) to measure webpage performance

[Video of John Cleveley’s talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/68025331)


### [Remy Sharp – I know jQuery, now what?](http://remysharp.com/2013/04/19/i-know-jquery-now-what/)
- jQuery not really necessary anymore. JavaScript has matured a lot in the past years.
- [min.js](https://github.com/remy/min.js), a tiny library, based on the basic jQuery API.
- `dataset.foo = "bar"` adds a data attribute called `foo` with value `bar` on the DOM node.
- Take a good look at [xhr2](http://www.w3.org/TR/XMLHttpRequest2/) it is most interesting.
- Stop writing bloated jQuery plugins, a lot of plugins don’t need jQuery at all.

[Video of Remy Sharp’s talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/68910118)


### [Cennydd Bowles – Context, bloody context](http://cennydd.co.uk/2013/designing-with-context)
- Presents various context stereotypes: Like desktop users (longer interactions, filling in forms, researching topics) and mobile users (speed, quick, bumpy, confused, distracted, short interactions).
- These stereotypes are wrong, they don’t always exist and can’t therefor be counted on.
- 60% of smartphone data usage occurs indoors.
- Context is emergent, so changes on the fly.
- Implying context from only sensory data is error prone and a also privacy concern.
- Learning context from research via surveys, analytics, shadowing, interviews, etc. Stalk people in a nice way.
- There’s lots of types of context:
  1. Device: the actual shape of the device, capabilities of the OS and UI conventions. Because of this we should celebrate the diversity of the web, and stop fighting it.
  2. Environment: weather, light, noise. Don’t make fuzzy environmental details your problem, users are perfectly capable to take care of those themselves.
  3. Time: device habits, doing other things, when available/when used?
  4. Activity: task nature, digital/physical.
  5. Individual: nature of relationship with app/device, mental attitudes, likes/dislikes.
  6. Location: habitual/mobile, location specific needs, privacy.
  7. Social: who’s nearby, others involved, device sharing.

[Video of Cennydd Bowles’ talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/68916119)


### [Max Firtman – Breaking Limits on Mobile HTML5](http://www.slideshare.net/firt/breaking-mobile-html5-15-hacks-you-might-not-know)
- The mobile web is a minefield.
- Shows a wide range of hacks to fix mobile web problems related to: Fullscreen, Windows 8 snap, Canvas pixel ratio, Numeric input, ContentEditable, Capture image, Native integration, Push with Passbook, Live tiles.

[Video of Max Firtman’s talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/68923837)


### [Josh Clark – Beyond Mobile](https://dl.dropboxusercontent.com/u/2461754/beyond-mobile.pdf)
- Sensors in mobile devices unlock a wide range of super powers.
- Because of these sensors mobile devices can do more than traditional desktops.
- [Into Now](http://www.intonow.com/), [Shazam](http://www.shazam.com/) of TV shows. Interpreting the environment. Record 4 seconds of sound and the app knows not only what TV show but also what episode of this TV show you’re watching.
- [Skinvaders](http://www.t-immersion.com/project-gallery/skinvaders-app-right-your-face), [TableDrum](http://www.tabledrum.com/) and [WorldLens](http://questvisual.com/us/) are three examples of Augmented Reality done right.
- New interactions possible through: [Leap Motion](https://leapmotion.com/), [Kinect](http://www.xbox.com/Kinect) and [Myo](https://getmyo.com/). These devices are not trying to replace the mouse.
- Don’t run a nuclear power plant on a Kinect. It’s just not mature enough for that sorta stuff yet.
- Gesture + Speech == Magic, Harry Potter, Yay!
- Sensors are currently cheap enough to put in a daily pill, see this example by [Proteus – Digital Health](http://proteusdigitalhealth.com/technology/), or stick one on a [cow](http://www.phaseivengr.com/p4main/Solutions/WirelessSensingSolutionsInDepth/AnimalHealthandIdentification.aspx).
- It’s not always about the screen it’s about the sensors unlocking subtle interactions.
There’s all sorts of possibilities for interesting interactions between devices.
- Smart devices talking to dumb devices, not smart devices everywhere. Dumb devices should be doing the work and don’t necessarily need screens. A refrigerator with a browser is just madness, with a fridge sticking around for 15 years how can it possibly keep up with browser development.
- [Sifteo Cubes](https://www.sifteo.com/) interact with each other, why not our smart (and dumb) devices?
- Right column on websites always full of crap. Just because we have bigger screens does not mean we should fill them with content.
- Well described and structured content without presentation served through a decent API is essential.
- Guardian parses indesign files to generate prioritised iPad app content.
- Services and content are lasting, where presentation and code typically have a shorter lifecycle.

[Video of Josh Clark’s talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/68935393)



## Day 2

### Derek Featherstone – Doing responsive right
- The web is accessible by default, don’t unaccessiblize it.
- Related information should be close to each other. Radio buttons in a separate column are a problem for users with zoomed in interface.
- Embrace vertical stack of information and actions.
- When sorting, make the information type you sort on appear more prominent. Make this accessible by using headings.
- Bring buttons to the user. Touch start: move menu to touch location, drag to choose option.
- Keep keyboard interaction in mind, how does this change cross device.
- Sliding content of screen could cause problems with iOS VoiceOver. Set the hidden content to display:none or remove it from the DOM to prevent these problems.
- Popovers don’t work correctly on mobile because of lacking `tabindex` support, therefor we can’t bring focus to the popover. Put popover fullscreen to force the user to interact with the popover or find a more suitable solution.

[Video of Derek Featherstone’s talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/68965033)


### [Peter-Paul Koch – Developing for Touch](http://quirksmode.org/presentations/Spring2013/touchevents_mobilism.pdf)
- Stick with the “click” event, it works everywhere, it’s not a mouse event and could as easily have been called “activate”.
- Why all these different event categories? We could combine them into one generic set. Microsoft has done some grouping and came up with pointer events. You can control pointer events through CSS, which is not ideal.
- Use `changedTouches` if you only need one touch event.
- There’s a lot of inconsistencies between devices and browsers, use of an abstraction layer like for instance [Hammer.js](http://eightmedia.github.io/hammer.js/) is advised.
- Enable inertia scrolling on iOS and BB10 using `-webkit-overflow-scrolling: touch` CSS property. Might be processor and memory intensive though, so keep this in mind.

[Video of Peter-Paul Koch’s talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/69018217)


### [Mat Marquis – Responsible responsive images](https://speakerdeck.com/wilto/responsible-responsive-images-1)
- The entire works of Shakespear (5 megs), Windows 95 (60 megs) and 60 copies of the original zelda (1.1 megs) are smaller than this [Oakley Airbrake MX](http://moto.oakley.com/) landing page (90 megs).
- Use media queries in video source to decide on video quality.
- `srcset` attribute is used as a suggestion, browser decides on what to load, a high-res or low-res version of an image. We as developers should not take control over user bandwidth usage.
- [picturefill](https://github.com/scottjehl/picturefill), polyfill for the picture element.
- [grunticon](https://github.com/filamentgroup/grunticon), a task for [GruntJS](http://gruntjs.com/) which generates stylesheets containing data-uris for svgs and png fallbacks.

[Video of Mat Marquis’ talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/69060795)


### [Martin Kool – A successful cross-platform HTML5 game](https://docs.google.com/presentation/d/1jVZAJ-BZvVQoIBIEBZICXW9uvbaL-T9lJqStf53SRXQ/pub?start=false&loop=false&delayms=3000)
- Less is more, peeling the onion, what is the core concept of the game or app, what remains should have your focus.
- Don’t put non hardware accelerated layers on top of hardware accelerated layers. It will cause render quirks.
- Baby step introduction to app interaction patterns. Take the user by the hand and guide him the first couple times he interacts with your app.
- [Quento](http://quento.nl/) HTML5 app was downloaded 100.000 times so far, 4500 of these users went for the in app purchase of 0.99 dollar cents.
- Goals are important to give people a feel of achievement. So a daily set of puzzles instead of an endless stream.

[Video of Martin Kool’s talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/69142243)


### Guy Podjarny – The Internet Observatory
- Navigate to AkamaiIO for excellent browser statistics, international and very large sample sizes.

[Video of Guy Podjarny’s talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/69142243)


### [Rob Hawkes – WebRTC](http://www.slideshare.net/robhawkes/the-state-of-web-rtc)
- WebRTC is Peer to Peer communication between browsers. You could also say “Skype running in the browser”.
- WebSockets always require a server. WebRTC is more aimed towards streaming media and eliminates the use of a server/middleman.
- WebRTC uses UDP, no need to receive a confirmation for when your data is received.
- Some example applicable areas: video, audio, screen sharing, collaborative writing, multiplayer games, file sharing, remote control.
- *Note* WebRTC P2P file sharing could be the thing that triggers more people to upgrade to a modern browser.
- `getusermedia` is not full WebRTC.
- WebRTC is slowly making it’s way to modern browsers.
- Connecting two clients requires a server to do the handshake, once that’s done, the server is no longer required.
- [TowTruck](https://towtruck.mozillalabs.com/): browsing a webpage together. [conversat.io](http://conversat.io/): video chatrooms for up to 6 people. [PeerJS](http://peerjs.com/): takes care of signaling to bring clients together. [PeerCDN](https://peercdn.com/): sharing page load across users. [PeerKit](http://peerkit.com/): Loading images via peers.

[Video of Rob Hawkes’ talk](http://vimeopro.com/mirabeaunl/mobilism-2013/video/69216530)


### [Sara Wachter-Boettcher – Designing with and for existing content](http://www.slideshare.net/Saraboettcher/what-you-dont-know-will-hurt-you-designing-with-and-for-existing-content)
- Spaghetti content, content that has been added and added and added, and never maintained.
- Content structure is the foundation of any website. To do this right it requires an organisational shift to also keep content structured.
- Try to reduce content before starting anything else (design, development, etc.). This process not only makes production easier but also gives great insight into organisational structure.
- Natural relation between content allows you to minimise the size of your menu because navigation between forms of content is easier to realise.
- Turning content into a system makes organisations more aware of what they need to be publishing instead of just publishing stuff.
- Read more about content structure in Sara’s book [Content Everywhere](http://rosenfeldmedia.com/books/content-everywhere/).


### [Jake Archibald – Rendering Without Lumpy Bits](https://speakerdeck.com/jaffathecake/rendering-without-lumps)
- Tests with lower frame rates on the Facebook app resulted in significantly less user engagement.
- `innerHTML` triggers “parse HTML” action.
- The “Layout” action in Chrome is called “Reflow” in Firefox.
- `textContent` does not trigger a reflow while `innerText` does.
- Keep test performance tweaks you read about, they might have been fixed or have changed recently.
- Use `requestAnimationFrame` for animations.