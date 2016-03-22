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
}).call(this,require("qC859L"))
},{"qC859L":28}],2:[function(require,module,exports){
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

		var div = $('<div/>').text(textArea.text())
		div.width(textArea.width());
		$(document.body).append(div);
		textArea.height(Number(div.height()) + 25);
		div.remove();
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
			</table>"
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
},{"moment":27}],11:[function(require,module,exports){
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
		this.showSpinner();
		var a = $('<a href=' + config.url.createPath({action_name: actionName, file_name: fileName}) + '></a>'); 
		$(document.body).append(a);
	    a[0].click();
	    a.remove();
	    this.removeSpinner();
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
},{}],28:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImQ6XFxyZXBvc1xcYXNzZXNzbWVudC1mb3JtXFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvY29uZmlnLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL2Zha2VfZmI3YmUwMTIuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdGVtcGxhdGVzL2J1dHRvbnNQcmV2aWV3VGVtcGxhdGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdGVtcGxhdGVzL2J1dHRvbnNUZW1wbGF0ZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvZXJyb3JUZW1wbGF0ZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2VpZ2h0aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvZWxldmVudGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2ZpZnRoVGFibGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdGVtcGxhdGVzL3RhYmxlcy9maWZ0aHRlZW50aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvZmlyc3RUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2ZvdXJ0ZWVudGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2ZvdXJ0aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvbmludGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL3NlY29uZFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvc2V2ZW50aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvc2l4dGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL3RlbnRoVGFibGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdGVtcGxhdGVzL3RhYmxlcy90aGlyZFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvdGhpcnRlZW50aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvdHdlbGZ0aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy91c2VyVGVtcGxhdGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdXRpbHMvQWpheC5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy91dGlscy9mb3Jtcy5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy91dGlscy9qc29uUGFyc2UuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdXRpbHMvdWkuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdXRpbHMvdXRpbHMuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vbm9kZV9tb2R1bGVzL21vbWVudC9tb21lbnQuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9vQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4VkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcmhIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKHByb2Nlc3Mpe1xudmFyIHNlcnZlcklkID0gJzYyNTE1NDg4NzUyMzk2MTE2NDknO1xyXG52YXIgcm91dGVySWQgPSAnNjI1MTU0NzYyMDkzMDUwODY5Nic7XHJcbnZhciBjdXN0b21CYXNlVXJsID0gJy9jdXN0b21fd2ViX3RlbXBsYXRlLmh0bWwnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuXHJcblx0dXJsOiB7XHJcblx0XHRkZWZhdWx0UGF0aDogY3VzdG9tQmFzZVVybC5jb25jYXQoJz9vYmplY3RfaWQ9JykuY29uY2F0KHJvdXRlcklkKS5jb25jYXQoJyZzZXJ2ZXJfaWQ9Jy5jb25jYXQoc2VydmVySWQpKSxcclxuXHRcdGNyZWF0ZVBhdGg6IGZ1bmN0aW9uKG9iail7XHJcblx0XHRcdHZhciBzdHJQYXJhbXMgPSBcIlwiO1xyXG5cdFx0XHRmb3IgKGtleSBpbiBvYmope1xyXG5cdFx0XHRcdHN0clBhcmFtcyArPSAnJicgKyBrZXkgKyAnPScgKyBvYmpba2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5kZWZhdWx0UGF0aCArIHN0clBhcmFtcztcclxuXHRcdH1cclxuXHR9LFxyXG5cdFxyXG5cdHNldFNlcnZlcklkOiBmdW5jdGlvbihfc2VydmVySWQpe1xyXG5cdFx0c2VydmVySWQgPSBfc2VydmVySWQ7XHJcblx0fSxcclxuXHJcblx0c2V0Um91dGVySWQ6IGZ1bmN0aW9uKF9yb3V0ZXJJZCl7XHJcblx0XHRyb3V0ZXJJZCA9IF9yb3V0ZXJJZDtcclxuXHR9LFxyXG5cclxuXHRzZXRDdXN0b21CYXNlVXJsOiBmdW5jdGlvbihfY3VzdG9tQmFzZVVybCl7XHJcblx0XHRjdXN0b21CYXNlVXJsID0gX2N1c3RvbUJhc2VVcmw7XHJcblx0fSxcclxuXHJcblx0c2V0UHJvZHVjdGlvbk1vZGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHByb2Nlc3MuZW52Lk5PREVfRU5WID0gJ3Byb2R1Y3Rpb24nO1xyXG5cdH1cclxufVxyXG5cclxud2luZG93LmNvbmZpZyA9IGNvbmZpZztcclxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XG59KS5jYWxsKHRoaXMscmVxdWlyZShcInFDODU5TFwiKSkiLCJ2YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcclxudmFyIHVzZXJUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3VzZXJUZW1wbGF0ZScpO1xyXG52YXIgZXJyb3JUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2Vycm9yVGVtcGxhdGUnKTtcclxuXHJcbnZhciBmaXJzdFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL2ZpcnN0VGFibGUnKTtcclxudmFyIHNlY29uZFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL3NlY29uZFRhYmxlJyk7XHJcbnZhciB0aGlyZFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL3RoaXJkVGFibGUnKTtcclxudmFyIGZvdXJ0aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL2ZvdXJ0aFRhYmxlJyk7XHJcbnZhciBmaWZ0aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL2ZpZnRoVGFibGUnKTtcclxudmFyIHNpeHRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvc2l4dGhUYWJsZScpO1xyXG52YXIgc2V2ZW50aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL3NldmVudGhUYWJsZScpO1xyXG52YXIgZWlnaHRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvZWlnaHRoVGFibGUnKTtcclxudmFyIG5pbnRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvbmludGhUYWJsZScpO1xyXG52YXIgdGVudGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy90ZW50aFRhYmxlJyk7XHJcbnZhciBlbGV2ZW50aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL2VsZXZlbnRoVGFibGUnKTtcclxudmFyIHR3ZWxmdGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy90d2VsZnRoVGFibGUnKTtcclxudmFyIHRoaXJ0ZWVudGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy90aGlydGVlbnRoVGFibGUnKTtcclxudmFyIGZvdXJ0ZWVudGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy9mb3VydGVlbnRoVGFibGUnKTtcclxudmFyIGZpZnRodGVlbnRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvZmlmdGh0ZWVudGhUYWJsZScpO1xyXG5cclxuXHJcbnZhciBidXR0b25zVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9idXR0b25zVGVtcGxhdGUnKTtcclxudmFyIGJ1dHRvbnNQcmV2aWV3VGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9idXR0b25zUHJldmlld1RlbXBsYXRlJylcclxudmFyIGFqYXggPSByZXF1aXJlKCcuL3V0aWxzL0FqYXgnKTtcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscy91dGlscycpO1xyXG52YXIganNvblBhcnNlID0gcmVxdWlyZSgnLi91dGlscy9qc29uUGFyc2UnKTtcclxuXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKXtcclxuXHRzdGFydCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0FjY2Vzcyh1c2VyKXtcclxuXHR1c2VyID0gdXNlciB8fCB7fTtcclxuXHRyZXR1cm4gdXNlci5hY2Nlc3MgPT09IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURhdGVQaWNrZXJzKCkge1xyXG5cdCQoJy5maXJzdFRhYmxlX19kYXRlJykuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzKS5kYXRlcGlja2VyKHtkYXRlRm9ybWF0OiBcImRkLm1tLnl5XCJ9KTtcclxuXHR9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VUZXh0QXJlYUhlaWdodCgpe1xyXG5cdCQoJ3RleHRhcmVhJykuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHRleHRBcmVhID0gJCh0aGlzKTtcclxuXHRcdGlmICh0ZXh0QXJlYS50ZXh0KCkgPT09ICcnKSByZXR1cm47XHJcblxyXG5cdFx0dmFyIGRpdiA9ICQoJzxkaXYvPicpLnRleHQodGV4dEFyZWEudGV4dCgpKVxyXG5cdFx0ZGl2LndpZHRoKHRleHRBcmVhLndpZHRoKCkpO1xyXG5cdFx0JChkb2N1bWVudC5ib2R5KS5hcHBlbmQoZGl2KTtcclxuXHRcdHRleHRBcmVhLmhlaWdodChOdW1iZXIoZGl2LmhlaWdodCgpKSArIDI1KTtcclxuXHRcdGRpdi5yZW1vdmUoKTtcclxuXHR9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYmxvY2tJbnB1dHMoKXtcclxuXHQkKCdpbnB1dCwgdGV4dGFyZWEnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHQkKHRoaXMpLmF0dHIoe2Rpc2FibGVkOiB0cnVlfSk7XHJcblx0fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUJhc2VIdG1sKGZvcm1JZCwgZm9ybVR5cGVJZCwgY2FsbEJhY2spIHtcclxuXHRhamF4LnNlbmRSZXF1ZXN0KGNvbmZpZy51cmwuY3JlYXRlUGF0aCh7YWN0aW9uX25hbWU6ICdnZXREYXRhJywgZm9ybV9pZDogZm9ybUlkLCBmb3JtX3R5cGVfaWQ6IGZvcm1UeXBlSWR9KSwgZnVuY3Rpb24gKF9kYXRhKSB7XHJcblx0XHR2YXIgaXNQcmV2aWV3ID0gdXRpbHMuZ2V0VXJsUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAncHJldmlldycpO1xyXG5cdFx0aXNQcmV2aWV3ID0gaXNQcmV2aWV3ID8ganNvblBhcnNlKGlzUHJldmlldykgOiBmYWxzZTtcclxuXHJcblx0XHR2YXIgZGF0YSA9IG51bGw7XHJcblx0XHR2YXIgYmFzZUh0bWwgPSAnJztcclxuXHRcdHZhciBidXR0b25zSHRtbCA9ICcnO1xyXG5cclxuXHRcdHRyeSB7IGRhdGEgPSBqc29uUGFyc2UodXRpbHMuZGVjb2RlSHRtbChfZGF0YSkpOyB9XHJcblx0XHRjYXRjaChlKSB7IFxyXG5cdFx0XHRjb25zb2xlLmxvZyhlKTsgXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWlzQWNjZXNzKGRhdGEudXNlcikpIHtcclxuXHRcdFx0YmFzZUh0bWwgPSBlcnJvclRlbXBsYXRlKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0YmFzZUh0bWwgPSB1c2VyVGVtcGxhdGUoZGF0YS51c2VyKSArIFxyXG5cdFx0XHRcdGZpcnN0VGFibGUoZGF0YS5maXJzdFRhYmxlKSArIFxyXG5cdFx0XHRcdHNlY29uZFRhYmxlKGRhdGEuc2Vjb25kVGFibGUpICtcclxuXHRcdFx0XHR0aGlyZFRhYmxlKGRhdGEudGhpcmRUYWJsZSkgK1xyXG5cdFx0XHRcdGZvdXJ0aFRhYmxlKGRhdGEuZm91cnRoVGFibGUpICtcclxuXHRcdFx0XHRmaWZ0aFRhYmxlKGRhdGEuZmlmdGhUYWJsZSkgK1xyXG5cdFx0XHRcdHNpeHRoVGFibGUoZGF0YS5zaXh0aFRhYmxlKSArXHJcblx0XHRcdFx0c2V2ZW50aFRhYmxlKGRhdGEuc2V2ZW50aFRhYmxlKSArXHJcblx0XHRcdFx0ZWlnaHRoVGFibGUoZGF0YS5laWdodGhUYWJsZSkgK1xyXG5cdFx0XHRcdG5pbnRoVGFibGUoZGF0YS5uaW50aFRhYmxlKSArXHJcblx0XHRcdFx0dGVudGhUYWJsZShkYXRhLnRlbnRoVGFibGUpICsgXHRcdCBcclxuXHRcdFx0XHRlbGV2ZW50aFRhYmxlKGRhdGEuZWxldmVudGhUYWJsZSkgKyBcclxuXHRcdFx0XHR0d2VsZnRoVGFibGUoZGF0YS50d2VsZnRoVGFibGUpICtcclxuXHRcdFx0XHR0aGlydGVlbnRoVGFibGUoZGF0YS50aGlydGVlbnRoVGFibGUpICtcclxuXHRcdFx0XHRmb3VydGVlbnRoVGFibGUoZGF0YS5mb3VydGVlbnRoVGFibGUpICtcclxuXHRcdFx0XHRmaWZ0aHRlZW50aFRhYmxlKGRhdGEuZmlmdGh0ZWVudGhUYWJsZSk7XHJcblxyXG5cdFx0XHRpZiAoaXNQcmV2aWV3KXtcclxuXHRcdFx0XHRidXR0b25zSHRtbCA9IGJ1dHRvbnNQcmV2aWV3VGVtcGxhdGUoKTtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVuZGVyLXByZXZpZXctYnV0dG9ucycpLmlubmVySFRNTCA9IGJ1dHRvbnNIdG1sO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0YnV0dG9uc0h0bWwgPSBidXR0b25zVGVtcGxhdGUoZGF0YS51c2VyKTtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVuZGVyLWJ1dHRvbnMnKS5pbm5lckhUTUwgPSBidXR0b25zSHRtbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbmRlci1mb3JtcycpLmlubmVySFRNTCA9IGJhc2VIdG1sO1xyXG5cdFx0aWYgKGlzUHJldmlldyl7XHJcblx0XHRcdGJsb2NrSW5wdXRzKCk7XHJcblx0XHRcdGNoYW5nZVRleHRBcmVhSGVpZ2h0KCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmIChjYWxsQmFjaykgY2FsbEJhY2soKTtcclxuXHR9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcblx0dmFyIGZvcm1UeXBlSWQgPSB1dGlscy5nZXRVcmxQYXJhbXMod2luZG93LmxvY2F0aW9uLmhyZWYsICdvYmplY3RfaWQnKSB8fCB1dGlscy5nZXRVcmxQYXJhbXMod2luZG93LmxvY2F0aW9uLmhyZWYsICdmb3JtX3R5cGVfaWQnKTtcclxuXHR2YXIgZm9ybUlkID0gdXRpbHMuZ2V0VXJsUGFyYW1zKHdpbmRvdy5wYXJlbnQubG9jYXRpb24uaHJlZiwgJ29iamVjdF9pZCcpIHx8ICB1dGlscy5nZXRVcmxQYXJhbXMod2luZG93LmxvY2F0aW9uLmhyZWYsICdmb3JtX2lkJyk7XHJcblx0Y3JlYXRlQmFzZUh0bWwoZm9ybUlkLCBmb3JtVHlwZUlkLCBjcmVhdGVEYXRlUGlja2Vycyk7XHJcbn1cclxuXHJcblxyXG5cclxuIiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvdXRpbHMnKTtcclxudmFyIGZvcm1zID0gcmVxdWlyZSgnLi4vdXRpbHMvZm9ybXMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZXIpIHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0XCI8YnV0dG9uIG9uY2xpY2s9d2luZG93LmZvcm1zLnNhdmVQZGYoZXZlbnQpIGNsYXNzPSdpbnB1dEJ1dHRvbic+0KHQvtGF0YDQsNC90LjRgtGMINCyIC5QREY8L2J1dHRvbj5cXG5cXFxyXG5cdFx0IDxidXR0b24gb25jbGljaz13aW5kb3cuZm9ybXMuc2F2ZURvYyhldmVudCkgY2xhc3M9J2lucHV0QnV0dG9uJz7QodC+0YXRgNCw0L3QuNGC0Ywg0LIgLkRPQzwvYnV0dG9uPlxcblxcXHJcblx0XHQgPGJ1dHRvbiBvbmNsaWNrPXdpbmRvdy5mb3Jtcy5wcmludCgpIGNsYXNzPSdpbnB1dEJ1dHRvbic+0J/QtdGH0LDRgtGMPC9idXR0b24+XCJcclxuXHQpO1xyXG59IiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvdXRpbHMnKTtcclxudmFyIGZvcm1zID0gcmVxdWlyZSgnLi4vdXRpbHMvZm9ybXMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZXIpIHtcclxuXHR1c2VyID0gdXNlciB8fCB7fTtcclxuXHR1c2VyLmlzQm9zcyA9IHVzZXIuaXNCb3NzIHx8IGZhbHNlO1xyXG5cdHVzZXIuZm9ybVN0YXR1cyA9IHVzZXIuZm9ybVN0YXR1cyB8fCAnJztcclxuXHJcblx0aWYgKHV0aWxzLnN0ckJvb2xUb0Jvb2wodXNlci5pc0Jvc3MpKSB7XHJcblx0XHRpZiAodXNlci5mb3JtU3RhdHVzID09PSAnZGVjbGluZWQnIHx8IHVzZXIuZm9ybVN0YXR1cyA9PT0gJ2NvbmZpcm1lZCcpIHtcclxuXHRcdFx0cmV0dXJuIFwiPGEgaHJlZj0nIycgb25jbGljaz13aW5kb3cuZm9ybXMucmVxdWVzdFByZXZpZXdGb3JtKGV2ZW50KSBjbGFzcz0naW5wdXRCdXR0b24nPtCf0YDQvtGB0LzQvtGC0YAg0YTQvtGA0LzRizwvYT5cIjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0XCI8aW5wdXQgdHlwZT0nYnV0dG9uJyBvbmNsaWNrPXdpbmRvdy5mb3Jtcy5zZW5kRm9ybSgnc2F2ZScpIHZhbHVlPSfQodC+0YXRgNCw0L3QuNGC0YwnIGNsYXNzPSdpbnB1dEJ1dHRvbicgLz5cXG5cXFxyXG5cdFx0XHQ8aW5wdXQgdHlwZT0nYnV0dG9uJyBvbmNsaWNrPXdpbmRvdy5mb3Jtcy5zZW5kRm9ybSgnZGVjbGluZWQnKSB2YWx1ZT0n0J7RgtC60LvQvtC90LjRgtGMJyBjbGFzcz0naW5wdXRCdXR0b24nLz5cXG5cXFxyXG5cdFx0XHQ8aW5wdXQgdHlwZT0nYnV0dG9uJyBvbmNsaWNrPXdpbmRvdy5mb3Jtcy5zZW5kRm9ybSgnY29uZmlybWVkJykgdmFsdWU9J9Cj0YLQstC10YDQtNC40YLRjCcgY2xhc3M9J2lucHV0QnV0dG9uJy8+XFxuXFxcclxuXHRcdFx0PGEgaHJlZj0nIycgb25jbGljaz13aW5kb3cuZm9ybXMucmVxdWVzdFByZXZpZXdGb3JtKGV2ZW50KSBjbGFzcz0naW5wdXRCdXR0b24nPtCf0YDQvtGB0LzQvtGC0YAg0YTQvtGA0LzRizwvYT5cIlxyXG5cdFx0KTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRpZiAodXNlci5mb3JtU3RhdHVzID09PSAnYWN0aXZlJykge1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFwiPGlucHV0IHR5cGU9J2J1dHRvbicgb25jbGljaz13aW5kb3cuZm9ybXMuc2VuZEZvcm0oJ3NhdmUnKSB2YWx1ZT0n0KHQvtGF0YDQsNC90LjRgtGMJyBjbGFzcz0naW5wdXRCdXR0b24nLz4gXFxuXFxcclxuXHRcdFx0XHQ8aW5wdXQgdHlwZT0nYnV0dG9uJyBvbmNsaWNrPXdpbmRvdy5mb3Jtcy5zZW5kRm9ybSgnc2VuZF9yZXF1ZXN0JykgdmFsdWU9J9Ce0YLQv9GA0LDQstC40YLRjCDQvdCwINC/0L7QtNGC0LLQtdGA0LbQtNC10L3QuNC1JyBjbGFzcz0naW5wdXRCdXR0b24nLz5cXG5cXFxyXG5cdFx0XHRcdDxhIGhyZWY9JyMnIG9uY2xpY2s9d2luZG93LmZvcm1zLnJlcXVlc3RQcmV2aWV3Rm9ybShldmVudCkgY2xhc3M9J2lucHV0QnV0dG9uJz7Qn9GA0L7RgdC80L7RgtGAINGE0L7RgNC80Ys8L2E+XCJcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBcIjxhIGhyZWY9JyMnIG9uY2xpY2s9d2luZG93LmZvcm1zLnJlcXVlc3RQcmV2aWV3Rm9ybShldmVudCkgY2xhc3M9J2lucHV0QnV0dG9uJz7Qn9GA0L7RgdC80L7RgtGAINGE0L7RgNC80Ys8L2E+XCI7XHJcblx0fVxyXG5cclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiAoXHJcblx0XHRcIjxjZW50ZXI+XFxuXFxcclxuXHRcdFx0PHRhYmxlIHdpZHRoPSczMDAnIGhlaWdodD0nMTAwJyBzdHlsZT0nYm9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDo1cHg7Ym9yZGVyLWNvbG9yOnJlZDsnIGNlbGxzcGFjaW5nPScwJyBjZWxscGFkZGluZz0nNSc+XFxuXFxcclxuXHRcdFx0XHQ8dGJvZHk+XFxuXFxcclxuXHRcdFx0XHRcdDx0ciBiZ2NvbG9yPScjRkZGRkZGJz4gXFxuXFxcclxuXHRcdFx0XHRcdFx0PHRkPjxpbWcgc3JjPScvcGljcy9hdHRlbi5qcGcnPjwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRkPjxiPjxmb250IHNpemU9JzInPtCjINCS0LDRgSDQvdC10LTQvtGB0YLQsNGC0L7Rh9C90L4g0L/RgNCw0LIg0LTQvtGB0YLRg9C/0LAg0LTQu9GPINC/0YDQvtGB0LzQvtGC0YDQsCDRjdGC0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsC48L2ZvbnQ+PC9iPjwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8L3Rib2R5PlxcblxcXHJcblx0XHRcdDwvdGFibGU+XFxuXFxcclxuXHRcdDwvY2VudGVyPlwiXHJcblx0KTtcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XG52YXIgdWkgPSByZXF1aXJlKCcuLi8uLi91dGlscy91aScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlaWdodGhUYWJsZSkge1xuXHRlaWdodGhUYWJsZSA9IGVpZ2h0aFRhYmxlIHx8IHt9O1xuXHRyZXR1cm4gKFxuXHRcdFwiPGRpdiBjbGFzcz0nZWlnaHRoVGFibGUnPlxcblxcXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcicgY2xhc3M9J2VpZ2h0aFRhYmxlJz5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjb2xzcGFuPSc0JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntGG0LXQvdC60LAg0YHQvtC+0YLQstC10YLRgdGC0LLQuNGPINC70LjRh9C90L7RgdGC0L3Ri9C8INC60L7QvNC/0LXRgtC10L3RhtC40Y/QvDwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QndC40LfQutC40Lkg0YDQtdC30YPQu9GM0YLQsNGCPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QodGA0LXQtNC90LjQuSDRgNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCl0L7RgNC+0YjQuNC5INGA0LXQt9GD0LvRjNGC0LDRgjwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0JLRi9GB0L7QutC40Lkg0YDQtdC30YPQu9GM0YLQsNGCPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGVpZ2h0aFRhYmxlLmNvbDBfc3RyMCksICdlaWdodGhUYWJsZS5jb2wwX3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZWlnaHRoVGFibGUuY29sMV9zdHIwKSwgJ2VpZ2h0aFRhYmxlLmNvbDFfc3RyMCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChlaWdodGhUYWJsZS5jb2wyX3N0cjApLCAnZWlnaHRoVGFibGUuY29sMl9zdHIwJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGVpZ2h0aFRhYmxlLmNvbDNfc3RyMCksICdlaWdodGhUYWJsZS5jb2wzX3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdDwvdGFibGU+XFxuXFxcblx0XHQ8L2Rpdj5cIlxuXHQpXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxldmVudGhUYWJsZSkge1xuXHRlbGV2ZW50aFRhYmxlID0gZWxldmVudGhUYWJsZSB8fCB7fTtcblx0cmV0dXJuIChcblx0XHRcIjxkaXYgY2xhc3M9J2VsZXZlbnRoVGFibGUnPlxcblxcXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcicgY2xhc3M9J2VsZXZlbnRoVGFibGUnPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTQnPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNvbHNwYW49JzMnIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0LvQsNC9INGA0LDQt9Cy0LjRgtC40Y8g0L3QsCDQv9GA0LXQtNGB0YLQvtGP0YnQuNC5INC/0LXRgNC40L7QtDwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGU0Jz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QptC10LvQuCDRgNCw0LfQstC40YLQuNGPPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QlNC10LnRgdGC0LLQuNGPPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QodGA0L7QutC4PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTQnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPtCa0LDQutC40LUg0L7QsdC70LDRgdGC0Lgg0LLRiyDQstGL0LTQtdC70Y/QtdGC0LUg0LTQu9GPINC/0L7QstGL0YjQtdC90LjRjyDRjdGE0YTQtdC60YLQuNCy0L3QvtGB0YLQuD9cXG5cXFxuXHRcdFx0XHRcdFx00JrQsNC6INCy0Ysg0YPQt9C90LDQtdGC0LUsINGH0YLQviDQstGLINC+0YHQstC+0LjQu9C4INGN0YLRgyDQvtCx0LvQsNGB0YLRjD9cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+0KfRgtC+INCy0Ysg0YHQtNC10LvQsNC10YLQtSwg0YfRgtC+0LHRiyDQtNC+0LHQuNGC0YzRgdGPINC/0L7RgdGC0LDQstC70LXQvdC90L7QuSDRhtC10LvQuCDQv9C+INGA0LDQt9Cy0LjRgtC40Y4/PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz7QmtC+0LPQtNCwINCy0Ysg0LTQvtGB0YLQuNCz0L3QuNGC0LUg0YbQtdC70Lgg0L/QviDRgNCw0LfQstC40YLQuNGOPzwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjAnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wxX3N0cjAnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMV9zdHIwIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wyX3N0cjAnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMl9zdHIwIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjEnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMF9zdHIxIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wxX3N0cjEnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMV9zdHIxIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wyX3N0cjEnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMl9zdHIxIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjInIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMF9zdHIyIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wxX3N0cjInIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMV9zdHIyIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wyX3N0cjInIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMl9zdHIyIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjMnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMF9zdHIzIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wxX3N0cjMnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMV9zdHIzIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wyX3N0cjMnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMl9zdHIzIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjQnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMF9zdHI0IHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wxX3N0cjQnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMV9zdHI0IHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wyX3N0cjQnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMl9zdHI0IHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjUnIHJvd3M9JzInPlwiKyAoZWxldmVudGhUYWJsZS5jb2wwX3N0cjUgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMV9zdHI1JyByb3dzPScyJz5cIisgKGVsZXZlbnRoVGFibGUuY29sMV9zdHI1IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDJfc3RyNScgcm93cz0nMic+XCIrIChlbGV2ZW50aFRhYmxlLmNvbDJfc3RyNSB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjYnIHJvd3M9JzInPlwiKyAoZWxldmVudGhUYWJsZS5jb2wwX3N0cjYgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMV9zdHI2JyByb3dzPScyJz5cIisgKGVsZXZlbnRoVGFibGUuY29sMV9zdHI2IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDJfc3RyNicgcm93cz0nMic+XCIrIChlbGV2ZW50aFRhYmxlLmNvbDJfc3RyNiB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0PC90YWJsZT5cXG5cXFxuXHRcdDwvZGl2PlwiXG5cdClcbn0iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xudmFyIHVpID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdWknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZmlmdGhUYWJsZSkge1xuXHRmaWZ0aFRhYmxlID0gZmlmdGhUYWJsZSB8fCB7fTtcblxuXHRyZXR1cm4gKFxuXHRcdFwiPGRpdiBjbGFzcz0nZmlmdGhUYWJsZSc+XFxuXFxcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxuXHRcdFx0XHQ8dHI+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgJz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Ql9CQ0JPQntCb0J7QktCe0Jo8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7ICc+XFxuXFxcblx0XHRcdFx0XHRcdNGC0LXQutGB0YJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0PC90YWJsZT5cXG5cXFxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTInPlxcblxcXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogMTk4cHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCa0L7QvNC/0LXRgtC10L3RhtC40Y88L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogNTQwcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0L7QstC10LTQtdC90YfQtdGB0LrQuNC5INC40L3QtNC40LrQsNGC0L7RgDwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY29sc3Bhbj0nMyc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7RhtC10L3QutCwINGA0LXQt9GD0LvRjNGC0LDRgtCwPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTInPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J/RgNC+0Y/QstC70Y/QtdGCINC/0L7Qu9C90L7RgdGC0YzRjjwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0YfQsNGB0YLQuNGH0L3Qvjwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntCx0YnQsNGPINC+0YbQtdC90LrQsDwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiAxOThweDsnIHJvd3NwYW49JzUnPtCb0Y7QsdC+0LLRjDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDU0MHB4Oyc+0J/RgNC+0Y/QstC70Y/QtdGCINC/0L7QstGL0YjQtdC90L3Ri9C5INC40L3RgtC10YDQtdGBINC6INC80LjRgNGDINC80L7QtNGLPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjApLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHIwX2J5NSwgJ2ZpZnRoVGFibGUuY29sMl9zdHIwX2J5NScpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qm9GO0LHQuNGCINGN0LvQtdCz0LDQvdGC0L3Rg9GOINC+0LHRg9Cy0Yw8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIxKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0LjQvdGC0LXRgNC10YEg0Log0JHRgNC10L3QtNGDINC4INC60L7QvNC/0LDQvdC40Lgg0LIg0YbQtdC70L7QvDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjIpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjInKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjRweDsnPtCn0YPQstGB0YLQstGD0LXRgiDQvdC10LzQsNGC0LXRgNC40LDQu9GM0L3Rg9GOINGG0LXQvdC90L7RgdGC0Ywg0LLQtdGJ0LXQuTwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDI0cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIzKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjRweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjMpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjMnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCf0L7QvdC40LzQsNC10YIg0Lgg0YDQsNC30LTQtdC70Y/QtdGCINGG0LXQvdC90L7RgdGC0Lgg0JHRgNC10L3QtNCwPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjQnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNScgc3R5bGU9J3dpZHRoOiAxOThweCc+0K3QvNC/0LDRgtC40YfQvdGL0Lk8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjRweDsnPtCj0L/RgNCw0LLQu9GP0LXRgiDRjdC80L7RhtC40Y/QvNC4INC4INC90LDRgdGC0YDQvtC10L3QuNC10Lwg0L/RgNC4INCy0LfQsNC40LzQvtC00LXQudGB0YLQstC40Lgg0YEg0LvRjtC00YzQvNC4PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjRweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjUpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjUnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyNHB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyNV9ieTUsICdmaWZ0aFRhYmxlLmNvbDJfc3RyNV9ieTUnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCf0YDQvtGP0LLQu9GP0LXRgiDRgtC+0LvQtdGA0LDQvdGC0L3QvtGB0YLRjCDQv9C+INC+0YLQvdC+0YjQtdC90LjRjiDQuiDQu9GO0LTRj9C8PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjYpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjYnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNiksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNicpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDU0MHB4Jz7Qo9C80LXQtdGCINC/0L7QvdGP0YLRjCDRjdC80L7RhtC40L7QvdCw0LvRjNC90L7QtSDRgdC+0YHRgtC+0Y/QvdC40LUg0YfQtdC70L7QstC10LrQsDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI3KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI3JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjgpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjcnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCf0YDQvtGP0LLQu9GP0LXRgiDQstC90LjQvNCw0L3QuNC1INC/0L4g0L7RgtC90L7RiNC10L3QuNGOINC6INC70Y7QtNGP0Lw8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyOCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyOCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI4KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI4JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qo9C/0YDQsNCy0LvRj9C10YIg0Y3QvNC+0YbQuNC+0L3QsNC70YzQvdGL0Lwg0YHQvtGB0YLQvtGP0L3QuNC10Lwg0LrQvtC80LDQvdC00Ys8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyOSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyOScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI5KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI5JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc1JyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QodC+0LLQtdGA0YjQtdC90YHRgtCy0YPRjtGJ0LjQudGB0Y88L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0LDQvNC+0YHRgtC+0Y/RgtC10LvRjNC90L4g0LjQvdC40YbQuNC40YDRg9C10YIg0LLQsNGA0LjQsNC90YLRiyDRgNC10YjQtdC90LjRjyDQt9Cw0LTQsNGHPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjEwKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIxMCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIxMCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMTAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgZmlmdGhUYWJsZS5jb2wyX3N0cjEwX2J5NSwgJ2ZpZnRoVGFibGUuY29sMl9zdHIxMF9ieTUnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCY0YHQv9C+0LvRjNC30YPQtdGCINGA0LDQt9C90YvQtSDQuNC90YHRgtGA0YPQvNC10L3RgtGLINC00LvRjyDRgdCw0LzQvtGA0LDQt9Cy0LjRgtC40Y88L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMTEpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjExJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjExKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxMScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyNHB4Oyc+0KHRgtGA0LXQvNC40YLRgdGPINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOINC90L7QstGL0YUg0LfQvdCw0L3QuNC5INCyINGA0LDQsdC+0YLQtTwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxMiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTInKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTIpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjEyJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntCx0YrQtdC60YLQuNCy0L3QviDQvtGG0LXQvdC40LLQsNC10YIg0YHQstC+0Lgg0YHQuNC70YzQvdGL0LUg0YHRgtC+0YDQvtC90Ysg0Lgg0LfQvtC90Ysg0YDQvtGB0YLQsDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxMyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTMnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTMpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjEzJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmNGJ0LXRgiDQvdC+0LLRi9C1INCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0LIg0L/RgNC+0YbQtdGB0YHQtSDQuNC30LzQtdC90LXQvdC40Lk8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMTQpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjE0JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjE0KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxNCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nOScgc3R5bGU9J3dpZHRoOiAxOThweCc+0KHQsNC80L7QvtGC0LLQtdGA0LbQtdC90L3Ri9C5PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntGC0LLQtdGC0YHRgtCy0LXQvdC90L4g0L/QvtC00YXQvtC00LjRgiDQuiDQstGL0L/QvtC70L3QtdC90LjRjiDQv9C+0YHRgtCw0LLQu9C10L3QvdGL0YUg0L/QtdGA0LXQtCDQvdC40Lwg0LfQsNC00LDRhzwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxNSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTUnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTUpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjE1JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc5JyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHIxNV9ieTksICdmaWZ0aFRhYmxlLmNvbDJfc3RyMTVfYnk5JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QndC10YHQtdGCINC+0YLQstC10YLRgdGC0LLQtdC90L3QvtGB0YLRjCDQt9CwINGB0L7QsdGB0YLQstC10L3QvdGL0LUg0YDQtdGI0LXQvdC40Y8g0Lgg0LTQtdC50YHRgtCy0LjRjzwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxNiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTYnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTYpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjE2JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodCy0L7QtdCy0YDQtdC80LXQvdC90L4g0LTQtdC70LjRgtGB0Y8g0LLQsNC20L3QvtC5INC40L3RhNC+0YDQvNCw0YbQuNC10Lkg0Lgg0YDQtdGB0YPRgNGB0LDQvNC4PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjE3KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIxNycpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIxNyksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMTcnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCT0L7RgtC+0LIg0YTQvtC60YPRgdC40YDQvtCy0LDRgtGM0YHRjyDQvdCwINC60L7QvNCw0L3QtNC90L7QuSDRgNCw0LHQvtGC0LU8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMTgpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjE4JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjE4KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxOCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JLRi9C/0L7Qu9C90Y/QtdGCINC30LDQtNCw0YfQuCDQsiDRgdC+0L7RgtCy0LXRgtGB0YLQstC40Lgg0YEg0L/QvtC70LjRgtC40LrQvtC5INC4INC/0YDQvtGG0LXQtNGD0YDQsNC80Lgg0LrQvtC80L/QsNC90LjQuDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxOSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTknKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTkpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjE5JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QkdC10YDQtdGCINC90LAg0YHQtdCx0Y8g0L7RgtCy0LXRgtGB0YLQstC10L3QvdC+0YHRgtGMINC30LAg0YDQsNCx0L7RgtGDINC4INGA0LXQt9GD0LvRjNGC0LDRgiDQutC+0LzQsNC90LTRizwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyMCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMjApLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjIwJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodGC0LDQstC40YIg0LjQvdGC0LXRgNC10YHRiyDQmtC+0LzQv9Cw0L3QuNC4INC90LDRgNCw0LLQvdC1INGB0L4g0YHQstC+0LjQvNC4PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjIxKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyMScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIyMSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMjEnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YLRgdGC0LDQuNCy0LDQtdGCINC40L3RgtC10YDQtdGB0Ysg0LrQvtC80LDQvdC00Ysg0LIg0YHQu9C+0LbQvdGL0YUg0YHQuNGC0YPQsNGG0LjRj9GFPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjIyKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyMicpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIyMiksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMjInKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCR0LXRgNC10YIg0L3QsCDRgdC10LHRjyDQtNC+0L/QvtC70L3QuNGC0LXQu9GM0L3Rg9GOINC+0YLQstC10YLRgdGC0LLQtdC90L3QvtGB0YLRjDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyMyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMjMnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMjMpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjIzJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc0JyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QntC/0YLQuNC80LjRgdGC0LjRh9C90YvQuTwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0KHQvtGF0YDQsNC90Y/QtdGCINC/0L7Qt9C40YLQuNCy0L3Ri9C5INC90LDRgdGC0YDQvtC5INC/0YDQuCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQuNC4INGBINC70Y7QtNGM0LzQuDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyNCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMjQnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMjQpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjI0JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc0JyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHIyNF9ieTQsICdmaWZ0aFRhYmxlLmNvbDJfc3RyMjRfYnk0JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QktC40LTQuNGCINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0LIg0L/RgNC+0LjRgdGF0L7QtNGP0YnQuNGFINC40LfQvNC10L3QtdC90LjRj9GFPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjI1KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyNScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIyNSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMjUnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCU0LXQvNC+0L3RgdGC0YDQuNGA0YPQtdGCINGD0LLQtdGA0LXQvdC90L7RgdGC0Ywg0LIg0YPRgdC/0LXRiNC90L7QvCDRgNCw0LfRgNC10YjQtdC90LjQuCDRgdC40YLRg9Cw0YbQuNC4PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjI2KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyNicpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIyNiksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMjYnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCi0YDQsNC90YHQu9C40YDRg9C10YIg0L7Qv9GC0LjQvNC40YHRgtC40YfQvdGL0Lkg0L3QsNGB0YLRgNC+0Lkg0L7QutGA0YPQttCw0Y7RidC40Lw8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMjcpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjI3JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjI3KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIyNycpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNScgc3R5bGU9J3dpZHRoOiAxOThweCc+0JTQuNC90LDQvNC40YfQvdGL0Lk8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCj0LzQtdC10YIg0LPRgNCw0LzQvtGC0L3QviDQv9C+0YHRgtCw0LLQuNGC0Ywg0L/QtdGA0LXQtCDRgdC+0LHQvtC5INGG0LXQu9GMPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjI4KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyOCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIyOCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMjgnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgZmlmdGhUYWJsZS5jb2wyX3N0cjI4X2J5NSwgJ2ZpZnRoVGFibGUuY29sMl9zdHIyOF9ieTUnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCU0L7RgdGC0LjQs9Cw0LXRgiDQv9C+0YHRgtCw0LLQu9C10L3QvdGL0YUg0YbQtdC70LXQuTwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyOSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMjknKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMjkpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjI5JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0KHQv9C+0YHQvtCx0LXQvSDQv9C10YDQtdC60LvRjtGH0LDRgtGM0YHRjyDQv9GA0Lgg0LLRi9C/0L7Qu9C90LXQvdC40Lgg0L7QtNC90L7QuSDQt9Cw0LTQsNGH0Lgg0L3QsCDQtNGA0YPQs9GD0Y4g0LHQtdC3INC/0L7RgtC10YDQuCDQutCw0YfQtdGB0YLQstCwPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjMwKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzMCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzMCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMzAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0LHQu9Cw0LTQsNC10YIg0YfQtdGC0LrQuNC8INCy0LjQtNC10L3QuNC10Lwg0YHQstC+0LjRhSDRhtC10LvQtdC5INCyINC00L7Qu9Cz0L7RgdGA0L7Rh9C90L7QuSDQv9C10YDRgdC/0LXQutGC0LjQstC1PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjMxKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzMScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzMSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMzEnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCf0YDQvtGP0LLQu9GP0LXRgiDRg9C/0L7RgNGB0YLQstC+INCyINGA0LXRiNC10L3QuNC4INC30LDQtNCw0YfQuCDQtNCw0LbQtSDRgdGC0LDQu9C60LjQstCw0Y/RgdGMINGBINGC0YDRg9C00L3QvtGB0YLRj9C80Lg8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzIpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjMyJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjMyKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzMicpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNicgc3R5bGU9J3dpZHRoOiAxOThweCc+0JLQvtGB0L/RgNC40LjQvNGH0LjQstGL0Lk8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCe0YLQutGA0YvRgiDQuiDQv9C+0LvRg9GH0LXQvdC40Y4g0L7QsdGA0LDRgtC90L7QuSDRgdCy0Y/Qt9C4PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjMzKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzMycpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzMyksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMzMnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzYnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgZmlmdGhUYWJsZS5jb2wyX3N0cjMzX2J5NiwgJ2ZpZnRoVGFibGUuY29sMl9zdHIzM19ieTYnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCR0YvRgdGC0YDQviDQsNC00LDQv9GC0LjRgNGD0LXRgtGB0Y8g0Log0L3QvtCy0YvQvCDQvtCx0YHRgtC+0Y/RgtC10LvRjNGB0YLQstCw0Lw8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzQpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjM0JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjM0KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzNCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0J/RgNC40L3QuNC80LDQtdGCINC40LTQtdC4INC4INC/0L7QtNC00LXRgNC20LjQstCw0LXRgiDQuNC90LjRhtC40LDRgtC40LLRgzwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIzNSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMzUnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMzUpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjM1JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0YDRgNC10LrRgtC40YDRg9C10YIg0YHQstC+0Lgg0LTQtdC50YHRgtCy0LjRjyDQv9C+0YHQu9C1INC/0L7Qu9GD0YfQtdC90LjRjyDQvtCx0YDQsNGC0L3QvtC5INGB0LLRj9C30Lg8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzYpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjM2JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjM2KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzNicpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JHRi9GB0YLRgNC+INGA0LXQsNCz0LjRgNGD0LXRgiDQvdCwINC40LfQvNC10L3QtdC90LjRjywg0LzQtdC90Y/QtdGCINGB0LLQvtC1INC/0L7QstC10LTQtdC90LjQtSDQsiDQvdC+0LLRi9GFINC+0LHRgdGC0L7Rj9GC0LXQu9GM0YHRgtCy0LDRhTwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIzNyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMzcnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMzcpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjM3JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodC/0L7RgdC+0LHQtdC9INC40LfQvNC10L3QuNGC0Ywg0YHQstC+0Y4g0YLQvtGH0LrRgyDQt9GA0LXQvdC40Y8g0L/QvtC0INCy0L7Qt9C00LXQudGB0YLQstC40LXQvCDQsNGA0LPRg9C80LXQvdGC0L7QsiDRgdC+0LHQtdGB0LXQtNC90LjQutCwPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjM4KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzOCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzOCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMzgnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzcnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCh0LjQu9GM0L3Ri9C5PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodGC0LDQstC40YIg0YbQtdC70Lgg0YfQu9C10L3QsNC8INC60L7QvNCw0L3QtNGLLCDQvtCx0L7Qt9C90LDRh9Cw0LXRgiDRgdGA0L7QutC4INC40YUg0LLRi9C/0L7Qu9C90LXQvdC40Y88L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzkpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjM5JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjM5KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzOScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNycgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyMzlfYnk3LCAnZmlmdGhUYWJsZS5jb2wyX3N0cjM5X2J5NycpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7QsdC+0LfQvdCw0YfQsNC10YIg0L7QttC40LTQsNC10LzRi9C5INGA0LXQt9GD0LvRjNGC0LDRgiDRh9C70LXQvdCw0Lwg0LrQvtC80LDQvdC00Ys8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNDApLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjQwJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjQwKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI0MCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J/QvtC00LTQtdGA0LbQuNCy0LDQtdGCINC4INCy0L7QstC70LXQutCw0LXRgiDRh9C70LXQvdC+0LIg0LrQvtC80LDQvdC00Ysg0LIg0YDQsNCx0L7RgtGDPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQxKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0MScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0MSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDEnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCU0LDQtdGCINGA0LDQt9Cy0LjQstCw0Y7RidGD0Y4g0L7QsdGA0LDRgtC90YPRjiDRgdCy0Y/Qt9GMINGH0LvQtdC90LDQvCDQutC+0LzQsNC90LTRizwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI0MiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNDInKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNDIpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjQyJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QoNCw0YHQv9GA0LXQtNC10LvRj9C10YIg0YDQtdGB0YPRgNGB0Ysg0Lgg0YDQvtC70Lgg0LIg0LrQvtC80LDQvdC00LUg0LTQu9GPINGD0YHQv9C10YjQvdC+0LPQviDQstGL0L/QvtC70L3QtdC90LjRjyDRhtC10LvQuDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI0MyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNDMnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNDMpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjQzJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QoNCw0YHRgdGC0LDQstC70Y/QtdGCINC/0YDQuNC+0YDQuNGC0LXRgtGLINC/0YDQuCDQstGL0L/QvtC70L3QtdC90LjQuCDQt9Cw0LTQsNGHPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQ0KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0NCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0NCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDQnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCk0L7QutGD0YHQuNGA0YPQtdGCINC60L7QvNCw0L3QtNGDINC90LAg0L/RgNC40L7RgNC40YLQtdGC0L3Ri9GFINC30LDQtNCw0YfQsNGFPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQ1KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0NScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0NSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDUnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzMnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCe0YLQutGA0L7QstC10L3QvdGL0Lk8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YbQtdC90LjQstCw0LXRgiDRg9GB0L/QtdGI0L3QvtGB0YLRjCDRgdCy0L7QtdC5INGA0LDQsdC+0YLRiyDQv9C+INGA0LXQt9GD0LvRjNGC0LDRgtCw0LwsINCwINC90LUg0L/QviDQv9GA0LjQu9C+0LbQtdC90L3Ri9C8INGD0YHQuNC70LjRj9C8PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQ2KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0NicpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0NiksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDYnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzMnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgZmlmdGhUYWJsZS5jb2wyX3N0cjQ2X2J5MywgJ2ZpZnRoVGFibGUuY29sMl9zdHI0Nl9ieTMnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCn0LXRgdGC0L3QviDQuCDRgdCy0L7QtdCy0YDQtdC80LXQvdC90L4g0LjQt9C70LDQs9Cw0LXRgiDRgdCy0L7RjiDQv9C+0LfQuNGG0LjRjiDQv9C+INGA0LDQt9C90YvQvCDQstC+0L/RgNC+0YHQsNC8PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQ3KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0NycpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0NyksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDcnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCe0YLQutGA0YvRgiDQuiDQvtCx0YnQtdC90LjRjiwg0LjRgdC60YDQtdC90LXQvSDQv9C+INC+0YLQvdC+0YjQtdC90LjRjiDQuiDQutC+0LvQu9C10LPQsNC8PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQ4KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0OCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0OCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDgnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzMnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCY0LfRi9GB0LrQsNC90L3Ri9C5PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDI0cHg7Jz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0L/QvtCy0YvRiNC10L3QvdC+0LUg0LLQvdC40LzQsNC90LjQtSDQuiDRgdGC0LjQu9C40YHRgtC40YfQtdGB0LrQuNC8INC4INGN0YHRgtC10YLQuNGH0LXRgdC60LjQvCDQsNGB0L/QtdC60YLQsNC8INCyINGA0LDQsdC+0YLQtSDQuCDQttC40LfQvdC4PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQ5KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0OScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0OSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDknKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzMnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgZmlmdGhUYWJsZS5jb2wyX3N0cjQ5X2J5MywgJ2ZpZnRoVGFibGUuY29sMl9zdHI0OV9ieTMnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCj0L/RgNCw0LLQu9GP0LXRgiDRgdGC0LjQu9C40YHRgtC40LrQvtC5INGA0LXRh9C4INC/0YDQuCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQuNC4INGBINC+0LrRgNGD0LbQsNGO0YnQuNC80Lgg0LvRjtC00YzQvNC4PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjUwKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI1MCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI1MCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNTAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCf0YDQvtGP0LLQu9GP0LXRgiDQtNC+0YHRgtC+0LjQvdGB0YLQstC+INC4INCy0LXQttC70LjQstC+0YHRgtGMPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjUxKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI1MScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI1MSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNTEnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzUnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCn0YPRgtC60LjQuTwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JTQsNC10YIg0LLQvtC30LzQvtC20L3QvtGB0YLRjCDQutCw0LbQtNC+0LzRgyDRh9C70LXQvdGDINC60L7QvNCw0L3QtNGLINCy0YvRgdC60LDQt9Cw0YLRjNGB0Y88L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTIpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjUyJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjUyKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1MicpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyNTJfYnk1LCAnZmlmdGhUYWJsZS5jb2wyX3N0cjUyX2J5NScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JfQsNC80LXRh9Cw0LXRgiDQuCDQv9C+0L7RidGA0Y/QtdGCINCy0LrQu9Cw0LQg0LTRgNGD0LPQuNGFPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjUzKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI1MycpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI1MyksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNTMnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjRweDsnPtCf0L7QvNC+0LPQsNC10YIg0YfQu9C10L3QsNC8INC60L7QvNCw0L3QtNGLINCw0LTQsNC/0YLQuNGA0L7QstCw0YLRjNGB0Y8g0Log0L3QvtCy0YvQvCDQuNC30LzQtdC90LXQvdC40Y/QvDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1NCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTQnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTQpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjU0JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodC70YvRiNC40YIg0LzQvdC10L3QuNC1INGB0L7QsdC10YHQtdC00L3QuNC60LAg0Lgg0YPRh9C40YLRi9Cy0LDQtdGCINC10LPQviDQv9GA0Lgg0L/RgNC40L3Rj9GC0LjQuCDRgNC10YjQtdC90LjRjzwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1NSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTUnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTUpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjU1JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDIxcHg7Jz7QktC90LjQvNCw0YLQtdC70LXQvSDQuiDQtNC10YLQsNC70Y/QvDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1NiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTYnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTYpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjU2JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPScyJyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QmNGB0YLQvtGA0LjRjzwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0J/RgNC+0Y/QstC70Y/QtdGCINC70L7Rj9C70YzQvdC+0YHRgtGMINC6INCR0YDQtdC90LTRgyDQuCDQutC+0LzQv9Cw0L3QuNC4INCyINGG0LXQu9C+0Lw8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTcpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjU3JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjU3KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1NycpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyNTdfYnkyLCAnZmlmdGhUYWJsZS5jb2wyX3N0cjU3X2J5MicpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JDRgdGB0L7RhtC40LjRgNGD0LXRgiDRgdC10LHRjyDRgSDQutC+0LzQv9Cw0L3QuNC10Lk8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTgpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjU4JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjU4KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1OCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nMycgc3R5bGU9J3dpZHRoOiAxOThweCc+0J7RgdC+0LHQtdC90L3Ri9C5PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodGC0YDRg9C60YLRg9GA0LjRgNC+0LLQsNC90L3QviDQuCDQv9C+0YHQu9C10LTQvtCy0LDRgtC10LvRjNC90L4g0LTQvtC90L7RgdC40YIg0YHQstC+0Lgg0LzRi9GB0LvQuDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1OSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTknKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTkpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjU5JykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSczJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHI1OV9ieTMsICdmaWZ0aFRhYmxlLmNvbDJfc3RyNTlfYnkzJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QkNGA0LPRg9C80LXQvdGC0LjRgNC+0LLQsNC90L4g0LLRi9GB0LrQsNC30YvQstCw0LXRgiDRgdCy0L7RjiDQv9C+0LfQuNGG0LjRjiwg0L7Qv9C10YDQuNGA0YPQtdGCINGE0LDQutGC0LDQvNC4PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjYwKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI2MCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI2MCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0LHQsNGP0YLQtdC70LXQvSwg0YPQvNC10LXRgiDQstGL0LfRi9Cy0LDRgtGMINGB0LjQvNC/0LDRgtC40Y48L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNjEpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjYxJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjYxKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI2MScpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0PC90YWJsZT5cXG5cXFxuXHRcdDwvZGl2PlwiXG5cdCk7XG59IiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXRpbHMnKTtcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZpZnRodGVlbnRoVGFibGUpIHtcblx0ZmlmdGh0ZWVudGhUYWJsZSA9IGZpZnRodGVlbnRoVGFibGUgfHwge307XG5cdHJldHVybiAoXG5cdFx0XCI8ZGl2IGNsYXNzPSdmaWZ0aHRlZW50aFRhYmxlJz5cXG5cXFxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInID5cXG5cXFxuXHRcdFx0XHQ8dHI+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCa0J7QnNCc0JXQndCi0JDQoNCY0Jgg0KDQo9Ca0J7QktCe0JTQmNCi0JXQm9CvPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdmaWZ0aHRlZW50aFRhYmxlLmNvbDBfc3RyMCcgcm93cz0nMTAnPlwiICsgKGZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0PC90YWJsZT5cXG5cXFxuXHRcdFx0PC9kaXY+XFxuXFxcblx0XHRcdDx0YWJsZT5cXG5cXFxuXHRcdFx0XHQ8dHI+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDM1cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIxKSwgJ2ZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIxJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx00KHQvtGC0YDRg9C00L3QuNC6INGB0L7Qs9C70LDRgdC10L1cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHI+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDM1cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIyKSwgJ2ZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIyJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx00KHQvtGC0YDRg9C00L3QuNC6INC90LUg0YHQvtCz0LvQsNGB0LXQvVxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHQ8L3RhYmxlPlwiXG5cdClcbn0iLCJ2YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmaXJzdFRhYmxlKSB7XHJcblx0Zmlyc3RUYWJsZSA9IGZpcnN0VGFibGUgfHwge307XHJcblx0dmFyIHN0YXJ0RGF0ZSA9ICFmaXJzdFRhYmxlLmNvbDBfc3RyMCA/ICcnIDogbW9tZW50KGZpcnN0VGFibGUuY29sMF9zdHIwKS5mb3JtYXQoJ0RELk1NLllZWVknKTtcclxuXHR2YXIgZmluaXNoRGF0ZSA9ICFmaXJzdFRhYmxlLmNvbDBfc3RyMSA/ICcnIDogbW9tZW50KGZpcnN0VGFibGUuY29sMF9zdHIxKS5mb3JtYXQoJ0RELk1NLllZWVknKTs7XHJcblx0XHJcblx0cmV0dXJuIChcclxuXHRcdFwiPGRpdiBjbGFzcz0nZmlyc3RUYWJsZSc+XFxuXFxcclxuXHRcdFx0PHRhYmxlIGJvcmRlci1zcGFjaW5nOiAwcHg7JyBhbGlnbj0nY2VudGVyJyBjbGFzcz0nYm9yZGVyX3RhYmxlX2RhdGUnPlxcblxcXHJcblx0XHRcdFx0PHRyPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweDsgcGFkZGluZy1sZWZ0OjEwcHg7JyBjb2xzcGFuPSczJyBjbGFzcz0nY29sb3JfaGVhZF9kYXRlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHTQntCm0JXQndCa0JAg0K3QpNCk0JXQmtCi0JjQktCd0J7QodCi0Jgg0J/QniDQmNCi0J7Qk9CQ0Jwg0JrQntCd0KLQoNCe0JvQrNCd0J7Qk9CeINCf0JXQoNCY0J7QlNCQXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfZGF0ZScgc3R5bGU9J3dpZHRoOiAzNXB4OyBoZWlnaHQ6IDQzcHg7IHBhZGRpbmctbGVmdDoxMHB4Oyc+QzogPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX2RhdGUnIHN0eWxlPSd3aWR0aDogMjI1cHg7IGhlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IHJlYWRvbmx5IHR5cGU9J3RleHQnIGNsYXNzPSdmaXJzdFRhYmxlX19kYXRlJyBuYW1lPSdmaXJzdFRhYmxlLmNvbDBfc3RyMCcgdmFsdWU9XCIgKyBzdGFydERhdGUgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX2RhdGUnIHJvd3NwYW49JzInPjwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfZGF0ZScgc3R5bGU9J3dpZHRoOiAzNXB4OyBoZWlnaHQ6IDQzcHg7IHBhZGRpbmctbGVmdDoxMHB4Oyc+0J/QnjogPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX2RhdGUnIHN0eWxlPSd3aWR0aDogMjI1cHg7IGhlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IHJlYWRvbmx5IHR5cGU9J3RleHQnIGNsYXNzPSdmaXJzdFRhYmxlX19kYXRlJyBuYW1lPSdmaXJzdFRhYmxlLmNvbDBfc3RyMScgdmFsdWU9XCIgKyBmaW5pc2hEYXRlICsgXCI+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdDwvdGFibGU+XFxuXFxcclxuXHRcdDwvZGl2PlwiXHJcblx0KTtcclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZvdXJ0ZWVudGhUYWJsZSkge1xuXHRmb3VydGVlbnRoVGFibGUgPSBmb3VydGVlbnRoVGFibGUgfHwge307XG5cdHJldHVybiAoXG5cdFx0XCI8ZGl2IGNsYXNzPSdmb3VydGVlbnRoVGFibGUnPiBcXG5cXFxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInIGNsYXNzPSdmb3VydGVlbnRoVGFibGUnPlxcblxcXG5cdFx0XHRcdDx0cj5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0JrQntCc0JzQldCd0KLQkNCg0JjQmCDQodCe0KLQoNCj0JTQndCY0JrQkDwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZm91cnRlZW50aFRhYmxlLmNvbDBfc3RyMCcgcm93cz0nMTAnPlwiKyAoZm91cnRlZW50aFRhYmxlLmNvbDBfc3RyMCB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0PC90YWJsZT5cXG5cXFxuXHRcdDwvZGl2PlwiXG5cdClcbn0iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xudmFyIHVpID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdWknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm91cnRoVGFibGUpIHtcblx0Zm91cnRoVGFibGUgPSBmb3VydGhUYWJsZSB8fCB7fTtcblxuXHRyZXR1cm4gKFxuXHRcdFwiPGRpdiBjbGFzcz0nZm91cnRoVGFibGUnPlxcblxcXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcic+XFxuXFxcblx0XHRcdFx0PHRyPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc1JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntCR0KnQkNCvINCe0KbQldCd0JrQkCDQktCr0J/QntCb0J3QldCd0JjQryDQoNCQ0JHQntCiPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0cj5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA3NDdweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J/QvtC00LLQtdC00LXQvdC40LUg0LjRgtC+0LPQvtCyINC/0L4g0LLRi9C/0L7Qu9C90LXQvdC40Y4g0L/QvtGB0YLQsNCy0LvQtdC90L3Ri9GFINGG0LXQu9C10Lkg0L/QviDQutC70Y7Rh9C10LLRi9C8INC/0L7QutCw0LfQsNGC0LXQu9GP0Lwg0Y3RhNGE0LXQutGC0LjQstC90L7RgdGC0Lg6PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgY29sc3Bhbj0nNCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7RhtC10L3QutCwINGA0LXQt9GD0LvRjNGC0LDRgtCwPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0cj5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NHB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QndC40LfQutC40Lk8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQtdC00L3QuNC5PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QpdC+0YDQvtGI0LjQuTwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0JLRi9GB0L7QutC40Lk8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NDdweDsnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2ZvdXJ0aFRhYmxlLmNvbDBfc3RyMCcgcm93cz0nMic+XCIgKyAoZm91cnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzRweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZm91cnRoVGFibGUuY29sMV9zdHIwKSwgJ2ZvdXJ0aFRhYmxlLmNvbDFfc3RyMCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZvdXJ0aFRhYmxlLmNvbDJfc3RyMCksICdmb3VydGhUYWJsZS5jb2wyX3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmb3VydGhUYWJsZS5jb2wzX3N0cjApLCAnZm91cnRoVGFibGUuY29sM19zdHIwJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZm91cnRoVGFibGUuY29sNF9zdHIwKSwgJ2ZvdXJ0aFRhYmxlLmNvbDRfc3RyMCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgJyBjb2xzcGFuPSc1Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdmb3VydGhUYWJsZS5jb2wwX2J5NV9zdHIxJyByb3dzPScyJyBzdHlsZT0nd2lkdGg6IDk2LjYlOyc+XCIgKyAoZm91cnRoVGFibGUuY29sMF9ieTVfc3RyMSB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0PC90YWJsZT5cXG5cXFxuXHRcdDwvZGl2PlwiXG5cdCk7XG59IiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXRpbHMnKTtcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5pbnRoVGFibGUpIHtcblx0bmludGhUYWJsZSA9IG5pbnRoVGFibGUgfHwge307XG5cblx0cmV0dXJuIChcblx0XHRcIjxkaXYgY2xhc3M9J25pbnRoVGFibGUnPlxcblxcXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcic+XFxuXFxcblx0XHRcdFx0PHRyPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc1JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntCR0KnQkNCvINCe0KbQldCd0JrQkCDQodCe0J7QotCS0JXQotCh0KLQktCY0K/QnCDQntCW0JjQlNCQ0J3QmNCv0Jwg0J7QoiDQlNCe0JvQltCd0J7QodCi0Jg8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyByb3dzcGFuPScyJyBzdHlsZT0nd2lkdGg6IDc0N3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9C+0LTQstC10LTQtdC90LjQtSDQuNGC0L7Qs9C+0LIg0L/QviDRgdC+0L7RgtCy0LXRgtGB0YLQstC40Y4g0LvQuNGH0L3QvtGB0YLQvdGL0Lwg0LrQvtC80L/QtdGC0LXQvdGG0LjRj9C8INC4INGE0YPQvdC60YbQuNC+0L3QsNC70YzQvdGL0Lwg0L3QsNCy0YvQutCw0Lw6PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgY29sc3Bhbj0nNCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7RhtC10L3QutCwINGA0LXQt9GD0LvRjNGC0LDRgtCwPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0cj5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NHB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QndC40LfQutC40Lk8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQtdC00L3QuNC5PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QpdC+0YDQvtGI0LjQuTwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0JLRi9GB0L7QutC40Lk8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NDdweDsnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J25pbnRoVGFibGUuY29sMF9zdHIwJyByb3dzPScyJz5cIiArIChuaW50aFRhYmxlLmNvbDBfc3RyMCB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc0cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKG5pbnRoVGFibGUuY29sMV9zdHIwKSwgJ25pbnRoVGFibGUuY29sMV9zdHIwJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wobmludGhUYWJsZS5jb2wyX3N0cjApLCAnbmludGhUYWJsZS5jb2wyX3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChuaW50aFRhYmxlLmNvbDNfc3RyMCksICduaW50aFRhYmxlLmNvbDNfc3RyMCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKG5pbnRoVGFibGUuY29sNF9zdHIwKSwgJ25pbnRoVGFibGUuY29sNF9zdHIwJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyAnIGNvbHNwYW49JzUnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J25pbnRoVGFibGUuY29sMF9ieTVfc3RyMScgcm93cz0nMicgc3R5bGU9J3dpZHRoOiA5Ni42JTsnPlwiICsgKG5pbnRoVGFibGUuY29sMF9ieTVfc3RyMSB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0PC90YWJsZT5cXG5cXFxuXHRcdDwvZGl2PlwiXG5cdCk7XG59IiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXRpbHMnKTtcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlY29uZFRhYmxlKSB7XG5cdHNlY29uZFRhYmxlID0gc2Vjb25kVGFibGUgfHwge307XG5cblx0cmV0dXJuIChcblx0XHRcIjxkaXYgY2xhc3M9J3NlY29uZFRhYmxlJz5cXG5cXFxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInPlxcblxcXG5cdFx0XHRcdDx0cj5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyAnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCX0JDQk9Ce0JvQntCS0J7Qmjwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0PC90YWJsZT5cXG5cXFxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInIGNsYXNzPSdhbGx0YWJsZXMnPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IGJsYW5jaGVkYWxtb25kOyB0ZXh0LWFsaWduOmNlbnRlcjsgaGVpZ2h0OiA0M3B4JyBjb2xzcGFuPSc5Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntCm0JXQndCa0JAg0JTQntCh0KLQmNCW0JXQndCY0K8g0KTQmNCd0JDQndCh0J7QktCr0KUgS1BJPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiAxOTNweDsgdGV4dC1hbGlnbjpjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6IGJsYW5jaGVkYWxtb25kOyAnIHJvd3NwYW49JzInPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPktQSTwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyB0ZXh0LWFsaWduOmNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogYmxhbmNoZWRhbG1vbmQ7ICcgcm93c3Bhbj0nMic+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KbQtdC70Yw8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweDsgdGV4dC1hbGlnbjpjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6IGJsYW5jaGVkYWxtb25kOyAnIHJvd3NwYW49JzInPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCg0LXQt9GD0LvRjNGC0LDRgjwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyB0ZXh0LWFsaWduOmNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogYmxhbmNoZWRhbG1vbmQ7ICcgcm93c3Bhbj0nMic+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J/RgNC+0YbQtdC90YIg0LTQvtGB0YLQuNC20LXQvdC40Y8g0YbQtdC70Lg8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd0ZXh0LWFsaWduOmNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogYmxhbmNoZWRhbG1vbmQ7JyBjb2xzcGFuPSc0Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntGG0LXQvdC60LAg0YDQtdC30YPQu9GM0YLQsNGC0LA8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogMjQ1cHg7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsgJyByb3dzcGFuPScyJz4gXFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0JrQvtC80LzQtdC90YLQsNGA0LjQuDwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgdGV4dC1hbGlnbjpjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6IGJsYW5jaGVkYWxtb25kOyc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J3QuNC30LrQuNC5PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQtdC00L3QuNC5PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsgJz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QpdC+0YDQvtGI0LjQuTwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NHB4OyB0ZXh0LWFsaWduOmNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogYmxhbmNoZWRhbG1vbmQ7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuTwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiAxOTNweDsgJz7Qn9C70LDQvSDQv9GA0L7QtNCw0LYg0LzQsNCz0LDQt9C40L3QsDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0nc2Vjb25kVGFibGUuY29sMF9zdHIwJyB0eXBlPSd0ZXh0JyB2YWx1ZT0nXCIrIChzZWNvbmRUYWJsZS5jb2wwX3N0cjAgfHwgJycpICtcIicgLz5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0nc2Vjb25kVGFibGUuY29sMV9zdHIwJyB0eXBlPSd0ZXh0JyB2YWx1ZT0nXCIrIChzZWNvbmRUYWJsZS5jb2wxX3N0cjAgfHwgJycpICtcIicgLz5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0nc2Vjb25kVGFibGUuY29sMl9zdHIwJyB0eXBlPSd0ZXh0JyB2YWx1ZT0nXCIrIChzZWNvbmRUYWJsZS5jb2wyX3N0cjAgfHwgJycpICtcIicgLz5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc1cHg7ICc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2wzX3N0cjApLCAnc2Vjb25kVGFibGUuY29sM19zdHIwJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsgJz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDRfc3RyMCksICdzZWNvbmRUYWJsZS5jb2w0X3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sNV9zdHIwKSwgJ3NlY29uZFRhYmxlLmNvbDVfc3RyMCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc0cHg7ICc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2w2X3N0cjApLCAnc2Vjb25kVGFibGUuY29sNl9zdHIwJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDI0NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIG5hbWU9J3NlY29uZFRhYmxlLmNvbDdfc3RyMCcgcm93cz0nMicgc3R5bGU9J3dpZHRoOiA5OCU7Jz5cIiArIChzZWNvbmRUYWJsZS5jb2w3X3N0cjAgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDE5M3B4OyBoZWlnaHQ6IDQ1cHg7Jz7QmtC+0L3QstC10YDRgdC40Y9cXG5cXFxuXHRcdFx0XHRcdFx0KNGG0LXQu9GMINC90LAg0LzQsNCz0LDQt9C40L0pXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiA0NXB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wwX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDBfc3RyMSB8fCAnJykgK1wiJy8+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiA0NXB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wxX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDFfc3RyMSB8fCAnJykgK1wiJy8+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiA0NXB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wyX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDJfc3RyMSB8fCAnJykgK1wiJy8+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDQ1cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sM19zdHIxKSwgJ3NlY29uZFRhYmxlLmNvbDNfc3RyMScpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiA0NXB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDRfc3RyMSksICdzZWNvbmRUYWJsZS5jb2w0X3N0cjEnKSArXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogNDVweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2w1X3N0cjEpLCAnc2Vjb25kVGFibGUuY29sNV9zdHIxJykgK1wiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NHB4OyBoZWlnaHQ6IDQ1cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sNl9zdHIxKSwgJ3NlY29uZFRhYmxlLmNvbDZfc3RyMScpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogMjQ1cHg7IGhlaWdodDogNDVweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBuYW1lPSdzZWNvbmRUYWJsZS5jb2w3X3N0cjEnIHJvd3M9JzInIHN0eWxlPSd3aWR0aDogOTglOycgY29scz0nMjAnPlwiICsgKHNlY29uZFRhYmxlLmNvbDdfc3RyMSB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogMTkzcHg7ICc+0KHRgNC10LTQvdC40Lkg0YfQtdC6XFxuXFxcblx0XHRcdFx0XHRcdCjRhtC10LvRjCDQvdCwINC80LDQs9Cw0LfQuNC9KVxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7ICc+XFxuXFxcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wwX3N0cjInIHR5cGU9J3RleHQnIHZhbHVlPSdcIiArIChzZWNvbmRUYWJsZS5jb2wwX3N0cjIgfHwgJycpICsgXCInLz5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0nc2Vjb25kVGFibGUuY29sMV9zdHIyJyB0eXBlPSd0ZXh0JyB2YWx1ZT0nXCIgKyAoc2Vjb25kVGFibGUuY29sMV9zdHIyIHx8ICcnKSArIFwiJy8+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgJz5cXG5cXFxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3NlY29uZFRhYmxlLmNvbDJfc3RyMicgdHlwZT0ndGV4dCcgdmFsdWU9J1wiICsgKHNlY29uZFRhYmxlLmNvbDJfc3RyMiB8fCAnJykgKyBcIicvPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIisgIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sM19zdHIyKSwgJ3NlY29uZFRhYmxlLmNvbDNfc3RyMicpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIisgIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sNF9zdHIyKSwgJ3NlY29uZFRhYmxlLmNvbDRfc3RyMicpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIisgIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sNV9zdHIyKSwgJ3NlY29uZFRhYmxlLmNvbDVfc3RyMicpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzRweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIisgIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sNl9zdHIyKSwgJ3NlY29uZFRhYmxlLmNvbDZfc3RyMicpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDI0NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIG5hbWU9J3NlY29uZFRhYmxlLmNvbDdfc3RyMicgcm93cz0nMicgc3R5bGU9J3dpZHRoOiA5OCU7JyBjb2xzPScyMCc+XCIgKyAoc2Vjb25kVGFibGUuY29sN19zdHIyIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiAxOTNweDsnPtCa0L7QvNC/0LvQtdC60YHQvdGL0Lkg0YfQtdC6XFxuXFxcblx0XHRcdFx0XHRcdCjRhtC10LvRjCDQvdCwINC80LDQs9Cw0LfQuNC9KVxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7ICc+XFxuXFxcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wwX3N0cjMnIHR5cGU9J3RleHQnIHZhbHVlPSdcIiArIChzZWNvbmRUYWJsZS5jb2wwX3N0cjMgfHwgJycpICsgXCInLz5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0nc2Vjb25kVGFibGUuY29sMV9zdHIzJyB0eXBlPSd0ZXh0JyB2YWx1ZT0nXCIgKyAoc2Vjb25kVGFibGUuY29sMV9zdHIzIHx8ICcnKSArIFwiJy8+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgJz5cXG5cXFxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3NlY29uZFRhYmxlLmNvbDJfc3RyMycgdHlwZT0ndGV4dCcgdmFsdWU9J1wiICsgKHNlY29uZFRhYmxlLmNvbDJfc3RyMyB8fCAnJykgKyBcIicvPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArICB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDNfc3RyMyksICdzZWNvbmRUYWJsZS5jb2wzX3N0cjMnKSArXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc1cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyAgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2w0X3N0cjMpLCAnc2Vjb25kVGFibGUuY29sNF9zdHIzJykgK1wiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sNV9zdHIzKSwgJ3NlY29uZFRhYmxlLmNvbDVfc3RyMycpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzRweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIisgIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sNl9zdHIzKSwgJ3NlY29uZFRhYmxlLmNvbDZfc3RyMycpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDI0NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIG5hbWU9J3NlY29uZFRhYmxlLmNvbDdfc3RyMycgcm93cz0nMicgc3R5bGU9J3dpZHRoOiA5OCU7JyBjb2xzPScyMCc+XCIgKyAoc2Vjb25kVGFibGUuY29sN19zdHIzIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0PC90YWJsZT5cXG5cXFxuXHRcdDwvZGl2PlwiXG5cdClcbn0iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xudmFyIHVpID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdWknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2V2ZW50aFRhYmxlKSB7XG5cdHNldmVudGhUYWJsZSA9IHNldmVudGhUYWJsZSB8fCB7fTtcblx0cmV0dXJuIChcblx0XHRcIjxkaXYgY2xhc3M9J3NldmVudGhUYWJsZSc+XFxuXFxcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJyBjbGFzcz0nc2V2ZW50aFRhYmxlJz5cXG5cXFxuXHRcdFx0ICAgIDx0Ym9keT5cXG5cXFxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIGNvbHNwYW49JzUnIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3RleHRib2xkJz7Ql9Cw0LPQvtC70L7QstC+0Lo8L3NwYW4+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogMTk4cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3RleHRib2xkJz7QpNGD0L3QutGG0LjQvtC90LDQu9GM0L3Ri9C5INC90LDQstGL0Lo8L3NwYW4+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCByb3dzcGFuPScyJyBzdHlsZT0nd2lkdGg6IDU0MHB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J/QvtCy0LXQtNC10L3Rh9C10YHQutC40Lkg0LjQvdC00LjQutCw0YLQvtGAPC9zcGFuPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgY29sc3Bhbj0nMyc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0YbQtdC90LrQsCDRgNC10LfRg9C70YzRgtCw0YLQsDwvc3Bhbj5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTInPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J/RgNC+0Y/QstC70Y/QtdGCINC/0L7Qu9C90L7RgdGC0YzRjjwvc3Bhbj5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0YDQvtGP0LLQu9GP0LXRgiDRh9Cw0YHRgtC40YfQvdC+PC9zcGFuPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7QsdGJ0LDRjyDQvtGG0LXQvdC60LA8L3NwYW4+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDE5OHB4Oycgcm93c3Bhbj0nOSc+0J3QsNCy0YvQutC4INGD0L/RgNCw0LLQu9C10L3QuNGPINC/0YDQvtC00LDQttCw0LzQuDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNTQwcHg7Jz7Qo9C/0YDQsNCy0LvRj9C10YIg0YHQtdGA0LLQuNGB0L7QvCDQsiDQvNCw0LPQsNC30LjQvdC1PC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMCksICdzZXZlbnRoVGFibGUuY29sMF9zdHIwJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIwKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCByb3dzcGFuPSc5JyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIrIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIHNldmVudGhUYWJsZS5jb2wyX3N0cjBfYnk5LCAnc2V2ZW50aFRhYmxlLmNvbDJfc3RyMF9ieTknKSArXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCk0L7RgNC80LjRgNGD0LXRgiDQvdCw0LLRi9C60Lgg0YDQsNCx0L7RgtGLINGBINC70L7Rj9C70YzQvdGL0LzQuCDQv9C+0LrRg9C/0LDRgtC10LvRj9C80Lgg0YMg0LrQvtC80LDQvdC00Ysg0LzQsNCz0LDQt9C40L3QsDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjNweDsnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjEpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMScpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyM3B4Oyc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIxJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JfQvdCw0LXRgiDQuCDQv9C+0L3QuNC80LDQtdGCINGA0L7Qt9C90LjRh9C90YvQtSBrcGk8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIyKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjInKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjIpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMicpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCQ0L3QsNC70LjQt9C40YDRg9C10YIg0Y3RhNGE0LXQutGC0LjQstC90L7RgdGC0Ywg0YDQsNCx0L7RgtGLINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjMnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjMpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMycpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0YLQsNCy0LjRgiDRhtC10LvQuCDQv9C+IGtwaSDRgdC+0YLRgNGD0LTQvdC40LrQsNC8INC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHI0KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjQnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjQpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyNCcpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0L7Qt9C00LDQtdGCINC40L3RgdGC0YDRg9C80LXQvdGC0Ysg0LTQu9GPINC00L7RgdGC0LjQttC10L3QuNGPINGG0LXQu9C10Lkg0L/QviBrcGk8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHI1KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjUnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjUpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyNScpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCY0L3QuNGG0LjQuNGA0YPQtdGCINC80LXRgNC+0L/RgNC40Y/RgtC40Y8g0L/QviDRg9Cy0LXQu9C40YfQtdC90LjRjiDRhNC40L3QsNC90YHQvtCy0YvRhSDQv9C+0LrQsNC30LDRgtC10LvQtdC5INC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHI2KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjYnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjYpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyNicpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCX0L3QsNC10YIg0LLQvtC30LzQvtC20L3QvtGB0YLQuCDQsiDRgNCw0LfQstC40YLQuNC4INGB0LLQvtC10LPQviDQvNCw0LPQsNC30LjQvdCwINC4INC40LzQtdC10YIg0L/Qu9Cw0L0g0LjRhSDRgNC10LDQu9C40LfQsNGG0LjQuDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjcpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyNycpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyNyksICdzZXZlbnRoVGFibGUuY29sMV9zdHI3JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC/0YDQuNC80LXQvdC10L3QuNC1INC40L3RgdGC0YDRg9C80LXQvdGC0L7QsiDQsiDRgNCw0LHQvtGC0LUg0YMg0L/QtdGA0YHQvtC90LDQu9CwINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHI4KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjgnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjgpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyOCcpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHJvd3NwYW49JzExJyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QndCw0LLRi9C60Lgg0YPQv9GA0LDQstC70LXQvdC40Y8g0L/QtdGA0YHQvtC90LDQu9C+0Lw8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0KHQvtC30LTQsNC10YIg0Lgg0L7Qv9GC0LjQvNC40LfQuNGA0YPQtdGCINCz0YDQsNGE0LjQuiDRgNCw0LHQvtGC0Ysg0L/QtdGA0YHQvtC90LDQu9CwPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyOSksICdzZXZlbnRoVGFibGUuY29sMF9zdHI5JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI5KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjknKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCByb3dzcGFuPScxMScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBzZXZlbnRoVGFibGUuY29sMl9zdHI5X2J5MTEsICdzZXZlbnRoVGFibGUuY29sMl9zdHI5X2J5MTEnKSArXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCk0L7RgNC80LjRgNGD0LXRgiDQutC+0LzQsNC90LTRgyDQvNCw0LPQsNC30LjQvdCwPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTApLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTAnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjEwKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjEwJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDU0MHB4Jz7QntGA0LPQsNC90LjQt9GD0LXRgiDQv9GA0L7RhtC10YHRgSDQt9Cw0LrRgNGL0YLQuNGPINC90LXRhdCy0LDRgtC60Lgg0LIg0LzQsNCz0LDQt9C40L3QtTwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjExKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjExJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIxMSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIxMScpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC80LXRgNC+0L/RgNC40Y/RgtC40Y8g0L/QviDRgdC+0LrRgNCw0YnQtdC90LjRjiDQvtGC0YLQvtC60L7QsiDQsiDQvNCw0LPQsNC30LjQvdC1PC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTIpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTInKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjEyKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjEyJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINGA0LXQsNC70LjQt9Cw0YbQuNGOINC/0YDQvtCz0YDQsNC80LzRiyDQsNC00LDQv9GC0LDRhtC40Lgg0Lgg0L3QsNGB0YLQsNCy0L3QuNGH0LXRgdGC0LLQsDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjEzKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjEzJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIxMyksICdzZXZlbnRoVGFibGUuY29sMV9zdHIxMycpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC/0YDQvtGG0LXRgdGBINC+0LHRg9GH0LXQvdC40Y8g0L3QsCDRgNCw0LHQvtGH0LXQvCDQvNC10YHRgtC1INC00LvRjyDQutC+0LzQsNC90LTRiyDQvNCw0LPQsNC30LjQvdCwPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyM3B4Oyc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTQpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTQnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjNweDsnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE0KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE0JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J/RgNC+0LLQvtC00LjRgiDQvtGG0LXQvdC60YMg0LrQsNC20LTQvtCz0L4g0YHQvtGC0YDRg9C00L3QuNC60LAg0LzQsNCz0LDQt9C40L3QsDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjE1KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjE1JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIxNSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIxNScpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCg0LDQt9GA0LDQsdCw0YLRi9Cy0LDQtdGCINCY0J/QoCDRgdC+0YLRgNGD0LTQvdC40LrQvtCyINC4INC60L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQuNGFINGA0LXQsNC70LjQt9Cw0YbQuNGOPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTYpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTYnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE2KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE2JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7RgNCz0LDQvdC40LfRg9C10YIg0YDQsNCx0L7RgtGDINGBINGC0LDQu9Cw0L3RgtCw0LzQuCDQsiDQvNCw0LPQsNC30LjQvdC1PC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTcpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTcnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE3KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE3JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JjRgdC/0L7Qu9GM0LfRg9C10YIg0YDQsNC30LvQuNGH0L3Ri9C1INC40L3RgdGC0YDRg9C80LXQvdGC0Ysg0LzQvtGC0LjQstCw0YbQuNC4INC00LvRjyDQv9C10YDRgdC+0L3QsNC70LA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIxOCksICdzZXZlbnRoVGFibGUuY29sMF9zdHIxOCcpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMTgpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMTgnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QoNCw0LfQstC40LLQsNC10YIg0L/QvtGC0LXQvdGG0LjQsNC7INC60L7QvNCw0L3QtNGLPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTkpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTknKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE5KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE5JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgcm93c3Bhbj0nOScgc3R5bGU9J3dpZHRoOiAxOThweCc+0J3QsNCy0YvQutC4INGD0L/RgNCw0LLQu9C10L3QuNGPINGC0L7QstCw0YDQvdGL0LzQuCDQv9GA0L7RhtC10YHRgdCw0LzQuDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0Lgg0YDQtdCw0LvQuNC30YPQtdGCINGB0YLQsNC90LTQsNGA0YLRiyDQstC40LfRg9Cw0LvRjNC90L7Qs9C+INC80LXRgNGH0LXQvdC00LDQudC30LjQvdCz0LA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIyMCksICdzZXZlbnRoVGFibGUuY29sMF9zdHIyMCcpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjApLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjAnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnIHJvd3NwYW49JzknPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIrIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIHNldmVudGhUYWJsZS5jb2wyX3N0cjIwX2J5OSwgJ3NldmVudGhUYWJsZS5jb2wyX3N0cjIwX2J5OScpICtcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0J7RgNCz0LDQvdC40LfRg9C10YIg0L/RgNC+0YbQtdGB0YEg0L/RgNC10LTQv9GA0L7QtNCw0LbQvdC+0Lkg0L/QvtC00LPQvtGC0L7QstC60Lgg0YLQvtCy0LDRgNCwPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyM3B4Oyc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjEpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjEnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjNweDsnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjIxKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjIxJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7RgNCz0LDQvdC40LfRg9C10YIg0L/RgNC+0YbQtdGB0YEg0L/RgNC40LXQvNC60Lgg0YLQvtCy0LDRgNCwPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjIpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjInKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjIyKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjIyJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7RgNCz0LDQvdC40LfRg9C10YIg0L/RgNC+0YbQtdGB0YEg0L7RgtCz0YDRg9C30LrQuCDRgtC+0LLQsNGA0LA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIyMyksICdzZXZlbnRoVGFibGUuY29sMF9zdHIyMycpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjMpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjMnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/QvtGA0Y/QtNC+0Log0L3QsCDRgdC60LvQsNC00LUg0Lgg0LIg0YLQvtGA0LPQvtCy0L7QvCDQt9Cw0LvQtTwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjI0KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjI0JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyNCksICdzZXZlbnRoVGFibGUuY29sMV9zdHIyNCcpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC/0YDQvtGG0LXRgdGBINC40L3QstC10L3RgtCw0YDQuNC30LDRhtC40Lgg0LIg0LzQsNCz0LDQt9C40L3QtTwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjI1KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjI1JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyNSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIyNScpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDRgdC40YHRgtC10LzRgyDQvNC10YDQvtC/0YDQuNGP0YLQuNC5INC/0L4g0L7RgNCz0LDQvdC40LfQsNGG0LjQuCDRgdC+0YXRgNCw0L3QvdC+0YHRgtC4INCi0JzQpjwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjI2KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjI2JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyNiksICdzZXZlbnRoVGFibGUuY29sMV9zdHIyNicpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC/0YDQvtGG0LXRgdGBINC/0LXRgNC10L7RhtC10L3QutC4PC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjcpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjcnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjI3KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjI3JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7RgNCz0LDQvdC40LfRg9C10YIg0L7Qv9GC0LjQvNCw0LvRjNC90L7QtSDRgNCw0LfQvNC10YnQtdC90LjQtSDRgtC+0LLQsNGA0LAg0L3QsCDRgdC60LvQsNC00LU8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIyOCksICdzZXZlbnRoVGFibGUuY29sMF9zdHIyOCcpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjgpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjgnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCByb3dzcGFuPScxNCcgc3R5bGU9J3dpZHRoOiAxOThweCc+0J3QsNCy0YvQutC4INGD0L/RgNCw0LLQu9C10L3QuNGPINC+0L/QtdGA0LDRhtC40L7QvdC90L7QuSDQtNC10Y/RgtC10LvRjNC90L7RgdGC0YzRjjwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9GA0L7QstC+0LTQuNGCINC80L7QvdC40YLQvtGA0LjQvdCzINC4INC+0YbQtdC90LrRgyDRgNCw0LHQvtGC0Ysg0LzQsNCz0LDQt9C40L3QsCDQv9C+INGH0LXQui3Qu9C40YHRgtGDPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjkpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjknKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjI5KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjI5JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4JyByb3dzcGFuPScxNCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICAgXCIrIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIHNldmVudGhUYWJsZS5jb2wyX3N0cjI5X2J5MTQsICdzZXZlbnRoVGFibGUuY29sMl9zdHIyOV9ieTE0JykgK1wiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/RgNC+0LLQvtC00LjQvNGL0LUg0L7Qv9C10YDQsNGG0LjQuCDQvdCwINCa0JrQnDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjMwKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjMwJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIzMCksICdzZXZlbnRoVGFibGUuY29sMV9zdHIzMCcpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQstC10LTQtdC90LjQtSDQutCw0YHRgdC+0LLQvtC5INC00L7QutGD0LzQtdC90YLQsNGG0LjQuDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjMxKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjMxJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIzMSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIzMScpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjQtSDQv9GA0LDQstC40Lsg0YDQsNCx0L7RgtGLINGBINC00LXQvdC10LbQvdC+0Lkg0L3QsNC70LjRh9C90L7RgdGC0YzRjjwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjMyKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjMyJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIzMiksICdzZXZlbnRoVGFibGUuY29sMV9zdHIzMicpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0LHRg9GH0LDQtdGCINC90LDQstGL0LrQsNC8INGA0LDQsdC+0YLRiyDQvdCwIFBPUyAt0YLQtdGA0LzQuNC90LDQu9C1PC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzMpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzMnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjMzKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjMzJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0JrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNC1INC/0YDQsNCy0LjQuyDQvtCx0LvRg9C20LjQstCw0L3QuNGPINC/0LvQsNGC0LXQttC90YvRhSDQutCw0YDRgiDQnNCf0KE8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDIzcHg7Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzNCksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzNCcpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyM3B4Oyc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzQpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzQnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/RgNC+0LLQtdC00LXQvdC40LUg0LjQvdC60LDRgdGB0LDRhtC40Lg8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzNSksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzNScpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzUpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzUnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/RgNC+0YbQtdGB0YEg0L7RgtC60YDRi9GC0LjRjy/Qt9Cw0LrRgNGL0YLQuNGPINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzNiksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzNicpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzYpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzYnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0YHQvtGB0YLQsNCy0LvQtdC90LjQtSDQutCw0LTRgNC+0LLQvtC5INC00L7QutGD0LzQtdC90YLQsNGG0LjQuDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjM3KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjM3JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIzNyksICdzZXZlbnRoVGFibGUuY29sMV9zdHIzNycpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDRhdGA0LDQvdC10L3QuNC1INC4INC/0LXRgNC10LTQsNGH0YMg0LjQvdGE0L7RgNC80LDRhtC40Lgg0L4g0LzQsNCz0LDQt9C40L3QtTwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjM4KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjM4JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIzOCksICdzZXZlbnRoVGFibGUuY29sMV9zdHIzOCcpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQvdCw0LvQuNGH0LjQtSDQvNC10LTQuNGG0LjQvdGB0LrQuNGFINC60L3QuNC20LXQujwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjM5KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjM5JykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIzOSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIzOScpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0LHRg9GH0LDQtdGCINGE0L7RgNC80LjRgNC+0LLQsNC90LjRjiBLUEkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1IDHQoTwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjQwKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjQwJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI0MCksICdzZXZlbnRoVGFibGUuY29sMV9zdHI0MCcpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQuNGB0L/RgNCw0LLQvdC+0YHRgtGMINGC0L7RgNCz0L7QstC+0LPQviDQvtCx0L7RgNGD0LTQvtCy0LDQvdC40Y88L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHI0MSksICdzZXZlbnRoVGFibGUuY29sMF9zdHI0MScpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyNDEpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyNDEnKSArIFwiXFxuXFxcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/QvtGA0Y/QtNC+0Log0LIg0YLQvtGA0LPQvtCy0L7QvCDQt9Cw0LvQtTwvdGQ+XFxuXFxcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjQyKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjQyJykgKyBcIlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI0MiksICdzZXZlbnRoVGFibGUuY29sMV9zdHI0MicpICsgXCJcXG5cXFxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXG5cdFx0XHQgICAgPC90Ym9keT5cXG5cXFxuXHRcdFx0PC90YWJsZT5cXG5cXFxuXHRcdDwvZGl2PlwiXG5cdClcbn0iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xudmFyIHVpID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdWknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2l4dGhUYWJsZSkge1xuXHRzaXh0aFRhYmxlID0gc2l4dGhUYWJsZSB8fCB7fTtcblx0cmV0dXJuIChcblx0XHRcIjxkaXYgY2xhc3M9J3NpeHRoVGFibGUnPlxcblxcXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcicgY2xhc3M9J3NpeHRoVGFibGUnPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTInPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNvbHNwYW49JzQnIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0YbQtdC90LrQsCDRgdC+0L7RgtCy0LXRgtGB0YLQstC40Y8g0LvQuNGH0L3QvtGB0YLQvdGL0Lwg0LrQvtC80L/QtdGC0LXQvdGG0LjRj9C8PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTInPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCd0LjQt9C60LjQuSDRgNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQtdC00L3QuNC5INGA0LXQt9GD0LvRjNGC0LDRgjwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KXQvtGA0L7RiNC40Lkg0YDQtdC30YPQu9GM0YLQsNGCPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuSDRgNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2l4dGhUYWJsZS5jb2wwX3N0cjApLCAnc2l4dGhUYWJsZS5jb2wwX3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2l4dGhUYWJsZS5jb2wxX3N0cjApLCAnc2l4dGhUYWJsZS5jb2wxX3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2l4dGhUYWJsZS5jb2wyX3N0cjApLCAnc2l4dGhUYWJsZS5jb2wyX3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2l4dGhUYWJsZS5jb2wzX3N0cjApLCAnc2l4dGhUYWJsZS5jb2wzX3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdDwvdGFibGU+XFxuXFxcblx0XHQ8L2Rpdj5cIlxuXHQpXG59IiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXRpbHMnKTtcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRlbnRoVGFibGUpIHtcblx0dGVudGhUYWJsZSA9IHRlbnRoVGFibGUgfHwge307XG5cblx0cmV0dXJuIChcblx0XHRcIjxkaXYgY2xhc3M9J3RlbnRoVGFibGUnPlxcblxcXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcic+XFxuXFxcblx0XHRcdFx0PHRyPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc1JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntCR0KnQkNCvINCe0KbQldCd0JrQkCDQrdCk0KTQldCa0KLQmNCS0J3QntCh0KLQmDwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHI+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogNzQ3cHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0L7QtNCy0LXQtNC10L3QuNC1INC40YLQvtCz0L7QsiDQv9GA0L7QvNC10LbRg9GC0L7Rh9C90L7QuSDQvtGG0LXQvdC60Lgg0LTQtdGP0YLQtdC70YzQvdC+0YHRgtC4INGB0L7RgtGA0YPQtNC90LjQutCwOjwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIGNvbHNwYW49JzQnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0YbQtdC90LrQsCDRgNC10LfRg9C70YzRgtCw0YLQsDwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHI+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSd3aWR0aDogNzRweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J3QuNC30LrQuNC5PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QodGA0LXQtNC90LjQuTwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KXQvtGA0L7RiNC40Lk8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCS0YvRgdC+0LrQuNC5PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzQ3cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0ZW50aFRhYmxlLmNvbDBfc3RyMCcgcm93cz0nMic+XCIgKyAodGVudGhUYWJsZS5jb2wwX3N0cjAgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NHB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0ZW50aFRhYmxlLmNvbDFfc3RyMCksICd0ZW50aFRhYmxlLmNvbDFfc3RyMCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRlbnRoVGFibGUuY29sMl9zdHIwKSwgJ3RlbnRoVGFibGUuY29sMl9zdHIwJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGVudGhUYWJsZS5jb2wzX3N0cjApLCAndGVudGhUYWJsZS5jb2wzX3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0ZW50aFRhYmxlLmNvbDRfc3RyMCksICd0ZW50aFRhYmxlLmNvbDRfc3RyMCcpICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgJyBjb2xzcGFuPSc1Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0ZW50aFRhYmxlLmNvbDBfYnk1X3N0cjEnIHJvd3M9JzInIHN0eWxlPSd3aWR0aDogOTYuNiU7Jz5cIiArICh0ZW50aFRhYmxlLmNvbDBfYnk1X3N0cjEgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdDwvdGFibGU+XFxuXFxcblx0XHQ8L2Rpdj5cIlxuXHQpO1xufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XG52YXIgdWkgPSByZXF1aXJlKCcuLi8uLi91dGlscy91aScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGlyZFRhYmxlKSB7XG5cdHRoaXJkVGFibGUgPSB0aGlyZFRhYmxlIHx8IHt9O1xuXG5cdHJldHVybiAoXG5cdFx0XCI8ZGl2IGNsYXNzPSd0aGlyZFRhYmxlJz5cXG5cXFxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInPlxcblxcXG5cdFx0XHRcdDx0cj5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgY29sc3Bhbj0nOScgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7QptCV0J3QmtCQINCf0J4g0JTQntCh0KLQmNCW0JXQndCY0K4g0J7Qn9CV0KDQkNCm0JjQntCd0J3Qq9ClIEtQSTwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHI+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogMTkzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPktQSTwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KbQtdC70YwgKCUpPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QoNC10LfRg9C70YzRgtCw0YIgKCUpPC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9GA0L7RhtC10L3RgiDQtNC+0YHRgtC40LbQtdC90LjRjyDRhtC10LvQuDwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogMjQ1cHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCa0L7QvNC80LXQvdGC0LDRgNC40Lg8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc0Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntGG0LXQvdC60LAg0YDQtdC30YPQu9GM0YLQsNGC0LA8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0naGVpZ2h0OiAyM3B4OyAnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCd0LjQt9C60LjQuTwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQtdC00L3QuNC5PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KXQvtGA0L7RiNC40Lk8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuTwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDE5M3B4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPtCe0YbQtdC90LrQsCDRgdC10YDQstC40YHQsDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDBfc3RyMCcgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wwX3N0cjAgfHwgJycpICsgXCI+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wxX3N0cjAnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMV9zdHIwIHx8ICcnKSArIFwiPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMl9zdHIwJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDJfc3RyMCB8fCAnJykgKyBcIj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDI0NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3RoaXJkVGFibGUuY29sM19zdHIwJyByb3dzPScyJz5cIisgKHRoaXJkVGFibGUuY29sM19zdHIwIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDRfc3RyMCksJ3RoaXJkVGFibGUuY29sNF9zdHIwJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyMCksJ3RoaXJkVGFibGUuY29sNV9zdHIwJykgICsgXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w2X3N0cjApLCAndGhpcmRUYWJsZS5jb2w2X3N0cjAnKSArIFwiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sN19zdHIwKSwgJ3RoaXJkVGFibGUuY29sN19zdHIwJykgKyBcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyNHB4OyB3aWR0aDogMTkzcHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+0KLQvtCy0LDRgNC90YvQtSDQv9C+0YLQtdGA0Lg8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wwX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMF9zdHIxIHx8ICcnKSArIFwiPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMV9zdHIxJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDFfc3RyMSB8fCAnJykgKyBcIj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDJfc3RyMScgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wyX3N0cjEgfHwgJycpICsgXCI+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiAyNDVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0aGlyZFRhYmxlLmNvbDNfc3RyMScgcm93cz0nMic+XCIgKyAodGhpcmRUYWJsZS5jb2wzX3N0cjEgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w0X3N0cjEpLCAndGhpcmRUYWJsZS5jb2w0X3N0cjEnKSArXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyMSksICd0aGlyZFRhYmxlLmNvbDVfc3RyMScpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNl9zdHIxKSwgJ3RoaXJkVGFibGUuY29sNl9zdHIxJykgK1wiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w3X3N0cjEpLCAndGhpcmRUYWJsZS5jb2w3X3N0cjEnKSArXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnIHN0eWxlPSd3aWR0aDogMTkzcHgnPtCe0YbQtdC90LrQsCDQv9C+INGE0L7RgtC+INC+0YLRh9C10YLQsNC8ICjQktCcKTwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDBfc3RyMicgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wwX3N0cjIgfHwgJycpICsgXCI+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wxX3N0cjInIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMV9zdHIyIHx8ICcnKSArIFwiPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMl9zdHIyJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDJfc3RyMiB8fCAnJykgKyBcIj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDI0NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3RoaXJkVGFibGUuY29sM19zdHIyJyByb3dzPScyJz5cIisgKHRoaXJkVGFibGUuY29sM19zdHIyIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNF9zdHIyKSwgJ3RoaXJkVGFibGUuY29sNF9zdHIyJykgK1wiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w1X3N0cjIpLCAndGhpcmRUYWJsZS5jb2w1X3N0cjInKSArXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDZfc3RyMiksICd0aGlyZFRhYmxlLmNvbDZfc3RyMicpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sN19zdHIyKSwgJ3RoaXJkVGFibGUuY29sN19zdHIyJykgK1wiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDE5M3B4Jz7QntGG0LXQvdC60LAg0L/QviDRh9C10Lot0LvQuNGB0YLRgyDQotCjPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMF9zdHIzJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDBfc3RyMyB8fCAnJykgKyBcIj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDFfc3RyMycgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wxX3N0cjMgfHwgJycpICsgXCI+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wyX3N0cjMnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMl9zdHIzIHx8ICcnKSArIFwiPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogMjQ1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndGhpcmRUYWJsZS5jb2wzX3N0cjMnIHJvd3M9JzInPlwiKyAodGhpcmRUYWJsZS5jb2wzX3N0cjMgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w0X3N0cjMpLCAndGhpcmRUYWJsZS5jb2w0X3N0cjMnKSArXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyMyksICd0aGlyZFRhYmxlLmNvbDVfc3RyMycpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNl9zdHIzKSwgJ3RoaXJkVGFibGUuY29sNl9zdHIzJykgK1wiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w3X3N0cjMpLCAndGhpcmRUYWJsZS5jb2w3X3N0cjMnKSArXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnIHN0eWxlPSd3aWR0aDogMTkzcHgnPtCe0YbQtdC90LrQsCDQstC90LXRiNC90LXQs9C+INCy0LjQtNCwPC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMF9zdHI0JyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDBfc3RyNCB8fCAnJykgKyBcIj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDFfc3RyNCcgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wxX3N0cjQgfHwgJycpICsgXCI+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wyX3N0cjQnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMl9zdHI0IHx8ICcnKSArIFwiPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogMjQ1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndGhpcmRUYWJsZS5jb2wzX3N0cjQnIHJvd3M9JzInPlwiKyAodGhpcmRUYWJsZS5jb2wzX3N0cjQgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w0X3N0cjQpLCAndGhpcmRUYWJsZS5jb2w0X3N0cjQnKSArXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyNCksICd0aGlyZFRhYmxlLmNvbDVfc3RyNCcpICtcIlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNl9zdHI0KSwgJ3RoaXJkVGFibGUuY29sNl9zdHI0JykgK1wiXFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w3X3N0cjQpLCAndGhpcmRUYWJsZS5jb2w3X3N0cjQnKSArXCJcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0PC90YWJsZT5cXG5cXFxuXHRcdDwvZGl2PlwiXG5cdClcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGlydGVlbnRoVGFibGUpIHtcblx0dGhpcnRlZW50aFRhYmxlID0gdGhpcnRlZW50aFRhYmxlIHx8IHt9O1xuXHRyZXR1cm4gKFxuXHRcdFwiPGRpdiBjbGFzcz0ndGhpcnRlZW50aFRhYmxlJz4gXFxuXFxcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJyBjbGFzcz0ndGhpcnRlZW50aFRhYmxlJz5cXG5cXFxuXHRcdFx0XHQ8dHI+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCU0J7Qm9CT0J7QodCg0J7Qp9Cd0KvQmSDQn9Cb0JDQnSDQuCDQtNC+0LPQvtCy0L7RgNC10L3QvdC+0YHRgtC4IDwvc3Bhbj5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0PC90cj5cXG5cXFxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndGhpcnRlZW50aFRhYmxlLmNvbDBfc3RyMCcgcm93cz0nMTAnPlwiICsgKHRoaXJ0ZWVudGhUYWJsZS5jb2wwX3N0cjAgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHQ8L3RhYmxlPlxcblxcXG5cdFx0PC9kaXY+XCJcblx0KVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHR3ZWxmdGhUYWJsZSkge1xuXHR0d2VsZnRoVGFibGUgPSB0d2VsZnRoVGFibGUgfHwge307XG5cdHJldHVybiAoXG5cdFx0XCI8ZGl2IGNsYXNzPSd0d2VsZnRoVGFibGUnPlxcblxcXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcicgY2xhc3M9J3R3ZWxmdGhUYWJsZSc+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlNCc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY29sc3Bhbj0nMycgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J/Qu9Cw0L0g0YDQsNC30LLQuNGC0LjRjyDQvdCwINC/0YDQtdC00YHRgtC+0Y/RidC40Lkg0L/QtdGA0LjQvtC0PC9zcGFuPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTQnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCm0LXQu9C4INGA0LDQt9Cy0LjRgtC40Y88L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCU0LXQudGB0YLQstC40Y88L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQvtC60Lg8L3NwYW4+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlNCc+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+0KfQtdCz0L4g0L3QtdC+0LHRhdC+0LTQuNC80L4g0LTQvtGB0YLQuNGH0Yw/INCa0LDQutC+0Lkg0YDQtdC30YPQu9GM0YLQsNGCINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQtNC+0YHRgtC40LPQvdGD0YIg0LIg0LjRgtC+0LPQtT9cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+0KfRgtC+INCy0Ysg0YHQtNC10LvQsNC10YLQtSwg0YfRgtC+0LHRiyDQtNC+0LHQuNGC0YzRgdGPINC/0L7RgdGC0LDQstC70LXQvdC90L7QuSDRhtC10LvQuD88L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPtCa0L7Qs9C00LAg0LLRiyDQtNC+0YHRgtC40LPQvdC40YLQtSDRhtC10LvQuD88L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wwX3N0cjAnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wwX3N0cjAgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMV9zdHIwJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMV9zdHIwIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDJfc3RyMCcgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDJfc3RyMCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wwX3N0cjEnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wwX3N0cjEgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMV9zdHIxJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMV9zdHIxIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDJfc3RyMScgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDJfc3RyMSB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wwX3N0cjInIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wwX3N0cjIgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMV9zdHIyJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMV9zdHIyIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDJfc3RyMicgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDJfc3RyMiB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wwX3N0cjMnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wwX3N0cjMgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMV9zdHIzJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMV9zdHIzIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDJfc3RyMycgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDJfc3RyMyB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wwX3N0cjQnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wwX3N0cjQgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMV9zdHI0JyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMV9zdHI0IHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDJfc3RyNCcgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDJfc3RyNCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wwX3N0cjUnIHJvd3M9JzInPlwiKyAodHdlbGZ0aFRhYmxlLmNvbDBfc3RyNSB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDFfc3RyNScgcm93cz0nMic+XCIrICh0d2VsZnRoVGFibGUuY29sMV9zdHI1IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMl9zdHI1JyByb3dzPScyJz5cIisgKHR3ZWxmdGhUYWJsZS5jb2wyX3N0cjUgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wwX3N0cjYnIHJvd3M9JzInPlwiKyAodHdlbGZ0aFRhYmxlLmNvbDBfc3RyNiB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDFfc3RyNicgcm93cz0nMic+XCIrICh0d2VsZnRoVGFibGUuY29sMV9zdHI2IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMl9zdHI2JyByb3dzPScyJz5cIisgKHR3ZWxmdGhUYWJsZS5jb2wyX3N0cjYgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcblx0XHRcdFx0XHQ8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdDwvdGFibGU+XFxuXFxcblx0XHQ8L2Rpdj5cIlxuXHQpXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlcikge1xuXHR1c2VyID0gdXNlciB8fCB7fTtcblx0cmV0dXJuIChcblx0XHRcIjxkaXYgY2xhc3M9J3VzZXJUZW1wbGF0ZSc+XFxuXFxcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxuXHRcdFx0XHQ8aW5wdXQgdHlwZT0naGlkZGVuJyBuYW1lPSdwZXJzb25faWQnIHZhbHVlPVwiKyB1c2VyLmlkICtcIiAvPlxcblxcXG5cdFx0XHRcdDx0cj5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDE5M3B4OyB0ZXh0LWFsaWduOmxlZnQ7IHBhZGRpbmctbGVmdDoxMHB4Oyc+XFxuXFxcblx0XHRcdFx0XHRcdNCk0JjQniDQodCe0KLQoNCj0JTQndCY0JrQkDpcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZScgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDI4OXB4Oyc+XCIgKyB1c2VyLm5hbWUgKyBcIjwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSdoZWlnaHQ6IDQzcHg7IHdpZHRoOiAxOTNweDsgdGV4dC1hbGlnbjpsZWZ0OyBwYWRkaW5nLWxlZnQ6MTBweDsnPlxcblxcXG5cdFx0XHRcdFx0XHTQn9Ce0JTQoNCQ0JfQlNCV0JvQldCd0JjQlTpcXG5cXFxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZScgc3R5bGU9J2hlaWdodDogNDNweCc+XCIgKyB1c2VyLnN1YmRpdmlzaW9uICsgXCI8L3RkPlxcblxcXG5cdFx0XHRcdDwvdHI+XFxuXFxcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJz5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4OyB3aWR0aDogMTkzcHg7IHRleHQtYWxpZ246bGVmdDsgcGFkZGluZy1sZWZ0OjEwcHg7Jz7QlNCe0JvQltCd0J7QodCi0Kw6PC90ZD5cXG5cXFxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4OyB3aWR0aDogMjg5cHg7JyBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cIiArIHVzZXIucG9zaXRpb24gKyBcIjwvdGQ+XFxuXFxcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDE5M3B4OyB0ZXh0LWFsaWduOmxlZnQ7IHBhZGRpbmctbGVmdDoxMHB4Oyc+0KTQmNCeINCg0KPQmtCe0JLQntCU0JjQotCV0JvQrzo8L3RkPlxcblxcXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlwiICsgdXNlci5ib3NzTmFtZSArIFwiPC90ZD5cXG5cXFxuXHRcdFx0XHQ8L3RyPlxcblxcXG5cdFx0XHQ8L3RhYmxlPlxcblxcXG5cdFx0PC9kaXY+XCJcblx0KTtcbn0iLCJ2YXIgQUpBWF9USU1FX09WRVIgPSAxMDAwMDtcclxuXHJcbnZhciBBamF4ID0ge1xyXG5cclxuICAgIGdldFhtbEh0dHA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHhtbEh0dHA7XHJcbiAgICAgICAgdHJ5IHsgeG1sSHR0cCA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFBcIik7IH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0cnkgeyB4bWxIdHRwID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTsgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7IHhtbEh0dHAgPSBmYWxzZTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXhtbEh0dHAgJiYgdHlwZW9mKFhNTEh0dHBSZXF1ZXN0KSAhPSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgeG1sSHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJldHVybiB4bWxIdHRwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZW5kUmVxdWVzdDogZnVuY3Rpb24odXJsLCBjYWxsQmFjaywgaXNDYWNoZSwgZGF0YSwgaXNTeW5jLCByZXF1ZXN0VHlwZSkge1xyXG5cclxuICAgICAgICB2YXIgeG1sSHR0cCA9IHRoaXMuZ2V0WG1sSHR0cCgpO1xyXG4gICAgICAgIHJlcXVlc3RUeXBlID0gcmVxdWVzdFR5cGUgfHwgJ0dFVCc7XHJcbiAgICAgICAgaXNTeW5jID0gaXNTeW5jIHx8IHRydWU7XHJcbiAgICAgICAgdXJsID0gaXNDYWNoZSA9PT0gZmFsc2UgfHwgIWlzQ2FjaGUgPyBlbmNvZGVVUkkodXJsICsgXCImcj1cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMDAwKSkgOiBlbmNvZGVVUkkodXJsKTtcclxuXHJcbiAgICAgICAgeG1sSHR0cC5vcGVuKHJlcXVlc3RUeXBlLCB1cmwsIGlzU3luYyk7XHJcbiAgICAgICAgeG1sSHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh4bWxIdHRwLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgICAgICBpZiAodGltZW91dClcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHhtbEh0dHAuc3RhdHVzID09IDIwMCAmJiBjYWxsQmFjayl7XHJcbiAgICAgICAgICAgICAgIGNhbGxCYWNrKHhtbEh0dHAucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhtbEh0dHAuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhtbEh0dHAuc3RhdHVzVGV4dCB8fCBcIkFqYXggcmVxdWVzdCBlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeG1sSHR0cC5zZW5kKGRhdGEgfHwgbnVsbCk7XHJcblxyXG4gICAgICAgIGlmIChpc1N5bmMpe1xyXG4gICAgICAgICAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7IFxyXG4gICAgICAgICAgICAgICAgeG1sSHR0cC5hYm9ydCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBamF4IHJlcXVlc3QgdGltZSBvdmVyXCIpO1xyXG4gICAgICAgICAgICB9LCBBSkFYX1RJTUVfT1ZFUik7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5BamF4ID0gQWpheDtcclxubW9kdWxlLmV4cG9ydHMgPSBBamF4OyAgICAgXHJcbiIsInZhciBBamF4ID0gcmVxdWlyZSgnLi9BamF4Jyk7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG5cclxudmFyIGZvcm1zID0ge1xyXG5cclxuXHRoaWRlQnV0dG9uczogZnVuY3Rpb24oKXtcclxuXHRcdCQoJyNyZW5kZXItcHJldmlldy1idXR0b25zJykuY3NzKHtkaXNwbGF5OiAnbm9uZSd9KTtcclxuXHR9LFxyXG5cclxuXHRzaG93QnV0dG9uczogZnVuY3Rpb24oKXtcclxuXHRcdCQoJyNyZW5kZXItcHJldmlldy1idXR0b25zJykuY3NzKHtkaXNwbGF5OiAnYmxvY2snfSk7XHJcblx0fSxcclxuXHJcblx0c2hvd1NwaW5uZXI6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoJy5vdmVybGF5LWxvYWRpbmcnKS5hZGRDbGFzcygnb3ZlcmxheS1sb2FkaW5nLS1zaG93Jyk7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlU3Bpbm5lcjogZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5vdmVybGF5LWxvYWRpbmcnKS5yZW1vdmVDbGFzcygnb3ZlcmxheS1sb2FkaW5nLS1zaG93Jyk7XHJcblx0fSxcclxuXHJcblx0cHJpbnQ6IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmhpZGVCdXR0b25zKCk7XHJcblx0XHR3aW5kb3cucHJpbnQoKTtcclxuXHRcdHRoaXMuc2hvd0J1dHRvbnMoKTtcclxuXHR9LFxyXG5cclxuXHRkb3dubG9hZEZpbGU6IGZ1bmN0aW9uKGFjdGlvbk5hbWUsIGZpbGVOYW1lKXtcclxuXHRcdHRoaXMuc2hvd1NwaW5uZXIoKTtcclxuXHRcdHZhciBhID0gJCgnPGEgaHJlZj0nICsgY29uZmlnLnVybC5jcmVhdGVQYXRoKHthY3Rpb25fbmFtZTogYWN0aW9uTmFtZSwgZmlsZV9uYW1lOiBmaWxlTmFtZX0pICsgJz48L2E+Jyk7IFxyXG5cdFx0JChkb2N1bWVudC5ib2R5KS5hcHBlbmQoYSk7XHJcblx0ICAgIGFbMF0uY2xpY2soKTtcclxuXHQgICAgYS5yZW1vdmUoKTtcclxuXHQgICAgdGhpcy5yZW1vdmVTcGlubmVyKCk7XHJcblx0fSxcclxuXHJcblx0c2F2ZVBkZjogZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHR0aGlzLmhpZGVCdXR0b25zKCk7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCA/IGV2ZW50LnByZXZlbnREZWZhdWx0KCkgOiAoZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZSk7XHJcblx0XHR2YXIgbWFya0RhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLm91dGVySFRNTDtcclxuXHRcdHRoaXMuc2hvd0J1dHRvbnMoKTtcclxuXHRcdEFqYXguc2VuZFJlcXVlc3QoY29uZmlnLnVybC5jcmVhdGVQYXRoKHthY3Rpb25fbmFtZTogJ2NyZWF0ZVBkZid9KSwgZnVuY3Rpb24oZmlsZU5hbWUpe1xyXG5cdFx0XHRzZWxmLmRvd25sb2FkRmlsZSgnZ2V0UGRmJywgZmlsZU5hbWUpO1xyXG5cdFx0fSwgZmFsc2UsIG1hcmtEYXRhLCB0cnVlLCAnUE9TVCcpO1xyXG5cdH0sXHJcblxyXG5cdHNhdmVEb2M6IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHR0aGlzLmhpZGVCdXR0b25zKCk7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCA/IGV2ZW50LnByZXZlbnREZWZhdWx0KCkgOiAoZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZSk7XHJcblx0XHR2YXIgbWFya0RhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLm91dGVySFRNTDtcclxuXHRcdHRoaXMuc2hvd0J1dHRvbnMoKTtcclxuXHRcdEFqYXguc2VuZFJlcXVlc3QoY29uZmlnLnVybC5jcmVhdGVQYXRoKHthY3Rpb25fbmFtZTogJ2NyZWF0ZURvYyd9KSwgZnVuY3Rpb24oZmlsZU5hbWUpe1xyXG5cdFx0XHRzZWxmLmRvd25sb2FkRmlsZSgnZ2V0RG9jJywgZmlsZU5hbWUpOyBcclxuXHRcdH0sIGZhbHNlLCBtYXJrRGF0YSwgdHJ1ZSwgJ1BPU1QnKTtcclxuXHR9LFxyXG5cclxuXHRyZXF1ZXN0UHJldmlld0Zvcm06IGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dmFyIGZvcm1UeXBlSWQgPSB1dGlscy5nZXRVcmxQYXJhbXMod2luZG93LmxvY2F0aW9uLmhyZWYsICdvYmplY3RfaWQnKTtcclxuXHRcdHZhciBmb3JtSWQgPSB1dGlscy5nZXRVcmxQYXJhbXMod2luZG93LnBhcmVudC5sb2NhdGlvbi5ocmVmLCAnb2JqZWN0X2lkJyk7XHJcblx0XHR3aW5kb3cucGFyZW50LmxvY2F0aW9uLmhyZWYgPSBcIi9hc3Nlc3NtZW50X2Zvcm0vaW5kZXguaHRtbD9wcmV2aWV3PTEmZm9ybV9pZD1cIiArIGZvcm1JZCArIFwiJmZvcm1fdHlwZV9pZD1cIiArIGZvcm1UeXBlSWQ7XHJcblx0fSxcclxuXHJcblx0c2VuZEZvcm06IGZ1bmN0aW9uKHN0YXR1cykge1xyXG5cdFx0JCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgaXNDaGVja2VkID0gJCh0aGlzKS5pcygnOmNoZWNrZWQnKTtcclxuXHRcdFx0dmFyIG5hbWUgPSAkKHRoaXMpLmF0dHIoJ25hbWUnKTtcclxuXHRcdFx0aWYgKCFpc0NoZWNrZWQpIHtcclxuXHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLmFwcGVuZCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiJytuYW1lKydcIiB2YWx1ZT1cIm9mZlwiPicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY3Rpb25Gb3JtJyk7XHJcblx0XHRmb3JtLmZvcm1faWQudmFsdWUgPSB1dGlscy5nZXRVcmxQYXJhbXMod2luZG93LnBhcmVudC5sb2NhdGlvbi5ocmVmLCAnb2JqZWN0X2lkJyk7XHJcblx0XHRmb3JtLmFjdGlvbi52YWx1ZSA9IHN0YXR1cztcclxuXHRcdGZvcm0uc3VibWl0KCk7IFxyXG5cdH1cclxufVxyXG5cclxud2luZG93LmZvcm1zID0gZm9ybXM7XHJcbm1vZHVsZS5leHBvcnRzID0gZm9ybXM7ICAgIFxyXG5cclxuIiwiLypcbiAgICAgIGpzb25fcGFyc2UuanNcbiAgICAgIDIwMTUtMDUtMDJcbiAgICAgIFB1YmxpYyBEb21haW4uXG4gICAgICBOTyBXQVJSQU5UWSBFWFBSRVNTRUQgT1IgSU1QTElFRC4gVVNFIEFUIFlPVVIgT1dOIFJJU0suXG4gICAgICBUaGlzIGZpbGUgY3JlYXRlcyBhIGpzb25fcGFyc2UgZnVuY3Rpb24uXG4gICAgICAgICAganNvbl9wYXJzZSh0ZXh0LCByZXZpdmVyKVxuICAgICAgICAgICAgICBUaGlzIG1ldGhvZCBwYXJzZXMgYSBKU09OIHRleHQgdG8gcHJvZHVjZSBhbiBvYmplY3Qgb3IgYXJyYXkuXG4gICAgICAgICAgICAgIEl0IGNhbiB0aHJvdyBhIFN5bnRheEVycm9yIGV4Y2VwdGlvbi5cbiAgICAgICAgICAgICAgVGhlIG9wdGlvbmFsIHJldml2ZXIgcGFyYW1ldGVyIGlzIGEgZnVuY3Rpb24gdGhhdCBjYW4gZmlsdGVyIGFuZFxuICAgICAgICAgICAgICB0cmFuc2Zvcm0gdGhlIHJlc3VsdHMuIEl0IHJlY2VpdmVzIGVhY2ggb2YgdGhlIGtleXMgYW5kIHZhbHVlcyxcbiAgICAgICAgICAgICAgYW5kIGl0cyByZXR1cm4gdmFsdWUgaXMgdXNlZCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCB2YWx1ZS5cbiAgICAgICAgICAgICAgSWYgaXQgcmV0dXJucyB3aGF0IGl0IHJlY2VpdmVkLCB0aGVuIHRoZSBzdHJ1Y3R1cmUgaXMgbm90IG1vZGlmaWVkLlxuICAgICAgICAgICAgICBJZiBpdCByZXR1cm5zIHVuZGVmaW5lZCB0aGVuIHRoZSBtZW1iZXIgaXMgZGVsZXRlZC5cbiAgICAgICAgICAgICAgRXhhbXBsZTpcbiAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIHRleHQuIFZhbHVlcyB0aGF0IGxvb2sgbGlrZSBJU08gZGF0ZSBzdHJpbmdzIHdpbGxcbiAgICAgICAgICAgICAgLy8gYmUgY29udmVydGVkIHRvIERhdGUgb2JqZWN0cy5cbiAgICAgICAgICAgICAgbXlEYXRhID0ganNvbl9wYXJzZSh0ZXh0LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGE7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgIGEgPVxuICAvXihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pVChcXGR7Mn0pOihcXGR7Mn0pOihcXGR7Mn0oPzpcXC5cXGQqKT8pWiQvLmV4ZWModmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygrYVsxXSwgK2FbMl0gLSAxLCArYVszXSwgK2FbNF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICArYVs1XSwgK2FbNl0pKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgVGhpcyBpcyBhIHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbi4gWW91IGFyZSBmcmVlIHRvIGNvcHksIG1vZGlmeSwgb3JcbiAgICAgIHJlZGlzdHJpYnV0ZS5cbiAgICAgIFRoaXMgY29kZSBzaG91bGQgYmUgbWluaWZpZWQgYmVmb3JlIGRlcGxveW1lbnQuXG4gICAgICBTZWUgaHR0cDovL2phdmFzY3JpcHQuY3JvY2tmb3JkLmNvbS9qc21pbi5odG1sXG4gICAgICBVU0UgWU9VUiBPV04gQ09QWS4gSVQgSVMgRVhUUkVNRUxZIFVOV0lTRSBUTyBMT0FEIENPREUgRlJPTSBTRVJWRVJTIFlPVSBET1xuICAgICAgTk9UIENPTlRST0wuXG4gICovXG5cbiAgLypqc2xpbnQgZm9yICovXG5cbiAgLypwcm9wZXJ0eSBcbiAgICAgIGF0LCBiLCBjYWxsLCBjaGFyQXQsIGYsIGZyb21DaGFyQ29kZSwgaGFzT3duUHJvcGVydHksIG1lc3NhZ2UsIG4sIG5hbWUsIFxuICAgICAgcHJvdG90eXBlLCBwdXNoLCByLCB0LCB0ZXh0XG4gICovXG5cbiAgdmFyIGpzb25fcGFyc2UgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRoYXQgY2FuIHBhcnNlIGEgSlNPTiB0ZXh0LCBwcm9kdWNpbmcgYSBKYXZhU2NyaXB0XG4gIC8vIGRhdGEgc3RydWN0dXJlLiBJdCBpcyBhIHNpbXBsZSwgcmVjdXJzaXZlIGRlc2NlbnQgcGFyc2VyLiBJdCBkb2VzIG5vdCB1c2VcbiAgLy8gZXZhbCBvciByZWd1bGFyIGV4cHJlc3Npb25zLCBzbyBpdCBjYW4gYmUgdXNlZCBhcyBhIG1vZGVsIGZvciBpbXBsZW1lbnRpbmdcbiAgLy8gYSBKU09OIHBhcnNlciBpbiBvdGhlciBsYW5ndWFnZXMuXG5cbiAgLy8gV2UgYXJlIGRlZmluaW5nIHRoZSBmdW5jdGlvbiBpbnNpZGUgb2YgYW5vdGhlciBmdW5jdGlvbiB0byBhdm9pZCBjcmVhdGluZ1xuICAvLyBnbG9iYWwgdmFyaWFibGVzLlxuXG4gICAgICB2YXIgYXQsICAgICAvLyBUaGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgY2hhcmFjdGVyXG4gICAgICAgICAgY2gsICAgICAvLyBUaGUgY3VycmVudCBjaGFyYWN0ZXJcbiAgICAgICAgICBlc2NhcGVlID0ge1xuICAgICAgICAgICAgICAnXCInOiAnXCInLFxuICAgICAgICAgICAgICAnXFxcXCc6ICdcXFxcJyxcbiAgICAgICAgICAgICAgJy8nOiAnLycsXG4gICAgICAgICAgICAgIGI6ICdcXGInLFxuICAgICAgICAgICAgICBmOiAnXFxmJyxcbiAgICAgICAgICAgICAgbjogJ1xcbicsXG4gICAgICAgICAgICAgIHI6ICdcXHInLFxuICAgICAgICAgICAgICB0OiAnXFx0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGV4dCxcblxuICAgICAgICAgIGVycm9yID0gZnVuY3Rpb24gKG0pIHtcblxuICAvLyBDYWxsIGVycm9yIHdoZW4gc29tZXRoaW5nIGlzIHdyb25nLlxuXG4gICAgICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdTeW50YXhFcnJvcicsXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtLFxuICAgICAgICAgICAgICAgICAgYXQ6IGF0LFxuICAgICAgICAgICAgICAgICAgdGV4dDogdGV4dFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gKGMpIHtcblxuICAvLyBJZiBhIGMgcGFyYW1ldGVyIGlzIHByb3ZpZGVkLCB2ZXJpZnkgdGhhdCBpdCBtYXRjaGVzIHRoZSBjdXJyZW50IGNoYXJhY3Rlci5cblxuICAgICAgICAgICAgICBpZiAoYyAmJiBjICE9PSBjaCkge1xuICAgICAgICAgICAgICAgICAgZXJyb3IoXCJFeHBlY3RlZCAnXCIgKyBjICsgXCInIGluc3RlYWQgb2YgJ1wiICsgY2ggKyBcIidcIik7XG4gICAgICAgICAgICAgIH1cblxuICAvLyBHZXQgdGhlIG5leHQgY2hhcmFjdGVyLiBXaGVuIHRoZXJlIGFyZSBubyBtb3JlIGNoYXJhY3RlcnMsXG4gIC8vIHJldHVybiB0aGUgZW1wdHkgc3RyaW5nLlxuXG4gICAgICAgICAgICAgIGNoID0gdGV4dC5jaGFyQXQoYXQpO1xuICAgICAgICAgICAgICBhdCArPSAxO1xuICAgICAgICAgICAgICByZXR1cm4gY2g7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIG51bWJlciA9IGZ1bmN0aW9uICgpIHtcblxuICAvLyBQYXJzZSBhIG51bWJlciB2YWx1ZS5cblxuICAgICAgICAgICAgICB2YXIgbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgc3RyaW5nID0gJyc7XG5cbiAgICAgICAgICAgICAgaWYgKGNoID09PSAnLScpIHtcbiAgICAgICAgICAgICAgICAgIHN0cmluZyA9ICctJztcbiAgICAgICAgICAgICAgICAgIG5leHQoJy0nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB3aGlsZSAoY2ggPj0gJzAnICYmIGNoIDw9ICc5Jykge1xuICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChjaCA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gJy4nO1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKG5leHQoKSAmJiBjaCA+PSAnMCcgJiYgY2ggPD0gJzknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChjaCA9PT0gJ2UnIHx8IGNoID09PSAnRScpIHtcbiAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJy0nIHx8IGNoID09PSAnKycpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG51bWJlciA9ICtzdHJpbmc7XG4gICAgICAgICAgICAgIGlmICghaXNGaW5pdGUobnVtYmVyKSkge1xuICAgICAgICAgICAgICAgICAgZXJyb3IoXCJCYWQgbnVtYmVyXCIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cbiAgLy8gUGFyc2UgYSBzdHJpbmcgdmFsdWUuXG5cbiAgICAgICAgICAgICAgdmFyIGhleCxcbiAgICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgICBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgIHVmZmZmO1xuXG4gIC8vIFdoZW4gcGFyc2luZyBmb3Igc3RyaW5nIHZhbHVlcywgd2UgbXVzdCBsb29rIGZvciBcIiBhbmQgXFwgY2hhcmFjdGVycy5cblxuICAgICAgICAgICAgICBpZiAoY2ggPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChuZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ3UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZmZmZiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGV4ID0gcGFyc2VJbnQobmV4dCgpLCAxNik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShoZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZmZmZiA9IHVmZmZmICogMTYgKyBoZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh1ZmZmZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVzY2FwZWVbY2hdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IGVzY2FwZWVbY2hdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVycm9yKFwiQmFkIHN0cmluZ1wiKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd2hpdGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgLy8gU2tpcCB3aGl0ZXNwYWNlLlxuXG4gICAgICAgICAgICAgIHdoaWxlIChjaCAmJiBjaCA8PSAnICcpIHtcbiAgICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3b3JkID0gZnVuY3Rpb24gKCkge1xuXG4gIC8vIHRydWUsIGZhbHNlLCBvciBudWxsLlxuXG4gICAgICAgICAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgICAgICAgICAgY2FzZSAndCc6XG4gICAgICAgICAgICAgICAgICBuZXh0KCd0Jyk7XG4gICAgICAgICAgICAgICAgICBuZXh0KCdyJyk7XG4gICAgICAgICAgICAgICAgICBuZXh0KCd1Jyk7XG4gICAgICAgICAgICAgICAgICBuZXh0KCdlJyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgY2FzZSAnZic6XG4gICAgICAgICAgICAgICAgICBuZXh0KCdmJyk7XG4gICAgICAgICAgICAgICAgICBuZXh0KCdhJyk7XG4gICAgICAgICAgICAgICAgICBuZXh0KCdsJyk7XG4gICAgICAgICAgICAgICAgICBuZXh0KCdzJyk7XG4gICAgICAgICAgICAgICAgICBuZXh0KCdlJyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIGNhc2UgJ24nOlxuICAgICAgICAgICAgICAgICAgbmV4dCgnbicpO1xuICAgICAgICAgICAgICAgICAgbmV4dCgndScpO1xuICAgICAgICAgICAgICAgICAgbmV4dCgnbCcpO1xuICAgICAgICAgICAgICAgICAgbmV4dCgnbCcpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZXJyb3IoXCJVbmV4cGVjdGVkICdcIiArIGNoICsgXCInXCIpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB2YWx1ZSwgIC8vIFBsYWNlIGhvbGRlciBmb3IgdGhlIHZhbHVlIGZ1bmN0aW9uLlxuXG4gICAgICAgICAgYXJyYXkgPSBmdW5jdGlvbiAoKSB7XG5cbiAgLy8gUGFyc2UgYW4gYXJyYXkgdmFsdWUuXG5cbiAgICAgICAgICAgICAgdmFyIGFycmF5ID0gW107XG5cbiAgICAgICAgICAgICAgaWYgKGNoID09PSAnWycpIHtcbiAgICAgICAgICAgICAgICAgIG5leHQoJ1snKTtcbiAgICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICddJykge1xuICAgICAgICAgICAgICAgICAgICAgIG5leHQoJ10nKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7ICAgLy8gZW1wdHkgYXJyYXlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjaCkge1xuICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2godmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICddJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0KCddJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgbmV4dCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZXJyb3IoXCJCYWQgYXJyYXlcIik7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIG9iamVjdCA9IGZ1bmN0aW9uICgpIHtcblxuICAvLyBQYXJzZSBhbiBvYmplY3QgdmFsdWUuXG5cbiAgICAgICAgICAgICAgdmFyIGtleSxcbiAgICAgICAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuXG4gICAgICAgICAgICAgIGlmIChjaCA9PT0gJ3snKSB7XG4gICAgICAgICAgICAgICAgICBuZXh0KCd7Jyk7XG4gICAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSAnfScpIHtcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0KCd9Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDsgICAvLyBlbXB0eSBvYmplY3RcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjaCkge1xuICAgICAgICAgICAgICAgICAgICAgIGtleSA9IHN0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgbmV4dCgnOicpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoJ0R1cGxpY2F0ZSBrZXkgXCInICsga2V5ICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQoJ30nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgbmV4dCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZXJyb3IoXCJCYWQgb2JqZWN0XCIpO1xuICAgICAgICAgIH07XG5cbiAgICAgIHZhbHVlID0gZnVuY3Rpb24gKCkge1xuXG4gIC8vIFBhcnNlIGEgSlNPTiB2YWx1ZS4gSXQgY291bGQgYmUgYW4gb2JqZWN0LCBhbiBhcnJheSwgYSBzdHJpbmcsIGEgbnVtYmVyLFxuICAvLyBvciBhIHdvcmQuXG5cbiAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgICAgICBjYXNlICd7JzpcbiAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdCgpO1xuICAgICAgICAgIGNhc2UgJ1snOlxuICAgICAgICAgICAgICByZXR1cm4gYXJyYXkoKTtcbiAgICAgICAgICBjYXNlICdcIic6XG4gICAgICAgICAgICAgIHJldHVybiBzdHJpbmcoKTtcbiAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICAgICAgcmV0dXJuIG51bWJlcigpO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiBjaCA+PSAnMCcgJiYgY2ggPD0gJzknIFxuICAgICAgICAgICAgICAgICAgPyBudW1iZXIoKSBcbiAgICAgICAgICAgICAgICAgIDogd29yZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBqc29uX3BhcnNlIGZ1bmN0aW9uLiBJdCB3aWxsIGhhdmUgYWNjZXNzIHRvIGFsbCBvZiB0aGUgYWJvdmVcbiAgLy8gZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXMuXG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlLCByZXZpdmVyKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgICAgIHRleHQgPSBzb3VyY2U7XG4gICAgICAgICAgYXQgPSAwO1xuICAgICAgICAgIGNoID0gJyAnO1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlKCk7XG4gICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICBpZiAoY2gpIHtcbiAgICAgICAgICAgICAgZXJyb3IoXCJTeW50YXggZXJyb3JcIik7XG4gICAgICAgICAgfVxuXG4gIC8vIElmIHRoZXJlIGlzIGEgcmV2aXZlciBmdW5jdGlvbiwgd2UgcmVjdXJzaXZlbHkgd2FsayB0aGUgbmV3IHN0cnVjdHVyZSxcbiAgLy8gcGFzc2luZyBlYWNoIG5hbWUvdmFsdWUgcGFpciB0byB0aGUgcmV2aXZlciBmdW5jdGlvbiBmb3IgcG9zc2libGVcbiAgLy8gdHJhbnNmb3JtYXRpb24sIHN0YXJ0aW5nIHdpdGggYSB0ZW1wb3Jhcnkgcm9vdCBvYmplY3QgdGhhdCBob2xkcyB0aGUgcmVzdWx0XG4gIC8vIGluIGFuIGVtcHR5IGtleS4gSWYgdGhlcmUgaXMgbm90IGEgcmV2aXZlciBmdW5jdGlvbiwgd2Ugc2ltcGx5IHJldHVybiB0aGVcbiAgLy8gcmVzdWx0LlxuXG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXZpdmVyID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgID8gKGZ1bmN0aW9uIHdhbGsoaG9sZGVyLCBrZXkpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBrLCB2LCB2YWx1ZSA9IGhvbGRlcltrZXldO1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSB3YWxrKHZhbHVlLCBrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVtrXSA9IHY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXZpdmVyLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgfSh7Jyc6IHJlc3VsdH0sICcnKSlcbiAgICAgICAgICAgICAgOiByZXN1bHQ7XG4gICAgICB9O1xuICB9KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGpzb25fcGFyc2U7IiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdGNyZWF0ZVNlbGVjdDogZnVuY3Rpb24gKHZhbHVlcywgc2VsZWN0ZWRWYWx1ZSwgbmFtZSkge1xuXHRcdHZhciBzZWxlY3QgPSBcIjxzZWxlY3QgbmFtZT1cIisgbmFtZSArXCIgc3R5bGU9J3dpZHRoOiA0NXB4Jz5cIjtcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR2YXIgb3B0aW9uID0gdmFsdWVzW2ldID09IHNlbGVjdGVkVmFsdWUgPyBcIjxvcHRpb24gc2VsZWN0ZWQ+XCIgKyB2YWx1ZXNbaV0gKyBcIjwvb3B0aW9uPlwiIDogXCI8b3B0aW9uPlwiICsgdmFsdWVzW2ldICsgXCI8L29wdGlvbj5cIjtcblx0XHRcdHNlbGVjdCArPSBvcHRpb247XG5cdFx0fTtcblx0XHRyZXR1cm4gc2VsZWN0LmNvbmNhdChcIjwvc2VsZWN0PlwiKTtcblx0fSxcblxuXHRjcmVhdGVDaGVja0JveDogZnVuY3Rpb24oaXNDaGVja2VkLCBuYW1lKXtcblx0XHRyZXR1cm4gaXNDaGVja2VkID09PSB0cnVlID8gXCI8aW5wdXQgbmFtZT1cIituYW1lK1wiIHR5cGU9J2NoZWNrYm94JyBjaGVja2VkLz5cIiA6IFwiPGlucHV0IG5hbWU9XCIrbmFtZStcIiB0eXBlPSdjaGVja2JveCcgLz5cIlxuXHR9XG59IiwidmFyIHV0aWxzID0ge1xyXG5cclxuXHRkZWNvZGVIdG1sOiBmdW5jdGlvbihzdHIpIHtcclxuXHRcdHZhciB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcblx0ICAgIHRleHRBcmVhLmlubmVySFRNTCA9IHN0cjtcclxuXHQgXHR2YXIgb3V0U3RyID0gdGV4dEFyZWEudmFsdWUucmVwbGFjZSgvJiMoXFxkKyk7L2csIGZ1bmN0aW9uKG1hdGNoLCBkZWMpIHtcclxuXHRcdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZGVjKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG91dFN0cjtcclxuXHRcdFxyXG5cdH0sXHJcblx0XHJcblx0c3RyQm9vbFRvQm9vbDogZnVuY3Rpb24gKGJvb2xTdHIpIHtcclxuXHRcdGlmIChib29sU3RyID09PSB1bmRlZmluZWQgfHwgYm9vbFN0ciA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0cmV0dXJuIChib29sU3RyID09PSAnMCd8fCBib29sU3RyID09PSAnZmFsc2UnKSA/IGZhbHNlIDogdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRnZXRVcmxQYXJhbXM6IGZ1bmN0aW9uKHVybCwgcGFyYW0pe1xyXG5cdFx0aWYgKCF1cmwpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHZhciB2YXJzID0ge307XHJcblx0ICAgIHVybC5yZXBsYWNlKCBcclxuXHRcdFx0L1s/Jl0rKFtePSZdKyk9PyhbXiZdKik/L2dpLFxyXG5cdFx0XHRmdW5jdGlvbiggbSwga2V5LCB2YWx1ZSApIHtcclxuXHRcdFx0XHR2YXJzW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiAnJztcclxuXHRcdFx0fVxyXG5cdCAgICApO1xyXG5cclxuXHQgICAgaWYgKHBhcmFtKSByZXR1cm4gdmFyc1twYXJhbV07XHJcblx0ICAgIHJldHVybiB2YXJzO1xyXG5cdH1cclxufVxyXG5cclxud2luZG93LnV0aWxzID0gdXRpbHM7XHJcbm1vZHVsZS5leHBvcnRzID0gdXRpbHM7IiwiLy8hIG1vbWVudC5qc1xuLy8hIHZlcnNpb24gOiAyLjExLjJcbi8vISBhdXRob3JzIDogVGltIFdvb2QsIElza3JlbiBDaGVybmV2LCBNb21lbnQuanMgY29udHJpYnV0b3JzXG4vLyEgbGljZW5zZSA6IE1JVFxuLy8hIG1vbWVudGpzLmNvbVxuXG47KGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICBnbG9iYWwubW9tZW50ID0gZmFjdG9yeSgpXG59KHRoaXMsIGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGhvb2tDYWxsYmFjaztcblxuICAgIGZ1bmN0aW9uIHV0aWxzX2hvb2tzX19ob29rcyAoKSB7XG4gICAgICAgIHJldHVybiBob29rQ2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGlzIGRvbmUgdG8gcmVnaXN0ZXIgdGhlIG1ldGhvZCBjYWxsZWQgd2l0aCBtb21lbnQoKVxuICAgIC8vIHdpdGhvdXQgY3JlYXRpbmcgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICAgIGZ1bmN0aW9uIHNldEhvb2tDYWxsYmFjayAoY2FsbGJhY2spIHtcbiAgICAgICAgaG9va0NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBcnJheShpbnB1dCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RhdGUoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgRGF0ZSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBEYXRlXSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFwKGFyciwgZm4pIHtcbiAgICAgICAgdmFyIHJlcyA9IFtdLCBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICByZXMucHVzaChmbihhcnJbaV0sIGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc093blByb3AoYSwgYikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGEsIGIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gYikge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AoYiwgaSkpIHtcbiAgICAgICAgICAgICAgICBhW2ldID0gYltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd0b1N0cmluZycpKSB7XG4gICAgICAgICAgICBhLnRvU3RyaW5nID0gYi50b1N0cmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd2YWx1ZU9mJykpIHtcbiAgICAgICAgICAgIGEudmFsdWVPZiA9IGIudmFsdWVPZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyAoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsT3JVVEMoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIHRydWUpLnV0YygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRQYXJzaW5nRmxhZ3MoKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZGVlcCBjbG9uZSB0aGlzIG9iamVjdC5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVtcHR5ICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgdW51c2VkVG9rZW5zICAgIDogW10sXG4gICAgICAgICAgICB1bnVzZWRJbnB1dCAgICAgOiBbXSxcbiAgICAgICAgICAgIG92ZXJmbG93ICAgICAgICA6IC0yLFxuICAgICAgICAgICAgY2hhcnNMZWZ0T3ZlciAgIDogMCxcbiAgICAgICAgICAgIG51bGxJbnB1dCAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgaW52YWxpZE1vbnRoICAgIDogbnVsbCxcbiAgICAgICAgICAgIGludmFsaWRGb3JtYXQgICA6IGZhbHNlLFxuICAgICAgICAgICAgdXNlckludmFsaWRhdGVkIDogZmFsc2UsXG4gICAgICAgICAgICBpc28gICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBhcnNpbmdGbGFncyhtKSB7XG4gICAgICAgIGlmIChtLl9wZiA9PSBudWxsKSB7XG4gICAgICAgICAgICBtLl9wZiA9IGRlZmF1bHRQYXJzaW5nRmxhZ3MoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS5fcGY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRfX2lzVmFsaWQobSkge1xuICAgICAgICBpZiAobS5faXNWYWxpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgZmxhZ3MgPSBnZXRQYXJzaW5nRmxhZ3MobSk7XG4gICAgICAgICAgICBtLl9pc1ZhbGlkID0gIWlzTmFOKG0uX2QuZ2V0VGltZSgpKSAmJlxuICAgICAgICAgICAgICAgIGZsYWdzLm92ZXJmbG93IDwgMCAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5lbXB0eSAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkTW9udGggJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZFdlZWtkYXkgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MubnVsbElucHV0ICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRGb3JtYXQgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MudXNlckludmFsaWRhdGVkO1xuXG4gICAgICAgICAgICBpZiAobS5fc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgbS5faXNWYWxpZCA9IG0uX2lzVmFsaWQgJiZcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MuY2hhcnNMZWZ0T3ZlciA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICBmbGFncy51bnVzZWRUb2tlbnMubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLmJpZ0hvdXIgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS5faXNWYWxpZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZF9fY3JlYXRlSW52YWxpZCAoZmxhZ3MpIHtcbiAgICAgICAgdmFyIG0gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoTmFOKTtcbiAgICAgICAgaWYgKGZsYWdzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGV4dGVuZChnZXRQYXJzaW5nRmxhZ3MobSksIGZsYWdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS51c2VySW52YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVbmRlZmluZWQoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09PSB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gUGx1Z2lucyB0aGF0IGFkZCBwcm9wZXJ0aWVzIHNob3VsZCBhbHNvIGFkZCB0aGUga2V5IGhlcmUgKG51bGwgdmFsdWUpLFxuICAgIC8vIHNvIHdlIGNhbiBwcm9wZXJseSBjbG9uZSBvdXJzZWx2ZXMuXG4gICAgdmFyIG1vbWVudFByb3BlcnRpZXMgPSB1dGlsc19ob29rc19faG9va3MubW9tZW50UHJvcGVydGllcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY29weUNvbmZpZyh0bywgZnJvbSkge1xuICAgICAgICB2YXIgaSwgcHJvcCwgdmFsO1xuXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faXNBTW9tZW50T2JqZWN0KSkge1xuICAgICAgICAgICAgdG8uX2lzQU1vbWVudE9iamVjdCA9IGZyb20uX2lzQU1vbWVudE9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2kpKSB7XG4gICAgICAgICAgICB0by5faSA9IGZyb20uX2k7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9mKSkge1xuICAgICAgICAgICAgdG8uX2YgPSBmcm9tLl9mO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbCkpIHtcbiAgICAgICAgICAgIHRvLl9sID0gZnJvbS5fbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3N0cmljdCkpIHtcbiAgICAgICAgICAgIHRvLl9zdHJpY3QgPSBmcm9tLl9zdHJpY3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl90em0pKSB7XG4gICAgICAgICAgICB0by5fdHptID0gZnJvbS5fdHptO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faXNVVEMpKSB7XG4gICAgICAgICAgICB0by5faXNVVEMgPSBmcm9tLl9pc1VUQztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX29mZnNldCkpIHtcbiAgICAgICAgICAgIHRvLl9vZmZzZXQgPSBmcm9tLl9vZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9wZikpIHtcbiAgICAgICAgICAgIHRvLl9wZiA9IGdldFBhcnNpbmdGbGFncyhmcm9tKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2xvY2FsZSkpIHtcbiAgICAgICAgICAgIHRvLl9sb2NhbGUgPSBmcm9tLl9sb2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9tZW50UHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGkgaW4gbW9tZW50UHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIHByb3AgPSBtb21lbnRQcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgICAgIHZhbCA9IGZyb21bcHJvcF07XG4gICAgICAgICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0bztcbiAgICB9XG5cbiAgICB2YXIgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG4gICAgLy8gTW9tZW50IHByb3RvdHlwZSBvYmplY3RcbiAgICBmdW5jdGlvbiBNb21lbnQoY29uZmlnKSB7XG4gICAgICAgIGNvcHlDb25maWcodGhpcywgY29uZmlnKTtcbiAgICAgICAgdGhpcy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5fZCAhPSBudWxsID8gY29uZmlnLl9kLmdldFRpbWUoKSA6IE5hTik7XG4gICAgICAgIC8vIFByZXZlbnQgaW5maW5pdGUgbG9vcCBpbiBjYXNlIHVwZGF0ZU9mZnNldCBjcmVhdGVzIG5ldyBtb21lbnRcbiAgICAgICAgLy8gb2JqZWN0cy5cbiAgICAgICAgaWYgKHVwZGF0ZUluUHJvZ3Jlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB1cGRhdGVJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgICAgICB1cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc01vbWVudCAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBNb21lbnQgfHwgKG9iaiAhPSBudWxsICYmIG9iai5faXNBTW9tZW50T2JqZWN0ICE9IG51bGwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFic0Zsb29yIChudW1iZXIpIHtcbiAgICAgICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0ludChhcmd1bWVudEZvckNvZXJjaW9uKSB7XG4gICAgICAgIHZhciBjb2VyY2VkTnVtYmVyID0gK2FyZ3VtZW50Rm9yQ29lcmNpb24sXG4gICAgICAgICAgICB2YWx1ZSA9IDA7XG5cbiAgICAgICAgaWYgKGNvZXJjZWROdW1iZXIgIT09IDAgJiYgaXNGaW5pdGUoY29lcmNlZE51bWJlcikpIHtcbiAgICAgICAgICAgIHZhbHVlID0gYWJzRmxvb3IoY29lcmNlZE51bWJlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gY29tcGFyZSB0d28gYXJyYXlzLCByZXR1cm4gdGhlIG51bWJlciBvZiBkaWZmZXJlbmNlc1xuICAgIGZ1bmN0aW9uIGNvbXBhcmVBcnJheXMoYXJyYXkxLCBhcnJheTIsIGRvbnRDb252ZXJ0KSB7XG4gICAgICAgIHZhciBsZW4gPSBNYXRoLm1pbihhcnJheTEubGVuZ3RoLCBhcnJheTIubGVuZ3RoKSxcbiAgICAgICAgICAgIGxlbmd0aERpZmYgPSBNYXRoLmFicyhhcnJheTEubGVuZ3RoIC0gYXJyYXkyLmxlbmd0aCksXG4gICAgICAgICAgICBkaWZmcyA9IDAsXG4gICAgICAgICAgICBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgoZG9udENvbnZlcnQgJiYgYXJyYXkxW2ldICE9PSBhcnJheTJbaV0pIHx8XG4gICAgICAgICAgICAgICAgKCFkb250Q29udmVydCAmJiB0b0ludChhcnJheTFbaV0pICE9PSB0b0ludChhcnJheTJbaV0pKSkge1xuICAgICAgICAgICAgICAgIGRpZmZzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpZmZzICsgbGVuZ3RoRGlmZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBMb2NhbGUoKSB7XG4gICAgfVxuXG4gICAgLy8gaW50ZXJuYWwgc3RvcmFnZSBmb3IgbG9jYWxlIGNvbmZpZyBmaWxlc1xuICAgIHZhciBsb2NhbGVzID0ge307XG4gICAgdmFyIGdsb2JhbExvY2FsZTtcblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUxvY2FsZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA/IGtleS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ18nLCAnLScpIDoga2V5O1xuICAgIH1cblxuICAgIC8vIHBpY2sgdGhlIGxvY2FsZSBmcm9tIHRoZSBhcnJheVxuICAgIC8vIHRyeSBbJ2VuLWF1JywgJ2VuLWdiJ10gYXMgJ2VuLWF1JywgJ2VuLWdiJywgJ2VuJywgYXMgaW4gbW92ZSB0aHJvdWdoIHRoZSBsaXN0IHRyeWluZyBlYWNoXG4gICAgLy8gc3Vic3RyaW5nIGZyb20gbW9zdCBzcGVjaWZpYyB0byBsZWFzdCwgYnV0IG1vdmUgdG8gdGhlIG5leHQgYXJyYXkgaXRlbSBpZiBpdCdzIGEgbW9yZSBzcGVjaWZpYyB2YXJpYW50IHRoYW4gdGhlIGN1cnJlbnQgcm9vdFxuICAgIGZ1bmN0aW9uIGNob29zZUxvY2FsZShuYW1lcykge1xuICAgICAgICB2YXIgaSA9IDAsIGosIG5leHQsIGxvY2FsZSwgc3BsaXQ7XG5cbiAgICAgICAgd2hpbGUgKGkgPCBuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNwbGl0ID0gbm9ybWFsaXplTG9jYWxlKG5hbWVzW2ldKS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgaiA9IHNwbGl0Lmxlbmd0aDtcbiAgICAgICAgICAgIG5leHQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaSArIDFdKTtcbiAgICAgICAgICAgIG5leHQgPSBuZXh0ID8gbmV4dC5zcGxpdCgnLScpIDogbnVsbDtcbiAgICAgICAgICAgIHdoaWxlIChqID4gMCkge1xuICAgICAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoc3BsaXQuc2xpY2UoMCwgaikuam9pbignLScpKTtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZXh0ICYmIG5leHQubGVuZ3RoID49IGogJiYgY29tcGFyZUFycmF5cyhzcGxpdCwgbmV4dCwgdHJ1ZSkgPj0gaiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGUgbmV4dCBhcnJheSBpdGVtIGlzIGJldHRlciB0aGFuIGEgc2hhbGxvd2VyIHN1YnN0cmluZyBvZiB0aGlzIG9uZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgai0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRMb2NhbGUobmFtZSkge1xuICAgICAgICB2YXIgb2xkTG9jYWxlID0gbnVsbDtcbiAgICAgICAgLy8gVE9ETzogRmluZCBhIGJldHRlciB3YXkgdG8gcmVnaXN0ZXIgYW5kIGxvYWQgYWxsIHRoZSBsb2NhbGVzIGluIE5vZGVcbiAgICAgICAgaWYgKCFsb2NhbGVzW25hbWVdICYmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgICAgICAgICBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb2xkTG9jYWxlID0gZ2xvYmFsTG9jYWxlLl9hYmJyO1xuICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vbG9jYWxlLycgKyBuYW1lKTtcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIGRlZmluZUxvY2FsZSBjdXJyZW50bHkgYWxzbyBzZXRzIHRoZSBnbG9iYWwgbG9jYWxlLCB3ZVxuICAgICAgICAgICAgICAgIC8vIHdhbnQgdG8gdW5kbyB0aGF0IGZvciBsYXp5IGxvYWRlZCBsb2NhbGVzXG4gICAgICAgICAgICAgICAgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZShvbGRMb2NhbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGxvYWQgbG9jYWxlIGFuZCB0aGVuIHNldCB0aGUgZ2xvYmFsIGxvY2FsZS4gIElmXG4gICAgLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudCBnbG9iYWxcbiAgICAvLyBsb2NhbGUga2V5LlxuICAgIGZ1bmN0aW9uIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUgKGtleSwgdmFsdWVzKSB7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWVzKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGVmaW5lTG9jYWxlKGtleSwgdmFsdWVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAvLyBtb21lbnQuZHVyYXRpb24uX2xvY2FsZSA9IG1vbWVudC5fbG9jYWxlID0gZGF0YTtcbiAgICAgICAgICAgICAgICBnbG9iYWxMb2NhbGUgPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZS5fYWJicjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVMb2NhbGUgKG5hbWUsIHZhbHVlcykge1xuICAgICAgICBpZiAodmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YWx1ZXMuYWJiciA9IG5hbWU7XG4gICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlc1tuYW1lXSB8fCBuZXcgTG9jYWxlKCk7XG4gICAgICAgICAgICBsb2NhbGVzW25hbWVdLnNldCh2YWx1ZXMpO1xuXG4gICAgICAgICAgICAvLyBiYWNrd2FyZHMgY29tcGF0IGZvciBub3c6IGFsc28gc2V0IHRoZSBsb2NhbGVcbiAgICAgICAgICAgIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUobmFtZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdXNlZnVsIGZvciB0ZXN0aW5nXG4gICAgICAgICAgICBkZWxldGUgbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyBsb2NhbGUgZGF0YVxuICAgIGZ1bmN0aW9uIGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUgKGtleSkge1xuICAgICAgICB2YXIgbG9jYWxlO1xuXG4gICAgICAgIGlmIChrZXkgJiYga2V5Ll9sb2NhbGUgJiYga2V5Ll9sb2NhbGUuX2FiYnIpIHtcbiAgICAgICAgICAgIGtleSA9IGtleS5fbG9jYWxlLl9hYmJyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWxMb2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzQXJyYXkoa2V5KSkge1xuICAgICAgICAgICAgLy9zaG9ydC1jaXJjdWl0IGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShrZXkpO1xuICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXkgPSBba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaG9vc2VMb2NhbGUoa2V5KTtcbiAgICB9XG5cbiAgICB2YXIgYWxpYXNlcyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gYWRkVW5pdEFsaWFzICh1bml0LCBzaG9ydGhhbmQpIHtcbiAgICAgICAgdmFyIGxvd2VyQ2FzZSA9IHVuaXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgYWxpYXNlc1tsb3dlckNhc2VdID0gYWxpYXNlc1tsb3dlckNhc2UgKyAncyddID0gYWxpYXNlc1tzaG9ydGhhbmRdID0gdW5pdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVVbml0cyh1bml0cykge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHVuaXRzID09PSAnc3RyaW5nJyA/IGFsaWFzZXNbdW5pdHNdIHx8IGFsaWFzZXNbdW5pdHMudG9Mb3dlckNhc2UoKV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplT2JqZWN0VW5pdHMoaW5wdXRPYmplY3QpIHtcbiAgICAgICAgdmFyIG5vcm1hbGl6ZWRJbnB1dCA9IHt9LFxuICAgICAgICAgICAgbm9ybWFsaXplZFByb3AsXG4gICAgICAgICAgICBwcm9wO1xuXG4gICAgICAgIGZvciAocHJvcCBpbiBpbnB1dE9iamVjdCkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AoaW5wdXRPYmplY3QsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZFByb3AgPSBub3JtYWxpemVVbml0cyhwcm9wKTtcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZFByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplZElucHV0W25vcm1hbGl6ZWRQcm9wXSA9IGlucHV0T2JqZWN0W3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub3JtYWxpemVkSW5wdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBGdW5jdGlvbiB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VHZXRTZXQgKHVuaXQsIGtlZXBUaW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZ2V0X3NldF9fc2V0KHRoaXMsIHVuaXQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIGtlZXBUaW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldF9zZXRfX2dldCh0aGlzLCB1bml0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRfc2V0X19nZXQgKG1vbSwgdW5pdCkge1xuICAgICAgICByZXR1cm4gbW9tLmlzVmFsaWQoKSA/XG4gICAgICAgICAgICBtb20uX2RbJ2dldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0oKSA6IE5hTjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRfc2V0X19zZXQgKG1vbSwgdW5pdCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG1vbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXQgKHVuaXRzLCB2YWx1ZSkge1xuICAgICAgICB2YXIgdW5pdDtcbiAgICAgICAgaWYgKHR5cGVvZiB1bml0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGZvciAodW5pdCBpbiB1bml0cykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHVuaXQsIHVuaXRzW3VuaXRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpc1t1bml0c10pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHNdKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6ZXJvRmlsbChudW1iZXIsIHRhcmdldExlbmd0aCwgZm9yY2VTaWduKSB7XG4gICAgICAgIHZhciBhYnNOdW1iZXIgPSAnJyArIE1hdGguYWJzKG51bWJlciksXG4gICAgICAgICAgICB6ZXJvc1RvRmlsbCA9IHRhcmdldExlbmd0aCAtIGFic051bWJlci5sZW5ndGgsXG4gICAgICAgICAgICBzaWduID0gbnVtYmVyID49IDA7XG4gICAgICAgIHJldHVybiAoc2lnbiA/IChmb3JjZVNpZ24gPyAnKycgOiAnJykgOiAnLScpICtcbiAgICAgICAgICAgIE1hdGgucG93KDEwLCBNYXRoLm1heCgwLCB6ZXJvc1RvRmlsbCkpLnRvU3RyaW5nKCkuc3Vic3RyKDEpICsgYWJzTnVtYmVyO1xuICAgIH1cblxuICAgIHZhciBmb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KFtIaF1tbShzcyk/fE1vfE1NP00/TT98RG98REREb3xERD9EP0Q/fGRkZD9kP3xkbz98d1tvfHddP3xXW298V10/fFFvP3xZWVlZWVl8WVlZWVl8WVlZWXxZWXxnZyhnZ2c/KT98R0coR0dHPyk/fGV8RXxhfEF8aGg/fEhIP3xtbT98c3M/fFN7MSw5fXx4fFh8eno/fFpaP3wuKS9nO1xuXG4gICAgdmFyIGxvY2FsRm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhMVFN8TFR8TEw/TD9MP3xsezEsNH0pL2c7XG5cbiAgICB2YXIgZm9ybWF0RnVuY3Rpb25zID0ge307XG5cbiAgICB2YXIgZm9ybWF0VG9rZW5GdW5jdGlvbnMgPSB7fTtcblxuICAgIC8vIHRva2VuOiAgICAnTSdcbiAgICAvLyBwYWRkZWQ6ICAgWydNTScsIDJdXG4gICAgLy8gb3JkaW5hbDogICdNbydcbiAgICAvLyBjYWxsYmFjazogZnVuY3Rpb24gKCkgeyB0aGlzLm1vbnRoKCkgKyAxIH1cbiAgICBmdW5jdGlvbiBhZGRGb3JtYXRUb2tlbiAodG9rZW4sIHBhZGRlZCwgb3JkaW5hbCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGZ1bmMgPSBjYWxsYmFjaztcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbY2FsbGJhY2tdKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dID0gZnVuYztcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFkZGVkKSB7XG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1twYWRkZWRbMF1dID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB6ZXJvRmlsbChmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHBhZGRlZFsxXSwgcGFkZGVkWzJdKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yZGluYWwpIHtcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW29yZGluYWxdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5vcmRpbmFsKGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdG9rZW4pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxcW3xcXF0kL2csICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBmb3JtYXQubWF0Y2goZm9ybWF0dGluZ1Rva2VucyksIGksIGxlbmd0aDtcblxuICAgICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGZvcm1hdFRva2VuRnVuY3Rpb25zW2FycmF5W2ldXSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoYXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtb20pIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSAnJztcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG91dHB1dCArPSBhcnJheVtpXSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gYXJyYXlbaV0uY2FsbChtb20sIGZvcm1hdCkgOiBhcnJheVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gZm9ybWF0IGRhdGUgdXNpbmcgbmF0aXZlIGRhdGUgb2JqZWN0XG4gICAgZnVuY3Rpb24gZm9ybWF0TW9tZW50KG0sIGZvcm1hdCkge1xuICAgICAgICBpZiAoIW0uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbS5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdCA9IGV4cGFuZEZvcm1hdChmb3JtYXQsIG0ubG9jYWxlRGF0YSgpKTtcbiAgICAgICAgZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0gPSBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSB8fCBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0obSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbG9jYWxlKSB7XG4gICAgICAgIHZhciBpID0gNTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnMoaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUubG9uZ0RhdGVGb3JtYXQoaW5wdXQpIHx8IGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpID49IDAgJiYgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLnRlc3QoZm9ybWF0KSkge1xuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UobG9jYWxGb3JtYXR0aW5nVG9rZW5zLCByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnMpO1xuICAgICAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICBpIC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH1cblxuICAgIHZhciBtYXRjaDEgICAgICAgICA9IC9cXGQvOyAgICAgICAgICAgIC8vICAgICAgIDAgLSA5XG4gICAgdmFyIG1hdGNoMiAgICAgICAgID0gL1xcZFxcZC87ICAgICAgICAgIC8vICAgICAgMDAgLSA5OVxuICAgIHZhciBtYXRjaDMgICAgICAgICA9IC9cXGR7M30vOyAgICAgICAgIC8vICAgICAwMDAgLSA5OTlcbiAgICB2YXIgbWF0Y2g0ICAgICAgICAgPSAvXFxkezR9LzsgICAgICAgICAvLyAgICAwMDAwIC0gOTk5OVxuICAgIHZhciBtYXRjaDYgICAgICAgICA9IC9bKy1dP1xcZHs2fS87ICAgIC8vIC05OTk5OTkgLSA5OTk5OTlcbiAgICB2YXIgbWF0Y2gxdG8yICAgICAgPSAvXFxkXFxkPy87ICAgICAgICAgLy8gICAgICAgMCAtIDk5XG4gICAgdmFyIG1hdGNoM3RvNCAgICAgID0gL1xcZFxcZFxcZFxcZD8vOyAgICAgLy8gICAgIDk5OSAtIDk5OTlcbiAgICB2YXIgbWF0Y2g1dG82ICAgICAgPSAvXFxkXFxkXFxkXFxkXFxkXFxkPy87IC8vICAgOTk5OTkgLSA5OTk5OTlcbiAgICB2YXIgbWF0Y2gxdG8zICAgICAgPSAvXFxkezEsM30vOyAgICAgICAvLyAgICAgICAwIC0gOTk5XG4gICAgdmFyIG1hdGNoMXRvNCAgICAgID0gL1xcZHsxLDR9LzsgICAgICAgLy8gICAgICAgMCAtIDk5OTlcbiAgICB2YXIgbWF0Y2gxdG82ICAgICAgPSAvWystXT9cXGR7MSw2fS87ICAvLyAtOTk5OTk5IC0gOTk5OTk5XG5cbiAgICB2YXIgbWF0Y2hVbnNpZ25lZCAgPSAvXFxkKy87ICAgICAgICAgICAvLyAgICAgICAwIC0gaW5mXG4gICAgdmFyIG1hdGNoU2lnbmVkICAgID0gL1srLV0/XFxkKy87ICAgICAgLy8gICAgLWluZiAtIGluZlxuXG4gICAgdmFyIG1hdGNoT2Zmc2V0ICAgID0gL1p8WystXVxcZFxcZDo/XFxkXFxkL2dpOyAvLyArMDA6MDAgLTAwOjAwICswMDAwIC0wMDAwIG9yIFpcbiAgICB2YXIgbWF0Y2hTaG9ydE9mZnNldCA9IC9afFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/L2dpOyAvLyArMDAgLTAwICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxuXG4gICAgdmFyIG1hdGNoVGltZXN0YW1wID0gL1srLV0/XFxkKyhcXC5cXGR7MSwzfSk/LzsgLy8gMTIzNDU2Nzg5IDEyMzQ1Njc4OS4xMjNcblxuICAgIC8vIGFueSB3b3JkIChvciB0d28pIGNoYXJhY3RlcnMgb3IgbnVtYmVycyBpbmNsdWRpbmcgdHdvL3RocmVlIHdvcmQgbW9udGggaW4gYXJhYmljLlxuICAgIC8vIGluY2x1ZGVzIHNjb3R0aXNoIGdhZWxpYyB0d28gd29yZCBhbmQgaHlwaGVuYXRlZCBtb250aHNcbiAgICB2YXIgbWF0Y2hXb3JkID0gL1swLTldKlsnYS16XFx1MDBBMC1cXHUwNUZGXFx1MDcwMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSt8W1xcdTA2MDAtXFx1MDZGRlxcL10rKFxccyo/W1xcdTA2MDAtXFx1MDZGRl0rKXsxLDJ9L2k7XG5cblxuICAgIHZhciByZWdleGVzID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRSZWdleFRva2VuICh0b2tlbiwgcmVnZXgsIHN0cmljdFJlZ2V4KSB7XG4gICAgICAgIHJlZ2V4ZXNbdG9rZW5dID0gaXNGdW5jdGlvbihyZWdleCkgPyByZWdleCA6IGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIChpc1N0cmljdCAmJiBzdHJpY3RSZWdleCkgPyBzdHJpY3RSZWdleCA6IHJlZ2V4O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBhcnNlUmVnZXhGb3JUb2tlbiAodG9rZW4sIGNvbmZpZykge1xuICAgICAgICBpZiAoIWhhc093blByb3AocmVnZXhlcywgdG9rZW4pKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCh1bmVzY2FwZUZvcm1hdCh0b2tlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZ2V4ZXNbdG9rZW5dKGNvbmZpZy5fc3RyaWN0LCBjb25maWcuX2xvY2FsZSk7XG4gICAgfVxuXG4gICAgLy8gQ29kZSBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU2MTQ5My9pcy10aGVyZS1hLXJlZ2V4cC1lc2NhcGUtZnVuY3Rpb24taW4tamF2YXNjcmlwdFxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlRm9ybWF0KHMpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2V4RXNjYXBlKHMucmVwbGFjZSgnXFxcXCcsICcnKS5yZXBsYWNlKC9cXFxcKFxcWyl8XFxcXChcXF0pfFxcWyhbXlxcXVxcW10qKVxcXXxcXFxcKC4pL2csIGZ1bmN0aW9uIChtYXRjaGVkLCBwMSwgcDIsIHAzLCBwNCkge1xuICAgICAgICAgICAgcmV0dXJuIHAxIHx8IHAyIHx8IHAzIHx8IHA0O1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnZXhFc2NhcGUocykge1xuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcbiAgICB9XG5cbiAgICB2YXIgdG9rZW5zID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRQYXJzZVRva2VuICh0b2tlbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGksIGZ1bmMgPSBjYWxsYmFjaztcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRva2VuID0gW3Rva2VuXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZnVuYyA9IGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBhcnJheVtjYWxsYmFja10gPSB0b0ludChpbnB1dCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG9rZW5zW3Rva2VuW2ldXSA9IGZ1bmM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRXZWVrUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XG4gICAgICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgICAgIGNvbmZpZy5fdyA9IGNvbmZpZy5fdyB8fCB7fTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGlucHV0LCBjb25maWcuX3csIGNvbmZpZywgdG9rZW4pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgaW5wdXQsIGNvbmZpZykge1xuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCAmJiBoYXNPd25Qcm9wKHRva2VucywgdG9rZW4pKSB7XG4gICAgICAgICAgICB0b2tlbnNbdG9rZW5dKGlucHV0LCBjb25maWcuX2EsIGNvbmZpZywgdG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFlFQVIgPSAwO1xuICAgIHZhciBNT05USCA9IDE7XG4gICAgdmFyIERBVEUgPSAyO1xuICAgIHZhciBIT1VSID0gMztcbiAgICB2YXIgTUlOVVRFID0gNDtcbiAgICB2YXIgU0VDT05EID0gNTtcbiAgICB2YXIgTUlMTElTRUNPTkQgPSA2O1xuICAgIHZhciBXRUVLID0gNztcbiAgICB2YXIgV0VFS0RBWSA9IDg7XG5cbiAgICBmdW5jdGlvbiBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoeWVhciwgbW9udGggKyAxLCAwKSkuZ2V0VVRDRGF0ZSgpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdNJywgWydNTScsIDJdLCAnTW8nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoKCkgKyAxO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ01NTScsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1vbnRoc1Nob3J0KHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignTU1NTScsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1vbnRocyh0aGlzLCBmb3JtYXQpO1xuICAgIH0pO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdtb250aCcsICdNJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdNJywgICAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTScsICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ01NTScsICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1Nob3J0UmVnZXgoaXNTdHJpY3QpO1xuICAgIH0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ01NTU0nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1JlZ2V4KGlzU3RyaWN0KTtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNJywgJ01NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gdG9JbnQoaW5wdXQpIC0gMTtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNTU0nLCAnTU1NTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHZhciBtb250aCA9IGNvbmZpZy5fbG9jYWxlLm1vbnRoc1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZmluZCBhIG1vbnRoIG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZC5cbiAgICAgICAgaWYgKG1vbnRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5W01PTlRIXSA9IG1vbnRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZE1vbnRoID0gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIHZhciBNT05USFNfSU5fRk9STUFUID0gL0Rbb0RdPyhcXFtbXlxcW1xcXV0qXFxdfFxccyspK01NTU0/LztcbiAgICB2YXIgZGVmYXVsdExvY2FsZU1vbnRocyA9ICdKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyJy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZU1vbnRocyAobSwgZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRocykgPyB0aGlzLl9tb250aHNbbS5tb250aCgpXSA6XG4gICAgICAgICAgICB0aGlzLl9tb250aHNbTU9OVEhTX0lOX0ZPUk1BVC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ11bbS5tb250aCgpXTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0ID0gJ0phbl9GZWJfTWFyX0Fwcl9NYXlfSnVuX0p1bF9BdWdfU2VwX09jdF9Ob3ZfRGVjJy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZU1vbnRoc1Nob3J0IChtLCBmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzU2hvcnQpID8gdGhpcy5fbW9udGhzU2hvcnRbbS5tb250aCgpXSA6XG4gICAgICAgICAgICB0aGlzLl9tb250aHNTaG9ydFtNT05USFNfSU5fRk9STUFULnRlc3QoZm9ybWF0KSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnXVttLm1vbnRoKCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZU1vbnRoc1BhcnNlIChtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgICAgIHZhciBpLCBtb20sIHJlZ2V4O1xuXG4gICAgICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhbMjAwMCwgaV0pO1xuICAgICAgICAgICAgaWYgKHN0cmljdCAmJiAhdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJywgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RyaWN0ICYmICF0aGlzLl9tb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID0gJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykgKyAnfF4nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ01NTU0nICYmIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ01NTScgJiYgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl9tb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIHNldE1vbnRoIChtb20sIHZhbHVlKSB7XG4gICAgICAgIHZhciBkYXlPZk1vbnRoO1xuXG4gICAgICAgIGlmICghbW9tLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgLy8gTm8gb3BcbiAgICAgICAgICAgIHJldHVybiBtb207XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgb3V0IG9mIGhlcmUhXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG1vbS5sb2NhbGVEYXRhKCkubW9udGhzUGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgLy8gVE9ETzogQW5vdGhlciBzaWxlbnQgZmFpbHVyZT9cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRheU9mTW9udGggPSBNYXRoLm1pbihtb20uZGF0ZSgpLCBkYXlzSW5Nb250aChtb20ueWVhcigpLCB2YWx1ZSkpO1xuICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgJ01vbnRoJ10odmFsdWUsIGRheU9mTW9udGgpO1xuICAgICAgICByZXR1cm4gbW9tO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldE1vbnRoICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0TW9udGgodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGdldF9zZXRfX2dldCh0aGlzLCAnTW9udGgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERheXNJbk1vbnRoICgpIHtcbiAgICAgICAgcmV0dXJuIGRheXNJbk1vbnRoKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCkpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TW9udGhzU2hvcnRSZWdleCA9IG1hdGNoV29yZDtcbiAgICBmdW5jdGlvbiBtb250aHNTaG9ydFJlZ2V4IChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVNb250aHNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggOiB0aGlzLl9tb250aHNTaG9ydFJlZ2V4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRNb250aHNSZWdleCA9IG1hdGNoV29yZDtcbiAgICBmdW5jdGlvbiBtb250aHNSZWdleCAoaXNTdHJpY3QpIHtcbiAgICAgICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlTW9udGhzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1JlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNTdHJpY3RSZWdleCA6IHRoaXMuX21vbnRoc1JlZ2V4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZU1vbnRoc1BhcnNlICgpIHtcbiAgICAgICAgZnVuY3Rpb24gY21wTGVuUmV2KGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNob3J0UGllY2VzID0gW10sIGxvbmdQaWVjZXMgPSBbXSwgbWl4ZWRQaWVjZXMgPSBbXSxcbiAgICAgICAgICAgIGksIG1vbTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgICAgICBzaG9ydFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykpO1xuICAgICAgICAgICAgbG9uZ1BpZWNlcy5wdXNoKHRoaXMubW9udGhzKG1vbSwgJycpKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2godGhpcy5tb250aHMobW9tLCAnJykpO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyIGl0XG4gICAgICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cbiAgICAgICAgc2hvcnRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgbWl4ZWRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XG4gICAgICAgICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21vbnRoc1JlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWl4ZWRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgICAgICB0aGlzLl9tb250aHNTaG9ydFJlZ2V4ID0gdGhpcy5fbW9udGhzUmVnZXg7XG4gICAgICAgIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbG9uZ1BpZWNlcy5qb2luKCd8JykgKyAnKSQnLCAnaScpO1xuICAgICAgICB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgc2hvcnRQaWVjZXMuam9pbignfCcpICsgJykkJywgJ2knKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja092ZXJmbG93IChtKSB7XG4gICAgICAgIHZhciBvdmVyZmxvdztcbiAgICAgICAgdmFyIGEgPSBtLl9hO1xuXG4gICAgICAgIGlmIChhICYmIGdldFBhcnNpbmdGbGFncyhtKS5vdmVyZmxvdyA9PT0gLTIpIHtcbiAgICAgICAgICAgIG92ZXJmbG93ID1cbiAgICAgICAgICAgICAgICBhW01PTlRIXSAgICAgICA8IDAgfHwgYVtNT05USF0gICAgICAgPiAxMSAgPyBNT05USCA6XG4gICAgICAgICAgICAgICAgYVtEQVRFXSAgICAgICAgPCAxIHx8IGFbREFURV0gICAgICAgID4gZGF5c0luTW9udGgoYVtZRUFSXSwgYVtNT05USF0pID8gREFURSA6XG4gICAgICAgICAgICAgICAgYVtIT1VSXSAgICAgICAgPCAwIHx8IGFbSE9VUl0gICAgICAgID4gMjQgfHwgKGFbSE9VUl0gPT09IDI0ICYmIChhW01JTlVURV0gIT09IDAgfHwgYVtTRUNPTkRdICE9PSAwIHx8IGFbTUlMTElTRUNPTkRdICE9PSAwKSkgPyBIT1VSIDpcbiAgICAgICAgICAgICAgICBhW01JTlVURV0gICAgICA8IDAgfHwgYVtNSU5VVEVdICAgICAgPiA1OSAgPyBNSU5VVEUgOlxuICAgICAgICAgICAgICAgIGFbU0VDT05EXSAgICAgIDwgMCB8fCBhW1NFQ09ORF0gICAgICA+IDU5ICA/IFNFQ09ORCA6XG4gICAgICAgICAgICAgICAgYVtNSUxMSVNFQ09ORF0gPCAwIHx8IGFbTUlMTElTRUNPTkRdID4gOTk5ID8gTUlMTElTRUNPTkQgOlxuICAgICAgICAgICAgICAgIC0xO1xuXG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd0RheU9mWWVhciAmJiAob3ZlcmZsb3cgPCBZRUFSIHx8IG92ZXJmbG93ID4gREFURSkpIHtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IERBVEU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd1dlZWtzICYmIG92ZXJmbG93ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gV0VFSztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93V2Vla2RheSAmJiBvdmVyZmxvdyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IFdFRUtEQVk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS5vdmVyZmxvdyA9IG92ZXJmbG93O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Fybihtc2cpIHtcbiAgICAgICAgaWYgKHV0aWxzX2hvb2tzX19ob29rcy5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPT09IGZhbHNlICYmXG4gICAgICAgICAgICAgICAgKHR5cGVvZiBjb25zb2xlICE9PSAgJ3VuZGVmaW5lZCcpICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEZXByZWNhdGlvbiB3YXJuaW5nOiAnICsgbXNnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZShtc2csIGZuKSB7XG4gICAgICAgIHZhciBmaXJzdFRpbWUgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiBleHRlbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGZpcnN0VGltZSkge1xuICAgICAgICAgICAgICAgIHdhcm4obXNnICsgJ1xcbkFyZ3VtZW50czogJyArIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbignLCAnKSArICdcXG4nICsgKG5ldyBFcnJvcigpKS5zdGFjayk7XG4gICAgICAgICAgICAgICAgZmlyc3RUaW1lID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSwgZm4pO1xuICAgIH1cblxuICAgIHZhciBkZXByZWNhdGlvbnMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZVNpbXBsZShuYW1lLCBtc2cpIHtcbiAgICAgICAgaWYgKCFkZXByZWNhdGlvbnNbbmFtZV0pIHtcbiAgICAgICAgICAgIHdhcm4obXNnKTtcbiAgICAgICAgICAgIGRlcHJlY2F0aW9uc1tuYW1lXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlsc19ob29rc19faG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID0gZmFsc2U7XG5cbiAgICAvLyBpc28gODYwMSByZWdleFxuICAgIC8vIDAwMDAtMDAtMDAgMDAwMC1XMDAgb3IgMDAwMC1XMDAtMCArIFQgKyAwMCBvciAwMDowMCBvciAwMDowMDowMCBvciAwMDowMDowMC4wMDAgKyArMDA6MDAgb3IgKzAwMDAgb3IgKzAwKVxuICAgIHZhciBleHRlbmRlZElzb1JlZ2V4ID0gL15cXHMqKCg/OlsrLV1cXGR7Nn18XFxkezR9KS0oPzpcXGRcXGQtXFxkXFxkfFdcXGRcXGQtXFxkfFdcXGRcXGR8XFxkXFxkXFxkfFxcZFxcZCkpKD86KFR8ICkoXFxkXFxkKD86OlxcZFxcZCg/OjpcXGRcXGQoPzpbLixdXFxkKyk/KT8pPykoW1xcK1xcLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPy87XG4gICAgdmFyIGJhc2ljSXNvUmVnZXggPSAvXlxccyooKD86WystXVxcZHs2fXxcXGR7NH0pKD86XFxkXFxkXFxkXFxkfFdcXGRcXGRcXGR8V1xcZFxcZHxcXGRcXGRcXGR8XFxkXFxkKSkoPzooVHwgKShcXGRcXGQoPzpcXGRcXGQoPzpcXGRcXGQoPzpbLixdXFxkKyk/KT8pPykoW1xcK1xcLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPy87XG5cbiAgICB2YXIgdHpSZWdleCA9IC9afFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/LztcblxuICAgIHZhciBpc29EYXRlcyA9IFtcbiAgICAgICAgWydZWVlZWVktTU0tREQnLCAvWystXVxcZHs2fS1cXGRcXGQtXFxkXFxkL10sXG4gICAgICAgIFsnWVlZWS1NTS1ERCcsIC9cXGR7NH0tXFxkXFxkLVxcZFxcZC9dLFxuICAgICAgICBbJ0dHR0ctW1ddV1ctRScsIC9cXGR7NH0tV1xcZFxcZC1cXGQvXSxcbiAgICAgICAgWydHR0dHLVtXXVdXJywgL1xcZHs0fS1XXFxkXFxkLywgZmFsc2VdLFxuICAgICAgICBbJ1lZWVktREREJywgL1xcZHs0fS1cXGR7M30vXSxcbiAgICAgICAgWydZWVlZLU1NJywgL1xcZHs0fS1cXGRcXGQvLCBmYWxzZV0sXG4gICAgICAgIFsnWVlZWVlZTU1ERCcsIC9bKy1dXFxkezEwfS9dLFxuICAgICAgICBbJ1lZWVlNTUREJywgL1xcZHs4fS9dLFxuICAgICAgICAvLyBZWVlZTU0gaXMgTk9UIGFsbG93ZWQgYnkgdGhlIHN0YW5kYXJkXG4gICAgICAgIFsnR0dHR1tXXVdXRScsIC9cXGR7NH1XXFxkezN9L10sXG4gICAgICAgIFsnR0dHR1tXXVdXJywgL1xcZHs0fVdcXGR7Mn0vLCBmYWxzZV0sXG4gICAgICAgIFsnWVlZWURERCcsIC9cXGR7N30vXVxuICAgIF07XG5cbiAgICAvLyBpc28gdGltZSBmb3JtYXRzIGFuZCByZWdleGVzXG4gICAgdmFyIGlzb1RpbWVzID0gW1xuICAgICAgICBbJ0hIOm1tOnNzLlNTU1MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGRcXC5cXGQrL10sXG4gICAgICAgIFsnSEg6bW06c3MsU1NTUycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZCxcXGQrL10sXG4gICAgICAgIFsnSEg6bW06c3MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGQvXSxcbiAgICAgICAgWydISDptbScsIC9cXGRcXGQ6XFxkXFxkL10sXG4gICAgICAgIFsnSEhtbXNzLlNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkXFwuXFxkKy9dLFxuICAgICAgICBbJ0hIbW1zcyxTU1NTJywgL1xcZFxcZFxcZFxcZFxcZFxcZCxcXGQrL10sXG4gICAgICAgIFsnSEhtbXNzJywgL1xcZFxcZFxcZFxcZFxcZFxcZC9dLFxuICAgICAgICBbJ0hIbW0nLCAvXFxkXFxkXFxkXFxkL10sXG4gICAgICAgIFsnSEgnLCAvXFxkXFxkL11cbiAgICBdO1xuXG4gICAgdmFyIGFzcE5ldEpzb25SZWdleCA9IC9eXFwvP0RhdGVcXCgoXFwtP1xcZCspL2k7XG5cbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdFxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21JU08oY29uZmlnKSB7XG4gICAgICAgIHZhciBpLCBsLFxuICAgICAgICAgICAgc3RyaW5nID0gY29uZmlnLl9pLFxuICAgICAgICAgICAgbWF0Y2ggPSBleHRlbmRlZElzb1JlZ2V4LmV4ZWMoc3RyaW5nKSB8fCBiYXNpY0lzb1JlZ2V4LmV4ZWMoc3RyaW5nKSxcbiAgICAgICAgICAgIGFsbG93VGltZSwgZGF0ZUZvcm1hdCwgdGltZUZvcm1hdCwgdHpGb3JtYXQ7XG5cbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pc28gPSB0cnVlO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvRGF0ZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzb0RhdGVzW2ldWzFdLmV4ZWMobWF0Y2hbMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQgPSBpc29EYXRlc1tpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dUaW1lID0gaXNvRGF0ZXNbaV1bMl0gIT09IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0ZUZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoWzNdKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbCA9IGlzb1RpbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNvVGltZXNbaV1bMV0uZXhlYyhtYXRjaFszXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoWzJdIHNob3VsZCBiZSAnVCcgb3Igc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVGb3JtYXQgPSAobWF0Y2hbMl0gfHwgJyAnKSArIGlzb1RpbWVzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVGb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYWxsb3dUaW1lICYmIHRpbWVGb3JtYXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaFs0XSkge1xuICAgICAgICAgICAgICAgIGlmICh0elJlZ2V4LmV4ZWMobWF0Y2hbNF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHR6Rm9ybWF0ID0gJ1onO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlnLl9mID0gZGF0ZUZvcm1hdCArICh0aW1lRm9ybWF0IHx8ICcnKSArICh0ekZvcm1hdCB8fCAnJyk7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRhdGUgZnJvbSBpc28gZm9ybWF0IG9yIGZhbGxiYWNrXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZyhjb25maWcpIHtcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBhc3BOZXRKc29uUmVnZXguZXhlYyhjb25maWcuX2kpO1xuXG4gICAgICAgIGlmIChtYXRjaGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSgrbWF0Y2hlZFsxXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWdGcm9tSVNPKGNvbmZpZyk7XG4gICAgICAgIGlmIChjb25maWcuX2lzVmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLl9pc1ZhbGlkO1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlsc19ob29rc19faG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQgY29uc3RydWN0aW9uIGZhbGxzIGJhY2sgdG8ganMgRGF0ZS4gVGhpcyBpcyAnICtcbiAgICAgICAgJ2Rpc2NvdXJhZ2VkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdXBjb21pbmcgbWFqb3IgJyArXG4gICAgICAgICdyZWxlYXNlLiBQbGVhc2UgcmVmZXIgdG8gJyArXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQwNyBmb3IgbW9yZSBpbmZvLicsXG4gICAgICAgIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSArIChjb25maWcuX3VzZVVUQyA/ICcgVVRDJyA6ICcnKSk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRGF0ZSAoeSwgbSwgZCwgaCwgTSwgcywgbXMpIHtcbiAgICAgICAgLy9jYW4ndCBqdXN0IGFwcGx5KCkgdG8gY3JlYXRlIGEgZGF0ZTpcbiAgICAgICAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE4MTM0OC9pbnN0YW50aWF0aW5nLWEtamF2YXNjcmlwdC1vYmplY3QtYnktY2FsbGluZy1wcm90b3R5cGUtY29uc3RydWN0b3ItYXBwbHlcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh5LCBtLCBkLCBoLCBNLCBzLCBtcyk7XG5cbiAgICAgICAgLy90aGUgZGF0ZSBjb25zdHJ1Y3RvciByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwICYmIGlzRmluaXRlKGRhdGUuZ2V0RnVsbFllYXIoKSkpIHtcbiAgICAgICAgICAgIGRhdGUuc2V0RnVsbFllYXIoeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVVRDRGF0ZSAoeSkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xuXG4gICAgICAgIC8vdGhlIERhdGUuVVRDIGZ1bmN0aW9uIHJlbWFwcyB5ZWFycyAwLTk5IHRvIDE5MDAtMTk5OVxuICAgICAgICBpZiAoeSA8IDEwMCAmJiB5ID49IDAgJiYgaXNGaW5pdGUoZGF0ZS5nZXRVVENGdWxsWWVhcigpKSkge1xuICAgICAgICAgICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignWScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHkgPSB0aGlzLnllYXIoKTtcbiAgICAgICAgcmV0dXJuIHkgPD0gOTk5OSA/ICcnICsgeSA6ICcrJyArIHk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueWVhcigpICUgMTAwO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZJywgICA0XSwgICAgICAgMCwgJ3llYXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVlZJywgIDVdLCAgICAgICAwLCAneWVhcicpO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVlZJywgNiwgdHJ1ZV0sIDAsICd5ZWFyJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ3llYXInLCAneScpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignWScsICAgICAgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XG4gICAgYWRkUmVnZXhUb2tlbignWVlZWVknLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVlZWScsIG1hdGNoMXRvNiwgbWF0Y2g2KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydZWVlZWScsICdZWVlZWVknXSwgWUVBUik7XG4gICAgYWRkUGFyc2VUb2tlbignWVlZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbWUVBUl0gPSBpbnB1dC5sZW5ndGggPT09IDIgPyB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpIDogdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1lZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtZRUFSXSA9IHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCk7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbWUVBUl0gPSBwYXJzZUludChpbnB1dCwgMTApO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgZnVuY3Rpb24gZGF5c0luWWVhcih5ZWFyKSB7XG4gICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHllYXIpID8gMzY2IDogMzY1O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTGVhcFllYXIoeWVhcikge1xuICAgICAgICByZXR1cm4gKHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDApIHx8IHllYXIgJSA0MDAgPT09IDA7XG4gICAgfVxuXG4gICAgLy8gSE9PS1NcblxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVR3b0RpZ2l0WWVhciA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICByZXR1cm4gdG9JbnQoaW5wdXQpICsgKHRvSW50KGlucHV0KSA+IDY4ID8gMTkwMCA6IDIwMDApO1xuICAgIH07XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0WWVhciA9IG1ha2VHZXRTZXQoJ0Z1bGxZZWFyJywgZmFsc2UpO1xuXG4gICAgZnVuY3Rpb24gZ2V0SXNMZWFwWWVhciAoKSB7XG4gICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHRoaXMueWVhcigpKTtcbiAgICB9XG5cbiAgICAvLyBzdGFydC1vZi1maXJzdC13ZWVrIC0gc3RhcnQtb2YteWVhclxuICAgIGZ1bmN0aW9uIGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgLy8gZmlyc3Qtd2VlayBkYXkgLS0gd2hpY2ggamFudWFyeSBpcyBhbHdheXMgaW4gdGhlIGZpcnN0IHdlZWsgKDQgZm9yIGlzbywgMSBmb3Igb3RoZXIpXG4gICAgICAgICAgICBmd2QgPSA3ICsgZG93IC0gZG95LFxuICAgICAgICAgICAgLy8gZmlyc3Qtd2VlayBkYXkgbG9jYWwgd2Vla2RheSAtLSB3aGljaCBsb2NhbCB3ZWVrZGF5IGlzIGZ3ZFxuICAgICAgICAgICAgZndkbHcgPSAoNyArIGNyZWF0ZVVUQ0RhdGUoeWVhciwgMCwgZndkKS5nZXRVVENEYXkoKSAtIGRvdykgJSA3O1xuXG4gICAgICAgIHJldHVybiAtZndkbHcgKyBmd2QgLSAxO1xuICAgIH1cblxuICAgIC8vaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlI0NhbGN1bGF0aW5nX2FfZGF0ZV9naXZlbl90aGVfeWVhci4yQ193ZWVrX251bWJlcl9hbmRfd2Vla2RheVxuICAgIGZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrcyh5ZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgICAgICB2YXIgbG9jYWxXZWVrZGF5ID0gKDcgKyB3ZWVrZGF5IC0gZG93KSAlIDcsXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSxcbiAgICAgICAgICAgIGRheU9mWWVhciA9IDEgKyA3ICogKHdlZWsgLSAxKSArIGxvY2FsV2Vla2RheSArIHdlZWtPZmZzZXQsXG4gICAgICAgICAgICByZXNZZWFyLCByZXNEYXlPZlllYXI7XG5cbiAgICAgICAgaWYgKGRheU9mWWVhciA8PSAwKSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhciAtIDE7XG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlzSW5ZZWFyKHJlc1llYXIpICsgZGF5T2ZZZWFyO1xuICAgICAgICB9IGVsc2UgaWYgKGRheU9mWWVhciA+IGRheXNJblllYXIoeWVhcikpIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSB5ZWFyICsgMTtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhciAtIGRheXNJblllYXIoeWVhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhcjtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyOiByZXNZZWFyLFxuICAgICAgICAgICAgZGF5T2ZZZWFyOiByZXNEYXlPZlllYXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrT2ZZZWFyKG1vbSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQobW9tLnllYXIoKSwgZG93LCBkb3kpLFxuICAgICAgICAgICAgd2VlayA9IE1hdGguZmxvb3IoKG1vbS5kYXlPZlllYXIoKSAtIHdlZWtPZmZzZXQgLSAxKSAvIDcpICsgMSxcbiAgICAgICAgICAgIHJlc1dlZWssIHJlc1llYXI7XG5cbiAgICAgICAgaWYgKHdlZWsgPCAxKSB7XG4gICAgICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKSAtIDE7XG4gICAgICAgICAgICByZXNXZWVrID0gd2VlayArIHdlZWtzSW5ZZWFyKHJlc1llYXIsIGRvdywgZG95KTtcbiAgICAgICAgfSBlbHNlIGlmICh3ZWVrID4gd2Vla3NJblllYXIobW9tLnllYXIoKSwgZG93LCBkb3kpKSB7XG4gICAgICAgICAgICByZXNXZWVrID0gd2VlayAtIHdlZWtzSW5ZZWFyKG1vbS55ZWFyKCksIGRvdywgZG95KTtcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpO1xuICAgICAgICAgICAgcmVzV2VlayA9IHdlZWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2VlazogcmVzV2VlayxcbiAgICAgICAgICAgIHllYXI6IHJlc1llYXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrc0luWWVhcih5ZWFyLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSksXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0TmV4dCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyICsgMSwgZG93LCBkb3kpO1xuICAgICAgICByZXR1cm4gKGRheXNJblllYXIoeWVhcikgLSB3ZWVrT2Zmc2V0ICsgd2Vla09mZnNldE5leHQpIC8gNztcbiAgICB9XG5cbiAgICAvLyBQaWNrIHRoZSBmaXJzdCBkZWZpbmVkIG9mIHR3byBvciB0aHJlZSBhcmd1bWVudHMuXG4gICAgZnVuY3Rpb24gZGVmYXVsdHMoYSwgYiwgYykge1xuICAgICAgICBpZiAoYSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjdXJyZW50RGF0ZUFycmF5KGNvbmZpZykge1xuICAgICAgICAvLyBob29rcyBpcyBhY3R1YWxseSB0aGUgZXhwb3J0ZWQgbW9tZW50IG9iamVjdFxuICAgICAgICB2YXIgbm93VmFsdWUgPSBuZXcgRGF0ZSh1dGlsc19ob29rc19faG9va3Mubm93KCkpO1xuICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMpIHtcbiAgICAgICAgICAgIHJldHVybiBbbm93VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSwgbm93VmFsdWUuZ2V0VVRDTW9udGgoKSwgbm93VmFsdWUuZ2V0VVRDRGF0ZSgpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW25vd1ZhbHVlLmdldEZ1bGxZZWFyKCksIG5vd1ZhbHVlLmdldE1vbnRoKCksIG5vd1ZhbHVlLmdldERhdGUoKV07XG4gICAgfVxuXG4gICAgLy8gY29udmVydCBhbiBhcnJheSB0byBhIGRhdGUuXG4gICAgLy8gdGhlIGFycmF5IHNob3VsZCBtaXJyb3IgdGhlIHBhcmFtZXRlcnMgYmVsb3dcbiAgICAvLyBub3RlOiBhbGwgdmFsdWVzIHBhc3QgdGhlIHllYXIgYXJlIG9wdGlvbmFsIGFuZCB3aWxsIGRlZmF1bHQgdG8gdGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cbiAgICAvLyBbeWVhciwgbW9udGgsIGRheSAsIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZF1cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tQXJyYXkgKGNvbmZpZykge1xuICAgICAgICB2YXIgaSwgZGF0ZSwgaW5wdXQgPSBbXSwgY3VycmVudERhdGUsIHllYXJUb1VzZTtcblxuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKTtcblxuICAgICAgICAvL2NvbXB1dGUgZGF5IG9mIHRoZSB5ZWFyIGZyb20gd2Vla3MgYW5kIHdlZWtkYXlzXG4gICAgICAgIGlmIChjb25maWcuX3cgJiYgY29uZmlnLl9hW0RBVEVdID09IG51bGwgJiYgY29uZmlnLl9hW01PTlRIXSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgdGhlIGRheSBvZiB0aGUgeWVhciBpcyBzZXQsIGZpZ3VyZSBvdXQgd2hhdCBpdCBpc1xuICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIpIHtcbiAgICAgICAgICAgIHllYXJUb1VzZSA9IGRlZmF1bHRzKGNvbmZpZy5fYVtZRUFSXSwgY3VycmVudERhdGVbWUVBUl0pO1xuXG4gICAgICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXJUb1VzZSkpIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dEYXlPZlllYXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRlID0gY3JlYXRlVVRDRGF0ZSh5ZWFyVG9Vc2UsIDAsIGNvbmZpZy5fZGF5T2ZZZWFyKTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtNT05USF0gPSBkYXRlLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICBjb25maWcuX2FbREFURV0gPSBkYXRlLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCBkYXRlLlxuICAgICAgICAvLyAqIGlmIG5vIHllYXIsIG1vbnRoLCBkYXkgb2YgbW9udGggYXJlIGdpdmVuLCBkZWZhdWx0IHRvIHRvZGF5XG4gICAgICAgIC8vICogaWYgZGF5IG9mIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG1vbnRoIGFuZCB5ZWFyXG4gICAgICAgIC8vICogaWYgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgb25seSB5ZWFyXG4gICAgICAgIC8vICogaWYgeWVhciBpcyBnaXZlbiwgZG9uJ3QgZGVmYXVsdCBhbnl0aGluZ1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMyAmJiBjb25maWcuX2FbaV0gPT0gbnVsbDsgKytpKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IGN1cnJlbnREYXRlW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gWmVybyBvdXQgd2hhdGV2ZXIgd2FzIG5vdCBkZWZhdWx0ZWQsIGluY2x1ZGluZyB0aW1lXG4gICAgICAgIGZvciAoOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IChjb25maWcuX2FbaV0gPT0gbnVsbCkgPyAoaSA9PT0gMiA/IDEgOiAwKSA6IGNvbmZpZy5fYVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGZvciAyNDowMDowMC4wMDBcbiAgICAgICAgaWYgKGNvbmZpZy5fYVtIT1VSXSA9PT0gMjQgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbTUlOVVRFXSA9PT0gMCAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtTRUNPTkRdID09PSAwICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW01JTExJU0VDT05EXSA9PT0gMCkge1xuICAgICAgICAgICAgY29uZmlnLl9uZXh0RGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuX2QgPSAoY29uZmlnLl91c2VVVEMgPyBjcmVhdGVVVENEYXRlIDogY3JlYXRlRGF0ZSkuYXBwbHkobnVsbCwgaW5wdXQpO1xuICAgICAgICAvLyBBcHBseSB0aW1lem9uZSBvZmZzZXQgZnJvbSBpbnB1dC4gVGhlIGFjdHVhbCB1dGNPZmZzZXQgY2FuIGJlIGNoYW5nZWRcbiAgICAgICAgLy8gd2l0aCBwYXJzZVpvbmUuXG4gICAgICAgIGlmIChjb25maWcuX3R6bSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWcuX2Quc2V0VVRDTWludXRlcyhjb25maWcuX2QuZ2V0VVRDTWludXRlcygpIC0gY29uZmlnLl90em0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fbmV4dERheSkge1xuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMjQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKSB7XG4gICAgICAgIHZhciB3LCB3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3ksIHRlbXAsIHdlZWtkYXlPdmVyZmxvdztcblxuICAgICAgICB3ID0gY29uZmlnLl93O1xuICAgICAgICBpZiAody5HRyAhPSBudWxsIHx8IHcuVyAhPSBudWxsIHx8IHcuRSAhPSBudWxsKSB7XG4gICAgICAgICAgICBkb3cgPSAxO1xuICAgICAgICAgICAgZG95ID0gNDtcblxuICAgICAgICAgICAgLy8gVE9ETzogV2UgbmVlZCB0byB0YWtlIHRoZSBjdXJyZW50IGlzb1dlZWtZZWFyLCBidXQgdGhhdCBkZXBlbmRzIG9uXG4gICAgICAgICAgICAvLyBob3cgd2UgaW50ZXJwcmV0IG5vdyAobG9jYWwsIHV0YywgZml4ZWQgb2Zmc2V0KS4gU28gY3JlYXRlXG4gICAgICAgICAgICAvLyBhIG5vdyB2ZXJzaW9uIG9mIGN1cnJlbnQgY29uZmlnICh0YWtlIGxvY2FsL3V0Yy9vZmZzZXQgZmxhZ3MsIGFuZFxuICAgICAgICAgICAgLy8gY3JlYXRlIG5vdykuXG4gICAgICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKHcuR0csIGNvbmZpZy5fYVtZRUFSXSwgd2Vla09mWWVhcihsb2NhbF9fY3JlYXRlTG9jYWwoKSwgMSwgNCkueWVhcik7XG4gICAgICAgICAgICB3ZWVrID0gZGVmYXVsdHMody5XLCAxKTtcbiAgICAgICAgICAgIHdlZWtkYXkgPSBkZWZhdWx0cyh3LkUsIDEpO1xuICAgICAgICAgICAgaWYgKHdlZWtkYXkgPCAxIHx8IHdlZWtkYXkgPiA3KSB7XG4gICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvdyA9IGNvbmZpZy5fbG9jYWxlLl93ZWVrLmRvdztcbiAgICAgICAgICAgIGRveSA9IGNvbmZpZy5fbG9jYWxlLl93ZWVrLmRveTtcblxuICAgICAgICAgICAgd2Vla1llYXIgPSBkZWZhdWx0cyh3LmdnLCBjb25maWcuX2FbWUVBUl0sIHdlZWtPZlllYXIobG9jYWxfX2NyZWF0ZUxvY2FsKCksIGRvdywgZG95KS55ZWFyKTtcbiAgICAgICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LncsIDEpO1xuXG4gICAgICAgICAgICBpZiAody5kICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyB3ZWVrZGF5IC0tIGxvdyBkYXkgbnVtYmVycyBhcmUgY29uc2lkZXJlZCBuZXh0IHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5kO1xuICAgICAgICAgICAgICAgIGlmICh3ZWVrZGF5IDwgMCB8fCB3ZWVrZGF5ID4gNikge1xuICAgICAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAody5lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBsb2NhbCB3ZWVrZGF5IC0tIGNvdW50aW5nIHN0YXJ0cyBmcm9tIGJlZ2luaW5nIG9mIHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5lICsgZG93O1xuICAgICAgICAgICAgICAgIGlmICh3LmUgPCAwIHx8IHcuZSA+IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gYmVnaW5pbmcgb2Ygd2Vla1xuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSBkb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdlZWsgPCAxIHx8IHdlZWsgPiB3ZWVrc0luWWVhcih3ZWVrWWVhciwgZG93LCBkb3kpKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrcyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAod2Vla2RheU92ZXJmbG93ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd1dlZWtkYXkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGVtcCA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xuICAgICAgICAgICAgY29uZmlnLl9hW1lFQVJdID0gdGVtcC55ZWFyO1xuICAgICAgICAgICAgY29uZmlnLl9kYXlPZlllYXIgPSB0ZW1wLmRheU9mWWVhcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvbnN0YW50IHRoYXQgcmVmZXJzIHRvIHRoZSBJU08gc3RhbmRhcmRcbiAgICB1dGlsc19ob29rc19faG9va3MuSVNPXzg2MDEgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGZvcm1hdCBzdHJpbmdcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZykge1xuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBjcmVhdGlvbiBmbG93IHRvIHByZXZlbnQgY2lyY3VsYXIgZGVwc1xuICAgICAgICBpZiAoY29uZmlnLl9mID09PSB1dGlsc19ob29rc19faG9va3MuSVNPXzg2MDEpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21JU08oY29uZmlnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZy5fYSA9IFtdO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IHRydWU7XG5cbiAgICAgICAgLy8gVGhpcyBhcnJheSBpcyB1c2VkIHRvIG1ha2UgYSBEYXRlLCBlaXRoZXIgd2l0aCBgbmV3IERhdGVgIG9yIGBEYXRlLlVUQ2BcbiAgICAgICAgdmFyIHN0cmluZyA9ICcnICsgY29uZmlnLl9pLFxuICAgICAgICAgICAgaSwgcGFyc2VkSW5wdXQsIHRva2VucywgdG9rZW4sIHNraXBwZWQsXG4gICAgICAgICAgICBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCA9IDA7XG5cbiAgICAgICAgdG9rZW5zID0gZXhwYW5kRm9ybWF0KGNvbmZpZy5fZiwgY29uZmlnLl9sb2NhbGUpLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpIHx8IFtdO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgcGFyc2VkSW5wdXQgPSAoc3RyaW5nLm1hdGNoKGdldFBhcnNlUmVnZXhGb3JUb2tlbih0b2tlbiwgY29uZmlnKSkgfHwgW10pWzBdO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Rva2VuJywgdG9rZW4sICdwYXJzZWRJbnB1dCcsIHBhcnNlZElucHV0LFxuICAgICAgICAgICAgLy8gICAgICAgICAncmVnZXgnLCBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykpO1xuICAgICAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgc2tpcHBlZCA9IHN0cmluZy5zdWJzdHIoMCwgc3RyaW5nLmluZGV4T2YocGFyc2VkSW5wdXQpKTtcbiAgICAgICAgICAgICAgICBpZiAoc2tpcHBlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc2tpcHBlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5zbGljZShzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkgKyBwYXJzZWRJbnB1dC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGggKz0gcGFyc2VkSW5wdXQubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZG9uJ3QgcGFyc2UgaWYgaXQncyBub3QgYSBrbm93biB0b2tlblxuICAgICAgICAgICAgaWYgKGZvcm1hdFRva2VuRnVuY3Rpb25zW3Rva2VuXSkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgcGFyc2VkSW5wdXQsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb25maWcuX3N0cmljdCAmJiAhcGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgcmVtYWluaW5nIHVucGFyc2VkIGlucHV0IGxlbmd0aCB0byB0aGUgc3RyaW5nXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmNoYXJzTGVmdE92ZXIgPSBzdHJpbmdMZW5ndGggLSB0b3RhbFBhcnNlZElucHV0TGVuZ3RoO1xuICAgICAgICBpZiAoc3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFyIF8xMmggZmxhZyBpZiBob3VyIGlzIDw9IDEyXG4gICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID09PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdIDw9IDEyICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID4gMCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBoYW5kbGUgbWVyaWRpZW1cbiAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gbWVyaWRpZW1GaXhXcmFwKGNvbmZpZy5fbG9jYWxlLCBjb25maWcuX2FbSE9VUl0sIGNvbmZpZy5fbWVyaWRpZW0pO1xuXG4gICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xuICAgICAgICBjaGVja092ZXJmbG93KGNvbmZpZyk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBtZXJpZGllbUZpeFdyYXAgKGxvY2FsZSwgaG91ciwgbWVyaWRpZW0pIHtcbiAgICAgICAgdmFyIGlzUG07XG5cbiAgICAgICAgaWYgKG1lcmlkaWVtID09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIG5vdGhpbmcgdG8gZG9cbiAgICAgICAgICAgIHJldHVybiBob3VyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2NhbGUubWVyaWRpZW1Ib3VyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUubWVyaWRpZW1Ib3VyKGhvdXIsIG1lcmlkaWVtKTtcbiAgICAgICAgfSBlbHNlIGlmIChsb2NhbGUuaXNQTSAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBGYWxsYmFja1xuICAgICAgICAgICAgaXNQbSA9IGxvY2FsZS5pc1BNKG1lcmlkaWVtKTtcbiAgICAgICAgICAgIGlmIChpc1BtICYmIGhvdXIgPCAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzUG0gJiYgaG91ciA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICBob3VyID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBob3VyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBub3Qgc3VwcG9zZWQgdG8gaGFwcGVuXG4gICAgICAgICAgICByZXR1cm4gaG91cjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGFycmF5IG9mIGZvcm1hdCBzdHJpbmdzXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEFycmF5KGNvbmZpZykge1xuICAgICAgICB2YXIgdGVtcENvbmZpZyxcbiAgICAgICAgICAgIGJlc3RNb21lbnQsXG5cbiAgICAgICAgICAgIHNjb3JlVG9CZWF0LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZTtcblxuICAgICAgICBpZiAoY29uZmlnLl9mLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZEZvcm1hdCA9IHRydWU7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShOYU4pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbmZpZy5fZi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY3VycmVudFNjb3JlID0gMDtcbiAgICAgICAgICAgIHRlbXBDb25maWcgPSBjb3B5Q29uZmlnKHt9LCBjb25maWcpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5fdXNlVVRDICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0ZW1wQ29uZmlnLl91c2VVVEMgPSBjb25maWcuX3VzZVVUQztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBDb25maWcuX2YgPSBjb25maWcuX2ZbaV07XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KHRlbXBDb25maWcpO1xuXG4gICAgICAgICAgICBpZiAoIXZhbGlkX19pc1ZhbGlkKHRlbXBDb25maWcpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFueSBpbnB1dCB0aGF0IHdhcyBub3QgcGFyc2VkIGFkZCBhIHBlbmFsdHkgZm9yIHRoYXQgZm9ybWF0XG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLmNoYXJzTGVmdE92ZXI7XG5cbiAgICAgICAgICAgIC8vb3IgdG9rZW5zXG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnVudXNlZFRva2Vucy5sZW5ndGggKiAxMDtcblxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnNjb3JlID0gY3VycmVudFNjb3JlO1xuXG4gICAgICAgICAgICBpZiAoc2NvcmVUb0JlYXQgPT0gbnVsbCB8fCBjdXJyZW50U2NvcmUgPCBzY29yZVRvQmVhdCkge1xuICAgICAgICAgICAgICAgIHNjb3JlVG9CZWF0ID0gY3VycmVudFNjb3JlO1xuICAgICAgICAgICAgICAgIGJlc3RNb21lbnQgPSB0ZW1wQ29uZmlnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXh0ZW5kKGNvbmZpZywgYmVzdE1vbWVudCB8fCB0ZW1wQ29uZmlnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tT2JqZWN0KGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGNvbmZpZy5faSk7XG4gICAgICAgIGNvbmZpZy5fYSA9IG1hcChbaS55ZWFyLCBpLm1vbnRoLCBpLmRheSB8fCBpLmRhdGUsIGkuaG91ciwgaS5taW51dGUsIGkuc2Vjb25kLCBpLm1pbGxpc2Vjb25kXSwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBwYXJzZUludChvYmosIDEwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJvbUNvbmZpZyAoY29uZmlnKSB7XG4gICAgICAgIHZhciByZXMgPSBuZXcgTW9tZW50KGNoZWNrT3ZlcmZsb3cocHJlcGFyZUNvbmZpZyhjb25maWcpKSk7XG4gICAgICAgIGlmIChyZXMuX25leHREYXkpIHtcbiAgICAgICAgICAgIC8vIEFkZGluZyBpcyBzbWFydCBlbm91Z2ggYXJvdW5kIERTVFxuICAgICAgICAgICAgcmVzLmFkZCgxLCAnZCcpO1xuICAgICAgICAgICAgcmVzLl9uZXh0RGF5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlQ29uZmlnIChjb25maWcpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pLFxuICAgICAgICAgICAgZm9ybWF0ID0gY29uZmlnLl9mO1xuXG4gICAgICAgIGNvbmZpZy5fbG9jYWxlID0gY29uZmlnLl9sb2NhbGUgfHwgbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZShjb25maWcuX2wpO1xuXG4gICAgICAgIGlmIChpbnB1dCA9PT0gbnVsbCB8fCAoZm9ybWF0ID09PSB1bmRlZmluZWQgJiYgaW5wdXQgPT09ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbGlkX19jcmVhdGVJbnZhbGlkKHtudWxsSW5wdXQ6IHRydWV9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25maWcuX2kgPSBpbnB1dCA9IGNvbmZpZy5fbG9jYWxlLnByZXBhcnNlKGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01vbWVudChpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTW9tZW50KGNoZWNrT3ZlcmZsb3coaW5wdXQpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGZvcm1hdCkpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRBcnJheShjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdCkge1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShpbnB1dCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IGlucHV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnRnJvbUlucHV0KGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXZhbGlkX19pc1ZhbGlkKGNvbmZpZykpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pO1xuICAgICAgICBpZiAoaW5wdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUodXRpbHNfaG9va3NfX2hvb2tzLm5vdygpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSgraW5wdXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9hID0gbWFwKGlucHV0LnNsaWNlKDApLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KG9iaiwgMTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YoaW5wdXQpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uZmlnRnJvbU9iamVjdChjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihpbnB1dCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAvLyBmcm9tIG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMb2NhbE9yVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgaXNVVEMpIHtcbiAgICAgICAgdmFyIGMgPSB7fTtcblxuICAgICAgICBpZiAodHlwZW9mKGxvY2FsZSkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgc3RyaWN0ID0gbG9jYWxlO1xuICAgICAgICAgICAgbG9jYWxlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIG9iamVjdCBjb25zdHJ1Y3Rpb24gbXVzdCBiZSBkb25lIHRoaXMgd2F5LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQyM1xuICAgICAgICBjLl9pc0FNb21lbnRPYmplY3QgPSB0cnVlO1xuICAgICAgICBjLl91c2VVVEMgPSBjLl9pc1VUQyA9IGlzVVRDO1xuICAgICAgICBjLl9sID0gbG9jYWxlO1xuICAgICAgICBjLl9pID0gaW5wdXQ7XG4gICAgICAgIGMuX2YgPSBmb3JtYXQ7XG4gICAgICAgIGMuX3N0cmljdCA9IHN0cmljdDtcblxuICAgICAgICByZXR1cm4gY3JlYXRlRnJvbUNvbmZpZyhjKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbF9fY3JlYXRlTG9jYWwgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvdHlwZU1pbiA9IGRlcHJlY2F0ZShcbiAgICAgICAgICdtb21lbnQoKS5taW4gaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5taW4gaW5zdGVhZC4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE1NDgnLFxuICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgIHZhciBvdGhlciA9IGxvY2FsX19jcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyIDwgdGhpcyA/IHRoaXMgOiBvdGhlcjtcbiAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRfX2NyZWF0ZUludmFsaWQoKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICk7XG5cbiAgICB2YXIgcHJvdG90eXBlTWF4ID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50KCkubWF4IGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWF4IGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNTQ4JyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG90aGVyID0gbG9jYWxfX2NyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyID4gdGhpcyA/IHRoaXMgOiBvdGhlcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkX19jcmVhdGVJbnZhbGlkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gUGljayBhIG1vbWVudCBtIGZyb20gbW9tZW50cyBzbyB0aGF0IG1bZm5dKG90aGVyKSBpcyB0cnVlIGZvciBhbGxcbiAgICAvLyBvdGhlci4gVGhpcyByZWxpZXMgb24gdGhlIGZ1bmN0aW9uIGZuIHRvIGJlIHRyYW5zaXRpdmUuXG4gICAgLy9cbiAgICAvLyBtb21lbnRzIHNob3VsZCBlaXRoZXIgYmUgYW4gYXJyYXkgb2YgbW9tZW50IG9iamVjdHMgb3IgYW4gYXJyYXksIHdob3NlXG4gICAgLy8gZmlyc3QgZWxlbWVudCBpcyBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cy5cbiAgICBmdW5jdGlvbiBwaWNrQnkoZm4sIG1vbWVudHMpIHtcbiAgICAgICAgdmFyIHJlcywgaTtcbiAgICAgICAgaWYgKG1vbWVudHMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkobW9tZW50c1swXSkpIHtcbiAgICAgICAgICAgIG1vbWVudHMgPSBtb21lbnRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbW9tZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbF9fY3JlYXRlTG9jYWwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXMgPSBtb21lbnRzWzBdO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbW9tZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKCFtb21lbnRzW2ldLmlzVmFsaWQoKSB8fCBtb21lbnRzW2ldW2ZuXShyZXMpKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gbW9tZW50c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFVzZSBbXS5zb3J0IGluc3RlYWQ/XG4gICAgZnVuY3Rpb24gbWluICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICAgICAgcmV0dXJuIHBpY2tCeSgnaXNCZWZvcmUnLCBhcmdzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXggKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0FmdGVyJywgYXJncyk7XG4gICAgfVxuXG4gICAgdmFyIG5vdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIERhdGUubm93ID8gRGF0ZS5ub3coKSA6ICsobmV3IERhdGUoKSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIER1cmF0aW9uIChkdXJhdGlvbikge1xuICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0ID0gbm9ybWFsaXplT2JqZWN0VW5pdHMoZHVyYXRpb24pLFxuICAgICAgICAgICAgeWVhcnMgPSBub3JtYWxpemVkSW5wdXQueWVhciB8fCAwLFxuICAgICAgICAgICAgcXVhcnRlcnMgPSBub3JtYWxpemVkSW5wdXQucXVhcnRlciB8fCAwLFxuICAgICAgICAgICAgbW9udGhzID0gbm9ybWFsaXplZElucHV0Lm1vbnRoIHx8IDAsXG4gICAgICAgICAgICB3ZWVrcyA9IG5vcm1hbGl6ZWRJbnB1dC53ZWVrIHx8IDAsXG4gICAgICAgICAgICBkYXlzID0gbm9ybWFsaXplZElucHV0LmRheSB8fCAwLFxuICAgICAgICAgICAgaG91cnMgPSBub3JtYWxpemVkSW5wdXQuaG91ciB8fCAwLFxuICAgICAgICAgICAgbWludXRlcyA9IG5vcm1hbGl6ZWRJbnB1dC5taW51dGUgfHwgMCxcbiAgICAgICAgICAgIHNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQuc2Vjb25kIHx8IDAsXG4gICAgICAgICAgICBtaWxsaXNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQubWlsbGlzZWNvbmQgfHwgMDtcblxuICAgICAgICAvLyByZXByZXNlbnRhdGlvbiBmb3IgZGF0ZUFkZFJlbW92ZVxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgPSArbWlsbGlzZWNvbmRzICtcbiAgICAgICAgICAgIHNlY29uZHMgKiAxZTMgKyAvLyAxMDAwXG4gICAgICAgICAgICBtaW51dGVzICogNmU0ICsgLy8gMTAwMCAqIDYwXG4gICAgICAgICAgICBob3VycyAqIDM2ZTU7IC8vIDEwMDAgKiA2MCAqIDYwXG4gICAgICAgIC8vIEJlY2F1c2Ugb2YgZGF0ZUFkZFJlbW92ZSB0cmVhdHMgMjQgaG91cnMgYXMgZGlmZmVyZW50IGZyb20gYVxuICAgICAgICAvLyBkYXkgd2hlbiB3b3JraW5nIGFyb3VuZCBEU1QsIHdlIG5lZWQgdG8gc3RvcmUgdGhlbSBzZXBhcmF0ZWx5XG4gICAgICAgIHRoaXMuX2RheXMgPSArZGF5cyArXG4gICAgICAgICAgICB3ZWVrcyAqIDc7XG4gICAgICAgIC8vIEl0IGlzIGltcG9zc2libGUgdHJhbnNsYXRlIG1vbnRocyBpbnRvIGRheXMgd2l0aG91dCBrbm93aW5nXG4gICAgICAgIC8vIHdoaWNoIG1vbnRocyB5b3UgYXJlIGFyZSB0YWxraW5nIGFib3V0LCBzbyB3ZSBoYXZlIHRvIHN0b3JlXG4gICAgICAgIC8vIGl0IHNlcGFyYXRlbHkuXG4gICAgICAgIHRoaXMuX21vbnRocyA9ICttb250aHMgK1xuICAgICAgICAgICAgcXVhcnRlcnMgKiAzICtcbiAgICAgICAgICAgIHllYXJzICogMTI7XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuXG4gICAgICAgIHRoaXMuX2xvY2FsZSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoKTtcblxuICAgICAgICB0aGlzLl9idWJibGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0R1cmF0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIER1cmF0aW9uO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGZ1bmN0aW9uIG9mZnNldCAodG9rZW4sIHNlcGFyYXRvcikge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMudXRjT2Zmc2V0KCk7XG4gICAgICAgICAgICB2YXIgc2lnbiA9ICcrJztcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcbiAgICAgICAgICAgICAgICBzaWduID0gJy0nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNpZ24gKyB6ZXJvRmlsbCh+fihvZmZzZXQgLyA2MCksIDIpICsgc2VwYXJhdG9yICsgemVyb0ZpbGwofn4ob2Zmc2V0KSAlIDYwLCAyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb2Zmc2V0KCdaJywgJzonKTtcbiAgICBvZmZzZXQoJ1paJywgJycpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignWicsICBtYXRjaFNob3J0T2Zmc2V0KTtcbiAgICBhZGRSZWdleFRva2VuKCdaWicsIG1hdGNoU2hvcnRPZmZzZXQpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydaJywgJ1paJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX3VzZVVUQyA9IHRydWU7XG4gICAgICAgIGNvbmZpZy5fdHptID0gb2Zmc2V0RnJvbVN0cmluZyhtYXRjaFNob3J0T2Zmc2V0LCBpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICAvLyB0aW1lem9uZSBjaHVua2VyXG4gICAgLy8gJysxMDowMCcgPiBbJzEwJywgICcwMCddXG4gICAgLy8gJy0xNTMwJyAgPiBbJy0xNScsICczMCddXG4gICAgdmFyIGNodW5rT2Zmc2V0ID0gLyhbXFwrXFwtXXxcXGRcXGQpL2dpO1xuXG4gICAgZnVuY3Rpb24gb2Zmc2V0RnJvbVN0cmluZyhtYXRjaGVyLCBzdHJpbmcpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSAoKHN0cmluZyB8fCAnJykubWF0Y2gobWF0Y2hlcikgfHwgW10pO1xuICAgICAgICB2YXIgY2h1bmsgICA9IG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGggLSAxXSB8fCBbXTtcbiAgICAgICAgdmFyIHBhcnRzICAgPSAoY2h1bmsgKyAnJykubWF0Y2goY2h1bmtPZmZzZXQpIHx8IFsnLScsIDAsIDBdO1xuICAgICAgICB2YXIgbWludXRlcyA9ICsocGFydHNbMV0gKiA2MCkgKyB0b0ludChwYXJ0c1syXSk7XG5cbiAgICAgICAgcmV0dXJuIHBhcnRzWzBdID09PSAnKycgPyBtaW51dGVzIDogLW1pbnV0ZXM7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgbW9tZW50IGZyb20gaW5wdXQsIHRoYXQgaXMgbG9jYWwvdXRjL3pvbmUgZXF1aXZhbGVudCB0byBtb2RlbC5cbiAgICBmdW5jdGlvbiBjbG9uZVdpdGhPZmZzZXQoaW5wdXQsIG1vZGVsKSB7XG4gICAgICAgIHZhciByZXMsIGRpZmY7XG4gICAgICAgIGlmIChtb2RlbC5faXNVVEMpIHtcbiAgICAgICAgICAgIHJlcyA9IG1vZGVsLmNsb25lKCk7XG4gICAgICAgICAgICBkaWZmID0gKGlzTW9tZW50KGlucHV0KSB8fCBpc0RhdGUoaW5wdXQpID8gK2lucHV0IDogK2xvY2FsX19jcmVhdGVMb2NhbChpbnB1dCkpIC0gKCtyZXMpO1xuICAgICAgICAgICAgLy8gVXNlIGxvdy1sZXZlbCBhcGksIGJlY2F1c2UgdGhpcyBmbiBpcyBsb3ctbGV2ZWwgYXBpLlxuICAgICAgICAgICAgcmVzLl9kLnNldFRpbWUoK3Jlcy5fZCArIGRpZmYpO1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldChyZXMsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KS5sb2NhbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0ZU9mZnNldCAobSkge1xuICAgICAgICAvLyBPbiBGaXJlZm94LjI0IERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyBhIGZsb2F0aW5nIHBvaW50LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9wdWxsLzE4NzFcbiAgICAgICAgcmV0dXJuIC1NYXRoLnJvdW5kKG0uX2QuZ2V0VGltZXpvbmVPZmZzZXQoKSAvIDE1KSAqIDE1O1xuICAgIH1cblxuICAgIC8vIEhPT0tTXG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIGEgbW9tZW50IGlzIG11dGF0ZWQuXG4gICAgLy8gSXQgaXMgaW50ZW5kZWQgdG8ga2VlcCB0aGUgb2Zmc2V0IGluIHN5bmMgd2l0aCB0aGUgdGltZXpvbmUuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgLy8ga2VlcExvY2FsVGltZSA9IHRydWUgbWVhbnMgb25seSBjaGFuZ2UgdGhlIHRpbWV6b25lLCB3aXRob3V0XG4gICAgLy8gYWZmZWN0aW5nIHRoZSBsb2NhbCBob3VyLiBTbyA1OjMxOjI2ICswMzAwIC0tW3V0Y09mZnNldCgyLCB0cnVlKV0tLT5cbiAgICAvLyA1OjMxOjI2ICswMjAwIEl0IGlzIHBvc3NpYmxlIHRoYXQgNTozMToyNiBkb2Vzbid0IGV4aXN0IHdpdGggb2Zmc2V0XG4gICAgLy8gKzAyMDAsIHNvIHdlIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQsIHRvIGJlIHZhbGlkLlxuICAgIC8vXG4gICAgLy8gS2VlcGluZyB0aGUgdGltZSBhY3R1YWxseSBhZGRzL3N1YnRyYWN0cyAob25lIGhvdXIpXG4gICAgLy8gZnJvbSB0aGUgYWN0dWFsIHJlcHJlc2VudGVkIHRpbWUuIFRoYXQgaXMgd2h5IHdlIGNhbGwgdXBkYXRlT2Zmc2V0XG4gICAgLy8gYSBzZWNvbmQgdGltZS4gSW4gY2FzZSBpdCB3YW50cyB1cyB0byBjaGFuZ2UgdGhlIG9mZnNldCBhZ2FpblxuICAgIC8vIF9jaGFuZ2VJblByb2dyZXNzID09IHRydWUgY2FzZSwgdGhlbiB3ZSBoYXZlIHRvIGFkanVzdCwgYmVjYXVzZVxuICAgIC8vIHRoZXJlIGlzIG5vIHN1Y2ggdGltZSBpbiB0aGUgZ2l2ZW4gdGltZXpvbmUuXG4gICAgZnVuY3Rpb24gZ2V0U2V0T2Zmc2V0IChpbnB1dCwga2VlcExvY2FsVGltZSkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fb2Zmc2V0IHx8IDAsXG4gICAgICAgICAgICBsb2NhbEFkanVzdDtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gb2Zmc2V0RnJvbVN0cmluZyhtYXRjaFNob3J0T2Zmc2V0LCBpbnB1dCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGlucHV0KSA8IDE2KSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dCAqIDYwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1VUQyAmJiBrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxBZGp1c3QgPSBnZXREYXRlT2Zmc2V0KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gaW5wdXQ7XG4gICAgICAgICAgICB0aGlzLl9pc1VUQyA9IHRydWU7XG4gICAgICAgICAgICBpZiAobG9jYWxBZGp1c3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGxvY2FsQWRqdXN0LCAnbScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9mZnNldCAhPT0gaW5wdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWtlZXBMb2NhbFRpbWUgfHwgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICBhZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24oaW5wdXQgLSBvZmZzZXQsICdtJyksIDEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/IG9mZnNldCA6IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRab25lIChpbnB1dCwga2VlcExvY2FsVGltZSkge1xuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IC1pbnB1dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoaW5wdXQsIGtlZXBMb2NhbFRpbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAtdGhpcy51dGNPZmZzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9mZnNldFRvVVRDIChrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb0xvY2FsIChrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1VUQykge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XG4gICAgICAgICAgICB0aGlzLl9pc1VUQyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3VidHJhY3QoZ2V0RGF0ZU9mZnNldCh0aGlzKSwgJ20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldCAoKSB7XG4gICAgICAgIGlmICh0aGlzLl90em0pIHtcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KHRoaXMuX3R6bSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2kgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldChvZmZzZXRGcm9tU3RyaW5nKG1hdGNoT2Zmc2V0LCB0aGlzLl9pKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzQWxpZ25lZEhvdXJPZmZzZXQgKGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dCA9IGlucHV0ID8gbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KS51dGNPZmZzZXQoKSA6IDA7XG5cbiAgICAgICAgcmV0dXJuICh0aGlzLnV0Y09mZnNldCgpIC0gaW5wdXQpICUgNjAgPT09IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEYXlsaWdodFNhdmluZ1RpbWUgKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCgwKS51dGNPZmZzZXQoKSB8fFxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCg1KS51dGNPZmZzZXQoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZCAoKSB7XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5faXNEU1RTaGlmdGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzRFNUU2hpZnRlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjID0ge307XG5cbiAgICAgICAgY29weUNvbmZpZyhjLCB0aGlzKTtcbiAgICAgICAgYyA9IHByZXBhcmVDb25maWcoYyk7XG5cbiAgICAgICAgaWYgKGMuX2EpIHtcbiAgICAgICAgICAgIHZhciBvdGhlciA9IGMuX2lzVVRDID8gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKGMuX2EpIDogbG9jYWxfX2NyZWF0ZUxvY2FsKGMuX2EpO1xuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID0gdGhpcy5pc1ZhbGlkKCkgJiZcbiAgICAgICAgICAgICAgICBjb21wYXJlQXJyYXlzKGMuX2EsIG90aGVyLnRvQXJyYXkoKSkgPiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTG9jYWwgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyAhdGhpcy5faXNVVEMgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1V0Y09mZnNldCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2lzVVRDIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVdGMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyAmJiB0aGlzLl9vZmZzZXQgPT09IDAgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBU1AuTkVUIGpzb24gZGF0ZSBmb3JtYXQgcmVnZXhcbiAgICB2YXIgYXNwTmV0UmVnZXggPSAvXihcXC0pPyg/OihcXGQqKVsuIF0pPyhcXGQrKVxcOihcXGQrKSg/OlxcOihcXGQrKVxcLj8oXFxkezN9KT9cXGQqKT8kLztcblxuICAgIC8vIGZyb20gaHR0cDovL2RvY3MuY2xvc3VyZS1saWJyYXJ5Lmdvb2dsZWNvZGUuY29tL2dpdC9jbG9zdXJlX2dvb2dfZGF0ZV9kYXRlLmpzLnNvdXJjZS5odG1sXG4gICAgLy8gc29tZXdoYXQgbW9yZSBpbiBsaW5lIHdpdGggNC40LjMuMiAyMDA0IHNwZWMsIGJ1dCBhbGxvd3MgZGVjaW1hbCBhbnl3aGVyZVxuICAgIHZhciBpc29SZWdleCA9IC9eKC0pP1AoPzooPzooWzAtOSwuXSopWSk/KD86KFswLTksLl0qKU0pPyg/OihbMC05LC5dKilEKT8oPzpUKD86KFswLTksLl0qKUgpPyg/OihbMC05LC5dKilNKT8oPzooWzAtOSwuXSopUyk/KT98KFswLTksLl0qKVcpJC87XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uIChpbnB1dCwga2V5KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGlucHV0LFxuICAgICAgICAgICAgLy8gbWF0Y2hpbmcgYWdhaW5zdCByZWdleHAgaXMgZXhwZW5zaXZlLCBkbyBpdCBvbiBkZW1hbmRcbiAgICAgICAgICAgIG1hdGNoID0gbnVsbCxcbiAgICAgICAgICAgIHNpZ24sXG4gICAgICAgICAgICByZXQsXG4gICAgICAgICAgICBkaWZmUmVzO1xuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSkge1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgbXMgOiBpbnB1dC5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgICAgIGQgIDogaW5wdXQuX2RheXMsXG4gICAgICAgICAgICAgICAgTSAgOiBpbnB1dC5fbW9udGhzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb25ba2V5XSA9IGlucHV0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbi5taWxsaXNlY29uZHMgPSBpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghIShtYXRjaCA9IGFzcE5ldFJlZ2V4LmV4ZWMoaW5wdXQpKSkge1xuICAgICAgICAgICAgc2lnbiA9IChtYXRjaFsxXSA9PT0gJy0nKSA/IC0xIDogMTtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgICAgIHkgIDogMCxcbiAgICAgICAgICAgICAgICBkICA6IHRvSW50KG1hdGNoW0RBVEVdKSAgICAgICAgKiBzaWduLFxuICAgICAgICAgICAgICAgIGggIDogdG9JbnQobWF0Y2hbSE9VUl0pICAgICAgICAqIHNpZ24sXG4gICAgICAgICAgICAgICAgbSAgOiB0b0ludChtYXRjaFtNSU5VVEVdKSAgICAgICogc2lnbixcbiAgICAgICAgICAgICAgICBzICA6IHRvSW50KG1hdGNoW1NFQ09ORF0pICAgICAgKiBzaWduLFxuICAgICAgICAgICAgICAgIG1zIDogdG9JbnQobWF0Y2hbTUlMTElTRUNPTkRdKSAqIHNpZ25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoISEobWF0Y2ggPSBpc29SZWdleC5leGVjKGlucHV0KSkpIHtcbiAgICAgICAgICAgIHNpZ24gPSAobWF0Y2hbMV0gPT09ICctJykgPyAtMSA6IDE7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB5IDogcGFyc2VJc28obWF0Y2hbMl0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIE0gOiBwYXJzZUlzbyhtYXRjaFszXSwgc2lnbiksXG4gICAgICAgICAgICAgICAgZCA6IHBhcnNlSXNvKG1hdGNoWzRdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBoIDogcGFyc2VJc28obWF0Y2hbNV0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIG0gOiBwYXJzZUlzbyhtYXRjaFs2XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgcyA6IHBhcnNlSXNvKG1hdGNoWzddLCBzaWduKSxcbiAgICAgICAgICAgICAgICB3IDogcGFyc2VJc28obWF0Y2hbOF0sIHNpZ24pXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGR1cmF0aW9uID09IG51bGwpIHsvLyBjaGVja3MgZm9yIG51bGwgb3IgdW5kZWZpbmVkXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ29iamVjdCcgJiYgKCdmcm9tJyBpbiBkdXJhdGlvbiB8fCAndG8nIGluIGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgZGlmZlJlcyA9IG1vbWVudHNEaWZmZXJlbmNlKGxvY2FsX19jcmVhdGVMb2NhbChkdXJhdGlvbi5mcm9tKSwgbG9jYWxfX2NyZWF0ZUxvY2FsKGR1cmF0aW9uLnRvKSk7XG5cbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgICAgICBkdXJhdGlvbi5tcyA9IGRpZmZSZXMubWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgZHVyYXRpb24uTSA9IGRpZmZSZXMubW9udGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0ID0gbmV3IER1cmF0aW9uKGR1cmF0aW9uKTtcblxuICAgICAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkgJiYgaGFzT3duUHJvcChpbnB1dCwgJ19sb2NhbGUnKSkge1xuICAgICAgICAgICAgcmV0Ll9sb2NhbGUgPSBpbnB1dC5fbG9jYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uLmZuID0gRHVyYXRpb24ucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gcGFyc2VJc28gKGlucCwgc2lnbikge1xuICAgICAgICAvLyBXZSdkIG5vcm1hbGx5IHVzZSB+fmlucCBmb3IgdGhpcywgYnV0IHVuZm9ydHVuYXRlbHkgaXQgYWxzb1xuICAgICAgICAvLyBjb252ZXJ0cyBmbG9hdHMgdG8gaW50cy5cbiAgICAgICAgLy8gaW5wIG1heSBiZSB1bmRlZmluZWQsIHNvIGNhcmVmdWwgY2FsbGluZyByZXBsYWNlIG9uIGl0LlxuICAgICAgICB2YXIgcmVzID0gaW5wICYmIHBhcnNlRmxvYXQoaW5wLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICAgICAgLy8gYXBwbHkgc2lnbiB3aGlsZSB3ZSdyZSBhdCBpdFxuICAgICAgICByZXR1cm4gKGlzTmFOKHJlcykgPyAwIDogcmVzKSAqIHNpZ247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xuICAgICAgICB2YXIgcmVzID0ge21pbGxpc2Vjb25kczogMCwgbW9udGhzOiAwfTtcblxuICAgICAgICByZXMubW9udGhzID0gb3RoZXIubW9udGgoKSAtIGJhc2UubW9udGgoKSArXG4gICAgICAgICAgICAob3RoZXIueWVhcigpIC0gYmFzZS55ZWFyKCkpICogMTI7XG4gICAgICAgIGlmIChiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykuaXNBZnRlcihvdGhlcikpIHtcbiAgICAgICAgICAgIC0tcmVzLm1vbnRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcy5taWxsaXNlY29uZHMgPSArb3RoZXIgLSArKGJhc2UuY2xvbmUoKS5hZGQocmVzLm1vbnRocywgJ00nKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xuICAgICAgICB2YXIgcmVzO1xuICAgICAgICBpZiAoIShiYXNlLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4ge21pbGxpc2Vjb25kczogMCwgbW9udGhzOiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyID0gY2xvbmVXaXRoT2Zmc2V0KG90aGVyLCBiYXNlKTtcbiAgICAgICAgaWYgKGJhc2UuaXNCZWZvcmUob3RoZXIpKSB7XG4gICAgICAgICAgICByZXMgPSBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2Uob3RoZXIsIGJhc2UpO1xuICAgICAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9IC1yZXMubWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgcmVzLm1vbnRocyA9IC1yZXMubW9udGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvLyBUT0RPOiByZW1vdmUgJ25hbWUnIGFyZyBhZnRlciBkZXByZWNhdGlvbiBpcyByZW1vdmVkXG4gICAgZnVuY3Rpb24gY3JlYXRlQWRkZXIoZGlyZWN0aW9uLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBwZXJpb2QpIHtcbiAgICAgICAgICAgIHZhciBkdXIsIHRtcDtcbiAgICAgICAgICAgIC8vaW52ZXJ0IHRoZSBhcmd1bWVudHMsIGJ1dCBjb21wbGFpbiBhYm91dCBpdFxuICAgICAgICAgICAgaWYgKHBlcmlvZCAhPT0gbnVsbCAmJiAhaXNOYU4oK3BlcmlvZCkpIHtcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUobmFtZSwgJ21vbWVudCgpLicgKyBuYW1lICArICcocGVyaW9kLCBudW1iZXIpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgbW9tZW50KCkuJyArIG5hbWUgKyAnKG51bWJlciwgcGVyaW9kKS4nKTtcbiAgICAgICAgICAgICAgICB0bXAgPSB2YWw7IHZhbCA9IHBlcmlvZDsgcGVyaW9kID0gdG1wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWwgPSB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/ICt2YWwgOiB2YWw7XG4gICAgICAgICAgICBkdXIgPSBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKHZhbCwgcGVyaW9kKTtcbiAgICAgICAgICAgIGFkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgZHVyLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCAobW9tLCBkdXJhdGlvbiwgaXNBZGRpbmcsIHVwZGF0ZU9mZnNldCkge1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gZHVyYXRpb24uX21pbGxpc2Vjb25kcyxcbiAgICAgICAgICAgIGRheXMgPSBkdXJhdGlvbi5fZGF5cyxcbiAgICAgICAgICAgIG1vbnRocyA9IGR1cmF0aW9uLl9tb250aHM7XG5cbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAvLyBObyBvcFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlT2Zmc2V0ID0gdXBkYXRlT2Zmc2V0ID09IG51bGwgPyB0cnVlIDogdXBkYXRlT2Zmc2V0O1xuXG4gICAgICAgIGlmIChtaWxsaXNlY29uZHMpIHtcbiAgICAgICAgICAgIG1vbS5fZC5zZXRUaW1lKCttb20uX2QgKyBtaWxsaXNlY29uZHMgKiBpc0FkZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRheXMpIHtcbiAgICAgICAgICAgIGdldF9zZXRfX3NldChtb20sICdEYXRlJywgZ2V0X3NldF9fZ2V0KG1vbSwgJ0RhdGUnKSArIGRheXMgKiBpc0FkZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vbnRocykge1xuICAgICAgICAgICAgc2V0TW9udGgobW9tLCBnZXRfc2V0X19nZXQobW9tLCAnTW9udGgnKSArIG1vbnRocyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlT2Zmc2V0KSB7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KG1vbSwgZGF5cyB8fCBtb250aHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFkZF9zdWJ0cmFjdF9fYWRkICAgICAgPSBjcmVhdGVBZGRlcigxLCAnYWRkJyk7XG4gICAgdmFyIGFkZF9zdWJ0cmFjdF9fc3VidHJhY3QgPSBjcmVhdGVBZGRlcigtMSwgJ3N1YnRyYWN0Jyk7XG5cbiAgICBmdW5jdGlvbiBtb21lbnRfY2FsZW5kYXJfX2NhbGVuZGFyICh0aW1lLCBmb3JtYXRzKSB7XG4gICAgICAgIC8vIFdlIHdhbnQgdG8gY29tcGFyZSB0aGUgc3RhcnQgb2YgdG9kYXksIHZzIHRoaXMuXG4gICAgICAgIC8vIEdldHRpbmcgc3RhcnQtb2YtdG9kYXkgZGVwZW5kcyBvbiB3aGV0aGVyIHdlJ3JlIGxvY2FsL3V0Yy9vZmZzZXQgb3Igbm90LlxuICAgICAgICB2YXIgbm93ID0gdGltZSB8fCBsb2NhbF9fY3JlYXRlTG9jYWwoKSxcbiAgICAgICAgICAgIHNvZCA9IGNsb25lV2l0aE9mZnNldChub3csIHRoaXMpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICAgICAgZGlmZiA9IHRoaXMuZGlmZihzb2QsICdkYXlzJywgdHJ1ZSksXG4gICAgICAgICAgICBmb3JtYXQgPSBkaWZmIDwgLTYgPyAnc2FtZUVsc2UnIDpcbiAgICAgICAgICAgICAgICBkaWZmIDwgLTEgPyAnbGFzdFdlZWsnIDpcbiAgICAgICAgICAgICAgICBkaWZmIDwgMCA/ICdsYXN0RGF5JyA6XG4gICAgICAgICAgICAgICAgZGlmZiA8IDEgPyAnc2FtZURheScgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCAyID8gJ25leHREYXknIDpcbiAgICAgICAgICAgICAgICBkaWZmIDwgNyA/ICduZXh0V2VlaycgOiAnc2FtZUVsc2UnO1xuXG4gICAgICAgIHZhciBvdXRwdXQgPSBmb3JtYXRzICYmIChpc0Z1bmN0aW9uKGZvcm1hdHNbZm9ybWF0XSkgPyBmb3JtYXRzW2Zvcm1hdF0oKSA6IGZvcm1hdHNbZm9ybWF0XSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KG91dHB1dCB8fCB0aGlzLmxvY2FsZURhdGEoKS5jYWxlbmRhcihmb3JtYXQsIHRoaXMsIGxvY2FsX19jcmVhdGVMb2NhbChub3cpKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvbmUgKCkge1xuICAgICAgICByZXR1cm4gbmV3IE1vbWVudCh0aGlzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FmdGVyIChpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgdmFyIGxvY2FsSW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHMoIWlzVW5kZWZpbmVkKHVuaXRzKSA/IHVuaXRzIDogJ21pbGxpc2Vjb25kJyk7XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgcmV0dXJuICt0aGlzID4gK2xvY2FsSW5wdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gK2xvY2FsSW5wdXQgPCArdGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNCZWZvcmUgKGlucHV0LCB1bml0cykge1xuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KTtcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyghaXNVbmRlZmluZWQodW5pdHMpID8gdW5pdHMgOiAnbWlsbGlzZWNvbmQnKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gK3RoaXMgPCArbG9jYWxJbnB1dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiArdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKSA8ICtsb2NhbElucHV0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNCZXR3ZWVuIChmcm9tLCB0bywgdW5pdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNBZnRlcihmcm9tLCB1bml0cykgJiYgdGhpcy5pc0JlZm9yZSh0bywgdW5pdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzU2FtZSAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpLFxuICAgICAgICAgICAgaW5wdXRNcztcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyB8fCAnbWlsbGlzZWNvbmQnKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gK3RoaXMgPT09ICtsb2NhbElucHV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRNcyA9ICtsb2NhbElucHV0O1xuICAgICAgICAgICAgcmV0dXJuICsodGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpKSA8PSBpbnB1dE1zICYmIGlucHV0TXMgPD0gKyh0aGlzLmNsb25lKCkuZW5kT2YodW5pdHMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzU2FtZU9yQWZ0ZXIgKGlucHV0LCB1bml0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1NhbWUoaW5wdXQsIHVuaXRzKSB8fCB0aGlzLmlzQWZ0ZXIoaW5wdXQsdW5pdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzU2FtZU9yQmVmb3JlIChpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTYW1lKGlucHV0LCB1bml0cykgfHwgdGhpcy5pc0JlZm9yZShpbnB1dCx1bml0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlmZiAoaW5wdXQsIHVuaXRzLCBhc0Zsb2F0KSB7XG4gICAgICAgIHZhciB0aGF0LFxuICAgICAgICAgICAgem9uZURlbHRhLFxuICAgICAgICAgICAgZGVsdGEsIG91dHB1dDtcblxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhhdCA9IGNsb25lV2l0aE9mZnNldChpbnB1dCwgdGhpcyk7XG5cbiAgICAgICAgaWYgKCF0aGF0LmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuXG4gICAgICAgIHpvbmVEZWx0YSA9ICh0aGF0LnV0Y09mZnNldCgpIC0gdGhpcy51dGNPZmZzZXQoKSkgKiA2ZTQ7XG5cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG5cbiAgICAgICAgaWYgKHVuaXRzID09PSAneWVhcicgfHwgdW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICdxdWFydGVyJykge1xuICAgICAgICAgICAgb3V0cHV0ID0gbW9udGhEaWZmKHRoaXMsIHRoYXQpO1xuICAgICAgICAgICAgaWYgKHVuaXRzID09PSAncXVhcnRlcicpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgLyAzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1bml0cyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0IC8gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWx0YSA9IHRoaXMgLSB0aGF0O1xuICAgICAgICAgICAgb3V0cHV0ID0gdW5pdHMgPT09ICdzZWNvbmQnID8gZGVsdGEgLyAxZTMgOiAvLyAxMDAwXG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICdtaW51dGUnID8gZGVsdGEgLyA2ZTQgOiAvLyAxMDAwICogNjBcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ2hvdXInID8gZGVsdGEgLyAzNmU1IDogLy8gMTAwMCAqIDYwICogNjBcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ2RheScgPyAoZGVsdGEgLSB6b25lRGVsdGEpIC8gODY0ZTUgOiAvLyAxMDAwICogNjAgKiA2MCAqIDI0LCBuZWdhdGUgZHN0XG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICd3ZWVrJyA/IChkZWx0YSAtIHpvbmVEZWx0YSkgLyA2MDQ4ZTUgOiAvLyAxMDAwICogNjAgKiA2MCAqIDI0ICogNywgbmVnYXRlIGRzdFxuICAgICAgICAgICAgICAgIGRlbHRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhc0Zsb2F0ID8gb3V0cHV0IDogYWJzRmxvb3Iob3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb250aERpZmYgKGEsIGIpIHtcbiAgICAgICAgLy8gZGlmZmVyZW5jZSBpbiBtb250aHNcbiAgICAgICAgdmFyIHdob2xlTW9udGhEaWZmID0gKChiLnllYXIoKSAtIGEueWVhcigpKSAqIDEyKSArIChiLm1vbnRoKCkgLSBhLm1vbnRoKCkpLFxuICAgICAgICAgICAgLy8gYiBpcyBpbiAoYW5jaG9yIC0gMSBtb250aCwgYW5jaG9yICsgMSBtb250aClcbiAgICAgICAgICAgIGFuY2hvciA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYsICdtb250aHMnKSxcbiAgICAgICAgICAgIGFuY2hvcjIsIGFkanVzdDtcblxuICAgICAgICBpZiAoYiAtIGFuY2hvciA8IDApIHtcbiAgICAgICAgICAgIGFuY2hvcjIgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmIC0gMSwgJ21vbnRocycpO1xuICAgICAgICAgICAgLy8gbGluZWFyIGFjcm9zcyB0aGUgbW9udGhcbiAgICAgICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IgLSBhbmNob3IyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFuY2hvcjIgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmICsgMSwgJ21vbnRocycpO1xuICAgICAgICAgICAgLy8gbGluZWFyIGFjcm9zcyB0aGUgbW9udGhcbiAgICAgICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IyIC0gYW5jaG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtKHdob2xlTW9udGhEaWZmICsgYWRqdXN0KTtcbiAgICB9XG5cbiAgICB1dGlsc19ob29rc19faG9va3MuZGVmYXVsdEZvcm1hdCA9ICdZWVlZLU1NLUREVEhIOm1tOnNzWic7XG5cbiAgICBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkubG9jYWxlKCdlbicpLmZvcm1hdCgnZGRkIE1NTSBERCBZWVlZIEhIOm1tOnNzIFtHTVRdWlonKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb21lbnRfZm9ybWF0X190b0lTT1N0cmluZyAoKSB7XG4gICAgICAgIHZhciBtID0gdGhpcy5jbG9uZSgpLnV0YygpO1xuICAgICAgICBpZiAoMCA8IG0ueWVhcigpICYmIG0ueWVhcigpIDw9IDk5OTkpIHtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nKSkge1xuICAgICAgICAgICAgICAgIC8vIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBpcyB+NTB4IGZhc3RlciwgdXNlIGl0IHdoZW4gd2UgY2FuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE1vbWVudChtLCAnWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE1vbWVudChtLCAnWVlZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTW1pdJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXQgKGlucHV0U3RyaW5nKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSBmb3JtYXRNb21lbnQodGhpcywgaW5wdXRTdHJpbmcgfHwgdXRpbHNfaG9va3NfX2hvb2tzLmRlZmF1bHRGb3JtYXQpO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkucG9zdGZvcm1hdChvdXRwdXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyb20gKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmXG4gICAgICAgICAgICAgICAgKChpc01vbWVudCh0aW1lKSAmJiB0aW1lLmlzVmFsaWQoKSkgfHxcbiAgICAgICAgICAgICAgICAgbG9jYWxfX2NyZWF0ZUxvY2FsKHRpbWUpLmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKHt0bzogdGhpcywgZnJvbTogdGltZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSgpKS5odW1hbml6ZSghd2l0aG91dFN1ZmZpeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyb21Ob3cgKHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbShsb2NhbF9fY3JlYXRlTG9jYWwoKSwgd2l0aG91dFN1ZmZpeCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG8gKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmXG4gICAgICAgICAgICAgICAgKChpc01vbWVudCh0aW1lKSAmJiB0aW1lLmlzVmFsaWQoKSkgfHxcbiAgICAgICAgICAgICAgICAgbG9jYWxfX2NyZWF0ZUxvY2FsKHRpbWUpLmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKHtmcm9tOiB0aGlzLCB0bzogdGltZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSgpKS5odW1hbml6ZSghd2l0aG91dFN1ZmZpeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvTm93ICh3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvKGxvY2FsX19jcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcbiAgICB9XG5cbiAgICAvLyBJZiBwYXNzZWQgYSBsb2NhbGUga2V5LCBpdCB3aWxsIHNldCB0aGUgbG9jYWxlIGZvciB0aGlzXG4gICAgLy8gaW5zdGFuY2UuICBPdGhlcndpc2UsIGl0IHdpbGwgcmV0dXJuIHRoZSBsb2NhbGUgY29uZmlndXJhdGlvblxuICAgIC8vIHZhcmlhYmxlcyBmb3IgdGhpcyBpbnN0YW5jZS5cbiAgICBmdW5jdGlvbiBsb2NhbGUgKGtleSkge1xuICAgICAgICB2YXIgbmV3TG9jYWxlRGF0YTtcblxuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGUuX2FiYnI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdMb2NhbGVEYXRhID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZShrZXkpO1xuICAgICAgICAgICAgaWYgKG5ld0xvY2FsZURhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsZSA9IG5ld0xvY2FsZURhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsYW5nID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50KCkubGFuZygpIGlzIGRlcHJlY2F0ZWQuIEluc3RlYWQsIHVzZSBtb21lbnQoKS5sb2NhbGVEYXRhKCkgdG8gZ2V0IHRoZSBsYW5ndWFnZSBjb25maWd1cmF0aW9uLiBVc2UgbW9tZW50KCkubG9jYWxlKCkgdG8gY2hhbmdlIGxhbmd1YWdlcy4nLFxuICAgICAgICBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIGxvY2FsZURhdGEgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0T2YgKHVuaXRzKSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICAvLyB0aGUgZm9sbG93aW5nIHN3aXRjaCBpbnRlbnRpb25hbGx5IG9taXRzIGJyZWFrIGtleXdvcmRzXG4gICAgICAgIC8vIHRvIHV0aWxpemUgZmFsbGluZyB0aHJvdWdoIHRoZSBjYXNlcy5cbiAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHRoaXMubW9udGgoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ3F1YXJ0ZXInOlxuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICB0aGlzLmRhdGUoMSk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICBjYXNlICdpc29XZWVrJzpcbiAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIHRoaXMuaG91cnMoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgdGhpcy5taW51dGVzKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgdGhpcy5zZWNvbmRzKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgdGhpcy5taWxsaXNlY29uZHMoMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZWVrcyBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICAgICAgaWYgKHVuaXRzID09PSAnd2VlaycpIHtcbiAgICAgICAgICAgIHRoaXMud2Vla2RheSgwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodW5pdHMgPT09ICdpc29XZWVrJykge1xuICAgICAgICAgICAgdGhpcy5pc29XZWVrZGF5KDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcXVhcnRlcnMgYXJlIGFsc28gc3BlY2lhbFxuICAgICAgICBpZiAodW5pdHMgPT09ICdxdWFydGVyJykge1xuICAgICAgICAgICAgdGhpcy5tb250aChNYXRoLmZsb29yKHRoaXMubW9udGgoKSAvIDMpICogMyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRPZiAodW5pdHMpIHtcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgIGlmICh1bml0cyA9PT0gdW5kZWZpbmVkIHx8IHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydE9mKHVuaXRzKS5hZGQoMSwgKHVuaXRzID09PSAnaXNvV2VlaycgPyAnd2VlaycgOiB1bml0cykpLnN1YnRyYWN0KDEsICdtcycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvX3R5cGVfX3ZhbHVlT2YgKCkge1xuICAgICAgICByZXR1cm4gK3RoaXMuX2QgLSAoKHRoaXMuX29mZnNldCB8fCAwKSAqIDYwMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bml4ICgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoK3RoaXMgLyAxMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0RhdGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0ID8gbmV3IERhdGUoK3RoaXMpIDogdGhpcy5fZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0FycmF5ICgpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gW20ueWVhcigpLCBtLm1vbnRoKCksIG0uZGF0ZSgpLCBtLmhvdXIoKSwgbS5taW51dGUoKSwgbS5zZWNvbmQoKSwgbS5taWxsaXNlY29uZCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b09iamVjdCAoKSB7XG4gICAgICAgIHZhciBtID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHllYXJzOiBtLnllYXIoKSxcbiAgICAgICAgICAgIG1vbnRoczogbS5tb250aCgpLFxuICAgICAgICAgICAgZGF0ZTogbS5kYXRlKCksXG4gICAgICAgICAgICBob3VyczogbS5ob3VycygpLFxuICAgICAgICAgICAgbWludXRlczogbS5taW51dGVzKCksXG4gICAgICAgICAgICBzZWNvbmRzOiBtLnNlY29uZHMoKSxcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kczogbS5taWxsaXNlY29uZHMoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gICAgICAgIC8vIEpTT04uc3RyaW5naWZ5KG5ldyBEYXRlKE5hTikpID09PSAnbnVsbCdcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy50b0lTT1N0cmluZygpIDogJ251bGwnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbWVudF92YWxpZF9faXNWYWxpZCAoKSB7XG4gICAgICAgIHJldHVybiB2YWxpZF9faXNWYWxpZCh0aGlzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzaW5nRmxhZ3MgKCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHt9LCBnZXRQYXJzaW5nRmxhZ3ModGhpcykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGludmFsaWRBdCAoKSB7XG4gICAgICAgIHJldHVybiBnZXRQYXJzaW5nRmxhZ3ModGhpcykub3ZlcmZsb3c7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRpb25EYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5wdXQ6IHRoaXMuX2ksXG4gICAgICAgICAgICBmb3JtYXQ6IHRoaXMuX2YsXG4gICAgICAgICAgICBsb2NhbGU6IHRoaXMuX2xvY2FsZSxcbiAgICAgICAgICAgIGlzVVRDOiB0aGlzLl9pc1VUQyxcbiAgICAgICAgICAgIHN0cmljdDogdGhpcy5fc3RyaWN0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydnZycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndlZWtZZWFyKCkgJSAxMDA7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ0dHJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNvV2Vla1llYXIoKSAlIDEwMDtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4gKHRva2VuLCBnZXR0ZXIpIHtcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4oMCwgW3Rva2VuLCB0b2tlbi5sZW5ndGhdLCAwLCBnZXR0ZXIpO1xuICAgIH1cblxuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2cnLCAgICAgJ3dlZWtZZWFyJyk7XG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignZ2dnZ2cnLCAgICAnd2Vla1llYXInKTtcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdHR0dHJywgICdpc29XZWVrWWVhcicpO1xuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0dHJywgJ2lzb1dlZWtZZWFyJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ3dlZWtZZWFyJywgJ2dnJyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrWWVhcicsICdHRycpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignRycsICAgICAgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2cnLCAgICAgIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdHRycsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignZ2cnLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0cnLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbiAgICBhZGRSZWdleFRva2VuKCdnZ2dnJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XG4gICAgYWRkUmVnZXhUb2tlbignR0dHR0cnLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnZ2dnJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZ2dnZycsICdnZ2dnZycsICdHR0dHJywgJ0dHR0dHJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAyKV0gPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2dnJywgJ0dHJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB3ZWVrW3Rva2VuXSA9IHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrWWVhciAoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGdldFNldFdlZWtZZWFySGVscGVyLmNhbGwodGhpcyxcbiAgICAgICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgICAgICB0aGlzLndlZWsoKSxcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtkYXkoKSxcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3csXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG95KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRJU09XZWVrWWVhciAoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGdldFNldFdlZWtZZWFySGVscGVyLmNhbGwodGhpcyxcbiAgICAgICAgICAgICAgICBpbnB1dCwgdGhpcy5pc29XZWVrKCksIHRoaXMuaXNvV2Vla2RheSgpLCAxLCA0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJU09XZWVrc0luWWVhciAoKSB7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgMSwgNCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V2Vla3NJblllYXIgKCkge1xuICAgICAgICB2YXIgd2Vla0luZm8gPSB0aGlzLmxvY2FsZURhdGEoKS5fd2VlaztcbiAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCB3ZWVrSW5mby5kb3csIHdlZWtJbmZvLmRveSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0V2Vla1llYXJIZWxwZXIoaW5wdXQsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XG4gICAgICAgIHZhciB3ZWVrc1RhcmdldDtcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB3ZWVrT2ZZZWFyKHRoaXMsIGRvdywgZG95KS55ZWFyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2Vla3NUYXJnZXQgPSB3ZWVrc0luWWVhcihpbnB1dCwgZG93LCBkb3kpO1xuICAgICAgICAgICAgaWYgKHdlZWsgPiB3ZWVrc1RhcmdldCkge1xuICAgICAgICAgICAgICAgIHdlZWsgPSB3ZWVrc1RhcmdldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZXRXZWVrQWxsLmNhbGwodGhpcywgaW5wdXQsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFdlZWtBbGwod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XG4gICAgICAgIHZhciBkYXlPZlllYXJEYXRhID0gZGF5T2ZZZWFyRnJvbVdlZWtzKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSksXG4gICAgICAgICAgICBkYXRlID0gY3JlYXRlVVRDRGF0ZShkYXlPZlllYXJEYXRhLnllYXIsIDAsIGRheU9mWWVhckRhdGEuZGF5T2ZZZWFyKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImdvdFwiLCB3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgXCJzZXRcIiwgZGF0ZS50b0lTT1N0cmluZygpKTtcbiAgICAgICAgdGhpcy55ZWFyKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSk7XG4gICAgICAgIHRoaXMubW9udGgoZGF0ZS5nZXRVVENNb250aCgpKTtcbiAgICAgICAgdGhpcy5kYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1EnLCAwLCAnUW8nLCAncXVhcnRlcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdxdWFydGVyJywgJ1EnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1EnLCBtYXRjaDEpO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1EnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W01PTlRIXSA9ICh0b0ludChpbnB1dCkgLSAxKSAqIDM7XG4gICAgfSk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXRRdWFydGVyIChpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IE1hdGguY2VpbCgodGhpcy5tb250aCgpICsgMSkgLyAzKSA6IHRoaXMubW9udGgoKGlucHV0IC0gMSkgKiAzICsgdGhpcy5tb250aCgpICUgMyk7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3cnLCBbJ3d3JywgMl0sICd3bycsICd3ZWVrJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ1cnLCBbJ1dXJywgMl0sICdXbycsICdpc29XZWVrJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ3dlZWsnLCAndycpO1xuICAgIGFkZFVuaXRBbGlhcygnaXNvV2VlaycsICdXJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCd3JywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignd3cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignVycsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1dXJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWyd3JywgJ3d3JywgJ1cnLCAnV1cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHdlZWtbdG9rZW4uc3Vic3RyKDAsIDEpXSA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWsgKG1vbSkge1xuICAgICAgICByZXR1cm4gd2Vla09mWWVhcihtb20sIHRoaXMuX3dlZWsuZG93LCB0aGlzLl93ZWVrLmRveSkud2VlaztcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWsgPSB7XG4gICAgICAgIGRvdyA6IDAsIC8vIFN1bmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgICAgICBkb3kgOiA2ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiAxc3QgaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZXZWVrICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWsuZG93O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZZZWFyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWsuZG95O1xuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWsgKGlucHV0KSB7XG4gICAgICAgIHZhciB3ZWVrID0gdGhpcy5sb2NhbGVEYXRhKCkud2Vlayh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWsgKGlucHV0KSB7XG4gICAgICAgIHZhciB3ZWVrID0gd2Vla09mWWVhcih0aGlzLCAxLCA0KS53ZWVrO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWsgOiB0aGlzLmFkZCgoaW5wdXQgLSB3ZWVrKSAqIDcsICdkJyk7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0QnLCBbJ0REJywgMl0sICdEbycsICdkYXRlJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2RhdGUnLCAnRCcpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignRCcsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0REJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0RvJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGlzU3RyaWN0ID8gbG9jYWxlLl9vcmRpbmFsUGFyc2UgOiBsb2NhbGUuX29yZGluYWxQYXJzZUxlbmllbnQ7XG4gICAgfSk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnRCcsICdERCddLCBEQVRFKTtcbiAgICBhZGRQYXJzZVRva2VuKCdEbycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbREFURV0gPSB0b0ludChpbnB1dC5tYXRjaChtYXRjaDF0bzIpWzBdLCAxMCk7XG4gICAgfSk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0RGF5T2ZNb250aCA9IG1ha2VHZXRTZXQoJ0RhdGUnLCB0cnVlKTtcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkJywgMCwgJ2RvJywgJ2RheScpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNNaW4odGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c1Nob3J0KHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZGRkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZScsIDAsIDAsICd3ZWVrZGF5Jyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ0UnLCAwLCAwLCAnaXNvV2Vla2RheScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXknLCAnZCcpO1xuICAgIGFkZFVuaXRBbGlhcygnd2Vla2RheScsICdlJyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrZGF5JywgJ0UnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2QnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2UnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0UnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkJywgICBtYXRjaFdvcmQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkZCcsICBtYXRjaFdvcmQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkZGQnLCBtYXRjaFdvcmQpO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydkZCcsICdkZGQnLCAnZGRkZCddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgdmFyIHdlZWtkYXkgPSBjb25maWcuX2xvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZ2V0IGEgd2Vla2RheSBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWRcbiAgICAgICAgaWYgKHdlZWtkYXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgd2Vlay5kID0gd2Vla2RheTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRXZWVrZGF5ID0gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZCcsICdlJywgJ0UnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHdlZWtbdG9rZW5dID0gdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgZnVuY3Rpb24gcGFyc2VXZWVrZGF5KGlucHV0LCBsb2NhbGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNOYU4oaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoaW5wdXQsIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlucHV0ID0gbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQpO1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gTE9DQUxFU1xuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5cyA9ICdTdW5kYXlfTW9uZGF5X1R1ZXNkYXlfV2VkbmVzZGF5X1RodXJzZGF5X0ZyaWRheV9TYXR1cmRheScuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5cyAobSwgZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX3dlZWtkYXlzKSA/IHRoaXMuX3dlZWtkYXlzW20uZGF5KCldIDpcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzW3RoaXMuX3dlZWtkYXlzLmlzRm9ybWF0LnRlc3QoZm9ybWF0KSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnXVttLmRheSgpXTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQgPSAnU3VuX01vbl9UdWVfV2VkX1RodV9GcmlfU2F0Jy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzU2hvcnQgKG0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRbbS5kYXkoKV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbiA9ICdTdV9Nb19UdV9XZV9UaF9Gcl9TYScuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c01pbiAobSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5bbS5kYXkoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNQYXJzZSAod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgICAgIHZhciBpLCBtb20sIHJlZ2V4O1xuXG4gICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZSkge1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG5cbiAgICAgICAgICAgIG1vbSA9IGxvY2FsX19jcmVhdGVMb2NhbChbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMud2Vla2RheXMobW9tLCAnJykucmVwbGFjZSgnLicsICdcXC4/JykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICdcXC4/JykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKS5yZXBsYWNlKCcuJywgJ1xcLj8nKSArICckJywgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID0gJ14nICsgdGhpcy53ZWVrZGF5cyhtb20sICcnKSArICd8XicgKyB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykgKyAnfF4nICsgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGRkZCcgJiYgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkZCcgJiYgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZCcgJiYgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mV2VlayAoaW5wdXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXkgPSB0aGlzLl9pc1VUQyA/IHRoaXMuX2QuZ2V0VVRDRGF5KCkgOiB0aGlzLl9kLmdldERheSgpO1xuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaW5wdXQgPSBwYXJzZVdlZWtkYXkoaW5wdXQsIHRoaXMubG9jYWxlRGF0YSgpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZChpbnB1dCAtIGRheSwgJ2QnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkYXk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRMb2NhbGVEYXlPZldlZWsgKGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2Vla2RheSA9ICh0aGlzLmRheSgpICsgNyAtIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdykgJSA3O1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWtkYXkgOiB0aGlzLmFkZChpbnB1dCAtIHdlZWtkYXksICdkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPRGF5T2ZXZWVrIChpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgLy8gYmVoYXZlcyB0aGUgc2FtZSBhcyBtb21lbnQjZGF5IGV4Y2VwdFxuICAgICAgICAvLyBhcyBhIGdldHRlciwgcmV0dXJucyA3IGluc3RlYWQgb2YgMCAoMS03IHJhbmdlIGluc3RlYWQgb2YgMC02KVxuICAgICAgICAvLyBhcyBhIHNldHRlciwgc3VuZGF5IHNob3VsZCBiZWxvbmcgdG8gdGhlIHByZXZpb3VzIHdlZWsuXG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gdGhpcy5kYXkoKSB8fCA3IDogdGhpcy5kYXkodGhpcy5kYXkoKSAlIDcgPyBpbnB1dCA6IGlucHV0IC0gNyk7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0RERCcsIFsnRERERCcsIDNdLCAnREREbycsICdkYXlPZlllYXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnZGF5T2ZZZWFyJywgJ0RERCcpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignREREJywgIG1hdGNoMXRvMyk7XG4gICAgYWRkUmVnZXhUb2tlbignRERERCcsIG1hdGNoMyk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ0RERCcsICdEREREJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mWWVhciAoaW5wdXQpIHtcbiAgICAgICAgdmFyIGRheU9mWWVhciA9IE1hdGgucm91bmQoKHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKSAtIHRoaXMuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykpIC8gODY0ZTUpICsgMTtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyBkYXlPZlllYXIgOiB0aGlzLmFkZCgoaW5wdXQgLSBkYXlPZlllYXIpLCAnZCcpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGZ1bmN0aW9uIGhGb3JtYXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhvdXJzKCkgJSAxMiB8fCAxMjtcbiAgICB9XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSCcsIFsnSEgnLCAyXSwgMCwgJ2hvdXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbignaCcsIFsnaGgnLCAyXSwgMCwgaEZvcm1hdCk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignaG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJycgKyBoRm9ybWF0LmFwcGx5KHRoaXMpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2htbXNzJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJycgKyBoRm9ybWF0LmFwcGx5KHRoaXMpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpICtcbiAgICAgICAgICAgIHplcm9GaWxsKHRoaXMuc2Vjb25kcygpLCAyKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdIbW0nLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJyArIHRoaXMuaG91cnMoKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdIbW1zcycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnICsgdGhpcy5ob3VycygpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpICtcbiAgICAgICAgICAgIHplcm9GaWxsKHRoaXMuc2Vjb25kcygpLCAyKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG1lcmlkaWVtICh0b2tlbiwgbG93ZXJjYXNlKSB7XG4gICAgICAgIGFkZEZvcm1hdFRva2VuKHRva2VuLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubWVyaWRpZW0odGhpcy5ob3VycygpLCB0aGlzLm1pbnV0ZXMoKSwgbG93ZXJjYXNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWVyaWRpZW0oJ2EnLCB0cnVlKTtcbiAgICBtZXJpZGllbSgnQScsIGZhbHNlKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnaG91cicsICdoJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBmdW5jdGlvbiBtYXRjaE1lcmlkaWVtIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuX21lcmlkaWVtUGFyc2U7XG4gICAgfVxuXG4gICAgYWRkUmVnZXhUb2tlbignYScsICBtYXRjaE1lcmlkaWVtKTtcbiAgICBhZGRSZWdleFRva2VuKCdBJywgIG1hdGNoTWVyaWRpZW0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0gnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdoJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignSEgnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignaGgnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5cbiAgICBhZGRSZWdleFRva2VuKCdobW0nLCBtYXRjaDN0bzQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2htbXNzJywgbWF0Y2g1dG82KTtcbiAgICBhZGRSZWdleFRva2VuKCdIbW0nLCBtYXRjaDN0bzQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0htbXNzJywgbWF0Y2g1dG82KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydIJywgJ0hIJ10sIEhPVVIpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydhJywgJ0EnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5faXNQbSA9IGNvbmZpZy5fbG9jYWxlLmlzUE0oaW5wdXQpO1xuICAgICAgICBjb25maWcuX21lcmlkaWVtID0gaW5wdXQ7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ2gnLCAnaGgnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdobW0nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvcykpO1xuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvcykpO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdobW1zcycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICB2YXIgcG9zMSA9IGlucHV0Lmxlbmd0aCAtIDQ7XG4gICAgICAgIHZhciBwb3MyID0gaW5wdXQubGVuZ3RoIC0gMjtcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zMSkpO1xuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczEsIDIpKTtcbiAgICAgICAgYXJyYXlbU0VDT05EXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MyKSk7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB0cnVlO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ0htbScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICB2YXIgcG9zID0gaW5wdXQubGVuZ3RoIC0gMjtcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zKSk7XG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zKSk7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignSG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvczEgPSBpbnB1dC5sZW5ndGggLSA0O1xuICAgICAgICB2YXIgcG9zMiA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MxLCAyKSk7XG4gICAgICAgIGFycmF5W1NFQ09ORF0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMikpO1xuICAgIH0pO1xuXG4gICAgLy8gTE9DQUxFU1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlSXNQTSAoaW5wdXQpIHtcbiAgICAgICAgLy8gSUU4IFF1aXJrcyBNb2RlICYgSUU3IFN0YW5kYXJkcyBNb2RlIGRvIG5vdCBhbGxvdyBhY2Nlc3Npbmcgc3RyaW5ncyBsaWtlIGFycmF5c1xuICAgICAgICAvLyBVc2luZyBjaGFyQXQgc2hvdWxkIGJlIG1vcmUgY29tcGF0aWJsZS5cbiAgICAgICAgcmV0dXJuICgoaW5wdXQgKyAnJykudG9Mb3dlckNhc2UoKS5jaGFyQXQoMCkgPT09ICdwJyk7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNZXJpZGllbVBhcnNlID0gL1thcF1cXC4/bT9cXC4/L2k7XG4gICAgZnVuY3Rpb24gbG9jYWxlTWVyaWRpZW0gKGhvdXJzLCBtaW51dGVzLCBpc0xvd2VyKSB7XG4gICAgICAgIGlmIChob3VycyA+IDExKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNMb3dlciA/ICdwbScgOiAnUE0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAnYW0nIDogJ0FNJztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgLy8gU2V0dGluZyB0aGUgaG91ciBzaG91bGQga2VlcCB0aGUgdGltZSwgYmVjYXVzZSB0aGUgdXNlciBleHBsaWNpdGx5XG4gICAgLy8gc3BlY2lmaWVkIHdoaWNoIGhvdXIgaGUgd2FudHMuIFNvIHRyeWluZyB0byBtYWludGFpbiB0aGUgc2FtZSBob3VyIChpblxuICAgIC8vIGEgbmV3IHRpbWV6b25lKSBtYWtlcyBzZW5zZS4gQWRkaW5nL3N1YnRyYWN0aW5nIGhvdXJzIGRvZXMgbm90IGZvbGxvd1xuICAgIC8vIHRoaXMgcnVsZS5cbiAgICB2YXIgZ2V0U2V0SG91ciA9IG1ha2VHZXRTZXQoJ0hvdXJzJywgdHJ1ZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignbScsIFsnbW0nLCAyXSwgMCwgJ21pbnV0ZScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdtaW51dGUnLCAnbScpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignbScsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ21tJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydtJywgJ21tJ10sIE1JTlVURSk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0TWludXRlID0gbWFrZUdldFNldCgnTWludXRlcycsIGZhbHNlKTtcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdzJywgWydzcycsIDJdLCAwLCAnc2Vjb25kJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ3NlY29uZCcsICdzJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdzJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignc3MnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUGFyc2VUb2tlbihbJ3MnLCAnc3MnXSwgU0VDT05EKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRTZWNvbmQgPSBtYWtlR2V0U2V0KCdTZWNvbmRzJywgZmFsc2UpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMDApO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTUycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTUycsIDNdLCAwLCAnbWlsbGlzZWNvbmQnKTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1MnLCA0XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTUycsIDVdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1MnLCA2XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1MnLCA3XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTUycsIDhdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTU1MnLCA5XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDAwMDtcbiAgICB9KTtcblxuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdtaWxsaXNlY29uZCcsICdtcycpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignUycsICAgIG1hdGNoMXRvMywgbWF0Y2gxKTtcbiAgICBhZGRSZWdleFRva2VuKCdTUycsICAgbWF0Y2gxdG8zLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1NTUycsICBtYXRjaDF0bzMsIG1hdGNoMyk7XG5cbiAgICB2YXIgdG9rZW47XG4gICAgZm9yICh0b2tlbiA9ICdTU1NTJzsgdG9rZW4ubGVuZ3RoIDw9IDk7IHRva2VuICs9ICdTJykge1xuICAgICAgICBhZGRSZWdleFRva2VuKHRva2VuLCBtYXRjaFVuc2lnbmVkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZU1zKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtNSUxMSVNFQ09ORF0gPSB0b0ludCgoJzAuJyArIGlucHV0KSAqIDEwMDApO1xuICAgIH1cblxuICAgIGZvciAodG9rZW4gPSAnUyc7IHRva2VuLmxlbmd0aCA8PSA5OyB0b2tlbiArPSAnUycpIHtcbiAgICAgICAgYWRkUGFyc2VUb2tlbih0b2tlbiwgcGFyc2VNcyk7XG4gICAgfVxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRNaWxsaXNlY29uZCA9IG1ha2VHZXRTZXQoJ01pbGxpc2Vjb25kcycsIGZhbHNlKTtcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCd6JywgIDAsIDAsICd6b25lQWJicicpO1xuICAgIGFkZEZvcm1hdFRva2VuKCd6eicsIDAsIDAsICd6b25lTmFtZScpO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0Wm9uZUFiYnIgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyAnVVRDJyA6ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFpvbmVOYW1lICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ0Nvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lJyA6ICcnO1xuICAgIH1cblxuICAgIHZhciBtb21lbnRQcm90b3R5cGVfX3Byb3RvID0gTW9tZW50LnByb3RvdHlwZTtcblxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uYWRkICAgICAgICAgICAgICAgPSBhZGRfc3VidHJhY3RfX2FkZDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmNhbGVuZGFyICAgICAgICAgID0gbW9tZW50X2NhbGVuZGFyX19jYWxlbmRhcjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmNsb25lICAgICAgICAgICAgID0gY2xvbmU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kaWZmICAgICAgICAgICAgICA9IGRpZmY7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5lbmRPZiAgICAgICAgICAgICA9IGVuZE9mO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZm9ybWF0ICAgICAgICAgICAgPSBmb3JtYXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5mcm9tICAgICAgICAgICAgICA9IGZyb207XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5mcm9tTm93ICAgICAgICAgICA9IGZyb21Ob3c7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50byAgICAgICAgICAgICAgICA9IHRvO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9Ob3cgICAgICAgICAgICAgPSB0b05vdztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmdldCAgICAgICAgICAgICAgID0gZ2V0U2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaW52YWxpZEF0ICAgICAgICAgPSBpbnZhbGlkQXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0FmdGVyICAgICAgICAgICA9IGlzQWZ0ZXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0JlZm9yZSAgICAgICAgICA9IGlzQmVmb3JlO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNCZXR3ZWVuICAgICAgICAgPSBpc0JldHdlZW47XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1NhbWUgICAgICAgICAgICA9IGlzU2FtZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzU2FtZU9yQWZ0ZXIgICAgID0gaXNTYW1lT3JBZnRlcjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzU2FtZU9yQmVmb3JlICAgID0gaXNTYW1lT3JCZWZvcmU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1ZhbGlkICAgICAgICAgICA9IG1vbWVudF92YWxpZF9faXNWYWxpZDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmxhbmcgICAgICAgICAgICAgID0gbGFuZztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmxvY2FsZSAgICAgICAgICAgID0gbG9jYWxlO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubG9jYWxlRGF0YSAgICAgICAgPSBsb2NhbGVEYXRhO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWF4ICAgICAgICAgICAgICAgPSBwcm90b3R5cGVNYXg7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5taW4gICAgICAgICAgICAgICA9IHByb3RvdHlwZU1pbjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnBhcnNpbmdGbGFncyAgICAgID0gcGFyc2luZ0ZsYWdzO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc2V0ICAgICAgICAgICAgICAgPSBnZXRTZXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5zdGFydE9mICAgICAgICAgICA9IHN0YXJ0T2Y7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5zdWJ0cmFjdCAgICAgICAgICA9IGFkZF9zdWJ0cmFjdF9fc3VidHJhY3Q7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b0FycmF5ICAgICAgICAgICA9IHRvQXJyYXk7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b09iamVjdCAgICAgICAgICA9IHRvT2JqZWN0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9EYXRlICAgICAgICAgICAgPSB0b0RhdGU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b0lTT1N0cmluZyAgICAgICA9IG1vbWVudF9mb3JtYXRfX3RvSVNPU3RyaW5nO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9KU09OICAgICAgICAgICAgPSB0b0pTT047XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b1N0cmluZyAgICAgICAgICA9IHRvU3RyaW5nO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udW5peCAgICAgICAgICAgICAgPSB1bml4O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udmFsdWVPZiAgICAgICAgICAgPSB0b190eXBlX192YWx1ZU9mO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uY3JlYXRpb25EYXRhICAgICAgPSBjcmVhdGlvbkRhdGE7XG5cbiAgICAvLyBZZWFyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by55ZWFyICAgICAgID0gZ2V0U2V0WWVhcjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzTGVhcFllYXIgPSBnZXRJc0xlYXBZZWFyO1xuXG4gICAgLy8gV2VlayBZZWFyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrWWVhciAgICA9IGdldFNldFdlZWtZZWFyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2Vla1llYXIgPSBnZXRTZXRJU09XZWVrWWVhcjtcblxuICAgIC8vIFF1YXJ0ZXJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnF1YXJ0ZXIgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnF1YXJ0ZXJzID0gZ2V0U2V0UXVhcnRlcjtcblxuICAgIC8vIE1vbnRoXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5tb250aCAgICAgICA9IGdldFNldE1vbnRoO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5c0luTW9udGggPSBnZXREYXlzSW5Nb250aDtcblxuICAgIC8vIFdlZWtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWsgICAgICAgICAgID0gbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrcyAgICAgICAgPSBnZXRTZXRXZWVrO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2VlayAgICAgICAgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtzICAgICA9IGdldFNldElTT1dlZWs7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrc0luWWVhciAgICA9IGdldFdlZWtzSW5ZZWFyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2Vla3NJblllYXIgPSBnZXRJU09XZWVrc0luWWVhcjtcblxuICAgIC8vIERheVxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF0ZSAgICAgICA9IGdldFNldERheU9mTW9udGg7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXkgICAgICAgID0gbW9tZW50UHJvdG90eXBlX19wcm90by5kYXlzICAgICAgICAgICAgID0gZ2V0U2V0RGF5T2ZXZWVrO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla2RheSAgICA9IGdldFNldExvY2FsZURheU9mV2VlaztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtkYXkgPSBnZXRTZXRJU09EYXlPZldlZWs7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXlPZlllYXIgID0gZ2V0U2V0RGF5T2ZZZWFyO1xuXG4gICAgLy8gSG91clxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaG91ciA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaG91cnMgPSBnZXRTZXRIb3VyO1xuXG4gICAgLy8gTWludXRlXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5taW51dGUgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbnV0ZXMgPSBnZXRTZXRNaW51dGU7XG5cbiAgICAvLyBTZWNvbmRcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnNlY29uZCA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc2Vjb25kcyA9IGdldFNldFNlY29uZDtcblxuICAgIC8vIE1pbGxpc2Vjb25kXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5taWxsaXNlY29uZCA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWlsbGlzZWNvbmRzID0gZ2V0U2V0TWlsbGlzZWNvbmQ7XG5cbiAgICAvLyBPZmZzZXRcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnV0Y09mZnNldCAgICAgICAgICAgID0gZ2V0U2V0T2Zmc2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udXRjICAgICAgICAgICAgICAgICAgPSBzZXRPZmZzZXRUb1VUQztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmxvY2FsICAgICAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9Mb2NhbDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnBhcnNlWm9uZSAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9QYXJzZWRPZmZzZXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5oYXNBbGlnbmVkSG91ck9mZnNldCA9IGhhc0FsaWduZWRIb3VyT2Zmc2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNEU1QgICAgICAgICAgICAgICAgPSBpc0RheWxpZ2h0U2F2aW5nVGltZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzRFNUU2hpZnRlZCAgICAgICAgID0gaXNEYXlsaWdodFNhdmluZ1RpbWVTaGlmdGVkO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNMb2NhbCAgICAgICAgICAgICAgPSBpc0xvY2FsO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNVdGNPZmZzZXQgICAgICAgICAgPSBpc1V0Y09mZnNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVXRjICAgICAgICAgICAgICAgID0gaXNVdGM7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1VUQyAgICAgICAgICAgICAgICA9IGlzVXRjO1xuXG4gICAgLy8gVGltZXpvbmVcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnpvbmVBYmJyID0gZ2V0Wm9uZUFiYnI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by56b25lTmFtZSA9IGdldFpvbmVOYW1lO1xuXG4gICAgLy8gRGVwcmVjYXRpb25zXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXRlcyAgPSBkZXByZWNhdGUoJ2RhdGVzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBkYXRlIGluc3RlYWQuJywgZ2V0U2V0RGF5T2ZNb250aCk7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5tb250aHMgPSBkZXByZWNhdGUoJ21vbnRocyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgbW9udGggaW5zdGVhZCcsIGdldFNldE1vbnRoKTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnllYXJzICA9IGRlcHJlY2F0ZSgneWVhcnMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIHllYXIgaW5zdGVhZCcsIGdldFNldFllYXIpO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uem9uZSAgID0gZGVwcmVjYXRlKCdtb21lbnQoKS56b25lIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQoKS51dGNPZmZzZXQgaW5zdGVhZC4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE3NzknLCBnZXRTZXRab25lKTtcblxuICAgIHZhciBtb21lbnRQcm90b3R5cGUgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvO1xuXG4gICAgZnVuY3Rpb24gbW9tZW50X19jcmVhdGVVbml4IChpbnB1dCkge1xuICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0ICogMTAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9tZW50X19jcmVhdGVJblpvbmUgKCkge1xuICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cykucGFyc2Vab25lKCk7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRDYWxlbmRhciA9IHtcbiAgICAgICAgc2FtZURheSA6ICdbVG9kYXkgYXRdIExUJyxcbiAgICAgICAgbmV4dERheSA6ICdbVG9tb3Jyb3cgYXRdIExUJyxcbiAgICAgICAgbmV4dFdlZWsgOiAnZGRkZCBbYXRdIExUJyxcbiAgICAgICAgbGFzdERheSA6ICdbWWVzdGVyZGF5IGF0XSBMVCcsXG4gICAgICAgIGxhc3RXZWVrIDogJ1tMYXN0XSBkZGRkIFthdF0gTFQnLFxuICAgICAgICBzYW1lRWxzZSA6ICdMJ1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVfY2FsZW5kYXJfX2NhbGVuZGFyIChrZXksIG1vbSwgbm93KSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLl9jYWxlbmRhcltrZXldO1xuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbihvdXRwdXQpID8gb3V0cHV0LmNhbGwobW9tLCBub3cpIDogb3V0cHV0O1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9uZ0RhdGVGb3JtYXQgPSB7XG4gICAgICAgIExUUyAgOiAnaDptbTpzcyBBJyxcbiAgICAgICAgTFQgICA6ICdoOm1tIEEnLFxuICAgICAgICBMICAgIDogJ01NL0REL1lZWVknLFxuICAgICAgICBMTCAgIDogJ01NTU0gRCwgWVlZWScsXG4gICAgICAgIExMTCAgOiAnTU1NTSBELCBZWVlZIGg6bW0gQScsXG4gICAgICAgIExMTEwgOiAnZGRkZCwgTU1NTSBELCBZWVlZIGg6bW0gQSdcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9uZ0RhdGVGb3JtYXQgKGtleSkge1xuICAgICAgICB2YXIgZm9ybWF0ID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XSxcbiAgICAgICAgICAgIGZvcm1hdFVwcGVyID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5LnRvVXBwZXJDYXNlKCldO1xuXG4gICAgICAgIGlmIChmb3JtYXQgfHwgIWZvcm1hdFVwcGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XSA9IGZvcm1hdFVwcGVyLnJlcGxhY2UoL01NTU18TU18RER8ZGRkZC9nLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsLnNsaWNlKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdEludmFsaWREYXRlID0gJ0ludmFsaWQgZGF0ZSc7XG5cbiAgICBmdW5jdGlvbiBpbnZhbGlkRGF0ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZhbGlkRGF0ZTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdE9yZGluYWwgPSAnJWQnO1xuICAgIHZhciBkZWZhdWx0T3JkaW5hbFBhcnNlID0gL1xcZHsxLDJ9LztcblxuICAgIGZ1bmN0aW9uIG9yZGluYWwgKG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JkaW5hbC5yZXBsYWNlKCclZCcsIG51bWJlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlUGFyc2VQb3N0Rm9ybWF0IChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdFJlbGF0aXZlVGltZSA9IHtcbiAgICAgICAgZnV0dXJlIDogJ2luICVzJyxcbiAgICAgICAgcGFzdCAgIDogJyVzIGFnbycsXG4gICAgICAgIHMgIDogJ2EgZmV3IHNlY29uZHMnLFxuICAgICAgICBtICA6ICdhIG1pbnV0ZScsXG4gICAgICAgIG1tIDogJyVkIG1pbnV0ZXMnLFxuICAgICAgICBoICA6ICdhbiBob3VyJyxcbiAgICAgICAgaGggOiAnJWQgaG91cnMnLFxuICAgICAgICBkICA6ICdhIGRheScsXG4gICAgICAgIGRkIDogJyVkIGRheXMnLFxuICAgICAgICBNICA6ICdhIG1vbnRoJyxcbiAgICAgICAgTU0gOiAnJWQgbW9udGhzJyxcbiAgICAgICAgeSAgOiAnYSB5ZWFyJyxcbiAgICAgICAgeXkgOiAnJWQgeWVhcnMnXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbGF0aXZlX19yZWxhdGl2ZVRpbWUgKG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkge1xuICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW3N0cmluZ107XG4gICAgICAgIHJldHVybiAoaXNGdW5jdGlvbihvdXRwdXQpKSA/XG4gICAgICAgICAgICBvdXRwdXQobnVtYmVyLCB3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKSA6XG4gICAgICAgICAgICBvdXRwdXQucmVwbGFjZSgvJWQvaSwgbnVtYmVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXN0RnV0dXJlIChkaWZmLCBvdXRwdXQpIHtcbiAgICAgICAgdmFyIGZvcm1hdCA9IHRoaXMuX3JlbGF0aXZlVGltZVtkaWZmID4gMCA/ICdmdXR1cmUnIDogJ3Bhc3QnXTtcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24oZm9ybWF0KSA/IGZvcm1hdChvdXRwdXQpIDogZm9ybWF0LnJlcGxhY2UoLyVzL2ksIG91dHB1dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlX3NldF9fc2V0IChjb25maWcpIHtcbiAgICAgICAgdmFyIHByb3AsIGk7XG4gICAgICAgIGZvciAoaSBpbiBjb25maWcpIHtcbiAgICAgICAgICAgIHByb3AgPSBjb25maWdbaV07XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwcm9wKSkge1xuICAgICAgICAgICAgICAgIHRoaXNbaV0gPSBwcm9wO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzWydfJyArIGldID0gcHJvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBMZW5pZW50IG9yZGluYWwgcGFyc2luZyBhY2NlcHRzIGp1c3QgYSBudW1iZXIgaW4gYWRkaXRpb24gdG9cbiAgICAgICAgLy8gbnVtYmVyICsgKHBvc3NpYmx5KSBzdHVmZiBjb21pbmcgZnJvbSBfb3JkaW5hbFBhcnNlTGVuaWVudC5cbiAgICAgICAgdGhpcy5fb3JkaW5hbFBhcnNlTGVuaWVudCA9IG5ldyBSZWdFeHAodGhpcy5fb3JkaW5hbFBhcnNlLnNvdXJjZSArICd8JyArICgvXFxkezEsMn0vKS5zb3VyY2UpO1xuICAgIH1cblxuICAgIHZhciBwcm90b3R5cGVfX3Byb3RvID0gTG9jYWxlLnByb3RvdHlwZTtcblxuICAgIHByb3RvdHlwZV9fcHJvdG8uX2NhbGVuZGFyICAgICAgID0gZGVmYXVsdENhbGVuZGFyO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uY2FsZW5kYXIgICAgICAgID0gbG9jYWxlX2NhbGVuZGFyX19jYWxlbmRhcjtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9sb25nRGF0ZUZvcm1hdCA9IGRlZmF1bHRMb25nRGF0ZUZvcm1hdDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLmxvbmdEYXRlRm9ybWF0ICA9IGxvbmdEYXRlRm9ybWF0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX2ludmFsaWREYXRlICAgID0gZGVmYXVsdEludmFsaWREYXRlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uaW52YWxpZERhdGUgICAgID0gaW52YWxpZERhdGU7XG4gICAgcHJvdG90eXBlX19wcm90by5fb3JkaW5hbCAgICAgICAgPSBkZWZhdWx0T3JkaW5hbDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLm9yZGluYWwgICAgICAgICA9IG9yZGluYWw7XG4gICAgcHJvdG90eXBlX19wcm90by5fb3JkaW5hbFBhcnNlICAgPSBkZWZhdWx0T3JkaW5hbFBhcnNlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ucHJlcGFyc2UgICAgICAgID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ucG9zdGZvcm1hdCAgICAgID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3JlbGF0aXZlVGltZSAgID0gZGVmYXVsdFJlbGF0aXZlVGltZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLnJlbGF0aXZlVGltZSAgICA9IHJlbGF0aXZlX19yZWxhdGl2ZVRpbWU7XG4gICAgcHJvdG90eXBlX19wcm90by5wYXN0RnV0dXJlICAgICAgPSBwYXN0RnV0dXJlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uc2V0ICAgICAgICAgICAgID0gbG9jYWxlX3NldF9fc2V0O1xuXG4gICAgLy8gTW9udGhcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRocyAgICAgICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRocztcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHMgICAgICAgICAgID0gZGVmYXVsdExvY2FsZU1vbnRocztcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRoc1Nob3J0ICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRoc1Nob3J0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX21vbnRoc1Nob3J0ICAgICAgPSBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQ7XG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHNQYXJzZSAgICAgICA9ICAgICAgICBsb2NhbGVNb250aHNQYXJzZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHNSZWdleCAgICAgID0gZGVmYXVsdE1vbnRoc1JlZ2V4O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzUmVnZXggICAgICAgPSBtb250aHNSZWdleDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHNTaG9ydFJlZ2V4ID0gZGVmYXVsdE1vbnRoc1Nob3J0UmVnZXg7XG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHNTaG9ydFJlZ2V4ICA9IG1vbnRoc1Nob3J0UmVnZXg7XG5cbiAgICAvLyBXZWVrXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrID0gbG9jYWxlV2VlaztcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrID0gZGVmYXVsdExvY2FsZVdlZWs7XG4gICAgcHJvdG90eXBlX19wcm90by5maXJzdERheU9mWWVhciA9IGxvY2FsZUZpcnN0RGF5T2ZZZWFyO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uZmlyc3REYXlPZldlZWsgPSBsb2NhbGVGaXJzdERheU9mV2VlaztcblxuICAgIC8vIERheSBvZiBXZWVrXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5cyAgICAgICA9ICAgICAgICBsb2NhbGVXZWVrZGF5cztcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5cyAgICAgID0gZGVmYXVsdExvY2FsZVdlZWtkYXlzO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNNaW4gICAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNNaW47XG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXNNaW4gICA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbjtcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzU2hvcnQgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzU2hvcnQ7XG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXNTaG9ydCA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNQYXJzZSAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNQYXJzZTtcblxuICAgIC8vIEhvdXJzXG4gICAgcHJvdG90eXBlX19wcm90by5pc1BNID0gbG9jYWxlSXNQTTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tZXJpZGllbVBhcnNlID0gZGVmYXVsdExvY2FsZU1lcmlkaWVtUGFyc2U7XG4gICAgcHJvdG90eXBlX19wcm90by5tZXJpZGllbSA9IGxvY2FsZU1lcmlkaWVtO1xuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2dldCAoZm9ybWF0LCBpbmRleCwgZmllbGQsIHNldHRlcikge1xuICAgICAgICB2YXIgbG9jYWxlID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSgpO1xuICAgICAgICB2YXIgdXRjID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKCkuc2V0KHNldHRlciwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gbG9jYWxlW2ZpZWxkXSh1dGMsIGZvcm1hdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdCAoZm9ybWF0LCBpbmRleCwgZmllbGQsIGNvdW50LCBzZXR0ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcblxuICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RzX19nZXQoZm9ybWF0LCBpbmRleCwgZmllbGQsIHNldHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgb3V0W2ldID0gbGlzdHNfX2dldChmb3JtYXQsIGksIGZpZWxkLCBzZXR0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RNb250aHMgKGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QoZm9ybWF0LCBpbmRleCwgJ21vbnRocycsIDEyLCAnbW9udGgnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdE1vbnRoc1Nob3J0IChmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0KGZvcm1hdCwgaW5kZXgsICdtb250aHNTaG9ydCcsIDEyLCAnbW9udGgnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdFdlZWtkYXlzIChmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0KGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5cycsIDcsICdkYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdFdlZWtkYXlzU2hvcnQgKGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QoZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzU2hvcnQnLCA3LCAnZGF5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RXZWVrZGF5c01pbiAoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdChmb3JtYXQsIGluZGV4LCAnd2Vla2RheXNNaW4nLCA3LCAnZGF5Jyk7XG4gICAgfVxuXG4gICAgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZSgnZW4nLCB7XG4gICAgICAgIG9yZGluYWxQYXJzZTogL1xcZHsxLDJ9KHRofHN0fG5kfHJkKS8sXG4gICAgICAgIG9yZGluYWwgOiBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgICAgICB2YXIgYiA9IG51bWJlciAlIDEwLFxuICAgICAgICAgICAgICAgIG91dHB1dCA9ICh0b0ludChudW1iZXIgJSAxMDAgLyAxMCkgPT09IDEpID8gJ3RoJyA6XG4gICAgICAgICAgICAgICAgKGIgPT09IDEpID8gJ3N0JyA6XG4gICAgICAgICAgICAgICAgKGIgPT09IDIpID8gJ25kJyA6XG4gICAgICAgICAgICAgICAgKGIgPT09IDMpID8gJ3JkJyA6ICd0aCc7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyICsgb3V0cHV0O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxhbmcgPSBkZXByZWNhdGUoJ21vbWVudC5sYW5nIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb21lbnQubG9jYWxlIGluc3RlYWQuJywgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZSk7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxhbmdEYXRhID0gZGVwcmVjYXRlKCdtb21lbnQubGFuZ0RhdGEgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGVEYXRhIGluc3RlYWQuJywgbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSk7XG5cbiAgICB2YXIgbWF0aEFicyA9IE1hdGguYWJzO1xuXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWJzX19hYnMgKCkge1xuICAgICAgICB2YXIgZGF0YSAgICAgICAgICAgPSB0aGlzLl9kYXRhO1xuXG4gICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyA9IG1hdGhBYnModGhpcy5fbWlsbGlzZWNvbmRzKTtcbiAgICAgICAgdGhpcy5fZGF5cyAgICAgICAgID0gbWF0aEFicyh0aGlzLl9kYXlzKTtcbiAgICAgICAgdGhpcy5fbW9udGhzICAgICAgID0gbWF0aEFicyh0aGlzLl9tb250aHMpO1xuXG4gICAgICAgIGRhdGEubWlsbGlzZWNvbmRzICA9IG1hdGhBYnMoZGF0YS5taWxsaXNlY29uZHMpO1xuICAgICAgICBkYXRhLnNlY29uZHMgICAgICAgPSBtYXRoQWJzKGRhdGEuc2Vjb25kcyk7XG4gICAgICAgIGRhdGEubWludXRlcyAgICAgICA9IG1hdGhBYnMoZGF0YS5taW51dGVzKTtcbiAgICAgICAgZGF0YS5ob3VycyAgICAgICAgID0gbWF0aEFicyhkYXRhLmhvdXJzKTtcbiAgICAgICAgZGF0YS5tb250aHMgICAgICAgID0gbWF0aEFicyhkYXRhLm1vbnRocyk7XG4gICAgICAgIGRhdGEueWVhcnMgICAgICAgICA9IG1hdGhBYnMoZGF0YS55ZWFycyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCAoZHVyYXRpb24sIGlucHV0LCB2YWx1ZSwgZGlyZWN0aW9uKSB7XG4gICAgICAgIHZhciBvdGhlciA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24oaW5wdXQsIHZhbHVlKTtcblxuICAgICAgICBkdXJhdGlvbi5fbWlsbGlzZWNvbmRzICs9IGRpcmVjdGlvbiAqIG90aGVyLl9taWxsaXNlY29uZHM7XG4gICAgICAgIGR1cmF0aW9uLl9kYXlzICAgICAgICAgKz0gZGlyZWN0aW9uICogb3RoZXIuX2RheXM7XG4gICAgICAgIGR1cmF0aW9uLl9tb250aHMgICAgICAgKz0gZGlyZWN0aW9uICogb3RoZXIuX21vbnRocztcblxuICAgICAgICByZXR1cm4gZHVyYXRpb24uX2J1YmJsZSgpO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnRzIG9ubHkgMi4wLXN0eWxlIGFkZCgxLCAncycpIG9yIGFkZChkdXJhdGlvbilcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZCAoaW5wdXQsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGlucHV0LCB2YWx1ZSwgMSk7XG4gICAgfVxuXG4gICAgLy8gc3VwcG9ydHMgb25seSAyLjAtc3R5bGUgc3VidHJhY3QoMSwgJ3MnKSBvciBzdWJ0cmFjdChkdXJhdGlvbilcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX3N1YnRyYWN0IChpbnB1dCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgaW5wdXQsIHZhbHVlLCAtMSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWJzQ2VpbCAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnViYmxlICgpIHtcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcbiAgICAgICAgdmFyIGRheXMgICAgICAgICA9IHRoaXMuX2RheXM7XG4gICAgICAgIHZhciBtb250aHMgICAgICAgPSB0aGlzLl9tb250aHM7XG4gICAgICAgIHZhciBkYXRhICAgICAgICAgPSB0aGlzLl9kYXRhO1xuICAgICAgICB2YXIgc2Vjb25kcywgbWludXRlcywgaG91cnMsIHllYXJzLCBtb250aHNGcm9tRGF5cztcblxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgbWl4IG9mIHBvc2l0aXZlIGFuZCBuZWdhdGl2ZSB2YWx1ZXMsIGJ1YmJsZSBkb3duIGZpcnN0XG4gICAgICAgIC8vIGNoZWNrOiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMjE2NlxuICAgICAgICBpZiAoISgobWlsbGlzZWNvbmRzID49IDAgJiYgZGF5cyA+PSAwICYmIG1vbnRocyA+PSAwKSB8fFxuICAgICAgICAgICAgICAgIChtaWxsaXNlY29uZHMgPD0gMCAmJiBkYXlzIDw9IDAgJiYgbW9udGhzIDw9IDApKSkge1xuICAgICAgICAgICAgbWlsbGlzZWNvbmRzICs9IGFic0NlaWwobW9udGhzVG9EYXlzKG1vbnRocykgKyBkYXlzKSAqIDg2NGU1O1xuICAgICAgICAgICAgZGF5cyA9IDA7XG4gICAgICAgICAgICBtb250aHMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBjb2RlIGJ1YmJsZXMgdXAgdmFsdWVzLCBzZWUgdGhlIHRlc3RzIGZvclxuICAgICAgICAvLyBleGFtcGxlcyBvZiB3aGF0IHRoYXQgbWVhbnMuXG4gICAgICAgIGRhdGEubWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzICUgMTAwMDtcblxuICAgICAgICBzZWNvbmRzICAgICAgICAgICA9IGFic0Zsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xuICAgICAgICBkYXRhLnNlY29uZHMgICAgICA9IHNlY29uZHMgJSA2MDtcblxuICAgICAgICBtaW51dGVzICAgICAgICAgICA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICAgIGRhdGEubWludXRlcyAgICAgID0gbWludXRlcyAlIDYwO1xuXG4gICAgICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcbiAgICAgICAgZGF0YS5ob3VycyAgICAgICAgPSBob3VycyAlIDI0O1xuXG4gICAgICAgIGRheXMgKz0gYWJzRmxvb3IoaG91cnMgLyAyNCk7XG5cbiAgICAgICAgLy8gY29udmVydCBkYXlzIHRvIG1vbnRoc1xuICAgICAgICBtb250aHNGcm9tRGF5cyA9IGFic0Zsb29yKGRheXNUb01vbnRocyhkYXlzKSk7XG4gICAgICAgIG1vbnRocyArPSBtb250aHNGcm9tRGF5cztcbiAgICAgICAgZGF5cyAtPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHNGcm9tRGF5cykpO1xuXG4gICAgICAgIC8vIDEyIG1vbnRocyAtPiAxIHllYXJcbiAgICAgICAgeWVhcnMgPSBhYnNGbG9vcihtb250aHMgLyAxMik7XG4gICAgICAgIG1vbnRocyAlPSAxMjtcblxuICAgICAgICBkYXRhLmRheXMgICA9IGRheXM7XG4gICAgICAgIGRhdGEubW9udGhzID0gbW9udGhzO1xuICAgICAgICBkYXRhLnllYXJzICA9IHllYXJzO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRheXNUb01vbnRocyAoZGF5cykge1xuICAgICAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxNDYwOTcgZGF5cyAodGFraW5nIGludG8gYWNjb3VudCBsZWFwIHllYXIgcnVsZXMpXG4gICAgICAgIC8vIDQwMCB5ZWFycyBoYXZlIDEyIG1vbnRocyA9PT0gNDgwMFxuICAgICAgICByZXR1cm4gZGF5cyAqIDQ4MDAgLyAxNDYwOTc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9udGhzVG9EYXlzIChtb250aHMpIHtcbiAgICAgICAgLy8gdGhlIHJldmVyc2Ugb2YgZGF5c1RvTW9udGhzXG4gICAgICAgIHJldHVybiBtb250aHMgKiAxNDYwOTcgLyA0ODAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzICh1bml0cykge1xuICAgICAgICB2YXIgZGF5cztcbiAgICAgICAgdmFyIG1vbnRocztcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcblxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcblxuICAgICAgICBpZiAodW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICd5ZWFyJykge1xuICAgICAgICAgICAgZGF5cyAgID0gdGhpcy5fZGF5cyAgICsgbWlsbGlzZWNvbmRzIC8gODY0ZTU7XG4gICAgICAgICAgICBtb250aHMgPSB0aGlzLl9tb250aHMgKyBkYXlzVG9Nb250aHMoZGF5cyk7XG4gICAgICAgICAgICByZXR1cm4gdW5pdHMgPT09ICdtb250aCcgPyBtb250aHMgOiBtb250aHMgLyAxMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBtaWxsaXNlY29uZHMgc2VwYXJhdGVseSBiZWNhdXNlIG9mIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIChpc3N1ZSAjMTg2NylcbiAgICAgICAgICAgIGRheXMgPSB0aGlzLl9kYXlzICsgTWF0aC5yb3VuZChtb250aHNUb0RheXModGhpcy5fbW9udGhzKSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnd2VlaycgICA6IHJldHVybiBkYXlzIC8gNyAgICAgKyBtaWxsaXNlY29uZHMgLyA2MDQ4ZTU7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5JyAgICA6IHJldHVybiBkYXlzICAgICAgICAgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdob3VyJyAgIDogcmV0dXJuIGRheXMgKiAyNCAgICArIG1pbGxpc2Vjb25kcyAvIDM2ZTU7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWludXRlJyA6IHJldHVybiBkYXlzICogMTQ0MCAgKyBtaWxsaXNlY29uZHMgLyA2ZTQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2Vjb25kJyA6IHJldHVybiBkYXlzICogODY0MDAgKyBtaWxsaXNlY29uZHMgLyAxMDAwO1xuICAgICAgICAgICAgICAgIC8vIE1hdGguZmxvb3IgcHJldmVudHMgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgaGVyZVxuICAgICAgICAgICAgICAgIGNhc2UgJ21pbGxpc2Vjb25kJzogcmV0dXJuIE1hdGguZmxvb3IoZGF5cyAqIDg2NGU1KSArIG1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdW5pdCAnICsgdW5pdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogVXNlIHRoaXMuYXMoJ21zJyk/XG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYXNfX3ZhbHVlT2YgKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzICtcbiAgICAgICAgICAgIHRoaXMuX2RheXMgKiA4NjRlNSArXG4gICAgICAgICAgICAodGhpcy5fbW9udGhzICUgMTIpICogMjU5MmU2ICtcbiAgICAgICAgICAgIHRvSW50KHRoaXMuX21vbnRocyAvIDEyKSAqIDMxNTM2ZTZcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlQXMgKGFsaWFzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcyhhbGlhcyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGFzTWlsbGlzZWNvbmRzID0gbWFrZUFzKCdtcycpO1xuICAgIHZhciBhc1NlY29uZHMgICAgICA9IG1ha2VBcygncycpO1xuICAgIHZhciBhc01pbnV0ZXMgICAgICA9IG1ha2VBcygnbScpO1xuICAgIHZhciBhc0hvdXJzICAgICAgICA9IG1ha2VBcygnaCcpO1xuICAgIHZhciBhc0RheXMgICAgICAgICA9IG1ha2VBcygnZCcpO1xuICAgIHZhciBhc1dlZWtzICAgICAgICA9IG1ha2VBcygndycpO1xuICAgIHZhciBhc01vbnRocyAgICAgICA9IG1ha2VBcygnTScpO1xuICAgIHZhciBhc1llYXJzICAgICAgICA9IG1ha2VBcygneScpO1xuXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fZ2V0X19nZXQgKHVuaXRzKSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICByZXR1cm4gdGhpc1t1bml0cyArICdzJ10oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlR2V0dGVyKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhW25hbWVdO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBtaWxsaXNlY29uZHMgPSBtYWtlR2V0dGVyKCdtaWxsaXNlY29uZHMnKTtcbiAgICB2YXIgc2Vjb25kcyAgICAgID0gbWFrZUdldHRlcignc2Vjb25kcycpO1xuICAgIHZhciBtaW51dGVzICAgICAgPSBtYWtlR2V0dGVyKCdtaW51dGVzJyk7XG4gICAgdmFyIGhvdXJzICAgICAgICA9IG1ha2VHZXR0ZXIoJ2hvdXJzJyk7XG4gICAgdmFyIGRheXMgICAgICAgICA9IG1ha2VHZXR0ZXIoJ2RheXMnKTtcbiAgICB2YXIgbW9udGhzICAgICAgID0gbWFrZUdldHRlcignbW9udGhzJyk7XG4gICAgdmFyIHllYXJzICAgICAgICA9IG1ha2VHZXR0ZXIoJ3llYXJzJyk7XG5cbiAgICBmdW5jdGlvbiB3ZWVrcyAoKSB7XG4gICAgICAgIHJldHVybiBhYnNGbG9vcih0aGlzLmRheXMoKSAvIDcpO1xuICAgIH1cblxuICAgIHZhciByb3VuZCA9IE1hdGgucm91bmQ7XG4gICAgdmFyIHRocmVzaG9sZHMgPSB7XG4gICAgICAgIHM6IDQ1LCAgLy8gc2Vjb25kcyB0byBtaW51dGVcbiAgICAgICAgbTogNDUsICAvLyBtaW51dGVzIHRvIGhvdXJcbiAgICAgICAgaDogMjIsICAvLyBob3VycyB0byBkYXlcbiAgICAgICAgZDogMjYsICAvLyBkYXlzIHRvIG1vbnRoXG4gICAgICAgIE06IDExICAgLy8gbW9udGhzIHRvIHllYXJcbiAgICB9O1xuXG4gICAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBtb21lbnQuZm4uZnJvbSwgbW9tZW50LmZuLmZyb21Ob3csIGFuZCBtb21lbnQuZHVyYXRpb24uZm4uaHVtYW5pemVcbiAgICBmdW5jdGlvbiBzdWJzdGl0dXRlVGltZUFnbyhzdHJpbmcsIG51bWJlciwgd2l0aG91dFN1ZmZpeCwgaXNGdXR1cmUsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLnJlbGF0aXZlVGltZShudW1iZXIgfHwgMSwgISF3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9odW1hbml6ZV9fcmVsYXRpdmVUaW1lIChwb3NOZWdEdXJhdGlvbiwgd2l0aG91dFN1ZmZpeCwgbG9jYWxlKSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24ocG9zTmVnRHVyYXRpb24pLmFicygpO1xuICAgICAgICB2YXIgc2Vjb25kcyAgPSByb3VuZChkdXJhdGlvbi5hcygncycpKTtcbiAgICAgICAgdmFyIG1pbnV0ZXMgID0gcm91bmQoZHVyYXRpb24uYXMoJ20nKSk7XG4gICAgICAgIHZhciBob3VycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdoJykpO1xuICAgICAgICB2YXIgZGF5cyAgICAgPSByb3VuZChkdXJhdGlvbi5hcygnZCcpKTtcbiAgICAgICAgdmFyIG1vbnRocyAgID0gcm91bmQoZHVyYXRpb24uYXMoJ00nKSk7XG4gICAgICAgIHZhciB5ZWFycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCd5JykpO1xuXG4gICAgICAgIHZhciBhID0gc2Vjb25kcyA8IHRocmVzaG9sZHMucyAmJiBbJ3MnLCBzZWNvbmRzXSAgfHxcbiAgICAgICAgICAgICAgICBtaW51dGVzIDw9IDEgICAgICAgICAgICYmIFsnbSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPCB0aHJlc2hvbGRzLm0gJiYgWydtbScsIG1pbnV0ZXNdIHx8XG4gICAgICAgICAgICAgICAgaG91cnMgICA8PSAxICAgICAgICAgICAmJiBbJ2gnXSAgICAgICAgICAgfHxcbiAgICAgICAgICAgICAgICBob3VycyAgIDwgdGhyZXNob2xkcy5oICYmIFsnaGgnLCBob3Vyc10gICB8fFxuICAgICAgICAgICAgICAgIGRheXMgICAgPD0gMSAgICAgICAgICAgJiYgWydkJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICAgICAgZGF5cyAgICA8IHRocmVzaG9sZHMuZCAmJiBbJ2RkJywgZGF5c10gICAgfHxcbiAgICAgICAgICAgICAgICBtb250aHMgIDw9IDEgICAgICAgICAgICYmIFsnTSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIG1vbnRocyAgPCB0aHJlc2hvbGRzLk0gJiYgWydNTScsIG1vbnRoc10gIHx8XG4gICAgICAgICAgICAgICAgeWVhcnMgICA8PSAxICAgICAgICAgICAmJiBbJ3knXSAgICAgICAgICAgfHwgWyd5eScsIHllYXJzXTtcblxuICAgICAgICBhWzJdID0gd2l0aG91dFN1ZmZpeDtcbiAgICAgICAgYVszXSA9ICtwb3NOZWdEdXJhdGlvbiA+IDA7XG4gICAgICAgIGFbNF0gPSBsb2NhbGU7XG4gICAgICAgIHJldHVybiBzdWJzdGl0dXRlVGltZUFnby5hcHBseShudWxsLCBhKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gc2V0IGEgdGhyZXNob2xkIGZvciByZWxhdGl2ZSB0aW1lIHN0cmluZ3NcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9odW1hbml6ZV9fZ2V0U2V0UmVsYXRpdmVUaW1lVGhyZXNob2xkICh0aHJlc2hvbGQsIGxpbWl0KSB7XG4gICAgICAgIGlmICh0aHJlc2hvbGRzW3RocmVzaG9sZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW1pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyZXNob2xkc1t0aHJlc2hvbGRdO1xuICAgICAgICB9XG4gICAgICAgIHRocmVzaG9sZHNbdGhyZXNob2xkXSA9IGxpbWl0O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBodW1hbml6ZSAod2l0aFN1ZmZpeCkge1xuICAgICAgICB2YXIgbG9jYWxlID0gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgIHZhciBvdXRwdXQgPSBkdXJhdGlvbl9odW1hbml6ZV9fcmVsYXRpdmVUaW1lKHRoaXMsICF3aXRoU3VmZml4LCBsb2NhbGUpO1xuXG4gICAgICAgIGlmICh3aXRoU3VmZml4KSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBsb2NhbGUucGFzdEZ1dHVyZSgrdGhpcywgb3V0cHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsb2NhbGUucG9zdGZvcm1hdChvdXRwdXQpO1xuICAgIH1cblxuICAgIHZhciBpc29fc3RyaW5nX19hYnMgPSBNYXRoLmFicztcblxuICAgIGZ1bmN0aW9uIGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nKCkge1xuICAgICAgICAvLyBmb3IgSVNPIHN0cmluZ3Mgd2UgZG8gbm90IHVzZSB0aGUgbm9ybWFsIGJ1YmJsaW5nIHJ1bGVzOlxuICAgICAgICAvLyAgKiBtaWxsaXNlY29uZHMgYnViYmxlIHVwIHVudGlsIHRoZXkgYmVjb21lIGhvdXJzXG4gICAgICAgIC8vICAqIGRheXMgZG8gbm90IGJ1YmJsZSBhdCBhbGxcbiAgICAgICAgLy8gICogbW9udGhzIGJ1YmJsZSB1cCB1bnRpbCB0aGV5IGJlY29tZSB5ZWFyc1xuICAgICAgICAvLyBUaGlzIGlzIGJlY2F1c2UgdGhlcmUgaXMgbm8gY29udGV4dC1mcmVlIGNvbnZlcnNpb24gYmV0d2VlbiBob3VycyBhbmQgZGF5c1xuICAgICAgICAvLyAodGhpbmsgb2YgY2xvY2sgY2hhbmdlcylcbiAgICAgICAgLy8gYW5kIGFsc28gbm90IGJldHdlZW4gZGF5cyBhbmQgbW9udGhzICgyOC0zMSBkYXlzIHBlciBtb250aClcbiAgICAgICAgdmFyIHNlY29uZHMgPSBpc29fc3RyaW5nX19hYnModGhpcy5fbWlsbGlzZWNvbmRzKSAvIDEwMDA7XG4gICAgICAgIHZhciBkYXlzICAgICAgICAgPSBpc29fc3RyaW5nX19hYnModGhpcy5fZGF5cyk7XG4gICAgICAgIHZhciBtb250aHMgICAgICAgPSBpc29fc3RyaW5nX19hYnModGhpcy5fbW9udGhzKTtcbiAgICAgICAgdmFyIG1pbnV0ZXMsIGhvdXJzLCB5ZWFycztcblxuICAgICAgICAvLyAzNjAwIHNlY29uZHMgLT4gNjAgbWludXRlcyAtPiAxIGhvdXJcbiAgICAgICAgbWludXRlcyAgICAgICAgICAgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgICBob3VycyAgICAgICAgICAgICA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgICAgIHNlY29uZHMgJT0gNjA7XG4gICAgICAgIG1pbnV0ZXMgJT0gNjA7XG5cbiAgICAgICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxuICAgICAgICB5ZWFycyAgPSBhYnNGbG9vcihtb250aHMgLyAxMik7XG4gICAgICAgIG1vbnRocyAlPSAxMjtcblxuXG4gICAgICAgIC8vIGluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9kb3JkaWxsZS9tb21lbnQtaXNvZHVyYXRpb24vYmxvYi9tYXN0ZXIvbW9tZW50Lmlzb2R1cmF0aW9uLmpzXG4gICAgICAgIHZhciBZID0geWVhcnM7XG4gICAgICAgIHZhciBNID0gbW9udGhzO1xuICAgICAgICB2YXIgRCA9IGRheXM7XG4gICAgICAgIHZhciBoID0gaG91cnM7XG4gICAgICAgIHZhciBtID0gbWludXRlcztcbiAgICAgICAgdmFyIHMgPSBzZWNvbmRzO1xuICAgICAgICB2YXIgdG90YWwgPSB0aGlzLmFzU2Vjb25kcygpO1xuXG4gICAgICAgIGlmICghdG90YWwpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHNhbWUgYXMgQyMncyAoTm9kYSkgYW5kIHB5dGhvbiAoaXNvZGF0ZSkuLi5cbiAgICAgICAgICAgIC8vIGJ1dCBub3Qgb3RoZXIgSlMgKGdvb2cuZGF0ZSlcbiAgICAgICAgICAgIHJldHVybiAnUDBEJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAodG90YWwgPCAwID8gJy0nIDogJycpICtcbiAgICAgICAgICAgICdQJyArXG4gICAgICAgICAgICAoWSA/IFkgKyAnWScgOiAnJykgK1xuICAgICAgICAgICAgKE0gPyBNICsgJ00nIDogJycpICtcbiAgICAgICAgICAgIChEID8gRCArICdEJyA6ICcnKSArXG4gICAgICAgICAgICAoKGggfHwgbSB8fCBzKSA/ICdUJyA6ICcnKSArXG4gICAgICAgICAgICAoaCA/IGggKyAnSCcgOiAnJykgK1xuICAgICAgICAgICAgKG0gPyBtICsgJ00nIDogJycpICtcbiAgICAgICAgICAgIChzID8gcyArICdTJyA6ICcnKTtcbiAgICB9XG5cbiAgICB2YXIgZHVyYXRpb25fcHJvdG90eXBlX19wcm90byA9IER1cmF0aW9uLnByb3RvdHlwZTtcblxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYWJzICAgICAgICAgICAgPSBkdXJhdGlvbl9hYnNfX2FicztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFkZCAgICAgICAgICAgID0gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGQ7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5zdWJ0cmFjdCAgICAgICA9IGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fc3VidHJhY3Q7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hcyAgICAgICAgICAgICA9IGFzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNNaWxsaXNlY29uZHMgPSBhc01pbGxpc2Vjb25kcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzU2Vjb25kcyAgICAgID0gYXNTZWNvbmRzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNNaW51dGVzICAgICAgPSBhc01pbnV0ZXM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc0hvdXJzICAgICAgICA9IGFzSG91cnM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc0RheXMgICAgICAgICA9IGFzRGF5cztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzV2Vla3MgICAgICAgID0gYXNXZWVrcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzTW9udGhzICAgICAgID0gYXNNb250aHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc1llYXJzICAgICAgICA9IGFzWWVhcnM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by52YWx1ZU9mICAgICAgICA9IGR1cmF0aW9uX2FzX192YWx1ZU9mO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uX2J1YmJsZSAgICAgICAgPSBidWJibGU7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5nZXQgICAgICAgICAgICA9IGR1cmF0aW9uX2dldF9fZ2V0O1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubWlsbGlzZWNvbmRzICAgPSBtaWxsaXNlY29uZHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5zZWNvbmRzICAgICAgICA9IHNlY29uZHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5taW51dGVzICAgICAgICA9IG1pbnV0ZXM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5ob3VycyAgICAgICAgICA9IGhvdXJzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uZGF5cyAgICAgICAgICAgPSBkYXlzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ud2Vla3MgICAgICAgICAgPSB3ZWVrcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLm1vbnRocyAgICAgICAgID0gbW9udGhzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ueWVhcnMgICAgICAgICAgPSB5ZWFycztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmh1bWFuaXplICAgICAgID0gaHVtYW5pemU7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b0lTT1N0cmluZyAgICA9IGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9TdHJpbmcgICAgICAgPSBpc29fc3RyaW5nX190b0lTT1N0cmluZztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvSlNPTiAgICAgICAgID0gaXNvX3N0cmluZ19fdG9JU09TdHJpbmc7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5sb2NhbGUgICAgICAgICA9IGxvY2FsZTtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmxvY2FsZURhdGEgICAgID0gbG9jYWxlRGF0YTtcblxuICAgIC8vIERlcHJlY2F0aW9uc1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9Jc29TdHJpbmcgPSBkZXByZWNhdGUoJ3RvSXNvU3RyaW5nKCkgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSB0b0lTT1N0cmluZygpIGluc3RlYWQgKG5vdGljZSB0aGUgY2FwaXRhbHMpJywgaXNvX3N0cmluZ19fdG9JU09TdHJpbmcpO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubGFuZyA9IGxhbmc7XG5cbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignWCcsIDAsIDAsICd1bml4Jyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3gnLCAwLCAwLCAndmFsdWVPZicpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigneCcsIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdYJywgbWF0Y2hUaW1lc3RhbXApO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUocGFyc2VGbG9hdChpbnB1dCwgMTApICogMTAwMCk7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbigneCcsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSh0b0ludChpbnB1dCkpO1xuICAgIH0pO1xuXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xuXG5cbiAgICB1dGlsc19ob29rc19faG9va3MudmVyc2lvbiA9ICcyLjExLjInO1xuXG4gICAgc2V0SG9va0NhbGxiYWNrKGxvY2FsX19jcmVhdGVMb2NhbCk7XG5cbiAgICB1dGlsc19ob29rc19faG9va3MuZm4gICAgICAgICAgICAgICAgICAgID0gbW9tZW50UHJvdG90eXBlO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5taW4gICAgICAgICAgICAgICAgICAgPSBtaW47XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm1heCAgICAgICAgICAgICAgICAgICA9IG1heDtcbiAgICB1dGlsc19ob29rc19faG9va3Mubm93ICAgICAgICAgICAgICAgICAgID0gbm93O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy51dGMgICAgICAgICAgICAgICAgICAgPSBjcmVhdGVfdXRjX19jcmVhdGVVVEM7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnVuaXggICAgICAgICAgICAgICAgICA9IG1vbWVudF9fY3JlYXRlVW5peDtcbiAgICB1dGlsc19ob29rc19faG9va3MubW9udGhzICAgICAgICAgICAgICAgID0gbGlzdHNfX2xpc3RNb250aHM7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmlzRGF0ZSAgICAgICAgICAgICAgICA9IGlzRGF0ZTtcbiAgICB1dGlsc19ob29rc19faG9va3MubG9jYWxlICAgICAgICAgICAgICAgID0gbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZTtcbiAgICB1dGlsc19ob29rc19faG9va3MuaW52YWxpZCAgICAgICAgICAgICAgID0gdmFsaWRfX2NyZWF0ZUludmFsaWQ7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmR1cmF0aW9uICAgICAgICAgICAgICA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb247XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmlzTW9tZW50ICAgICAgICAgICAgICA9IGlzTW9tZW50O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy53ZWVrZGF5cyAgICAgICAgICAgICAgPSBsaXN0c19fbGlzdFdlZWtkYXlzO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVpvbmUgICAgICAgICAgICAgPSBtb21lbnRfX2NyZWF0ZUluWm9uZTtcbiAgICB1dGlsc19ob29rc19faG9va3MubG9jYWxlRGF0YSAgICAgICAgICAgID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZTtcbiAgICB1dGlsc19ob29rc19faG9va3MuaXNEdXJhdGlvbiAgICAgICAgICAgID0gaXNEdXJhdGlvbjtcbiAgICB1dGlsc19ob29rc19faG9va3MubW9udGhzU2hvcnQgICAgICAgICAgID0gbGlzdHNfX2xpc3RNb250aHNTaG9ydDtcbiAgICB1dGlsc19ob29rc19faG9va3Mud2Vla2RheXNNaW4gICAgICAgICAgID0gbGlzdHNfX2xpc3RXZWVrZGF5c01pbjtcbiAgICB1dGlsc19ob29rc19faG9va3MuZGVmaW5lTG9jYWxlICAgICAgICAgID0gZGVmaW5lTG9jYWxlO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy53ZWVrZGF5c1Nob3J0ICAgICAgICAgPSBsaXN0c19fbGlzdFdlZWtkYXlzU2hvcnQ7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm5vcm1hbGl6ZVVuaXRzICAgICAgICA9IG5vcm1hbGl6ZVVuaXRzO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5yZWxhdGl2ZVRpbWVUaHJlc2hvbGQgPSBkdXJhdGlvbl9odW1hbml6ZV9fZ2V0U2V0UmVsYXRpdmVUaW1lVGhyZXNob2xkO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5wcm90b3R5cGUgICAgICAgICAgICAgPSBtb21lbnRQcm90b3R5cGU7XG5cbiAgICB2YXIgX21vbWVudCA9IHV0aWxzX2hvb2tzX19ob29rcztcblxuICAgIHJldHVybiBfbW9tZW50O1xuXG59KSk7IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iXX0=
