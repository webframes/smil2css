// doesn't work
function addCDATA(node, str)
{
	/*{'0': 
	   { type: 'style',
	     name: 'style',
	     attribs: { type: 'text/css' },
	     children: 
	      [ { children: 
	           [ { data: '\n\t\tpath,rect\n\t\t{\n\t\t\tfill: #edd154;\n\t\t\tstroke: #3c352d;\n\t\t\tstroke-width: 2;\n\t\t}\n\t',
	               type: 'text' } ],
	          type: 'cdata',
	          next: null,
	          prev: null,
	          parent: [Circular],
	          data: {} } ],
	     next: {…},
	     prev: {…},
	     parent: {…},
	     data: {} },
	   options: { xmlMode: true },
	   length: 1,
	   prevObject: {…}
	
	{ '0': 
	   { type: 'style',
	     name: 'style',
	     attribs: { type: 'text/css' },
	     children: [],
	     next: null,
	     prev: null,
	     parent:*/
	
	node[0].children.push(
	{
		children: [ {type:"text", data:str} ],
		type: "cdata",
		next: null,
		prev: null,
		parent: node,
		data: {}
	});
}