---
layout: post
title: The bouncer pattern
tags:
- Tutorial
- Programming
- JavaScript
---

Nesting if statements can quickly result in a lot of indenting and difficult to comprehend code. Implementing the bouncer pattern reduces these side effects and returns your code to a more readable and maintainable state.

Imagine you’re a French super villain working on the new intranet of your volcano lair. You know your HTML, your CSS and of course, your JavaScripts. Also, you’ve got a somewhat white cat with elegant curly whiskers.

If your brain is having trouble picturing the cat, [click here to help it on its way](/media/bouncer/cat.jpg).

Anyhow, you’re sitting in your lairs most secure room petting your curly whiskered cat while listening to some german techno and you’ve just conjured up the following JavaScript function.

If the previous sentence put you out of breath, your volcano might be leaking carbon dioxide. 

Let's look at that function you conjured up.

{% highlight javascript %}
function fireZeMissiles(amount) {

    if (amount) {
        // do ze firing!
        for (var i=0; i<amount; i++) {
            console.log('firing missile numéro', i + 1);
        }
    }
    else {
        // fire a minion into ze volcano
        fireMinion();
    }
    
}
{% endhighlight %}

This of course works fine (you're a super villain, come on). But as this article is about the bouncer pattern, let's refactor this a bit so it actually implements the pattern.

{% highlight javascript %}
function fireZeMissiles(amount) {

    if (!amount) {
        // au revoir mon minion!
        fireMinion();
        return;
    }
    
    // fire ze actual missiles!
    for (var i=0; i<amount; i++) {
        console.log('firing missile numéro', i + 1);
    }
    
}
{% endhighlight %}

Ah that's better. When using the bouncer pattern we test for argument validity first and then move on to the actual function logic. When we find out an argument smells fishy we use the `return` statement to stop function execution.

You've just unlocked several advantages:

- There’s now a clear distinction between testing argument validity and firing missiles. This results in precisely zero worries about invalid variables while you’re writing your superior missile firing logic.
- Nesting is reduced which makes the function easier to read. If-else constructs will be closer together and you’ll be doing less hunting for opening and closing brackets;
- The function reads more linear. Human brains are better at parsing linear things. Next time you’ll have no trouble imagining a curly whiskered cat;

That's it. It's so simple.

Do your villain brain a favour and start bouncing today!