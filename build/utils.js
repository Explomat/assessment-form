var AJAX_TIME_OVER = 100000;

var config = {
	baseUrl: '/custom_web_template.html',
	serverId: '6251548875239611649',
	routerId: '6251547620930508696',
	createPath: function(obj){
		if (!('action_name' in obj)) obj.action_name = '';
		var serverId = this.serverId;
		var routerId = this.routerId;
		var basePath = this.baseUrl.concat('?object_id=').concat(routerId).concat('&server_id='.concat(serverId));

		var strParams = "";
		for (key in obj){
			strParams += '&' + key + '=' + obj[key];
		}
		return basePath + strParams;
	}
}

var Ajax = {

    getXmlHttp: function(){
        var xmlHttp;
        try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (err) { xmlHttp = false; }
        }
        if (!xmlHttp && typeof(XMLHttpRequest) != 'undefined')
            xmlHttp = new XMLHttpRequest();
        return xmlHttp;
    },

    sendRequest: function(url, callBack, isCache, data, isSync, requestType) {

        var xmlHttp = this.getXmlHttp();
        requestType = requestType || 'GET';
        isSync = isSync || true;
        url = isCache === false || !isCache ? encodeURI(url + "&r=" + Math.round(Math.random() * 10000)) : encodeURI(url);

        xmlHttp.open(requestType, url, isSync);
        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4) {
            if (timeout)
                clearTimeout(timeout);

            if(xmlHttp.status == 200 && callBack){
               callBack(xmlHttp.responseText);
            }
            else {
                console.log(xmlHttp.status);
                console.log(xmlHttp.statusText || "Ajax request error");
            }
          }
        };
        xmlHttp.send(data || null);

        if (isSync){
            var timeout = setTimeout( function(){ 
                xmlHttp.abort();
                console.log("Ajax request time over");
            }, AJAX_TIME_OVER);
        }
    
    }
} 

var files = {
	savePdf: function(e){
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);

		var markData = document.getElementById('render-forms').innerHTML;
		var styles = '<style>' + document.getElementById('assessment-form-all-styles').innerHTML + '</style>';
		Ajax.sendRequest(config.createPath({action_name: 'createPdf'}), function(fileName){ 
		    var a = document.createElement('a');
		    a.setAttribute('href', config.createPath({action_name: 'getPdf', file_name: fileName}));
		    document.body.appendChild(a);
		    a.click();
		}, false, styles + markData, true, 'POST');
	},

	saveDoc: function(){

	}
}

function requestPreviewForm(e){
	e.preventDefault();
	var formTypeId = getUrlParams(window.location.href, 'object_id');
	var formId = getUrlParams(window.parent.location.href, 'object_id');
	window.parent.location.href = "/assessment_form/index.html?preview=1&form_id=" + formId + "&form_type_id=" + formTypeId;
}

function getUrlParams(url, param){
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

function sendForm(status) {
	$('input[type="checkbox"]').each(function(){
		var isChecked = $(this).is(':checked');
		var name = $(this).attr('name');
		if (!isChecked) {
			$(this).parent().append('<input type="hidden" name="'+name+'" value="off">');
		}
	});

	var form = document.getElementById('actionForm');
	form.form_id.value = getUrlParams(window.parent.location.href, 'object_id');
	form.action.value = status;
	form.submit(); 
}    
