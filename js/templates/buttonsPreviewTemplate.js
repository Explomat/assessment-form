var utils = require('../utils/utils');
var forms = require('../utils/forms');

module.exports = function (user) {
	return (
		"<button onclick=window.forms.savePdf(event) class='inputButton'>Сохранить в .PDF</button>\n\
		 <button onclick=window.forms.saveDoc(event) class='inputButton'>Сохранить в .DOC</button>\n\
		 <button onclick=window.forms.print() class='inputButton'>Печать</button>"
	);
}