package org.project.IIITB.AppWellness.errorHandling;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.ws.rs.ext.Provider;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.beanutils.BeanUtils;

@Provider
@XmlRootElement
public class ErrorMessage implements Serializable{
	        
	/** message describing the error*/
	@XmlElement(name = "message")
	String message;
        
	/** contains the same HTTP Status code returned by the server */
	@XmlElement(name = "status")
	int status;
	
	/** application specific error code */
	//@XmlElement(name = "code")
	//int code;
		
	/** link point to page where the error message is documented */
	//@XmlElement(name = "link")
	String link;
	
	/** extra information that might useful for developers */
	@XmlElement(name = "location")
	String location;	

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

/*	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}*/

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

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
	
	public ErrorMessage(AppException ex){
		try {
			BeanUtils.copyProperties(this, ex);
		} catch (IllegalAccessException ex1) {
                    Logger.getLogger(ErrorMessage.class.getName()).log(Level.SEVERE, null, ex1);
		} catch (InvocationTargetException ex1) {
                    Logger.getLogger(ErrorMessage.class.getName()).log(Level.SEVERE, null, ex1);
            }
	}
	
	public ErrorMessage() {}
        
        public ErrorMessage(int status,String message, String location, String link) {
            this.status = status;
            this.message = message;
            this.location = location;
            this.link = link;
        }
}
