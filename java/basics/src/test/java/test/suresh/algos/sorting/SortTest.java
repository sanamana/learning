package test.suresh.algos.sorting;

import java.util.Arrays;

import org.junit.Test;

import com.suresh.algos.sorting.BubbleSort;
import com.suresh.algos.sorting.InsertionSort;
import com.suresh.algos.sorting.MergeSort;
import com.suresh.algos.sorting.MergeSort2;
import com.suresh.algos.sorting.QuickSort;
import com.suresh.algos.sorting.SelectionSort;

public class SortTest {
	
	@Test
	public void test() {
		int[] a1 = {7,8,9,10,1,2,4,6,12,2,3};
		InsertionSort is = new InsertionSort();
		is.sort(a1);
		System.out.println(Arrays.toString(a1));
	}

	@Test
	public void selectionSortTest() {
		int[] a1 = {15,14,13,12,11,10,9,8,7,6,5,4,3,2,1};
		SelectionSort is = new SelectionSort();
		is.sort(a1);
		System.out.println(Arrays.toString(a1));
	}
	
	@Test
	public void bubbleSortTest() {
		int[] a1 = {15,14,13,12,11,10,9,8,7,6,5,4,3,2,1};
		BubbleSort is = new BubbleSort();
		is.sort(a1);
		System.out.println(Arrays.toString(a1));
		
		a1 = new int[]{15,14,13,12,11,10,9,8,7,6,5,4,3,2,1};
		is = new BubbleSort();
		is.sort(a1);
		System.out.println(Arrays.toString(a1));

	}
	
	@Test
	public void mergeSortTest() {
		int[] a1 = new int[]{15,14,13,12,11,10,9,8,7,6,5,4,3,2,1};
		MergeSort is = new MergeSort();
		a1 = is.sort(a1);
		System.out.println(Arrays.toString(a1));
	}
	
	@Test
	public void mergeSort2Test() {
		int[] a1 = new int[]{15,14,13,12,11,10,9,8,7,6,5,4,3,2,1};
		MergeSort2 is = new MergeSort2();
		is.sort(a1);
		System.out.println(Arrays.toString(a1));
	}
	
	@Test
	public void quickSortTest() {
//		int[] a1 = new int[]{15,14,13,12,11,10,9,8,7,6,5,4,3,2,1};
		int[] a1 = new int[]{1,20,21,19,18,22,23,24,25};
		QuickSort is = new QuickSort();
		is.sort(a1);
		System.out.println(Arrays.toString(a1));
		
	}
}
