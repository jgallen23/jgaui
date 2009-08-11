$.ux.behavior("PrettyDate", {
	initialize: function() {
		var prettyDate = this.getPrettyDate(this.element.html());
		this.element.html(prettyDate);
	},
	getPastPrettyDate: function(day_diff, diff) {
		return day_diff == 0 && (
				diff < 60 && "just now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
			day_diff == 1 && "Yesterday" ||
			day_diff < 7 && day_diff + " days ago" ||
			false
	},
	getFuturePrettyDate: function(day_diff, diff) {
		return day_diff == 0 && (
				diff < 60 && "in a minute" ||
				diff < 360 && "in a few minutes" ||
				diff < 3600 && "in " + Math.floor( diff / 60 ) + " minutes" ||
				diff < 7200 && "in 1 hour" ||
				diff < 86400 && "in " + Math.floor( diff / 3600 ) + " hours") ||
			day_diff == 1 && "Tomorrow" ||
			day_diff < 7 && "in " + day_diff + " days" ||
			false
	},
	getPrettyDate: function(time) {
		var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(Math.abs(diff) / 86400);				
		console.log(time, day_diff, diff);
		if (isNaN(day_diff))
			return time;
		else if ( diff > 0)
			return this.getPastPrettyDate(day_diff, diff) || time;
		else if ( diff < 0) 
			return this.getFuturePrettyDate(day_diff, -diff) || time;
	}
});

(function($) {
	
	$.prettyDate  = function(time) {
		var getPastPrettyDate = function(day_diff, diff) {
			return day_diff == 0 && (
					diff < 60 && "just now" ||
					diff < 120 && "1 minute ago" ||
					diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
					diff < 7200 && "1 hour ago" ||
					diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
				day_diff == 1 && "Yesterday" ||
				day_diff < 7 && day_diff + " days ago" ||
				false
		};
		var getFuturePrettyDate = function(day_diff, diff) {
			return day_diff == 0 && (
					diff < 60 && "in a minute" ||
					diff < 360 && "in a few minutes" ||
					diff < 3600 && "in " + Math.floor( diff / 60 ) + " minutes" ||
					diff < 7200 && "in 1 hour" ||
					diff < 86400 && "in " + Math.floor( diff / 3600 ) + " hours") ||
				day_diff == 1 && "Tomorrow" ||
				day_diff < 7 && "in " + day_diff + " days" ||
				false
		};

		var failOver = function(time) {
			if (time.indexOf("T") == -1) {
				var d = new Date(parseInt(time));
				return (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
			} else 
				return time;
		};
		var date = (time.indexOf("T") == -1)?new Date(parseInt(time)):new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," "));
		var diff = (((new Date()).getTime() - date.getTime()) / 1000);
		var day_diff = Math.floor(Math.abs(diff) / 86400);	
		/*console.log(time, date.toString(), day_diff, diff);*/
		if (isNaN(day_diff))
			return failOver(time);
		else if ( diff > 0)
			return getPastPrettyDate(day_diff, diff) || failOver(time);
		else if ( diff < 0) 
			return getFuturePrettyDate(day_diff, -diff) || failOver(time);
	}

	$.fn.prettyDate = function(time) {

		return this.each(function() {
			var $this = $(this);
			var prettyDate = $.prettyDate($this.html());
			$this.html(prettyDate);
		});
	}
})(jQuery);
