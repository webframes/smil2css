var definitions = require("./definitions");
var error       = require("./error");


/*
	Check if supported animation elements exist
*/
function isCompatible(instance)
{
	var supported   = instance.$root.find(definitions.selectors.supported);
	var unsupported = instance.$root.find(definitions.selectors.unsupported);
	
	if (unsupported.length)
	{
		// See test/erroneous/unsupported-elements.svg
		error.incompatible("Unsupported animation elements detected", "https://github.com/stevenvachon/smil2css/wiki/Current-Status#animation-elements", instance);
	}
	else if (!supported.length)
	{
		// See test/erroneous/non-animating.svg
		error.unnecessary("No animation elements detected", null, instance);
	}
	
	return true;
}



function isSVG(instance)
{
	if (!instance.$root.length || instance.$root[0].name!="svg")
	{
		// See test/erroneous/non-svg.png
		// See test/erroneous/non-svg.txt
		error.invalid("Not an SVG document", null, instance);
	}
	
	return true;
}



module.exports =
{
	isCompatible: isCompatible,
	isSVG: isSVG
};
