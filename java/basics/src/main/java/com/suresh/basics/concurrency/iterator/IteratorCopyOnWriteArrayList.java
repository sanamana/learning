package com.suresh.basics.concurrency.iterator;

import java.util.ListIterator;
import java.util.concurrent.CopyOnWriteArrayList;

public class IteratorCopyOnWriteArrayList {
	
	public static void main(String args[]) {
		CopyOnWriteArrayList<Integer> cl = new CopyOnWriteArrayList<Integer>();
		cl.add(1);
		cl.add(2);
		
		ListIterator<Integer> it = cl.listIterator();
		while(it.hasNext()) {
			System.out.println(it.next());
		}
		while(it.hasPrevious()) {
			it.previous();
		}

		cl.remove(1);
		while(it.hasNext()) {
			System.out.println(it.next());
		}
		while(it.hasPrevious()) {
			it.previous();
		}
		
		cl.add(3);
		while(it.hasNext()) {
			System.out.println(it.next());
		}
		while(it.hasPrevious()) {
			it.previous();
		}
		
		ListIterator<Integer> lit = cl.listIterator();
		while(lit.hasNext()) {
			System.out.println(lit.next());
		}
		
	}

}
