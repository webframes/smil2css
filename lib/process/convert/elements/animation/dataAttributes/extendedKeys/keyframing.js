var Decimal = require("decimal.js");



function addFrameAfter(time, value, delay, array, step, resolution)
{
	time = getAfterTime(time, step, resolution);
	
	addFrameAt(time, value, delay, array);
}



// `delay` only used for debugging
function addFrameAt(time, value, delay, array)
{
	array.push({ time:time, value:value, delay:delay });
}



function addFrameBefore(time, value, delay, array, step, resolution)
{
	time = getBeforeTime(time, step, resolution);
	
	addFrameAt(time, value, delay, array);
}



/*
	Insert extra keyframe to preserve frame-by-frame (keyframing) effect,
	because CSS is spec'ed to attempt "tweening" on all properties, even those that cannot be,
	undesirably resulting in changes occuring immediately instead of on the following keyframe
*/
function addPreservationFrameAt(time, value, delay, array)
{
	addFrameAt(time, value, delay, array);
}



function addPreservationFrameBefore(time, value, delay, array, step, resolution)
{
	addFrameBefore(time, value, delay, array, step, resolution);
}



function applyResolution(time, resolution, round)
{
	round = round ? Decimal.ROUND_HALF_UP : Decimal.ROUND_FLOOR;
	
	time = new Decimal(time).toFixed(resolution, Decimal.ROUND_FLOOR);
	time = parseFloat(time);
	
	return time;
}



function getAfterTime(time, step, resolution)
{
	time = new Decimal(time).plus(step);
	
	return applyResolution(time, resolution);
}



function getBeforeTime(time, step, resolution)
{
	time = new Decimal(time).minus(step);
	
	return applyResolution(time, resolution);
}



function getResolution($animationElement)
{
	var extendedDur = $animationElement.data("extendedDur");

	// If extendedDur is 1000, step would be .001
	// If extendedDur is 6000, step would be .00017 from .0001(6)
	return extendedDur.toString().length+1;
}



function getStep($animationElement)
{
	var extendedDur = $animationElement.data("extendedDur");
	var resolution  = getResolution($animationElement);
	
	var time = new Decimal(1).dividedBy(extendedDur);
	
	return applyResolution(time, resolution, true);
}


/*
	FROM OLD CODE -- here in case it's ever needed
	
	Was used for keyTimes, which is 0-1 based
*/
/*function oneLess()
{
	var minimumPerFrame = new Decimal(1).dividedBy(duration);	// percent
	
	// Ensure that there are never two identical keyframe times
	// by going even smaller than the calculated minimum
	var resolution  = duration.toString().length;
	var divisor     = new Decimal(10).toPower(resolution+1).dividedBy(10);
	var subtrahend  = new Decimal(1).dividedBy(divisor);
	var beforeFrame = new Decimal(minimumPerFrame).minus(subtrahend).toFixed(resolution);
	var time = nextKeyTime.minus(beforeFrame).toNumber();
}*/



function relateTime(time, extendedDur, resolution)
{
	// Relative to sibling animations
	time = new Decimal(time).dividedBy(extendedDur);
	
	// Clean up any repeating decimals
	time = applyResolution(time, resolution);
	
	return time;
}



module.exports =
{
	after:          addFrameAfter,
	at:             addFrameAt,
	before:         addFrameBefore,
	preserveAt:     addPreservationFrameAt,
	preserveBefore: addPreservationFrameBefore,
	
	resolute:   applyResolution,
	resolution: getResolution,
	relate:     relateTime,
	step:       getStep
};
