/*
 * 打开一个文件，unlink，然后等待15s
 * unlink后文件链接计数归0，目录项被删除
 * 而文件需要等到进程结束才会真正删除（可通过磁盘剩余空间查看）
 */
#include <fcntl.h>
#include <iostream>
#include <unistd.h>
using namespace std;

int main() {
  if ((open("testfile", O_RDWR)) < 0) {
    cerr << "open error" << endl;
    exit(0);
  }
  if (unlink("testfile") < 0) {
    cerr << "unlink error" << endl;
    exit(0);
  }
  cout << "file unlinked" << endl;
  sleep(15);
  cout << "done" << endl;
  return 0;
}
