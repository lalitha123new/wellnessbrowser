package org.project.IIITB.AppWellness.service;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

public class ReminderService extends Thread {
    

    public static String sendReminder( String mobileNumber,String mobMessage ) {
        

        //String mobMessage;
       //mobileNumber="8861357885";        
      //mobMessage = "Hello! You have scheduled a session for yourself on wellness App on ";
        

        try {
            String encodedMsg = URLEncoder.encode(mobMessage, "UTF-8");
            String httpMessage = "http://www.smsgatewaycenter.com/library/send_sms_2.php?UserName=nimpus1&Password=vyecWa4c&Type=Individual&To="
                    + mobileNumber + "&Mask=NIMHNS&Message=" + encodedMsg;

            // System.out.println(httpMessage);
            CloseableHttpClient httpclient = HttpClients.createDefault();
            HttpGet httpget = new HttpGet(httpMessage);
            CloseableHttpResponse response = null;
            try {

                response = httpclient.execute(httpget);
                // System.out.println(response.getStatusLine().getStatusCode());
                //System.out.println(response.getStatusLine().getReasonPhrase());
                // System.out.println(response.getStatusLine().toString());
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return "yes working";

        /*
         * 
        
        
        */

    }

    
}

