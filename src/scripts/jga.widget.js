(function($) {
	$.jgawidget = function(name, prototype) {
		var namespace = name.split(".")[0];
		name = name.split(".")[1];
		// create plugin method
		$.fn[name] = function(options) {
			var isMethodCall = (typeof options == 'string'),
				args = Array.prototype.slice.call(arguments, 1);
			// prevent calls to internal methods
			if (isMethodCall && options.substring(0, 1) == '_') {
				return this;
			}
			// handle initialization and non-getter methods
			return this.each(function() {
				var instance = $.data(this, name);
				// constructor
				(!instance && !isMethodCall &&
					$.data(this, name, new $[namespace][name](this, options))._init());
				// method call
				(instance && isMethodCall && $.isFunction(instance[options]) &&
					instance[options].apply(instance, args));
			});
		};
		// create widget constructor
		$[namespace] = $[namespace] || {};
		$[namespace][name] = function(element, options) {
			var self = this;
			this.namespace = namespace;
			this.widgetName = name;
			this.widgetEventPrefix = $[namespace][name].eventPrefix || name;
			this.widgetBaseClass = namespace + '-' + name;
			this.options = $.extend({},
				$.jgawidget.defaults,
				$[namespace][name].defaults,
				$.metadata && $.metadata.get(element)[name],
				options);
			this.element = $(element)
				.bind('setData.' + name, function(event, key, value) {
					if (event.target == element) {
						return self._setData(key, value);
					}
				})
				.bind('getData.' + name, function(event, key) {
					if (event.target == element) {
						return self._getData(key);
					}
				})
				.bind('remove', function() {
					return self.destroy();
				});
		};
		// add widget prototype
		$[namespace][name].prototype = $.extend({}, $.jgawidget.prototype, prototype);
		// TODO: merge getter and getterSetter properties from widget prototype
		// and plugin prototype
		$[namespace][name].getterSetter = 'option';
	};
	$.jgawidget.prototype = {
		_init: function() {},
		destroy: function() {
			this.element.removeData(this.widgetName);
		},
		option: function(key, value) {
			var options = key,
				self = this;
			if (typeof key == "string") {
				if (value === undefined) {
					return this._getData(key);
				}
				options = {};
				options[key] = value;
			}
			$.each(options, function(key, value) {
				self._setData(key, value);
			});
		},
		_getData: function(key) {
			return this.options[key];
		},
		_setData: function(key, value) {
			this.options[key] = value;
		},
		_trigger: function(type, event, data) {
			var callback = this.options[type],
				eventName = (type == this.widgetEventPrefix
					? type : this.widgetEventPrefix + type);
			event = $.Event(event);
			event.type = eventName;
			// copy original event properties over to the new event
			// this would happen if we could call $.event.fix instead of $.Event
			// but we don't have a way to force an event to be fixed multiple times
			if (event.originalEvent) {
				for (var i = $.event.props.length, prop; i;) {
					prop = $.event.props[--i];
					event[prop] = event.originalEvent[prop];
				}
			}
			this.element.trigger(event, data);
			return !($.isFunction(callback) && callback.call(this.element[0], event, data) === false
				|| event.isDefaultPrevented());
		}
	};
}(jQuery));
