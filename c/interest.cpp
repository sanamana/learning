#include <stdio.h>
#define RATE 5
#define PERIOD 10

int main() {
	float amount = 10000;
	int i = 0;
	while(i < PERIOD) {
		amount = amount + (amount * RATE / 100);
		printf("%3d, %6.2f\n", i, amount);
		i++;
	}
	return 0;
}