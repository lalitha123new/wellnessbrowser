angular.module('wellness').factory('globalServerName', function() {

	
	
	
	//nimhhans server
	//var serverUrl = "https://echargementalhealth.nimhans.ac.in/wellness-check/webapi/";
	
	//iiitb server
	//var serverUrl = "http://ehrc-dev.iiitb.ac.in:8080/wellness-check/webapi/";
	
	//local server
	var serverUrl = "http://localhost:8080/AppWellness/webapi/";

	return {
		getUrlName : function() {
			return serverUrl;
		}
	};
});