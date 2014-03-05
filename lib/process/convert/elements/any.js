var css = require("../css");



function appendAnimationReferences(data)
{
	for (var i in data)
	{
		var dataItem = data[i];
		var style = dataItem.target.attr("style");
		
		// Add declaration separator (semi-colon) if necessary
		if (style)
		{
			if ( style.substr(style.length-1) != ";")
			{
				style += ";";
			}
		}
		else
		{
			style = "";
		}
		
		var animation = i +" "+ timeString(dataItem.duration);
		
		// 0 is default, so it doesn't need to be printed
		if (dataItem.delay != 0)
		{
			animation += " "+ timeString(dataItem.delay);
		}
		
		// 1 is default, so it doesn't need to be printed
		if (dataItem.iterations != 1)
		{
			// 0 is infinite loop
			animation += " "+ (dataItem.iterations ? dataItem.iterations : "infinite");
		}
		
		animation = "animation:"+animation;
		animation = css.animation.inline(style+animation);
		
		dataItem.target.attr("style", style+animation);
	}
}



function timeString(msInt)
{
	var ms = msInt + "ms";
	var s = (msInt/1000) + "s";
	
	// Convert 0.25s to .25s, etc, to lower file size
	if (s.substr(0,2) == "0.") s = s.substr(1);
	
	// `ms` takes priority over `s` as it's easier to read
	return (ms.length <= s.length) ? ms : s;
}



module.exports =
{
	appendAnimationReferences: appendAnimationReferences,
};
