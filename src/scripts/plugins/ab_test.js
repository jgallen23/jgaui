function abTester(name, tests) {
	if (dlabs.settings.queryArgs[name] != undefined) {
		tests[parseInt(dlabs.settings.queryArgs[name])]();
	}
	else if (cookies.readCookie(name) != undefined) {
		tests[parseInt(cookies.readCookie(name))]();
	} else {
		var max = 100;
		var rnd = Math.ceil(Math.random()*max);
		var n = max / tests.length; 
		var val = Math.ceil(rnd / n) - 1;	
		cookies.createCookie(name, val, 30);
		tests[val]();
	}
}

