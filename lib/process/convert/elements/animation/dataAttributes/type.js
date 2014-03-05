function parse(instance)
{
	var type = instance.$currentElement.attr("type");
	
	instance.$currentElement.data("type", type);
}



module.exports = parse;
