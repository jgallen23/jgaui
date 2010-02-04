(function($) {
	$.fn.imageContainer = function(options) {
		var opts = $.extend($.fn.imageContainer.defaults, options);

		var getOffsets = function(w, h) {
			if (opts.align == "center") {
				return [
					(opts.w - w)/2,
					(opts.h - h)/2
				];
			} else if (opts.align == "bottom") {
				return [
					(opts.w - w)/2,
					(opts.h - h)
				];
			} else if (opts.align == "top") {
				return [
					(opts.w - w)/2,
					0
				];
			}
		}

		var resize = function() {
			var $img = $(this);
			
			if (this.width >= this.height && this.width > opts.w) {
				this.width = opts.w;
			} else if (this.height > this.width && this.height > opts.h) {
				this.height = opts.h;
			} else if (this.height == this.width) {
				if (opts.h >= opts.w && this.height > opts.h) 
					this.height = opts.h;
				else if (this.width > opts.w)
					this.width = opts.w;
			}
			var offsets = getOffsets(this.width, this.height);
			debug("ImageContainer Offsets", offsets);
			$img.css({ marginTop: offsets[1], marginLeft: offsets[0] });
		}
		
		var debug = function() {
			if (opts.debug)
				console.log.apply(this, arguments);
		}

		return this.each(function() {
			var $this = $(this);
			if (opts.useParentContainer) {
				var $container = $this.parent();
				opts.h = $container.height();
				opts.w = $container.width();
			} else {
				var $container = $this.wrap("<span/>").parent();
				$container.css({ height: opts.h, width: opts.w, display: 'block' })
			}
			if ($this.hasClass("jsImageContainerAlignTop"))
				opts.align = "top";
			else if ($this.hasClass("jsImageContainerAlignCenter"))
				opts.align = "center";
			else if ($this.hasClass("jsImageContainerAlignBottom"))
				opts.align = "bottom";
			debug("ImageContainer", $this, $container, opts.w, opts.h, opts.align);
			if ($this.width() == 0) {
				$this.bind("load", resize);
			} else {
				resize.call(this);
			}
		});
	}

	$.fn.imageContainer.defaults = {
		h: 200,
		w: 200,
		align: 'top',
		useParentContainer: false,
		debug: false
	}

	$.fn.imageContainer.autoDefaults = {
		align: 'top',
		useParentContainer: true,
		autoRun: true
	}
	$(function() {
		if ($.fn.imageContainer.autoDefaults.autoRun) {
			$("img.jsImageContainer").imageContainer($.fn.imageContainer.autoDefaults);
		}
	});
})(jQuery);
