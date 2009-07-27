if (!window.console || !console.firebug)
{
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

    window.console = {};
    for (var i = 0; i < names.length; ++i)
        window.console[names[i]] = function() {}
}

var jga = {}
jga.core = {}
jga.ui = {}
jga.objects = {}

var DEBUG = true;

var log = function() {
	if (DEBUG) {
		for (var i = 0; i < arguments.length; i++) {
			console.log(arguments[i]);
		}
	}
};

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '')
}

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

Array.prototype.indexOf = function(obj) {
	for (var i = 0; i < this.length; i++) {
		if (obj == this[i])
			return i;
	}
	return -1;
};

Array.prototype.each = function(f) {
	for (var i = 0; i < this.length; i++) {
		f(this[i]);
	}
};

Array.prototype.find = function(f) {
	for (var i = 0; i < this.length; i++) {
		if (f(this[i]))
			return this[i];
	}
};

Array.prototype.filter = function(f) {
	var filter = [];
	for (var i = 0; i < this.length; i++) {
		if (f(this[i]))
			filter.push(this[i]);
	}
	return filter;
};

