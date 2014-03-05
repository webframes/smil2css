/*
	Find largest id count if any already exist. When parsing a document that's previously
	been processed with smil2css, this avoids classname overlaps.
*/
function findStartingID(styles)
{
	var id = findStartingID2(styles.stylesheet.rules, 0);
	
	return id;
}



function findStartingID2(rules, id)
{
	rules.forEach( function(rule)
	{
		switch (rule.type)
		{
			case "keyframes":
			{
				var smilId = rule.name.match(/^_smil(\d+)$/);
				
				if (smilId)
				{
					smilId = parseInt( smilId[1] );
					
					id = Math.max(id, smilId);
				}
				
				break;
			}
			case "media":
			{
				id = Math.max( id, findStartingID2(rule.rules,id) );
				break;
			}
		}
	});
	
	return id;
}



module.exports = findStartingID;
