function error(name, type, message, wiki, instance, element)
{
	var error = new Error(message);
	error.name = name;
	
	error.smil2css =
	{
		element: stringifyElement( element || instance.$currentElement, instance.$ ),
		type: type,
		wiki: wiki
	};
	
	throw error;
}



function incompatible(message, wiki, instance, element)
{
	error("Incompatibile", "incompatible", message, wiki, instance, element);
}



function invalid(message, wiki, instance, element)
{
	error("Invalid", "invalid", message, wiki, instance, element);
}



function unnecessary(message, wiki, instance, element)
{
	error("Unnecessary", "unnecessary", message, wiki, instance, element);
}



function stringifyElement(element, $)
{
	if (element)
	{
		var $element = $(element).eq(0).clone();
		var tagName  = $element.get(0).name;
		var hasChildren = $element.children().length;
		
		var string = $("<div/>").append( $element.empty() ).html();
		
		if (hasChildren)
		{
			string = string.replace("></"+tagName+">", "> … </"+tagName+">");
		}
		else
		{
			string = string.replace("></"+tagName+">", " />");
		}
		
		return string;
	}
}



function warning(message, wiki, instance, element)
{
	if (!instance.options.force)
	{
		error("Warning", "warning", message, wiki, instance, element);
	}
}



module.exports =
{
	incompatible: incompatible,
	invalid: invalid,
	unnecessary: unnecessary,
	warning: warning
};
