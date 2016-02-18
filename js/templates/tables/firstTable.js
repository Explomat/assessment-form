var moment = require('moment');

module.exports = function (firstTable) {
	firstTable = firstTable || {};
	var startDate = moment(firstTable.col0_str0).format('DD.MM.YYYY');
	var finishDate = moment(firstTable.col0_str1).format('DD.MM.YYYY');;
	
	return (
		"<div class='firstTable'>\n\
			<table align='center' >\n\
				<tr>\n\
					<td style='height: 23px; '>\n\
						текст\n\
					</td>\n\
				</tr>\n\
				<tr>\n\
					<td style='height: 23px; '>\n\
						текст\n\
					</td>\n\
				</tr>\n\
			</table>\n\
			<br><br>\n\
			<table style='width: 1000; border-spacing: 0px;' align='center' class='border_table_date'>\n\
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