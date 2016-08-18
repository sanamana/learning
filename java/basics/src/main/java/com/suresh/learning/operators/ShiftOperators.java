package com.suresh.learning.operators;

public class ShiftOperators {
	
	public static void main(String args[]) {
		int i = -1;
		String binaryString = Integer.toBinaryString(i);
		System.out.println("bs=" + binaryString);
		i = i << 1;
		binaryString = Integer.toBinaryString(i);
		Long l = Long.parseLong(binaryString, 2);
		System.out.println("bs=" + binaryString + ",valule=" + l.intValue());
		i = i >> i;
		binaryString = Integer.toBinaryString(i);
		l = Long.parseLong(binaryString, 2);
		System.out.println("bs=" + binaryString + ",valule=" + l.intValue());
		i = i >>> 30;
		binaryString = Integer.toBinaryString(i);
		l = Long.parseLong(binaryString, 2);
		System.out.println("bs=" + binaryString + ",valule=" + l.intValue());
		
		
	}

}
