package org.project.IIITB.AppWellness.model;

import java.util.ArrayList;

public class Db {

	static int nextId = 1;
	static ArrayList<Credentials> credentials = new ArrayList<Credentials>();
	
	public Db() {
	}
	
	static int getNextUserId() {
		return nextId++;
	}
	
	static int getUserId(String userName) {
		for(int i=0; i< credentials.size();i++ ) {
			Credentials cr = credentials.get(i);
			if(cr.uname.equals(userName))
				return cr.userId;
		}
		return 0;
	}
	
	static int checkLogin(String uname, String pwd) {
		for(int i=0; i< credentials.size();i++ ) {
			Credentials cr = credentials.get(i);
			if(cr.uname.equals(uname) && cr.password.equals(pwd))
				return cr.userId;
		}
		return 0;
	}
	
	
}

class Credentials {
	String uname;
	String password;
	int userId;
}