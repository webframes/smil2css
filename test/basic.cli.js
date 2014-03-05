var expect   = require("chai").expect;
var fs       = require("fs");
var smil2css = require("../lib");
var util     = require("./util");



describe("Command line", function()
{
	it("should output a file using --input and --output options", function(done)
	{
		var input  = __dirname+"/simple/test.svg";
		var output = __dirname+"/simple/test_output.svg";
		
		util.shell(["--input",input,"--output",output], function(error)
		{
			// Remove file
			if (!error) fs.unlinkSync(output);
			
			expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it("should output a file using --input and --output aliases", function(done)
	{
		var input  = __dirname+"/simple/test.svg";
		var output = __dirname+"/simple/test_output.svg";
		
		util.shell([input,output], function(error)
		{
			// Remove file
			if (!error) fs.unlinkSync(output);
			
			expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it("should bail on non-existent file input", function(done)
	{
		var input  = __dirname+"/erroneous/non-existent.svg";
		var output = __dirname+"/erroneous/non-existent_output.svg";
		
		util.shell(["--input",input,"--output",output], function(error)
		{
			expect(error).to.not.be.null;
			
			done();
		});
	});
	
	
	
	it("should bail on arbitrary internal error", function(done)
	{
		var input  = __dirname+"/erroneous/non-svg.png";
		var output = __dirname+"/erroneous/non-svg.svg";
		
		util.shell(["--input",input,"--output",output], function(error)
		{
			expect(error).to.not.be.null;
			
			done();
		});
	});
});
