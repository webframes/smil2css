var post     = require("./post");
var validate = require("./validate");



function parse(instance)
{
	var data =
	{
		clockCount: 0,
		duration: 0,
		sequence: []
	};
	
	var syncbaseLoop = traverse(data, 0, instance.$currentElement, instance.$currentElement, instance, true, true);
	
	var duration=0, preDelay=0, postDelay=0;
	
	if (data.sequence.length)
	{
		// Sort by start time
		// See test/keyframing/begin-syncbase.end/not-looping3.svg
		post.sort(data);
		
		var definedLoop = !instance.$currentElement.data("repeatCount");
		
		// Extract delay from sequence
		if (definedLoop || syncbaseLoop)
		{
			preDelay = post.delay(data, definedLoop);
		}
		
		// See test/special/css-delay/repeatCount-loop-with-syncbases.svg
		if (!definedLoop)
		{
			var lastIteration = data.sequence[data.sequence.length-1];
			postDelay = data.duration - lastIteration.begin - lastIteration.element.data("repeatDur");
		}
		
		validate.preDelay(preDelay, instance);
	}
	else
	{
		// See test/special/css-delay/repeatCount-loop-with-syncbases.svg
		data.duration = 0;
	}
	
	instance.$currentElement.data("extendedBegin",
	{
		duration: data.duration - preDelay,
		postDelay: postDelay,
		preDelay: preDelay,
		sequence: data.sequence,
		syncbaseLoop: syncbaseLoop
	});
	
	//console.log( instance.$currentElement.data("extendedBegin") );
	//console.log( instance.$currentElement.data("extendedBegin").sequence );
	//console.log("==================");
}



function traverse(data, delay, $animationElement, $startingElement, instance, start, incrementDelay)
{
	var begin     = $animationElement.data("begin");
	var repeatDur = $animationElement.data("repeatDur");
	
	var syncbaseCount = 0;
	var syncbaseLoop = false;
	
	if (!start)
	{
		// TODO :: this does not support trailing elements as part of a loop -- maybe also check the second element in the sequence for a loop?
		if ( $animationElement.get(0) == $startingElement.get(0) )
		{
			// Syncbase loop detected
			return true;
		}
		
		if (incrementDelay) delay += repeatDur;
	}
	
	if (incrementDelay) data.duration += repeatDur;
	
	begin.every( function(value, i)
	{
		if ( !isNaN(value) )
		{
			data.sequence.push(
			{
				begin: delay+value,
				beginStatic: value,
				element: $startingElement,	// TODO :: change to $element?
				syncbase: !start
			});
			
			data.clockCount++;
			if (incrementDelay) data.duration += value;
		}
		else
		{
			var $syncbaseElement = validate.isAnimationElement(value.id, $animationElement, instance);
			
			// See test/special/css-delay/repeatCount-loop-with-syncbases.svg
			if ( $syncbaseElement.data("repeatCount") )
			{
				syncbaseLoop = traverse(data, delay, $syncbaseElement, $startingElement, instance, false, value.attr!="begin");
			}
			
			syncbaseCount++;
		}
		
		validate.list(data.clockCount, syncbaseCount, syncbaseLoop, i, begin.length, $startingElement, instance);
		
		return !syncbaseLoop;
	});
	
	return syncbaseLoop;
}



module.exports = parse;
