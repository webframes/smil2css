var error = require("../../../../error");
var util  = require("./util");



function parse(instance)
{
	var extendedTween = instance.$currentElement.data("extendedTween");
	var keyTimes      = instance.$currentElement.attr("keyTimes");
	
	if (keyTimes)
	{
		keyTimes = util.strings.list(keyTimes);
		
		var has0 = false;
		var has1 = false;
		
		keyTimes.forEach( function(keyTime, i)
		{
			keyTime = parseFloat(keyTime);
			
			if (keyTime == 0) has0 = true;
			if (keyTime == 1) has1 = true;
			
			keyTimes[i] = keyTime;
		});
		
		if (!has0 || !has1)
		{
			// TODO :: create test for this
			error.invalid("keyTimes must have at least values of 0 and 1", null, instance);
		}
	}
	else
	{
		if (extendedTween)
		{
			keyTimes = [0,1];
		}
		else
		{
			// Avoids producing test/keyframing/from-to/simulating-with-keyTimes.svg
			keyTimes = [0];
		}
	}
	
	instance.$currentElement.data("keyTimes", keyTimes);
}



module.exports = parse;
