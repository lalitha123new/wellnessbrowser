package org.project.IIITB.AppWellness.DataBase;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.project.IIITB.AppWellness.Globals.AppGlobals;
import org.project.IIITB.AppWellness.Globals.Database;
import org.project.IIITB.AppWellness.errorHandling.AppException;
import org.project.IIITB.AppWellness.model.User;
import org.project.IIITB.AppWellness.model.UserInfo;
import org.project.IIITB.AppWellness.model.UserSession;
import org.project.IIITB.AppWellness.service.MailService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;
import com.mysql.jdbc.PreparedStatement;

public class UserDAO extends Database {
	
	AppGlobals appGlobals = new AppGlobals();
	MailService mailService = new MailService();
	

	public int adduser(String userobject) throws ParseException, SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {

		JSONObject create_user = (JSONObject) new JSONParser().parse(userobject);
		UUID uid = UUID.fromString("38400000-8cf0-11bd-b23e-10b96e4ef00d");

		String email = (String) create_user.get("email");
		String username = (String) create_user.get("username");
		String password = (String) create_user.get("password");
		SecretKey secKey = KeyGenerator.getInstance("AES").generateKey();

		String encodedKey = Base64.getEncoder().encodeToString(secKey.getEncoded());

		// System.out.println("key is here"+encodedKey );

		System.out.println("email is here" + email);
		
		String useremail1 = BaseEncoding.base64().encode(email.getBytes("UTF-8"));
		String username1 = BaseEncoding.base64().encode(username.getBytes("UTF-8"));
		
		System.out.println("username1 is here" + username1);
		// email check
		String query1 = "select `email` from users where `email`='" + useremail1 + "';";
		Statement stmt1;
		stmt1 = conn.createStatement();
		ResultSet rs = stmt1.executeQuery(query1);
		
		String query2 = "select `username` from users where `username`='" + username1 + "';";
		Statement stmt2;
		stmt2 = conn.createStatement();
		ResultSet rs1 = stmt2.executeQuery(query2);
		
		if (rs.next()) {

			String h1 = rs.getString("email");
			System.out.println("ya we here" + h1);

			return 0;
		} else {
			if (rs1.next()) {

				String h2 = rs1.getString("username");
				System.out.println("ya we here" + h2);

				return -1;
				
			}else{
				
				
				String query = "insert into users(username,password,email,activation,key_new,token) values (?,?,?,?,?,?);";
				PreparedStatement stmt;
				try {
					
					String password1 = encryptText(password, secKey);
					stmt = (PreparedStatement) conn.prepareStatement(query);
					stmt.setString(1, BaseEncoding.base64().encode(username.getBytes("UTF-8")));
					stmt.setString(2, password1);
					stmt.setString(3, BaseEncoding.base64().encode(email.getBytes("UTF-8")));
					stmt.setInt(4, 0);
					stmt.setString(5, encodedKey);
					stmt.setString(6, uid.randomUUID().toString());
					stmt.execute();
				} catch (Exception e) {
					e.printStackTrace();
				}

				return getUserId();
			}		

		}

	}

	private int getUserId() {

		//String query = "select max(user_id) from users;";
		String query= "select LAST_INSERT_ID() as user_id from users";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				return rs.getInt("user_id");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return 0;
	}

	public String loginuser(String loginobject)
			throws ParseException, JsonProcessingException, SQLException, InvalidKeyException, NoSuchAlgorithmException,
			NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, UnsupportedEncodingException, AppException {

		UUID uid = UUID.fromString("38400000-8cf0-11bd-b23e-10b96e4ef00d");
		JSONObject login_user = (JSONObject) new JSONParser().parse(loginobject);

		List<UserSession> userlogin = new ArrayList();
		System.out.println(login_user);
		String username = (String) login_user.get("username");
		String password1 = (String) login_user.get("password");
		
		String username1 = BaseEncoding.base64().encode(username.getBytes("UTF-8"));

		int u_id = 0;
		String query2 = "select user_id  from users where username='" + username1 + "';";
		Statement stmt2;
		stmt2 = conn.createStatement();
		ResultSet rs2 = stmt2.executeQuery(query2);
		while (rs2.next()) {
			u_id = rs2.getInt("user_id");

		}

		String encodedKey1 = null;
		String query1 = "select key_new from users where user_id=" + u_id;
		Statement stmt1;
		stmt1 = conn.createStatement();
		ResultSet rs1 = stmt1.executeQuery(query1);
		while (rs1.next()) {
			encodedKey1 = rs1.getString("key_new");
		}

		byte[] decodedKey = Base64.getDecoder().decode(encodedKey1);
		SecretKey originalKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, "AES");

		String password = encryptText(password1, originalKey);

		String query = "select user_id ,activation, token from users where username='" + username1 + "' and password='"
				+ password + "';";

		int active_id = 0;
		ObjectMapper mapper = new ObjectMapper();
		String bb = null;
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {
				active_id = rs.getInt("activation");
				if (active_id == 1) {

					UserSession u = new UserSession(rs.getInt("user_id"), rs.getString("token"));
					userlogin.add(u);
					bb = mapper.writeValueAsString(userlogin);

				} else {

					UserSession u = new UserSession(-rs.getInt("user_id"), rs.getString("token"));
					userlogin.add(u);
					bb = mapper.writeValueAsString(userlogin);
				}

			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		if(bb == null){
			
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),
					"invalid login",
					"UserDAO::loginuser",
					appGlobals.ServerPath);
		}else{
			
			return bb;
		}

		
	}

	public String adduserinfo(int userid, String infoobject)
			throws ParseException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException,
			IllegalBlockSizeException, BadPaddingException, SQLException, UnsupportedEncodingException {

		System.out.println(infoobject);
		
		String object = null;
		List<UserSession> userres = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();

		JSONObject userinfo = (JSONObject) new JSONParser().parse(infoobject);

		String name = (String) userinfo.get("name");
		Long age = (Long) userinfo.get("age");
		String city = (String) userinfo.get("city");
		String work = (String) userinfo.get("work");
		String gender = (String) userinfo.get("gender");
		String status = (String) userinfo.get("status");
		String education = (String) userinfo.get("education");
		String current = (String) userinfo.get("current");
		String life = (String) userinfo.get("life");
		String mental = (String) userinfo.get("mental");
		String seek = (String) userinfo.get("seek");
		Long phone = (Long) userinfo.get("phone");
		String distress = (String) userinfo.get("distress");
		String consult = (String) userinfo.get("consult");
		String personal = (String) userinfo.get("personal");
		
		String query = "insert into registration_info(user_id,name,age,work,city,phonenumber,gender,martial_status,education,best_currently,mental_health_prof_help,current_mental_helath_prob,seek_mental_prof_help,distress,consult,personal) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

		PreparedStatement stmt;

		try {

			stmt = (PreparedStatement) conn.prepareStatement(query);
			stmt.setInt(1, userid);
			stmt.setString(2, name);
			stmt.setLong(3, age);
			stmt.setString(4, work);
			stmt.setString(5, city);
			stmt.setLong(6, phone);
			stmt.setString(7, gender);
			stmt.setString(8, status);
			stmt.setString(9, education);
			stmt.setString(10, current);
			stmt.setString(11, life);
			stmt.setString(12, mental);
			stmt.setString(13, seek);
			stmt.setString(14, distress);
			stmt.setString(15, consult);
			stmt.setString(16, personal);
			stmt.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
		// action check
		String query3 = "update `users` set `activation`=1 where `user_id`=" + userid + ";";
		String query4 = "select token from users where user_id='"+userid+"';";
		String query5 = "select username,email from users where user_id="+userid+";";
		PreparedStatement stmt2;

		try {
			stmt2 = (PreparedStatement) conn.prepareStatement(query3);
			stmt2.executeUpdate();
		} catch (Exception e) {

			e.printStackTrace();
		}
		
		Statement stmt3;
		
		String uname = null;
		String uemail = null;
		byte[] contentInBytes = null;
		byte[] contentInBytes1 = null;;
		
		try {
			
			stmt3 = conn.createStatement();
			ResultSet rs = stmt3.executeQuery(query4);
			while(rs.next()){
				
				UserSession session = new UserSession(userid, rs.getString("token"));
				userres.add(session);
				object = mapper.writeValueAsString(userres);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Statement stmt4;
		try {
			
			stmt4 = conn.createStatement();
			ResultSet resultSet = stmt4.executeQuery(query5);
			while(resultSet.next()){
			
				contentInBytes = BaseEncoding.base64().decode(resultSet.getString("username"));
				contentInBytes1 = BaseEncoding.base64().decode(resultSet.getString("email"));
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		String uname1 = new String(contentInBytes, "UTF-8");
		String uemail1 = new String(contentInBytes1, "UTF-8");
		
		//String useruname = uname1.substring(0, 1).toUpperCase() + uname1.substring(1);
		String useruname = uname1.substring(0, 1)+ uname1.substring(1);
		 String m_subject = "Email from wellness - check";
         String m_text = "Hi "+useruname+",<div>\n<br> Welcome, we thank you for registering wellness - check survey.</div>" +"<div>"
         		+ "Your Username is - "+ useruname + "</div>"+"<div>You will use this username for all your future reference.</div></br>"
        		 +"<div>You may click on the link given below and login using username and password to fill the wellness - check survey.</div><br>"
         + "<a href='"+appGlobals.ServerPath+"'>"+appGlobals.ServerPath+" </a><br><br>"
         +"Thanking you,<br>"+
         "Wellness - Check Team";
                       
         mailService.sendEmail(uemail1, m_subject, m_text);	

		return object;
	}

	public String getAge(int userid) {

		String result = null;
		String query = "select `age` from `registration_info` where user_id='" + userid + "';";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				result = rs.getString("age");

			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}
	
	public String getAge1(int userid) {

		String result = null;
		String query = "select `age` from `registration_info` where user_id='" + userid + "';";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				result = rs.getString("age");

			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}

	public String getName(int userid) throws UnsupportedEncodingException {

		String result = null;
		String query = "select `username` from `users` where user_id='" + userid + "';";
		Statement stmt;
		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				result = rs.getString("username");
			}
			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		byte[] contentInBytes = BaseEncoding.base64().decode(result);

		return new String(contentInBytes, "UTF-8");
	}

	public String getUid(String email) throws ParseException, UnsupportedEncodingException {

		ObjectMapper mapper = new ObjectMapper();
		String bb = null;

		JSONObject uemail = (JSONObject) new JSONParser().parse(email);

		String useremail = (String) uemail.get("email");
		System.out.println("useremail" + useremail);
		String useremail1 = BaseEncoding.base64().encode(useremail.getBytes("UTF-8"));
		
		System.out.println("useremail1 = "+useremail1);
		int id = 0;

		String query = "select user_id,username from users where email='" + useremail1 + "';";

		Statement stmt;
		try {
			
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				byte[] contentInBytes = BaseEncoding.base64().decode(rs.getString("username"));
				UserInfo info = new UserInfo(rs.getInt("user_id"), new String(contentInBytes, "UTF-8"));
				bb = mapper.writeValueAsString(info);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return bb;
	}

	public void forgotUpdate(int user_id, String fpwd)
			throws ParseException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException,
			IllegalBlockSizeException, BadPaddingException, SQLException {

		JSONObject fpass = (JSONObject) new JSONParser().parse(fpwd);

		String upass = (String) fpass.get("forgot");
		
		System.out.println("encodehhhkjdKey1" + upass);

		String encodedKey1 = null;
		String query1 = "select key_new from users where user_id=" + user_id;
		Statement stmt1;
		stmt1 = conn.createStatement();
		ResultSet rs1 = stmt1.executeQuery(query1);
		while (rs1.next()) {
			encodedKey1 = rs1.getString("key_new");
		}
         System.out.println("encodedKey1" + encodedKey1);
		byte[] decodedKey = Base64.getDecoder().decode(encodedKey1);
		SecretKey originalKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, "AES");

		String password = encryptText(upass, originalKey);
		System.out.println("password" + password);

		String query = "update users set password='" + password + "' where user_id='" + user_id + "';";
		System.out.println("query" + query);
		PreparedStatement stmt;

		try {

			stmt = (PreparedStatement) conn.prepareStatement(query);
			stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private String decryptText(byte[] byteCipherText, SecretKey secKey) throws NoSuchAlgorithmException,
			NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {

		Cipher aesCipher = Cipher.getInstance("AES");
		aesCipher.init(Cipher.DECRYPT_MODE, secKey);
		byte[] bytePlainText = aesCipher.doFinal(byteCipherText);
		return new String(bytePlainText);

	}

	private String encryptText(String plainText, SecretKey secKey) throws NoSuchAlgorithmException,
			NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		// TODO Auto-generated method stub

		Cipher aesCipher = Cipher.getInstance("AES");
		aesCipher.init(Cipher.ENCRYPT_MODE, secKey);
		byte[] byteCipherText = aesCipher.doFinal(plainText.getBytes());
		return new String(byteCipherText);

	}

	private SecretKey getSecretEncryptionKey() throws NoSuchAlgorithmException {
		// TODO Auto-generated method stub
		KeyGenerator generator = KeyGenerator.getInstance("AES");
		generator.init(128); // The AES key size in number of bits
		SecretKey secKey = generator.generateKey();
		return secKey;

	}

	public Response userLogout(int internalID, String logoutobject) throws ParseException {

		JSONObject logout = (JSONObject) new JSONParser().parse(logoutobject);
		UUID uid = UUID.fromString("38400000-8cf0-11bd-b23e-10b96e4ef00d");  

		String startime = (String) logout.get("start");
		String endtime = (String) logout.get("end");

			String query = "insert into logout (user_id,end_time,start_time) values (?,?,?)";
			String query2 = "update users set token='"+uid.randomUUID().toString()+"' where user_id='"+internalID+"';";

			PreparedStatement stmt;
			PreparedStatement stmt2;

			try {

				stmt = (PreparedStatement) conn.prepareStatement(query);
				stmt.setInt(1, internalID);
				stmt.setString(2, endtime);
				stmt.setString(3, startime);
				stmt.execute();	
				stmt2 = (PreparedStatement) conn.prepareStatement(query2);
			    stmt2.executeUpdate();

			} catch (Exception e) {
				e.printStackTrace();
			}
			return null;
		}

}
