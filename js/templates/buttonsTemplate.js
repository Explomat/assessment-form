var utils = require('../utils/utils');
var forms = require('../utils/forms');

module.exports = function (user) {
	user = user || {};
	user.isBoss = user.isBoss || false;
	user.formStatus = user.formStatus || '';

	if (utils.strBoolToBool(user.isBoss)) {
		if (user.formStatus === 'approve'){
			return (
				"<input type='button' onclick=window.forms.sendForm('declined') value='Отклонить' class='inputButton'/>\n\
				<input type='button' onclick=window.forms.sendForm('confirmed') value='Утвердить' class='inputButton'/>\n\
				<a href='#' onclick=window.forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>"
			);
		}
		if (user.formStatus === 'declined') {
			return (
				"<input type='button' onclick=window.forms.sendForm('active') value='Активировать форму' class='inputButton' />\n\
				<a href='#' onclick=window.forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>"
			);
		}
		if (user.formStatus === 'declined' || user.formStatus === 'confirmed') {
			return "<a href='#' onclick=window.forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>";
		}
		
		return (
			"<input type='button' onclick=window.forms.sendForm('save') value='Сохранить' class='inputButton' />\n\
			<input type='button' onclick=window.forms.sendForm('declined') value='Отклонить' class='inputButton'/>\n\
			<input type='button' onclick=window.forms.sendForm('confirmed') value='Утвердить' class='inputButton'/>\n\
			<a href='#' onclick=window.forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>"
		);
	}
	else {
		if (user.formStatus === 'active') {
			return (
				"<input type='button' onclick=window.forms.sendForm('save') value='Сохранить' class='inputButton'/> \n\
				<input type='button' onclick=window.forms.sendForm('send_request') value='Отправить на подтверждение' class='inputButton'/>\n\
				<a href='#' onclick=window.forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>"
			);
		}
		return "<a href='#' onclick=window.forms.requestPreviewForm(event) class='inputButton'>Просмотр формы</a>";
	}

}