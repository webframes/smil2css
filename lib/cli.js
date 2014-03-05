var fs     = require("fs");
var nopter = require("nopter");
var path   = require("path");

var pkg    = require("../package.json");



nopter.config(
{
	name:        pkg.name,
	description: pkg.description,
	version:     pkg.version,
	options:
	{
		compress:
		{
			short: "c",
			info: "Compress SVG output.",
			type: Boolean
		},
		debug:
		{
			short: "d",
			info: "More informative errors.",
			type: Boolean
		},
		force:
		{
			short: "f",
			info: "Ignores warnings. Not recommended.",
			type: Boolean
		},
		help:
		{
			short: ["h","?"],
			info: "Display this help text.",
			type: Boolean
		},
		input:
		{
			info: "The input SVG file.",
			type: path
		},
		output:
		{
			info: "The output SVG file.",
			type: path
		},
		version:
		{
			short: "v",
			info: "Print the smil2css version.",
			type: Boolean
		}
	},
	aliases: ["input", "output"]
});



function cli()
{
	var options = nopter.input();
	//var rawOptions = nopter.inputRaw();
	
	if (options.help || options.version)
	{
		if (options.help)
		{
			console.log( nopter.help() );
			return;
		}
		
		if (options.version)
		{
			console.log(pkg.name+" v"+pkg.version);
			return;
		}
	}
	
	if (options.input && options.output)
	{
		if ( fs.existsSync(options.input) )
		{
			var fileInput = fs.readFileSync(options.input, {encoding:"utf8"});
			
			var result = require("./index").convert(fileInput,
			{
				compress: options.compress,
				force:    options.force
			});
			
			if ( !(result instanceof Error) )
			{
				fs.writeFileSync(options.output, result);
			}
			else
			{
				fail(result, options.debug);
			}
		}
		else
		{
			//fail( new Error('File "'+rawOptions.input+'" does not exist') );
			fail( new Error('File "'+options.input+'" does not exist') );
		}
	}
	else
	{
		fail( new Error("You must specify --input and --output") );
	}
}



function fail(error, debug)
{
	var additional = "Use --help for more options";
	var type = "notice";
	
	if (error.smil2css)
	{
		switch (error.smil2css.type)
		{
			case "incompatible":
			case "invalid":
			{
				type = "fatal";
				break;
			}
			case "warning":
			{
				type = "warn";
				break;
			}
		}
		
		if (!debug)
		{
			additional = "Use --debug for more info";
		}
	}
	
	console.log( nopter.error[type](error, additional) );
	
	if (debug)
	{
		var element = error.smil2css.element;
		var wiki    = error.smil2css.wiki;
		
		if (element || wiki)
		{
			if (element) console.log( "Element: "+element );
			if (wiki)    console.log( "Wiki: "+wiki );
		}
		else
		{
			console.log("No debug information available.");
		}
	}
	
	process.exit(1);
}



module.exports = cli;
