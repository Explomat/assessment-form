var Ajax = require('./Ajax');
var config = require('../config');
var utils = require('./utils');

var forms = {

	showSpinner: function () {
		$('.overlay-loading').addClass('overlay-loading--show');
	},

	removeSpinner: function(){
		$('.overlay-loading').removeClass('overlay-loading--show');
	},

	downloadFile: function(actionName, fileName){
		this.showSpinner();
		var a = $('<a href=' + config.url.createPath({action_name: actionName, file_name: fileName}) + '></a>'); 
		$(document.body).append(a);
	    a[0].click();
	    this.removeSpinner();
	},

	savePdf: function(e){
		var self = this;
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);
		var markData = document.getElementsByTagName('html')[0].outerHTML;

		Ajax.sendRequest(config.url.createPath({action_name: 'createPdf'}), function(fileName){
			self.downloadFile('getPdf', fileName);
		}, false, markData, true, 'POST');
	},

	saveDoc: function(){
		var self = this;
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);
		var markData = document.getElementsByTagName('html')[0].outerHTML;
		Ajax.sendRequest(config.url.createPath({action_name: 'createDoc'}), function(fileName){
			self.downloadFile('getDoc', fileName); 
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

