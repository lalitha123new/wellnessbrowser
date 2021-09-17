package org.project.IIITB.AppWellness.utils;

import java.sql.ResultSet;
import java.sql.Statement;

import org.project.IIITB.AppWellness.Globals.Database;

public class serviceUtils extends Database {

	public Boolean validateToken(int userid, String token) {

		String query = "select token from users where user_id='" + userid + "';";

		Statement stmt;
		String check = null;
		try {

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {

				check = rs.getString("token");
				if (check.equals(token)) {

					return true;
				} else {

					return false;
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return true;
	}

}
