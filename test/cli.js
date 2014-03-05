var fs = require("fs");
var grunt = require("grunt");



describe("Global version (npm install -g)", function()
{
	it("should match dev version", function(done)
	{
		var devVersion = require(__dirname+"/../package.json").version;
		
		grunt.util.spawn( {cmd:"smil2css", args:["--version"]}, function(error, result)
		{
			if (!error)
			{
				var globalVersion = result.stdout.split("smil2css v")[1];
				
				expect(globalVersion).to.equal(devVersion);
			}
			
			done();
		});
	});
});



describe("Command line", function()
{
	it("should output a file using --in and --out options", function(done)
	{
		var input  = __dirname+"/simple/test.svg";
		var output = __dirname+"/simple/test_output.svg";
		
		grunt.util.spawn( {cmd:"smil2css", args:["--in",input,"--out",output]}, function(error, result)
		{
			if (!error)
			{
				// Remove file
				fs.unlinkSync(output);
			}
			
			expect(error).to.be.null;
			
			done();
		});
	});
	
	
	
	it("should bail on non-existent file input", function(done)
	{
		var input  = __dirname+"/non-existent/test.svg";
		var output = __dirname+"/non-existent/test_output.svg";
		
		grunt.util.spawn( {cmd:"smil2css", args:["--in",input,"--out",output]}, function(error, result)
		{
			expect(error).to.not.be.null;
			
			done();
		});
	});
	
	
	
	it("should bail on non-svg file input (png)", function(done)
	{
		var input  = __dirname+"/non-svg/test.png";
		var output = __dirname+"/non-svg/test.svg";
		
		grunt.util.spawn( {cmd:"smil2css", args:["--in",input,"--out",output]}, function(error, result)
		{
			expect(error).to.not.be.null;
			
			done();
		});
	});
	
	
	
	it("should bail on non-svg file input (txt)", function(done)
	{
		var input  = __dirname+"/non-svg/test.txt";
		var output = __dirname+"/non-svg/test.svg";
		
		grunt.util.spawn( {cmd:"smil2css", args:["--in",input,"--out",output]}, function(error, result)
		{
			expect(error).to.not.be.null;
			
			done();
		});
	});
});
