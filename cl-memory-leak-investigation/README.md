# Investigation Results

## Baseline

Baseline tests where iframes were repeatedly created and then destroyed showed
that the amount of memory consumed varies depending on the site. There was also
no significant difference in this pattern when using raw JavaScript versus YUI.

This leads to the conclusion that:
1. YUI does not play a part in the memory leak
1. A memory leak should be identified by a lack of an upper bound in the
maximum memory that is consumed by the browser after repeated cycles.

## Simple Handshake

In this demo, both parent and child load the cl module and complete a
handshake. When the child signals readiness via the `ready` method, the parent
destroys the child's iframe.

### Results

There is clearly a memory leak due to a lack of an upper bound as the memory
used shot up to 450MB with no indication of leveling off.

## Random Notes

### Persisting Windows

If we don't detach the window message handler in the child, its window
persists and continues receiving messages from the parent. This is
surprising as it was assumed that a new window reference is created for
each new iframe even if the same `src` is used.

### Controlling the Leak

As it stands today, the only way to stop the memory leak is to detach
the window message handler in the child, and destroying the cl instance
for each cycle (see http://jsfiddle.net/BsfnC/4/).

* http://jsfiddle.net/BsfnC/5/ illustrates the fact that only destroying the cl instance does not work. Log statements also show a linear increase in the number of windows responding to a single event fired by the parent.
