#include <iostream>
#include <signal.h>
#include <sys/wait.h>
#include <unistd.h>
using namespace std;

void sig_cld(int signo) {
  cout << "SIGCLD received" << endl;
  if (signal(SIGCLD, sig_cld) == SIG_ERR) { // 重设信号处理程序，早期语义下，这里会出现递归调用
    cerr << "signal error" << endl;
    exit(1);
  }
  pid_t pid = wait(NULL);
  if (pid < 0) {
    cerr << "wait error" << endl;
    exit(1);
  }
  cout << "pid= " << pid << endl;
}

int main() {
  if (signal(SIGCLD, sig_cld) == SIG_ERR) {
    cerr << "signal error" << endl;
    exit(1);
  }
  pid_t pid = fork();
  if (pid < 0) {
    cerr << "fork error" << endl;
    exit(1);
  }
  if (pid == 0) { // 子进程
    sleep(1);
    _exit(0);
  }
  pause();
  return 0;
}