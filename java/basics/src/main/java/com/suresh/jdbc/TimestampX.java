package com.suresh.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;

public class TimestampX {
	
	public static void main(String args[]) {
		try {
 			Class.forName("oracle.jdbc.driver.OracleDriver");
 		} catch (ClassNotFoundException e) {
 			e.printStackTrace();
 			return;
		}
 		Connection connection = null;
 		try {
 			connection = DriverManager.getConnection(
					"jdbc:oracle:thin:@sloc2.vip.qa.ebay.com:1521:SLOC2", "stg_mblibx8_app",
					"stg_mblibx8_app");
 		} catch (SQLException e) {
 			e.printStackTrace();
			return;
 		}
 
		if (connection != null) {
			String updateTableSQL = "update mob_notfn_inbox_08 set creation_date = ?  where MOB_NOTFN_INBOX_ID= ?";
	 
			try {
				PreparedStatement preparedStatement = connection.prepareStatement(updateTableSQL);
				Timestamp ts = new Timestamp(new Date().getTime());
				preparedStatement.setTimestamp(1, ts);
				preparedStatement.setLong(2, 5000617072L);
				// execute insert SQL stetement
				preparedStatement .executeUpdate();
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
			}
	 	
		} else {
			System.out.println("Failed to make connection!");
		}
	}

}
 