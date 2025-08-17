/* 不可重入函数 */
#include <pwd.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void my_alarm(int signo) {
  printf("in signal handler\n");
  passwd* rootptr = getpwnam("root"); // 程序会在这里卡住
  if (rootptr == NULL) {
    fprintf(stderr, "gepwnam(\"root\") error\n");
    exit(1);
  }
  alarm(1); // 重新设置闹钟
}

int main() {
  signal(SIGALRM, my_alarm);
  alarm(1);
  passwd* ptr;
  while (true) {
    if ((ptr = getpwnam("kyou")) == NULL) {
      fprintf(stderr, "gepwnam(\"kyou\") error\n");
      exit(1);
    }
    if (strcmp(ptr->pw_name, "kyou") != 0) {
      printf("return value corrupted!, pw_name = %s\n", ptr->pw_name);
    }
  }
  return 0;
}