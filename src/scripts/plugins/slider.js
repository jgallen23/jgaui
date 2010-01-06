(function($) {
	$.ux.behavior('Slider', {
		initialize: function() {
			this._currentPage = 1;
			this.prevButton = $(".prev", this.element).css("visibility", "hidden");
			this.nextButton = $(".next", this.element);
			this.updateCounts();
		},
		onclick: $.delegate({
			'.prev': function(element, event) {
				this.prev();
			},
			'.next': function(element, event) {
				this.next();
			}
		}),
		prev: function() {
			if (this._currentPage > 1)
				this._currentPage--;

			this._checkNav();
			this.nextButton.css("visibility", "visible");
			this.slide();
			this.dispatchEvent("Prev");
			return false;
		},
		next: function() { 
			if (this._currentPage < this._totalPages)
				this._currentPage++;

			this._checkNav();
			this.prevButton.css("visibility", "visible");
			this.slide();
			this.dispatchEvent("Next");
			return false;
		},
		_checkNav: function() {
			if (this._currentPage == 1) {
				this.prevButton.css("visibility", "hidden");
			} else {
				this.prevButton.css("visibility", "visible");
			}
			if (this._totalPages <= (this._currentPage)) {
				this.nextButton.css("visibility", "hidden");
			} else {
				this.nextButton.css("visibility", "visible");
			}
		},
		slide: function() {
			$("ul", this.element).animate({"left": -(this._currentPage-1)*(this.options.elementWidth * this.options.numberPerPage)});
		},
		updateCounts: function() {
			this._totalItems = $("li", this.element).length;
			this._totalPages = Math.ceil(this._totalItems/this.options.numberPerPage);
			this._checkNav();
			this.dispatchEvent("UpdateCounts");
		}
	}, {
		elementWidth: 100,
		numberPerPage: 1
	});
})(jQuery);
