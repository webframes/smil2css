var autoprefixer = require("autoprefixer");
var css = require("css");



function addStylesToMain(styles, element, compress)
{
	// Beautify as much as possible without going crazy
	if (!compress && styles != "")
	{
		styles = "\n"+styles+"\n";
	}
	
	// BUG :: as of cheerio 0.13.1, it does not yet fully support CDATA (issue #274), so any previous has been replaced with simple text
	element.text(styles);
	
	// BUGFIX :: forces CDATA
	element[0].children[0].data = "<![CDATA["+element[0].children[0].data+"]]>";
	
	// no cdata
	//console.log(element[0].children[0].type);	// text
	//console.log(element[0].children[0].data);
	//console.log(element.text());
	
	// cdata
	//console.log(element[0].children[0].type);	// cdata
	//console.log(element[0].children[0].children[0].data);
	//console.log(element.text())
}



function addVendorStyles(stylesText, compress)
{
	return autoprefixer({cascade:!compress}).process(stylesText).css;
}



function createKeyframes(data)
{
	var output = "";
	
	for (var i in data)
	{
		var _data = data[i];
		
		output += "@keyframes "+i+"{";
		
		Object.keys(_data.keyframes).sort().forEach( function(time)
		{
			var properties = _data.keyframes[time];
			
			output += (time*100) + "%{";
			
			Object.keys(properties).sort().forEach( function(property)
			{
				output += property + ":" + properties[property];
			});
			
			output += "}";
		});
		
		output += "}";
	}
	
	return output;
}



function getMainStyleElement(element)
{
	var style = element.children("style");
	
	if (style.length)
	{
		// Use first <style>
		style = style.eq(0);
	}
	else
	{
		var defs = element.children("defs");
		style = defs.find("style");
		
		if (!defs.length)
		{
			defs = element.prepend("<defs/>").children("defs");
		}
		
		if (!style.length)
		{
			// Add <style> to first <defs>
			//style = defs.eq(0).append('<style type="text/css"><![CDATA[]]></style>').children("style");
			
			// BUGFIX :: cheerio cdata issue
			style = defs.eq(0).append('<style type="text/css"/>').children("style");
		}
		else
		{
			style = style.eq(0);
		}
	}
	
	return style;
}



function parseStyles(stylesText)
{
	return css.parse(stylesText);
}



function removeVendorStyles(styles)
{
	styles.stylesheet.rules.forEach( function(block, i)
	{
		// TODO What other types are there?
		if (block.type == "rule")
		{
			block.declarations = removeVendorDeclarations(block.declarations);
		}
		else if (block.type == "keyframes")
		{
			if (block.vendor)
			{
				// Remove @-vendor-keyframes{}
				styles.stylesheet.rules.splice(i, 1);
			}
			else
			{
				block.keyframes.forEach( function(keyframe)
				{
					keyframe.declarations = removeVendorDeclarations(keyframe.declarations);
				});
			}
		}
	});
	
	return styles;
}



function removeVendorDeclarations(declarations)
{
	for (var i=declarations.length-1; i>=0; i--)
	{
		if (declarations[i].property.indexOf("-") == 0)
		{
			declarations.splice(i, 1);
		}
	}
	
	return declarations;
}



function stringifyStyles(styles, compress)
{
	return css.stringify(styles, {compress:compress});
}



module.exports =
{
	addToMain: addStylesToMain,
	addVendors: addVendorStyles,
	createKeyframes: createKeyframes,
	getMain: getMainStyleElement,
	parse: parseStyles,
	removeVendors: removeVendorStyles,
	stringify: stringifyStyles
};
