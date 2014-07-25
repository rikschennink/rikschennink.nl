---
layout: post
title: Alien Invasion Reflow Minimization
tags: 
- CSS
- JavaScript
- Performance
---
To have your web apps performing at peak level you need to keep an eye on browser reflow. Reflow is the process of recalculating the positions and sizes of your DOM elements. Trying to get to that 60fps page? Keep your reflows to a minimum.

Your browser 'reflows' the page every time the DOM changes or a node is altered. Depending on the position and properties of the DOM node it needs to reflow the entire DOM tree or just a section of it. Calculating this information is a process that takes a considerable amount of time ([see it in action here and you’ll know why](http://www.youtube.com/watch?v=dndeRnzkJDU)). Minimizing reflow time will make your web app feel more responsive, resulting in happy times for you and for your users.

It’s now clear that changing (layout related) properties on nodes causes a reflow, what’s also interesting is the fact that requesting certain properties also causes one. For instance, requesting offsetLeft causes a reflow because before returning you the offset the browser needs to know for sure it is giving you the correct value.

To keep things running smooth, only change layout properties when you have to, and when you have to, try to do all the needed changes at the same time.

Below are some suggestions on how to do this.

## Applying styles

If you are applying styles to a node use the cssText property, cssText allows you to add a group of styles in one go.

Three reflows
{% highlight javascript %}
node.style.left = '10px';
node.style.top = '10px';
node.style.width = '200px';
{% endhighlight %}

One reflow
{% highlight javascript %}
node.style.cssText = 'left:10px; top:10px; width:200px;';
{% endhighlight %}

## Creating DOM nodes

If you are creating a new node, apply all your mutations first before appending it to the DOM. If you do it the other way around each layout related mutation will cause a reflow. As long as nodes are detached from the DOM you can manipulate them without causing a reflow.

## Updating DOM nodes

If the node already exists, remove the node from the DOM, do your mutations, and attach it again. This would cause two reflows (one when you remove the node and one when you add it again). If you’re only going to change one or two properties this is obviously not the way to go.

A better way of doing mutations to an existing node, as inspired by [Invasion of the Body Snatchers](http://www.imdb.com/title/tt0077745/), is to clone the node (make a deep copy using [cloneNode](https://developer.mozilla.org/en-US/docs/DOM/Node.cloneNode)) and do your adjustments on the clone. When your done adjusting the clone (take your time, no rush), replace the original with the clone (using [replaceChild](https://developer.mozilla.org/en-US/docs/DOM/Node.replaceChild)). This method has two advantages, the location of the node is not lost (as can be the case with the removal method) and it only causes one reflow.