var cheerio = require("cheerio");

var process = require("./process");

// ES6 shim
if (!Object.assign)
{
	Object.assign = require("object.assign");
}



/*
	Usage: instance=new smil2css(); instance.convert();
*/
function smil2css(options)
{
	var defaults =
	{
		compress: true,
		force: false,
		targetBrowsers: null	// use autoprefixer defaults
	};
	
	this.options = Object.assign(defaults, options || {});
}



/*
	Usage: smil2css.convert();
*/
smil2css.convert = function(svg, options)
{
	var instance = new smil2css(options);
	
	return instance.convert(svg);
}



smil2css.prototype.convert = function(svg, options)
{
	options = Object.assign({}, this.options, options || {});
	
	// As of cheerio 0.15, normalizing will cause issues with any `content:"  asdf"` styles,
	// but the chances of having such are very unlikely
	var $ = cheerio.load(svg,
	{
		normalizeWhitespace: options.compress,
		xmlMode: true
	});
	
	try
	{
		process(
		{
			options: options,
			$: $,
			$root: $(":root"),
			$currentElement: null
		});
	}
	catch (error)
	{
		if (error.smil2css)
		{
			// Safely return smil2css error
			return error;
		}
		else
		{
			// Throw any other error for debugging
			throw error;
		}
	}
	
	return $.xml();
}



module.exports = smil2css;
