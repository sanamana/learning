package com.suresh.learning.threads;

public class InterruptedThread {
	static Object obj = new Object();
	static boolean mainStart = true;
	static boolean runThreadStart = false;
	public static void main(String args[]) throws InterruptedException {
		
		Runnable r = new Runnable () {
				public void run() {
					synchronized(obj) {
						if (!mainStart) {
							mainStart = true;
							obj.notifyAll();
						}
						if (!runThreadStart) {
							try {
								obj.wait();
							} catch (InterruptedException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
					}
					
					if (Thread.currentThread().isInterrupted()) {
						try {
							throw new InterruptedException("interrupted");
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
					System.out.println(Thread.currentThread().getName());
				}
		};
		
		Thread t = new Thread(r);
		t.start();
		synchronized(obj) {
			if (!mainStart) {
				obj.wait();
			}
		}
//		t.interrupt();
//		t.start();
//		t.join();
		System.out.println(Thread.currentThread().getName());
		t.interrupt();
		t.join();
		System.out.println("Done");
		
	}

}
