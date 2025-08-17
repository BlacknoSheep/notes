/*
 * 捕获中断信号
 */
#include <iostream>
#include <sys/wait.h>
#include <unistd.h>

using namespace std;

void sig_int(int signo) {
  cout << "捕获到中断信号，signo=" << signo << endl;
  cout << "当前进程id=" << getpid() << endl;
  exit(0); // 这里不退出就只能从命令行kill了
}

int main() {
  string s;
  if (signal(SIGINT, sig_int) == SIG_ERR) cerr << "signal error" << endl;
  while (cin >> s);
  return 0;
}