var definitions = require("../../../../definitions");
var error       = require("../../../../error");



function parse(instance)
{
	var attributeName = instance.$currentElement.attr("attributeName");
	
	validate(attributeName, instance);
	
	instance.$currentElement.data("attributeName", attributeName);
}



function validate(property, instance)
{
	if (property)
	{
		var supported = false;
		
		definitions.properties.supported.all.every( function(supportedProperty)
		{
			supported = property==supportedProperty;
			
			return !supported;
		});
		
		// TODO :: possibly remove in v0.3
		if (!supported)
		{
			error.incompatible
			(
				property+" is not currently a supported attributeName value",
				"https://github.com/stevenvachon/smil2css/wiki/Current-Status#animation-attributes",
				instance
			);
		}
	}
	else
	{
		error.invalid("attributeName must be defined", null, instance);
	}
}



module.exports = parse;
