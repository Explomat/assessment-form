module.exports = function (thirteenthTable) {
	thirteenthTable = thirteenthTable || {};
	return (
		"<div class='thirteenthTable'> \n\
			<table align='center' class='thirteenthTable'>\n\
				<tr>\n\
					<td class='color_head_table' style='height: 43px'>\n\
						<span class='textbold'>ДОЛГОСРОЧНЫЙ ПЛАН и договоренности </span>\n\
					</td>\n\
				</tr>\n\
				<tr class='color_text_fone_table'>\n\
					<td style='height: 23px'>\n\
						<textarea cols='20' name='thirteenthTable.col0_str0' rows='10'>" + (thirteenthTable.col0_str0 || '') + "</textarea>\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>"
	)
}