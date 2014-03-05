var css      = require("./css");
var elements = require("./elements");



function convert(instance)
{
	var keyframes,styles;
	
	styles    = elements.style.splice(instance);
	styles    = css.object.parse(styles);
	styles    = css.vendors.remove(styles);
	keyframes = elements.animation.parse(instance, styles);
	
	elements.animation.remove(instance);
	elements.any.appendAnimationReferences(keyframes);
	
	styles  = css.object.stringify(styles, instance);
	styles += css.keyframes.stringify(keyframes);
	styles  = css.vendors.add(styles, instance);
	
	// Format string
	if (!instance.options.compress)
	{
		styles = css.object.parse(styles);
		styles = css.object.stringify(styles, instance);
	}
	
	elements.style.add(styles, instance);
}



module.exports = convert;
