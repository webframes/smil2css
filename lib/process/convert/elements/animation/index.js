var addDataAttributes = require("./dataAttributes");
var definitions       = require("../../../definitions");
var getKeyframes      = require("./keyframes");



function parseElements(instance, styles)
{
	addDataAttributes(instance, styles);
	
	return getKeyframes(instance, styles);
}



function removeElements(instance)
{
	instance.$root.find(definitions.selectors.supported).remove();
}



module.exports =
{
	parse: parseElements,
	remove: removeElements
};
