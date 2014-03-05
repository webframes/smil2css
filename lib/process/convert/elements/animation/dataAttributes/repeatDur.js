var error = require("../../../../error");
var util  = require("./util");



function parse(instance)
{
	var dur         = instance.$currentElement.data("dur");
	var repeatCount = instance.$currentElement.data("repeatCount");
	var repeatDur   = instance.$currentElement.attr("repeatDur");
	
	// Avoid indefinite repeatCounts (0)
	repeatCount = Math.max(1, repeatCount);
	
	if (repeatDur && repeatDur!="indefinite")
	{
		/*if (repeatDur == "indefinite")
		{
			repeatDur = 0;
		}
		else
		{*/
			repeatDur = util.strings.timing.clock(repeatDur, instance);
			
			if (repeatDur != dur*repeatCount)
			{
				error.incompatible("Interrupted animation", "https://github.com/stevenvachon/smil2css/wiki/Interrupted-animations", instance);
			}
		//}
	}
	else
	{
		repeatDur = dur*repeatCount;
	}
	
	instance.$currentElement.data("repeatDur", repeatDur);
}



module.exports = parse;
