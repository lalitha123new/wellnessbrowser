package org.project.IIITB.AppWellness.DataBase;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.project.IIITB.AppWellness.Globals.Database;
import org.project.IIITB.AppWellness.model.Section;
import org.project.IIITB.AppWellness.model.User;
import org.project.IIITB.AppWellness.model.UserSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.BaseEncoding;

public class AdminDAO extends Database {

	public int adminlogin(String loginobject) throws ParseException {

		JSONObject admin = (JSONObject) new JSONParser().parse(loginobject);

		String username = (String) admin.get("username");
		String password = (String) admin.get("password");
		int a = 0;

		String query = "select a_id from admin where username='" + username + "' and password='" + password + "';";
		Statement stmt;
		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				a = rs.getInt("a_id");
			}
			System.out.println(a);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return a;
	}
	

	public String userinfo() {

		List<User> users = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		String bb = null;

		String query = "select registration_info.user_id,registration_info.name,registration_info.phonenumber,users.email from users INNER JOIN registration_info ON users.user_id = registration_info.user_id";
		Statement stmt;
		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {
				byte[] emal1 = BaseEncoding.base64().decode(rs.getString("email"));
				User user = new User(rs.getInt("user_id"),rs.getString("name"), new String(emal1, "UTF-8"), rs.getString("phonenumber"));
				users.add(user);
				bb = mapper.writeValueAsString(users);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return bb;

	}

	public String userdemo() {

		List<User> userdemo = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		String aa = null;

		String query = "select * from registration_info";
		Statement stmt;
		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				User userdemog = new User(rs.getInt("user_id"),rs.getString("name"), rs.getString("gender"), rs.getInt("age"),
						rs.getString("city"), rs.getString("work"), rs.getString("martial_status"),
						rs.getString("education"), rs.getString("best_currently"),
						rs.getString("mental_health_prof_help"), rs.getString("current_mental_helath_prob"),
						rs.getString("seek_mental_prof_help"),rs.getString("distress"),rs.getString("consult"),rs.getString("personal"));
				userdemo.add(userdemog);
				aa = mapper.writeValueAsString(userdemo);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return aa;

	}

	public String userfeedback() {

		List<User> userfeedback = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		String cc = null;

		String query = "select registration_info.user_id,registration_info.name,feedback.timestamp,feedback.feedback1,feedback.feedback2,feedback.feedback3,feedback.feedback4,feedback.feedback5 from feedback INNER JOIN registration_info ON feedback.user_id = registration_info.user_id";
		Statement stmt;

		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				User ufeed = new User(rs.getInt("user_id"),rs.getString("name"), rs.getString("feedback1"), rs.getString("feedback2"),rs.getString("timestamp"),rs.getString("feedback3"),rs.getString("feedback4"),rs.getString("feedback5"));
				userfeedback.add(ufeed);
				cc = mapper.writeValueAsString(userfeedback);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return cc;
	}

	public String userresponse() {

		List<Section> userres = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		String dd = null;

		//String query = "select DISTINCT registration_info.user_id,registration_info.name,responses.sections_id,responses.section_count,responses.timestamp,responses.responce,responses.total_score_sum,responses.percentile from responses INNER JOIN registration_info ON responses.user_id = registration_info.user_id";
		String query = "select  responses.user_id, responses.section_count,responses.timestamp FROM responses WHERE responses.user_id IN(SELECT responses.user_id FROM responses GROUP BY responses.user_id HAVING COUNT(distinct responses.section_count) >0) GROUP BY responses.user_id,responses.section_count ";
		Statement stmt;

		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			String userresponse = " ";
			String res = " ";
			String sectionid = " ";
			String name =  " ";
			/*while (rs.next()) {
				
			
				
				

				Section userrsponse = new Section(rs.getInt("user_id"),rs.getString("name"),rs.getString("sections_id"),rs.getInt("section_count"), rs.getString("timestamp"),
						rs.getString("responce"),rs.getString("total_score_sum"),rs.getString("percentile"));
				userres.add(userrsponse);
				dd = mapper.writeValueAsString(userres);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}*/
			
while (rs.next()) {
				
				String query1 = "SELECT timestamp,sections_id,responce FROM responses WHERE user_id = "+rs.getInt("user_id") + " AND  section_count = "+ rs.getInt("section_count");
				Statement stmt1;
				String[] array100 = null;			
				 array100 = new String[85];
				 
				try {
				stmt1 = conn.createStatement();
				ResultSet rs1 = stmt1.executeQuery(query1);
				
				
				while (rs1.next()) {
					
					
					//System.out.println(rs.getInt("user_id") +"________"+rs.getInt("section_count")+ " ___   "+ rs1.getString("sections_id") + rs1.getString("responce"));
					
					
					 res = rs1.getString("responce");	
					String section_id = rs1.getString("sections_id");
					
					sectionid=section_id;
					//System.out.println(res);
					//System.out.println(sectionid);
					if((section_id).equals("S1")){
						String s1a = rs1.getString("responce");
						s1a = s1a.replaceAll("\\[", "").replaceAll("\\]","");	
						//System.out.println(s1a);
					String[] array1 = s1a.split(",");
						
					array100[0] = array1[0];
					array100[1] = array1[1];
					array100[2] = array1[2];
					array100[3] = array1[3];
					array100[4] = array1[4];
					array100[5] = array1[5];
					array100[6] = array1[6];
					array100[7] = array1[7];
					array100[8] = array1[8];
					array100[9] = array1[9];
					array100[10] = array1[10];
					array100[11] = array1[11];
					array100[12] = array1[12];
					array100[13] = array1[13];
					array100[14] = array1[14];
					array100[15] = array1[15];
					array100[16] = array1[16];
					array100[17] = array1[17];
					array100[18] = array1[18];
					array100[19] = array1[19];
					
					
					
					
					}
					
					else if((section_id).equals("S2")){
						String s1b = rs1.getString("responce");
						s1b = s1b.replaceAll("\\[", "").replaceAll("\\]","");	
						//System.out.println(s1a);
						String[] array2 = s1b.split(",");
						
						
						array100[20] = array2[0];
						array100[21] = array2[1];
						array100[22] = array2[2];
						array100[23] = array2[3];
						array100[24] = array2[4];
						array100[25] = array2[5];
						array100[26] = array2[6];
						array100[27] = array2[7];
						array100[28] = array2[8];
						array100[29] = array2[9];
						array100[30] = array2[10];
						array100[31] = array2[11];
						array100[32] = array2[12];
						array100[33] = array2[13];
						array100[34] = array2[14];
						array100[35] = array2[15];
						array100[36] = array2[16];
						array100[37] = array2[17];
						array100[38] = array2[18];
						array100[39] = array2[19];
						array100[40] = array2[20];
						array100[41] = array2[21];
						array100[42] = array2[22];
						array100[43] = array2[23];
						array100[44] = array2[24];
						array100[45] = array2[25];
					}
					
					else if((section_id).equals("S3")){
						String s1c = rs1.getString("responce");
						s1c = s1c.replaceAll("\\[", "").replaceAll("\\]","");
						String[] array3 = s1c.split(",");
						//array100[10] = s1c;
						
						array100[46] = array3[0];
						array100[47] = array3[1];
						array100[48] = array3[2];
						array100[49] = array3[3];
						array100[50] = array3[4];
						array100[51] = array3[5];
						array100[52] = array3[6];
						array100[53] = array3[7];
						array100[54] = array3[8];
						
						
						
					}
					

					else if((section_id).equals("S4")){
						String s1d = rs1.getString("responce");
						s1d = s1d.replaceAll("\\[", "").replaceAll("\\]","");
						String[] array4 = s1d.split(",");
						//array100[11] = s1d;
						
						array100[55] = array4[0];
						array100[56] = array4[1];
						array100[57] = array4[2];
						array100[58] = array4[3];
						array100[59] = array4[4];
						array100[60] = array4[5];
						array100[61] = array4[6];
						array100[62] = array4[7];
						array100[63] = array4[8];
						array100[64] = array4[9];
						
						
					}
					else {
						
						String s1e = rs1.getString("responce");
						s1e = s1e.replaceAll("\\[", "").replaceAll("\\]","");
						String[] array5 = s1e.split(",");
						//System.out.println(array5[0]);
						array100[65] = array5[0];
						array100[66] = array5[1];
						array100[67] = array5[2];
						array100[68] = array5[3];
						array100[69] = array5[4];
						array100[70] = array5[5];
						array100[71] = array5[6];
						array100[72] = array5[7];
						array100[73] = array5[8];
						array100[74] = array5[9];
						array100[75] = array5[10];
						array100[76] = array5[11];
						array100[77] = array5[12];
						array100[78] = array5[13];
						array100[79] = array5[14];
						array100[80] = array5[15];
						array100[81] = array5[16];
						array100[82] = array5[17];
						array100[83] = array5[18];
						array100[84] = array5[19];
						
						
					}
					
					
					
				}
				
				}catch (Exception e) {
					//System.out.println("came to here");
					e.printStackTrace();
				}
				
				
//query3
				String query2 = "SELECT registration_info.name from registration_info WHERE registration_info.user_id = "+rs.getInt("user_id");
				Statement stmt2;
				
				 
				try {
				stmt2 = conn.createStatement();
				ResultSet rs2 = stmt2.executeQuery(query2);
				
				
				while (rs2.next()) {
					 name=rs2.getString("registration_info.name");
					//System.out.println(name);
				}
				}
				catch (Exception e) {
					//System.out.println("came to here");
					e.printStackTrace();
				}
				
				//System.out.println(array100[84]);
				
				userresponse = Arrays.toString(array100);
				//total_score = total_score.replaceAll("\\]\\[", " , ");
				//System.out.println(userresponse);
				//System.out.println(rs.getString("timestamp"));
				Section userrsponse = new Section(rs.getInt("user_id"),name,sectionid,rs.getString("timestamp"),userresponse,rs.getInt("section_count"));
				
				//System.out.println(userscore);
				userres.add(userrsponse);				
				dd = mapper.writeValueAsString(userres);
				
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return dd;
	}
	public String userscore() {

		List<Section> usersco = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		String dd = null;

		//String query = "select  registration_info.user_id, registration_info.name, responses.sections_id,responses.section_count,responses.total_score_sum from responses INNER JOIN registration_info ON responses.user_id = registration_info.user_id";
		String query = "select  timestamp,responses.user_id, responses.section_count FROM responses WHERE responses.user_id IN(SELECT responses.user_id FROM responses GROUP BY responses.user_id HAVING COUNT(distinct responses.section_count) >0) GROUP BY responses.user_id,responses.section_count ";
		Statement stmt;

		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			String total_score = " ";
			String sectionid = " ";
			String name = " ";
			//System.out.println("hellow");
			
			//String total_score = array100;
			
			
			while (rs.next()) {
				
				String query1 = "SELECT sections_id,total_score_sum FROM responses WHERE user_id = "+rs.getInt("user_id") + " AND  section_count = "+ rs.getInt("section_count");
				Statement stmt1;
				String[] array100 = null;			
				 array100 = new String[14];
				 
				try {
				stmt1 = conn.createStatement();
				ResultSet rs1 = stmt1.executeQuery(query1);
				
				
				while (rs1.next()) {
					
					
					//System.out.println(rs.getInt("user_id") +"________"+rs.getInt("section_count")+ " ___   "+ rs1.getString("total_score_sum") + rs1.getString("total_score_sum"));
					//total_score ="[4, 36, 20, 5, 65,4, 36, 5, 20, 1, 65,4, 36, 20]";
					
					String s1 = rs1.getString("total_score_sum");	
					String section_id = rs1.getString("sections_id");
					sectionid=section_id;
					//System.out.println(sectionid);
					if((section_id).equals("S1")){
						String s1a = rs1.getString("total_score_sum");
						s1a = s1a.replaceAll("\\[", "").replaceAll("\\]","");	
						//System.out.println(s1a);
					String[] array1 = s1a.split(",");
						
					array100[0] = array1[0];
					array100[1] = array1[1];
					array100[2] = array1[2];
					array100[3] = array1[3];
					array100[4] = array1[4];
					}
					
					else if((section_id).equals("S2")){
						String s1b = rs1.getString("total_score_sum");
						s1b = s1b.replaceAll("\\[", "").replaceAll("\\]","");	
						//System.out.println(s1a);
						String[] array2 = s1b.split(",");
						
						
						array100[5] = array2[0];
						array100[6] = array2[1];
						array100[7] = array2[2];
						array100[8] = array2[3];
						array100[9] = array2[4];
					}
					
					else if((section_id).equals("S3")){
						String s1c = rs1.getString("total_score_sum");
						s1c = s1c.replaceAll("\\[", "").replaceAll("\\]","");
						array100[10] = s1c;
						
						
					}
					

					else if((section_id).equals("S4")){
						String s1d = rs1.getString("total_score_sum");
						s1d = s1d.replaceAll("\\[", "").replaceAll("\\]","");
						array100[11] = s1d;
								
						
					}
					else {
						
						String s1e = rs1.getString("total_score_sum");
						s1e = s1e.replaceAll("\\[", "").replaceAll("\\]","");
						String[] array5 = s1e.split(",");
						//System.out.println(array5[0]);
						array100[12] = array5[0];
						array100[13] = array5[1];
						
					}
					
					
					
				}
				
				}catch (Exception e) {
					//System.out.println("came to here");
					e.printStackTrace();
				}
				
				String query2 = "SELECT registration_info.name from registration_info WHERE registration_info.user_id = "+rs.getInt("user_id");
				Statement stmt2;
				
				 
				try {
				stmt2 = conn.createStatement();
				ResultSet rs2 = stmt2.executeQuery(query2);
				
				
				while (rs2.next()) {
					 name=rs2.getString("registration_info.name");
					//System.out.println(name);
				}
				}
				catch (Exception e) {
					//System.out.println("came to here");
					e.printStackTrace();
				}
				//System.out.println(array100[13]);
				total_score = Arrays.toString(array100);
				//total_score = total_score.replaceAll("\\]\\[", " , ");
				//System.out.println(total_score);
				Section userscore = new Section(rs.getInt("user_id"),name,rs.getString("timestamp"),total_score,rs.getInt("section_count"));
				
				//System.out.println(userscore);
				usersco.add(userscore);				
				dd = mapper.writeValueAsString(usersco);
				
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return dd;
	}
	
	

}
