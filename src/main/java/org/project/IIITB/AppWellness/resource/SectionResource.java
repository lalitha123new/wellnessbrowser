package org.project.IIITB.AppWellness.resource;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.project.IIITB.AppWellness.Globals.AppGlobals;
import org.project.IIITB.AppWellness.Globals.Database;
import org.project.IIITB.AppWellness.errorHandling.AppException;
import org.project.IIITB.AppWellness.model.Section;
import org.project.IIITB.AppWellness.service.SectionService;
import org.project.IIITB.AppWellness.utils.serviceUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Path("/Section")
public class SectionResource {

	SectionService sService = new SectionService();
	serviceUtils serviceUtils = new serviceUtils();
	AppGlobals appGlobals = new AppGlobals();

	public SectionResource() {

		Database.run();
	}

	// Getting all sections
	@Path("getSection/{sid}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject getQuestions(@PathParam("sid") int sid) {
		return sService.sectionQ(sid);
	}

	// Adding Section after its Completion.
	@Path("/addResponse/{internalID}/{sectionID}")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void addSectionResponse(@PathParam("internalID") int internalID, @PathParam("sectionID") String sectionID,
			String ans, @Context HttpHeaders headers) throws ParseException, AppException {

		String userAgent = headers.getRequestHeaders().getFirst("authorization");
		Boolean validate = serviceUtils.validateToken(internalID, userAgent);

		if (validate.equals(true)) {

			sService.addSectionResponse(internalID, sectionID, ans);
		} else {

			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), "invalid token",
					"SectionResource::addSectionResponse", appGlobals.ServerPath);
		}

	}

	// getting list of scores for a section
	@Path("/sectionScore/{internalID}/{sectionID}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List getSectionScore(@PathParam("internalID") int internalID, @PathParam("sectionID") String sectionID,
			@Context HttpHeaders headers) throws AppException {

		String userAgent = headers.getRequestHeaders().getFirst("authorization");
		Boolean validate = serviceUtils.validateToken(internalID, userAgent);

		if (validate.equals(true)) {

			return sService.getSectionScore(internalID, sectionID);
		} else {

			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), "invalid token",
					"SectionResource::getSectionScore", appGlobals.ServerPath);
		}

	}

	
	
	// getting count of sections completed
	@Path("/sectionsCount/{internalID}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List getSectionsCount(@PathParam("internalID") int internalID, @Context HttpHeaders headers)
			throws AppException {

		String userAgent = headers.getRequestHeaders().getFirst("authorization");
		Boolean validate = serviceUtils.validateToken(internalID, userAgent);

		if (validate.equals(true)) {

			return sService.getSectionsCount(internalID);
		} else {

			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), "invalid token",
					"SectionResource::getSectioncount", appGlobals.ServerPath);
		}

	}

	// Adding feedback for user
	@Path("/feedback/{userid}")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void addFeedback(@PathParam("userid") int userid, String feedback, @Context HttpHeaders headers)
			throws ParseException, AppException {

		String userAgent = headers.getRequestHeaders().getFirst("authorization");
		Boolean validate = serviceUtils.validateToken(userid, userAgent);

		if (validate.equals(true)) {

			sService.addFeedback(userid, feedback);
		} else {

			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), "invalid token",
					"SectionResource::addfeedback", appGlobals.ServerPath);

		}

	}

	// Get section responce
	@Path("/sectionresponce/{sectionID}/{internalID}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String sectionResponse(@PathParam("sectionID") String sectionID, @PathParam("internalID") int internalID,
			@Context HttpHeaders headers) throws AppException {

		String userAgent = headers.getRequestHeaders().getFirst("authorization");
		Boolean validate = serviceUtils.validateToken(internalID, userAgent);

		if (validate.equals(true)) {

			return sService.sectionRespoce(sectionID, internalID);

		} else {

			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), "invalid token",
					"SectionResource::sectionResonse", appGlobals.ServerPath);
		}

	}
	
	// Get section responce1 for admin
		@Path("/sectionresponce1/{sectionID}/{internalID}")
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public String sectionResponse1(@PathParam("sectionID") String sectionID, @PathParam("internalID") int internalID,
				@Context HttpHeaders headers) throws AppException {
			
			return sService.sectionRespoce1(sectionID, internalID);

			//String userAgent = headers.getRequestHeaders().getFirst("authorization");
			//Boolean validate = serviceUtils.validateToken(internalID, userAgent);


		}
		
		
		// getting list of scores for a section
		@Path("/sectionScore1/{internalID}/{sectionID}")
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		public List getSectionScore1(@PathParam("internalID") int internalID, @PathParam("sectionID") String sectionID,
				@Context HttpHeaders headers) throws AppException {

			//String userAgent = headers.getRequestHeaders().getFirst("authorization");
			//Boolean validate = serviceUtils.validateToken(internalID, userAgent);
			return sService.getSectionScore1(internalID, sectionID);

			

		}
		
		@Path("/individualResponse")
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public String individualResponse(@QueryParam("userid") int userid) throws AppException, SQLException, JsonProcessingException {
			
	   
			
			List<Section> indvRepObj = sService.individualResponse(userid);
			   
			ObjectMapper mapper = new ObjectMapper();
			//Section Section1 = new Section(userid, null);
			
			String jsonInString = mapper.writeValueAsString(indvRepObj);
//			  if (indvRepObj == null) {
//				  
//				  System.out.println(" End of doctor ");
//				  
//					return Response.noContent().build();
//					
//					} else {
					 System.out.println("yes its comining to individualResponse  "+jsonInString);
//					 return Response.ok().entity(indvRepObj).build();
//						
//						}
					return jsonInString;
			
		      //return sService.sectionRespoce1(sectionID, internalID);
			 //String userAgent = headers.getRequestHeaders().getFirst("authorization");
			//Boolean validate = serviceUtils.validateToken(internalID, userAgent);


		}
		
		//getFeedbackcount
        @Path("/getFeedbackcount")
        @GET
        @Produces(MediaType.APPLICATION_JSON)
        @Consumes(MediaType.APPLICATION_JSON)
        public int getFeedbackcount(@QueryParam("userid") int userid) throws AppException, SQLException {

                return sService.getFeedbackcount(userid);

            
        }

		
	
	
}
