var inspect = require("util").inspect;



function log(data)
{
	console.log( inspect(data, {colors:true}) );
}



function logAll(data)
{
	console.log( inspect(data, {depth:null, showHidden:true, colors:true}) );
}



function logMore(data)
{
	console.log( inspect(data, {depth:null, colors:true}) );
}



module.exports =
{
	log:     log,
	logAll:  logAll,
	logMore: logMore
};
