# Flickity counter

_Enable slide counter for Flickity

## Install

Add `counter.css` to your stylesheets and `counter.js` to your scripts.

## Usage

Enable counter by setting `counter: true` in Flickity options.

``` js
// jQuery
var $carousel = $('.carousel').flickity({
  counter: true,
});
```

``` js
// vanilla JS
var flkty = $('.carousel').flickity({
  counter: true,
});
```

``` html
<!-- HTML -->
<div class="carousel" data-flickity='{ "counter": true }'>
  ...
</div>
```
---

Based on [Flickity Fullscreen](https://github.com/metafizzy/flickity-fullscreen) from [David DeSandro](https://github.com/desandro)
