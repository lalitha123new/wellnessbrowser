package org.project.IIITB.AppWellness.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.json.simple.parser.ParseException;
import org.project.IIITB.AppWellness.Globals.Database;
import org.project.IIITB.AppWellness.model.User;
import org.project.IIITB.AppWellness.service.AdminService;

@Path("/admin")
public class AdminResource {

	AdminService adminService = new AdminService();

	public AdminResource() {

		Database.run();
	}

	// admin login
	@Path("/login")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public int adminLogin(String loginobject) throws ParseException {

		return adminService.adminLogin(loginobject);
	}

	// get user info
	@Path("/userinfo")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response userinfo() {

		return adminService.userinfo();
	}
    
	// get user demographic
	@Path("/userdemographic")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response userdemo() {

		return adminService.userdemo();

	}
	
	// get user feedback
	@Path("/userfeedback")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response userFeddback(){
		
		return adminService.userfeedback();
	}
	
	//get user response
	@Path("/userresponse")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response userresponse(){
		
		return adminService.userresponse();
	}
	//get userscore
		@Path("/userscore")
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response userscore(){
			
			return adminService.userscore();
		}
		
	
}
