var error = require("../../../../../error");



function parse($animationElements, instance)
{
	var previousDuration = null;
	var previousPreDelay = null;
	var previousRepeatCount = null;
	
	$animationElements.each( function(i)
	{
		instance.$currentElement = instance.$(this);
		
		var dur                 = instance.$currentElement.data("dur");
		var extendedRepeatCount = instance.$currentElement.data("extendedRepeatCount");
		var preDelay            = instance.$currentElement.data("extendedBegin").preDelay;
		
		if (i > 0)
		{
			// TODO :: create test for non-looping cases that this avoids
			if (extendedRepeatCount == 0)
			{
				// TODO :: create test for this that breaks
				validate(dur, previousDuration, instance);
			}
			
			// TODO :: create test for this that breaks
			validate(preDelay, previousPreDelay, instance);
			
			// TODO :: create test for this that breaks
			validate(extendedRepeatCount, previousRepeatCount, instance);
		}
		
		previousDuration    = dur;
		previousPreDelay    = preDelay;
		previousRepeatCount = extendedRepeatCount;
	});
}



function validate(a, b, instance)
{
	if (a != b)
	{
		// TODO :: create test for this (preferably with a tweened animation)
		error.incompatible("Independent looping per element", "https://github.com/stevenvachon/smil2css/wiki/Independent-property-looping-per-element", instance);
	}
}



module.exports = parse;
