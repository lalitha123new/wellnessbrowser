package org.project.IIITB.AppWellness.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.Json;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

import com.google.api.services.analytics.Analytics;
import com.google.api.services.analytics.AnalyticsScopes;
import com.google.api.services.analytics.model.Accounts;
import com.google.api.services.analytics.model.GaData;
import com.google.api.services.analytics.model.Profiles;
import com.google.api.services.analytics.model.Webproperties;
import com.google.gson.JsonArray;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class HelloAnalytics {
	

	  private static final String APPLICATION_NAME = "Hello Analytics";
	  private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
	  
	  //nimhans server
	  //private static final String KEY_FILE_LOCATION = "/home/pushd/wellness2/WELLNESS-CHECK-2ee03dc895d5.p12";
	  
	  //iiitb server
	  //private static final String KEY_FILE_LOCATION = "/home/dmhp1/AppWellness/WELLNESS-CHECK-2ee03dc895d5.p12";
	  
	  //local server
	  //private static final String KEY_FILE_LOCATION = "C:/Users/admin/Downloads/WELLNESS-CHECK-2ee03dc895d5.p12";
	  private static final String KEY_FILE_LOCATION = "D:/OLD PROJECTS/WELLNESS CHECK/WELLNESS-CHECK-2ee03dc895d5.p12";
	  
	  
	 
	 
	  //private static final String SERVICE_ACCOUNT_EMAIL = "pushd-1@pushd-169210.iam.gserviceaccount.com";
	  //private static final String SERVICE_ACCOUNT_EMAIL = "wellness-check@apt-canyon-198504.iam.gserviceaccount.com";
	  private static final String SERVICE_ACCOUNT_EMAIL = "wellness-check@wellness-check-198506.iam.gserviceaccount.com";
	
	  

	  public static void main(String[] args) {
    try {
      Analytics analytics = initializeAnalytics();
	
      String profile = getFirstProfileId(analytics);
      
      System.out.println("First Profile Id: "+ profile);
      printResults(getResults(analytics, profile));
    } catch (Exception e) {
      e.printStackTrace();
	    }
} 
	  public Object analytic(){
		  
		  
		  
		  try {
		      Analytics analytics = initializeAnalytics();

		      String profile = getFirstProfileId(analytics);
//	      System.out.println("First Profile Id: "+ analytics.data().ga().get("ga:" + profile, "7daysAgo", "today", "ga:sessions").execute());
		      LocalDate dateBefore = LocalDate.of(2018, Month.JANUARY, 01);
		        //29-July-2017, change this to your desired End Date
			LocalDate dateAfter = LocalDate.now();
			long noOfDaysBetween = ChronoUnit.DAYS.between(dateBefore, dateAfter);
			//System.out.println("CHECK DATE"+noOfDaysBetween);
		      Object a = analytics.data().ga()
		    	        .get("ga:" + profile, "500daysAgo", "today", "ga:users")
		    	        .execute();
		      Object b = analytics.data().ga()
		    	        .get("ga:" + profile, "500daysAgo", "today", "ga:sessions")
		    	        .execute();
		      Object c = analytics.data().ga()
		    	        .get("ga:" + profile, noOfDaysBetween+"daysAgo", "today", "ga:pageviews")
		    	        .execute();
		      
		      List ab = new ArrayList<>();
		      ab.add(a);
		      ab.add(b);
		      ab.add(c);
		      return ab;
		      
		     
		    } catch (Exception e) {
		      e.printStackTrace();
		    }
		 	  
		 return null;
		  
	  }

	  private static Analytics initializeAnalytics() throws Exception {
	    // Initializes an authorized analytics service object.

	    // Construct a GoogleCredential object with the service account email
	    // and p12 file downloaded from the developer console.
	    HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
	    GoogleCredential credential = new GoogleCredential.Builder()
	        .setTransport(httpTransport)
	        .setJsonFactory(JSON_FACTORY)
	        .setServiceAccountId(SERVICE_ACCOUNT_EMAIL)
	        .setServiceAccountPrivateKeyFromP12File(new File(KEY_FILE_LOCATION))
	      .setServiceAccountScopes(AnalyticsScopes.all())
	        .build();
	    

	    // Construct the Analytics service object.
	    return new Analytics.Builder(httpTransport, JSON_FACTORY, credential)
	        .setApplicationName(APPLICATION_NAME).build();
	  }


	  private static String getFirstProfileId(Analytics analytics) throws IOException {
	    // Get the first view (profile) ID for the authorized user.
	    String profileId = null;

	    // Query for the list of all accounts associated with the service account.
	    Accounts accounts = analytics.management().accounts().list().execute();

	    if (accounts.getItems().isEmpty()) {
	      System.err.println("No accounts found");
	    } else {
	      String firstAccountId = accounts.getItems().get(0).getId();

	      // Query for the list of properties associated with the first account.
	      
	      Webproperties properties = analytics.management().webproperties()
	          .list(firstAccountId).execute();

	      if (properties.getItems().isEmpty()) {
	        System.err.println("No Webproperties found");
	      } else {
	        String firstWebpropertyId = properties.getItems().get(0).getId();

	        // Query for the list views (profiles) associated with the property.
	        Profiles profiles = analytics.management().profiles()
	            .list(firstAccountId, firstWebpropertyId).execute();

	        if (profiles.getItems().isEmpty()) {
	          System.err.println("No views (profiles) found");
	        } else {
	          // Return the first (view) profile associated with the property.
	          profileId = profiles.getItems().get(0).getId();
	        }
	      }
	    }
	    return profileId;
	  }

	  private static GaData getResults(Analytics analytics, String profileId) throws IOException {
	    // Query the Core Reporting API for the number of sessions
	    // in the past seven days.
	    return analytics.data().ga()
	        .get("ga:" + profileId, "7daysAgo", "today", "ga:sessions")
	        .execute();
	  }
	  private static GaData getResultss(Analytics analytics, String profileId) throws IOException {
		    // Query the Core Reporting API for the number of sessions
		    // in the past seven days.
		    return analytics.data().ga()
		        .get("ga:" + profileId, "7daysAgo", "today", "ga:users")
		        .execute();
		  }

	  private static Object printResults(GaData results) {
	    // Parse the response from the Core Reporting API for
	    // the profile name and number of sessions.
	    if (results != null && !results.getRows().isEmpty()) {
//	      System.out.println("View (Profile) Name: " + results.getProfileInfo().getProfileName());
//	      System.out.println("Total Sessions: " + results.getRows().get(0).get(0));
//	      System.out.println(results.getProfileInfo());
	      return results.getProfileInfo().toString();
	      
	    } else {
	      System.out.println("No results found");
	    }
	    return null;
	  }
	  private static Object printResultss(GaData results) {
		    // Parse the response from the Core Reporting API for
		    // the profile name and number of sessions.
		    if (results != null && !results.getRows().isEmpty()) {
		      System.out.println("View (Profile) Name: "
		        + results.getProfileInfo().getProfileName());
		      System.out.println("Total Users: " + results.getRows().get(0).get(0));
		      System.out.println(results.getProfileInfo());
		      return results.getProfileInfo().toString();
		      
		    } else {
		      System.out.println("No results found");
		    }
		    return null;
		  }

}