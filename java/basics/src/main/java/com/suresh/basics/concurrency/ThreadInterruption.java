package com.suresh.basics.concurrency;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.CountDownLatch;

/**
 * Demonstrates that isInterrupted boolean is reset when InterruptedException is thrown
 * @author sanamanamuri
 *
 */

public class ThreadInterruption {

	private ArrayBlockingQueue bq = new ArrayBlockingQueue(10);
	private CountDownLatch cdl = new CountDownLatch(1);
	
	private Runnable r = new Runnable() {
		public void run() {
			cdl.countDown();
			try {
				bq.take();
				System.out.println("Exited fine");
			}
			catch(InterruptedException ie) {
				System.out.println("Interrupted : " + Thread.currentThread().isInterrupted());
				System.out.println("Interrupt flag 1: " + Thread.interrupted());
				System.out.println("Interrupt flag 2: " + Thread.interrupted());
				
				Thread.currentThread().interrupt();
				System.out.println("Interrupted : " + Thread.currentThread().isInterrupted());
				System.out.println("Interrupt flag 1: " + Thread.interrupted());
				System.out.println("Interrupt flag 2: " + Thread.interrupted());
				
			}
		}
	};
	
	public void run() throws InterruptedException {
		Thread t = new Thread(r);
		t.start();
		cdl.await();
		
		System.out.println("Interrupting thread t");
		t.interrupt();
		System.out.println("Interrupted thread t");
	}
	
	public static void main(String args[]) throws InterruptedException {
		ThreadInterruption ti = new ThreadInterruption();
		ti.run();
	}
	
}
