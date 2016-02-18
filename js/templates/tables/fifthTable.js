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