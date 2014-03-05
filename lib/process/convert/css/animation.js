var object  = require("./object");
var vendors = require("./vendors");



function inlineAnimation(value)
{
	// `vendors` will only accept rules
	value = "div{"+value+"}";
	
	value = vendors.add(value);
	value = object.parse(value);
	value = vendors.remove(value);
	
	var newValue = "";
	
	// Extract declarations from rule
	value.stylesheet.rules[0].declarations.forEach( function(declaration, i)
	{
		if (i > 0)
		{
			newValue += ";";
		}
		
		newValue += declaration.property + ":" + declaration.value;
	});
	
	return newValue;
}



module.exports =
{
	inline: inlineAnimation
};
