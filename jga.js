if (typeof(JGALOCATION) === "undefined")
	JGALOCATION = "";

var jgaWriteScript = function(script) {
	document.write('<script type="text/javascript" src="' + JGALOCATION + "/" + script + '"></script>');
}

jgaWriteScript("jga.core.js");
jgaWriteScript("jga.ui.js");
