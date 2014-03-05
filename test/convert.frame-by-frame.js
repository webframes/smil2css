var fs = require("fs");



describe("Frame-by-frame animations", function()
{
	it("should convert from <animate> to CSS @keyframes", function(done)
	{
		var testFile        = fs.readFileSync(__dirname+"/convert/frame-by-frame/no-css/animate.svg",        {encoding:"utf8"} );
		var testFile_expect = fs.readFileSync(__dirname+"/convert/frame-by-frame/no-css/animate_expect.svg", {encoding:"utf8"} );
		
		var result = smil2css.convert(testFile);
		
		expect(result).to.equal(testFile_expect);
		
		done();
	});
	
	
	
	it("should convert from <animate> to CSS @keyframes and include existing CSS", function(done)
	{
		var testFile        = fs.readFileSync(__dirname+"/convert/frame-by-frame/with-css/animate.svg",        {encoding:"utf8"} );
		var testFile_expect = fs.readFileSync(__dirname+"/convert/frame-by-frame/with-css/animate_expect.svg", {encoding:"utf8"} );
		
		var result = smil2css.convert(testFile);
		
		expect(result).to.equal(testFile_expect);
		
		done();
	});
});
