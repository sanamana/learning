package com.suresh.algos.sorting;

public class QuickSort {
	
	public void sort(int a[]) {
		int len = a.length - 1;
		int lower = 0;
		int upper = len;
		
		quicksort(lower, upper, a);
	}
	
	private void quicksort(int lower, int upper, int[] a) {
		int mid = lower + (upper - lower)/2;
		int i = lower;
		int j = upper;
		int pivot = a[mid];
		if (i <= j) {
			
			while (a[i] < pivot) {
				i++;
			}
			while (a[j] > pivot) {
				j--;
			}
			
			if (i <= j) {
				int c = a[i];
				a[i] = a[j];
				a[j] = c;
				i++;
				j--;
			}
			
			if (lower < j) {
				quicksort(lower, j, a);
			}
			if (i < upper) {
				quicksort(i, upper, a);
			}
		}
	}

}
