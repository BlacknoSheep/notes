# 1. 输入输出

## 1.1 输出重定向

linux 中有三个输入输出流

- 0：标准输入（stdin）

- 1：标准输入（stdout）

- 2：标准错误（stderr）

```bash
[command] >/dev/null
[command] >log.txt  # 重定向标准输出到文件
[command] 2>log.txt  # 重定向标准错误到文件
[command] >log.txt 2>&1  # 将标准错误、标准输出都重定向到文件，注意：2>&1 要放在 >log.txt 后面
# > 表示覆盖文件，>> 表示在文件末尾追加
```

同时输出到文件和屏幕

```bash
[command] 2>&1 | tee log.txt
```

# 2. screen

命令

```bash
screen -S test # 创建一个名为 test 的screen并进入
screen -r test # 恢复并进入 test screen
screen -R test # 若test已存在，则进入，否则创建并进入
screen -ls # 显示已有screen
screen -list # 显示已有screen
screen -X -S [会话名] quit # 删除指定screen
```

快捷键

ctrl+a+d：退出当前 screen

ctrl+d：删除当前 screen

# 3. 修改系统时区

修改软链接

```bash
sudo ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

# 4. 挂载

将文件系统挂载到目录（挂载点）上。

- 确保挂载点为空目录。否则该目录下的内容会被暂时隐藏，卸载后会重新出现。

```bash
sudo fdisk -l  # 查看分区，u盘或硬盘一般为 /dev/sda1
sudo mount /dev/sda1 /path/to/empty-folder # 将硬盘挂载到文件目录，
df -h  # 查看是否已挂载
cd /path/to/empty-folder  # 访问硬盘中的内容
sudo umount /dev/sda1  # 卸载硬盘
```

# 5. crontab

功能：执行计划任务。

## 5.1 准备

修改时区为东八区：在`/etc/crontab`文件中添加

```bash
CRON_TZ=Asia/Shanghai
TZ=Asia/Shanghai
```

然后重启 cron 服务

```bash
sudo service cron restart
```

## 5.2 设置计划任务

> 参考：https://www.runoob.com/linux/linux-comm-crontab.html

# 6. SSH

1. 在 ubuntu 中，禁止密码登录需要**修改两个文件**：`/etc/ssh/sshd_config` 和 `/etc/ssh/sshd_config.d/50-cloud-init.conf` ：

   `PasswordAuthentication no`

   这是因为 `/etc/ssh/sshd_config` 中有一行 `Include /etc/ssh/sshd_config.d/*.conf` 。

# 7. 在 Ubuntu 中使用 s-nail 发送 qq 邮件

> 参考：https://www.yangdx.com/2021/06/191.html （该教程已过时，按照该教程配置可以成功发送邮件，但是会有警告）
>
> https://github.com/ttionya/vaultwarden-backup/issues/117#issuecomment-1691443179

1. 安装 `s-nail`

   ```bash
   sudo apt install s-nail
   ```

2. 编辑 `/etc/s-nail.rc` 配置文件，在末尾添加：

   ```bash
   # >>>for qq mail>>>
   set smtp-auth=login
   set smtp-use-starttls
   set v15-compat
   set from=xxxxxxxx@qq.com
   set mta=smtp://xxxxxxxx%40qq.com:授权码@smtp.qq.com:587
   # <<<for qq mail<<<
   ```

   授权码可以在qq邮箱（网页端）的 `设置 -> 账号 -> POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务` 处获取。

   注意： `set mta` 这一行在写账号时，<span style="color: red"> `@` 要写成 `%40` </span>，否则会报错。

3. 发送邮件

   ```bash
   # send-mail.sh
   # 使用中文编码，防止邮件发送失败（只要设置LC_TIME就行了，LANG不用设置）
   export LC_TIME=C.UTF-8
   # export LANG=C.UTF-8
   
   # 发送邮件
   echo "邮件正文" | s-nail -s "标题" "收件地址"
   
   # 或者从文件发送
   s-nail -s "标题" "收件地址" < "my-mail.txt"
   ```

