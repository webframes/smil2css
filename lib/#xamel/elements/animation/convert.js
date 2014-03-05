var animationTagNames = require("../../definitions").animationTagNames;



function convertAnimationElements(element, callback, thisArg)
{
	var i,j,
	    numTags     = animationTagNames.length,
	    numChildren = element.children.length;
	
	//console.log(element.name, numChildren);
	
	for (i=numChildren-1; i>=0; i--)
	{
		for (j=0; j<numTags; j++)
		{
			if (element.children[i].name == animationTagNames[j])
			{
				// Convert to CSS here
				
				element.children.splice(i, 1);
			}
		}
	}
	
	return element;
}



module.exports = convertAnimationElements;
