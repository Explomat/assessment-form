var utils = require('../utils/utils');

module.exports = function (user) {
	user = user || {};
	user.isBoss = user.isBoss || false;
	user.formStatus = user.formStatus || '';

	if (utils.strBoolToBool(user.isBoss)) {
		if (user.formStatus === 'declined' || user.formStatus === 'confirmed') return "";
		
		return (
			"<input type='button' onclick=sendForm('save') value='Сохранить' class='inputButton' />\n\
			<input type='button' onclick=sendForm('declined') value='Отклонить' class='inputButton'/>\n\
			<input type='button' onclick=sendForm('confirmed') value='Утвердить' class='inputButton'/>"
		);
	}
	else {
		if (user.formStatus === 'active') {
			return (
				"<input type='button' onclick=sendForm('save') value='Сохранить' class='inputButton'/> \n\
				<input type='button' onclick=sendForm('send_request') value='Отправить на подтверждение' class='inputButton'/>"
			);
		}
		return "";
	}

}