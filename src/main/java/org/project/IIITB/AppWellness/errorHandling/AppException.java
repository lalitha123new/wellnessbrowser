/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.project.IIITB.AppWellness.errorHandling;

import java.io.Serializable;

/**
 *
 * @author chaya
 */
public class AppException  extends Exception implements Serializable {
	private static final long serialVersionUID = -8999932578270387947L;
	
	/** 
	 * contains redundantly the HTTP status of the response sent back to the client in case of error, so that
	 * the developer does not have to look into the response headers. If null a default 
	 */
	int status;
	
	/** application specific error code */
	//int code; 
		
	/** link documenting the exception */	
	String link;
	
	/** detailed error description for developers*/
	String location;	
	
	/**
	 * 
	 * @param status
	 * @param code
	 * @param message
	 * @param location
	 * @param link
	 */
	public AppException(int status,String message,
			String location, String link) {
		super(message);
		this.status = status;
		this.location = location;
		this.link = link;
	}

	public AppException() { }
        
	public String getMessage() {
		return super.getMessage();
	}

//	public void setMessage(String message) {
//		super.setMessage(message);
//	}
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	/*public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}*/

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}    
}
