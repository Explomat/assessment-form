module.exports = function (fourteenthTable) {
	fourteenthTable = fourteenthTable || {};
	return (
		"<div class='fourteenthTable'> \n\
			<table align='center' class='fourteenthTable'>\n\
				<tr>\n\
					<td class='color_head_table' style='height: 43px'>\n\
						<span class='textbold'>КОММЕНТАРИИ СОТРУДНИКА</span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='fourteenthTable.col0_str0' rows='10'>"+ (fourteenthTable.col0_str0 || '') +"</textarea>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	)
}