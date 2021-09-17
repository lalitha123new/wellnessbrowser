package org.project.IIITB.AppWellness.Globals;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class Database {
	
	/** mysql username **/
	private static final String userName = "root";
	
	/** mysql password **/
	
	//nimhans db pw
	//private static final String password = "pushd@123";
	
	//iiit db pw
	//private static final String password = "1234";
	
	//my db pw 
	private static final String password = "";
	
	
	/** mysql servername **/
	private static final String serverName = "localhost";
	
	/** mysql portnumber **/
	private static final int portNumber = 3306;
	
	/** mysql databasename **/
	
	//iiit and nimhans db
	//private static final String dbName = "wellnessDB";
	
	//local db
	private static final String dbName = "wellnessdb1308";
	
	
	
	
	protected static Connection conn= null;

	protected static Connection getConnection() throws SQLException {
		Connection conn1 = null;
		Properties connectionProps = new Properties();
		connectionProps.put("user",userName);
		connectionProps.put("password", password);
		connectionProps.put("useSSL", "false");
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		conn1 = DriverManager.getConnection("jdbc:mysql://"
				+ serverName + ":" + portNumber + "/" + dbName,
				connectionProps);
		if(conn1==null)
			throw new SQLException();
		return conn1;
	}

	public static void run() {
		// CONNECT to MySQL
		try {
			if(conn==null)
				conn = getConnection();
			
			if(conn.isClosed()){
				conn=getConnection();
				System.out.println("Database connected again");		
			}	
			
			System.out.println("Connected to database");
		} catch (SQLException e) {
			System.out.println("This ERROR: Could not connect to the database");
			e.printStackTrace();
			return;
		}
	}
	public static boolean connected() {
		return (conn!=null);
	}
	

	public static void main(String[] ww) {
		

	}

}
