var animationTagNames = require("../../definitions").animationTagNames;



function hasAnimationElements(element)
{
	var child,i,j,
	    numTags     = animationTagNames.length,
	    numChildren = element.children.length;
	
	for (i=0; i<numChildren; i++)
	{
		child = element.children[i];
		
		for (j=0; j<numTags; j++)
		{
			if (child.name == animationTagNames[j])
			{
				return true;
			}
		}
	}
	
	return false;
}



/*
	Scan an element's children for any that contain animations.
*/
function findAnimatedElements(element, callback, thisArg)
{
	var child,i;
	var numChildren = element.children.length;
	
	if (numChildren)
	{
		for (i=numChildren-1; i>=0; i--)
		{
			child = element.children[i];
			
			// CDATA has no children
			if (!child.rawData)
			{
				if (child.children.length)
				{
					if ( hasAnimationElements(child) )
					{
						element.children[i] = callback.apply(thisArg || this, [child]);
					}
					else
					{
						element.children[i] = findAnimatedElements(child, callback, thisArg);
					}
				}
			}
		}
	}
	
	return element;
}



module.exports = findAnimatedElements;
