var config = require('./config');
var userTemplate = require('./templates/userTemplate');

var firstTable = require('./templates/tables/firstTable');
var secondTable = require('./templates/tables/secondTable');
var thirdTable = require('./templates/tables/thirdTable');
var fourthTable = require('./templates/tables/fourthTable');
var fifthTable = require('./templates/tables/fifthTable');
var sixthTable = require('./templates/tables/sixthTable');
var seventhTable = require('./templates/tables/seventhTable');
var eighthTabel = require('./templates/tables/eighthTabel');
var ninthTable = require('./templates/tables/ninthTable');
var tenthTable = require('./templates/tables/tenthTable');
var eleventhTabel = require('./templates/tables/eleventhTabel');
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

function createDatePickers() {
	$('.firstTable__date').each(function(){
		$(this).datepicker({dateFormat: "dd.mm.yy"});
	})
}

function createBaseHtml(formId, formTypeId, callBack) {
	ajax.sendRequest(config.url.createPath({action_name: 'getData', form_id: formId, form_type_id: formTypeId}), function (data) {
		var parseData = null;
		try { parseData = jsonParse(data); }
		catch(e) { 
			console.log(e); 
			return;
		}

		var baseHtml = userTemplate(parseData.user) + 
				firstTable(parseData.firstTable) + 
				secondTable(parseData.secondTable) +
				thirdTable(parseData.thirdTable) +
				fourthTable(parseData.fourthTable) +
				fifthTable(parseData.fifthTable) +
				sixthTable(parseData.sixthTable) +
				seventhTable(parseData.seventhTable) +
				eighthTabel(parseData.eighthTabel) +
				ninthTable(parseData.ninthTable) +
				tenthTable(parseData.tenthTable) +
				eleventhTabel(parseData.eleventhTabel) +
				twelfthTable(parseData.twelfthTable) +
				thirteenthTable(parseData.thirteenthTable) +
				fourteenthTable(parseData.fourteenthTable) +
				fifthteenthTable(parseData.fifthteenthTable);

		var buttonsHtml = buttonsTemplate(parseData.user);

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



