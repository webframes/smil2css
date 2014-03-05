function parse(instance)
{
	var extendedTarget = instance.$currentElement.parent();
	
	instance.$currentElement.data("extendedTarget", extendedTarget);
}



module.exports = parse;
