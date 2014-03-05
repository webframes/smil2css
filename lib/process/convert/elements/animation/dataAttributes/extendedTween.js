var definitions = require("../../../../definitions");



function parse(instance)
{
	var calcMode = instance.$currentElement.data("calcMode");
	
	var extendedTween = calcMode != "discrete";
	
	instance.$currentElement.data("extendedTween", extendedTween);
}



module.exports = parse;
