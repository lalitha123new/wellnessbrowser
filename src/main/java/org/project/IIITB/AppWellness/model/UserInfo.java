package org.project.IIITB.AppWellness.model;

import java.util.ArrayList;
import java.util.List;

public class UserInfo {
	private int userid;
	private String name;

	public UserInfo(int userid, String name) {

		super();
		this.userid = userid;
		this.name = name;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
