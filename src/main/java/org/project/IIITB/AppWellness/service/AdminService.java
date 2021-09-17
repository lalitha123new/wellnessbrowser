package org.project.IIITB.AppWellness.service;

import java.util.List;

import javax.ws.rs.core.Response;

import org.json.simple.parser.ParseException;
import org.project.IIITB.AppWellness.DataBase.AdminDAO;
import org.project.IIITB.AppWellness.model.User;

public class AdminService {

	AdminDAO adDao = new AdminDAO();

	public int adminLogin(String loginobject) throws ParseException {

		return adDao.adminlogin(loginobject);

	}
	

	public Response userinfo() {

		return Response.status(200).entity(adDao.userinfo()).build();

	}

	public Response userdemo() {

		return Response.status(200).entity(adDao.userdemo()).build();
	}

	public Response userfeedback() {

		return Response.status(200).entity(adDao.userfeedback()).build();
	}

	public Response userresponse() {

		return Response.status(200).entity(adDao.userresponse()).build();
	}
	public Response userscore() {

		return Response.status(200).entity(adDao.userscore()).build();
	}
	
	

}
