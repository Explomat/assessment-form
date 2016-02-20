(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){
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
}).call(this,require("VCmEsw"))
},{"VCmEsw":24}],2:[function(require,module,exports){
var config = require('./config');
var userTemplate = require('./templates/userTemplate');

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
				eighthTable(parseData.eighthTable) +
				ninthTable(parseData.ninthTable) +
				tenthTable(parseData.tenthTable) + 		 
				eleventhTable(parseData.eleventhTable) + 
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




},{"./config":1,"./templates/buttonsTemplate":3,"./templates/tables/eighthTable":4,"./templates/tables/eleventhTable":5,"./templates/tables/fifthTable":6,"./templates/tables/fifthteenthTable":7,"./templates/tables/firstTable":8,"./templates/tables/fourteenthTable":9,"./templates/tables/fourthTable":10,"./templates/tables/ninthTable":11,"./templates/tables/secondTable":12,"./templates/tables/seventhTable":13,"./templates/tables/sixthTable":14,"./templates/tables/tenthTable":15,"./templates/tables/thirdTable":16,"./templates/tables/thirteenthTable":17,"./templates/tables/twelfthTable":18,"./templates/userTemplate":19,"./utils/Ajax":20,"./utils/jsonParse":21,"./utils/utils":23}],3:[function(require,module,exports){
var utils = require('../utils/utils');

module.exports = function (user) {
	user = user || {};
	user.isBoss = user.isBoss || false;
	user.formStatus = user.formStatus || '';

	if (utils.strBoolToBool(user.isBoss)) {
		if (user.formStatus === 'declined' || user.formStatus === 'confirmed') return "";
		
		return (
			"<input type='button' onclick=sendForm('save') value='Сохранить' class='inputButton' />\n\
			<input type='button' onclick=sendForm('declined') value='Отклонить' class='inputButton'/>\n\
			<input type='button' onclick=sendForm('confirmed') value='Утвердить' class='inputButton'/>"
		);
	}
	else {
		if (user.formStatus === 'active') {
			return (
				"<input type='button' onclick=sendForm('save') value='Сохранить' class='inputButton'/> \n\
				<input type='button' onclick=sendForm('send_request') value='Отправить на подтверждение' class='inputButton'/>"
			);
		}
		return "";
	}

}
},{"../utils/utils":23}],4:[function(require,module,exports){
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
},{"../../utils/ui":22,"../../utils/utils":23}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
},{"../../utils/ui":22,"../../utils/utils":23}],7:[function(require,module,exports){
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
			</table\n\
		</div>"
	)
}
},{"../../utils/ui":22,"../../utils/utils":23}],8:[function(require,module,exports){
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
						<input readonly class='firstTable__date' name='firstTable.col0_str0' value=" + startDate + ">\n\
					</td>\n\
					<td class='color_head_date' rowspan='2'></td>\n\
				</tr>\n\
				<tr>\n\
					<td class='color_head_date' style='width: 35px; height: 43px; padding-left:10px;'>ПО: </td>\n\
					<td class='color_head_date' style='width: 225px; height: 43px'>\n\
						<input readonly class='firstTable__date' name='firstTable.col0_str1' value=" + finishDate + ">\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	);
}
},{"moment":25}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{"../../utils/ui":22,"../../utils/utils":23}],11:[function(require,module,exports){
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
},{"../../utils/ui":22,"../../utils/utils":23}],12:[function(require,module,exports){
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
},{"../../utils/ui":22,"../../utils/utils":23}],13:[function(require,module,exports){
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
},{"../../utils/ui":22,"../../utils/utils":23}],14:[function(require,module,exports){
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
},{"../../utils/ui":22,"../../utils/utils":23}],15:[function(require,module,exports){
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
},{"../../utils/ui":22,"../../utils/utils":23}],16:[function(require,module,exports){
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
},{"../../utils/ui":22,"../../utils/utils":23}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
var AJAX_TIME_OVER = 10000;

module.exports = {

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

},{}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){
module.exports = {
	
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
},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImQ6XFxyZXBvc1xcYXNzZXNzbWVudC1mb3JtXFxub2RlX21vZHVsZXNcXGd1bHAtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvY29uZmlnLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL2Zha2VfZjRlNDNhOWUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdGVtcGxhdGVzL2J1dHRvbnNUZW1wbGF0ZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2VpZ2h0aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvZWxldmVudGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2ZpZnRoVGFibGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdGVtcGxhdGVzL3RhYmxlcy9maWZ0aHRlZW50aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvZmlyc3RUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2ZvdXJ0ZWVudGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL2ZvdXJ0aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvbmludGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL3NlY29uZFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvc2V2ZW50aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvc2l4dGhUYWJsZS5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy90ZW1wbGF0ZXMvdGFibGVzL3RlbnRoVGFibGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdGVtcGxhdGVzL3RhYmxlcy90aGlyZFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvdGhpcnRlZW50aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy90YWJsZXMvdHdlbGZ0aFRhYmxlLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL2pzL3RlbXBsYXRlcy91c2VyVGVtcGxhdGUuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdXRpbHMvQWpheC5qcyIsImQ6L3JlcG9zL2Fzc2Vzc21lbnQtZm9ybS9qcy91dGlscy9qc29uUGFyc2UuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdXRpbHMvdWkuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vanMvdXRpbHMvdXRpbHMuanMiLCJkOi9yZXBvcy9hc3Nlc3NtZW50LWZvcm0vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiZDovcmVwb3MvYXNzZXNzbWVudC1mb3JtL25vZGVfbW9kdWxlcy9tb21lbnQvbW9tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbnZhciBzZXJ2ZXJJZCA9ICc2MjUxNTQ4ODc1MjM5NjExNjQ5JztcclxudmFyIHJvdXRlcklkID0gJzYyNTE1NDc2MjA5MzA1MDg2OTYnO1xyXG52YXIgY3VzdG9tQmFzZVVybCA9ICcvY3VzdG9tX3dlYl90ZW1wbGF0ZS5odG1sJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuXHR1cmw6IHtcclxuXHRcdGRlZmF1bHRQYXRoOiBjdXN0b21CYXNlVXJsLmNvbmNhdCgnP29iamVjdF9pZD0nKS5jb25jYXQocm91dGVySWQpLmNvbmNhdCgnJnNlcnZlcl9pZD0nLmNvbmNhdChzZXJ2ZXJJZCkpLFxyXG5cdFx0Y3JlYXRlUGF0aDogZnVuY3Rpb24ob2JqKXtcclxuXHRcdFx0dmFyIHN0clBhcmFtcyA9IFwiXCI7XHJcblx0XHRcdGZvciAoa2V5IGluIG9iail7XHJcblx0XHRcdFx0c3RyUGFyYW1zICs9ICcmJyArIGtleSArICc9JyArIG9ialtrZXldO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0aGlzLmRlZmF1bHRQYXRoICsgc3RyUGFyYW1zO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0XHJcblx0c2V0U2VydmVySWQ6IGZ1bmN0aW9uKF9zZXJ2ZXJJZCl7XHJcblx0XHRzZXJ2ZXJJZCA9IF9zZXJ2ZXJJZDtcclxuXHR9LFxyXG5cclxuXHRzZXRSb3V0ZXJJZDogZnVuY3Rpb24oX3JvdXRlcklkKXtcclxuXHRcdHJvdXRlcklkID0gX3JvdXRlcklkO1xyXG5cdH0sXHJcblxyXG5cdHNldEN1c3RvbUJhc2VVcmw6IGZ1bmN0aW9uKF9jdXN0b21CYXNlVXJsKXtcclxuXHRcdGN1c3RvbUJhc2VVcmwgPSBfY3VzdG9tQmFzZVVybDtcclxuXHR9LFxyXG5cclxuXHRzZXRQcm9kdWN0aW9uTW9kZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0cHJvY2Vzcy5lbnYuTk9ERV9FTlYgPSAncHJvZHVjdGlvbic7XHJcblx0fVxyXG59XG59KS5jYWxsKHRoaXMscmVxdWlyZShcIlZDbUVzd1wiKSkiLCJ2YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcclxudmFyIHVzZXJUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3VzZXJUZW1wbGF0ZScpO1xyXG5cclxudmFyIGZpcnN0VGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvZmlyc3RUYWJsZScpO1xyXG52YXIgc2Vjb25kVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvc2Vjb25kVGFibGUnKTtcclxudmFyIHRoaXJkVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvdGhpcmRUYWJsZScpO1xyXG52YXIgZm91cnRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvZm91cnRoVGFibGUnKTtcclxudmFyIGZpZnRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvZmlmdGhUYWJsZScpO1xyXG52YXIgc2l4dGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy9zaXh0aFRhYmxlJyk7XHJcbnZhciBzZXZlbnRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvc2V2ZW50aFRhYmxlJyk7XHJcbnZhciBlaWdodGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy9laWdodGhUYWJsZScpO1xyXG52YXIgbmludGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy9uaW50aFRhYmxlJyk7XHJcbnZhciB0ZW50aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL3RlbnRoVGFibGUnKTtcclxudmFyIGVsZXZlbnRoVGFibGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy90YWJsZXMvZWxldmVudGhUYWJsZScpO1xyXG52YXIgdHdlbGZ0aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL3R3ZWxmdGhUYWJsZScpO1xyXG52YXIgdGhpcnRlZW50aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL3RoaXJ0ZWVudGhUYWJsZScpO1xyXG52YXIgZm91cnRlZW50aFRhYmxlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvdGFibGVzL2ZvdXJ0ZWVudGhUYWJsZScpO1xyXG52YXIgZmlmdGh0ZWVudGhUYWJsZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3RhYmxlcy9maWZ0aHRlZW50aFRhYmxlJyk7XHJcblxyXG5cclxudmFyIGJ1dHRvbnNUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2J1dHRvbnNUZW1wbGF0ZScpO1xyXG52YXIgYWpheCA9IHJlcXVpcmUoJy4vdXRpbHMvQWpheCcpO1xyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL3V0aWxzJyk7XHJcbnZhciBqc29uUGFyc2UgPSByZXF1aXJlKCcuL3V0aWxzL2pzb25QYXJzZScpO1xyXG5cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe1xyXG5cdHN0YXJ0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURhdGVQaWNrZXJzKCkge1xyXG5cdCQoJy5maXJzdFRhYmxlX19kYXRlJykuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzKS5kYXRlcGlja2VyKHtkYXRlRm9ybWF0OiBcImRkLm1tLnl5XCJ9KTtcclxuXHR9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVCYXNlSHRtbChmb3JtSWQsIGZvcm1UeXBlSWQsIGNhbGxCYWNrKSB7XHJcblx0YWpheC5zZW5kUmVxdWVzdChjb25maWcudXJsLmNyZWF0ZVBhdGgoe2FjdGlvbl9uYW1lOiAnZ2V0RGF0YScsIGZvcm1faWQ6IGZvcm1JZCwgZm9ybV90eXBlX2lkOiBmb3JtVHlwZUlkfSksIGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHR2YXIgcGFyc2VEYXRhID0gbnVsbDtcclxuXHRcdHRyeSB7IHBhcnNlRGF0YSA9IGpzb25QYXJzZShkYXRhKTsgfVxyXG5cdFx0Y2F0Y2goZSkgeyBcclxuXHRcdFx0Y29uc29sZS5sb2coZSk7IFxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGJhc2VIdG1sID0gdXNlclRlbXBsYXRlKHBhcnNlRGF0YS51c2VyKSArIFxyXG5cdFx0XHRcdGZpcnN0VGFibGUocGFyc2VEYXRhLmZpcnN0VGFibGUpICsgXHJcblx0XHRcdFx0c2Vjb25kVGFibGUocGFyc2VEYXRhLnNlY29uZFRhYmxlKSArXHJcblx0XHRcdFx0dGhpcmRUYWJsZShwYXJzZURhdGEudGhpcmRUYWJsZSkgK1xyXG5cdFx0XHRcdGZvdXJ0aFRhYmxlKHBhcnNlRGF0YS5mb3VydGhUYWJsZSkgK1xyXG5cdFx0XHRcdGZpZnRoVGFibGUocGFyc2VEYXRhLmZpZnRoVGFibGUpICtcclxuXHRcdFx0XHRzaXh0aFRhYmxlKHBhcnNlRGF0YS5zaXh0aFRhYmxlKSArXHJcblx0XHRcdFx0c2V2ZW50aFRhYmxlKHBhcnNlRGF0YS5zZXZlbnRoVGFibGUpICtcclxuXHRcdFx0XHRlaWdodGhUYWJsZShwYXJzZURhdGEuZWlnaHRoVGFibGUpICtcclxuXHRcdFx0XHRuaW50aFRhYmxlKHBhcnNlRGF0YS5uaW50aFRhYmxlKSArXHJcblx0XHRcdFx0dGVudGhUYWJsZShwYXJzZURhdGEudGVudGhUYWJsZSkgKyBcdFx0IFxyXG5cdFx0XHRcdGVsZXZlbnRoVGFibGUocGFyc2VEYXRhLmVsZXZlbnRoVGFibGUpICsgXHJcblx0XHRcdFx0dHdlbGZ0aFRhYmxlKHBhcnNlRGF0YS50d2VsZnRoVGFibGUpICtcclxuXHRcdFx0XHR0aGlydGVlbnRoVGFibGUocGFyc2VEYXRhLnRoaXJ0ZWVudGhUYWJsZSkgK1xyXG5cdFx0XHRcdGZvdXJ0ZWVudGhUYWJsZShwYXJzZURhdGEuZm91cnRlZW50aFRhYmxlKSArXHJcblx0XHRcdFx0ZmlmdGh0ZWVudGhUYWJsZShwYXJzZURhdGEuZmlmdGh0ZWVudGhUYWJsZSk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvbnNIdG1sID0gYnV0dG9uc1RlbXBsYXRlKHBhcnNlRGF0YS51c2VyKTtcclxuXHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVuZGVyLWZvcm1zJykuaW5uZXJIVE1MID0gYmFzZUh0bWw7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVuZGVyLWJ1dHRvbnMnKS5pbm5lckhUTUwgPSBidXR0b25zSHRtbDtcclxuXHRcdGlmIChjYWxsQmFjaykgY2FsbEJhY2soKTtcclxuXHR9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcblx0dmFyIGZvcm1UeXBlSWQgPSB1dGlscy5nZXRVcmxQYXJhbXMod2luZG93LmxvY2F0aW9uLmhyZWYsICdvYmplY3RfaWQnKTtcclxuXHR2YXIgZm9ybUlkID0gdXRpbHMuZ2V0VXJsUGFyYW1zKHdpbmRvdy5wYXJlbnQubG9jYXRpb24uaHJlZiwgJ29iamVjdF9pZCcpO1xyXG5cdGNyZWF0ZUJhc2VIdG1sKGZvcm1JZCwgZm9ybVR5cGVJZCwgY3JlYXRlRGF0ZVBpY2tlcnMpO1xyXG59XHJcblxyXG5cclxuXHJcbiIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VyKSB7XHJcblx0dXNlciA9IHVzZXIgfHwge307XHJcblx0dXNlci5pc0Jvc3MgPSB1c2VyLmlzQm9zcyB8fCBmYWxzZTtcclxuXHR1c2VyLmZvcm1TdGF0dXMgPSB1c2VyLmZvcm1TdGF0dXMgfHwgJyc7XHJcblxyXG5cdGlmICh1dGlscy5zdHJCb29sVG9Cb29sKHVzZXIuaXNCb3NzKSkge1xyXG5cdFx0aWYgKHVzZXIuZm9ybVN0YXR1cyA9PT0gJ2RlY2xpbmVkJyB8fCB1c2VyLmZvcm1TdGF0dXMgPT09ICdjb25maXJtZWQnKSByZXR1cm4gXCJcIjtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0XCI8aW5wdXQgdHlwZT0nYnV0dG9uJyBvbmNsaWNrPXNlbmRGb3JtKCdzYXZlJykgdmFsdWU9J9Ch0L7RhdGA0LDQvdC40YLRjCcgY2xhc3M9J2lucHV0QnV0dG9uJyAvPlxcblxcXHJcblx0XHRcdDxpbnB1dCB0eXBlPSdidXR0b24nIG9uY2xpY2s9c2VuZEZvcm0oJ2RlY2xpbmVkJykgdmFsdWU9J9Ce0YLQutC70L7QvdC40YLRjCcgY2xhc3M9J2lucHV0QnV0dG9uJy8+XFxuXFxcclxuXHRcdFx0PGlucHV0IHR5cGU9J2J1dHRvbicgb25jbGljaz1zZW5kRm9ybSgnY29uZmlybWVkJykgdmFsdWU9J9Cj0YLQstC10YDQtNC40YLRjCcgY2xhc3M9J2lucHV0QnV0dG9uJy8+XCJcclxuXHRcdCk7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0aWYgKHVzZXIuZm9ybVN0YXR1cyA9PT0gJ2FjdGl2ZScpIHtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcIjxpbnB1dCB0eXBlPSdidXR0b24nIG9uY2xpY2s9c2VuZEZvcm0oJ3NhdmUnKSB2YWx1ZT0n0KHQvtGF0YDQsNC90LjRgtGMJyBjbGFzcz0naW5wdXRCdXR0b24nLz4gXFxuXFxcclxuXHRcdFx0XHQ8aW5wdXQgdHlwZT0nYnV0dG9uJyBvbmNsaWNrPXNlbmRGb3JtKCdzZW5kX3JlcXVlc3QnKSB2YWx1ZT0n0J7RgtC/0YDQsNCy0LjRgtGMINC90LAg0L/QvtC00YLQstC10YDQttC00LXQvdC40LUnIGNsYXNzPSdpbnB1dEJ1dHRvbicvPlwiXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gXCJcIjtcclxuXHR9XHJcblxyXG59IiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXRpbHMnKTtcclxudmFyIHVpID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdWknKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVpZ2h0aFRhYmxlKSB7XHJcblx0ZWlnaHRoVGFibGUgPSBlaWdodGhUYWJsZSB8fCB7fTtcclxuXHRyZXR1cm4gKFxyXG5cdFx0XCI8ZGl2IGNsYXNzPSdlaWdodGhUYWJsZSc+XFxuXFxcclxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInIGNsYXNzPSdlaWdodGhUYWJsZSc+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNvbHNwYW49JzQnIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7RhtC10L3QutCwINGB0L7QvtGC0LLQtdGC0YHRgtCy0LjRjyDQu9C40YfQvdC+0YHRgtC90YvQvCDQutC+0LzQv9C10YLQtdC90YbQuNGP0Lw8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlMic+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCd0LjQt9C60LjQuSDRgNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQtdC00L3QuNC5INGA0LXQt9GD0LvRjNGC0LDRgjwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KXQvtGA0L7RiNC40Lkg0YDQtdC30YPQu9GM0YLQsNGCPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuSDRgNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGVpZ2h0aFRhYmxlLmNvbDBfc3RyMCksICdlaWdodGhUYWJsZS5jb2wwX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZWlnaHRoVGFibGUuY29sMV9zdHIwKSwgJ2VpZ2h0aFRhYmxlLmNvbDFfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChlaWdodGhUYWJsZS5jb2wyX3N0cjApLCAnZWlnaHRoVGFibGUuY29sMl9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGVpZ2h0aFRhYmxlLmNvbDNfc3RyMCksICdlaWdodGhUYWJsZS5jb2wzX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdDwvdGFibGU+XFxuXFxcclxuXHRcdDwvZGl2PlwiXHJcblx0KVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxldmVudGhUYWJsZSkge1xyXG5cdGVsZXZlbnRoVGFibGUgPSBlbGV2ZW50aFRhYmxlIHx8IHt9O1xyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J2VsZXZlbnRoVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJyBjbGFzcz0nZWxldmVudGhUYWJsZSc+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGU0Jz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNvbHNwYW49JzMnIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J/Qu9Cw0L0g0YDQsNC30LLQuNGC0LjRjyDQvdCwINC/0YDQtdC00YHRgtC+0Y/RidC40Lkg0L/QtdGA0LjQvtC0PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTQnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QptC10LvQuCDRgNCw0LfQstC40YLQuNGPPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QlNC10LnRgdGC0LLQuNGPPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QodGA0L7QutC4PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTQnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+0JrQsNC60LjQtSDQvtCx0LvQsNGB0YLQuCDQstGLINCy0YvQtNC10LvRj9C10YLQtSDQtNC70Y8g0L/QvtCy0YvRiNC10L3QuNGPINGN0YTRhNC10LrRgtC40LLQvdC+0YHRgtC4P1xcblxcXHJcblx0XHRcdFx0XHRcdNCa0LDQuiDQstGLINGD0LfQvdCw0LXRgtC1LCDRh9GC0L4g0LLRiyDQvtGB0LLQvtC40LvQuCDRjdGC0YMg0L7QsdC70LDRgdGC0Yw/XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz7Qp9GC0L4g0LLRiyDRgdC00LXQu9Cw0LXRgtC1LCDRh9GC0L7QsdGLINC00L7QsdC40YLRjNGB0Y8g0L/QvtGB0YLQsNCy0LvQtdC90L3QvtC5INGG0LXQu9C4INC/0L4g0YDQsNC30LLQuNGC0LjRjj88L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+0JrQvtCz0LTQsCDQstGLINC00L7RgdGC0LjQs9C90LjRgtC1INGG0LXQu9C4INC/0L4g0YDQsNC30LLQuNGC0LjRjj88L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjAnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wxX3N0cjAnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMV9zdHIwIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wyX3N0cjAnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMl9zdHIwIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMF9zdHIxJyByb3dzPScyJz5cIiArIChlbGV2ZW50aFRhYmxlLmNvbDBfc3RyMSB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMV9zdHIxJyByb3dzPScyJz5cIiArIChlbGV2ZW50aFRhYmxlLmNvbDFfc3RyMSB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMl9zdHIxJyByb3dzPScyJz5cIiArIChlbGV2ZW50aFRhYmxlLmNvbDJfc3RyMSB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDBfc3RyMicgcm93cz0nMic+XCIgKyAoZWxldmVudGhUYWJsZS5jb2wwX3N0cjIgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDFfc3RyMicgcm93cz0nMic+XCIgKyAoZWxldmVudGhUYWJsZS5jb2wxX3N0cjIgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDJfc3RyMicgcm93cz0nMic+XCIgKyAoZWxldmVudGhUYWJsZS5jb2wyX3N0cjIgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjMnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMF9zdHIzIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wxX3N0cjMnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMV9zdHIzIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wyX3N0cjMnIHJvd3M9JzInPlwiICsgKGVsZXZlbnRoVGFibGUuY29sMl9zdHIzIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMF9zdHI0JyByb3dzPScyJz5cIiArIChlbGV2ZW50aFRhYmxlLmNvbDBfc3RyNCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMV9zdHI0JyByb3dzPScyJz5cIiArIChlbGV2ZW50aFRhYmxlLmNvbDFfc3RyNCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMl9zdHI0JyByb3dzPScyJz5cIiArIChlbGV2ZW50aFRhYmxlLmNvbDJfc3RyNCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDBfc3RyNScgcm93cz0nMic+XCIrIChlbGV2ZW50aFRhYmxlLmNvbDBfc3RyNSB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wxX3N0cjUnIHJvd3M9JzInPlwiKyAoZWxldmVudGhUYWJsZS5jb2wxX3N0cjUgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMl9zdHI1JyByb3dzPScyJz5cIisgKGVsZXZlbnRoVGFibGUuY29sMl9zdHI1IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZWxldmVudGhUYWJsZS5jb2wwX3N0cjYnIHJvd3M9JzInPlwiKyAoZWxldmVudGhUYWJsZS5jb2wwX3N0cjYgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2VsZXZlbnRoVGFibGUuY29sMV9zdHI2JyByb3dzPScyJz5cIisgKGVsZXZlbnRoVGFibGUuY29sMV9zdHI2IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdlbGV2ZW50aFRhYmxlLmNvbDJfc3RyNicgcm93cz0nMic+XCIrIChlbGV2ZW50aFRhYmxlLmNvbDJfc3RyNiB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0PC90YWJsZT5cXG5cXFxyXG5cdFx0PC9kaXY+XCJcclxuXHQpXHJcbn0iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xyXG52YXIgdWkgPSByZXF1aXJlKCcuLi8uLi91dGlscy91aScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZmlmdGhUYWJsZSkge1xyXG5cdGZpZnRoVGFibGUgPSBmaWZ0aFRhYmxlIHx8IHt9O1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0XCI8ZGl2IGNsYXNzPSdmaWZ0aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcic+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0JfQkNCT0J7Qm9Ce0JLQntCaPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx00YLQtdC60YHRglxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTInPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiAxOThweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QmtC+0LzQv9C10YLQtdC90YbQuNGPPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA1NDBweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9C+0LLQtdC00LXQvdGH0LXRgdC60LjQuSDQuNC90LTQuNC60LDRgtC+0YA8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjb2xzcGFuPSczJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0YbQtdC90LrQsCDRgNC10LfRg9C70YzRgtCw0YLQsDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0L/QvtC70L3QvtGB0YLRjNGOPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0YDQvtGP0LLQu9GP0LXRgiDRh9Cw0YHRgtC40YfQvdC+PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0LHRidCw0Y8g0L7RhtC10L3QutCwPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogMTk4cHg7JyByb3dzcGFuPSc1Jz7Qm9GO0LHQvtCy0Yw8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDU0MHB4Oyc+0J/RgNC+0Y/QstC70Y/QtdGCINC/0L7QstGL0YjQtdC90L3Ri9C5INC40L3RgtC10YDQtdGBINC6INC80LjRgNGDINC80L7QtNGLPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIwKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjApLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc1JyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyMF9ieTUsICdmaWZ0aFRhYmxlLmNvbDJfc3RyMF9ieTUnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qm9GO0LHQuNGCINGN0LvQtdCz0LDQvdGC0L3Rg9GOINC+0LHRg9Cy0Yw8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjEpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjEnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0LjQvdGC0LXRgNC10YEg0Log0JHRgNC10L3QtNGDINC4INC60L7QvNC/0LDQvdC40Lgg0LIg0YbQtdC70L7QvDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIyKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIyJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjRweDsnPtCn0YPQstGB0YLQstGD0LXRgiDQvdC10LzQsNGC0LXRgNC40LDQu9GM0L3Rg9GOINGG0LXQvdC90L7RgdGC0Ywg0LLQtdGJ0LXQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjRweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyNHB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCf0L7QvdC40LzQsNC10YIg0Lgg0YDQsNC30LTQtdC70Y/QtdGCINGG0LXQvdC90L7RgdGC0Lgg0JHRgNC10L3QtNCwPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI0KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjQpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNScgc3R5bGU9J3dpZHRoOiAxOThweCc+0K3QvNC/0LDRgtC40YfQvdGL0Lk8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyNHB4Oyc+0KPQv9GA0LDQstC70Y/QtdGCINGN0LzQvtGG0LjRj9C80Lgg0Lgg0L3QsNGB0YLRgNC+0LXQvdC40LXQvCDQv9GA0Lgg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjQuCDRgSDQu9GO0LTRjNC80Lg8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDI0cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjUpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjUnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjRweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyNV9ieTUsICdmaWZ0aFRhYmxlLmNvbDJfc3RyNV9ieTUnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J/RgNC+0Y/QstC70Y/QtdGCINGC0L7Qu9C10YDQsNC90YLQvdC+0YHRgtGMINC/0L4g0L7RgtC90L7RiNC10L3QuNGOINC6INC70Y7QtNGP0Lw8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjYpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjYnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNiksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNTQwcHgnPtCj0LzQtdC10YIg0L/QvtC90Y/RgtGMINGN0LzQvtGG0LjQvtC90LDQu9GM0L3QvtC1INGB0L7RgdGC0L7Rj9C90LjQtSDRh9C10LvQvtCy0LXQutCwPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI3KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI3JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjgpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjcnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J/RgNC+0Y/QstC70Y/QtdGCINCy0L3QuNC80LDQvdC40LUg0L/QviDQvtGC0L3QvtGI0LXQvdC40Y4g0Log0LvRjtC00Y/QvDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyOCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyOCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI4KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI4JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCj0L/RgNCw0LLQu9GP0LXRgiDRjdC80L7RhtC40L7QvdCw0LvRjNC90YvQvCDRgdC+0YHRgtC+0Y/QvdC40LXQvCDQutC+0LzQsNC90LTRizwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyOSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyOScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI5KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI5JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzUnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCh0L7QstC10YDRiNC10L3RgdGC0LLRg9GO0YnQuNC50YHRjzwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodCw0LzQvtGB0YLQvtGP0YLQtdC70YzQvdC+INC40L3QuNGG0LjQuNGA0YPQtdGCINCy0LDRgNC40LDQvdGC0Ysg0YDQtdGI0LXQvdC40Y8g0LfQsNC00LDRhzwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMTApLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjEwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjEwKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyMTBfYnk1LCAnZmlmdGhUYWJsZS5jb2wyX3N0cjEwX2J5NScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDIzcHg7Jz7QmNGB0L/QvtC70YzQt9GD0LXRgiDRgNCw0LfQvdGL0LUg0LjQvdGB0YLRgNGD0LzQtdC90YLRiyDQtNC70Y8g0YHQsNC80L7RgNCw0LfQstC40YLQuNGPPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxMSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTEnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTEpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjExJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjRweDsnPtCh0YLRgNC10LzQuNGC0YHRjyDQuiDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjiDQvdC+0LLRi9GFINC30L3QsNC90LjQuSDQsiDRgNCw0LHQvtGC0LU8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjEyKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIxMicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIxMiksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMTInKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7QsdGK0LXQutGC0LjQstC90L4g0L7RhtC10L3QuNCy0LDQtdGCINGB0LLQvtC4INGB0LjQu9GM0L3Ri9C1INGB0YLQvtGA0L7QvdGLINC4INC30L7QvdGLINGA0L7RgdGC0LA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjEzKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIxMycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIxMyksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMTMnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JjRidC10YIg0L3QvtCy0YvQtSDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INCyINC/0YDQvtGG0LXRgdGB0LUg0LjQt9C80LXQvdC10L3QuNC5PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxNCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTQpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjE0JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzknIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCh0LDQvNC+0L7RgtCy0LXRgNC20LXQvdC90YvQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntGC0LLQtdGC0YHRgtCy0LXQvdC90L4g0L/QvtC00YXQvtC00LjRgiDQuiDQstGL0L/QvtC70L3QtdC90LjRjiDQv9C+0YHRgtCw0LLQu9C10L3QvdGL0YUg0L/QtdGA0LXQtCDQvdC40Lwg0LfQsNC00LDRhzwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMTUpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjE1JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjE1KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxNScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzknIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyMTVfYnk5LCAnZmlmdGhUYWJsZS5jb2wyX3N0cjE1X2J5OScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QndC10YHQtdGCINC+0YLQstC10YLRgdGC0LLQtdC90L3QvtGB0YLRjCDQt9CwINGB0L7QsdGB0YLQstC10L3QvdGL0LUg0YDQtdGI0LXQvdC40Y8g0Lgg0LTQtdC50YHRgtCy0LjRjzwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMTYpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjE2JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjE2KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxNicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodCy0L7QtdCy0YDQtdC80LXQvdC90L4g0LTQtdC70LjRgtGB0Y8g0LLQsNC20L3QvtC5INC40L3RhNC+0YDQvNCw0YbQuNC10Lkg0Lgg0YDQtdGB0YPRgNGB0LDQvNC4PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIxNyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMTcnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMTcpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjE3JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCT0L7RgtC+0LIg0YTQvtC60YPRgdC40YDQvtCy0LDRgtGM0YHRjyDQvdCwINC60L7QvNCw0L3QtNC90L7QuSDRgNCw0LHQvtGC0LU8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjE4KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIxOCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIxOCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMTgnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JLRi9C/0L7Qu9C90Y/QtdGCINC30LDQtNCw0YfQuCDQsiDRgdC+0L7RgtCy0LXRgtGB0YLQstC40Lgg0YEg0L/QvtC70LjRgtC40LrQvtC5INC4INC/0YDQvtGG0LXQtNGD0YDQsNC80Lgg0LrQvtC80L/QsNC90LjQuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMTkpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjE5JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjE5KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIxOScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QkdC10YDQtdGCINC90LAg0YHQtdCx0Y8g0L7RgtCy0LXRgtGB0YLQstC10L3QvdC+0YHRgtGMINC30LAg0YDQsNCx0L7RgtGDINC4INGA0LXQt9GD0LvRjNGC0LDRgiDQutC+0LzQsNC90LTRizwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMjApLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjIwKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodGC0LDQstC40YIg0LjQvdGC0LXRgNC10YHRiyDQmtC+0LzQv9Cw0L3QuNC4INC90LDRgNCw0LLQvdC1INGB0L4g0YHQstC+0LjQvNC4PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyMSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMjEnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMjEpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjIxJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YLRgdGC0LDQuNCy0LDQtdGCINC40L3RgtC10YDQtdGB0Ysg0LrQvtC80LDQvdC00Ysg0LIg0YHQu9C+0LbQvdGL0YUg0YHQuNGC0YPQsNGG0LjRj9GFPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyMiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMjInKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMjIpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjIyJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCR0LXRgNC10YIg0L3QsCDRgdC10LHRjyDQtNC+0L/QvtC70L3QuNGC0LXQu9GM0L3Rg9GOINC+0YLQstC10YLRgdGC0LLQtdC90L3QvtGB0YLRjDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMjMpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjIzJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjIzKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIyMycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc0JyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QntC/0YLQuNC80LjRgdGC0LjRh9C90YvQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodC+0YXRgNCw0L3Rj9C10YIg0L/QvtC30LjRgtC40LLQvdGL0Lkg0L3QsNGB0YLRgNC+0Lkg0L/RgNC4INCy0LfQsNC40LzQvtC00LXQudGB0YLQstC40Lgg0YEg0LvRjtC00YzQvNC4PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIyNCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMjQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMjQpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjI0JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nNCcgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZVNlbGVjdChbMSwyLDMsNF0sIGZpZnRoVGFibGUuY29sMl9zdHIyNF9ieTQsICdmaWZ0aFRhYmxlLmNvbDJfc3RyMjRfYnk0JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCS0LjQtNC40YIg0LLQvtC30LzQvtC20L3QvtGB0YLQuCDQsiDQv9GA0L7QuNGB0YXQvtC00Y/RidC40YUg0LjQt9C80LXQvdC10L3QuNGP0YU8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjI1KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyNScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIyNSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMjUnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JTQtdC80L7QvdGB0YLRgNC40YDRg9C10YIg0YPQstC10YDQtdC90L3QvtGB0YLRjCDQsiDRg9GB0L/QtdGI0L3QvtC8INGA0LDQt9GA0LXRiNC10L3QuNC4INGB0LjRgtGD0LDRhtC40Lg8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjI2KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyNicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIyNiksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMjYnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0KLRgNCw0L3RgdC70LjRgNGD0LXRgiDQvtC/0YLQuNC80LjRgdGC0LjRh9C90YvQuSDQvdCw0YHRgtGA0L7QuSDQvtC60YDRg9C20LDRjtGJ0LjQvDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMjcpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjI3JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjI3KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIyNycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc1JyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QlNC40L3QsNC80LjRh9C90YvQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qo9C80LXQtdGCINCz0YDQsNC80L7RgtC90L4g0L/QvtGB0YLQsNCy0LjRgtGMINC/0LXRgNC10LQg0YHQvtCx0L7QuSDRhtC10LvRjDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMjgpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjI4JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjI4KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIyOCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyMjhfYnk1LCAnZmlmdGhUYWJsZS5jb2wyX3N0cjI4X2J5NScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDIzcHg7Jz7QlNC+0YHRgtC40LPQsNC10YIg0L/QvtGB0YLQsNCy0LvQtdC90L3Ri9GFINGG0LXQu9C10Lk8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjI5KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIyOScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIyOSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMjknKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodC/0L7RgdC+0LHQtdC9INC/0LXRgNC10LrQu9GO0YfQsNGC0YzRgdGPINC/0YDQuCDQstGL0L/QvtC70L3QtdC90LjQuCDQvtC00L3QvtC5INC30LDQtNCw0YfQuCDQvdCwINC00YDRg9Cz0YPRjiDQsdC10Lcg0L/QvtGC0LXRgNC4INC60LDRh9C10YHRgtCy0LA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjMwKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzMCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMzAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7QsdC70LDQtNCw0LXRgiDRh9C10YLQutC40Lwg0LLQuNC00LXQvdC40LXQvCDRgdCy0L7QuNGFINGG0LXQu9C10Lkg0LIg0LTQvtC70LPQvtGB0YDQvtGH0L3QvtC5INC/0LXRgNGB0L/QtdC60YLQuNCy0LU8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjMxKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzMScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzMSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMzEnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J/RgNC+0Y/QstC70Y/QtdGCINGD0L/QvtGA0YHRgtCy0L4g0LIg0YDQtdGI0LXQvdC40Lgg0LfQsNC00LDRh9C4INC00LDQttC1INGB0YLQsNC70LrQuNCy0LDRj9GB0Ywg0YEg0YLRgNGD0LTQvdC+0YHRgtGP0LzQuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzIpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjMyJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjMyKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzMicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc2JyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QktC+0YHQv9GA0LjQuNC80YfQuNCy0YvQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDIzcHg7Jz7QntGC0LrRgNGL0YIg0Log0L/QvtC70YPRh9C10L3QuNGOINC+0LHRgNCw0YLQvdC+0Lkg0YHQstGP0LfQuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzMpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjMzJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjMzKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzMycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzYnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyMzNfYnk2LCAnZmlmdGhUYWJsZS5jb2wyX3N0cjMzX2J5NicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QkdGL0YHRgtGA0L4g0LDQtNCw0L/RgtC40YDRg9C10YLRgdGPINC6INC90L7QstGL0Lwg0L7QsdGB0YLQvtGP0YLQtdC70YzRgdGC0LLQsNC8PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIzNCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMzQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMzQpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjM0JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCf0YDQuNC90LjQvNCw0LXRgiDQuNC00LXQuCDQuCDQv9C+0LTQtNC10YDQttC40LLQsNC10YIg0LjQvdC40YbQuNCw0YLQuNCy0YM8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjM1KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzNScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzNSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMzUnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JrQvtGA0YDQtdC60YLQuNGA0YPQtdGCINGB0LLQvtC4INC00LXQudGB0YLQstC40Y8g0L/QvtGB0LvQtSDQv9C+0LvRg9GH0LXQvdC40Y8g0L7QsdGA0LDRgtC90L7QuSDRgdCy0Y/Qt9C4PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHIzNiksICdmaWZ0aFRhYmxlLmNvbDBfc3RyMzYnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyMzYpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjM2JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCR0YvRgdGC0YDQviDRgNC10LDQs9C40YDRg9C10YIg0L3QsCDQuNC30LzQtdC90LXQvdC40Y8sINC80LXQvdGP0LXRgiDRgdCy0L7QtSDQv9C+0LLQtdC00LXQvdC40LUg0LIg0L3QvtCy0YvRhSDQvtCx0YHRgtC+0Y/RgtC10LvRjNGB0YLQstCw0YU8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjM3KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzNycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzNyksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMzcnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0KHQv9C+0YHQvtCx0LXQvSDQuNC30LzQtdC90LjRgtGMINGB0LLQvtGOINGC0L7Rh9C60YMg0LfRgNC10L3QuNGPINC/0L7QtCDQstC+0LfQtNC10LnRgdGC0LLQuNC10Lwg0LDRgNCz0YPQvNC10L3RgtC+0LIg0YHQvtCx0LXRgdC10LTQvdC40LrQsDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyMzgpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjM4JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjM4KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHIzOCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc3JyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QodC40LvRjNC90YvQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodGC0LDQstC40YIg0YbQtdC70Lgg0YfQu9C10L3QsNC8INC60L7QvNCw0L3QtNGLLCDQvtCx0L7Qt9C90LDRh9Cw0LXRgiDRgdGA0L7QutC4INC40YUg0LLRi9C/0L7Qu9C90LXQvdC40Y88L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjM5KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHIzOScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHIzOSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyMzknKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc3JyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgZmlmdGhUYWJsZS5jb2wyX3N0cjM5X2J5NywgJ2ZpZnRoVGFibGUuY29sMl9zdHIzOV9ieTcnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7QsdC+0LfQvdCw0YfQsNC10YIg0L7QttC40LTQsNC10LzRi9C5INGA0LXQt9GD0LvRjNGC0LDRgiDRh9C70LXQvdCw0Lwg0LrQvtC80LDQvdC00Ys8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQwKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0MCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0MCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J/QvtC00LTQtdGA0LbQuNCy0LDQtdGCINC4INCy0L7QstC70LXQutCw0LXRgiDRh9C70LXQvdC+0LIg0LrQvtC80LDQvdC00Ysg0LIg0YDQsNCx0L7RgtGDPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI0MSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNDEnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNDEpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjQxJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCU0LDQtdGCINGA0LDQt9Cy0LjQstCw0Y7RidGD0Y4g0L7QsdGA0LDRgtC90YPRjiDRgdCy0Y/Qt9GMINGH0LvQtdC90LDQvCDQutC+0LzQsNC90LTRizwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNDIpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjQyJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjQyKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI0MicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QoNCw0YHQv9GA0LXQtNC10LvRj9C10YIg0YDQtdGB0YPRgNGB0Ysg0Lgg0YDQvtC70Lgg0LIg0LrQvtC80LDQvdC00LUg0LTQu9GPINGD0YHQv9C10YjQvdC+0LPQviDQstGL0L/QvtC70L3QtdC90LjRjyDRhtC10LvQuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNDMpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjQzJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjQzKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI0MycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QoNCw0YHRgdGC0LDQstC70Y/QtdGCINC/0YDQuNC+0YDQuNGC0LXRgtGLINC/0YDQuCDQstGL0L/QvtC70L3QtdC90LjQuCDQt9Cw0LTQsNGHPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI0NCksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNDQnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNDQpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjQ0JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCk0L7QutGD0YHQuNGA0YPQtdGCINC60L7QvNCw0L3QtNGDINC90LAg0L/RgNC40L7RgNC40YLQtdGC0L3Ri9GFINC30LDQtNCw0YfQsNGFPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI0NSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNDUnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNDUpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjQ1JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzMnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCe0YLQutGA0L7QstC10L3QvdGL0Lk8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7RhtC10L3QuNCy0LDQtdGCINGD0YHQv9C10YjQvdC+0YHRgtGMINGB0LLQvtC10Lkg0YDQsNCx0L7RgtGLINC/0L4g0YDQtdC30YPQu9GM0YLQsNGC0LDQvCwg0LAg0L3QtSDQv9C+INC/0YDQuNC70L7QttC10L3QvdGL0Lwg0YPRgdC40LvQuNGP0Lw8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQ2KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0NicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0NiksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDYnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSczJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgZmlmdGhUYWJsZS5jb2wyX3N0cjQ2X2J5MywgJ2ZpZnRoVGFibGUuY29sMl9zdHI0Nl9ieTMnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0KfQtdGB0YLQvdC+INC4INGB0LLQvtC10LLRgNC10LzQtdC90L3QviDQuNC30LvQsNCz0LDQtdGCINGB0LLQvtGOINC/0L7Qt9C40YbQuNGOINC/0L4g0YDQsNC30L3Ri9C8INCy0L7Qv9GA0L7RgdCw0Lw8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQ3KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0NycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0NyksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDcnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0J7RgtC60YDRi9GCINC6INC+0LHRidC10L3QuNGOLCDQuNGB0LrRgNC10L3QtdC9INC/0L4g0L7RgtC90L7RiNC10L3QuNGOINC6INC60L7Qu9C70LXQs9Cw0Lw8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjQ4KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI0OCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI0OCksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNDgnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgcm93c3Bhbj0nMycgc3R5bGU9J3dpZHRoOiAxOThweCc+0JjQt9GL0YHQutCw0L3QvdGL0Lk8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyNHB4Oyc+0J/RgNC+0Y/QstC70Y/QtdGCINC/0L7QstGL0YjQtdC90L3QvtC1INCy0L3QuNC80LDQvdC40LUg0Log0YHRgtC40LvQuNGB0YLQuNGH0LXRgdC60LjQvCDQuCDRjdGB0YLQtdGC0LjRh9C10YHQutC40Lwg0LDRgdC/0LXQutGC0LDQvCDQsiDRgNCw0LHQvtGC0LUg0Lgg0LbQuNC30L3QuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNDkpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjQ5JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjQ5KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI0OScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzMnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyNDlfYnkzLCAnZmlmdGhUYWJsZS5jb2wyX3N0cjQ5X2J5MycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qo9C/0YDQsNCy0LvRj9C10YIg0YHRgtC40LvQuNGB0YLQuNC60L7QuSDRgNC10YfQuCDQv9GA0Lgg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjQuCDRgSDQvtC60YDRg9C20LDRjtGJ0LjQvNC4INC70Y7QtNGM0LzQuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTApLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjUwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjUwKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1MCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0LTQvtGB0YLQvtC40L3RgdGC0LLQviDQuCDQstC10LbQu9C40LLQvtGB0YLRjDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTEpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjUxJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjUxKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1MScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc1JyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7Qp9GD0YLQutC40Lk8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JTQsNC10YIg0LLQvtC30LzQvtC20L3QvtGB0YLRjCDQutCw0LbQtNC+0LzRgyDRh9C70LXQvdGDINC60L7QvNCw0L3QtNGLINCy0YvRgdC60LDQt9Cw0YLRjNGB0Y88L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjUyKSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI1MicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI1MiksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNTInKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSc1JyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgZmlmdGhUYWJsZS5jb2wyX3N0cjUyX2J5NSwgJ2ZpZnRoVGFibGUuY29sMl9zdHI1Ml9ieTUnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JfQsNC80LXRh9Cw0LXRgiDQuCDQv9C+0L7RidGA0Y/QtdGCINCy0LrQu9Cw0LQg0LTRgNGD0LPQuNGFPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI1MyksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNTMnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNTMpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjUzJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjRweDsnPtCf0L7QvNC+0LPQsNC10YIg0YfQu9C10L3QsNC8INC60L7QvNCw0L3QtNGLINCw0LTQsNC/0YLQuNGA0L7QstCw0YLRjNGB0Y8g0Log0L3QvtCy0YvQvCDQuNC30LzQtdC90LXQvdC40Y/QvDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTQpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjU0JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjU0KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1NCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodC70YvRiNC40YIg0LzQvdC10L3QuNC1INGB0L7QsdC10YHQtdC00L3QuNC60LAg0Lgg0YPRh9C40YLRi9Cy0LDQtdGCINC10LPQviDQv9GA0Lgg0L/RgNC40L3Rj9GC0LjQuCDRgNC10YjQtdC90LjRjzwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTUpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjU1JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjU1KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1NScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDIxcHg7Jz7QktC90LjQvNCw0YLQtdC70LXQvSDQuiDQtNC10YLQsNC70Y/QvDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTYpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjU2JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjU2KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1NicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPScyJyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QmNGB0YLQvtGA0LjRjzwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4OyBoZWlnaHQ6IDIzcHg7Jz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0LvQvtGP0LvRjNC90L7RgdGC0Ywg0Log0JHRgNC10L3QtNGDINC4INC60L7QvNC/0LDQvdC40Lgg0LIg0YbQtdC70L7QvDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTcpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjU3JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjU3KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1NycpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBmaWZ0aFRhYmxlLmNvbDJfc3RyNTdfYnkyLCAnZmlmdGhUYWJsZS5jb2wyX3N0cjU3X2J5MicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QkNGB0YHQvtGG0LjQuNGA0YPQtdGCINGB0LXQsdGPINGBINC60L7QvNC/0LDQvdC40LXQuTwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNTgpLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjU4JykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjU4KSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI1OCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSczJyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QntGB0L7QsdC10L3QvdGL0Lk8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0KHRgtGA0YPQutGC0YPRgNC40YDQvtCy0LDQvdC90L4g0Lgg0L/QvtGB0LvQtdC00L7QstCw0YLQtdC70YzQvdC+INC00L7QvdC+0YHQuNGCINGB0LLQvtC4INC80YvRgdC70Lg8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wwX3N0cjU5KSwgJ2ZpZnRoVGFibGUuY29sMF9zdHI1OScpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMV9zdHI1OSksICdmaWZ0aFRhYmxlLmNvbDFfc3RyNTknKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCByb3dzcGFuPSczJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgZmlmdGhUYWJsZS5jb2wyX3N0cjU5X2J5MywgJ2ZpZnRoVGFibGUuY29sMl9zdHI1OV9ieTMnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JDRgNCz0YPQvNC10L3RgtC40YDQvtCy0LDQvdC+INCy0YvRgdC60LDQt9GL0LLQsNC10YIg0YHQstC+0Y4g0L/QvtC30LjRhtC40Y4sINC+0L/QtdGA0LjRgNGD0LXRgiDRhNCw0LrRgtCw0LzQuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDBfc3RyNjApLCAnZmlmdGhUYWJsZS5jb2wwX3N0cjYwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZmlmdGhUYWJsZS5jb2wxX3N0cjYwKSwgJ2ZpZnRoVGFibGUuY29sMV9zdHI2MCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntCx0LDRj9GC0LXQu9C10L0sINGD0LzQtdC10YIg0LLRi9C30YvQstCw0YLRjCDRgdC40LzQv9Cw0YLQuNGOPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRoVGFibGUuY29sMF9zdHI2MSksICdmaWZ0aFRhYmxlLmNvbDBfc3RyNjEnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aFRhYmxlLmNvbDFfc3RyNjEpLCAnZmlmdGhUYWJsZS5jb2wxX3N0cjYxJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdCk7XHJcbn0iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xyXG52YXIgdWkgPSByZXF1aXJlKCcuLi8uLi91dGlscy91aScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZmlmdGh0ZWVudGhUYWJsZSkge1xyXG5cdGZpZnRodGVlbnRoVGFibGUgPSBmaWZ0aHRlZW50aFRhYmxlIHx8IHt9O1xyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J2ZpZnRodGVlbnRoVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJyA+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QmtCe0JzQnNCV0J3QotCQ0KDQmNCYINCg0KPQmtCe0JLQntCU0JjQotCV0JvQrzwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2ZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIwJyByb3dzPScxMCc+XCIgKyAoZmlmdGh0ZWVudGhUYWJsZS5jb2wwX3N0cjAgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHRcdDx0YWJsZT5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiAzNXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIxKSwgJ2ZpZnRodGVlbnRoVGFibGUuY29sMF9zdHIxJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx00KHQvtGC0YDRg9C00L3QuNC6INGB0L7Qs9C70LDRgdC10L1cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogMzVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmaWZ0aHRlZW50aFRhYmxlLmNvbDBfc3RyMiksICdmaWZ0aHRlZW50aFRhYmxlLmNvbDBfc3RyMicpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdNCh0L7RgtGA0YPQtNC90LjQuiDQvdC1INGB0L7Qs9C70LDRgdC10L1cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0PC90YWJsZVxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsInZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZpcnN0VGFibGUpIHtcclxuXHRmaXJzdFRhYmxlID0gZmlyc3RUYWJsZSB8fCB7fTtcclxuXHR2YXIgc3RhcnREYXRlID0gIWZpcnN0VGFibGUuY29sMF9zdHIwID8gJycgOiBtb21lbnQoZmlyc3RUYWJsZS5jb2wwX3N0cjApLmZvcm1hdCgnREQuTU0uWVlZWScpO1xyXG5cdHZhciBmaW5pc2hEYXRlID0gIWZpcnN0VGFibGUuY29sMF9zdHIxID8gJycgOiBtb21lbnQoZmlyc3RUYWJsZS5jb2wwX3N0cjEpLmZvcm1hdCgnREQuTU0uWVlZWScpOztcclxuXHRcclxuXHRyZXR1cm4gKFxyXG5cdFx0XCI8ZGl2IGNsYXNzPSdmaXJzdFRhYmxlJz5cXG5cXFxyXG5cdFx0XHQ8dGFibGUgYm9yZGVyLXNwYWNpbmc6IDBweDsnIGFsaWduPSdjZW50ZXInIGNsYXNzPSdib3JkZXJfdGFibGVfZGF0ZSc+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4OyBwYWRkaW5nLWxlZnQ6MTBweDsnIGNvbHNwYW49JzMnIGNsYXNzPSdjb2xvcl9oZWFkX2RhdGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdNCe0KbQldCd0JrQkCDQrdCk0KTQldCa0KLQmNCS0J3QntCh0KLQmCDQn9CeINCY0KLQntCT0JDQnCDQmtCe0J3QotCg0J7Qm9Cs0J3QntCT0J4g0J/QldCg0JjQntCU0JBcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF9kYXRlJyBzdHlsZT0nd2lkdGg6IDM1cHg7IGhlaWdodDogNDNweDsgcGFkZGluZy1sZWZ0OjEwcHg7Jz5DOiA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfZGF0ZScgc3R5bGU9J3dpZHRoOiAyMjVweDsgaGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgcmVhZG9ubHkgY2xhc3M9J2ZpcnN0VGFibGVfX2RhdGUnIG5hbWU9J2ZpcnN0VGFibGUuY29sMF9zdHIwJyB2YWx1ZT1cIiArIHN0YXJ0RGF0ZSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfZGF0ZScgcm93c3Bhbj0nMic+PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF9kYXRlJyBzdHlsZT0nd2lkdGg6IDM1cHg7IGhlaWdodDogNDNweDsgcGFkZGluZy1sZWZ0OjEwcHg7Jz7Qn9CeOiA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfZGF0ZScgc3R5bGU9J3dpZHRoOiAyMjVweDsgaGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgcmVhZG9ubHkgY2xhc3M9J2ZpcnN0VGFibGVfX2RhdGUnIG5hbWU9J2ZpcnN0VGFibGUuY29sMF9zdHIxJyB2YWx1ZT1cIiArIGZpbmlzaERhdGUgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0PC90YWJsZT5cXG5cXFxyXG5cdFx0PC9kaXY+XCJcclxuXHQpO1xyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm91cnRlZW50aFRhYmxlKSB7XHJcblx0Zm91cnRlZW50aFRhYmxlID0gZm91cnRlZW50aFRhYmxlIHx8IHt9O1xyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J2ZvdXJ0ZWVudGhUYWJsZSc+IFxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJyBjbGFzcz0nZm91cnRlZW50aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCa0J7QnNCc0JXQndCi0JDQoNCY0Jgg0KHQntCi0KDQo9CU0J3QmNCa0JA8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSdmb3VydGVlbnRoVGFibGUuY29sMF9zdHIwJyByb3dzPScxMCc+XCIrIChmb3VydGVlbnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmb3VydGhUYWJsZSkge1xyXG5cdGZvdXJ0aFRhYmxlID0gZm91cnRoVGFibGUgfHwge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J2ZvdXJ0aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcic+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgY29sc3Bhbj0nNScgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntCR0KnQkNCvINCe0KbQldCd0JrQkCDQktCr0J/QntCb0J3QldCd0JjQryDQoNCQ0JHQntCiPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyByb3dzcGFuPScyJyBzdHlsZT0nd2lkdGg6IDc0N3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0L7QtNCy0LXQtNC10L3QuNC1INC40YLQvtCz0L7QsiDQv9C+INCy0YvQv9C+0LvQvdC10L3QuNGOINC/0L7RgdGC0LDQstC70LXQvdC90YvRhSDRhtC10LvQtdC5INC/0L4g0LrQu9GO0YfQtdCy0YvQvCDQv9C+0LrQsNC30LDRgtC10LvRj9C8INGN0YTRhNC10LrRgtC40LLQvdC+0YHRgtC4Ojwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc0Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0YbQtdC90LrQsCDRgNC10LfRg9C70YzRgtCw0YLQsDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NHB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCd0LjQt9C60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KHRgNC10LTQvdC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCl0L7RgNC+0YjQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzQ3cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J2ZvdXJ0aFRhYmxlLmNvbDBfc3RyMCcgcm93cz0nMic+XCIgKyAoZm91cnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc0cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZm91cnRoVGFibGUuY29sMV9zdHIwKSwgJ2ZvdXJ0aFRhYmxlLmNvbDFfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKGZvdXJ0aFRhYmxlLmNvbDJfc3RyMCksICdmb3VydGhUYWJsZS5jb2wyX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChmb3VydGhUYWJsZS5jb2wzX3N0cjApLCAnZm91cnRoVGFibGUuY29sM19zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woZm91cnRoVGFibGUuY29sNF9zdHIwKSwgJ2ZvdXJ0aFRhYmxlLmNvbDRfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyAnIGNvbHNwYW49JzUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nZm91cnRoVGFibGUuY29sMF9ieTVfc3RyMScgcm93cz0nMicgc3R5bGU9J3dpZHRoOiA5Ni42JTsnPlwiICsgKGZvdXJ0aFRhYmxlLmNvbDBfYnk1X3N0cjEgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdDwvdGFibGU+XFxuXFxcclxuXHRcdDwvZGl2PlwiXHJcblx0KTtcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuaW50aFRhYmxlKSB7XHJcblx0bmludGhUYWJsZSA9IG5pbnRoVGFibGUgfHwge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J25pbnRoVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc1JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0JHQqdCQ0K8g0J7QptCV0J3QmtCQINCh0J7QntCi0JLQldCi0KHQotCS0JjQr9CcINCe0JbQmNCU0JDQndCY0K/QnCDQntCiINCU0J7Qm9CW0J3QntCh0KLQmDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA3NDdweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9C+0LTQstC10LTQtdC90LjQtSDQuNGC0L7Qs9C+0LIg0L/QviDRgdC+0L7RgtCy0LXRgtGB0YLQstC40Y4g0LvQuNGH0L3QvtGB0YLQvdGL0Lwg0LrQvtC80L/QtdGC0LXQvdGG0LjRj9C8INC4INGE0YPQvdC60YbQuNC+0L3QsNC70YzQvdGL0Lwg0L3QsNCy0YvQutCw0Lw6PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIGNvbHNwYW49JzQnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7RhtC10L3QutCwINGA0LXQt9GD0LvRjNGC0LDRgtCwPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDc0cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J3QuNC30LrQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QodGA0LXQtNC90LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KXQvtGA0L7RiNC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCS0YvRgdC+0LrQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NDdweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0nbmludGhUYWJsZS5jb2wwX3N0cjAnIHJvd3M9JzInPlwiICsgKG5pbnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc0cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wobmludGhUYWJsZS5jb2wxX3N0cjApLCAnbmludGhUYWJsZS5jb2wxX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChuaW50aFRhYmxlLmNvbDJfc3RyMCksICduaW50aFRhYmxlLmNvbDJfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKG5pbnRoVGFibGUuY29sM19zdHIwKSwgJ25pbnRoVGFibGUuY29sM19zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wobmludGhUYWJsZS5jb2w0X3N0cjApLCAnbmludGhUYWJsZS5jb2w0X3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgJyBjb2xzcGFuPSc1Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J25pbnRoVGFibGUuY29sMF9ieTVfc3RyMScgcm93cz0nMicgc3R5bGU9J3dpZHRoOiA5Ni42JTsnPlwiICsgKG5pbnRoVGFibGUuY29sMF9ieTVfc3RyMSB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0PC90YWJsZT5cXG5cXFxyXG5cdFx0PC9kaXY+XCJcclxuXHQpO1xyXG59IiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXRpbHMnKTtcclxudmFyIHVpID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdWknKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlY29uZFRhYmxlKSB7XHJcblx0c2Vjb25kVGFibGUgPSBzZWNvbmRUYWJsZSB8fCB7fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdFwiPGRpdiBjbGFzcz0nc2Vjb25kVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Ql9CQ0JPQntCb0J7QktCe0Jo8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdDwvdGFibGU+XFxuXFxcclxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInIGNsYXNzPSdhbGx0YWJsZXMnPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsgdGV4dC1hbGlnbjpjZW50ZXI7IGhlaWdodDogNDNweCcgY29sc3Bhbj0nOSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntCm0JXQndCa0JAg0JTQntCh0KLQmNCW0JXQndCY0K8g0KTQmNCd0JDQndCh0J7QktCr0KUgS1BJPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDE5M3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogYmxhbmNoZWRhbG1vbmQ7ICcgcm93c3Bhbj0nMic+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz5LUEk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsgJyByb3dzcGFuPScyJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCm0LXQu9GMPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyB0ZXh0LWFsaWduOmNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogYmxhbmNoZWRhbG1vbmQ7ICcgcm93c3Bhbj0nMic+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QoNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsgJyByb3dzcGFuPScyJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0YDQvtGG0LXQvdGCINC00L7RgdGC0LjQttC10L3QuNGPINGG0LXQu9C4PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3RleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsnIGNvbHNwYW49JzQnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7RhtC10L3QutCwINGA0LXQt9GD0LvRjNGC0LDRgtCwPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J3dpZHRoOiAyNDVweDsgdGV4dC1hbGlnbjpjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6IGJsYW5jaGVkYWxtb25kOyAnIHJvd3NwYW49JzInPiBcXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCa0L7QvNC80LXQvdGC0LDRgNC40Lg8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgdGV4dC1hbGlnbjpjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6IGJsYW5jaGVkYWxtb25kOyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QndC40LfQutC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KHRgNC10LTQvdC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDsgJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCl0L7RgNC+0YjQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NHB4OyB0ZXh0LWFsaWduOmNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogYmxhbmNoZWRhbG1vbmQ7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCS0YvRgdC+0LrQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogMTkzcHg7ICc+0J/Qu9Cw0L0g0L/RgNC+0LTQsNC2INC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wwX3N0cjAnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDBfc3RyMCB8fCAnJykgK1wiJyAvPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wxX3N0cjAnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDFfc3RyMCB8fCAnJykgK1wiJyAvPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wyX3N0cjAnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDJfc3RyMCB8fCAnJykgK1wiJyAvPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc1cHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDNfc3RyMCksICdzZWNvbmRUYWJsZS5jb2wzX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsgJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sNF9zdHIwKSwgJ3NlY29uZFRhYmxlLmNvbDRfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2w1X3N0cjApLCAnc2Vjb25kVGFibGUuY29sNV9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc0cHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDZfc3RyMCksICdzZWNvbmRUYWJsZS5jb2w2X3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDI0NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgbmFtZT0nc2Vjb25kVGFibGUuY29sN19zdHIwJyByb3dzPScyJyBzdHlsZT0nd2lkdGg6IDk4JTsnPlwiICsgKHNlY29uZFRhYmxlLmNvbDdfc3RyMCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiAxOTNweDsgaGVpZ2h0OiA0NXB4Oyc+0JrQvtC90LLQtdGA0YHQuNGPXFxuXFxcclxuXHRcdFx0XHRcdFx0KNGG0LXQu9GMINC90LAg0LzQsNCz0LDQt9C40L0pXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogNDVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wwX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDBfc3RyMSB8fCAnJykgK1wiJy8+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogNDVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wxX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDFfc3RyMSB8fCAnJykgK1wiJy8+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogNDVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wyX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPSdcIisgKHNlY29uZFRhYmxlLmNvbDJfc3RyMSB8fCAnJykgK1wiJy8+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiA0NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sM19zdHIxKSwgJ3NlY29uZFRhYmxlLmNvbDNfc3RyMScpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogNDVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDRfc3RyMSksICdzZWNvbmRUYWJsZS5jb2w0X3N0cjEnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDQ1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2w1X3N0cjEpLCAnc2Vjb25kVGFibGUuY29sNV9zdHIxJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzRweDsgaGVpZ2h0OiA0NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sNl9zdHIxKSwgJ3NlY29uZFRhYmxlLmNvbDZfc3RyMScpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDI0NXB4OyBoZWlnaHQ6IDQ1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBuYW1lPSdzZWNvbmRUYWJsZS5jb2w3X3N0cjEnIHJvd3M9JzInIHN0eWxlPSd3aWR0aDogOTglOycgY29scz0nMjAnPlwiICsgKHNlY29uZFRhYmxlLmNvbDdfc3RyMSB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiAxOTNweDsgJz7QodGA0LXQtNC90LjQuSDRh9C10LpcXG5cXFxyXG5cdFx0XHRcdFx0XHQo0YbQtdC70Ywg0L3QsCDQvNCw0LPQsNC30LjQvSlcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0nc2Vjb25kVGFibGUuY29sMF9zdHIyJyB0eXBlPSd0ZXh0JyB2YWx1ZT0nXCIgKyAoc2Vjb25kVGFibGUuY29sMF9zdHIyIHx8ICcnKSArIFwiJy8+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3NlY29uZFRhYmxlLmNvbDFfc3RyMicgdHlwZT0ndGV4dCcgdmFsdWU9J1wiICsgKHNlY29uZFRhYmxlLmNvbDFfc3RyMiB8fCAnJykgKyBcIicvPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wyX3N0cjInIHR5cGU9J3RleHQnIHZhbHVlPSdcIiArIChzZWNvbmRUYWJsZS5jb2wyX3N0cjIgfHwgJycpICsgXCInLz5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrICB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDNfc3RyMiksICdzZWNvbmRUYWJsZS5jb2wzX3N0cjInKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrICB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDRfc3RyMiksICdzZWNvbmRUYWJsZS5jb2w0X3N0cjInKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrICB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDVfc3RyMiksICdzZWNvbmRUYWJsZS5jb2w1X3N0cjInKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NHB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrICB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDZfc3RyMiksICdzZWNvbmRUYWJsZS5jb2w2X3N0cjInKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogMjQ1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBuYW1lPSdzZWNvbmRUYWJsZS5jb2w3X3N0cjInIHJvd3M9JzInIHN0eWxlPSd3aWR0aDogOTglOycgY29scz0nMjAnPlwiICsgKHNlY29uZFRhYmxlLmNvbDdfc3RyMiB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiAxOTNweDsnPtCa0L7QvNC/0LvQtdC60YHQvdGL0Lkg0YfQtdC6XFxuXFxcclxuXHRcdFx0XHRcdFx0KNGG0LXQu9GMINC90LAg0LzQsNCz0LDQt9C40L0pXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDc1cHg7ICc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3NlY29uZFRhYmxlLmNvbDBfc3RyMycgdHlwZT0ndGV4dCcgdmFsdWU9J1wiICsgKHNlY29uZFRhYmxlLmNvbDBfc3RyMyB8fCAnJykgKyBcIicvPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9Jycgc3R5bGU9J3dpZHRoOiA3NXB4OyAnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSdzZWNvbmRUYWJsZS5jb2wxX3N0cjMnIHR5cGU9J3RleHQnIHZhbHVlPSdcIiArIChzZWNvbmRUYWJsZS5jb2wxX3N0cjMgfHwgJycpICsgXCInLz5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPScnIHN0eWxlPSd3aWR0aDogNzVweDsgJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0nc2Vjb25kVGFibGUuY29sMl9zdHIzJyB0eXBlPSd0ZXh0JyB2YWx1ZT0nXCIgKyAoc2Vjb25kVGFibGUuY29sMl9zdHIzIHx8ICcnKSArIFwiJy8+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2Vjb25kVGFibGUuY29sM19zdHIzKSwgJ3NlY29uZFRhYmxlLmNvbDNfc3RyMycpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J3BvY2VudHJ1JyBzdHlsZT0nd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArICB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNlY29uZFRhYmxlLmNvbDRfc3RyMyksICdzZWNvbmRUYWJsZS5jb2w0X3N0cjMnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdwb2NlbnRydScgc3R5bGU9J3dpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyAgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2w1X3N0cjMpLCAnc2Vjb25kVGFibGUuY29sNV9zdHIzJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0ncG9jZW50cnUnIHN0eWxlPSd3aWR0aDogNzRweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyAgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZWNvbmRUYWJsZS5jb2w2X3N0cjMpLCAnc2Vjb25kVGFibGUuY29sNl9zdHIzJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nJyBzdHlsZT0nd2lkdGg6IDI0NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgbmFtZT0nc2Vjb25kVGFibGUuY29sN19zdHIzJyByb3dzPScyJyBzdHlsZT0nd2lkdGg6IDk4JTsnIGNvbHM9JzIwJz5cIiArIChzZWNvbmRUYWJsZS5jb2w3X3N0cjMgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZXZlbnRoVGFibGUpIHtcclxuXHRzZXZlbnRoVGFibGUgPSBzZXZlbnRoVGFibGUgfHwge307XHJcblx0cmV0dXJuIChcclxuXHRcdFwiPGRpdiBjbGFzcz0nc2V2ZW50aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHQ8dGFibGUgYWxpZ249J2NlbnRlcicgY2xhc3M9J3NldmVudGhUYWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgIDx0Ym9keT5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTInPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBjb2xzcGFuPSc1JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3RleHRib2xkJz7Ql9Cw0LPQvtC70L7QstC+0Lo8L3NwYW4+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiAxOThweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KTRg9C90LrRhtC40L7QvdCw0LvRjNC90YvQuSDQvdCw0LLRi9C6PC9zcGFuPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogNTQwcHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0L7QstC10LTQtdC90YfQtdGB0LrQuNC5INC40L3QtNC40LrQsNGC0L7RgDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBjb2xzcGFuPSczJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntGG0LXQvdC60LAg0YDQtdC30YPQu9GM0YLQsNGC0LA8L3NwYW4+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9GA0L7Rj9Cy0LvRj9C10YIg0L/QvtC70L3QvtGB0YLRjNGOPC9zcGFuPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J/RgNC+0Y/QstC70Y/QtdGCINGH0LDRgdGC0LjRh9C90L48L3NwYW4+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3RleHRib2xkJz7QntCx0YnQsNGPINC+0YbQtdC90LrQsDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiAxOThweDsnIHJvd3NwYW49JzknPtCd0LDQstGL0LrQuCDRg9C/0YDQsNCy0LvQtdC90LjRjyDQv9GA0L7QtNCw0LbQsNC80Lg8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNTQwcHg7Jz7Qo9C/0YDQsNCy0LvRj9C10YIg0YHQtdGA0LLQuNGB0L7QvCDQsiDQvNCw0LPQsNC30LjQvdC1PC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjApLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMCksICdzZXZlbnRoVGFibGUuY29sMV9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHJvd3NwYW49JzknIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBzZXZlbnRoVGFibGUuY29sMl9zdHIwX2J5OSwgJ3NldmVudGhUYWJsZS5jb2wyX3N0cjBfYnk5JykgK1wiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCk0L7RgNC80LjRgNGD0LXRgiDQvdCw0LLRi9C60Lgg0YDQsNCx0L7RgtGLINGBINC70L7Rj9C70YzQvdGL0LzQuCDQv9C+0LrRg9C/0LDRgtC10LvRj9C80Lgg0YMg0LrQvtC80LDQvdC00Ysg0LzQsNCz0LDQt9C40L3QsDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyM3B4Oyc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIxKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjEnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDIzcHg7Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjEpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JfQvdCw0LXRgiDQuCDQv9C+0L3QuNC80LDQtdGCINGA0L7Qt9C90LjRh9C90YvQtSBrcGk8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMiksICdzZXZlbnRoVGFibGUuY29sMF9zdHIyJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjInKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCQ0L3QsNC70LjQt9C40YDRg9C10YIg0Y3RhNGE0LXQutGC0LjQstC90L7RgdGC0Ywg0YDQsNCx0L7RgtGLINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMyksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIzKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjMnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0YLQsNCy0LjRgiDRhtC10LvQuCDQv9C+IGtwaSDRgdC+0YLRgNGD0LTQvdC40LrQsNC8INC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyNCksICdzZXZlbnRoVGFibGUuY29sMF9zdHI0JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI0KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjQnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCh0L7Qt9C00LDQtdGCINC40L3RgdGC0YDRg9C80LXQvdGC0Ysg0LTQu9GPINC00L7RgdGC0LjQttC10L3QuNGPINGG0LXQu9C10Lkg0L/QviBrcGk8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyNSksICdzZXZlbnRoVGFibGUuY29sMF9zdHI1JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI1KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjUnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCY0L3QuNGG0LjQuNGA0YPQtdGCINC80LXRgNC+0L/RgNC40Y/RgtC40Y8g0L/QviDRg9Cy0LXQu9C40YfQtdC90LjRjiDRhNC40L3QsNC90YHQvtCy0YvRhSDQv9C+0LrQsNC30LDRgtC10LvQtdC5INC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyNiksICdzZXZlbnRoVGFibGUuY29sMF9zdHI2JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI2KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjYnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCX0L3QsNC10YIg0LLQvtC30LzQvtC20L3QvtGB0YLQuCDQsiDRgNCw0LfQstC40YLQuNC4INGB0LLQvtC10LPQviDQvNCw0LPQsNC30LjQvdCwINC4INC40LzQtdC10YIg0L/Qu9Cw0L0g0LjRhSDRgNC10LDQu9C40LfQsNGG0LjQuDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHI3KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjcnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjcpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyNycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC/0YDQuNC80LXQvdC10L3QuNC1INC40L3RgdGC0YDRg9C80LXQvdGC0L7QsiDQsiDRgNCw0LHQvtGC0LUg0YMg0L/QtdGA0YHQvtC90LDQu9CwINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyOCksICdzZXZlbnRoVGFibGUuY29sMF9zdHI4JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI4KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjgnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHJvd3NwYW49JzExJyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QndCw0LLRi9C60Lgg0YPQv9GA0LDQstC70LXQvdC40Y8g0L/QtdGA0YHQvtC90LDQu9C+0Lw8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QodC+0LfQtNCw0LXRgiDQuCDQvtC/0YLQuNC80LjQt9C40YDRg9C10YIg0LPRgNCw0YTQuNC6INGA0LDQsdC+0YLRiyDQv9C10YDRgdC+0L3QsNC70LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyOSksICdzZXZlbnRoVGFibGUuY29sMF9zdHI5JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHI5KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjknKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgcm93c3Bhbj0nMTEnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBzZXZlbnRoVGFibGUuY29sMl9zdHI5X2J5MTEsICdzZXZlbnRoVGFibGUuY29sMl9zdHI5X2J5MTEnKSArXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0KTQvtGA0LzQuNGA0YPQtdGCINC60L7QvNCw0L3QtNGDINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTApLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTAnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjEwKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjEwJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNTQwcHgnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC/0YDQvtGG0LXRgdGBINC30LDQutGA0YvRgtC40Y8g0L3QtdGF0LLQsNGC0LrQuCDQsiDQvNCw0LPQsNC30LjQvdC1PC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjExKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjExJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIxMSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIxMScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0J7RgNCz0LDQvdC40LfRg9C10YIg0LzQtdGA0L7Qv9GA0LjRj9GC0LjRjyDQv9C+INGB0L7QutGA0LDRidC10L3QuNGOINC+0YLRgtC+0LrQvtCyINCyINC80LDQs9Cw0LfQuNC90LU8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTIpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTInKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjEyKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjEyJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0YDQtdCw0LvQuNC30LDRhtC40Y4g0L/RgNC+0LPRgNCw0LzQvNGLINCw0LTQsNC/0YLQsNGG0LjQuCDQuCDQvdCw0YHRgtCw0LLQvdC40YfQtdGB0YLQstCwPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjEzKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjEzJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIxMyksICdzZXZlbnRoVGFibGUuY29sMV9zdHIxMycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0J7RgNCz0LDQvdC40LfRg9C10YIg0L/RgNC+0YbQtdGB0YEg0L7QsdGD0YfQtdC90LjRjyDQvdCwINGA0LDQsdC+0YfQtdC8INC80LXRgdGC0LUg0LTQu9GPINC60L7QvNCw0L3QtNGLINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjNweDsnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTQpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTQnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDIzcHg7Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE0KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE0JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9GA0L7QstC+0LTQuNGCINC+0YbQtdC90LrRgyDQutCw0LbQtNC+0LPQviDRgdC+0YLRgNGD0LTQvdC40LrQsCDQvNCw0LPQsNC30LjQvdCwPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjE1KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjE1JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIxNSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIxNScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0KDQsNC30YDQsNCx0LDRgtGL0LLQsNC10YIg0JjQn9CgINGB0L7RgtGA0YPQtNC90LjQutC+0LIg0Lgg0LrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC40YUg0YDQtdCw0LvQuNC30LDRhtC40Y48L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTYpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTYnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE2KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE2JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntGA0LPQsNC90LjQt9GD0LXRgiDRgNCw0LHQvtGC0YMg0YEg0YLQsNC70LDQvdGC0LDQvNC4INCyINC80LDQs9Cw0LfQuNC90LU8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTcpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTcnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE3KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE3JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmNGB0L/QvtC70YzQt9GD0LXRgiDRgNCw0LfQu9C40YfQvdGL0LUg0LjQvdGB0YLRgNGD0LzQtdC90YLRiyDQvNC+0YLQuNCy0LDRhtC40Lgg0LTQu9GPINC/0LXRgNGB0L7QvdCw0LvQsDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIxOCksICdzZXZlbnRoVGFibGUuY29sMF9zdHIxOCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMTgpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMTgnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCg0LDQt9Cy0LjQstCw0LXRgiDQv9C+0YLQtdC90YbQuNCw0Lsg0LrQvtC80LDQvdC00Ys8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTkpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMTknKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjE5KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjE5JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCByb3dzcGFuPSc5JyBzdHlsZT0nd2lkdGg6IDE5OHB4Jz7QndCw0LLRi9C60Lgg0YPQv9GA0LDQstC70LXQvdC40Y8g0YLQvtCy0LDRgNC90YvQvNC4INC/0YDQvtGG0LXRgdGB0LDQvNC4PC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC4INGA0LXQsNC70LjQt9GD0LXRgiDRgdGC0LDQvdC00LDRgNGC0Ysg0LLQuNC30YPQsNC70YzQvdC+0LPQviDQvNC10YDRh9C10L3QtNCw0LnQt9C40L3Qs9CwPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjIwKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjIwJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyMCksICdzZXZlbnRoVGFibGUuY29sMV9zdHIyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnIHJvd3NwYW49JzknPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIisgdWkuY3JlYXRlU2VsZWN0KFsxLDIsMyw0XSwgc2V2ZW50aFRhYmxlLmNvbDJfc3RyMjBfYnk5LCAnc2V2ZW50aFRhYmxlLmNvbDJfc3RyMjBfYnk5JykgK1wiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHg7IGhlaWdodDogMjNweDsnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC/0YDQvtGG0LXRgdGBINC/0YDQtdC00L/RgNC+0LTQsNC20L3QvtC5INC/0L7QtNCz0L7RgtC+0LLQutC4INGC0L7QstCw0YDQsDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweDsgaGVpZ2h0OiAyM3B4Oyc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIyMSksICdzZXZlbnRoVGFibGUuY29sMF9zdHIyMScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjNweDsnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjEpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjEnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC/0YDQvtGG0LXRgdGBINC/0YDQuNC10LzQutC4INGC0L7QstCw0YDQsDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIyMiksICdzZXZlbnRoVGFibGUuY29sMF9zdHIyMicpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjIpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjInKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC/0YDQvtGG0LXRgdGBINC+0YLQs9GA0YPQt9C60Lgg0YLQvtCy0LDRgNCwPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjIzKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjIzJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyMyksICdzZXZlbnRoVGFibGUuY29sMV9zdHIyMycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweCc+0JrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC/0L7RgNGP0LTQvtC6INC90LAg0YHQutC70LDQtNC1INC4INCyINGC0L7RgNCz0L7QstC+0Lwg0LfQsNC70LU8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjQpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjQnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjI0KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjI0JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntGA0LPQsNC90LjQt9GD0LXRgiDQv9GA0L7RhtC10YHRgSDQuNC90LLQtdC90YLQsNGA0LjQt9Cw0YbQuNC4INCyINC80LDQs9Cw0LfQuNC90LU8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjUpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjUnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjI1KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjI1JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0YHQuNGB0YLQtdC80YMg0LzQtdGA0L7Qv9GA0LjRj9GC0LjQuSDQv9C+INC+0YDQs9Cw0L3QuNC30LDRhtC40Lgg0YHQvtGF0YDQsNC90L3QvtGB0YLQuCDQotCc0KY8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjYpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMjYnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjI2KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjI2JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QntGA0LPQsNC90LjQt9GD0LXRgiDQv9GA0L7RhtC10YHRgSDQv9C10YDQtdC+0YbQtdC90LrQuDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIyNyksICdzZXZlbnRoVGFibGUuY29sMF9zdHIyNycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjcpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMjcnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0YDQs9Cw0L3QuNC30YPQtdGCINC+0L/RgtC40LzQsNC70YzQvdC+0LUg0YDQsNC30LzQtdGJ0LXQvdC40LUg0YLQvtCy0LDRgNCwINC90LAg0YHQutC70LDQtNC1PC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjI4KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjI4JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyOCksICdzZXZlbnRoVGFibGUuY29sMV9zdHIyOCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgcm93c3Bhbj0nMTQnIHN0eWxlPSd3aWR0aDogMTk4cHgnPtCd0LDQstGL0LrQuCDRg9C/0YDQsNCy0LvQtdC90LjRjyDQvtC/0LXRgNCw0YbQuNC+0L3QvdC+0Lkg0LTQtdGP0YLQtdC70YzQvdC+0YHRgtGM0Y48L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7Qn9GA0L7QstC+0LTQuNGCINC80L7QvdC40YLQvtGA0LjQvdCzINC4INC+0YbQtdC90LrRgyDRgNCw0LHQvtGC0Ysg0LzQsNCz0LDQt9C40L3QsCDQv9C+INGH0LXQui3Qu9C40YHRgtGDPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjI5KSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjI5JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIyOSksICdzZXZlbnRoVGFibGUuY29sMV9zdHIyOScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnIHJvd3NwYW49JzE0Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgIFwiKyB1aS5jcmVhdGVTZWxlY3QoWzEsMiwzLDRdLCBzZXZlbnRoVGFibGUuY29sMl9zdHIyOV9ieTE0LCAnc2V2ZW50aFRhYmxlLmNvbDJfc3RyMjlfYnkxNCcpICtcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/RgNC+0LLQvtC00LjQvNGL0LUg0L7Qv9C10YDQsNGG0LjQuCDQvdCwINCa0JrQnDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzMCksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzMCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzApLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzAnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQstC10LTQtdC90LjQtSDQutCw0YHRgdC+0LLQvtC5INC00L7QutGD0LzQtdC90YLQsNGG0LjQuDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzMSksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzMScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzEpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzEnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjQtSDQv9GA0LDQstC40Lsg0YDQsNCx0L7RgtGLINGBINC00LXQvdC10LbQvdC+0Lkg0L3QsNC70LjRh9C90L7RgdGC0YzRjjwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzMiksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzMicpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzIpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzInKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0LHRg9GH0LDQtdGCINC90LDQstGL0LrQsNC8INGA0LDQsdC+0YLRiyDQvdCwIFBPUyAt0YLQtdGA0LzQuNC90LDQu9C1PC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wwX3N0cjMzKSwgJ3NldmVudGhUYWJsZS5jb2wwX3N0cjMzJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMV9zdHIzMyksICdzZXZlbnRoVGFibGUuY29sMV9zdHIzMycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgPC90cj5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA1NDBweDsgaGVpZ2h0OiAyM3B4Oyc+0JrQvtC90YLRgNC+0LvQuNGA0YPQtdGCINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNC1INC/0YDQsNCy0LjQuyDQvtCx0LvRg9C20LjQstCw0L3QuNGPINC/0LvQsNGC0LXQttC90YvRhSDQutCw0YDRgiDQnNCf0KE8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHg7IGhlaWdodDogMjNweDsnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzQpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzQnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4OyBoZWlnaHQ6IDIzcHg7Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjM0KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjM0JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/RgNC+0LLQtdC00LXQvdC40LUg0LjQvdC60LDRgdGB0LDRhtC40Lg8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzUpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzUnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjM1KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjM1JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/RgNC+0YbQtdGB0YEg0L7RgtC60YDRi9GC0LjRjy/Qt9Cw0LrRgNGL0YLQuNGPINC80LDQs9Cw0LfQuNC90LA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzYpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyMzYnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjM2KSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjM2JykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0YHQvtGB0YLQsNCy0LvQtdC90LjQtSDQutCw0LTRgNC+0LLQvtC5INC00L7QutGD0LzQtdC90YLQsNGG0LjQuDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzNyksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzNycpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzcpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzcnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDRhdGA0LDQvdC10L3QuNC1INC4INC/0LXRgNC10LTQsNGH0YMg0LjQvdGE0L7RgNC80LDRhtC40Lgg0L4g0LzQsNCz0LDQt9C40L3QtTwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzOCksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzOCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzgpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzgnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQvdCw0LvQuNGH0LjQtSDQvNC10LTQuNGG0LjQvdGB0LrQuNGFINC60L3QuNC20LXQujwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHIzOSksICdzZXZlbnRoVGFibGUuY29sMF9zdHIzOScpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzkpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyMzknKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCe0LHRg9GH0LDQtdGCINGE0L7RgNC80LjRgNC+0LLQsNC90LjRjiBLUEkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1IDHQoTwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHI0MCksICdzZXZlbnRoVGFibGUuY29sMF9zdHI0MCcpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyNDApLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyNDAnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNTQwcHgnPtCa0L7QvdGC0YDQvtC70LjRgNGD0LXRgiDQuNGB0L/RgNCw0LLQvdC+0YHRgtGMINGC0L7RgNCz0L7QstC+0LPQviDQvtCx0L7RgNGD0LTQvtCy0LDQvdC40Y88L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDBfc3RyNDEpLCAnc2V2ZW50aFRhYmxlLmNvbDBfc3RyNDEnKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8dGQgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgXCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNldmVudGhUYWJsZS5jb2wxX3N0cjQxKSwgJ3NldmVudGhUYWJsZS5jb2wxX3N0cjQxJykgKyBcIlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICA8L3RyPlxcblxcXHJcblx0XHRcdCAgICAgICAgPHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDU0MHB4Jz7QmtC+0L3RgtGA0L7Qu9C40YDRg9C10YIg0L/QvtGA0Y/QtNC+0Log0LIg0YLQvtGA0LPQvtCy0L7QvCDQt9Cw0LvQtTwvdGQ+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPHRkIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbChzZXZlbnRoVGFibGUuY29sMF9zdHI0MiksICdzZXZlbnRoVGFibGUuY29sMF9zdHI0MicpICsgXCJcXG5cXFxyXG5cdFx0XHQgICAgICAgICAgICA8L3RkPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgIDx0ZCBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdCAgICAgICAgICAgICAgICBcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2woc2V2ZW50aFRhYmxlLmNvbDFfc3RyNDIpLCAnc2V2ZW50aFRhYmxlLmNvbDFfc3RyNDInKSArIFwiXFxuXFxcclxuXHRcdFx0ICAgICAgICAgICAgPC90ZD5cXG5cXFxyXG5cdFx0XHQgICAgICAgIDwvdHI+XFxuXFxcclxuXHRcdFx0ICAgIDwvdGJvZHk+XFxuXFxcclxuXHRcdFx0PC90YWJsZT5cXG5cXFxyXG5cdFx0PC9kaXY+XCJcclxuXHQpXHJcbn0iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xyXG52YXIgdWkgPSByZXF1aXJlKCcuLi8uLi91dGlscy91aScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2l4dGhUYWJsZSkge1xyXG5cdHNpeHRoVGFibGUgPSBzaXh0aFRhYmxlIHx8IHt9O1xyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J3NpeHRoVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJyBjbGFzcz0nc2l4dGhUYWJsZSc+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUyJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNvbHNwYW49JzQnIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0J7RhtC10L3QutCwINGB0L7QvtGC0LLQtdGC0YHRgtCy0LjRjyDQu9C40YfQvdC+0YHRgtC90YvQvCDQutC+0LzQv9C10YLQtdC90YbQuNGP0Lw8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlMic+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCd0LjQt9C60LjQuSDRgNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQtdC00L3QuNC5INGA0LXQt9GD0LvRjNGC0LDRgjwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KXQvtGA0L7RiNC40Lkg0YDQtdC30YPQu9GM0YLQsNGCPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuSDRgNC10LfRg9C70YzRgtCw0YI8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNpeHRoVGFibGUuY29sMF9zdHIwKSwgJ3NpeHRoVGFibGUuY29sMF9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNpeHRoVGFibGUuY29sMV9zdHIwKSwgJ3NpeHRoVGFibGUuY29sMV9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNpeHRoVGFibGUuY29sMl9zdHIwKSwgJ3NpeHRoVGFibGUuY29sMl9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHNpeHRoVGFibGUuY29sM19zdHIwKSwgJ3NpeHRoVGFibGUuY29sM19zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0ZW50aFRhYmxlKSB7XHJcblx0dGVudGhUYWJsZSA9IHRlbnRoVGFibGUgfHwge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J3RlbnRoVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc1JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0JHQqdCQ0K8g0J7QptCV0J3QmtCQINCt0KTQpNCV0JrQotCY0JLQndCe0KHQotCYPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyByb3dzcGFuPScyJyBzdHlsZT0nd2lkdGg6IDc0N3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0L7QtNCy0LXQtNC10L3QuNC1INC40YLQvtCz0L7QsiDQv9GA0L7QvNC10LbRg9GC0L7Rh9C90L7QuSDQvtGG0LXQvdC60Lgg0LTQtdGP0YLQtdC70YzQvdC+0YHRgtC4INGB0L7RgtGA0YPQtNC90LjQutCwOjwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc0Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0YbQtdC90LrQsCDRgNC10LfRg9C70YzRgtCw0YLQsDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NHB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCd0LjQt9C60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0nd2lkdGg6IDc1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KHRgNC10LTQvdC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCl0L7RgNC+0YjQuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzQ3cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3RlbnRoVGFibGUuY29sMF9zdHIwJyByb3dzPScyJz5cIiArICh0ZW50aFRhYmxlLmNvbDBfc3RyMCB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NHB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRlbnRoVGFibGUuY29sMV9zdHIwKSwgJ3RlbnRoVGFibGUuY29sMV9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGVudGhUYWJsZS5jb2wyX3N0cjApLCAndGVudGhUYWJsZS5jb2wyX3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0ZW50aFRhYmxlLmNvbDNfc3RyMCksICd0ZW50aFRhYmxlLmNvbDNfc3RyMCcpICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRlbnRoVGFibGUuY29sNF9zdHIwKSwgJ3RlbnRoVGFibGUuY29sNF9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7ICcgY29sc3Bhbj0nNSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0ZW50aFRhYmxlLmNvbDBfYnk1X3N0cjEnIHJvd3M9JzInIHN0eWxlPSd3aWR0aDogOTYuNiU7Jz5cIiArICh0ZW50aFRhYmxlLmNvbDBfYnk1X3N0cjEgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdDwvdGFibGU+XFxuXFxcclxuXHRcdDwvZGl2PlwiXHJcblx0KTtcclxufSIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcbnZhciB1aSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VpJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGlyZFRhYmxlKSB7XHJcblx0dGhpcmRUYWJsZSA9IHRoaXJkVGFibGUgfHwge307XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHRcIjxkaXYgY2xhc3M9J3RoaXJkVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDx0cj5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc5JyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0KbQldCd0JrQkCDQn9CeINCU0J7QodCi0JjQltCV0J3QmNCuINCe0J/QldCg0JDQptCY0J7QndCd0KvQpSBLUEk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogMTkzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+S1BJPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogNzVweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QptC10LvRjCAoJSk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCg0LXQt9GD0LvRjNGC0LDRgiAoJSk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgcm93c3Bhbj0nMicgc3R5bGU9J3dpZHRoOiA3NXB4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCf0YDQvtGG0LXQvdGCINC00L7RgdGC0LjQttC10L3QuNGPINGG0LXQu9C4PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHJvd3NwYW49JzInIHN0eWxlPSd3aWR0aDogMjQ1cHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0JrQvtC80LzQtdC90YLQsNGA0LjQuDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBjb2xzcGFuPSc0Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCe0YbQtdC90LrQsCDRgNC10LfRg9C70YzRgtCw0YLQsDwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogMjNweDsgJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCd0LjQt9C60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJyBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQtdC00L3QuNC5PC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0KXQvtGA0L7RiNC40Lk8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7QktGL0YHQvtC60LjQuTwvc3Bhbj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogMTkzcHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+0J7RhtC10L3QutCwINGB0LXRgNCy0LjRgdCwPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDBfc3RyMCcgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wwX3N0cjAgfHwgJycpICsgXCI+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wxX3N0cjAnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMV9zdHIwIHx8ICcnKSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMl9zdHIwJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDJfc3RyMCB8fCAnJykgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiAyNDVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3RoaXJkVGFibGUuY29sM19zdHIwJyByb3dzPScyJz5cIisgKHRoaXJkVGFibGUuY29sM19zdHIwIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDRfc3RyMCksJ3RoaXJkVGFibGUuY29sNF9zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiICsgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyMCksJ3RoaXJkVGFibGUuY29sNV9zdHIwJykgICsgXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIiArIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w2X3N0cjApLCAndGhpcmRUYWJsZS5jb2w2X3N0cjAnKSArIFwiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIgKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sN19zdHIwKSwgJ3RoaXJkVGFibGUuY29sN19zdHIwJykgKyBcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDI0cHg7IHdpZHRoOiAxOTNweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz7QotC+0LLQsNGA0L3Ri9C1INC/0L7RgtC10YDQuDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wwX3N0cjEnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMF9zdHIxIHx8ICcnKSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMV9zdHIxJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDFfc3RyMSB8fCAnJykgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDJfc3RyMScgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wyX3N0cjEgfHwgJycpICsgXCI+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogMjQ1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0aGlyZFRhYmxlLmNvbDNfc3RyMScgcm93cz0nMic+XCIgKyAodGhpcmRUYWJsZS5jb2wzX3N0cjEgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w0X3N0cjEpLCAndGhpcmRUYWJsZS5jb2w0X3N0cjEnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyMSksICd0aGlyZFRhYmxlLmNvbDVfc3RyMScpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNl9zdHIxKSwgJ3RoaXJkVGFibGUuY29sNl9zdHIxJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w3X3N0cjEpLCAndGhpcmRUYWJsZS5jb2w3X3N0cjEnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfZm9uZV90YWJsZScgc3R5bGU9J3dpZHRoOiAxOTNweCc+0J7RhtC10L3QutCwINC/0L4g0YTQvtGC0L4g0L7RgtGH0LXRgtCw0LwgKNCS0JwpPC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDBfc3RyMicgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wwX3N0cjIgfHwgJycpICsgXCI+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wxX3N0cjInIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMV9zdHIyIHx8ICcnKSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMl9zdHIyJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDJfc3RyMiB8fCAnJykgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiAyNDVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3RoaXJkVGFibGUuY29sM19zdHIyJyByb3dzPScyJz5cIisgKHRoaXJkVGFibGUuY29sM19zdHIyIHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNF9zdHIyKSwgJ3RoaXJkVGFibGUuY29sNF9zdHIyJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w1X3N0cjIpLCAndGhpcmRUYWJsZS5jb2w1X3N0cjInKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDZfc3RyMiksICd0aGlyZFRhYmxlLmNvbDZfc3RyMicpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sN19zdHIyKSwgJ3RoaXJkVGFibGUuY29sN19zdHIyJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnIHN0eWxlPSd3aWR0aDogMTkzcHgnPtCe0YbQtdC90LrQsCDQv9C+INGH0LXQui3Qu9C40YHRgtGDINCi0KM8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMF9zdHIzJyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDBfc3RyMyB8fCAnJykgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDFfc3RyMycgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wxX3N0cjMgfHwgJycpICsgXCI+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wyX3N0cjMnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMl9zdHIzIHx8ICcnKSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDI0NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndGhpcmRUYWJsZS5jb2wzX3N0cjMnIHJvd3M9JzInPlwiKyAodGhpcmRUYWJsZS5jb2wzX3N0cjMgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w0X3N0cjMpLCAndGhpcmRUYWJsZS5jb2w0X3N0cjMnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyMyksICd0aGlyZFRhYmxlLmNvbDVfc3RyMycpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNl9zdHIzKSwgJ3RoaXJkVGFibGUuY29sNl9zdHIzJykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w3X3N0cjMpLCAndGhpcmRUYWJsZS5jb2w3X3N0cjMnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfZm9uZV90YWJsZScgc3R5bGU9J3dpZHRoOiAxOTNweCc+0J7RhtC10L3QutCwINCy0L3QtdGI0L3QtdCz0L4g0LLQuNC00LA8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDc1cHg7JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9J3RoaXJkVGFibGUuY29sMF9zdHI0JyB0eXBlPSd0ZXh0JyB2YWx1ZT1cIiArICh0aGlyZFRhYmxlLmNvbDBfc3RyNCB8fCAnJykgKyBcIj5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHg7IHdpZHRoOiA3NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPSd0aGlyZFRhYmxlLmNvbDFfc3RyNCcgdHlwZT0ndGV4dCcgdmFsdWU9XCIgKyAodGhpcmRUYWJsZS5jb2wxX3N0cjQgfHwgJycpICsgXCI+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4OyB3aWR0aDogNzVweDsnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgbmFtZT0ndGhpcmRUYWJsZS5jb2wyX3N0cjQnIHR5cGU9J3RleHQnIHZhbHVlPVwiICsgKHRoaXJkVGFibGUuY29sMl9zdHI0IHx8ICcnKSArIFwiPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweDsgd2lkdGg6IDI0NXB4OycgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndGhpcmRUYWJsZS5jb2wzX3N0cjQnIHJvd3M9JzInPlwiKyAodGhpcmRUYWJsZS5jb2wzX3N0cjQgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w0X3N0cjQpLCAndGhpcmRUYWJsZS5jb2w0X3N0cjQnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnIGNsYXNzPSdjb2xvcl9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0XHRcIisgdWkuY3JlYXRlQ2hlY2tCb3godXRpbHMuc3RyQm9vbFRvQm9vbCh0aGlyZFRhYmxlLmNvbDVfc3RyNCksICd0aGlyZFRhYmxlLmNvbDVfc3RyNCcpICtcIlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCcgY2xhc3M9J2NvbG9yX2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHRcdFwiKyB1aS5jcmVhdGVDaGVja0JveCh1dGlscy5zdHJCb29sVG9Cb29sKHRoaXJkVGFibGUuY29sNl9zdHI0KSwgJ3RoaXJkVGFibGUuY29sNl9zdHI0JykgK1wiXFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4JyBjbGFzcz0nY29sb3JfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdFx0XCIrIHVpLmNyZWF0ZUNoZWNrQm94KHV0aWxzLnN0ckJvb2xUb0Jvb2wodGhpcmRUYWJsZS5jb2w3X3N0cjQpLCAndGhpcmRUYWJsZS5jb2w3X3N0cjQnKSArXCJcXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0PC90YWJsZT5cXG5cXFxyXG5cdFx0PC9kaXY+XCJcclxuXHQpXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGlydGVlbnRoVGFibGUpIHtcclxuXHR0aGlydGVlbnRoVGFibGUgPSB0aGlydGVlbnRoVGFibGUgfHwge307XHJcblx0cmV0dXJuIChcclxuXHRcdFwiPGRpdiBjbGFzcz0ndGhpcnRlZW50aFRhYmxlJz4gXFxuXFxcclxuXHRcdFx0PHRhYmxlIGFsaWduPSdjZW50ZXInIGNsYXNzPSd0aGlydGVlbnRoVGFibGUnPlxcblxcXHJcblx0XHRcdFx0PHRyPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX2hlYWRfdGFibGUnIHN0eWxlPSdoZWlnaHQ6IDQzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPSd0ZXh0Ym9sZCc+0JTQntCb0JPQntCh0KDQntCn0J3Qq9CZINCf0JvQkNCdINC4INC00L7Qs9C+0LLQvtGA0LXQvdC90L7RgdGC0LggPC9zcGFuPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndGhpcnRlZW50aFRhYmxlLmNvbDBfc3RyMCcgcm93cz0nMTAnPlwiICsgKHRoaXJ0ZWVudGhUYWJsZS5jb2wwX3N0cjAgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHR3ZWxmdGhUYWJsZSkge1xyXG5cdHR3ZWxmdGhUYWJsZSA9IHR3ZWxmdGhUYWJsZSB8fCB7fTtcclxuXHRyZXR1cm4gKFxyXG5cdFx0XCI8ZGl2IGNsYXNzPSd0d2VsZnRoVGFibGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJyBjbGFzcz0ndHdlbGZ0aFRhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfaGVhZF90YWJsZTQnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY29sc3Bhbj0nMycgc3R5bGU9J2hlaWdodDogNDNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9J3RleHRib2xkJz7Qn9C70LDQvSDRgNCw0LfQstC40YLQuNGPINC90LAg0L/RgNC10LTRgdGC0L7Rj9GJ0LjQuSDQv9C10YDQuNC+0LQ8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlNCc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCm0LXQu9C4INGA0LDQt9Cy0LjRgtC40Y88L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCU0LXQudGB0YLQstC40Y88L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0ndGV4dGJvbGQnPtCh0YDQvtC60Lg8L3NwYW4+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlNCc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiA0M3B4Jz7Qp9C10LPQviDQvdC10L7QsdGF0L7QtNC40LzQviDQtNC+0YHRgtC40YfRjD8g0JrQsNC60L7QuSDRgNC10LfRg9C70YzRgtCw0YIg0LTQvtC70LbQtdC9INCx0YvRgtGMINC00L7RgdGC0LjQs9C90YPRgiDQsiDQuNGC0L7Qs9C1P1xcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+0KfRgtC+INCy0Ysg0YHQtNC10LvQsNC10YLQtSwg0YfRgtC+0LHRiyDQtNC+0LHQuNGC0YzRgdGPINC/0L7RgdGC0LDQstC70LXQvdC90L7QuSDRhtC10LvQuD88L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCc+0JrQvtCz0LTQsCDQstGLINC00L7RgdGC0LjQs9C90LjRgtC1INGG0LXQu9C4PzwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMF9zdHIwJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMF9zdHIwIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDFfc3RyMCcgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDFfc3RyMCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wyX3N0cjAnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wyX3N0cjAgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDBfc3RyMScgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDBfc3RyMSB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wxX3N0cjEnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wxX3N0cjEgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMl9zdHIxJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMl9zdHIxIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wwX3N0cjInIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wwX3N0cjIgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMV9zdHIyJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMV9zdHIyIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDJfc3RyMicgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDJfc3RyMiB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMF9zdHIzJyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMF9zdHIzIHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDFfc3RyMycgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDFfc3RyMyB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wyX3N0cjMnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wyX3N0cjMgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHRcdDx0ciBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDBfc3RyNCcgcm93cz0nMic+XCIgKyAodHdlbGZ0aFRhYmxlLmNvbDBfc3RyNCB8fCAnJykgKyBcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wxX3N0cjQnIHJvd3M9JzInPlwiICsgKHR3ZWxmdGhUYWJsZS5jb2wxX3N0cjQgfHwgJycpICsgXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMl9zdHI0JyByb3dzPScyJz5cIiArICh0d2VsZnRoVGFibGUuY29sMl9zdHI0IHx8ICcnKSArIFwiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdDwvdHI+XFxuXFxcclxuXHRcdFx0XHQ8dHIgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wwX3N0cjUnIHJvd3M9JzInPlwiKyAodHdlbGZ0aFRhYmxlLmNvbDBfc3RyNSB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDFfc3RyNScgcm93cz0nMic+XCIrICh0d2VsZnRoVGFibGUuY29sMV9zdHI1IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMl9zdHI1JyByb3dzPScyJz5cIisgKHR3ZWxmdGhUYWJsZS5jb2wyX3N0cjUgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl90ZXh0X2ZvbmVfdGFibGUnPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogMjNweCc+XFxuXFxcclxuXHRcdFx0XHRcdFx0PHRleHRhcmVhIGNvbHM9JzIwJyBuYW1lPSd0d2VsZnRoVGFibGUuY29sMF9zdHI2JyByb3dzPScyJz5cIisgKHR3ZWxmdGhUYWJsZS5jb2wwX3N0cjYgfHwgJycpICtcIjwvdGV4dGFyZWE+XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBzdHlsZT0naGVpZ2h0OiAyM3B4Jz5cXG5cXFxyXG5cdFx0XHRcdFx0XHQ8dGV4dGFyZWEgY29scz0nMjAnIG5hbWU9J3R3ZWxmdGhUYWJsZS5jb2wxX3N0cjYnIHJvd3M9JzInPlwiKyAodHdlbGZ0aFRhYmxlLmNvbDFfc3RyNiB8fCAnJykgK1wiPC90ZXh0YXJlYT5cXG5cXFxyXG5cdFx0XHRcdFx0PC90ZD5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDIzcHgnPlxcblxcXHJcblx0XHRcdFx0XHRcdDx0ZXh0YXJlYSBjb2xzPScyMCcgbmFtZT0ndHdlbGZ0aFRhYmxlLmNvbDJfc3RyNicgcm93cz0nMic+XCIrICh0d2VsZnRoVGFibGUuY29sMl9zdHI2IHx8ICcnKSArXCI8L3RleHRhcmVhPlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdClcclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZXIpIHtcclxuXHR1c2VyID0gdXNlciB8fCB7fTtcclxuXHRyZXR1cm4gKFxyXG5cdFx0XCI8ZGl2IGNsYXNzPSd1c2VyVGVtcGxhdGUnPlxcblxcXHJcblx0XHRcdDx0YWJsZSBhbGlnbj0nY2VudGVyJz5cXG5cXFxyXG5cdFx0XHRcdDxpbnB1dCB0eXBlPSdoaWRkZW4nIG5hbWU9J3BlcnNvbl9pZCcgdmFsdWU9XCIrIHVzZXIuaWQgK1wiIC8+XFxuXFxcclxuXHRcdFx0XHQ8dHI+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDE5M3B4OyB0ZXh0LWFsaWduOmxlZnQ7IHBhZGRpbmctbGVmdDoxMHB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx00KTQmNCeINCh0J7QotCg0KPQlNCd0JjQmtCQOlxcblxcXHJcblx0XHRcdFx0XHQ8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZScgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDI4OXB4Oyc+XCIgKyB1c2VyLm5hbWUgKyBcIjwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfaGVhZF90YWJsZScgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDE5M3B4OyB0ZXh0LWFsaWduOmxlZnQ7IHBhZGRpbmctbGVmdDoxMHB4Oyc+XFxuXFxcclxuXHRcdFx0XHRcdFx00J/QntCU0KDQkNCX0JTQldCb0JXQndCY0JU6XFxuXFxcclxuXHRcdFx0XHRcdDwvdGQ+XFxuXFxcclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz0nY29sb3JfdGV4dF9mb25lX3RhYmxlJyBzdHlsZT0naGVpZ2h0OiA0M3B4Jz5cIiArIHVzZXIuc3ViZGl2aXNpb24gKyBcIjwvdGQ+XFxuXFxcclxuXHRcdFx0XHQ8L3RyPlxcblxcXHJcblx0XHRcdFx0PHRyIGNsYXNzPSdjb2xvcl9oZWFkX3RhYmxlJz5cXG5cXFxyXG5cdFx0XHRcdFx0PHRkIHN0eWxlPSdoZWlnaHQ6IDQzcHg7IHdpZHRoOiAxOTNweDsgdGV4dC1hbGlnbjpsZWZ0OyBwYWRkaW5nLWxlZnQ6MTBweDsnPtCU0J7Qm9CW0J3QntCh0KLQrDo8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDI4OXB4OycgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XCIgKyB1c2VyLnBvc2l0aW9uICsgXCI8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweDsgd2lkdGg6IDE5M3B4OyB0ZXh0LWFsaWduOmxlZnQ7IHBhZGRpbmctbGVmdDoxMHB4Oyc+0KTQmNCeINCg0KPQmtCe0JLQntCU0JjQotCV0JvQrzo8L3RkPlxcblxcXHJcblx0XHRcdFx0XHQ8dGQgc3R5bGU9J2hlaWdodDogNDNweCcgY2xhc3M9J2NvbG9yX3RleHRfZm9uZV90YWJsZSc+XCIgKyB1c2VyLmJvc3NOYW1lICsgXCI8L3RkPlxcblxcXHJcblx0XHRcdFx0PC90cj5cXG5cXFxyXG5cdFx0XHQ8L3RhYmxlPlxcblxcXHJcblx0XHQ8L2Rpdj5cIlxyXG5cdCk7XHJcbn0iLCJ2YXIgQUpBWF9USU1FX09WRVIgPSAxMDAwMDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIGdldFhtbEh0dHA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHhtbEh0dHA7XHJcbiAgICAgICAgdHJ5IHsgeG1sSHR0cCA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFBcIik7IH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0cnkgeyB4bWxIdHRwID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTsgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7IHhtbEh0dHAgPSBmYWxzZTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXhtbEh0dHAgJiYgdHlwZW9mKFhNTEh0dHBSZXF1ZXN0KSAhPSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgeG1sSHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJldHVybiB4bWxIdHRwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZW5kUmVxdWVzdDogZnVuY3Rpb24odXJsLCBjYWxsQmFjaywgaXNDYWNoZSwgZGF0YSwgaXNTeW5jLCByZXF1ZXN0VHlwZSkge1xyXG5cclxuICAgICAgICB2YXIgeG1sSHR0cCA9IHRoaXMuZ2V0WG1sSHR0cCgpO1xyXG4gICAgICAgIHJlcXVlc3RUeXBlID0gcmVxdWVzdFR5cGUgfHwgJ0dFVCc7XHJcbiAgICAgICAgaXNTeW5jID0gaXNTeW5jIHx8IHRydWU7XHJcbiAgICAgICAgdXJsID0gaXNDYWNoZSA9PT0gZmFsc2UgfHwgIWlzQ2FjaGUgPyBlbmNvZGVVUkkodXJsICsgXCImcj1cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMDAwKSkgOiBlbmNvZGVVUkkodXJsKTtcclxuXHJcbiAgICAgICAgeG1sSHR0cC5vcGVuKHJlcXVlc3RUeXBlLCB1cmwsIGlzU3luYyk7XHJcbiAgICAgICAgeG1sSHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh4bWxIdHRwLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgICAgICBpZiAodGltZW91dClcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHhtbEh0dHAuc3RhdHVzID09IDIwMCAmJiBjYWxsQmFjayl7XHJcbiAgICAgICAgICAgICAgIGNhbGxCYWNrKHhtbEh0dHAucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhtbEh0dHAuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhtbEh0dHAuc3RhdHVzVGV4dCB8fCBcIkFqYXggcmVxdWVzdCBlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeG1sSHR0cC5zZW5kKGRhdGEgfHwgbnVsbCk7XHJcblxyXG4gICAgICAgIGlmIChpc1N5bmMpe1xyXG4gICAgICAgICAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7IFxyXG4gICAgICAgICAgICAgICAgeG1sSHR0cC5hYm9ydCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBamF4IHJlcXVlc3QgdGltZSBvdmVyXCIpO1xyXG4gICAgICAgICAgICB9LCBBSkFYX1RJTUVfT1ZFUik7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICB9XHJcbn0gICAgIFxyXG4iLCIvKlxyXG4gICAgICBqc29uX3BhcnNlLmpzXHJcbiAgICAgIDIwMTUtMDUtMDJcclxuICAgICAgUHVibGljIERvbWFpbi5cclxuICAgICAgTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxyXG4gICAgICBUaGlzIGZpbGUgY3JlYXRlcyBhIGpzb25fcGFyc2UgZnVuY3Rpb24uXHJcbiAgICAgICAgICBqc29uX3BhcnNlKHRleHQsIHJldml2ZXIpXHJcbiAgICAgICAgICAgICAgVGhpcyBtZXRob2QgcGFyc2VzIGEgSlNPTiB0ZXh0IHRvIHByb2R1Y2UgYW4gb2JqZWN0IG9yIGFycmF5LlxyXG4gICAgICAgICAgICAgIEl0IGNhbiB0aHJvdyBhIFN5bnRheEVycm9yIGV4Y2VwdGlvbi5cclxuICAgICAgICAgICAgICBUaGUgb3B0aW9uYWwgcmV2aXZlciBwYXJhbWV0ZXIgaXMgYSBmdW5jdGlvbiB0aGF0IGNhbiBmaWx0ZXIgYW5kXHJcbiAgICAgICAgICAgICAgdHJhbnNmb3JtIHRoZSByZXN1bHRzLiBJdCByZWNlaXZlcyBlYWNoIG9mIHRoZSBrZXlzIGFuZCB2YWx1ZXMsXHJcbiAgICAgICAgICAgICAgYW5kIGl0cyByZXR1cm4gdmFsdWUgaXMgdXNlZCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCB2YWx1ZS5cclxuICAgICAgICAgICAgICBJZiBpdCByZXR1cm5zIHdoYXQgaXQgcmVjZWl2ZWQsIHRoZW4gdGhlIHN0cnVjdHVyZSBpcyBub3QgbW9kaWZpZWQuXHJcbiAgICAgICAgICAgICAgSWYgaXQgcmV0dXJucyB1bmRlZmluZWQgdGhlbiB0aGUgbWVtYmVyIGlzIGRlbGV0ZWQuXHJcbiAgICAgICAgICAgICAgRXhhbXBsZTpcclxuICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgdGV4dC4gVmFsdWVzIHRoYXQgbG9vayBsaWtlIElTTyBkYXRlIHN0cmluZ3Mgd2lsbFxyXG4gICAgICAgICAgICAgIC8vIGJlIGNvbnZlcnRlZCB0byBEYXRlIG9iamVjdHMuXHJcbiAgICAgICAgICAgICAgbXlEYXRhID0ganNvbl9wYXJzZSh0ZXh0LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgYTtcclxuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGEgPVxyXG4gIC9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopPylaJC8uZXhlYyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygrYVsxXSwgK2FbMl0gLSAxLCArYVszXSwgK2FbNF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICthWzVdLCArYVs2XSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgVGhpcyBpcyBhIHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbi4gWW91IGFyZSBmcmVlIHRvIGNvcHksIG1vZGlmeSwgb3JcclxuICAgICAgcmVkaXN0cmlidXRlLlxyXG4gICAgICBUaGlzIGNvZGUgc2hvdWxkIGJlIG1pbmlmaWVkIGJlZm9yZSBkZXBsb3ltZW50LlxyXG4gICAgICBTZWUgaHR0cDovL2phdmFzY3JpcHQuY3JvY2tmb3JkLmNvbS9qc21pbi5odG1sXHJcbiAgICAgIFVTRSBZT1VSIE9XTiBDT1BZLiBJVCBJUyBFWFRSRU1FTFkgVU5XSVNFIFRPIExPQUQgQ09ERSBGUk9NIFNFUlZFUlMgWU9VIERPXHJcbiAgICAgIE5PVCBDT05UUk9MLlxyXG4gICovXHJcblxyXG4gIC8qanNsaW50IGZvciAqL1xyXG5cclxuICAvKnByb3BlcnR5IFxyXG4gICAgICBhdCwgYiwgY2FsbCwgY2hhckF0LCBmLCBmcm9tQ2hhckNvZGUsIGhhc093blByb3BlcnR5LCBtZXNzYWdlLCBuLCBuYW1lLCBcclxuICAgICAgcHJvdG90eXBlLCBwdXNoLCByLCB0LCB0ZXh0XHJcbiAgKi9cclxuXHJcbiAgdmFyIGpzb25fcGFyc2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRoYXQgY2FuIHBhcnNlIGEgSlNPTiB0ZXh0LCBwcm9kdWNpbmcgYSBKYXZhU2NyaXB0XHJcbiAgLy8gZGF0YSBzdHJ1Y3R1cmUuIEl0IGlzIGEgc2ltcGxlLCByZWN1cnNpdmUgZGVzY2VudCBwYXJzZXIuIEl0IGRvZXMgbm90IHVzZVxyXG4gIC8vIGV2YWwgb3IgcmVndWxhciBleHByZXNzaW9ucywgc28gaXQgY2FuIGJlIHVzZWQgYXMgYSBtb2RlbCBmb3IgaW1wbGVtZW50aW5nXHJcbiAgLy8gYSBKU09OIHBhcnNlciBpbiBvdGhlciBsYW5ndWFnZXMuXHJcblxyXG4gIC8vIFdlIGFyZSBkZWZpbmluZyB0aGUgZnVuY3Rpb24gaW5zaWRlIG9mIGFub3RoZXIgZnVuY3Rpb24gdG8gYXZvaWQgY3JlYXRpbmdcclxuICAvLyBnbG9iYWwgdmFyaWFibGVzLlxyXG5cclxuICAgICAgdmFyIGF0LCAgICAgLy8gVGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IGNoYXJhY3RlclxyXG4gICAgICAgICAgY2gsICAgICAvLyBUaGUgY3VycmVudCBjaGFyYWN0ZXJcclxuICAgICAgICAgIGVzY2FwZWUgPSB7XHJcbiAgICAgICAgICAgICAgJ1wiJzogJ1wiJyxcclxuICAgICAgICAgICAgICAnXFxcXCc6ICdcXFxcJyxcclxuICAgICAgICAgICAgICAnLyc6ICcvJyxcclxuICAgICAgICAgICAgICBiOiAnXFxiJyxcclxuICAgICAgICAgICAgICBmOiAnXFxmJyxcclxuICAgICAgICAgICAgICBuOiAnXFxuJyxcclxuICAgICAgICAgICAgICByOiAnXFxyJyxcclxuICAgICAgICAgICAgICB0OiAnXFx0J1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRleHQsXHJcblxyXG4gICAgICAgICAgZXJyb3IgPSBmdW5jdGlvbiAobSkge1xyXG5cclxuICAvLyBDYWxsIGVycm9yIHdoZW4gc29tZXRoaW5nIGlzIHdyb25nLlxyXG5cclxuICAgICAgICAgICAgICB0aHJvdyB7XHJcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdTeW50YXhFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG0sXHJcbiAgICAgICAgICAgICAgICAgIGF0OiBhdCxcclxuICAgICAgICAgICAgICAgICAgdGV4dDogdGV4dFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiAoYykge1xyXG5cclxuICAvLyBJZiBhIGMgcGFyYW1ldGVyIGlzIHByb3ZpZGVkLCB2ZXJpZnkgdGhhdCBpdCBtYXRjaGVzIHRoZSBjdXJyZW50IGNoYXJhY3Rlci5cclxuXHJcbiAgICAgICAgICAgICAgaWYgKGMgJiYgYyAhPT0gY2gpIHtcclxuICAgICAgICAgICAgICAgICAgZXJyb3IoXCJFeHBlY3RlZCAnXCIgKyBjICsgXCInIGluc3RlYWQgb2YgJ1wiICsgY2ggKyBcIidcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAvLyBHZXQgdGhlIG5leHQgY2hhcmFjdGVyLiBXaGVuIHRoZXJlIGFyZSBubyBtb3JlIGNoYXJhY3RlcnMsXHJcbiAgLy8gcmV0dXJuIHRoZSBlbXB0eSBzdHJpbmcuXHJcblxyXG4gICAgICAgICAgICAgIGNoID0gdGV4dC5jaGFyQXQoYXQpO1xyXG4gICAgICAgICAgICAgIGF0ICs9IDE7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGNoO1xyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICBudW1iZXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIC8vIFBhcnNlIGEgbnVtYmVyIHZhbHVlLlxyXG5cclxuICAgICAgICAgICAgICB2YXIgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICBzdHJpbmcgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgaWYgKGNoID09PSAnLScpIHtcclxuICAgICAgICAgICAgICAgICAgc3RyaW5nID0gJy0nO1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCctJyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHdoaWxlIChjaCA+PSAnMCcgJiYgY2ggPD0gJzknKSB7XHJcbiAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAoY2ggPT09ICcuJykge1xyXG4gICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gJy4nO1xyXG4gICAgICAgICAgICAgICAgICB3aGlsZSAobmV4dCgpICYmIGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAoY2ggPT09ICdlJyB8fCBjaCA9PT0gJ0UnKSB7XHJcbiAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICctJyB8fCBjaCA9PT0gJysnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcclxuICAgICAgICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBudW1iZXIgPSArc3RyaW5nO1xyXG4gICAgICAgICAgICAgIGlmICghaXNGaW5pdGUobnVtYmVyKSkge1xyXG4gICAgICAgICAgICAgICAgICBlcnJvcihcIkJhZCBudW1iZXJcIik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bWJlcjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIHN0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy8gUGFyc2UgYSBzdHJpbmcgdmFsdWUuXHJcblxyXG4gICAgICAgICAgICAgIHZhciBoZXgsXHJcbiAgICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICAgIHN0cmluZyA9ICcnLFxyXG4gICAgICAgICAgICAgICAgICB1ZmZmZjtcclxuXHJcbiAgLy8gV2hlbiBwYXJzaW5nIGZvciBzdHJpbmcgdmFsdWVzLCB3ZSBtdXN0IGxvb2sgZm9yIFwiIGFuZCBcXCBjaGFyYWN0ZXJzLlxyXG5cclxuICAgICAgICAgICAgICBpZiAoY2ggPT09ICdcIicpIHtcclxuICAgICAgICAgICAgICAgICAgd2hpbGUgKG5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSAnXCInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICdcXFxcJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICd1Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZmZmZiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhleCA9IHBhcnNlSW50KG5leHQoKSwgMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShoZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZmZmZiA9IHVmZmZmICogMTYgKyBoZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodWZmZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVzY2FwZWVbY2hdID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gZXNjYXBlZVtjaF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZXJyb3IoXCJCYWQgc3RyaW5nXCIpO1xyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICB3aGl0ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy8gU2tpcCB3aGl0ZXNwYWNlLlxyXG5cclxuICAgICAgICAgICAgICB3aGlsZSAoY2ggJiYgY2ggPD0gJyAnKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIHdvcmQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIC8vIHRydWUsIGZhbHNlLCBvciBudWxsLlxyXG5cclxuICAgICAgICAgICAgICBzd2l0Y2ggKGNoKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSAndCc6XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ3QnKTtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgncicpO1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCd1Jyk7XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ2UnKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgY2FzZSAnZic6XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ2YnKTtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgnYScpO1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCdsJyk7XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ3MnKTtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgnZScpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgY2FzZSAnbic6XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ24nKTtcclxuICAgICAgICAgICAgICAgICAgbmV4dCgndScpO1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCdsJyk7XHJcbiAgICAgICAgICAgICAgICAgIG5leHQoJ2wnKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVycm9yKFwiVW5leHBlY3RlZCAnXCIgKyBjaCArIFwiJ1wiKTtcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgdmFsdWUsICAvLyBQbGFjZSBob2xkZXIgZm9yIHRoZSB2YWx1ZSBmdW5jdGlvbi5cclxuXHJcbiAgICAgICAgICBhcnJheSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy8gUGFyc2UgYW4gYXJyYXkgdmFsdWUuXHJcblxyXG4gICAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoY2ggPT09ICdbJykge1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCdbJyk7XHJcbiAgICAgICAgICAgICAgICAgIHdoaXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0KCddJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7ICAgLy8gZW1wdHkgYXJyYXlcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB3aGlsZSAoY2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2godmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3aGl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSAnXScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0KCddJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgbmV4dCgnLCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgd2hpdGUoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlcnJvcihcIkJhZCBhcnJheVwiKTtcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgb2JqZWN0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAvLyBQYXJzZSBhbiBvYmplY3QgdmFsdWUuXHJcblxyXG4gICAgICAgICAgICAgIHZhciBrZXksXHJcbiAgICAgICAgICAgICAgICAgIG9iamVjdCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICBpZiAoY2ggPT09ICd7Jykge1xyXG4gICAgICAgICAgICAgICAgICBuZXh0KCd7Jyk7XHJcbiAgICAgICAgICAgICAgICAgIHdoaXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ30nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0KCd9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0OyAgIC8vIGVtcHR5IG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAga2V5ID0gc3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3aGl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgbmV4dCgnOicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKCdEdXBsaWNhdGUga2V5IFwiJyArIGtleSArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgd2hpdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ30nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCgnfScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0KCcsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3aGl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVycm9yKFwiQmFkIG9iamVjdFwiKTtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICB2YWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy8gUGFyc2UgYSBKU09OIHZhbHVlLiBJdCBjb3VsZCBiZSBhbiBvYmplY3QsIGFuIGFycmF5LCBhIHN0cmluZywgYSBudW1iZXIsXHJcbiAgLy8gb3IgYSB3b3JkLlxyXG5cclxuICAgICAgICAgIHdoaXRlKCk7XHJcbiAgICAgICAgICBzd2l0Y2ggKGNoKSB7XHJcbiAgICAgICAgICBjYXNlICd7JzpcclxuICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0KCk7XHJcbiAgICAgICAgICBjYXNlICdbJzpcclxuICAgICAgICAgICAgICByZXR1cm4gYXJyYXkoKTtcclxuICAgICAgICAgIGNhc2UgJ1wiJzpcclxuICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nKCk7XHJcbiAgICAgICAgICBjYXNlICctJzpcclxuICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyKCk7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIHJldHVybiBjaCA+PSAnMCcgJiYgY2ggPD0gJzknIFxyXG4gICAgICAgICAgICAgICAgICA/IG51bWJlcigpIFxyXG4gICAgICAgICAgICAgICAgICA6IHdvcmQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgLy8gUmV0dXJuIHRoZSBqc29uX3BhcnNlIGZ1bmN0aW9uLiBJdCB3aWxsIGhhdmUgYWNjZXNzIHRvIGFsbCBvZiB0aGUgYWJvdmVcclxuICAvLyBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlcy5cclxuXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlLCByZXZpdmVyKSB7XHJcbiAgICAgICAgICB2YXIgcmVzdWx0O1xyXG5cclxuICAgICAgICAgIHRleHQgPSBzb3VyY2U7XHJcbiAgICAgICAgICBhdCA9IDA7XHJcbiAgICAgICAgICBjaCA9ICcgJztcclxuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlKCk7XHJcbiAgICAgICAgICB3aGl0ZSgpO1xyXG4gICAgICAgICAgaWYgKGNoKSB7XHJcbiAgICAgICAgICAgICAgZXJyb3IoXCJTeW50YXggZXJyb3JcIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gIC8vIElmIHRoZXJlIGlzIGEgcmV2aXZlciBmdW5jdGlvbiwgd2UgcmVjdXJzaXZlbHkgd2FsayB0aGUgbmV3IHN0cnVjdHVyZSxcclxuICAvLyBwYXNzaW5nIGVhY2ggbmFtZS92YWx1ZSBwYWlyIHRvIHRoZSByZXZpdmVyIGZ1bmN0aW9uIGZvciBwb3NzaWJsZVxyXG4gIC8vIHRyYW5zZm9ybWF0aW9uLCBzdGFydGluZyB3aXRoIGEgdGVtcG9yYXJ5IHJvb3Qgb2JqZWN0IHRoYXQgaG9sZHMgdGhlIHJlc3VsdFxyXG4gIC8vIGluIGFuIGVtcHR5IGtleS4gSWYgdGhlcmUgaXMgbm90IGEgcmV2aXZlciBmdW5jdGlvbiwgd2Ugc2ltcGx5IHJldHVybiB0aGVcclxuICAvLyByZXN1bHQuXHJcblxyXG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXZpdmVyID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgICAgPyAoZnVuY3Rpb24gd2Fsayhob2xkZXIsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgaywgdiwgdmFsdWUgPSBob2xkZXJba2V5XTtcclxuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGZvciAoayBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSB3YWxrKHZhbHVlLCBrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVba10gPSB2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXZpdmVyLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgICB9KHsnJzogcmVzdWx0fSwgJycpKVxyXG4gICAgICAgICAgICAgIDogcmVzdWx0O1xyXG4gICAgICB9O1xyXG4gIH0oKSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGpzb25fcGFyc2U7IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y3JlYXRlU2VsZWN0OiBmdW5jdGlvbiAodmFsdWVzLCBzZWxlY3RlZFZhbHVlLCBuYW1lKSB7XHJcblx0XHR2YXIgc2VsZWN0ID0gXCI8c2VsZWN0IG5hbWU9XCIrIG5hbWUgK1wiIHN0eWxlPSd3aWR0aDogNDVweCc+XCI7XHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdHZhciBvcHRpb24gPSB2YWx1ZXNbaV0gPT0gc2VsZWN0ZWRWYWx1ZSA/IFwiPG9wdGlvbiBzZWxlY3RlZD5cIiArIHZhbHVlc1tpXSArIFwiPC9vcHRpb24+XCIgOiBcIjxvcHRpb24+XCIgKyB2YWx1ZXNbaV0gKyBcIjwvb3B0aW9uPlwiO1xyXG5cdFx0XHRzZWxlY3QgKz0gb3B0aW9uO1xyXG5cdFx0fTtcclxuXHRcdHJldHVybiBzZWxlY3QuY29uY2F0KFwiPC9zZWxlY3Q+XCIpO1xyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZUNoZWNrQm94OiBmdW5jdGlvbihpc0NoZWNrZWQsIG5hbWUpe1xyXG5cdFx0cmV0dXJuIGlzQ2hlY2tlZCA9PT0gdHJ1ZSA/IFwiPGlucHV0IG5hbWU9XCIrbmFtZStcIiB0eXBlPSdjaGVja2JveCcgY2hlY2tlZC8+XCIgOiBcIjxpbnB1dCBuYW1lPVwiK25hbWUrXCIgdHlwZT0nY2hlY2tib3gnIC8+XCJcclxuXHR9XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRcclxuXHRzdHJCb29sVG9Cb29sOiBmdW5jdGlvbiAoYm9vbFN0cikge1xyXG5cdFx0aWYgKGJvb2xTdHIgPT09IHVuZGVmaW5lZCB8fCBib29sU3RyID09PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcblx0XHRyZXR1cm4gKGJvb2xTdHIgPT09ICcwJ3x8IGJvb2xTdHIgPT09ICdmYWxzZScpID8gZmFsc2UgOiB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdGdldFVybFBhcmFtczogZnVuY3Rpb24odXJsLCBwYXJhbSl7XHJcblx0XHRpZiAoIXVybCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0dmFyIHZhcnMgPSB7fTtcclxuXHQgICAgdXJsLnJlcGxhY2UoIFxyXG5cdFx0XHQvWz8mXSsoW149Jl0rKT0/KFteJl0qKT8vZ2ksXHJcblx0XHRcdGZ1bmN0aW9uKCBtLCBrZXksIHZhbHVlICkge1xyXG5cdFx0XHRcdHZhcnNba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6ICcnO1xyXG5cdFx0XHR9XHJcblx0ICAgICk7XHJcblxyXG5cdCAgICBpZiAocGFyYW0pIHJldHVybiB2YXJzW3BhcmFtXTtcclxuXHQgICAgcmV0dXJuIHZhcnM7XHJcblx0fVxyXG59IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iLCIvLyEgbW9tZW50LmpzXG4vLyEgdmVyc2lvbiA6IDIuMTEuMlxuLy8hIGF1dGhvcnMgOiBUaW0gV29vZCwgSXNrcmVuIENoZXJuZXYsIE1vbWVudC5qcyBjb250cmlidXRvcnNcbi8vISBsaWNlbnNlIDogTUlUXG4vLyEgbW9tZW50anMuY29tXG5cbjsoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIGdsb2JhbC5tb21lbnQgPSBmYWN0b3J5KClcbn0odGhpcywgZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgaG9va0NhbGxiYWNrO1xuXG4gICAgZnVuY3Rpb24gdXRpbHNfaG9va3NfX2hvb2tzICgpIHtcbiAgICAgICAgcmV0dXJuIGhvb2tDYWxsYmFjay5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgaXMgZG9uZSB0byByZWdpc3RlciB0aGUgbWV0aG9kIGNhbGxlZCB3aXRoIG1vbWVudCgpXG4gICAgLy8gd2l0aG91dCBjcmVhdGluZyBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXG4gICAgZnVuY3Rpb24gc2V0SG9va0NhbGxiYWNrIChjYWxsYmFjaykge1xuICAgICAgICBob29rQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FycmF5KGlucHV0KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF0ZShpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBEYXRlIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IERhdGVdJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmbikge1xuICAgICAgICB2YXIgcmVzID0gW10sIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKGZuKGFycltpXSwgaSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzT3duUHJvcChhLCBiKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSwgYik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kKGEsIGIpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBiKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChiLCBpKSkge1xuICAgICAgICAgICAgICAgIGFbaV0gPSBiW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc093blByb3AoYiwgJ3RvU3RyaW5nJykpIHtcbiAgICAgICAgICAgIGEudG9TdHJpbmcgPSBiLnRvU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc093blByb3AoYiwgJ3ZhbHVlT2YnKSkge1xuICAgICAgICAgICAgYS52YWx1ZU9mID0gYi52YWx1ZU9mO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlX3V0Y19fY3JlYXRlVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgdHJ1ZSkudXRjKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmdGbGFncygpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBkZWVwIGNsb25lIHRoaXMgb2JqZWN0LlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZW1wdHkgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICB1bnVzZWRUb2tlbnMgICAgOiBbXSxcbiAgICAgICAgICAgIHVudXNlZElucHV0ICAgICA6IFtdLFxuICAgICAgICAgICAgb3ZlcmZsb3cgICAgICAgIDogLTIsXG4gICAgICAgICAgICBjaGFyc0xlZnRPdmVyICAgOiAwLFxuICAgICAgICAgICAgbnVsbElucHV0ICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICBpbnZhbGlkTW9udGggICAgOiBudWxsLFxuICAgICAgICAgICAgaW52YWxpZEZvcm1hdCAgIDogZmFsc2UsXG4gICAgICAgICAgICB1c2VySW52YWxpZGF0ZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIGlzbyAgICAgICAgICAgICA6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UGFyc2luZ0ZsYWdzKG0pIHtcbiAgICAgICAgaWYgKG0uX3BmID09IG51bGwpIHtcbiAgICAgICAgICAgIG0uX3BmID0gZGVmYXVsdFBhcnNpbmdGbGFncygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLl9wZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZF9faXNWYWxpZChtKSB7XG4gICAgICAgIGlmIChtLl9pc1ZhbGlkID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBmbGFncyA9IGdldFBhcnNpbmdGbGFncyhtKTtcbiAgICAgICAgICAgIG0uX2lzVmFsaWQgPSAhaXNOYU4obS5fZC5nZXRUaW1lKCkpICYmXG4gICAgICAgICAgICAgICAgZmxhZ3Mub3ZlcmZsb3cgPCAwICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLmVtcHR5ICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRNb250aCAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkV2Vla2RheSAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5udWxsSW5wdXQgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZEZvcm1hdCAmJlxuICAgICAgICAgICAgICAgICFmbGFncy51c2VySW52YWxpZGF0ZWQ7XG5cbiAgICAgICAgICAgIGlmIChtLl9zdHJpY3QpIHtcbiAgICAgICAgICAgICAgICBtLl9pc1ZhbGlkID0gbS5faXNWYWxpZCAmJlxuICAgICAgICAgICAgICAgICAgICBmbGFncy5jaGFyc0xlZnRPdmVyID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLnVudXNlZFRva2Vucy5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MuYmlnSG91ciA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLl9pc1ZhbGlkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkX19jcmVhdGVJbnZhbGlkIChmbGFncykge1xuICAgICAgICB2YXIgbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhOYU4pO1xuICAgICAgICBpZiAoZmxhZ3MgIT0gbnVsbCkge1xuICAgICAgICAgICAgZXh0ZW5kKGdldFBhcnNpbmdGbGFncyhtKSwgZmxhZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKG0pLnVzZXJJbnZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1VuZGVmaW5lZChpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgPT09IHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyBQbHVnaW5zIHRoYXQgYWRkIHByb3BlcnRpZXMgc2hvdWxkIGFsc28gYWRkIHRoZSBrZXkgaGVyZSAobnVsbCB2YWx1ZSksXG4gICAgLy8gc28gd2UgY2FuIHByb3Blcmx5IGNsb25lIG91cnNlbHZlcy5cbiAgICB2YXIgbW9tZW50UHJvcGVydGllcyA9IHV0aWxzX2hvb2tzX19ob29rcy5tb21lbnRQcm9wZXJ0aWVzID0gW107XG5cbiAgICBmdW5jdGlvbiBjb3B5Q29uZmlnKHRvLCBmcm9tKSB7XG4gICAgICAgIHZhciBpLCBwcm9wLCB2YWw7XG5cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc0FNb21lbnRPYmplY3QpKSB7XG4gICAgICAgICAgICB0by5faXNBTW9tZW50T2JqZWN0ID0gZnJvbS5faXNBTW9tZW50T2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faSkpIHtcbiAgICAgICAgICAgIHRvLl9pID0gZnJvbS5faTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2YpKSB7XG4gICAgICAgICAgICB0by5fZiA9IGZyb20uX2Y7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9sKSkge1xuICAgICAgICAgICAgdG8uX2wgPSBmcm9tLl9sO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fc3RyaWN0KSkge1xuICAgICAgICAgICAgdG8uX3N0cmljdCA9IGZyb20uX3N0cmljdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3R6bSkpIHtcbiAgICAgICAgICAgIHRvLl90em0gPSBmcm9tLl90em07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc1VUQykpIHtcbiAgICAgICAgICAgIHRvLl9pc1VUQyA9IGZyb20uX2lzVVRDO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fb2Zmc2V0KSkge1xuICAgICAgICAgICAgdG8uX29mZnNldCA9IGZyb20uX29mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3BmKSkge1xuICAgICAgICAgICAgdG8uX3BmID0gZ2V0UGFyc2luZ0ZsYWdzKGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbG9jYWxlKSkge1xuICAgICAgICAgICAgdG8uX2xvY2FsZSA9IGZyb20uX2xvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb21lbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoaSBpbiBtb21lbnRQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgcHJvcCA9IG1vbWVudFByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICAgICAgdmFsID0gZnJvbVtwcm9wXTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvO1xuICAgIH1cblxuICAgIHZhciB1cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XG5cbiAgICAvLyBNb21lbnQgcHJvdG90eXBlIG9iamVjdFxuICAgIGZ1bmN0aW9uIE1vbWVudChjb25maWcpIHtcbiAgICAgICAgY29weUNvbmZpZyh0aGlzLCBjb25maWcpO1xuICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoY29uZmlnLl9kICE9IG51bGwgPyBjb25maWcuX2QuZ2V0VGltZSgpIDogTmFOKTtcbiAgICAgICAgLy8gUHJldmVudCBpbmZpbml0ZSBsb29wIGluIGNhc2UgdXBkYXRlT2Zmc2V0IGNyZWF0ZXMgbmV3IG1vbWVudFxuICAgICAgICAvLyBvYmplY3RzLlxuICAgICAgICBpZiAodXBkYXRlSW5Qcm9ncmVzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzKTtcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTW9tZW50IChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIE1vbWVudCB8fCAob2JqICE9IG51bGwgJiYgb2JqLl9pc0FNb21lbnRPYmplY3QgIT0gbnVsbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWJzRmxvb3IgKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSW50KGFyZ3VtZW50Rm9yQ29lcmNpb24pIHtcbiAgICAgICAgdmFyIGNvZXJjZWROdW1iZXIgPSArYXJndW1lbnRGb3JDb2VyY2lvbixcbiAgICAgICAgICAgIHZhbHVlID0gMDtcblxuICAgICAgICBpZiAoY29lcmNlZE51bWJlciAhPT0gMCAmJiBpc0Zpbml0ZShjb2VyY2VkTnVtYmVyKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBhYnNGbG9vcihjb2VyY2VkTnVtYmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBjb21wYXJlIHR3byBhcnJheXMsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRpZmZlcmVuY2VzXG4gICAgZnVuY3Rpb24gY29tcGFyZUFycmF5cyhhcnJheTEsIGFycmF5MiwgZG9udENvbnZlcnQpIHtcbiAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKGFycmF5MS5sZW5ndGgsIGFycmF5Mi5sZW5ndGgpLFxuICAgICAgICAgICAgbGVuZ3RoRGlmZiA9IE1hdGguYWJzKGFycmF5MS5sZW5ndGggLSBhcnJheTIubGVuZ3RoKSxcbiAgICAgICAgICAgIGRpZmZzID0gMCxcbiAgICAgICAgICAgIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKChkb250Q29udmVydCAmJiBhcnJheTFbaV0gIT09IGFycmF5MltpXSkgfHxcbiAgICAgICAgICAgICAgICAoIWRvbnRDb252ZXJ0ICYmIHRvSW50KGFycmF5MVtpXSkgIT09IHRvSW50KGFycmF5MltpXSkpKSB7XG4gICAgICAgICAgICAgICAgZGlmZnMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlmZnMgKyBsZW5ndGhEaWZmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIExvY2FsZSgpIHtcbiAgICB9XG5cbiAgICAvLyBpbnRlcm5hbCBzdG9yYWdlIGZvciBsb2NhbGUgY29uZmlnIGZpbGVzXG4gICAgdmFyIGxvY2FsZXMgPSB7fTtcbiAgICB2YXIgZ2xvYmFsTG9jYWxlO1xuXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplTG9jYWxlKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5ID8ga2V5LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnXycsICctJykgOiBrZXk7XG4gICAgfVxuXG4gICAgLy8gcGljayB0aGUgbG9jYWxlIGZyb20gdGhlIGFycmF5XG4gICAgLy8gdHJ5IFsnZW4tYXUnLCAnZW4tZ2InXSBhcyAnZW4tYXUnLCAnZW4tZ2InLCAnZW4nLCBhcyBpbiBtb3ZlIHRocm91Z2ggdGhlIGxpc3QgdHJ5aW5nIGVhY2hcbiAgICAvLyBzdWJzdHJpbmcgZnJvbSBtb3N0IHNwZWNpZmljIHRvIGxlYXN0LCBidXQgbW92ZSB0byB0aGUgbmV4dCBhcnJheSBpdGVtIGlmIGl0J3MgYSBtb3JlIHNwZWNpZmljIHZhcmlhbnQgdGhhbiB0aGUgY3VycmVudCByb290XG4gICAgZnVuY3Rpb24gY2hvb3NlTG9jYWxlKG5hbWVzKSB7XG4gICAgICAgIHZhciBpID0gMCwgaiwgbmV4dCwgbG9jYWxlLCBzcGxpdDtcblxuICAgICAgICB3aGlsZSAoaSA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc3BsaXQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaV0pLnNwbGl0KCctJyk7XG4gICAgICAgICAgICBqID0gc3BsaXQubGVuZ3RoO1xuICAgICAgICAgICAgbmV4dCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpICsgMV0pO1xuICAgICAgICAgICAgbmV4dCA9IG5leHQgPyBuZXh0LnNwbGl0KCctJykgOiBudWxsO1xuICAgICAgICAgICAgd2hpbGUgKGogPiAwKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShzcGxpdC5zbGljZSgwLCBqKS5qb2luKCctJykpO1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5leHQgJiYgbmV4dC5sZW5ndGggPj0gaiAmJiBjb21wYXJlQXJyYXlzKHNwbGl0LCBuZXh0LCB0cnVlKSA+PSBqIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvL3RoZSBuZXh0IGFycmF5IGl0ZW0gaXMgYmV0dGVyIHRoYW4gYSBzaGFsbG93ZXIgc3Vic3RyaW5nIG9mIHRoaXMgb25lXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZExvY2FsZShuYW1lKSB7XG4gICAgICAgIHZhciBvbGRMb2NhbGUgPSBudWxsO1xuICAgICAgICAvLyBUT0RPOiBGaW5kIGEgYmV0dGVyIHdheSB0byByZWdpc3RlciBhbmQgbG9hZCBhbGwgdGhlIGxvY2FsZXMgaW4gTm9kZVxuICAgICAgICBpZiAoIWxvY2FsZXNbbmFtZV0gJiYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSAmJlxuICAgICAgICAgICAgICAgIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBvbGRMb2NhbGUgPSBnbG9iYWxMb2NhbGUuX2FiYnI7XG4gICAgICAgICAgICAgICAgcmVxdWlyZSgnLi9sb2NhbGUvJyArIG5hbWUpO1xuICAgICAgICAgICAgICAgIC8vIGJlY2F1c2UgZGVmaW5lTG9jYWxlIGN1cnJlbnRseSBhbHNvIHNldHMgdGhlIGdsb2JhbCBsb2NhbGUsIHdlXG4gICAgICAgICAgICAgICAgLy8gd2FudCB0byB1bmRvIHRoYXQgZm9yIGxhenkgbG9hZGVkIGxvY2FsZXNcbiAgICAgICAgICAgICAgICBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKG9sZExvY2FsZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgbG9hZCBsb2NhbGUgYW5kIHRoZW4gc2V0IHRoZSBnbG9iYWwgbG9jYWxlLiAgSWZcbiAgICAvLyBubyBhcmd1bWVudHMgYXJlIHBhc3NlZCBpbiwgaXQgd2lsbCBzaW1wbHkgcmV0dXJuIHRoZSBjdXJyZW50IGdsb2JhbFxuICAgIC8vIGxvY2FsZSBrZXkuXG4gICAgZnVuY3Rpb24gbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZSAoa2V5LCB2YWx1ZXMpIHtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZXMpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkZWZpbmVMb2NhbGUoa2V5LCB2YWx1ZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vIG1vbWVudC5kdXJhdGlvbi5fbG9jYWxlID0gbW9tZW50Ll9sb2NhbGUgPSBkYXRhO1xuICAgICAgICAgICAgICAgIGdsb2JhbExvY2FsZSA9IGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2xvYmFsTG9jYWxlLl9hYmJyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlZmluZUxvY2FsZSAobmFtZSwgdmFsdWVzKSB7XG4gICAgICAgIGlmICh2YWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhbHVlcy5hYmJyID0gbmFtZTtcbiAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0gPSBsb2NhbGVzW25hbWVdIHx8IG5ldyBMb2NhbGUoKTtcbiAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0uc2V0KHZhbHVlcyk7XG5cbiAgICAgICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxuICAgICAgICAgICAgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZShuYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB1c2VmdWwgZm9yIHRlc3RpbmdcbiAgICAgICAgICAgIGRlbGV0ZSBsb2NhbGVzW25hbWVdO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGxvY2FsZSBkYXRhXG4gICAgZnVuY3Rpb24gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSAoa2V5KSB7XG4gICAgICAgIHZhciBsb2NhbGU7XG5cbiAgICAgICAgaWYgKGtleSAmJiBrZXkuX2xvY2FsZSAmJiBrZXkuX2xvY2FsZS5fYWJicikge1xuICAgICAgICAgICAga2V5ID0ga2V5Ll9sb2NhbGUuX2FiYnI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNBcnJheShrZXkpKSB7XG4gICAgICAgICAgICAvL3Nob3J0LWNpcmN1aXQgZXZlcnl0aGluZyBlbHNlXG4gICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKGtleSk7XG4gICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleSA9IFtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNob29zZUxvY2FsZShrZXkpO1xuICAgIH1cblxuICAgIHZhciBhbGlhc2VzID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRVbml0QWxpYXMgKHVuaXQsIHNob3J0aGFuZCkge1xuICAgICAgICB2YXIgbG93ZXJDYXNlID0gdW5pdC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBhbGlhc2VzW2xvd2VyQ2FzZV0gPSBhbGlhc2VzW2xvd2VyQ2FzZSArICdzJ10gPSBhbGlhc2VzW3Nob3J0aGFuZF0gPSB1bml0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVVuaXRzKHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdW5pdHMgPT09ICdzdHJpbmcnID8gYWxpYXNlc1t1bml0c10gfHwgYWxpYXNlc1t1bml0cy50b0xvd2VyQ2FzZSgpXSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVPYmplY3RVbml0cyhpbnB1dE9iamVjdCkge1xuICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0ID0ge30sXG4gICAgICAgICAgICBub3JtYWxpemVkUHJvcCxcbiAgICAgICAgICAgIHByb3A7XG5cbiAgICAgICAgZm9yIChwcm9wIGluIGlucHV0T2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChpbnB1dE9iamVjdCwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkUHJvcCA9IG5vcm1hbGl6ZVVuaXRzKHByb3ApO1xuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkUHJvcCkge1xuICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkSW5wdXRbbm9ybWFsaXplZFByb3BdID0gaW5wdXRPYmplY3RbcHJvcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRJbnB1dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0Z1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEZ1bmN0aW9uIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUdldFNldCAodW5pdCwga2VlcFRpbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBnZXRfc2V0X19zZXQodGhpcywgdW5pdCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQodGhpcywga2VlcFRpbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0X3NldF9fZ2V0KHRoaXMsIHVuaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9zZXRfX2dldCAobW9tLCB1bml0KSB7XG4gICAgICAgIHJldHVybiBtb20uaXNWYWxpZCgpID9cbiAgICAgICAgICAgIG1vbS5fZFsnZ2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSgpIDogTmFOO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9zZXRfX3NldCAobW9tLCB1bml0LCB2YWx1ZSkge1xuICAgICAgICBpZiAobW9tLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgbW9tLl9kWydzZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArIHVuaXRdKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldCAodW5pdHMsIHZhbHVlKSB7XG4gICAgICAgIHZhciB1bml0O1xuICAgICAgICBpZiAodHlwZW9mIHVuaXRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yICh1bml0IGluIHVuaXRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQodW5pdCwgdW5pdHNbdW5pdF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzW3VuaXRzXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1t1bml0c10odmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHplcm9GaWxsKG51bWJlciwgdGFyZ2V0TGVuZ3RoLCBmb3JjZVNpZ24pIHtcbiAgICAgICAgdmFyIGFic051bWJlciA9ICcnICsgTWF0aC5hYnMobnVtYmVyKSxcbiAgICAgICAgICAgIHplcm9zVG9GaWxsID0gdGFyZ2V0TGVuZ3RoIC0gYWJzTnVtYmVyLmxlbmd0aCxcbiAgICAgICAgICAgIHNpZ24gPSBudW1iZXIgPj0gMDtcbiAgICAgICAgcmV0dXJuIChzaWduID8gKGZvcmNlU2lnbiA/ICcrJyA6ICcnKSA6ICctJykgK1xuICAgICAgICAgICAgTWF0aC5wb3coMTAsIE1hdGgubWF4KDAsIHplcm9zVG9GaWxsKSkudG9TdHJpbmcoKS5zdWJzdHIoMSkgKyBhYnNOdW1iZXI7XG4gICAgfVxuXG4gICAgdmFyIGZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oW0hoXW1tKHNzKT98TW98TU0/TT9NP3xEb3xERERvfEREP0Q/RD98ZGRkP2Q/fGRvP3x3W298d10/fFdbb3xXXT98UW8/fFlZWVlZWXxZWVlZWXxZWVlZfFlZfGdnKGdnZz8pP3xHRyhHR0c/KT98ZXxFfGF8QXxoaD98SEg/fG1tP3xzcz98U3sxLDl9fHh8WHx6ej98Wlo/fC4pL2c7XG5cbiAgICB2YXIgbG9jYWxGb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KExUU3xMVHxMTD9MP0w/fGx7MSw0fSkvZztcblxuICAgIHZhciBmb3JtYXRGdW5jdGlvbnMgPSB7fTtcblxuICAgIHZhciBmb3JtYXRUb2tlbkZ1bmN0aW9ucyA9IHt9O1xuXG4gICAgLy8gdG9rZW46ICAgICdNJ1xuICAgIC8vIHBhZGRlZDogICBbJ01NJywgMl1cbiAgICAvLyBvcmRpbmFsOiAgJ01vJ1xuICAgIC8vIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7IHRoaXMubW9udGgoKSArIDEgfVxuICAgIGZ1bmN0aW9uIGFkZEZvcm1hdFRva2VuICh0b2tlbiwgcGFkZGVkLCBvcmRpbmFsLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZnVuYyA9IGNhbGxiYWNrO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tjYWxsYmFja10oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0gPSBmdW5jO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWRkZWQpIHtcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3BhZGRlZFswXV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHplcm9GaWxsKGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgcGFkZGVkWzFdLCBwYWRkZWRbMl0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkaW5hbCkge1xuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbb3JkaW5hbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm9yZGluYWwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCB0b2tlbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyhpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQubWF0Y2goL1xcW1tcXHNcXFNdLykpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9eXFxbfFxcXSQvZywgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9cXFxcL2csICcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KSB7XG4gICAgICAgIHZhciBhcnJheSA9IGZvcm1hdC5tYXRjaChmb3JtYXR0aW5nVG9rZW5zKSwgaSwgbGVuZ3RoO1xuXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSBmb3JtYXRUb2tlbkZ1bmN0aW9uc1thcnJheVtpXV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyhhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1vbSkge1xuICAgICAgICAgICAgdmFyIG91dHB1dCA9ICcnO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IGFycmF5W2ldIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBhcnJheVtpXS5jYWxsKG1vbSwgZm9ybWF0KSA6IGFycmF5W2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBmb3JtYXQgZGF0ZSB1c2luZyBuYXRpdmUgZGF0ZSBvYmplY3RcbiAgICBmdW5jdGlvbiBmb3JtYXRNb21lbnQobSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICghbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybWF0ID0gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbS5sb2NhbGVEYXRhKCkpO1xuICAgICAgICBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSA9IGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdIHx8IG1ha2VGb3JtYXRGdW5jdGlvbihmb3JtYXQpO1xuXG4gICAgICAgIHJldHVybiBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XShtKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBhbmRGb3JtYXQoZm9ybWF0LCBsb2NhbGUpIHtcbiAgICAgICAgdmFyIGkgPSA1O1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2VMb25nRGF0ZUZvcm1hdFRva2VucyhpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS5sb25nRGF0ZUZvcm1hdChpbnB1dCkgfHwgaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbEZvcm1hdHRpbmdUb2tlbnMubGFzdEluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPj0gMCAmJiBsb2NhbEZvcm1hdHRpbmdUb2tlbnMudGVzdChmb3JtYXQpKSB7XG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShsb2NhbEZvcm1hdHRpbmdUb2tlbnMsIHJlcGxhY2VMb25nRGF0ZUZvcm1hdFRva2Vucyk7XG4gICAgICAgICAgICBsb2NhbEZvcm1hdHRpbmdUb2tlbnMubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgfVxuXG4gICAgdmFyIG1hdGNoMSAgICAgICAgID0gL1xcZC87ICAgICAgICAgICAgLy8gICAgICAgMCAtIDlcbiAgICB2YXIgbWF0Y2gyICAgICAgICAgPSAvXFxkXFxkLzsgICAgICAgICAgLy8gICAgICAwMCAtIDk5XG4gICAgdmFyIG1hdGNoMyAgICAgICAgID0gL1xcZHszfS87ICAgICAgICAgLy8gICAgIDAwMCAtIDk5OVxuICAgIHZhciBtYXRjaDQgICAgICAgICA9IC9cXGR7NH0vOyAgICAgICAgIC8vICAgIDAwMDAgLSA5OTk5XG4gICAgdmFyIG1hdGNoNiAgICAgICAgID0gL1srLV0/XFxkezZ9LzsgICAgLy8gLTk5OTk5OSAtIDk5OTk5OVxuICAgIHZhciBtYXRjaDF0bzIgICAgICA9IC9cXGRcXGQ/LzsgICAgICAgICAvLyAgICAgICAwIC0gOTlcbiAgICB2YXIgbWF0Y2gzdG80ICAgICAgPSAvXFxkXFxkXFxkXFxkPy87ICAgICAvLyAgICAgOTk5IC0gOTk5OVxuICAgIHZhciBtYXRjaDV0bzYgICAgICA9IC9cXGRcXGRcXGRcXGRcXGRcXGQ/LzsgLy8gICA5OTk5OSAtIDk5OTk5OVxuICAgIHZhciBtYXRjaDF0bzMgICAgICA9IC9cXGR7MSwzfS87ICAgICAgIC8vICAgICAgIDAgLSA5OTlcbiAgICB2YXIgbWF0Y2gxdG80ICAgICAgPSAvXFxkezEsNH0vOyAgICAgICAvLyAgICAgICAwIC0gOTk5OVxuICAgIHZhciBtYXRjaDF0bzYgICAgICA9IC9bKy1dP1xcZHsxLDZ9LzsgIC8vIC05OTk5OTkgLSA5OTk5OTlcblxuICAgIHZhciBtYXRjaFVuc2lnbmVkICA9IC9cXGQrLzsgICAgICAgICAgIC8vICAgICAgIDAgLSBpbmZcbiAgICB2YXIgbWF0Y2hTaWduZWQgICAgPSAvWystXT9cXGQrLzsgICAgICAvLyAgICAtaW5mIC0gaW5mXG5cbiAgICB2YXIgbWF0Y2hPZmZzZXQgICAgPSAvWnxbKy1dXFxkXFxkOj9cXGRcXGQvZ2k7IC8vICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxuICAgIHZhciBtYXRjaFNob3J0T2Zmc2V0ID0gL1p8WystXVxcZFxcZCg/Ojo/XFxkXFxkKT8vZ2k7IC8vICswMCAtMDAgKzAwOjAwIC0wMDowMCArMDAwMCAtMDAwMCBvciBaXG5cbiAgICB2YXIgbWF0Y2hUaW1lc3RhbXAgPSAvWystXT9cXGQrKFxcLlxcZHsxLDN9KT8vOyAvLyAxMjM0NTY3ODkgMTIzNDU2Nzg5LjEyM1xuXG4gICAgLy8gYW55IHdvcmQgKG9yIHR3bykgY2hhcmFjdGVycyBvciBudW1iZXJzIGluY2x1ZGluZyB0d28vdGhyZWUgd29yZCBtb250aCBpbiBhcmFiaWMuXG4gICAgLy8gaW5jbHVkZXMgc2NvdHRpc2ggZ2FlbGljIHR3byB3b3JkIGFuZCBoeXBoZW5hdGVkIG1vbnRoc1xuICAgIHZhciBtYXRjaFdvcmQgPSAvWzAtOV0qWydhLXpcXHUwMEEwLVxcdTA1RkZcXHUwNzAwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdK3xbXFx1MDYwMC1cXHUwNkZGXFwvXSsoXFxzKj9bXFx1MDYwMC1cXHUwNkZGXSspezEsMn0vaTtcblxuXG4gICAgdmFyIHJlZ2V4ZXMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGFkZFJlZ2V4VG9rZW4gKHRva2VuLCByZWdleCwgc3RyaWN0UmVnZXgpIHtcbiAgICAgICAgcmVnZXhlc1t0b2tlbl0gPSBpc0Z1bmN0aW9uKHJlZ2V4KSA/IHJlZ2V4IDogZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGVEYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gKGlzU3RyaWN0ICYmIHN0cmljdFJlZ2V4KSA/IHN0cmljdFJlZ2V4IDogcmVnZXg7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UGFyc2VSZWdleEZvclRva2VuICh0b2tlbiwgY29uZmlnKSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcChyZWdleGVzLCB0b2tlbikpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHVuZXNjYXBlRm9ybWF0KHRva2VuKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVnZXhlc1t0b2tlbl0oY29uZmlnLl9zdHJpY3QsIGNvbmZpZy5fbG9jYWxlKTtcbiAgICB9XG5cbiAgICAvLyBDb2RlIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTYxNDkzL2lzLXRoZXJlLWEtcmVnZXhwLWVzY2FwZS1mdW5jdGlvbi1pbi1qYXZhc2NyaXB0XG4gICAgZnVuY3Rpb24gdW5lc2NhcGVGb3JtYXQocykge1xuICAgICAgICByZXR1cm4gcmVnZXhFc2NhcGUocy5yZXBsYWNlKCdcXFxcJywgJycpLnJlcGxhY2UoL1xcXFwoXFxbKXxcXFxcKFxcXSl8XFxbKFteXFxdXFxbXSopXFxdfFxcXFwoLikvZywgZnVuY3Rpb24gKG1hdGNoZWQsIHAxLCBwMiwgcDMsIHA0KSB7XG4gICAgICAgICAgICByZXR1cm4gcDEgfHwgcDIgfHwgcDMgfHwgcDQ7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdleEVzY2FwZShzKSB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoL1stXFwvXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xuICAgIH1cblxuICAgIHZhciB0b2tlbnMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGFkZFBhcnNlVG9rZW4gKHRva2VuLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaSwgZnVuYyA9IGNhbGxiYWNrO1xuICAgICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdG9rZW4gPSBbdG9rZW5dO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBmdW5jID0gZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2NhbGxiYWNrXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0b2tlbnNbdG9rZW5baV1dID0gZnVuYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFdlZWtQYXJzZVRva2VuICh0b2tlbiwgY2FsbGJhY2spIHtcbiAgICAgICAgYWRkUGFyc2VUb2tlbih0b2tlbiwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnLCB0b2tlbikge1xuICAgICAgICAgICAgY29uZmlnLl93ID0gY29uZmlnLl93IHx8IHt9O1xuICAgICAgICAgICAgY2FsbGJhY2soaW5wdXQsIGNvbmZpZy5fdywgY29uZmlnLCB0b2tlbik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRpbWVUb0FycmF5RnJvbVRva2VuKHRva2VuLCBpbnB1dCwgY29uZmlnKSB7XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsICYmIGhhc093blByb3AodG9rZW5zLCB0b2tlbikpIHtcbiAgICAgICAgICAgIHRva2Vuc1t0b2tlbl0oaW5wdXQsIGNvbmZpZy5fYSwgY29uZmlnLCB0b2tlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgWUVBUiA9IDA7XG4gICAgdmFyIE1PTlRIID0gMTtcbiAgICB2YXIgREFURSA9IDI7XG4gICAgdmFyIEhPVVIgPSAzO1xuICAgIHZhciBNSU5VVEUgPSA0O1xuICAgIHZhciBTRUNPTkQgPSA1O1xuICAgIHZhciBNSUxMSVNFQ09ORCA9IDY7XG4gICAgdmFyIFdFRUsgPSA3O1xuICAgIHZhciBXRUVLREFZID0gODtcblxuICAgIGZ1bmN0aW9uIGRheXNJbk1vbnRoKHllYXIsIG1vbnRoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCArIDEsIDApKS5nZXRVVENEYXRlKCk7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ00nLCBbJ01NJywgMl0sICdNbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGgoKSArIDE7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzU2hvcnQodGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21vbnRoJywgJ00nKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ00nLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ01NJywgICBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignTU1NJywgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUubW9udGhzU2hvcnRSZWdleChpc1N0cmljdCk7XG4gICAgfSk7XG4gICAgYWRkUmVnZXhUb2tlbignTU1NTScsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUubW9udGhzUmVnZXgoaXNTdHJpY3QpO1xuICAgIH0pO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ00nLCAnTU0nXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtNT05USF0gPSB0b0ludChpbnB1dCkgLSAxO1xuICAgIH0pO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ01NTScsICdNTU1NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgdmFyIG1vbnRoID0gY29uZmlnLl9sb2NhbGUubW9udGhzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XG4gICAgICAgIC8vIGlmIHdlIGRpZG4ndCBmaW5kIGEgbW9udGggbmFtZSwgbWFyayB0aGUgZGF0ZSBhcyBpbnZhbGlkLlxuICAgICAgICBpZiAobW9udGggIT0gbnVsbCkge1xuICAgICAgICAgICAgYXJyYXlbTU9OVEhdID0gbW9udGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkTW9udGggPSBpbnB1dDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gTE9DQUxFU1xuXG4gICAgdmFyIE1PTlRIU19JTl9GT1JNQVQgPSAvRFtvRF0/KFxcW1teXFxbXFxdXSpcXF18XFxzKykrTU1NTT8vO1xuICAgIHZhciBkZWZhdWx0TG9jYWxlTW9udGhzID0gJ0phbnVhcnlfRmVicnVhcnlfTWFyY2hfQXByaWxfTWF5X0p1bmVfSnVseV9BdWd1c3RfU2VwdGVtYmVyX09jdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXInLnNwbGl0KCdfJyk7XG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzIChtLCBmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzKSA/IHRoaXMuX21vbnRoc1ttLm1vbnRoKCldIDpcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1tNT05USFNfSU5fRk9STUFULnRlc3QoZm9ybWF0KSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnXVttLm1vbnRoKCldO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQgPSAnSmFuX0ZlYl9NYXJfQXByX01heV9KdW5fSnVsX0F1Z19TZXBfT2N0X05vdl9EZWMnLnNwbGl0KCdfJyk7XG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzU2hvcnQgKG0sIGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHNTaG9ydCkgPyB0aGlzLl9tb250aHNTaG9ydFttLm1vbnRoKCldIDpcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1Nob3J0W01PTlRIU19JTl9GT1JNQVQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20ubW9udGgoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzUGFyc2UgKG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICAgICAgdmFyIGksIG1vbSwgcmVnZXg7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9tb250aHNQYXJzZSkge1xuICAgICAgICAgICAgdGhpcy5fbW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMubW9udGhzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnJykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdHJpY3QgJiYgIXRoaXMuX21vbnRoc1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgcmVnZXggPSAnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKSArICd8XicgKyB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NTScgJiYgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NJyAmJiB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX21vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gc2V0TW9udGggKG1vbSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGRheU9mTW9udGg7XG5cbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAvLyBObyBvcFxuICAgICAgICAgICAgcmV0dXJuIG1vbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IE1vdmUgdGhpcyBvdXQgb2YgaGVyZSFcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbW9tLmxvY2FsZURhdGEoKS5tb250aHNQYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAvLyBUT0RPOiBBbm90aGVyIHNpbGVudCBmYWlsdXJlP1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGF5T2ZNb250aCA9IE1hdGgubWluKG1vbS5kYXRlKCksIGRheXNJbk1vbnRoKG1vbS55ZWFyKCksIHZhbHVlKSk7XG4gICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyAnTW9udGgnXSh2YWx1ZSwgZGF5T2ZNb250aCk7XG4gICAgICAgIHJldHVybiBtb207XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0TW9udGggKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzZXRNb250aCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0X3NldF9fZ2V0KHRoaXMsICdNb250aCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF5c0luTW9udGggKCkge1xuICAgICAgICByZXR1cm4gZGF5c0luTW9udGgodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSk7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4ID0gbWF0Y2hXb3JkO1xuICAgIGZ1bmN0aW9uIG1vbnRoc1Nob3J0UmVnZXggKGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZU1vbnRoc1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCA6IHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdE1vbnRoc1JlZ2V4ID0gbWF0Y2hXb3JkO1xuICAgIGZ1bmN0aW9uIG1vbnRoc1JlZ2V4IChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVNb250aHNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzUmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4IDogdGhpcy5fbW9udGhzUmVnZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wdXRlTW9udGhzUGFyc2UgKCkge1xuICAgICAgICBmdW5jdGlvbiBjbXBMZW5SZXYoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2hvcnRQaWVjZXMgPSBbXSwgbG9uZ1BpZWNlcyA9IFtdLCBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgaSwgbW9tO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoWzIwMDAsIGldKTtcbiAgICAgICAgICAgIHNob3J0UGllY2VzLnB1c2godGhpcy5tb250aHNTaG9ydChtb20sICcnKSk7XG4gICAgICAgICAgICBsb25nUGllY2VzLnB1c2godGhpcy5tb250aHMobW9tLCAnJykpO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhtb20sICcnKSk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgbW9udGggKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXIgaXRcbiAgICAgICAgLy8gd2lsbCBtYXRjaCB0aGUgbG9uZ2VyIHBpZWNlLlxuICAgICAgICBzaG9ydFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIGxvbmdQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBtaXhlZFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBzaG9ydFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKHNob3J0UGllY2VzW2ldKTtcbiAgICAgICAgICAgIGxvbmdQaWVjZXNbaV0gPSByZWdleEVzY2FwZShsb25nUGllY2VzW2ldKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobWl4ZWRQaWVjZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW9udGhzUmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaXhlZFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0UmVnZXggPSB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBsb25nUGllY2VzLmpvaW4oJ3wnKSArICcpJCcsICdpJyk7XG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBzaG9ydFBpZWNlcy5qb2luKCd8JykgKyAnKSQnLCAnaScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrT3ZlcmZsb3cgKG0pIHtcbiAgICAgICAgdmFyIG92ZXJmbG93O1xuICAgICAgICB2YXIgYSA9IG0uX2E7XG5cbiAgICAgICAgaWYgKGEgJiYgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID09PSAtMikge1xuICAgICAgICAgICAgb3ZlcmZsb3cgPVxuICAgICAgICAgICAgICAgIGFbTU9OVEhdICAgICAgIDwgMCB8fCBhW01PTlRIXSAgICAgICA+IDExICA/IE1PTlRIIDpcbiAgICAgICAgICAgICAgICBhW0RBVEVdICAgICAgICA8IDEgfHwgYVtEQVRFXSAgICAgICAgPiBkYXlzSW5Nb250aChhW1lFQVJdLCBhW01PTlRIXSkgPyBEQVRFIDpcbiAgICAgICAgICAgICAgICBhW0hPVVJdICAgICAgICA8IDAgfHwgYVtIT1VSXSAgICAgICAgPiAyNCB8fCAoYVtIT1VSXSA9PT0gMjQgJiYgKGFbTUlOVVRFXSAhPT0gMCB8fCBhW1NFQ09ORF0gIT09IDAgfHwgYVtNSUxMSVNFQ09ORF0gIT09IDApKSA/IEhPVVIgOlxuICAgICAgICAgICAgICAgIGFbTUlOVVRFXSAgICAgIDwgMCB8fCBhW01JTlVURV0gICAgICA+IDU5ICA/IE1JTlVURSA6XG4gICAgICAgICAgICAgICAgYVtTRUNPTkRdICAgICAgPCAwIHx8IGFbU0VDT05EXSAgICAgID4gNTkgID8gU0VDT05EIDpcbiAgICAgICAgICAgICAgICBhW01JTExJU0VDT05EXSA8IDAgfHwgYVtNSUxMSVNFQ09ORF0gPiA5OTkgPyBNSUxMSVNFQ09ORCA6XG4gICAgICAgICAgICAgICAgLTE7XG5cbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93RGF5T2ZZZWFyICYmIChvdmVyZmxvdyA8IFlFQVIgfHwgb3ZlcmZsb3cgPiBEQVRFKSkge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gREFURTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93V2Vla3MgJiYgb3ZlcmZsb3cgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cgPSBXRUVLO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dXZWVrZGF5ICYmIG92ZXJmbG93ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gV0VFS0RBWTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID0gb3ZlcmZsb3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YXJuKG1zZykge1xuICAgICAgICBpZiAodXRpbHNfaG9va3NfX2hvb2tzLnN1cHByZXNzRGVwcmVjYXRpb25XYXJuaW5ncyA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgICAodHlwZW9mIGNvbnNvbGUgIT09ICAndW5kZWZpbmVkJykgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RlcHJlY2F0aW9uIHdhcm5pbmc6ICcgKyBtc2cpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVwcmVjYXRlKG1zZywgZm4pIHtcbiAgICAgICAgdmFyIGZpcnN0VGltZSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIGV4dGVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RUaW1lKSB7XG4gICAgICAgICAgICAgICAgd2Fybihtc2cgKyAnXFxuQXJndW1lbnRzOiAnICsgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKCcsICcpICsgJ1xcbicgKyAobmV3IEVycm9yKCkpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBmaXJzdFRpbWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBmbik7XG4gICAgfVxuXG4gICAgdmFyIGRlcHJlY2F0aW9ucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gZGVwcmVjYXRlU2ltcGxlKG5hbWUsIG1zZykge1xuICAgICAgICBpZiAoIWRlcHJlY2F0aW9uc1tuYW1lXSkge1xuICAgICAgICAgICAgd2Fybihtc2cpO1xuICAgICAgICAgICAgZGVwcmVjYXRpb25zW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPSBmYWxzZTtcblxuICAgIC8vIGlzbyA4NjAxIHJlZ2V4XG4gICAgLy8gMDAwMC0wMC0wMCAwMDAwLVcwMCBvciAwMDAwLVcwMC0wICsgVCArIDAwIG9yIDAwOjAwIG9yIDAwOjAwOjAwIG9yIDAwOjAwOjAwLjAwMCArICswMDowMCBvciArMDAwMCBvciArMDApXG4gICAgdmFyIGV4dGVuZGVkSXNvUmVnZXggPSAvXlxccyooKD86WystXVxcZHs2fXxcXGR7NH0pLSg/OlxcZFxcZC1cXGRcXGR8V1xcZFxcZC1cXGR8V1xcZFxcZHxcXGRcXGRcXGR8XFxkXFxkKSkoPzooVHwgKShcXGRcXGQoPzo6XFxkXFxkKD86OlxcZFxcZCg/OlsuLF1cXGQrKT8pPyk/KShbXFwrXFwtXVxcZFxcZCg/Ojo/XFxkXFxkKT98XFxzKlopPyk/LztcbiAgICB2YXIgYmFzaWNJc29SZWdleCA9IC9eXFxzKigoPzpbKy1dXFxkezZ9fFxcZHs0fSkoPzpcXGRcXGRcXGRcXGR8V1xcZFxcZFxcZHxXXFxkXFxkfFxcZFxcZFxcZHxcXGRcXGQpKSg/OihUfCApKFxcZFxcZCg/OlxcZFxcZCg/OlxcZFxcZCg/OlsuLF1cXGQrKT8pPyk/KShbXFwrXFwtXVxcZFxcZCg/Ojo/XFxkXFxkKT98XFxzKlopPyk/LztcblxuICAgIHZhciB0elJlZ2V4ID0gL1p8WystXVxcZFxcZCg/Ojo/XFxkXFxkKT8vO1xuXG4gICAgdmFyIGlzb0RhdGVzID0gW1xuICAgICAgICBbJ1lZWVlZWS1NTS1ERCcsIC9bKy1dXFxkezZ9LVxcZFxcZC1cXGRcXGQvXSxcbiAgICAgICAgWydZWVlZLU1NLUREJywgL1xcZHs0fS1cXGRcXGQtXFxkXFxkL10sXG4gICAgICAgIFsnR0dHRy1bV11XVy1FJywgL1xcZHs0fS1XXFxkXFxkLVxcZC9dLFxuICAgICAgICBbJ0dHR0ctW1ddV1cnLCAvXFxkezR9LVdcXGRcXGQvLCBmYWxzZV0sXG4gICAgICAgIFsnWVlZWS1EREQnLCAvXFxkezR9LVxcZHszfS9dLFxuICAgICAgICBbJ1lZWVktTU0nLCAvXFxkezR9LVxcZFxcZC8sIGZhbHNlXSxcbiAgICAgICAgWydZWVlZWVlNTUREJywgL1srLV1cXGR7MTB9L10sXG4gICAgICAgIFsnWVlZWU1NREQnLCAvXFxkezh9L10sXG4gICAgICAgIC8vIFlZWVlNTSBpcyBOT1QgYWxsb3dlZCBieSB0aGUgc3RhbmRhcmRcbiAgICAgICAgWydHR0dHW1ddV1dFJywgL1xcZHs0fVdcXGR7M30vXSxcbiAgICAgICAgWydHR0dHW1ddV1cnLCAvXFxkezR9V1xcZHsyfS8sIGZhbHNlXSxcbiAgICAgICAgWydZWVlZREREJywgL1xcZHs3fS9dXG4gICAgXTtcblxuICAgIC8vIGlzbyB0aW1lIGZvcm1hdHMgYW5kIHJlZ2V4ZXNcbiAgICB2YXIgaXNvVGltZXMgPSBbXG4gICAgICAgIFsnSEg6bW06c3MuU1NTUycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZFxcLlxcZCsvXSxcbiAgICAgICAgWydISDptbTpzcyxTU1NTJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkLFxcZCsvXSxcbiAgICAgICAgWydISDptbTpzcycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZC9dLFxuICAgICAgICBbJ0hIOm1tJywgL1xcZFxcZDpcXGRcXGQvXSxcbiAgICAgICAgWydISG1tc3MuU1NTUycsIC9cXGRcXGRcXGRcXGRcXGRcXGRcXC5cXGQrL10sXG4gICAgICAgIFsnSEhtbXNzLFNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkLFxcZCsvXSxcbiAgICAgICAgWydISG1tc3MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkL10sXG4gICAgICAgIFsnSEhtbScsIC9cXGRcXGRcXGRcXGQvXSxcbiAgICAgICAgWydISCcsIC9cXGRcXGQvXVxuICAgIF07XG5cbiAgICB2YXIgYXNwTmV0SnNvblJlZ2V4ID0gL15cXC8/RGF0ZVxcKChcXC0/XFxkKykvaTtcblxuICAgIC8vIGRhdGUgZnJvbSBpc28gZm9ybWF0XG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUlTTyhjb25maWcpIHtcbiAgICAgICAgdmFyIGksIGwsXG4gICAgICAgICAgICBzdHJpbmcgPSBjb25maWcuX2ksXG4gICAgICAgICAgICBtYXRjaCA9IGV4dGVuZGVkSXNvUmVnZXguZXhlYyhzdHJpbmcpIHx8IGJhc2ljSXNvUmVnZXguZXhlYyhzdHJpbmcpLFxuICAgICAgICAgICAgYWxsb3dUaW1lLCBkYXRlRm9ybWF0LCB0aW1lRm9ybWF0LCB0ekZvcm1hdDtcblxuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmlzbyA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29EYXRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNvRGF0ZXNbaV1bMV0uZXhlYyhtYXRjaFsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdCA9IGlzb0RhdGVzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICBhbGxvd1RpbWUgPSBpc29EYXRlc1tpXVsyXSAhPT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRlRm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hbM10pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvVGltZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc29UaW1lc1tpXVsxXS5leGVjKG1hdGNoWzNdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hbMl0gc2hvdWxkIGJlICdUJyBvciBzcGFjZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUZvcm1hdCA9IChtYXRjaFsyXSB8fCAnICcpICsgaXNvVGltZXNbaV1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGltZUZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhbGxvd1RpbWUgJiYgdGltZUZvcm1hdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoWzRdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR6UmVnZXguZXhlYyhtYXRjaFs0XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHpGb3JtYXQgPSAnWic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maWcuX2YgPSBkYXRlRm9ybWF0ICsgKHRpbWVGb3JtYXQgfHwgJycpICsgKHR6Rm9ybWF0IHx8ICcnKTtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGF0ZSBmcm9tIGlzbyBmb3JtYXQgb3IgZmFsbGJhY2tcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nKGNvbmZpZykge1xuICAgICAgICB2YXIgbWF0Y2hlZCA9IGFzcE5ldEpzb25SZWdleC5leGVjKGNvbmZpZy5faSk7XG5cbiAgICAgICAgaWYgKG1hdGNoZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKCttYXRjaGVkWzFdKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZ0Zyb21JU08oY29uZmlnKTtcbiAgICAgICAgaWYgKGNvbmZpZy5faXNWYWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuX2lzVmFsaWQ7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ21vbWVudCBjb25zdHJ1Y3Rpb24gZmFsbHMgYmFjayB0byBqcyBEYXRlLiBUaGlzIGlzICcgK1xuICAgICAgICAnZGlzY291cmFnZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB1cGNvbWluZyBtYWpvciAnICtcbiAgICAgICAgJ3JlbGVhc2UuIFBsZWFzZSByZWZlciB0byAnICtcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDA3IGZvciBtb3JlIGluZm8uJyxcbiAgICAgICAgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pICsgKGNvbmZpZy5fdXNlVVRDID8gJyBVVEMnIDogJycpKTtcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVEYXRlICh5LCBtLCBkLCBoLCBNLCBzLCBtcykge1xuICAgICAgICAvL2Nhbid0IGp1c3QgYXBwbHkoKSB0byBjcmVhdGUgYSBkYXRlOlxuICAgICAgICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTgxMzQ4L2luc3RhbnRpYXRpbmctYS1qYXZhc2NyaXB0LW9iamVjdC1ieS1jYWxsaW5nLXByb3RvdHlwZS1jb25zdHJ1Y3Rvci1hcHBseVxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHksIG0sIGQsIGgsIE0sIHMsIG1zKTtcblxuICAgICAgICAvL3RoZSBkYXRlIGNvbnN0cnVjdG9yIHJlbWFwcyB5ZWFycyAwLTk5IHRvIDE5MDAtMTk5OVxuICAgICAgICBpZiAoeSA8IDEwMCAmJiB5ID49IDAgJiYgaXNGaW5pdGUoZGF0ZS5nZXRGdWxsWWVhcigpKSkge1xuICAgICAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcih5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVVVENEYXRlICh5KSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG5cbiAgICAgICAgLy90aGUgRGF0ZS5VVEMgZnVuY3Rpb24gcmVtYXBzIHllYXJzIDAtOTkgdG8gMTkwMC0xOTk5XG4gICAgICAgIGlmICh5IDwgMTAwICYmIHkgPj0gMCAmJiBpc0Zpbml0ZShkYXRlLmdldFVUQ0Z1bGxZZWFyKCkpKSB7XG4gICAgICAgICAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdZJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgeSA9IHRoaXMueWVhcigpO1xuICAgICAgICByZXR1cm4geSA8PSA5OTk5ID8gJycgKyB5IDogJysnICsgeTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVknLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55ZWFyKCkgJSAxMDA7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVknLCAgIDRdLCAgICAgICAwLCAneWVhcicpO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVknLCAgNV0sICAgICAgIDAsICd5ZWFyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZWVknLCA2LCB0cnVlXSwgMCwgJ3llYXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygneWVhcicsICd5Jyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdZJywgICAgICBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignWVknLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVknLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZWScsICBtYXRjaDF0bzYsIG1hdGNoNik7XG4gICAgYWRkUmVnZXhUb2tlbignWVlZWVlZJywgbWF0Y2gxdG82LCBtYXRjaDYpO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ1lZWVlZJywgJ1lZWVlZWSddLCBZRUFSKTtcbiAgICBhZGRQYXJzZVRva2VuKCdZWVlZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtZRUFSXSA9IGlucHV0Lmxlbmd0aCA9PT0gMiA/IHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCkgOiB0b0ludChpbnB1dCk7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignWVknLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W1lFQVJdID0gdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtZRUFSXSA9IHBhcnNlSW50KGlucHV0LCAxMCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICBmdW5jdGlvbiBkYXlzSW5ZZWFyKHllYXIpIHtcbiAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyAzNjYgOiAzNjU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNMZWFwWWVhcih5ZWFyKSB7XG4gICAgICAgIHJldHVybiAoeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCkgfHwgeWVhciAlIDQwMCA9PT0gMDtcbiAgICB9XG5cbiAgICAvLyBIT09LU1xuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlVHdvRGlnaXRZZWFyID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0b0ludChpbnB1dCkgKyAodG9JbnQoaW5wdXQpID4gNjggPyAxOTAwIDogMjAwMCk7XG4gICAgfTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRZZWFyID0gbWFrZUdldFNldCgnRnVsbFllYXInLCBmYWxzZSk7XG5cbiAgICBmdW5jdGlvbiBnZXRJc0xlYXBZZWFyICgpIHtcbiAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIodGhpcy55ZWFyKCkpO1xuICAgIH1cblxuICAgIC8vIHN0YXJ0LW9mLWZpcnN0LXdlZWsgLSBzdGFydC1vZi15ZWFyXG4gICAgZnVuY3Rpb24gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSB7XG4gICAgICAgIHZhciAvLyBmaXJzdC13ZWVrIGRheSAtLSB3aGljaCBqYW51YXJ5IGlzIGFsd2F5cyBpbiB0aGUgZmlyc3Qgd2VlayAoNCBmb3IgaXNvLCAxIGZvciBvdGhlcilcbiAgICAgICAgICAgIGZ3ZCA9IDcgKyBkb3cgLSBkb3ksXG4gICAgICAgICAgICAvLyBmaXJzdC13ZWVrIGRheSBsb2NhbCB3ZWVrZGF5IC0tIHdoaWNoIGxvY2FsIHdlZWtkYXkgaXMgZndkXG4gICAgICAgICAgICBmd2RsdyA9ICg3ICsgY3JlYXRlVVRDRGF0ZSh5ZWFyLCAwLCBmd2QpLmdldFVUQ0RheSgpIC0gZG93KSAlIDc7XG5cbiAgICAgICAgcmV0dXJuIC1md2RsdyArIGZ3ZCAtIDE7XG4gICAgfVxuXG4gICAgLy9odHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGUjQ2FsY3VsYXRpbmdfYV9kYXRlX2dpdmVuX3RoZV95ZWFyLjJDX3dlZWtfbnVtYmVyX2FuZF93ZWVrZGF5XG4gICAgZnVuY3Rpb24gZGF5T2ZZZWFyRnJvbVdlZWtzKHllYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XG4gICAgICAgIHZhciBsb2NhbFdlZWtkYXkgPSAoNyArIHdlZWtkYXkgLSBkb3cpICUgNyxcbiAgICAgICAgICAgIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpLFxuICAgICAgICAgICAgZGF5T2ZZZWFyID0gMSArIDcgKiAod2VlayAtIDEpICsgbG9jYWxXZWVrZGF5ICsgd2Vla09mZnNldCxcbiAgICAgICAgICAgIHJlc1llYXIsIHJlc0RheU9mWWVhcjtcblxuICAgICAgICBpZiAoZGF5T2ZZZWFyIDw9IDApIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSB5ZWFyIC0gMTtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheXNJblllYXIocmVzWWVhcikgKyBkYXlPZlllYXI7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF5T2ZZZWFyID4gZGF5c0luWWVhcih5ZWFyKSkge1xuICAgICAgICAgICAgcmVzWWVhciA9IHllYXIgKyAxO1xuICAgICAgICAgICAgcmVzRGF5T2ZZZWFyID0gZGF5T2ZZZWFyIC0gZGF5c0luWWVhcih5ZWFyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSB5ZWFyO1xuICAgICAgICAgICAgcmVzRGF5T2ZZZWFyID0gZGF5T2ZZZWFyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHllYXI6IHJlc1llYXIsXG4gICAgICAgICAgICBkYXlPZlllYXI6IHJlc0RheU9mWWVhclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdlZWtPZlllYXIobW9tLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldChtb20ueWVhcigpLCBkb3csIGRveSksXG4gICAgICAgICAgICB3ZWVrID0gTWF0aC5mbG9vcigobW9tLmRheU9mWWVhcigpIC0gd2Vla09mZnNldCAtIDEpIC8gNykgKyAxLFxuICAgICAgICAgICAgcmVzV2VlaywgcmVzWWVhcjtcblxuICAgICAgICBpZiAod2VlayA8IDEpIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpIC0gMTtcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrICsgd2Vla3NJblllYXIocmVzWWVhciwgZG93LCBkb3kpO1xuICAgICAgICB9IGVsc2UgaWYgKHdlZWsgPiB3ZWVrc0luWWVhcihtb20ueWVhcigpLCBkb3csIGRveSkpIHtcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrIC0gd2Vla3NJblllYXIobW9tLnllYXIoKSwgZG93LCBkb3kpO1xuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCkgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCk7XG4gICAgICAgICAgICByZXNXZWVrID0gd2VlaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3ZWVrOiByZXNXZWVrLFxuICAgICAgICAgICAgeWVhcjogcmVzWWVhclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdlZWtzSW5ZZWFyKHllYXIsIGRvdywgZG95KSB7XG4gICAgICAgIHZhciB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSxcbiAgICAgICAgICAgIHdlZWtPZmZzZXROZXh0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIgKyAxLCBkb3csIGRveSk7XG4gICAgICAgIHJldHVybiAoZGF5c0luWWVhcih5ZWFyKSAtIHdlZWtPZmZzZXQgKyB3ZWVrT2Zmc2V0TmV4dCkgLyA3O1xuICAgIH1cblxuICAgIC8vIFBpY2sgdGhlIGZpcnN0IGRlZmluZWQgb2YgdHdvIG9yIHRocmVlIGFyZ3VtZW50cy5cbiAgICBmdW5jdGlvbiBkZWZhdWx0cyhhLCBiLCBjKSB7XG4gICAgICAgIGlmIChhICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKSB7XG4gICAgICAgIC8vIGhvb2tzIGlzIGFjdHVhbGx5IHRoZSBleHBvcnRlZCBtb21lbnQgb2JqZWN0XG4gICAgICAgIHZhciBub3dWYWx1ZSA9IG5ldyBEYXRlKHV0aWxzX2hvb2tzX19ob29rcy5ub3coKSk7XG4gICAgICAgIGlmIChjb25maWcuX3VzZVVUQykge1xuICAgICAgICAgICAgcmV0dXJuIFtub3dWYWx1ZS5nZXRVVENGdWxsWWVhcigpLCBub3dWYWx1ZS5nZXRVVENNb250aCgpLCBub3dWYWx1ZS5nZXRVVENEYXRlKCldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbbm93VmFsdWUuZ2V0RnVsbFllYXIoKSwgbm93VmFsdWUuZ2V0TW9udGgoKSwgbm93VmFsdWUuZ2V0RGF0ZSgpXTtcbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0IGFuIGFycmF5IHRvIGEgZGF0ZS5cbiAgICAvLyB0aGUgYXJyYXkgc2hvdWxkIG1pcnJvciB0aGUgcGFyYW1ldGVycyBiZWxvd1xuICAgIC8vIG5vdGU6IGFsbCB2YWx1ZXMgcGFzdCB0aGUgeWVhciBhcmUgb3B0aW9uYWwgYW5kIHdpbGwgZGVmYXVsdCB0byB0aGUgbG93ZXN0IHBvc3NpYmxlIHZhbHVlLlxuICAgIC8vIFt5ZWFyLCBtb250aCwgZGF5ICwgaG91ciwgbWludXRlLCBzZWNvbmQsIG1pbGxpc2Vjb25kXVxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21BcnJheSAoY29uZmlnKSB7XG4gICAgICAgIHZhciBpLCBkYXRlLCBpbnB1dCA9IFtdLCBjdXJyZW50RGF0ZSwgeWVhclRvVXNlO1xuXG4gICAgICAgIGlmIChjb25maWcuX2QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnREYXRlID0gY3VycmVudERhdGVBcnJheShjb25maWcpO1xuXG4gICAgICAgIC8vY29tcHV0ZSBkYXkgb2YgdGhlIHllYXIgZnJvbSB3ZWVrcyBhbmQgd2Vla2RheXNcbiAgICAgICAgaWYgKGNvbmZpZy5fdyAmJiBjb25maWcuX2FbREFURV0gPT0gbnVsbCAmJiBjb25maWcuX2FbTU9OVEhdID09IG51bGwpIHtcbiAgICAgICAgICAgIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiB0aGUgZGF5IG9mIHRoZSB5ZWFyIGlzIHNldCwgZmlndXJlIG91dCB3aGF0IGl0IGlzXG4gICAgICAgIGlmIChjb25maWcuX2RheU9mWWVhcikge1xuICAgICAgICAgICAgeWVhclRvVXNlID0gZGVmYXVsdHMoY29uZmlnLl9hW1lFQVJdLCBjdXJyZW50RGF0ZVtZRUFSXSk7XG5cbiAgICAgICAgICAgIGlmIChjb25maWcuX2RheU9mWWVhciA+IGRheXNJblllYXIoeWVhclRvVXNlKSkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd0RheU9mWWVhciA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKHllYXJUb1VzZSwgMCwgY29uZmlnLl9kYXlPZlllYXIpO1xuICAgICAgICAgICAgY29uZmlnLl9hW01PTlRIXSA9IGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtEQVRFXSA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVmYXVsdCB0byBjdXJyZW50IGRhdGUuXG4gICAgICAgIC8vICogaWYgbm8geWVhciwgbW9udGgsIGRheSBvZiBtb250aCBhcmUgZ2l2ZW4sIGRlZmF1bHQgdG8gdG9kYXlcbiAgICAgICAgLy8gKiBpZiBkYXkgb2YgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgbW9udGggYW5kIHllYXJcbiAgICAgICAgLy8gKiBpZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBvbmx5IHllYXJcbiAgICAgICAgLy8gKiBpZiB5ZWFyIGlzIGdpdmVuLCBkb24ndCBkZWZhdWx0IGFueXRoaW5nXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAzICYmIGNvbmZpZy5fYVtpXSA9PSBudWxsOyArK2kpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtpXSA9IGlucHV0W2ldID0gY3VycmVudERhdGVbaV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBaZXJvIG91dCB3aGF0ZXZlciB3YXMgbm90IGRlZmF1bHRlZCwgaW5jbHVkaW5nIHRpbWVcbiAgICAgICAgZm9yICg7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtpXSA9IGlucHV0W2ldID0gKGNvbmZpZy5fYVtpXSA9PSBudWxsKSA/IChpID09PSAyID8gMSA6IDApIDogY29uZmlnLl9hW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIDI0OjAwOjAwLjAwMFxuICAgICAgICBpZiAoY29uZmlnLl9hW0hPVVJdID09PSAyNCAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtNSU5VVEVdID09PSAwICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW1NFQ09ORF0gPT09IDAgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbTUlMTElTRUNPTkRdID09PSAwKSB7XG4gICAgICAgICAgICBjb25maWcuX25leHREYXkgPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZy5fZCA9IChjb25maWcuX3VzZVVUQyA/IGNyZWF0ZVVUQ0RhdGUgOiBjcmVhdGVEYXRlKS5hcHBseShudWxsLCBpbnB1dCk7XG4gICAgICAgIC8vIEFwcGx5IHRpbWV6b25lIG9mZnNldCBmcm9tIGlucHV0LiBUaGUgYWN0dWFsIHV0Y09mZnNldCBjYW4gYmUgY2hhbmdlZFxuICAgICAgICAvLyB3aXRoIHBhcnNlWm9uZS5cbiAgICAgICAgaWYgKGNvbmZpZy5fdHptICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZC5zZXRVVENNaW51dGVzKGNvbmZpZy5fZC5nZXRVVENNaW51dGVzKCkgLSBjb25maWcuX3R6bSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLl9uZXh0RGF5KSB7XG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPSAyNDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpIHtcbiAgICAgICAgdmFyIHcsIHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSwgdGVtcCwgd2Vla2RheU92ZXJmbG93O1xuXG4gICAgICAgIHcgPSBjb25maWcuX3c7XG4gICAgICAgIGlmICh3LkdHICE9IG51bGwgfHwgdy5XICE9IG51bGwgfHwgdy5FICE9IG51bGwpIHtcbiAgICAgICAgICAgIGRvdyA9IDE7XG4gICAgICAgICAgICBkb3kgPSA0O1xuXG4gICAgICAgICAgICAvLyBUT0RPOiBXZSBuZWVkIHRvIHRha2UgdGhlIGN1cnJlbnQgaXNvV2Vla1llYXIsIGJ1dCB0aGF0IGRlcGVuZHMgb25cbiAgICAgICAgICAgIC8vIGhvdyB3ZSBpbnRlcnByZXQgbm93IChsb2NhbCwgdXRjLCBmaXhlZCBvZmZzZXQpLiBTbyBjcmVhdGVcbiAgICAgICAgICAgIC8vIGEgbm93IHZlcnNpb24gb2YgY3VycmVudCBjb25maWcgKHRha2UgbG9jYWwvdXRjL29mZnNldCBmbGFncywgYW5kXG4gICAgICAgICAgICAvLyBjcmVhdGUgbm93KS5cbiAgICAgICAgICAgIHdlZWtZZWFyID0gZGVmYXVsdHMody5HRywgY29uZmlnLl9hW1lFQVJdLCB3ZWVrT2ZZZWFyKGxvY2FsX19jcmVhdGVMb2NhbCgpLCAxLCA0KS55ZWFyKTtcbiAgICAgICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LlcsIDEpO1xuICAgICAgICAgICAgd2Vla2RheSA9IGRlZmF1bHRzKHcuRSwgMSk7XG4gICAgICAgICAgICBpZiAod2Vla2RheSA8IDEgfHwgd2Vla2RheSA+IDcpIHtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG93ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG93O1xuICAgICAgICAgICAgZG95ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG95O1xuXG4gICAgICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKHcuZ2csIGNvbmZpZy5fYVtZRUFSXSwgd2Vla09mWWVhcihsb2NhbF9fY3JlYXRlTG9jYWwoKSwgZG93LCBkb3kpLnllYXIpO1xuICAgICAgICAgICAgd2VlayA9IGRlZmF1bHRzKHcudywgMSk7XG5cbiAgICAgICAgICAgIGlmICh3LmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIHdlZWtkYXkgLS0gbG93IGRheSBudW1iZXJzIGFyZSBjb25zaWRlcmVkIG5leHQgd2Vla1xuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSB3LmQ7XG4gICAgICAgICAgICAgICAgaWYgKHdlZWtkYXkgPCAwIHx8IHdlZWtkYXkgPiA2KSB7XG4gICAgICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh3LmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIGxvY2FsIHdlZWtkYXkgLS0gY291bnRpbmcgc3RhcnRzIGZyb20gYmVnaW5pbmcgb2Ygd2Vla1xuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSB3LmUgKyBkb3c7XG4gICAgICAgICAgICAgICAgaWYgKHcuZSA8IDAgfHwgdy5lID4gNikge1xuICAgICAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCB0byBiZWdpbmluZyBvZiB3ZWVrXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IGRvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAod2VlayA8IDEgfHwgd2VlayA+IHdlZWtzSW5ZZWFyKHdlZWtZZWFyLCBkb3csIGRveSkpIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd1dlZWtzID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh3ZWVrZGF5T3ZlcmZsb3cgIT0gbnVsbCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla2RheSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZW1wID0gZGF5T2ZZZWFyRnJvbVdlZWtzKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSk7XG4gICAgICAgICAgICBjb25maWcuX2FbWUVBUl0gPSB0ZW1wLnllYXI7XG4gICAgICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRlbXAuZGF5T2ZZZWFyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29uc3RhbnQgdGhhdCByZWZlcnMgdG8gdGhlIElTTyBzdGFuZGFyZFxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5JU09fODYwMSA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgLy8gZGF0ZSBmcm9tIHN0cmluZyBhbmQgZm9ybWF0IHN0cmluZ1xuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKSB7XG4gICAgICAgIC8vIFRPRE86IE1vdmUgdGhpcyB0byBhbm90aGVyIHBhcnQgb2YgdGhlIGNyZWF0aW9uIGZsb3cgdG8gcHJldmVudCBjaXJjdWxhciBkZXBzXG4gICAgICAgIGlmIChjb25maWcuX2YgPT09IHV0aWxzX2hvb2tzX19ob29rcy5JU09fODYwMSkge1xuICAgICAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLl9hID0gW107XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gdHJ1ZTtcblxuICAgICAgICAvLyBUaGlzIGFycmF5IGlzIHVzZWQgdG8gbWFrZSBhIERhdGUsIGVpdGhlciB3aXRoIGBuZXcgRGF0ZWAgb3IgYERhdGUuVVRDYFxuICAgICAgICB2YXIgc3RyaW5nID0gJycgKyBjb25maWcuX2ksXG4gICAgICAgICAgICBpLCBwYXJzZWRJbnB1dCwgdG9rZW5zLCB0b2tlbiwgc2tpcHBlZCxcbiAgICAgICAgICAgIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGgsXG4gICAgICAgICAgICB0b3RhbFBhcnNlZElucHV0TGVuZ3RoID0gMDtcblxuICAgICAgICB0b2tlbnMgPSBleHBhbmRGb3JtYXQoY29uZmlnLl9mLCBjb25maWcuX2xvY2FsZSkubWF0Y2goZm9ybWF0dGluZ1Rva2VucykgfHwgW107XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBwYXJzZWRJbnB1dCA9IChzdHJpbmcubWF0Y2goZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKSB8fCBbXSlbMF07XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndG9rZW4nLCB0b2tlbiwgJ3BhcnNlZElucHV0JywgcGFyc2VkSW5wdXQsXG4gICAgICAgICAgICAvLyAgICAgICAgICdyZWdleCcsIGdldFBhcnNlUmVnZXhGb3JUb2tlbih0b2tlbiwgY29uZmlnKSk7XG4gICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICBza2lwcGVkID0gc3RyaW5nLnN1YnN0cigwLCBzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkpO1xuICAgICAgICAgICAgICAgIGlmIChza2lwcGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkSW5wdXQucHVzaChza2lwcGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nLnNsaWNlKHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSArIHBhcnNlZElucHV0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCArPSBwYXJzZWRJbnB1dC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkb24ndCBwYXJzZSBpZiBpdCdzIG5vdCBhIGtub3duIHRva2VuXG4gICAgICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFkZFRpbWVUb0FycmF5RnJvbVRva2VuKHRva2VuLCBwYXJzZWRJbnB1dCwgY29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbmZpZy5fc3RyaWN0ICYmICFwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCByZW1haW5pbmcgdW5wYXJzZWQgaW5wdXQgbGVuZ3RoIHRvIHRoZSBzdHJpbmdcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuY2hhcnNMZWZ0T3ZlciA9IHN0cmluZ0xlbmd0aCAtIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGg7XG4gICAgICAgIGlmIChzdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkSW5wdXQucHVzaChzdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYXIgXzEyaCBmbGFnIGlmIGhvdXIgaXMgPD0gMTJcbiAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPD0gMTIgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPiAwKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIGhhbmRsZSBtZXJpZGllbVxuICAgICAgICBjb25maWcuX2FbSE9VUl0gPSBtZXJpZGllbUZpeFdyYXAoY29uZmlnLl9sb2NhbGUsIGNvbmZpZy5fYVtIT1VSXSwgY29uZmlnLl9tZXJpZGllbSk7XG5cbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgICAgIGNoZWNrT3ZlcmZsb3coY29uZmlnKTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIG1lcmlkaWVtRml4V3JhcCAobG9jYWxlLCBob3VyLCBtZXJpZGllbSkge1xuICAgICAgICB2YXIgaXNQbTtcblxuICAgICAgICBpZiAobWVyaWRpZW0gPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gbm90aGluZyB0byBkb1xuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsZS5tZXJpZGllbUhvdXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS5tZXJpZGllbUhvdXIoaG91ciwgbWVyaWRpZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKGxvY2FsZS5pc1BNICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrXG4gICAgICAgICAgICBpc1BtID0gbG9jYWxlLmlzUE0obWVyaWRpZW0pO1xuICAgICAgICAgICAgaWYgKGlzUG0gJiYgaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNQbSAmJiBob3VyID09PSAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCBzdXBwb3NlZCB0byBoYXBwZW5cbiAgICAgICAgICAgIHJldHVybiBob3VyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGF0ZSBmcm9tIHN0cmluZyBhbmQgYXJyYXkgb2YgZm9ybWF0IHN0cmluZ3NcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKSB7XG4gICAgICAgIHZhciB0ZW1wQ29uZmlnLFxuICAgICAgICAgICAgYmVzdE1vbWVudCxcblxuICAgICAgICAgICAgc2NvcmVUb0JlYXQsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgY3VycmVudFNjb3JlO1xuXG4gICAgICAgIGlmIChjb25maWcuX2YubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkRm9ybWF0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKE5hTik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29uZmlnLl9mLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgPSAwO1xuICAgICAgICAgICAgdGVtcENvbmZpZyA9IGNvcHlDb25maWcoe30sIGNvbmZpZyk7XG4gICAgICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRlbXBDb25maWcuX3VzZVVUQyA9IGNvbmZpZy5fdXNlVVRDO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVtcENvbmZpZy5fZiA9IGNvbmZpZy5fZltpXTtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQodGVtcENvbmZpZyk7XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRfX2lzVmFsaWQodGVtcENvbmZpZykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW55IGlucHV0IHRoYXQgd2FzIG5vdCBwYXJzZWQgYWRkIGEgcGVuYWx0eSBmb3IgdGhhdCBmb3JtYXRcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuY2hhcnNMZWZ0T3ZlcjtcblxuICAgICAgICAgICAgLy9vciB0b2tlbnNcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykudW51c2VkVG9rZW5zLmxlbmd0aCAqIDEwO1xuXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuc2NvcmUgPSBjdXJyZW50U2NvcmU7XG5cbiAgICAgICAgICAgIGlmIChzY29yZVRvQmVhdCA9PSBudWxsIHx8IGN1cnJlbnRTY29yZSA8IHNjb3JlVG9CZWF0KSB7XG4gICAgICAgICAgICAgICAgc2NvcmVUb0JlYXQgPSBjdXJyZW50U2NvcmU7XG4gICAgICAgICAgICAgICAgYmVzdE1vbWVudCA9IHRlbXBDb25maWc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBleHRlbmQoY29uZmlnLCBiZXN0TW9tZW50IHx8IHRlbXBDb25maWcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21PYmplY3QoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcuX2QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gbm9ybWFsaXplT2JqZWN0VW5pdHMoY29uZmlnLl9pKTtcbiAgICAgICAgY29uZmlnLl9hID0gbWFwKFtpLnllYXIsIGkubW9udGgsIGkuZGF5IHx8IGkuZGF0ZSwgaS5ob3VyLCBpLm1pbnV0ZSwgaS5zZWNvbmQsIGkubWlsbGlzZWNvbmRdLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIHBhcnNlSW50KG9iaiwgMTApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVGcm9tQ29uZmlnIChjb25maWcpIHtcbiAgICAgICAgdmFyIHJlcyA9IG5ldyBNb21lbnQoY2hlY2tPdmVyZmxvdyhwcmVwYXJlQ29uZmlnKGNvbmZpZykpKTtcbiAgICAgICAgaWYgKHJlcy5fbmV4dERheSkge1xuICAgICAgICAgICAgLy8gQWRkaW5nIGlzIHNtYXJ0IGVub3VnaCBhcm91bmQgRFNUXG4gICAgICAgICAgICByZXMuYWRkKDEsICdkJyk7XG4gICAgICAgICAgICByZXMuX25leHREYXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXBhcmVDb25maWcgKGNvbmZpZykge1xuICAgICAgICB2YXIgaW5wdXQgPSBjb25maWcuX2ksXG4gICAgICAgICAgICBmb3JtYXQgPSBjb25maWcuX2Y7XG5cbiAgICAgICAgY29uZmlnLl9sb2NhbGUgPSBjb25maWcuX2xvY2FsZSB8fCBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKGNvbmZpZy5fbCk7XG5cbiAgICAgICAgaWYgKGlucHV0ID09PSBudWxsIHx8IChmb3JtYXQgPT09IHVuZGVmaW5lZCAmJiBpbnB1dCA9PT0gJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRfX2NyZWF0ZUludmFsaWQoe251bGxJbnB1dDogdHJ1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbmZpZy5faSA9IGlucHV0ID0gY29uZmlnLl9sb2NhbGUucHJlcGFyc2UoaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTW9tZW50KGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNb21lbnQoY2hlY2tPdmVyZmxvdyhpbnB1dCkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZm9ybWF0KSkge1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEFycmF5KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0KSB7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gaW5wdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25maWdGcm9tSW5wdXQoY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdmFsaWRfX2lzVmFsaWQoY29uZmlnKSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUlucHV0KGNvbmZpZykge1xuICAgICAgICB2YXIgaW5wdXQgPSBjb25maWcuX2k7XG4gICAgICAgIGlmIChpbnB1dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSh1dGlsc19ob29rc19faG9va3Mubm93KCkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShpbnB1dCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKCtpbnB1dCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZyhjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2EgPSBtYXAoaW5wdXQuc2xpY2UoMCksIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQob2JqLCAxMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihpbnB1dCkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tT2JqZWN0KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mKGlucHV0KSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIC8vIGZyb20gbWlsbGlzZWNvbmRzXG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxvY2FsT3JVVEMgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBpc1VUQykge1xuICAgICAgICB2YXIgYyA9IHt9O1xuXG4gICAgICAgIGlmICh0eXBlb2YobG9jYWxlKSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBzdHJpY3QgPSBsb2NhbGU7XG4gICAgICAgICAgICBsb2NhbGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gb2JqZWN0IGNvbnN0cnVjdGlvbiBtdXN0IGJlIGRvbmUgdGhpcyB3YXkuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDIzXG4gICAgICAgIGMuX2lzQU1vbWVudE9iamVjdCA9IHRydWU7XG4gICAgICAgIGMuX3VzZVVUQyA9IGMuX2lzVVRDID0gaXNVVEM7XG4gICAgICAgIGMuX2wgPSBsb2NhbGU7XG4gICAgICAgIGMuX2kgPSBpbnB1dDtcbiAgICAgICAgYy5fZiA9IGZvcm1hdDtcbiAgICAgICAgYy5fc3RyaWN0ID0gc3RyaWN0O1xuXG4gICAgICAgIHJldHVybiBjcmVhdGVGcm9tQ29uZmlnKGMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsX19jcmVhdGVMb2NhbCAoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsT3JVVEMoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIGZhbHNlKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvdG90eXBlTWluID0gZGVwcmVjYXRlKFxuICAgICAgICAgJ21vbWVudCgpLm1pbiBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50Lm1pbiBpbnN0ZWFkLiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTU0OCcsXG4gICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgdmFyIG90aGVyID0gbG9jYWxfX2NyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIgPCB0aGlzID8gdGhpcyA6IG90aGVyO1xuICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZF9fY3JlYXRlSW52YWxpZCgpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgKTtcblxuICAgIHZhciBwcm90b3R5cGVNYXggPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQoKS5tYXggaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5tYXggaW5zdGVhZC4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE1NDgnLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb3RoZXIgPSBsb2NhbF9fY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIgPiB0aGlzID8gdGhpcyA6IG90aGVyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRfX2NyZWF0ZUludmFsaWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBQaWNrIGEgbW9tZW50IG0gZnJvbSBtb21lbnRzIHNvIHRoYXQgbVtmbl0ob3RoZXIpIGlzIHRydWUgZm9yIGFsbFxuICAgIC8vIG90aGVyLiBUaGlzIHJlbGllcyBvbiB0aGUgZnVuY3Rpb24gZm4gdG8gYmUgdHJhbnNpdGl2ZS5cbiAgICAvL1xuICAgIC8vIG1vbWVudHMgc2hvdWxkIGVpdGhlciBiZSBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cyBvciBhbiBhcnJheSwgd2hvc2VcbiAgICAvLyBmaXJzdCBlbGVtZW50IGlzIGFuIGFycmF5IG9mIG1vbWVudCBvYmplY3RzLlxuICAgIGZ1bmN0aW9uIHBpY2tCeShmbiwgbW9tZW50cykge1xuICAgICAgICB2YXIgcmVzLCBpO1xuICAgICAgICBpZiAobW9tZW50cy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShtb21lbnRzWzBdKSkge1xuICAgICAgICAgICAgbW9tZW50cyA9IG1vbWVudHNbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtb21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHJlcyA9IG1vbWVudHNbMF07XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBtb21lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoIW1vbWVudHNbaV0uaXNWYWxpZCgpIHx8IG1vbWVudHNbaV1bZm5dKHJlcykpIHtcbiAgICAgICAgICAgICAgICByZXMgPSBtb21lbnRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogVXNlIFtdLnNvcnQgaW5zdGVhZD9cbiAgICBmdW5jdGlvbiBtaW4gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0JlZm9yZScsIGFyZ3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1heCAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgICAgIHJldHVybiBwaWNrQnkoJ2lzQWZ0ZXInLCBhcmdzKTtcbiAgICB9XG5cbiAgICB2YXIgbm93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gRGF0ZS5ub3cgPyBEYXRlLm5vdygpIDogKyhuZXcgRGF0ZSgpKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gRHVyYXRpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSBub3JtYWxpemVPYmplY3RVbml0cyhkdXJhdGlvbiksXG4gICAgICAgICAgICB5ZWFycyA9IG5vcm1hbGl6ZWRJbnB1dC55ZWFyIHx8IDAsXG4gICAgICAgICAgICBxdWFydGVycyA9IG5vcm1hbGl6ZWRJbnB1dC5xdWFydGVyIHx8IDAsXG4gICAgICAgICAgICBtb250aHMgPSBub3JtYWxpemVkSW5wdXQubW9udGggfHwgMCxcbiAgICAgICAgICAgIHdlZWtzID0gbm9ybWFsaXplZElucHV0LndlZWsgfHwgMCxcbiAgICAgICAgICAgIGRheXMgPSBub3JtYWxpemVkSW5wdXQuZGF5IHx8IDAsXG4gICAgICAgICAgICBob3VycyA9IG5vcm1hbGl6ZWRJbnB1dC5ob3VyIHx8IDAsXG4gICAgICAgICAgICBtaW51dGVzID0gbm9ybWFsaXplZElucHV0Lm1pbnV0ZSB8fCAwLFxuICAgICAgICAgICAgc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5zZWNvbmQgfHwgMCxcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5taWxsaXNlY29uZCB8fCAwO1xuXG4gICAgICAgIC8vIHJlcHJlc2VudGF0aW9uIGZvciBkYXRlQWRkUmVtb3ZlXG4gICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyA9ICttaWxsaXNlY29uZHMgK1xuICAgICAgICAgICAgc2Vjb25kcyAqIDFlMyArIC8vIDEwMDBcbiAgICAgICAgICAgIG1pbnV0ZXMgKiA2ZTQgKyAvLyAxMDAwICogNjBcbiAgICAgICAgICAgIGhvdXJzICogMzZlNTsgLy8gMTAwMCAqIDYwICogNjBcbiAgICAgICAgLy8gQmVjYXVzZSBvZiBkYXRlQWRkUmVtb3ZlIHRyZWF0cyAyNCBob3VycyBhcyBkaWZmZXJlbnQgZnJvbSBhXG4gICAgICAgIC8vIGRheSB3aGVuIHdvcmtpbmcgYXJvdW5kIERTVCwgd2UgbmVlZCB0byBzdG9yZSB0aGVtIHNlcGFyYXRlbHlcbiAgICAgICAgdGhpcy5fZGF5cyA9ICtkYXlzICtcbiAgICAgICAgICAgIHdlZWtzICogNztcbiAgICAgICAgLy8gSXQgaXMgaW1wb3NzaWJsZSB0cmFuc2xhdGUgbW9udGhzIGludG8gZGF5cyB3aXRob3V0IGtub3dpbmdcbiAgICAgICAgLy8gd2hpY2ggbW9udGhzIHlvdSBhcmUgYXJlIHRhbGtpbmcgYWJvdXQsIHNvIHdlIGhhdmUgdG8gc3RvcmVcbiAgICAgICAgLy8gaXQgc2VwYXJhdGVseS5cbiAgICAgICAgdGhpcy5fbW9udGhzID0gK21vbnRocyArXG4gICAgICAgICAgICBxdWFydGVycyAqIDMgK1xuICAgICAgICAgICAgeWVhcnMgKiAxMjtcblxuICAgICAgICB0aGlzLl9kYXRhID0ge307XG5cbiAgICAgICAgdGhpcy5fbG9jYWxlID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSgpO1xuXG4gICAgICAgIHRoaXMuX2J1YmJsZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRHVyYXRpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRHVyYXRpb247XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgZnVuY3Rpb24gb2Zmc2V0ICh0b2tlbiwgc2VwYXJhdG9yKSB7XG4gICAgICAgIGFkZEZvcm1hdFRva2VuKHRva2VuLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy51dGNPZmZzZXQoKTtcbiAgICAgICAgICAgIHZhciBzaWduID0gJysnO1xuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDApIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xuICAgICAgICAgICAgICAgIHNpZ24gPSAnLSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2lnbiArIHplcm9GaWxsKH5+KG9mZnNldCAvIDYwKSwgMikgKyBzZXBhcmF0b3IgKyB6ZXJvRmlsbCh+fihvZmZzZXQpICUgNjAsIDIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvZmZzZXQoJ1onLCAnOicpO1xuICAgIG9mZnNldCgnWlonLCAnJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdaJywgIG1hdGNoU2hvcnRPZmZzZXQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1paJywgbWF0Y2hTaG9ydE9mZnNldCk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ1onLCAnWlonXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fdXNlVVRDID0gdHJ1ZTtcbiAgICAgICAgY29uZmlnLl90em0gPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIHRpbWV6b25lIGNodW5rZXJcbiAgICAvLyAnKzEwOjAwJyA+IFsnMTAnLCAgJzAwJ11cbiAgICAvLyAnLTE1MzAnICA+IFsnLTE1JywgJzMwJ11cbiAgICB2YXIgY2h1bmtPZmZzZXQgPSAvKFtcXCtcXC1dfFxcZFxcZCkvZ2k7XG5cbiAgICBmdW5jdGlvbiBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoZXIsIHN0cmluZykge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9ICgoc3RyaW5nIHx8ICcnKS5tYXRjaChtYXRjaGVyKSB8fCBbXSk7XG4gICAgICAgIHZhciBjaHVuayAgID0gbWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdIHx8IFtdO1xuICAgICAgICB2YXIgcGFydHMgICA9IChjaHVuayArICcnKS5tYXRjaChjaHVua09mZnNldCkgfHwgWyctJywgMCwgMF07XG4gICAgICAgIHZhciBtaW51dGVzID0gKyhwYXJ0c1sxXSAqIDYwKSArIHRvSW50KHBhcnRzWzJdKTtcblxuICAgICAgICByZXR1cm4gcGFydHNbMF0gPT09ICcrJyA/IG1pbnV0ZXMgOiAtbWludXRlcztcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBtb21lbnQgZnJvbSBpbnB1dCwgdGhhdCBpcyBsb2NhbC91dGMvem9uZSBlcXVpdmFsZW50IHRvIG1vZGVsLlxuICAgIGZ1bmN0aW9uIGNsb25lV2l0aE9mZnNldChpbnB1dCwgbW9kZWwpIHtcbiAgICAgICAgdmFyIHJlcywgZGlmZjtcbiAgICAgICAgaWYgKG1vZGVsLl9pc1VUQykge1xuICAgICAgICAgICAgcmVzID0gbW9kZWwuY2xvbmUoKTtcbiAgICAgICAgICAgIGRpZmYgPSAoaXNNb21lbnQoaW5wdXQpIHx8IGlzRGF0ZShpbnB1dCkgPyAraW5wdXQgOiArbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KSkgLSAoK3Jlcyk7XG4gICAgICAgICAgICAvLyBVc2UgbG93LWxldmVsIGFwaSwgYmVjYXVzZSB0aGlzIGZuIGlzIGxvdy1sZXZlbCBhcGkuXG4gICAgICAgICAgICByZXMuX2Quc2V0VGltZSgrcmVzLl9kICsgZGlmZik7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHJlcywgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpLmxvY2FsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRlT2Zmc2V0IChtKSB7XG4gICAgICAgIC8vIE9uIEZpcmVmb3guMjQgRGF0ZSNnZXRUaW1lem9uZU9mZnNldCByZXR1cm5zIGEgZmxvYXRpbmcgcG9pbnQuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L3B1bGwvMTg3MVxuICAgICAgICByZXR1cm4gLU1hdGgucm91bmQobS5fZC5nZXRUaW1lem9uZU9mZnNldCgpIC8gMTUpICogMTU7XG4gICAgfVxuXG4gICAgLy8gSE9PS1NcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgYSBtb21lbnQgaXMgbXV0YXRlZC5cbiAgICAvLyBJdCBpcyBpbnRlbmRlZCB0byBrZWVwIHRoZSBvZmZzZXQgaW4gc3luYyB3aXRoIHRoZSB0aW1lem9uZS5cbiAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0ID0gZnVuY3Rpb24gKCkge307XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICAvLyBrZWVwTG9jYWxUaW1lID0gdHJ1ZSBtZWFucyBvbmx5IGNoYW5nZSB0aGUgdGltZXpvbmUsIHdpdGhvdXRcbiAgICAvLyBhZmZlY3RpbmcgdGhlIGxvY2FsIGhvdXIuIFNvIDU6MzE6MjYgKzAzMDAgLS1bdXRjT2Zmc2V0KDIsIHRydWUpXS0tPlxuICAgIC8vIDU6MzE6MjYgKzAyMDAgSXQgaXMgcG9zc2libGUgdGhhdCA1OjMxOjI2IGRvZXNuJ3QgZXhpc3Qgd2l0aCBvZmZzZXRcbiAgICAvLyArMDIwMCwgc28gd2UgYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCwgdG8gYmUgdmFsaWQuXG4gICAgLy9cbiAgICAvLyBLZWVwaW5nIHRoZSB0aW1lIGFjdHVhbGx5IGFkZHMvc3VidHJhY3RzIChvbmUgaG91cilcbiAgICAvLyBmcm9tIHRoZSBhY3R1YWwgcmVwcmVzZW50ZWQgdGltZS4gVGhhdCBpcyB3aHkgd2UgY2FsbCB1cGRhdGVPZmZzZXRcbiAgICAvLyBhIHNlY29uZCB0aW1lLiBJbiBjYXNlIGl0IHdhbnRzIHVzIHRvIGNoYW5nZSB0aGUgb2Zmc2V0IGFnYWluXG4gICAgLy8gX2NoYW5nZUluUHJvZ3Jlc3MgPT0gdHJ1ZSBjYXNlLCB0aGVuIHdlIGhhdmUgdG8gYWRqdXN0LCBiZWNhdXNlXG4gICAgLy8gdGhlcmUgaXMgbm8gc3VjaCB0aW1lIGluIHRoZSBnaXZlbiB0aW1lem9uZS5cbiAgICBmdW5jdGlvbiBnZXRTZXRPZmZzZXQgKGlucHV0LCBrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLl9vZmZzZXQgfHwgMCxcbiAgICAgICAgICAgIGxvY2FsQWRqdXN0O1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoaW5wdXQpIDwgMTYpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0ICogNjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzVVRDICYmIGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEFkanVzdCA9IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBpbnB1dDtcbiAgICAgICAgICAgIHRoaXMuX2lzVVRDID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChsb2NhbEFkanVzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobG9jYWxBZGp1c3QsICdtJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2Zmc2V0ICE9PSBpbnB1dCkge1xuICAgICAgICAgICAgICAgIGlmICgha2VlcExvY2FsVGltZSB8fCB0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgY3JlYXRlX19jcmVhdGVEdXJhdGlvbihpbnB1dCAtIG9mZnNldCwgJ20nKSwgMSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQodGhpcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gb2Zmc2V0IDogZ2V0RGF0ZU9mZnNldCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldFpvbmUgKGlucHV0LCBrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gLWlucHV0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldChpbnB1dCwga2VlcExvY2FsVGltZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC10aGlzLnV0Y09mZnNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9VVEMgKGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9mZnNldFRvTG9jYWwgKGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzVVRDKSB7XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcbiAgICAgICAgICAgIHRoaXMuX2lzVVRDID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJ0cmFjdChnZXREYXRlT2Zmc2V0KHRoaXMpLCAnbScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3R6bSkge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQodGhpcy5fdHptKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5faSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KG9mZnNldEZyb21TdHJpbmcobWF0Y2hPZmZzZXQsIHRoaXMuX2kpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNBbGlnbmVkSG91ck9mZnNldCAoaW5wdXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0ID0gaW5wdXQgPyBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpLnV0Y09mZnNldCgpIDogMDtcblxuICAgICAgICByZXR1cm4gKHRoaXMudXRjT2Zmc2V0KCkgLSBpbnB1dCkgJSA2MCA9PT0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZSAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDApLnV0Y09mZnNldCgpIHx8XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDUpLnV0Y09mZnNldCgpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEYXlsaWdodFNhdmluZ1RpbWVTaGlmdGVkICgpIHtcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9pc0RTVFNoaWZ0ZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGMgPSB7fTtcblxuICAgICAgICBjb3B5Q29uZmlnKGMsIHRoaXMpO1xuICAgICAgICBjID0gcHJlcGFyZUNvbmZpZyhjKTtcblxuICAgICAgICBpZiAoYy5fYSkge1xuICAgICAgICAgICAgdmFyIG90aGVyID0gYy5faXNVVEMgPyBjcmVhdGVfdXRjX19jcmVhdGVVVEMoYy5fYSkgOiBsb2NhbF9fY3JlYXRlTG9jYWwoYy5fYSk7XG4gICAgICAgICAgICB0aGlzLl9pc0RTVFNoaWZ0ZWQgPSB0aGlzLmlzVmFsaWQoKSAmJlxuICAgICAgICAgICAgICAgIGNvbXBhcmVBcnJheXMoYy5fYSwgb3RoZXIudG9BcnJheSgpKSA+IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pc0RTVFNoaWZ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RTVFNoaWZ0ZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNMb2NhbCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/ICF0aGlzLl9pc1VUQyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVXRjT2Zmc2V0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy5faXNVVEMgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1V0YyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2lzVVRDICYmIHRoaXMuX29mZnNldCA9PT0gMCA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFTUC5ORVQganNvbiBkYXRlIGZvcm1hdCByZWdleFxuICAgIHZhciBhc3BOZXRSZWdleCA9IC9eKFxcLSk/KD86KFxcZCopWy4gXSk/KFxcZCspXFw6KFxcZCspKD86XFw6KFxcZCspXFwuPyhcXGR7M30pP1xcZCopPyQvO1xuXG4gICAgLy8gZnJvbSBodHRwOi8vZG9jcy5jbG9zdXJlLWxpYnJhcnkuZ29vZ2xlY29kZS5jb20vZ2l0L2Nsb3N1cmVfZ29vZ19kYXRlX2RhdGUuanMuc291cmNlLmh0bWxcbiAgICAvLyBzb21ld2hhdCBtb3JlIGluIGxpbmUgd2l0aCA0LjQuMy4yIDIwMDQgc3BlYywgYnV0IGFsbG93cyBkZWNpbWFsIGFueXdoZXJlXG4gICAgdmFyIGlzb1JlZ2V4ID0gL14oLSk/UCg/Oig/OihbMC05LC5dKilZKT8oPzooWzAtOSwuXSopTSk/KD86KFswLTksLl0qKUQpPyg/OlQoPzooWzAtOSwuXSopSCk/KD86KFswLTksLl0qKU0pPyg/OihbMC05LC5dKilTKT8pP3woWzAtOSwuXSopVykkLztcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24gKGlucHV0LCBrZXkpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5wdXQsXG4gICAgICAgICAgICAvLyBtYXRjaGluZyBhZ2FpbnN0IHJlZ2V4cCBpcyBleHBlbnNpdmUsIGRvIGl0IG9uIGRlbWFuZFxuICAgICAgICAgICAgbWF0Y2ggPSBudWxsLFxuICAgICAgICAgICAgc2lnbixcbiAgICAgICAgICAgIHJldCxcbiAgICAgICAgICAgIGRpZmZSZXM7XG5cbiAgICAgICAgaWYgKGlzRHVyYXRpb24oaW5wdXQpKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBtcyA6IGlucHV0Ll9taWxsaXNlY29uZHMsXG4gICAgICAgICAgICAgICAgZCAgOiBpbnB1dC5fZGF5cyxcbiAgICAgICAgICAgICAgICBNICA6IGlucHV0Ll9tb250aHNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbltrZXldID0gaW5wdXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uLm1pbGxpc2Vjb25kcyA9IGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gYXNwTmV0UmVnZXguZXhlYyhpbnB1dCkpKSB7XG4gICAgICAgICAgICBzaWduID0gKG1hdGNoWzFdID09PSAnLScpID8gLTEgOiAxO1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeSAgOiAwLFxuICAgICAgICAgICAgICAgIGQgIDogdG9JbnQobWF0Y2hbREFURV0pICAgICAgICAqIHNpZ24sXG4gICAgICAgICAgICAgICAgaCAgOiB0b0ludChtYXRjaFtIT1VSXSkgICAgICAgICogc2lnbixcbiAgICAgICAgICAgICAgICBtICA6IHRvSW50KG1hdGNoW01JTlVURV0pICAgICAgKiBzaWduLFxuICAgICAgICAgICAgICAgIHMgIDogdG9JbnQobWF0Y2hbU0VDT05EXSkgICAgICAqIHNpZ24sXG4gICAgICAgICAgICAgICAgbXMgOiB0b0ludChtYXRjaFtNSUxMSVNFQ09ORF0pICogc2lnblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmICghIShtYXRjaCA9IGlzb1JlZ2V4LmV4ZWMoaW5wdXQpKSkge1xuICAgICAgICAgICAgc2lnbiA9IChtYXRjaFsxXSA9PT0gJy0nKSA/IC0xIDogMTtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgICAgIHkgOiBwYXJzZUlzbyhtYXRjaFsyXSwgc2lnbiksXG4gICAgICAgICAgICAgICAgTSA6IHBhcnNlSXNvKG1hdGNoWzNdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBkIDogcGFyc2VJc28obWF0Y2hbNF0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIGggOiBwYXJzZUlzbyhtYXRjaFs1XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgbSA6IHBhcnNlSXNvKG1hdGNoWzZdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBzIDogcGFyc2VJc28obWF0Y2hbN10sIHNpZ24pLFxuICAgICAgICAgICAgICAgIHcgOiBwYXJzZUlzbyhtYXRjaFs4XSwgc2lnbilcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPT0gbnVsbCkgey8vIGNoZWNrcyBmb3IgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGR1cmF0aW9uID09PSAnb2JqZWN0JyAmJiAoJ2Zyb20nIGluIGR1cmF0aW9uIHx8ICd0bycgaW4gZHVyYXRpb24pKSB7XG4gICAgICAgICAgICBkaWZmUmVzID0gbW9tZW50c0RpZmZlcmVuY2UobG9jYWxfX2NyZWF0ZUxvY2FsKGR1cmF0aW9uLmZyb20pLCBsb2NhbF9fY3JlYXRlTG9jYWwoZHVyYXRpb24udG8pKTtcblxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgICAgIGR1cmF0aW9uLm1zID0gZGlmZlJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgICAgICBkdXJhdGlvbi5NID0gZGlmZlJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXQgPSBuZXcgRHVyYXRpb24oZHVyYXRpb24pO1xuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSAmJiBoYXNPd25Qcm9wKGlucHV0LCAnX2xvY2FsZScpKSB7XG4gICAgICAgICAgICByZXQuX2xvY2FsZSA9IGlucHV0Ll9sb2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24uZm4gPSBEdXJhdGlvbi5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBwYXJzZUlzbyAoaW5wLCBzaWduKSB7XG4gICAgICAgIC8vIFdlJ2Qgbm9ybWFsbHkgdXNlIH5+aW5wIGZvciB0aGlzLCBidXQgdW5mb3J0dW5hdGVseSBpdCBhbHNvXG4gICAgICAgIC8vIGNvbnZlcnRzIGZsb2F0cyB0byBpbnRzLlxuICAgICAgICAvLyBpbnAgbWF5IGJlIHVuZGVmaW5lZCwgc28gY2FyZWZ1bCBjYWxsaW5nIHJlcGxhY2Ugb24gaXQuXG4gICAgICAgIHZhciByZXMgPSBpbnAgJiYgcGFyc2VGbG9hdChpbnAucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICAvLyBhcHBseSBzaWduIHdoaWxlIHdlJ3JlIGF0IGl0XG4gICAgICAgIHJldHVybiAoaXNOYU4ocmVzKSA/IDAgOiByZXMpICogc2lnbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XG4gICAgICAgIHZhciByZXMgPSB7bWlsbGlzZWNvbmRzOiAwLCBtb250aHM6IDB9O1xuXG4gICAgICAgIHJlcy5tb250aHMgPSBvdGhlci5tb250aCgpIC0gYmFzZS5tb250aCgpICtcbiAgICAgICAgICAgIChvdGhlci55ZWFyKCkgLSBiYXNlLnllYXIoKSkgKiAxMjtcbiAgICAgICAgaWYgKGJhc2UuY2xvbmUoKS5hZGQocmVzLm1vbnRocywgJ00nKS5pc0FmdGVyKG90aGVyKSkge1xuICAgICAgICAgICAgLS1yZXMubW9udGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9ICtvdGhlciAtICsoYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpKTtcblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XG4gICAgICAgIHZhciByZXM7XG4gICAgICAgIGlmICghKGJhc2UuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7bWlsbGlzZWNvbmRzOiAwLCBtb250aHM6IDB9O1xuICAgICAgICB9XG5cbiAgICAgICAgb3RoZXIgPSBjbG9uZVdpdGhPZmZzZXQob3RoZXIsIGJhc2UpO1xuICAgICAgICBpZiAoYmFzZS5pc0JlZm9yZShvdGhlcikpIHtcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShvdGhlciwgYmFzZSk7XG4gICAgICAgICAgICByZXMubWlsbGlzZWNvbmRzID0gLXJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgICAgICByZXMubW9udGhzID0gLXJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHJlbW92ZSAnbmFtZScgYXJnIGFmdGVyIGRlcHJlY2F0aW9uIGlzIHJlbW92ZWRcbiAgICBmdW5jdGlvbiBjcmVhdGVBZGRlcihkaXJlY3Rpb24sIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIHBlcmlvZCkge1xuICAgICAgICAgICAgdmFyIGR1ciwgdG1wO1xuICAgICAgICAgICAgLy9pbnZlcnQgdGhlIGFyZ3VtZW50cywgYnV0IGNvbXBsYWluIGFib3V0IGl0XG4gICAgICAgICAgICBpZiAocGVyaW9kICE9PSBudWxsICYmICFpc05hTigrcGVyaW9kKSkge1xuICAgICAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZShuYW1lLCAnbW9tZW50KCkuJyArIG5hbWUgICsgJyhwZXJpb2QsIG51bWJlcikgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBtb21lbnQoKS4nICsgbmFtZSArICcobnVtYmVyLCBwZXJpb2QpLicpO1xuICAgICAgICAgICAgICAgIHRtcCA9IHZhbDsgdmFsID0gcGVyaW9kOyBwZXJpb2QgPSB0bXA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbCA9IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gK3ZhbCA6IHZhbDtcbiAgICAgICAgICAgIGR1ciA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24odmFsLCBwZXJpb2QpO1xuICAgICAgICAgICAgYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBkdXIsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0IChtb20sIGR1cmF0aW9uLCBpc0FkZGluZywgdXBkYXRlT2Zmc2V0KSB7XG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSBkdXJhdGlvbi5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgZGF5cyA9IGR1cmF0aW9uLl9kYXlzLFxuICAgICAgICAgICAgbW9udGhzID0gZHVyYXRpb24uX21vbnRocztcblxuICAgICAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIC8vIE5vIG9wXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVPZmZzZXQgPSB1cGRhdGVPZmZzZXQgPT0gbnVsbCA/IHRydWUgOiB1cGRhdGVPZmZzZXQ7XG5cbiAgICAgICAgaWYgKG1pbGxpc2Vjb25kcykge1xuICAgICAgICAgICAgbW9tLl9kLnNldFRpbWUoK21vbS5fZCArIG1pbGxpc2Vjb25kcyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF5cykge1xuICAgICAgICAgICAgZ2V0X3NldF9fc2V0KG1vbSwgJ0RhdGUnLCBnZXRfc2V0X19nZXQobW9tLCAnRGF0ZScpICsgZGF5cyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobW9udGhzKSB7XG4gICAgICAgICAgICBzZXRNb250aChtb20sIGdldF9zZXRfX2dldChtb20sICdNb250aCcpICsgbW9udGhzICogaXNBZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGVPZmZzZXQpIHtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQobW9tLCBkYXlzIHx8IG1vbnRocyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYWRkX3N1YnRyYWN0X19hZGQgICAgICA9IGNyZWF0ZUFkZGVyKDEsICdhZGQnKTtcbiAgICB2YXIgYWRkX3N1YnRyYWN0X19zdWJ0cmFjdCA9IGNyZWF0ZUFkZGVyKC0xLCAnc3VidHJhY3QnKTtcblxuICAgIGZ1bmN0aW9uIG1vbWVudF9jYWxlbmRhcl9fY2FsZW5kYXIgKHRpbWUsIGZvcm1hdHMpIHtcbiAgICAgICAgLy8gV2Ugd2FudCB0byBjb21wYXJlIHRoZSBzdGFydCBvZiB0b2RheSwgdnMgdGhpcy5cbiAgICAgICAgLy8gR2V0dGluZyBzdGFydC1vZi10b2RheSBkZXBlbmRzIG9uIHdoZXRoZXIgd2UncmUgbG9jYWwvdXRjL29mZnNldCBvciBub3QuXG4gICAgICAgIHZhciBub3cgPSB0aW1lIHx8IGxvY2FsX19jcmVhdGVMb2NhbCgpLFxuICAgICAgICAgICAgc29kID0gY2xvbmVXaXRoT2Zmc2V0KG5vdywgdGhpcykuc3RhcnRPZignZGF5JyksXG4gICAgICAgICAgICBkaWZmID0gdGhpcy5kaWZmKHNvZCwgJ2RheXMnLCB0cnVlKSxcbiAgICAgICAgICAgIGZvcm1hdCA9IGRpZmYgPCAtNiA/ICdzYW1lRWxzZScgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCAtMSA/ICdsYXN0V2VlaycgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCAwID8gJ2xhc3REYXknIDpcbiAgICAgICAgICAgICAgICBkaWZmIDwgMSA/ICdzYW1lRGF5JyA6XG4gICAgICAgICAgICAgICAgZGlmZiA8IDIgPyAnbmV4dERheScgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCA3ID8gJ25leHRXZWVrJyA6ICdzYW1lRWxzZSc7XG5cbiAgICAgICAgdmFyIG91dHB1dCA9IGZvcm1hdHMgJiYgKGlzRnVuY3Rpb24oZm9ybWF0c1tmb3JtYXRdKSA/IGZvcm1hdHNbZm9ybWF0XSgpIDogZm9ybWF0c1tmb3JtYXRdKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQob3V0cHV0IHx8IHRoaXMubG9jYWxlRGF0YSgpLmNhbGVuZGFyKGZvcm1hdCwgdGhpcywgbG9jYWxfX2NyZWF0ZUxvY2FsKG5vdykpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9uZSAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTW9tZW50KHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQWZ0ZXIgKGlucHV0LCB1bml0cykge1xuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KTtcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyghaXNVbmRlZmluZWQodW5pdHMpID8gdW5pdHMgOiAnbWlsbGlzZWNvbmQnKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gK3RoaXMgPiArbG9jYWxJbnB1dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiArbG9jYWxJbnB1dCA8ICt0aGlzLmNsb25lKCkuc3RhcnRPZih1bml0cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0JlZm9yZSAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKCFpc1VuZGVmaW5lZCh1bml0cykgPyB1bml0cyA6ICdtaWxsaXNlY29uZCcpO1xuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgIHJldHVybiArdGhpcyA8ICtsb2NhbElucHV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICt0aGlzLmNsb25lKCkuZW5kT2YodW5pdHMpIDwgK2xvY2FsSW5wdXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0JldHdlZW4gKGZyb20sIHRvLCB1bml0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0FmdGVyKGZyb20sIHVuaXRzKSAmJiB0aGlzLmlzQmVmb3JlKHRvLCB1bml0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lIChpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgdmFyIGxvY2FsSW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCksXG4gICAgICAgICAgICBpbnB1dE1zO1xuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzIHx8ICdtaWxsaXNlY29uZCcpO1xuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgIHJldHVybiArdGhpcyA9PT0gK2xvY2FsSW5wdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnB1dE1zID0gK2xvY2FsSW5wdXQ7XG4gICAgICAgICAgICByZXR1cm4gKyh0aGlzLmNsb25lKCkuc3RhcnRPZih1bml0cykpIDw9IGlucHV0TXMgJiYgaW5wdXRNcyA8PSArKHRoaXMuY2xvbmUoKS5lbmRPZih1bml0cykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JBZnRlciAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU2FtZShpbnB1dCwgdW5pdHMpIHx8IHRoaXMuaXNBZnRlcihpbnB1dCx1bml0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JCZWZvcmUgKGlucHV0LCB1bml0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1NhbWUoaW5wdXQsIHVuaXRzKSB8fCB0aGlzLmlzQmVmb3JlKGlucHV0LHVuaXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaWZmIChpbnB1dCwgdW5pdHMsIGFzRmxvYXQpIHtcbiAgICAgICAgdmFyIHRoYXQsXG4gICAgICAgICAgICB6b25lRGVsdGEsXG4gICAgICAgICAgICBkZWx0YSwgb3V0cHV0O1xuXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0ID0gY2xvbmVXaXRoT2Zmc2V0KGlucHV0LCB0aGlzKTtcblxuICAgICAgICBpZiAoIXRoYXQuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG5cbiAgICAgICAgem9uZURlbHRhID0gKHRoYXQudXRjT2Zmc2V0KCkgLSB0aGlzLnV0Y09mZnNldCgpKSAqIDZlNDtcblxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcblxuICAgICAgICBpZiAodW5pdHMgPT09ICd5ZWFyJyB8fCB1bml0cyA9PT0gJ21vbnRoJyB8fCB1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBtb250aERpZmYodGhpcywgdGhhdCk7XG4gICAgICAgICAgICBpZiAodW5pdHMgPT09ICdxdWFydGVyJykge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCAvIDM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVuaXRzID09PSAneWVhcicpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgLyAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbHRhID0gdGhpcyAtIHRoYXQ7XG4gICAgICAgICAgICBvdXRwdXQgPSB1bml0cyA9PT0gJ3NlY29uZCcgPyBkZWx0YSAvIDFlMyA6IC8vIDEwMDBcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ21pbnV0ZScgPyBkZWx0YSAvIDZlNCA6IC8vIDEwMDAgKiA2MFxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnaG91cicgPyBkZWx0YSAvIDM2ZTUgOiAvLyAxMDAwICogNjAgKiA2MFxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnZGF5JyA/IChkZWx0YSAtIHpvbmVEZWx0YSkgLyA4NjRlNSA6IC8vIDEwMDAgKiA2MCAqIDYwICogMjQsIG5lZ2F0ZSBkc3RcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ3dlZWsnID8gKGRlbHRhIC0gem9uZURlbHRhKSAvIDYwNDhlNSA6IC8vIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3LCBuZWdhdGUgZHN0XG4gICAgICAgICAgICAgICAgZGVsdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFzRmxvYXQgPyBvdXRwdXQgOiBhYnNGbG9vcihvdXRwdXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbnRoRGlmZiAoYSwgYikge1xuICAgICAgICAvLyBkaWZmZXJlbmNlIGluIG1vbnRoc1xuICAgICAgICB2YXIgd2hvbGVNb250aERpZmYgPSAoKGIueWVhcigpIC0gYS55ZWFyKCkpICogMTIpICsgKGIubW9udGgoKSAtIGEubW9udGgoKSksXG4gICAgICAgICAgICAvLyBiIGlzIGluIChhbmNob3IgLSAxIG1vbnRoLCBhbmNob3IgKyAxIG1vbnRoKVxuICAgICAgICAgICAgYW5jaG9yID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiwgJ21vbnRocycpLFxuICAgICAgICAgICAgYW5jaG9yMiwgYWRqdXN0O1xuXG4gICAgICAgIGlmIChiIC0gYW5jaG9yIDwgMCkge1xuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgLSAxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvciAtIGFuY2hvcjIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgKyAxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvcjIgLSBhbmNob3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC0od2hvbGVNb250aERpZmYgKyBhZGp1c3QpO1xuICAgIH1cblxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5kZWZhdWx0Rm9ybWF0ID0gJ1lZWVktTU0tRERUSEg6bW06c3NaJztcblxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5sb2NhbGUoJ2VuJykuZm9ybWF0KCdkZGQgTU1NIEREIFlZWVkgSEg6bW06c3MgW0dNVF1aWicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbWVudF9mb3JtYXRfX3RvSVNPU3RyaW5nICgpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzLmNsb25lKCkudXRjKCk7XG4gICAgICAgIGlmICgwIDwgbS55ZWFyKCkgJiYgbS55ZWFyKCkgPD0gOTk5OSkge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgLy8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGlzIH41MHggZmFzdGVyLCB1c2UgaXQgd2hlbiB3ZSBjYW5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0RhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0TW9tZW50KG0sICdZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTW1pdJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0TW9tZW50KG0sICdZWVlZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdCAoaW5wdXRTdHJpbmcpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IGZvcm1hdE1vbWVudCh0aGlzLCBpbnB1dFN0cmluZyB8fCB1dGlsc19ob29rc19faG9va3MuZGVmYXVsdEZvcm1hdCk7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5wb3N0Zm9ybWF0KG91dHB1dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZnJvbSAodGltZSwgd2l0aG91dFN1ZmZpeCkge1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiZcbiAgICAgICAgICAgICAgICAoKGlzTW9tZW50KHRpbWUpICYmIHRpbWUuaXNWYWxpZCgpKSB8fFxuICAgICAgICAgICAgICAgICBsb2NhbF9fY3JlYXRlTG9jYWwodGltZSkuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24oe3RvOiB0aGlzLCBmcm9tOiB0aW1lfSkubG9jYWxlKHRoaXMubG9jYWxlKCkpLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZnJvbU5vdyAod2l0aG91dFN1ZmZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcm9tKGxvY2FsX19jcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0byAodGltZSwgd2l0aG91dFN1ZmZpeCkge1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiZcbiAgICAgICAgICAgICAgICAoKGlzTW9tZW50KHRpbWUpICYmIHRpbWUuaXNWYWxpZCgpKSB8fFxuICAgICAgICAgICAgICAgICBsb2NhbF9fY3JlYXRlTG9jYWwodGltZSkuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24oe2Zyb206IHRoaXMsIHRvOiB0aW1lfSkubG9jYWxlKHRoaXMubG9jYWxlKCkpLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9Ob3cgKHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG8obG9jYWxfX2NyZWF0ZUxvY2FsKCksIHdpdGhvdXRTdWZmaXgpO1xuICAgIH1cblxuICAgIC8vIElmIHBhc3NlZCBhIGxvY2FsZSBrZXksIGl0IHdpbGwgc2V0IHRoZSBsb2NhbGUgZm9yIHRoaXNcbiAgICAvLyBpbnN0YW5jZS4gIE90aGVyd2lzZSwgaXQgd2lsbCByZXR1cm4gdGhlIGxvY2FsZSBjb25maWd1cmF0aW9uXG4gICAgLy8gdmFyaWFibGVzIGZvciB0aGlzIGluc3RhbmNlLlxuICAgIGZ1bmN0aW9uIGxvY2FsZSAoa2V5KSB7XG4gICAgICAgIHZhciBuZXdMb2NhbGVEYXRhO1xuXG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZS5fYWJicjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0xvY2FsZURhdGEgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKGtleSk7XG4gICAgICAgICAgICBpZiAobmV3TG9jYWxlRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxlID0gbmV3TG9jYWxlRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxhbmcgPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQoKS5sYW5nKCkgaXMgZGVwcmVjYXRlZC4gSW5zdGVhZCwgdXNlIG1vbWVudCgpLmxvY2FsZURhdGEoKSB0byBnZXQgdGhlIGxhbmd1YWdlIGNvbmZpZ3VyYXRpb24uIFVzZSBtb21lbnQoKS5sb2NhbGUoKSB0byBjaGFuZ2UgbGFuZ3VhZ2VzLicsXG4gICAgICAgIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlRGF0YSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRPZiAodW5pdHMpIHtcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgc3dpdGNoIGludGVudGlvbmFsbHkgb21pdHMgYnJlYWsga2V5d29yZHNcbiAgICAgICAgLy8gdG8gdXRpbGl6ZSBmYWxsaW5nIHRocm91Z2ggdGhlIGNhc2VzLlxuICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgdGhpcy5tb250aCgwKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAncXVhcnRlcic6XG4gICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIHRoaXMuZGF0ZSgxKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgIGNhc2UgJ2lzb1dlZWsnOlxuICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgdGhpcy5ob3VycygwKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICB0aGlzLm1pbGxpc2Vjb25kcygwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlZWtzIGFyZSBhIHNwZWNpYWwgY2FzZVxuICAgICAgICBpZiAodW5pdHMgPT09ICd3ZWVrJykge1xuICAgICAgICAgICAgdGhpcy53ZWVrZGF5KDApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ2lzb1dlZWsnKSB7XG4gICAgICAgICAgICB0aGlzLmlzb1dlZWtkYXkoMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBxdWFydGVycyBhcmUgYWxzbyBzcGVjaWFsXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoKE1hdGguZmxvb3IodGhpcy5tb250aCgpIC8gMykgKiAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZE9mICh1bml0cykge1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSB1bmRlZmluZWQgfHwgdW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0T2YodW5pdHMpLmFkZCgxLCAodW5pdHMgPT09ICdpc29XZWVrJyA/ICd3ZWVrJyA6IHVuaXRzKSkuc3VidHJhY3QoMSwgJ21zJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9fdHlwZV9fdmFsdWVPZiAoKSB7XG4gICAgICAgIHJldHVybiArdGhpcy5fZCAtICgodGhpcy5fb2Zmc2V0IHx8IDApICogNjAwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuaXggKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigrdGhpcyAvIDEwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvRGF0ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQgPyBuZXcgRGF0ZSgrdGhpcykgOiB0aGlzLl9kO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvQXJyYXkgKCkge1xuICAgICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBbbS55ZWFyKCksIG0ubW9udGgoKSwgbS5kYXRlKCksIG0uaG91cigpLCBtLm1pbnV0ZSgpLCBtLnNlY29uZCgpLCBtLm1pbGxpc2Vjb25kKCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvT2JqZWN0ICgpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeWVhcnM6IG0ueWVhcigpLFxuICAgICAgICAgICAgbW9udGhzOiBtLm1vbnRoKCksXG4gICAgICAgICAgICBkYXRlOiBtLmRhdGUoKSxcbiAgICAgICAgICAgIGhvdXJzOiBtLmhvdXJzKCksXG4gICAgICAgICAgICBtaW51dGVzOiBtLm1pbnV0ZXMoKSxcbiAgICAgICAgICAgIHNlY29uZHM6IG0uc2Vjb25kcygpLFxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzOiBtLm1pbGxpc2Vjb25kcygpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgICAgICAgLy8gSlNPTi5zdHJpbmdpZnkobmV3IERhdGUoTmFOKSkgPT09ICdudWxsJ1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLnRvSVNPU3RyaW5nKCkgOiAnbnVsbCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9tZW50X3ZhbGlkX19pc1ZhbGlkICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkX19pc1ZhbGlkKHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNpbmdGbGFncyAoKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQoe30sIGdldFBhcnNpbmdGbGFncyh0aGlzKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW52YWxpZEF0ICgpIHtcbiAgICAgICAgcmV0dXJuIGdldFBhcnNpbmdGbGFncyh0aGlzKS5vdmVyZmxvdztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGlvbkRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnB1dDogdGhpcy5faSxcbiAgICAgICAgICAgIGZvcm1hdDogdGhpcy5fZixcbiAgICAgICAgICAgIGxvY2FsZTogdGhpcy5fbG9jYWxlLFxuICAgICAgICAgICAgaXNVVEM6IHRoaXMuX2lzVVRDLFxuICAgICAgICAgICAgc3RyaWN0OiB0aGlzLl9zdHJpY3RcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ2dnJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2Vla1llYXIoKSAlIDEwMDtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnR0cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc29XZWVrWWVhcigpICUgMTAwO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gYWRkV2Vla1llYXJGb3JtYXRUb2tlbiAodG9rZW4sIGdldHRlcikge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbigwLCBbdG9rZW4sIHRva2VuLmxlbmd0aF0sIDAsIGdldHRlcik7XG4gICAgfVxuXG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignZ2dnZycsICAgICAnd2Vla1llYXInKTtcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnZycsICAgICd3ZWVrWWVhcicpO1xuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0cnLCAgJ2lzb1dlZWtZZWFyJyk7XG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHR0cnLCAnaXNvV2Vla1llYXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnd2Vla1llYXInLCAnZ2cnKTtcbiAgICBhZGRVbml0QWxpYXMoJ2lzb1dlZWtZZWFyJywgJ0dHJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdHJywgICAgICBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignZycsICAgICAgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdnZycsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignR0dHRycsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnZ2cnLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbiAgICBhZGRSZWdleFRva2VuKCdHR0dHRycsICBtYXRjaDF0bzYsIG1hdGNoNik7XG4gICAgYWRkUmVnZXhUb2tlbignZ2dnZ2cnLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydnZ2dnJywgJ2dnZ2dnJywgJ0dHR0cnLCAnR0dHR0cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHdlZWtbdG9rZW4uc3Vic3RyKDAsIDIpXSA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZ2cnLCAnR0cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHdlZWtbdG9rZW5dID0gdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWtZZWFyIChpbnB1dCkge1xuICAgICAgICByZXR1cm4gZ2V0U2V0V2Vla1llYXJIZWxwZXIuY2FsbCh0aGlzLFxuICAgICAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgICAgIHRoaXMud2VlaygpLFxuICAgICAgICAgICAgICAgIHRoaXMud2Vla2RheSgpLFxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdyxcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3kpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWtZZWFyIChpbnB1dCkge1xuICAgICAgICByZXR1cm4gZ2V0U2V0V2Vla1llYXJIZWxwZXIuY2FsbCh0aGlzLFxuICAgICAgICAgICAgICAgIGlucHV0LCB0aGlzLmlzb1dlZWsoKSwgdGhpcy5pc29XZWVrZGF5KCksIDEsIDQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldElTT1dlZWtzSW5ZZWFyICgpIHtcbiAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCAxLCA0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXZWVrc0luWWVhciAoKSB7XG4gICAgICAgIHZhciB3ZWVrSW5mbyA9IHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrO1xuICAgICAgICByZXR1cm4gd2Vla3NJblllYXIodGhpcy55ZWFyKCksIHdlZWtJbmZvLmRvdywgd2Vla0luZm8uZG95KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrWWVhckhlbHBlcihpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIHdlZWtzVGFyZ2V0O1xuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIodGhpcywgZG93LCBkb3kpLnllYXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZWVrc1RhcmdldCA9IHdlZWtzSW5ZZWFyKGlucHV0LCBkb3csIGRveSk7XG4gICAgICAgICAgICBpZiAod2VlayA+IHdlZWtzVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgd2VlayA9IHdlZWtzVGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNldFdlZWtBbGwuY2FsbCh0aGlzLCBpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0V2Vla0FsbCh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIGRheU9mWWVhckRhdGEgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSxcbiAgICAgICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKGRheU9mWWVhckRhdGEueWVhciwgMCwgZGF5T2ZZZWFyRGF0YS5kYXlPZlllYXIpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ290XCIsIHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBcInNldFwiLCBkYXRlLnRvSVNPU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLnllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpKTtcbiAgICAgICAgdGhpcy5tb250aChkYXRlLmdldFVUQ01vbnRoKCkpO1xuICAgICAgICB0aGlzLmRhdGUoZGF0ZS5nZXRVVENEYXRlKCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignUScsIDAsICdRbycsICdxdWFydGVyJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ3F1YXJ0ZXInLCAnUScpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignUScsIG1hdGNoMSk7XG4gICAgYWRkUGFyc2VUb2tlbignUScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gKHRvSW50KGlucHV0KSAtIDEpICogMztcbiAgICB9KTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFF1YXJ0ZXIgKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gTWF0aC5jZWlsKCh0aGlzLm1vbnRoKCkgKyAxKSAvIDMpIDogdGhpcy5tb250aCgoaW5wdXQgLSAxKSAqIDMgKyB0aGlzLm1vbnRoKCkgJSAzKTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigndycsIFsnd3cnLCAyXSwgJ3dvJywgJ3dlZWsnKTtcbiAgICBhZGRGb3JtYXRUb2tlbignVycsIFsnV1cnLCAyXSwgJ1dvJywgJ2lzb1dlZWsnKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnd2VlaycsICd3Jyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrJywgJ1cnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ3cnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCd3dycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdXJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignV1cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ3cnLCAnd3cnLCAnVycsICdXVyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbi5zdWJzdHIoMCwgMSldID0gdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgLy8gTE9DQUxFU1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlV2VlayAobW9tKSB7XG4gICAgICAgIHJldHVybiB3ZWVrT2ZZZWFyKG1vbSwgdGhpcy5fd2Vlay5kb3csIHRoaXMuX3dlZWsuZG95KS53ZWVrO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2VlayA9IHtcbiAgICAgICAgZG93IDogMCwgLy8gU3VuZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG4gICAgICAgIGRveSA6IDYgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDFzdCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlRmlyc3REYXlPZldlZWsgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vlay5kb3c7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlRmlyc3REYXlPZlllYXIgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vlay5kb3k7XG4gICAgfVxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0V2VlayAoaW5wdXQpIHtcbiAgICAgICAgdmFyIHdlZWsgPSB0aGlzLmxvY2FsZURhdGEoKS53ZWVrKHRoaXMpO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWsgOiB0aGlzLmFkZCgoaW5wdXQgLSB3ZWVrKSAqIDcsICdkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPV2VlayAoaW5wdXQpIHtcbiAgICAgICAgdmFyIHdlZWsgPSB3ZWVrT2ZZZWFyKHRoaXMsIDEsIDQpLndlZWs7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2VlayA6IHRoaXMuYWRkKChpbnB1dCAtIHdlZWspICogNywgJ2QnKTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignRCcsIFsnREQnLCAyXSwgJ0RvJywgJ2RhdGUnKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnZGF0ZScsICdEJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdEJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignREQnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignRG8nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gaXNTdHJpY3QgPyBsb2NhbGUuX29yZGluYWxQYXJzZSA6IGxvY2FsZS5fb3JkaW5hbFBhcnNlTGVuaWVudDtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydEJywgJ0REJ10sIERBVEUpO1xuICAgIGFkZFBhcnNlVG9rZW4oJ0RvJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtEQVRFXSA9IHRvSW50KGlucHV0Lm1hdGNoKG1hdGNoMXRvMilbMF0sIDEwKTtcbiAgICB9KTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXREYXlPZk1vbnRoID0gbWFrZUdldFNldCgnRGF0ZScsIHRydWUpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2QnLCAwLCAnZG8nLCAnZGF5Jyk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c01pbih0aGlzLCBmb3JtYXQpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzU2hvcnQodGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkZGRkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXModGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdlJywgMCwgMCwgJ3dlZWtkYXknKTtcbiAgICBhZGRGb3JtYXRUb2tlbignRScsIDAsIDAsICdpc29XZWVrZGF5Jyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2RheScsICdkJyk7XG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrZGF5JywgJ2UnKTtcbiAgICBhZGRVbml0QWxpYXMoJ2lzb1dlZWtkYXknLCAnRScpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignZCcsICAgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignZScsICAgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignRScsICAgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignZGQnLCAgIG1hdGNoV29yZCk7XG4gICAgYWRkUmVnZXhUb2tlbignZGRkJywgIG1hdGNoV29yZCk7XG4gICAgYWRkUmVnZXhUb2tlbignZGRkZCcsIG1hdGNoV29yZCk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2RkJywgJ2RkZCcsICdkZGRkJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB2YXIgd2Vla2RheSA9IGNvbmZpZy5fbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XG4gICAgICAgIC8vIGlmIHdlIGRpZG4ndCBnZXQgYSB3ZWVrZGF5IG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZFxuICAgICAgICBpZiAod2Vla2RheSAhPSBudWxsKSB7XG4gICAgICAgICAgICB3ZWVrLmQgPSB3ZWVrZGF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZFdlZWtkYXkgPSBpbnB1dDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydkJywgJ2UnLCAnRSddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbl0gPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICBmdW5jdGlvbiBwYXJzZVdlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc05hTihpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChpbnB1dCwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQgPSBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBMT0NBTEVTXG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzID0gJ1N1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5Jy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzIChtLCBmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fd2Vla2RheXMpID8gdGhpcy5fd2Vla2RheXNbbS5kYXkoKV0gOlxuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNbdGhpcy5fd2Vla2RheXMuaXNGb3JtYXQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20uZGF5KCldO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydCA9ICdTdW5fTW9uX1R1ZV9XZWRfVGh1X0ZyaV9TYXQnLnNwbGl0KCdfJyk7XG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNTaG9ydCAobSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFttLmRheSgpXTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzTWluID0gJ1N1X01vX1R1X1dlX1RoX0ZyX1NhJy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzTWluIChtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblttLmRheSgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c1BhcnNlICh3ZWVrZGF5TmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICAgICAgdmFyIGksIG1vbSwgcmVnZXg7XG5cbiAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcblxuICAgICAgICAgICAgbW9tID0gbG9jYWxfX2NyZWF0ZUxvY2FsKFsyMDAwLCAxXSkuZGF5KGkpO1xuICAgICAgICAgICAgaWYgKHN0cmljdCAmJiAhdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy53ZWVrZGF5cyhtb20sICcnKS5yZXBsYWNlKCcuJywgJ1xcLj8nKSArICckJywgJ2knKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKS5yZXBsYWNlKCcuJywgJ1xcLj8nKSArICckJywgJ2knKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFwuPycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgcmVnZXggPSAnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpICsgJ3xeJyArIHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKSArICd8XicgKyB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0ZXN0IHRoZSByZWdleFxuICAgICAgICAgICAgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZGRkJyAmJiB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGRkJyAmJiB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkJyAmJiB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgdGhpcy5fd2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0RGF5T2ZXZWVrIChpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRheSA9IHRoaXMuX2lzVVRDID8gdGhpcy5fZC5nZXRVVENEYXkoKSA6IHRoaXMuX2QuZ2V0RGF5KCk7XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpbnB1dCA9IHBhcnNlV2Vla2RheShpbnB1dCwgdGhpcy5sb2NhbGVEYXRhKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGlucHV0IC0gZGF5LCAnZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRheTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldExvY2FsZURheU9mV2VlayAoaW5wdXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3ZWVrZGF5ID0gKHRoaXMuZGF5KCkgKyA3IC0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG93KSAlIDc7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2Vla2RheSA6IHRoaXMuYWRkKGlucHV0IC0gd2Vla2RheSwgJ2QnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRJU09EYXlPZldlZWsgKGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICAgICAgfVxuICAgICAgICAvLyBiZWhhdmVzIHRoZSBzYW1lIGFzIG1vbWVudCNkYXkgZXhjZXB0XG4gICAgICAgIC8vIGFzIGEgZ2V0dGVyLCByZXR1cm5zIDcgaW5zdGVhZCBvZiAwICgxLTcgcmFuZ2UgaW5zdGVhZCBvZiAwLTYpXG4gICAgICAgIC8vIGFzIGEgc2V0dGVyLCBzdW5kYXkgc2hvdWxkIGJlbG9uZyB0byB0aGUgcHJldmlvdXMgd2Vlay5cbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB0aGlzLmRheSgpIHx8IDcgOiB0aGlzLmRheSh0aGlzLmRheSgpICUgNyA/IGlucHV0IDogaW5wdXQgLSA3KTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignREREJywgWydEREREJywgM10sICdERERvJywgJ2RheU9mWWVhcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXlPZlllYXInLCAnREREJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdEREQnLCAgbWF0Y2gxdG8zKTtcbiAgICBhZGRSZWdleFRva2VuKCdEREREJywgbWF0Y2gzKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnREREJywgJ0REREQnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0RGF5T2ZZZWFyIChpbnB1dCkge1xuICAgICAgICB2YXIgZGF5T2ZZZWFyID0gTWF0aC5yb3VuZCgodGhpcy5jbG9uZSgpLnN0YXJ0T2YoJ2RheScpIC0gdGhpcy5jbG9uZSgpLnN0YXJ0T2YoJ3llYXInKSkgLyA4NjRlNSkgKyAxO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IGRheU9mWWVhciA6IHRoaXMuYWRkKChpbnB1dCAtIGRheU9mWWVhciksICdkJyk7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgZnVuY3Rpb24gaEZvcm1hdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaG91cnMoKSAlIDEyIHx8IDEyO1xuICAgIH1cblxuICAgIGFkZEZvcm1hdFRva2VuKCdIJywgWydISCcsIDJdLCAwLCAnaG91cicpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdoJywgWydoaCcsIDJdLCAwLCBoRm9ybWF0KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdobW0nLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJyArIGhGb3JtYXQuYXBwbHkodGhpcykgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignaG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJyArIGhGb3JtYXQuYXBwbHkodGhpcykgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMikgK1xuICAgICAgICAgICAgemVyb0ZpbGwodGhpcy5zZWNvbmRzKCksIDIpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0htbScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnICsgdGhpcy5ob3VycygpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0htbXNzJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJycgKyB0aGlzLmhvdXJzKCkgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMikgK1xuICAgICAgICAgICAgemVyb0ZpbGwodGhpcy5zZWNvbmRzKCksIDIpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gbWVyaWRpZW0gKHRva2VuLCBsb3dlcmNhc2UpIHtcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tZXJpZGllbSh0aGlzLmhvdXJzKCksIHRoaXMubWludXRlcygpLCBsb3dlcmNhc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtZXJpZGllbSgnYScsIHRydWUpO1xuICAgIG1lcmlkaWVtKCdBJywgZmFsc2UpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdob3VyJywgJ2gnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGZ1bmN0aW9uIG1hdGNoTWVyaWRpZW0gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5fbWVyaWRpZW1QYXJzZTtcbiAgICB9XG5cbiAgICBhZGRSZWdleFRva2VuKCdhJywgIG1hdGNoTWVyaWRpZW0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0EnLCAgbWF0Y2hNZXJpZGllbSk7XG4gICAgYWRkUmVnZXhUb2tlbignSCcsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2gnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdISCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdoaCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2htbScsIG1hdGNoM3RvNCk7XG4gICAgYWRkUmVnZXhUb2tlbignaG1tc3MnLCBtYXRjaDV0bzYpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0htbScsIG1hdGNoM3RvNCk7XG4gICAgYWRkUmVnZXhUb2tlbignSG1tc3MnLCBtYXRjaDV0bzYpO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ0gnLCAnSEgnXSwgSE9VUik7XG4gICAgYWRkUGFyc2VUb2tlbihbJ2EnLCAnQSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9pc1BtID0gY29uZmlnLl9sb2NhbGUuaXNQTShpbnB1dCk7XG4gICAgICAgIGNvbmZpZy5fbWVyaWRpZW0gPSBpbnB1dDtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKFsnaCcsICdoaCddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dCk7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB0cnVlO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ2htbScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICB2YXIgcG9zID0gaW5wdXQubGVuZ3RoIC0gMjtcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zKSk7XG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zKSk7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB0cnVlO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ2htbXNzJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MxID0gaW5wdXQubGVuZ3RoIC0gNDtcbiAgICAgICAgdmFyIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MxKSk7XG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMSwgMikpO1xuICAgICAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignSG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdIbW1zcycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICB2YXIgcG9zMSA9IGlucHV0Lmxlbmd0aCAtIDQ7XG4gICAgICAgIHZhciBwb3MyID0gaW5wdXQubGVuZ3RoIC0gMjtcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zMSkpO1xuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczEsIDIpKTtcbiAgICAgICAgYXJyYXlbU0VDT05EXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MyKSk7XG4gICAgfSk7XG5cbiAgICAvLyBMT0NBTEVTXG5cbiAgICBmdW5jdGlvbiBsb2NhbGVJc1BNIChpbnB1dCkge1xuICAgICAgICAvLyBJRTggUXVpcmtzIE1vZGUgJiBJRTcgU3RhbmRhcmRzIE1vZGUgZG8gbm90IGFsbG93IGFjY2Vzc2luZyBzdHJpbmdzIGxpa2UgYXJyYXlzXG4gICAgICAgIC8vIFVzaW5nIGNoYXJBdCBzaG91bGQgYmUgbW9yZSBjb21wYXRpYmxlLlxuICAgICAgICByZXR1cm4gKChpbnB1dCArICcnKS50b0xvd2VyQ2FzZSgpLmNoYXJBdCgwKSA9PT0gJ3AnKTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZU1lcmlkaWVtUGFyc2UgPSAvW2FwXVxcLj9tP1xcLj8vaTtcbiAgICBmdW5jdGlvbiBsb2NhbGVNZXJpZGllbSAoaG91cnMsIG1pbnV0ZXMsIGlzTG93ZXIpIHtcbiAgICAgICAgaWYgKGhvdXJzID4gMTEpIHtcbiAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ3BtJyA6ICdQTSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXNMb3dlciA/ICdhbScgOiAnQU0nO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICAvLyBTZXR0aW5nIHRoZSBob3VyIHNob3VsZCBrZWVwIHRoZSB0aW1lLCBiZWNhdXNlIHRoZSB1c2VyIGV4cGxpY2l0bHlcbiAgICAvLyBzcGVjaWZpZWQgd2hpY2ggaG91ciBoZSB3YW50cy4gU28gdHJ5aW5nIHRvIG1haW50YWluIHRoZSBzYW1lIGhvdXIgKGluXG4gICAgLy8gYSBuZXcgdGltZXpvbmUpIG1ha2VzIHNlbnNlLiBBZGRpbmcvc3VidHJhY3RpbmcgaG91cnMgZG9lcyBub3QgZm9sbG93XG4gICAgLy8gdGhpcyBydWxlLlxuICAgIHZhciBnZXRTZXRIb3VyID0gbWFrZUdldFNldCgnSG91cnMnLCB0cnVlKTtcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdtJywgWydtbScsIDJdLCAwLCAnbWludXRlJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21pbnV0ZScsICdtJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdtJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignbW0nLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUGFyc2VUb2tlbihbJ20nLCAnbW0nXSwgTUlOVVRFKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRNaW51dGUgPSBtYWtlR2V0U2V0KCdNaW51dGVzJywgZmFsc2UpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3MnLCBbJ3NzJywgMl0sIDAsICdzZWNvbmQnKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnc2Vjb25kJywgJ3MnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ3MnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdzcycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRQYXJzZVRva2VuKFsncycsICdzcyddLCBTRUNPTkQpO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldFNlY29uZCA9IG1ha2VHZXRTZXQoJ1NlY29uZHMnLCBmYWxzZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignUycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIH5+KHRoaXMubWlsbGlzZWNvbmQoKSAvIDEwMCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIH5+KHRoaXMubWlsbGlzZWNvbmQoKSAvIDEwKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTJywgM10sIDAsICdtaWxsaXNlY29uZCcpO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTUycsIDRdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTJywgNV0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTUycsIDZdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwO1xuICAgIH0pO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTUycsIDddLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1NTJywgOF0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1NTUycsIDldLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDAwO1xuICAgIH0pO1xuXG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21pbGxpc2Vjb25kJywgJ21zJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdTJywgICAgbWF0Y2gxdG8zLCBtYXRjaDEpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1NTJywgICBtYXRjaDF0bzMsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignU1NTJywgIG1hdGNoMXRvMywgbWF0Y2gzKTtcblxuICAgIHZhciB0b2tlbjtcbiAgICBmb3IgKHRva2VuID0gJ1NTU1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XG4gICAgICAgIGFkZFJlZ2V4VG9rZW4odG9rZW4sIG1hdGNoVW5zaWduZWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTXMoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W01JTExJU0VDT05EXSA9IHRvSW50KCgnMC4nICsgaW5wdXQpICogMTAwMCk7XG4gICAgfVxuXG4gICAgZm9yICh0b2tlbiA9ICdTJzsgdG9rZW4ubGVuZ3RoIDw9IDk7IHRva2VuICs9ICdTJykge1xuICAgICAgICBhZGRQYXJzZVRva2VuKHRva2VuLCBwYXJzZU1zKTtcbiAgICB9XG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldE1pbGxpc2Vjb25kID0gbWFrZUdldFNldCgnTWlsbGlzZWNvbmRzJywgZmFsc2UpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3onLCAgMCwgMCwgJ3pvbmVBYmJyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3p6JywgMCwgMCwgJ3pvbmVOYW1lJyk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRab25lQWJiciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/ICdVVEMnIDogJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Wm9uZU5hbWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyAnQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUnIDogJyc7XG4gICAgfVxuXG4gICAgdmFyIG1vbWVudFByb3RvdHlwZV9fcHJvdG8gPSBNb21lbnQucHJvdG90eXBlO1xuXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5hZGQgICAgICAgICAgICAgICA9IGFkZF9zdWJ0cmFjdF9fYWRkO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uY2FsZW5kYXIgICAgICAgICAgPSBtb21lbnRfY2FsZW5kYXJfX2NhbGVuZGFyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uY2xvbmUgICAgICAgICAgICAgPSBjbG9uZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRpZmYgICAgICAgICAgICAgID0gZGlmZjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmVuZE9mICAgICAgICAgICAgID0gZW5kT2Y7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5mb3JtYXQgICAgICAgICAgICA9IGZvcm1hdDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmZyb20gICAgICAgICAgICAgID0gZnJvbTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmZyb21Ob3cgICAgICAgICAgID0gZnJvbU5vdztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvICAgICAgICAgICAgICAgID0gdG87XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b05vdyAgICAgICAgICAgICA9IHRvTm93O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZ2V0ICAgICAgICAgICAgICAgPSBnZXRTZXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pbnZhbGlkQXQgICAgICAgICA9IGludmFsaWRBdDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzQWZ0ZXIgICAgICAgICAgID0gaXNBZnRlcjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzQmVmb3JlICAgICAgICAgID0gaXNCZWZvcmU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0JldHdlZW4gICAgICAgICA9IGlzQmV0d2VlbjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzU2FtZSAgICAgICAgICAgID0gaXNTYW1lO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNTYW1lT3JBZnRlciAgICAgPSBpc1NhbWVPckFmdGVyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNTYW1lT3JCZWZvcmUgICAgPSBpc1NhbWVPckJlZm9yZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVmFsaWQgICAgICAgICAgID0gbW9tZW50X3ZhbGlkX19pc1ZhbGlkO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubGFuZyAgICAgICAgICAgICAgPSBsYW5nO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubG9jYWxlICAgICAgICAgICAgPSBsb2NhbGU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sb2NhbGVEYXRhICAgICAgICA9IGxvY2FsZURhdGE7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5tYXggICAgICAgICAgICAgICA9IHByb3RvdHlwZU1heDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbiAgICAgICAgICAgICAgID0gcHJvdG90eXBlTWluO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ucGFyc2luZ0ZsYWdzICAgICAgPSBwYXJzaW5nRmxhZ3M7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5zZXQgICAgICAgICAgICAgICA9IGdldFNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnN0YXJ0T2YgICAgICAgICAgID0gc3RhcnRPZjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnN1YnRyYWN0ICAgICAgICAgID0gYWRkX3N1YnRyYWN0X19zdWJ0cmFjdDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvQXJyYXkgICAgICAgICAgID0gdG9BcnJheTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvT2JqZWN0ICAgICAgICAgID0gdG9PYmplY3Q7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b0RhdGUgICAgICAgICAgICA9IHRvRGF0ZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvSVNPU3RyaW5nICAgICAgID0gbW9tZW50X2Zvcm1hdF9fdG9JU09TdHJpbmc7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b0pTT04gICAgICAgICAgICA9IHRvSlNPTjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvU3RyaW5nICAgICAgICAgID0gdG9TdHJpbmc7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by51bml4ICAgICAgICAgICAgICA9IHVuaXg7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by52YWx1ZU9mICAgICAgICAgICA9IHRvX3R5cGVfX3ZhbHVlT2Y7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5jcmVhdGlvbkRhdGEgICAgICA9IGNyZWF0aW9uRGF0YTtcblxuICAgIC8vIFllYXJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnllYXIgICAgICAgPSBnZXRTZXRZZWFyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNMZWFwWWVhciA9IGdldElzTGVhcFllYXI7XG5cbiAgICAvLyBXZWVrIFllYXJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWtZZWFyICAgID0gZ2V0U2V0V2Vla1llYXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrWWVhciA9IGdldFNldElTT1dlZWtZZWFyO1xuXG4gICAgLy8gUXVhcnRlclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ucXVhcnRlciA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8ucXVhcnRlcnMgPSBnZXRTZXRRdWFydGVyO1xuXG4gICAgLy8gTW9udGhcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1vbnRoICAgICAgID0gZ2V0U2V0TW9udGg7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXlzSW5Nb250aCA9IGdldERheXNJbk1vbnRoO1xuXG4gICAgLy8gV2Vla1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2VlayAgICAgICAgICAgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWtzICAgICAgICA9IGdldFNldFdlZWs7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrICAgICAgICA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2Vla3MgICAgID0gZ2V0U2V0SVNPV2VlaztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWtzSW5ZZWFyICAgID0gZ2V0V2Vla3NJblllYXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrc0luWWVhciA9IGdldElTT1dlZWtzSW5ZZWFyO1xuXG4gICAgLy8gRGF5XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXRlICAgICAgID0gZ2V0U2V0RGF5T2ZNb250aDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRheSAgICAgICAgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRheXMgICAgICAgICAgICAgPSBnZXRTZXREYXlPZldlZWs7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrZGF5ICAgID0gZ2V0U2V0TG9jYWxlRGF5T2ZXZWVrO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2Vla2RheSA9IGdldFNldElTT0RheU9mV2VlaztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRheU9mWWVhciAgPSBnZXRTZXREYXlPZlllYXI7XG5cbiAgICAvLyBIb3VyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5ob3VyID0gbW9tZW50UHJvdG90eXBlX19wcm90by5ob3VycyA9IGdldFNldEhvdXI7XG5cbiAgICAvLyBNaW51dGVcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbnV0ZSA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWludXRlcyA9IGdldFNldE1pbnV0ZTtcblxuICAgIC8vIFNlY29uZFxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc2Vjb25kID0gbW9tZW50UHJvdG90eXBlX19wcm90by5zZWNvbmRzID0gZ2V0U2V0U2Vjb25kO1xuXG4gICAgLy8gTWlsbGlzZWNvbmRcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbGxpc2Vjb25kID0gbW9tZW50UHJvdG90eXBlX19wcm90by5taWxsaXNlY29uZHMgPSBnZXRTZXRNaWxsaXNlY29uZDtcblxuICAgIC8vIE9mZnNldFxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udXRjT2Zmc2V0ICAgICAgICAgICAgPSBnZXRTZXRPZmZzZXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by51dGMgICAgICAgICAgICAgICAgICA9IHNldE9mZnNldFRvVVRDO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubG9jYWwgICAgICAgICAgICAgICAgPSBzZXRPZmZzZXRUb0xvY2FsO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ucGFyc2Vab25lICAgICAgICAgICAgPSBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmhhc0FsaWduZWRIb3VyT2Zmc2V0ID0gaGFzQWxpZ25lZEhvdXJPZmZzZXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0RTVCAgICAgICAgICAgICAgICA9IGlzRGF5bGlnaHRTYXZpbmdUaW1lO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNEU1RTaGlmdGVkICAgICAgICAgPSBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0xvY2FsICAgICAgICAgICAgICA9IGlzTG9jYWw7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1V0Y09mZnNldCAgICAgICAgICA9IGlzVXRjT2Zmc2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNVdGMgICAgICAgICAgICAgICAgPSBpc1V0YztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVVRDICAgICAgICAgICAgICAgID0gaXNVdGM7XG5cbiAgICAvLyBUaW1lem9uZVxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uem9uZUFiYnIgPSBnZXRab25lQWJicjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnpvbmVOYW1lID0gZ2V0Wm9uZU5hbWU7XG5cbiAgICAvLyBEZXByZWNhdGlvbnNcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRhdGVzICA9IGRlcHJlY2F0ZSgnZGF0ZXMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIGRhdGUgaW5zdGVhZC4nLCBnZXRTZXREYXlPZk1vbnRoKTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1vbnRocyA9IGRlcHJlY2F0ZSgnbW9udGhzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb250aCBpbnN0ZWFkJywgZ2V0U2V0TW9udGgpO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ueWVhcnMgID0gZGVwcmVjYXRlKCd5ZWFycyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgeWVhciBpbnN0ZWFkJywgZ2V0U2V0WWVhcik7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by56b25lICAgPSBkZXByZWNhdGUoJ21vbWVudCgpLnpvbmUgaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudCgpLnV0Y09mZnNldCBpbnN0ZWFkLiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTc3OScsIGdldFNldFpvbmUpO1xuXG4gICAgdmFyIG1vbWVudFByb3RvdHlwZSA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG87XG5cbiAgICBmdW5jdGlvbiBtb21lbnRfX2NyZWF0ZVVuaXggKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb21lbnRfX2NyZWF0ZUluWm9uZSAoKSB7XG4gICAgICAgIHJldHVybiBsb2NhbF9fY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5wYXJzZVpvbmUoKTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdENhbGVuZGFyID0ge1xuICAgICAgICBzYW1lRGF5IDogJ1tUb2RheSBhdF0gTFQnLFxuICAgICAgICBuZXh0RGF5IDogJ1tUb21vcnJvdyBhdF0gTFQnLFxuICAgICAgICBuZXh0V2VlayA6ICdkZGRkIFthdF0gTFQnLFxuICAgICAgICBsYXN0RGF5IDogJ1tZZXN0ZXJkYXkgYXRdIExUJyxcbiAgICAgICAgbGFzdFdlZWsgOiAnW0xhc3RdIGRkZGQgW2F0XSBMVCcsXG4gICAgICAgIHNhbWVFbHNlIDogJ0wnXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvY2FsZV9jYWxlbmRhcl9fY2FsZW5kYXIgKGtleSwgbW9tLCBub3cpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX2NhbGVuZGFyW2tleV07XG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKG91dHB1dCkgPyBvdXRwdXQuY2FsbChtb20sIG5vdykgOiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb25nRGF0ZUZvcm1hdCA9IHtcbiAgICAgICAgTFRTICA6ICdoOm1tOnNzIEEnLFxuICAgICAgICBMVCAgIDogJ2g6bW0gQScsXG4gICAgICAgIEwgICAgOiAnTU0vREQvWVlZWScsXG4gICAgICAgIExMICAgOiAnTU1NTSBELCBZWVlZJyxcbiAgICAgICAgTExMICA6ICdNTU1NIEQsIFlZWVkgaDptbSBBJyxcbiAgICAgICAgTExMTCA6ICdkZGRkLCBNTU1NIEQsIFlZWVkgaDptbSBBJ1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb25nRGF0ZUZvcm1hdCAoa2V5KSB7XG4gICAgICAgIHZhciBmb3JtYXQgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldLFxuICAgICAgICAgICAgZm9ybWF0VXBwZXIgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGZvcm1hdCB8fCAhZm9ybWF0VXBwZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldID0gZm9ybWF0VXBwZXIucmVwbGFjZSgvTU1NTXxNTXxERHxkZGRkL2csIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWwuc2xpY2UoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0SW52YWxpZERhdGUgPSAnSW52YWxpZCBkYXRlJztcblxuICAgIGZ1bmN0aW9uIGludmFsaWREYXRlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludmFsaWREYXRlO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0T3JkaW5hbCA9ICclZCc7XG4gICAgdmFyIGRlZmF1bHRPcmRpbmFsUGFyc2UgPSAvXFxkezEsMn0vO1xuXG4gICAgZnVuY3Rpb24gb3JkaW5hbCAobnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmRpbmFsLnJlcGxhY2UoJyVkJywgbnVtYmVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVQYXJzZVBvc3RGb3JtYXQgKHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0UmVsYXRpdmVUaW1lID0ge1xuICAgICAgICBmdXR1cmUgOiAnaW4gJXMnLFxuICAgICAgICBwYXN0ICAgOiAnJXMgYWdvJyxcbiAgICAgICAgcyAgOiAnYSBmZXcgc2Vjb25kcycsXG4gICAgICAgIG0gIDogJ2EgbWludXRlJyxcbiAgICAgICAgbW0gOiAnJWQgbWludXRlcycsXG4gICAgICAgIGggIDogJ2FuIGhvdXInLFxuICAgICAgICBoaCA6ICclZCBob3VycycsXG4gICAgICAgIGQgIDogJ2EgZGF5JyxcbiAgICAgICAgZGQgOiAnJWQgZGF5cycsXG4gICAgICAgIE0gIDogJ2EgbW9udGgnLFxuICAgICAgICBNTSA6ICclZCBtb250aHMnLFxuICAgICAgICB5ICA6ICdhIHllYXInLFxuICAgICAgICB5eSA6ICclZCB5ZWFycydcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVsYXRpdmVfX3JlbGF0aXZlVGltZSAobnVtYmVyLCB3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbc3RyaW5nXTtcbiAgICAgICAgcmV0dXJuIChpc0Z1bmN0aW9uKG91dHB1dCkpID9cbiAgICAgICAgICAgIG91dHB1dChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIDpcbiAgICAgICAgICAgIG91dHB1dC5yZXBsYWNlKC8lZC9pLCBudW1iZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhc3RGdXR1cmUgKGRpZmYsIG91dHB1dCkge1xuICAgICAgICB2YXIgZm9ybWF0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW2RpZmYgPiAwID8gJ2Z1dHVyZScgOiAncGFzdCddO1xuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbihmb3JtYXQpID8gZm9ybWF0KG91dHB1dCkgOiBmb3JtYXQucmVwbGFjZSgvJXMvaSwgb3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVfc2V0X19zZXQgKGNvbmZpZykge1xuICAgICAgICB2YXIgcHJvcCwgaTtcbiAgICAgICAgZm9yIChpIGluIGNvbmZpZykge1xuICAgICAgICAgICAgcHJvcCA9IGNvbmZpZ1tpXTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHByb3ApKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tpXSA9IHByb3A7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXNbJ18nICsgaV0gPSBwcm9wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIExlbmllbnQgb3JkaW5hbCBwYXJzaW5nIGFjY2VwdHMganVzdCBhIG51bWJlciBpbiBhZGRpdGlvbiB0b1xuICAgICAgICAvLyBudW1iZXIgKyAocG9zc2libHkpIHN0dWZmIGNvbWluZyBmcm9tIF9vcmRpbmFsUGFyc2VMZW5pZW50LlxuICAgICAgICB0aGlzLl9vcmRpbmFsUGFyc2VMZW5pZW50ID0gbmV3IFJlZ0V4cCh0aGlzLl9vcmRpbmFsUGFyc2Uuc291cmNlICsgJ3wnICsgKC9cXGR7MSwyfS8pLnNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvdHlwZV9fcHJvdG8gPSBMb2NhbGUucHJvdG90eXBlO1xuXG4gICAgcHJvdG90eXBlX19wcm90by5fY2FsZW5kYXIgICAgICAgPSBkZWZhdWx0Q2FsZW5kYXI7XG4gICAgcHJvdG90eXBlX19wcm90by5jYWxlbmRhciAgICAgICAgPSBsb2NhbGVfY2FsZW5kYXJfX2NhbGVuZGFyO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX2xvbmdEYXRlRm9ybWF0ID0gZGVmYXVsdExvbmdEYXRlRm9ybWF0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ubG9uZ0RhdGVGb3JtYXQgID0gbG9uZ0RhdGVGb3JtYXQ7XG4gICAgcHJvdG90eXBlX19wcm90by5faW52YWxpZERhdGUgICAgPSBkZWZhdWx0SW52YWxpZERhdGU7XG4gICAgcHJvdG90eXBlX19wcm90by5pbnZhbGlkRGF0ZSAgICAgPSBpbnZhbGlkRGF0ZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9vcmRpbmFsICAgICAgICA9IGRlZmF1bHRPcmRpbmFsO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ub3JkaW5hbCAgICAgICAgID0gb3JkaW5hbDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9vcmRpbmFsUGFyc2UgICA9IGRlZmF1bHRPcmRpbmFsUGFyc2U7XG4gICAgcHJvdG90eXBlX19wcm90by5wcmVwYXJzZSAgICAgICAgPSBwcmVQYXJzZVBvc3RGb3JtYXQ7XG4gICAgcHJvdG90eXBlX19wcm90by5wb3N0Zm9ybWF0ICAgICAgPSBwcmVQYXJzZVBvc3RGb3JtYXQ7XG4gICAgcHJvdG90eXBlX19wcm90by5fcmVsYXRpdmVUaW1lICAgPSBkZWZhdWx0UmVsYXRpdmVUaW1lO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ucmVsYXRpdmVUaW1lICAgID0gcmVsYXRpdmVfX3JlbGF0aXZlVGltZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLnBhc3RGdXR1cmUgICAgICA9IHBhc3RGdXR1cmU7XG4gICAgcHJvdG90eXBlX19wcm90by5zZXQgICAgICAgICAgICAgPSBsb2NhbGVfc2V0X19zZXQ7XG5cbiAgICAvLyBNb250aFxuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzICAgICAgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX21vbnRocyAgICAgICAgICAgPSBkZWZhdWx0TG9jYWxlTW9udGhzO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzU2hvcnQgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzU2hvcnQ7XG4gICAgcHJvdG90eXBlX19wcm90by5fbW9udGhzU2hvcnQgICAgICA9IGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRoc1BhcnNlICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRoc1BhcnNlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX21vbnRoc1JlZ2V4ICAgICAgPSBkZWZhdWx0TW9udGhzUmVnZXg7XG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHNSZWdleCAgICAgICA9IG1vbnRoc1JlZ2V4O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX21vbnRoc1Nob3J0UmVnZXggPSBkZWZhdWx0TW9udGhzU2hvcnRSZWdleDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRoc1Nob3J0UmVnZXggID0gbW9udGhzU2hvcnRSZWdleDtcblxuICAgIC8vIFdlZWtcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWsgPSBsb2NhbGVXZWVrO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWsgPSBkZWZhdWx0TG9jYWxlV2VlaztcbiAgICBwcm90b3R5cGVfX3Byb3RvLmZpcnN0RGF5T2ZZZWFyID0gbG9jYWxlRmlyc3REYXlPZlllYXI7XG4gICAgcHJvdG90eXBlX19wcm90by5maXJzdERheU9mV2VlayA9IGxvY2FsZUZpcnN0RGF5T2ZXZWVrO1xuXG4gICAgLy8gRGF5IG9mIFdlZWtcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzICAgICAgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzICAgICAgPSBkZWZhdWx0TG9jYWxlV2Vla2RheXM7XG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c01pbiAgICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c01pbjtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5c01pbiAgID0gZGVmYXVsdExvY2FsZVdlZWtkYXlzTWluO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNTaG9ydCAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNTaG9ydDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5c1Nob3J0ID0gZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQ7XG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c1BhcnNlICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c1BhcnNlO1xuXG4gICAgLy8gSG91cnNcbiAgICBwcm90b3R5cGVfX3Byb3RvLmlzUE0gPSBsb2NhbGVJc1BNO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX21lcmlkaWVtUGFyc2UgPSBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1lcmlkaWVtID0gbG9jYWxlTWVyaWRpZW07XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fZ2V0IChmb3JtYXQsIGluZGV4LCBmaWVsZCwgc2V0dGVyKSB7XG4gICAgICAgIHZhciBsb2NhbGUgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKCk7XG4gICAgICAgIHZhciB1dGMgPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoKS5zZXQoc2V0dGVyLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBsb2NhbGVbZmllbGRdKHV0YywgZm9ybWF0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0IChmb3JtYXQsIGluZGV4LCBmaWVsZCwgY291bnQsIHNldHRlcikge1xuICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xuICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICcnO1xuXG4gICAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdHNfX2dldChmb3JtYXQsIGluZGV4LCBmaWVsZCwgc2V0dGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBvdXRbaV0gPSBsaXN0c19fZ2V0KGZvcm1hdCwgaSwgZmllbGQsIHNldHRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdE1vbnRocyAoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdChmb3JtYXQsIGluZGV4LCAnbW9udGhzJywgMTIsICdtb250aCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0TW9udGhzU2hvcnQgKGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QoZm9ybWF0LCBpbmRleCwgJ21vbnRoc1Nob3J0JywgMTIsICdtb250aCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0V2Vla2RheXMgKGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QoZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzJywgNywgJ2RheScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0V2Vla2RheXNTaG9ydCAoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdChmb3JtYXQsIGluZGV4LCAnd2Vla2RheXNTaG9ydCcsIDcsICdkYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdFdlZWtkYXlzTWluIChmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0KGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c01pbicsIDcsICdkYXknKTtcbiAgICB9XG5cbiAgICBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKCdlbicsIHtcbiAgICAgICAgb3JkaW5hbFBhcnNlOiAvXFxkezEsMn0odGh8c3R8bmR8cmQpLyxcbiAgICAgICAgb3JkaW5hbCA6IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBiID0gbnVtYmVyICUgMTAsXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gKHRvSW50KG51bWJlciAlIDEwMCAvIDEwKSA9PT0gMSkgPyAndGgnIDpcbiAgICAgICAgICAgICAgICAoYiA9PT0gMSkgPyAnc3QnIDpcbiAgICAgICAgICAgICAgICAoYiA9PT0gMikgPyAnbmQnIDpcbiAgICAgICAgICAgICAgICAoYiA9PT0gMykgPyAncmQnIDogJ3RoJztcbiAgICAgICAgICAgIHJldHVybiBudW1iZXIgKyBvdXRwdXQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcbiAgICB1dGlsc19ob29rc19faG9va3MubGFuZyA9IGRlcHJlY2F0ZSgnbW9tZW50LmxhbmcgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGUgaW5zdGVhZC4nLCBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKTtcbiAgICB1dGlsc19ob29rc19faG9va3MubGFuZ0RhdGEgPSBkZXByZWNhdGUoJ21vbWVudC5sYW5nRGF0YSBpcyBkZXByZWNhdGVkLiBVc2UgbW9tZW50LmxvY2FsZURhdGEgaW5zdGVhZC4nLCBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKTtcblxuICAgIHZhciBtYXRoQWJzID0gTWF0aC5hYnM7XG5cbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hYnNfX2FicyAoKSB7XG4gICAgICAgIHZhciBkYXRhICAgICAgICAgICA9IHRoaXMuX2RhdGE7XG5cbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gbWF0aEFicyh0aGlzLl9taWxsaXNlY29uZHMpO1xuICAgICAgICB0aGlzLl9kYXlzICAgICAgICAgPSBtYXRoQWJzKHRoaXMuX2RheXMpO1xuICAgICAgICB0aGlzLl9tb250aHMgICAgICAgPSBtYXRoQWJzKHRoaXMuX21vbnRocyk7XG5cbiAgICAgICAgZGF0YS5taWxsaXNlY29uZHMgID0gbWF0aEFicyhkYXRhLm1pbGxpc2Vjb25kcyk7XG4gICAgICAgIGRhdGEuc2Vjb25kcyAgICAgICA9IG1hdGhBYnMoZGF0YS5zZWNvbmRzKTtcbiAgICAgICAgZGF0YS5taW51dGVzICAgICAgID0gbWF0aEFicyhkYXRhLm1pbnV0ZXMpO1xuICAgICAgICBkYXRhLmhvdXJzICAgICAgICAgPSBtYXRoQWJzKGRhdGEuaG91cnMpO1xuICAgICAgICBkYXRhLm1vbnRocyAgICAgICAgPSBtYXRoQWJzKGRhdGEubW9udGhzKTtcbiAgICAgICAgZGF0YS55ZWFycyAgICAgICAgID0gbWF0aEFicyhkYXRhLnllYXJzKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0IChkdXJhdGlvbiwgaW5wdXQsIHZhbHVlLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIG90aGVyID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbihpbnB1dCwgdmFsdWUpO1xuXG4gICAgICAgIGR1cmF0aW9uLl9taWxsaXNlY29uZHMgKz0gZGlyZWN0aW9uICogb3RoZXIuX21pbGxpc2Vjb25kcztcbiAgICAgICAgZHVyYXRpb24uX2RheXMgICAgICAgICArPSBkaXJlY3Rpb24gKiBvdGhlci5fZGF5cztcbiAgICAgICAgZHVyYXRpb24uX21vbnRocyAgICAgICArPSBkaXJlY3Rpb24gKiBvdGhlci5fbW9udGhzO1xuXG4gICAgICAgIHJldHVybiBkdXJhdGlvbi5fYnViYmxlKCk7XG4gICAgfVxuXG4gICAgLy8gc3VwcG9ydHMgb25seSAyLjAtc3R5bGUgYWRkKDEsICdzJykgb3IgYWRkKGR1cmF0aW9uKVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkIChpbnB1dCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgaW5wdXQsIHZhbHVlLCAxKTtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBzdWJ0cmFjdCgxLCAncycpIG9yIHN1YnRyYWN0KGR1cmF0aW9uKVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fc3VidHJhY3QgKGlucHV0LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBpbnB1dCwgdmFsdWUsIC0xKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhYnNDZWlsIChudW1iZXIpIHtcbiAgICAgICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBidWJibGUgKCkge1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzO1xuICAgICAgICB2YXIgZGF5cyAgICAgICAgID0gdGhpcy5fZGF5cztcbiAgICAgICAgdmFyIG1vbnRocyAgICAgICA9IHRoaXMuX21vbnRocztcbiAgICAgICAgdmFyIGRhdGEgICAgICAgICA9IHRoaXMuX2RhdGE7XG4gICAgICAgIHZhciBzZWNvbmRzLCBtaW51dGVzLCBob3VycywgeWVhcnMsIG1vbnRoc0Zyb21EYXlzO1xuXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYSBtaXggb2YgcG9zaXRpdmUgYW5kIG5lZ2F0aXZlIHZhbHVlcywgYnViYmxlIGRvd24gZmlyc3RcbiAgICAgICAgLy8gY2hlY2s6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8yMTY2XG4gICAgICAgIGlmICghKChtaWxsaXNlY29uZHMgPj0gMCAmJiBkYXlzID49IDAgJiYgbW9udGhzID49IDApIHx8XG4gICAgICAgICAgICAgICAgKG1pbGxpc2Vjb25kcyA8PSAwICYmIGRheXMgPD0gMCAmJiBtb250aHMgPD0gMCkpKSB7XG4gICAgICAgICAgICBtaWxsaXNlY29uZHMgKz0gYWJzQ2VpbChtb250aHNUb0RheXMobW9udGhzKSArIGRheXMpICogODY0ZTU7XG4gICAgICAgICAgICBkYXlzID0gMDtcbiAgICAgICAgICAgIG1vbnRocyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGNvZGUgYnViYmxlcyB1cCB2YWx1ZXMsIHNlZSB0aGUgdGVzdHMgZm9yXG4gICAgICAgIC8vIGV4YW1wbGVzIG9mIHdoYXQgdGhhdCBtZWFucy5cbiAgICAgICAgZGF0YS5taWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHMgJSAxMDAwO1xuXG4gICAgICAgIHNlY29uZHMgICAgICAgICAgID0gYWJzRmxvb3IobWlsbGlzZWNvbmRzIC8gMTAwMCk7XG4gICAgICAgIGRhdGEuc2Vjb25kcyAgICAgID0gc2Vjb25kcyAlIDYwO1xuXG4gICAgICAgIG1pbnV0ZXMgICAgICAgICAgID0gYWJzRmxvb3Ioc2Vjb25kcyAvIDYwKTtcbiAgICAgICAgZGF0YS5taW51dGVzICAgICAgPSBtaW51dGVzICUgNjA7XG5cbiAgICAgICAgaG91cnMgICAgICAgICAgICAgPSBhYnNGbG9vcihtaW51dGVzIC8gNjApO1xuICAgICAgICBkYXRhLmhvdXJzICAgICAgICA9IGhvdXJzICUgMjQ7XG5cbiAgICAgICAgZGF5cyArPSBhYnNGbG9vcihob3VycyAvIDI0KTtcblxuICAgICAgICAvLyBjb252ZXJ0IGRheXMgdG8gbW9udGhzXG4gICAgICAgIG1vbnRoc0Zyb21EYXlzID0gYWJzRmxvb3IoZGF5c1RvTW9udGhzKGRheXMpKTtcbiAgICAgICAgbW9udGhzICs9IG1vbnRoc0Zyb21EYXlzO1xuICAgICAgICBkYXlzIC09IGFic0NlaWwobW9udGhzVG9EYXlzKG1vbnRoc0Zyb21EYXlzKSk7XG5cbiAgICAgICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxuICAgICAgICB5ZWFycyA9IGFic0Zsb29yKG1vbnRocyAvIDEyKTtcbiAgICAgICAgbW9udGhzICU9IDEyO1xuXG4gICAgICAgIGRhdGEuZGF5cyAgID0gZGF5cztcbiAgICAgICAgZGF0YS5tb250aHMgPSBtb250aHM7XG4gICAgICAgIGRhdGEueWVhcnMgID0geWVhcnM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGF5c1RvTW9udGhzIChkYXlzKSB7XG4gICAgICAgIC8vIDQwMCB5ZWFycyBoYXZlIDE0NjA5NyBkYXlzICh0YWtpbmcgaW50byBhY2NvdW50IGxlYXAgeWVhciBydWxlcylcbiAgICAgICAgLy8gNDAwIHllYXJzIGhhdmUgMTIgbW9udGhzID09PSA0ODAwXG4gICAgICAgIHJldHVybiBkYXlzICogNDgwMCAvIDE0NjA5NztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb250aHNUb0RheXMgKG1vbnRocykge1xuICAgICAgICAvLyB0aGUgcmV2ZXJzZSBvZiBkYXlzVG9Nb250aHNcbiAgICAgICAgcmV0dXJuIG1vbnRocyAqIDE0NjA5NyAvIDQ4MDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXMgKHVuaXRzKSB7XG4gICAgICAgIHZhciBkYXlzO1xuICAgICAgICB2YXIgbW9udGhzO1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzO1xuXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21vbnRoJyB8fCB1bml0cyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICBkYXlzICAgPSB0aGlzLl9kYXlzICAgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgICAgIG1vbnRocyA9IHRoaXMuX21vbnRocyArIGRheXNUb01vbnRocyhkYXlzKTtcbiAgICAgICAgICAgIHJldHVybiB1bml0cyA9PT0gJ21vbnRoJyA/IG1vbnRocyA6IG1vbnRocyAvIDEyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaGFuZGxlIG1pbGxpc2Vjb25kcyBzZXBhcmF0ZWx5IGJlY2F1c2Ugb2YgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgKGlzc3VlICMxODY3KVxuICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2RheXMgKyBNYXRoLnJvdW5kKG1vbnRoc1RvRGF5cyh0aGlzLl9tb250aHMpKTtcbiAgICAgICAgICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd3ZWVrJyAgIDogcmV0dXJuIGRheXMgLyA3ICAgICArIG1pbGxpc2Vjb25kcyAvIDYwNDhlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXknICAgIDogcmV0dXJuIGRheXMgICAgICAgICArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hvdXInICAgOiByZXR1cm4gZGF5cyAqIDI0ICAgICsgbWlsbGlzZWNvbmRzIC8gMzZlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdtaW51dGUnIDogcmV0dXJuIGRheXMgKiAxNDQwICArIG1pbGxpc2Vjb25kcyAvIDZlNDtcbiAgICAgICAgICAgICAgICBjYXNlICdzZWNvbmQnIDogcmV0dXJuIGRheXMgKiA4NjQwMCArIG1pbGxpc2Vjb25kcyAvIDEwMDA7XG4gICAgICAgICAgICAgICAgLy8gTWF0aC5mbG9vciBwcmV2ZW50cyBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyBoZXJlXG4gICAgICAgICAgICAgICAgY2FzZSAnbWlsbGlzZWNvbmQnOiByZXR1cm4gTWF0aC5mbG9vcihkYXlzICogODY0ZTUpICsgbWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignVW5rbm93biB1bml0ICcgKyB1bml0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiBVc2UgdGhpcy5hcygnbXMnKT9cbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hc19fdmFsdWVPZiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgK1xuICAgICAgICAgICAgdGhpcy5fZGF5cyAqIDg2NGU1ICtcbiAgICAgICAgICAgICh0aGlzLl9tb250aHMgJSAxMikgKiAyNTkyZTYgK1xuICAgICAgICAgICAgdG9JbnQodGhpcy5fbW9udGhzIC8gMTIpICogMzE1MzZlNlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VBcyAoYWxpYXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFzKGFsaWFzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgYXNNaWxsaXNlY29uZHMgPSBtYWtlQXMoJ21zJyk7XG4gICAgdmFyIGFzU2Vjb25kcyAgICAgID0gbWFrZUFzKCdzJyk7XG4gICAgdmFyIGFzTWludXRlcyAgICAgID0gbWFrZUFzKCdtJyk7XG4gICAgdmFyIGFzSG91cnMgICAgICAgID0gbWFrZUFzKCdoJyk7XG4gICAgdmFyIGFzRGF5cyAgICAgICAgID0gbWFrZUFzKCdkJyk7XG4gICAgdmFyIGFzV2Vla3MgICAgICAgID0gbWFrZUFzKCd3Jyk7XG4gICAgdmFyIGFzTW9udGhzICAgICAgID0gbWFrZUFzKCdNJyk7XG4gICAgdmFyIGFzWWVhcnMgICAgICAgID0gbWFrZUFzKCd5Jyk7XG5cbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9nZXRfX2dldCAodW5pdHMpIHtcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgIHJldHVybiB0aGlzW3VuaXRzICsgJ3MnXSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VHZXR0ZXIobmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbbmFtZV07XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIG1pbGxpc2Vjb25kcyA9IG1ha2VHZXR0ZXIoJ21pbGxpc2Vjb25kcycpO1xuICAgIHZhciBzZWNvbmRzICAgICAgPSBtYWtlR2V0dGVyKCdzZWNvbmRzJyk7XG4gICAgdmFyIG1pbnV0ZXMgICAgICA9IG1ha2VHZXR0ZXIoJ21pbnV0ZXMnKTtcbiAgICB2YXIgaG91cnMgICAgICAgID0gbWFrZUdldHRlcignaG91cnMnKTtcbiAgICB2YXIgZGF5cyAgICAgICAgID0gbWFrZUdldHRlcignZGF5cycpO1xuICAgIHZhciBtb250aHMgICAgICAgPSBtYWtlR2V0dGVyKCdtb250aHMnKTtcbiAgICB2YXIgeWVhcnMgICAgICAgID0gbWFrZUdldHRlcigneWVhcnMnKTtcblxuICAgIGZ1bmN0aW9uIHdlZWtzICgpIHtcbiAgICAgICAgcmV0dXJuIGFic0Zsb29yKHRoaXMuZGF5cygpIC8gNyk7XG4gICAgfVxuXG4gICAgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcbiAgICB2YXIgdGhyZXNob2xkcyA9IHtcbiAgICAgICAgczogNDUsICAvLyBzZWNvbmRzIHRvIG1pbnV0ZVxuICAgICAgICBtOiA0NSwgIC8vIG1pbnV0ZXMgdG8gaG91clxuICAgICAgICBoOiAyMiwgIC8vIGhvdXJzIHRvIGRheVxuICAgICAgICBkOiAyNiwgIC8vIGRheXMgdG8gbW9udGhcbiAgICAgICAgTTogMTEgICAvLyBtb250aHMgdG8geWVhclxuICAgIH07XG5cbiAgICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIG1vbWVudC5mbi5mcm9tLCBtb21lbnQuZm4uZnJvbU5vdywgYW5kIG1vbWVudC5kdXJhdGlvbi5mbi5odW1hbml6ZVxuICAgIGZ1bmN0aW9uIHN1YnN0aXR1dGVUaW1lQWdvKHN0cmluZywgbnVtYmVyLCB3aXRob3V0U3VmZml4LCBpc0Z1dHVyZSwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUucmVsYXRpdmVUaW1lKG51bWJlciB8fCAxLCAhIXdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2h1bWFuaXplX19yZWxhdGl2ZVRpbWUgKHBvc05lZ0R1cmF0aW9uLCB3aXRob3V0U3VmZml4LCBsb2NhbGUpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbihwb3NOZWdEdXJhdGlvbikuYWJzKCk7XG4gICAgICAgIHZhciBzZWNvbmRzICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdzJykpO1xuICAgICAgICB2YXIgbWludXRlcyAgPSByb3VuZChkdXJhdGlvbi5hcygnbScpKTtcbiAgICAgICAgdmFyIGhvdXJzICAgID0gcm91bmQoZHVyYXRpb24uYXMoJ2gnKSk7XG4gICAgICAgIHZhciBkYXlzICAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdkJykpO1xuICAgICAgICB2YXIgbW9udGhzICAgPSByb3VuZChkdXJhdGlvbi5hcygnTScpKTtcbiAgICAgICAgdmFyIHllYXJzICAgID0gcm91bmQoZHVyYXRpb24uYXMoJ3knKSk7XG5cbiAgICAgICAgdmFyIGEgPSBzZWNvbmRzIDwgdGhyZXNob2xkcy5zICYmIFsncycsIHNlY29uZHNdICB8fFxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPD0gMSAgICAgICAgICAgJiYgWydtJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICAgICAgbWludXRlcyA8IHRocmVzaG9sZHMubSAmJiBbJ21tJywgbWludXRlc10gfHxcbiAgICAgICAgICAgICAgICBob3VycyAgIDw9IDEgICAgICAgICAgICYmIFsnaCddICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIGhvdXJzICAgPCB0aHJlc2hvbGRzLmggJiYgWydoaCcsIGhvdXJzXSAgIHx8XG4gICAgICAgICAgICAgICAgZGF5cyAgICA8PSAxICAgICAgICAgICAmJiBbJ2QnXSAgICAgICAgICAgfHxcbiAgICAgICAgICAgICAgICBkYXlzICAgIDwgdGhyZXNob2xkcy5kICYmIFsnZGQnLCBkYXlzXSAgICB8fFxuICAgICAgICAgICAgICAgIG1vbnRocyAgPD0gMSAgICAgICAgICAgJiYgWydNJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICAgICAgbW9udGhzICA8IHRocmVzaG9sZHMuTSAmJiBbJ01NJywgbW9udGhzXSAgfHxcbiAgICAgICAgICAgICAgICB5ZWFycyAgIDw9IDEgICAgICAgICAgICYmIFsneSddICAgICAgICAgICB8fCBbJ3l5JywgeWVhcnNdO1xuXG4gICAgICAgIGFbMl0gPSB3aXRob3V0U3VmZml4O1xuICAgICAgICBhWzNdID0gK3Bvc05lZ0R1cmF0aW9uID4gMDtcbiAgICAgICAgYVs0XSA9IGxvY2FsZTtcbiAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVUaW1lQWdvLmFwcGx5KG51bGwsIGEpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZXQgYSB0aHJlc2hvbGQgZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2h1bWFuaXplX19nZXRTZXRSZWxhdGl2ZVRpbWVUaHJlc2hvbGQgKHRocmVzaG9sZCwgbGltaXQpIHtcbiAgICAgICAgaWYgKHRocmVzaG9sZHNbdGhyZXNob2xkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpbWl0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aHJlc2hvbGRzW3RocmVzaG9sZF07XG4gICAgICAgIH1cbiAgICAgICAgdGhyZXNob2xkc1t0aHJlc2hvbGRdID0gbGltaXQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGh1bWFuaXplICh3aXRoU3VmZml4KSB7XG4gICAgICAgIHZhciBsb2NhbGUgPSB0aGlzLmxvY2FsZURhdGEoKTtcbiAgICAgICAgdmFyIG91dHB1dCA9IGR1cmF0aW9uX2h1bWFuaXplX19yZWxhdGl2ZVRpbWUodGhpcywgIXdpdGhTdWZmaXgsIGxvY2FsZSk7XG5cbiAgICAgICAgaWYgKHdpdGhTdWZmaXgpIHtcbiAgICAgICAgICAgIG91dHB1dCA9IGxvY2FsZS5wYXN0RnV0dXJlKCt0aGlzLCBvdXRwdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxvY2FsZS5wb3N0Zm9ybWF0KG91dHB1dCk7XG4gICAgfVxuXG4gICAgdmFyIGlzb19zdHJpbmdfX2FicyA9IE1hdGguYWJzO1xuXG4gICAgZnVuY3Rpb24gaXNvX3N0cmluZ19fdG9JU09TdHJpbmcoKSB7XG4gICAgICAgIC8vIGZvciBJU08gc3RyaW5ncyB3ZSBkbyBub3QgdXNlIHRoZSBub3JtYWwgYnViYmxpbmcgcnVsZXM6XG4gICAgICAgIC8vICAqIG1pbGxpc2Vjb25kcyBidWJibGUgdXAgdW50aWwgdGhleSBiZWNvbWUgaG91cnNcbiAgICAgICAgLy8gICogZGF5cyBkbyBub3QgYnViYmxlIGF0IGFsbFxuICAgICAgICAvLyAgKiBtb250aHMgYnViYmxlIHVwIHVudGlsIHRoZXkgYmVjb21lIHllYXJzXG4gICAgICAgIC8vIFRoaXMgaXMgYmVjYXVzZSB0aGVyZSBpcyBubyBjb250ZXh0LWZyZWUgY29udmVyc2lvbiBiZXR3ZWVuIGhvdXJzIGFuZCBkYXlzXG4gICAgICAgIC8vICh0aGluayBvZiBjbG9jayBjaGFuZ2VzKVxuICAgICAgICAvLyBhbmQgYWxzbyBub3QgYmV0d2VlbiBkYXlzIGFuZCBtb250aHMgKDI4LTMxIGRheXMgcGVyIG1vbnRoKVxuICAgICAgICB2YXIgc2Vjb25kcyA9IGlzb19zdHJpbmdfX2Ficyh0aGlzLl9taWxsaXNlY29uZHMpIC8gMTAwMDtcbiAgICAgICAgdmFyIGRheXMgICAgICAgICA9IGlzb19zdHJpbmdfX2Ficyh0aGlzLl9kYXlzKTtcbiAgICAgICAgdmFyIG1vbnRocyAgICAgICA9IGlzb19zdHJpbmdfX2Ficyh0aGlzLl9tb250aHMpO1xuICAgICAgICB2YXIgbWludXRlcywgaG91cnMsIHllYXJzO1xuXG4gICAgICAgIC8vIDM2MDAgc2Vjb25kcyAtPiA2MCBtaW51dGVzIC0+IDEgaG91clxuICAgICAgICBtaW51dGVzICAgICAgICAgICA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcbiAgICAgICAgc2Vjb25kcyAlPSA2MDtcbiAgICAgICAgbWludXRlcyAlPSA2MDtcblxuICAgICAgICAvLyAxMiBtb250aHMgLT4gMSB5ZWFyXG4gICAgICAgIHllYXJzICA9IGFic0Zsb29yKG1vbnRocyAvIDEyKTtcbiAgICAgICAgbW9udGhzICU9IDEyO1xuXG5cbiAgICAgICAgLy8gaW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2RvcmRpbGxlL21vbWVudC1pc29kdXJhdGlvbi9ibG9iL21hc3Rlci9tb21lbnQuaXNvZHVyYXRpb24uanNcbiAgICAgICAgdmFyIFkgPSB5ZWFycztcbiAgICAgICAgdmFyIE0gPSBtb250aHM7XG4gICAgICAgIHZhciBEID0gZGF5cztcbiAgICAgICAgdmFyIGggPSBob3VycztcbiAgICAgICAgdmFyIG0gPSBtaW51dGVzO1xuICAgICAgICB2YXIgcyA9IHNlY29uZHM7XG4gICAgICAgIHZhciB0b3RhbCA9IHRoaXMuYXNTZWNvbmRzKCk7XG5cbiAgICAgICAgaWYgKCF0b3RhbCkge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgc2FtZSBhcyBDIydzIChOb2RhKSBhbmQgcHl0aG9uIChpc29kYXRlKS4uLlxuICAgICAgICAgICAgLy8gYnV0IG5vdCBvdGhlciBKUyAoZ29vZy5kYXRlKVxuICAgICAgICAgICAgcmV0dXJuICdQMEQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICh0b3RhbCA8IDAgPyAnLScgOiAnJykgK1xuICAgICAgICAgICAgJ1AnICtcbiAgICAgICAgICAgIChZID8gWSArICdZJyA6ICcnKSArXG4gICAgICAgICAgICAoTSA/IE0gKyAnTScgOiAnJykgK1xuICAgICAgICAgICAgKEQgPyBEICsgJ0QnIDogJycpICtcbiAgICAgICAgICAgICgoaCB8fCBtIHx8IHMpID8gJ1QnIDogJycpICtcbiAgICAgICAgICAgIChoID8gaCArICdIJyA6ICcnKSArXG4gICAgICAgICAgICAobSA/IG0gKyAnTScgOiAnJykgK1xuICAgICAgICAgICAgKHMgPyBzICsgJ1MnIDogJycpO1xuICAgIH1cblxuICAgIHZhciBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvID0gRHVyYXRpb24ucHJvdG90eXBlO1xuXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hYnMgICAgICAgICAgICA9IGR1cmF0aW9uX2Fic19fYWJzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYWRkICAgICAgICAgICAgPSBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZDtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnN1YnRyYWN0ICAgICAgID0gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19zdWJ0cmFjdDtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzICAgICAgICAgICAgID0gYXM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc01pbGxpc2Vjb25kcyA9IGFzTWlsbGlzZWNvbmRzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNTZWNvbmRzICAgICAgPSBhc1NlY29uZHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc01pbnV0ZXMgICAgICA9IGFzTWludXRlcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzSG91cnMgICAgICAgID0gYXNIb3VycztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzRGF5cyAgICAgICAgID0gYXNEYXlzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNXZWVrcyAgICAgICAgPSBhc1dlZWtzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNNb250aHMgICAgICAgPSBhc01vbnRocztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzWWVhcnMgICAgICAgID0gYXNZZWFycztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnZhbHVlT2YgICAgICAgID0gZHVyYXRpb25fYXNfX3ZhbHVlT2Y7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5fYnViYmxlICAgICAgICA9IGJ1YmJsZTtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmdldCAgICAgICAgICAgID0gZHVyYXRpb25fZ2V0X19nZXQ7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5taWxsaXNlY29uZHMgICA9IG1pbGxpc2Vjb25kcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnNlY29uZHMgICAgICAgID0gc2Vjb25kcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLm1pbnV0ZXMgICAgICAgID0gbWludXRlcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmhvdXJzICAgICAgICAgID0gaG91cnM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5kYXlzICAgICAgICAgICA9IGRheXM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by53ZWVrcyAgICAgICAgICA9IHdlZWtzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubW9udGhzICAgICAgICAgPSBtb250aHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by55ZWFycyAgICAgICAgICA9IHllYXJzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uaHVtYW5pemUgICAgICAgPSBodW1hbml6ZTtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvSVNPU3RyaW5nICAgID0gaXNvX3N0cmluZ19fdG9JU09TdHJpbmc7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b1N0cmluZyAgICAgICA9IGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9KU09OICAgICAgICAgPSBpc29fc3RyaW5nX190b0lTT1N0cmluZztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmxvY2FsZSAgICAgICAgID0gbG9jYWxlO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubG9jYWxlRGF0YSAgICAgPSBsb2NhbGVEYXRhO1xuXG4gICAgLy8gRGVwcmVjYXRpb25zXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b0lzb1N0cmluZyA9IGRlcHJlY2F0ZSgndG9Jc29TdHJpbmcoKSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIHRvSVNPU3RyaW5nKCkgaW5zdGVhZCAobm90aWNlIHRoZSBjYXBpdGFscyknLCBpc29fc3RyaW5nX190b0lTT1N0cmluZyk7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5sYW5nID0gbGFuZztcblxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdYJywgMCwgMCwgJ3VuaXgnKTtcbiAgICBhZGRGb3JtYXRUb2tlbigneCcsIDAsIDAsICd2YWx1ZU9mJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCd4JywgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1gnLCBtYXRjaFRpbWVzdGFtcCk7XG4gICAgYWRkUGFyc2VUb2tlbignWCcsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KGlucHV0LCAxMCkgKiAxMDAwKTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCd4JywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHRvSW50KGlucHV0KSk7XG4gICAgfSk7XG5cbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXG5cblxuICAgIHV0aWxzX2hvb2tzX19ob29rcy52ZXJzaW9uID0gJzIuMTEuMic7XG5cbiAgICBzZXRIb29rQ2FsbGJhY2sobG9jYWxfX2NyZWF0ZUxvY2FsKTtcblxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5mbiAgICAgICAgICAgICAgICAgICAgPSBtb21lbnRQcm90b3R5cGU7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm1pbiAgICAgICAgICAgICAgICAgICA9IG1pbjtcbiAgICB1dGlsc19ob29rc19faG9va3MubWF4ICAgICAgICAgICAgICAgICAgID0gbWF4O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5ub3cgICAgICAgICAgICAgICAgICAgPSBub3c7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnV0YyAgICAgICAgICAgICAgICAgICA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQztcbiAgICB1dGlsc19ob29rc19faG9va3MudW5peCAgICAgICAgICAgICAgICAgID0gbW9tZW50X19jcmVhdGVVbml4O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5tb250aHMgICAgICAgICAgICAgICAgPSBsaXN0c19fbGlzdE1vbnRocztcbiAgICB1dGlsc19ob29rc19faG9va3MuaXNEYXRlICAgICAgICAgICAgICAgID0gaXNEYXRlO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sb2NhbGUgICAgICAgICAgICAgICAgPSBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5pbnZhbGlkICAgICAgICAgICAgICAgPSB2YWxpZF9fY3JlYXRlSW52YWxpZDtcbiAgICB1dGlsc19ob29rc19faG9va3MuZHVyYXRpb24gICAgICAgICAgICAgID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbjtcbiAgICB1dGlsc19ob29rc19faG9va3MuaXNNb21lbnQgICAgICAgICAgICAgID0gaXNNb21lbnQ7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLndlZWtkYXlzICAgICAgICAgICAgICA9IGxpc3RzX19saXN0V2Vla2RheXM7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlWm9uZSAgICAgICAgICAgICA9IG1vbWVudF9fY3JlYXRlSW5ab25lO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sb2NhbGVEYXRhICAgICAgICAgICAgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5pc0R1cmF0aW9uICAgICAgICAgICAgPSBpc0R1cmF0aW9uO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5tb250aHNTaG9ydCAgICAgICAgICAgPSBsaXN0c19fbGlzdE1vbnRoc1Nob3J0O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy53ZWVrZGF5c01pbiAgICAgICAgICAgPSBsaXN0c19fbGlzdFdlZWtkYXlzTWluO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5kZWZpbmVMb2NhbGUgICAgICAgICAgPSBkZWZpbmVMb2NhbGU7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLndlZWtkYXlzU2hvcnQgICAgICAgICA9IGxpc3RzX19saXN0V2Vla2RheXNTaG9ydDtcbiAgICB1dGlsc19ob29rc19faG9va3Mubm9ybWFsaXplVW5pdHMgICAgICAgID0gbm9ybWFsaXplVW5pdHM7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnJlbGF0aXZlVGltZVRocmVzaG9sZCA9IGR1cmF0aW9uX2h1bWFuaXplX19nZXRTZXRSZWxhdGl2ZVRpbWVUaHJlc2hvbGQ7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnByb3RvdHlwZSAgICAgICAgICAgICA9IG1vbWVudFByb3RvdHlwZTtcblxuICAgIHZhciBfbW9tZW50ID0gdXRpbHNfaG9va3NfX2hvb2tzO1xuXG4gICAgcmV0dXJuIF9tb21lbnQ7XG5cbn0pKTsiXX0=
