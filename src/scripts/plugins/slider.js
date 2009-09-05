(function($) {
	$.ux.behavior('Slider', {
		initialize: function() {
			this._totalItems = $("li", this.element).length;
			this._totalPages = Math.ceil(this._totalItems/this.options.numberPerPage);
			this._currentPage = 1;
			this.prevButton = $(".prev", this.element).css("visibility", "hidden");
			this.nextButton = $(".next", this.element);
		},
		onclick: $.delegate({
			'.prev': function(element, event) {
				if (this._currentPage > 1)
					this._currentPage--;

				if (this._currentPage == 1) {
					element.css("visibility", "hidden");
				} else {
					element.css("visibility", "visible");
				}
				this.nextButton.css("visibility", "visible");
				this.slide();
				this.dispatchEvent("Prev");
				return false;
			},
			'.next': function(element, event) {
				if (this._currentPage < this._totalPages)
					this._currentPage++;

				if (this._totalPages == (this._currentPage)) {
					element.css("visibility", "hidden");
				} else {
					element.css("visibility", "visible");
				}
				this.prevButton.css("visibility", "visible");
				this.slide();
				this.dispatchEvent("Next");
				return false;
			}
		}),
		slide: function() {
			$("ul", this.element).animate({"left": -(this._currentPage-1)*(this.options.elementWidth * this.options.numberPerPage)});
		}
	}, {
		elementWidth: 100,
		numberPerPage: 1
	});
})(jQuery);
