function trafficTester(name, percentage, callback) {
	if (cookies.readCookie(name) == "1") {
		callback();
	} else if (cookies.readCookie(name) != "0") {
		var rnd = Math.ceil(Math.random()*100);
		var val = 0;
		if (rnd < percentage) {
			val = 1;
			callback();
		}
		cookies.createCookie(name, val, 30);
	}
}
