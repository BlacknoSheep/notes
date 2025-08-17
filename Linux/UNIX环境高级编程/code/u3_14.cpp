/*
 * 打印文件状态标志
 */
#include <fcntl.h>
#include <iostream>
#include <unistd.h>
using namespace std;

void showFL(const int fd) {
  const int fl = fcntl(fd, F_GETFL, 0);
  if (fl < 0) {
    cerr << "fcntl error" << endl;
    exit(1);
  }

  switch (fl & O_ACCMODE) {
  case O_RDONLY:
    cout << "read only";
    break;
  case O_WRONLY:
    cout << "write only";
    break;
  case O_RDWR:
    cout << "read write";
    break;
  default:
    cerr << "unknown access mode";
    break;
  }

  if (fl & O_APPEND) cout << ", append";
  if (fl & O_NONBLOCK) cout << ", nonblocking";
  if (fl & O_SYNC) cout << ", synchronous writes";
  cout << endl;
}

void changeFL(const int fd, int flags, bool isSet) {
  // 打开文件状态标志
  int fl = fcntl(fd, F_GETFL, 0);
  if (fl < 0) {
    cerr << "fcntl error, F_GETFL" << endl;
    exit(1);
  }

  if (isSet) fl |= flags; // 设置文件状态标志
  else fl &= ~flags; // 清除文件状态标志

  if (fcntl(fd, F_SETFL, fl) < 0) {
    cerr << "fcntl error, F_SETFL" << endl;
    exit(1);
  }
}

int main() {
  showFL(STDOUT_FILENO);

  // 设置 O_APPEND、O_NONBLOCK、O_SYNC 标志
  // 注意：ubuntu下O_SYNC无法设置
  changeFL(STDOUT_FILENO, O_APPEND | O_NONBLOCK | O_SYNC, true);
  showFL(STDOUT_FILENO);

  // 清除 O_APPEND、O_NONBLOCK、O_SYNC 标志
  changeFL(STDOUT_FILENO, O_APPEND | O_NONBLOCK | O_SYNC, false);
  showFL(STDOUT_FILENO);

  return 0;
}