/*
 * 创建一个具有空洞的文件
 */
#include <fcntl.h>
#include <iostream>
#include <unistd.h>

using namespace std;

char buf1[] = "abcdefghij";
char buf2[] = "ABCDEFGHIJ";

void createHole(const char* filepath, int holeSize = 0) {
  int fd = creat(filepath, S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH);
  if (fd < 0) {
    cerr << "create error" << endl;
    exit(1);
  } // offset=0
  if (write(fd, buf1, 10) != 10) {
    cerr << "buf1 write error" << endl;
    exit(1);
  } // offset=10
  if (lseek(fd, holeSize, SEEK_CUR) == -1) {
    cerr << "lseek error" << endl;
    exit(1);
  } // offset=10+holeSize
  if (write(fd, buf2, 10) != 10) {
    cerr << "buf2 write error" << endl;
    exit(1);
  } // offset=20+holeSize
}

int main() {
  createHole("hole_0.txt", 0);
  createHole("hole_1024.txt", 4096 * 4);
  return 0;
}