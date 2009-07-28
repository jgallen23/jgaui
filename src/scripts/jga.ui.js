
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
