/*
 * 测试是否能对标准输入设置偏移量
 */
#include <iostream>
#include <string.h>
#include <unistd.h>

using namespace std;

int main() {
  if (lseek(STDIN_FILENO, 0, SEEK_CUR) == -1) {
    cout << "cannot seek" << ", Error: " << strerror(errno) << endl;
  } else {
    cout << "seek OK" << endl;
  }
}