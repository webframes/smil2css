var error = require("../../../../error");



function parse(instance)
{
	var fill = instance.$currentElement.attr("fill");
	
	if (fill == "freeze")
	{
		error.incompatible('"Frozen" animation', "https://github.com/stevenvachon/smil2css/wiki/Current-Status", instance);
	}
	
	instance.$currentElement.data("fill", fill);
}



module.exports = parse;
