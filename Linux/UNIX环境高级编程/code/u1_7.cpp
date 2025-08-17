/*测试两个出错处理函数*/
#include <errno.h>
#include <iostream>
#include <string.h> // strerror

using namespace std;

int main(int argc, char* argv[]) {
  cerr << "EACCES: " << strerror(EACCES) << endl;
  errno = ENOENT;
  perror(argv[0]);
}
