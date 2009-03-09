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

Function.prototype.methods = function(obj) {
	for (var o in obj) {
		this.prototype[o] = obj[o];
	}
};


jga.core.getOptions = function(options, defaults) {
	if (!options)
		return defaults;
	else {
		for ( var opt in defaults ) {
			if ( options[ opt ] != null && options[ opt ] != undefined && options[ opt ] != 'undefined' ){
				defaults[ opt ] = options[ opt ];
			}
		}
		return defaults;
	}
};

jga.core.inherit = function(subClass, superClass) {
	var F = function() {};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;

	subClass.superclass = superClass.prototype;
	if (superClass.prototype.constructor == Object.prototype.constructor) {
		superClass.prototype.constructor = superClass;
	}
};

jga.core.EventManager = function() {
	this._events = {}
}
jga.core.EventManager.methods({
	addEventListener: function(eventName, callback) {
		if (!this._events[eventName])
			this._events[eventName] = [];
		this._events[eventName].push(callback);
	},
	removeEventListener: function(eventName, callback) {
		//Todo
	},
	dispatchEvent: function(eventName, sender, data) { 
		log(sender.name + " event " + eventName);
		var event = this._events[eventName];
		var success = true;
		if (event) {
			for (var i = 0; i < event.length; i++) {
				var s = event[i](sender, data);
				if (!s)
					success = false;
			}
		}
		return success;
	}
});

jga.core.Response = function(status, data) {
	this.status = status;
	this.data = data;
}
jga.core.Response.methods({
});

jga.core.Control = function(selector, options, defaults) {
	this.$node;
	this._events = new jga.core.EventManager();
	this.options = this._getOptions(options, defaults);
	var self = this;
	self.dispatchEvent("init", self);
	$(function() {
		self.$node = $(selector);
		if (self.$node.length == 0)
			throw "Node not found";
		self.dispatchEvent("load", self);
	});
	$(window).unload(function() {
		self.dispatchEvent("unload", self);
	});
}
jga.core.Control.methods({
	addEventListener: function(event, callback) {
		this._events.addEventListener(event, callback);
	},
	removeEventListener: function(event) {
		this._events.removeEventListener(event, callback);
	},
	_bindEvents: function(events) {
		log("bind");
		for (var event in events) {
			log(event);
			this.addEventListener(event, events[event]);
		}
	},
	_getOptions: function(options, defaults) {
		var o = jga.core.getOptions(options, defaults);
		if (options && options.events) {
			this._bindEvents(options.events);
		}
		return o;
	},
	dispatchEvent: function(event, data) {
		this._events.dispatchEvent(event, this, data);
	},
	focus: function() {
		var firstInput = this.$node.find(":input").eq(0);
		if (firstInput)
			firstInput.focus();
	}
});
