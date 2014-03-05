var definitions = require("../../../../../definitions");
var error       = require("../../../../../error");



function isAnimationElement(id, $callerElement, instance)
{
	var $element = instance.$("#"+id);
	
	if ($element.length)
	{
		if ($element.length==1)
		{
			var tag = $element.get(0).name;
			var is = false;
			
			definitions.tags.supported.all.every( function(supportedTag)
			{
				is = supportedTag==tag;
				
				return !is;
			});
			
			if (!is)
			{
				// See test/erroneous/syncbase-deadend2.svg
				error.invalid('Animation element was expected at id "'+id+'"', null, instance, $element);
			}
		}
		else
		{
			// See test/erroneous/syncbase-duplicates.svg
			error.invalid('More than one element with id "'+id+'" found', null, instance, $callerElement);
		}
	}
	else
	{
		// See test/erroneous/syncbase-deadend1.svg
		error.invalid('Element with id "'+id+'" not found', null, instance, $callerElement);
	}
	
	return $element;
}



function list(clockCount, syncbaseCount, loopDetected, index, length, $animationElement, instance)
{
	// TODO :: figure out endless traverse loop in test/keyframing/begin-syncbase.end/looping-trailing.svg
	// TODO :: figure out endless traverse loop in test/keyframing/begin-syncbase.end/looping-trailing-with-delay.svg
	
	if (loopDetected)
	{
		if (clockCount>1 && syncbaseCount>0)
		{
			// Avoids catching test/keyframing/begin-syncbase.end/not-looping4.svg
			// Avoids catching test/keyframing/begin-syncbase.end/not-looping5.svg
			
			// See test/erroneous/syncbase-weaving1.svg
			// See test/erroneous/syncbase-weaving2.svg
			// See test/erroneous/syncbase-weaving5.svg
			// See test/erroneous/syncbase-weaving6.svg
			error.incompatible("Irregular syncbase loop", "https://github.com/stevenvachon/smil2css/wiki/#example", instance, $animationElement);
		}
		
		if (index < length-1)
		{
			// Avoids catching test/keyframing/begin-syncbase.end/not-looping6.svg
			
			// See test/erroneous/syncbase-weaving3.svg
			// See test/erroneous/syncbase-weaving4.svg
			error.incompatible("Irregular syncbase loop", "https://github.com/stevenvachon/smil2css/wiki/#example", instance, $animationElement);
		}
	}
}



function preDelay(preDelay, instance)
{
	if (preDelay > 0)
	{
		// See test/special/css-delay/looping-multiple.svg
		error.warning("CSS animation delays produced", "https://github.com/stevenvachon/smil2css/wiki/CSS-animation-delays", instance);
	}
}



module.exports =
{
	isAnimationElement: isAnimationElement,
	list: list,
	preDelay: preDelay
};
