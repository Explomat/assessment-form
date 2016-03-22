var utils = {

	decodeHtml: function(str) {
	 	var outStr = str.replace(/&#(\d+);/g, function(match, dec) {
			return String.fromCharCode(dec);
		});
		return outStr;
	},
	
	strBoolToBool: function (boolStr) {
		if (boolStr === undefined || boolStr === null) return false;
		return (boolStr === '0'|| boolStr === 'false') ? false : true;
	},

	getUrlParams: function(url, param){
		if (!url) return null;

		var vars = {};
	    url.replace( 
			/[?&]+([^=&]+)=?([^&]*)?/gi,
			function( m, key, value ) {
				vars[key] = value !== undefined ? value : '';
			}
	    );

	    if (param) return vars[param];
	    return vars;
	}
}

window.utils = utils;
module.exports = utils;