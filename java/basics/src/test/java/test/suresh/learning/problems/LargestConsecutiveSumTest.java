package test.suresh.learning.problems;

import org.junit.Assert;
import org.junit.Test;

import com.suresh.learning.problems.LargestConsecutiveSum;


public class LargestConsecutiveSumTest {
	@Test
	public void process() {
		LargestConsecutiveSum s = new LargestConsecutiveSum();
		int input[] = {1,2,3,4,5,6,-21,-10,100,-10,11};
		int res = s.process(input);
		Assert.assertEquals(101, res);
		
		input = new int[]{-10,-9,-8,-7,-6,-5,-4,-11,-1,-2,-3,5,-1,-5,1};
		res = s.process(input);
		Assert.assertEquals(5, res);
		
		input = new int[]{1,2,3,4,5,6,-21};
		res = s.process(input);
		Assert.assertEquals(21, res);
		
		input = new int[]{1,2,3,4,5,6,-21};
		res = s.process(input);
		Assert.assertEquals(21, res);

		input = new int[]{-1,-2,-3,-4,-5,-6,-21};
		res = s.process(input);
		Assert.assertEquals(-1, res);

		input = new int[]{-1,-2,-3,-4,-5,-6,-21};
		res = s.process(input);
		Assert.assertEquals(-1, res);

	}

}
