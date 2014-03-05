var animationTags = ["animate"/*,"animatecolor","animatemotion","animatetransform","mpath","set"*/];	// <animatecolor> is deprecated in SVG1.1

var frameByFrameOnlyProperties = ["display","visibility"];
//var tweenedProperties = [];

var propertyConversions =
{
	"display":
	{
		newName: "visibility",
		values:  {"block":"visible", "inline":"visible", "none":"hidden"}
	}
};



module.exports =
{
	tags:
	{
		animation:        animationTags,
		animation_joined: animationTags.join(),
	},
	
	properties:
	{
		conversions: propertyConversions,
		
		frameByFrame:        frameByFrameOnlyProperties,
		frameByFrame_joined: frameByFrameOnlyProperties.join()/*,
		
		tweened:        tweenedProperties,
		tweened_joined: tweenedProperties.join()*/
	}
};
