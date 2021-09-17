package org.project.IIITB.AppWellness.model;

import java.util.ArrayList;

import java.util.List;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Provider
@Produces(MediaType.APPLICATION_JSON)
public class UserSession {

	protected int userid;
	protected String token;
	

	public UserSession(int userid, String token) {

		super();
		this.userid = userid;
		this.token = token;
	}
	

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
}
