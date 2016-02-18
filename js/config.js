var serverId = '6251548875239611649';
var routerId = '6251547620930508696';
var customBaseUrl = '/custom_web_template.html';

module.exports = {

	url: {
		defaultPath: customBaseUrl.concat('?object_id=').concat(routerId).concat('&server_id='.concat(serverId)),
		createPath: function(obj){
			var strParams = "";
			for (key in obj){
				strParams += '&' + key + '=' + obj[key];
			}
			return this.defaultPath + strParams;
		}
	},
	
	setServerId: function(_serverId){
		serverId = _serverId;
	},

	setRouterId: function(_routerId){
		routerId = _routerId;
	},

	setCustomBaseUrl: function(_customBaseUrl){
		customBaseUrl = _customBaseUrl;
	},

	setProductionMode: function () {
		process.env.NODE_ENV = 'production';
	}
}