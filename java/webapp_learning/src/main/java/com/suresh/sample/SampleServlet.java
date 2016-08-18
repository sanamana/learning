package com.suresh.sample;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SampleServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		try {
			Date d = new Date();
			for(int i =0 ; i <100000; i++) {
				System.out.println("Log entry of " + i + " @ " + d.toString());
			}
			PrintWriter pw = resp.getWriter();
			pw.write("Hello World");
			pw.flush();
			pw.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
	}

}
