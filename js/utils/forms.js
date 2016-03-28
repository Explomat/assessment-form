var Ajax = require('./Ajax');
var config = require('../config');
var utils = require('./utils');

var forms = {

	hideButtons: function(){
		$('#render-preview-buttons').css({display: 'none'});
	},

	showButtons: function(){
		$('#render-preview-buttons').css({display: 'block'});
	},

	showSpinner: function () {
		$('.overlay-loading').addClass('overlay-loading--show');
	},

	removeSpinner: function(){
		$('.overlay-loading').removeClass('overlay-loading--show');
	},

	print: function(){
		this.hideButtons();
		window.print();
		this.showButtons();
	},

	downloadFile: function(actionName, fileName){
		var self = this;
		//this.showSpinner();
		var a = document.createElement('a');
		document.body.appendChild(a);
		a.setAttribute('href', config.url.createPath({action_name: actionName, file_name: fileName}));
		a.style.display = 'none';
		a.click();
		//this.removeSpinner();
	},

	savePdf: function(e){
		var self = this;
		this.hideButtons();
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);
		var markData = document.getElementsByTagName('html')[0].outerHTML;
		this.showButtons();
		Ajax.sendRequest(config.url.createPath({action_name: 'createPdf'}), function(fileName){
			self.downloadFile('getPdf', fileName);
		}, false, markData, true, 'POST');
	},

	saveDoc: function(){
		var self = this;
		this.hideButtons();
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);
		var markData = document.getElementsByTagName('html')[0].outerHTML;
		this.showButtons();
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

