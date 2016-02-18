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