/* 打印环境变量 */
#include <iostream>
using namespace std;

extern char** environ; // 环境指针
int main(int argc, char* argv[], char* envp[]) {
  int n = 0;
  for (int i = 0; i < 5 && envp[i] != NULL; ++i) {
    cout << envp[i] << ", "; // (1)
  }
  cout << endl;
  for (int i = 0; i < 5; ++i) {
    cout << environ[i] << ", "; // (2)：与(1)输出相同
  }
  cout << endl;
  return 0;
}