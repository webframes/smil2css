var Decimal     = require("decimal.js");

var css         = require("../../css");
var definitions = require("../../../definitions");



function getKeyframes(instance, styles)
{
	var id_count = css.find.startingID(styles);
	var animations = {};
	
	// Parents of any animation elements
	instance.$root.find(definitions.selectors.supported).parent().each( function()
	{
		// Parent's child animation elements
		var $animationElements = instance.$(this).children(definitions.selectors.supported);
		
		var $firstAnimationElement = $animationElements.eq(0);
		
		var keyframes = {};
		var keyframes_unsorted = {};
		
		$animationElements.each( function()
		{
			var $animationElement = instance.$(this);
			
			var attributeName  = $animationElement.data("attributeName");
			var extendedKeys   = $animationElement.data("extendedKeys");
			var type           = $animationElement.data("type");
			
			// Merge all sibling animation keyframes
			for (var i in extendedKeys)
			{
				if ( !keyframes_unsorted[i] )
				{
					keyframes_unsorted[i] = {};
				}
				
				// TODO :: get type in here somehow
				keyframes_unsorted[i][attributeName] = extendedKeys[i];
			}
			
			// Sort keyframes
			Object.keys(keyframes_unsorted).sort().forEach( function(time)
			{
				var percent = new Decimal(time).times(100).toString() + "%";
				
				keyframes[percent] = keyframes_unsorted[time];
			});
		});
		
		// Values of $firstAnimationElement have already been validated as matching across sibling animation elements
		animations["_smil" + (++id_count)] =
		{
			delay:      $firstAnimationElement.data("extendedBegin").preDelay,
			duration:   $firstAnimationElement.data("extendedDur"),
			iterations: $firstAnimationElement.data("extendedRepeatCount"),
			keyframes:  keyframes,
			target:     $firstAnimationElement.data("extendedTarget")
		};
	});
	
	return animations;
}



module.exports = getKeyframes;
