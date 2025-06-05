# 一、准备

Electron 使用 Node.js（作为后端）和Chromium（作为前端）开放桌面GUI程序。

**关于代理：**

> 如果使用的是clash，可以通过开启 TUN Mode （注意先点击 Service Mode 并安装）来实现真正的全局代理（浏览器、软件、命令等都走代理），也就不需要手动配置环境变量和代理了。
>
> 可以参考[这篇博客](https://blog.revincx.icu/posts/proxy-summary/)。

## 1. 安装和配置

```bash
pnpm install electron -D
pnpm install electron-builder -D # 打包工具
```

electron28之前是不支持esm的，目前默认安装的是v27，可以安装预览版

```bash
pnpm install electron@v28.0.0-alpha.2 -D
```

### 1.1 配置 electron 的代理

electron 安装完后需要从 github 下载文件，国内网络可能会出现 `Running postinstall script, failed in 21.3s` 的错误。

**方案一：配置代理**

根据报错信息，找到

```javascript
// node_modules\.pnpm\@electron+get@2.0.3\node_modules\@electron\get\dist\esm\index.js 第 14~16行
// 需要在环境变量中设置 ELECTRON_GET_USE_PROXY=1
if (process.env.ELECTRON_GET_USE_PROXY) {
    initializeProxy();
}
```

```javascript
// 找到 initializeProxy() 函数
// 关键代码：
const env = getEnv('GLOBAL_AGENT_'); // 环境变量前缀
setEnv('GLOBAL_AGENT_HTTP_PROXY', env('HTTP_PROXY'));
setEnv('GLOBAL_AGENT_HTTPS_PROXY', env('HTTPS_PROXY'));
setEnv('GLOBAL_AGENT_NO_PROXY', env('NO_PROXY'));
```

综上，设置以下环境变量

**注1：首先确定自己使用的命令行工具 **

**注2：alpha 版和 nightly 版存在 [bug](https://github.com/electron/get/issues/215)，如果设置 https 代理会报错**

```bash
# 如果使用 cmd
set ELECTRON_GET_USE_PROXY=1
set GLOBAL_AGENT_HTTP_PROXY=http://127.0.0.1:7890 # 改成自己的代理。
set GLOBAL_AGENT_HTTPS_PROXY=https://127.0.0.1:7890 # 如果安装alpha或nightly版，不要设置这项。
```

```powershell
# 如果使用 powershell
$env:ELECTRON_GET_USE_PROXY=1
$env:GLOBAL_AGENT_HTTP_PROXY="http://127.0.0.1:7890"
$env:GLOBAL_AGENT_HTTPS_PROXY="https://127.0.0.1:7890" # 如果安装alpha或nightly版，不要设置这项。
```

**方案二：配置国内镜像**

网上教程很多，就不赘述了。

### 1.2 配置 electron-builder 的代理

electron-builder 在打包时需要依赖文件，若缓存中没有则会从github下载，国内网络可能会报错。

**方案一：配置build进程的代理**

通过报错信息，找到

```javascript
// node_modules\.pnpm\builder-util@24.5.0\node_modules\builder-util\out\util.js 第63~77行
// 可以看出，默认返回当前进程的 env
function getProcessEnv(env) {
    if (process.platform === "win32") {
        return env == null ? undefined : env;
    }
    const finalEnv = {
        ...(env || process.env),
    };
    // ...
    return finalEnv;
}
```

阅读 `util.js` 内的其他代码可知，在通过子进程执行下载命令时，执行环境会通过 `getProcessEnv()` 获取，因此只需要在执行 `build` 命令前设置好当前进程环境变量中的代理即可。

```bash
# cmd
set http_proxy=http://127.0.0.1:7890
set https_proxy=http://127.0.0.1:7890
```

```powershell
# powershell
$env:http_proxy="http://127.0.0.1:7890"
$env:https_proxy="http://127.0.0.1:7890"
```

**方案二：使用镜像**

网上教程很多，就不赘述了。

**方案三：手动下载所需文件并放入windows缓存**

根据报错信息，需要下载以下文件（版本可能会有差异）

- winCodeSign: https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z
- nsis: https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z
- nsis-resources-3.4.1: https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.4.1/nsis-resources-3.4.1.7z

下载好对应文件后，放入 windows 缓存文件夹中：

- winCodeSign：下载并解压，放到 `C:\Users\[你的用户名]\AppData\Local\electron-builder\Cache\winCodeSign`下。

- nsis：下载并解压，放到 `C:\Users\[你的用户名]\AppData\Local\electron-builder\Cache\nsis`下。
- nsis-resources-3.4.1：下载并解压，放到 `C:\Users\[你的用户名]\AppData\Local\electron-builder\Cache\nsis`下。

## 2. 结合 vite 使用

### 2.1. 创建electron窗口的代码

```typescript
// electron_main.ts
import { app, BrowserWindow } from "electron";

function createWindow() {
  // 创建窗口
  const win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程中使用node api, 默认为false
      contextIsolation: false, // 是否启用沙箱模式, 默认为true
      webSecurity: false, // 是否启用跨域检测, 默认为true
    },
  });
  // win.webContents.openDevTools(); // 开启调试工具

  // 加载页面
  if (process.argv[2]) {
    // 当前进程的命令行参数
    win.loadURL(process.argv[2]); // 开发环境
  } else {
    win.loadFile("index.html"); // 生产环境
  }
}

// Electron 会在初始化完成并且准备好创建浏览器窗口时调用这个方法
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

### 2.2. 编写开发时的插件

目的：在vite开发服务器启动时，自动创建electron窗口。

```typescript
// vite.electron.dev.ts
/* 开发环境的插件 */
import type { Plugin } from "vite";
import { AddressInfo } from "net";
import { spawn } from "child_process";
import electron from "electron";
import esbuild from "esbuild";
import fs from "node:fs";

let electronPath: string = String(electron); // electron.exe 的绝对路径
let electronMainPathTS: string = "src/electron_main.ts";
let electronMainPath: string = "dist/electron_main.js"; // electron应用的入口文件路径

// 编译electron应用的入口文件
function buildMain() {
  // electron 无法识别ts文件，需要先编译成js文件
  esbuild.buildSync({
    entryPoints: [electronMainPathTS],
    bundle: true,
    outfile: electronMainPath,
    platform: "node",
    target: "node12",
    format: "esm", // esm模块化
    external: ["electron"], // 不打包electron
  });
}

// vite插件对象必须有name属性
export function viteElectronDev(): Plugin {
  return {
    name: "electron-dev",
    // 配置 vite 开发服务器
    configureServer(server) {
      buildMain();
      
      // 监听vite服务器的启动事件
      server.httpServer?.once("listening", () => {
        // 读取vite服务器的端口号
        const addressInfo = server.httpServer?.address() as AddressInfo;
        // IP地址
        const IP = `http://localhost:${addressInfo.port}`;

        // 启动electron
        let electronProcess = spawn(electronPath, [electronMainPath, IP]);

        // 监听窗口文件的变化
        const fsWatchHandle = fs.watch(electronMainPathTS, () => {
          // 重启electron
          if (electronProcess) {
            electronProcess.kill(); // 杀死当前electron进程
          }
          buildMain();
          electronProcess = spawn(electronPath, [electronMainPath, IP]);
        });

        // 监听electron进程的输出
        electronProcess.stdout.on("data", (data) => {
          console.log(`日志：${data}`);
        });

        // vite服务器关闭时，关闭electron进程，并清除监听
        server.httpServer?.once("close", () => {
          if (electronProcess) {
            // 不关闭的话，vite服务器每次重启都会创建一个新的electron进程，出现多个窗口，cpu爆炸
            electronProcess.kill();
          }
          // 不清除的话，每次重启vite服务器都会添加一个新的监听，当窗口文件发生更新时，会一次创建多个electron进程
          fsWatchHandle.close();
        });
      });
    },
  };
}
```

将插件加入 vite 配置中

```typescript
import { viteElectronDev } from "./plugins/vite.electron.dev";
export default defineConfig({
  plugins: [viteElectronDev()],
});
```

### 2.3. 编写打包时的插件

```typescript
// vite.electron.build.ts
/* 生产环境的插件 */
import type { Plugin } from "vite";
import electron from "electron";
import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import * as electronBuilder from "electron-builder";

let electronPath: string = String(electron); // electron.exe 的绝对路径
let electronMainPathTS: string = "src/electron_main.ts";
let electronMainPath: string = "dist/electron_main.js"; // electron应用的入口文件路径

// 编译electron应用的入口文件
function buildMain() {
  // electron 无法识别ts文件，需要先编译成js文件
  esbuild.buildSync({
    entryPoints: [electronMainPathTS],
    bundle: true,
    outfile: electronMainPath,
    platform: "node",
    target: "node12",
    format: "esm", // esm模块化
    external: ["electron"], // 不打包electron
  });
}

// 需要等待vite打包完成后，生成index.html后，再启动electron进行打包
// 注意：vite打包后的文件在dist目录下，所以需要在该目录下添加package.json文件
export function viteElectronBuild(): Plugin {
  return {
    name: "electron-build",
    closeBundle() {
      buildMain();

      // 在dist目录创建package.json文件并修改main属性
      let packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
      packageJson.main = "electron_main.js";
      fs.writeFileSync("dist/package.json", JSON.stringify(packageJson, null, 2));
      fs.mkdirSync("dist/node_modules"); // 创建node_modules目录，阻止electron builder下载垃圾文件

      // electron-builder打包
      electronBuilder.build({
        config: {
          directories: {
            output: path.resolve(process.cwd(), "release"), // 打包输出目录
            app: path.resolve(process.cwd(), "dist"), // electron应用的入口文件所在目录
          },
          files: ["**/*"], // 需要打包的文件
          asar: true, // 是否打包成asar文件
          appId: "com.example.app", // 应用id
          productName: "electron-vite", // 应用名称
          nsis: {
            oneClick: false, // 取消一键安装
            allowToChangeInstallationDirectory: true, // 允许用户选择安装目录
          },
        },
      });
    },
  };
}
```

将插件加入 vite 配置中

```typescript
import { viteElectronBuild } from "./plugins/vite.electron.build";
export default defineConfig({
  plugins: [viteElectronDev(), viteElectronBuild()],
  base: "./", // 默认是绝对路径，要改成相对路径，否则打包后的文件会出现白屏
});
```



