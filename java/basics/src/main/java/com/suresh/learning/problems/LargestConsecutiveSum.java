package com.suresh.learning.problems;

/**
 * 
 * @author sanamanamuri
 *
 */
public class LargestConsecutiveSum {

	/**
	 * input a list of integers
	 */
	public int process(int[] nums) {
		int c = Integer.MIN_VALUE;
		if (nums.length == 0) throw new IllegalArgumentException("The input cannot be empty");
		
		int maxC = c;
		for(int i : nums) {
			if (c > 0) {
				c += i;
			}
			else {
				c = i;
			}
			maxC = c > maxC ? c :  maxC; 
		}
		return maxC;
	}
}
