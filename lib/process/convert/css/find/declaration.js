function findDeclaration(styles, tagName, property)
{
	var value;
	
	// Find tag
	styles.stylesheet.rules.forEach( function(rule)
	{
		rule.selectors.forEach( function(selector)
		{
			// Will not match pseudo-classes (a:hover) unless specified
			// TODO :: support more complex selectors (more than just global tag)
			if (selector == tagName)
			{
				rule.declarations.forEach( function(declaration)
				{
					if (declaration.property == property)
					{
						value = declaration.value;
					}
				});
			}
		});
	});
	
	return value;
}



module.exports = findDeclaration;
