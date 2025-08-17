#include <iostream>
#include <signal.h>
using namespace std;

void sig_quit(int signo) {
  cout << "caught SIGQUIT" << endl;
  signal(SIGQUIT, SIG_DFL); // 重置信号处理程序位默认行为
}

int main() {
  sigset_t newmask, oldmask, pendmask;
  signal(SIGQUIT, sig_quit);

  /* 屏蔽SIGQUIT并备份当前屏蔽字 */
  sigemptyset(&newmask);
  sigaddset(&newmask, SIGQUIT);
  sigprocmask(SIG_BLOCK, &newmask, &oldmask);
  cout << "SIGQUIT blocked" << endl;
  sleep(5); // 此时的SIGQUIT将会被阻塞
  sigpending(&pendmask); // 检查当前被阻塞的信号
  if (sigismember(&pendmask, SIGQUIT)) cout << "\nSIGQUIT pending" << endl;

  // 恢复屏蔽字并解除屏蔽SIGQUIT
  sigprocmask(SIG_SETMASK, &oldmask, NULL); // 如果有未决的SIGQUIT，则至少递送一次
  cout << "SIGQUIT unblocked" << endl;
  sleep(5); // 此时SIGQUIT将正常递送

  return 0;
}