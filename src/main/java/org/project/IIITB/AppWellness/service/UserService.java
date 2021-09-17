package org.project.IIITB.AppWellness.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.jasypt.util.text.StrongTextEncryptor;
import org.jasypt.util.text.TextEncryptor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;

import org.project.IIITB.AppWellness.DataBase.UserDAO;
import org.project.IIITB.AppWellness.Globals.AppGlobals;
import org.project.IIITB.AppWellness.Globals.Database;
import org.project.IIITB.AppWellness.errorHandling.AppException;
import org.project.IIITB.AppWellness.model.Score;
import org.project.IIITB.AppWellness.model.Section;
import org.project.IIITB.AppWellness.model.User;
import org.project.IIITB.AppWellness.model.UserInfo;
import org.project.IIITB.AppWellness.model.UserSession;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.common.io.BaseEncoding;
import com.mysql.jdbc.PreparedStatement;
import com.mysql.jdbc.log.LogFactory;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.ws.rs.core.Response;

import java.util.Properties;

import sun.rmi.runtime.Log;

public class UserService extends Database {

    String d_email = "wellnesscheck.reminder.nimhans@gmail.com";
    String d_password = "useforreminders";
    String d_host = "smtp.gmail.com";
    String d_port = "465";

    UserDAO userDAO = new UserDAO();
    MailService mailService = new MailService();
    AppGlobals appGlobals = new AppGlobals();

    public UserService() {
    }

    public int createUser(String create_user) throws ParseException, SQLException, NoSuchElementException, NoSuchAlgorithmException, UnsupportedEncodingException {

        return userDAO.adduser(create_user);
    }

    public String login(String loginobject) throws ParseException, JsonProcessingException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, SQLException, UnsupportedEncodingException, AppException {

        return userDAO.loginuser(loginobject);
    }

    public String addUserInfo(int internalID, String infoobject) throws ParseException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, SQLException, UnsupportedEncodingException {

        return userDAO.adduserinfo(internalID, infoobject);
    }

    public Response getAge(int internalID) {

      //BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        /*String es = "aby";
        String encode = bCryptPasswordEncoder.encode(es);
        System.out.println(encode);

        boolean a = bCryptPasswordEncoder.matches("jj", encode);
        System.out.println(a); */
        
    /*    String pass = "aby@12345";
        StrongTextEncryptor encryptor = new StrongTextEncryptor();
        encryptor.setPassword(pass);
        
        String enc = encryptor.encrypt(pass);
        
        System.out.println("enc=" + enc);
        
        String dec = encryptor.decrypt(enc);
        
        System.out.println("dec=" + dec);*/

        return Response.status(200).entity(userDAO.getAge(internalID)).build();
    }

    
    public Response getAge1(int internalID) {

        

          return Response.status(200).entity(userDAO.getAge1(internalID)).build();
      }
    public String getName(int internalID) throws UnsupportedEncodingException {

        return userDAO.getName(internalID);

    }

    public int forgotPassword(String forgot) throws ParseException, UnsupportedEncodingException {

        JSONObject fpass = (JSONObject) new JSONParser().parse(forgot);

        String m_to = (String) fpass.get("email");
        
        String email1 = BaseEncoding.base64().encode(m_to.getBytes("UTF-8"));

        String query = "select user_id,username from users where email='" + email1 + "';";
        int id = 0;
        String uname = null;
        Statement stmt;
        try {

            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {

                id = rs.getInt("user_id");
                uname = rs.getString("username");
            }
            System.out.println("uname=" + uname);
            if (id == 0) {

                return id;
            } else {
                byte[] uname1 = BaseEncoding.base64().decode(uname);
                String m_subject = "Reset password - Wellness-Check";
                String emaillink = "\n<a href='wellbeing.flourish.nimhans@gmail.com'>wellbeing.flourish.nimhans@gmail.com</a>";
                String encoded = new String(Base64.getEncoder().encode(m_to.getBytes()));
                String m_text = "<div>Hi\n" + new String(uname1, "UTF-8")
                        + ",</div><div>You recently requested to reset your password for wellness - Check account. Click on the link  below to reset it.<br> This password reset is only valid for next 24 hours. </div><br>"
                        + "<a href= '" + appGlobals.ServerPath + "/web/forgot.html?email="+encoded+"'> " + appGlobals.ServerPath
                        + "/web/forgot.html?email="+encoded+"</a>"
                        + "<br><div><br>Thanks,</div><div>Wellness - Check team<br></div><div><br>Please do not 'REPLY' directly to this email. If you have any query, send  an email to "
                        + emaillink + "</div>";

                mailService.sendEmail(m_to, m_subject, m_text);
                return id;

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return id;

    }

    public int verfiyEmail(String email) throws ParseException, UnsupportedEncodingException {

        JSONObject fpass = (JSONObject) new JSONParser().parse(email);

        String m_to = (String) fpass.get("email");
        
        String email1 = BaseEncoding.base64().encode(m_to.getBytes("UTF-8"));

        String query = "select user_id from users where email='" + email1 + "';";
        int id = 0;
        Statement stmt;

        try {

            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {

                id = rs.getInt("user_id");
            }
            System.out.println("aaaaa" + id);
            if (id == 0) {

                String m_subject = "Registration for Wellness Check";
                String emaillink = "\n<a href='wellbeing.flourish.nimhans@gmail.com'>wellbeing.flourish.nimhans@gmail.com</a>";
                String encoded = new String(Base64.getEncoder().encode(m_to.getBytes()));
                String m_text = "<div>Hello,</div><div>You have initiated registration  process for Wellness Check.</div><div>Please click on the  link to  complete registration.<br></div><br>"
                        + "<a href= '" + appGlobals.ServerPath + "/web/signup.html?email="+encoded+"'> " + appGlobals.ServerPath
                        + "/web/signup.html?email="+encoded+"</a>"
                        + "<br><div><br>Thanks,</div><div>Wellness - Check team<br></div><div><br>Please do not 'REPLY' directly to this email. If you have any query, send  an email to "
                        + emaillink + "</div>";

                mailService.sendEmail(m_to, m_subject, m_text);
                return id;
            } else {

                return id;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return id;
    }

    // sending regular notifications
    public int regularNotifications(){
        
        System.out.println("regularNotifications++working");
        ArrayList<Integer> user_ids = new ArrayList<Integer>();
        String query = "select user_id from users where notification_status in (0,1,2,3)";
        Statement stmt;
        try{
         stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(query);
         while (rs.next()) {
            //int    id = rs.getInt("user_id");
            user_ids.add(rs.getInt("user_id"));
            }
         List<Object> section_ids = new ArrayList<>();
         
         for (int i = 0; i < user_ids.size(); i++) {
             
             String query1 = "SELECT sections_id FROM responses WHERE user_id='"+user_ids.get(i)+"'GROUP BY sections_id";
             Statement stmt1;
             stmt1 = conn.createStatement();
             ResultSet rs1 = stmt1.executeQuery(query1);
             System.out.println("we printiin resultset  "+rs1);
             while (rs1.next()) {
                 
                // section_ids.add(rs1.getInt("user_id"));
                 section_ids.add(rs1.getString("sections_id"));     
                
             } 
             
             //user name query
                String query5 = "select username from `users` where `user_id`='" + user_ids.get(i) + "';";
                Statement stmt5;
                byte[] contentInBytes = null;
                try {
                    
                    stmt5 = conn.createStatement();
                    ResultSet rs5 = stmt5.executeQuery(query5);
                    while (rs5.next()) {

                        contentInBytes = BaseEncoding.base64().decode(rs5.getString("username"));
                        
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                String username_ref=new String(contentInBytes, "UTF-8");
                
                 //phone number query
                String query6 = "select `phonenumber` from `registration_info` where `user_id`='" + user_ids.get(i) + "';";
                Statement stmt6;
                //byte[] phonenumber = null;
                String phone_ref="";
                try {
                    
                    stmt6 = conn.createStatement();
                    ResultSet rs6 = stmt6.executeQuery(query6);
                    while (rs6.next()) {

                        //phonenumber = BaseEncoding.base64().decode(rs5.getString("phonenumber"));
                        phone_ref=rs6.getString("phonenumber");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            //    String phone_ref=new String(phonenumber, "UTF-8");
                
                
                //"9113883220";
                   
                  // System.out.println("we r in fdfdfdf88888dloop"+username_ref);
            
                
                 String query2 = "SELECT email FROM users WHERE user_id='"+user_ids.get(i)+"'";
                 Statement stmt2;
                 stmt2 = conn.createStatement();
                 ResultSet rs2 = stmt2.executeQuery(query2);
                 byte[] e_mail = null;
                 while(rs2.next()){

                      e_mail=BaseEncoding.base64().decode(rs2.getString("email"));
                 }
                 
                                   
                 String m_to=new String(e_mail);
                 String m_subject ="";
                 String m_text ="";
                 String emaillink = "";
                 if(section_ids.size()==5){
                     
                     String query4 = "SELECT count(`sections_id`) as cnt FROM `responses` WHERE `sections_id`='S2' and `user_id`='"+user_ids.get(i)+"'";
                     Statement stmt4;
                     stmt4 = conn.createStatement();
                     ResultSet rs4 = stmt4.executeQuery(query4);
                     int cnt = 0;
                     while(rs4.next()){

                         cnt= rs4.getInt("cnt");
                     }     
                     System.out.println("***send notification"+cnt);
                     String query3 = "SELECT `timestamp` FROM `responses` WHERE `user_id`='"+user_ids.get(i)+"' and `sections_id`='S1' order by `timestamp` desc limit 0,1 ";
                     Statement stmt3;
                     stmt3 = conn.createStatement();
                     ResultSet rs3 = stmt3.executeQuery(query3);    
                     String s_dt ="";
                     String s_dt1 ="";
                    
                     String s_dt12th ="";
                    
                     while(rs3.next()){ 
                       s_dt = rs3.getDate("timestamp").toString();
                       SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                       Calendar c = Calendar.getInstance();
                       c.setTime(sdf.parse(s_dt));
                       c.add(Calendar.DATE, 7);  
                       s_dt = sdf.format(c.getTime());   
                       
                      //2nd Date from starting
                      
                       c.add(Calendar.DATE, 8);  
                       s_dt1 = sdf.format(c.getTime()); 
                       
                      
                       
                       c.add(Calendar.DATE, -4);  
                       s_dt12th = sdf.format(c.getTime());
                       
                       DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                       LocalDate localDate = LocalDate.now();
                       System.out.println(dtf.format(localDate));
                       
                       
                       if(dtf.format(localDate).equals(s_dt)){
                           
                         // 3rd day notification and notification status will be 3
                           if(cnt<2){             
                                 
                                  m_subject = "Wish to know your positivity ratio?";
                                  emaillink = "\n<a href='wellbeing.flourish.nimhans@gmail.com'>wellbeing.flourish.nimhans@gmail.com</a>";
                                  m_text = "<div>Hello  \n"+username_ref+",</div><div><br>Thank you for taking the time to complete Wellness Check  survey.\n<br>" 
                                           +"We hope you  have viewed  your feedback on My Page.\n<br>"
                                           +"For getting to know  your positivity ratio, you need to respond to  Emotional Well being  section  twice, so your scores can be averaged.\n<br>"
                                           +"Hence, please re-visit  and  respond to Emotional Well being  section again  between\n"+ s_dt +"\nto\n "+s_dt1+"\n to calculate your positivity ratio.\n<br>" 
                                           +"</div><div>Please click on the link below.<br></div><br>"
                                           + "<a href='"+appGlobals.ServerPath+"'>"+appGlobals.ServerPath+" </a><br><br>"
                                            + "<br><div><br>Thanks,</div><div>Wellness - Check team<br></div><div><br>Please do not 'REPLY' directly to this email. If you have any query, send  an email to "
                                            + emaillink + "</div>";
                                  String message1="Thanks for participating in wellness-check.\n"
                                          + "To know your positivity ratio,\n"
                                          + "please fill emotional well being section again latest by "+s_dt1
                                         +"\nThanks\n"
                                        +"Wellness-Check Team";
                                       
                                  UserService.updateNotificationStatus(user_ids.get(i), 3);
                                  mailService.sendEmail(m_to, m_subject, m_text);
                                  ReminderService.sendReminder(phone_ref, message1);
                                 }else{
                                     
                                     System.out.println("not send notification");
                                     UserService.updateNotificationStatus(user_ids.get(i), 3); 
                                 }
                           
                       }else if(dtf.format(localDate).equals(s_dt12th)){
                           // 12th day notification and notification status will be 4
                           if(cnt<2){             
                                 
                                  m_subject = "Wish to know your positivity ratio?";
                                  emaillink = "\n<a href='wellbeing.flourish.nimhans@gmail.com'>wellbeing.flourish.nimhans@gmail.com</a>";
                                  m_text = "<div>Hello  \n"+username_ref+",</div><div><br>Thank you for taking the time to complete Wellness Check  survey.\n<br>" 
                                          +"We hope you  have viewed  your feedback on My Page.\n<br>"
                                          +"For getting to know  your positivity ratio, you need to respond to  Emotional Well being  section  twice, so your scores can be averaged.\n<br>"
                                          +"Hence, please re-visit  and  respond to Emotional Well being  section again  between\n"+ s_dt +"\nto\n "+s_dt1+"\n to calculate your positivity ratio.\n<br>" 
                                          +"</div><div>Please click on the link below.<br></div><br>"
                                          + "<a href='"+appGlobals.ServerPath+"'>"+appGlobals.ServerPath+" </a><br><br>"
                                           + "<br><div><br>Thanks,</div><div>Wellness - Check team<br></div><div><br>Please do not 'REPLY' directly to this email. If you have any query, send  an email to "
                                           + emaillink + "</div>";
                                  
                                  
                                  String message1="Thanks for participating in wellness-check.\n"
                                          + "To know your positivity ratio,\n"
                                          + "please fill emotional well being section again latest by "+s_dt1
                                         +"\nThanks\n"
                                        +"Wellness-Check Team";
                                       
                                  UserService.updateNotificationStatus(user_ids.get(i), 4);
                                  mailService.sendEmail(m_to, m_subject, m_text);
                                  
                                  ReminderService.sendReminder(phone_ref, message1);
                                  
                                 }else{
                                     
                                     System.out.println("not send notification");
                                     UserService.updateNotificationStatus(user_ids.get(i), 4); 
                                 }                      
                       }else{
                           
                           System.out.println(" this is not time to send NO date is working here"+dtf.format(localDate)+"  --- "+ s_dt+" --- "+user_ids.get(i));
                                      
                       }
                       
                       System.out.println("starting date"+rs3.getDate("timestamp"));
                       System.out.println("day of 12 for 1st notification send"+s_dt12th);
                       System.out.println("day of 7 for 1th notification send"+s_dt);
                       
                     }
                     
                    
                                  
                  }else{
                      
                                            
                         String query3 = "SELECT `timestamp` FROM `responses` WHERE `user_id`='"+user_ids.get(i)+"' and `sections_id`='S1' order by `timestamp` asc limit 0,1 ";
                         Statement stmt3;
                         stmt3 = conn.createStatement();
                         ResultSet rs3 = stmt3.executeQuery(query3);    
                         String s_dt ="";
                         String s_dt3rd ="";
                         String s_dt6th ="";
                         while(rs3.next()){ 
                            s_dt = rs3.getDate("timestamp").toString();
                           SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                           Calendar c = Calendar.getInstance();
                           c.setTime(sdf.parse(s_dt));
                           c.add(Calendar.DATE, 7);  
                           s_dt = sdf.format(c.getTime());  
                           
                           
                         //day of 3 for 1st notification send
                           c.add(Calendar.DATE, -4);  
                           s_dt3rd = sdf.format(c.getTime());
                           
                         //day of 6 for 1st notification send
                           c.add(Calendar.DATE, 3);  
                           s_dt6th = sdf.format(c.getTime());
                         }
                            
                           DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                           LocalDate localDate = LocalDate.now();
                           System.out.println(dtf.format(localDate));
                         
                         
                         if(dtf.format(localDate).equals(s_dt3rd)){
                             
                             m_subject = "Thank you for registering Wellness - Check ";
                             emaillink = "\n<a href='wellbeing.flourish.nimhans@gmail.com'>wellbeing.flourish.nimhans@gmail.com</a>";
                             m_text = "<div>Hello\n "+username_ref+",</div><div><br>Recently, you started to fill in wellness- Check survey, but you did not finish it.<br><br>" 

                                          +"Please take the time to complete the rest of the survey to get  feedback on all the measures. <br><br>"

                                          +"You can resume your session where you stopped and complete the wellness check latest by "+s_dt+" or before<br></div>"
                                              + "<br><div><br>Thanks,<br></div><div>Wellness - Check team<br></div><div><br>Please do not 'REPLY' directly to this email. If you have any query, send  an email to "
                                              + emaillink + "</div>";

                         
//                             String Message12=" Thank you for registering Wellness - Check"
//                                     +"Recently, you started to fill in wellness- Check survey, but you did not finish it." 
//                                     +"Please take the time to complete the rest of the survey to get  feedback on all the measures." 
//                                     +"You can resume your session where you stopped and complete the wellness check latest by "+s_dt+" or before."
//                                     +"Thanks"
//                                     +"Wellness-Check Team"; 
                             
                             
                             String Message1="Hi, You have started wellness-check.\n"
                                      + "you can resume where you stopped and completed by"+s_dt+"to receive wellness-check report.\n"
                                      +"Thanks,\n"
                                     +"Wellness-Check Team";
                             
                             
                         UserService.updateNotificationStatus(user_ids.get(i), 1);
                         mailService.sendEmail(m_to, m_subject, m_text);
                         ReminderService.sendReminder(phone_ref, Message1);
                             
                         }else if(dtf.format(localDate).equals(s_dt6th)){
                             
                             m_subject = "Thank you for registering Wellness - Check ";
                             emaillink = "\n<a href='wellbeing.flourish.nimhans@gmail.com'>wellbeing.flourish.nimhans@gmail.com</a>";
                             m_text = "<div>Hello\n "+username_ref+",</div><div><br>Recently, you started to fill in wellness-Check survey, but you did not finish it.<br><br>" 

                                          +"Please take the time to complete the rest of the survey to get  feedback on all the measures.<br><br>"

                                          +"You can resume your session where you stopped and complete the wellness check latest by "+s_dt+" or before<br></div>"
                                              + "<br><div><br>Thanks,<br></div><div>Wellness - Check team<br></div><div><br>Please do not 'REPLY' directly to this email. If you have any query, send  an email to "
                                              + emaillink + "</div>";

                             
                             
//                             String Message1=" Thank you for registering Wellness - Check"
//                                     +"Recently, you started to fill in wellness- Check survey, but you did not finish it." 
//                                     +"Please take the time to complete the rest of the survey to get  feedback on all the measures." 
//                                     +"You can resume your session where you stopped and complete the wellness check latest by "+s_dt+" or before."
//                                     +"Thanks"
//                                     +"Wellness-Check Team";  
                             
                             String message1="hi, you have started wellness-check.\n"
                                      + "you can resume where you stopped and completed by"+s_dt+" to receive wellness-check report.\n"
                                      +"thanks,\n"
                                     +"wellness-check team";
                             

                         UserService.updateNotificationStatus(user_ids.get(i), 2);
                         mailService.sendEmail(m_to, m_subject, m_text);
                         ReminderService.sendReminder(phone_ref, message1);
                        
                         }else{
                             
                             System.out.println(" ++++++NO date is working here"+dtf.format(localDate)+"  --- "+ s_dt6th+"   3rd day "+s_dt3rd+" --- "+user_ids.get(i));
                         }                    
                 
             }    
             
             section_ids.clear();
             
            
         }
         
         System.out.println("regularNotifications++working  "+user_ids);    
         
        } catch (Exception e) {
            e.printStackTrace();
        }
                
        return 18;
    }
    
    
    public static String updateNotificationStatus(int user_id,int notification_stutus)  {

         
           String query3 = "update `users` set `notification_status`="+notification_stutus+" where `user_id`=" + user_id + ";";
            PreparedStatement stmt2;
            try {
                stmt2 = (PreparedStatement) conn.prepareStatement(query3);
                stmt2.executeUpdate();
            } catch (Exception e) {
                e.printStackTrace();
            } 
        
        return "yes updated notification_stuts";
    }
    
    
    
    
    
    public String getUid(String email) throws ParseException, UnsupportedEncodingException {

        return userDAO.getUid(email);
    }

    public void forgotUpdate(int user_id, String fpwd) throws ParseException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, SQLException {

        userDAO.forgotUpdate(user_id, fpwd);
    }
    
    public Response userLogout(int internalID,String logoutobject) throws ParseException{
        
        return userDAO.userLogout(internalID, logoutobject);
         
    }
}

