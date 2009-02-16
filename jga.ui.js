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

	this.showHint();

	this.$element.bind("blur", function() {
		if ($(this).val() == "") {
			self.showHint();
		}
	});


};
jga.ui.TextBoxHint.extend({
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

