var error = require("../../../../error");
var util  = require("./util");



function parse(instance)
{
	var end       = instance.$currentElement.attr("end");
	var repeatDur = instance.$currentElement.data("repeatDur");
	
	if (end)
	{
		end = util.strings.list(end);
		
		end.forEach( function(value, i)
		{
			var syncbase = util.strings.timing.syncbase(value, instance);
			
			if (syncbase)
			{
				error.incompatible("end cannot have a syncbase value", null, instance);
			}
			else
			{
				value = util.strings.timing.clock(value, instance);
				
				if (value != repeatDur)
				{
					error.incompatible("Interrupted animation", "https://github.com/stevenvachon/smil2css/wiki/Interrupted-animations", instance);
				}
			}
		});
	}
	
	//end = [repeatDur];
	
	//instance.$currentElement.data("end", end);
}



module.exports = parse;
