var AJAX_TIME_OVER = 10000;

module.exports = {

    getXmlHttp: function(){
        var xmlHttp;
        try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (err) { xmlHttp = false; }
        }
        if (!xmlHttp && typeof(XMLHttpRequest) != 'undefined')
            xmlHttp = new XMLHttpRequest();
        return xmlHttp;
    },

    sendRequest: function(url, callBack, data, isSync, requestType) {

        var xmlHttp = this.getXmlHttp();
        requestType = requestType || 'GET';
        isSync = isSync || true;

        xmlHttp.open(requestType, url, isSync);
        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4) {
            if (timeout)
                clearTimeout(timeout);

            if(xmlHttp.status == 200 && callBack){
               callBack(xmlHttp.responseText);
            }
            else {
                console.log(xmlHttp.status);
                console.log(xmlHttp.statusText || "Ajax request error");
            }
          }
        };
        xmlHttp.send(data || null);

        if (isSync){
            var timeout = setTimeout( function(){ 
                xmlHttp.abort();
                console.log("Ajax request time over");
            }, AJAX_TIME_OVER);
        }
    
    }
}     
