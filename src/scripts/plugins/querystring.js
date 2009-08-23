var Querystring = function() {

	var parse = function() {
		var qs_url = window.location.search.substring(1);
		var q = qs_url.split("&");
		var qs = {}
		for (var i = 0; i < q.length; i++) {
			var kv = q[i].split("=");
			qs[kv[0]] = kv[1];
		}
		return qs;
	}
	
	return {
		get: function(key, defaultValue) {
			var qs = parse();
			return qs[key] || defaultValue;
		}
	}
}();
