/* alloc函数通常通过sbrk系统调用实现（要求的空间大于指定值时会转用mmap实现）
 * sbrk增大program break（也是堆顶地址），并返回原program break
 * brk系统调用直接设置program break
 * 由于第一次调用printf时，堆会增长，所以将printf放在最后
 */
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int bss_end;

int main() {
  void* pb1 = sbrk(0); // 堆的顶地址（此处也是堆底地址）
  sbrk(1); // 堆顶地址增加1
  void* pb2 = sbrk(0);
  char* p = (char*)malloc(1); // 会导致堆增长（>1字节）
  void* pb3 = sbrk(0);
  free(p); // 释放分配的空间，放在malloc池中而不会归还给内核（不会缩小堆）
  void* pb4 = sbrk(0);
  printf("%16s: %p\n", "bss_end", &bss_end + sizeof(bss_end)); // ≠ pb1，bss段和堆并非紧邻
  printf("%16s: %p\n", "heap start", pb1);
  printf("%16s: %p\n", "after sbrk(1)", pb2);
  printf("%16s: %p\n", "malloc(1)", p);
  printf("%16s: %p\n", "after malloc", pb3);
  printf("%16s: %p\n", "after free", pb4);

  // 验证pb1是堆的起始地址
  brk(pb1);
  void* pb5 = sbrk(0);
  brk(pb1 - 1);
  void* pb6 = sbrk(0);
  brk(pb1 + 1);
  void* pb7 = sbrk(0);
  printf("%16s: %p\n", "after brk(pb1)", pb5);
  printf("%16s: %p\n", "after brk(pb1-1)", pb6); // 不能小于pb1
  printf("%16s: %p\n", "after brk(pb1+1)", pb7); // 成功设置为pb1+1
  return 0;
}