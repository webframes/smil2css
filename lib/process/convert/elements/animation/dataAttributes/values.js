var error = require("../../../../error");
var util  = require("./util");



function parse(instance)
{
	var extendedTween = instance.$currentElement.data("extendedTween");
	var keyTimes      = instance.$currentElement.data("keyTimes");
	var values        = instance.$currentElement.attr("values");
	var from,to;
	
	if (values)
	{
		values = util.strings.list(values);
		
		if (values.length == 1)
		{
			// Avoids producing test/keyframing/from-to/simulating-with-keyTimes.svg
			if (extendedTween)
			{
				to = values[0];
				values = null;
			}
		}
	}
	
	if (values==undefined)
	{
		from = instance.$currentElement.attr("from");
		
		if (to==undefined)
		{
			to = instance.$currentElement.attr("to");
		}
		
		if (from==undefined)
		{
			//if ( instance.$currentElement.data("extendedTween") )
			//{
				from = instance.$currentElement.data("extendedInitial");
			/*}
			else
			{
				// Reversed order so that changed value is only visible during its duration
				// then returns to initial when complete
				from = to;
				to = instance.$currentElement.data("extendedInitial");
			}*/
		}
		
		if (from==undefined || to==undefined)
		{
			error.invalid("Could not determine values for animation", null, instance);
		}
		
		values = [from,to];
	}
	
	if (values.length != keyTimes.length)
	{
		error.invalid("List lengths of keyTimes and values do not match", null, instance);
	}
	
	instance.$currentElement.data("values", values);
}



module.exports = parse;
