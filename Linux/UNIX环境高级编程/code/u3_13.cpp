/* 文件描述符关联同一张文件表的情况 */
#include <fcntl.h>
#include <iostream>
#include <unistd.h>

using namespace std;

int main() {
  int fd = open("test.txt", O_RDWR | O_CREAT);
  lseek(fd, 5, SEEK_SET); // 设置文件偏移量（位于文件表中）
  cout << "offset of fd: " << lseek(fd, 0, SEEK_CUR) << endl;
  int fd1 = dup(fd); // 和fd关联同一张文件表
  cout << "offset of fd1: " << lseek(fd1, 0, SEEK_CUR) << endl;
  int fd2 = open("test.txt", O_RDONLY); // 和fd关联不同的文件表
  cout << "offset of fd2: " << lseek(fd2, 0, SEEK_CUR) << endl;
  return 0;
}