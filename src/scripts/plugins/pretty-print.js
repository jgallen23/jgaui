PrettyDate = (function(){

	var getPrettyDate = function(time) {
		var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400);
				
		if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
			return time;
				
		return day_diff == 0 && (
				diff < 60 && "just now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
			day_diff == 1 && "Yesterday" ||
			day_diff < 7 && day_diff + " days ago" ||
			time
	}


	return {
		execute: function() {
			jQuery(".PrettyDate").each(function() {
				var prettyDate = getPrettyDate(jQuery(this).html());
				jQuery(this).html(prettyDate);
			});
		},

		getPrettyDate: function(time) {
			return getPrettyDate(time);
		}
	};
})();