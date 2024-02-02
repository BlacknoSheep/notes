# 在 Ubuntu 中使用 s-nail 发送 qq 邮件

参考：https://www.yangdx.com/2021/06/191.html （该教程已过时，按照该教程配置可以成功发送邮件，但是会有警告）

https://github.com/ttionya/vaultwarden-backup/issues/117#issuecomment-1691443179

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

