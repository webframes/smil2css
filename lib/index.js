var cheerio = require("cheerio");

var convert = require("./convert");
var definitions = require("./definitions");



/*
	Usage: instance=new smil2css(); instance.convert();
*/
function smil2css(options)
{
	var defaultOptions =
	{
		compress: true
	};
	
	this.instanceOptions = this.parseOptions(options, defaultOptions);
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
	options = this.parseOptions(options, this.instanceOptions);
	
	// As of cheerio 0.13.1, normalizing will cause issues with any `content:"  asdf"` styles,
	// but the chances of that are very unlikely
	var $ = cheerio.load(svg,
	{
		normalizeWhitespace: options.compress,
		xmlMode: true
	});
	
	var root = $(":root");
	
	// Make sure it's SVG
	if (root[0] && root[0].name && root[0].name == "svg")
	{
		// Check if any animation elements exist
		if (root.find(definitions.tags.animation_joined).length)
		{
			convert($, options);
			
			return $.xml();
		}
		else if (options.compress)
		{
			return $.xml();
		}
		else
		{
			// Unaltered input string
			return svg;
		}
	}
	else
	{
		// Error on non-SVG input string
		return false;
	}
}



smil2css.prototype.parseOptions = function(custom, defaults)
{
	if (custom)
	{
		var output = {};
		
		Object.keys(defaults).forEach( function(key)
		{
			output[key] = custom[key]!==undefined ? custom[key] : defaults[key];
		});
		
		return output;
	}
	else
	{
		return defaults;
	}
}



module.exports = smil2css;
