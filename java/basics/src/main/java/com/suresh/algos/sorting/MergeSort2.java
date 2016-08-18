package com.suresh.algos.sorting;

public class MergeSort2 {
	
	private int[] temp = null;
	
	public int[] sort(int[] a) {
		temp = new int[a.length];
		int end = a.length - 1;
		int start = 0;
		
		mergeSort(start, end, a);
		return a;
	}
	
	public void mergeSort(int start, int end, int[] a) {
		if (start < end) {
			int mid = start + ((end - start) / 2);
			mergeSort(start, mid, a);
			mergeSort(mid + 1, end, a);
			merge(start, mid, end, a);
		}
	}
	
	public void merge(int start, int mid, int end, int[] a) {
		
		for(int i=0; i < a.length; i++) {
			temp[i] = a[i];
		}
		
		int i = start;
		int j = mid + 1;
		int k = start;
		while(i <= mid && j <= end) {
			if (temp[i] <= temp[j]) {
				a[k] = temp[i];
				i++;
			}
			else {
				a[k] = temp[j];
				j++;
			}
			k++;
		}
		while(i <= mid) {
			a[k] = temp[i];
			i++;
			k++;
		}
	}

}
