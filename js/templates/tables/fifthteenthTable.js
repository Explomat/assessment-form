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