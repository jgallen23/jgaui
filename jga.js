if (typeof(JGALOCATION) === "undefined")
	JGALOCATION = "";

var jgaWriteScript = function(script) {
	document.write('<script type="text/javascript" src="' + JGALOCATION + "/" + script + '"></script>');
}

jgaWriteScript("jquery-1.3.1.min.js");
jgaWriteScript("jga.core.js");
jgaWriteScript("jga.ui.js");
