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