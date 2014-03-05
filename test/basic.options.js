var expect   = require("chai").expect;
var smil2css = require("../lib");
var util     = require("./util");

var testFile              = util.loadFile("simple/test.svg");
var testFile_compressed   = util.loadFile("simple/test_expect_compressed.svg");
var testFile_uncompressed = util.loadFile("simple/test_expect_uncompressed.svg");



describe("Default and overriding options (per-instance/per-convert)", function()
{
	it("should support reusable instances", function(done)
	{
		var instance,customOptions,defaultOptions;
		
		// Test 1
		instance = new smil2css();
		
		customOptions  = instance.convert(testFile, {compress:false});
		defaultOptions = instance.convert(testFile);
		
		expect(customOptions).to.equal(testFile_uncompressed);
		expect(defaultOptions).to.equal(testFile_compressed);
		
		// Test 2
		instance = new smil2css({compress:false});
		
		customOptions  = instance.convert(testFile, {compress:true});
		defaultOptions = instance.convert(testFile);
		
		expect(customOptions).to.equal(testFile_compressed);
		expect(defaultOptions).to.equal(testFile_uncompressed);
		
		done();
	});
	
	
	
	it("should support single-use instances", function(done)
	{
		var customOptions  = smil2css.convert(testFile, {compress:false});
		var defaultOptions = smil2css.convert(testFile);
		
		expect(customOptions).to.equal(testFile_uncompressed);
		expect(defaultOptions).to.equal(testFile_compressed);
		
		done();
	});
});
