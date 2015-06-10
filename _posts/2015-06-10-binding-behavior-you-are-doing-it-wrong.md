---
layout: post
title: Binding behavior, you’re doing it wrong
tags:
- Tutorial
- JavaScript
- Programming
---
As a fellow web dev you’re probably separating your HTML and JavaScript layers following [the holy peanut strategy we all love](https://twitter.com/rikschennink/status/489317032337616896). This separation is classically done based on CSS classes. In this article I’ll compare this classic bind-on-class-name method with the a new and improved bind-on-data-attribute method.

Let’s take a look at the classic class name example.

{% highlight html %}
<div class="js-foo"> … </div>

<div class="js-bar"> … </div>

<div class="js-baz"> … </div>

<script src="Foo.js"></script>
<script src="Bar.js"></script>
<script src="Baz.js"></script>
{% endhighlight %}

The Foo, Bar and Baz files all register their JavaScript classes with the same name on the global scope. So for “Foo.js” this would be `window.Foo`.

Alright, let’s look at the initialisation logic.

{% highlight javascript %}
// load foos
var nodes = document.getElementsByClassname('js-foo');
var l = nodes.length;
for (var i=0; i<l; i++) {
    new Foo(nodes[i]);
}

// load bars
nodes = document.getElementsByClassname('js-bar');
l = nodes.length;
for (i=0; i<l; i++) {
    new Bar(nodes[i]);
}

// load bazzes
nodes = document.getElementsByClassname('js-baz');
l = nodes.length;
for (i=0; i<l; i++) {
    new Baz(nodes[i]);
}
{% endhighlight %}

In the example, we’re binding our JavaScript using CSS classes. By prefixing those with `js-` we’re making clear to other developers that these classes are JavaScript related. 

Our initialisation script queries the DOM for each available class name. The elements in the returned nodelists are then used to initialise the various JavaScript modules. 

Works fine right? Well, it does, but, using the above setup, your logic needs to know the names of each CSS class and each and everyone of the JavaScript modules.

Let’s give this a shot using data attributes and look at the differences.

{% highlight html %}
<div data-module="Foo"> … </div>

<div data-module="Bar"> … </div>

<div data-module="Baz"> … </div>

<script src="Foo.js"></script>
<script src="Bar.js"></script>
<script src="Baz.js"></script>
{% endhighlight %}

{% highlight javascript %}
var nodes = document.querySelectorAll('[data-module]');
var l = nodes.length;
var node;
for (var i=0; i<l; i++) {
    node = nodes[i];
    new window[node.getAttribute('data-module')](node);
}
{% endhighlight %}

We fetch all nodes matching the `data-module` attribute. While looping over the nodes we get the name of the module from the attribute itself and then reference it on the global scope. Done. Single loop.

While our classic `getElementsByClassName` method performs better than the `querySelectorAll` method the later unlocks advantages that outweigh the slight performance difference.

- Your JavaScript does not know about the specific modules it might have to load, it gets the names from the HTML itself. Also, there’s no class names, your JavaScript only has to check for the `data-module` attribute, that’s it.
- Looking at the HTML it’s crystal clear which part of the DOM is or will be enhanced with JavaScript functionality. It will always be in the form of a `data-module` attribute.
- Because the modules are loaded in a single loop the order in which the modules load is out of your control. Meaning you’ll have to improve your code to better test if everything is ready for the module to load.
- Once you’ve got this setup, you never have to touch it again, with the classic class name version you have to keep adding loops for each new functionality.
- You can easily take this to the next level by defining modules using [UMD](https://github.com/umdjs/umd). This way you can load your module async using a module loader with the advantage that you’ll no longer have to embed the `<script>` tag manually. Total separation.

The above is a stepping stone. Because of a better separation of concerns you’ll force yourself to think more modular. This results in cleaner, more reusable and maintainable code.

Give data attributes a go, you’ll never look back!