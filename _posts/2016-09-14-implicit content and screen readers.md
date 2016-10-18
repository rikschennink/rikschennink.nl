---
layout: post
title: Implicit content and screen readers
tags:
- Tutorial
- Accessibility
- Design
- Development
---
Information we read on the web appears in certain visual structures. We know a navigation is a navigation just by looking at it. What about people without sight? How would they know if they have focussed a navigation block, or if the number they are hearing is a telephone number? 

To help these users we add hidden descriptive texts to the page. We do this by creating a class named `implicit`. This class will then hide content that can be classified as implicit. Take look at the class definition below.

{% highlight css %}
.implicit {
  position: absolute;
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  white-space: nowrap;
}
{% endhighlight %}

The `width` and `height` properties are set to `1px`, a value of `0` will cause the content to not be read on some screen readers. It’s positioned `absolute` so it will not affect page flow. Combined with the other properties this will result in a box that is effectively zero &times; zero pixels big.

This is how you would use this `implicit` class in your HTML.

{% highlight html %}
<!-- navigation -->
<nav>
    <h1 class="implicit">Main Navigation</h1>
    <ul>
        <li><a href="/">Home</a>
        <li><a href="/">About</a>
        <li><a href="/">Contact</a>
    </ul>
</nav>

<!-- meta data -->
<dl>
    <dt class="implicit">Phone number</dt>
    <dd><a href="tel:012345678">012 34 56 78</a></dd>
    <dt class="implicit">E-mail address</dt>
    <dd><a href="mailto:hello@rikschennink.nl">hello@rikschennink.nl</a></dd>
</dl>
{% endhighlight %}

These [implicit elements are now hidden](http://codepen.io/rikschennink/pen/JRXjdQ) but are still read by screen readers. People using assistive technologies now have a little bit of extra context to make it easier to understand the content. 

As a bonus, this additional information will also benefit search engines.

Sources:

- [CSS hide-and-seek](http://hugogiraudel.com/2016/10/13/css-hide-and-seek/)
- [Beware smushed off-screen accessible text](https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe)
