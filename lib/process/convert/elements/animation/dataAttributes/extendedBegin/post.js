/*
	See test/special/css-delay/looping-multiple.svg
	See test/special/css-delay/repeatCount-loop-with-syncbases.svg
*/
function delay(data, definedLoop)
{
	var preDelay = data.sequence[0][ definedLoop ? "begin" : "beginStatic" ];
	
	data.sequence.forEach( function(value, i)
	{
		data.sequence[i].begin = value.begin - preDelay;
	});
	
	return preDelay;
}



function sort(data)
{
	data.sequence.sort( function(a, b)
	{
		if (a.begin > b.begin) return 1;
		if (a.begin < b.begin) return -1;
		
		return 0;
	});
}



module.exports =
{
	delay: delay,
	sort: sort
};
