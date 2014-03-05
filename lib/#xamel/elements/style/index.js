var autoprefixer = require("autoprefixer");
var css = require("css");



function createMain(xml, compress)
{
	// find a root style to use, or create one
	
	var svg = xml.find("svg");
	var globalStyle = svg.find("defs/style");
	
	//console.log( globalStyle, xml.find("svg/defs/style") );
	
	if (globalStyle.children.length)
	{
		var styles = xml.find("svg/defs/style/cdata()").children[0].rawData[0];
		             xml.find("svg/defs/style/cdata()").children[0].rawData[0] = modifyStyles(styles, compress);
	}
}



function modifyStyles(styles, compress)
{
	styles = css.parse(styles);
	styles = removeVendorStyles(styles);
	styles = css.stringify(styles, {compress:compress});
	styles = autoprefixer.process(styles).css;
	
	// Beautify as much as possible without going crazy
	if (!compress && styles != "")
	{
		styles = "\n"+styles+"\n";
	}
	
	return styles;
}



function removeVendorStyles(styles)
{
	styles.stylesheet.rules.forEach( function(block)
	{
		// TODO What else is there?
		if (block.type == "rule")
		{
			for (var j=block.declarations.length-1; j>=0; j--)
			{
				var style = block.declarations[j];
				
				// TODO What else is there?
				if (style.type == "declaration")
				{
					if (style.property.indexOf("-") == 0)
					{
						block.declarations.splice(j, 1);
					}
				}
			}
		}
	});
	
	return styles;
}



module.exports =
{
	createMain: createMain,
	modify: modifyStyles
};
