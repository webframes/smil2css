var expect   = require("chai").expect;
var smil2css = require("../lib");
var util     = require("./util");



describe("Erroneous and incompatible input", function()
{
	it("should bail on input with unsupported elements", function(done)
	{
		util.loadFiles(["erroneous/unsupported-elements.svg"], false, function(file)
		{
			expect( smil2css.convert(file) ).to.be.instanceof(Error);
		});
		
		done();
	});
	
	
	
	it("should bail on input with no animation elements", function(done)
	{
		util.loadFiles(["erroneous/non-animating.svg"], false, function(file)
		{
			expect( smil2css.convert(file) ).to.be.instanceof(Error);
		});
		
		done();
	});
	
	
	
	it("should bail on input with missing values", function(done)
	{
		util.loadFiles(["erroneous/no-attributeName.svg"], false, function(file)
		{
			expect( smil2css.convert(file) ).to.be.instanceof(Error);
		});
		
		done();
	});
	
	
	
	it("should bail on input with \"dead end\" syncbase values", function(done)
	{
		util.loadFiles(
		[
			"erroneous/syncbase-deadend1.svg",
			"erroneous/syncbase-deadend2.svg"
		],
		false, function(file)
		{
			expect( smil2css.convert(file) ).to.be.instanceof(Error);
		});
		
		done();
	});
	
	
	
	it("should bail on input with duplicate syncbase values", function(done)
	{
		util.loadFiles(["erroneous/syncbase-duplicates.svg"], false, function(file)
		{
			expect( smil2css.convert(file) ).to.be.instanceof(Error);
		});
		
		done();
	});
	
	
	
	it("should bail on input with \"weaving\" syncbase values", function(done)
	{
		util.loadFiles(
		[
			"erroneous/syncbase-weaving1.svg",
			"erroneous/syncbase-weaving2.svg",
			"erroneous/syncbase-weaving3.svg",
			"erroneous/syncbase-weaving4.svg",
			"erroneous/syncbase-weaving5.svg",
			"erroneous/syncbase-weaving6.svg"
		],
		false, function(file)
		{
			expect( smil2css.convert(file) ).to.be.instanceof(Error);
		});
		
		done();
	});
	
	
	
	it("should bail on non-svg input (png)", function(done)
	{
		util.loadFiles(["erroneous/non-svg.png"], false, function(file)
		{
			expect( smil2css.convert(file) ).to.be.instanceof(Error);
		});
		
		done();
	});
	
	
	
	it("should bail on non-svg input (txt)", function(done)
	{
		util.loadFiles(["erroneous/non-svg.txt"], false, function(file)
		{
			expect( smil2css.convert(file) ).to.be.instanceof(Error);
		});
		
		done();
	});
});
