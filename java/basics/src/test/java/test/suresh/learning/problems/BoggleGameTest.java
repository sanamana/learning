package test.suresh.learning.problems;

import org.junit.Test;

import com.suresh.learning.problems.BoggleGame;

public class BoggleGameTest {
	
	@Test
	public void process() {
		BoggleGame bg = new BoggleGame();
		char[][] chars = {{'a','b','c','d'},{'e','f','g','h'},{'i','j','k','l'},{'m','n','o','p'}};
		bg.process(chars);
	}

}
