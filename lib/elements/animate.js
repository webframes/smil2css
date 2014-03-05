var definitions = require("../definitions");



/*
	Ensure that two values match.
*/
function checkMatch(newValue, oldValue, initialValue)
{
	if (oldValue != "no match")
	{
		if (oldValue !== initialValue)
		{
			var value = (newValue==oldValue) ? oldValue : "no match";
		}
		else
		{
			// First run
			var value = newValue;
		}
		
		return value;
	}
	
	return oldValue;
}



/*
	Get animation data from elements.
*/
function getData(element, $)
{
	var data = {};
	var id_count = 0;
	
	// Parents of any animation elements
	element.find(definitions.tags.animation_joined).parent().each( function(i, parent)
	{
		var container = {};
		
		// Parent's child animation elements
		$(parent).children(definitions.tags.animation_joined).each( function(j, child)
		{
			child = $(child);
			
			var propertyData = getData_property(child);
			
			if (propertyData)
			{
				if (!container[propertyData.property])
				{
					container[propertyData.property] = new Array();
				}
				
				container[propertyData.property].push(propertyData);
				
				// Animation element no longer necessary
				child.remove();
			}
		});
		
		data["_smil" + (++id_count)] = container;
	});
	
	return data;
}



/*
	Get property data from animation element.
*/
function getData_property(element)
{
	var output = false;
	
	var property = element.attr("attributeName");
	
	// Check for frame-by-frame properties
	definitions.properties.frameByFrame.every( function(knownProperty, i)
	{
		if (knownProperty == property)
		{
			output = getData_property_frameByFrame(element);
			
			return false;
		}
		
		return true;
	});
	
	// If not frame-by-frame, it's tweened
	/*if (!output)
	{
		output = getData_property_tweened(element);
	}*/
	
	return output;
}



/*
	Get frame-by-frame property data.
*/
function getData_property_frameByFrame(element)
{
	var output =
	{
		delay:      toMilliseconds( element.attr("begin") ),
		duration:   toMilliseconds( element.attr("dur") ),
		iterations: element.attr("repeatCount"),
		keyTimes:   element.attr("keyTimes").split(";"),
		keyValues:  element.attr("values").split(";"),
		property:   element.attr("attributeName"),
		target:     element.parent()
	};
	
	
	output.iterations = (output.iterations == "indefinite") ? 0 : parseInt(output.iterations);
	
	
	for (var i=output.keyValues.length-1; i>=0; i--)
	{
		// Times should be numbers
		output.keyTimes[i] = parseFloat(output.keyTimes[i]);
		
		if (i+1 < output.keyValues.length)
		{
			var value = output.keyValues[i];
			var nextValue = output.keyValues[i+1];
			
			// Insert extra keyframe to preserve frame-by-frame effect,
			// because CSS is spec'ed to attempt animation on all properties, even those that cannot animate,
			// undesirably resulting in changes occuring immediately instead of on the next keyframe
			if (value != nextValue)
			{
				var nextTime = output.keyTimes[i+1];
				
				output.keyTimes.splice(i+1, 0, nextTime-0.0001);
				output.keyValues.splice(i+1, 0, value);
			}
		}
	}
	
	
	// Check if property needs to be converted
	for (var i in definitions.properties.conversions)
	{
		if (i == output.property)
		{
			var conversion = definitions.properties.conversions[i];
			
			// Set new property name
			output.property = conversion.newName;
			
			// Check if values need to be converted
			output.keyValues.forEach( function(value, j, array)
			{
				for (var k in conversion.values)
				{
					if (k == value)
					{
						// Set new property value
						array[j] = conversion.values[k];
						break;
					}
				}
			});
			
			break;
		}
	}
	
	
	return output;
}



/*
	Get tweened animation property data.
*/
/*function getData_property_tweened(element)
{
	
}*/



/*
	Return a simple keyframe object from collected data.
*/
function getKeyframes(element, $)
{
	var keyframes = {};
	var data = getData(element, $);
	
	for (var i in data)
	{
		var container = data[i];
		var delay = null;
		var iterations = null;
		var target = null;
		var totalDuration = 0;
		
		
		// Get iterations, target, totalDuration
		for (var j in container)
		{
			container[j].forEach( function(property)
			{
				totalDuration = Math.max(totalDuration, property.duration);
				
				if (!target)
				{
					target = property.target;
				}
				
				// Values must match
				delay      = checkMatch(property.delay,      delay,      null);
				iterations = checkMatch(property.iterations, iterations, null);
			});
		}
		
		
		var temp = {};
		
		// Merge properties into a single list of keyframes
		for (var j in container)
		{
			container[j].forEach( function(property)
			{
				property.keyTimes.forEach( function(time, k)
				{
					var selfTime     = time * property.duration;
					var relativeTime = selfTime / totalDuration;
					
					if ( !temp[relativeTime] )
					{
						temp[relativeTime] = {};
					}
					
					temp[relativeTime][j] = property.keyValues[k];
				});
			});
		}
		
		
		keyframes[i] =
		{
			delay: delay,
			duration: totalDuration,
			iterations: iterations,
			keyframes: temp,
			target: target
		};
	}
	
	return keyframes;
}



function toMilliseconds(string)
{
	if (!string) return 0;
	
	if (string.match(/s$/))  return parseFloat(string) * 1000;
	if (string.match(/ms$/)) return parseFloat(string);
	
	return parseFloat(string);
}



module.exports =
{
	getKeyframes: getKeyframes
};
