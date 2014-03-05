function parse(instance)
{
	var extendedBegin = instance.$currentElement.data("extendedBegin");
	var repeatCount   = instance.$currentElement.data("repeatCount");
	
	var extendedRepeatCount = extendedBegin.syncbaseLoop || !repeatCount ? 0 : 1;
	
	instance.$currentElement.data("extendedRepeatCount", extendedRepeatCount);
}



module.exports = parse;
