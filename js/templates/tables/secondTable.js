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