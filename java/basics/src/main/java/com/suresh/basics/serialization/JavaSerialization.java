package com.suresh.basics.serialization;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class JavaSerialization {
	
	public void serialize() throws IOException {
		FileOutputStream fos = new FileOutputStream("a.txt");
		ObjectOutputStream oos = new ObjectOutputStream(fos);
		Message m = new Message();
		m.setA(1);
		m.setB(2);
		oos.writeObject(m);
		fos.close();
	}
	
	public void deserialize() throws IOException, ClassNotFoundException {
		FileInputStream fis = new FileInputStream("a.txt");
		ObjectInputStream oos = new ObjectInputStream(fis);
		Message m = (Message) oos.readObject();
		System.out.println(m.getA());
		System.out.println(m.getB());
		fis.close();
	}
	
	
	public static void main(String args[]) throws IOException, ClassNotFoundException {
		JavaSerialization js = new JavaSerialization();
		//js.serialize();
		js.deserialize();
	}

}
