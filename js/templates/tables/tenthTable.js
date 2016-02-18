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