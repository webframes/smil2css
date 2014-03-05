var autoprefixer = require("autoprefixer");



function addVendorStyles(stylesText, instance)
{
	var prefixerInstance;
	
	if (instance && instance.options.targetBrowsers)
	{
		prefixerInstance = autoprefixer.apply(null, instance.options.targetBrowsers);
	}
	else
	{
		prefixerInstance = autoprefixer();
	}
	
	return prefixerInstance.process(stylesText).css;
}



function removeVendorStyles(styles)
{
	removeVendorStyles2(styles.stylesheet.rules);
	
	return styles;
}



function removeVendorStyles2(rules)
{
	rules.forEach( function(rule, i)
	{
		// TODO :: what other types are there?
		switch (rule)
		{
			case "rule":
			{
				removeVendorDeclarations(rule.declarations);
				break;
			}
			case "keyframes":
			{
				if (rule.vendor)
				{
					// Remove @-vendor-keyframes{}
					rules.splice(i, 1);
				}
				else
				{
					rule.keyframes.forEach( function(keyframe)
					{
						removeVendorDeclarations(keyframe.declarations);
					});
				}
				
				break;
			}
			case "media":
			{
				removeVendorStyles2(rule.rules);
				break;
			}
		}
	});
}



function removeVendorDeclarations(declarations)
{
	declarations.forEach( function(declaration, i)
	{
		if (declaration.property.indexOf("-") == 0)
		{
			declarations.splice(i, 1);
		}
	});
}



module.exports =
{
	add: addVendorStyles,
	remove: removeVendorStyles
};
