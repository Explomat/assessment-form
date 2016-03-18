var utils = require('../utils/utils');

module.exports = function (user) {
	return (
		"<button onclick=files.savePdf(event) class='inputButton'>Сохранить в .PDF</button>\n\
		 <button onclick=files.saveDoc(event) class='inputButton'>Сохранить в .DOC</button>"
	);

}