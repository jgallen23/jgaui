(function($) {
	$.ux.behavior("SitelifeWidget", {
		initialize: function() {
			this.getRequests();	
		},
		getRequests: function() {
			var requests = this.options.getRequests();
			if (requests.length == 0)
				return;
			var self = this;
			var rb = new RequestBatch();
			for (var i = 0; i < requests.length; i++) {
				rb.AddToRequest(requests[i]);
			}
			rb.BeginRequest(this.options.serverUrl, function(response) { self.populate(response); });
		},
		populate: function(data) {
			if (this.options.debug)
				console.log(data);
			this.element.template(this.options.templateId, data);
			this.dispatchEvent("PostRender", data)
		}
	}, {
		debug: false,
		serverUrl: "",
		getRequests: function() { return []; },
		templateId: ""
	})
})(jQuery);


