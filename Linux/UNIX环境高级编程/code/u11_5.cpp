#include <iostream>
#include <pthread.h>
#include <signal.h>
using namespace std;

void* thr_fn1(void* arg) {
  cout << "thread1 returning" << endl;
  return ((void*)1);
}

void* thr_fn2(void* arg) {
  cout << "thread2 exiting" << endl;
  return ((void*)2);
}

int main() {
  pthread_t tid;
  void* trval;
  int err;
  if (err = pthread_create(&tid, nullptr, thr_fn1, nullptr)) {
    cerr << err << ", can't create thread 1" << endl;
    exit(1);
  }
  if (err = pthread_join(tid, &trval)) {
    cerr << err << ", can't join with thread 1" << endl;
    exit(1);
  }
  cout << "thread 1 exited, tid=" << tid << ", code=" << (long)trval << endl;

  if (err = pthread_create(&tid, nullptr, thr_fn2, nullptr)) {
    cerr << err << ", can't create thread 2" << endl;
    exit(1);
  }
  if (err = pthread_join(tid, &trval)) {
    cerr << err << ", can't join with thread 2" << endl;
    exit(1);
  }
  cout << "thread 2 exited, tid=" << tid << ", code=" << (long)trval << endl;
  return 0;
}