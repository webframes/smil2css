var util = require("./util");



function parse(instance)
{
	var begin = instance.$currentElement.attr("begin");
	
	if (begin)
	{
		begin = util.strings.list(begin);
		
		begin.forEach( function(value, i)
		{
			var syncbase = util.strings.timing.syncbase(value, instance);
			
			if (syncbase)
			{
				begin[i] = syncbase;
			}
			else
			{
				begin[i] = util.strings.timing.clock(value, instance);
			}
		});
		
		// Place hard-coded time values ahead of syncbases -- see test/keyframing/begin-syncbase.end/looping2.svg
		begin.sort();
	}
	else
	{
		begin = [0];
	}
	
	instance.$currentElement.data("begin", begin);
}



module.exports = parse;
