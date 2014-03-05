var Decimal = require("decimal.js");

var keyframing = require("./keyframing");



function addMidDelays(i, beginKey, dur, extendedBegin, extendedDur, extendedInitial, extendedKeys, extendedTween, instance, perFrameStep, resolution)
{
	// TODO :: check if not fill="freeze"
	if (i > 0)
	{
		var prevAfterDur = extendedBegin.sequence[i-1].begin + dur;
		var prevValue = extendedKeys[extendedKeys.length-1].value;
		
		if (prevAfterDur > beginKey.begin && extendedTween)
		{
			error.incompatible("Interrupted animation", "https://github.com/stevenvachon/smil2css/wiki/Interrupted-animations", instance);
		}
		
		if (prevAfterDur < beginKey.begin)
		{
			prevAfterDur = keyframing.relate(prevAfterDur, extendedDur, resolution);
			var current  = keyframing.relate(beginKey.begin, extendedDur, resolution);
			
			// See test/keyframing/begin-syncbase.end/not-looping2.svg
			// See test/keyframing/begin-syncbase.end/not-looping3.svg
			// See test/keyframing/begin-syncbase.end/not-looping4.svg
			// See test/keyframing/begin-syncbase.end/not-looping5.svg
			// See test/keyframing/begin-syncbase.end/not-looping6.svg
			keyframing.preserveBefore(prevAfterDur, prevValue, false, extendedKeys, perFrameStep, resolution);
			keyframing.at(prevAfterDur, extendedInitial, true, extendedKeys, perFrameStep, resolution);
			keyframing.preserveBefore(current, extendedInitial, true, extendedKeys, perFrameStep, resolution);
		}
	}
}



function addPostDelay(dur, extendedBegin, extendedDur, extendedInitial, extendedKeys, extendedTween, perFrameStep, resolution)
{
	// Related to sibling animations
	var postDelay = extendedDur - extendedBegin.duration + extendedBegin.postDelay;
	
	if (postDelay > 0)
	{
		var lastKey = extendedKeys[extendedKeys.length-1];
		var postDelayStart = lastKey.time;
		
		if (!extendedTween)
		{
			var lastKeyDuration = new Decimal(dur).dividedBy(extendedDur);
			
			postDelayStart = lastKeyDuration.plus(lastKey.time);
		}
		
		// Clean up any repeating decimals
		postDelayStart = keyframing.resolute(postDelayStart, resolution);
		
		if (!extendedTween)
		{
			keyframing.preserveAt(postDelayStart, lastKey.value, false, extendedKeys, perFrameStep, resolution);
		}
		
		keyframing.after(postDelayStart, extendedInitial, true, extendedKeys, perFrameStep, resolution);
	}
}



function addPreDelay(dur, extendedBegin, extendedDur, extendedInitial, extendedKeys, keyTimes, perFrameStep, resolution)
{
	var firstBeginKey = extendedBegin.sequence[0];
	
	if (firstBeginKey.begin > 0)
	{
		keyframing.at(0, extendedInitial, true, extendedKeys);
		
		// keyTimes[0] can be 1 (for discrete animations)
		var firstKeyTime = relateKeyTime(keyTimes[0], firstBeginKey.begin, dur, extendedDur, resolution);
		
		keyframing.preserveBefore(firstKeyTime, extendedInitial, true, extendedKeys, perFrameStep, resolution);
	}
}



function addSubKeys(beginKey, dur, extendedDur, extendedKeys, extendedTween, keyTimes, perFrameStep, repeatCount, resolution, values)
{
	// Avoid indefinite loops
	repeatCount = Math.max(1, repeatCount);
	
	for (var i=0; i<repeatCount; i++)
	{
		var iterationStart = beginKey.begin + dur*i;
		
		keyTimes.forEach( function(keyTime, j)
		{
			var time = relateKeyTime(keyTime, iterationStart, dur, extendedDur, resolution);
			
			// Previous keyTime
			if (j>0 && !extendedTween)
			{
				// Avoid a pointless frame
				if (values[j-1] != values[j])
				{
					keyframing.preserveBefore(time, values[j-1], false, extendedKeys, perFrameStep, resolution);
				}
			}
			
			// Current keyTime
			keyframing.at(time, values[j], false, extendedKeys);
		});
	}
}



function parse($animationElements, instance)
{
	$animationElements.each( function()
	{
		instance.$currentElement = instance.$(this);
		
		var dur             = instance.$currentElement.data("dur");
		var extendedBegin   = instance.$currentElement.data("extendedBegin");
		var extendedDur     = instance.$currentElement.data("extendedDur");
		var extendedInitial = instance.$currentElement.data("extendedInitial");
		var extendedTween   = instance.$currentElement.data("extendedTween");
		var keyTimes        = instance.$currentElement.data("keyTimes");
		var repeatCount     = instance.$currentElement.data("repeatCount");
		var values          = instance.$currentElement.data("values");
		
		var extendedKeys = [];
		var perFrameStep = keyframing.step(instance.$currentElement);
		var resolution   = keyframing.resolution(instance.$currentElement);
		
		if (extendedBegin.sequence.length)
		{
			addPreDelay(dur, extendedBegin, extendedDur, extendedInitial, extendedKeys, keyTimes, perFrameStep, resolution);
			
			extendedBegin.sequence.forEach( function(beginKey, i)
			{
				// Previous beginKey
				addMidDelays(i, beginKey, dur, extendedBegin, extendedDur, extendedInitial, extendedKeys, extendedTween, instance, perFrameStep, resolution);
				
				// Actual animation keyframes
				addSubKeys(beginKey, dur, extendedDur, extendedKeys, extendedTween, keyTimes, perFrameStep, repeatCount, resolution, values);
			});
			
			addPostDelay(dur, extendedBegin, extendedDur, extendedInitial, extendedKeys, extendedTween, perFrameStep, resolution);
			
			//console.log(extendedBegin)
			//console.log(extendedKeys)
			
			// TODO :: optimize keys by removing unnecessary frames (with identical values)? looping3_expect.svg is perfect
			
			// Convert from array to object
			extendedKeys = reformat(extendedKeys);
		}
		
		instance.$currentElement.data("extendedKeys", extendedKeys);
	});
}



function reformat(keys)
{
	var newKeys = {};
	
	keys.forEach( function(key)
	{
		newKeys[key.time] = key.value;
	});
	
	return newKeys;
}



function relateKeyTime(keyTime, begin, dur, extendedDur, resolution)
{
	// Relative to animation sequence in milliseconds
	var time = new Decimal(keyTime).times(dur).plus(begin);
	
	// Relative to sibling animations as a decimal percent (ready for CSS stringify)
	time = keyframing.relate(time, extendedDur, resolution);
	
	return time;
}



module.exports = parse;
