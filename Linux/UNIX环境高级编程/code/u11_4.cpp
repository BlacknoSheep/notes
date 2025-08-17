#include <iostream>
#include <pthread.h>
#include <signal.h>
using namespace std;

void* thr_fn(void* arg) {
  cout << "new thread: " << "pid=" << getpid() << " tid=" << pthread_self() << endl;
  return nullptr;
}

int main() {
  pthread_t ntid;
  pthread_create(&ntid, nullptr, thr_fn, nullptr);
  cout << "main thread: " << "pid=" << getpid() << " tid=" << pthread_self() << endl;
  sleep(1); // 防止进程在新线程执行完前终止
  return 0;
}