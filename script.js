/**
* @param { "blue"| "green"| "grey"| "red"| "yellow"| "violet"| "white"} color_name
* @param {string} content
* @returns string
*/
function color(color_name, content) {
    var colors = {
        blue:   '#55f',
        green:  '#4d4',
        grey:   '#999',
        red:    '#A00',
        yellow: '#FF5',
        violet: '#a320ce',
        white:  '#fff'
    }
    if (colors[color_name]) {
        return '[[;' + colors[color_name] + ';]' + content + ']';
    } else {
        return content;
    }
}
/**
* @type {string[]}
*/
const itemtypes = [
	"0001_itemtype",
	"0002_itemtype",
	"0003_itemtype",
	"0004_itemtype",
	"0005_itemtype",
	"0006_itemtype",
	"0007_itemtype",
	"0008_itemtype",
	"0009_itemtype",
	"0010_itemtype",
	"0011_itemtype",
	"0012_itemtype",
	"0013_itemtype",
	"0014_itemtype",
];

const commands = {
	ls: function(){
		var args = Array.from(arguments);
		var options = $.terminal.parse_options(args);
		return new Promise(function(resolve) {
			if(options["_"].length == 0){
				term.echo(itemtypes.join("\n"));
				resolve()
				return;
			}
			term.echo(itemtypes.filter((it)=>it.includes(options["_"])).join("\n"));
			resolve()
		})
	},
	head: function()  {
		// head -n <number> file
		// head file
		// cat file | head 
		// cat file | head -n 3 
		var args = Array.from(arguments);
		var options = $.terminal.parse_options(args);
		term.echo(JSON.stringify(options, null, "  "));
		if(options["_"].length == 0){
			return term.read("").then((stdin) => {
				if(typeof stdin !== "string"){
					return;
				}
				term.echo(stdin.split("\n").slice(0,10).join("\n"));
				return;
			})
		}
		if( !('n' in options)){
			term.echo(itemtypes.slice(0,10).join("\n"));
			return;
		}
		if(typeof(options.n) === "number"
			&& Number.isInteger(options.n)){
			const n = Number.parseInt(options.n);
			term.echo(itemtypes.slice(0, n ).join("\n"));
		}

	}
};
const settings = {
	checkArity: false,
	greetings: color("red", "aras-hacker"),
	prompt: color("green", "$> "),
	pipe: true,
};
const term = $("body").terminal(commands, settings);

term.exec("ls 1 | head");