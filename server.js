<%
var ROOT_DIRECTORY = AppDirectoryPath() + "\\wt\\web\\assessment_form\\files"; // C:\\WebSoft\\WebTutorServer

function _saveHtml(text) {
	var stream = new ActiveXObject('ADODB.Stream');
	stream.Type = 2;
	stream.Mode = 3;
	stream.Charset = 'UTF-8';
	stream.Open();
	stream.Position = 0;
	stream.WriteText(text);
	var fileName = curUserID;
	var defaultPath = ROOT_DIRECTORY + '\\'+ curUserID;
	if ( FilePathExists(defaultPath) ) {
		stream.SaveToFile(ROOT_DIRECTORY + '\\'+ curUserID+'\\'+ fileName + '.html', 2);
	} else {
		CreateDirectory(defaultPath);
		stream.SaveToFile(ROOT_DIRECTORY + '\\'+ curUserID+'\\'+ fileName + '.html', 2);
	}
	stream.Close();
	return newFilePath = ROOT_DIRECTORY + '\\'+ curUserID+'\\'+ fileName;
}


function _savePdf(newFilePath) {
	var oPdf = new ActiveXObject("HtmlToPdf.Pdf");
	var newPath = ROOT_DIRECTORY + '\\'+ curUserID+'\\'+ curUserID;
	oPdf.GeneratePdfFromFile(newPath + '.html', newPath + '.pdf');
	return newFilePath;
}

function _saveDoc(newFilePath) {
	var oDoc = new ActiveXObject("Websoft.Office.Word.Document");
	oDoc.Open(newFilePath + '.html');
	oDoc.SaveAs(newFilePath +'.docx');
	return newFilePath;
}

function createPdf(queryObjects) {
	var filePath = _savePdf(_saveHtml(queryObjects.Body)) + ".pdf";
	return FileName(filePath);
}

function createDoc(queryObjects) {
	var filePath = _saveDoc(_saveHtml(queryObjects.Body)) + ".docx";
	return FileName(filePath);
}

// Для кнопок загрузки в PDF и DOC

function getPdf(queryObjects) {
	var fileName = queryObjects.file_name;
	var fileData = LoadFileData(ROOT_DIRECTORY + '\\'+ curUserID+'\\'+ fileName);
	Request.RespContentType = 'application/pdf';
	Request.AddRespHeader("Content-Disposition","attachment; filename=" + fileName);
	return fileData;
}

function getDoc(queryObjects) {
	var fileName = queryObjects.file_name;
	var fileData = LoadFileData(ROOT_DIRECTORY + '\\'+ curUserID+'\\'+ fileName);
	Request.RespContentType = 'application/msword';
	Request.AddRespHeader("Content-Disposition","attachment; filename=" + fileName);
	return fileData;
}

function getData(queryObjects) {

	var formID = queryObjects.form_id;
	var curObjectDocum = OpenDoc(UrlFromDocID(Int(queryObjects.form_id))).TopElem;
	var curPersonID = curObjectDocum.person_id;


	var curSubmissionType = OpenDoc(UrlFromDocID(Int(queryObjects.form_type_id))).TopElem;
	var isBoss = curSubmissionType.recipients.ChildByKeyExists( curUserID );
	var formStatus = OpenDoc(UrlFromDocID(Int(formID))).TopElem.status_id;


	var personBoss = ArrayOptFirstElem(tools.get_uni_user_bosses(Int(curObjectDocum.person_id)));
	var personBossFullName = personBoss  == undefined ? 'Руководитель не указан' : personBoss.fullname;

	var access = isBoss || curSubmissionType.senders.ChildByKeyExists(curUserID); 

	var array1 = ArrayOptFirstElem(XQuery("for $elem in cc_firsttables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem")); 
	var array2 = ArrayOptFirstElem(XQuery("for $elem in cc_secondtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem")); 
	var array3 = ArrayOptFirstElem(XQuery("for $elem in cc_thirdtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem")); 
	var array4 = ArrayOptFirstElem(XQuery("for $elem in cc_fourthtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));
	var array5 = ArrayOptFirstElem(XQuery("for $elem in cc_fifthtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));
	var array6 = ArrayOptFirstElem(XQuery("for $elem in cc_sixthtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));
	var array7 = ArrayOptFirstElem(XQuery("for $elem in cc_seventhtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));
	var array8 = ArrayOptFirstElem(XQuery("for $elem in cc_eighthtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));
	var array9 = ArrayOptFirstElem(XQuery("for $elem in cc_ninthtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));
	var array10 = ArrayOptFirstElem(XQuery("for $elem in cc_tenthtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));
	var array11 = ArrayOptFirstElem(XQuery("for $elem in cc_eleventhtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));
	var array12 = ArrayOptFirstElem(XQuery("for $elem in cc_twelfthtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));
	var array13 = ArrayOptFirstElem(XQuery("for $elem in cc_thirteenthtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));
	var array14 = ArrayOptFirstElem(XQuery("for $elem in cc_fourteenthtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));
	var array15 = ArrayOptFirstElem(XQuery("for $elem in cc_fifthteenthtables where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+formID+" return $elem"));

	array1 = array1 == undefined ? "" : array1   
	array2 = array2 == undefined ? "" : array2
	array3 = array3 == undefined ? "" : array3
	array4 = array4 == undefined ? "" : array4
	array5 = array5 == undefined ? "" : array5
	array6 = array6 == undefined ? "" : array6
	array7 = array7 == undefined ? "" : array7
	array8 = array8 == undefined ? "" : array8
	array9 = array9 == undefined ? "" : array9
	array10 = array10 == undefined ? "" : array10
	array11 = array11 == undefined ? "" : array11
	array12 = array12 == undefined ? "" : array12
	array13 = array13 == undefined ? "" : array13
	array14 = array14 == undefined ? "" : array14
	array15 = array15 == undefined ? "" : array15


	var userInfo = {
		id:  curObjectDocum.person_id + '',
		name: curObjectDocum.person_fullname + '' ,
		subdivision: curObjectDocum.person_subdivision_name + '', 
		position: curObjectDocum.person_position_name + '', 
		bossName : personBossFullName + '',
		isBoss : isBoss + '',
		formStatus : formStatus + '',
		access: access 
	}

	var allData = {
		user: userInfo ,
		firstTable: array1,
		secondTable: array2,
		thirdTable: array3,
		fourthTable: array4,
		fifthTable: array5,
		sixthTable: array6, 
		seventhTable: array7,
		eighthTable: array8,
		ninthTable: array9,
		tenthTable: array10,
		eleventhTable: array11,
		twelfthTable: array12, 
		thirteenthTable: array13,
		fourteenthTable: array14,
		fifthteenthTable: array15
	}
	
	return tools.object_to_text(allData, 'json');
}


function _prepareData (data) {

	function getTableName(str){
		       return str.split('.')[0]
	}

	function getValueName(str){
		       return str.split('.')[1]
	}

	var outObj = {};

	for (i in data) {

		if ( i.indexOf('.') != -1 ) {
			tableName = StrLowerCase(getTableName(i));
			valueName = getValueName(i);


			try {  outObj[tableName]; }
			catch(e) { outObj[tableName] = {}; }

			try { outObj[tableName][valueName]; }
			catch(e) { outObj[tableName][valueName] = data[i] + ''; }
		} else {
			outObj[i] = data[i] + '';
		}
	}

	return outObj;
}


function saveData(queryObjects) {


	var prepareData = _prepareData(queryObjects.Form);

	
	function _getFormID(data) {
		for (el in data) {
			if (el == 'form_id') {
				return data[el] + '';
			}
		}
		return null
	}

	function _getAction(data) {
		for (el in data) {
			if (el == 'action') {
				return data[el] + '';
			}
		}
		return null
	}

	function _getPerson(data) {
		for (el in data) {
			if (el == 'person_id') {
				return data[el] + '';
			}
		}
		return null
	}

	function _saveField(doc) {
		for (c in prepareData[elem]) {
			if (doc.TopElem.OptChild(c).Type == 'bool') {
				if (prepareData[elem][c] == 'on') {
					doc.TopElem.OptChild(c).Value = true;
				} else {
					doc.TopElem.OptChild(c).Value = false;
				}
				
			} else if (doc.TopElem.OptChild(c).Type == 'date') {
				try {
					doc.TopElem.OptChild(c).Value = Date(prepareData[elem][c]);
				} catch (e) {
					doc.TopElem.OptChild(c).Value = '';
				}
			} else {
				doc.TopElem.OptChild(c).Value = prepareData[elem][c];
			}	
		}
	}

	function _doAction(action, formID) {
		if (action == 'send_request') { 
			var _curFormDoc = OpenDoc(UrlFromDocID(Int(formID)));
			_curFormDoc.TopElem.status_id = 'approve';
			_curFormDoc.Save()
		} else if (action == 'declined') {
			var _curFormDoc = OpenDoc(UrlFromDocID(Int(formID)));
			_curFormDoc.TopElem.status_id = 'declined';
			_curFormDoc.Save() 
		} else if (action == 'confirmed') {
			var _curFormDoc = OpenDoc(UrlFromDocID(Int(formID)));
			_curFormDoc.TopElem.status_id = 'confirmed';
			_curFormDoc.Save() 
		}

	}

	var curPersonID = _getPerson(prepareData);
	var curFormID = _getFormID(prepareData);
	var action = _getAction(prepareData)


	for (elem in prepareData) {
		if (elem.indexOf('table') != -1 ) {
			tableName = 'cc_' + elem + 's';
			table = ArrayOptFirstElem(XQuery("for $elem in "+tableName+" where $elem/person_id = "+curPersonID+" and $elem/submission_type_id = "+curFormID+" return $elem"));
			if (table != undefined) {
				curCard = OpenDoc(UrlFromDocID(table.id))
				_saveField(curCard);
				curCard.Save();
			} else {
				new_notify_doc = OpenNewDoc("x-local://udt/udt_cc_"+elem+".xmd");
				_saveField(new_notify_doc);
				new_notify_doc.TopElem.person_id = curPersonID;
				new_notify_doc.TopElem.submission_type_id = curFormID;
				new_notify_doc.BindToDb();
				new_notify_doc.Save();

			}
		}
	}
	_doAction(action, curFormID);
	Request.AddRespHeader("Refresh", "0; URL="+Request.Header.Referer);
}

%>