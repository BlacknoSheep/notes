/*
 * 测试信号处理程序自动屏蔽当前被捕捉的信号
 * 测试 sigsetjmp 和 siglongjmp
 */
#include <iostream>
#include <setjmp.h>
#include <signal.h>
using namespace std;

static sigjmp_buf jmpbuf;
static volatile sig_atomic_t canjmp; // 写这种类型时不会被中断

static void pr_mask(const string& msg) {
  cout << msg;
  sigset_t mask;
  sigprocmask(0, NULL, &mask);
  if (sigismember(&mask, SIGUSR1)) cout << " SIGUSR1";
  if (sigismember(&mask, SIGALRM)) cout << " SIGALRM";
  cout << endl;
}

static void sig_usr1(int signo) {
  if (canjmp == 0) return; // 跳转点未设置，直接返回

  pr_mask("start sig_usr1:");
  alarm(3);
  // sleep在接到信号时也会返回，所以不用
  time_t starttime = time(NULL);
  while (time(NULL) - starttime < 5); // busy wait for 5 seconds
  pr_mask("finish sig_usr1:");

  canjmp = 0;
  siglongjmp(jmpbuf, 1);
}

static void sig_alrm(int signo) {
  pr_mask("sig_alrm:");
}

int main() {
  signal(SIGUSR1, sig_usr1);
  signal(SIGALRM, sig_alrm);
  pr_mask("star main:");
  if (sigsetjmp(jmpbuf, 1)) { // 跳转到这里
    pr_mask("end main:");
    return 0;
  }
  canjmp = 1; // 跳转点已设置，允许跳转
  while (true) pause(); // 等待信号
  return 0;
}