var child_process = require("child_process");
var fs = require("fs");



function loadFile(url)
{
	return fs.readFileSync(__dirname+"/"+url, {encoding:"utf8"});
}



function loadFiles(urls, loadExpected, callback)
{
	// loadFiles(urls, callback)
	if (typeof loadExpected == "function")
	{
		callback = loadExpected;
		loadExpected = true;
	}
	
	urls.forEach( function(url)
	{
		if (loadExpected)
		{
			var lastDot = url.lastIndexOf(".");
			if (lastDot < 0) lastDot = url.length;
			
			var url_expect = url.substr(0,lastDot) + "_expect" + url.substr(lastDot);
			
			callback( loadFile(url), loadFile(url_expect), url );
		}
		else
		{
			callback( loadFile(url), url );
		}
	});
}



function shell(args, callback)
{
	args = ["../bin/smil2css"].concat(args);
	
	child_process.execFile("node", args, {cwd:__dirname}, callback);
}



module.exports =
{
	loadFile:  loadFile,
	loadFiles: loadFiles,
	shell:     shell
};
