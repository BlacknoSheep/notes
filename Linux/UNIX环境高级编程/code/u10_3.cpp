/*
 * 捕捉用户定义的信号
 */
#include <iostream>
#include <signal.h>
using namespace std;

static void sig_usr(int signo) {
  if (signo == SIGUSR1) cout << "received SIGUSR1" << endl;
  else if (signo == SIGUSR2) cout << "received SIGUSR2" << endl;
  else {
    cerr << "received signal " << signo << endl;
    exit(1);
  }
}

int main() {
  if (signal(SIGUSR1, sig_usr) == SIG_ERR) {
    cerr << "can't catch SIGUSR1" << endl;
    exit(1);
  }
  if (signal(SIGUSR2, sig_usr) == SIG_ERR) {
    cerr << "can't catch SIGUSR2" << endl;
    exit(1);
  }
  while (true) pause(); // pause函数挂起进程直至接到信号
  return 0;
}