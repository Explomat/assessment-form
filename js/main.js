var config = require('./config');
var userTemplate = require('./templates/userTemplate');
var errorTemplate = require('./templates/errorTemplate');

var firstTable = require('./templates/tables/firstTable');
var secondTable = require('./templates/tables/secondTable');
var thirdTable = require('./templates/tables/thirdTable');
var fourthTable = require('./templates/tables/fourthTable');
var fifthTable = require('./templates/tables/fifthTable');
var sixthTable = require('./templates/tables/sixthTable');
var seventhTable = require('./templates/tables/seventhTable');
var eighthTable = require('./templates/tables/eighthTable');
var ninthTable = require('./templates/tables/ninthTable');
var tenthTable = require('./templates/tables/tenthTable');
var eleventhTable = require('./templates/tables/eleventhTable');
var twelfthTable = require('./templates/tables/twelfthTable');
var thirteenthTable = require('./templates/tables/thirteenthTable');
var fourteenthTable = require('./templates/tables/fourteenthTable');
var fifthteenthTable = require('./templates/tables/fifthteenthTable');


var buttonsTemplate = require('./templates/buttonsTemplate');
var ajax = require('./utils/Ajax');
var utils = require('./utils/utils');
var jsonParse = require('./utils/jsonParse');


window.onload = function(){
	start();
}

function isAccess(user){
	user = user || {};
	return user.access === true;
}

function createDatePickers() {
	$('.firstTable__date').each(function(){
		$(this).datepicker({dateFormat: "dd.mm.yy"});
	})
}

function createBaseHtml(formId, formTypeId, callBack) {
	ajax.sendRequest(config.url.createPath({action_name: 'getData', form_id: formId, form_type_id: formTypeId}), function (_data) {
		var data = null;
		var baseHtml = '';
		var buttonsHtml = '';

		try { data = jsonParse(_data); }
		catch(e) { 
			console.log(e); 
			return;
		}

		if (!isAccess(data.user)) {
			baseHtml = errorTemplate();
		}
		else {
			baseHtml = userTemplate(data.user) + 
				firstTable(data.firstTable) + 
				secondTable(data.secondTable) +
				thirdTable(data.thirdTable) +
				fourthTable(data.fourthTable) +
				fifthTable(data.fifthTable) +
				sixthTable(data.sixthTable) +
				seventhTable(data.seventhTable) +
				eighthTable(data.eighthTable) +
				ninthTable(data.ninthTable) +
				tenthTable(data.tenthTable) + 		 
				eleventhTable(data.eleventhTable) + 
				twelfthTable(data.twelfthTable) +
				thirteenthTable(data.thirteenthTable) +
				fourteenthTable(data.fourteenthTable) +
				fifthteenthTable(data.fifthteenthTable);

			buttonsHtml = buttonsTemplate(data.user);
		}

		document.getElementById('render-forms').innerHTML = baseHtml;
		document.getElementById('render-buttons').innerHTML = buttonsHtml;
		if (callBack) callBack();
	});
}

function start() {
	var formTypeId = utils.getUrlParams(window.location.href, 'object_id');
	var formId = utils.getUrlParams(window.parent.location.href, 'object_id');
	createBaseHtml(formId, formTypeId, createDatePickers);
}



