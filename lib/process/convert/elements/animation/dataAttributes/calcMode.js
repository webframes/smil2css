var definitions = require("../../../../definitions");
var error       = require("../../../../error");



function parse(instance)
{
	var attributeName = instance.$currentElement.data("attributeName");
	var calcMode      = instance.$currentElement.attr("calcMode");
	
	if (!calcMode) calcMode = "linear";
	
	// Check if discrete-only property
	definitions.properties.supported.keyframing.every( function(keyframingProperty)
	{
		if (keyframingProperty == attributeName)
		{
			calcMode = "discrete";
			return false;
		}
		
		return true;
	});
	
	validate(calcMode, instance);
	
	instance.$currentElement.data("calcMode", calcMode);
}



function validate(calcMode, instance)
{
	if (calcMode=="keySpline" || calcMode=="linear")
	{
		error.incompatible("Non-discrete animation (coming soon)", "https://github.com/stevenvachon/smil2css/wiki/Current-Status", instance);
	}
	
	if (calcMode == "paced")
	{
		error.incompatible("Paced animation", null, instance);
	}
}



module.exports = parse;
