function parse(instance)
{
	var repeatCount = instance.$currentElement.attr("repeatCount");
	
	switch (repeatCount)
	{
		case undefined:    repeatCount = 1; break;
		case "indefinite": repeatCount = 0; break;
	}
	
	instance.$currentElement.data("repeatCount", repeatCount);
}



module.exports = parse;
