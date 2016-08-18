package com.suresh.algos.sorting;

public class MergeSort {

	public int[] sort(int[] a) {
		int c[] = splitAndMerge(a);
		return c;
	}
	
	private int[] splitAndMerge(int[] a) {
		int end = a.length;
		int start = 0;
		if (start >= end - 1) return a;
		int mid = ((end - start) / 2);
		if (end % 2 == 1) {
			mid = ((end - start) / 2) + 1;
		}
		int[] a1 = new int[mid - start];
		int[] a2 = new int[end - mid];
		for(int i = start; i < mid; i++) {
			a1[i] = a[i];
		}
		for(int i = mid, j=0; i < end; i++, j++) {
			a2[j] = a[i];
		}
		
		a1 = splitAndMerge(a1);
		a2 = splitAndMerge(a2);
		
		return merge(a1, a2);
	}



	private int[] merge(int[] a, int[] b) {
		int[] c = new int[(a.length + b.length)];
		int i=0, j=0, k=0;
		for(; i < a.length && j < b.length; )  {
			if (a[i] < b[j]) {
				c[k++] = a[i++];
			}
			else if (a[i] > b[j]){
				c[k++] = b[j++];
			}
			else {
				c[k++] = a[i++];
				c[k++] = b[j++];
			}
		}
		for(; i < a.length; i++) {
			c[k++] = a[i];
		}
		for(; j < b.length; j++) {
			c[k++] = b[j];
		}
		return c;
	}
}
