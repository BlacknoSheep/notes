# 参考
> 在线epub：https://www.aming.work:8083/read/21470/epub
>
> 在线文档：https://www.ibm.com/docs/en/zos/3.1.0?topic=zos-xl-cc
>
> 代码和习题：https://github.com/MeiK2333/apue

# 1.4 文件和目录

目录（directory）是一个包含目录项的**文件**。

创建新目录时会自动创建两个文件名：`.`（指向当前目录），`..`（指向父目录）。

```c++
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
```

# 1.5 输入和输出

```c++
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
```

# 1.6 程序和进程

```c++
/*
 * 输出当前进程的进程ID
 */
#include <iostream>
#include <unistd.h>

using namespace std;
 
int main() {
  cout << "pid: " << getpid() << endl;
  return 0;
}
```

## 3. 进程控制

```c++
/*
 * 从标准输入中读取命令，然后在子进程中执行该命令
 */
#include <iostream>
#include <sys/wait.h>
#include <unistd.h>

using namespace std;

int main() {
  string cmd;
  pid_t pid;
  cout << "Please input a command: ";
  while (getline(cin, cmd)) {
    if (cmd.length() == 0) { // 输入为空
      continue;
    }

    // 创建子进程。对父进程返回子进程的pid（正整数），对子进程返回0
    if ((pid = fork()) < 0) {
      cerr << "fork error" << endl;
      return 1;
    } else if (pid == 0) { // 子进程
      execlp(cmd.c_str(), cmd.c_str(), (char*)0); // execlp会用新程序替换当前进程
      // 若执行成功，则下面的代码不会被执行
      cerr << "couldn't execute: " << cmd << endl;
      return 1;
    }

    // 父进程
    if ((pid = waitpid(pid, NULL, 0)) < 0) // 等待子进程结束，成功时返回子进程的pid，错误时返回-1
      cerr << "waitpid error" << endl;
    cout << "子进程" << pid << "结束" << endl;
  }
  return 0;
}
```

# 1.7 出错处理

```cpp
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
```

```bash
$ ./a.out
EACCES: Permission denied
./a.out: No such file or directory
```



# 1.8 用户标识

```bash
id  # 查看用户标识（用户id和组id）
groups # 查看用户所属的组，第一个为用户的初始组（即组id对应的组）
```

- 在创建用户时会同时确定用户的唯一 id，用户无法更改自己的 id（root 用户可以改其他用户的 id）。

- 在创建用户时会确定用户的组 id，这是用户的初始组 id，该用户创建的文件默认属于该组。

- 一个用户可以属于多个组。

# 1.9 信号

```c++
/*
 * 捕获中断信号
 */
#include <iostream>
#include <sys/wait.h>
#include <unistd.h>

using namespace std;

void sig_int(int signo) {
  cout << "捕获到中断信号，signo=" << signo << endl;
  cout << "当前进程id=" << getpid() << endl;
  exit(0); // 这里不退出就只能从命令行kill了
}

int main() {
  string s;
  if (signal(SIGINT, sig_int) == SIG_ERR) // 系统对SIGINT的默认方式是终止该进程
    cerr << "signal error" << endl;
  while (cin >> s);
  return 0;
}
```

