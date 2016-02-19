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