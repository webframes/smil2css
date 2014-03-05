var css = require("css");



function parseStyles(styles)
{
	return css.parse(styles);
}



function stringifyStyles(styles, instance)
{
	return css.stringify(styles, {compress:instance.options.compress});
}



module.exports =
{
	parse: parseStyles,
	stringify: stringifyStyles
};
