var definitions   = require("../../../../definitions");
var util          = require("./util");

// Attributes
var attributeName       = require("./attributeName");
var begin               = require("./begin");
var calcMode            = require("./calcMode");
var dur                 = require("./dur");
var end                 = require("./end");
var extendedBegin       = require("./extendedBegin");		// begin with syncbases traversed
var extendedDur         = require("./extendedDur");			// dur sum of all sibling animation elements
var extendedInitial     = require("./extendedInitial");		// value before animation (declared or default)
var extendedKeys        = require("./extendedKeys");		// merges data into a CSS-compatible list of keyframes 
var extendedTarget      = require("./extendedTarget");		// element that will have its properties animated
var extendedRepeatCount = require("./extendedRepeatCount");	// the final repeat count
var extendedTween       = require("./extendedTween");		// tweened animation or not
var fill                = require("./fill");
var keyTimes            = require("./keyTimes");
var repeatCount         = require("./repeatCount");
var repeatDur           = require("./repeatDur");
var type                = require("./type");
var values              = require("./values");



function addDataAttributes(instance, styles)
{
	var $animationElements = instance.$root.find(definitions.selectors.supported);
	
	
	// Round 1
	$animationElements.each( function()
	{
		instance.$currentElement = instance.$(this);
		
		   attributeName(instance);
		            type(instance);
		        calcMode(instance);
		            fill(instance);
		            
		   extendedTween(instance);
		  extendedTarget(instance);
		 extendedInitial(instance, styles);
		
		        keyTimes(instance);
		          values(instance);
		
		           begin(instance);
		             dur(instance);
		
		     repeatCount(instance);
		       repeatDur(instance);
		       
		             end(instance);
		
		// Attributes affected: attributeName, extendedInitial, values
		util.conversions(instance);
	});
	
	
	// Round 2
	$animationElements.each( function()
	{
		instance.$currentElement = instance.$(this);
		
		extendedBegin(instance);
	});
	
	
	// Round 3
	$animationElements.each( function()
	{
		instance.$currentElement = instance.$(this);
		
		extendedRepeatCount(instance);
	});
	
	
	// Round 4
	// Parents of any animation elements
	$animationElements.parent().each( function()
	{
		// Parent's child animation elements
		var $animationElementSiblings = instance.$(this).children(definitions.selectors.supported);
		
		util.validate($animationElementSiblings, instance);
		
		  extendedDur($animationElementSiblings, instance);
		 extendedKeys($animationElementSiblings, instance);
	});
}



module.exports = addDataAttributes;
