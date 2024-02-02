1. 时区

   修改时区为东八区：在`/etc/crontab`文件中添加

   ```bash
   CRON_TZ=Asia/Shanghai
   TZ=Asia/Shanghai
   ```

   然后重启`crontab`

   ```bash
   sudo service cron restart
   ```

   

2. 中文编码

   ```bash
   # 使用中文编码，防止邮件发送失败（只要设置LC_TIME就行了，LANG不用设置）
   export LC_TIME=C.UTF-8
   # export LANG=C.UTF-8
   ```

   