var utils = require('../utils/utils');

module.exports = function (user) {
	return (
		"<button onclick=forms.savePdf(event) class='inputButton'>Сохранить в .PDF</button>\n\
		 <button onclick=forms.saveDoc(event) class='inputButton'>Сохранить в .DOC</button>"
	);

}