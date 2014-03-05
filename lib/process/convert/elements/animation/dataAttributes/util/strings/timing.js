var error = require("../../../../../../error");



function parseClock(value, instance)
{
	validate(value, instance);
	
	var metric = parseClock_metric(value);
	if (metric != undefined) return metric;
	
	var fullPartial = parseClock_fullPartial(value);
	if (fullPartial != undefined) return fullPartial;
	
	// TODO :: offset values?
	// TODO :: repeat values?
}



function parseClock_fullPartial(value)
{
	value = value.match(/^(\d+:)?([0-5][0-9]:)?([0-5][0-9](\.\d+)?)$/);
	
	if (value)
	{
		var hours   = value[1] ? parseInt(value[1])   : 0;
		var minutes = value[2] ? parseInt(value[2])   : 0;
		var seconds = value[3] ? parseFloat(value[3]) : 0;
		
		hours   *= 3600000;
		minutes *=   60000;
		seconds *=    1000;
		
		// Microseconds ignored
		value = hours + minutes + Math.floor(seconds);
	}
	
	return value;
}



function parseClock_metric(value)
{
	value = value.match(/^(\d+(\.\d+)?)(h|min|s|ms)?$/);
	
	if (value)
	{
		var measurement = value[3];
		value = parseFloat(value[1]);
		
		switch (measurement)
		{
			case "h":   value *= 3600000; break;
			case "min": value *=   60000; break;
			case "s":   value *=    1000; break;
			case "ms":                    break;
			default:    value *=    1000;
		}
		
		// Microseconds ignored
		value = Math.floor(value);
	}
	
	return value;
}



function parseSyncbase(value, instance)
{
	// TODO :: add offset syncbases ... throw error when found
	var syncbase = value.match(/^([\w\-:\.]+)\.(\w+)$/);
	
	if (syncbase)
	{
		syncbase =
		{
			id:   syncbase[1],
			attr: syncbase[2]
		};
		
		validate(syncbase, instance);
	}
	
	return syncbase;
}



function validate(value, instance)
{
	// from parseSyncbase()
	if (value instanceof Object)
	{
		if (value.attr!="begin" && value.attr!="end")
		{
			error.incompatible("Time value is an event", null, instance);
		}
	}
	// from parseClock()
	else
	{
		// TODO :: merge into single regexp?
		
		if ( value.match(/^accessKey\(.+\)/) )
		{
			error.incompatible("Time value is an accessKey", null, instance);
		}
		if ( value.match(/repeat\(.+\)/) )
		{
			error.incompatible("Time value is a repeat", null, instance);
		}
		if ( value.match(/^wallclock\(.+\)$/) )
		{
			error.incompatible("Time value is a wallclock-sync", null, instance);
		}
	}
}



module.exports =
{
	clock: parseClock,
	syncbase: parseSyncbase
};
