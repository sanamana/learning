package com.suresh.learning.javalang;

public class DoubleMethods {
	
	public static void main(String args[]) {
		double d = 1.2343243242424242;
		long doubleLong = Double.doubleToLongBits(d);
		Double d1 = Double.longBitsToDouble(doubleLong);
		System.out.println(d1);
	}

}
