package com.suresh.learning.inheritance;

public class ClassC {

	int a;
	int b;
	
	private ClassC() {
		System.out.println("ClassC private constructor");
	}
	
	public ClassC(int a, int b) {
		System.out.println("ClassC private constructor 2");
		this.a = a;
		this.b = b;
	}
}
