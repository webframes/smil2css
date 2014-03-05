var css = require("../../../css");



function parse(instance, styles)
{
	var attributeName  = instance.$currentElement.data("attributeName");
	var extendedTarget = instance.$currentElement.data("extendedTarget");
	
	var tag = extendedTarget.get(0).name;
	
	// TODO :: check extendedTarget's attributes (property="" and styles="") before stylesheet
	
	var extendedInitial = css.find.declaration(styles, tag, attributeName);
	
	// TODO :: if nothing, check browser defaults (will have to create a list of such)
	
	instance.$currentElement.data("extendedInitial", extendedInitial);
}



module.exports = parse;
