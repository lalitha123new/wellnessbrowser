package org.project.IIITB.AppWellness.resource;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.NoSuchElementException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.project.IIITB.AppWellness.Globals.Database;
import org.project.IIITB.AppWellness.model.User;
import org.project.IIITB.AppWellness.model.UserInfo;
import org.project.IIITB.AppWellness.service.UserService;
import org.project.IIITB.AppWellness.utils.serviceUtils;
import org.project.IIITB.AppWellness.service.ReminderService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.owlike.genson.JsonBindingException;
import org.project.IIITB.AppWellness.errorHandling.AppException;
import org.project.IIITB.AppWellness.Globals.AppGlobals;

@Path("/user")
public class UserResource {

    UserService userService = new UserService();
    serviceUtils serviceUtils = new serviceUtils();
    AppGlobals appGlobals = new AppGlobals();

    public UserResource() {

        Database.run();
    }

    // This is called for making username and paswd
    // returns userId or 0 on failure
    @Path("/createUser")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(String createuser)
            throws ParseException, SQLException, NoSuchElementException, NoSuchAlgorithmException, UnsupportedEncodingException {

        return Response.status(200).entity(userService.createUser(createuser)).build();
    }

    // This is for checking logging in.
    // Returns userId or 0 on failure
    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response loginUser(String loginobject) throws ParseException, JsonProcessingException, InvalidKeyException,
            NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException,
            SQLException, UnsupportedEncodingException, AppException {

        return Response.status(200).entity(userService.login(loginobject)).build();
    }

    // This is for storing all the user information.
    @Path("/userInfo/{internalID}")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUserinfo(@PathParam("internalID") int internalID, String infoobject)
            throws ParseException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException,
            IllegalBlockSizeException, BadPaddingException, SQLException, UnsupportedEncodingException {
    	
    	   return Response.status(200).entity(userService.addUserInfo(internalID, infoobject)).build();

    }

    // get user age
    @Path("/getAge/{internalID}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAge(@PathParam("internalID") int internalID, @Context HttpHeaders headers) throws AppException {

        String userAgent = headers.getRequestHeaders().getFirst("authorization");

        Boolean validate = serviceUtils.validateToken(internalID, userAgent);

        if (validate.equals(true)) {

            return userService.getAge(internalID);

        } else {

            throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), "inavlid token", "UserResource::getAge",
                    appGlobals.ServerPath);
        }

    }

    // get username
    @Path("/getName/{internalID}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    public String getName(@PathParam("internalID") int internalID, @Context HttpHeaders headers)
            throws UnsupportedEncodingException, AppException {

        String userAgent = headers.getRequestHeaders().getFirst("authorization");

        Boolean validate = serviceUtils.validateToken(internalID, userAgent);

        if (validate.equals(true)) {

            return userService.getName(internalID);
        } else {

            throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),

                    "inavlid token", "UserResource::getName", appGlobals.ServerPath);
        }

    }

    // forgot password
    @Path("/forgotpassword")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public int forgotPassword(String forgot) throws ParseException, UnsupportedEncodingException {

        return userService.forgotPassword(forgot);
    }
    
    
    
    // regularNotification
        @Path("/regularNotification")
        @GET
        public int regularNotification(){

            return userService.regularNotifications();
        }
    

    // forgot password update
    @Path("forgotpwdupdate/{internalID}")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public void forgotUpdate(@PathParam("internalID") int internalID, String fpwd)
            throws ParseException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException,
            IllegalBlockSizeException, BadPaddingException, SQLException {

        userService.forgotUpdate(internalID, fpwd);
    }

    // verify email
    @Path("/verifyemail")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public int verifyEmail(String email) throws ParseException, UnsupportedEncodingException {

        return userService.verfiyEmail(email);
    }

    // get userid
    @Path("/getuserid")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getUid(String email) throws ParseException, UnsupportedEncodingException {

        return Response.status(200).entity(userService.getUid(email)).build();
    }

    // user logout
    @Path("/logout/{internalID}")
    @POST
    public Response userLogout(@PathParam("internalID") int internalID, String logoutobject,
            @Context HttpHeaders headers) throws ParseException, AppException {

        String userAgent = headers.getRequestHeaders().getFirst("authorization");

        Boolean validate = serviceUtils.validateToken(internalID, userAgent);

        if (validate.equals(true)) {

            return userService.userLogout(internalID, logoutobject);
        } else {

            throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),

                    "invalid token", "UserResource::userLogout", appGlobals.ServerPath);
        }

    }
    
    
    @Path("/sendReminder")
    @GET
    public String getsms() throws AppException {
        
        String hellMessage="we r here";
        System.out.println("this is sms firststep"+hellMessage);
        
    String hellMessage1 = ReminderService.sendReminder(hellMessage,hellMessage);
    
    return hellMessage1;
        
    }
    
    
    
 // get user age
    @Path("/getAge1/{internalID}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAge1(@PathParam("internalID") int internalID, @Context HttpHeaders headers) throws AppException {

       // String userAgent = headers.getRequestHeaders().getFirst("authorization");

        //Boolean validate = serviceUtils.validateToken(internalID, userAgent);

    	 return userService.getAge1(internalID);
        

    }
}
