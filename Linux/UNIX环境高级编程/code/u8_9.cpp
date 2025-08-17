/* 父子进程之间存在竞争 */
#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

static void charatatime(const char* s) {
  setbuf(stdout, NULL); // 将标准输出设置为无缓冲
  for (int c; (c = *s++) != 0;) {
    putchar(c);
  }
  return;
}

int main() {
  pid_t pid = fork();
  if (pid == 0) { // 子进程
    charatatime(
        "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc\n");
  } else { // 父进程
    charatatime(
        "pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp\n");
  }
  return 0;
}
