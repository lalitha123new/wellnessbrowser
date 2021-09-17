package org.project.IIITB.AppWellness.errorHandling;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class AppExceptionMapper implements ExceptionMapper<AppException> {
//        private HttpHeaders headers;
//        //headers.getMediaType()
        @Override
	public Response toResponse(AppException ex) {
		return Response.status(ex.getStatus())
				.entity(new ErrorMessage(ex))
//                                .entity(new ErrorMessage(ex.getStatus(),
//                                                          ex.getCode(),
//                                                          ex.getMessage(),
//                                                          ex.getLocation(),
//                                                          ex.getLink()))
				.type(MediaType.APPLICATION_JSON).
				build();
	}

}
