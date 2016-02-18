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