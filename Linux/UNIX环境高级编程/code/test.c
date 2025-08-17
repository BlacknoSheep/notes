// orphan.c
#include <errno.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void handler(int sig) {
  printf("hello sighup, pid = %d\n", getpid());
}

void print(char* name) {
  printf("%s: pid = %d, ppid = %d, pgrp = %d, tpgrp = %d\n", name, getpid(), getppid(), getpgid(getpid()),
         tcgetpgrp(0));
  fflush(stdout);
}

int main() {
  char c;
  pid_t pid;
  print("parent");

  pid = fork();
  if (pid < 0) {
    perror("fork");
  } else if (pid > 0) {
    sleep(5);
  } else {
    print("child");
    signal(SIGHUP, handler);
    kill(getpid(), SIGTSTP); // 让子进程暂停
    print("child"); // 如果执行了此行，说明已经收到了 SIGHUP 信号

    if (read(STDIN_FILENO, &c, 1) != 1) {
      printf("read error, error number: %d\n", errno);
    }
    exit(0);
  }
  return 0;
}