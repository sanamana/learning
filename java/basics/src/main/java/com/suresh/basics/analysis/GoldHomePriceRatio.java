package com.suresh.basics.analysis;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

public class GoldHomePriceRatio {

	private static Map<String, Integer> monthMap = new HashMap<String, Integer>();
	
	static {
		monthMap.put("Jan", 1);
		monthMap.put("Feb", 2);
		monthMap.put("Mar", 3);
		monthMap.put("Apr", 4);
		monthMap.put("May", 5);
		monthMap.put("Jun", 6);
		monthMap.put("Jul", 7);
		monthMap.put("Aug", 8);
		monthMap.put("Sep", 9);
		monthMap.put("Oct", 10);
		monthMap.put("Nov", 11);
		monthMap.put("Dec", 12);
	}
	
	public static class PriceDate {

		private Integer year;
		private Integer month;
		private Integer day;
		
		public PriceDate(Integer year, Integer month, Integer day) {
			this.year = year;
			this.month = month;
			this.day = day;
		}

		public Integer getYear() {
			return year;
		}
		

		public void setYear(Integer year) {
			this.year = year;
		}

		public Integer getMonth() {
			return month;
		}

		public void setMonth(Integer month) {
			this.month = month;
		}

		public Integer getDay() {
			return day;
		}

		public void setDay(Integer day) {
			this.day = day;
		}

		public String toString() {
			return "{year : " + year + ",month : " + month + ",day : " + day + " }";
		}
		
		@Override
		public boolean equals(Object obj) {
			PriceDate pd = (PriceDate) obj;
			if (year == pd.getYear() && month == pd.getMonth() && day == pd.getDay()) {
				return true;
			}
			return false;
		}
		
		public int hashCode() {
			return 7 * year + 11 * month + 13 * day;  
		}

	}
	
	public static class PriceDateComparator implements Comparator<PriceDate> {

		public int compare(PriceDate o1, PriceDate o2) {
			int yearDiff = o1.getYear() - o2.getYear();
			int monthDiff = o1.getMonth() - o2.getMonth();
			return (yearDiff == 0) ? monthDiff : yearDiff; 
		}
		
	}
	
	
	public static class GoldPriceParser {
		
		public Map<PriceDate, Double> getGoldData() throws IOException {
		
			GoldHomePriceRatio ghp = new GoldHomePriceRatio();
			ClassLoader cl = ghp.getClass().getClassLoader();
			URL r = cl.getResource("goldPriceHistory.csv");
			BufferedReader br = new BufferedReader(new InputStreamReader(r.openStream()));
			String str = null;
			Map<PriceDate, Double> m = new TreeMap<PriceDate, Double>(new GoldHomePriceRatio.PriceDateComparator());
			while((str = br.readLine()) != null) {
				String[] strs = str.split(",");
				String[] dates = strs[0].split("-");
				
				Integer year = Integer.parseInt(dates[0]);
				Integer month = Integer.parseInt(dates[1]);
				Integer day = Integer.parseInt(dates[2]);
				Double price = Double.parseDouble(strs[1]);
				
				if (day == 1) {
					m.put(new PriceDate(year, month, day), price);
				}
			}
			
			// validate gaps
			Set<PriceDate> pdSet = m.keySet();
			int prevDay = 0;
			for(PriceDate pd : pdSet) {
				if (prevDay == 0) prevDay = pd.getDay();
				if (pd.getDay() - prevDay > 1) {
					System.out.println(pd.toString());
				}
				prevDay = pd.getDay();
			}
			
			return m;
		
		}
	}
	
	public static class USHomePriceParser {
		public Map<PriceDate, Double> getHomePriceData() throws IOException {
			GoldHomePriceRatio ghp = new GoldHomePriceRatio();
			ClassLoader cl = ghp.getClass().getClassLoader();
			URL r = cl.getResource("us_median_average_home_prices.txt");
			BufferedReader br = new BufferedReader(new InputStreamReader(r.openStream()));
			String str = null;
			Map<PriceDate, Double> m = new TreeMap<PriceDate, Double>(new GoldHomePriceRatio.PriceDateComparator());
			br.readLine();
			while((str = br.readLine()) != null) {
				String[] strs = str.split(" ");
				String monthStr = strs[0];
				Integer month = monthMap.get(monthStr);
				String yearStr = strs[1];
				Integer year = Integer.parseInt(yearStr);
				String avgStr = strs[3];
				avgStr = avgStr.replace("$", "");
				avgStr = avgStr.replace(",", "");
				String medianStr = strs[2];
				medianStr = medianStr.replace("$", "");
				medianStr = medianStr.replace(",", "");
				Double avg = (avgStr.contains("NA")) ? -1 : Double.parseDouble(avgStr);
				Double median = (medianStr.contains("NA")) ? -1 : Double.parseDouble(medianStr);
				
				Integer day = 1;
				m.put(new PriceDate(year, month, day), median);
				
			}
			
			// validate gaps
			Set<PriceDate> pdSet = m.keySet();
			int prevDay = 0;
			for(PriceDate pd : pdSet) {
				if (prevDay == 0) prevDay = pd.getDay();
				if (pd.getDay() - prevDay > 1) {
					System.out.println(pd.toString());
				}
				prevDay = pd.getDay();
			}
			
			return m;

		}
 	}
	
	public static void main(String[] args) throws IOException {
		GoldHomePriceRatio ghp = new GoldHomePriceRatio();
		GoldHomePriceRatio.GoldPriceParser gpp = new GoldHomePriceRatio.GoldPriceParser();
		Map<PriceDate, Double> goldPriceDate = gpp.getGoldData();
		GoldHomePriceRatio.USHomePriceParser upp = new GoldHomePriceRatio.USHomePriceParser();
		Map<PriceDate, Double> usPriceDate = upp.getHomePriceData();
		Map<PriceDate, Double> usGoldRatioPriceDate = new TreeMap<PriceDate, Double>(new GoldHomePriceRatio.PriceDateComparator());
		for(PriceDate pd : usPriceDate.keySet()) {
			Double goldPrice = goldPriceDate.get(pd);
			Double usPrice = usPriceDate.get(pd);
			if (usPrice == null || usPrice == -1 || goldPrice == null || goldPrice == -1) continue;
//			System.out.println("goldP : " + goldPrice + ", usPirce : " + usPrice);
			Double usToGoldRatio = usPrice / goldPrice;
			usGoldRatioPriceDate.put(pd, usToGoldRatio);
		}

		
		for(PriceDate pd : usGoldRatioPriceDate.keySet()) {
			System.out.print(pd);
			System.out.println(" price : " + usGoldRatioPriceDate.get(pd));
		}
		
	}
	
}
