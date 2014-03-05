var expect   = require("chai").expect;
var smil2css = require("../lib");
var util     = require("./util");



describe("Keyframing (discrete-interpolated or \"frame-by-frame\") animations", function()
{
	describe("with keyTimes", function()
	{
		it("should convert", function(done)
		{
			util.loadFiles(["keyframing/keyTimes/no-css.svg"], function(file, expectedResult)
			{
				expect( smil2css.convert(file) ).to.equal(expectedResult);
			});
			
			done();
		});
		
		
		
		it("should convert and include existing CSS", function(done)
		{
			util.loadFiles(["keyframing/keyTimes/with-css.svg"], function(file, expectedResult)
			{
				expect( smil2css.convert(file) ).to.equal(expectedResult);
			});
			
			done();
		});
	});
	
	
	
	describe("with begin (syncbase)", function()
	{
		it.skip("should convert id.begin", function(done)
		{
			util.loadFiles(
			[
				"keyframing/begin-syncbase.begin/looping.svg"
			],
			function(file, expectedResult)
			{
				console.log( smil2css.convert(file) );
				
				//expect( smil2css.convert(file) ).to.equal(expectedResult);
			});
			
			done();
		});
		
		
		
		it("should convert id.end", function(done)
		{
			util.loadFiles(
			[
				"keyframing/begin-syncbase.end/interrupted-animation.svg",
				"keyframing/begin-syncbase.end/looping1.svg",
				"keyframing/begin-syncbase.end/looping2.svg",
				"keyframing/begin-syncbase.end/looping3.svg",
				"keyframing/begin-syncbase.end/not-looping1.svg",
				"keyframing/begin-syncbase.end/not-looping2.svg",
				"keyframing/begin-syncbase.end/not-looping3.svg",
				"keyframing/begin-syncbase.end/not-looping4.svg",
				"keyframing/begin-syncbase.end/not-looping5.svg",
				"keyframing/begin-syncbase.end/not-looping6.svg",
				"keyframing/begin-syncbase.end/not-looping-with-delay1.svg",
				"keyframing/begin-syncbase.end/not-looping-with-delay2.svg"
			],
			function(file, expectedResult)
			{
				expect( smil2css.convert(file) ).to.equal(expectedResult);
			});
			
			done();
		});
	});
	
	
	
	describe("with many frames", function()
	{
		it("should convert without timing out", function(done)
		{
			util.loadFiles(["keyframing/large/3d-star.svg"], function(file, expectedResult)
			{
				expect( smil2css.convert(file) ).to.equal(expectedResult);
			});
			
			done();
		});
	});
	
	
	
	/*describe.only("quick test", function()
	{
		it("should do stuff", function(done)
		{
			var testFile = "keyframing/begin-syncbase.end/not-looping6.svg";
			
			console.log(testFile);
			
			var result = smil2css.convert( util.loadFile(testFile) );
			
			console.log(result);
			
			if (result instanceof Error)
			{
				throw result;
			}
			
			done();
		});
	});*/
});
