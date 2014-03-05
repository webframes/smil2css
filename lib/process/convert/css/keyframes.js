function stringifyKeyframes(data)
{
	var output = "";
	
	for (var i in data)
	{
		var _data = data[i];
		
		output += "@keyframes "+i+"{";
		
		for (var j in _data.keyframes)
		{
			var properties = _data.keyframes[j];
			
			output += j+"{";
			
			Object.keys(properties).sort().forEach( function(property)
			{
				output += property + ":" + properties[property];
			});
			
			output += "}";
		}
		
		output += "}";
	}
	
	return output;
}



module.exports =
{
	stringify: stringifyKeyframes
};
