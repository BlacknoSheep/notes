/* 主线程从标准输入接收字符串并放入消息队列，
 * 两个线程从队列中取出消息并打印。
 */
#include <iostream>
#include <pthread.h>
#include <queue>
#include <unistd.h>
using namespace std;

queue<string> qmsg; // 消息队列
pthread_mutex_t qlock;
pthread_cond_t qready;

void* thr_fn(void* arg) { // 从队列中取出一条消息并处理
  string msg;
  while (true) {
    pthread_mutex_lock(&qlock);
    while (qmsg.empty()) pthread_cond_wait(&qready, &qlock);
    msg = qmsg.front();
    qmsg.pop();
    pthread_mutex_unlock(&qlock);
    sleep(3); // 模拟处理耗时
    cout << "thread " << pthread_self() << " processed: " << msg << endl;
  }
  return ((void*)0);
}

int main() {
  pthread_mutex_init(&qlock, NULL);
  pthread_cond_init(&qready, NULL);
  pthread_t tid1, tid2;
  pthread_create(&tid1, NULL, thr_fn, NULL);
  pthread_create(&tid2, NULL, thr_fn, NULL);
  string msg;
  while (cin >> msg) {
    if (msg == "q") break;
    pthread_mutex_lock(&qlock);
    qmsg.emplace(msg);
    pthread_mutex_unlock(&qlock);
    pthread_cond_signal(&qready); // 通知在等待的某一线程
    // pthread_cond_broadcast(&qready);
  }
  return 0;
}