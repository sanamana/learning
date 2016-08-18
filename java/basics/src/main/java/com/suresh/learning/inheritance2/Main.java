package com.suresh.learning.inheritance2;

public class Main {

	/**
	 * Don't use same variable names in parent class and sub class. 
	 * Direct access of variables will give surprising results
	 * @param args
	 */
	public static void main(String args[]) {
		ClassA a = new ClassA();
		ClassB b = new ClassB();
		
		System.out.println(a.i);
		System.out.println(b.i);
		
		ClassA c = b;
		System.out.println(c.i);
		System.out.println(c.getI());
	}

}
