var xamel = require("xamel");

var elements = require("./elements");



function smil2css(svg, options, callback)
{
	this.compressOutput = options.compress || false;
	
	var classRef = this;
	
	xamel.parse(svg, {cdata:true, trim:true, normalize:true}, function(error, xml)
	{
		if (!error)
		{
			callback( classRef.init(xml) );
		}
	});
}



smil2css.prototype.init = function(xml)
{
	elements.style.createMain(xml, this.compressOutput);
	
	xml = elements.animation.find(xml, function(child)
	{
		return elements.animation.convert(child);
	}, this);
	
	return xamel.serialize(xml, {pretty:!this.compressOutput});
}



module.exports = smil2css;
