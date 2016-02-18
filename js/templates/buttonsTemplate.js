var utils = require('../utils/utils');

module.exports = function (user) {
	user = user || {};
	user.isBoss = user.isBoss || false;
	user.formStatus = user.formStatus || '';

	if (utils.strBoolToBool(user.isBoss)) {
		if (user.formStatus === 'approve') {
			return (
				"<input type='button' onclick=sendForm('save') value='Сохранить' class='inputButton' onmouseover=this.className='inputButtonOver' />\n\
				<input type='button' onclick=sendForm('declined') value='Отклонить' class='inputButton' onmouseover=this.className='inputButtonOver' />\n\
				<input type='button' onclick=sendForm('confirmed') value='Утвердить' class='inputButton' onmouseover=this.className='inputButtonOver' />"
			);
		}
		return "";
	}
	else {
		if (user.formStatus === 'active') {
			return (
				"<input type='button' onclick=sendForm('save') value='Сохранить' class='inputButton' onmouseover=this.className='inputButtonOver' /> \n\
				<input type='button' onclick=sendForm('send_request') value='Отправить на подтверждение' class='inputButton' onmouseover=this.className='inputButtonOver' />"
			);
		}
		return "";
	}

}