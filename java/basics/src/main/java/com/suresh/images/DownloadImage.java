package com.suresh.images;

import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class DownloadImage {

	public void download(String urlStr, String destinationFile) {
		try {
			URL url = new URL(urlStr);
			HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
			InputStream in = new BufferedInputStream(urlConnection.getInputStream());
			OutputStream os = new FileOutputStream(destinationFile);
			
			byte[] b = new byte[2048];
			int length;

			while ((length = in.read(b)) != -1) {
				os.write(b, 0, length);
			}

			in.close();
			os.close();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public static void main(String args[]) {
		String url = "http://www.stockcharts.com/c-sc/sc?s=$SPX&p=D&yr=1&mn=0&dy=0&i=t00618543350&r=1398187111177";
		String destination = "C:\\Users\\sanamanamuri\\Downloads\\images\\spx.jpg";
		DownloadImage di = new DownloadImage();
		di.download(url,destination);
	}
	
}
