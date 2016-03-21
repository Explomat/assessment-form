var Ajax = require('./Ajax');
var config = require('./config');

var forms = {

	savePdf: function(e){
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);

		var markData = document.getElementsByTagName('html').innerHTML;
		Ajax.sendRequest(config.createPath({action_name: 'createPdf'}), function(fileName){ 
		    var a = document.createElement('a');
		    a.setAttribute('href', config.createPath({action_name: 'getPdf', file_name: fileName}));
		    document.body.appendChild(a);
		    a.click();
		}, false, markData, true, 'POST');
	},

	saveDoc: function(){
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);

		var markData = document.getElementsByTagName('html').innerHTML;
		Ajax.sendRequest(config.createPath({action_name: 'createDoc'}), function(fileName){ 
		    var a = document.createElement('a');
		    a.setAttribute('href', config.createPath({action_name: 'getDoc', file_name: fileName}));
		    document.body.appendChild(a);
		    a.click();
		}, false, markData, true, 'POST');
	},

	requestPreviewForm: function(e){
		e.preventDefault();
		var formTypeId = utils.getUrlParams(window.location.href, 'object_id');
		var formId = utils.getUrlParams(window.parent.location.href, 'object_id');
		window.parent.location.href = "/assessment_form/index.html?preview=1&form_id=" + formId + "&form_type_id=" + formTypeId;
	},

	sendForm: function(status) {
		$('input[type="checkbox"]').each(function(){
			var isChecked = $(this).is(':checked');
			var name = $(this).attr('name');
			if (!isChecked) {
				$(this).parent().append('<input type="hidden" name="'+name+'" value="off">');
			}
		});

		var form = document.getElementById('actionForm');
		form.form_id.value = utils.getUrlParams(window.parent.location.href, 'object_id');
		form.action.value = status;
		form.submit(); 
	}
}

window.forms = forms;
module.exports = forms;    

