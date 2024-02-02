# SSH

1. 在 ubuntu 中，禁止密码登录需要**修改两个文件**：和 `/etc/ssh/sshd_config.d/50-cloud-init.conf` ：

   `PasswordAuthentication no`

   这是因为 `/etc/ssh/sshd_config` 中有一行 `Include /etc/ssh/sshd_config.d/*.conf` 。