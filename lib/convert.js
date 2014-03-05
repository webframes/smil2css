var elements = require("./elements");



/*function devlog(data)
{
	//console.log( require("util").inspect(data, {depth:null, showHidden:true, colors:true}) );
	console.log( require("util").inspect(data, {depth:null, colors:true}) );
}*/



function appendAnimationToShapes(data)
{
	for (var i in data)
	{
		var _data = data[i];
		var style = _data.target.attr("style");
		
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
		
		var animation = i +" "+ toSecondsString(_data.duration);
		
		if (_data.delay != "no match" && _data.delay !== 0)
		{
			animation += " "+ toSecondsString(_data.delay);
		}
		
		if (_data.iterations != "no match")
		{
			// 0 is infinite loop
			animation += " "+ (_data.iterations ? _data.iterations : "infinite");
		}
		
		// Couldn't use addVendors because it requires a full CSS block
		animation = "animation:"+animation+";-webkit-animation:"+animation;
		
		_data.target.attr("style", style+animation);
	}
}



function toSecondsString(ms)
{
	return (ms/1000) + "s";
}



module.exports = function($, options)
{
	var root = $(":root");
	
	var element   = elements.style.getMain(root);
	var styles    = elements.style.parse( element.text() );
	var keyframes = elements.animate.getKeyframes(root, $);
	
	appendAnimationToShapes(keyframes);
	
	styles  = elements.style.removeVendors(styles);
	styles  = elements.style.stringify(styles, options.compress);
	styles += elements.style.createKeyframes(keyframes);
	styles  = elements.style.addVendors(styles, options.compress);
	
	elements.style.addToMain(styles, element, options.compress);
	
	return $;
}
