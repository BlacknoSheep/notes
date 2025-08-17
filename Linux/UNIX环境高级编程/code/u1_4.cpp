/* 输出目录下所有的文件名 */
#include <dirent.h>
#include <iostream>

using namespace std;

int main(int argc, char* argv[]) {
  DIR* dp; // 指向dir流的指针
  struct dirent* dirp; // dirent结构用于存储目录项的信息

  if (argc != 2) {
    cerr << "usage: ls directory_name" << endl;
    return 1;
  }

  if ((dp = opendir(argv[1])) == NULL) { // 打开目录文件
    cerr << "can't open " << argv[1] << endl;
    return 1;
  }

  while ((dirp = readdir(dp)) != NULL) { // 从dir流中读取目录项
    cout << dirp->d_name << endl;
  }

  closedir(dp);
  return 0;
}