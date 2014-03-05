var fs = require("fs");

var testFile            = fs.readFileSync(__dirname+"/simple/test.svg",        {encoding:"utf8"});
var testFile_compressed = fs.readFileSync(__dirname+"/simple/test_expect.svg", {encoding:"utf8"});



/*describe("Option", function()
{
	it("option1 should work", function(done)
	{
		done();
	});
	
	
	
	it("option2 should work", function(done)
	{
		done();
	});
});*/



describe("Default and overriding options (per-instance/per-convert)", function()
{
	it("should work with reusable instances", function(done)
	{
		var instance,customOptions,defaultOptions;
		
		// Test 1
		instance = new smil2css();
		
		customOptions  = instance.convert(testFile, {compress:false});
		defaultOptions = instance.convert(testFile);
		
		expect(customOptions).to.equal(testFile);
		expect(defaultOptions).to.equal(testFile_compressed);
		
		// Test 2
		instance = new smil2css({compress:false});
		
		customOptions  = instance.convert(testFile, {compress:true});
		defaultOptions = instance.convert(testFile);
		
		expect(customOptions).to.equal(testFile_compressed);
		expect(defaultOptions).to.equal(testFile);
		
		done();
	});
	
	
	
	it("should work with single-use instances", function(done)
	{
		var customOptions  = smil2css.convert(testFile, {compress:false});
		var defaultOptions = smil2css.convert(testFile);
		
		expect(customOptions).to.equal(testFile);
		expect(defaultOptions).to.equal(testFile_compressed);
		
		done();
	});
});
