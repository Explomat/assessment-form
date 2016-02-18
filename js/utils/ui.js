module.exports = {
	createSelect: function (values, selectedValue, name) {
		var select = "<select name="+ name +" style='width: 45px'>";
		for (var i = 0, len = values.length; i < len; i++) {
			var option = values[i] == selectedValue ? "<option selected>" + values[i] + "</option>" : "<option>" + values[i] + "</option>";
			select += option;
		};
		return select.concat("</select>");
	},

	createCheckBox: function(isChecked, name){
		return isChecked === true ? "<input name="+name+" type='checkbox' checked/>" : "<input name="+name+" type='checkbox' />"
	}
}