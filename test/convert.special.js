var expect   = require("chai").expect;
var smil2css = require("../lib");
var util     = require("./util");



describe("Special case animations", function()
{
	describe("with CSS delays", function()
	{
		it("should bail", function(done)
		{
			util.loadFiles(["special/css-delay/looping-multiple.svg"], false, function(file)
			{
				expect( smil2css.convert(file) ).to.be.instanceof(Error);
			});
			
			done();
		});
		
		
		
		it("should convert when forced", function(done)
		{
			util.loadFiles(["special/css-delay/looping-multiple.svg"], function(file, expectedResult)
			{
				expect( smil2css.convert(file,{force:true}) ).to.equal(expectedResult);
			});
			
			done();
		});
		
		
		
		describe("and repeatCount loops", function()
		{
			it("should bail", function(done)
			{
				util.loadFiles(["special/css-delay/repeatCount-loop-with-syncbases.svg"], false, function(file)
				{
					expect( smil2css.convert(file) ).to.be.instanceof(Error);
				});
				
				done();
			});
			
			
			
			it("should convert when forced", function(done)
			{
				util.loadFiles(["special/css-delay/repeatCount-loop-with-syncbases.svg"], function(file, expectedResult)
				{
					expect( smil2css.convert(file,{force:true}) ).to.equal(expectedResult);
				});
				
				done();
			});
		});
	});
});
