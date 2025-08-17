/*
 * 从标准输入中读取命令，然后再子进程中执行该命令
 */
#include <iostream>
#include <sys/wait.h>
#include <unistd.h>

using namespace std;

int main() {
  string cmd;
  pid_t pid;
  cout << "Please input a command: ";
  while (getline(cin, cmd)) {
    if (cmd.length() == 0) { // 输入为空
      continue;
    }

    // 创建子进程。对父进程返回子进程的pid（正整数），对子进程返回0
    if ((pid = fork()) < 0) {
      cerr << "fork error" << endl;
      return 1;
    } else if (pid == 0) { // 子进程
      execlp(cmd.c_str(), cmd.c_str(), nullptr); // execlp会用新程序替换当前进程
      // 若执行成功，则下面的代码不会被执行
      cerr << "couldn't execute: " << cmd << endl;
      return 1;
    }

    // 父进程
    if ((pid = waitpid(pid, NULL, 0)) < 0) // 等待子进程结束，成功时返回子进程的pid，错误时返回-1
      cerr << "waitpid error" << endl;
    cout << "子进程" << pid << "结束" << endl;
  }
  return 0;
}