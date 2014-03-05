var error = require("../../../../error");
var util  = require("./util");



function parse(instance)
{
	var dur = instance.$currentElement.attr("dur");
	
	if (dur==undefined || dur=="indefinite")
	{
		error.incompatible("Indefinite duration", null, instance);
	}
	
	dur = util.strings.timing.clock(dur, instance);
	
	instance.$currentElement.data("dur", dur);
}



module.exports = parse;
