package com.suresh.learning.problems;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BoggleGame {

	
	
	public List<String> process(char[][] chars) {
		List<String> res = new ArrayList<String>();
		int rows = chars.length;
		int cols = chars[0].length;
		for(int i=0;i<rows;i++) {
			for(int j=0;j<cols;j++) {
				getStrings(i, j, rows, cols, chars, "", res);
			}
			System.out.println();
		}
		return res;
	}
	
	private void getStrings(int ci, int cj, int rowS, int colS, char[][] chars, String tempS, List<String> res) {
		
		
		
	}
	
	
	private static class Dict {
		private Map<String, String> dictMap = new HashMap<String, String>();

		public static class DictHolder {
			private static Dict instance = new Dict(); 
		}
		
		private Dict() {
			ClassLoader.getSystemResource("words.txt");
			InputStream is = ClassLoader.getSystemResourceAsStream("words.txt");
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			String str = null;
			try {
				while((str = br.readLine()) != null) {
					dictMap.put(str, str);
				}
			}
			catch (IOException ie) {
				throw new RuntimeException();
			}
		}
		
		public Dict getInstance() {
			return DictHolder.instance;
		}
		private boolean isValidWord(String inStr) throws IOException {
			return dictMap.containsKey(inStr);
		}
		
	}
}
