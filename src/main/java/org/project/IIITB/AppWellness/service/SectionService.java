package org.project.IIITB.AppWellness.service;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.project.IIITB.AppWellness.DataBase.SectionDAO;
import org.project.IIITB.AppWellness.Globals.AppGlobals;
import org.project.IIITB.AppWellness.Globals.Database;
import org.project.IIITB.AppWellness.model.Section;
import org.project.IIITB.AppWellness.model.User;
import com.mysql.jdbc.PreparedStatement;
import com.sun.research.ws.wadl.Response;

public class SectionService extends Database {

	SectionDAO sectiondao = new SectionDAO();

	public JSONObject sectionQ(int sid) {
		JSONParser parser = new JSONParser();
		Object obj = null;
		FileReader File = null;
		try {
			File = new FileReader(AppGlobals.FilePath + sid + ".json");
			obj = parser.parse(File);
			JSONObject jsonObject = (JSONObject) obj;
			return jsonObject;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}finally {
			try {
				if (File != null)
					File.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return null;
	}

	@SuppressWarnings("null")
	public int addSectionResponse(int internalID, String sectionID, String ans) throws ParseException {

		ArrayList<Long> score = new ArrayList<Long>();
		String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

		JSONObject answers = (JSONObject) new JSONParser().parse(ans);
		JSONArray answer = (JSONArray) answers.get("ans");
		ArrayList<Long> NgarList = new ArrayList<Long>();
		ArrayList<Long> PosarList = new ArrayList<Long>();
		ArrayList<String> feedback = new ArrayList<String>();
		ArrayList<String> percentile = new ArrayList<String>();
		ArrayList<String> percentilevalue = new ArrayList<>();
		long total_ng = 0;
		long total_ps = 0;
		int ratio = 0;

		// getting age for feedback calculation
		String sql1 = "SELECT `age` FROM `registration_info` WHERE `user_id`= " + internalID + ";";
		Statement stmt2;
		int Age = 0;
		try {

			stmt2 = conn.createStatement();
			ResultSet rs = stmt2.executeQuery(sql1);
			if (rs.next()) {

				Age = rs.getInt("age");

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("age " + Age);

		// socre alogrithm
		if (sectionID.equals("S1")) {
			long[] myRev={7,6,5,4,3,2,1};
			Long j = (Long) myRev[(int) (long)answer.get(0)];
			Long k = (Long) myRev[(int) (long)answer.get(3)];
			Long l = (Long) myRev[(int) (long)answer.get(9)];
			Long m = (Long) myRev[(int) (long)answer.get(7)];
			Long n = (Long) myRev[(int) (long)answer.get(10)];
			Long o = (Long) myRev[(int) (long)answer.get(11)];
			Long p = (Long) myRev[(int) (long)answer.get(13)];
			Long q = (Long) myRev[(int) (long)answer.get(18)];
			Long r = (Long) myRev[(int) (long)answer.get(19)];
			Long pr = (long) 0;
			Long mc = (long) 0;
			Long sa = (Long) answer.get(1) + (Long) answer.get(2) + (Long) answer.get(16) + (Long) answer.get(17);
			mc = m + n + o + p + q + r;
			pr = j + k + (Long) answer.get(6) + l + (Long) answer.get(14);
		     
			Long eg = (Long) answer.get(4) + (Long) answer.get(5) + (Long) answer.get(8) + (Long) answer.get(12)
			+ (Long) answer.get(15);
	       Long total = sa + mc + pr + eg;
	       score.add(sa);
	       score.add(mc);
	       score.add(pr);
	       score.add(eg);
	       score.add(total);
			

			// self Acceptance
			if ((sa >= 4 && sa <= 15)) {
				feedback.add("Low");
			} else if (sa >= 16 && sa <= 22) {
				feedback.add("Average");
			} else if (sa >= 23 && sa <= 24) {
				feedback.add("High");
			}

			// mastery and Competence
			if ((mc >= 6 && mc <= 19)) {
				feedback.add("Low");
			} else if (mc >= 20 && mc <= 30) {
				feedback.add("Average");
			} else if (mc >= 31 && mc <= 36) {
				feedback.add("High");
			}

			// positive relation
			if ((pr >= 5 && pr <= 16)) {
				feedback.add("Low");
			} else if (pr >= 17 && pr <= 25) {
				feedback.add("Average");
			} else if (pr >= 26 && pr <= 30) {
				feedback.add("High");
			}

			// Engagement & growth

			if ((eg >= 5 && eg <= 20)) {
				feedback.add("Low");
			} else if (eg >= 21 && eg <= 28) {
				feedback.add("Average");
			} else if (eg >= 29 && eg <= 30) {
				feedback.add("High");
			}

			// psychological well being
			if ((total >= 20 && total <= 74)) {
				feedback.add("Low");
			} else if (total >= 75 && total <= 101) {
				feedback.add("Average");
			} else if (total >= 102 && total <= 120) {
				feedback.add("High");
			}

			// percentile for sa
			if ((sa < 16)) {
				percentile.add("Below 25");
				percentilevalue.add("20");
			} else if ((sa == 16)) {
				percentile.add("25th");
				percentilevalue.add("25");
			} else if ((sa == 17)) {
				percentile.add("30th");
				percentilevalue.add("30");
			} else if ((sa == 18)) {
				percentile.add("40th");
				percentilevalue.add("40");
			} else if ((sa == 19)) {
				percentile.add("50th");
				percentilevalue.add("50");
			} else if ((sa == 20)) {
				percentile.add("60th");
				percentilevalue.add("60");
			} else if ((sa == 21)) {
				percentile.add("60-70th");
				percentilevalue.add("65");
			} else if ((sa == 22)) {
				percentile.add("70-75th");
				percentilevalue.add("73");
			} else if ((sa > 22)) {
				percentile.add("Above 75");
				percentilevalue.add("90");
			}
			// percentile for mc
			if ((mc < 20)) {
				percentile.add("Below 25");
				percentilevalue.add("20");
			} else if ((mc == 20)) {
				percentile.add("25th");
				percentilevalue.add("25");
			} else if ((mc == 21)) {
				percentile.add("30th");
				percentilevalue.add("30");
			} else if ((mc == 22)) {
				percentile.add("30-40th");
				percentilevalue.add("35");
			} else if ((mc == 23)) {
				percentile.add("40th");
				percentilevalue.add("40");
			} else if ((mc == 24)) {
				percentile.add("50th");
				percentilevalue.add("50");
			} else if ((mc == 25)) {
				percentile.add("50-60th");
				percentilevalue.add("55");
			} else if ((mc == 26)) {
				percentile.add("60th");
				percentilevalue.add("60");
			} else if ((mc == 27)) {
				percentile.add("60-70th");
				percentilevalue.add("65");
			} else if ((mc == 28)) {
				percentile.add("70th");
				percentilevalue.add("70");
			} else if ((mc == 29)) {
				percentile.add("70-75th");
				percentilevalue.add("72");
			} else if ((mc == 30)) {
				percentile.add("75th");
				percentilevalue.add("75");
			}else if ((mc > 30)) {
				percentile.add("Above 75");
				percentilevalue.add("90");
			}
			// percentile for pr
			if ((pr < 17)) {
				percentile.add("Below 25");
				percentilevalue.add("20");
			} else if ((pr == 17)) {
				percentile.add("25th");
				percentilevalue.add("25");
			} else if ((pr == 18)) {
				percentile.add("30th");
				percentilevalue.add("30");
			} else if ((pr == 19)) {
				percentile.add("30-40th");
				percentilevalue.add("35");
			} else if ((pr == 20)) {
				percentile.add("40th");
				percentilevalue.add("40");
			} else if ((pr == 21)) {
				percentile.add("50th");
				percentilevalue.add("50");
			} else if ((pr == 22)) {
				percentile.add("50-60th");
				percentilevalue.add("55");
			} else if ((pr == 23)) {
				percentile.add("60th");
				percentilevalue.add("60");
			} else if ((pr == 24)) {
				percentile.add("60-70th");
				percentilevalue.add("65");
			} else if ((pr == 25)) {
				percentile.add("70-75th");
				percentilevalue.add("73");
			} else if ((pr > 25)) {
				percentile.add("Above 75");
				percentilevalue.add("90");
			}

			// percentile for eg
			if ((eg < 21)) {
				percentile.add("Below 25");
				percentilevalue.add("20");
			} else if ((eg == 21)) {
				percentile.add("25th");
				percentilevalue.add("25");
			} else if ((eg == 22)) {
				percentile.add("30th");
				percentilevalue.add("30");
			} else if ((eg == 23)) {
				percentile.add("30-40th");
				percentilevalue.add("35");
			} else if ((eg == 24)) {
				percentile.add("40th");
				percentilevalue.add("40");
			} else if ((eg == 25)) {
				percentile.add("50th");
				percentilevalue.add("50");
			} else if ((eg == 26)) {
				percentile.add("50-60th");
				percentilevalue.add("55");
			} else if ((eg == 27)) {
				percentile.add("60th");
				percentilevalue.add("60");
			} else if ((eg == 28)) {
				percentile.add("70-75th");
				percentilevalue.add("72");
			} else if ((eg > 28)) {
				percentile.add("Above 75");
				percentilevalue.add("90");
			}

			// percentile code for overall psycho
			if ((total < 75)) {
				percentile.add("Below 25");
				percentilevalue.add("20");
			} else if ((total == 75)) {
				percentile.add("25th");
				percentilevalue.add("25");
			} else if ((total >= 76) && (total <= 77)) {
				percentile.add("25-30th");
				percentilevalue.add("27");
			} else if (total == 78) {
				percentile.add("30th");
				percentilevalue.add("30");
			} else if ((total >= 79) && (total <= 84)) {
				percentile.add("30-40th");
				percentilevalue.add("35");
			} else if (total == 85) {
				percentile.add("40th");
				percentilevalue.add("40");
			} else if ((total >= 86) && (total <= 87)) {
				percentile.add("40-50th");
				percentilevalue.add("45");
			} else if (total == 88) {
				percentile.add("50th");
				percentilevalue.add("50");
			} else if ((total >= 89) && (total <= 91)) {
				percentile.add("50-60th");
				percentilevalue.add("55");
			} else if (total == 92) {
				percentile.add("60th");
				percentilevalue.add("60");
			} else if ((total >= 93) && (total <= 97)) {
				percentile.add("60-70th");
				percentilevalue.add("65");
			} else if (total == 98) {
				percentile.add("70th");
				percentilevalue.add("70");
			} else if ((total >= 99) && (total <= 100)) {
				percentile.add("70-75th");
				percentilevalue.add("73");
			} else if (total >= 101) {
				percentile.add("Above 75");
				percentilevalue.add("95");
			}

			System.out.println("here percentile is there for S1" + percentile);

		} else if (sectionID.equals("S2")) {
			
			String sql2 = "SELECT `total_score_sum` FROM `responses` WHERE `user_id`="+ internalID +" and `sections_id`='S2' order by `timestamp` desc limit 0,1";
			int oldPosVal=0;
			int oldNgVal=0; 
			int subStr1  = 0;
			int array12=0;
			
			try{
			Statement stmt3;
			stmt3 = conn.createStatement();
			ResultSet rs = stmt3.executeQuery(sql2);
			
			
			String Preres=null;
			
             while(rs.next()){
            	 Preres=rs.getString("total_score_sum");
			
               }
             System.out.println("here is the required string   ---  "+Preres);
            // String value = null;
             
            String  array1[]= Preres.split(",");
             
              
              String array2[]= array1[3].split("]");
               
            
           //  subStr1  = Integer.parseInt(array2[0].substring(0, array2[0].length() - 1));
              subStr1  = Integer.parseInt(array2[0].trim());   
         	 array12= Integer.parseInt(array1[2].trim());
            
			System.out.println("------------3rdvalue   "+array12);
			System.out.println("----------4th value   "+subStr1);
             
             			
			} catch (Exception e) {
				e.printStackTrace();
			}
			

			Long nagative = (Long) answer.get(0) + (Long) answer.get(1) + (Long) answer.get(3) + (Long) answer.get(4)
					+ (Long) answer.get(7) + (Long) answer.get(9) + (Long) answer.get(13) + (Long) answer.get(14)
					+ (Long) answer.get(15) + (Long) answer.get(17) + (Long) answer.get(18) + (Long) answer.get(20)
					+ (Long) answer.get(21);
			Long positive = (Long) answer.get(2) + (Long) answer.get(5) + (Long) answer.get(6) + (Long) answer.get(8)
					+ (Long) answer.get(10) + (Long) answer.get(11) + (Long) answer.get(12) + (Long) answer.get(16)
					+ (Long) answer.get(19) + (Long) answer.get(22) + (Long) answer.get(23) + (Long) answer.get(24)
					+ (Long) answer.get(25);

			// avg calculation positive 3,4,5 nagetive 2,3,4,5 question nums -1
			// 2458 10 14 15 16 18 19 21 22 + 3679 11 12 13 17 20 23 24 25 26
			String sql = "SELECT count(`sections_id`) FROM `responses` WHERE `sections_id`='S2' and `user_id`= "
					+ internalID + ";";
			Statement stmt1;
			int cunt = 0;
			try {

				stmt1 = conn.createStatement();
				ResultSet rs = stmt1.executeQuery(sql);
				if (rs.next()) {

					cunt = rs.getInt("count(`sections_id`)");

				}

			} catch (Exception e) {
				e.printStackTrace();
			}
			System.out.println(cunt + "th time user submitted 2nd section");

			
				NgarList.addAll(Arrays.asList((Long) answer.get(0), (Long) answer.get(1), (Long) answer.get(3),
						(Long) answer.get(4), (Long) answer.get(7), (Long) answer.get(9), (Long) answer.get(13),
						(Long) answer.get(14), (Long) answer.get(15), (Long) answer.get(17), (Long) answer.get(18),
						(Long) answer.get(20), (Long) answer.get(21)));
				PosarList.addAll(Arrays.asList((Long) answer.get(2), (Long) answer.get(5), (Long) answer.get(6),
						(Long) answer.get(8), (Long) answer.get(10), (Long) answer.get(11), (Long) answer.get(12),
						(Long) answer.get(16), (Long) answer.get(19), (Long) answer.get(22), (Long) answer.get(23),
						(Long) answer.get(24), (Long) answer.get(25)));
				System.out.println("here stuck");
				
				for (int i = 0; i < NgarList.size(); i++) {

					if (NgarList.get(i) == 2 || NgarList.get(i) == 3 || NgarList.get(i) == 4 || NgarList.get(i) == 5) {
						total_ng++;
						

					}
					
				}
				

				for (int i = 0; i < PosarList.size(); i++) {

					if (PosarList.get(i) == 3 || PosarList.get(i) == 4 || PosarList.get(i) == 5) {
						total_ps++;

					}
				}

				int newPosVal=(int) total_ps;
				int newNgVal=(int) total_ng;
				oldPosVal=array12;
				oldNgVal=subStr1;
				//ratio values
				double total_ratio_ps=((double)newPosVal+(double)oldPosVal)/2;
				double total_ratio_ng=((double)newNgVal+(double)oldNgVal)/2;
				
				//0/0 conditio 
				double total_ratio=0;
				if((total_ratio_ps==0) || (total_ratio_ng==0)){
					 total_ratio=0.00;
					
					
				}
				
				else {
				 total_ratio=total_ratio_ps/total_ratio_ng;
				}
				
				
				
						
				ArrayList total_ratioList = new ArrayList();
				total_ratioList.add(String.format("%.2f", total_ratio));
				
				score.add(nagative);
				score.add(positive);
				score.add(total_ps);
				score.add(total_ng);
				if (cunt > 0) {
					
				score.addAll(total_ratioList);
			} else {
				
				score.add(null);
			}

			// getting feedback code
			if (Age >= 18 && Age <= 35) {

				if ((nagative >= 13 && nagative <= 22)) {
					feedback.add("Low");
				} else if (nagative >= 23 && nagative <= 37) {
					feedback.add("Average");
				} else if (nagative >= 38 && nagative <= 65) {
					feedback.add("High");
				}

				if ((positive >= 13 && positive <= 32)) {
					feedback.add("Low");
				} else if (positive >= 33 && positive <= 47) {
					feedback.add("Average");
				} else if (positive >= 48 && positive <= 65) {
					feedback.add("High");
				}
				// Percentile for negative

				if ((nagative < 23)) {
					percentile.add("Below 25");
					percentilevalue.add("20");
				} else if ((nagative == 23)) {
					percentile.add("25th");
					percentilevalue.add("25");
				}else if ((nagative == 24)) {
					percentile.add("30th");
					percentilevalue.add("30");
				} else if ((nagative == 25)) {
					percentile.add("30-40th");
					percentilevalue.add("35");
				} else if ((nagative == 26)) {
					percentile.add("40th");
					percentilevalue.add("40");
				} else if ((nagative == 27)) {
					percentile.add("40-50th");
					percentilevalue.add("45");
				} else if ((nagative == 28)) {
					percentile.add("50th");
					percentilevalue.add("50");
				} else if ((nagative == 29)) {
					percentile.add("50-60th");
					percentilevalue.add("55");
				} else if ((nagative == 30)) {
					percentile.add("60th");
					percentilevalue.add("60");
				} else if ((nagative >= 31) && (nagative <= 33)) {
					percentile.add("60-70th");
					percentilevalue.add("65");
				} else if (nagative == 34) {
					percentile.add("70th");
					percentilevalue.add("70");
				} else if ((nagative >= 35) && (nagative <= 36)) {
					percentile.add("70-75th");
					percentilevalue.add("73");
				} else if (nagative == 37) {
					percentile.add("75th");
					percentilevalue.add("75");
				} else if (nagative > 37) {
					percentile.add("Above 75");
					percentilevalue.add("90");
				}

				// Percentile for positive
				if (positive < 33) {
					percentile.add("Below 25");
					percentilevalue.add("20");
				} else if (positive == 33) {
					percentile.add("25th");
					percentilevalue.add("25");
				} else if (positive == 34) {
					percentile.add("25-30th");
					percentilevalue.add("27");
				} else if (positive == 35) {
					percentile.add("30th");
					percentilevalue.add("30");
				} else if (positive == 36) {
					percentile.add("30-40th");
					percentilevalue.add("35");
				} else if (positive == 37) {
					percentile.add("40th");
					percentilevalue.add("40");
				} else if (positive == 38) {
					percentile.add("40-50th");
					percentilevalue.add("45");
				} else if (positive == 39) {
					percentile.add("50th");
					percentilevalue.add("50");
				} else if ((positive >= 40) && (positive <= 43)) {
					percentile.add("50-60th");
					percentilevalue.add("55");
				} else if (positive == 44) {
					percentile.add("60th");
					percentilevalue.add("60");
				} else if (positive == 45) {
					percentile.add("60-70th");
					percentilevalue.add("65");
				} else if (positive == 46) {
					percentile.add("70th");
					percentilevalue.add("70");
				}  else if (positive == 47) {
					percentile.add("75th");
					percentilevalue.add("75");
				} else if (positive > 47) {
					percentile.add("Above 75");
					percentilevalue.add("90");
				}

			} else if (Age > 35) {

				if ((nagative >= 13 && nagative <= 20)) {
					feedback.add("Low");
				} else if (nagative >= 21 && nagative <= 31) {
					feedback.add("Average");
				} else if (nagative >= 32 && nagative <= 65) {
					feedback.add("High");
				}

				if ((positive >= 13 && positive <= 35)) {
					feedback.add("Low");
				} else if (positive >= 36 && positive <= 50) {
					feedback.add("Average");
				} else if (positive >= 51 && positive <= 65) {
					feedback.add("High");
				}

				// Percentile for negative more then 35
				if (nagative <= 21) {
					percentile.add("Below 25");
					percentilevalue.add("25");
				} else if (nagative == 21) {
					percentile.add("25th");
					percentilevalue.add("25");
				} else if (nagative == 22) {
					percentile.add("30th");
					percentilevalue.add("30");
				} else if (nagative == 23) {
					percentile.add("30-40th");
					percentilevalue.add("35");
				} else if (nagative == 24) {
					percentile.add("40th");
					percentilevalue.add("40");
				} else if (nagative == 25) {
					percentile.add("40-50th");
					percentilevalue.add("45");
				} else if (nagative == 25.5) {
					percentile.add("50th");
					percentilevalue.add("50");
				} else if ((nagative >= 25.6) && (nagative <= 26)) {
					percentile.add("50-60th");
					percentilevalue.add("55");
				} else if (nagative == 27) {
					percentile.add("60th");
					percentilevalue.add("60");
				} else if ((nagative == 28) || (nagative == 29)) {
					percentile.add("60-70th");
					percentilevalue.add("65");
				} else if (nagative == 30) {
					percentile.add("70th");
					percentilevalue.add("70");
				} else if (nagative == 31) {
					percentile.add("75th");
					percentilevalue.add("75");
				} else if (nagative > 31) {
					percentile.add("Above 75");
					percentilevalue.add("90");
				}

				// Percentile for positive more then 35
				if (positive < 36) {
					percentile.add("Below 25");
					percentilevalue.add("20");
				} else if (positive == 36) {
					percentile.add("25th");
					percentilevalue.add("25");
				} else if (positive == 37) {
					percentile.add("25-30th");
					percentilevalue.add("27");
				} else if (positive == 38) {
					percentile.add("30th");
					percentilevalue.add("30");
				} else if ((positive == 39) || (positive == 40)) {
					percentile.add("30-40th");
					percentilevalue.add("35");
				} else if (positive == 41) {
					percentile.add("40th");
					percentilevalue.add("40");
				} else if (positive == 42) {
					percentile.add("40-50th");
					percentilevalue.add("55");
				} else if (positive == 43) {
					percentile.add("50th");
					percentilevalue.add("50");
				} else if (positive == 44) {
					percentile.add("50-60th");
					percentilevalue.add("55");
				} else if (positive == 45) {
					percentile.add("60th");
					percentilevalue.add("60");
				} else if ((positive == 46) || (positive == 47)) {
					percentile.add("60-70th");
					percentilevalue.add("65");
				} else if (positive == 48) {
					percentile.add("70th");
					percentilevalue.add("70");
				} else if (positive == 49) {
					percentile.add("70-75");
					percentilevalue.add("72");
				} else if (positive == 50) {
					percentile.add("75th");
					percentilevalue.add("75");
				} else if (positive > 50) {
					percentile.add("Above 75");
					percentilevalue.add("90");
				}

			}

		}

		else if (sectionID.equals("S3")) {
			
			System.out.println("answer answer answer" +answer);
			long[] myRev={7,6,5,4,3,2,1};
			Long j = (Long) myRev[(int) (long)answer.get(0)];
			Long k = (Long) myRev[(int) (long)answer.get(1)];
			Long l = (Long) myRev[(int) (long)answer.get(3)];
			
			Long m = (Long) myRev[(int) (long)answer.get(4)];
			Long n = (Long) myRev[(int) (long)answer.get(5)];
			Long o = (Long) myRev[(int) (long)answer.get(6)];
			
			Long p = (Long) myRev[(int) (long)answer.get(7)];
			Long q = (Long) myRev[(int) (long)answer.get(8)];
			Long social = (long) 0;
			social = j + k + (Long) answer.get(2) + l + m + n + o + p + q;
			score.add(social);

			if (Age >= 18 && Age <= 35) {

				if ((social >= 9 && social <= 33)) {
					feedback.add("Low");
				} else if (social >= 34 && social <= 43) {
					feedback.add("Average");
				} else if (social >= 44 && social <= 54) {
					feedback.add("High");
				}
				// percentile for social
				if (social < 34) {
					percentile.add("Below 25");
					percentilevalue.add("20");
				} else if (social == 34) {
					percentile.add("25th");
					percentilevalue.add("25");
				} else if (social == 35) {
					percentile.add("25-30th");
					percentilevalue.add("27");
				} else if (social == 36) {
					percentile.add("30th");
					percentilevalue.add("30");
				} else if (social == 37) {
					percentile.add("30-40th");
					percentilevalue.add("35");
				} else if (social == 38) {
					percentile.add("40th");
					percentilevalue.add("40");
				} else if (social == 39) {
					percentile.add("50th");
					percentilevalue.add("50");
				} else if (social == 40) {
					percentile.add("50-60th");
					percentilevalue.add("55");
				} else if (social == 41) {
					percentile.add("60th");
					percentilevalue.add("60");
				} else if (social == 42) {
					percentile.add("60-70th");
					percentilevalue.add("65");
				} else if (social == 43) {
					percentile.add("70th");
					percentilevalue.add("70");
				} else if (social > 43) {
					percentile.add("Above 75");
					percentilevalue.add("90");
				}

			} else if (Age > 35) {

				if ((social >= 9 && social <= 36)) {
					feedback.add("Low");
				} else if (social >= 37 && social <= 46) {
					feedback.add("Average");
				} else if (social >= 47 && social <= 50) {
					feedback.add("High");
				}

				// percentile for social
				if (social < 37) {
					percentile.add("Below 25");
					percentilevalue.add("20");
				} else if (social == 37) {
					percentile.add("25th");
					percentilevalue.add("25");
				} else if (social == 38) {
					percentile.add("30th");
					percentilevalue.add("30");
				} else if (social == 39) {
					percentile.add("30-40th");
					percentilevalue.add("35");
				} else if (social == 40) {
					percentile.add("40th");
					percentilevalue.add("40");
				} else if (social == 41) {
					percentile.add("50th");
					percentilevalue.add("50");
				} else if (social == 42) {
					percentile.add("50-60th");
					percentilevalue.add("55");
				} else if (social == 43) {
					percentile.add("60th");
					percentilevalue.add("60");
				} else if (social == 44) {
					percentile.add("60-70th");
					percentilevalue.add("65");
				} else if (social == 45) {
					percentile.add("70th");
					percentilevalue.add("70");
				} else if (social == 46) {
					percentile.add("75th");
					percentilevalue.add("75");
				} else if (social > 46) {
					percentile.add("Above 75");
					percentilevalue.add("90");
				}

			}

		}

		else if (sectionID.equals("S4")) {

			Long distress = (Long) answer.get(0) + (Long) answer.get(1) + (Long) answer.get(2) + (Long) answer.get(3)
					+ (Long) answer.get(4) + (Long) answer.get(5) + (Long) answer.get(6) + (Long) answer.get(7)
					+ (Long) answer.get(8) + (Long) answer.get(9);

			score.add(distress);

			if (Age >= 18 && Age <= 35) {

				if ((distress >= 10 && distress <= 19)) {
					feedback.add("Low");
				} else if (distress >= 20 && distress <= 24) {
					feedback.add("Average");
				} else if (distress >= 25 && distress <= 50) {
					feedback.add("High");
				}
				// percentile for distress
				if (distress < 16) {
					percentile.add("Below 25");
					percentilevalue.add("20");
				} else if (distress == 16) {
					percentile.add("25th");
					percentilevalue.add("25");
				} else if (distress == 17) {
					percentile.add("30th");
					percentilevalue.add("30");
				} else if (distress == 18) {
					percentile.add("30-40th");
					percentilevalue.add("35");
				} else if (distress == 19) {
					percentile.add("40th");
					percentilevalue.add("40");
				} else if (distress == 20) {
					percentile.add("50th");
					percentilevalue.add("50");
				} else if (distress == 21) {
					percentile.add("50-60th");
					percentilevalue.add("55");
				} else if (distress == 22) {
					percentile.add("60th");
					percentilevalue.add("60");
				} else if ((distress == 23) || (distress == 24)) {
					percentile.add("60-70th");
					percentilevalue.add("65");
				} else if (distress == 25) {
					percentile.add("70th");
					percentilevalue.add("70");
				} else if (distress == 26) {
					percentile.add("75th");
					percentilevalue.add("75");
				} else if (distress > 26) {
					percentile.add("Above 75");
					percentilevalue.add("90");
				}

			} else if (Age > 35) {

				if ((distress >= 10 && distress <= 19)) {
					feedback.add("Low");
				} else if (distress >= 20 && distress <= 24) {
					feedback.add("Average");
				} else if (distress >= 25 && distress <= 50) {
					feedback.add("High");
				}

			}

			// percentile for distress <35
			if (distress < 14) {
				percentile.add("Below 25");
				percentilevalue.add("20");
			} else if (distress == 14) {
				percentile.add("25th");
				percentilevalue.add("25");
			} else if (distress == 15) {
				percentile.add("30th");
				percentilevalue.add("30");
			} else if (distress == 16) {
				percentile.add("30-40th");
				percentilevalue.add("35");
			} else if (distress == 17) {
				percentile.add("40th");
				percentilevalue.add("40");
			} else if (distress == 18) {
				percentile.add("40-50th");
				percentilevalue.add("45");
			} else if (distress == 19) {
				percentile.add("50th");
				percentilevalue.add("50");
			} else if (distress == 20) {
				percentile.add("50-60th");
				percentilevalue.add("55");
			} else if (distress == 21) {
				percentile.add("60th");
				percentilevalue.add("60");
			} else if (distress == 22) {
				percentile.add("60-70th");
				percentilevalue.add("65");
			} else if (distress == 23) {
				percentile.add("70th");
				percentilevalue.add("70");
			} else if (distress == 24) {
				percentile.add("75th");
				percentilevalue.add("75");
			} else if (distress > 24) {
				percentile.add("Above 75");
				percentilevalue.add("90");
			}

		}

		else if (sectionID.equals("S5")) {

			Long hedonic = (Long) answer.get(0) + (Long) answer.get(3) + (Long) answer.get(5) + (Long) answer.get(6)
					+ (Long) answer.get(8) + (Long) answer.get(9) + (Long) answer.get(11) + (Long) answer.get(14)
					+ (Long) answer.get(16) + (Long) answer.get(19);
			Long eudemonic = (Long) answer.get(1) + (Long) answer.get(2) + (Long) answer.get(4) + (Long) answer.get(7)
					+ (Long) answer.get(10) + (Long) answer.get(12) + (Long) answer.get(13) + (Long) answer.get(15)
					+ (Long) answer.get(17) + (Long) answer.get(18);

			score.add(hedonic);
			score.add(eudemonic);
			System.out.println("hedonic" + hedonic);
			System.out.println("eudemonic" + eudemonic);

			if (Age >= 18 && Age <= 35) {

				if ((hedonic >= 10 && hedonic <= 16)) {
					feedback.add("Low");
				} else if (hedonic >= 17 && hedonic <= 27) {
					feedback.add("Average");
				} else if (hedonic >= 28 && hedonic <= 50) {
					feedback.add("High");
				}

				if (hedonic < 17) {
					percentile.add("Below 25");
					percentilevalue.add("20");
				} else if (hedonic == 17) {
					percentile.add("25th");
					percentilevalue.add("25");
				} else if (hedonic == 18) {
					percentile.add("30th");
					percentilevalue.add("30");
				} else if (hedonic == 19) {
					percentile.add("40th");
					percentilevalue.add("40");
				} else if (hedonic == 20) {
					percentile.add("40-50th");
					percentilevalue.add("45");
				} else if (hedonic == 21) {
					percentile.add("50th");
					percentilevalue.add("50");
				} else if ((hedonic == 22) || (hedonic == 23)) {
					percentile.add("50-60th");
					percentilevalue.add("55");
				} else if (hedonic == 24) {
					percentile.add("60th");
					percentilevalue.add("60");
				} else if (hedonic == 25) {
					percentile.add("60-70th");
					percentilevalue.add("65");
				} else if (hedonic == 26) {
					percentile.add("70th");
					percentilevalue.add("70");
				} else if (hedonic == 27) {
					percentile.add("75th");
					percentilevalue.add("75");
				} else if (hedonic > 27) {
					percentile.add("Above 75");
					percentilevalue.add("90");
				}

			} else if (Age > 35) {

				if ((hedonic >= 10 && hedonic <= 13)) {
					feedback.add("Low");
				} else if (hedonic >= 14 && hedonic <= 22) {
					feedback.add("Average");
				} else if (hedonic >= 23 && hedonic <= 50) {
					feedback.add("High");
				}

				if (hedonic < 14) {
					percentile.add("Below 25");
					percentilevalue.add("20");
				} else if (hedonic == 14) {
					percentile.add("25th");
					percentilevalue.add("25");
				} else if (hedonic == 15) {
					percentile.add("30th");
					percentilevalue.add("30");
				} else if (hedonic == 16) {
					percentile.add("40th");
					percentilevalue.add("40");
				} else if ((hedonic == 17) || (hedonic == 18)) {
					percentile.add("40-50th");
					percentilevalue.add("45");
				} else if (hedonic == 19) {
					percentile.add("50th");
					percentilevalue.add("50");
				} else if (hedonic == 20) {
					percentile.add("60th");
					percentilevalue.add("60");
				}else if (hedonic == 21) {
					percentile.add("70th");
					percentilevalue.add("70");
				} else if (hedonic == 22) {
					percentile.add("75th");
					percentilevalue.add("75");
				} else if (hedonic > 22) {
					percentile.add("Above 75");
					percentilevalue.add("90");
				}

			}

			if ((eudemonic >= 10 && eudemonic <= 22)) {
				feedback.add("Low");
			} else if (eudemonic >= 23 && eudemonic <= 33) {
				feedback.add("Average");
			} else if (eudemonic >= 34 && eudemonic <= 50) {
				feedback.add("High");
			}

			if (eudemonic < 23) {
				percentile.add("Below 25");
				percentilevalue.add("20");
			} else if (eudemonic == 23) {
				percentile.add("25th");
				percentilevalue.add("25");
			} else if (eudemonic == 24) {
				percentile.add("25-30th");
				percentilevalue.add("27");
			} else if (eudemonic == 25) {
				percentile.add("30th");
				percentilevalue.add("30");
			} else if (eudemonic == 26) {
				percentile.add("30-40th");
				percentilevalue.add("35");
			} else if (eudemonic == 27) {
				percentile.add("40th");
				percentilevalue.add("40");
			} else if (eudemonic == 28) {
				percentile.add("40-50th");
				percentilevalue.add("45");
			} else if (eudemonic == 29) {
				percentile.add("50th");
				percentilevalue.add("50");
			} else if (eudemonic == 30) {
				percentile.add("60th");
				percentilevalue.add("60");
			} else if (eudemonic == 31) {
				percentile.add("60-70th");
				percentilevalue.add("65");
			} else if (eudemonic == 32) {
				percentile.add("70th");
				percentilevalue.add("70");
			} else if (eudemonic == 33) {
				percentile.add("75th");
				percentilevalue.add("75");
			} else if (eudemonic > 33) {
				percentile.add("Above 75");
				percentilevalue.add("90");
			}

		}

		//System.out.println("score is here" + score);

		System.out.println("array list" + NgarList);

		return sectiondao.addsectionResponse(internalID, sectionID, answer.toString(), timeStamp, score, feedback,
				percentile, percentilevalue);
	}

	public List getSectionScore(int internalID, String sectionID) {

		return sectiondao.getsectionResponse(internalID, sectionID);
	}
	
	public List getSectionsCount(int internalID) {

		System.out.println("service" + internalID);

		return sectiondao.getsectionCount(internalID);
	}

	public void addFeedback(int userid, String feedback) throws ParseException {

		sectiondao.addFeedback(userid, feedback);
	}
	
	public String sectionRespoce(String sectionID, int internalID){
		
		return sectiondao.sectionResponce(sectionID, internalID);
		
		
	}
	
public String sectionRespoce1(String sectionID, int internalID){
		
		return sectiondao.sectionResponce1(sectionID, internalID);
		
		
	}

public List getSectionScore1(int internalID, String sectionID) {

	return sectiondao.getsectionResponse1(internalID, sectionID);
}


public List<Section> individualResponse(int userid) throws SQLException {
    
    //String query5 = "SELECT max(`responses_id`) as `res_max_id` FROM `responses` WHERE `user_id` =" +userid;
    //System.out.println(userid);
    Section ss= null;
    String section_id1="";
    int user_age=0;
    List<Section> sectiontotal = new ArrayList<Section>();
    try {
        //System.out.println(userid);
        String query4 = "SELECT `age` FROM `registration_info` WHERE `user_id` ="+userid;
        Statement stmt4;    
        stmt4 =conn.createStatement();
        ResultSet rs3 = stmt4.executeQuery(query4);
        while(rs3.next()) {
            user_age=rs3.getInt("age");
            
        }
        System.out.println("age "+user_age);
    
    //String query6 = "SELECT DISTINCT `sections_id` FROM `responses` WHERE `user_id` ="+userid;
    String query6 = "SELECT DISTINCT `sections_id` FROM `responses` WHERE `user_id` ="+userid;
    Statement stmt6;
    stmt6 =conn.createStatement();
    ResultSet rs2 = stmt6.executeQuery(query6);
    rs2.getFetchSize();
    //System.out.println("q6+  "+query6);
    while (rs2.next()) {
         section_id1=rs2.getString("sections_id");
         //System.out.println("this is data"+rs2.getString("sections_id"));
        //String section_id = rs2.getString("sections_id");
        String query5 = "select `user_id`,`total_score_sum`,`sections_id`,`section_count` from `responses` where `sections_id`='"+section_id1+"'"+
                           " and `user_id`="+userid+
                           " ORDER BY `timestamp` DESC LIMIT 0,5";
  //System.out.println(query5);
        Statement stmt5;
        stmt5 =  conn.createStatement();
        //stmt5.setInt(1, userid);
        //stmt5.setString(2, "S1"); 
        ResultSet rs1 = stmt5.executeQuery(query5);
        
        
        
        if (rs1.next()) {
            
             
            ss= new Section(user_age, rs1.getString("total_score_sum"),rs1.getString("sections_id"));
            sectiontotal.add(ss);
            
        }
        
        
        System.out.println("responce"+ss);
        
    }
    
    
    return sectiontotal;
    
    
    } catch (Exception e) {
        e.printStackTrace();
    }
    return sectiontotal;
    
    //System.out.println(ss);
   //return null;
    
    
}

public int getFeedbackcount(int userid) throws SQLException {
    // TODO Auto-generated method stub
    int feedback_count =0;
    try {
    String query6 = "SELECT COUNT(`feed_id`) as `countfeedback` FROM `feedback` WHERE `user_id`="+userid;
    Statement stmt6;
    stmt6 =conn.createStatement();
    ResultSet rs2 = stmt6.executeQuery(query6);
    while (rs2.next()) {
        
     feedback_count = rs2.getInt("countfeedback");    
        
    }
    return feedback_count;
    
    
    } catch (Exception e) {
        e.printStackTrace();
    }
        
    return feedback_count;
}



}
