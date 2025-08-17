/*
 * 将标准输入复制到标准输出
 * 可以复制任意UNIX普通文件（文本、二进制等）：./outfile <test.txt >test2.txt
 */
#include <iostream>
using namespace std;

int main() {
  int c; // 注意：如果是char类型则只能复制文本，不能复制二进制文件
  while ((c = cin.get()) != EOF) // 从标准输入流中读取字符
    cout.put(c); // 输出字符到标准输出流
  return 0;
}