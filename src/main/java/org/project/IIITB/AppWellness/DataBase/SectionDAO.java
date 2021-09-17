package org.project.IIITB.AppWellness.DataBase;

import java.sql.Array;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.project.IIITB.AppWellness.Globals.Database;
import org.project.IIITB.AppWellness.model.Section;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysql.jdbc.PreparedStatement;

public class SectionDAO extends Database {

	public int addsectionResponse(int userid, String sectionid, String ans, String timestamp, ArrayList<Long> score,
			ArrayList<String> feedback, ArrayList<String> percentile, ArrayList<String> percentilevalue)
			throws ParseException {

		String query = "insert into responses(user_id,sections_id,timestamp,responce,total_score_sum,feedback_arr,percentile,percentilevalue) values (?,?,?,?,?,?,?,?)";
		PreparedStatement stmt;
		try {

			stmt = (PreparedStatement) conn.prepareStatement(query);
			stmt.setInt(1, userid);
			stmt.setString(2, sectionid);
			stmt.setString(3, timestamp);
			stmt.setString(4, ans);
			stmt.setString(5, score.toString());
			stmt.setString(6, feedback.toString());
			stmt.setString(7, percentile.toString());
			stmt.setString(8, percentilevalue.toString());
			stmt.execute();

		} catch (Exception e) {
			e.printStackTrace();
		}

		String query2 = "SELECT  `countOfAttempts` FROM `section_count` WHERE `user_id`=" + userid
				+ " and `sections_id` ='" + sectionid + "'";
		System.out.println(query2);
		Statement stmt1;
		try {

			stmt1 = conn.createStatement();
			ResultSet rs = stmt1.executeQuery(query2);
			if (rs.next()) {
				System.out.println("22");
				String query3 = "update `section_count` set `countOfAttempts`=? where `user_id`=" + userid
						+ " and `sections_id` ='" + sectionid + "'";
				PreparedStatement stmt2;
				try {

					stmt2 = (PreparedStatement) conn.prepareStatement(query3);
					stmt2.setInt(1, rs.getInt("countOfAttempts") + 1);
					stmt2.executeUpdate();

				} catch (Exception e) {
					e.printStackTrace();
				}
				//sectoin count update in responce table
				String query5 = "SELECT max(`responses_id`) as `res_max_id` FROM `responses` WHERE `user_id` =" +userid;
				Statement stmt5;
				stmt5 = conn.createStatement();
				ResultSet rs1 = stmt5.executeQuery(query5);
				
				System.out.println("Query1  "+query5);
				if (rs1.next()) {
				System.out.println("230+" +rs1.getInt("res_max_id"));
				String query4 = "update `responses` set `section_count`=? where `user_id`=" + userid + " and `responses_id`=?" ;
				PreparedStatement stmt3;
				System.out.println("Query  "+query4);
				try {

					stmt3 = (PreparedStatement) conn.prepareStatement(query4);
					stmt3.setInt(1, rs.getInt("countOfAttempts") + 1);
					stmt3.setInt(2, rs1.getInt("res_max_id"));
					stmt3.executeUpdate();

				} catch (Exception e) {
					e.printStackTrace();
				}
				}
				//end sectoin count update in responce table	

			} else {
				System.out.println("2290");
				String query3 = "insert into `section_count` ( `user_id`,`sections_id`,`countOfAttempts`) values (?,?,?)";
				System.out.println(query3);
				PreparedStatement stmt2;
				try {

					stmt2 = (PreparedStatement) conn.prepareStatement(query3);
					stmt2.setInt(1, userid);
					stmt2.setString(2, sectionid);
					stmt2.setInt(3, 1);
					stmt2.execute();

				} catch (Exception e) {
					e.printStackTrace();
				}
				
				//sectoin count update in responce table
				String query5 = "SELECT max(`responses_id`) as `res_max_id` FROM `responses` WHERE `user_id` =" +userid;
				Statement stmt5;
				stmt5 = conn.createStatement();
				ResultSet rs1 = stmt5.executeQuery(query5);
				if (rs1.next()) {
				System.out.println("220+" +rs1.getInt("res_max_id"));
				String query4 = "update `responses` set `section_count`=? where `user_id`=" + userid + " and `responses_id`=?" ;
				PreparedStatement stmt3;
				try {

					stmt3 = (PreparedStatement) conn.prepareStatement(query4);
					stmt3.setInt(1,1);
					stmt3.setInt(2, rs1.getInt("res_max_id"));
					stmt3.executeUpdate();

				} catch (Exception e) {
					e.printStackTrace();
				}

				}
		//end sectoin count update in responce table	
				
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return 1;
	}

	public List getsectionResponse(int userid, String sectionid) {

		List response = new ArrayList<>();
		String total, feedback, percentile, pvalue = null;

		String query = "select total_score_sum,feedback_arr,percentile,percentilevalue from responses where user_id='"
				+ userid + "' and sections_id='" + sectionid + "'ORDER BY `timestamp` DESC LIMIT 0,1;";

		Statement stmt;
		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				total = rs.getString("total_score_sum").replace("[", "");
				String total1 = total.replace("]", "");
				String[] total2 = total1.split(",");

				feedback = rs.getString("feedback_arr").replace("]", "");
				String feedback1 = feedback.replace("[", "");
				String[] feedback2 = feedback1.split(",");

				percentile = rs.getString("percentile").replace("[", "");
				String per1 = percentile.replace("]", "");
				String[] per2 = per1.split(",");

				pvalue = rs.getString("percentilevalue").replace("[", "");
				String pvalue1 = pvalue.replace("]", "");
				String[] pvalue2 = pvalue1.split(",");

				response.add(total2);
				response.add(feedback2);
				response.add(per2);
				response.add(pvalue2);
			}

		} catch (Exception e) {

			e.printStackTrace();
		}

		return response;
	}

	public List getsectionCount(int userid) {

		System.out.println("hello");

		List response = new ArrayList<>();

		String query = "select DISTINCT `sections_id` from section_count where user_id=" + userid + "";

		Statement stmt;
		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				// String result = rs.getString("sections_id");
				int result = 1;

				response.add(result);
				System.out.println(result);
			}

		} catch (Exception e) {

			e.printStackTrace();
		}
		System.out.println(response.size());

		return response;
	}

	public void addFeedback(int userid, String feedback) throws ParseException {
		
		String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

		JSONObject feedbacks = (JSONObject) new JSONParser().parse(feedback);

		String feedback1 = (String) feedbacks.get("feedback1");
		String feedback2 = (String) feedbacks.get("feedback2");
		String feedback3 = (String) feedbacks.get("feedback3");
		String feedback4 = (String) feedbacks.get("feedback4");
		String feedback5 = (String) feedbacks.get("feedback5");

		String query = "insert into feedback (user_id,timestamp,feedback1,feedback2,feedback3,feedback4,feedback5) values (?,?,?,?,?,?,?)";

		PreparedStatement stmt;
		try {

			stmt = (PreparedStatement) conn.prepareStatement(query);
			stmt.setInt(1, userid);
			stmt.setString(2, timeStamp);
			stmt.setString(3, feedback1);
			stmt.setString(4, feedback2);
			stmt.setString(5, feedback3);
			stmt.setString(6, feedback4);
			stmt.setString(7, feedback5);
			stmt.execute();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String sectionResponce(String sectionID, int internalID) {
		
		List<Section> secresponse = new ArrayList();
		ObjectMapper mapper = new ObjectMapper();
		String cc = null;

		String query = "select timestamp,total_score_sum,feedback_arr,percentile,percentilevalue from responses where user_id='"
				+ internalID + "' and sections_id='" + sectionID + "' ORDER BY 	`timestamp` DESC";
		Statement stmt;
		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				Section secr = new Section(rs.getString("timestamp"), rs.getString("total_score_sum"),
						rs.getString("feedback_arr"), rs.getString("percentile"), rs.getString("percentilevalue"));
				secresponse.add(secr);

				cc = mapper.writeValueAsString(secresponse);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return cc;
	}
	
	
public String sectionResponce1(String sectionID, int internalID) {
		
		List<Section> secresponse = new ArrayList();
		ObjectMapper mapper = new ObjectMapper();
		String cc = null;

		String query = "select timestamp,total_score_sum,feedback_arr,percentile,percentilevalue from responses where user_id='"
				+ internalID + "' and sections_id='" + sectionID + "' ORDER BY 	`timestamp` DESC";
		Statement stmt;
		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				Section secr = new Section(rs.getString("timestamp"), rs.getString("total_score_sum"),
						rs.getString("feedback_arr"), rs.getString("percentile"), rs.getString("percentilevalue"));
				secresponse.add(secr);
System.out.println(rs.getString("percentilevalue"));
				cc = mapper.writeValueAsString(secresponse);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return cc;
	}


public List getsectionResponse1(int userid, String sectionid) {

	List response = new ArrayList<>();
	String total, feedback, percentile, pvalue = null;

	String query = "select total_score_sum,feedback_arr,percentile,percentilevalue from responses where user_id='"
			+ userid + "' and sections_id='" + sectionid + "'ORDER BY `timestamp` DESC LIMIT 0,1;";

	Statement stmt;
	try {

		stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery(query);
		while (rs.next()) {

			total = rs.getString("total_score_sum").replace("[", "");
			String total1 = total.replace("]", "");
			String[] total2 = total1.split(",");

			feedback = rs.getString("feedback_arr").replace("]", "");
			String feedback1 = feedback.replace("[", "");
			String[] feedback2 = feedback1.split(",");

			percentile = rs.getString("percentile").replace("[", "");
			String per1 = percentile.replace("]", "");
			String[] per2 = per1.split(",");

			pvalue = rs.getString("percentilevalue").replace("[", "");
			String pvalue1 = pvalue.replace("]", "");
			String[] pvalue2 = pvalue1.split(",");

			response.add(total2);
			response.add(feedback2);
			response.add(per2);
			response.add(pvalue2);
			System.out.println(response);
		}

	} catch (Exception e) {

		e.printStackTrace();
	}

	return response;
}

}
