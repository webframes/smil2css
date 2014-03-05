var properties =
{
	supported:
	{
		keyframing: ["display","visibility"],
		tweening: [],
		all: []
	},
	unsupported:
	{
		keyframing: [],
		tweening: [],
		all: []
	},
	conversions:
	{
		"display":
		{
			newName: "visibility",
			values:  {"block":"visible", "inline":"visible", "none":"hidden"}
		}
	}
};

var tags =
{
	supported:
	{
		keyframing: ["animate"],
		tweening: [],
		all: []
	},
	unsupported: ["animateColor","animateMotion","animateTransform","mpath","set"]	// <animateColor> is deprecated in SVG1.1
};



properties.supported.all   = properties.supported.keyframing.concat( properties.supported.tweening ).sort();
properties.unsupported.all = properties.unsupported.keyframing.concat( properties.unsupported.tweening ).sort();

tags.supported.all = tags.supported.keyframing.concat( tags.supported.tweening ).sort();



var selectors =
{
	supported:   tags.supported.all.join(","),
	unsupported: tags.unsupported.join(",")
};



module.exports =
{
	tags: tags,
	properties: properties,
	selectors: selectors
};
