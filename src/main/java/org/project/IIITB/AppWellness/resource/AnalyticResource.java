package org.project.IIITB.AppWellness.resource;

import java.io.File;
import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.google.api.client.json.Json;
import com.google.api.services.analytics.model.GaData;
import org.project.IIITB.AppWellness.service.HelloAnalytics;

@Path("analytics")
@Produces(MediaType.APPLICATION_JSON)

public class AnalyticResource {
	
HelloAnalytics analytics = new HelloAnalytics();
	
	@GET
	@Path("/getsessions")
	public Object getSessions() throws JsonGenerationException, JsonMappingException, IOException{
		
		ObjectMapper objectMapper = new ObjectMapper();
		String list = objectMapper.writeValueAsString(analytics.analytic());	
      return Response.status(200).entity(list).type(MediaType.APPLICATION_JSON).build();
	}

}
