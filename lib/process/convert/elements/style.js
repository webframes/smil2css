function addMainStyleElement(styles, instance)
{
	// Beautify as much as possible without going crazy
	if (!instance.options.compress)
	{
		styles = "\n"+styles+"\n";
	}
	
	var $main = instance.$root.prepend('<style type="text/css"/>').children("style");
	
	$main.html("<![CDATA["+styles+"]]>");
}



function spliceStyleElements(instance)
{
	var styleText = "";
	
	instance.$root.find("style").each( function()
	{
		var $style = instance.$(this);
		
		styleText += $style.text();
		
		$style.remove();
	});
	
	return styleText;
}




module.exports =
{
	add: addMainStyleElement,
	splice: spliceStyleElements
};
