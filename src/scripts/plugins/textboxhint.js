(function($) { 

	$.fn.textboxHint = function(hint, options) {
		var opts = $.extend({}, $.fn.textboxHint.defaults, options);

		var hideHint = function() {
			this
				.removeClass(opts.hintClass)
				.val('');
		};

		var showHint = function() {
			this
				.addClass(opts.hintClass)
				.val(hint);
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
})(jQuery);


