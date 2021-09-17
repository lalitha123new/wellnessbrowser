angular.module('wellness').factory('globalServerName', function() {

	
	//var serverUrl = "http://localhost:1026/AppWellness/webapi/";
    //var serverUrl = "http://10.10.21.113:1026/AppWellness/webapi/";
	//var serverUrl = "http://127.0.0.1:1026/AppWellness/webapi/";
	//var serverUrl = "http://ehrc-dev.iiitb.ac.in/wellness-check/webapi/";
	//var serverUrl = "https://echargementalhealth.nimhans.ac.in/wellness-check/webapi/";
	var serverUrl = "http://localhost:8080/AppWellness/webapi/";

	return {
		getUrlName : function() {
			return serverUrl;
		}
	};
});