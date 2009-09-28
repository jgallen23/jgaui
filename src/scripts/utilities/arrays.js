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
Array.prototype.contains = function(obj) {
	for (var i = 0; i < this.length; i++) {
		if (obj == this[i])
			return true;
	}
};
