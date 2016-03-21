var utils = require('../utils/utils');

module.exports = function (user) {
	user = user || {};
	user.isBoss = user.isBoss || false;
	user.formStatus = user.formStatus || '';

	if (utils.strBoolToBool(user.isBoss)) {
		if (user.formStatus === 'declined' || user.formStatus === 'confirmed') {
			return "<a href='#' onclick=forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>";
		}
		
		return (
			"<input type='button' onclick=forms.sendForm('save') value='Сохранить' class='inputButton' />\n\
			<input type='button' onclick=forms.sendForm('declined') value='Отклонить' class='inputButton'/>\n\
			<input type='button' onclick=forms.sendForm('confirmed') value='Утвердить' class='inputButton'/>\n\
			<a href='#' onclick=forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>"
		);
	}
	else {
		if (user.formStatus === 'active') {
			return (
				"<input type='button' onclick=forms.sendForm('save') value='Сохранить' class='inputButton'/> \n\
				<input type='button' onclick=forms.sendForm('send_request') value='Отправить на подтверждение' class='inputButton'/>\n\
				<a href='#' onclick=forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>"
			);
		}
		return "<a href='#' onclick=forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>";
	}

}