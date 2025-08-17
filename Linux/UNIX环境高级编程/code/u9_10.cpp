/* 创建孤儿进程组 */
#include <errno.h>
#include <signal.h>
#include <stdio.h>
#include <unistd.h>

void sig_hup(int signo) {
  printf("SIGHUP received, pid = %d\n", getpid());
}

void pr_ids(const char* name) {
  printf("%s: pid = %d, ppid = %d, pgrp = %d, tpgrp = %d\n", name, getpid(), getppid(), getpgrp(),
         tcgetpgrp(STDIN_FILENO));
}

int main() {
  char c;
  pr_ids("parent");
  pid_t pid = fork();
  if (pid < 0) {
    perror("fork error");
  } else if (pid > 0) {
    sleep(5); // 等待子进程暂停自身
  } else {
    pr_ids("child");
    signal(SIGHUP, sig_hup); // 注册信号处理程序
    kill(getpid(), SIGTSTP); // 暂停自身
    pr_ids("child");
    if (read(STDIN_FILENO, &c, 1) != 1) { // 尝试从终端读
      printf("read error %d on controlling TTY\n", errno);
    }
  }
  return 0;
}