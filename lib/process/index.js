var check   = require("./check");
var convert = require("./convert");



function process(instance)
{
	if ( check.isSVG(instance) && check.isCompatible(instance) )
	{
		convert(instance);
	}
}


module.exports = process;
