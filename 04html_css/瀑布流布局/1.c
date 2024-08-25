#include <stdio.h>
#include <string.h>

#define MAX_STRINGS 10
#define MAX_LENGTH 100

void bubbleSort(char arr[6][100], int n) {
    char temp[100];
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (strcmp(arr[j], arr[j+1]) > 0) {
                strcpy(temp, arr[j]);
                strcpy(arr[j], arr[j+1]);
                strcpy(arr[j+1], temp);
            }
        }
    }
}

int main() {
    char arr[MAX_STRINGS][MAX_LENGTH] = {
        "265",
        "758",
        "354",
        "524",
        "210",
        "125",
    };
    int n = 10; 

    printf("排序前:\n");
    for (int i = 0; i < n; i++) {
        printf("%s\n", arr[i]);
    }

    bubbleSort(arr, n);

    printf("\n排序后:\n");
    for (int i = 0; i < n; i++) {
        printf("%s\n", arr[i]);
    }

    return 0;
}
