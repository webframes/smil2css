module.exports = function(grunt)
{
	grunt.initConfig(
	{
		mochaTest:
		{
			"test":
			{
				options:
				{
					bail: true,
					ignoreLeaks: false,
					reporter: "spec",
					require: [ function(){smil2css=require("./lib")}, function(){expect=require("chai").expect} ],
					ui: "bdd"
				},
				src: ["test/*.js"]
			}
		}
	});
	
	
	
	grunt.loadNpmTasks("grunt-mocha-test");
	
	
	
	grunt.registerTask("default", ["mochaTest"]);
	
	
	
};
