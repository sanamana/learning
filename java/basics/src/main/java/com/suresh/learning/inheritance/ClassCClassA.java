package com.suresh.learning.inheritance;

public class ClassCClassA extends ClassC  {
	
	
	public ClassCClassA() {
		super(1,2);
	}
	
	public ClassCClassA(int a, int b) {
		super(a, b);
	}
	
	public int sum() {
		return a+b;
	}

	public static void main(String args[]) {
		
		System.out.println(new ClassCClassA(1,2).sum());
	}
}
