var cliTable = require("cli-table");
var colors = require("colors");
var fs = require("fs");
var nopt = require("nopt");
var path = require("path");



var knownOptions =
{
	compress:
	{
		short: "c",
		info: "Compress SVG output.",
		type: Boolean
	},
	help:
	{
		short: ["h","?"],
		info: "Display this help text.",
		type: Boolean
	},
	in:
	{
		info: "The input SVG file.",
		type: path
	},
	out:
	{
		info: "The output SVG file.",
		type: path
	},
	version:
	{
		short: "v",
		info: "Print the grunt version.",
		type: Boolean
	}
};



function displayHelp(parsedOptions, name, description, version)
{
	log(name+": "+description+" (v"+version+")");
	log("");
	log("Usage".underline);
	log(name+" inputfile outputfile [options]");
	log("");
	log("Options".underline);
	
	var table = new cliTable(
	{
		chars:
		{
			"top": "", "top-mid": "", "top-left": "", "top-right": "",
			"bottom": "", "bottom-mid": "", "bottom-left": "", "bottom-right": "",
			"left": "", "left-mid": "", "mid": "", "mid-mid": "",
			"right": "", "right-mid": "", "middle": " "
		}
	});
	
	eachOption( function(option)
	{
		var code = "--"+option;
		
		eachShorthand(option, function(short)
		{
			code += ", -"+short;
		});
		
		table.push([ code, knownOptions[option].info ]);
	});
	
	log( table.toString() );
	log("");
}



function eachOption(callback)
{
	Object.keys(knownOptions).forEach(callback);
}



function eachShorthand(option, callback)
{
	var short = knownOptions[option].short;
	
	if (short)
	{
		if ( Array.isArray(short) )
		{
			short.forEach(callback);
		}
		else
		{
			callback(short);
		}
	}
}



function fail(message)
{
	log( ("Error: "+message).red );
	
	process.exit(1);
}



function getRawInput(option, parsedOptions)
{
	var input;
	
	// Find the exact input specified by the user, for clarity
	parsedOptions.argv.original.every( function(parsedOption, i)
	{
		if (parsedOption == option)
		{
			input = parsedOptions.argv.original[i+1];
			
			return false;
		}
		
		return true;
	});
	
	return input;
}



function log(message)
{
	console.log(message);
}



function parseOptions()
{
	var noptOptions = {};
	var noptShortHands = {};
	
	eachOption( function(option)
	{
		noptOptions[option] = knownOptions[option].type;
		
		eachShorthand(option, function(short)
		{
			noptShortHands[short] = "--" + option;
		});
	});

	return nopt(noptOptions, noptShortHands, process.argv);
}



module.exports = function()
{
	var parsedOptions = parseOptions();
	
	if (parsedOptions.help || parsedOptions.version)
	{
		var pkg = require("../package");
		
		if (parsedOptions.help)
		{
			displayHelp(parsedOptions, pkg.name, pkg.description, pkg.version);
			return;
		}
		
		if (parsedOptions.version)
		{
			log(pkg.name+" v"+pkg.version);
			return;
		}
	}
	
	if (parsedOptions.in && parsedOptions.out)
	{
		if ( fs.existsSync(parsedOptions.in) )
		{
			var fileIn = fs.readFileSync(parsedOptions.in, {encoding:"utf8"});
			
			var result = require("./index").convert(fileIn, {compress:parsedOptions.compress});
			
			if (result)
			{
				fs.writeFileSync(parsedOptions.out, result);
			}
			else
			{
				fail('File "'+getRawInput("--in",parsedOptions)+'" is not SVG');
			}
		}
		else
		{
			fail('File "'+getRawInput("--in",parsedOptions)+'" does not exist');
		}
	}
	else
	{
		fail("You must specify --in and --out");
	}
}
