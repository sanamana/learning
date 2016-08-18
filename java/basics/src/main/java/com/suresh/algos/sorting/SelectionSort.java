package com.suresh.algos.sorting;

public class SelectionSort {
	public void sort(int[] arr) {
		int totalSwaps = 0;
		for(int i=0; i < arr.length; i++) {
			for(int j = i+1; j < arr.length; j++) {
				if (arr[i] > arr[j]) {
					int c = arr[j];
					arr[j] = arr[i];
					arr[i] = c; 
					totalSwaps++;
				}
			}
		}
		System.out.println("total swaps = " + totalSwaps);
	}
}
