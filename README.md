# smil2css [![NPM Version](http://badge.fury.io/js/smil2css.png)](http://badge.fury.io/js/smil2css) [![Build Status](https://secure.travis-ci.org/stevenvachon/smil2css.png)](http://travis-ci.org/stevenvachon/smil2css) [![Dependency Status](https://david-dm.org/stevenvachon/smil2css.png)](https://david-dm.org/stevenvachon/smil2css)

> SVG animation supporting IE10+ and \<noscript>.

Unfortunately, Internet Explorer does not support SVG animation (SMIL). Other solutions like [FakeSmile](http://leunen.me/fakesmile/) use JavaScript to recreate the animation. Not only does this close doors to users with JavaScript disabled, it requires an extra download and performs slower than CSS animations. This utility converts SMIL to CSS and works in any Internet Explorer version that supports CSS' `animation` (IE10+).

*Note:* Currently, only frame-by-frame animations are converted. [read more](#roadmap-features)

## Getting Started

This plugin requires [NodeJS](http://nodejs.org/) `~0.10`. There're two ways to use it:

### Command-Line Usage  
To install, type this at the command line:
```
npm install smil2css -g
```
After that, check out the help for available options:
```
smil2css -?
```

### Programmatic API
To install, type this at the command line:
```
npm install smil2css --save-dev
```
After that, it can be used as a [function for single-use](#single-instance) or as a [class for multiple conversions](#reusable-instances).

Upon successful conversion, a `String` will be returned. If an issue is encountered, `false` will be returned.

#### Single Instance
```javascript
var result = smil2css.convert(svgString, options);

if (result)
{
	console.log("success");
}
```

#### Reusable Instances
```javascript
var smil2css = require("smil2css");

var instance = new smil2css(options);

var result1 = instance.convert(svgString1);
var result2 = instance.convert(svgString2, customOptions);
var result3 = instance.convert(svgString3);
```

## Roadmap Features

* More animation attributes than just `display`,`visibility`
* Convert `from` and `to` to `keyTimes`
* Nested `<svg>` elements
* and some possibly impossible features:
  * ~~`<animatecolor>`~~,`<animatemotion>`,`<animatetransform>`,`<mpath>`,`<set>` elements
  * Unmatching `begin` attribute values among sibling animation elements
  * Unmatching `repeatCount` attribute values among sibling animation elements

## Release History
* 0.1.0 initial release

---

[![Analytics](https://ga-beacon.appspot.com/UA-3614308-10/stevenvachon/smil2css)](https://github.com/igrigorik/ga-beacon "Google Analytics") [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/stevenvachon/smil2css/trend.png)](https://bitdeli.com/free "Bitdeli Badge")