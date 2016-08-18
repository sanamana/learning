package com.suresh.learning.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexTest {
	 public static void main(String[] args){
//		 	String patternStr = "((a)(b))\\1";
		 	String patternStr = "\\Gdog";
		 	String text = "dogdog";
	            Pattern pattern = Pattern.compile(patternStr);

	            Matcher matcher = pattern.matcher(text);

	            boolean found = false;
	            while (matcher.find()) {
	                System.out.println(String.format("found:" +
	                    " \"%s\" starting at " +
	                    "index %d and ending at index %d.%n",
	                    matcher.group(),
	                    matcher.start(),
	                    matcher.end()));
	                found = true;
	            }
	            if(!found){
	                System.out.println("No match found.%n");
	            }
	    }
}
