---
layout: post
title: Controlling Behaviour
tags:
- Tutorial
- CSS
- Development
- Frontend
- HTML5
- JavaScript
- Responsive
---
Responsive design brings a lot of new challenges to the table of web development. Not only the technical side of a web project needs to be turned upside down and inside out, the entire process of developing a website in a multidisciplinary team needs to change.

There’s a ton of things concerning the above that I could write about and people are writing about but for now I’ll stick to JavaScript.

Before I started writing any big client-side frameworks I wrote a lot of tiny webapps in actionscript. A couple of years later when I started writing more JavaScript I noticed a key difference between the two. In Flash I was able to set a Class as the base Class of the entire Flash movie, a single starting point for all behaviour. My JavaScript Classes all had their own starting point, they were all listening to the DOMContentLoaded or window load event and they would initialize themselves. To bring some order to this chaos I set out to create a single starting point for all JavaScript behaviour.

And thus, the BehaviourController was born. The BehaviourController (BC) is a JavaScript Class that in it’s most basic form listens to the `DOMContentLoaded` event, when the `DOMContentLoaded` event fires the BC collects all DOM nodes with a `data-behaviour` attribute. The value of the “data-behaviour” attribute corresponds to a JavaScript behaviour Class with the same name. For each of the DOM nodes with a set behaviour, the BC will create a new instance of the corresponding JavaScript behaviour Class, passing the node along. This looks something like this:


{% highlight javascript %}
/*
 * Clock Class
 */
var Clock = function(element) {
    
    // set element reference
    this._element = element;
    
    // start ticking
    this.tick();
};

// Update time
Clock.prototype.tick = function() {
    this._element.textContent = new Date();
    var self = this;
    this._timer = setTimeout(function(){
        self.tick();
    },1000);
};



/*
 * ClearField Class
 */
var ClearField = function(element) {
    
    // set element reference
    this._element = element;
    
    // Add clear button
    var button = document.createElement('button');
    button.textContent = 'clear';
    button.addEventListener('click',this);
    this._element.parentNode.insertBefore(button,this._element);
};

// Handle events
ClearField.prototype.handleEvent = function(e) {
    // if event type is click clear the field
    if (e.type === 'click') {
        this._element.value = '';
    }
};
{% endhighlight %}

{% highlight html %}
<!-- Clock behaviour HTML -->
<p data-behaviour="Clock">Clock is inactive</p>
 
<!-- ClearField behaviour HTML -->
<input type="text" data-behaviour="ClearField">
 
<!-- Initialize all Behaviour -->
<script>
BehaviourController.applyDefault();
</script>
{% endhighlight %}

When we run this, the BC instantiates a new Clock and a new ClearField, it is not concerned with what type of objects it’s making, it’s only concern is to find references to Classes and make instances, marvelous! View the [BehaviourController Demo](http://codepen.io/rikschennink/pen/Fsfnu) using a modern browser.

We are now able to create new Classes and link them to DOM nodes using the `data-behaviour` attribute. There is no more need to call the constructor of each class separately, there is only one starting point (the BC). JavaScript Classes are unaware of each other resulting in nice clean maintainable code.

To take this to the responsive level I introduce to you the `data-conditions` attribute, this will contain information about the conditions that need to be met for this behaviour be active (think window size, element size, wether geolocation should be available etc.). For this example we will go with window width which looks like the following: `data-conditions='{"window":{"minWidth":600}}'`. This would mean the class should only be active when the window has a minimum width of 600 pixels.

To get the above working, we need another two Classes that take care of loading and unloading(!) behaviour. We add a BehaviourLoader (BL) and a BehaviourConditions (BCS) Class. The BL is in charge of loading, unloading and instantiating the behaviour. The BCS is in charge of checking wether the current conditions (based on the `data-conditions` attribute) are suitable for the related behaviour. The loader instantiates the JavaScript Class when the conditions are suitable and unloads it when the conditions seize to be suitable (when the window is resized below the 600 pixels threshold for example). Of course the BL should not give a care about what kind of javascript class it’s loading, as long as it’s able to call the unload method. We could add the unload method to all JavaScript Classes or we could be `DRY` and create a single BehaviourBase Class from which all JavaScript Classes inherit the unload method. This class also makes sure that whenever the Behaviour is loaded a `data-initialized="true"` attribute is set to the element. Now we know when our JavaScript Class is active (and can apply different styles for example). When the unload method is called the attribute is removed and all goes back to normal.

The HTML and JavaScript would now look like the example below.


{% highlight javascript %}
/*
 * BehaviourBase Abstract Class
 */
var BehaviourBase = function(element) {
    this._element = element;
    this._element.setAttribute('data-initialized', 'true');
};
 
BehaviourBase.prototype._unload = function() {
    this._element.removeAttribute('data-initialized');
};
 
 
 
/*
 * Clock Class
 */
var Clock = function(element) {
 
    // Call BehaviourBase constructor
    BehaviourBase.call(this,element);
 
    // backup content
    this._inner = this._element.innerHTML;
 
    // start ticking
    this.tick();
};
 
// Extend from BehaviourBase
Clock.prototype = Object.create(BehaviourBase.prototype);
 
// Update time
Clock.prototype.tick = function() {
    this._element.textContent = new Date();
    var self = this;
    this._timer = setTimeout(function(){
        self.tick();
    },1000);
};
 
// Unload Clock behaviour
Clock.prototype._unload = function() {
 
    // call BehaviourBase unload method
    BehaviourBase.prototype._unload.call(this);
 
    // stop ticking
    clearTimeout(this._timer);
 
    // restore content
    this._element.innerHTML = this._inner;
};
 
 
 
/*
 * ClearField Class
 */
var ClearField = function(element) {
 
    // Call BehaviourBase constructor
    BehaviourBase.call(this,element);
 
    // Add clear button
    var button = document.createElement('button');
    button.textContent = 'clear';
    button.addEventListener('click',this);
    this._element.parentNode.insertBefore(button,this._element);
};
 
// Extend from BehaviourBase
ClearField.prototype = Object.create(BehaviourBase.prototype);
 
// Handle events
ClearField.prototype.handleEvent = function(e) {
    if (e.type === 'click') {
        this._element.value = '';
    }
};
 
// Unload ClearField behaviour
ClearField.prototype._unload = function() {
 
    // call BehaviourBase unload method
    BehaviourBase.prototype._unload.call(this);
 
    // get button reference
    var button = this._element.previousSibling;
 
    // clean events
    button.removeEventListener('click',this);
 
    // remove clear button
    this._element.parentNode.removeChild(button);
};
{% endhighlight %}

{% highlight html %}
<!-- Clock behaviour HTML -->
<p data-behaviour="Clock" data-conditions='{"window":{"minWidth":600}}'>Clock is inactive</p>
 
<!-- ClearField behaviour HTML -->
<input type="text" data-behaviour="ClearField"  data-conditions='{"window":{"maxWidth":600}}'>
​
<!-- Initialize all Behaviour -->
<script>
BehaviourController.applyDefault();
</script>
{% endhighlight %}

Be sure to resize your window a couple times when checking the [Responsive BehaviourController Demo](http://codepen.io/rikschennink/pen/ytshL). The two controls will load and unload depending on your window width so they might not be active when you open the page.

So now we have a JavaScript solution that allows us to load and unload JavaScript on the fly depending on the conditions supplied in the `data-conditions` attribute. Ideal for any web project but especially for responsive projects where you want to conditionally load scripts depending on the environment.

Any thoughts?