var definitions = require("../../../../../definitions");



function parse(instance)
{
	var attributeName   = instance.$currentElement.data("attributeName");
	var extendedInitial = instance.$currentElement.data("extendedInitial");
	var values          = instance.$currentElement.data("values");
	
	// Check if property needs to be converted
	for (var i in definitions.properties.conversions)
	{
		if (i == attributeName)
		{
			var conversion = definitions.properties.conversions[i];
			
			// Check if values need to be converted
			values.forEach( function(value, j)
			{
				for (var k in conversion.values)
				{
					if (k == value)
					{
						// Set new property value
						values[j] = conversion.values[k];
						break;
					}
				}
			});
			
			// Check if extendedInitial needs to be converted
			for (var j in conversion.values)
			{
				if (j == extendedInitial)
				{
					// Set new property value
					extendedInitial = conversion.values[j];
					break;
				}
			}
			
			// Apply changes
			instance.$currentElement.data("attributeName", conversion.newName);
			instance.$currentElement.data("extendedInitial", extendedInitial);
			instance.$currentElement.data("values", values);
			
			break;
		}
	}
}



module.exports = parse;