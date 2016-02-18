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