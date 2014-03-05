function parse($animationElements, instance)
{
	var extendedDur = 0;
	
	$animationElements.each( function()
	{
		var extendedBegin = instance.$(this).data("extendedBegin");
		
		extendedDur += extendedBegin.duration;
	});
	
	$animationElements.each( function()
	{
		instance.$(this).data("extendedDur", extendedDur);
	});
}



module.exports = parse;
