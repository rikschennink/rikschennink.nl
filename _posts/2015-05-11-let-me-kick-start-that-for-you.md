---
layout: post
title: Let me kickstart that for you
tags:
- Opinion
- Programming
- JavaScript
---

If you’re building and publishing JavaScript UI modules, like for example a Datepicker, Slider or fabulous Autocomplete, pull out your kick-start logic! The developer should have control on how and when the functionality loads not the module itself.

UI modules found on the web often feature polyfill or kick-start functionality out of the box.

Advertised as:

"Add script tag, put class on element, auto loads!"

Or:

"Set boolean to automatically polyfill feature!"

This is wonderful, it makes these scripts very easy to use. But at the same time it makes them less portable. What if I want to manually use the exposed functionality? I don’t want the script to eat CPU cycles by querying the DOM for non existing classNames. “Just remove the auto load!” you might say, but modifying the script prevents me from updating to a newer version without having to modify it again. When you think about it, is it really a Datepickers’ responsibility to load its own instances?

Let me handle instantiation.

You can still expose this functionality. Just, when you do, don't do it in your core module. Create separate files for each load type. Still easy to use, saves CPU cycles on load and results in a smaller file size for developers not using the kick-start or polyfill.

Expose Datepicker functionality.

{% highlight javascript %}
// datepicker.js
var Datepicker = (function(undefined){

    var exports = function Datepicker(element) {
        // Datepicker constructor
    };

    return exports;

}());
{% endhighlight %}

The kick-start references the DatePicker and automatically loads it on DOMContentLoaded.
{% highlight javascript %}
// datepicker.kick-start.js
(function(Datepicker,undefined){

    document.addEventListener('DOMContentLoaded',function(){

        var elements = document.getElementsByClassName('datepicker');
        var i = 0;
        var l = elements.length;

        for(;i<l;i++) {
            new Datepicker(elements[i]);
        }

    });

}(Datepicker));
{% endhighlight %}

The polyfill version is almost the same as the kick-start but does some additional feature testing to see if the native date input type is supported.
{% highlight javascript %}
// datepicker.polyfill.js
(function(Datepicker,undefined){

    // test if native datepicker supported, if it is, stop here
    var invalidDate = 'not-a-date';
    var input = document.createElement('input');
    input.setAttribute('type','date');
    input.setAttribute('value',invalidDate);
    if (input.value !== invalidDate) {
        return;
    }

    // load the date pickers!
    document.addEventListener('DOMContentLoaded',function(){

        var elements = document.querySelectorAll('input[type=date]');
        var i = 0;
        var l = elements.length;

        for(;i<l;i++) {
            new Datepicker(elements[i]);
        }

    });

}(Datepicker));
{% endhighlight %}

For an actual module the [UMD pattern](https://github.com/umdjs/umd) is probably a better way to go. You could refactor the kick-start logic and reuse it in the polyfill setup. On top of this the kick-start could expose a manager object which exposes an API to handle automatically loaded modules. All functionality unrelated to the actual module but useful none the less.

With these adaptations in place, we've achieved a better [separation of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns). I'm now free to use your module without the kick-start logic or embed the whole system if I just want to be up and running quickly.