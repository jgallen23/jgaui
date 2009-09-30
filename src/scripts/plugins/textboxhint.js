(function($) { 

	$.fn.textboxHint = function(hint, options) {
		var opts = $.extend({}, $.fn.textboxHint.defaults, options);

		var hideHint = function() {
			this
				.removeClass(opts.hintClass)
				.val('');
            if (opts.onHideHint)
                opts.onHideHint.call(this);
		};

		var showHint = function() {
			this
				.addClass(opts.hintClass)
				.val(hint);
            if (opts.onShowHint)
                opts.onShowHint.call(this);
		};

		return this.each(function() {
			var $this = $(this);
			$this.data("textBoxHintValue", hint);
			$this.bind("focus", function() {
				if ($this.val() == hint)
					hideHint.call($this)
			});
			$this.bind("blur", function() {
				if ($this.val() == "") 
					showHint.call($this);
			});
			if ($this.val() == "")
				showHint.call($this);
		});
	};
	$.fn.textboxHint.defaults = {
		hintClass: 'Hint'
	}
	$.fn.isTextValid = function() {
		if (this.data("textBoxHintValue") != this.val() && this.val() != "")
			return true;
		else
			return false;
	}
})(jQuery);


