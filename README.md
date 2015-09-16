# smil2css [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][david-image]][david-url]

> SVG animation supporting IE10+ and \<noscript>.

Unfortunately, Internet Explorer does not support SVG animation (SMIL). Other solutions like [FakeSmile](http://leunen.me/fakesmile/) use JavaScript to recreate the animation. Not only does this close doors to users with JavaScript disabled, it requires an extra download and performs slower than CSS animations. This utility converts SMIL to CSS and works in any Internet Explorer version that supports CSS' `animation` (IE10+).

*Note:* Currently, only frame-by-frame animations are converted. [read more](https://github.com/webframes/smil2css/wiki/Roadmap-Features)

*Note:* CSS is not compatible with some SMIL features. [read more](https://github.com/webframes/smil2css/wiki/Limitations)

Check out the [examples](http://webframes.github.io/smil2css/).

## Getting Started

This utility requires [Node.js](http://nodejs.org/) `>= 0.10`. There're two ways to use it:

### Command-Line Usage  
To install, type this at the command line:
```
npm install smil2css -g
```
After that, check out `smil2css -?` for available options. Typical usage might look like:
```
smil2css input.svg output.svg -c
```

### Programmatic API
To install, type this at the command line:
```
npm install smil2css --save-dev
```
After that, it can be used as a [function for single-use](#single-instance) or as a [class for multiple conversions](#reusable-instances).

Upon successful conversion, a `String` will be returned. If a known issue is encountered, an `Error` will be returned (not thrown).

#### Single Instance
```javascript
var result = require("smil2css").convert(svgString, options);

if (result instanceof Error)
{
	console.log(result.message);
	
	// Additional information
	console.log(result.smil2css.element);
	console.log(result.smil2css.type);
	console.log(result.smil2css.wiki);
}
else
{
	console.log("success!");
}
```

#### Reusable Instances
```javascript
var smil2css = require("smil2css");

var instance = new smil2css(options);

var result1 = instance.convert(svgString1);
var result2 = instance.convert(svgString2, customOptions);
var result3 = instance.convert(svgString3);

// Checking for errors is the same as in the above example
```


## Status
Full feature list: [here](https://github.com/webframes/smil2css/wiki/Current-Status)


## Release History
* 0.2.0
  * support `begin` syncbase time values
  * convert `from`,`to` to `values`
  * better error reporting
  * support files previously processed with smil2css
  * removed task runner
* 0.1.0 initial release


[npm-image]: https://img.shields.io/npm/v/smil2css.svg
[npm-url]: https://npmjs.org/package/smil2css
[travis-image]: https://img.shields.io/travis/webframes/smil2css.svg
[travis-url]: https://travis-ci.org/webframes/smil2css
[david-image]: https://img.shields.io/david/webframes/smil2css.svg
[david-url]: https://david-dm.org/webframes/smil2css
