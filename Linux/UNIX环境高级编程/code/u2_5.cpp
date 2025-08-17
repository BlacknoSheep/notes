/*
 * OPEN_MAX为一个进程最大可打开的文件数
 * 这个值属于运行时限制，在运行时才能获取
 * 这个值可能是不确定的
 */
#include <errno.h>
#include <iostream>
#include <limits>
#include <unistd.h>

using namespace std;

#ifdef OPEN_MAX
static long openmax = OPEN_MAX;
#else
static long openmax = 0;
#endif

#define OPEN_MAX_GUESS 256;

long get_openmax() {
  // 通常OPEN_MAX为固定值，故只在首次调用时获取
  if (openmax == 0) {
    errno = 0;
    if ((openmax = sysconf(_SC_OPEN_MAX)) < 0) {
      // 要获取的值不确定时，sysconf返回-1
      // sysconf出错时，也返回-1，同时将errno置为一个正整数
      if (errno == 0) {
        openmax = OPEN_MAX_GUESS; // OPEN_MAX值不确定，使用猜测值
      } else {
        cerr << "sysconf error for _SC_OPEN_MAX, errno: " << errno << endl;
        exit(1);
      }
    }
  }
  return openmax;
}

int main() {
  cout << "OPEN_MAX: " << get_openmax() << endl;
  return 0;
}