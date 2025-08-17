/* 修改环境表（只影响当前进程及其子进程）
 * 由于环境表和环境字符串位于地址空间顶部，所以无法向上扩展，下方是栈，所以也无法向下扩展
 */
#include <iostream>

extern char** environ; // 环境指针，指向环境表

int main() {
  printf("%p\n", environ);
  putenv("MYENV=hello"); // 增加一项
  printf("%p\n", environ); // 由地址空间顶部移动到了堆中
  printf("%p\n", environ[0]); // 除新增的外，环境字符串仍在原地址空间顶部
}