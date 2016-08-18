package com.suresh.algos.sorting;

public class InsertionSort {
	
	public void sort(int[] arr) {
		for(int i=1; i < arr.length; i++) {
			for(int j = i; j > 0 && arr[j-1] > arr[j]; j--) {
				int c = arr[j-1];
				arr[j-1] = arr[j];
				arr[j] = c; 
			}
		}
	}

}
