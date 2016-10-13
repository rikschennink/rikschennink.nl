---
layout: post
title: List or no list, that's the question.
tags:
- Resource
- HTML
- Frontend
---
When to mark up information as a list? It seems such an easy task. But if you've been at it for a while your brain tries to trick you into thinking everything is a list. This handy guide will help you to decide if information should be marked up as a list, and if so, if that list is unordered or ordered.

Information can be marked up as a list if it’s a set of similar items. Say search results or navigation items. Sometimes when turning visuals into HTML you might notice everything is starting to feel like a list. When that happens, ask yourself:

*“Should a screenreader announce the number of items?”*

If so, the information you're looking at is definitely a list.

Another, more visually oriented way, would be to ask yourself if it would be weird if the items in the list would be preceded by bullets or numbers (an excellent tip by [@stommepoes](https://twitter.com/stommepoes/status/773123776120811521)). If it's not weird, we found a list!


## Ordered or Unordered

Alright, that's settled, we’re using a list.

Next question, what kind of list should we use. Quickest approach is to determine if it could be an `<ol>` and if not, you’re left with the `<ul>` as the answer.

The [w3 specification](https://www.w3.org/TR/html-markup/ol.html) has this to say about ordered lists:

> A list in which the items are intentionally ordered, such that changing the order would change the meaning of the list.

If changing the order of the list makes the list lose any meaningful data then it should be marked up as an ordered list. 

For instance the following lists should be formatted as an `<ol>`

- Search results (assuming they’re returned by relevance). Shuffle the list items and suddenly you can no longer determine the relevance of each item.
- Comments on an article. Shuffling the comments causes comments referencing earlier comments lose some meaning.
- IKEA furniture instructions.


If a list does not lose information when shuffling the items it's safe to go with the `<ul>`

So there you go, now you know how to determine if something is a list or not. If you've got any handy tips on determining types of information, share below.