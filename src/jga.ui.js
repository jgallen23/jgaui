jga.ui.TextBoxHint = function(textboxSelector, hint) {
	var self = this;
	this.isPassword = false;
	this.$element = $(textboxSelector);
	if (this.$element.attr("type").toLowerCase() == "password") { 
		this.isPassword = true;
		this.$textInput = $('<input type="text"/>');
		this.$element.after(this.$textInput);
		this.$textInput.bind("focus", function() {
			self.hideHint();
		});
	} else {
		this.$element.bind("focus", function() {
			if ($(this).val() == self.hint) {
				self.hideHint();
			}
		});
	}
	this.hint = hint;
	if (this.$element.val() == "" || this.$element.val() == hint)
		this.showHint();

	this.$element.bind("blur", function() {
		if ($(this).val() == "") {
			self.showHint();
		}
	});


};
jga.ui.TextBoxHint.methods({
	showHint: function() {
		if (this.isPassword) {
			this.$element.hide();
			this.$textInput.
				addClass("Hint").
				val(this.hint).
				show();
		}
		this.$element.
			addClass("Hint").
			val(this.hint);
	},
	hideHint: function() {
		if (this.isPassword) {
			this.$element.show();
			this.$textInput.hide();
			this.$element.focus();
		}
		this.$element.
			removeClass("Hint").
			val('');
	}
});


(function($){
  var templateCache = {};
  $.fn.template = function tmpl(template, data){
    var fn = !/\W/.test(template) ?
      templateCache[template] = templateCache[template] ||
        tmpl(document.getElementById(template).innerHTML) :
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        template
          .replace(/[\r\t\n]/g, "")
          .split("{{").join("\t")
          .replace(/((^|}})[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)}}/g, "',$1,'")
          .split("\t").join("');")
          .split("}}").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    return data ? this.html(fn( data )) : fn;
  };
})(jQuery);

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

		var isPassword = function() {
			if (this.attr("type").toLowerCase() == "password")
				return true;
			else
				return false;
		};

		return this.each(function() {
			var $this = $(this);
			
			$this.bind("focus", function() {
				if ($this.val() == hint)
					hideHint.call($this)
			});
			$this.bind("blur", function() {
				if ($this.val() == "") 
					showHint.call($this);
			});

			showHint.call($this);
		});
	};
	$.fn.textboxHint.defaults = {
		hintClass: 'hint'
	}
})(jQuery);


(function($) {
		
	$.fn.inlineEdit = function(options) {
		
		return this.each(function() {
			var $this = $(this);

			$this.bind("click", function() {
				var $txt = $('<input type="text"/>');
				$this
					.hide()
					.after($txt)
				$txt	
					.attr("name", $this.attr("id"))
					.val($this.text())
					.focus()
					.bind("blur", function() {
						$txt.hide();
						var span = $txt.prev();
						span.show().html($txt.val());
					});
			});
		});
		
	}
})(jQuery);
