# 镜像源

## 1. pip 镜像源

**注意：**

1. pytorch 国内镜像只有 cpu 版，gpu 版要从官方源下载。

   ```bash
   pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu129
   ```

   可以手动下载后安装本地的 `.whl` 包。

   ```bash
   pip install xxx.whl
   ```

### 1.1 windows

在文件资源管理器地址栏输入`%appdata%`，回车进入`C:\Users\<用户名>\AppData\Roaming`目录，创建`pip/pip.ini`文件。

```ini
[global]
timeout = 6000
index-url=http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host=mirrors.aliyun.com
```



