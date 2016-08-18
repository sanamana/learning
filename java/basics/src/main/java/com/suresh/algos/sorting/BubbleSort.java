package com.suresh.algos.sorting;

public class BubbleSort {
	public void sort(int[] arr) {
		for(int i=0; i < arr.length; i++) {
			boolean swapped = false;
			for(int j = arr.length -1; j > i; j--) {
				if (arr[j] < arr[j-1]) {
					int c = arr[j];
					arr[j] = arr[j-1];
					arr[j-1] = c; 
					swapped = true;
				}
			}
			if (!swapped) break;
		}
	}
	
	public void sort2(int[] arr) {
		for(int i=arr.length - 1; i > 0 ; i--) {
			boolean swapped = false;
			for(int j = 0; j < i; j++) {
				if (arr[j] > arr[j+1]) {
					int c = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = c; 
					swapped = true;
				}
			}
			if (!swapped) break;
		}
	}
	

}
