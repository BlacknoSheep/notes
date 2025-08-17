/*
 * 子进程复制父进程的数据段、堆、栈
 */
#include <iostream>
#include <unistd.h>
using namespace std;

int globvar = 6; // 初始化全局变量，位于数据段
char buf[] = "a write to stdout\n";

int main() {
  int var = 88; // 自动变量，位于栈区
  // write 无缓冲
  if (write(STDOUT_FILENO, buf, sizeof(buf) - 1) != sizeof(buf) - 1) { // sizeof会计入末尾的null字符
    cerr << "write error" << endl;
    exit(1);
  }

  // 缓冲区位于堆区
  printf("before fork\n"); // 输出到控制台为行缓冲，输出到文件为全缓冲
  // cout << "before fork\n"; // 同上

  pid_t pid = fork();
  if (pid < 0) {
    cerr << "fork error" << endl;
    exit(1);
  } else if (pid == 0) { // 子进程
    // 子进程复制父进程的数据段、堆、栈
    // 修改子进程的变量值不会影响父进程中的变量
    ++globvar;
    ++var;
  } else { // 父进程
    sleep(2);
  }

  printf("pid=%ld, glob=%d, var=%d\n", (long)getpid(), globvar, var);
  return 0;
}