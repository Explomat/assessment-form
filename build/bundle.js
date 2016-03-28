(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){
var serverId = '6251548875239611649';
var routerId = '6251547620930508696';
var customBaseUrl = '/custom_web_template.html';

var config = {

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

window.config = config;
module.exports = config;
}).call(this,require("VCmEsw"))
},{"VCmEsw":27}],2:[function(require,module,exports){
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
var buttonsPreviewTemplate = require('./templates/buttonsPreviewTemplate')
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

function changeTextAreaHeight(){
	$('textarea').each(function(){
		var textArea = $(this);
		if (textArea.text() === '') return;

		textArea.scrollTop(textArea.get(0).scrollHeight);

		var scrollHeight = textArea.scrollTop() + textArea.height() + 14; //14 - line-height

		textArea.scrollTop(0);
		textArea.height(scrollHeight);
		/*var div = $('<div/>').text(textArea.text())
		div.width(textArea.width());
		$(document.body).append(div);
		textArea.height(Number(div.height()) + 25);
		div.remove();*/
	});
}

function blockInputs(){
	$('input, textarea').each(function(){
		$(this).attr({disabled: true});
	});
}

function createBaseHtml(formId, formTypeId, callBack) {
	ajax.sendRequest(config.url.createPath({action_name: 'getData', form_id: formId, form_type_id: formTypeId}), function (_data) {
		var isPreview = utils.getUrlParams(window.location.href, 'preview');
		isPreview = isPreview ? jsonParse(isPreview) : false;

		var data = null;
		var baseHtml = '';
		var buttonsHtml = '';

		try { data = jsonParse(utils.decodeHtml(_data)); }
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

			if (isPreview){
				buttonsHtml = buttonsPreviewTemplate();
				document.getElementById('render-preview-buttons').innerHTML = buttonsHtml;
			}
			else{
				buttonsHtml = buttonsTemplate(data.user);
				document.getElementById('render-buttons').innerHTML = buttonsHtml;
			}
		}
		document.getElementById('render-forms').innerHTML = baseHtml;
		if (isPreview){
			blockInputs();
			changeTextAreaHeight();
		}
		
		if (callBack) callBack();
	});
}

function start() {
	var formTypeId = utils.getUrlParams(window.location.href, 'object_id') || utils.getUrlParams(window.location.href, 'form_type_id');
	var formId = utils.getUrlParams(window.parent.location.href, 'object_id') ||  utils.getUrlParams(window.location.href, 'form_id');
	createBaseHtml(formId, formTypeId, createDatePickers);
}




},{"./config":1,"./templates/buttonsPreviewTemplate":3,"./templates/buttonsTemplate":4,"./templates/errorTemplate":5,"./templates/tables/eighthTable":6,"./templates/tables/eleventhTable":7,"./templates/tables/fifthTable":8,"./templates/tables/fifthteenthTable":9,"./templates/tables/firstTable":10,"./templates/tables/fourteenthTable":11,"./templates/tables/fourthTable":12,"./templates/tables/ninthTable":13,"./templates/tables/secondTable":14,"./templates/tables/seventhTable":15,"./templates/tables/sixthTable":16,"./templates/tables/tenthTable":17,"./templates/tables/thirdTable":18,"./templates/tables/thirteenthTable":19,"./templates/tables/twelfthTable":20,"./templates/userTemplate":21,"./utils/Ajax":22,"./utils/jsonParse":24,"./utils/utils":26}],3:[function(require,module,exports){
var utils = require('../utils/utils');
var forms = require('../utils/forms');

module.exports = function (user) {
	return (
		"<button onclick=window.forms.savePdf(event) class='inputButton'>Сохранить в .PDF</button>\n\
		 <button onclick=window.forms.saveDoc(event) class='inputButton'>Сохранить в .DOC</button>\n\
		 <button onclick=window.forms.print() class='inputButton'>Печать</button>"
	);
}
},{"../utils/forms":23,"../utils/utils":26}],4:[function(require,module,exports){
var utils = require('../utils/utils');
var forms = require('../utils/forms');

module.exports = function (user) {
	user = user || {};
	user.isBoss = user.isBoss || false;
	user.formStatus = user.formStatus || '';

	if (utils.strBoolToBool(user.isBoss)) {
		if (user.formStatus === 'declined' || user.formStatus === 'confirmed') {
			return "<a href='#' onclick=window.forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>";
		}
		
		return (
			"<input type='button' onclick=window.forms.sendForm('save') value='Сохранить' class='inputButton' />\n\
			<input type='button' onclick=window.forms.sendForm('declined') value='Отклонить' class='inputButton'/>\n\
			<input type='button' onclick=window.forms.sendForm('confirmed') value='Утвердить' class='inputButton'/>\n\
			<a href='#' onclick=window.forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>"
		);
	}
	else {
		if (user.formStatus === 'active') {
			return (
				"<input type='button' onclick=window.forms.sendForm('save') value='Сохранить' class='inputButton'/> \n\
				<input type='button' onclick=window.forms.sendForm('send_request') value='Отправить на подтверждение' class='inputButton'/>\n\
				<a href='#' onclick=window.forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>"
			);
		}
		return "<a href='#' onclick=window.forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>";
	}

}
},{"../utils/forms":23,"../utils/utils":26}],5:[function(require,module,exports){
module.exports = function () {
	return (
		"<center>\n\
			<table width='300' height='100' style='border-style:solid;border-width:5px;border-color:red;' cellspacing='0' cellpadding='5'>\n\
				<tbody>\n\
					<tr bgcolor='#FFFFFF'> \n\
						<td><img src='/pics/atten.jpg'></td>\n\
						<td><b><font size='2'>У Вас недостаточно прав доступа для просмотра этого документа.</font></b></td>\n\
					</tr>\n\
				</tbody>\n\
			</table>\n\
		</center>"
	);
}
},{}],6:[function(require,module,exports){
var utils = require('../../utils/utils');
var ui = require('../../utils/ui');

module.exports = function (eighthTable) {
	eighthTable = eighthTable || {};
	return (
		"<div class='eighthTable'>\n\
			<table align='center' class='eighthTable'>\n\
				<tr class='color_head_table2'>\n\
					<td colspan='4' style='height: 43px'>\n\
						<span class='textbold'>Оценка соответствия личностным компетенциям</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_head_table2'>\n\
					<td style='height: 43px'>\n\
						<span class='textbold'>Низкий результат</span>\n\
					</td>\n\
					<td style='height: 43px'>\n\
						<span class='textbold'>Средний результат</span>\n\
					</td>\n\
					<td style='height: 43px'>\n\
						<span class='textbold'>Хороший результат</span>\n\
					</td>\n\
					<td style='height: 43px'>\n\
						<span class='textbold'>Высокий результат</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(eighthTable.col0_str0), 'eighthTable.col0_str0') + "\n\
					</td>\n\
					<td style='height: 23px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(eighthTable.col1_str0), 'eighthTable.col1_str0') + "\n\
					</td>\n\
					<td style='height: 23px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(eighthTable.col2_str0), 'eighthTable.col2_str0') + "\n\
					</td>\n\
					<td style='height: 23px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(eighthTable.col3_str0), 'eighthTable.col3_str0') + "\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	)
}
},{"../../utils/ui":25,"../../utils/utils":26}],7:[function(require,module,exports){
module.exports = function (eleventhTable) {
	eleventhTable = eleventhTable || {};
	return (
		"<div class='eleventhTable'>\n\
			<table align='center' class='eleventhTable'>\n\
				<tr class='color_head_table4'>\n\
					<td colspan='3' style='height: 43px'>\n\
						<span class='textbold'>План развития на предстоящий период</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_head_table4'>\n\
					<td style='height: 23px'>\n\
						<span class='textbold'>Цели развития</span>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<span class='textbold'>Действия</span>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<span class='textbold'>Сроки</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_head_table4'>\n\
					<td style='height: 43px'>Какие области вы выделяете для повышения эффективности?\n\
						Как вы узнаете, что вы освоили эту область?\n\
					</td>\n\
					<td style='height: 43px'>Что вы сделаете, чтобы добиться поставленной цели по развитию?</td>\n\
					<td style='height: 43px'>Когда вы достигните цели по развитию?</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col0_str0' rows='2'>" + (eleventhTable.col0_str0 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col1_str0' rows='2'>" + (eleventhTable.col1_str0 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col2_str0' rows='2'>" + (eleventhTable.col2_str0 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col0_str1' rows='2'>" + (eleventhTable.col0_str1 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col1_str1' rows='2'>" + (eleventhTable.col1_str1 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col2_str1' rows='2'>" + (eleventhTable.col2_str1 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col0_str2' rows='2'>" + (eleventhTable.col0_str2 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col1_str2' rows='2'>" + (eleventhTable.col1_str2 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col2_str2' rows='2'>" + (eleventhTable.col2_str2 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col0_str3' rows='2'>" + (eleventhTable.col0_str3 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col1_str3' rows='2'>" + (eleventhTable.col1_str3 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col2_str3' rows='2'>" + (eleventhTable.col2_str3 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col0_str4' rows='2'>" + (eleventhTable.col0_str4 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col1_str4' rows='2'>" + (eleventhTable.col1_str4 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col2_str4' rows='2'>" + (eleventhTable.col2_str4 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col0_str5' rows='2'>"+ (eleventhTable.col0_str5 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col1_str5' rows='2'>"+ (eleventhTable.col1_str5 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col2_str5' rows='2'>"+ (eleventhTable.col2_str5 || '') +"</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col0_str6' rows='2'>"+ (eleventhTable.col0_str6 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col1_str6' rows='2'>"+ (eleventhTable.col1_str6 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='eleventhTable.col2_str6' rows='2'>"+ (eleventhTable.col2_str6 || '') +"</textarea>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	)
}
},{}],8:[function(require,module,exports){
var utils = require('../../utils/utils');
var ui = require('../../utils/ui');

module.exports = function (fifthTable) {
	fifthTable = fifthTable || {};

	return (
		"<div class='fifthTable'>\n\
			<table align='center'>\n\
				<tr>\n\
					<td style='height: 23px; '>\n\
						<span class='textbold'>ЗАГОЛОВОК</span>\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td style='height: 23px; '>\n\
						текст\n\
					</td>\n\
				</tr>\n\
			</table>\n\
			<table align='center'>\n\
				<tr class='color_head_table2'>\n\
					<td rowspan='2' style='width: 198px'>\n\
						<span class='textbold'>Компетенция</span>\n\
					</td>\n\
					<td rowspan='2' style='width: 540px'>\n\
						<span class='textbold'>Поведенческий индикатор</span>\n\
					</td>\n\
					<td colspan='3'>\n\
						<span class='textbold'>Оценка результата</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_head_table2'>\n\
					<td style='width: 75px'>\n\
						<span class='textbold'>Проявляет полностью</span>\n\
					</td>\n\
					<td style='width: 75px'>\n\
						<span class='textbold'>Проявляет частично</span>\n\
					</td>\n\
					<td style='width: 75px'>\n\
						<span class='textbold'>Общая оценка</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 198px;' rowspan='5'>Любовь</td>\n\
					<td style='height: 23px; width: 540px;'>Проявляет повышенный интерес к миру моды</td>\n\
					<td style='height: 23px; width: 75px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str0), 'fifthTable.col0_str0') + "\n\
					</td>\n\
					<td style='height: 23px; width: 75px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str0), 'fifthTable.col1_str0') + "\n\
					</td>\n\
					<td rowspan='5' style='width: 75px'>\n\
						"+ ui.createSelect([1,2,3,4], fifthTable.col2_str0_by5, 'fifthTable.col2_str0_by5') +"\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Любит элегантную обувь</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str1), 'fifthTable.col0_str1') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str1), 'fifthTable.col1_str1') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Проявляет интерес к Бренду и компании в целом</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str2), 'fifthTable.col0_str2') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str2), 'fifthTable.col1_str2') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px; height: 24px;'>Чувствует нематериальную ценность вещей</td>\n\
					<td style='width: 75px; height: 24px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str3), 'fifthTable.col0_str3') + "\n\
					</td>\n\
					<td style='width: 75px; height: 24px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str3), 'fifthTable.col1_str3') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Понимает и разделяет ценности Бренда</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str4), 'fifthTable.col0_str4') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str4), 'fifthTable.col1_str4') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='5' style='width: 198px'>Эмпатичный</td>\n\
					<td style='width: 540px; height: 24px;'>Управляет эмоциями и настроением при взаимодействии с людьми</td>\n\
					<td style='width: 75px; height: 24px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str5), 'fifthTable.col0_str5') + "\n\
					</td>\n\
					<td style='width: 75px; height: 24px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str5), 'fifthTable.col1_str5') + "\n\
					</td>\n\
					<td rowspan='5' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str5_by5, 'fifthTable.col2_str5_by5') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Проявляет толерантность по отношению к людям</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str6), 'fifthTable.col0_str6') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str6), 'fifthTable.col1_str6') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px; width: 540px'>Умеет понять эмоциональное состояние человека</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str7), 'fifthTable.col0_str7') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str8), 'fifthTable.col1_str7') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Проявляет внимание по отношению к людям</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str8), 'fifthTable.col0_str8') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str8), 'fifthTable.col1_str8') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Управляет эмоциональным состоянием команды</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str9), 'fifthTable.col0_str9') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str9), 'fifthTable.col1_str9') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='5' style='width: 198px'>Совершенствующийся</td>\n\
					<td style='width: 540px'>Самостоятельно инициирует варианты решения задач</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str10), 'fifthTable.col0_str10') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str10), 'fifthTable.col1_str10') + "\n\
					</td>\n\
					<td rowspan='5' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str10_by5, 'fifthTable.col2_str10_by5') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px; height: 23px;'>Использует разные инструменты для саморазвития</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str11), 'fifthTable.col0_str11') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str11), 'fifthTable.col1_str11') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px; height: 24px;'>Стремится к использованию новых знаний в работе</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str12), 'fifthTable.col0_str12') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str12), 'fifthTable.col1_str12') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Объективно оценивает свои сильные стороны и зоны роста</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str13), 'fifthTable.col0_str13') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str13), 'fifthTable.col1_str13') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Ищет новые возможности в процессе изменений</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str14), 'fifthTable.col0_str14') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str14), 'fifthTable.col1_str14') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='9' style='width: 198px'>Самоотверженный</td>\n\
					<td style='width: 540px'>Ответственно подходит к выполнению поставленных перед ним задач</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str15), 'fifthTable.col0_str15') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str15), 'fifthTable.col1_str15') + "\n\
					</td>\n\
					<td rowspan='9' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str15_by9, 'fifthTable.col2_str15_by9') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Несет ответственность за собственные решения и действия</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str16), 'fifthTable.col0_str16') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str16), 'fifthTable.col1_str16') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Своевременно делится важной информацией и ресурсами</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str17), 'fifthTable.col0_str17') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str17), 'fifthTable.col1_str17') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Готов фокусироваться на командной работе</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str18), 'fifthTable.col0_str18') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str18), 'fifthTable.col1_str18') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Выполняет задачи в соответствии с политикой и процедурами компании</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str19), 'fifthTable.col0_str19') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str19), 'fifthTable.col1_str19') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Берет на себя ответственность за работу и результат команды</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str20), 'fifthTable.col0_str20') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str20), 'fifthTable.col1_str20') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Ставит интересы Компании наравне со своими</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str21), 'fifthTable.col0_str21') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str21), 'fifthTable.col1_str21') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Отстаивает интересы команды в сложных ситуациях</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str22), 'fifthTable.col0_str22') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str22), 'fifthTable.col1_str22') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Берет на себя дополнительную ответственность</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str23), 'fifthTable.col0_str23') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str23), 'fifthTable.col1_str23') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='4' style='width: 198px'>Оптимистичный</td>\n\
					<td style='width: 540px'>Сохраняет позитивный настрой при взаимодействии с людьми</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str24), 'fifthTable.col0_str24') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str24), 'fifthTable.col1_str24') + "\n\
					</td>\n\
					<td rowspan='4' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str24_by4, 'fifthTable.col2_str24_by4') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Видит возможности в происходящих изменениях</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str25), 'fifthTable.col0_str25') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str25), 'fifthTable.col1_str25') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Демонстрирует уверенность в успешном разрешении ситуации</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str26), 'fifthTable.col0_str26') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str26), 'fifthTable.col1_str26') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px; height: 23px;'>Транслирует оптимистичный настрой окружающим</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str27), 'fifthTable.col0_str27') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str27), 'fifthTable.col1_str27') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='5' style='width: 198px'>Динамичный</td>\n\
					<td style='width: 540px'>Умеет грамотно поставить перед собой цель</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str28), 'fifthTable.col0_str28') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str28), 'fifthTable.col1_str28') + "\n\
					</td>\n\
					<td rowspan='5' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str28_by5, 'fifthTable.col2_str28_by5') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px; height: 23px;'>Достигает поставленных целей</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str29), 'fifthTable.col0_str29') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str29), 'fifthTable.col1_str29') + "\n\
					</td>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Способен переключаться при выполнении одной задачи на другую без потери качества</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str30), 'fifthTable.col0_str30') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str30), 'fifthTable.col1_str30') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Обладает четким видением своих целей в долгосрочной перспективе</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str31), 'fifthTable.col0_str31') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str31), 'fifthTable.col1_str31') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Проявляет упорство в решении задачи даже сталкиваясь с трудностями</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str32), 'fifthTable.col0_str32') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str32), 'fifthTable.col1_str32') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='6' style='width: 198px'>Восприимчивый</td>\n\
					<td style='width: 540px; height: 23px;'>Открыт к получению обратной связи</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str33), 'fifthTable.col0_str33') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str33), 'fifthTable.col1_str33') + "\n\
					</td>\n\
					<td rowspan='6' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str33_by6, 'fifthTable.col2_str33_by6') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Быстро адаптируется к новым обстоятельствам</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str34), 'fifthTable.col0_str34') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str34), 'fifthTable.col1_str34') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px; height: 23px;'>Принимает идеи и поддерживает инициативу</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str35), 'fifthTable.col0_str35') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str35), 'fifthTable.col1_str35') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Корректирует свои действия после получения обратной связи</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str36), 'fifthTable.col0_str36') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str36), 'fifthTable.col1_str36') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Быстро реагирует на изменения, меняет свое поведение в новых обстоятельствах</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str37), 'fifthTable.col0_str37') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str37), 'fifthTable.col1_str37') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Способен изменить свою точку зрения под воздействием аргументов собеседника</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str38), 'fifthTable.col0_str38') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str38), 'fifthTable.col1_str38') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='7' style='width: 198px'>Сильный</td>\n\
					<td style='width: 540px'>Ставит цели членам команды, обозначает сроки их выполнения</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str39), 'fifthTable.col0_str39') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str39), 'fifthTable.col1_str39') + "\n\
					</td>\n\
					<td rowspan='7' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str39_by7, 'fifthTable.col2_str39_by7') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Обозначает ожидаемый результат членам команды</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str40), 'fifthTable.col0_str40') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str40), 'fifthTable.col1_str40') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Поддерживает и вовлекает членов команды в работу</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str41), 'fifthTable.col0_str41') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str41), 'fifthTable.col1_str41') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Дает развивающую обратную связь членам команды</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str42), 'fifthTable.col0_str42') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str42), 'fifthTable.col1_str42') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Распределяет ресурсы и роли в команде для успешного выполнения цели</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str43), 'fifthTable.col0_str43') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str43), 'fifthTable.col1_str43') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Расставляет приоритеты при выполнении задач</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str44), 'fifthTable.col0_str44') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str44), 'fifthTable.col1_str44') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Фокусирует команду на приоритетных задачах</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str45), 'fifthTable.col0_str45') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str45), 'fifthTable.col1_str45') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='3' style='width: 198px'>Откровенный</td>\n\
					<td style='width: 540px'>Оценивает успешность своей работы по результатам, а не по приложенным усилиям</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str46), 'fifthTable.col0_str46') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str46), 'fifthTable.col1_str46') + "\n\
					</td>\n\
					<td rowspan='3' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str46_by3, 'fifthTable.col2_str46_by3') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px; height: 23px;'>Честно и своевременно излагает свою позицию по разным вопросам</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str47), 'fifthTable.col0_str47') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str47), 'fifthTable.col1_str47') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px; height: 23px;'>Открыт к общению, искренен по отношению к коллегам</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str48), 'fifthTable.col0_str48') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str48), 'fifthTable.col1_str48') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='3' style='width: 198px'>Изысканный</td>\n\
					<td style='width: 540px; height: 24px;'>Проявляет повышенное внимание к стилистическим и эстетическим аспектам в работе и жизни</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str49), 'fifthTable.col0_str49') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str49), 'fifthTable.col1_str49') + "\n\
					</td>\n\
					<td rowspan='3' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str49_by3, 'fifthTable.col2_str49_by3') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Управляет стилистикой речи при взаимодействии с окружающими людьми</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str50), 'fifthTable.col0_str50') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str50), 'fifthTable.col1_str50') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Проявляет достоинство и вежливость</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str51), 'fifthTable.col0_str51') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str51), 'fifthTable.col1_str51') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='5' style='width: 198px'>Чуткий</td>\n\
					<td style='width: 540px'>Дает возможность каждому члену команды высказаться</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str52), 'fifthTable.col0_str52') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str52), 'fifthTable.col1_str52') + "\n\
					</td>\n\
					<td rowspan='5' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str52_by5, 'fifthTable.col2_str52_by5') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Замечает и поощряет вклад других</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str53), 'fifthTable.col0_str53') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str53), 'fifthTable.col1_str53') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px; height: 24px;'>Помогает членам команды адаптироваться к новым изменениям</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str54), 'fifthTable.col0_str54') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str54), 'fifthTable.col1_str54') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Слышит мнение собеседника и учитывает его при принятии решения</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str55), 'fifthTable.col0_str55') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str55), 'fifthTable.col1_str55') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px; height: 21px;'>Внимателен к деталям</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str56), 'fifthTable.col0_str56') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str56), 'fifthTable.col1_str56') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='2' style='width: 198px'>История</td>\n\
					<td style='width: 540px; height: 23px;'>Проявляет лояльность к Бренду и компании в целом</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str57), 'fifthTable.col0_str57') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str57), 'fifthTable.col1_str57') + "\n\
					</td>\n\
					<td rowspan='2' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str57_by2, 'fifthTable.col2_str57_by2') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Ассоциирует себя с компанией</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str58), 'fifthTable.col0_str58') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str58), 'fifthTable.col1_str58') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td rowspan='3' style='width: 198px'>Особенный</td>\n\
					<td style='width: 540px'>Структурированно и последовательно доносит свои мысли</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str59), 'fifthTable.col0_str59') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str59), 'fifthTable.col1_str59') + "\n\
					</td>\n\
					<td rowspan='3' style='width: 75px'>\n\
						" + ui.createSelect([1,2,3,4], fifthTable.col2_str59_by3, 'fifthTable.col2_str59_by3') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Аргументировано высказывает свою позицию, оперирует фактами</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str60), 'fifthTable.col0_str60') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str60), 'fifthTable.col1_str60') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='width: 540px'>Обаятелен, умеет вызывать симпатию</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col0_str61), 'fifthTable.col0_str61') + "\n\
					</td>\n\
					<td style='width: 75px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthTable.col1_str61), 'fifthTable.col1_str61') + "\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	);
}
},{"../../utils/ui":25,"../../utils/utils":26}],9:[function(require,module,exports){
var utils = require('../../utils/utils');
var ui = require('../../utils/ui');

module.exports = function (fifthteenthTable) {
	fifthteenthTable = fifthteenthTable || {};
	return (
		"<div class='fifthteenthTable'>\n\
			<table align='center' >\n\
				<tr>\n\
					<td class='color_head_table' style='height: 43px'>\n\
						<span class='textbold'>КОММЕНТАРИИ РУКОВОДИТЕЛЯ</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='fifthteenthTable.col0_str0' rows='10'>" + (fifthteenthTable.col0_str0 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>\n\
		<div>\n\
			<table>\n\
				<tr>\n\
					<td style='height: 23px; width: 35px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthteenthTable.col0_str1), 'fifthteenthTable.col0_str1') + "\n\
					</td>\n\
					<td style='height: 23px'>\n\
						Сотрудник согласен\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td style='height: 23px; width: 35px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fifthteenthTable.col0_str2), 'fifthteenthTable.col0_str2') + "\n\
					</td>\n\
					<td style='height: 23px'>\n\
						Сотрудник не согласен\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	)
}
},{"../../utils/ui":25,"../../utils/utils":26}],10:[function(require,module,exports){
var moment = require('moment');

module.exports = function (firstTable) {
	firstTable = firstTable || {};
	var startDate = !firstTable.col0_str0 ? '' : moment(firstTable.col0_str0).format('DD.MM.YYYY');
	var finishDate = !firstTable.col0_str1 ? '' : moment(firstTable.col0_str1).format('DD.MM.YYYY');;
	
	return (
		"<div class='firstTable'>\n\
			<table border-spacing: 0px;' align='center' class='border_table_date'>\n\
				<tr>\n\
					<td style='height: 43px; padding-left:10px;' colspan='3' class='color_head_date'>\n\
						ОЦЕНКА ЭФФЕКТИВНОСТИ ПО ИТОГАМ КОНТРОЛЬНОГО ПЕРИОДА\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td class='color_head_date' style='width: 35px; height: 43px; padding-left:10px;'>C: </td>\n\
					<td class='color_head_date' style='width: 225px; height: 43px'>\n\
						<input readonly type='text' class='firstTable__date' name='firstTable.col0_str0' value=" + startDate + ">\n\
					</td>\n\
					<td class='color_head_date' rowspan='2'></td>\n\
				</tr>\n\
				<tr>\n\
					<td class='color_head_date' style='width: 35px; height: 43px; padding-left:10px;'>ПО: </td>\n\
					<td class='color_head_date' style='width: 225px; height: 43px'>\n\
						<input readonly type='text' class='firstTable__date' name='firstTable.col0_str1' value=" + finishDate + ">\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	);
}
},{"moment":28}],11:[function(require,module,exports){
module.exports = function (fourteenthTable) {
	fourteenthTable = fourteenthTable || {};
	return (
		"<div class='fourteenthTable'> \n\
			<table align='center' class='fourteenthTable'>\n\
				<tr>\n\
					<td class='color_head_table' style='height: 43px'>\n\
						<span class='textbold'>КОММЕНТАРИИ СОТРУДНИКА</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='fourteenthTable.col0_str0' rows='10'>"+ (fourteenthTable.col0_str0 || '') +"</textarea>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	)
}
},{}],12:[function(require,module,exports){
var utils = require('../../utils/utils');
var ui = require('../../utils/ui');

module.exports = function (fourthTable) {
	fourthTable = fourthTable || {};

	return (
		"<div class='fourthTable'>\n\
			<table align='center'>\n\
				<tr>\n\
					<td class='color_head_table' colspan='5' style='height: 43px'>\n\
						<span class='textbold'>ОБЩАЯ ОЦЕНКА ВЫПОЛНЕНИЯ РАБОТ</span>\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td class='color_head_table' rowspan='2' style='width: 747px'>\n\
						<span class='textbold'>Подведение итогов по выполнению поставленных целей по ключевым показателям эффективности:</span>\n\
					</td>\n\
					<td class='color_head_table' colspan='4'>\n\
						<span class='textbold'>Оценка результата</span>\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td class='color_head_table' style='width: 74px'>\n\
						<span class='textbold'>Низкий</span>\n\
					</td>\n\
					<td class='color_head_table' style='width: 75px'>\n\
						<span class='textbold'>Средний</span>\n\
					</td>\n\
					<td class='color_head_table' style='width: 75px'>\n\
						<span class='textbold'>Хороший</span>\n\
					</td>\n\
					<td class='color_head_table' style='width: 75px'>\n\
						<span class='textbold'>Высокий</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px; width: 747px;'>\n\
						<textarea cols='20' name='fourthTable.col0_str0' rows='2'>" + (fourthTable.col0_str0 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px; width: 74px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fourthTable.col1_str0), 'fourthTable.col1_str0') + "\n\
					</td>\n\
					<td style='height: 23px; width: 75px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fourthTable.col2_str0), 'fourthTable.col2_str0') + "\n\
					</td>\n\
					<td style='height: 23px; width: 75px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fourthTable.col3_str0), 'fourthTable.col3_str0') + "\n\
					</td>\n\
					<td style='height: 23px; width: 75px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(fourthTable.col4_str0), 'fourthTable.col4_str0') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px; ' colspan='5'>\n\
						<textarea cols='20' name='fourthTable.col0_by5_str1' rows='2' style='width: 96.6%;'>" + (fourthTable.col0_by5_str1 || '') +"</textarea>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	);
}
},{"../../utils/ui":25,"../../utils/utils":26}],13:[function(require,module,exports){
var utils = require('../../utils/utils');
var ui = require('../../utils/ui');

module.exports = function (ninthTable) {
	ninthTable = ninthTable || {};

	return (
		"<div class='ninthTable'>\n\
			<table align='center'>\n\
				<tr>\n\
					<td class='color_head_table' colspan='5' style='height: 43px'>\n\
						<span class='textbold'>ОБЩАЯ ОЦЕНКА СООТВЕТСТВИЯМ ОЖИДАНИЯМ ОТ ДОЛЖНОСТИ</span>\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td class='color_head_table' rowspan='2' style='width: 747px'>\n\
						<span class='textbold'>Подведение итогов по соответствию личностным компетенциям и функциональным навыкам:</span>\n\
					</td>\n\
					<td class='color_head_table' colspan='4'>\n\
						<span class='textbold'>Оценка результата</span>\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td class='color_head_table' style='width: 74px'>\n\
						<span class='textbold'>Низкий</span>\n\
					</td>\n\
					<td class='color_head_table' style='width: 75px'>\n\
						<span class='textbold'>Средний</span>\n\
					</td>\n\
					<td class='color_head_table' style='width: 75px'>\n\
						<span class='textbold'>Хороший</span>\n\
					</td>\n\
					<td class='color_head_table' style='width: 75px'>\n\
						<span class='textbold'>Высокий</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px; width: 747px;'>\n\
						<textarea cols='20' name='ninthTable.col0_str0' rows='2'>" + (ninthTable.col0_str0 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px; width: 74px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(ninthTable.col1_str0), 'ninthTable.col1_str0') + "\n\
					</td>\n\
					<td style='height: 23px; width: 75px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(ninthTable.col2_str0), 'ninthTable.col2_str0') + "\n\
					</td>\n\
					<td style='height: 23px; width: 75px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(ninthTable.col3_str0), 'ninthTable.col3_str0') + "\n\
					</td>\n\
					<td style='height: 23px; width: 75px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(ninthTable.col4_str0), 'ninthTable.col4_str0') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px; ' colspan='5'>\n\
						<textarea cols='20' name='ninthTable.col0_by5_str1' rows='2' style='width: 96.6%;'>" + (ninthTable.col0_by5_str1 || '') +"</textarea>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	);
}
},{"../../utils/ui":25,"../../utils/utils":26}],14:[function(require,module,exports){
var utils = require('../../utils/utils');
var ui = require('../../utils/ui');

module.exports = function (secondTable) {
	secondTable = secondTable || {};

	return (
		"<div class='secondTable'>\n\
			<table align='center'>\n\
				<tr>\n\
					<td style='height: 23px; '>\n\
						<span class='textbold'>ЗАГОЛОВОК</span>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
			<table align='center' class='alltables'>\n\
				<tr class='color_head_table'>\n\
					<td style='background-color: blanchedalmond; text-align:center; height: 43px' colspan='9'>\n\
						<span class='textbold'>ОЦЕНКА ДОСТИЖЕНИЯ ФИНАНСОВЫХ KPI</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_head_table'>\n\
					<td style='width: 193px; text-align:center; background-color: blanchedalmond; ' rowspan='2'>\n\
						<span class='textbold'>KPI</span>\n\
					</td>\n\
					<td style='width: 75px; text-align:center; background-color: blanchedalmond; ' rowspan='2'>\n\
						<span class='textbold'>Цель</span>\n\
					</td>\n\
					<td style='width: 75px; text-align:center; background-color: blanchedalmond; ' rowspan='2'>\n\
						<span class='textbold'>Результат</span>\n\
					</td>\n\
					<td style='width: 75px; text-align:center; background-color: blanchedalmond; ' rowspan='2'>\n\
						<span class='textbold'>Процент достижения цели</span>\n\
					</td>\n\
					<td style='text-align:center; background-color: blanchedalmond;' colspan='4'>\n\
						<span class='textbold'>Оценка результата</span>\n\
					</td>\n\
					<td style='width: 245px; text-align:center; background-color: blanchedalmond; ' rowspan='2'> \n\
						<span class='textbold'>Комментарии</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_head_table'>\n\
					<td class='' style='width: 75px; text-align:center; background-color: blanchedalmond;'>\n\
						<span class='textbold'>Низкий</span>\n\
					</td>\n\
					<td class='' style='width: 75px; text-align:center; background-color: blanchedalmond;'>\n\
						<span class='textbold'>Средний</span>\n\
					</td>\n\
					<td class='' style='width: 75px; text-align:center; background-color: blanchedalmond; '>\n\
						<span class='textbold'>Хороший</span>\n\
					</td>\n\
					<td class='' style='width: 74px; text-align:center; background-color: blanchedalmond;'>\n\
						<span class='textbold'>Высокий</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td class='' style='width: 193px; '>План продаж магазина</td>\n\
					<td class='' style='width: 75px; '>\n\
						<input name='secondTable.col0_str0' type='text' value='"+ (secondTable.col0_str0 || '') +"' />\n\
					</td>\n\
					<td class='' style='width: 75px; '>\n\
						<input name='secondTable.col1_str0' type='text' value='"+ (secondTable.col1_str0 || '') +"' />\n\
					</td>\n\
					<td class='' style='width: 75px; '>\n\
						<input name='secondTable.col2_str0' type='text' value='"+ (secondTable.col2_str0 || '') +"' />\n\
					</td>\n\
					<td class='pocentru' style='width: 75px; '>\n\
						" + ui.createCheckBox(utils.strBoolToBool(secondTable.col3_str0), 'secondTable.col3_str0') + "\n\
					</td>\n\
					<td class='pocentru' style='width: 75px; '>\n\
						" + ui.createCheckBox(utils.strBoolToBool(secondTable.col4_str0), 'secondTable.col4_str0') + "\n\
					</td>\n\
					<td class='pocentru' style='width: 75px; '>\n\
						" + ui.createCheckBox(utils.strBoolToBool(secondTable.col5_str0), 'secondTable.col5_str0') + "\n\
					</td>\n\
					<td class='pocentru' style='width: 74px; '>\n\
						" + ui.createCheckBox(utils.strBoolToBool(secondTable.col6_str0), 'secondTable.col6_str0') + "\n\
					</td>\n\
					<td class='' style='width: 245px'>\n\
						<textarea name='secondTable.col7_str0' rows='2' style='width: 98%;'>" + (secondTable.col7_str0 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td class='' style='width: 193px; height: 45px;'>Конверсия\n\
						(цель на магазин)\n\
					</td>\n\
					<td class='' style='width: 75px; height: 45px;'>\n\
						<input name='secondTable.col0_str1' type='text' value='"+ (secondTable.col0_str1 || '') +"'/>\n\
					</td>\n\
					<td class='' style='width: 75px; height: 45px;'>\n\
						<input name='secondTable.col1_str1' type='text' value='"+ (secondTable.col1_str1 || '') +"'/>\n\
					</td>\n\
					<td class='' style='width: 75px; height: 45px;'>\n\
						<input name='secondTable.col2_str1' type='text' value='"+ (secondTable.col2_str1 || '') +"'/>\n\
					</td>\n\
					<td class='pocentru' style='width: 75px; height: 45px;'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(secondTable.col3_str1), 'secondTable.col3_str1') +"\n\
					</td>\n\
					<td class='pocentru' style='width: 75px; height: 45px;'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(secondTable.col4_str1), 'secondTable.col4_str1') +"\n\
					</td>\n\
					<td class='pocentru' style='width: 75px; height: 45px;'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(secondTable.col5_str1), 'secondTable.col5_str1') +"\n\
					</td>\n\
					<td class='pocentru' style='width: 74px; height: 45px;'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(secondTable.col6_str1), 'secondTable.col6_str1') +"\n\
					</td>\n\
					<td class='pocentru' style='width: 245px; height: 45px'>\n\
						<textarea name='secondTable.col7_str1' rows='2' style='width: 98%;' cols='20'>" + (secondTable.col7_str1 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td class='' style='width: 193px; '>Средний чек\n\
						(цель на магазин)\n\
					</td>\n\
					<td class='' style='width: 75px; '>\n\
						<input name='secondTable.col0_str2' type='text' value='" + (secondTable.col0_str2 || '') + "'/>\n\
					</td>\n\
					<td class='' style='width: 75px; '>\n\
						<input name='secondTable.col1_str2' type='text' value='" + (secondTable.col1_str2 || '') + "'/>\n\
					</td>\n\
					<td class='' style='width: 75px; '>\n\
						<input name='secondTable.col2_str2' type='text' value='" + (secondTable.col2_str2 || '') + "'/>\n\
					</td>\n\
					<td class='pocentru' style='width: 75px;'>\n\
						"+  ui.createCheckBox(utils.strBoolToBool(secondTable.col3_str2), 'secondTable.col3_str2') +"\n\
					</td>\n\
					<td class='pocentru' style='width: 75px;'>\n\
						"+  ui.createCheckBox(utils.strBoolToBool(secondTable.col4_str2), 'secondTable.col4_str2') +"\n\
					</td>\n\
					<td class='pocentru' style='width: 75px;'>\n\
						"+  ui.createCheckBox(utils.strBoolToBool(secondTable.col5_str2), 'secondTable.col5_str2') +"\n\
					</td>\n\
					<td class='pocentru' style='width: 74px;'>\n\
						"+  ui.createCheckBox(utils.strBoolToBool(secondTable.col6_str2), 'secondTable.col6_str2') +"\n\
					</td>\n\
					<td class='' style='width: 245px'>\n\
						<textarea name='secondTable.col7_str2' rows='2' style='width: 98%;' cols='20'>" + (secondTable.col7_str2 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td class='' style='width: 193px;'>Комплексный чек\n\
						(цель на магазин)\n\
					</td>\n\
					<td class='' style='width: 75px; '>\n\
						<input name='secondTable.col0_str3' type='text' value='" + (secondTable.col0_str3 || '') + "'/>\n\
					</td>\n\
					<td class='' style='width: 75px; '>\n\
						<input name='secondTable.col1_str3' type='text' value='" + (secondTable.col1_str3 || '') + "'/>\n\
					</td>\n\
					<td class='' style='width: 75px; '>\n\
						<input name='secondTable.col2_str3' type='text' value='" + (secondTable.col2_str3 || '') + "'/>\n\
					</td>\n\
					<td class='pocentru' style='width: 75px;'>\n\
						" +  ui.createCheckBox(utils.strBoolToBool(secondTable.col3_str3), 'secondTable.col3_str3') +"\n\
					</td>\n\
					<td class='pocentru' style='width: 75px;'>\n\
						" +  ui.createCheckBox(utils.strBoolToBool(secondTable.col4_str3), 'secondTable.col4_str3') +"\n\
					</td>\n\
					<td class='pocentru' style='width: 75px;'>\n\
						" +  ui.createCheckBox(utils.strBoolToBool(secondTable.col5_str3), 'secondTable.col5_str3') +"\n\
					</td>\n\
					<td class='pocentru' style='width: 74px;'>\n\
						"+  ui.createCheckBox(utils.strBoolToBool(secondTable.col6_str3), 'secondTable.col6_str3') +"\n\
					</td>\n\
					<td class='' style='width: 245px'>\n\
						<textarea name='secondTable.col7_str3' rows='2' style='width: 98%;' cols='20'>" + (secondTable.col7_str3 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	)
}
},{"../../utils/ui":25,"../../utils/utils":26}],15:[function(require,module,exports){
var utils = require('../../utils/utils');
var ui = require('../../utils/ui');

module.exports = function (seventhTable) {
	seventhTable = seventhTable || {};
	return (
		"<div class='seventhTable'>\n\
			<table align='center' class='seventhTable'>\n\
			    <tbody>\n\
			        <tr class='color_head_table2'>\n\
			            <td colspan='5' style='height: 43px'>\n\
			                <span class='textbold'>Заголовок</span>\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_head_table2'>\n\
			            <td rowspan='2' style='width: 198px'>\n\
			                <span class='textbold'>Функциональный навык</span>\n\
			            </td>\n\
			            <td rowspan='2' style='width: 540px'>\n\
			                <span class='textbold'>Поведенческий индикатор</span>\n\
			            </td>\n\
			            <td colspan='3'>\n\
			                <span class='textbold'>Оценка результата</span>\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_head_table2'>\n\
			            <td style='width: 75px'>\n\
			                <span class='textbold'>Проявляет полностью</span>\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                <span class='textbold'>Проявляет частично</span>\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                <span class='textbold'>Общая оценка</span>\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 198px;' rowspan='9'>Навыки управления продажами</td>\n\
			            <td style='height: 23px; width: 540px;'>Управляет сервисом в магазине</td>\n\
			            <td style='height: 23px; width: 75px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str0), 'seventhTable.col0_str0') + "\n\
			            </td>\n\
			            <td style='height: 23px; width: 75px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str0), 'seventhTable.col1_str0') + "\n\
			            </td>\n\
			            <td rowspan='9' style='width: 75px'>\n\
			                "+ ui.createSelect([1,2,3,4], seventhTable.col2_str0_by9, 'seventhTable.col2_str0_by9') +"\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px; height: 23px;'>Формирует навыки работы с лояльными покупателями у команды магазина</td>\n\
			            <td style='width: 75px; height: 23px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str1), 'seventhTable.col0_str1') + "\n\
			            </td>\n\
			            <td style='width: 75px; height: 23px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str1), 'seventhTable.col1_str1') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Знает и понимает розничные kpi</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str2), 'seventhTable.col0_str2') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str2), 'seventhTable.col1_str2') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Анализирует эффективность работы магазина</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str3), 'seventhTable.col0_str3') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str3), 'seventhTable.col1_str3') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Ставит цели по kpi сотрудникам магазина</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str4), 'seventhTable.col0_str4') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str4), 'seventhTable.col1_str4') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Создает инструменты для достижения целей по kpi</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str5), 'seventhTable.col0_str5') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str5), 'seventhTable.col1_str5') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Инициирует мероприятия по увеличению финансовых показателей магазина</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str6), 'seventhTable.col0_str6') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str6), 'seventhTable.col1_str6') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Знает возможности в развитии своего магазина и имеет план их реализации</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str7), 'seventhTable.col0_str7') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str7), 'seventhTable.col1_str7') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует применение инструментов в работе у персонала магазина</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str8), 'seventhTable.col0_str8') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str8), 'seventhTable.col1_str8') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td rowspan='11' style='width: 198px'>Навыки управления персоналом</td>\n\
			            <td style='width: 540px'>Создает и оптимизирует график работы персонала</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str9), 'seventhTable.col0_str9') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str9), 'seventhTable.col1_str9') + "\n\
			            </td>\n\
			            <td rowspan='11' style='width: 75px'>\n\
			                "+ ui.createSelect([1,2,3,4], seventhTable.col2_str9_by11, 'seventhTable.col2_str9_by11') +"\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Формирует команду магазина</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str10), 'seventhTable.col0_str10') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str10), 'seventhTable.col1_str10') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='height: 23px; width: 540px'>Организует процесс закрытия нехватки в магазине</td>\n\
			            <td style='height: 23px; width: 75px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str11), 'seventhTable.col0_str11') + "\n\
			            </td>\n\
			            <td style='height: 23px; width: 75px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str11), 'seventhTable.col1_str11') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Организует мероприятия по сокращению оттоков в магазине</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str12), 'seventhTable.col0_str12') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str12), 'seventhTable.col1_str12') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует реализацию программы адаптации и наставничества</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str13), 'seventhTable.col0_str13') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str13), 'seventhTable.col1_str13') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px; height: 23px;'>Организует процесс обучения на рабочем месте для команды магазина</td>\n\
			            <td style='width: 75px; height: 23px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str14), 'seventhTable.col0_str14') + "\n\
			            </td>\n\
			            <td style='width: 75px; height: 23px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str14), 'seventhTable.col1_str14') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Проводит оценку каждого сотрудника магазина</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str15), 'seventhTable.col0_str15') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str15), 'seventhTable.col1_str15') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Разрабатывает ИПР сотрудников и контролирует их реализацию</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str16), 'seventhTable.col0_str16') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str16), 'seventhTable.col1_str16') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Организует работу с талантами в магазине</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str17), 'seventhTable.col0_str17') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str17), 'seventhTable.col1_str17') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Использует различные инструменты мотивации для персонала</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str18), 'seventhTable.col0_str18') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str18), 'seventhTable.col1_str18') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Развивает потенциал команды</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str19), 'seventhTable.col0_str19') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str19), 'seventhTable.col1_str19') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td rowspan='9' style='width: 198px'>Навыки управления товарными процессами</td>\n\
			            <td style='width: 540px'>Контролирует и реализует стандарты визуального мерчендайзинга</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str20), 'seventhTable.col0_str20') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str20), 'seventhTable.col1_str20') + "\n\
			            </td>\n\
			            <td style='width: 75px' rowspan='9'>\n\
			                "+ ui.createSelect([1,2,3,4], seventhTable.col2_str20_by9, 'seventhTable.col2_str20_by9') +"\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px; height: 23px;'>Организует процесс предпродажной подготовки товара</td>\n\
			            <td style='width: 75px; height: 23px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str21), 'seventhTable.col0_str21') + "\n\
			            </td>\n\
			            <td style='width: 75px; height: 23px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str21), 'seventhTable.col1_str21') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Организует процесс приемки товара</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str22), 'seventhTable.col0_str22') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str22), 'seventhTable.col1_str22') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Организует процесс отгрузки товара</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str23), 'seventhTable.col0_str23') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str23), 'seventhTable.col1_str23') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует порядок на складе и в торговом зале</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str24), 'seventhTable.col0_str24') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str24), 'seventhTable.col1_str24') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Организует процесс инвентаризации в магазине</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str25), 'seventhTable.col0_str25') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str25), 'seventhTable.col1_str25') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует систему мероприятий по организации сохранности ТМЦ</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str26), 'seventhTable.col0_str26') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str26), 'seventhTable.col1_str26') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Организует процесс переоценки</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str27), 'seventhTable.col0_str27') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str27), 'seventhTable.col1_str27') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Организует оптимальное размещение товара на складе</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str28), 'seventhTable.col0_str28') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str28), 'seventhTable.col1_str28') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td rowspan='14' style='width: 198px'>Навыки управления операционной деятельностью</td>\n\
			            <td style='width: 540px'>Проводит мониторинг и оценку работы магазина по чек-листу</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str29), 'seventhTable.col0_str29') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str29), 'seventhTable.col1_str29') + "\n\
			            </td>\n\
			            <td style='width: 75px' rowspan='14'>\n\
			                 "+ ui.createSelect([1,2,3,4], seventhTable.col2_str29_by14, 'seventhTable.col2_str29_by14') +"\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует проводимые операции на ККМ</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str30), 'seventhTable.col0_str30') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str30), 'seventhTable.col1_str30') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует ведение кассовой документации</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str31), 'seventhTable.col0_str31') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str31), 'seventhTable.col1_str31') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует использование правил работы с денежной наличностью</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str32), 'seventhTable.col0_str32') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str32), 'seventhTable.col1_str32') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Обучает навыкам работы на POS -терминале</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str33), 'seventhTable.col0_str33') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str33), 'seventhTable.col1_str33') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px; height: 23px;'>Контролирует использование правил облуживания платежных карт МПС</td>\n\
			            <td style='width: 75px; height: 23px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str34), 'seventhTable.col0_str34') + "\n\
			            </td>\n\
			            <td style='width: 75px; height: 23px;'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str34), 'seventhTable.col1_str34') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует проведение инкассации</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str35), 'seventhTable.col0_str35') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str35), 'seventhTable.col1_str35') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует процесс открытия/закрытия магазина</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str36), 'seventhTable.col0_str36') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str36), 'seventhTable.col1_str36') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует составление кадровой документации</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str37), 'seventhTable.col0_str37') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str37), 'seventhTable.col1_str37') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует хранение и передачу информации о магазине</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str38), 'seventhTable.col0_str38') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str38), 'seventhTable.col1_str38') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует наличие медицинских книжек</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str39), 'seventhTable.col0_str39') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str39), 'seventhTable.col1_str39') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Обучает формированию KPI в программе 1С</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str40), 'seventhTable.col0_str40') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str40), 'seventhTable.col1_str40') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует исправность торгового оборудования</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str41), 'seventhTable.col0_str41') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str41), 'seventhTable.col1_str41') + "\n\
			            </td>\n\
			        </tr>\n\
			        <tr class='color_text_fone_table'>\n\
			            <td style='width: 540px'>Контролирует порядок в торговом зале</td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col0_str42), 'seventhTable.col0_str42') + "\n\
			            </td>\n\
			            <td style='width: 75px'>\n\
			                " + ui.createCheckBox(utils.strBoolToBool(seventhTable.col1_str42), 'seventhTable.col1_str42') + "\n\
			            </td>\n\
			        </tr>\n\
			    </tbody>\n\
			</table>\n\
		</div>"
	)
}
},{"../../utils/ui":25,"../../utils/utils":26}],16:[function(require,module,exports){
var utils = require('../../utils/utils');
var ui = require('../../utils/ui');

module.exports = function (sixthTable) {
	sixthTable = sixthTable || {};
	return (
		"<div class='sixthTable'>\n\
			<table align='center' class='sixthTable'>\n\
				<tr class='color_head_table2'>\n\
					<td colspan='4' style='height: 43px'>\n\
						<span class='textbold'>Оценка соответствия личностным компетенциям</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_head_table2'>\n\
					<td style='height: 43px'>\n\
						<span class='textbold'>Низкий результат</span>\n\
					</td>\n\
					<td style='height: 43px'>\n\
						<span class='textbold'>Средний результат</span>\n\
					</td>\n\
					<td style='height: 43px'>\n\
						<span class='textbold'>Хороший результат</span>\n\
					</td>\n\
					<td style='height: 43px'>\n\
						<span class='textbold'>Высокий результат</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(sixthTable.col0_str0), 'sixthTable.col0_str0') + "\n\
					</td>\n\
					<td style='height: 23px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(sixthTable.col1_str0), 'sixthTable.col1_str0') + "\n\
					</td>\n\
					<td style='height: 23px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(sixthTable.col2_str0), 'sixthTable.col2_str0') + "\n\
					</td>\n\
					<td style='height: 23px'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(sixthTable.col3_str0), 'sixthTable.col3_str0') + "\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	)
}
},{"../../utils/ui":25,"../../utils/utils":26}],17:[function(require,module,exports){
var utils = require('../../utils/utils');
var ui = require('../../utils/ui');

module.exports = function (tenthTable) {
	tenthTable = tenthTable || {};

	return (
		"<div class='tenthTable'>\n\
			<table align='center'>\n\
				<tr>\n\
					<td class='color_head_table' colspan='5' style='height: 43px'>\n\
						<span class='textbold'>ОБЩАЯ ОЦЕНКА ЭФФЕКТИВНОСТИ</span>\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td class='color_head_table' rowspan='2' style='width: 747px'>\n\
						<span class='textbold'>Подведение итогов промежуточной оценки деятельности сотрудника:</span>\n\
					</td>\n\
					<td class='color_head_table' colspan='4'>\n\
						<span class='textbold'>Оценка результата</span>\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td class='color_head_table' style='width: 74px'>\n\
						<span class='textbold'>Низкий</span>\n\
					</td>\n\
					<td class='color_head_table' style='width: 75px'>\n\
						<span class='textbold'>Средний</span>\n\
					</td>\n\
					<td class='color_head_table' style='width: 75px'>\n\
						<span class='textbold'>Хороший</span>\n\
					</td>\n\
					<td class='color_head_table' style='width: 75px'>\n\
						<span class='textbold'>Высокий</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px; width: 747px;'>\n\
						<textarea cols='20' name='tenthTable.col0_str0' rows='2'>" + (tenthTable.col0_str0 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px; width: 74px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(tenthTable.col1_str0), 'tenthTable.col1_str0') + "\n\
					</td>\n\
					<td style='height: 23px; width: 75px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(tenthTable.col2_str0), 'tenthTable.col2_str0') + "\n\
					</td>\n\
					<td style='height: 23px; width: 75px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(tenthTable.col3_str0), 'tenthTable.col3_str0') + "\n\
					</td>\n\
					<td style='height: 23px; width: 75px;'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(tenthTable.col4_str0), 'tenthTable.col4_str0') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px; ' colspan='5'>\n\
						<textarea cols='20' name='tenthTable.col0_by5_str1' rows='2' style='width: 96.6%;'>" + (tenthTable.col0_by5_str1 || '') +"</textarea>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	);
}
},{"../../utils/ui":25,"../../utils/utils":26}],18:[function(require,module,exports){
var utils = require('../../utils/utils');
var ui = require('../../utils/ui');

module.exports = function (thirdTable) {
	thirdTable = thirdTable || {};

	return (
		"<div class='thirdTable'>\n\
			<table align='center'>\n\
				<tr>\n\
					<td class='color_head_table' colspan='9' style='height: 43px'>\n\
						<span class='textbold'>ОЦЕНКА ПО ДОСТИЖЕНИЮ ОПЕРАЦИОННЫХ KPI</span>\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td class='color_head_table' rowspan='2' style='width: 193px'>\n\
						<span class='textbold'>KPI</span>\n\
					</td>\n\
					<td class='color_head_table' rowspan='2' style='width: 75px'>\n\
						<span class='textbold'>Цель (%)</span>\n\
					</td>\n\
					<td class='color_head_table' rowspan='2' style='width: 75px'>\n\
						<span class='textbold'>Результат (%)</span>\n\
					</td>\n\
					<td class='color_head_table' rowspan='2' style='width: 75px'>\n\
						<span class='textbold'>Процент достижения цели</span>\n\
					</td>\n\
					<td class='color_head_table' rowspan='2' style='width: 245px'>\n\
						<span class='textbold'>Комментарии</span>\n\
					</td>\n\
					<td class='color_head_table' colspan='4'>\n\
						<span class='textbold'>Оценка результата</span>\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td class='color_head_table' style='height: 23px; '>\n\
						<span class='textbold'>Низкий</span>\n\
					</td>\n\
					<td class='color_head_table' style='height: 23px'>\n\
						<span class='textbold'>Средний</span>\n\
					</td>\n\
					<td class='color_head_table' style='height: 23px'>\n\
						<span class='textbold'>Хороший</span>\n\
					</td>\n\
					<td class='color_head_table' style='height: 23px'>\n\
						<span class='textbold'>Высокий</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px; width: 193px;' class='color_fone_table'>Оценка сервиса</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col0_str0' type='text' value=" + (thirdTable.col0_str0 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col1_str0' type='text' value=" + (thirdTable.col1_str0 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col2_str0' type='text' value=" + (thirdTable.col2_str0 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 245px;' class='color_fone_table'>\n\
						<textarea cols='20' name='thirdTable.col3_str0' rows='2'>"+ (thirdTable.col3_str0 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(thirdTable.col4_str0),'thirdTable.col4_str0') + "\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(thirdTable.col5_str0),'thirdTable.col5_str0')  + "\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(thirdTable.col6_str0), 'thirdTable.col6_str0') + "\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						" + ui.createCheckBox(utils.strBoolToBool(thirdTable.col7_str0), 'thirdTable.col7_str0') + "\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 24px; width: 193px;' class='color_fone_table'>Товарные потери</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col0_str1' type='text' value=" + (thirdTable.col0_str1 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col1_str1' type='text' value=" + (thirdTable.col1_str1 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col2_str1' type='text' value=" + (thirdTable.col2_str1 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 245px;' class='color_fone_table'>\n\
						<textarea cols='20' name='thirdTable.col3_str1' rows='2'>" + (thirdTable.col3_str1 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col4_str1), 'thirdTable.col4_str1') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col5_str1), 'thirdTable.col5_str1') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col6_str1), 'thirdTable.col6_str1') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col7_str1), 'thirdTable.col7_str1') +"\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td class='color_fone_table' style='width: 193px'>Оценка по фото отчетам (ВМ)</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col0_str2' type='text' value=" + (thirdTable.col0_str2 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col1_str2' type='text' value=" + (thirdTable.col1_str2 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col2_str2' type='text' value=" + (thirdTable.col2_str2 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 245px;' class='color_fone_table'>\n\
						<textarea cols='20' name='thirdTable.col3_str2' rows='2'>"+ (thirdTable.col3_str2 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col4_str2), 'thirdTable.col4_str2') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col5_str2), 'thirdTable.col5_str2') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col6_str2), 'thirdTable.col6_str2') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col7_str2), 'thirdTable.col7_str2') +"\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td class='color_fone_table' style='width: 193px'>Оценка по чек-листу ТУ</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col0_str3' type='text' value=" + (thirdTable.col0_str3 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col1_str3' type='text' value=" + (thirdTable.col1_str3 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col2_str3' type='text' value=" + (thirdTable.col2_str3 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 245px;' class='color_fone_table'>\n\
						<textarea cols='20' name='thirdTable.col3_str3' rows='2'>"+ (thirdTable.col3_str3 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col4_str3), 'thirdTable.col4_str3') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col5_str3), 'thirdTable.col5_str3') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col6_str3), 'thirdTable.col6_str3') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col7_str3), 'thirdTable.col7_str3') +"\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td class='color_fone_table' style='width: 193px'>Оценка внешнего вида</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col0_str4' type='text' value=" + (thirdTable.col0_str4 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col1_str4' type='text' value=" + (thirdTable.col1_str4 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 75px;' class='color_fone_table'>\n\
						<input name='thirdTable.col2_str4' type='text' value=" + (thirdTable.col2_str4 || '') + ">\n\
					</td>\n\
					<td style='height: 23px; width: 245px;' class='color_fone_table'>\n\
						<textarea cols='20' name='thirdTable.col3_str4' rows='2'>"+ (thirdTable.col3_str4 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col4_str4), 'thirdTable.col4_str4') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col5_str4), 'thirdTable.col5_str4') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col6_str4), 'thirdTable.col6_str4') +"\n\
					</td>\n\
					<td style='height: 23px' class='color_fone_table'>\n\
						"+ ui.createCheckBox(utils.strBoolToBool(thirdTable.col7_str4), 'thirdTable.col7_str4') +"\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	)
}
},{"../../utils/ui":25,"../../utils/utils":26}],19:[function(require,module,exports){
module.exports = function (thirteenthTable) {
	thirteenthTable = thirteenthTable || {};
	return (
		"<div class='thirteenthTable'> \n\
			<table align='center' class='thirteenthTable'>\n\
				<tr>\n\
					<td class='color_head_table' style='height: 43px'>\n\
						<span class='textbold'>ДОЛГОСРОЧНЫЙ ПЛАН и договоренности </span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='thirteenthTable.col0_str0' rows='10'>" + (thirteenthTable.col0_str0 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	)
}
},{}],20:[function(require,module,exports){
module.exports = function (twelfthTable) {
	twelfthTable = twelfthTable || {};
	return (
		"<div class='twelfthTable'>\n\
			<table align='center' class='twelfthTable'>\n\
				<tr class='color_head_table4'>\n\
					<td colspan='3' style='height: 43px'>\n\
						<span class='textbold'>План развития на предстоящий период</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_head_table4'>\n\
					<td style='height: 23px'>\n\
						<span class='textbold'>Цели развития</span>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<span class='textbold'>Действия</span>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<span class='textbold'>Сроки</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_head_table4'>\n\
					<td style='height: 43px'>Чего необходимо достичь? Какой результат должен быть достигнут в итоге?\n\
					</td>\n\
					<td style='height: 43px'>Что вы сделаете, чтобы добиться поставленной цели?</td>\n\
					<td style='height: 43px'>Когда вы достигните цели?</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col0_str0' rows='2'>" + (twelfthTable.col0_str0 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col1_str0' rows='2'>" + (twelfthTable.col1_str0 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col2_str0' rows='2'>" + (twelfthTable.col2_str0 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col0_str1' rows='2'>" + (twelfthTable.col0_str1 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col1_str1' rows='2'>" + (twelfthTable.col1_str1 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col2_str1' rows='2'>" + (twelfthTable.col2_str1 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col0_str2' rows='2'>" + (twelfthTable.col0_str2 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col1_str2' rows='2'>" + (twelfthTable.col1_str2 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col2_str2' rows='2'>" + (twelfthTable.col2_str2 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col0_str3' rows='2'>" + (twelfthTable.col0_str3 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col1_str3' rows='2'>" + (twelfthTable.col1_str3 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col2_str3' rows='2'>" + (twelfthTable.col2_str3 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col0_str4' rows='2'>" + (twelfthTable.col0_str4 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col1_str4' rows='2'>" + (twelfthTable.col1_str4 || '') + "</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col2_str4' rows='2'>" + (twelfthTable.col2_str4 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col0_str5' rows='2'>"+ (twelfthTable.col0_str5 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col1_str5' rows='2'>"+ (twelfthTable.col1_str5 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col2_str5' rows='2'>"+ (twelfthTable.col2_str5 || '') +"</textarea>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col0_str6' rows='2'>"+ (twelfthTable.col0_str6 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col1_str6' rows='2'>"+ (twelfthTable.col1_str6 || '') +"</textarea>\n\
					</td>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='twelfthTable.col2_str6' rows='2'>"+ (twelfthTable.col2_str6 || '') +"</textarea>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	)
}
},{}],21:[function(require,module,exports){
module.exports = function (user) {
	user = user || {};
	return (
		"<div class='userTemplate'>\n\
			<table align='center'>\n\
				<input type='hidden' name='person_id' value="+ user.id +" />\n\
				<tr>\n\
					<td class='color_head_table' style='height: 43px; width: 193px; text-align:left; padding-left:10px;'>\n\
						ФИО СОТРУДНИКА:\n\
					</td>\n\
					<td class='color_text_fone_table' style='height: 43px; width: 289px;'>" + user.name + "</td>\n\
					<td class='color_head_table' style='height: 43px; width: 193px; text-align:left; padding-left:10px;'>\n\
						ПОДРАЗДЕЛЕНИЕ:\n\
					</td>\n\
					<td class='color_text_fone_table' style='height: 43px'>" + user.subdivision + "</td>\n\
				</tr>\n\
				<tr class='color_head_table'>\n\
					<td style='height: 43px; width: 193px; text-align:left; padding-left:10px;'>ДОЛЖНОСТЬ:</td>\n\
					<td style='height: 43px; width: 289px;' class='color_text_fone_table'>" + user.position + "</td>\n\
					<td style='height: 43px; width: 193px; text-align:left; padding-left:10px;'>ФИО РУКОВОДИТЕЛЯ:</td>\n\
					<td style='height: 43px' class='color_text_fone_table'>" + user.bossName + "</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	);
}
},{}],22:[function(require,module,exports){
var AJAX_TIME_OVER = 10000;

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

window.Ajax = Ajax;
module.exports = Ajax;     

},{}],23:[function(require,module,exports){
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


},{"../config":1,"./Ajax":22,"./utils":26}],24:[function(require,module,exports){
/*
      json_parse.js
      2015-05-02
      Public Domain.
      NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
      This file creates a json_parse function.
          json_parse(text, reviver)
              This method parses a JSON text to produce an object or array.
              It can throw a SyntaxError exception.
              The optional reviver parameter is a function that can filter and
              transform the results. It receives each of the keys and values,
              and its return value is used instead of the original value.
              If it returns what it received, then the structure is not modified.
              If it returns undefined then the member is deleted.
              Example:
              // Parse the text. Values that look like ISO date strings will
              // be converted to Date objects.
              myData = json_parse(text, function (key, value) {
                  var a;
                  if (typeof value === 'string') {
                      a =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                      if (a) {
                          return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                              +a[5], +a[6]));
                      }
                  }
                  return value;
              });
      This is a reference implementation. You are free to copy, modify, or
      redistribute.
      This code should be minified before deployment.
      See http://javascript.crockford.com/jsmin.html
      USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
      NOT CONTROL.
  */

  /*jslint for */

  /*property 
      at, b, call, charAt, f, fromCharCode, hasOwnProperty, message, n, name, 
      prototype, push, r, t, text
  */

  var json_parse = (function () {
      "use strict";

  // This is a function that can parse a JSON text, producing a JavaScript
  // data structure. It is a simple, recursive descent parser. It does not use
  // eval or regular expressions, so it can be used as a model for implementing
  // a JSON parser in other languages.

  // We are defining the function inside of another function to avoid creating
  // global variables.

      var at,     // The index of the current character
          ch,     // The current character
          escapee = {
              '"': '"',
              '\\': '\\',
              '/': '/',
              b: '\b',
              f: '\f',
              n: '\n',
              r: '\r',
              t: '\t'
          },
          text,

          error = function (m) {

  // Call error when something is wrong.

              throw {
                  name: 'SyntaxError',
                  message: m,
                  at: at,
                  text: text
              };
          },

          next = function (c) {

  // If a c parameter is provided, verify that it matches the current character.

              if (c && c !== ch) {
                  error("Expected '" + c + "' instead of '" + ch + "'");
              }

  // Get the next character. When there are no more characters,
  // return the empty string.

              ch = text.charAt(at);
              at += 1;
              return ch;
          },

          number = function () {

  // Parse a number value.

              var number,
                  string = '';

              if (ch === '-') {
                  string = '-';
                  next('-');
              }
              while (ch >= '0' && ch <= '9') {
                  string += ch;
                  next();
              }
              if (ch === '.') {
                  string += '.';
                  while (next() && ch >= '0' && ch <= '9') {
                      string += ch;
                  }
              }
              if (ch === 'e' || ch === 'E') {
                  string += ch;
                  next();
                  if (ch === '-' || ch === '+') {
                      string += ch;
                      next();
                  }
                  while (ch >= '0' && ch <= '9') {
                      string += ch;
                      next();
                  }
              }
              number = +string;
              if (!isFinite(number)) {
                  error("Bad number");
              } else {
                  return number;
              }
          },

          string = function () {

  // Parse a string value.

              var hex,
                  i,
                  string = '',
                  uffff;

  // When parsing for string values, we must look for " and \ characters.

              if (ch === '"') {
                  while (next()) {
                      if (ch === '"') {
                          next();
                          return string;
                      }
                      if (ch === '\\') {
                          next();
                          if (ch === 'u') {
                              uffff = 0;
                              for (i = 0; i < 4; i += 1) {
                                  hex = parseInt(next(), 16);
                                  if (!isFinite(hex)) {
                                      break;
                                  }
                                  uffff = uffff * 16 + hex;
                              }
                              string += String.fromCharCode(uffff);
                          } else if (typeof escapee[ch] === 'string') {
                              string += escapee[ch];
                          } else {
                              break;
                          }
                      } else {
                          string += ch;
                      }
                  }
              }
              error("Bad string");
          },

          white = function () {

  // Skip whitespace.

              while (ch && ch <= ' ') {
                  next();
              }
          },

          word = function () {

  // true, false, or null.

              switch (ch) {
              case 't':
                  next('t');
                  next('r');
                  next('u');
                  next('e');
                  return true;
              case 'f':
                  next('f');
                  next('a');
                  next('l');
                  next('s');
                  next('e');
                  return false;
              case 'n':
                  next('n');
                  next('u');
                  next('l');
                  next('l');
                  return null;
              }
              error("Unexpected '" + ch + "'");
          },

          value,  // Place holder for the value function.

          array = function () {

  // Parse an array value.

              var array = [];

              if (ch === '[') {
                  next('[');
                  white();
                  if (ch === ']') {
                      next(']');
                      return array;   // empty array
                  }
                  while (ch) {
                      array.push(value());
                      white();
                      if (ch === ']') {
                          next(']');
                          return array;
                      }
                      next(',');
                      white();
                  }
              }
              error("Bad array");
          },

          object = function () {

  // Parse an object value.

              var key,
                  object = {};

              if (ch === '{') {
                  next('{');
                  white();
                  if (ch === '}') {
                      next('}');
                      return object;   // empty object
                  }
                  while (ch) {
                      key = string();
                      white();
                      next(':');
                      if (Object.hasOwnProperty.call(object, key)) {
                          error('Duplicate key "' + key + '"');
                      }
                      object[key] = value();
                      white();
                      if (ch === '}') {
                          next('}');
                          return object;
                      }
                      next(',');
                      white();
                  }
              }
              error("Bad object");
          };

      value = function () {

  // Parse a JSON value. It could be an object, an array, a string, a number,
  // or a word.

          white();
          switch (ch) {
          case '{':
              return object();
          case '[':
              return array();
          case '"':
              return string();
          case '-':
              return number();
          default:
              return ch >= '0' && ch <= '9' 
                  ? number() 
                  : word();
          }
      };

  // Return the json_parse function. It will have access to all of the above
  // functions and variables.

      return function (source, reviver) {
          var result;

          text = source;
          at = 0;
          ch = ' ';
          result = value();
          white();
          if (ch) {
              error("Syntax error");
          }

  // If there is a reviver function, we recursively walk the new structure,
  // passing each name/value pair to the reviver function for possible
  // transformation, starting with a temporary root object that holds the result
  // in an empty key. If there is not a reviver function, we simply return the
  // result.

          return typeof reviver === 'function'
              ? (function walk(holder, key) {
                  var k, v, value = holder[key];
                  if (value && typeof value === 'object') {
                      for (k in value) {
                          if (Object.prototype.hasOwnProperty.call(value, k)) {
                              v = walk(value, k);
                              if (v !== undefined) {
                                  value[k] = v;
                              } else {
                                  delete value[k];
                              }
                          }
                      }
                  }
                  return reviver.call(holder, key, value);
              }({'': result}, ''))
              : result;
      };
  }());

module.exports = json_parse;
},{}],25:[function(require,module,exports){
module.exports = {
	createSelect: function (values, selectedValue, name) {
		var select = "<select name="+ name +" style='width: 45px'>";
		for (var i = 0, len = values.length; i < len; i++) {
			var option = values[i] == selectedValue ? "<option selected>" + values[i] + "</option>" : "<option>" + values[i] + "</option>";
			select += option;
		};
		return select.concat("</select>");
	},

	createCheckBox: function(isChecked, name){
		return isChecked === true ? "<input name="+name+" type='checkbox' checked/>" : "<input name="+name+" type='checkbox' />"
	}
}
},{}],26:[function(require,module,exports){
var utils = {

	decodeHtml: function(str) {
		var textArea = document.createElement('textarea');
	    textArea.innerHTML = str;
	 	var outStr = textArea.value.replace(/&#(\d+);/g, function(match, dec) {
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
},{}],27:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],28:[function(require,module,exports){
//! moment.js
//! version : 2.11.2
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function Locale() {
    }

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, values) {
        if (values !== null) {
            values.abbr = name;
            locales[name] = locales[name] || new Locale();
            locales[name].set(values);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        return isArray(this._months) ? this._months[m.month()] :
            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')$', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')$', 'i');
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (firstTime) {
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', false);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             if (this.isValid() && other.isValid()) {
                 return other < this ? this : other;
             } else {
                 return valid__createInvalid();
             }
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    var isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                d : parseIso(match[4], sign),
                h : parseIso(match[5], sign),
                m : parseIso(match[6], sign),
                s : parseIso(match[7], sign),
                w : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return +this > +localInput;
        } else {
            return +localInput < +this.clone().startOf(units);
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return +this < +localInput;
        } else {
            return +this.clone().endOf(units) < +localInput;
        }
    }

    function isBetween (from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return +this === +localInput;
        } else {
            inputMs = +localInput;
            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }
        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return +this._d - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(+this / 1000);
    }

    function toDate () {
        return this._offset ? new Date(+this) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // JSON.stringify(new Date(NaN)) === 'null'
        return this.isValid() ? this.toISOString() : 'null';
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        // console.log("got", weekYear, week, weekday, "set", date.toISOString());
        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   matchWord);
    addRegexToken('ddd',  matchWord);
    addRegexToken('dddd', matchWord);

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = local__createLocal([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = getSet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = getSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto._months           = defaultLocaleMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto._monthsRegex      = defaultMonthsRegex;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function list (format, index, field, count, setter) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, setter);
        }

        var i;
        var out = [];
        for (i = 0; i < count; i++) {
            out[i] = lists__get(format, i, field, setter);
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return list(format, index, 'months', 12, 'month');
    }

    function lists__listMonthsShort (format, index) {
        return list(format, index, 'monthsShort', 12, 'month');
    }

    function lists__listWeekdays (format, index) {
        return list(format, index, 'weekdays', 7, 'day');
    }

    function lists__listWeekdaysShort (format, index) {
        return list(format, index, 'weekdaysShort', 7, 'day');
    }

    function lists__listWeekdaysMin (format, index) {
        return list(format, index, 'weekdaysMin', 7, 'day');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.11.2';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImQ6XFxyZXBvc1xcYXNzZXNzbWVudC1mb3JtXFxub2RlX21vZHVsZXNcXGd1bHAtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvY29uZmlnLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL2Zha2VfNjE0ZjY0NmUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdGVtcGxhdGVzL2J1dHRvbnNQcmV2aWV3VGVtcGxhdGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdGVtcGxhdGVzL2J1dHRvbnNUZW1wbGF0ZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvZXJyb3JUZW1wbGF0ZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2VpZ2h0aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvZWxldmVudGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2ZpZnRoVGFibGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdGVtcGxhdGVzL3RhYmxlcy9maWZ0aHRlZW50aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvZmlyc3RUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2ZvdXJ0ZWVudGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2ZvdXJ0aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvbmludGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL3NlY29uZFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvc2V2ZW50aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvc2l4dGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL3RlbnRoVGFibGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdGVtcGxhdGVzL3RhYmxlcy90aGlyZFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvdGhpcnRlZW50aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvdHdlbGZ0aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy91c2VyVGVtcGxhdGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdXRpbHMvQWpheC5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy91dGlscy9mb3Jtcy5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy91dGlscy9qc29uUGFyc2UuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdXRpbHMvdWkuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdXRpbHMvdXRpbHMuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL25vZGVfbW9kdWxlcy9tb21lbnQvbW9tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL29CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKHByb2Nlc3Mpe1xudmFyIHNlcnZlcklkID0gJzYyNTE1NDg4NzUyMzk2MTE2NDknO1xyXG52YXIgcm91dGVySWQgPSAnNjI1MTU0NzYyMDkzMDUwODY5Nic7XHJcbnZhciBjdXN0b21CYXNlVXJsID0gJy9jdXN0b21fd2ViX3RlbXBsYXRlLmh0bWwnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuXHJcblx0dXJsOiB7XHJcblx0XHRkZWZhdWx0UGF0aDogY3VzdG9tQmFzZVVybC5jb25jYXQoJz9vYmplY3RfaWQ9JykuY29uY2F0KHJvdXRlcklkKS5jb25jYXQoJyZzZXJ2ZXJfaWQ9Jy5jb25jYXQoc2VydmVySWQpKSxcclxuXHRcdGNyZWF0ZVBhdGg6IGZ1bmN0aW9uKG9iail7XHJcblx0XHRcdHZhciBzdHJQYXJhbXMgPSBcIlwiO1xyXG5cdFx0XHRmb3IgKGtleSBpbiBvYmope1xyXG5cdFx0XHRcdHN0clBhcmFtcyArPSAnJicgKyBrZXkgKyAnPScgKyBvYmpba2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5kZWZhdWx0UGF0aCArIHN0clBhcmFtcztcclxuXHRcdH1cclxuXHR9LFxyXG5cdFxyXG5cdHNldFNlcnZlcklkOiBmdW5jdGlvbihfc2VydmVySWQpe1xyXG5cdFx0c2VydmVySWQgPSBfc2VydmVySWQ7XHJcblx0fSxcclxuXHJcblx0c2V0Um91dGVySWQ6IGZ1bmN0aW9uKF9yb3V0ZXJJZCl7XHJcblx0XHRyb3V0ZXJJZCA9IF9yb3V0ZXJJZDtcclxuXHR9LFxyXG5cclxuXHRzZXRDdXN0b21CYXNlVXJsOiBmdW5jdGlvbihfY3VzdG9tQmFzZVVybCl7XHJcblx0XHRjdXN0b21CYXNlVXJsID0gX2N1c3RvbUJhc2VVcmw7XHJcblx0fSxcclxuXHJcblx0c2V0UHJvZHVjdGlvbk1vZGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHByb2Nlc3MuZW52Lk5PREVfRU5WID0gJ3Byb2R1Y3Rpb24nO1xyXG5cdH1cclxufVxyXG5cclxud2luZG93LmNvbmZpZyA9IGNvbmZpZztcclxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XG59KS5jYWxsKHRoaXMscmVxdWlyZShcIlZDbUVzd1wiKSkiLCJ2YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcclxudmFyIHVzZXJUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3VzZXJUZW1wbGF0ZScpO1xyXG52YXIgZXJyb3JUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2Vycm9yVGVtcGxhdGUnKTtcclxuXHJcbnZhciBmaXJzdFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL2ZpcnN0VGFibGUnKTtcclxudmFyIHNlY29uZFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL3NlY29uZFRhYmxlJyk7XHJcbnZhciB0aGlyZFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL3RoaXJkVGFibGUnKTtcclxudmFyIGZvdXJ0aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL2ZvdXJ0aFRhYmxlJyk7XHJcbnZhciBmaWZ0aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL2ZpZnRoVGFibGUnKTtcclxudmFyIHNpeHRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvc2l4dGhUYWJsZScpO1xyXG52YXIgc2V2ZW50aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL3NldmVudGhUYWJsZScpO1xyXG52YXIgZWlnaHRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvZWlnaHRoVGFibGUnKTtcclxudmFyIG5pbnRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvbmludGhUYWJsZScpO1xyXG52YXIgdGVudGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy90ZW50aFRhYmxlJyk7XHJcbnZhciBlbGV2ZW50aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL2VsZXZlbnRoVGFibGUnKTtcclxudmFyIHR3ZWxmdGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy90d2VsZnRoVGFibGUnKTtcclxudmFyIHRoaXJ0ZWVudGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy90aGlydGVlbnRoVGFibGUnKTtcclxudmFyIGZvdXJ0ZWVudGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy9mb3VydGVlbnRoVGFibGUnKTtcclxudmFyIGZpZnRodGVlbnRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvZmlmdGh0ZWVudGhUYWJsZScpO1xyXG5cclxuXHJcbnZhciBidXR0b25zVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9idXR0b25zVGVtcGxhdGUnKTtcclxudmFyIGJ1dHRvbnNQcmV2aWV3VGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9idXR0b25zUHJldmlld1RlbXBsYXRlJylcclxudmFyIGFqYXggPSByZXF1aXJlKCcuL3V0aWxzL0FqYXgnKTtcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscy91dGlscycpO1xyXG52YXIganNvblBhcnNlID0gcmVxdWlyZSgnLi91dGlscy9qc29uUGFyc2UnKTtcclxuXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKXtcclxuXHRzdGFydCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0FjY2Vzcyh1c2VyKXtcclxuXHR1c2VyID0gdXNlciB8fCB7fTtcclxuXHRyZXR1cm4gdXNlci5hY2Nlc3MgPT09IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURhdGVQaWNrZXJzKCkge1xyXG5cdCQoJy5maXJzdFRhYmxlX19kYXRlJykuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzKS5kYXRlcGlja2VyKHtkYXRlRm9ybWF0OiBcImRkLm1tLnl5XCJ9KTtcclxuXHR9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VUZXh0QXJlYUhlaWdodCgpe1xyXG5cdCQoJ3RleHRhcmVhJykuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHRleHRBcmVhID0gJCh0aGlzKTtcclxuXHRcdGlmICh0ZXh0QXJlYS50ZXh0KCkgPT09ICcnKSByZXR1cm47XHJcblxyXG5cdFx0dGV4dEFyZWEuc2Nyb2xsVG9wKHRleHRBcmVhLmdldCgwKS5zY3JvbGxIZWlnaHQpO1xyXG5cclxuXHRcdHZhciBzY3JvbGxIZWlnaHQgPSB0ZXh0QXJlYS5zY3JvbGxUb3AoKSArIHRleHRBcmVhLmhlaWdodCgpICsgMTQ7IC8vMTQgLSBsaW5lLWhlaWdodFxyXG5cclxuXHRcdHRleHRBcmVhLnNjcm9sbFRvcCgwKTtcclxuXHRcdHRleHRBcmVhLmhlaWdodChzY3JvbGxIZWlnaHQpO1xyXG5cdFx0Lyp2YXIgZGl2ID0gJCgnPGRpdi8+JykudGV4dCh0ZXh0QXJlYS50ZXh0KCkpXHJcblx0XHRkaXYud2lkdGgodGV4dEFyZWEud2lkdGgoKSk7XHJcblx0XHQkKGRvY3VtZW50LmJvZHkpLmFwcGVuZChkaXYpO1xyXG5cdFx0dGV4dEFyZWEuaGVpZ2h0KE51bWJlcihkaXYuaGVpZ2h0KCkpICsgMjUpO1xyXG5cdFx0ZGl2LnJlbW92ZSgpOyovXHJcblx0fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJsb2NrSW5wdXRzKCl7XHJcblx0JCgnaW5wdXQsIHRleHRhcmVhJykuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzKS5hdHRyKHtkaXNhYmxlZDogdHJ1ZX0pO1xyXG5cdH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVCYXNlSHRtbChmb3JtSWQsIGZvcm1UeXBlSWQsIGNhbGxCYWNrKSB7XHJcblx0YWpheC5zZW5kUmVxdWVzdChjb25maWcudXJsLmNyZWF0ZVBhdGgoe2FjdGlvbl9uYW1lOiAnZ2V0RGF0YScsIGZvcm1faWQ6IGZvcm1JZCwgZm9ybV90eXBlX2lkOiBmb3JtVHlwZUlkfSksIGZ1bmN0aW9uIChfZGF0YSkge1xyXG5cdFx0dmFyIGlzUHJldmlldyA9IHV0aWxzLmdldFVybFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaHJlZiwgJ3ByZXZpZXcnKTtcclxuXHRcdGlzUHJldmlldyA9IGlzUHJldmlldyA/IGpzb25QYXJzZShpc1ByZXZpZXcpIDogZmFsc2U7XHJcblxyXG5cdFx0dmFyIGRhdGEgPSBudWxsO1xyXG5cdFx0dmFyIGJhc2VIdG1sID0gJyc7XHJcblx0XHR2YXIgYnV0dG9uc0h0bWwgPSAnJztcclxuXHJcblx0XHR0cnkgeyBkYXRhID0ganNvblBhcnNlKHV0aWxzLmRlY29kZUh0bWwoX2RhdGEpKTsgfVxyXG5cdFx0Y2F0Y2goZSkgeyBcclxuXHRcdFx0Y29uc29sZS5sb2coZSk7IFxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFpc0FjY2VzcyhkYXRhLnVzZXIpKSB7XHJcblx0XHRcdGJhc2VIdG1sID0gZXJyb3JUZW1wbGF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGJhc2VIdG1sID0gdXNlclRlbXBsYXRlKGRhdGEudXNlcikgKyBcclxuXHRcdFx0XHRmaXJzdFRhYmxlKGRhdGEuZmlyc3RUYWJsZSkgKyBcclxuXHRcdFx0XHRzZWNvbmRUYWJsZShkYXRhLnNlY29uZFRhYmxlKSArXHJcblx0XHRcdFx0dGhpcmRUYWJsZShkYXRhLnRoaXJkVGFibGUpICtcclxuXHRcdFx0XHRmb3VydGhUYWJsZShkYXRhLmZvdXJ0aFRhYmxlKSArXHJcblx0XHRcdFx0ZmlmdGhUYWJsZShkYXRhLmZpZnRoVGFibGUpICtcclxuXHRcdFx0XHRzaXh0aFRhYmxlKGRhdGEuc2l4dGhUYWJsZSkgK1xyXG5cdFx0XHRcdHNldmVudGhUYWJsZShkYXRhLnNldmVudGhUYWJsZSkgK1xyXG5cdFx0XHRcdGVpZ2h0aFRhYmxlKGRhdGEuZWlnaHRoVGFibGUpICtcclxuXHRcdFx0XHRuaW50aFRhYmxlKGRhdGEubmludGhUYWJsZSkgK1xyXG5cdFx0XHRcdHRlbnRoVGFibGUoZGF0YS50ZW50aFRhYmxlKSArIFx0XHQgXHJcblx0XHRcdFx0ZWxldmVudGhUYWJsZShkYXRhLmVsZXZlbnRoVGFibGUpICsgXHJcblx0XHRcdFx0dHdlbGZ0aFRhYmxlKGRhdGEudHdlbGZ0aFRhYmxlKSArXHJcblx0XHRcdFx0dGhpcnRlZW50aFRhYmxlKGRhdGEudGhpcnRlZW50aFRhYmxlKSArXHJcblx0XHRcdFx0Zm91cnRlZW50aFRhYmxlKGRhdGEuZm91cnRlZW50aFRhYmxlKSArXHJcblx0XHRcdFx0ZmlmdGh0ZWVudGhUYWJsZShkYXRhLmZpZnRodGVlbnRoVGFibGUpO1xyXG5cclxuXHRcdFx0aWYgKGlzUHJldmlldyl7XHJcblx0XHRcdFx0YnV0dG9uc0h0bWwgPSBidXR0b25zUHJldmlld1RlbXBsYXRlKCk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbmRlci1wcmV2aWV3LWJ1dHRvbnMnKS5pbm5lckhUTUwgPSBidXR0b25zSHRtbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGJ1dHRvbnNIdG1sID0gYnV0dG9uc1RlbXBsYXRlKGRhdGEudXNlcik7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbmRlci1idXR0b25zJykuaW5uZXJIVE1MID0gYnV0dG9uc0h0bWw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW5kZXItZm9ybXMnKS5pbm5lckhUTUwgPSBiYXNlSHRtbDtcclxuXHRcdGlmIChpc1ByZXZpZXcpe1xyXG5cdFx0XHRibG9ja0lucHV0cygpO1xyXG5cdFx0XHRjaGFuZ2VUZXh0QXJlYUhlaWdodCgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiAoY2FsbEJhY2spIGNhbGxCYWNrKCk7XHJcblx0fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0KCkge1xyXG5cdHZhciBmb3JtVHlwZUlkID0gdXRpbHMuZ2V0VXJsUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAnb2JqZWN0X2lkJykgfHwgdXRpbHMuZ2V0VXJsUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAnZm9ybV90eXBlX2lkJyk7XHJcblx0dmFyIGZvcm1JZCA9IHV0aWxzLmdldFVybFBhcmFtcyh3aW5kb3cucGFyZW50LmxvY2F0aW9uLmhyZWYsICdvYmplY3RfaWQnKSB8fCAgdXRpbHMuZ2V0VXJsUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAnZm9ybV9pZCcpO1xyXG5cdGNyZWF0ZUJhc2VIdG1sKGZvcm1JZCwgZm9ybVR5cGVJZCwgY3JlYXRlRGF0ZVBpY2tlcnMpO1xyXG59XHJcblxyXG5cclxuXHJcbiIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciBmb3JtcyA9IHJlcXVpcmUoJy4uL3V0aWxzL2Zvcm1zJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VyKSB7XHJcblx0cmV0dXJuIChcclxuXHRcdFwiPGJ1dHRvbiBvbmNsaWNrPXdpbmRvdy5mb3Jtcy5zYXZlUGRmKGV2ZW50KSBjbGFzcz0naW5wdXRCdXR0b24nPtCh0L7RhdGA0LDQvdC40YLRjCDQsiAuUERGPC9idXR0b24+XFxuXFxcclxuXHRcdCA8YnV0dG9uIG9uY2xpY2s9d2luZG93LmZvcm1zLnNhdmVEb2MoZXZlbnQpIGNsYXNzPSdpbnB1dEJ1dHRvbic+0KHQvtGF0YDQsNC90LjRgtGMINCyIC5ET0M8L2J1dHRvbj5cXG5cXFxyXG5cdFx0IDxidXR0b24gb25jbGljaz13aW5kb3cuZm9ybXMucHJpbnQoKSBjbGFzcz0naW5wdXRCdXR0b24nPtCf0LXRh9Cw0YLRjDwvYnV0dG9uPlwiXHJcblx0KTtcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciBmb3JtcyA9IHJlcXVpcmUoJy4uL3V0aWxzL2Zvcm1zJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VyKSB7XHJcblx0dXNlciA9IHVzZXIgfHwge307XHJcblx0dXNlci5pc0Jvc3MgPSB1c2VyLmlzQm9zcyB8fCBmYWxzZTtcclxuXHR1c2VyLmZvcm1TdGF0dXMgPSB1c2VyLmZvcm1TdGF0dXMgfHwgJyc7XHJcblxyXG5cdGlmICh1dGlscy5zdHJCb29sVG9Cb29sKHVzZXIuaXNCb3NzKSkge1xyXG5cdFx0aWYgKHVzZXIuZm9ybVN0YXR1cyA9PT0gJ2RlY2xpbmVkJyB8fCB1c2VyLmZvcm1TdGF0dXMgPT09ICdjb25maXJtZWQnKSB7XHJcblx0XHRcdHJldHVybiBcIjxhIGhyZWY9JyMnIG9uY2xpY2s9d2luZG93LmZvcm1zLnJlcXVlc3RQcmV2aWV3Rm9ybShldmVudCkgY2xhc3M9J2lucHV0QnV0dG9uJz7Qn9GA0L7RgdC80L7RgtGAINGE0L7RgNC80Ys8L2E+XCI7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdFwiPGlucHV0IHR5cGU9J2J1dHRvbicgb25jbGljaz13aW5kb3cuZm9ybXMuc2VuZEZvcm0oJ3NhdmUnKSB2YWx1ZT0n0KHQvtGF0YDQsNC90LjRgtGMJyBjbGFzcz0naW5wdXRCdXR0b24nIC8+XFxuXFxcclxuXHRcdFx0PGlucHV0IHR5cGU9J2J1dHRvbicgb25jbGljaz13aW5kb3cuZm9ybXMuc2VuZEZvcm0oJ2RlY2xpbmVkJykgdmFsdWU9J9Ce0YLQutC70L7QvdC40YLRjCcgY2xhc3M9J2lucHV0QnV0dG9uJy8+XFxuXFxcclxuXHRcdFx0PGlucHV0IHR5cGU9J2J1dHRvbicgb25jbGljaz13aW5kb3cuZm9ybXMuc2VuZEZvcm0oJ2NvbmZpcm1lZCcpIHZhbHVlPSfQo9GC0LLQtdGA0LTQuNGC0YwnIGNsYXNzPSdpbnB1dEJ1dHRvbicvPlxcblxcXHJcblx0XHRcdDxhIGhyZWY9JyMnIG9uY2xpY2s9d2luZG93LmZvcm1zLnJlcXVlc3RQcmV2aWV3Rm9ybShldmVudCkgY2xhc3M9J2lucHV0QnV0dG9uJz7Qn9GA0L7RgdC80L7RgtGAINGE0L7RgNC80Ys8L2E+XCJcclxuXHRcdCk7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0aWYgKHVzZXIuZm9ybVN0YXR1cyA9PT0gJ2FjdGl2ZScpIHtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcIjxpbnB1dCB0eXBlPSdidXR0b24nIG9uY2xpY2s9d2luZG93LmZvcm1zLnNlbmRGb3JtKCdzYXZlJykgdmFsdWU9J9Ch0L7RhdGA0LDQvdC40YLRjCcgY2xhc3M9J2lucHV0QnV0dG9uJy8+IFxcblxcXHJcblx0XHRcdFx0PGlucHV0IHR5cGU9J2J1dHRvbicgb25jbGljaz13aW5kb3cuZm9ybXMuc2VuZEZvcm0oJ3NlbmRfcmVxdWVzdCcpIHZhbHVlPSfQntGC0L/RgNCw0LLQuNGC0Ywg0L3QsCDQv9C+0LTRgtCy0LXRgNC20LTQtdC90LjQtScgY2xhc3M9J2lucHV0QnV0dG9uJy8+XFxuXFxcclxuXHRcdFx0XHQ8YSBocmVmPScjJyBvbmNsaWNrPXdpbmRvdy5mb3Jtcy5yZXF1ZXN0UHJldmlld0Zvcm0oZXZlbnQpIGNsYXNzPSdpbnB1dEJ1dHRvbic+0J/RgNC+0YHQvNC+0YLRgCDRhNC+0YDQvNGLPC9hPlwiXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gXCI8YSBocmVmPScjJyBvbmNsaWNrPXdpbmRvdy5mb3Jtcy5yZXF1ZXN0UHJldmlld0Zvcm0oZXZlbnQpIGNsYXNzPSdpbnB1dEJ1dHRvbic+0J/RgNC+0YHQvNC+0YLRgCDRhNC+0YDQvNGLPC9hPlwiO1xyXG5cdH1cclxuXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0XCI8Y2VudGVyPlxcblxcXHJcblx0XHRcdDx0YWJsZSB3aWR0aD0nMzAwJyBoZWlnaHQ9JzEwMCcgc3R5bGU9J2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6NXB4O2JvcmRlci1jb2xvcjpyZWQ7JyBjZWxsc3BhY2luZz0nMCcgY2VsbHBhZGRpbmc9JzUnPlxcblxcXHJcblx0XHRcdFx0PHRib2R5PlxcblxcXHJcblx0XHRcdFx0XHQ8dHIgYmdjb2xvcj0nI0ZGRkZGRic+IFxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZD48aW1nIHNyYz0nL3BpY3MvYXR0ZW4uanBnJz48L3RkPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZD48Yj48Zm9udCBzaXplPScyJz7QoyDQktCw0YEg0L3QtdC00L7RgdGC0LDRgtC+0YfQvdC+INC/0YDQsNCyINC00L7RgdGC0YPQv9CwINC00LvRjyDQv9GA0L7RgdC80L7RgtGA0LAg0Y3RgtC+0LPQviDQtNC+0LrRg9C80LXQvdGC0LAuPC9mb250PjwvYj48L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PC90Ym9keT5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2NlbnRlcj5cIlxyXG5cdCk7XHJcbn0iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xyXG52YXIgdWkgPSByZXF1aXJlKCcuLi8uLi91dGlscy91aScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWlnaHRoVGFibGUpIHtcclxuXHRlaWdodGhUYWJsZSA9IGVpZ2h0aFRhYmxlIHx8IHt9O1xyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J2VpZ2h0aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcicgY2xhc3M9J2VpZ2h0aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTInPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY29sc3Bhbj0nNCcgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntGG0LXQvdC60LAg0YHQvtC+0YLQstC10YLRgdGC0LLQuNGPINC70LjRh9C90L7RgdGC0L3Ri9C8INC60L7QvNC/0LXRgtC10L3RhtC40Y/QvDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J3QuNC30LrQuNC5INGA0LXQt9GD0LvRjNGC0LDRgjwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KHRgNC10LTQvdC40Lkg0YDQtdC30YPQu9GM0YLQsNGCPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QpdC+0YDQvtGI0LjQuSDRgNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCS0YvRgdC+0LrQuNC5INGA0LXQt9GD0LvRjNGC0LDRgjwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZWlnaHRoVGFibGUuY29sMF9zdHIwKSwgJ2VpZ2h0aFRhYmxlLmNvbDBfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChlaWdodGhUYWJsZS5jb2wxX3N0cjApLCAnZWlnaHRoVGFibGUuY29sMV9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGVpZ2h0aFRhYmxlLmNvbDJfc3RyMCksICdlaWdodGhUYWJsZS5jb2wyX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZWlnaHRoVGFibGUuY29sM19zdHIwKSwgJ2VpZ2h0aFRhYmxlLmNvbDNfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0PC90YWJsZT5cXG5cXFxyXG5cdFx0PC9kaXY+XCJcclxuXHQpXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbGV2ZW50aFRhYmxlKSB7XHJcblx0ZWxldmVudGhUYWJsZSA9IGVsZXZlbnRoVGFibGUgfHwge307XHJcblx0cmV0dXJuIChcclxuXHRcdFwiPGRpdiBjbGFzcz0nZWxldmVudGhUYWJsZSc+XFxuXFxcclxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInIGNsYXNzPSdlbGV2ZW50aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTQnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY29sc3Bhbj0nMycgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9C70LDQvSDRgNCw0LfQstC40YLQuNGPINC90LAg0L/RgNC10LTRgdGC0L7Rj9GJ0LjQuSDQv9C10YDQuNC+0LQ8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlNCc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCm0LXQu9C4INGA0LDQt9Cy0LjRgtC40Y88L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCU0LXQudGB0YLQstC40Y88L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQvtC60Lg8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlNCc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz7QmtCw0LrQuNC1INC+0LHQu9Cw0YHRgtC4INCy0Ysg0LLRi9C00LXQu9GP0LXRgtC1INC00LvRjyDQv9C+0LLRi9GI0LXQvdC40Y8g0Y3RhNGE0LXQutGC0LjQstC90L7RgdGC0Lg/XFxuXFxcclxuXHRcdFx0XHRcdFx00JrQsNC6INCy0Ysg0YPQt9C90LDQtdGC0LUsINGH0YLQviDQstGLINC+0YHQstC+0LjQu9C4INGN0YLRgyDQvtCx0LvQsNGB0YLRjD9cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPtCn0YLQviDQstGLINGB0LTQtdC70LDQtdGC0LUsINGH0YLQvtCx0Ysg0LTQvtCx0LjRgtGM0YHRjyDQv9C+0YHRgtCw0LLQu9C10L3QvdC+0Lkg0YbQtdC70Lgg0L/QviDRgNCw0LfQstC40YLQuNGOPzwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz7QmtC+0LPQtNCwINCy0Ysg0LTQvtGB0YLQuNCz0L3QuNGC0LUg0YbQtdC70Lgg0L/QviDRgNCw0LfQstC40YLQuNGOPzwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDBfc3RyMCcgcm93cz0nMic+XCIgKyAoZWxldmVudGhUYWJsZS5jb2wwX3N0cjAgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDFfc3RyMCcgcm93cz0nMic+XCIgKyAoZWxldmVudGhUYWJsZS5jb2wxX3N0cjAgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDJfc3RyMCcgcm93cz0nMic+XCIgKyAoZWxldmVudGhUYWJsZS5jb2wyX3N0cjAgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjEnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMF9zdHIxIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wxX3N0cjEnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMV9zdHIxIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wyX3N0cjEnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMl9zdHIxIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMF9zdHIyJyByb3dzPScyJz5cIiArIChlbGV2ZW50aFRhYmxlLmNvbDBfc3RyMiB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMV9zdHIyJyByb3dzPScyJz5cIiArIChlbGV2ZW50aFRhYmxlLmNvbDFfc3RyMiB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMl9zdHIyJyByb3dzPScyJz5cIiArIChlbGV2ZW50aFRhYmxlLmNvbDJfc3RyMiB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDBfc3RyMycgcm93cz0nMic+XCIgKyAoZWxldmVudGhUYWJsZS5jb2wwX3N0cjMgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDFfc3RyMycgcm93cz0nMic+XCIgKyAoZWxldmVudGhUYWJsZS5jb2wxX3N0cjMgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDJfc3RyMycgcm93cz0nMic+XCIgKyAoZWxldmVudGhUYWJsZS5jb2wyX3N0cjMgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjQnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMF9zdHI0IHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wxX3N0cjQnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMV9zdHI0IHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wyX3N0cjQnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMl9zdHI0IHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMF9zdHI1JyByb3dzPScyJz5cIisgKGVsZXZlbnRoVGFibGUuY29sMF9zdHI1IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDFfc3RyNScgcm93cz0nMic+XCIrIChlbGV2ZW50aFRhYmxlLmNvbDFfc3RyNSB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wyX3N0cjUnIHJvd3M9JzInPlwiKyAoZWxldmVudGhUYWJsZS5jb2wyX3N0cjUgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDBfc3RyNicgcm93cz0nMic+XCIrIChlbGV2ZW50aFRhYmxlLmNvbDBfc3RyNiB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wxX3N0cjYnIHJvd3M9JzInPlwiKyAoZWxldmVudGhUYWJsZS5jb2wxX3N0cjYgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMl9zdHI2JyByb3dzPScyJz5cIisgKGVsZXZlbnRoVGFibGUuY29sMl9zdHI2IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmaWZ0aFRhYmxlKSB7XHJcblx0ZmlmdGhUYWJsZSA9IGZpZnRoVGFibGUgfHwge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J2ZpZnRoVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Ql9CQ0JPQntCb0J7QktCe0Jo8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHTRgtC10LrRgdGCXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdDwvdGFibGU+XFxuXFxcclxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlMic+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPScyJyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCa0L7QvNC/0LXRgtC10L3RhtC40Y88L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPScyJyBzdHlsZT0nd2lkdGg6IDU0MHB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0L7QstC10LTQtdC90YfQtdGB0LrQuNC5INC40L3QtNC40LrQsNGC0L7RgDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNvbHNwYW49JzMnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7RhtC10L3QutCwINGA0LXQt9GD0LvRjNGC0LDRgtCwPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTInPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0YDQvtGP0LLQu9GP0LXRgiDQv9C+0LvQvdC+0YHRgtGM0Y48L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J/RgNC+0Y/QstC70Y/QtdGCINGH0LDRgdGC0LjRh9C90L48L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7QsdGJ0LDRjyDQvtGG0LXQvdC60LA8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiAxOThweDsnIHJvd3NwYW49JzUnPtCb0Y7QsdC+0LLRjDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNTQwcHg7Jz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0L/QvtCy0YvRiNC10L3QvdGL0Lkg0LjQvdGC0LXRgNC10YEg0Log0LzQuNGA0YMg0LzQvtC00Ys8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjApLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHIwX2J5NSwgJ2ZpZnRoVGFibGUuY29sMl9zdHIwX2J5NScpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCb0Y7QsdC40YIg0Y3Qu9C10LPQsNC90YLQvdGD0Y4g0L7QsdGD0LLRjDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIxKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCf0YDQvtGP0LLQu9GP0LXRgiDQuNC90YLQtdGA0LXRgSDQuiDQkdGA0LXQvdC00YMg0Lgg0LrQvtC80L/QsNC90LjQuCDQsiDRhtC10LvQvtC8PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjIpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjInKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyNHB4Oyc+0KfRg9Cy0YHRgtCy0YPQtdGCINC90LXQvNCw0YLQtdGA0LjQsNC70YzQvdGD0Y4g0YbQtdC90L3QvtGB0YLRjCDQstC10YnQtdC5PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyNHB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIzKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDI0cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjMpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjMnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J/QvtC90LjQvNCw0LXRgiDQuCDRgNCw0LfQtNC10LvRj9C10YIg0YbQtdC90L3QvtGB0YLQuCDQkdGA0LXQvdC00LA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc1JyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QrdC80L/QsNGC0LjRh9C90YvQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDI0cHg7Jz7Qo9C/0YDQsNCy0LvRj9C10YIg0Y3QvNC+0YbQuNGP0LzQuCDQuCDQvdCw0YHRgtGA0L7QtdC90LjQtdC8INC/0YDQuCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQuNC4INGBINC70Y7QtNGM0LzQuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjRweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyNHB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI1KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHI1X2J5NSwgJ2ZpZnRoVGFibGUuY29sMl9zdHI1X2J5NScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0YLQvtC70LXRgNCw0L3RgtC90L7RgdGC0Ywg0L/QviDQvtGC0L3QvtGI0LXQvdC40Y4g0Log0LvRjtC00Y/QvDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI2KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI2JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA1NDBweCc+0KPQvNC10LXRgiDQv9C+0L3Rj9GC0Ywg0Y3QvNC+0YbQuNC+0L3QsNC70YzQvdC+0LUg0YHQvtGB0YLQvtGP0L3QuNC1INGH0LXQu9C+0LLQtdC60LA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjcpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjcnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyOCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0LLQvdC40LzQsNC90LjQtSDQv9C+INC+0YLQvdC+0YjQtdC90LjRjiDQuiDQu9GO0LTRj9C8PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI4KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI4JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjgpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjgnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0KPQv9GA0LDQstC70Y/QtdGCINGN0LzQvtGG0LjQvtC90LDQu9GM0L3Ri9C8INGB0L7RgdGC0L7Rj9C90LjQtdC8INC60L7QvNCw0L3QtNGLPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI5KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI5JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjkpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjknKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNScgc3R5bGU9J3dpZHRoOiAxOThweCc+0KHQvtCy0LXRgNGI0LXQvdGB0YLQstGD0Y7RidC40LnRgdGPPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0LDQvNC+0YHRgtC+0Y/RgtC10LvRjNC90L4g0LjQvdC40YbQuNC40YDRg9C10YIg0LLQsNGA0LjQsNC90YLRiyDRgNC10YjQtdC90LjRjyDQt9Cw0LTQsNGHPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxMCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTApLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjEwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHIxMF9ieTUsICdmaWZ0aFRhYmxlLmNvbDJfc3RyMTBfYnk1JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCY0YHQv9C+0LvRjNC30YPQtdGCINGA0LDQt9C90YvQtSDQuNC90YHRgtGA0YPQvNC10L3RgtGLINC00LvRjyDRgdCw0LzQvtGA0LDQt9Cy0LjRgtC40Y88L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjExKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIxMScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIxMSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMTEnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyNHB4Oyc+0KHRgtGA0LXQvNC40YLRgdGPINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOINC90L7QstGL0YUg0LfQvdCw0L3QuNC5INCyINGA0LDQsdC+0YLQtTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMTIpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjEyJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjEyKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxMicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntCx0YrQtdC60YLQuNCy0L3QviDQvtGG0LXQvdC40LLQsNC10YIg0YHQstC+0Lgg0YHQuNC70YzQvdGL0LUg0YHRgtC+0YDQvtC90Ysg0Lgg0LfQvtC90Ysg0YDQvtGB0YLQsDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMTMpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjEzJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjEzKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxMycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmNGJ0LXRgiDQvdC+0LLRi9C1INCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0LIg0L/RgNC+0YbQtdGB0YHQtSDQuNC30LzQtdC90LXQvdC40Lk8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjE0KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIxNCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIxNCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMTQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nOScgc3R5bGU9J3dpZHRoOiAxOThweCc+0KHQsNC80L7QvtGC0LLQtdGA0LbQtdC90L3Ri9C5PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YLQstC10YLRgdGC0LLQtdC90L3QviDQv9C+0LTRhdC+0LTQuNGCINC6INCy0YvQv9C+0LvQvdC10L3QuNGOINC/0L7RgdGC0LDQstC70LXQvdC90YvRhSDQv9C10YDQtdC0INC90LjQvCDQt9Cw0LTQsNGHPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxNSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTUnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTUpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjE1JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nOScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHIxNV9ieTksICdmaWZ0aFRhYmxlLmNvbDJfc3RyMTVfYnk5JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCd0LXRgdC10YIg0L7RgtCy0LXRgtGB0YLQstC10L3QvdC+0YHRgtGMINC30LAg0YHQvtCx0YHRgtCy0LXQvdC90YvQtSDRgNC10YjQtdC90LjRjyDQuCDQtNC10LnRgdGC0LLQuNGPPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxNiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTYnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTYpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjE2JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0LLQvtC10LLRgNC10LzQtdC90L3QviDQtNC10LvQuNGC0YHRjyDQstCw0LbQvdC+0Lkg0LjQvdGE0L7RgNC80LDRhtC40LXQuSDQuCDRgNC10YHRg9GA0YHQsNC80Lg8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjE3KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIxNycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIxNyksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMTcnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JPQvtGC0L7QsiDRhNC+0LrRg9GB0LjRgNC+0LLQsNGC0YzRgdGPINC90LAg0LrQvtC80LDQvdC00L3QvtC5INGA0LDQsdC+0YLQtTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMTgpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjE4JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjE4KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxOCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QktGL0L/QvtC70L3Rj9C10YIg0LfQsNC00LDRh9C4INCyINGB0L7QvtGC0LLQtdGC0YHRgtCy0LjQuCDRgSDQv9C+0LvQuNGC0LjQutC+0Lkg0Lgg0L/RgNC+0YbQtdC00YPRgNCw0LzQuCDQutC+0LzQv9Cw0L3QuNC4PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxOSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTknKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTkpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjE5JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCR0LXRgNC10YIg0L3QsCDRgdC10LHRjyDQvtGC0LLQtdGC0YHRgtCy0LXQvdC90L7RgdGC0Ywg0LfQsCDRgNCw0LHQvtGC0YMg0Lgg0YDQtdC30YPQu9GM0YLQsNGCINC60L7QvNCw0L3QtNGLPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyMCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMjApLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0YLQsNCy0LjRgiDQuNC90YLQtdGA0LXRgdGLINCa0L7QvNC/0LDQvdC40Lgg0L3QsNGA0LDQstC90LUg0YHQviDRgdCy0L7QuNC80Lg8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjIxKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyMScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIyMSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMjEnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7RgtGB0YLQsNC40LLQsNC10YIg0LjQvdGC0LXRgNC10YHRiyDQutC+0LzQsNC90LTRiyDQsiDRgdC70L7QttC90YvRhSDRgdC40YLRg9Cw0YbQuNGP0YU8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjIyKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyMicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIyMiksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMjInKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JHQtdGA0LXRgiDQvdCwINGB0LXQsdGPINC00L7Qv9C+0LvQvdC40YLQtdC70YzQvdGD0Y4g0L7RgtCy0LXRgtGB0YLQstC10L3QvdC+0YHRgtGMPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyMyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMjMnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMjMpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjIzJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzQnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCe0L/RgtC40LzQuNGB0YLQuNGH0L3Ri9C5PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0L7RhdGA0LDQvdGP0LXRgiDQv9C+0LfQuNGC0LjQstC90YvQuSDQvdCw0YHRgtGA0L7QuSDQv9GA0Lgg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjQuCDRgSDQu9GO0LTRjNC80Lg8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjI0KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyNCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyNCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMjQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc0JyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgZmlmdGhUYWJsZS5jb2wyX3N0cjI0X2J5NCwgJ2ZpZnRoVGFibGUuY29sMl9zdHIyNF9ieTQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JLQuNC00LjRgiDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INCyINC/0YDQvtC40YHRhdC+0LTRj9GJ0LjRhSDQuNC30LzQtdC90LXQvdC40Y/RhTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMjUpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjI1JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjI1KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIyNScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QlNC10LzQvtC90YHRgtGA0LjRgNGD0LXRgiDRg9Cy0LXRgNC10L3QvdC+0YHRgtGMINCyINGD0YHQv9C10YjQvdC+0Lwg0YDQsNC30YDQtdGI0LXQvdC40Lgg0YHQuNGC0YPQsNGG0LjQuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMjYpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjI2JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjI2KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIyNicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDIzcHg7Jz7QotGA0LDQvdGB0LvQuNGA0YPQtdGCINC+0L/RgtC40LzQuNGB0YLQuNGH0L3Ri9C5INC90LDRgdGC0YDQvtC5INC+0LrRgNGD0LbQsNGO0YnQuNC8PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyNyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMjcnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMjcpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjI3JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzUnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCU0LjQvdCw0LzQuNGH0L3Ri9C5PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCj0LzQtdC10YIg0LPRgNCw0LzQvtGC0L3QviDQv9C+0YHRgtCw0LLQuNGC0Ywg0L/QtdGA0LXQtCDRgdC+0LHQvtC5INGG0LXQu9GMPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyOCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMjgnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMjgpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjI4JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHIyOF9ieTUsICdmaWZ0aFRhYmxlLmNvbDJfc3RyMjhfYnk1JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCU0L7RgdGC0LjQs9Cw0LXRgiDQv9C+0YHRgtCw0LLQu9C10L3QvdGL0YUg0YbQtdC70LXQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMjkpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjI5JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjI5KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIyOScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0L/QvtGB0L7QsdC10L0g0L/QtdGA0LXQutC70Y7Rh9Cw0YLRjNGB0Y8g0L/RgNC4INCy0YvQv9C+0LvQvdC10L3QuNC4INC+0LTQvdC+0Lkg0LfQsNC00LDRh9C4INC90LAg0LTRgNGD0LPRg9GOINCx0LXQtyDQv9C+0YLQtdGA0Lgg0LrQsNGH0LXRgdGC0LLQsDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzApLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjMwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjMwKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntCx0LvQsNC00LDQtdGCINGH0LXRgtC60LjQvCDQstC40LTQtdC90LjQtdC8INGB0LLQvtC40YUg0YbQtdC70LXQuSDQsiDQtNC+0LvQs9C+0YHRgNC+0YfQvdC+0Lkg0L/QtdGA0YHQv9C10LrRgtC40LLQtTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzEpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjMxJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjMxKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzMScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0YPQv9C+0YDRgdGC0LLQviDQsiDRgNC10YjQtdC90LjQuCDQt9Cw0LTQsNGH0Lgg0LTQsNC20LUg0YHRgtCw0LvQutC40LLQsNGP0YHRjCDRgSDRgtGA0YPQtNC90L7RgdGC0Y/QvNC4PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIzMiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMzInKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMzIpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjMyJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzYnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCS0L7RgdC/0YDQuNC40LzRh9C40LLRi9C5PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCe0YLQutGA0YvRgiDQuiDQv9C+0LvRg9GH0LXQvdC40Y4g0L7QsdGA0LDRgtC90L7QuSDRgdCy0Y/Qt9C4PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIzMyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMzMnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMzMpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjMzJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNicgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHIzM19ieTYsICdmaWZ0aFRhYmxlLmNvbDJfc3RyMzNfYnk2JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCR0YvRgdGC0YDQviDQsNC00LDQv9GC0LjRgNGD0LXRgtGB0Y8g0Log0L3QvtCy0YvQvCDQvtCx0YHRgtC+0Y/RgtC10LvRjNGB0YLQstCw0Lw8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjM0KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzNCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzNCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMzQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0J/RgNC40L3QuNC80LDQtdGCINC40LTQtdC4INC4INC/0L7QtNC00LXRgNC20LjQstCw0LXRgiDQuNC90LjRhtC40LDRgtC40LLRgzwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzUpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjM1JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjM1KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzNScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0YDRgNC10LrRgtC40YDRg9C10YIg0YHQstC+0Lgg0LTQtdC50YHRgtCy0LjRjyDQv9C+0YHQu9C1INC/0L7Qu9GD0YfQtdC90LjRjyDQvtCx0YDQsNGC0L3QvtC5INGB0LLRj9C30Lg8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjM2KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzNicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzNiksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMzYnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JHRi9GB0YLRgNC+INGA0LXQsNCz0LjRgNGD0LXRgiDQvdCwINC40LfQvNC10L3QtdC90LjRjywg0LzQtdC90Y/QtdGCINGB0LLQvtC1INC/0L7QstC10LTQtdC90LjQtSDQsiDQvdC+0LLRi9GFINC+0LHRgdGC0L7Rj9GC0LXQu9GM0YHRgtCy0LDRhTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzcpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjM3JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjM3KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzNycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodC/0L7RgdC+0LHQtdC9INC40LfQvNC10L3QuNGC0Ywg0YHQstC+0Y4g0YLQvtGH0LrRgyDQt9GA0LXQvdC40Y8g0L/QvtC0INCy0L7Qt9C00LXQudGB0YLQstC40LXQvCDQsNGA0LPRg9C80LXQvdGC0L7QsiDRgdC+0LHQtdGB0LXQtNC90LjQutCwPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIzOCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMzgnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMzgpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjM4JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzcnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCh0LjQu9GM0L3Ri9C5PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0YLQsNCy0LjRgiDRhtC10LvQuCDRh9C70LXQvdCw0Lwg0LrQvtC80LDQvdC00YssINC+0LHQvtC30L3QsNGH0LDQtdGCINGB0YDQvtC60Lgg0LjRhSDQstGL0L/QvtC70L3QtdC90LjRjzwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzkpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjM5JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjM5KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzOScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzcnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyMzlfYnk3LCAnZmlmdGhUYWJsZS5jb2wyX3N0cjM5X2J5NycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntCx0L7Qt9C90LDRh9Cw0LXRgiDQvtC20LjQtNCw0LXQvNGL0Lkg0YDQtdC30YPQu9GM0YLQsNGCINGH0LvQtdC90LDQvCDQutC+0LzQsNC90LTRizwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNDApLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjQwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjQwKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI0MCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9C+0LTQtNC10YDQttC40LLQsNC10YIg0Lgg0LLQvtCy0LvQtdC60LDQtdGCINGH0LvQtdC90L7QsiDQutC+0LzQsNC90LTRiyDQsiDRgNCw0LHQvtGC0YM8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQxKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0MScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0MSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDEnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JTQsNC10YIg0YDQsNC30LLQuNCy0LDRjtGJ0YPRjiDQvtCx0YDQsNGC0L3Rg9GOINGB0LLRj9C30Ywg0YfQu9C10L3QsNC8INC60L7QvNCw0L3QtNGLPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI0MiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNDInKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNDIpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjQyJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCg0LDRgdC/0YDQtdC00LXQu9GP0LXRgiDRgNC10YHRg9GA0YHRiyDQuCDRgNC+0LvQuCDQsiDQutC+0LzQsNC90LTQtSDQtNC70Y8g0YPRgdC/0LXRiNC90L7Qs9C+INCy0YvQv9C+0LvQvdC10L3QuNGPINGG0LXQu9C4PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI0MyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNDMnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNDMpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjQzJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCg0LDRgdGB0YLQsNCy0LvRj9C10YIg0L/RgNC40L7RgNC40YLQtdGC0Ysg0L/RgNC4INCy0YvQv9C+0LvQvdC10L3QuNC4INC30LDQtNCw0Yc8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQ0KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0NCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0NCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0KTQvtC60YPRgdC40YDRg9C10YIg0LrQvtC80LDQvdC00YMg0L3QsCDQv9GA0LjQvtGA0LjRgtC10YLQvdGL0YUg0LfQsNC00LDRh9Cw0YU8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQ1KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0NScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0NSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDUnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nMycgc3R5bGU9J3dpZHRoOiAxOThweCc+0J7RgtC60YDQvtCy0LXQvdC90YvQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntGG0LXQvdC40LLQsNC10YIg0YPRgdC/0LXRiNC90L7RgdGC0Ywg0YHQstC+0LXQuSDRgNCw0LHQvtGC0Ysg0L/QviDRgNC10LfRg9C70YzRgtCw0YLQsNC8LCDQsCDQvdC1INC/0L4g0L/RgNC40LvQvtC20LXQvdC90YvQvCDRg9GB0LjQu9C40Y/QvDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNDYpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjQ2JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjQ2KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI0NicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzMnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyNDZfYnkzLCAnZmlmdGhUYWJsZS5jb2wyX3N0cjQ2X2J5MycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDIzcHg7Jz7Qp9C10YHRgtC90L4g0Lgg0YHQstC+0LXQstGA0LXQvNC10L3QvdC+INC40LfQu9Cw0LPQsNC10YIg0YHQstC+0Y4g0L/QvtC30LjRhtC40Y4g0L/QviDRgNCw0LfQvdGL0Lwg0LLQvtC/0YDQvtGB0LDQvDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNDcpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjQ3JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjQ3KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI0NycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDIzcHg7Jz7QntGC0LrRgNGL0YIg0Log0L7QsdGJ0LXQvdC40Y4sINC40YHQutGA0LXQvdC10L0g0L/QviDQvtGC0L3QvtGI0LXQvdC40Y4g0Log0LrQvtC70LvQtdCz0LDQvDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNDgpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjQ4JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjQ4KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI0OCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSczJyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QmNC30YvRgdC60LDQvdC90YvQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDI0cHg7Jz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0L/QvtCy0YvRiNC10L3QvdC+0LUg0LLQvdC40LzQsNC90LjQtSDQuiDRgdGC0LjQu9C40YHRgtC40YfQtdGB0LrQuNC8INC4INGN0YHRgtC10YLQuNGH0LXRgdC60LjQvCDQsNGB0L/QtdC60YLQsNC8INCyINGA0LDQsdC+0YLQtSDQuCDQttC40LfQvdC4PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI0OSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNDknKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNDkpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjQ5JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nMycgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHI0OV9ieTMsICdmaWZ0aFRhYmxlLmNvbDJfc3RyNDlfYnkzJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCj0L/RgNCw0LLQu9GP0LXRgiDRgdGC0LjQu9C40YHRgtC40LrQvtC5INGA0LXRh9C4INC/0YDQuCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQuNC4INGBINC+0LrRgNGD0LbQsNGO0YnQuNC80Lgg0LvRjtC00YzQvNC4PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1MCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTApLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjUwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCf0YDQvtGP0LLQu9GP0LXRgiDQtNC+0YHRgtC+0LjQvdGB0YLQstC+INC4INCy0LXQttC70LjQstC+0YHRgtGMPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1MSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTEnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTEpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjUxJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzUnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCn0YPRgtC60LjQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QlNCw0LXRgiDQstC+0LfQvNC+0LbQvdC+0YHRgtGMINC60LDQttC00L7QvNGDINGH0LvQtdC90YMg0LrQvtC80LDQvdC00Ysg0LLRi9GB0LrQsNC30LDRgtGM0YHRjzwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTIpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjUyJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjUyKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1MicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyNTJfYnk1LCAnZmlmdGhUYWJsZS5jb2wyX3N0cjUyX2J5NScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Ql9Cw0LzQtdGH0LDQtdGCINC4INC/0L7QvtGJ0YDRj9C10YIg0LLQutC70LDQtCDQtNGA0YPQs9C40YU8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjUzKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI1MycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI1MyksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNTMnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyNHB4Oyc+0J/QvtC80L7Qs9Cw0LXRgiDRh9C70LXQvdCw0Lwg0LrQvtC80LDQvdC00Ysg0LDQtNCw0L/RgtC40YDQvtCy0LDRgtGM0YHRjyDQuiDQvdC+0LLRi9C8INC40LfQvNC10L3QtdC90LjRj9C8PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1NCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTQpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjU0JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0LvRi9GI0LjRgiDQvNC90LXQvdC40LUg0YHQvtCx0LXRgdC10LTQvdC40LrQsCDQuCDRg9GH0LjRgtGL0LLQsNC10YIg0LXQs9C+INC/0YDQuCDQv9GA0LjQvdGP0YLQuNC4INGA0LXRiNC10L3QuNGPPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1NSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTUnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTUpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjU1JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjFweDsnPtCS0L3QuNC80LDRgtC10LvQtdC9INC6INC00LXRgtCw0LvRj9C8PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1NiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTYnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTYpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjU2JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCY0YHRgtC+0YDQuNGPPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCf0YDQvtGP0LLQu9GP0LXRgiDQu9C+0Y/Qu9GM0L3QvtGB0YLRjCDQuiDQkdGA0LXQvdC00YMg0Lgg0LrQvtC80L/QsNC90LjQuCDQsiDRhtC10LvQvtC8PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1NyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTcnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTcpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjU3JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHI1N19ieTIsICdmaWZ0aFRhYmxlLmNvbDJfc3RyNTdfYnkyJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCQ0YHRgdC+0YbQuNC40YDRg9C10YIg0YHQtdCx0Y8g0YEg0LrQvtC80L/QsNC90LjQtdC5PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1OCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTgnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTgpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjU4JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzMnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCe0YHQvtCx0LXQvdC90YvQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodGC0YDRg9C60YLRg9GA0LjRgNC+0LLQsNC90L3QviDQuCDQv9C+0YHQu9C10LTQvtCy0LDRgtC10LvRjNC90L4g0LTQvtC90L7RgdC40YIg0YHQstC+0Lgg0LzRi9GB0LvQuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTkpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjU5JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjU5KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1OScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzMnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyNTlfYnkzLCAnZmlmdGhUYWJsZS5jb2wyX3N0cjU5X2J5MycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QkNGA0LPRg9C80LXQvdGC0LjRgNC+0LLQsNC90L4g0LLRi9GB0LrQsNC30YvQstCw0LXRgiDRgdCy0L7RjiDQv9C+0LfQuNGG0LjRjiwg0L7Qv9C10YDQuNGA0YPQtdGCINGE0LDQutGC0LDQvNC4PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI2MCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNjApLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjYwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0LHQsNGP0YLQtdC70LXQvSwg0YPQvNC10LXRgiDQstGL0LfRi9Cy0LDRgtGMINGB0LjQvNC/0LDRgtC40Y48L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjYxKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI2MScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI2MSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNjEnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdDwvdGFibGU+XFxuXFxcclxuXHRcdDwvZGl2PlwiXHJcblx0KTtcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XG52YXIgdWkgPSByZXF1aXJlKCcuLi8uLi91dGlscy91aScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmaWZ0aHRlZW50aFRhYmxlKSB7XG5cdGZpZnRodGVlbnRoVGFibGUgPSBmaWZ0aHRlZW50aFRhYmxlIHx8IHt9O1xuXHRyZXR1cm4gKFxuXHRcdFwiPGRpdiBjbGFzcz0nZmlmdGh0ZWVudGhUYWJsZSc+XFxuXFxcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJyA+XFxuXFxcblx0XHRcdFx0PHRyPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QmtCe0JzQnNCV0J3QotCQ0KDQmNCYINCg0KPQmtCe0JLQntCU0JjQotCV0JvQrzwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZmlmdGh0ZWVudGhUYWJsZS5jb2wwX3N0cjAnIHJvd3M9JzEwJz5cIiArIChmaWZ0aHRlZW50aFRhYmxlLmNvbDBfc3RyMCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdDwvdGFibGU+XFxuXFxcblx0XHQ8L2Rpdj5cXG5cXFxuXHRcdDxkaXY+XFxuXFxcblx0XHRcdDx0YWJsZT5cXG5cXFxuXHRcdFx0XHQ8dHI+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDM1cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIxKSwgJ2ZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIxJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx00KHQvtGC0YDRg9C00L3QuNC6INGB0L7Qs9C70LDRgdC10L1cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHI+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDM1cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIyKSwgJ2ZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIyJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx00KHQvtGC0YDRg9C00L3QuNC6INC90LUg0YHQvtCz0LvQsNGB0LXQvVxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHQ8L3RhYmxlPlxcblxcXG5cdFx0PC9kaXY+XCJcblx0KVxufSIsInZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZpcnN0VGFibGUpIHtcclxuXHRmaXJzdFRhYmxlID0gZmlyc3RUYWJsZSB8fCB7fTtcclxuXHR2YXIgc3RhcnREYXRlID0gIWZpcnN0VGFibGUuY29sMF9zdHIwID8gJycgOiBtb21lbnQoZmlyc3RUYWJsZS5jb2wwX3N0cjApLmZvcm1hdCgnREQuTU0uWVlZWScpO1xyXG5cdHZhciBmaW5pc2hEYXRlID0gIWZpcnN0VGFibGUuY29sMF9zdHIxID8gJycgOiBtb21lbnQoZmlyc3RUYWJsZS5jb2wwX3N0cjEpLmZvcm1hdCgnREQuTU0uWVlZWScpOztcclxuXHRcclxuXHRyZXR1cm4gKFxyXG5cdFx0XCI8ZGl2IGNsYXNzPSdmaXJzdFRhYmxlJz5cXG5cXFxyXG5cdFx0XHQ8dGFibGUgYm9yZGVyLXNwYWNpbmc6IDBweDsnIGFsaWduPSdjZW50ZXInIGNsYXNzPSdib3JkZXJfdGFibGVfZGF0ZSc+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4OyBwYWRkaW5nLWxlZnQ6MTBweDsnIGNvbHNwYW49JzMnIGNsYXNzPSdjb2xvcl9oZWFkX2RhdGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdNCe0KbQldCd0JrQkCDQrdCk0KTQldCa0KLQmNCS0J3QntCh0KLQmCDQn9CeINCY0KLQntCT0JDQnCDQmtCe0J3QotCg0J7Qm9Cs0J3QntCT0J4g0J/QldCg0JjQntCU0JBcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF9kYXRlJyBzdHlsZT0nd2lkdGg6IDM1cHg7IGhlaWdodDogNDNweDsgcGFkZGluZy1sZWZ0OjEwcHg7Jz5DOiA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfZGF0ZScgc3R5bGU9J3dpZHRoOiAyMjVweDsgaGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgcmVhZG9ubHkgdHlwZT0ndGV4dCcgY2xhc3M9J2ZpcnN0VGFibGVfX2RhdGUnIG5hbWU9J2ZpcnN0VGFibGUuY29sMF9zdHIwJyB2YWx1ZT1cIiArIHN0YXJ0RGF0ZSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfZGF0ZScgcm93c3Bhbj0nMic+PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF9kYXRlJyBzdHlsZT0nd2lkdGg6IDM1cHg7IGhlaWdodDogNDNweDsgcGFkZGluZy1sZWZ0OjEwcHg7Jz7Qn9CeOiA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfZGF0ZScgc3R5bGU9J3dpZHRoOiAyMjVweDsgaGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgcmVhZG9ubHkgdHlwZT0ndGV4dCcgY2xhc3M9J2ZpcnN0VGFibGVfX2RhdGUnIG5hbWU9J2ZpcnN0VGFibGUuY29sMF9zdHIxJyB2YWx1ZT1cIiArIGZpbmlzaERhdGUgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0PC90YWJsZT5cXG5cXFxyXG5cdFx0PC9kaXY+XCJcclxuXHQpO1xyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm91cnRlZW50aFRhYmxlKSB7XHJcblx0Zm91cnRlZW50aFRhYmxlID0gZm91cnRlZW50aFRhYmxlIHx8IHt9O1xyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J2ZvdXJ0ZWVudGhUYWJsZSc+IFxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJyBjbGFzcz0nZm91cnRlZW50aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCa0J7QnNCc0JXQndCi0JDQoNCY0Jgg0KHQntCi0KDQo9CU0J3QmNCa0JA8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdmb3VydGVlbnRoVGFibGUuY29sMF9zdHIwJyByb3dzPScxMCc+XCIrIChmb3VydGVlbnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmb3VydGhUYWJsZSkge1xyXG5cdGZvdXJ0aFRhYmxlID0gZm91cnRoVGFibGUgfHwge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J2ZvdXJ0aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcic+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgY29sc3Bhbj0nNScgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntCR0KnQkNCvINCe0KbQldCd0JrQkCDQktCr0J/QntCb0J3QldCd0JjQryDQoNCQ0JHQntCiPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyByb3dzcGFuPScyJyBzdHlsZT0nd2lkdGg6IDc0N3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0L7QtNCy0LXQtNC10L3QuNC1INC40YLQvtCz0L7QsiDQv9C+INCy0YvQv9C+0LvQvdC10L3QuNGOINC/0L7RgdGC0LDQstC70LXQvdC90YvRhSDRhtC10LvQtdC5INC/0L4g0LrQu9GO0YfQtdCy0YvQvCDQv9C+0LrQsNC30LDRgtC10LvRj9C8INGN0YTRhNC10LrRgtC40LLQvdC+0YHRgtC4Ojwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc0Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0YbQtdC90LrQsCDRgNC10LfRg9C70YzRgtCw0YLQsDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NHB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCd0LjQt9C60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KHRgNC10LTQvdC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCl0L7RgNC+0YjQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzQ3cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2ZvdXJ0aFRhYmxlLmNvbDBfc3RyMCcgcm93cz0nMic+XCIgKyAoZm91cnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc0cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZm91cnRoVGFibGUuY29sMV9zdHIwKSwgJ2ZvdXJ0aFRhYmxlLmNvbDFfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZvdXJ0aFRhYmxlLmNvbDJfc3RyMCksICdmb3VydGhUYWJsZS5jb2wyX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmb3VydGhUYWJsZS5jb2wzX3N0cjApLCAnZm91cnRoVGFibGUuY29sM19zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZm91cnRoVGFibGUuY29sNF9zdHIwKSwgJ2ZvdXJ0aFRhYmxlLmNvbDRfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyAnIGNvbHNwYW49JzUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZm91cnRoVGFibGUuY29sMF9ieTVfc3RyMScgcm93cz0nMicgc3R5bGU9J3dpZHRoOiA5Ni42JTsnPlwiICsgKGZvdXJ0aFRhYmxlLmNvbDBfYnk1X3N0cjEgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdDwvdGFibGU+XFxuXFxcclxuXHRcdDwvZGl2PlwiXHJcblx0KTtcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuaW50aFRhYmxlKSB7XHJcblx0bmludGhUYWJsZSA9IG5pbnRoVGFibGUgfHwge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J25pbnRoVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc1JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0JHQqdCQ0K8g0J7QptCV0J3QmtCQINCh0J7QntCi0JLQldCi0KHQotCS0JjQr9CcINCe0JbQmNCU0JDQndCY0K/QnCDQntCiINCU0J7Qm9CW0J3QntCh0KLQmDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA3NDdweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9C+0LTQstC10LTQtdC90LjQtSDQuNGC0L7Qs9C+0LIg0L/QviDRgdC+0L7RgtCy0LXRgtGB0YLQstC40Y4g0LvQuNGH0L3QvtGB0YLQvdGL0Lwg0LrQvtC80L/QtdGC0LXQvdGG0LjRj9C8INC4INGE0YPQvdC60YbQuNC+0L3QsNC70YzQvdGL0Lwg0L3QsNCy0YvQutCw0Lw6PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIGNvbHNwYW49JzQnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7RhtC10L3QutCwINGA0LXQt9GD0LvRjNGC0LDRgtCwPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDc0cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J3QuNC30LrQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QodGA0LXQtNC90LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KXQvtGA0L7RiNC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCS0YvRgdC+0LrQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NDdweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nbmludGhUYWJsZS5jb2wwX3N0cjAnIHJvd3M9JzInPlwiICsgKG5pbnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc0cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wobmludGhUYWJsZS5jb2wxX3N0cjApLCAnbmludGhUYWJsZS5jb2wxX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChuaW50aFRhYmxlLmNvbDJfc3RyMCksICduaW50aFRhYmxlLmNvbDJfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKG5pbnRoVGFibGUuY29sM19zdHIwKSwgJ25pbnRoVGFibGUuY29sM19zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wobmludGhUYWJsZS5jb2w0X3N0cjApLCAnbmludGhUYWJsZS5jb2w0X3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgJyBjb2xzcGFuPSc1Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J25pbnRoVGFibGUuY29sMF9ieTVfc3RyMScgcm93cz0nMicgc3R5bGU9J3dpZHRoOiA5Ni42JTsnPlwiICsgKG5pbnRoVGFibGUuY29sMF9ieTVfc3RyMSB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0PC90YWJsZT5cXG5cXFxyXG5cdFx0PC9kaXY+XCJcclxuXHQpO1xyXG59IiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXRpbHMnKTtcclxudmFyIHVpID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdWknKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlY29uZFRhYmxlKSB7XHJcblx0c2Vjb25kVGFibGUgPSBzZWNvbmRUYWJsZSB8fCB7fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdFwiPGRpdiBjbGFzcz0nc2Vjb25kVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Ql9CQ0JPQntCb0J7QktCe0Jo8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdDwvdGFibGU+XFxuXFxcclxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInIGNsYXNzPSdhbGx0YWJsZXMnPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsgdGV4dC1hbGlnbjpjZW50ZXI7IGhlaWdodDogNDNweCcgY29sc3Bhbj0nOSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntCm0JXQndCa0JAg0JTQntCh0KLQmNCW0JXQndCY0K8g0KTQmNCd0JDQndCh0J7QktCr0KUgS1BJPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDE5M3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogYmxhbmNoZWRhbG1vbmQ7ICcgcm93c3Bhbj0nMic+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz5LUEk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsgJyByb3dzcGFuPScyJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCm0LXQu9GMPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyB0ZXh0LWFsaWduOmNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogYmxhbmNoZWRhbG1vbmQ7ICcgcm93c3Bhbj0nMic+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QoNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsgJyByb3dzcGFuPScyJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0YDQvtGG0LXQvdGCINC00L7RgdGC0LjQttC10L3QuNGPINGG0LXQu9C4PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3RleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsnIGNvbHNwYW49JzQnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7RhtC10L3QutCwINGA0LXQt9GD0LvRjNGC0LDRgtCwPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiAyNDVweDsgdGV4dC1hbGlnbjpjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6IGJsYW5jaGVkYWxtb25kOyAnIHJvd3NwYW49JzInPiBcXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCa0L7QvNC80LXQvdGC0LDRgNC40Lg8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgdGV4dC1hbGlnbjpjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6IGJsYW5jaGVkYWxtb25kOyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QndC40LfQutC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KHRgNC10LTQvdC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsgJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCl0L7RgNC+0YjQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NHB4OyB0ZXh0LWFsaWduOmNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogYmxhbmNoZWRhbG1vbmQ7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCS0YvRgdC+0LrQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogMTkzcHg7ICc+0J/Qu9Cw0L0g0L/RgNC+0LTQsNC2INC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wwX3N0cjAnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDBfc3RyMCB8fCAnJykgK1wiJyAvPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wxX3N0cjAnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDFfc3RyMCB8fCAnJykgK1wiJyAvPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wyX3N0cjAnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDJfc3RyMCB8fCAnJykgK1wiJyAvPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc1cHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDNfc3RyMCksICdzZWNvbmRUYWJsZS5jb2wzX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsgJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sNF9zdHIwKSwgJ3NlY29uZFRhYmxlLmNvbDRfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2w1X3N0cjApLCAnc2Vjb25kVGFibGUuY29sNV9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc0cHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDZfc3RyMCksICdzZWNvbmRUYWJsZS5jb2w2X3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDI0NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgbmFtZT0nc2Vjb25kVGFibGUuY29sN19zdHIwJyByb3dzPScyJyBzdHlsZT0nd2lkdGg6IDk4JTsnPlwiICsgKHNlY29uZFRhYmxlLmNvbDdfc3RyMCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiAxOTNweDsgaGVpZ2h0OiA0NXB4Oyc+0JrQvtC90LLQtdGA0YHQuNGPXFxuXFxcclxuXHRcdFx0XHRcdFx0KNGG0LXQu9GMINC90LAg0LzQsNCz0LDQt9C40L0pXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogNDVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wwX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDBfc3RyMSB8fCAnJykgK1wiJy8+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogNDVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wxX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDFfc3RyMSB8fCAnJykgK1wiJy8+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogNDVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wyX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDJfc3RyMSB8fCAnJykgK1wiJy8+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiA0NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sM19zdHIxKSwgJ3NlY29uZFRhYmxlLmNvbDNfc3RyMScpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogNDVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDRfc3RyMSksICdzZWNvbmRUYWJsZS5jb2w0X3N0cjEnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDQ1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2w1X3N0cjEpLCAnc2Vjb25kVGFibGUuY29sNV9zdHIxJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzRweDsgaGVpZ2h0OiA0NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sNl9zdHIxKSwgJ3NlY29uZFRhYmxlLmNvbDZfc3RyMScpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDI0NXB4OyBoZWlnaHQ6IDQ1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBuYW1lPSdzZWNvbmRUYWJsZS5jb2w3X3N0cjEnIHJvd3M9JzInIHN0eWxlPSd3aWR0aDogOTglOycgY29scz0nMjAnPlwiICsgKHNlY29uZFRhYmxlLmNvbDdfc3RyMSB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiAxOTNweDsgJz7QodGA0LXQtNC90LjQuSDRh9C10LpcXG5cXFxyXG5cdFx0XHRcdFx0XHQo0YbQtdC70Ywg0L3QsCDQvNCw0LPQsNC30LjQvSlcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0nc2Vjb25kVGFibGUuY29sMF9zdHIyJyB0eXBlPSd0ZXh0JyB2YWx1ZT0nXCIgKyAoc2Vjb25kVGFibGUuY29sMF9zdHIyIHx8ICcnKSArIFwiJy8+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3NlY29uZFRhYmxlLmNvbDFfc3RyMicgdHlwZT0ndGV4dCcgdmFsdWU9J1wiICsgKHNlY29uZFRhYmxlLmNvbDFfc3RyMiB8fCAnJykgKyBcIicvPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wyX3N0cjInIHR5cGU9J3RleHQnIHZhbHVlPSdcIiArIChzZWNvbmRUYWJsZS5jb2wyX3N0cjIgfHwgJycpICsgXCInLz5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrICB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDNfc3RyMiksICdzZWNvbmRUYWJsZS5jb2wzX3N0cjInKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrICB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDRfc3RyMiksICdzZWNvbmRUYWJsZS5jb2w0X3N0cjInKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrICB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDVfc3RyMiksICdzZWNvbmRUYWJsZS5jb2w1X3N0cjInKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NHB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrICB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDZfc3RyMiksICdzZWNvbmRUYWJsZS5jb2w2X3N0cjInKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogMjQ1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBuYW1lPSdzZWNvbmRUYWJsZS5jb2w3X3N0cjInIHJvd3M9JzInIHN0eWxlPSd3aWR0aDogOTglOycgY29scz0nMjAnPlwiICsgKHNlY29uZFRhYmxlLmNvbDdfc3RyMiB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiAxOTNweDsnPtCa0L7QvNC/0LvQtdC60YHQvdGL0Lkg0YfQtdC6XFxuXFxcclxuXHRcdFx0XHRcdFx0KNGG0LXQu9GMINC90LAg0LzQsNCz0LDQt9C40L0pXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3NlY29uZFRhYmxlLmNvbDBfc3RyMycgdHlwZT0ndGV4dCcgdmFsdWU9J1wiICsgKHNlY29uZFRhYmxlLmNvbDBfc3RyMyB8fCAnJykgKyBcIicvPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wxX3N0cjMnIHR5cGU9J3RleHQnIHZhbHVlPSdcIiArIChzZWNvbmRUYWJsZS5jb2wxX3N0cjMgfHwgJycpICsgXCInLz5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0nc2Vjb25kVGFibGUuY29sMl9zdHIzJyB0eXBlPSd0ZXh0JyB2YWx1ZT0nXCIgKyAoc2Vjb25kVGFibGUuY29sMl9zdHIzIHx8ICcnKSArIFwiJy8+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sM19zdHIzKSwgJ3NlY29uZFRhYmxlLmNvbDNfc3RyMycpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArICB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDRfc3RyMyksICdzZWNvbmRUYWJsZS5jb2w0X3N0cjMnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyAgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2w1X3N0cjMpLCAnc2Vjb25kVGFibGUuY29sNV9zdHIzJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzRweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyAgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2w2X3N0cjMpLCAnc2Vjb25kVGFibGUuY29sNl9zdHIzJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDI0NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgbmFtZT0nc2Vjb25kVGFibGUuY29sN19zdHIzJyByb3dzPScyJyBzdHlsZT0nd2lkdGg6IDk4JTsnIGNvbHM9JzIwJz5cIiArIChzZWNvbmRUYWJsZS5jb2w3X3N0cjMgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZXZlbnRoVGFibGUpIHtcclxuXHRzZXZlbnRoVGFibGUgPSBzZXZlbnRoVGFibGUgfHwge307XHJcblx0cmV0dXJuIChcclxuXHRcdFwiPGRpdiBjbGFzcz0nc2V2ZW50aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcicgY2xhc3M9J3NldmVudGhUYWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgIDx0Ym9keT5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTInPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBjb2xzcGFuPSc1JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3RleHRib2xkJz7Ql9Cw0LPQvtC70L7QstC+0Lo8L3NwYW4+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiAxOThweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KTRg9C90LrRhtC40L7QvdCw0LvRjNC90YvQuSDQvdCw0LLRi9C6PC9zcGFuPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogNTQwcHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0L7QstC10LTQtdC90YfQtdGB0LrQuNC5INC40L3QtNC40LrQsNGC0L7RgDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBjb2xzcGFuPSczJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntGG0LXQvdC60LAg0YDQtdC30YPQu9GM0YLQsNGC0LA8L3NwYW4+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0L/QvtC70L3QvtGB0YLRjNGOPC9zcGFuPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J/RgNC+0Y/QstC70Y/QtdGCINGH0LDRgdGC0LjRh9C90L48L3NwYW4+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntCx0YnQsNGPINC+0YbQtdC90LrQsDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiAxOThweDsnIHJvd3NwYW49JzknPtCd0LDQstGL0LrQuCDRg9C/0YDQsNCy0LvQtdC90LjRjyDQv9GA0L7QtNCw0LbQsNC80Lg8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNTQwcHg7Jz7Qo9C/0YDQsNCy0LvRj9C10YIg0YHQtdGA0LLQuNGB0L7QvCDQsiDQvNCw0LPQsNC30LjQvdC1PC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjApLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMCksICdzZXZlbnRoVGFibGUuY29sMV9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHJvd3NwYW49JzknIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBzZXZlbnRoVGFibGUuY29sMl9zdHIwX2J5OSwgJ3NldmVudGhUYWJsZS5jb2wyX3N0cjBfYnk5JykgK1wiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCk0L7RgNC80LjRgNGD0LXRgiDQvdCw0LLRi9C60Lgg0YDQsNCx0L7RgtGLINGBINC70L7Rj9C70YzQvdGL0LzQuCDQv9C+0LrRg9C/0LDRgtC10LvRj9C80Lgg0YMg0LrQvtC80LDQvdC00Ysg0LzQsNCz0LDQt9C40L3QsDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyM3B4Oyc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIxKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjEnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDIzcHg7Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjEpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JfQvdCw0LXRgiDQuCDQv9C+0L3QuNC80LDQtdGCINGA0L7Qt9C90LjRh9C90YvQtSBrcGk8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMiksICdzZXZlbnRoVGFibGUuY29sMF9zdHIyJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjInKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCQ0L3QsNC70LjQt9C40YDRg9C10YIg0Y3RhNGE0LXQutGC0LjQstC90L7RgdGC0Ywg0YDQsNCx0L7RgtGLINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMyksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIzKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjMnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0YLQsNCy0LjRgiDRhtC10LvQuCDQv9C+IGtwaSDRgdC+0YLRgNGD0LTQvdC40LrQsNC8INC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyNCksICdzZXZlbnRoVGFibGUuY29sMF9zdHI0JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI0KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjQnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0L7Qt9C00LDQtdGCINC40L3RgdGC0YDRg9C80LXQvdGC0Ysg0LTQu9GPINC00L7RgdGC0LjQttC10L3QuNGPINGG0LXQu9C10Lkg0L/QviBrcGk8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyNSksICdzZXZlbnRoVGFibGUuY29sMF9zdHI1JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI1KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjUnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCY0L3QuNGG0LjQuNGA0YPQtdGCINC80LXRgNC+0L/RgNC40Y/RgtC40Y8g0L/QviDRg9Cy0LXQu9C40YfQtdC90LjRjiDRhNC40L3QsNC90YHQvtCy0YvRhSDQv9C+0LrQsNC30LDRgtC10LvQtdC5INC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyNiksICdzZXZlbnRoVGFibGUuY29sMF9zdHI2JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI2KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjYnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCX0L3QsNC10YIg0LLQvtC30LzQvtC20L3QvtGB0YLQuCDQsiDRgNCw0LfQstC40YLQuNC4INGB0LLQvtC10LPQviDQvNCw0LPQsNC30LjQvdCwINC4INC40LzQtdC10YIg0L/Qu9Cw0L0g0LjRhSDRgNC10LDQu9C40LfQsNGG0LjQuDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHI3KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjcnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjcpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyNycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC/0YDQuNC80LXQvdC10L3QuNC1INC40L3RgdGC0YDRg9C80LXQvdGC0L7QsiDQsiDRgNCw0LHQvtGC0LUg0YMg0L/QtdGA0YHQvtC90LDQu9CwINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyOCksICdzZXZlbnRoVGFibGUuY29sMF9zdHI4JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI4KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjgnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHJvd3NwYW49JzExJyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QndCw0LLRi9C60Lgg0YPQv9GA0LDQstC70LXQvdC40Y8g0L/QtdGA0YHQvtC90LDQu9C+0Lw8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodC+0LfQtNCw0LXRgiDQuCDQvtC/0YLQuNC80LjQt9C40YDRg9C10YIg0LPRgNCw0YTQuNC6INGA0LDQsdC+0YLRiyDQv9C10YDRgdC+0L3QsNC70LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyOSksICdzZXZlbnRoVGFibGUuY29sMF9zdHI5JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI5KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjknKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgcm93c3Bhbj0nMTEnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBzZXZlbnRoVGFibGUuY29sMl9zdHI5X2J5MTEsICdzZXZlbnRoVGFibGUuY29sMl9zdHI5X2J5MTEnKSArXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0KTQvtGA0LzQuNGA0YPQtdGCINC60L7QvNCw0L3QtNGDINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTApLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTAnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjEwKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjEwJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNTQwcHgnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC/0YDQvtGG0LXRgdGBINC30LDQutGA0YvRgtC40Y8g0L3QtdGF0LLQsNGC0LrQuCDQsiDQvNCw0LPQsNC30LjQvdC1PC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjExKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjExJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIxMSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIxMScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7RgNCz0LDQvdC40LfRg9C10YIg0LzQtdGA0L7Qv9GA0LjRj9GC0LjRjyDQv9C+INGB0L7QutGA0LDRidC10L3QuNGOINC+0YLRgtC+0LrQvtCyINCyINC80LDQs9Cw0LfQuNC90LU8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTIpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTInKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjEyKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjEyJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0YDQtdCw0LvQuNC30LDRhtC40Y4g0L/RgNC+0LPRgNCw0LzQvNGLINCw0LTQsNC/0YLQsNGG0LjQuCDQuCDQvdCw0YHRgtCw0LLQvdC40YfQtdGB0YLQstCwPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjEzKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjEzJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIxMyksICdzZXZlbnRoVGFibGUuY29sMV9zdHIxMycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0J7RgNCz0LDQvdC40LfRg9C10YIg0L/RgNC+0YbQtdGB0YEg0L7QsdGD0YfQtdC90LjRjyDQvdCwINGA0LDQsdC+0YfQtdC8INC80LXRgdGC0LUg0LTQu9GPINC60L7QvNCw0L3QtNGLINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjNweDsnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTQpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTQnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDIzcHg7Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE0KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE0JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9GA0L7QstC+0LTQuNGCINC+0YbQtdC90LrRgyDQutCw0LbQtNC+0LPQviDRgdC+0YLRgNGD0LTQvdC40LrQsCDQvNCw0LPQsNC30LjQvdCwPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjE1KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjE1JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIxNSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIxNScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0KDQsNC30YDQsNCx0LDRgtGL0LLQsNC10YIg0JjQn9CgINGB0L7RgtGA0YPQtNC90LjQutC+0LIg0Lgg0LrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC40YUg0YDQtdCw0LvQuNC30LDRhtC40Y48L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTYpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTYnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE2KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE2JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntGA0LPQsNC90LjQt9GD0LXRgiDRgNCw0LHQvtGC0YMg0YEg0YLQsNC70LDQvdGC0LDQvNC4INCyINC80LDQs9Cw0LfQuNC90LU8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTcpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTcnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE3KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE3JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmNGB0L/QvtC70YzQt9GD0LXRgiDRgNCw0LfQu9C40YfQvdGL0LUg0LjQvdGB0YLRgNGD0LzQtdC90YLRiyDQvNC+0YLQuNCy0LDRhtC40Lgg0LTQu9GPINC/0LXRgNGB0L7QvdCw0LvQsDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIxOCksICdzZXZlbnRoVGFibGUuY29sMF9zdHIxOCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMTgpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMTgnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCg0LDQt9Cy0LjQstCw0LXRgiDQv9C+0YLQtdC90YbQuNCw0Lsg0LrQvtC80LDQvdC00Ys8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTkpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTknKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE5KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE5JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCByb3dzcGFuPSc5JyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QndCw0LLRi9C60Lgg0YPQv9GA0LDQstC70LXQvdC40Y8g0YLQvtCy0LDRgNC90YvQvNC4INC/0YDQvtGG0LXRgdGB0LDQvNC4PC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC4INGA0LXQsNC70LjQt9GD0LXRgiDRgdGC0LDQvdC00LDRgNGC0Ysg0LLQuNC30YPQsNC70YzQvdC+0LPQviDQvNC10YDRh9C10L3QtNCw0LnQt9C40L3Qs9CwPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjIwKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjIwJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyMCksICdzZXZlbnRoVGFibGUuY29sMV9zdHIyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnIHJvd3NwYW49JzknPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIisgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgc2V2ZW50aFRhYmxlLmNvbDJfc3RyMjBfYnk5LCAnc2V2ZW50aFRhYmxlLmNvbDJfc3RyMjBfYnk5JykgK1wiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC/0YDQvtGG0LXRgdGBINC/0YDQtdC00L/RgNC+0LTQsNC20L3QvtC5INC/0L7QtNCz0L7RgtC+0LLQutC4INGC0L7QstCw0YDQsDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyM3B4Oyc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIyMSksICdzZXZlbnRoVGFibGUuY29sMF9zdHIyMScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjNweDsnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjEpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjEnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC/0YDQvtGG0LXRgdGBINC/0YDQuNC10LzQutC4INGC0L7QstCw0YDQsDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIyMiksICdzZXZlbnRoVGFibGUuY29sMF9zdHIyMicpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjIpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjInKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC/0YDQvtGG0LXRgdGBINC+0YLQs9GA0YPQt9C60Lgg0YLQvtCy0LDRgNCwPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjIzKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjIzJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyMyksICdzZXZlbnRoVGFibGUuY29sMV9zdHIyMycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC/0L7RgNGP0LTQvtC6INC90LAg0YHQutC70LDQtNC1INC4INCyINGC0L7RgNCz0L7QstC+0Lwg0LfQsNC70LU8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjQpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjQnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjI0KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjI0JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntGA0LPQsNC90LjQt9GD0LXRgiDQv9GA0L7RhtC10YHRgSDQuNC90LLQtdC90YLQsNGA0LjQt9Cw0YbQuNC4INCyINC80LDQs9Cw0LfQuNC90LU8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjUpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjUnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjI1KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjI1JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0YHQuNGB0YLQtdC80YMg0LzQtdGA0L7Qv9GA0LjRj9GC0LjQuSDQv9C+INC+0YDQs9Cw0L3QuNC30LDRhtC40Lgg0YHQvtGF0YDQsNC90L3QvtGB0YLQuCDQotCc0KY8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjYpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjYnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjI2KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjI2JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntGA0LPQsNC90LjQt9GD0LXRgiDQv9GA0L7RhtC10YHRgSDQv9C10YDQtdC+0YbQtdC90LrQuDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIyNyksICdzZXZlbnRoVGFibGUuY29sMF9zdHIyNycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjcpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjcnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC+0L/RgtC40LzQsNC70YzQvdC+0LUg0YDQsNC30LzQtdGJ0LXQvdC40LUg0YLQvtCy0LDRgNCwINC90LAg0YHQutC70LDQtNC1PC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjI4KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjI4JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyOCksICdzZXZlbnRoVGFibGUuY29sMV9zdHIyOCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgcm93c3Bhbj0nMTQnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCd0LDQstGL0LrQuCDRg9C/0YDQsNCy0LvQtdC90LjRjyDQvtC/0LXRgNCw0YbQuNC+0L3QvdC+0Lkg0LTQtdGP0YLQtdC70YzQvdC+0YHRgtGM0Y48L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9GA0L7QstC+0LTQuNGCINC80L7QvdC40YLQvtGA0LjQvdCzINC4INC+0YbQtdC90LrRgyDRgNCw0LHQvtGC0Ysg0LzQsNCz0LDQt9C40L3QsCDQv9C+INGH0LXQui3Qu9C40YHRgtGDPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjI5KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjI5JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyOSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIyOScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnIHJvd3NwYW49JzE0Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgIFwiKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBzZXZlbnRoVGFibGUuY29sMl9zdHIyOV9ieTE0LCAnc2V2ZW50aFRhYmxlLmNvbDJfc3RyMjlfYnkxNCcpICtcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/RgNC+0LLQvtC00LjQvNGL0LUg0L7Qv9C10YDQsNGG0LjQuCDQvdCwINCa0JrQnDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzMCksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzMCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzApLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzAnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQstC10LTQtdC90LjQtSDQutCw0YHRgdC+0LLQvtC5INC00L7QutGD0LzQtdC90YLQsNGG0LjQuDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzMSksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzMScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzEpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzEnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjQtSDQv9GA0LDQstC40Lsg0YDQsNCx0L7RgtGLINGBINC00LXQvdC10LbQvdC+0Lkg0L3QsNC70LjRh9C90L7RgdGC0YzRjjwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzMiksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzMicpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzIpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzInKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0LHRg9GH0LDQtdGCINC90LDQstGL0LrQsNC8INGA0LDQsdC+0YLRiyDQvdCwIFBPUyAt0YLQtdGA0LzQuNC90LDQu9C1PC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjMzKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjMzJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIzMyksICdzZXZlbnRoVGFibGUuY29sMV9zdHIzMycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0JrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNC1INC/0YDQsNCy0LjQuyDQvtCx0LvRg9C20LjQstCw0L3QuNGPINC/0LvQsNGC0LXQttC90YvRhSDQutCw0YDRgiDQnNCf0KE8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjNweDsnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzQpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzQnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDIzcHg7Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjM0KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjM0JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/RgNC+0LLQtdC00LXQvdC40LUg0LjQvdC60LDRgdGB0LDRhtC40Lg8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzUpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzUnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjM1KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjM1JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/RgNC+0YbQtdGB0YEg0L7RgtC60YDRi9GC0LjRjy/Qt9Cw0LrRgNGL0YLQuNGPINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzYpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzYnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjM2KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjM2JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0YHQvtGB0YLQsNCy0LvQtdC90LjQtSDQutCw0LTRgNC+0LLQvtC5INC00L7QutGD0LzQtdC90YLQsNGG0LjQuDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzNyksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzNycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzcpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzcnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDRhdGA0LDQvdC10L3QuNC1INC4INC/0LXRgNC10LTQsNGH0YMg0LjQvdGE0L7RgNC80LDRhtC40Lgg0L4g0LzQsNCz0LDQt9C40L3QtTwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzOCksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzOCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzgpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzgnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQvdCw0LvQuNGH0LjQtSDQvNC10LTQuNGG0LjQvdGB0LrQuNGFINC60L3QuNC20LXQujwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzOSksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzOScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzkpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzknKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0LHRg9GH0LDQtdGCINGE0L7RgNC80LjRgNC+0LLQsNC90LjRjiBLUEkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1IDHQoTwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHI0MCksICdzZXZlbnRoVGFibGUuY29sMF9zdHI0MCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyNDApLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyNDAnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQuNGB0L/RgNCw0LLQvdC+0YHRgtGMINGC0L7RgNCz0L7QstC+0LPQviDQvtCx0L7RgNGD0LTQvtCy0LDQvdC40Y88L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyNDEpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyNDEnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjQxKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjQxJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/QvtGA0Y/QtNC+0Log0LIg0YLQvtGA0LPQvtCy0L7QvCDQt9Cw0LvQtTwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHI0MiksICdzZXZlbnRoVGFibGUuY29sMF9zdHI0MicpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyNDIpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyNDInKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgIDwvdGJvZHk+XFxuXFxcclxuXHRcdFx0PC90YWJsZT5cXG5cXFxyXG5cdFx0PC9kaXY+XCJcclxuXHQpXHJcbn0iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xyXG52YXIgdWkgPSByZXF1aXJlKCcuLi8uLi91dGlscy91aScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2l4dGhUYWJsZSkge1xyXG5cdHNpeHRoVGFibGUgPSBzaXh0aFRhYmxlIHx8IHt9O1xyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J3NpeHRoVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJyBjbGFzcz0nc2l4dGhUYWJsZSc+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNvbHNwYW49JzQnIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7RhtC10L3QutCwINGB0L7QvtGC0LLQtdGC0YHRgtCy0LjRjyDQu9C40YfQvdC+0YHRgtC90YvQvCDQutC+0LzQv9C10YLQtdC90YbQuNGP0Lw8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlMic+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCd0LjQt9C60LjQuSDRgNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQtdC00L3QuNC5INGA0LXQt9GD0LvRjNGC0LDRgjwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KXQvtGA0L7RiNC40Lkg0YDQtdC30YPQu9GM0YLQsNGCPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuSDRgNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNpeHRoVGFibGUuY29sMF9zdHIwKSwgJ3NpeHRoVGFibGUuY29sMF9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNpeHRoVGFibGUuY29sMV9zdHIwKSwgJ3NpeHRoVGFibGUuY29sMV9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNpeHRoVGFibGUuY29sMl9zdHIwKSwgJ3NpeHRoVGFibGUuY29sMl9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNpeHRoVGFibGUuY29sM19zdHIwKSwgJ3NpeHRoVGFibGUuY29sM19zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0ZW50aFRhYmxlKSB7XHJcblx0dGVudGhUYWJsZSA9IHRlbnRoVGFibGUgfHwge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J3RlbnRoVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc1JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0JHQqdCQ0K8g0J7QptCV0J3QmtCQINCt0KTQpNCV0JrQotCY0JLQndCe0KHQotCYPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyByb3dzcGFuPScyJyBzdHlsZT0nd2lkdGg6IDc0N3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0L7QtNCy0LXQtNC10L3QuNC1INC40YLQvtCz0L7QsiDQv9GA0L7QvNC10LbRg9GC0L7Rh9C90L7QuSDQvtGG0LXQvdC60Lgg0LTQtdGP0YLQtdC70YzQvdC+0YHRgtC4INGB0L7RgtGA0YPQtNC90LjQutCwOjwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc0Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0YbQtdC90LrQsCDRgNC10LfRg9C70YzRgtCw0YLQsDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NHB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCd0LjQt9C60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KHRgNC10LTQvdC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCl0L7RgNC+0YjQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzQ3cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3RlbnRoVGFibGUuY29sMF9zdHIwJyByb3dzPScyJz5cIiArICh0ZW50aFRhYmxlLmNvbDBfc3RyMCB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NHB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRlbnRoVGFibGUuY29sMV9zdHIwKSwgJ3RlbnRoVGFibGUuY29sMV9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGVudGhUYWJsZS5jb2wyX3N0cjApLCAndGVudGhUYWJsZS5jb2wyX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0ZW50aFRhYmxlLmNvbDNfc3RyMCksICd0ZW50aFRhYmxlLmNvbDNfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRlbnRoVGFibGUuY29sNF9zdHIwKSwgJ3RlbnRoVGFibGUuY29sNF9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7ICcgY29sc3Bhbj0nNSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0ZW50aFRhYmxlLmNvbDBfYnk1X3N0cjEnIHJvd3M9JzInIHN0eWxlPSd3aWR0aDogOTYuNiU7Jz5cIiArICh0ZW50aFRhYmxlLmNvbDBfYnk1X3N0cjEgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdDwvdGFibGU+XFxuXFxcclxuXHRcdDwvZGl2PlwiXHJcblx0KTtcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGlyZFRhYmxlKSB7XHJcblx0dGhpcmRUYWJsZSA9IHRoaXJkVGFibGUgfHwge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J3RoaXJkVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc5JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0KbQldCd0JrQkCDQn9CeINCU0J7QodCi0JjQltCV0J3QmNCuINCe0J/QldCg0JDQptCY0J7QndCd0KvQpSBLUEk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogMTkzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+S1BJPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QptC10LvRjCAoJSk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCg0LXQt9GD0LvRjNGC0LDRgiAoJSk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0YDQvtGG0LXQvdGCINC00L7RgdGC0LjQttC10L3QuNGPINGG0LXQu9C4PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogMjQ1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0JrQvtC80LzQtdC90YLQsNGA0LjQuDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc0Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0YbQtdC90LrQsCDRgNC10LfRg9C70YzRgtCw0YLQsDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogMjNweDsgJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCd0LjQt9C60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQtdC00L3QuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KXQvtGA0L7RiNC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogMTkzcHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+0J7RhtC10L3QutCwINGB0LXRgNCy0LjRgdCwPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDBfc3RyMCcgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wwX3N0cjAgfHwgJycpICsgXCI+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wxX3N0cjAnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMV9zdHIwIHx8ICcnKSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMl9zdHIwJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDJfc3RyMCB8fCAnJykgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiAyNDVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3RoaXJkVGFibGUuY29sM19zdHIwJyByb3dzPScyJz5cIisgKHRoaXJkVGFibGUuY29sM19zdHIwIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDRfc3RyMCksJ3RoaXJkVGFibGUuY29sNF9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyMCksJ3RoaXJkVGFibGUuY29sNV9zdHIwJykgICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w2X3N0cjApLCAndGhpcmRUYWJsZS5jb2w2X3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sN19zdHIwKSwgJ3RoaXJkVGFibGUuY29sN19zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDI0cHg7IHdpZHRoOiAxOTNweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz7QotC+0LLQsNGA0L3Ri9C1INC/0L7RgtC10YDQuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wwX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMF9zdHIxIHx8ICcnKSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMV9zdHIxJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDFfc3RyMSB8fCAnJykgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDJfc3RyMScgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wyX3N0cjEgfHwgJycpICsgXCI+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogMjQ1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0aGlyZFRhYmxlLmNvbDNfc3RyMScgcm93cz0nMic+XCIgKyAodGhpcmRUYWJsZS5jb2wzX3N0cjEgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w0X3N0cjEpLCAndGhpcmRUYWJsZS5jb2w0X3N0cjEnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyMSksICd0aGlyZFRhYmxlLmNvbDVfc3RyMScpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNl9zdHIxKSwgJ3RoaXJkVGFibGUuY29sNl9zdHIxJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w3X3N0cjEpLCAndGhpcmRUYWJsZS5jb2w3X3N0cjEnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfZm9uZV90YWJsZScgc3R5bGU9J3dpZHRoOiAxOTNweCc+0J7RhtC10L3QutCwINC/0L4g0YTQvtGC0L4g0L7RgtGH0LXRgtCw0LwgKNCS0JwpPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDBfc3RyMicgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wwX3N0cjIgfHwgJycpICsgXCI+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wxX3N0cjInIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMV9zdHIyIHx8ICcnKSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMl9zdHIyJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDJfc3RyMiB8fCAnJykgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiAyNDVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3RoaXJkVGFibGUuY29sM19zdHIyJyByb3dzPScyJz5cIisgKHRoaXJkVGFibGUuY29sM19zdHIyIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNF9zdHIyKSwgJ3RoaXJkVGFibGUuY29sNF9zdHIyJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w1X3N0cjIpLCAndGhpcmRUYWJsZS5jb2w1X3N0cjInKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDZfc3RyMiksICd0aGlyZFRhYmxlLmNvbDZfc3RyMicpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sN19zdHIyKSwgJ3RoaXJkVGFibGUuY29sN19zdHIyJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnIHN0eWxlPSd3aWR0aDogMTkzcHgnPtCe0YbQtdC90LrQsCDQv9C+INGH0LXQui3Qu9C40YHRgtGDINCi0KM8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMF9zdHIzJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDBfc3RyMyB8fCAnJykgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDFfc3RyMycgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wxX3N0cjMgfHwgJycpICsgXCI+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wyX3N0cjMnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMl9zdHIzIHx8ICcnKSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDI0NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndGhpcmRUYWJsZS5jb2wzX3N0cjMnIHJvd3M9JzInPlwiKyAodGhpcmRUYWJsZS5jb2wzX3N0cjMgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w0X3N0cjMpLCAndGhpcmRUYWJsZS5jb2w0X3N0cjMnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyMyksICd0aGlyZFRhYmxlLmNvbDVfc3RyMycpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNl9zdHIzKSwgJ3RoaXJkVGFibGUuY29sNl9zdHIzJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w3X3N0cjMpLCAndGhpcmRUYWJsZS5jb2w3X3N0cjMnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfZm9uZV90YWJsZScgc3R5bGU9J3dpZHRoOiAxOTNweCc+0J7RhtC10L3QutCwINCy0L3QtdGI0L3QtdCz0L4g0LLQuNC00LA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMF9zdHI0JyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDBfc3RyNCB8fCAnJykgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDFfc3RyNCcgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wxX3N0cjQgfHwgJycpICsgXCI+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wyX3N0cjQnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMl9zdHI0IHx8ICcnKSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDI0NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndGhpcmRUYWJsZS5jb2wzX3N0cjQnIHJvd3M9JzInPlwiKyAodGhpcmRUYWJsZS5jb2wzX3N0cjQgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w0X3N0cjQpLCAndGhpcmRUYWJsZS5jb2w0X3N0cjQnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyNCksICd0aGlyZFRhYmxlLmNvbDVfc3RyNCcpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNl9zdHI0KSwgJ3RoaXJkVGFibGUuY29sNl9zdHI0JykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w3X3N0cjQpLCAndGhpcmRUYWJsZS5jb2w3X3N0cjQnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0PC90YWJsZT5cXG5cXFxyXG5cdFx0PC9kaXY+XCJcclxuXHQpXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGlydGVlbnRoVGFibGUpIHtcclxuXHR0aGlydGVlbnRoVGFibGUgPSB0aGlydGVlbnRoVGFibGUgfHwge307XHJcblx0cmV0dXJuIChcclxuXHRcdFwiPGRpdiBjbGFzcz0ndGhpcnRlZW50aFRhYmxlJz4gXFxuXFxcclxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInIGNsYXNzPSd0aGlydGVlbnRoVGFibGUnPlxcblxcXHJcblx0XHRcdFx0PHRyPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0JTQntCb0JPQntCh0KDQntCn0J3Qq9CZINCf0JvQkNCdINC4INC00L7Qs9C+0LLQvtGA0LXQvdC90L7RgdGC0LggPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndGhpcnRlZW50aFRhYmxlLmNvbDBfc3RyMCcgcm93cz0nMTAnPlwiICsgKHRoaXJ0ZWVudGhUYWJsZS5jb2wwX3N0cjAgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHR3ZWxmdGhUYWJsZSkge1xyXG5cdHR3ZWxmdGhUYWJsZSA9IHR3ZWxmdGhUYWJsZSB8fCB7fTtcclxuXHRyZXR1cm4gKFxyXG5cdFx0XCI8ZGl2IGNsYXNzPSd0d2VsZnRoVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJyBjbGFzcz0ndHdlbGZ0aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTQnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY29sc3Bhbj0nMycgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9C70LDQvSDRgNCw0LfQstC40YLQuNGPINC90LAg0L/RgNC10LTRgdGC0L7Rj9GJ0LjQuSDQv9C10YDQuNC+0LQ8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlNCc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCm0LXQu9C4INGA0LDQt9Cy0LjRgtC40Y88L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCU0LXQudGB0YLQstC40Y88L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQvtC60Lg8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlNCc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz7Qp9C10LPQviDQvdC10L7QsdGF0L7QtNC40LzQviDQtNC+0YHRgtC40YfRjD8g0JrQsNC60L7QuSDRgNC10LfRg9C70YzRgtCw0YIg0LTQvtC70LbQtdC9INCx0YvRgtGMINC00L7RgdGC0LjQs9C90YPRgiDQsiDQuNGC0L7Qs9C1P1xcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+0KfRgtC+INCy0Ysg0YHQtNC10LvQsNC10YLQtSwg0YfRgtC+0LHRiyDQtNC+0LHQuNGC0YzRgdGPINC/0L7RgdGC0LDQstC70LXQvdC90L7QuSDRhtC10LvQuD88L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+0JrQvtCz0LTQsCDQstGLINC00L7RgdGC0LjQs9C90LjRgtC1INGG0LXQu9C4PzwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMF9zdHIwJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDFfc3RyMCcgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDFfc3RyMCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wyX3N0cjAnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wyX3N0cjAgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDBfc3RyMScgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDBfc3RyMSB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wxX3N0cjEnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wxX3N0cjEgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMl9zdHIxJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMl9zdHIxIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wwX3N0cjInIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wwX3N0cjIgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMV9zdHIyJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMV9zdHIyIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDJfc3RyMicgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDJfc3RyMiB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMF9zdHIzJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMF9zdHIzIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDFfc3RyMycgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDFfc3RyMyB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wyX3N0cjMnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wyX3N0cjMgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDBfc3RyNCcgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDBfc3RyNCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wxX3N0cjQnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wxX3N0cjQgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMl9zdHI0JyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMl9zdHI0IHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wwX3N0cjUnIHJvd3M9JzInPlwiKyAodHdlbGZ0aFRhYmxlLmNvbDBfc3RyNSB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDFfc3RyNScgcm93cz0nMic+XCIrICh0d2VsZnRoVGFibGUuY29sMV9zdHI1IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMl9zdHI1JyByb3dzPScyJz5cIisgKHR3ZWxmdGhUYWJsZS5jb2wyX3N0cjUgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMF9zdHI2JyByb3dzPScyJz5cIisgKHR3ZWxmdGhUYWJsZS5jb2wwX3N0cjYgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wxX3N0cjYnIHJvd3M9JzInPlwiKyAodHdlbGZ0aFRhYmxlLmNvbDFfc3RyNiB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDJfc3RyNicgcm93cz0nMic+XCIrICh0d2VsZnRoVGFibGUuY29sMl9zdHI2IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZXIpIHtcclxuXHR1c2VyID0gdXNlciB8fCB7fTtcclxuXHRyZXR1cm4gKFxyXG5cdFx0XCI8ZGl2IGNsYXNzPSd1c2VyVGVtcGxhdGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDxpbnB1dCB0eXBlPSdoaWRkZW4nIG5hbWU9J3BlcnNvbl9pZCcgdmFsdWU9XCIrIHVzZXIuaWQgK1wiIC8+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDE5M3B4OyB0ZXh0LWFsaWduOmxlZnQ7IHBhZGRpbmctbGVmdDoxMHB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx00KTQmNCeINCh0J7QotCg0KPQlNCd0JjQmtCQOlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZScgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDI4OXB4Oyc+XCIgKyB1c2VyLm5hbWUgKyBcIjwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDE5M3B4OyB0ZXh0LWFsaWduOmxlZnQ7IHBhZGRpbmctbGVmdDoxMHB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx00J/QntCU0KDQkNCX0JTQldCb0JXQndCY0JU6XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cIiArIHVzZXIuc3ViZGl2aXNpb24gKyBcIjwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHg7IHdpZHRoOiAxOTNweDsgdGV4dC1hbGlnbjpsZWZ0OyBwYWRkaW5nLWxlZnQ6MTBweDsnPtCU0J7Qm9CW0J3QntCh0KLQrDo8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDI4OXB4OycgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XCIgKyB1c2VyLnBvc2l0aW9uICsgXCI8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDE5M3B4OyB0ZXh0LWFsaWduOmxlZnQ7IHBhZGRpbmctbGVmdDoxMHB4Oyc+0KTQmNCeINCg0KPQmtCe0JLQntCU0JjQotCV0JvQrzo8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCcgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XCIgKyB1c2VyLmJvc3NOYW1lICsgXCI8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdCk7XHJcbn0iLCJ2YXIgQUpBWF9USU1FX09WRVIgPSAxMDAwMDtcclxuXHJcbnZhciBBamF4ID0ge1xyXG5cclxuICAgIGdldFhtbEh0dHA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHhtbEh0dHA7XHJcbiAgICAgICAgdHJ5IHsgeG1sSHR0cCA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFBcIik7IH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0cnkgeyB4bWxIdHRwID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTsgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7IHhtbEh0dHAgPSBmYWxzZTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXhtbEh0dHAgJiYgdHlwZW9mKFhNTEh0dHBSZXF1ZXN0KSAhPSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgeG1sSHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJldHVybiB4bWxIdHRwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZW5kUmVxdWVzdDogZnVuY3Rpb24odXJsLCBjYWxsQmFjaywgaXNDYWNoZSwgZGF0YSwgaXNTeW5jLCByZXF1ZXN0VHlwZSkge1xyXG5cclxuICAgICAgICB2YXIgeG1sSHR0cCA9IHRoaXMuZ2V0WG1sSHR0cCgpO1xyXG4gICAgICAgIHJlcXVlc3RUeXBlID0gcmVxdWVzdFR5cGUgfHwgJ0dFVCc7XHJcbiAgICAgICAgaXNTeW5jID0gaXNTeW5jIHx8IHRydWU7XHJcbiAgICAgICAgdXJsID0gaXNDYWNoZSA9PT0gZmFsc2UgfHwgIWlzQ2FjaGUgPyBlbmNvZGVVUkkodXJsICsgXCImcj1cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMDAwKSkgOiBlbmNvZGVVUkkodXJsKTtcclxuXHJcbiAgICAgICAgeG1sSHR0cC5vcGVuKHJlcXVlc3RUeXBlLCB1cmwsIGlzU3luYyk7XHJcbiAgICAgICAgeG1sSHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh4bWxIdHRwLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgICAgICBpZiAodGltZW91dClcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHhtbEh0dHAuc3RhdHVzID09IDIwMCAmJiBjYWxsQmFjayl7XHJcbiAgICAgICAgICAgICAgIGNhbGxCYWNrKHhtbEh0dHAucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhtbEh0dHAuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhtbEh0dHAuc3RhdHVzVGV4dCB8fCBcIkFqYXggcmVxdWVzdCBlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeG1sSHR0cC5zZW5kKGRhdGEgfHwgbnVsbCk7XHJcblxyXG4gICAgICAgIGlmIChpc1N5bmMpe1xyXG4gICAgICAgICAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7IFxyXG4gICAgICAgICAgICAgICAgeG1sSHR0cC5hYm9ydCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBamF4IHJlcXVlc3QgdGltZSBvdmVyXCIpO1xyXG4gICAgICAgICAgICB9LCBBSkFYX1RJTUVfT1ZFUik7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5BamF4ID0gQWpheDtcclxubW9kdWxlLmV4cG9ydHMgPSBBamF4OyAgICAgXHJcbiIsInZhciBBamF4ID0gcmVxdWlyZSgnLi9BamF4Jyk7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG5cclxudmFyIGZvcm1zID0ge1xyXG5cclxuXHRoaWRlQnV0dG9uczogZnVuY3Rpb24oKXtcclxuXHRcdCQoJyNyZW5kZXItcHJldmlldy1idXR0b25zJykuY3NzKHtkaXNwbGF5OiAnbm9uZSd9KTtcclxuXHR9LFxyXG5cclxuXHRzaG93QnV0dG9uczogZnVuY3Rpb24oKXtcclxuXHRcdCQoJyNyZW5kZXItcHJldmlldy1idXR0b25zJykuY3NzKHtkaXNwbGF5OiAnYmxvY2snfSk7XHJcblx0fSxcclxuXHJcblx0c2hvd1NwaW5uZXI6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoJy5vdmVybGF5LWxvYWRpbmcnKS5hZGRDbGFzcygnb3ZlcmxheS1sb2FkaW5nLS1zaG93Jyk7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlU3Bpbm5lcjogZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5vdmVybGF5LWxvYWRpbmcnKS5yZW1vdmVDbGFzcygnb3ZlcmxheS1sb2FkaW5nLS1zaG93Jyk7XHJcblx0fSxcclxuXHJcblx0cHJpbnQ6IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmhpZGVCdXR0b25zKCk7XHJcblx0XHR3aW5kb3cucHJpbnQoKTtcclxuXHRcdHRoaXMuc2hvd0J1dHRvbnMoKTtcclxuXHR9LFxyXG5cclxuXHRkb3dubG9hZEZpbGU6IGZ1bmN0aW9uKGFjdGlvbk5hbWUsIGZpbGVOYW1lKXtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdC8vdGhpcy5zaG93U3Bpbm5lcigpO1xyXG5cdFx0dmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xyXG5cdFx0YS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBjb25maWcudXJsLmNyZWF0ZVBhdGgoe2FjdGlvbl9uYW1lOiBhY3Rpb25OYW1lLCBmaWxlX25hbWU6IGZpbGVOYW1lfSkpO1xyXG5cdFx0YS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0YS5jbGljaygpO1xyXG5cdFx0Ly90aGlzLnJlbW92ZVNwaW5uZXIoKTtcclxuXHR9LFxyXG5cclxuXHRzYXZlUGRmOiBmdW5jdGlvbihlKXtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRoaXMuaGlkZUJ1dHRvbnMoKTtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0ID8gZXZlbnQucHJldmVudERlZmF1bHQoKSA6IChldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlKTtcclxuXHRcdHZhciBtYXJrRGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0ub3V0ZXJIVE1MO1xyXG5cdFx0dGhpcy5zaG93QnV0dG9ucygpO1xyXG5cdFx0QWpheC5zZW5kUmVxdWVzdChjb25maWcudXJsLmNyZWF0ZVBhdGgoe2FjdGlvbl9uYW1lOiAnY3JlYXRlUGRmJ30pLCBmdW5jdGlvbihmaWxlTmFtZSl7XHJcblx0XHRcdHNlbGYuZG93bmxvYWRGaWxlKCdnZXRQZGYnLCBmaWxlTmFtZSk7XHJcblx0XHR9LCBmYWxzZSwgbWFya0RhdGEsIHRydWUsICdQT1NUJyk7XHJcblx0fSxcclxuXHJcblx0c2F2ZURvYzogZnVuY3Rpb24oKXtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRoaXMuaGlkZUJ1dHRvbnMoKTtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0ID8gZXZlbnQucHJldmVudERlZmF1bHQoKSA6IChldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlKTtcclxuXHRcdHZhciBtYXJrRGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0ub3V0ZXJIVE1MO1xyXG5cdFx0dGhpcy5zaG93QnV0dG9ucygpO1xyXG5cdFx0QWpheC5zZW5kUmVxdWVzdChjb25maWcudXJsLmNyZWF0ZVBhdGgoe2FjdGlvbl9uYW1lOiAnY3JlYXRlRG9jJ30pLCBmdW5jdGlvbihmaWxlTmFtZSl7XHJcblx0XHRcdHNlbGYuZG93bmxvYWRGaWxlKCdnZXREb2MnLCBmaWxlTmFtZSk7IFxyXG5cdFx0fSwgZmFsc2UsIG1hcmtEYXRhLCB0cnVlLCAnUE9TVCcpO1xyXG5cdH0sXHJcblxyXG5cdHJlcXVlc3RQcmV2aWV3Rm9ybTogZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR2YXIgZm9ybVR5cGVJZCA9IHV0aWxzLmdldFVybFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaHJlZiwgJ29iamVjdF9pZCcpO1xyXG5cdFx0dmFyIGZvcm1JZCA9IHV0aWxzLmdldFVybFBhcmFtcyh3aW5kb3cucGFyZW50LmxvY2F0aW9uLmhyZWYsICdvYmplY3RfaWQnKTtcclxuXHRcdHdpbmRvdy5wYXJlbnQubG9jYXRpb24uaHJlZiA9IFwiL2Fzc2Vzc21lbnRfZm9ybS9pbmRleC5odG1sP3ByZXZpZXc9MSZmb3JtX2lkPVwiICsgZm9ybUlkICsgXCImZm9ybV90eXBlX2lkPVwiICsgZm9ybVR5cGVJZDtcclxuXHR9LFxyXG5cclxuXHRzZW5kRm9ybTogZnVuY3Rpb24oc3RhdHVzKSB7XHJcblx0XHQkKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBpc0NoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xyXG5cdFx0XHR2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xyXG5cdFx0XHRpZiAoIWlzQ2hlY2tlZCkge1xyXG5cdFx0XHRcdCQodGhpcykucGFyZW50KCkuYXBwZW5kKCc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCInK25hbWUrJ1wiIHZhbHVlPVwib2ZmXCI+Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FjdGlvbkZvcm0nKTtcclxuXHRcdGZvcm0uZm9ybV9pZC52YWx1ZSA9IHV0aWxzLmdldFVybFBhcmFtcyh3aW5kb3cucGFyZW50LmxvY2F0aW9uLmhyZWYsICdvYmplY3RfaWQnKTtcclxuXHRcdGZvcm0uYWN0aW9uLnZhbHVlID0gc3RhdHVzO1xyXG5cdFx0Zm9ybS5zdWJtaXQoKTsgXHJcblx0fVxyXG59XHJcblxyXG53aW5kb3cuZm9ybXMgPSBmb3JtcztcclxubW9kdWxlLmV4cG9ydHMgPSBmb3JtczsgICAgXHJcblxyXG4iLCIvKlxyXG4gICAgICBqc29uX3BhcnNlLmpzXHJcbiAgICAgIDIwMTUtMDUtMDJcclxuICAgICAgUHVibGljIERvbWFpbi5cclxuICAgICAgTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxyXG4gICAgICBUaGlzIGZpbGUgY3JlYXRlcyBhIGpzb25fcGFyc2UgZnVuY3Rpb24uXHJcbiAgICAgICAgICBqc29uX3BhcnNlKHRleHQsIHJldml2ZXIpXHJcbiAgICAgICAgICAgICAgVGhpcyBtZXRob2QgcGFyc2VzIGEgSlNPTiB0ZXh0IHRvIHByb2R1Y2UgYW4gb2JqZWN0IG9yIGFycmF5LlxyXG4gICAgICAgICAgICAgIEl0IGNhbiB0aHJvdyBhIFN5bnRheEVycm9yIGV4Y2VwdGlvbi5cclxuICAgICAgICAgICAgICBUaGUgb3B0aW9uYWwgcmV2aXZlciBwYXJhbWV0ZXIgaXMgYSBmdW5jdGlvbiB0aGF0IGNhbiBmaWx0ZXIgYW5kXHJcbiAgICAgICAgICAgICAgdHJhbnNmb3JtIHRoZSByZXN1bHRzLiBJdCByZWNlaXZlcyBlYWNoIG9mIHRoZSBrZXlzIGFuZCB2YWx1ZXMsXHJcbiAgICAgICAgICAgICAgYW5kIGl0cyByZXR1cm4gdmFsdWUgaXMgdXNlZCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCB2YWx1ZS5cclxuICAgICAgICAgICAgICBJZiBpdCByZXR1cm5zIHdoYXQgaXQgcmVjZWl2ZWQsIHRoZW4gdGhlIHN0cnVjdHVyZSBpcyBub3QgbW9kaWZpZWQuXHJcbiAgICAgICAgICAgICAgSWYgaXQgcmV0dXJucyB1bmRlZmluZWQgdGhlbiB0aGUgbWVtYmVyIGlzIGRlbGV0ZWQuXHJcbiAgICAgICAgICAgICAgRXhhbXBsZTpcclxuICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgdGV4dC4gVmFsdWVzIHRoYXQgbG9vayBsaWtlIElTTyBkYXRlIHN0cmluZ3Mgd2lsbFxyXG4gICAgICAgICAgICAgIC8vIGJlIGNvbnZlcnRlZCB0byBEYXRlIG9iamVjdHMuXHJcbiAgICAgICAgICAgICAgbXlEYXRhID0ganNvbl9wYXJzZSh0ZXh0LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgYTtcclxuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGEgPVxyXG4gIC9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopPylaJC8uZXhlYyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygrYVsxXSwgK2FbMl0gLSAxLCArYVszXSwgK2FbNF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICthWzVdLCArYVs2XSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgVGhpcyBpcyBhIHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbi4gWW91IGFyZSBmcmVlIHRvIGNvcHksIG1vZGlmeSwgb3JcclxuICAgICAgcmVkaXN0cmlidXRlLlxyXG4gICAgICBUaGlzIGNvZGUgc2hvdWxkIGJlIG1pbmlmaWVkIGJlZm9yZSBkZXBsb3ltZW50LlxyXG4gICAgICBTZWUgaHR0cDovL2phdmFzY3JpcHQuY3JvY2tmb3JkLmNvbS9qc21pbi5odG1sXHJcbiAgICAgIFVTRSBZT1VSIE9XTiBDT1BZLiBJVCBJUyBFWFRSRU1FTFkgVU5XSVNFIFRPIExPQUQgQ09ERSBGUk9NIFNFUlZFUlMgWU9VIERPXHJcbiAgICAgIE5PVCBDT05UUk9MLlxyXG4gICovXHJcblxyXG4gIC8qanNsaW50IGZvciAqL1xyXG5cclxuICAvKnByb3BlcnR5IFxyXG4gICAgICBhdCwgYiwgY2FsbCwgY2hhckF0LCBmLCBmcm9tQ2hhckNvZGUsIGhhc093blByb3BlcnR5LCBtZXNzYWdlLCBuLCBuYW1lLCBcclxuICAgICAgcHJvdG90eXBlLCBwdXNoLCByLCB0LCB0ZXh0XHJcbiAgKi9cclxuXHJcbiAgdmFyIGpzb25fcGFyc2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRoYXQgY2FuIHBhcnNlIGEgSlNPTiB0ZXh0LCBwcm9kdWNpbmcgYSBKYXZhU2NyaXB0XHJcbiAgLy8gZGF0YSBzdHJ1Y3R1cmUuIEl0IGlzIGEgc2ltcGxlLCByZWN1cnNpdmUgZGVzY2VudCBwYXJzZXIuIEl0IGRvZXMgbm90IHVzZVxyXG4gIC8vIGV2YWwgb3IgcmVndWxhciBleHByZXNzaW9ucywgc28gaXQgY2FuIGJlIHVzZWQgYXMgYSBtb2RlbCBmb3IgaW1wbGVtZW50aW5nXHJcbiAgLy8gYSBKU09OIHBhcnNlciBpbiBvdGhlciBsYW5ndWFnZXMuXHJcblxyXG4gIC8vIFdlIGFyZSBkZWZpbmluZyB0aGUgZnVuY3Rpb24gaW5zaWRlIG9mIGFub3RoZXIgZnVuY3Rpb24gdG8gYXZvaWQgY3JlYXRpbmdcclxuICAvLyBnbG9iYWwgdmFyaWFibGVzLlxyXG5cclxuICAgICAgdmFyIGF0LCAgICAgLy8gVGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IGNoYXJhY3RlclxyXG4gICAgICAgICAgY2gsICAgICAvLyBUaGUgY3VycmVudCBjaGFyYWN0ZXJcclxuICAgICAgICAgIGVzY2FwZWUgPSB7XHJcbiAgICAgICAgICAgICAgJ1wiJzogJ1wiJyxcclxuICAgICAgICAgICAgICAnXFxcXCc6ICdcXFxcJyxcclxuICAgICAgICAgICAgICAnLyc6ICcvJyxcclxuICAgICAgICAgICAgICBiOiAnXFxiJyxcclxuICAgICAgICAgICAgICBmOiAnXFxmJyxcclxuICAgICAgICAgICAgICBuOiAnXFxuJyxcclxuICAgICAgICAgICAgICByOiAnXFxyJyxcclxuICAgICAgICAgICAgICB0OiAnXFx0J1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRleHQsXHJcblxyXG4gICAgICAgICAgZXJyb3IgPSBmdW5jdGlvbiAobSkge1xyXG5cclxuICAvLyBDYWxsIGVycm9yIHdoZW4gc29tZXRoaW5nIGlzIHdyb25nLlxyXG5cclxuICAgICAgICAgICAgICB0aHJvdyB7XHJcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdTeW50YXhFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG0sXHJcbiAgICAgICAgICAgICAgICAgIGF0OiBhdCxcclxuICAgICAgICAgICAgICAgICAgdGV4dDogdGV4dFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiAoYykge1xyXG5cclxuICAvLyBJZiBhIGMgcGFyYW1ldGVyIGlzIHByb3ZpZGVkLCB2ZXJpZnkgdGhhdCBpdCBtYXRjaGVzIHRoZSBjdXJyZW50IGNoYXJhY3Rlci5cclxuXHJcbiAgICAgICAgICAgICAgaWYgKGMgJiYgYyAhPT0gY2gpIHtcclxuICAgICAgICAgICAgICAgICAgZXJyb3IoXCJFeHBlY3RlZCAnXCIgKyBjICsgXCInIGluc3RlYWQgb2YgJ1wiICsgY2ggKyBcIidcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAvLyBHZXQgdGhlIG5leHQgY2hhcmFjdGVyLiBXaGVuIHRoZXJlIGFyZSBubyBtb3JlIGNoYXJhY3RlcnMsXHJcbiAgLy8gcmV0dXJuIHRoZSBlbXB0eSBzdHJpbmcuXHJcblxyXG4gICAgICAgICAgICAgIGNoID0gdGV4dC5jaGFyQXQoYXQpO1xyXG4gICAgICAgICAgICAgIGF0ICs9IDE7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGNoO1xyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICBudW1iZXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIC8vIFBhcnNlIGEgbnVtYmVyIHZhbHVlLlxyXG5cclxuICAgICAgICAgICAgICB2YXIgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICBzdHJpbmcgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgaWYgKGNoID09PSAnLScpIHtcclxuICAgICAgICAgICAgICAgICAgc3RyaW5nID0gJy0nO1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCctJyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHdoaWxlIChjaCA+PSAnMCcgJiYgY2ggPD0gJzknKSB7XHJcbiAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAoY2ggPT09ICcuJykge1xyXG4gICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gJy4nO1xyXG4gICAgICAgICAgICAgICAgICB3aGlsZSAobmV4dCgpICYmIGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAoY2ggPT09ICdlJyB8fCBjaCA9PT0gJ0UnKSB7XHJcbiAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICctJyB8fCBjaCA9PT0gJysnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcclxuICAgICAgICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBudW1iZXIgPSArc3RyaW5nO1xyXG4gICAgICAgICAgICAgIGlmICghaXNGaW5pdGUobnVtYmVyKSkge1xyXG4gICAgICAgICAgICAgICAgICBlcnJvcihcIkJhZCBudW1iZXJcIik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bWJlcjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIHN0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy8gUGFyc2UgYSBzdHJpbmcgdmFsdWUuXHJcblxyXG4gICAgICAgICAgICAgIHZhciBoZXgsXHJcbiAgICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICAgIHN0cmluZyA9ICcnLFxyXG4gICAgICAgICAgICAgICAgICB1ZmZmZjtcclxuXHJcbiAgLy8gV2hlbiBwYXJzaW5nIGZvciBzdHJpbmcgdmFsdWVzLCB3ZSBtdXN0IGxvb2sgZm9yIFwiIGFuZCBcXCBjaGFyYWN0ZXJzLlxyXG5cclxuICAgICAgICAgICAgICBpZiAoY2ggPT09ICdcIicpIHtcclxuICAgICAgICAgICAgICAgICAgd2hpbGUgKG5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSAnXCInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICdcXFxcJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICd1Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZmZmZiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhleCA9IHBhcnNlSW50KG5leHQoKSwgMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShoZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZmZmZiA9IHVmZmZmICogMTYgKyBoZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodWZmZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVzY2FwZWVbY2hdID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gZXNjYXBlZVtjaF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZXJyb3IoXCJCYWQgc3RyaW5nXCIpO1xyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICB3aGl0ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy8gU2tpcCB3aGl0ZXNwYWNlLlxyXG5cclxuICAgICAgICAgICAgICB3aGlsZSAoY2ggJiYgY2ggPD0gJyAnKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIHdvcmQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIC8vIHRydWUsIGZhbHNlLCBvciBudWxsLlxyXG5cclxuICAgICAgICAgICAgICBzd2l0Y2ggKGNoKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSAndCc6XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ3QnKTtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgncicpO1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCd1Jyk7XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ2UnKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgY2FzZSAnZic6XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ2YnKTtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgnYScpO1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCdsJyk7XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ3MnKTtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgnZScpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgY2FzZSAnbic6XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ24nKTtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgndScpO1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCdsJyk7XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ2wnKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVycm9yKFwiVW5leHBlY3RlZCAnXCIgKyBjaCArIFwiJ1wiKTtcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgdmFsdWUsICAvLyBQbGFjZSBob2xkZXIgZm9yIHRoZSB2YWx1ZSBmdW5jdGlvbi5cclxuXHJcbiAgICAgICAgICBhcnJheSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy8gUGFyc2UgYW4gYXJyYXkgdmFsdWUuXHJcblxyXG4gICAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoY2ggPT09ICdbJykge1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCdbJyk7XHJcbiAgICAgICAgICAgICAgICAgIHdoaXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0KCddJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7ICAgLy8gZW1wdHkgYXJyYXlcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB3aGlsZSAoY2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2godmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3aGl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSAnXScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0KCddJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgbmV4dCgnLCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgd2hpdGUoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlcnJvcihcIkJhZCBhcnJheVwiKTtcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgb2JqZWN0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAvLyBQYXJzZSBhbiBvYmplY3QgdmFsdWUuXHJcblxyXG4gICAgICAgICAgICAgIHZhciBrZXksXHJcbiAgICAgICAgICAgICAgICAgIG9iamVjdCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICBpZiAoY2ggPT09ICd7Jykge1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCd7Jyk7XHJcbiAgICAgICAgICAgICAgICAgIHdoaXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ30nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0KCd9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0OyAgIC8vIGVtcHR5IG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAga2V5ID0gc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3aGl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgbmV4dCgnOicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKCdEdXBsaWNhdGUga2V5IFwiJyArIGtleSArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgd2hpdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ30nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCgnfScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0KCcsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3aGl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVycm9yKFwiQmFkIG9iamVjdFwiKTtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICB2YWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy8gUGFyc2UgYSBKU09OIHZhbHVlLiBJdCBjb3VsZCBiZSBhbiBvYmplY3QsIGFuIGFycmF5LCBhIHN0cmluZywgYSBudW1iZXIsXHJcbiAgLy8gb3IgYSB3b3JkLlxyXG5cclxuICAgICAgICAgIHdoaXRlKCk7XHJcbiAgICAgICAgICBzd2l0Y2ggKGNoKSB7XHJcbiAgICAgICAgICBjYXNlICd7JzpcclxuICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0KCk7XHJcbiAgICAgICAgICBjYXNlICdbJzpcclxuICAgICAgICAgICAgICByZXR1cm4gYXJyYXkoKTtcclxuICAgICAgICAgIGNhc2UgJ1wiJzpcclxuICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nKCk7XHJcbiAgICAgICAgICBjYXNlICctJzpcclxuICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyKCk7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIHJldHVybiBjaCA+PSAnMCcgJiYgY2ggPD0gJzknIFxyXG4gICAgICAgICAgICAgICAgICA/IG51bWJlcigpIFxyXG4gICAgICAgICAgICAgICAgICA6IHdvcmQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgLy8gUmV0dXJuIHRoZSBqc29uX3BhcnNlIGZ1bmN0aW9uLiBJdCB3aWxsIGhhdmUgYWNjZXNzIHRvIGFsbCBvZiB0aGUgYWJvdmVcclxuICAvLyBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlcy5cclxuXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlLCByZXZpdmVyKSB7XHJcbiAgICAgICAgICB2YXIgcmVzdWx0O1xyXG5cclxuICAgICAgICAgIHRleHQgPSBzb3VyY2U7XHJcbiAgICAgICAgICBhdCA9IDA7XHJcbiAgICAgICAgICBjaCA9ICcgJztcclxuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlKCk7XHJcbiAgICAgICAgICB3aGl0ZSgpO1xyXG4gICAgICAgICAgaWYgKGNoKSB7XHJcbiAgICAgICAgICAgICAgZXJyb3IoXCJTeW50YXggZXJyb3JcIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gIC8vIElmIHRoZXJlIGlzIGEgcmV2aXZlciBmdW5jdGlvbiwgd2UgcmVjdXJzaXZlbHkgd2FsayB0aGUgbmV3IHN0cnVjdHVyZSxcclxuICAvLyBwYXNzaW5nIGVhY2ggbmFtZS92YWx1ZSBwYWlyIHRvIHRoZSByZXZpdmVyIGZ1bmN0aW9uIGZvciBwb3NzaWJsZVxyXG4gIC8vIHRyYW5zZm9ybWF0aW9uLCBzdGFydGluZyB3aXRoIGEgdGVtcG9yYXJ5IHJvb3Qgb2JqZWN0IHRoYXQgaG9sZHMgdGhlIHJlc3VsdFxyXG4gIC8vIGluIGFuIGVtcHR5IGtleS4gSWYgdGhlcmUgaXMgbm90IGEgcmV2aXZlciBmdW5jdGlvbiwgd2Ugc2ltcGx5IHJldHVybiB0aGVcclxuICAvLyByZXN1bHQuXHJcblxyXG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXZpdmVyID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgICAgPyAoZnVuY3Rpb24gd2Fsayhob2xkZXIsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgaywgdiwgdmFsdWUgPSBob2xkZXJba2V5XTtcclxuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGZvciAoayBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSB3YWxrKHZhbHVlLCBrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVba10gPSB2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXZpdmVyLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgICB9KHsnJzogcmVzdWx0fSwgJycpKVxyXG4gICAgICAgICAgICAgIDogcmVzdWx0O1xyXG4gICAgICB9O1xyXG4gIH0oKSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGpzb25fcGFyc2U7IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y3JlYXRlU2VsZWN0OiBmdW5jdGlvbiAodmFsdWVzLCBzZWxlY3RlZFZhbHVlLCBuYW1lKSB7XHJcblx0XHR2YXIgc2VsZWN0ID0gXCI8c2VsZWN0IG5hbWU9XCIrIG5hbWUgK1wiIHN0eWxlPSd3aWR0aDogNDVweCc+XCI7XHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdHZhciBvcHRpb24gPSB2YWx1ZXNbaV0gPT0gc2VsZWN0ZWRWYWx1ZSA/IFwiPG9wdGlvbiBzZWxlY3RlZD5cIiArIHZhbHVlc1tpXSArIFwiPC9vcHRpb24+XCIgOiBcIjxvcHRpb24+XCIgKyB2YWx1ZXNbaV0gKyBcIjwvb3B0aW9uPlwiO1xyXG5cdFx0XHRzZWxlY3QgKz0gb3B0aW9uO1xyXG5cdFx0fTtcclxuXHRcdHJldHVybiBzZWxlY3QuY29uY2F0KFwiPC9zZWxlY3Q+XCIpO1xyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZUNoZWNrQm94OiBmdW5jdGlvbihpc0NoZWNrZWQsIG5hbWUpe1xyXG5cdFx0cmV0dXJuIGlzQ2hlY2tlZCA9PT0gdHJ1ZSA/IFwiPGlucHV0IG5hbWU9XCIrbmFtZStcIiB0eXBlPSdjaGVja2JveCcgY2hlY2tlZC8+XCIgOiBcIjxpbnB1dCBuYW1lPVwiK25hbWUrXCIgdHlwZT0nY2hlY2tib3gnIC8+XCJcclxuXHR9XHJcbn0iLCJ2YXIgdXRpbHMgPSB7XHJcblxyXG5cdGRlY29kZUh0bWw6IGZ1bmN0aW9uKHN0cikge1xyXG5cdFx0dmFyIHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcclxuXHQgICAgdGV4dEFyZWEuaW5uZXJIVE1MID0gc3RyO1xyXG5cdCBcdHZhciBvdXRTdHIgPSB0ZXh0QXJlYS52YWx1ZS5yZXBsYWNlKC8mIyhcXGQrKTsvZywgZnVuY3Rpb24obWF0Y2gsIGRlYykge1xyXG5cdFx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShkZWMpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gb3V0U3RyO1xyXG5cdFx0XHJcblx0fSxcclxuXHRcclxuXHRzdHJCb29sVG9Cb29sOiBmdW5jdGlvbiAoYm9vbFN0cikge1xyXG5cdFx0aWYgKGJvb2xTdHIgPT09IHVuZGVmaW5lZCB8fCBib29sU3RyID09PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcblx0XHRyZXR1cm4gKGJvb2xTdHIgPT09ICcwJ3x8IGJvb2xTdHIgPT09ICdmYWxzZScpID8gZmFsc2UgOiB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdGdldFVybFBhcmFtczogZnVuY3Rpb24odXJsLCBwYXJhbSl7XHJcblx0XHRpZiAoIXVybCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0dmFyIHZhcnMgPSB7fTtcclxuXHQgICAgdXJsLnJlcGxhY2UoIFxyXG5cdFx0XHQvWz8mXSsoW149Jl0rKT0/KFteJl0qKT8vZ2ksXHJcblx0XHRcdGZ1bmN0aW9uKCBtLCBrZXksIHZhbHVlICkge1xyXG5cdFx0XHRcdHZhcnNba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6ICcnO1xyXG5cdFx0XHR9XHJcblx0ICAgICk7XHJcblxyXG5cdCAgICBpZiAocGFyYW0pIHJldHVybiB2YXJzW3BhcmFtXTtcclxuXHQgICAgcmV0dXJuIHZhcnM7XHJcblx0fVxyXG59XHJcblxyXG53aW5kb3cudXRpbHMgPSB1dGlscztcclxubW9kdWxlLmV4cG9ydHMgPSB1dGlsczsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbiIsIi8vISBtb21lbnQuanNcbi8vISB2ZXJzaW9uIDogMi4xMS4yXG4vLyEgYXV0aG9ycyA6IFRpbSBXb29kLCBJc2tyZW4gQ2hlcm5ldiwgTW9tZW50LmpzIGNvbnRyaWJ1dG9yc1xuLy8hIGxpY2Vuc2UgOiBNSVRcbi8vISBtb21lbnRqcy5jb21cblxuOyhmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgZ2xvYmFsLm1vbWVudCA9IGZhY3RvcnkoKVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBob29rQ2FsbGJhY2s7XG5cbiAgICBmdW5jdGlvbiB1dGlsc19ob29rc19faG9va3MgKCkge1xuICAgICAgICByZXR1cm4gaG9va0NhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBpcyBkb25lIHRvIHJlZ2lzdGVyIHRoZSBtZXRob2QgY2FsbGVkIHdpdGggbW9tZW50KClcbiAgICAvLyB3aXRob3V0IGNyZWF0aW5nIGNpcmN1bGFyIGRlcGVuZGVuY2llcy5cbiAgICBmdW5jdGlvbiBzZXRIb29rQ2FsbGJhY2sgKGNhbGxiYWNrKSB7XG4gICAgICAgIGhvb2tDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQXJyYXkoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEYXRlKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIERhdGUgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcChhcnIsIGZuKSB7XG4gICAgICAgIHZhciByZXMgPSBbXSwgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgcmVzLnB1c2goZm4oYXJyW2ldLCBpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNPd25Qcm9wKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLCBiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmQoYSwgYikge1xuICAgICAgICBmb3IgKHZhciBpIGluIGIpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGIsIGkpKSB7XG4gICAgICAgICAgICAgICAgYVtpXSA9IGJbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzT3duUHJvcChiLCAndG9TdHJpbmcnKSkge1xuICAgICAgICAgICAgYS50b1N0cmluZyA9IGIudG9TdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzT3duUHJvcChiLCAndmFsdWVPZicpKSB7XG4gICAgICAgICAgICBhLnZhbHVlT2YgPSBiLnZhbHVlT2Y7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVfdXRjX19jcmVhdGVVVEMgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCB0cnVlKS51dGMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZhdWx0UGFyc2luZ0ZsYWdzKCkge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIGRlZXAgY2xvbmUgdGhpcyBvYmplY3QuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbXB0eSAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIHVudXNlZFRva2VucyAgICA6IFtdLFxuICAgICAgICAgICAgdW51c2VkSW5wdXQgICAgIDogW10sXG4gICAgICAgICAgICBvdmVyZmxvdyAgICAgICAgOiAtMixcbiAgICAgICAgICAgIGNoYXJzTGVmdE92ZXIgICA6IDAsXG4gICAgICAgICAgICBudWxsSW5wdXQgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIGludmFsaWRNb250aCAgICA6IG51bGwsXG4gICAgICAgICAgICBpbnZhbGlkRm9ybWF0ICAgOiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXJJbnZhbGlkYXRlZCA6IGZhbHNlLFxuICAgICAgICAgICAgaXNvICAgICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYXJzaW5nRmxhZ3MobSkge1xuICAgICAgICBpZiAobS5fcGYgPT0gbnVsbCkge1xuICAgICAgICAgICAgbS5fcGYgPSBkZWZhdWx0UGFyc2luZ0ZsYWdzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0uX3BmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkX19pc1ZhbGlkKG0pIHtcbiAgICAgICAgaWYgKG0uX2lzVmFsaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGZsYWdzID0gZ2V0UGFyc2luZ0ZsYWdzKG0pO1xuICAgICAgICAgICAgbS5faXNWYWxpZCA9ICFpc05hTihtLl9kLmdldFRpbWUoKSkgJiZcbiAgICAgICAgICAgICAgICBmbGFncy5vdmVyZmxvdyA8IDAgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MuZW1wdHkgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZE1vbnRoICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRXZWVrZGF5ICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLm51bGxJbnB1dCAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkRm9ybWF0ICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLnVzZXJJbnZhbGlkYXRlZDtcblxuICAgICAgICAgICAgaWYgKG0uX3N0cmljdCkge1xuICAgICAgICAgICAgICAgIG0uX2lzVmFsaWQgPSBtLl9pc1ZhbGlkICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLmNoYXJzTGVmdE92ZXIgPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MudW51c2VkVG9rZW5zLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICBmbGFncy5iaWdIb3VyID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0uX2lzVmFsaWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRfX2NyZWF0ZUludmFsaWQgKGZsYWdzKSB7XG4gICAgICAgIHZhciBtID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKE5hTik7XG4gICAgICAgIGlmIChmbGFncyAhPSBudWxsKSB7XG4gICAgICAgICAgICBleHRlbmQoZ2V0UGFyc2luZ0ZsYWdzKG0pLCBmbGFncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkudXNlckludmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVW5kZWZpbmVkKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PT0gdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFBsdWdpbnMgdGhhdCBhZGQgcHJvcGVydGllcyBzaG91bGQgYWxzbyBhZGQgdGhlIGtleSBoZXJlIChudWxsIHZhbHVlKSxcbiAgICAvLyBzbyB3ZSBjYW4gcHJvcGVybHkgY2xvbmUgb3Vyc2VsdmVzLlxuICAgIHZhciBtb21lbnRQcm9wZXJ0aWVzID0gdXRpbHNfaG9va3NfX2hvb2tzLm1vbWVudFByb3BlcnRpZXMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNvcHlDb25maWcodG8sIGZyb20pIHtcbiAgICAgICAgdmFyIGksIHByb3AsIHZhbDtcblxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2lzQU1vbWVudE9iamVjdCkpIHtcbiAgICAgICAgICAgIHRvLl9pc0FNb21lbnRPYmplY3QgPSBmcm9tLl9pc0FNb21lbnRPYmplY3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pKSkge1xuICAgICAgICAgICAgdG8uX2kgPSBmcm9tLl9pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fZikpIHtcbiAgICAgICAgICAgIHRvLl9mID0gZnJvbS5fZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2wpKSB7XG4gICAgICAgICAgICB0by5fbCA9IGZyb20uX2w7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9zdHJpY3QpKSB7XG4gICAgICAgICAgICB0by5fc3RyaWN0ID0gZnJvbS5fc3RyaWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fdHptKSkge1xuICAgICAgICAgICAgdG8uX3R6bSA9IGZyb20uX3R6bTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2lzVVRDKSkge1xuICAgICAgICAgICAgdG8uX2lzVVRDID0gZnJvbS5faXNVVEM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9vZmZzZXQpKSB7XG4gICAgICAgICAgICB0by5fb2Zmc2V0ID0gZnJvbS5fb2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fcGYpKSB7XG4gICAgICAgICAgICB0by5fcGYgPSBnZXRQYXJzaW5nRmxhZ3MoZnJvbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9sb2NhbGUpKSB7XG4gICAgICAgICAgICB0by5fbG9jYWxlID0gZnJvbS5fbG9jYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vbWVudFByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChpIGluIG1vbWVudFByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBwcm9wID0gbW9tZW50UHJvcGVydGllc1tpXTtcbiAgICAgICAgICAgICAgICB2YWwgPSBmcm9tW3Byb3BdO1xuICAgICAgICAgICAgICAgIGlmICghaXNVbmRlZmluZWQodmFsKSkge1xuICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IHZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG87XG4gICAgfVxuXG4gICAgdmFyIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcblxuICAgIC8vIE1vbWVudCBwcm90b3R5cGUgb2JqZWN0XG4gICAgZnVuY3Rpb24gTW9tZW50KGNvbmZpZykge1xuICAgICAgICBjb3B5Q29uZmlnKHRoaXMsIGNvbmZpZyk7XG4gICAgICAgIHRoaXMuX2QgPSBuZXcgRGF0ZShjb25maWcuX2QgIT0gbnVsbCA/IGNvbmZpZy5fZC5nZXRUaW1lKCkgOiBOYU4pO1xuICAgICAgICAvLyBQcmV2ZW50IGluZmluaXRlIGxvb3AgaW4gY2FzZSB1cGRhdGVPZmZzZXQgY3JlYXRlcyBuZXcgbW9tZW50XG4gICAgICAgIC8vIG9iamVjdHMuXG4gICAgICAgIGlmICh1cGRhdGVJblByb2dyZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMpO1xuICAgICAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNNb21lbnQgKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgTW9tZW50IHx8IChvYmogIT0gbnVsbCAmJiBvYmouX2lzQU1vbWVudE9iamVjdCAhPSBudWxsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhYnNGbG9vciAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG51bWJlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9JbnQoYXJndW1lbnRGb3JDb2VyY2lvbikge1xuICAgICAgICB2YXIgY29lcmNlZE51bWJlciA9ICthcmd1bWVudEZvckNvZXJjaW9uLFxuICAgICAgICAgICAgdmFsdWUgPSAwO1xuXG4gICAgICAgIGlmIChjb2VyY2VkTnVtYmVyICE9PSAwICYmIGlzRmluaXRlKGNvZXJjZWROdW1iZXIpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGFic0Zsb29yKGNvZXJjZWROdW1iZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGNvbXBhcmUgdHdvIGFycmF5cywgcmV0dXJuIHRoZSBudW1iZXIgb2YgZGlmZmVyZW5jZXNcbiAgICBmdW5jdGlvbiBjb21wYXJlQXJyYXlzKGFycmF5MSwgYXJyYXkyLCBkb250Q29udmVydCkge1xuICAgICAgICB2YXIgbGVuID0gTWF0aC5taW4oYXJyYXkxLmxlbmd0aCwgYXJyYXkyLmxlbmd0aCksXG4gICAgICAgICAgICBsZW5ndGhEaWZmID0gTWF0aC5hYnMoYXJyYXkxLmxlbmd0aCAtIGFycmF5Mi5sZW5ndGgpLFxuICAgICAgICAgICAgZGlmZnMgPSAwLFxuICAgICAgICAgICAgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKGRvbnRDb252ZXJ0ICYmIGFycmF5MVtpXSAhPT0gYXJyYXkyW2ldKSB8fFxuICAgICAgICAgICAgICAgICghZG9udENvbnZlcnQgJiYgdG9JbnQoYXJyYXkxW2ldKSAhPT0gdG9JbnQoYXJyYXkyW2ldKSkpIHtcbiAgICAgICAgICAgICAgICBkaWZmcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaWZmcyArIGxlbmd0aERpZmY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gTG9jYWxlKCkge1xuICAgIH1cblxuICAgIC8vIGludGVybmFsIHN0b3JhZ2UgZm9yIGxvY2FsZSBjb25maWcgZmlsZXNcbiAgICB2YXIgbG9jYWxlcyA9IHt9O1xuICAgIHZhciBnbG9iYWxMb2NhbGU7XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVMb2NhbGUoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPyBrZXkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdfJywgJy0nKSA6IGtleTtcbiAgICB9XG5cbiAgICAvLyBwaWNrIHRoZSBsb2NhbGUgZnJvbSB0aGUgYXJyYXlcbiAgICAvLyB0cnkgWydlbi1hdScsICdlbi1nYiddIGFzICdlbi1hdScsICdlbi1nYicsICdlbicsIGFzIGluIG1vdmUgdGhyb3VnaCB0aGUgbGlzdCB0cnlpbmcgZWFjaFxuICAgIC8vIHN1YnN0cmluZyBmcm9tIG1vc3Qgc3BlY2lmaWMgdG8gbGVhc3QsIGJ1dCBtb3ZlIHRvIHRoZSBuZXh0IGFycmF5IGl0ZW0gaWYgaXQncyBhIG1vcmUgc3BlY2lmaWMgdmFyaWFudCB0aGFuIHRoZSBjdXJyZW50IHJvb3RcbiAgICBmdW5jdGlvbiBjaG9vc2VMb2NhbGUobmFtZXMpIHtcbiAgICAgICAgdmFyIGkgPSAwLCBqLCBuZXh0LCBsb2NhbGUsIHNwbGl0O1xuXG4gICAgICAgIHdoaWxlIChpIDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzcGxpdCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpXSkuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgIGogPSBzcGxpdC5sZW5ndGg7XG4gICAgICAgICAgICBuZXh0ID0gbm9ybWFsaXplTG9jYWxlKG5hbWVzW2kgKyAxXSk7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dCA/IG5leHQuc3BsaXQoJy0nKSA6IG51bGw7XG4gICAgICAgICAgICB3aGlsZSAoaiA+IDApIHtcbiAgICAgICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKHNwbGl0LnNsaWNlKDAsIGopLmpvaW4oJy0nKSk7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmV4dCAmJiBuZXh0Lmxlbmd0aCA+PSBqICYmIGNvbXBhcmVBcnJheXMoc3BsaXQsIG5leHQsIHRydWUpID49IGogLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIG5leHQgYXJyYXkgaXRlbSBpcyBiZXR0ZXIgdGhhbiBhIHNoYWxsb3dlciBzdWJzdHJpbmcgb2YgdGhpcyBvbmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGotLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkTG9jYWxlKG5hbWUpIHtcbiAgICAgICAgdmFyIG9sZExvY2FsZSA9IG51bGw7XG4gICAgICAgIC8vIFRPRE86IEZpbmQgYSBiZXR0ZXIgd2F5IHRvIHJlZ2lzdGVyIGFuZCBsb2FkIGFsbCB0aGUgbG9jYWxlcyBpbiBOb2RlXG4gICAgICAgIGlmICghbG9jYWxlc1tuYW1lXSAmJiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpICYmXG4gICAgICAgICAgICAgICAgbW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG9sZExvY2FsZSA9IGdsb2JhbExvY2FsZS5fYWJicjtcbiAgICAgICAgICAgICAgICByZXF1aXJlKCcuL2xvY2FsZS8nICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gYmVjYXVzZSBkZWZpbmVMb2NhbGUgY3VycmVudGx5IGFsc28gc2V0cyB0aGUgZ2xvYmFsIGxvY2FsZSwgd2VcbiAgICAgICAgICAgICAgICAvLyB3YW50IHRvIHVuZG8gdGhhdCBmb3IgbGF6eSBsb2FkZWQgbG9jYWxlc1xuICAgICAgICAgICAgICAgIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUob2xkTG9jYWxlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xuICAgIH1cblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCBsb2FkIGxvY2FsZSBhbmQgdGhlbiBzZXQgdGhlIGdsb2JhbCBsb2NhbGUuICBJZlxuICAgIC8vIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkIGluLCBpdCB3aWxsIHNpbXBseSByZXR1cm4gdGhlIGN1cnJlbnQgZ2xvYmFsXG4gICAgLy8gbG9jYWxlIGtleS5cbiAgICBmdW5jdGlvbiBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlIChrZXksIHZhbHVlcykge1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlcykpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRlZmluZUxvY2FsZShrZXksIHZhbHVlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gbW9tZW50LmR1cmF0aW9uLl9sb2NhbGUgPSBtb21lbnQuX2xvY2FsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgZ2xvYmFsTG9jYWxlID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnbG9iYWxMb2NhbGUuX2FiYnI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVmaW5lTG9jYWxlIChuYW1lLCB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFsdWVzLmFiYnIgPSBuYW1lO1xuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IGxvY2FsZXNbbmFtZV0gfHwgbmV3IExvY2FsZSgpO1xuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXS5zZXQodmFsdWVzKTtcblxuICAgICAgICAgICAgLy8gYmFja3dhcmRzIGNvbXBhdCBmb3Igbm93OiBhbHNvIHNldCB0aGUgbG9jYWxlXG4gICAgICAgICAgICBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVzZWZ1bCBmb3IgdGVzdGluZ1xuICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgbG9jYWxlIGRhdGFcbiAgICBmdW5jdGlvbiBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlIChrZXkpIHtcbiAgICAgICAgdmFyIGxvY2FsZTtcblxuICAgICAgICBpZiAoa2V5ICYmIGtleS5fbG9jYWxlICYmIGtleS5fbG9jYWxlLl9hYmJyKSB7XG4gICAgICAgICAgICBrZXkgPSBrZXkuX2xvY2FsZS5fYWJicjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsTG9jYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc0FycmF5KGtleSkpIHtcbiAgICAgICAgICAgIC8vc2hvcnQtY2lyY3VpdCBldmVyeXRoaW5nIGVsc2VcbiAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5ID0gW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hvb3NlTG9jYWxlKGtleSk7XG4gICAgfVxuXG4gICAgdmFyIGFsaWFzZXMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGFkZFVuaXRBbGlhcyAodW5pdCwgc2hvcnRoYW5kKSB7XG4gICAgICAgIHZhciBsb3dlckNhc2UgPSB1bml0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGFsaWFzZXNbbG93ZXJDYXNlXSA9IGFsaWFzZXNbbG93ZXJDYXNlICsgJ3MnXSA9IGFsaWFzZXNbc2hvcnRoYW5kXSA9IHVuaXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplVW5pdHModW5pdHMpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB1bml0cyA9PT0gJ3N0cmluZycgPyBhbGlhc2VzW3VuaXRzXSB8fCBhbGlhc2VzW3VuaXRzLnRvTG93ZXJDYXNlKCldIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZU9iamVjdFVuaXRzKGlucHV0T2JqZWN0KSB7XG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSB7fSxcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wLFxuICAgICAgICAgICAgcHJvcDtcblxuICAgICAgICBmb3IgKHByb3AgaW4gaW5wdXRPYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGlucHV0T2JqZWN0LCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wID0gbm9ybWFsaXplVW5pdHMocHJvcCk7XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dFtub3JtYWxpemVkUHJvcF0gPSBpbnB1dE9iamVjdFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZElucHV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgRnVuY3Rpb24gfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlR2V0U2V0ICh1bml0LCBrZWVwVGltZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGdldF9zZXRfX3NldCh0aGlzLCB1bml0LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCBrZWVwVGltZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRfc2V0X19nZXQodGhpcywgdW5pdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0X3NldF9fZ2V0IChtb20sIHVuaXQpIHtcbiAgICAgICAgcmV0dXJuIG1vbS5pc1ZhbGlkKCkgP1xuICAgICAgICAgICAgbW9tLl9kWydnZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArIHVuaXRdKCkgOiBOYU47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0X3NldF9fc2V0IChtb20sIHVuaXQsIHZhbHVlKSB7XG4gICAgICAgIGlmIChtb20uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0odmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0ICh1bml0cywgdmFsdWUpIHtcbiAgICAgICAgdmFyIHVuaXQ7XG4gICAgICAgIGlmICh0eXBlb2YgdW5pdHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKHVuaXQgaW4gdW5pdHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldCh1bml0LCB1bml0c1t1bml0XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXNbdW5pdHNdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW3VuaXRzXSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gemVyb0ZpbGwobnVtYmVyLCB0YXJnZXRMZW5ndGgsIGZvcmNlU2lnbikge1xuICAgICAgICB2YXIgYWJzTnVtYmVyID0gJycgKyBNYXRoLmFicyhudW1iZXIpLFxuICAgICAgICAgICAgemVyb3NUb0ZpbGwgPSB0YXJnZXRMZW5ndGggLSBhYnNOdW1iZXIubGVuZ3RoLFxuICAgICAgICAgICAgc2lnbiA9IG51bWJlciA+PSAwO1xuICAgICAgICByZXR1cm4gKHNpZ24gPyAoZm9yY2VTaWduID8gJysnIDogJycpIDogJy0nKSArXG4gICAgICAgICAgICBNYXRoLnBvdygxMCwgTWF0aC5tYXgoMCwgemVyb3NUb0ZpbGwpKS50b1N0cmluZygpLnN1YnN0cigxKSArIGFic051bWJlcjtcbiAgICB9XG5cbiAgICB2YXIgZm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhbSGhdbW0oc3MpP3xNb3xNTT9NP00/fERvfERERG98REQ/RD9EP3xkZGQ/ZD98ZG8/fHdbb3x3XT98V1tvfFddP3xRbz98WVlZWVlZfFlZWVlZfFlZWVl8WVl8Z2coZ2dnPyk/fEdHKEdHRz8pP3xlfEV8YXxBfGhoP3xISD98bW0/fHNzP3xTezEsOX18eHxYfHp6P3xaWj98LikvZztcblxuICAgIHZhciBsb2NhbEZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oTFRTfExUfExMP0w/TD98bHsxLDR9KS9nO1xuXG4gICAgdmFyIGZvcm1hdEZ1bmN0aW9ucyA9IHt9O1xuXG4gICAgdmFyIGZvcm1hdFRva2VuRnVuY3Rpb25zID0ge307XG5cbiAgICAvLyB0b2tlbjogICAgJ00nXG4gICAgLy8gcGFkZGVkOiAgIFsnTU0nLCAyXVxuICAgIC8vIG9yZGluYWw6ICAnTW8nXG4gICAgLy8gY2FsbGJhY2s6IGZ1bmN0aW9uICgpIHsgdGhpcy5tb250aCgpICsgMSB9XG4gICAgZnVuY3Rpb24gYWRkRm9ybWF0VG9rZW4gKHRva2VuLCBwYWRkZWQsIG9yZGluYWwsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBmdW5jID0gY2FsbGJhY2s7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBmdW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW2NhbGxiYWNrXSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3Rva2VuXSA9IGZ1bmM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhZGRlZCkge1xuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbcGFkZGVkWzBdXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gemVyb0ZpbGwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCBwYWRkZWRbMV0sIHBhZGRlZFsyXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcmRpbmFsKSB7XG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1tvcmRpbmFsXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkub3JkaW5hbChmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHRva2VuKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5tYXRjaCgvXFxbW1xcc1xcU10vKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL15cXFt8XFxdJC9nLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1xcXFwvZywgJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VGb3JtYXRGdW5jdGlvbihmb3JtYXQpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gZm9ybWF0Lm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpLCBpLCBsZW5ndGg7XG5cbiAgICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXRUb2tlbkZ1bmN0aW9uc1thcnJheVtpXV0pIHtcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IGZvcm1hdFRva2VuRnVuY3Rpb25zW2FycmF5W2ldXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGFycmF5W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobW9tKSB7XG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gJyc7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYXJyYXlbaV0gaW5zdGFuY2VvZiBGdW5jdGlvbiA/IGFycmF5W2ldLmNhbGwobW9tLCBmb3JtYXQpIDogYXJyYXlbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIGZvcm1hdCBkYXRlIHVzaW5nIG5hdGl2ZSBkYXRlIG9iamVjdFxuICAgIGZ1bmN0aW9uIGZvcm1hdE1vbWVudChtLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKCFtLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG0ubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtYXQgPSBleHBhbmRGb3JtYXQoZm9ybWF0LCBtLmxvY2FsZURhdGEoKSk7XG4gICAgICAgIGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdID0gZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0gfHwgbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdKG0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGFuZEZvcm1hdChmb3JtYXQsIGxvY2FsZSkge1xuICAgICAgICB2YXIgaSA9IDU7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlLmxvbmdEYXRlRm9ybWF0KGlucHV0KSB8fCBpbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaSA+PSAwICYmIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy50ZXN0KGZvcm1hdCkpIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKGxvY2FsRm9ybWF0dGluZ1Rva2VucywgcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKTtcbiAgICAgICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgaSAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICB9XG5cbiAgICB2YXIgbWF0Y2gxICAgICAgICAgPSAvXFxkLzsgICAgICAgICAgICAvLyAgICAgICAwIC0gOVxuICAgIHZhciBtYXRjaDIgICAgICAgICA9IC9cXGRcXGQvOyAgICAgICAgICAvLyAgICAgIDAwIC0gOTlcbiAgICB2YXIgbWF0Y2gzICAgICAgICAgPSAvXFxkezN9LzsgICAgICAgICAvLyAgICAgMDAwIC0gOTk5XG4gICAgdmFyIG1hdGNoNCAgICAgICAgID0gL1xcZHs0fS87ICAgICAgICAgLy8gICAgMDAwMCAtIDk5OTlcbiAgICB2YXIgbWF0Y2g2ICAgICAgICAgPSAvWystXT9cXGR7Nn0vOyAgICAvLyAtOTk5OTk5IC0gOTk5OTk5XG4gICAgdmFyIG1hdGNoMXRvMiAgICAgID0gL1xcZFxcZD8vOyAgICAgICAgIC8vICAgICAgIDAgLSA5OVxuICAgIHZhciBtYXRjaDN0bzQgICAgICA9IC9cXGRcXGRcXGRcXGQ/LzsgICAgIC8vICAgICA5OTkgLSA5OTk5XG4gICAgdmFyIG1hdGNoNXRvNiAgICAgID0gL1xcZFxcZFxcZFxcZFxcZFxcZD8vOyAvLyAgIDk5OTk5IC0gOTk5OTk5XG4gICAgdmFyIG1hdGNoMXRvMyAgICAgID0gL1xcZHsxLDN9LzsgICAgICAgLy8gICAgICAgMCAtIDk5OVxuICAgIHZhciBtYXRjaDF0bzQgICAgICA9IC9cXGR7MSw0fS87ICAgICAgIC8vICAgICAgIDAgLSA5OTk5XG4gICAgdmFyIG1hdGNoMXRvNiAgICAgID0gL1srLV0/XFxkezEsNn0vOyAgLy8gLTk5OTk5OSAtIDk5OTk5OVxuXG4gICAgdmFyIG1hdGNoVW5zaWduZWQgID0gL1xcZCsvOyAgICAgICAgICAgLy8gICAgICAgMCAtIGluZlxuICAgIHZhciBtYXRjaFNpZ25lZCAgICA9IC9bKy1dP1xcZCsvOyAgICAgIC8vICAgIC1pbmYgLSBpbmZcblxuICAgIHZhciBtYXRjaE9mZnNldCAgICA9IC9afFsrLV1cXGRcXGQ6P1xcZFxcZC9naTsgLy8gKzAwOjAwIC0wMDowMCArMDAwMCAtMDAwMCBvciBaXG4gICAgdmFyIG1hdGNoU2hvcnRPZmZzZXQgPSAvWnxbKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy9naTsgLy8gKzAwIC0wMCArMDA6MDAgLTAwOjAwICswMDAwIC0wMDAwIG9yIFpcblxuICAgIHZhciBtYXRjaFRpbWVzdGFtcCA9IC9bKy1dP1xcZCsoXFwuXFxkezEsM30pPy87IC8vIDEyMzQ1Njc4OSAxMjM0NTY3ODkuMTIzXG5cbiAgICAvLyBhbnkgd29yZCAob3IgdHdvKSBjaGFyYWN0ZXJzIG9yIG51bWJlcnMgaW5jbHVkaW5nIHR3by90aHJlZSB3b3JkIG1vbnRoIGluIGFyYWJpYy5cbiAgICAvLyBpbmNsdWRlcyBzY290dGlzaCBnYWVsaWMgdHdvIHdvcmQgYW5kIGh5cGhlbmF0ZWQgbW9udGhzXG4gICAgdmFyIG1hdGNoV29yZCA9IC9bMC05XSpbJ2EtelxcdTAwQTAtXFx1MDVGRlxcdTA3MDAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0rfFtcXHUwNjAwLVxcdTA2RkZcXC9dKyhcXHMqP1tcXHUwNjAwLVxcdTA2RkZdKyl7MSwyfS9pO1xuXG5cbiAgICB2YXIgcmVnZXhlcyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gYWRkUmVnZXhUb2tlbiAodG9rZW4sIHJlZ2V4LCBzdHJpY3RSZWdleCkge1xuICAgICAgICByZWdleGVzW3Rva2VuXSA9IGlzRnVuY3Rpb24ocmVnZXgpID8gcmVnZXggOiBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZURhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiAoaXNTdHJpY3QgJiYgc3RyaWN0UmVnZXgpID8gc3RyaWN0UmVnZXggOiByZWdleDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4gKHRva2VuLCBjb25maWcpIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHJlZ2V4ZXMsIHRva2VuKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodW5lc2NhcGVGb3JtYXQodG9rZW4pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWdleGVzW3Rva2VuXShjb25maWcuX3N0cmljdCwgY29uZmlnLl9sb2NhbGUpO1xuICAgIH1cblxuICAgIC8vIENvZGUgZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM1NjE0OTMvaXMtdGhlcmUtYS1yZWdleHAtZXNjYXBlLWZ1bmN0aW9uLWluLWphdmFzY3JpcHRcbiAgICBmdW5jdGlvbiB1bmVzY2FwZUZvcm1hdChzKSB7XG4gICAgICAgIHJldHVybiByZWdleEVzY2FwZShzLnJlcGxhY2UoJ1xcXFwnLCAnJykucmVwbGFjZSgvXFxcXChcXFspfFxcXFwoXFxdKXxcXFsoW15cXF1cXFtdKilcXF18XFxcXCguKS9nLCBmdW5jdGlvbiAobWF0Y2hlZCwgcDEsIHAyLCBwMywgcDQpIHtcbiAgICAgICAgICAgIHJldHVybiBwMSB8fCBwMiB8fCBwMyB8fCBwNDtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2V4RXNjYXBlKHMpIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XG4gICAgfVxuXG4gICAgdmFyIHRva2VucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gYWRkUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpLCBmdW5jID0gY2FsbGJhY2s7XG4gICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0b2tlbiA9IFt0b2tlbl07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGZ1bmMgPSBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbY2FsbGJhY2tdID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRva2Vuc1t0b2tlbltpXV0gPSBmdW5jO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkV2Vla1BhcnNlVG9rZW4gKHRva2VuLCBjYWxsYmFjaykge1xuICAgICAgICBhZGRQYXJzZVRva2VuKHRva2VuLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgICAgICBjb25maWcuX3cgPSBjb25maWcuX3cgfHwge307XG4gICAgICAgICAgICBjYWxsYmFjayhpbnB1dCwgY29uZmlnLl93LCBjb25maWcsIHRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIGlucHV0LCBjb25maWcpIHtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwgJiYgaGFzT3duUHJvcCh0b2tlbnMsIHRva2VuKSkge1xuICAgICAgICAgICAgdG9rZW5zW3Rva2VuXShpbnB1dCwgY29uZmlnLl9hLCBjb25maWcsIHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBZRUFSID0gMDtcbiAgICB2YXIgTU9OVEggPSAxO1xuICAgIHZhciBEQVRFID0gMjtcbiAgICB2YXIgSE9VUiA9IDM7XG4gICAgdmFyIE1JTlVURSA9IDQ7XG4gICAgdmFyIFNFQ09ORCA9IDU7XG4gICAgdmFyIE1JTExJU0VDT05EID0gNjtcbiAgICB2YXIgV0VFSyA9IDc7XG4gICAgdmFyIFdFRUtEQVkgPSA4O1xuXG4gICAgZnVuY3Rpb24gZGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoICsgMSwgMCkpLmdldFVUQ0RhdGUoKTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignTScsIFsnTU0nLCAyXSwgJ01vJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb250aCgpICsgMTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU0nLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHNTaG9ydCh0aGlzLCBmb3JtYXQpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ01NTU0nLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHModGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnbW9udGgnLCAnTScpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignTScsICAgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignTU0nLCAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTU0nLCAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5tb250aHNTaG9ydFJlZ2V4KGlzU3RyaWN0KTtcbiAgICB9KTtcbiAgICBhZGRSZWdleFRva2VuKCdNTU1NJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5tb250aHNSZWdleChpc1N0cmljdCk7XG4gICAgfSk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnTScsICdNTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W01PTlRIXSA9IHRvSW50KGlucHV0KSAtIDE7XG4gICAgfSk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnTU1NJywgJ01NTU0nXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB2YXIgbW9udGggPSBjb25maWcuX2xvY2FsZS5tb250aHNQYXJzZShpbnB1dCwgdG9rZW4sIGNvbmZpZy5fc3RyaWN0KTtcbiAgICAgICAgLy8gaWYgd2UgZGlkbid0IGZpbmQgYSBtb250aCBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWQuXG4gICAgICAgIGlmIChtb250aCAhPSBudWxsKSB7XG4gICAgICAgICAgICBhcnJheVtNT05USF0gPSBtb250aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRNb250aCA9IGlucHV0O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBMT0NBTEVTXG5cbiAgICB2YXIgTU9OVEhTX0lOX0ZPUk1BVCA9IC9EW29EXT8oXFxbW15cXFtcXF1dKlxcXXxcXHMrKStNTU1NPy87XG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNb250aHMgPSAnSmFudWFyeV9GZWJydWFyeV9NYXJjaF9BcHJpbF9NYXlfSnVuZV9KdWx5X0F1Z3VzdF9TZXB0ZW1iZXJfT2N0b2Jlcl9Ob3ZlbWJlcl9EZWNlbWJlcicuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHMgKG0sIGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpID8gdGhpcy5fbW9udGhzW20ubW9udGgoKV0gOlxuICAgICAgICAgICAgdGhpcy5fbW9udGhzW01PTlRIU19JTl9GT1JNQVQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20ubW9udGgoKV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydCA9ICdKYW5fRmViX01hcl9BcHJfTWF5X0p1bl9KdWxfQXVnX1NlcF9PY3RfTm92X0RlYycuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNTaG9ydCAobSwgZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRoc1Nob3J0KSA/IHRoaXMuX21vbnRoc1Nob3J0W20ubW9udGgoKV0gOlxuICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRbTU9OVEhTX0lOX0ZPUk1BVC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ11bbS5tb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNQYXJzZSAobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgICAgICBpZiAoIXRoaXMuX21vbnRoc1BhcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoWzIwMDAsIGldKTtcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJywgJ2knKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnJykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN0cmljdCAmJiAhdGhpcy5fbW9udGhzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgICAgICByZWdleCA9ICdeJyArIHRoaXMubW9udGhzKG1vbSwgJycpICsgJ3xeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0ZXN0IHRoZSByZWdleFxuICAgICAgICAgICAgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdNTU1NJyAmJiB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdNTU0nICYmIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgdGhpcy5fbW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBzZXRNb250aCAobW9tLCB2YWx1ZSkge1xuICAgICAgICB2YXIgZGF5T2ZNb250aDtcblxuICAgICAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIC8vIE5vIG9wXG4gICAgICAgICAgICByZXR1cm4gbW9tO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzogTW92ZSB0aGlzIG91dCBvZiBoZXJlIVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFsdWUgPSBtb20ubG9jYWxlRGF0YSgpLm1vbnRoc1BhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgIC8vIFRPRE86IEFub3RoZXIgc2lsZW50IGZhaWx1cmU/XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb207XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkYXlPZk1vbnRoID0gTWF0aC5taW4obW9tLmRhdGUoKSwgZGF5c0luTW9udGgobW9tLnllYXIoKSwgdmFsdWUpKTtcbiAgICAgICAgbW9tLl9kWydzZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArICdNb250aCddKHZhbHVlLCBkYXlPZk1vbnRoKTtcbiAgICAgICAgcmV0dXJuIG1vbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRNb250aCAodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHNldE1vbnRoKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQodGhpcywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRfc2V0X19nZXQodGhpcywgJ01vbnRoJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXlzSW5Nb250aCAoKSB7XG4gICAgICAgIHJldHVybiBkYXlzSW5Nb250aCh0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpKTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdE1vbnRoc1Nob3J0UmVnZXggPSBtYXRjaFdvcmQ7XG4gICAgZnVuY3Rpb24gbW9udGhzU2hvcnRSZWdleCAoaXNTdHJpY3QpIHtcbiAgICAgICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlTW9udGhzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4IDogdGhpcy5fbW9udGhzU2hvcnRSZWdleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TW9udGhzUmVnZXggPSBtYXRjaFdvcmQ7XG4gICAgZnVuY3Rpb24gbW9udGhzUmVnZXggKGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZU1vbnRoc1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggOiB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVNb250aHNQYXJzZSAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNtcExlblJldihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaG9ydFBpZWNlcyA9IFtdLCBsb25nUGllY2VzID0gW10sIG1peGVkUGllY2VzID0gW10sXG4gICAgICAgICAgICBpLCBtb207XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhbMjAwMCwgaV0pO1xuICAgICAgICAgICAgc2hvcnRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpKTtcbiAgICAgICAgICAgIGxvbmdQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhtb20sICcnKSk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHRoaXMubW9udGhzKG1vbSwgJycpKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2godGhpcy5tb250aHNTaG9ydChtb20sICcnKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU29ydGluZyBtYWtlcyBzdXJlIGlmIG9uZSBtb250aCAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxuICAgICAgICAvLyB3aWxsIG1hdGNoIHRoZSBsb25nZXIgcGllY2UuXG4gICAgICAgIHNob3J0UGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgbG9uZ1BpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIG1peGVkUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIHNob3J0UGllY2VzW2ldID0gcmVnZXhFc2NhcGUoc2hvcnRQaWVjZXNbaV0pO1xuICAgICAgICAgICAgbG9uZ1BpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKGxvbmdQaWVjZXNbaV0pO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShtaXhlZFBpZWNlc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tb250aHNSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1peGVkUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRSZWdleCA9IHRoaXMuX21vbnRoc1JlZ2V4O1xuICAgICAgICB0aGlzLl9tb250aHNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIGxvbmdQaWVjZXMuam9pbignfCcpICsgJykkJywgJ2knKTtcbiAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIHNob3J0UGllY2VzLmpvaW4oJ3wnKSArICcpJCcsICdpJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tPdmVyZmxvdyAobSkge1xuICAgICAgICB2YXIgb3ZlcmZsb3c7XG4gICAgICAgIHZhciBhID0gbS5fYTtcblxuICAgICAgICBpZiAoYSAmJiBnZXRQYXJzaW5nRmxhZ3MobSkub3ZlcmZsb3cgPT09IC0yKSB7XG4gICAgICAgICAgICBvdmVyZmxvdyA9XG4gICAgICAgICAgICAgICAgYVtNT05USF0gICAgICAgPCAwIHx8IGFbTU9OVEhdICAgICAgID4gMTEgID8gTU9OVEggOlxuICAgICAgICAgICAgICAgIGFbREFURV0gICAgICAgIDwgMSB8fCBhW0RBVEVdICAgICAgICA+IGRheXNJbk1vbnRoKGFbWUVBUl0sIGFbTU9OVEhdKSA/IERBVEUgOlxuICAgICAgICAgICAgICAgIGFbSE9VUl0gICAgICAgIDwgMCB8fCBhW0hPVVJdICAgICAgICA+IDI0IHx8IChhW0hPVVJdID09PSAyNCAmJiAoYVtNSU5VVEVdICE9PSAwIHx8IGFbU0VDT05EXSAhPT0gMCB8fCBhW01JTExJU0VDT05EXSAhPT0gMCkpID8gSE9VUiA6XG4gICAgICAgICAgICAgICAgYVtNSU5VVEVdICAgICAgPCAwIHx8IGFbTUlOVVRFXSAgICAgID4gNTkgID8gTUlOVVRFIDpcbiAgICAgICAgICAgICAgICBhW1NFQ09ORF0gICAgICA8IDAgfHwgYVtTRUNPTkRdICAgICAgPiA1OSAgPyBTRUNPTkQgOlxuICAgICAgICAgICAgICAgIGFbTUlMTElTRUNPTkRdIDwgMCB8fCBhW01JTExJU0VDT05EXSA+IDk5OSA/IE1JTExJU0VDT05EIDpcbiAgICAgICAgICAgICAgICAtMTtcblxuICAgICAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dEYXlPZlllYXIgJiYgKG92ZXJmbG93IDwgWUVBUiB8fCBvdmVyZmxvdyA+IERBVEUpKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cgPSBEQVRFO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dXZWVrcyAmJiBvdmVyZmxvdyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IFdFRUs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd1dlZWtkYXkgJiYgb3ZlcmZsb3cgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cgPSBXRUVLREFZO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkub3ZlcmZsb3cgPSBvdmVyZmxvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhcm4obXNnKSB7XG4gICAgICAgIGlmICh1dGlsc19ob29rc19faG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgICAgICh0eXBlb2YgY29uc29sZSAhPT0gICd1bmRlZmluZWQnKSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGVwcmVjYXRpb24gd2FybmluZzogJyArIG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXByZWNhdGUobXNnLCBmbikge1xuICAgICAgICB2YXIgZmlyc3RUaW1lID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gZXh0ZW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChmaXJzdFRpbWUpIHtcbiAgICAgICAgICAgICAgICB3YXJuKG1zZyArICdcXG5Bcmd1bWVudHM6ICcgKyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLmpvaW4oJywgJykgKyAnXFxuJyArIChuZXcgRXJyb3IoKSkuc3RhY2spO1xuICAgICAgICAgICAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGZuKTtcbiAgICB9XG5cbiAgICB2YXIgZGVwcmVjYXRpb25zID0ge307XG5cbiAgICBmdW5jdGlvbiBkZXByZWNhdGVTaW1wbGUobmFtZSwgbXNnKSB7XG4gICAgICAgIGlmICghZGVwcmVjYXRpb25zW25hbWVdKSB7XG4gICAgICAgICAgICB3YXJuKG1zZyk7XG4gICAgICAgICAgICBkZXByZWNhdGlvbnNbbmFtZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnN1cHByZXNzRGVwcmVjYXRpb25XYXJuaW5ncyA9IGZhbHNlO1xuXG4gICAgLy8gaXNvIDg2MDEgcmVnZXhcbiAgICAvLyAwMDAwLTAwLTAwIDAwMDAtVzAwIG9yIDAwMDAtVzAwLTAgKyBUICsgMDAgb3IgMDA6MDAgb3IgMDA6MDA6MDAgb3IgMDA6MDA6MDAuMDAwICsgKzAwOjAwIG9yICswMDAwIG9yICswMClcbiAgICB2YXIgZXh0ZW5kZWRJc29SZWdleCA9IC9eXFxzKigoPzpbKy1dXFxkezZ9fFxcZHs0fSktKD86XFxkXFxkLVxcZFxcZHxXXFxkXFxkLVxcZHxXXFxkXFxkfFxcZFxcZFxcZHxcXGRcXGQpKSg/OihUfCApKFxcZFxcZCg/OjpcXGRcXGQoPzo6XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8vO1xuICAgIHZhciBiYXNpY0lzb1JlZ2V4ID0gL15cXHMqKCg/OlsrLV1cXGR7Nn18XFxkezR9KSg/OlxcZFxcZFxcZFxcZHxXXFxkXFxkXFxkfFdcXGRcXGR8XFxkXFxkXFxkfFxcZFxcZCkpKD86KFR8ICkoXFxkXFxkKD86XFxkXFxkKD86XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8vO1xuXG4gICAgdmFyIHR6UmVnZXggPSAvWnxbKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy87XG5cbiAgICB2YXIgaXNvRGF0ZXMgPSBbXG4gICAgICAgIFsnWVlZWVlZLU1NLUREJywgL1srLV1cXGR7Nn0tXFxkXFxkLVxcZFxcZC9dLFxuICAgICAgICBbJ1lZWVktTU0tREQnLCAvXFxkezR9LVxcZFxcZC1cXGRcXGQvXSxcbiAgICAgICAgWydHR0dHLVtXXVdXLUUnLCAvXFxkezR9LVdcXGRcXGQtXFxkL10sXG4gICAgICAgIFsnR0dHRy1bV11XVycsIC9cXGR7NH0tV1xcZFxcZC8sIGZhbHNlXSxcbiAgICAgICAgWydZWVlZLURERCcsIC9cXGR7NH0tXFxkezN9L10sXG4gICAgICAgIFsnWVlZWS1NTScsIC9cXGR7NH0tXFxkXFxkLywgZmFsc2VdLFxuICAgICAgICBbJ1lZWVlZWU1NREQnLCAvWystXVxcZHsxMH0vXSxcbiAgICAgICAgWydZWVlZTU1ERCcsIC9cXGR7OH0vXSxcbiAgICAgICAgLy8gWVlZWU1NIGlzIE5PVCBhbGxvd2VkIGJ5IHRoZSBzdGFuZGFyZFxuICAgICAgICBbJ0dHR0dbV11XV0UnLCAvXFxkezR9V1xcZHszfS9dLFxuICAgICAgICBbJ0dHR0dbV11XVycsIC9cXGR7NH1XXFxkezJ9LywgZmFsc2VdLFxuICAgICAgICBbJ1lZWVlEREQnLCAvXFxkezd9L11cbiAgICBdO1xuXG4gICAgLy8gaXNvIHRpbWUgZm9ybWF0cyBhbmQgcmVnZXhlc1xuICAgIHZhciBpc29UaW1lcyA9IFtcbiAgICAgICAgWydISDptbTpzcy5TU1NTJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkXFwuXFxkKy9dLFxuICAgICAgICBbJ0hIOm1tOnNzLFNTU1MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGQsXFxkKy9dLFxuICAgICAgICBbJ0hIOm1tOnNzJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkL10sXG4gICAgICAgIFsnSEg6bW0nLCAvXFxkXFxkOlxcZFxcZC9dLFxuICAgICAgICBbJ0hIbW1zcy5TU1NTJywgL1xcZFxcZFxcZFxcZFxcZFxcZFxcLlxcZCsvXSxcbiAgICAgICAgWydISG1tc3MsU1NTUycsIC9cXGRcXGRcXGRcXGRcXGRcXGQsXFxkKy9dLFxuICAgICAgICBbJ0hIbW1zcycsIC9cXGRcXGRcXGRcXGRcXGRcXGQvXSxcbiAgICAgICAgWydISG1tJywgL1xcZFxcZFxcZFxcZC9dLFxuICAgICAgICBbJ0hIJywgL1xcZFxcZC9dXG4gICAgXTtcblxuICAgIHZhciBhc3BOZXRKc29uUmVnZXggPSAvXlxcLz9EYXRlXFwoKFxcLT9cXGQrKS9pO1xuXG4gICAgLy8gZGF0ZSBmcm9tIGlzbyBmb3JtYXRcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tSVNPKGNvbmZpZykge1xuICAgICAgICB2YXIgaSwgbCxcbiAgICAgICAgICAgIHN0cmluZyA9IGNvbmZpZy5faSxcbiAgICAgICAgICAgIG1hdGNoID0gZXh0ZW5kZWRJc29SZWdleC5leGVjKHN0cmluZykgfHwgYmFzaWNJc29SZWdleC5leGVjKHN0cmluZyksXG4gICAgICAgICAgICBhbGxvd1RpbWUsIGRhdGVGb3JtYXQsIHRpbWVGb3JtYXQsIHR6Rm9ybWF0O1xuXG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaXNvID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yIChpID0gMCwgbCA9IGlzb0RhdGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpc29EYXRlc1tpXVsxXS5leGVjKG1hdGNoWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0ID0gaXNvRGF0ZXNbaV1bMF07XG4gICAgICAgICAgICAgICAgICAgIGFsbG93VGltZSA9IGlzb0RhdGVzW2ldWzJdICE9PSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGVGb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaFszXSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29UaW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzb1RpbWVzW2ldWzFdLmV4ZWMobWF0Y2hbM10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaFsyXSBzaG91bGQgYmUgJ1QnIG9yIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lRm9ybWF0ID0gKG1hdGNoWzJdIHx8ICcgJykgKyBpc29UaW1lc1tpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aW1lRm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFsbG93VGltZSAmJiB0aW1lRm9ybWF0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hbNF0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHpSZWdleC5leGVjKG1hdGNoWzRdKSkge1xuICAgICAgICAgICAgICAgICAgICB0ekZvcm1hdCA9ICdaJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpZy5fZiA9IGRhdGVGb3JtYXQgKyAodGltZUZvcm1hdCB8fCAnJykgKyAodHpGb3JtYXQgfHwgJycpO1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdCBvciBmYWxsYmFja1xuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gYXNwTmV0SnNvblJlZ2V4LmV4ZWMoY29uZmlnLl9pKTtcblxuICAgICAgICBpZiAobWF0Y2hlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoK21hdGNoZWRbMV0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xuICAgICAgICBpZiAoY29uZmlnLl9pc1ZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5faXNWYWxpZDtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayhjb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50IGNvbnN0cnVjdGlvbiBmYWxscyBiYWNrIHRvIGpzIERhdGUuIFRoaXMgaXMgJyArXG4gICAgICAgICdkaXNjb3VyYWdlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHVwY29taW5nIG1ham9yICcgK1xuICAgICAgICAncmVsZWFzZS4gUGxlYXNlIHJlZmVyIHRvICcgK1xuICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MDcgZm9yIG1vcmUgaW5mby4nLFxuICAgICAgICBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShjb25maWcuX2kgKyAoY29uZmlnLl91c2VVVEMgPyAnIFVUQycgOiAnJykpO1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZURhdGUgKHksIG0sIGQsIGgsIE0sIHMsIG1zKSB7XG4gICAgICAgIC8vY2FuJ3QganVzdCBhcHBseSgpIHRvIGNyZWF0ZSBhIGRhdGU6XG4gICAgICAgIC8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xODEzNDgvaW5zdGFudGlhdGluZy1hLWphdmFzY3JpcHQtb2JqZWN0LWJ5LWNhbGxpbmctcHJvdG90eXBlLWNvbnN0cnVjdG9yLWFwcGx5XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoeSwgbSwgZCwgaCwgTSwgcywgbXMpO1xuXG4gICAgICAgIC8vdGhlIGRhdGUgY29uc3RydWN0b3IgcmVtYXBzIHllYXJzIDAtOTkgdG8gMTkwMC0xOTk5XG4gICAgICAgIGlmICh5IDwgMTAwICYmIHkgPj0gMCAmJiBpc0Zpbml0ZShkYXRlLmdldEZ1bGxZZWFyKCkpKSB7XG4gICAgICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVUQ0RhdGUgKHkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQy5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcblxuICAgICAgICAvL3RoZSBEYXRlLlVUQyBmdW5jdGlvbiByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwICYmIGlzRmluaXRlKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSkpIHtcbiAgICAgICAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1knLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB5ID0gdGhpcy55ZWFyKCk7XG4gICAgICAgIHJldHVybiB5IDw9IDk5OTkgPyAnJyArIHkgOiAnKycgKyB5O1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWScsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnllYXIoKSAlIDEwMDtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWScsICAgNF0sICAgICAgIDAsICd5ZWFyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZWScsICA1XSwgICAgICAgMCwgJ3llYXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVlZWScsIDYsIHRydWVdLCAwLCAneWVhcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCd5ZWFyJywgJ3knKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1knLCAgICAgIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdZWScsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignWVlZWScsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVlZJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZWVknLCBtYXRjaDF0bzYsIG1hdGNoNik7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnWVlZWVknLCAnWVlZWVlZJ10sIFlFQVIpO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1lZWVknLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W1lFQVJdID0gaW5wdXQubGVuZ3RoID09PSAyID8gdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KSA6IHRvSW50KGlucHV0KTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbWUVBUl0gPSB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1knLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W1lFQVJdID0gcGFyc2VJbnQoaW5wdXQsIDEwKTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIGZ1bmN0aW9uIGRheXNJblllYXIoeWVhcikge1xuICAgICAgICByZXR1cm4gaXNMZWFwWWVhcih5ZWFyKSA/IDM2NiA6IDM2NTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0xlYXBZZWFyKHllYXIpIHtcbiAgICAgICAgcmV0dXJuICh5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwKSB8fCB5ZWFyICUgNDAwID09PSAwO1xuICAgIH1cblxuICAgIC8vIEhPT0tTXG5cbiAgICB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRvSW50KGlucHV0KSArICh0b0ludChpbnB1dCkgPiA2OCA/IDE5MDAgOiAyMDAwKTtcbiAgICB9O1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldFllYXIgPSBtYWtlR2V0U2V0KCdGdWxsWWVhcicsIGZhbHNlKTtcblxuICAgIGZ1bmN0aW9uIGdldElzTGVhcFllYXIgKCkge1xuICAgICAgICByZXR1cm4gaXNMZWFwWWVhcih0aGlzLnllYXIoKSk7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQtb2YtZmlyc3Qtd2VlayAtIHN0YXJ0LW9mLXllYXJcbiAgICBmdW5jdGlvbiBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIC8vIGZpcnN0LXdlZWsgZGF5IC0tIHdoaWNoIGphbnVhcnkgaXMgYWx3YXlzIGluIHRoZSBmaXJzdCB3ZWVrICg0IGZvciBpc28sIDEgZm9yIG90aGVyKVxuICAgICAgICAgICAgZndkID0gNyArIGRvdyAtIGRveSxcbiAgICAgICAgICAgIC8vIGZpcnN0LXdlZWsgZGF5IGxvY2FsIHdlZWtkYXkgLS0gd2hpY2ggbG9jYWwgd2Vla2RheSBpcyBmd2RcbiAgICAgICAgICAgIGZ3ZGx3ID0gKDcgKyBjcmVhdGVVVENEYXRlKHllYXIsIDAsIGZ3ZCkuZ2V0VVRDRGF5KCkgLSBkb3cpICUgNztcblxuICAgICAgICByZXR1cm4gLWZ3ZGx3ICsgZndkIC0gMTtcbiAgICB9XG5cbiAgICAvL2h0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZSNDYWxjdWxhdGluZ19hX2RhdGVfZ2l2ZW5fdGhlX3llYXIuMkNfd2Vla19udW1iZXJfYW5kX3dlZWtkYXlcbiAgICBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla3MoeWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIGxvY2FsV2Vla2RheSA9ICg3ICsgd2Vla2RheSAtIGRvdykgJSA3LFxuICAgICAgICAgICAgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSksXG4gICAgICAgICAgICBkYXlPZlllYXIgPSAxICsgNyAqICh3ZWVrIC0gMSkgKyBsb2NhbFdlZWtkYXkgKyB3ZWVrT2Zmc2V0LFxuICAgICAgICAgICAgcmVzWWVhciwgcmVzRGF5T2ZZZWFyO1xuXG4gICAgICAgIGlmIChkYXlPZlllYXIgPD0gMCkge1xuICAgICAgICAgICAgcmVzWWVhciA9IHllYXIgLSAxO1xuICAgICAgICAgICAgcmVzRGF5T2ZZZWFyID0gZGF5c0luWWVhcihyZXNZZWFyKSArIGRheU9mWWVhcjtcbiAgICAgICAgfSBlbHNlIGlmIChkYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXIpKSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhciArIDE7XG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlPZlllYXIgLSBkYXlzSW5ZZWFyKHllYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzWWVhciA9IHllYXI7XG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlPZlllYXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeWVhcjogcmVzWWVhcixcbiAgICAgICAgICAgIGRheU9mWWVhcjogcmVzRGF5T2ZZZWFyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Vla09mWWVhcihtb20sIGRvdywgZG95KSB7XG4gICAgICAgIHZhciB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KG1vbS55ZWFyKCksIGRvdywgZG95KSxcbiAgICAgICAgICAgIHdlZWsgPSBNYXRoLmZsb29yKChtb20uZGF5T2ZZZWFyKCkgLSB3ZWVrT2Zmc2V0IC0gMSkgLyA3KSArIDEsXG4gICAgICAgICAgICByZXNXZWVrLCByZXNZZWFyO1xuXG4gICAgICAgIGlmICh3ZWVrIDwgMSkge1xuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCkgLSAxO1xuICAgICAgICAgICAgcmVzV2VlayA9IHdlZWsgKyB3ZWVrc0luWWVhcihyZXNZZWFyLCBkb3csIGRveSk7XG4gICAgICAgIH0gZWxzZSBpZiAod2VlayA+IHdlZWtzSW5ZZWFyKG1vbS55ZWFyKCksIGRvdywgZG95KSkge1xuICAgICAgICAgICAgcmVzV2VlayA9IHdlZWsgLSB3ZWVrc0luWWVhcihtb20ueWVhcigpLCBkb3csIGRveSk7XG4gICAgICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKSArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKTtcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdlZWs6IHJlc1dlZWssXG4gICAgICAgICAgICB5ZWFyOiByZXNZZWFyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Vla3NJblllYXIoeWVhciwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpLFxuICAgICAgICAgICAgd2Vla09mZnNldE5leHQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciArIDEsIGRvdywgZG95KTtcbiAgICAgICAgcmV0dXJuIChkYXlzSW5ZZWFyKHllYXIpIC0gd2Vla09mZnNldCArIHdlZWtPZmZzZXROZXh0KSAvIDc7XG4gICAgfVxuXG4gICAgLy8gUGljayB0aGUgZmlyc3QgZGVmaW5lZCBvZiB0d28gb3IgdGhyZWUgYXJndW1lbnRzLlxuICAgIGZ1bmN0aW9uIGRlZmF1bHRzKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3VycmVudERhdGVBcnJheShjb25maWcpIHtcbiAgICAgICAgLy8gaG9va3MgaXMgYWN0dWFsbHkgdGhlIGV4cG9ydGVkIG1vbWVudCBvYmplY3RcbiAgICAgICAgdmFyIG5vd1ZhbHVlID0gbmV3IERhdGUodXRpbHNfaG9va3NfX2hvb2tzLm5vdygpKTtcbiAgICAgICAgaWYgKGNvbmZpZy5fdXNlVVRDKSB7XG4gICAgICAgICAgICByZXR1cm4gW25vd1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCksIG5vd1ZhbHVlLmdldFVUQ01vbnRoKCksIG5vd1ZhbHVlLmdldFVUQ0RhdGUoKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtub3dWYWx1ZS5nZXRGdWxsWWVhcigpLCBub3dWYWx1ZS5nZXRNb250aCgpLCBub3dWYWx1ZS5nZXREYXRlKCldO1xuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgYW4gYXJyYXkgdG8gYSBkYXRlLlxuICAgIC8vIHRoZSBhcnJheSBzaG91bGQgbWlycm9yIHRoZSBwYXJhbWV0ZXJzIGJlbG93XG4gICAgLy8gbm90ZTogYWxsIHZhbHVlcyBwYXN0IHRoZSB5ZWFyIGFyZSBvcHRpb25hbCBhbmQgd2lsbCBkZWZhdWx0IHRvIHRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXG4gICAgLy8gW3llYXIsIG1vbnRoLCBkYXkgLCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmRdXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUFycmF5IChjb25maWcpIHtcbiAgICAgICAgdmFyIGksIGRhdGUsIGlucHV0ID0gW10sIGN1cnJlbnREYXRlLCB5ZWFyVG9Vc2U7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudERhdGUgPSBjdXJyZW50RGF0ZUFycmF5KGNvbmZpZyk7XG5cbiAgICAgICAgLy9jb21wdXRlIGRheSBvZiB0aGUgeWVhciBmcm9tIHdlZWtzIGFuZCB3ZWVrZGF5c1xuICAgICAgICBpZiAoY29uZmlnLl93ICYmIGNvbmZpZy5fYVtEQVRFXSA9PSBudWxsICYmIGNvbmZpZy5fYVtNT05USF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgZGF5T2ZZZWFyRnJvbVdlZWtJbmZvKGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2lmIHRoZSBkYXkgb2YgdGhlIHllYXIgaXMgc2V0LCBmaWd1cmUgb3V0IHdoYXQgaXQgaXNcbiAgICAgICAgaWYgKGNvbmZpZy5fZGF5T2ZZZWFyKSB7XG4gICAgICAgICAgICB5ZWFyVG9Vc2UgPSBkZWZhdWx0cyhjb25maWcuX2FbWUVBUl0sIGN1cnJlbnREYXRlW1lFQVJdKTtcblxuICAgICAgICAgICAgaWYgKGNvbmZpZy5fZGF5T2ZZZWFyID4gZGF5c0luWWVhcih5ZWFyVG9Vc2UpKSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93RGF5T2ZZZWFyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0ZSA9IGNyZWF0ZVVUQ0RhdGUoeWVhclRvVXNlLCAwLCBjb25maWcuX2RheU9mWWVhcik7XG4gICAgICAgICAgICBjb25maWcuX2FbTU9OVEhdID0gZGF0ZS5nZXRVVENNb250aCgpO1xuICAgICAgICAgICAgY29uZmlnLl9hW0RBVEVdID0gZGF0ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWZhdWx0IHRvIGN1cnJlbnQgZGF0ZS5cbiAgICAgICAgLy8gKiBpZiBubyB5ZWFyLCBtb250aCwgZGF5IG9mIG1vbnRoIGFyZSBnaXZlbiwgZGVmYXVsdCB0byB0b2RheVxuICAgICAgICAvLyAqIGlmIGRheSBvZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBtb250aCBhbmQgeWVhclxuICAgICAgICAvLyAqIGlmIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG9ubHkgeWVhclxuICAgICAgICAvLyAqIGlmIHllYXIgaXMgZ2l2ZW4sIGRvbid0IGRlZmF1bHQgYW55dGhpbmdcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDMgJiYgY29uZmlnLl9hW2ldID09IG51bGw7ICsraSkge1xuICAgICAgICAgICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPSBjdXJyZW50RGF0ZVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFplcm8gb3V0IHdoYXRldmVyIHdhcyBub3QgZGVmYXVsdGVkLCBpbmNsdWRpbmcgdGltZVxuICAgICAgICBmb3IgKDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPSAoY29uZmlnLl9hW2ldID09IG51bGwpID8gKGkgPT09IDIgPyAxIDogMCkgOiBjb25maWcuX2FbaV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBmb3IgMjQ6MDA6MDAuMDAwXG4gICAgICAgIGlmIChjb25maWcuX2FbSE9VUl0gPT09IDI0ICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW01JTlVURV0gPT09IDAgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbU0VDT05EXSA9PT0gMCAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtNSUxMSVNFQ09ORF0gPT09IDApIHtcbiAgICAgICAgICAgIGNvbmZpZy5fbmV4dERheSA9IHRydWU7XG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLl9kID0gKGNvbmZpZy5fdXNlVVRDID8gY3JlYXRlVVRDRGF0ZSA6IGNyZWF0ZURhdGUpLmFwcGx5KG51bGwsIGlucHV0KTtcbiAgICAgICAgLy8gQXBwbHkgdGltZXpvbmUgb2Zmc2V0IGZyb20gaW5wdXQuIFRoZSBhY3R1YWwgdXRjT2Zmc2V0IGNhbiBiZSBjaGFuZ2VkXG4gICAgICAgIC8vIHdpdGggcGFyc2Vab25lLlxuICAgICAgICBpZiAoY29uZmlnLl90em0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZmlnLl9kLnNldFVUQ01pbnV0ZXMoY29uZmlnLl9kLmdldFVUQ01pbnV0ZXMoKSAtIGNvbmZpZy5fdHptKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuX25leHREYXkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDI0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGF5T2ZZZWFyRnJvbVdlZWtJbmZvKGNvbmZpZykge1xuICAgICAgICB2YXIgdywgd2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95LCB0ZW1wLCB3ZWVrZGF5T3ZlcmZsb3c7XG5cbiAgICAgICAgdyA9IGNvbmZpZy5fdztcbiAgICAgICAgaWYgKHcuR0cgIT0gbnVsbCB8fCB3LlcgIT0gbnVsbCB8fCB3LkUgIT0gbnVsbCkge1xuICAgICAgICAgICAgZG93ID0gMTtcbiAgICAgICAgICAgIGRveSA9IDQ7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IFdlIG5lZWQgdG8gdGFrZSB0aGUgY3VycmVudCBpc29XZWVrWWVhciwgYnV0IHRoYXQgZGVwZW5kcyBvblxuICAgICAgICAgICAgLy8gaG93IHdlIGludGVycHJldCBub3cgKGxvY2FsLCB1dGMsIGZpeGVkIG9mZnNldCkuIFNvIGNyZWF0ZVxuICAgICAgICAgICAgLy8gYSBub3cgdmVyc2lvbiBvZiBjdXJyZW50IGNvbmZpZyAodGFrZSBsb2NhbC91dGMvb2Zmc2V0IGZsYWdzLCBhbmRcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBub3cpLlxuICAgICAgICAgICAgd2Vla1llYXIgPSBkZWZhdWx0cyh3LkdHLCBjb25maWcuX2FbWUVBUl0sIHdlZWtPZlllYXIobG9jYWxfX2NyZWF0ZUxvY2FsKCksIDEsIDQpLnllYXIpO1xuICAgICAgICAgICAgd2VlayA9IGRlZmF1bHRzKHcuVywgMSk7XG4gICAgICAgICAgICB3ZWVrZGF5ID0gZGVmYXVsdHMody5FLCAxKTtcbiAgICAgICAgICAgIGlmICh3ZWVrZGF5IDwgMSB8fCB3ZWVrZGF5ID4gNykge1xuICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb3cgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3c7XG4gICAgICAgICAgICBkb3kgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3k7XG5cbiAgICAgICAgICAgIHdlZWtZZWFyID0gZGVmYXVsdHMody5nZywgY29uZmlnLl9hW1lFQVJdLCB3ZWVrT2ZZZWFyKGxvY2FsX19jcmVhdGVMb2NhbCgpLCBkb3csIGRveSkueWVhcik7XG4gICAgICAgICAgICB3ZWVrID0gZGVmYXVsdHMody53LCAxKTtcblxuICAgICAgICAgICAgaWYgKHcuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gd2Vla2RheSAtLSBsb3cgZGF5IG51bWJlcnMgYXJlIGNvbnNpZGVyZWQgbmV4dCB3ZWVrXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IHcuZDtcbiAgICAgICAgICAgICAgICBpZiAod2Vla2RheSA8IDAgfHwgd2Vla2RheSA+IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHcuZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gbG9jYWwgd2Vla2RheSAtLSBjb3VudGluZyBzdGFydHMgZnJvbSBiZWdpbmluZyBvZiB3ZWVrXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IHcuZSArIGRvdztcbiAgICAgICAgICAgICAgICBpZiAody5lIDwgMCB8fCB3LmUgPiA2KSB7XG4gICAgICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHRvIGJlZ2luaW5nIG9mIHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gZG93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh3ZWVrIDwgMSB8fCB3ZWVrID4gd2Vla3NJblllYXIod2Vla1llYXIsIGRvdywgZG95KSkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla3MgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHdlZWtkYXlPdmVyZmxvdyAhPSBudWxsKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrZGF5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlbXAgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtZRUFSXSA9IHRlbXAueWVhcjtcbiAgICAgICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdGVtcC5kYXlPZlllYXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb25zdGFudCB0aGF0IHJlZmVycyB0byB0aGUgSVNPIHN0YW5kYXJkXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLklTT184NjAxID0gZnVuY3Rpb24gKCkge307XG5cbiAgICAvLyBkYXRlIGZyb20gc3RyaW5nIGFuZCBmb3JtYXQgc3RyaW5nXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpIHtcbiAgICAgICAgLy8gVE9ETzogTW92ZSB0aGlzIHRvIGFub3RoZXIgcGFydCBvZiB0aGUgY3JlYXRpb24gZmxvdyB0byBwcmV2ZW50IGNpcmN1bGFyIGRlcHNcbiAgICAgICAgaWYgKGNvbmZpZy5fZiA9PT0gdXRpbHNfaG9va3NfX2hvb2tzLklTT184NjAxKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tSVNPKGNvbmZpZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuX2EgPSBbXTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuZW1wdHkgPSB0cnVlO1xuXG4gICAgICAgIC8vIFRoaXMgYXJyYXkgaXMgdXNlZCB0byBtYWtlIGEgRGF0ZSwgZWl0aGVyIHdpdGggYG5ldyBEYXRlYCBvciBgRGF0ZS5VVENgXG4gICAgICAgIHZhciBzdHJpbmcgPSAnJyArIGNvbmZpZy5faSxcbiAgICAgICAgICAgIGksIHBhcnNlZElucHV0LCB0b2tlbnMsIHRva2VuLCBza2lwcGVkLFxuICAgICAgICAgICAgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICAgIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGggPSAwO1xuXG4gICAgICAgIHRva2VucyA9IGV4cGFuZEZvcm1hdChjb25maWcuX2YsIGNvbmZpZy5fbG9jYWxlKS5tYXRjaChmb3JtYXR0aW5nVG9rZW5zKSB8fCBbXTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIHBhcnNlZElucHV0ID0gKHN0cmluZy5tYXRjaChnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykpIHx8IFtdKVswXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0b2tlbicsIHRva2VuLCAncGFyc2VkSW5wdXQnLCBwYXJzZWRJbnB1dCxcbiAgICAgICAgICAgIC8vICAgICAgICAgJ3JlZ2V4JywgZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKTtcbiAgICAgICAgICAgIGlmIChwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHNraXBwZWQgPSBzdHJpbmcuc3Vic3RyKDAsIHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSk7XG4gICAgICAgICAgICAgICAgaWYgKHNraXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRJbnB1dC5wdXNoKHNraXBwZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcuc2xpY2Uoc3RyaW5nLmluZGV4T2YocGFyc2VkSW5wdXQpICsgcGFyc2VkSW5wdXQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0b3RhbFBhcnNlZElucHV0TGVuZ3RoICs9IHBhcnNlZElucHV0Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRvbid0IHBhcnNlIGlmIGl0J3Mgbm90IGEga25vd24gdG9rZW5cbiAgICAgICAgICAgIGlmIChmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0pIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuZW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIHBhcnNlZElucHV0LCBjb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29uZmlnLl9zdHJpY3QgJiYgIXBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIHJlbWFpbmluZyB1bnBhcnNlZCBpbnB1dCBsZW5ndGggdG8gdGhlIHN0cmluZ1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5jaGFyc0xlZnRPdmVyID0gc3RyaW5nTGVuZ3RoIC0gdG90YWxQYXJzZWRJbnB1dExlbmd0aDtcbiAgICAgICAgaWYgKHN0cmluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRJbnB1dC5wdXNoKHN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhciBfMTJoIGZsYWcgaWYgaG91ciBpcyA8PSAxMlxuICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA8PSAxMiAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA+IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaGFuZGxlIG1lcmlkaWVtXG4gICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IG1lcmlkaWVtRml4V3JhcChjb25maWcuX2xvY2FsZSwgY29uZmlnLl9hW0hPVVJdLCBjb25maWcuX21lcmlkaWVtKTtcblxuICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbiAgICAgICAgY2hlY2tPdmVyZmxvdyhjb25maWcpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gbWVyaWRpZW1GaXhXcmFwIChsb2NhbGUsIGhvdXIsIG1lcmlkaWVtKSB7XG4gICAgICAgIHZhciBpc1BtO1xuXG4gICAgICAgIGlmIChtZXJpZGllbSA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBub3RoaW5nIHRvIGRvXG4gICAgICAgICAgICByZXR1cm4gaG91cjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYWxlLm1lcmlkaWVtSG91ciAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlLm1lcmlkaWVtSG91cihob3VyLCBtZXJpZGllbSk7XG4gICAgICAgIH0gZWxzZSBpZiAobG9jYWxlLmlzUE0gIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRmFsbGJhY2tcbiAgICAgICAgICAgIGlzUG0gPSBsb2NhbGUuaXNQTShtZXJpZGllbSk7XG4gICAgICAgICAgICBpZiAoaXNQbSAmJiBob3VyIDwgMTIpIHtcbiAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc1BtICYmIGhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaG91cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbm90IHN1cHBvc2VkIHRvIGhhcHBlblxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXRlIGZyb20gc3RyaW5nIGFuZCBhcnJheSBvZiBmb3JtYXQgc3RyaW5nc1xuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmdBbmRBcnJheShjb25maWcpIHtcbiAgICAgICAgdmFyIHRlbXBDb25maWcsXG4gICAgICAgICAgICBiZXN0TW9tZW50LFxuXG4gICAgICAgICAgICBzY29yZVRvQmVhdCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBjdXJyZW50U2NvcmU7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fZi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRGb3JtYXQgPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoTmFOKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb25maWcuX2YubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSA9IDA7XG4gICAgICAgICAgICB0ZW1wQ29uZmlnID0gY29weUNvbmZpZyh7fSwgY29uZmlnKTtcbiAgICAgICAgICAgIGlmIChjb25maWcuX3VzZVVUQyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGVtcENvbmZpZy5fdXNlVVRDID0gY29uZmlnLl91c2VVVEM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZW1wQ29uZmlnLl9mID0gY29uZmlnLl9mW2ldO1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdCh0ZW1wQ29uZmlnKTtcblxuICAgICAgICAgICAgaWYgKCF2YWxpZF9faXNWYWxpZCh0ZW1wQ29uZmlnKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbnkgaW5wdXQgdGhhdCB3YXMgbm90IHBhcnNlZCBhZGQgYSBwZW5hbHR5IGZvciB0aGF0IGZvcm1hdFxuICAgICAgICAgICAgY3VycmVudFNjb3JlICs9IGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS5jaGFyc0xlZnRPdmVyO1xuXG4gICAgICAgICAgICAvL29yIHRva2Vuc1xuICAgICAgICAgICAgY3VycmVudFNjb3JlICs9IGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS51bnVzZWRUb2tlbnMubGVuZ3RoICogMTA7XG5cbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS5zY29yZSA9IGN1cnJlbnRTY29yZTtcblxuICAgICAgICAgICAgaWYgKHNjb3JlVG9CZWF0ID09IG51bGwgfHwgY3VycmVudFNjb3JlIDwgc2NvcmVUb0JlYXQpIHtcbiAgICAgICAgICAgICAgICBzY29yZVRvQmVhdCA9IGN1cnJlbnRTY29yZTtcbiAgICAgICAgICAgICAgICBiZXN0TW9tZW50ID0gdGVtcENvbmZpZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGV4dGVuZChjb25maWcsIGJlc3RNb21lbnQgfHwgdGVtcENvbmZpZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbU9iamVjdChjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5fZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGkgPSBub3JtYWxpemVPYmplY3RVbml0cyhjb25maWcuX2kpO1xuICAgICAgICBjb25maWcuX2EgPSBtYXAoW2kueWVhciwgaS5tb250aCwgaS5kYXkgfHwgaS5kYXRlLCBpLmhvdXIsIGkubWludXRlLCBpLnNlY29uZCwgaS5taWxsaXNlY29uZF0sIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgcGFyc2VJbnQob2JqLCAxMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUZyb21Db25maWcgKGNvbmZpZykge1xuICAgICAgICB2YXIgcmVzID0gbmV3IE1vbWVudChjaGVja092ZXJmbG93KHByZXBhcmVDb25maWcoY29uZmlnKSkpO1xuICAgICAgICBpZiAocmVzLl9uZXh0RGF5KSB7XG4gICAgICAgICAgICAvLyBBZGRpbmcgaXMgc21hcnQgZW5vdWdoIGFyb3VuZCBEU1RcbiAgICAgICAgICAgIHJlcy5hZGQoMSwgJ2QnKTtcbiAgICAgICAgICAgIHJlcy5fbmV4dERheSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZUNvbmZpZyAoY29uZmlnKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faSxcbiAgICAgICAgICAgIGZvcm1hdCA9IGNvbmZpZy5fZjtcblxuICAgICAgICBjb25maWcuX2xvY2FsZSA9IGNvbmZpZy5fbG9jYWxlIHx8IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoY29uZmlnLl9sKTtcblxuICAgICAgICBpZiAoaW5wdXQgPT09IG51bGwgfHwgKGZvcm1hdCA9PT0gdW5kZWZpbmVkICYmIGlucHV0ID09PSAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZF9fY3JlYXRlSW52YWxpZCh7bnVsbElucHV0OiB0cnVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uZmlnLl9pID0gaW5wdXQgPSBjb25maWcuX2xvY2FsZS5wcmVwYXJzZShpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNb21lbnQoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vbWVudChjaGVja092ZXJmbG93KGlucHV0KSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShmb3JtYXQpKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBpbnB1dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF2YWxpZF9faXNWYWxpZChjb25maWcpKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tSW5wdXQoY29uZmlnKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faTtcbiAgICAgICAgaWYgKGlucHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHV0aWxzX2hvb2tzX19ob29rcy5ub3coKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoK2lucHV0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nKGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYSA9IG1hcChpbnB1dC5zbGljZSgwKSwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChvYmosIDEwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mKGlucHV0KSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21PYmplY3QoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YoaW5wdXQpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgLy8gZnJvbSBtaWxsaXNlY29uZHNcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGlucHV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayhjb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTG9jYWxPclVUQyAoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIGlzVVRDKSB7XG4gICAgICAgIHZhciBjID0ge307XG5cbiAgICAgICAgaWYgKHR5cGVvZihsb2NhbGUpID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHN0cmljdCA9IGxvY2FsZTtcbiAgICAgICAgICAgIGxvY2FsZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBvYmplY3QgY29uc3RydWN0aW9uIG11c3QgYmUgZG9uZSB0aGlzIHdheS5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MjNcbiAgICAgICAgYy5faXNBTW9tZW50T2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgYy5fdXNlVVRDID0gYy5faXNVVEMgPSBpc1VUQztcbiAgICAgICAgYy5fbCA9IGxvY2FsZTtcbiAgICAgICAgYy5faSA9IGlucHV0O1xuICAgICAgICBjLl9mID0gZm9ybWF0O1xuICAgICAgICBjLl9zdHJpY3QgPSBzdHJpY3Q7XG5cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUZyb21Db25maWcoYyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxfX2NyZWF0ZUxvY2FsIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgZmFsc2UpO1xuICAgIH1cblxuICAgIHZhciBwcm90b3R5cGVNaW4gPSBkZXByZWNhdGUoXG4gICAgICAgICAnbW9tZW50KCkubWluIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWluIGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNTQ4JyxcbiAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICB2YXIgb3RoZXIgPSBsb2NhbF9fY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgIHJldHVybiBvdGhlciA8IHRoaXMgPyB0aGlzIDogb3RoZXI7XG4gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkX19jcmVhdGVJbnZhbGlkKCk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICApO1xuXG4gICAgdmFyIHByb3RvdHlwZU1heCA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ21vbWVudCgpLm1heCBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50Lm1heCBpbnN0ZWFkLiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTU0OCcsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvdGhlciA9IGxvY2FsX19jcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvdGhlciA+IHRoaXMgPyB0aGlzIDogb3RoZXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZF9fY3JlYXRlSW52YWxpZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIC8vIFBpY2sgYSBtb21lbnQgbSBmcm9tIG1vbWVudHMgc28gdGhhdCBtW2ZuXShvdGhlcikgaXMgdHJ1ZSBmb3IgYWxsXG4gICAgLy8gb3RoZXIuIFRoaXMgcmVsaWVzIG9uIHRoZSBmdW5jdGlvbiBmbiB0byBiZSB0cmFuc2l0aXZlLlxuICAgIC8vXG4gICAgLy8gbW9tZW50cyBzaG91bGQgZWl0aGVyIGJlIGFuIGFycmF5IG9mIG1vbWVudCBvYmplY3RzIG9yIGFuIGFycmF5LCB3aG9zZVxuICAgIC8vIGZpcnN0IGVsZW1lbnQgaXMgYW4gYXJyYXkgb2YgbW9tZW50IG9iamVjdHMuXG4gICAgZnVuY3Rpb24gcGlja0J5KGZuLCBtb21lbnRzKSB7XG4gICAgICAgIHZhciByZXMsIGk7XG4gICAgICAgIGlmIChtb21lbnRzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KG1vbWVudHNbMF0pKSB7XG4gICAgICAgICAgICBtb21lbnRzID0gbW9tZW50c1swXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1vbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzID0gbW9tZW50c1swXTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IG1vbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICghbW9tZW50c1tpXS5pc1ZhbGlkKCkgfHwgbW9tZW50c1tpXVtmbl0ocmVzKSkge1xuICAgICAgICAgICAgICAgIHJlcyA9IG1vbWVudHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBVc2UgW10uc29ydCBpbnN0ZWFkP1xuICAgIGZ1bmN0aW9uIG1pbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgICAgIHJldHVybiBwaWNrQnkoJ2lzQmVmb3JlJywgYXJncyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF4ICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICAgICAgcmV0dXJuIHBpY2tCeSgnaXNBZnRlcicsIGFyZ3MpO1xuICAgIH1cblxuICAgIHZhciBub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBEYXRlLm5vdyA/IERhdGUubm93KCkgOiArKG5ldyBEYXRlKCkpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBEdXJhdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIG5vcm1hbGl6ZWRJbnB1dCA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGR1cmF0aW9uKSxcbiAgICAgICAgICAgIHllYXJzID0gbm9ybWFsaXplZElucHV0LnllYXIgfHwgMCxcbiAgICAgICAgICAgIHF1YXJ0ZXJzID0gbm9ybWFsaXplZElucHV0LnF1YXJ0ZXIgfHwgMCxcbiAgICAgICAgICAgIG1vbnRocyA9IG5vcm1hbGl6ZWRJbnB1dC5tb250aCB8fCAwLFxuICAgICAgICAgICAgd2Vla3MgPSBub3JtYWxpemVkSW5wdXQud2VlayB8fCAwLFxuICAgICAgICAgICAgZGF5cyA9IG5vcm1hbGl6ZWRJbnB1dC5kYXkgfHwgMCxcbiAgICAgICAgICAgIGhvdXJzID0gbm9ybWFsaXplZElucHV0LmhvdXIgfHwgMCxcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBub3JtYWxpemVkSW5wdXQubWludXRlIHx8IDAsXG4gICAgICAgICAgICBzZWNvbmRzID0gbm9ybWFsaXplZElucHV0LnNlY29uZCB8fCAwLFxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzID0gbm9ybWFsaXplZElucHV0Lm1pbGxpc2Vjb25kIHx8IDA7XG5cbiAgICAgICAgLy8gcmVwcmVzZW50YXRpb24gZm9yIGRhdGVBZGRSZW1vdmVcbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gK21pbGxpc2Vjb25kcyArXG4gICAgICAgICAgICBzZWNvbmRzICogMWUzICsgLy8gMTAwMFxuICAgICAgICAgICAgbWludXRlcyAqIDZlNCArIC8vIDEwMDAgKiA2MFxuICAgICAgICAgICAgaG91cnMgKiAzNmU1OyAvLyAxMDAwICogNjAgKiA2MFxuICAgICAgICAvLyBCZWNhdXNlIG9mIGRhdGVBZGRSZW1vdmUgdHJlYXRzIDI0IGhvdXJzIGFzIGRpZmZlcmVudCBmcm9tIGFcbiAgICAgICAgLy8gZGF5IHdoZW4gd29ya2luZyBhcm91bmQgRFNULCB3ZSBuZWVkIHRvIHN0b3JlIHRoZW0gc2VwYXJhdGVseVxuICAgICAgICB0aGlzLl9kYXlzID0gK2RheXMgK1xuICAgICAgICAgICAgd2Vla3MgKiA3O1xuICAgICAgICAvLyBJdCBpcyBpbXBvc3NpYmxlIHRyYW5zbGF0ZSBtb250aHMgaW50byBkYXlzIHdpdGhvdXQga25vd2luZ1xuICAgICAgICAvLyB3aGljaCBtb250aHMgeW91IGFyZSBhcmUgdGFsa2luZyBhYm91dCwgc28gd2UgaGF2ZSB0byBzdG9yZVxuICAgICAgICAvLyBpdCBzZXBhcmF0ZWx5LlxuICAgICAgICB0aGlzLl9tb250aHMgPSArbW9udGhzICtcbiAgICAgICAgICAgIHF1YXJ0ZXJzICogMyArXG4gICAgICAgICAgICB5ZWFycyAqIDEyO1xuXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcblxuICAgICAgICB0aGlzLl9sb2NhbGUgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKCk7XG5cbiAgICAgICAgdGhpcy5fYnViYmxlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEdXJhdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBEdXJhdGlvbjtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBmdW5jdGlvbiBvZmZzZXQgKHRva2VuLCBzZXBhcmF0b3IpIHtcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLnV0Y09mZnNldCgpO1xuICAgICAgICAgICAgdmFyIHNpZ24gPSAnKyc7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgICAgICAgICAgc2lnbiA9ICctJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaWduICsgemVyb0ZpbGwofn4ob2Zmc2V0IC8gNjApLCAyKSArIHNlcGFyYXRvciArIHplcm9GaWxsKH5+KG9mZnNldCkgJSA2MCwgMik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9mZnNldCgnWicsICc6Jyk7XG4gICAgb2Zmc2V0KCdaWicsICcnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1onLCAgbWF0Y2hTaG9ydE9mZnNldCk7XG4gICAgYWRkUmVnZXhUb2tlbignWlonLCBtYXRjaFNob3J0T2Zmc2V0KTtcbiAgICBhZGRQYXJzZVRva2VuKFsnWicsICdaWiddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl91c2VVVEMgPSB0cnVlO1xuICAgICAgICBjb25maWcuX3R6bSA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hTaG9ydE9mZnNldCwgaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgLy8gdGltZXpvbmUgY2h1bmtlclxuICAgIC8vICcrMTA6MDAnID4gWycxMCcsICAnMDAnXVxuICAgIC8vICctMTUzMCcgID4gWyctMTUnLCAnMzAnXVxuICAgIHZhciBjaHVua09mZnNldCA9IC8oW1xcK1xcLV18XFxkXFxkKS9naTtcblxuICAgIGZ1bmN0aW9uIG9mZnNldEZyb21TdHJpbmcobWF0Y2hlciwgc3RyaW5nKSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gKChzdHJpbmcgfHwgJycpLm1hdGNoKG1hdGNoZXIpIHx8IFtdKTtcbiAgICAgICAgdmFyIGNodW5rICAgPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0gfHwgW107XG4gICAgICAgIHZhciBwYXJ0cyAgID0gKGNodW5rICsgJycpLm1hdGNoKGNodW5rT2Zmc2V0KSB8fCBbJy0nLCAwLCAwXTtcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSArKHBhcnRzWzFdICogNjApICsgdG9JbnQocGFydHNbMl0pO1xuXG4gICAgICAgIHJldHVybiBwYXJ0c1swXSA9PT0gJysnID8gbWludXRlcyA6IC1taW51dGVzO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIG1vbWVudCBmcm9tIGlucHV0LCB0aGF0IGlzIGxvY2FsL3V0Yy96b25lIGVxdWl2YWxlbnQgdG8gbW9kZWwuXG4gICAgZnVuY3Rpb24gY2xvbmVXaXRoT2Zmc2V0KGlucHV0LCBtb2RlbCkge1xuICAgICAgICB2YXIgcmVzLCBkaWZmO1xuICAgICAgICBpZiAobW9kZWwuX2lzVVRDKSB7XG4gICAgICAgICAgICByZXMgPSBtb2RlbC5jbG9uZSgpO1xuICAgICAgICAgICAgZGlmZiA9IChpc01vbWVudChpbnB1dCkgfHwgaXNEYXRlKGlucHV0KSA/ICtpbnB1dCA6ICtsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpKSAtICgrcmVzKTtcbiAgICAgICAgICAgIC8vIFVzZSBsb3ctbGV2ZWwgYXBpLCBiZWNhdXNlIHRoaXMgZm4gaXMgbG93LWxldmVsIGFwaS5cbiAgICAgICAgICAgIHJlcy5fZC5zZXRUaW1lKCtyZXMuX2QgKyBkaWZmKTtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQocmVzLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCkubG9jYWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERhdGVPZmZzZXQgKG0pIHtcbiAgICAgICAgLy8gT24gRmlyZWZveC4yNCBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgYSBmbG9hdGluZyBwb2ludC5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvcHVsbC8xODcxXG4gICAgICAgIHJldHVybiAtTWF0aC5yb3VuZChtLl9kLmdldFRpbWV6b25lT2Zmc2V0KCkgLyAxNSkgKiAxNTtcbiAgICB9XG5cbiAgICAvLyBIT09LU1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlciBhIG1vbWVudCBpcyBtdXRhdGVkLlxuICAgIC8vIEl0IGlzIGludGVuZGVkIHRvIGtlZXAgdGhlIG9mZnNldCBpbiBzeW5jIHdpdGggdGhlIHRpbWV6b25lLlxuICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIC8vIGtlZXBMb2NhbFRpbWUgPSB0cnVlIG1lYW5zIG9ubHkgY2hhbmdlIHRoZSB0aW1lem9uZSwgd2l0aG91dFxuICAgIC8vIGFmZmVjdGluZyB0aGUgbG9jYWwgaG91ci4gU28gNTozMToyNiArMDMwMCAtLVt1dGNPZmZzZXQoMiwgdHJ1ZSldLS0+XG4gICAgLy8gNTozMToyNiArMDIwMCBJdCBpcyBwb3NzaWJsZSB0aGF0IDU6MzE6MjYgZG9lc24ndCBleGlzdCB3aXRoIG9mZnNldFxuICAgIC8vICswMjAwLCBzbyB3ZSBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkLCB0byBiZSB2YWxpZC5cbiAgICAvL1xuICAgIC8vIEtlZXBpbmcgdGhlIHRpbWUgYWN0dWFsbHkgYWRkcy9zdWJ0cmFjdHMgKG9uZSBob3VyKVxuICAgIC8vIGZyb20gdGhlIGFjdHVhbCByZXByZXNlbnRlZCB0aW1lLiBUaGF0IGlzIHdoeSB3ZSBjYWxsIHVwZGF0ZU9mZnNldFxuICAgIC8vIGEgc2Vjb25kIHRpbWUuIEluIGNhc2UgaXQgd2FudHMgdXMgdG8gY2hhbmdlIHRoZSBvZmZzZXQgYWdhaW5cbiAgICAvLyBfY2hhbmdlSW5Qcm9ncmVzcyA9PSB0cnVlIGNhc2UsIHRoZW4gd2UgaGF2ZSB0byBhZGp1c3QsIGJlY2F1c2VcbiAgICAvLyB0aGVyZSBpcyBubyBzdWNoIHRpbWUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLlxuICAgIGZ1bmN0aW9uIGdldFNldE9mZnNldCAoaW5wdXQsIGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuX29mZnNldCB8fCAwLFxuICAgICAgICAgICAgbG9jYWxBZGp1c3Q7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hTaG9ydE9mZnNldCwgaW5wdXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhpbnB1dCkgPCAxNikge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQgKiA2MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5faXNVVEMgJiYga2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgICAgIGxvY2FsQWRqdXN0ID0gZ2V0RGF0ZU9mZnNldCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IGlucHV0O1xuICAgICAgICAgICAgdGhpcy5faXNVVEMgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGxvY2FsQWRqdXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChsb2NhbEFkanVzdCwgJ20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IGlucHV0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFrZWVwTG9jYWxUaW1lIHx8IHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKGlucHV0IC0gb2Zmc2V0LCAnbScpLCAxLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyBvZmZzZXQgOiBnZXREYXRlT2Zmc2V0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0Wm9uZSAoaW5wdXQsIGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSAtaW5wdXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KGlucHV0LCBrZWVwTG9jYWxUaW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gLXRoaXMudXRjT2Zmc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1VUQyAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICByZXR1cm4gdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9Mb2NhbCAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICBpZiAodGhpcy5faXNVVEMpIHtcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xuICAgICAgICAgICAgdGhpcy5faXNVVEMgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnRyYWN0KGdldERhdGVPZmZzZXQodGhpcyksICdtJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9QYXJzZWRPZmZzZXQgKCkge1xuICAgICAgICBpZiAodGhpcy5fdHptKSB7XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCh0aGlzLl90em0pO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLl9pID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQob2Zmc2V0RnJvbVN0cmluZyhtYXRjaE9mZnNldCwgdGhpcy5faSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc0FsaWduZWRIb3VyT2Zmc2V0IChpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQgPSBpbnB1dCA/IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCkudXRjT2Zmc2V0KCkgOiAwO1xuXG4gICAgICAgIHJldHVybiAodGhpcy51dGNPZmZzZXQoKSAtIGlucHV0KSAlIDYwID09PSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF5bGlnaHRTYXZpbmdUaW1lICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoMCkudXRjT2Zmc2V0KCkgfHxcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoNSkudXRjT2Zmc2V0KClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWQgKCkge1xuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX2lzRFNUU2hpZnRlZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0RTVFNoaWZ0ZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYyA9IHt9O1xuXG4gICAgICAgIGNvcHlDb25maWcoYywgdGhpcyk7XG4gICAgICAgIGMgPSBwcmVwYXJlQ29uZmlnKGMpO1xuXG4gICAgICAgIGlmIChjLl9hKSB7XG4gICAgICAgICAgICB2YXIgb3RoZXIgPSBjLl9pc1VUQyA/IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhjLl9hKSA6IGxvY2FsX19jcmVhdGVMb2NhbChjLl9hKTtcbiAgICAgICAgICAgIHRoaXMuX2lzRFNUU2hpZnRlZCA9IHRoaXMuaXNWYWxpZCgpICYmXG4gICAgICAgICAgICAgICAgY29tcGFyZUFycmF5cyhjLl9hLCBvdGhlci50b0FycmF5KCkpID4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzRFNUU2hpZnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRFNUU2hpZnRlZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0xvY2FsICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gIXRoaXMuX2lzVVRDIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVdGNPZmZzZXQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVXRjICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy5faXNVVEMgJiYgdGhpcy5fb2Zmc2V0ID09PSAwIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQVNQLk5FVCBqc29uIGRhdGUgZm9ybWF0IHJlZ2V4XG4gICAgdmFyIGFzcE5ldFJlZ2V4ID0gL14oXFwtKT8oPzooXFxkKilbLiBdKT8oXFxkKylcXDooXFxkKykoPzpcXDooXFxkKylcXC4/KFxcZHszfSk/XFxkKik/JC87XG5cbiAgICAvLyBmcm9tIGh0dHA6Ly9kb2NzLmNsb3N1cmUtbGlicmFyeS5nb29nbGVjb2RlLmNvbS9naXQvY2xvc3VyZV9nb29nX2RhdGVfZGF0ZS5qcy5zb3VyY2UuaHRtbFxuICAgIC8vIHNvbWV3aGF0IG1vcmUgaW4gbGluZSB3aXRoIDQuNC4zLjIgMjAwNCBzcGVjLCBidXQgYWxsb3dzIGRlY2ltYWwgYW55d2hlcmVcbiAgICB2YXIgaXNvUmVnZXggPSAvXigtKT9QKD86KD86KFswLTksLl0qKVkpPyg/OihbMC05LC5dKilNKT8oPzooWzAtOSwuXSopRCk/KD86VCg/OihbMC05LC5dKilIKT8oPzooWzAtOSwuXSopTSk/KD86KFswLTksLl0qKVMpPyk/fChbMC05LC5dKilXKSQvO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlX19jcmVhdGVEdXJhdGlvbiAoaW5wdXQsIGtleSkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnB1dCxcbiAgICAgICAgICAgIC8vIG1hdGNoaW5nIGFnYWluc3QgcmVnZXhwIGlzIGV4cGVuc2l2ZSwgZG8gaXQgb24gZGVtYW5kXG4gICAgICAgICAgICBtYXRjaCA9IG51bGwsXG4gICAgICAgICAgICBzaWduLFxuICAgICAgICAgICAgcmV0LFxuICAgICAgICAgICAgZGlmZlJlcztcblxuICAgICAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgICAgIG1zIDogaW5wdXQuX21pbGxpc2Vjb25kcyxcbiAgICAgICAgICAgICAgICBkICA6IGlucHV0Ll9kYXlzLFxuICAgICAgICAgICAgICAgIE0gIDogaW5wdXQuX21vbnRoc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uW2tleV0gPSBpbnB1dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb24ubWlsbGlzZWNvbmRzID0gaW5wdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoISEobWF0Y2ggPSBhc3BOZXRSZWdleC5leGVjKGlucHV0KSkpIHtcbiAgICAgICAgICAgIHNpZ24gPSAobWF0Y2hbMV0gPT09ICctJykgPyAtMSA6IDE7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB5ICA6IDAsXG4gICAgICAgICAgICAgICAgZCAgOiB0b0ludChtYXRjaFtEQVRFXSkgICAgICAgICogc2lnbixcbiAgICAgICAgICAgICAgICBoICA6IHRvSW50KG1hdGNoW0hPVVJdKSAgICAgICAgKiBzaWduLFxuICAgICAgICAgICAgICAgIG0gIDogdG9JbnQobWF0Y2hbTUlOVVRFXSkgICAgICAqIHNpZ24sXG4gICAgICAgICAgICAgICAgcyAgOiB0b0ludChtYXRjaFtTRUNPTkRdKSAgICAgICogc2lnbixcbiAgICAgICAgICAgICAgICBtcyA6IHRvSW50KG1hdGNoW01JTExJU0VDT05EXSkgKiBzaWduXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gaXNvUmVnZXguZXhlYyhpbnB1dCkpKSB7XG4gICAgICAgICAgICBzaWduID0gKG1hdGNoWzFdID09PSAnLScpID8gLTEgOiAxO1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeSA6IHBhcnNlSXNvKG1hdGNoWzJdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBNIDogcGFyc2VJc28obWF0Y2hbM10sIHNpZ24pLFxuICAgICAgICAgICAgICAgIGQgOiBwYXJzZUlzbyhtYXRjaFs0XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgaCA6IHBhcnNlSXNvKG1hdGNoWzVdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBtIDogcGFyc2VJc28obWF0Y2hbNl0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIHMgOiBwYXJzZUlzbyhtYXRjaFs3XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgdyA6IHBhcnNlSXNvKG1hdGNoWzhdLCBzaWduKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChkdXJhdGlvbiA9PSBudWxsKSB7Ly8gY2hlY2tzIGZvciBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZHVyYXRpb24gPT09ICdvYmplY3QnICYmICgnZnJvbScgaW4gZHVyYXRpb24gfHwgJ3RvJyBpbiBkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIGRpZmZSZXMgPSBtb21lbnRzRGlmZmVyZW5jZShsb2NhbF9fY3JlYXRlTG9jYWwoZHVyYXRpb24uZnJvbSksIGxvY2FsX19jcmVhdGVMb2NhbChkdXJhdGlvbi50bykpO1xuXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xuICAgICAgICAgICAgZHVyYXRpb24ubXMgPSBkaWZmUmVzLm1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgIGR1cmF0aW9uLk0gPSBkaWZmUmVzLm1vbnRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldCA9IG5ldyBEdXJhdGlvbihkdXJhdGlvbik7XG5cbiAgICAgICAgaWYgKGlzRHVyYXRpb24oaW5wdXQpICYmIGhhc093blByb3AoaW5wdXQsICdfbG9jYWxlJykpIHtcbiAgICAgICAgICAgIHJldC5fbG9jYWxlID0gaW5wdXQuX2xvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgY3JlYXRlX19jcmVhdGVEdXJhdGlvbi5mbiA9IER1cmF0aW9uLnByb3RvdHlwZTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlSXNvIChpbnAsIHNpZ24pIHtcbiAgICAgICAgLy8gV2UnZCBub3JtYWxseSB1c2Ugfn5pbnAgZm9yIHRoaXMsIGJ1dCB1bmZvcnR1bmF0ZWx5IGl0IGFsc29cbiAgICAgICAgLy8gY29udmVydHMgZmxvYXRzIHRvIGludHMuXG4gICAgICAgIC8vIGlucCBtYXkgYmUgdW5kZWZpbmVkLCBzbyBjYXJlZnVsIGNhbGxpbmcgcmVwbGFjZSBvbiBpdC5cbiAgICAgICAgdmFyIHJlcyA9IGlucCAmJiBwYXJzZUZsb2F0KGlucC5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgICAgIC8vIGFwcGx5IHNpZ24gd2hpbGUgd2UncmUgYXQgaXRcbiAgICAgICAgcmV0dXJuIChpc05hTihyZXMpID8gMCA6IHJlcykgKiBzaWduO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIHJlcyA9IHttaWxsaXNlY29uZHM6IDAsIG1vbnRoczogMH07XG5cbiAgICAgICAgcmVzLm1vbnRocyA9IG90aGVyLm1vbnRoKCkgLSBiYXNlLm1vbnRoKCkgK1xuICAgICAgICAgICAgKG90aGVyLnllYXIoKSAtIGJhc2UueWVhcigpKSAqIDEyO1xuICAgICAgICBpZiAoYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpLmlzQWZ0ZXIob3RoZXIpKSB7XG4gICAgICAgICAgICAtLXJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXMubWlsbGlzZWNvbmRzID0gK290aGVyIC0gKyhiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykpO1xuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgaWYgKCEoYmFzZS5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHttaWxsaXNlY29uZHM6IDAsIG1vbnRoczogMH07XG4gICAgICAgIH1cblxuICAgICAgICBvdGhlciA9IGNsb25lV2l0aE9mZnNldChvdGhlciwgYmFzZSk7XG4gICAgICAgIGlmIChiYXNlLmlzQmVmb3JlKG90aGVyKSkge1xuICAgICAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMgPSBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKG90aGVyLCBiYXNlKTtcbiAgICAgICAgICAgIHJlcy5taWxsaXNlY29uZHMgPSAtcmVzLm1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgIHJlcy5tb250aHMgPSAtcmVzLm1vbnRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogcmVtb3ZlICduYW1lJyBhcmcgYWZ0ZXIgZGVwcmVjYXRpb24gaXMgcmVtb3ZlZFxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFkZGVyKGRpcmVjdGlvbiwgbmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgcGVyaW9kKSB7XG4gICAgICAgICAgICB2YXIgZHVyLCB0bXA7XG4gICAgICAgICAgICAvL2ludmVydCB0aGUgYXJndW1lbnRzLCBidXQgY29tcGxhaW4gYWJvdXQgaXRcbiAgICAgICAgICAgIGlmIChwZXJpb2QgIT09IG51bGwgJiYgIWlzTmFOKCtwZXJpb2QpKSB7XG4gICAgICAgICAgICAgICAgZGVwcmVjYXRlU2ltcGxlKG5hbWUsICdtb21lbnQoKS4nICsgbmFtZSAgKyAnKHBlcmlvZCwgbnVtYmVyKSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG1vbWVudCgpLicgKyBuYW1lICsgJyhudW1iZXIsIHBlcmlvZCkuJyk7XG4gICAgICAgICAgICAgICAgdG1wID0gdmFsOyB2YWwgPSBwZXJpb2Q7IHBlcmlvZCA9IHRtcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFsID0gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyArdmFsIDogdmFsO1xuICAgICAgICAgICAgZHVyID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbih2YWwsIHBlcmlvZCk7XG4gICAgICAgICAgICBhZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGR1ciwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QgKG1vbSwgZHVyYXRpb24sIGlzQWRkaW5nLCB1cGRhdGVPZmZzZXQpIHtcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IGR1cmF0aW9uLl9taWxsaXNlY29uZHMsXG4gICAgICAgICAgICBkYXlzID0gZHVyYXRpb24uX2RheXMsXG4gICAgICAgICAgICBtb250aHMgPSBkdXJhdGlvbi5fbW9udGhzO1xuXG4gICAgICAgIGlmICghbW9tLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgLy8gTm8gb3BcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZU9mZnNldCA9IHVwZGF0ZU9mZnNldCA9PSBudWxsID8gdHJ1ZSA6IHVwZGF0ZU9mZnNldDtcblxuICAgICAgICBpZiAobWlsbGlzZWNvbmRzKSB7XG4gICAgICAgICAgICBtb20uX2Quc2V0VGltZSgrbW9tLl9kICsgbWlsbGlzZWNvbmRzICogaXNBZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXlzKSB7XG4gICAgICAgICAgICBnZXRfc2V0X19zZXQobW9tLCAnRGF0ZScsIGdldF9zZXRfX2dldChtb20sICdEYXRlJykgKyBkYXlzICogaXNBZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtb250aHMpIHtcbiAgICAgICAgICAgIHNldE1vbnRoKG1vbSwgZ2V0X3NldF9fZ2V0KG1vbSwgJ01vbnRoJykgKyBtb250aHMgKiBpc0FkZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZU9mZnNldCkge1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldChtb20sIGRheXMgfHwgbW9udGhzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhZGRfc3VidHJhY3RfX2FkZCAgICAgID0gY3JlYXRlQWRkZXIoMSwgJ2FkZCcpO1xuICAgIHZhciBhZGRfc3VidHJhY3RfX3N1YnRyYWN0ID0gY3JlYXRlQWRkZXIoLTEsICdzdWJ0cmFjdCcpO1xuXG4gICAgZnVuY3Rpb24gbW9tZW50X2NhbGVuZGFyX19jYWxlbmRhciAodGltZSwgZm9ybWF0cykge1xuICAgICAgICAvLyBXZSB3YW50IHRvIGNvbXBhcmUgdGhlIHN0YXJ0IG9mIHRvZGF5LCB2cyB0aGlzLlxuICAgICAgICAvLyBHZXR0aW5nIHN0YXJ0LW9mLXRvZGF5IGRlcGVuZHMgb24gd2hldGhlciB3ZSdyZSBsb2NhbC91dGMvb2Zmc2V0IG9yIG5vdC5cbiAgICAgICAgdmFyIG5vdyA9IHRpbWUgfHwgbG9jYWxfX2NyZWF0ZUxvY2FsKCksXG4gICAgICAgICAgICBzb2QgPSBjbG9uZVdpdGhPZmZzZXQobm93LCB0aGlzKS5zdGFydE9mKCdkYXknKSxcbiAgICAgICAgICAgIGRpZmYgPSB0aGlzLmRpZmYoc29kLCAnZGF5cycsIHRydWUpLFxuICAgICAgICAgICAgZm9ybWF0ID0gZGlmZiA8IC02ID8gJ3NhbWVFbHNlJyA6XG4gICAgICAgICAgICAgICAgZGlmZiA8IC0xID8gJ2xhc3RXZWVrJyA6XG4gICAgICAgICAgICAgICAgZGlmZiA8IDAgPyAnbGFzdERheScgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCAxID8gJ3NhbWVEYXknIDpcbiAgICAgICAgICAgICAgICBkaWZmIDwgMiA/ICduZXh0RGF5JyA6XG4gICAgICAgICAgICAgICAgZGlmZiA8IDcgPyAnbmV4dFdlZWsnIDogJ3NhbWVFbHNlJztcblxuICAgICAgICB2YXIgb3V0cHV0ID0gZm9ybWF0cyAmJiAoaXNGdW5jdGlvbihmb3JtYXRzW2Zvcm1hdF0pID8gZm9ybWF0c1tmb3JtYXRdKCkgOiBmb3JtYXRzW2Zvcm1hdF0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdChvdXRwdXQgfHwgdGhpcy5sb2NhbGVEYXRhKCkuY2FsZW5kYXIoZm9ybWF0LCB0aGlzLCBsb2NhbF9fY3JlYXRlTG9jYWwobm93KSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb25lICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb21lbnQodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBZnRlciAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKCFpc1VuZGVmaW5lZCh1bml0cykgPyB1bml0cyA6ICdtaWxsaXNlY29uZCcpO1xuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgIHJldHVybiArdGhpcyA+ICtsb2NhbElucHV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICtsb2NhbElucHV0IDwgK3RoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQmVmb3JlIChpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgdmFyIGxvY2FsSW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHMoIWlzVW5kZWZpbmVkKHVuaXRzKSA/IHVuaXRzIDogJ21pbGxpc2Vjb25kJyk7XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgcmV0dXJuICt0aGlzIDwgK2xvY2FsSW5wdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gK3RoaXMuY2xvbmUoKS5lbmRPZih1bml0cykgPCArbG9jYWxJbnB1dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQmV0d2VlbiAoZnJvbSwgdG8sIHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQWZ0ZXIoZnJvbSwgdW5pdHMpICYmIHRoaXMuaXNCZWZvcmUodG8sIHVuaXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NhbWUgKGlucHV0LCB1bml0cykge1xuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KSxcbiAgICAgICAgICAgIGlucHV0TXM7XG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMgfHwgJ21pbGxpc2Vjb25kJyk7XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgcmV0dXJuICt0aGlzID09PSArbG9jYWxJbnB1dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0TXMgPSArbG9jYWxJbnB1dDtcbiAgICAgICAgICAgIHJldHVybiArKHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKSkgPD0gaW5wdXRNcyAmJiBpbnB1dE1zIDw9ICsodGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NhbWVPckFmdGVyIChpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTYW1lKGlucHV0LCB1bml0cykgfHwgdGhpcy5pc0FmdGVyKGlucHV0LHVuaXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NhbWVPckJlZm9yZSAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU2FtZShpbnB1dCwgdW5pdHMpIHx8IHRoaXMuaXNCZWZvcmUoaW5wdXQsdW5pdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpZmYgKGlucHV0LCB1bml0cywgYXNGbG9hdCkge1xuICAgICAgICB2YXIgdGhhdCxcbiAgICAgICAgICAgIHpvbmVEZWx0YSxcbiAgICAgICAgICAgIGRlbHRhLCBvdXRwdXQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQgPSBjbG9uZVdpdGhPZmZzZXQoaW5wdXQsIHRoaXMpO1xuXG4gICAgICAgIGlmICghdGhhdC5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cblxuICAgICAgICB6b25lRGVsdGEgPSAodGhhdC51dGNPZmZzZXQoKSAtIHRoaXMudXRjT2Zmc2V0KCkpICogNmU0O1xuXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3llYXInIHx8IHVuaXRzID09PSAnbW9udGgnIHx8IHVuaXRzID09PSAncXVhcnRlcicpIHtcbiAgICAgICAgICAgIG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KTtcbiAgICAgICAgICAgIGlmICh1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0IC8gMztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodW5pdHMgPT09ICd5ZWFyJykge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCAvIDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsdGEgPSB0aGlzIC0gdGhhdDtcbiAgICAgICAgICAgIG91dHB1dCA9IHVuaXRzID09PSAnc2Vjb25kJyA/IGRlbHRhIC8gMWUzIDogLy8gMTAwMFxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnbWludXRlJyA/IGRlbHRhIC8gNmU0IDogLy8gMTAwMCAqIDYwXG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICdob3VyJyA/IGRlbHRhIC8gMzZlNSA6IC8vIDEwMDAgKiA2MCAqIDYwXG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICdkYXknID8gKGRlbHRhIC0gem9uZURlbHRhKSAvIDg2NGU1IDogLy8gMTAwMCAqIDYwICogNjAgKiAyNCwgbmVnYXRlIGRzdFxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnd2VlaycgPyAoZGVsdGEgLSB6b25lRGVsdGEpIC8gNjA0OGU1IDogLy8gMTAwMCAqIDYwICogNjAgKiAyNCAqIDcsIG5lZ2F0ZSBkc3RcbiAgICAgICAgICAgICAgICBkZWx0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXNGbG9hdCA/IG91dHB1dCA6IGFic0Zsb29yKG91dHB1dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9udGhEaWZmIChhLCBiKSB7XG4gICAgICAgIC8vIGRpZmZlcmVuY2UgaW4gbW9udGhzXG4gICAgICAgIHZhciB3aG9sZU1vbnRoRGlmZiA9ICgoYi55ZWFyKCkgLSBhLnllYXIoKSkgKiAxMikgKyAoYi5tb250aCgpIC0gYS5tb250aCgpKSxcbiAgICAgICAgICAgIC8vIGIgaXMgaW4gKGFuY2hvciAtIDEgbW9udGgsIGFuY2hvciArIDEgbW9udGgpXG4gICAgICAgICAgICBhbmNob3IgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmLCAnbW9udGhzJyksXG4gICAgICAgICAgICBhbmNob3IyLCBhZGp1c3Q7XG5cbiAgICAgICAgaWYgKGIgLSBhbmNob3IgPCAwKSB7XG4gICAgICAgICAgICBhbmNob3IyID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiAtIDEsICdtb250aHMnKTtcbiAgICAgICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXG4gICAgICAgICAgICBhZGp1c3QgPSAoYiAtIGFuY2hvcikgLyAoYW5jaG9yIC0gYW5jaG9yMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmNob3IyID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiArIDEsICdtb250aHMnKTtcbiAgICAgICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXG4gICAgICAgICAgICBhZGp1c3QgPSAoYiAtIGFuY2hvcikgLyAoYW5jaG9yMiAtIGFuY2hvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLSh3aG9sZU1vbnRoRGlmZiArIGFkanVzdCk7XG4gICAgfVxuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmRlZmF1bHRGb3JtYXQgPSAnWVlZWS1NTS1ERFRISDptbTpzc1onO1xuXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmxvY2FsZSgnZW4nKS5mb3JtYXQoJ2RkZCBNTU0gREQgWVlZWSBISDptbTpzcyBbR01UXVpaJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9tZW50X2Zvcm1hdF9fdG9JU09TdHJpbmcgKCkge1xuICAgICAgICB2YXIgbSA9IHRoaXMuY2xvbmUoKS51dGMoKTtcbiAgICAgICAgaWYgKDAgPCBtLnllYXIoKSAmJiBtLnllYXIoKSA8PSA5OTk5KSB7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZykpIHtcbiAgICAgICAgICAgICAgICAvLyBuYXRpdmUgaW1wbGVtZW50YXRpb24gaXMgfjUweCBmYXN0ZXIsIHVzZSBpdCB3aGVuIHdlIGNhblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgJ1lZWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0IChpbnB1dFN0cmluZykge1xuICAgICAgICB2YXIgb3V0cHV0ID0gZm9ybWF0TW9tZW50KHRoaXMsIGlucHV0U3RyaW5nIHx8IHV0aWxzX2hvb2tzX19ob29rcy5kZWZhdWx0Rm9ybWF0KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLnBvc3Rmb3JtYXQob3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcm9tICh0aW1lLCB3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJlxuICAgICAgICAgICAgICAgICgoaXNNb21lbnQodGltZSkgJiYgdGltZS5pc1ZhbGlkKCkpIHx8XG4gICAgICAgICAgICAgICAgIGxvY2FsX19jcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlX19jcmVhdGVEdXJhdGlvbih7dG86IHRoaXMsIGZyb206IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcm9tTm93ICh3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyb20obG9jYWxfX2NyZWF0ZUxvY2FsKCksIHdpdGhvdXRTdWZmaXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvICh0aW1lLCB3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJlxuICAgICAgICAgICAgICAgICgoaXNNb21lbnQodGltZSkgJiYgdGltZS5pc1ZhbGlkKCkpIHx8XG4gICAgICAgICAgICAgICAgIGxvY2FsX19jcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlX19jcmVhdGVEdXJhdGlvbih7ZnJvbTogdGhpcywgdG86IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b05vdyAod2l0aG91dFN1ZmZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy50byhsb2NhbF9fY3JlYXRlTG9jYWwoKSwgd2l0aG91dFN1ZmZpeCk7XG4gICAgfVxuXG4gICAgLy8gSWYgcGFzc2VkIGEgbG9jYWxlIGtleSwgaXQgd2lsbCBzZXQgdGhlIGxvY2FsZSBmb3IgdGhpc1xuICAgIC8vIGluc3RhbmNlLiAgT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgbG9jYWxlIGNvbmZpZ3VyYXRpb25cbiAgICAvLyB2YXJpYWJsZXMgZm9yIHRoaXMgaW5zdGFuY2UuXG4gICAgZnVuY3Rpb24gbG9jYWxlIChrZXkpIHtcbiAgICAgICAgdmFyIG5ld0xvY2FsZURhdGE7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlLl9hYmJyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3TG9jYWxlRGF0YSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIGlmIChuZXdMb2NhbGVEYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbGUgPSBuZXdMb2NhbGVEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGFuZyA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ21vbWVudCgpLmxhbmcoKSBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkLCB1c2UgbW9tZW50KCkubG9jYWxlRGF0YSgpIHRvIGdldCB0aGUgbGFuZ3VhZ2UgY29uZmlndXJhdGlvbi4gVXNlIG1vbWVudCgpLmxvY2FsZSgpIHRvIGNoYW5nZSBsYW5ndWFnZXMuJyxcbiAgICAgICAgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVEYXRhICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydE9mICh1bml0cykge1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgLy8gdGhlIGZvbGxvd2luZyBzd2l0Y2ggaW50ZW50aW9uYWxseSBvbWl0cyBicmVhayBrZXl3b3Jkc1xuICAgICAgICAvLyB0byB1dGlsaXplIGZhbGxpbmcgdGhyb3VnaCB0aGUgY2FzZXMuXG4gICAgICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICB0aGlzLm1vbnRoKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdxdWFydGVyJzpcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgdGhpcy5kYXRlKDEpO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgY2FzZSAnaXNvV2Vlayc6XG4gICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICB0aGlzLmhvdXJzKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgIHRoaXMubWludXRlcygwKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kcygwKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgIHRoaXMubWlsbGlzZWNvbmRzKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2Vla3MgYXJlIGEgc3BlY2lhbCBjYXNlXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3dlZWsnKSB7XG4gICAgICAgICAgICB0aGlzLndlZWtkYXkoMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVuaXRzID09PSAnaXNvV2VlaycpIHtcbiAgICAgICAgICAgIHRoaXMuaXNvV2Vla2RheSgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHF1YXJ0ZXJzIGFyZSBhbHNvIHNwZWNpYWxcbiAgICAgICAgaWYgKHVuaXRzID09PSAncXVhcnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMubW9udGgoTWF0aC5mbG9vcih0aGlzLm1vbnRoKCkgLyAzKSAqIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kT2YgKHVuaXRzKSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICBpZiAodW5pdHMgPT09IHVuZGVmaW5lZCB8fCB1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRPZih1bml0cykuYWRkKDEsICh1bml0cyA9PT0gJ2lzb1dlZWsnID8gJ3dlZWsnIDogdW5pdHMpKS5zdWJ0cmFjdCgxLCAnbXMnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b190eXBlX192YWx1ZU9mICgpIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLl9kIC0gKCh0aGlzLl9vZmZzZXQgfHwgMCkgKiA2MDAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5peCAoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCt0aGlzIC8gMTAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9EYXRlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldCA/IG5ldyBEYXRlKCt0aGlzKSA6IHRoaXMuX2Q7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9BcnJheSAoKSB7XG4gICAgICAgIHZhciBtID0gdGhpcztcbiAgICAgICAgcmV0dXJuIFttLnllYXIoKSwgbS5tb250aCgpLCBtLmRhdGUoKSwgbS5ob3VyKCksIG0ubWludXRlKCksIG0uc2Vjb25kKCksIG0ubWlsbGlzZWNvbmQoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9PYmplY3QgKCkge1xuICAgICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyczogbS55ZWFyKCksXG4gICAgICAgICAgICBtb250aHM6IG0ubW9udGgoKSxcbiAgICAgICAgICAgIGRhdGU6IG0uZGF0ZSgpLFxuICAgICAgICAgICAgaG91cnM6IG0uaG91cnMoKSxcbiAgICAgICAgICAgIG1pbnV0ZXM6IG0ubWludXRlcygpLFxuICAgICAgICAgICAgc2Vjb25kczogbS5zZWNvbmRzKCksXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IG0ubWlsbGlzZWNvbmRzKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0pTT04gKCkge1xuICAgICAgICAvLyBKU09OLnN0cmluZ2lmeShuZXcgRGF0ZShOYU4pKSA9PT0gJ251bGwnXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMudG9JU09TdHJpbmcoKSA6ICdudWxsJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb21lbnRfdmFsaWRfX2lzVmFsaWQgKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRfX2lzVmFsaWQodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2luZ0ZsYWdzICgpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZCh7fSwgZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnZhbGlkQXQgKCkge1xuICAgICAgICByZXR1cm4gZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpLm92ZXJmbG93O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0aW9uRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLl9pLFxuICAgICAgICAgICAgZm9ybWF0OiB0aGlzLl9mLFxuICAgICAgICAgICAgbG9jYWxlOiB0aGlzLl9sb2NhbGUsXG4gICAgICAgICAgICBpc1VUQzogdGhpcy5faXNVVEMsXG4gICAgICAgICAgICBzdHJpY3Q6IHRoaXMuX3N0cmljdFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnZ2cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53ZWVrWWVhcigpICUgMTAwO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydHRycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWtZZWFyKCkgJSAxMDA7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBhZGRXZWVrWWVhckZvcm1hdFRva2VuICh0b2tlbiwgZ2V0dGVyKSB7XG4gICAgICAgIGFkZEZvcm1hdFRva2VuKDAsIFt0b2tlbiwgdG9rZW4ubGVuZ3RoXSwgMCwgZ2V0dGVyKTtcbiAgICB9XG5cbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnJywgICAgICd3ZWVrWWVhcicpO1xuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2dnJywgICAgJ3dlZWtZZWFyJyk7XG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHRycsICAnaXNvV2Vla1llYXInKTtcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdHR0dHRycsICdpc29XZWVrWWVhcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrWWVhcicsICdnZycpO1xuICAgIGFkZFVuaXRBbGlhcygnaXNvV2Vla1llYXInLCAnR0cnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0cnLCAgICAgIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdnJywgICAgICBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignR0cnLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdHR0dHJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XG4gICAgYWRkUmVnZXhUb2tlbignZ2dnZycsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0dHJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcbiAgICBhZGRSZWdleFRva2VuKCdnZ2dnZycsICBtYXRjaDF0bzYsIG1hdGNoNik7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2dnZ2cnLCAnZ2dnZ2cnLCAnR0dHRycsICdHR0dHRyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbi5zdWJzdHIoMCwgMildID0gdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydnZycsICdHRyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbl0gPSB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0V2Vla1llYXIgKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKHRoaXMsXG4gICAgICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrKCksXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5KCksXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG93LFxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRveSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPV2Vla1llYXIgKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKHRoaXMsXG4gICAgICAgICAgICAgICAgaW5wdXQsIHRoaXMuaXNvV2VlaygpLCB0aGlzLmlzb1dlZWtkYXkoKSwgMSwgNCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SVNPV2Vla3NJblllYXIgKCkge1xuICAgICAgICByZXR1cm4gd2Vla3NJblllYXIodGhpcy55ZWFyKCksIDEsIDQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdlZWtzSW5ZZWFyICgpIHtcbiAgICAgICAgdmFyIHdlZWtJbmZvID0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWs7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgd2Vla0luZm8uZG93LCB3ZWVrSW5mby5kb3kpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWtZZWFySGVscGVyKGlucHV0LCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgICAgICB2YXIgd2Vla3NUYXJnZXQ7XG4gICAgICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gd2Vla09mWWVhcih0aGlzLCBkb3csIGRveSkueWVhcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlZWtzVGFyZ2V0ID0gd2Vla3NJblllYXIoaW5wdXQsIGRvdywgZG95KTtcbiAgICAgICAgICAgIGlmICh3ZWVrID4gd2Vla3NUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICB3ZWVrID0gd2Vla3NUYXJnZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2V0V2Vla0FsbC5jYWxsKHRoaXMsIGlucHV0LCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRXZWVrQWxsKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgICAgICB2YXIgZGF5T2ZZZWFyRGF0YSA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpLFxuICAgICAgICAgICAgZGF0ZSA9IGNyZWF0ZVVUQ0RhdGUoZGF5T2ZZZWFyRGF0YS55ZWFyLCAwLCBkYXlPZlllYXJEYXRhLmRheU9mWWVhcik7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJnb3RcIiwgd2Vla1llYXIsIHdlZWssIHdlZWtkYXksIFwic2V0XCIsIGRhdGUudG9JU09TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMueWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkpO1xuICAgICAgICB0aGlzLm1vbnRoKGRhdGUuZ2V0VVRDTW9udGgoKSk7XG4gICAgICAgIHRoaXMuZGF0ZShkYXRlLmdldFVUQ0RhdGUoKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdRJywgMCwgJ1FvJywgJ3F1YXJ0ZXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygncXVhcnRlcicsICdRJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdRJywgbWF0Y2gxKTtcbiAgICBhZGRQYXJzZVRva2VuKCdRJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtNT05USF0gPSAodG9JbnQoaW5wdXQpIC0gMSkgKiAzO1xuICAgIH0pO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0UXVhcnRlciAoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyBNYXRoLmNlaWwoKHRoaXMubW9udGgoKSArIDEpIC8gMykgOiB0aGlzLm1vbnRoKChpbnB1dCAtIDEpICogMyArIHRoaXMubW9udGgoKSAlIDMpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCd3JywgWyd3dycsIDJdLCAnd28nLCAnd2VlaycpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdXJywgWydXVycsIDJdLCAnV28nLCAnaXNvV2VlaycpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrJywgJ3cnKTtcbiAgICBhZGRVbml0QWxpYXMoJ2lzb1dlZWsnLCAnVycpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigndycsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3d3JywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1cnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdXVycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsndycsICd3dycsICdXJywgJ1dXJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAxKV0gPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICAvLyBMT0NBTEVTXG5cbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrIChtb20pIHtcbiAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIobW9tLCB0aGlzLl93ZWVrLmRvdywgdGhpcy5fd2Vlay5kb3kpLndlZWs7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrID0ge1xuICAgICAgICBkb3cgOiAwLCAvLyBTdW5kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICAgICAgZG95IDogNiAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gMXN0IGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mV2VlayAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRvdztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mWWVhciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRveTtcbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrIChpbnB1dCkge1xuICAgICAgICB2YXIgd2VlayA9IHRoaXMubG9jYWxlRGF0YSgpLndlZWsodGhpcyk7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2VlayA6IHRoaXMuYWRkKChpbnB1dCAtIHdlZWspICogNywgJ2QnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRJU09XZWVrIChpbnB1dCkge1xuICAgICAgICB2YXIgd2VlayA9IHdlZWtPZlllYXIodGhpcywgMSwgNCkud2VlaztcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdEJywgWydERCcsIDJdLCAnRG8nLCAnZGF0ZScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXRlJywgJ0QnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0QnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdERCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdEbycsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBpc1N0cmljdCA/IGxvY2FsZS5fb3JkaW5hbFBhcnNlIDogbG9jYWxlLl9vcmRpbmFsUGFyc2VMZW5pZW50O1xuICAgIH0pO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ0QnLCAnREQnXSwgREFURSk7XG4gICAgYWRkUGFyc2VUb2tlbignRG8nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W0RBVEVdID0gdG9JbnQoaW5wdXQubWF0Y2gobWF0Y2gxdG8yKVswXSwgMTApO1xuICAgIH0pO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldERheU9mTW9udGggPSBtYWtlR2V0U2V0KCdEYXRlJywgdHJ1ZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignZCcsIDAsICdkbycsICdkYXknKTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzTWluKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZGRkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNTaG9ydCh0aGlzLCBmb3JtYXQpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5cyh0aGlzLCBmb3JtYXQpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2UnLCAwLCAwLCAnd2Vla2RheScpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdFJywgMCwgMCwgJ2lzb1dlZWtkYXknKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnZGF5JywgJ2QnKTtcbiAgICBhZGRVbml0QWxpYXMoJ3dlZWtkYXknLCAnZScpO1xuICAgIGFkZFVuaXRBbGlhcygnaXNvV2Vla2RheScsICdFJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdkJywgICAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdlJywgICAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdFJywgICAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdkZCcsICAgbWF0Y2hXb3JkKTtcbiAgICBhZGRSZWdleFRva2VuKCdkZGQnLCAgbWF0Y2hXb3JkKTtcbiAgICBhZGRSZWdleFRva2VuKCdkZGRkJywgbWF0Y2hXb3JkKTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZGQnLCAnZGRkJywgJ2RkZGQnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHZhciB3ZWVrZGF5ID0gY29uZmlnLl9sb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCwgdG9rZW4sIGNvbmZpZy5fc3RyaWN0KTtcbiAgICAgICAgLy8gaWYgd2UgZGlkbid0IGdldCBhIHdlZWtkYXkgbmFtZSwgbWFyayB0aGUgZGF0ZSBhcyBpbnZhbGlkXG4gICAgICAgIGlmICh3ZWVrZGF5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHdlZWsuZCA9IHdlZWtkYXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkV2Vla2RheSA9IGlucHV0O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2QnLCAnZScsICdFJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB3ZWVrW3Rva2VuXSA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIGZ1bmN0aW9uIHBhcnNlV2Vla2RheShpbnB1dCwgbG9jYWxlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzTmFOKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGlucHV0LCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpbnB1dCA9IGxvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0KTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIExPQ0FMRVNcblxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXMgPSAnU3VuZGF5X01vbmRheV9UdWVzZGF5X1dlZG5lc2RheV9UaHVyc2RheV9GcmlkYXlfU2F0dXJkYXknLnNwbGl0KCdfJyk7XG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXMgKG0sIGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl93ZWVrZGF5cykgPyB0aGlzLl93ZWVrZGF5c1ttLmRheSgpXSA6XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1t0aGlzLl93ZWVrZGF5cy5pc0Zvcm1hdC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ11bbS5kYXkoKV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0ID0gJ1N1bl9Nb25fVHVlX1dlZF9UaHVfRnJpX1NhdCcuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c1Nob3J0IChtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0W20uZGF5KCldO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW4gPSAnU3VfTW9fVHVfV2VfVGhfRnJfU2EnLnNwbGl0KCdfJyk7XG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNNaW4gKG0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluW20uZGF5KCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzUGFyc2UgKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuXG4gICAgICAgICAgICBtb20gPSBsb2NhbF9fY3JlYXRlTG9jYWwoWzIwMDAsIDFdKS5kYXkoaSk7XG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFwuPycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFwuPycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJykucmVwbGFjZSgnLicsICdcXC4/JykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgICAgICByZWdleCA9ICdeJyArIHRoaXMud2Vla2RheXMobW9tLCAnJykgKyAnfF4nICsgdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpICsgJ3xeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkZGQnICYmIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZGQnICYmIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGQnICYmIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXREYXlPZldlZWsgKGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF5ID0gdGhpcy5faXNVVEMgPyB0aGlzLl9kLmdldFVUQ0RheSgpIDogdGhpcy5fZC5nZXREYXkoKTtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlucHV0ID0gcGFyc2VXZWVrZGF5KGlucHV0LCB0aGlzLmxvY2FsZURhdGEoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGQoaW5wdXQgLSBkYXksICdkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGF5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0TG9jYWxlRGF5T2ZXZWVrIChpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdlZWtkYXkgPSAodGhpcy5kYXkoKSArIDcgLSB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3cpICUgNztcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrZGF5IDogdGhpcy5hZGQoaW5wdXQgLSB3ZWVrZGF5LCAnZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT0RheU9mV2VlayAoaW5wdXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xuICAgICAgICB9XG4gICAgICAgIC8vIGJlaGF2ZXMgdGhlIHNhbWUgYXMgbW9tZW50I2RheSBleGNlcHRcbiAgICAgICAgLy8gYXMgYSBnZXR0ZXIsIHJldHVybnMgNyBpbnN0ZWFkIG9mIDAgKDEtNyByYW5nZSBpbnN0ZWFkIG9mIDAtNilcbiAgICAgICAgLy8gYXMgYSBzZXR0ZXIsIHN1bmRheSBzaG91bGQgYmVsb25nIHRvIHRoZSBwcmV2aW91cyB3ZWVrLlxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHRoaXMuZGF5KCkgfHwgNyA6IHRoaXMuZGF5KHRoaXMuZGF5KCkgJSA3ID8gaW5wdXQgOiBpbnB1dCAtIDcpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdEREQnLCBbJ0REREQnLCAzXSwgJ0RERG8nLCAnZGF5T2ZZZWFyJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2RheU9mWWVhcicsICdEREQnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0RERCcsICBtYXRjaDF0bzMpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0REREQnLCBtYXRjaDMpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydEREQnLCAnRERERCddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9kYXlPZlllYXIgPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXREYXlPZlllYXIgKGlucHV0KSB7XG4gICAgICAgIHZhciBkYXlPZlllYXIgPSBNYXRoLnJvdW5kKCh0aGlzLmNsb25lKCkuc3RhcnRPZignZGF5JykgLSB0aGlzLmNsb25lKCkuc3RhcnRPZigneWVhcicpKSAvIDg2NGU1KSArIDE7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gZGF5T2ZZZWFyIDogdGhpcy5hZGQoKGlucHV0IC0gZGF5T2ZZZWFyKSwgJ2QnKTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBmdW5jdGlvbiBoRm9ybWF0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ob3VycygpICUgMTIgfHwgMTI7XG4gICAgfVxuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0gnLCBbJ0hIJywgMl0sIDAsICdob3VyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ2gnLCBbJ2hoJywgMl0sIDAsIGhGb3JtYXQpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2htbScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnICsgaEZvcm1hdC5hcHBseSh0aGlzKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdobW1zcycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnICsgaEZvcm1hdC5hcHBseSh0aGlzKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKSArXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLnNlY29uZHMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJycgKyB0aGlzLmhvdXJzKCkgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJyArIHRoaXMuaG91cnMoKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKSArXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLnNlY29uZHMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBtZXJpZGllbSAodG9rZW4sIGxvd2VyY2FzZSkge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1lcmlkaWVtKHRoaXMuaG91cnMoKSwgdGhpcy5taW51dGVzKCksIGxvd2VyY2FzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1lcmlkaWVtKCdhJywgdHJ1ZSk7XG4gICAgbWVyaWRpZW0oJ0EnLCBmYWxzZSk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2hvdXInLCAnaCcpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgZnVuY3Rpb24gbWF0Y2hNZXJpZGllbSAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLl9tZXJpZGllbVBhcnNlO1xuICAgIH1cblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2EnLCAgbWF0Y2hNZXJpZGllbSk7XG4gICAgYWRkUmVnZXhUb2tlbignQScsICBtYXRjaE1lcmlkaWVtKTtcbiAgICBhZGRSZWdleFRva2VuKCdIJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignaCcsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0hIJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2hoJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuXG4gICAgYWRkUmVnZXhUb2tlbignaG1tJywgbWF0Y2gzdG80KTtcbiAgICBhZGRSZWdleFRva2VuKCdobW1zcycsIG1hdGNoNXRvNik7XG4gICAgYWRkUmVnZXhUb2tlbignSG1tJywgbWF0Y2gzdG80KTtcbiAgICBhZGRSZWdleFRva2VuKCdIbW1zcycsIG1hdGNoNXRvNik7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnSCcsICdISCddLCBIT1VSKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnYScsICdBJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2lzUG0gPSBjb25maWcuX2xvY2FsZS5pc1BNKGlucHV0KTtcbiAgICAgICAgY29uZmlnLl9tZXJpZGllbSA9IGlucHV0O1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oWydoJywgJ2hoJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignaG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignaG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvczEgPSBpbnB1dC5sZW5ndGggLSA0O1xuICAgICAgICB2YXIgcG9zMiA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MxLCAyKSk7XG4gICAgICAgIGFycmF5W1NFQ09ORF0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMikpO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdIbW0nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvcykpO1xuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvcykpO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ0htbXNzJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MxID0gaW5wdXQubGVuZ3RoIC0gNDtcbiAgICAgICAgdmFyIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MxKSk7XG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMSwgMikpO1xuICAgICAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIGZ1bmN0aW9uIGxvY2FsZUlzUE0gKGlucHV0KSB7XG4gICAgICAgIC8vIElFOCBRdWlya3MgTW9kZSAmIElFNyBTdGFuZGFyZHMgTW9kZSBkbyBub3QgYWxsb3cgYWNjZXNzaW5nIHN0cmluZ3MgbGlrZSBhcnJheXNcbiAgICAgICAgLy8gVXNpbmcgY2hhckF0IHNob3VsZCBiZSBtb3JlIGNvbXBhdGlibGUuXG4gICAgICAgIHJldHVybiAoKGlucHV0ICsgJycpLnRvTG93ZXJDYXNlKCkuY2hhckF0KDApID09PSAncCcpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZSA9IC9bYXBdXFwuP20/XFwuPy9pO1xuICAgIGZ1bmN0aW9uIGxvY2FsZU1lcmlkaWVtIChob3VycywgbWludXRlcywgaXNMb3dlcikge1xuICAgICAgICBpZiAoaG91cnMgPiAxMSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAncG0nIDogJ1BNJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ2FtJyA6ICdBTSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIC8vIFNldHRpbmcgdGhlIGhvdXIgc2hvdWxkIGtlZXAgdGhlIHRpbWUsIGJlY2F1c2UgdGhlIHVzZXIgZXhwbGljaXRseVxuICAgIC8vIHNwZWNpZmllZCB3aGljaCBob3VyIGhlIHdhbnRzLiBTbyB0cnlpbmcgdG8gbWFpbnRhaW4gdGhlIHNhbWUgaG91ciAoaW5cbiAgICAvLyBhIG5ldyB0aW1lem9uZSkgbWFrZXMgc2Vuc2UuIEFkZGluZy9zdWJ0cmFjdGluZyBob3VycyBkb2VzIG5vdCBmb2xsb3dcbiAgICAvLyB0aGlzIHJ1bGUuXG4gICAgdmFyIGdldFNldEhvdXIgPSBtYWtlR2V0U2V0KCdIb3VycycsIHRydWUpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ20nLCBbJ21tJywgMl0sIDAsICdtaW51dGUnKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnbWludXRlJywgJ20nKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ20nLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdtbScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnbScsICdtbSddLCBNSU5VVEUpO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldE1pbnV0ZSA9IG1ha2VHZXRTZXQoJ01pbnV0ZXMnLCBmYWxzZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigncycsIFsnc3MnLCAyXSwgMCwgJ3NlY29uZCcpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdzZWNvbmQnLCAncycpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigncycsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3NzJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydzJywgJ3NzJ10sIFNFQ09ORCk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0U2Vjb25kID0gbWFrZUdldFNldCgnU2Vjb25kcycsIGZhbHNlKTtcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdTJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gfn4odGhpcy5taWxsaXNlY29uZCgpIC8gMTAwKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1MnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gfn4odGhpcy5taWxsaXNlY29uZCgpIC8gMTApO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1MnLCAzXSwgMCwgJ21pbGxpc2Vjb25kJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTJywgNF0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwO1xuICAgIH0pO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1MnLCA1XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwO1xuICAgIH0pO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTJywgNl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTJywgN10sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwO1xuICAgIH0pO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTU1MnLCA4XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDAwO1xuICAgIH0pO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTU1NTJywgOV0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwMDA7XG4gICAgfSk7XG5cblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnbWlsbGlzZWNvbmQnLCAnbXMnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1MnLCAgICBtYXRjaDF0bzMsIG1hdGNoMSk7XG4gICAgYWRkUmVnZXhUb2tlbignU1MnLCAgIG1hdGNoMXRvMywgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdTU1MnLCAgbWF0Y2gxdG8zLCBtYXRjaDMpO1xuXG4gICAgdmFyIHRva2VuO1xuICAgIGZvciAodG9rZW4gPSAnU1NTUyc7IHRva2VuLmxlbmd0aCA8PSA5OyB0b2tlbiArPSAnUycpIHtcbiAgICAgICAgYWRkUmVnZXhUb2tlbih0b2tlbiwgbWF0Y2hVbnNpZ25lZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNcyhpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTUlMTElTRUNPTkRdID0gdG9JbnQoKCcwLicgKyBpbnB1dCkgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBmb3IgKHRva2VuID0gJ1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XG4gICAgICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIHBhcnNlTXMpO1xuICAgIH1cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0TWlsbGlzZWNvbmQgPSBtYWtlR2V0U2V0KCdNaWxsaXNlY29uZHMnLCBmYWxzZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigneicsICAwLCAwLCAnem9uZUFiYnInKTtcbiAgICBhZGRGb3JtYXRUb2tlbignenonLCAwLCAwLCAnem9uZU5hbWUnKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFpvbmVBYmJyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ1VUQycgOiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRab25lTmFtZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/ICdDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZScgOiAnJztcbiAgICB9XG5cbiAgICB2YXIgbW9tZW50UHJvdG90eXBlX19wcm90byA9IE1vbWVudC5wcm90b3R5cGU7XG5cbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmFkZCAgICAgICAgICAgICAgID0gYWRkX3N1YnRyYWN0X19hZGQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5jYWxlbmRhciAgICAgICAgICA9IG1vbWVudF9jYWxlbmRhcl9fY2FsZW5kYXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5jbG9uZSAgICAgICAgICAgICA9IGNsb25lO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGlmZiAgICAgICAgICAgICAgPSBkaWZmO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZW5kT2YgICAgICAgICAgICAgPSBlbmRPZjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmZvcm1hdCAgICAgICAgICAgID0gZm9ybWF0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZnJvbSAgICAgICAgICAgICAgPSBmcm9tO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZnJvbU5vdyAgICAgICAgICAgPSBmcm9tTm93O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG8gICAgICAgICAgICAgICAgPSB0bztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvTm93ICAgICAgICAgICAgID0gdG9Ob3c7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5nZXQgICAgICAgICAgICAgICA9IGdldFNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmludmFsaWRBdCAgICAgICAgID0gaW52YWxpZEF0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNBZnRlciAgICAgICAgICAgPSBpc0FmdGVyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNCZWZvcmUgICAgICAgICAgPSBpc0JlZm9yZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzQmV0d2VlbiAgICAgICAgID0gaXNCZXR3ZWVuO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNTYW1lICAgICAgICAgICAgPSBpc1NhbWU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1NhbWVPckFmdGVyICAgICA9IGlzU2FtZU9yQWZ0ZXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1NhbWVPckJlZm9yZSAgICA9IGlzU2FtZU9yQmVmb3JlO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNWYWxpZCAgICAgICAgICAgPSBtb21lbnRfdmFsaWRfX2lzVmFsaWQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sYW5nICAgICAgICAgICAgICA9IGxhbmc7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sb2NhbGUgICAgICAgICAgICA9IGxvY2FsZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmxvY2FsZURhdGEgICAgICAgID0gbG9jYWxlRGF0YTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1heCAgICAgICAgICAgICAgID0gcHJvdG90eXBlTWF4O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWluICAgICAgICAgICAgICAgPSBwcm90b3R5cGVNaW47XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5wYXJzaW5nRmxhZ3MgICAgICA9IHBhcnNpbmdGbGFncztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnNldCAgICAgICAgICAgICAgID0gZ2V0U2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc3RhcnRPZiAgICAgICAgICAgPSBzdGFydE9mO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc3VidHJhY3QgICAgICAgICAgPSBhZGRfc3VidHJhY3RfX3N1YnRyYWN0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9BcnJheSAgICAgICAgICAgPSB0b0FycmF5O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9PYmplY3QgICAgICAgICAgPSB0b09iamVjdDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvRGF0ZSAgICAgICAgICAgID0gdG9EYXRlO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9JU09TdHJpbmcgICAgICAgPSBtb21lbnRfZm9ybWF0X190b0lTT1N0cmluZztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvSlNPTiAgICAgICAgICAgID0gdG9KU09OO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9TdHJpbmcgICAgICAgICAgPSB0b1N0cmluZztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnVuaXggICAgICAgICAgICAgID0gdW5peDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnZhbHVlT2YgICAgICAgICAgID0gdG9fdHlwZV9fdmFsdWVPZjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmNyZWF0aW9uRGF0YSAgICAgID0gY3JlYXRpb25EYXRhO1xuXG4gICAgLy8gWWVhclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ueWVhciAgICAgICA9IGdldFNldFllYXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0xlYXBZZWFyID0gZ2V0SXNMZWFwWWVhcjtcblxuICAgIC8vIFdlZWsgWWVhclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla1llYXIgICAgPSBnZXRTZXRXZWVrWWVhcjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtZZWFyID0gZ2V0U2V0SVNPV2Vla1llYXI7XG5cbiAgICAvLyBRdWFydGVyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5xdWFydGVyID0gbW9tZW50UHJvdG90eXBlX19wcm90by5xdWFydGVycyA9IGdldFNldFF1YXJ0ZXI7XG5cbiAgICAvLyBNb250aFxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubW9udGggICAgICAgPSBnZXRTZXRNb250aDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGg7XG5cbiAgICAvLyBXZWVrXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrICAgICAgICAgICA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla3MgICAgICAgID0gZ2V0U2V0V2VlaztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWsgICAgICAgID0gbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrcyAgICAgPSBnZXRTZXRJU09XZWVrO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla3NJblllYXIgICAgPSBnZXRXZWVrc0luWWVhcjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtzSW5ZZWFyID0gZ2V0SVNPV2Vla3NJblllYXI7XG5cbiAgICAvLyBEYXlcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRhdGUgICAgICAgPSBnZXRTZXREYXlPZk1vbnRoO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5ICAgICAgICA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5cyAgICAgICAgICAgICA9IGdldFNldERheU9mV2VlaztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWtkYXkgICAgPSBnZXRTZXRMb2NhbGVEYXlPZldlZWs7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrZGF5ID0gZ2V0U2V0SVNPRGF5T2ZXZWVrO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5T2ZZZWFyICA9IGdldFNldERheU9mWWVhcjtcblxuICAgIC8vIEhvdXJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmhvdXIgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmhvdXJzID0gZ2V0U2V0SG91cjtcblxuICAgIC8vIE1pbnV0ZVxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWludXRlID0gbW9tZW50UHJvdG90eXBlX19wcm90by5taW51dGVzID0gZ2V0U2V0TWludXRlO1xuXG4gICAgLy8gU2Vjb25kXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5zZWNvbmQgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnNlY29uZHMgPSBnZXRTZXRTZWNvbmQ7XG5cbiAgICAvLyBNaWxsaXNlY29uZFxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWlsbGlzZWNvbmQgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbGxpc2Vjb25kcyA9IGdldFNldE1pbGxpc2Vjb25kO1xuXG4gICAgLy8gT2Zmc2V0XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by51dGNPZmZzZXQgICAgICAgICAgICA9IGdldFNldE9mZnNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnV0YyAgICAgICAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9VVEM7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sb2NhbCAgICAgICAgICAgICAgICA9IHNldE9mZnNldFRvTG9jYWw7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5wYXJzZVpvbmUgICAgICAgICAgICA9IHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaGFzQWxpZ25lZEhvdXJPZmZzZXQgPSBoYXNBbGlnbmVkSG91ck9mZnNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzRFNUICAgICAgICAgICAgICAgID0gaXNEYXlsaWdodFNhdmluZ1RpbWU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0RTVFNoaWZ0ZWQgICAgICAgICA9IGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzTG9jYWwgICAgICAgICAgICAgID0gaXNMb2NhbDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVXRjT2Zmc2V0ICAgICAgICAgID0gaXNVdGNPZmZzZXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1V0YyAgICAgICAgICAgICAgICA9IGlzVXRjO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNVVEMgICAgICAgICAgICAgICAgPSBpc1V0YztcblxuICAgIC8vIFRpbWV6b25lXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by56b25lQWJiciA9IGdldFpvbmVBYmJyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uem9uZU5hbWUgPSBnZXRab25lTmFtZTtcblxuICAgIC8vIERlcHJlY2F0aW9uc1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF0ZXMgID0gZGVwcmVjYXRlKCdkYXRlcyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgZGF0ZSBpbnN0ZWFkLicsIGdldFNldERheU9mTW9udGgpO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubW9udGhzID0gZGVwcmVjYXRlKCdtb250aHMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbnRoIGluc3RlYWQnLCBnZXRTZXRNb250aCk7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by55ZWFycyAgPSBkZXByZWNhdGUoJ3llYXJzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSB5ZWFyIGluc3RlYWQnLCBnZXRTZXRZZWFyKTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnpvbmUgICA9IGRlcHJlY2F0ZSgnbW9tZW50KCkuem9uZSBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50KCkudXRjT2Zmc2V0IGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNzc5JywgZ2V0U2V0Wm9uZSk7XG5cbiAgICB2YXIgbW9tZW50UHJvdG90eXBlID0gbW9tZW50UHJvdG90eXBlX19wcm90bztcblxuICAgIGZ1bmN0aW9uIG1vbWVudF9fY3JlYXRlVW5peCAoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCAqIDEwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbWVudF9fY3JlYXRlSW5ab25lICgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpLnBhcnNlWm9uZSgpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0Q2FsZW5kYXIgPSB7XG4gICAgICAgIHNhbWVEYXkgOiAnW1RvZGF5IGF0XSBMVCcsXG4gICAgICAgIG5leHREYXkgOiAnW1RvbW9ycm93IGF0XSBMVCcsXG4gICAgICAgIG5leHRXZWVrIDogJ2RkZGQgW2F0XSBMVCcsXG4gICAgICAgIGxhc3REYXkgOiAnW1llc3RlcmRheSBhdF0gTFQnLFxuICAgICAgICBsYXN0V2VlayA6ICdbTGFzdF0gZGRkZCBbYXRdIExUJyxcbiAgICAgICAgc2FtZUVsc2UgOiAnTCdcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlX2NhbGVuZGFyX19jYWxlbmRhciAoa2V5LCBtb20sIG5vdykge1xuICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5fY2FsZW5kYXJba2V5XTtcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24ob3V0cHV0KSA/IG91dHB1dC5jYWxsKG1vbSwgbm93KSA6IG91dHB1dDtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvbmdEYXRlRm9ybWF0ID0ge1xuICAgICAgICBMVFMgIDogJ2g6bW06c3MgQScsXG4gICAgICAgIExUICAgOiAnaDptbSBBJyxcbiAgICAgICAgTCAgICA6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICAgTEwgICA6ICdNTU1NIEQsIFlZWVknLFxuICAgICAgICBMTEwgIDogJ01NTU0gRCwgWVlZWSBoOm1tIEEnLFxuICAgICAgICBMTExMIDogJ2RkZGQsIE1NTU0gRCwgWVlZWSBoOm1tIEEnXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvbmdEYXRlRm9ybWF0IChrZXkpIHtcbiAgICAgICAgdmFyIGZvcm1hdCA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0sXG4gICAgICAgICAgICBmb3JtYXRVcHBlciA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcblxuICAgICAgICBpZiAoZm9ybWF0IHx8ICFmb3JtYXRVcHBlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0gPSBmb3JtYXRVcHBlci5yZXBsYWNlKC9NTU1NfE1NfEREfGRkZGQvZywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbC5zbGljZSgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRJbnZhbGlkRGF0ZSA9ICdJbnZhbGlkIGRhdGUnO1xuXG4gICAgZnVuY3Rpb24gaW52YWxpZERhdGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52YWxpZERhdGU7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRPcmRpbmFsID0gJyVkJztcbiAgICB2YXIgZGVmYXVsdE9yZGluYWxQYXJzZSA9IC9cXGR7MSwyfS87XG5cbiAgICBmdW5jdGlvbiBvcmRpbmFsIChudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yZGluYWwucmVwbGFjZSgnJWQnLCBudW1iZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZVBhcnNlUG9zdEZvcm1hdCAoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRSZWxhdGl2ZVRpbWUgPSB7XG4gICAgICAgIGZ1dHVyZSA6ICdpbiAlcycsXG4gICAgICAgIHBhc3QgICA6ICclcyBhZ28nLFxuICAgICAgICBzICA6ICdhIGZldyBzZWNvbmRzJyxcbiAgICAgICAgbSAgOiAnYSBtaW51dGUnLFxuICAgICAgICBtbSA6ICclZCBtaW51dGVzJyxcbiAgICAgICAgaCAgOiAnYW4gaG91cicsXG4gICAgICAgIGhoIDogJyVkIGhvdXJzJyxcbiAgICAgICAgZCAgOiAnYSBkYXknLFxuICAgICAgICBkZCA6ICclZCBkYXlzJyxcbiAgICAgICAgTSAgOiAnYSBtb250aCcsXG4gICAgICAgIE1NIDogJyVkIG1vbnRocycsXG4gICAgICAgIHkgIDogJ2EgeWVhcicsXG4gICAgICAgIHl5IDogJyVkIHllYXJzJ1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZWxhdGl2ZV9fcmVsYXRpdmVUaW1lIChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX3JlbGF0aXZlVGltZVtzdHJpbmddO1xuICAgICAgICByZXR1cm4gKGlzRnVuY3Rpb24ob3V0cHV0KSkgP1xuICAgICAgICAgICAgb3V0cHV0KG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkgOlxuICAgICAgICAgICAgb3V0cHV0LnJlcGxhY2UoLyVkL2ksIG51bWJlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFzdEZ1dHVyZSAoZGlmZiwgb3V0cHV0KSB7XG4gICAgICAgIHZhciBmb3JtYXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbZGlmZiA+IDAgPyAnZnV0dXJlJyA6ICdwYXN0J107XG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKGZvcm1hdCkgPyBmb3JtYXQob3V0cHV0KSA6IGZvcm1hdC5yZXBsYWNlKC8lcy9pLCBvdXRwdXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZV9zZXRfX3NldCAoY29uZmlnKSB7XG4gICAgICAgIHZhciBwcm9wLCBpO1xuICAgICAgICBmb3IgKGkgaW4gY29uZmlnKSB7XG4gICAgICAgICAgICBwcm9wID0gY29uZmlnW2ldO1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocHJvcCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2ldID0gcHJvcDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1snXycgKyBpXSA9IHByb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTGVuaWVudCBvcmRpbmFsIHBhcnNpbmcgYWNjZXB0cyBqdXN0IGEgbnVtYmVyIGluIGFkZGl0aW9uIHRvXG4gICAgICAgIC8vIG51bWJlciArIChwb3NzaWJseSkgc3R1ZmYgY29taW5nIGZyb20gX29yZGluYWxQYXJzZUxlbmllbnQuXG4gICAgICAgIHRoaXMuX29yZGluYWxQYXJzZUxlbmllbnQgPSBuZXcgUmVnRXhwKHRoaXMuX29yZGluYWxQYXJzZS5zb3VyY2UgKyAnfCcgKyAoL1xcZHsxLDJ9Lykuc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvdG90eXBlX19wcm90byA9IExvY2FsZS5wcm90b3R5cGU7XG5cbiAgICBwcm90b3R5cGVfX3Byb3RvLl9jYWxlbmRhciAgICAgICA9IGRlZmF1bHRDYWxlbmRhcjtcbiAgICBwcm90b3R5cGVfX3Byb3RvLmNhbGVuZGFyICAgICAgICA9IGxvY2FsZV9jYWxlbmRhcl9fY2FsZW5kYXI7XG4gICAgcHJvdG90eXBlX19wcm90by5fbG9uZ0RhdGVGb3JtYXQgPSBkZWZhdWx0TG9uZ0RhdGVGb3JtYXQ7XG4gICAgcHJvdG90eXBlX19wcm90by5sb25nRGF0ZUZvcm1hdCAgPSBsb25nRGF0ZUZvcm1hdDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9pbnZhbGlkRGF0ZSAgICA9IGRlZmF1bHRJbnZhbGlkRGF0ZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLmludmFsaWREYXRlICAgICA9IGludmFsaWREYXRlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX29yZGluYWwgICAgICAgID0gZGVmYXVsdE9yZGluYWw7XG4gICAgcHJvdG90eXBlX19wcm90by5vcmRpbmFsICAgICAgICAgPSBvcmRpbmFsO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX29yZGluYWxQYXJzZSAgID0gZGVmYXVsdE9yZGluYWxQYXJzZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLnByZXBhcnNlICAgICAgICA9IHByZVBhcnNlUG9zdEZvcm1hdDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLnBvc3Rmb3JtYXQgICAgICA9IHByZVBhcnNlUG9zdEZvcm1hdDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9yZWxhdGl2ZVRpbWUgICA9IGRlZmF1bHRSZWxhdGl2ZVRpbWU7XG4gICAgcHJvdG90eXBlX19wcm90by5yZWxhdGl2ZVRpbWUgICAgPSByZWxhdGl2ZV9fcmVsYXRpdmVUaW1lO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ucGFzdEZ1dHVyZSAgICAgID0gcGFzdEZ1dHVyZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLnNldCAgICAgICAgICAgICA9IGxvY2FsZV9zZXRfX3NldDtcblxuICAgIC8vIE1vbnRoXG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHMgICAgICAgICAgICA9ICAgICAgICBsb2NhbGVNb250aHM7XG4gICAgcHJvdG90eXBlX19wcm90by5fbW9udGhzICAgICAgICAgICA9IGRlZmF1bHRMb2NhbGVNb250aHM7XG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHNTaG9ydCAgICAgICA9ICAgICAgICBsb2NhbGVNb250aHNTaG9ydDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHNTaG9ydCAgICAgID0gZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzUGFyc2UgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzUGFyc2U7XG4gICAgcHJvdG90eXBlX19wcm90by5fbW9udGhzUmVnZXggICAgICA9IGRlZmF1bHRNb250aHNSZWdleDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRoc1JlZ2V4ICAgICAgID0gbW9udGhzUmVnZXg7XG4gICAgcHJvdG90eXBlX19wcm90by5fbW9udGhzU2hvcnRSZWdleCA9IGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzU2hvcnRSZWdleCAgPSBtb250aHNTaG9ydFJlZ2V4O1xuXG4gICAgLy8gV2Vla1xuICAgIHByb3RvdHlwZV9fcHJvdG8ud2VlayA9IGxvY2FsZVdlZWs7XG4gICAgcHJvdG90eXBlX19wcm90by5fd2VlayA9IGRlZmF1bHRMb2NhbGVXZWVrO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uZmlyc3REYXlPZlllYXIgPSBsb2NhbGVGaXJzdERheU9mWWVhcjtcbiAgICBwcm90b3R5cGVfX3Byb3RvLmZpcnN0RGF5T2ZXZWVrID0gbG9jYWxlRmlyc3REYXlPZldlZWs7XG5cbiAgICAvLyBEYXkgb2YgV2Vla1xuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXMgICAgICAgPSAgICAgICAgbG9jYWxlV2Vla2RheXM7XG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXMgICAgICA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5cztcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzTWluICAgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzTWluO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzTWluICAgPSBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW47XG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c1Nob3J0ICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c1Nob3J0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzU2hvcnQgPSBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzUGFyc2UgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzUGFyc2U7XG5cbiAgICAvLyBIb3Vyc1xuICAgIHByb3RvdHlwZV9fcHJvdG8uaXNQTSA9IGxvY2FsZUlzUE07XG4gICAgcHJvdG90eXBlX19wcm90by5fbWVyaWRpZW1QYXJzZSA9IGRlZmF1bHRMb2NhbGVNZXJpZGllbVBhcnNlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ubWVyaWRpZW0gPSBsb2NhbGVNZXJpZGllbTtcblxuICAgIGZ1bmN0aW9uIGxpc3RzX19nZXQgKGZvcm1hdCwgaW5kZXgsIGZpZWxkLCBzZXR0ZXIpIHtcbiAgICAgICAgdmFyIGxvY2FsZSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoKTtcbiAgICAgICAgdmFyIHV0YyA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQygpLnNldChzZXR0ZXIsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGxvY2FsZVtmaWVsZF0odXRjLCBmb3JtYXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3QgKGZvcm1hdCwgaW5kZXgsIGZpZWxkLCBjb3VudCwgc2V0dGVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG5cbiAgICAgICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0c19fZ2V0KGZvcm1hdCwgaW5kZXgsIGZpZWxkLCBzZXR0ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIG91dFtpXSA9IGxpc3RzX19nZXQoZm9ybWF0LCBpLCBmaWVsZCwgc2V0dGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0TW9udGhzIChmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0KGZvcm1hdCwgaW5kZXgsICdtb250aHMnLCAxMiwgJ21vbnRoJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RNb250aHNTaG9ydCAoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdChmb3JtYXQsIGluZGV4LCAnbW9udGhzU2hvcnQnLCAxMiwgJ21vbnRoJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RXZWVrZGF5cyAoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdChmb3JtYXQsIGluZGV4LCAnd2Vla2RheXMnLCA3LCAnZGF5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RXZWVrZGF5c1Nob3J0IChmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0KGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c1Nob3J0JywgNywgJ2RheScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0V2Vla2RheXNNaW4gKGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QoZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzTWluJywgNywgJ2RheScpO1xuICAgIH1cblxuICAgIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUoJ2VuJywge1xuICAgICAgICBvcmRpbmFsUGFyc2U6IC9cXGR7MSwyfSh0aHxzdHxuZHxyZCkvLFxuICAgICAgICBvcmRpbmFsIDogZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICAgICAgdmFyIGIgPSBudW1iZXIgJSAxMCxcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAodG9JbnQobnVtYmVyICUgMTAwIC8gMTApID09PSAxKSA/ICd0aCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAxKSA/ICdzdCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAyKSA/ICduZCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAzKSA/ICdyZCcgOiAndGgnO1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlciArIG91dHB1dDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sYW5nID0gZGVwcmVjYXRlKCdtb21lbnQubGFuZyBpcyBkZXByZWNhdGVkLiBVc2UgbW9tZW50LmxvY2FsZSBpbnN0ZWFkLicsIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUpO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sYW5nRGF0YSA9IGRlcHJlY2F0ZSgnbW9tZW50LmxhbmdEYXRhIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb21lbnQubG9jYWxlRGF0YSBpbnN0ZWFkLicsIGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUpO1xuXG4gICAgdmFyIG1hdGhBYnMgPSBNYXRoLmFicztcblxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2Fic19fYWJzICgpIHtcbiAgICAgICAgdmFyIGRhdGEgICAgICAgICAgID0gdGhpcy5fZGF0YTtcblxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgPSBtYXRoQWJzKHRoaXMuX21pbGxpc2Vjb25kcyk7XG4gICAgICAgIHRoaXMuX2RheXMgICAgICAgICA9IG1hdGhBYnModGhpcy5fZGF5cyk7XG4gICAgICAgIHRoaXMuX21vbnRocyAgICAgICA9IG1hdGhBYnModGhpcy5fbW9udGhzKTtcblxuICAgICAgICBkYXRhLm1pbGxpc2Vjb25kcyAgPSBtYXRoQWJzKGRhdGEubWlsbGlzZWNvbmRzKTtcbiAgICAgICAgZGF0YS5zZWNvbmRzICAgICAgID0gbWF0aEFicyhkYXRhLnNlY29uZHMpO1xuICAgICAgICBkYXRhLm1pbnV0ZXMgICAgICAgPSBtYXRoQWJzKGRhdGEubWludXRlcyk7XG4gICAgICAgIGRhdGEuaG91cnMgICAgICAgICA9IG1hdGhBYnMoZGF0YS5ob3Vycyk7XG4gICAgICAgIGRhdGEubW9udGhzICAgICAgICA9IG1hdGhBYnMoZGF0YS5tb250aHMpO1xuICAgICAgICBkYXRhLnllYXJzICAgICAgICAgPSBtYXRoQWJzKGRhdGEueWVhcnMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QgKGR1cmF0aW9uLCBpbnB1dCwgdmFsdWUsIGRpcmVjdGlvbikge1xuICAgICAgICB2YXIgb3RoZXIgPSBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKGlucHV0LCB2YWx1ZSk7XG5cbiAgICAgICAgZHVyYXRpb24uX21pbGxpc2Vjb25kcyArPSBkaXJlY3Rpb24gKiBvdGhlci5fbWlsbGlzZWNvbmRzO1xuICAgICAgICBkdXJhdGlvbi5fZGF5cyAgICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9kYXlzO1xuICAgICAgICBkdXJhdGlvbi5fbW9udGhzICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9tb250aHM7XG5cbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uLl9idWJibGUoKTtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBhZGQoMSwgJ3MnKSBvciBhZGQoZHVyYXRpb24pXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGQgKGlucHV0LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBpbnB1dCwgdmFsdWUsIDEpO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnRzIG9ubHkgMi4wLXN0eWxlIHN1YnRyYWN0KDEsICdzJykgb3Igc3VidHJhY3QoZHVyYXRpb24pXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19zdWJ0cmFjdCAoaW5wdXQsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGlucHV0LCB2YWx1ZSwgLTEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFic0NlaWwgKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1YmJsZSAoKSB7XG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSB0aGlzLl9taWxsaXNlY29uZHM7XG4gICAgICAgIHZhciBkYXlzICAgICAgICAgPSB0aGlzLl9kYXlzO1xuICAgICAgICB2YXIgbW9udGhzICAgICAgID0gdGhpcy5fbW9udGhzO1xuICAgICAgICB2YXIgZGF0YSAgICAgICAgID0gdGhpcy5fZGF0YTtcbiAgICAgICAgdmFyIHNlY29uZHMsIG1pbnV0ZXMsIGhvdXJzLCB5ZWFycywgbW9udGhzRnJvbURheXM7XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIG1peCBvZiBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgdmFsdWVzLCBidWJibGUgZG93biBmaXJzdFxuICAgICAgICAvLyBjaGVjazogaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzIxNjZcbiAgICAgICAgaWYgKCEoKG1pbGxpc2Vjb25kcyA+PSAwICYmIGRheXMgPj0gMCAmJiBtb250aHMgPj0gMCkgfHxcbiAgICAgICAgICAgICAgICAobWlsbGlzZWNvbmRzIDw9IDAgJiYgZGF5cyA8PSAwICYmIG1vbnRocyA8PSAwKSkpIHtcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyArPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHMpICsgZGF5cykgKiA4NjRlNTtcbiAgICAgICAgICAgIGRheXMgPSAwO1xuICAgICAgICAgICAgbW9udGhzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBidWJibGVzIHVwIHZhbHVlcywgc2VlIHRoZSB0ZXN0cyBmb3JcbiAgICAgICAgLy8gZXhhbXBsZXMgb2Ygd2hhdCB0aGF0IG1lYW5zLlxuICAgICAgICBkYXRhLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcyAlIDEwMDA7XG5cbiAgICAgICAgc2Vjb25kcyAgICAgICAgICAgPSBhYnNGbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcbiAgICAgICAgZGF0YS5zZWNvbmRzICAgICAgPSBzZWNvbmRzICUgNjA7XG5cbiAgICAgICAgbWludXRlcyAgICAgICAgICAgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgICBkYXRhLm1pbnV0ZXMgICAgICA9IG1pbnV0ZXMgJSA2MDtcblxuICAgICAgICBob3VycyAgICAgICAgICAgICA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgICAgIGRhdGEuaG91cnMgICAgICAgID0gaG91cnMgJSAyNDtcblxuICAgICAgICBkYXlzICs9IGFic0Zsb29yKGhvdXJzIC8gMjQpO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgZGF5cyB0byBtb250aHNcbiAgICAgICAgbW9udGhzRnJvbURheXMgPSBhYnNGbG9vcihkYXlzVG9Nb250aHMoZGF5cykpO1xuICAgICAgICBtb250aHMgKz0gbW9udGhzRnJvbURheXM7XG4gICAgICAgIGRheXMgLT0gYWJzQ2VpbChtb250aHNUb0RheXMobW9udGhzRnJvbURheXMpKTtcblxuICAgICAgICAvLyAxMiBtb250aHMgLT4gMSB5ZWFyXG4gICAgICAgIHllYXJzID0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xuICAgICAgICBtb250aHMgJT0gMTI7XG5cbiAgICAgICAgZGF0YS5kYXlzICAgPSBkYXlzO1xuICAgICAgICBkYXRhLm1vbnRocyA9IG1vbnRocztcbiAgICAgICAgZGF0YS55ZWFycyAgPSB5ZWFycztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlzVG9Nb250aHMgKGRheXMpIHtcbiAgICAgICAgLy8gNDAwIHllYXJzIGhhdmUgMTQ2MDk3IGRheXMgKHRha2luZyBpbnRvIGFjY291bnQgbGVhcCB5ZWFyIHJ1bGVzKVxuICAgICAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxMiBtb250aHMgPT09IDQ4MDBcbiAgICAgICAgcmV0dXJuIGRheXMgKiA0ODAwIC8gMTQ2MDk3O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbnRoc1RvRGF5cyAobW9udGhzKSB7XG4gICAgICAgIC8vIHRoZSByZXZlcnNlIG9mIGRheXNUb01vbnRoc1xuICAgICAgICByZXR1cm4gbW9udGhzICogMTQ2MDk3IC8gNDgwMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcyAodW5pdHMpIHtcbiAgICAgICAgdmFyIGRheXM7XG4gICAgICAgIHZhciBtb250aHM7XG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSB0aGlzLl9taWxsaXNlY29uZHM7XG5cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG5cbiAgICAgICAgaWYgKHVuaXRzID09PSAnbW9udGgnIHx8IHVuaXRzID09PSAneWVhcicpIHtcbiAgICAgICAgICAgIGRheXMgICA9IHRoaXMuX2RheXMgICArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xuICAgICAgICAgICAgbW9udGhzID0gdGhpcy5fbW9udGhzICsgZGF5c1RvTW9udGhzKGRheXMpO1xuICAgICAgICAgICAgcmV0dXJuIHVuaXRzID09PSAnbW9udGgnID8gbW9udGhzIDogbW9udGhzIC8gMTI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBoYW5kbGUgbWlsbGlzZWNvbmRzIHNlcGFyYXRlbHkgYmVjYXVzZSBvZiBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyAoaXNzdWUgIzE4NjcpXG4gICAgICAgICAgICBkYXlzID0gdGhpcy5fZGF5cyArIE1hdGgucm91bmQobW9udGhzVG9EYXlzKHRoaXMuX21vbnRocykpO1xuICAgICAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3dlZWsnICAgOiByZXR1cm4gZGF5cyAvIDcgICAgICsgbWlsbGlzZWNvbmRzIC8gNjA0OGU1O1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RheScgICAgOiByZXR1cm4gZGF5cyAgICAgICAgICsgbWlsbGlzZWNvbmRzIC8gODY0ZTU7XG4gICAgICAgICAgICAgICAgY2FzZSAnaG91cicgICA6IHJldHVybiBkYXlzICogMjQgICAgKyBtaWxsaXNlY29uZHMgLyAzNmU1O1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pbnV0ZScgOiByZXR1cm4gZGF5cyAqIDE0NDAgICsgbWlsbGlzZWNvbmRzIC8gNmU0O1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NlY29uZCcgOiByZXR1cm4gZGF5cyAqIDg2NDAwICsgbWlsbGlzZWNvbmRzIC8gMTAwMDtcbiAgICAgICAgICAgICAgICAvLyBNYXRoLmZsb29yIHByZXZlbnRzIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIGhlcmVcbiAgICAgICAgICAgICAgICBjYXNlICdtaWxsaXNlY29uZCc6IHJldHVybiBNYXRoLmZsb29yKGRheXMgKiA4NjRlNSkgKyBtaWxsaXNlY29uZHM7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHVuaXQgJyArIHVuaXRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86IFVzZSB0aGlzLmFzKCdtcycpP1xuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FzX192YWx1ZU9mICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyArXG4gICAgICAgICAgICB0aGlzLl9kYXlzICogODY0ZTUgK1xuICAgICAgICAgICAgKHRoaXMuX21vbnRocyAlIDEyKSAqIDI1OTJlNiArXG4gICAgICAgICAgICB0b0ludCh0aGlzLl9tb250aHMgLyAxMikgKiAzMTUzNmU2XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUFzIChhbGlhcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXMoYWxpYXMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBhc01pbGxpc2Vjb25kcyA9IG1ha2VBcygnbXMnKTtcbiAgICB2YXIgYXNTZWNvbmRzICAgICAgPSBtYWtlQXMoJ3MnKTtcbiAgICB2YXIgYXNNaW51dGVzICAgICAgPSBtYWtlQXMoJ20nKTtcbiAgICB2YXIgYXNIb3VycyAgICAgICAgPSBtYWtlQXMoJ2gnKTtcbiAgICB2YXIgYXNEYXlzICAgICAgICAgPSBtYWtlQXMoJ2QnKTtcbiAgICB2YXIgYXNXZWVrcyAgICAgICAgPSBtYWtlQXMoJ3cnKTtcbiAgICB2YXIgYXNNb250aHMgICAgICAgPSBtYWtlQXMoJ00nKTtcbiAgICB2YXIgYXNZZWFycyAgICAgICAgPSBtYWtlQXMoJ3knKTtcblxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2dldF9fZ2V0ICh1bml0cykge1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHMgKyAncyddKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUdldHRlcihuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtuYW1lXTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgbWlsbGlzZWNvbmRzID0gbWFrZUdldHRlcignbWlsbGlzZWNvbmRzJyk7XG4gICAgdmFyIHNlY29uZHMgICAgICA9IG1ha2VHZXR0ZXIoJ3NlY29uZHMnKTtcbiAgICB2YXIgbWludXRlcyAgICAgID0gbWFrZUdldHRlcignbWludXRlcycpO1xuICAgIHZhciBob3VycyAgICAgICAgPSBtYWtlR2V0dGVyKCdob3VycycpO1xuICAgIHZhciBkYXlzICAgICAgICAgPSBtYWtlR2V0dGVyKCdkYXlzJyk7XG4gICAgdmFyIG1vbnRocyAgICAgICA9IG1ha2VHZXR0ZXIoJ21vbnRocycpO1xuICAgIHZhciB5ZWFycyAgICAgICAgPSBtYWtlR2V0dGVyKCd5ZWFycycpO1xuXG4gICAgZnVuY3Rpb24gd2Vla3MgKCkge1xuICAgICAgICByZXR1cm4gYWJzRmxvb3IodGhpcy5kYXlzKCkgLyA3KTtcbiAgICB9XG5cbiAgICB2YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xuICAgIHZhciB0aHJlc2hvbGRzID0ge1xuICAgICAgICBzOiA0NSwgIC8vIHNlY29uZHMgdG8gbWludXRlXG4gICAgICAgIG06IDQ1LCAgLy8gbWludXRlcyB0byBob3VyXG4gICAgICAgIGg6IDIyLCAgLy8gaG91cnMgdG8gZGF5XG4gICAgICAgIGQ6IDI2LCAgLy8gZGF5cyB0byBtb250aFxuICAgICAgICBNOiAxMSAgIC8vIG1vbnRocyB0byB5ZWFyXG4gICAgfTtcblxuICAgIC8vIGhlbHBlciBmdW5jdGlvbiBmb3IgbW9tZW50LmZuLmZyb20sIG1vbWVudC5mbi5mcm9tTm93LCBhbmQgbW9tZW50LmR1cmF0aW9uLmZuLmh1bWFuaXplXG4gICAgZnVuY3Rpb24gc3Vic3RpdHV0ZVRpbWVBZ28oc3RyaW5nLCBudW1iZXIsIHdpdGhvdXRTdWZmaXgsIGlzRnV0dXJlLCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5yZWxhdGl2ZVRpbWUobnVtYmVyIHx8IDEsICEhd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHVyYXRpb25faHVtYW5pemVfX3JlbGF0aXZlVGltZSAocG9zTmVnRHVyYXRpb24sIHdpdGhvdXRTdWZmaXgsIGxvY2FsZSkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKHBvc05lZ0R1cmF0aW9uKS5hYnMoKTtcbiAgICAgICAgdmFyIHNlY29uZHMgID0gcm91bmQoZHVyYXRpb24uYXMoJ3MnKSk7XG4gICAgICAgIHZhciBtaW51dGVzICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdtJykpO1xuICAgICAgICB2YXIgaG91cnMgICAgPSByb3VuZChkdXJhdGlvbi5hcygnaCcpKTtcbiAgICAgICAgdmFyIGRheXMgICAgID0gcm91bmQoZHVyYXRpb24uYXMoJ2QnKSk7XG4gICAgICAgIHZhciBtb250aHMgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdNJykpO1xuICAgICAgICB2YXIgeWVhcnMgICAgPSByb3VuZChkdXJhdGlvbi5hcygneScpKTtcblxuICAgICAgICB2YXIgYSA9IHNlY29uZHMgPCB0aHJlc2hvbGRzLnMgJiYgWydzJywgc2Vjb25kc10gIHx8XG4gICAgICAgICAgICAgICAgbWludXRlcyA8PSAxICAgICAgICAgICAmJiBbJ20nXSAgICAgICAgICAgfHxcbiAgICAgICAgICAgICAgICBtaW51dGVzIDwgdGhyZXNob2xkcy5tICYmIFsnbW0nLCBtaW51dGVzXSB8fFxuICAgICAgICAgICAgICAgIGhvdXJzICAgPD0gMSAgICAgICAgICAgJiYgWydoJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICAgICAgaG91cnMgICA8IHRocmVzaG9sZHMuaCAmJiBbJ2hoJywgaG91cnNdICAgfHxcbiAgICAgICAgICAgICAgICBkYXlzICAgIDw9IDEgICAgICAgICAgICYmIFsnZCddICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIGRheXMgICAgPCB0aHJlc2hvbGRzLmQgJiYgWydkZCcsIGRheXNdICAgIHx8XG4gICAgICAgICAgICAgICAgbW9udGhzICA8PSAxICAgICAgICAgICAmJiBbJ00nXSAgICAgICAgICAgfHxcbiAgICAgICAgICAgICAgICBtb250aHMgIDwgdGhyZXNob2xkcy5NICYmIFsnTU0nLCBtb250aHNdICB8fFxuICAgICAgICAgICAgICAgIHllYXJzICAgPD0gMSAgICAgICAgICAgJiYgWyd5J10gICAgICAgICAgIHx8IFsneXknLCB5ZWFyc107XG5cbiAgICAgICAgYVsyXSA9IHdpdGhvdXRTdWZmaXg7XG4gICAgICAgIGFbM10gPSArcG9zTmVnRHVyYXRpb24gPiAwO1xuICAgICAgICBhWzRdID0gbG9jYWxlO1xuICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZVRpbWVBZ28uYXBwbHkobnVsbCwgYSk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNldCBhIHRocmVzaG9sZCBmb3IgcmVsYXRpdmUgdGltZSBzdHJpbmdzXG4gICAgZnVuY3Rpb24gZHVyYXRpb25faHVtYW5pemVfX2dldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZCAodGhyZXNob2xkLCBsaW1pdCkge1xuICAgICAgICBpZiAodGhyZXNob2xkc1t0aHJlc2hvbGRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGltaXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRocmVzaG9sZHNbdGhyZXNob2xkXTtcbiAgICAgICAgfVxuICAgICAgICB0aHJlc2hvbGRzW3RocmVzaG9sZF0gPSBsaW1pdDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaHVtYW5pemUgKHdpdGhTdWZmaXgpIHtcbiAgICAgICAgdmFyIGxvY2FsZSA9IHRoaXMubG9jYWxlRGF0YSgpO1xuICAgICAgICB2YXIgb3V0cHV0ID0gZHVyYXRpb25faHVtYW5pemVfX3JlbGF0aXZlVGltZSh0aGlzLCAhd2l0aFN1ZmZpeCwgbG9jYWxlKTtcblxuICAgICAgICBpZiAod2l0aFN1ZmZpeCkge1xuICAgICAgICAgICAgb3V0cHV0ID0gbG9jYWxlLnBhc3RGdXR1cmUoK3RoaXMsIG91dHB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbG9jYWxlLnBvc3Rmb3JtYXQob3V0cHV0KTtcbiAgICB9XG5cbiAgICB2YXIgaXNvX3N0cmluZ19fYWJzID0gTWF0aC5hYnM7XG5cbiAgICBmdW5jdGlvbiBpc29fc3RyaW5nX190b0lTT1N0cmluZygpIHtcbiAgICAgICAgLy8gZm9yIElTTyBzdHJpbmdzIHdlIGRvIG5vdCB1c2UgdGhlIG5vcm1hbCBidWJibGluZyBydWxlczpcbiAgICAgICAgLy8gICogbWlsbGlzZWNvbmRzIGJ1YmJsZSB1cCB1bnRpbCB0aGV5IGJlY29tZSBob3Vyc1xuICAgICAgICAvLyAgKiBkYXlzIGRvIG5vdCBidWJibGUgYXQgYWxsXG4gICAgICAgIC8vICAqIG1vbnRocyBidWJibGUgdXAgdW50aWwgdGhleSBiZWNvbWUgeWVhcnNcbiAgICAgICAgLy8gVGhpcyBpcyBiZWNhdXNlIHRoZXJlIGlzIG5vIGNvbnRleHQtZnJlZSBjb252ZXJzaW9uIGJldHdlZW4gaG91cnMgYW5kIGRheXNcbiAgICAgICAgLy8gKHRoaW5rIG9mIGNsb2NrIGNoYW5nZXMpXG4gICAgICAgIC8vIGFuZCBhbHNvIG5vdCBiZXR3ZWVuIGRheXMgYW5kIG1vbnRocyAoMjgtMzEgZGF5cyBwZXIgbW9udGgpXG4gICAgICAgIHZhciBzZWNvbmRzID0gaXNvX3N0cmluZ19fYWJzKHRoaXMuX21pbGxpc2Vjb25kcykgLyAxMDAwO1xuICAgICAgICB2YXIgZGF5cyAgICAgICAgID0gaXNvX3N0cmluZ19fYWJzKHRoaXMuX2RheXMpO1xuICAgICAgICB2YXIgbW9udGhzICAgICAgID0gaXNvX3N0cmluZ19fYWJzKHRoaXMuX21vbnRocyk7XG4gICAgICAgIHZhciBtaW51dGVzLCBob3VycywgeWVhcnM7XG5cbiAgICAgICAgLy8gMzYwMCBzZWNvbmRzIC0+IDYwIG1pbnV0ZXMgLT4gMSBob3VyXG4gICAgICAgIG1pbnV0ZXMgICAgICAgICAgID0gYWJzRmxvb3Ioc2Vjb25kcyAvIDYwKTtcbiAgICAgICAgaG91cnMgICAgICAgICAgICAgPSBhYnNGbG9vcihtaW51dGVzIC8gNjApO1xuICAgICAgICBzZWNvbmRzICU9IDYwO1xuICAgICAgICBtaW51dGVzICU9IDYwO1xuXG4gICAgICAgIC8vIDEyIG1vbnRocyAtPiAxIHllYXJcbiAgICAgICAgeWVhcnMgID0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xuICAgICAgICBtb250aHMgJT0gMTI7XG5cblxuICAgICAgICAvLyBpbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vZG9yZGlsbGUvbW9tZW50LWlzb2R1cmF0aW9uL2Jsb2IvbWFzdGVyL21vbWVudC5pc29kdXJhdGlvbi5qc1xuICAgICAgICB2YXIgWSA9IHllYXJzO1xuICAgICAgICB2YXIgTSA9IG1vbnRocztcbiAgICAgICAgdmFyIEQgPSBkYXlzO1xuICAgICAgICB2YXIgaCA9IGhvdXJzO1xuICAgICAgICB2YXIgbSA9IG1pbnV0ZXM7XG4gICAgICAgIHZhciBzID0gc2Vjb25kcztcbiAgICAgICAgdmFyIHRvdGFsID0gdGhpcy5hc1NlY29uZHMoKTtcblxuICAgICAgICBpZiAoIXRvdGFsKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIHRoZSBzYW1lIGFzIEMjJ3MgKE5vZGEpIGFuZCBweXRob24gKGlzb2RhdGUpLi4uXG4gICAgICAgICAgICAvLyBidXQgbm90IG90aGVyIEpTIChnb29nLmRhdGUpXG4gICAgICAgICAgICByZXR1cm4gJ1AwRCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHRvdGFsIDwgMCA/ICctJyA6ICcnKSArXG4gICAgICAgICAgICAnUCcgK1xuICAgICAgICAgICAgKFkgPyBZICsgJ1knIDogJycpICtcbiAgICAgICAgICAgIChNID8gTSArICdNJyA6ICcnKSArXG4gICAgICAgICAgICAoRCA/IEQgKyAnRCcgOiAnJykgK1xuICAgICAgICAgICAgKChoIHx8IG0gfHwgcykgPyAnVCcgOiAnJykgK1xuICAgICAgICAgICAgKGggPyBoICsgJ0gnIDogJycpICtcbiAgICAgICAgICAgIChtID8gbSArICdNJyA6ICcnKSArXG4gICAgICAgICAgICAocyA/IHMgKyAnUycgOiAnJyk7XG4gICAgfVxuXG4gICAgdmFyIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8gPSBEdXJhdGlvbi5wcm90b3R5cGU7XG5cbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFicyAgICAgICAgICAgID0gZHVyYXRpb25fYWJzX19hYnM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hZGQgICAgICAgICAgICA9IGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uc3VidHJhY3QgICAgICAgPSBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX3N1YnRyYWN0O1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXMgICAgICAgICAgICAgPSBhcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzTWlsbGlzZWNvbmRzID0gYXNNaWxsaXNlY29uZHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc1NlY29uZHMgICAgICA9IGFzU2Vjb25kcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzTWludXRlcyAgICAgID0gYXNNaW51dGVzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNIb3VycyAgICAgICAgPSBhc0hvdXJzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNEYXlzICAgICAgICAgPSBhc0RheXM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc1dlZWtzICAgICAgICA9IGFzV2Vla3M7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc01vbnRocyAgICAgICA9IGFzTW9udGhzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNZZWFycyAgICAgICAgPSBhc1llYXJzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udmFsdWVPZiAgICAgICAgPSBkdXJhdGlvbl9hc19fdmFsdWVPZjtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLl9idWJibGUgICAgICAgID0gYnViYmxlO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uZ2V0ICAgICAgICAgICAgPSBkdXJhdGlvbl9nZXRfX2dldDtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLm1pbGxpc2Vjb25kcyAgID0gbWlsbGlzZWNvbmRzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uc2Vjb25kcyAgICAgICAgPSBzZWNvbmRzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubWludXRlcyAgICAgICAgPSBtaW51dGVzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uaG91cnMgICAgICAgICAgPSBob3VycztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmRheXMgICAgICAgICAgID0gZGF5cztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLndlZWtzICAgICAgICAgID0gd2Vla3M7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5tb250aHMgICAgICAgICA9IG1vbnRocztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnllYXJzICAgICAgICAgID0geWVhcnM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5odW1hbml6ZSAgICAgICA9IGh1bWFuaXplO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9JU09TdHJpbmcgICAgPSBpc29fc3RyaW5nX190b0lTT1N0cmluZztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvU3RyaW5nICAgICAgID0gaXNvX3N0cmluZ19fdG9JU09TdHJpbmc7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b0pTT04gICAgICAgICA9IGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubG9jYWxlICAgICAgICAgPSBsb2NhbGU7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5sb2NhbGVEYXRhICAgICA9IGxvY2FsZURhdGE7XG5cbiAgICAvLyBEZXByZWNhdGlvbnNcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvSXNvU3RyaW5nID0gZGVwcmVjYXRlKCd0b0lzb1N0cmluZygpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgdG9JU09TdHJpbmcoKSBpbnN0ZWFkIChub3RpY2UgdGhlIGNhcGl0YWxzKScsIGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nKTtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmxhbmcgPSBsYW5nO1xuXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1gnLCAwLCAwLCAndW5peCcpO1xuICAgIGFkZEZvcm1hdFRva2VuKCd4JywgMCwgMCwgJ3ZhbHVlT2YnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ3gnLCBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignWCcsIG1hdGNoVGltZXN0YW1wKTtcbiAgICBhZGRQYXJzZVRva2VuKCdYJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoaW5wdXQsIDEwKSAqIDEwMDApO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ3gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUodG9JbnQoaW5wdXQpKTtcbiAgICB9KTtcblxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcblxuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnZlcnNpb24gPSAnMi4xMS4yJztcblxuICAgIHNldEhvb2tDYWxsYmFjayhsb2NhbF9fY3JlYXRlTG9jYWwpO1xuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmZuICAgICAgICAgICAgICAgICAgICA9IG1vbWVudFByb3RvdHlwZTtcbiAgICB1dGlsc19ob29rc19faG9va3MubWluICAgICAgICAgICAgICAgICAgID0gbWluO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5tYXggICAgICAgICAgICAgICAgICAgPSBtYXg7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm5vdyAgICAgICAgICAgICAgICAgICA9IG5vdztcbiAgICB1dGlsc19ob29rc19faG9va3MudXRjICAgICAgICAgICAgICAgICAgID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy51bml4ICAgICAgICAgICAgICAgICAgPSBtb21lbnRfX2NyZWF0ZVVuaXg7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm1vbnRocyAgICAgICAgICAgICAgICA9IGxpc3RzX19saXN0TW9udGhzO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5pc0RhdGUgICAgICAgICAgICAgICAgPSBpc0RhdGU7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxvY2FsZSAgICAgICAgICAgICAgICA9IGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGU7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmludmFsaWQgICAgICAgICAgICAgICA9IHZhbGlkX19jcmVhdGVJbnZhbGlkO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5kdXJhdGlvbiAgICAgICAgICAgICAgPSBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5pc01vbWVudCAgICAgICAgICAgICAgPSBpc01vbWVudDtcbiAgICB1dGlsc19ob29rc19faG9va3Mud2Vla2RheXMgICAgICAgICAgICAgID0gbGlzdHNfX2xpc3RXZWVrZGF5cztcbiAgICB1dGlsc19ob29rc19faG9va3MucGFyc2Vab25lICAgICAgICAgICAgID0gbW9tZW50X19jcmVhdGVJblpvbmU7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxvY2FsZURhdGEgICAgICAgICAgICA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGU7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmlzRHVyYXRpb24gICAgICAgICAgICA9IGlzRHVyYXRpb247XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm1vbnRoc1Nob3J0ICAgICAgICAgICA9IGxpc3RzX19saXN0TW9udGhzU2hvcnQ7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLndlZWtkYXlzTWluICAgICAgICAgICA9IGxpc3RzX19saXN0V2Vla2RheXNNaW47XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmRlZmluZUxvY2FsZSAgICAgICAgICA9IGRlZmluZUxvY2FsZTtcbiAgICB1dGlsc19ob29rc19faG9va3Mud2Vla2RheXNTaG9ydCAgICAgICAgID0gbGlzdHNfX2xpc3RXZWVrZGF5c1Nob3J0O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5ub3JtYWxpemVVbml0cyAgICAgICAgPSBub3JtYWxpemVVbml0cztcbiAgICB1dGlsc19ob29rc19faG9va3MucmVsYXRpdmVUaW1lVGhyZXNob2xkID0gZHVyYXRpb25faHVtYW5pemVfX2dldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZDtcbiAgICB1dGlsc19ob29rc19faG9va3MucHJvdG90eXBlICAgICAgICAgICAgID0gbW9tZW50UHJvdG90eXBlO1xuXG4gICAgdmFyIF9tb21lbnQgPSB1dGlsc19ob29rc19faG9va3M7XG5cbiAgICByZXR1cm4gX21vbWVudDtcblxufSkpOyJdfQ==
