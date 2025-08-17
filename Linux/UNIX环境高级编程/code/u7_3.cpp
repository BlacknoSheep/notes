/* 注册终止处理程序 */
#include <iostream>
using namespace std;

void my_exit1() {
  cout << "first exit handler" << endl;
}

void my_exit2() {
  cout << "second exit handler" << endl;
}

int main() {
  if (atexit(my_exit2) != 0) {
    cerr << "can't register my_exit2" << endl;
    exit(0);
  }
  if (atexit(my_exit1) != 0) {
    cerr << "can't register my_exit1" << endl;
    exit(0);
  }
  if (atexit(my_exit1) != 0) {
    cerr << "can't register my_exit1" << endl;
    exit(0);
  }
  return 0;
}