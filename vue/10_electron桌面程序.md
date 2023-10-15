# 一、准备

Electron 使用 Node.js（作为后端）和Chromium（作为前端）开放桌面GUI程序。

## 1. 安装和配置

```bash
pnpm install electron -D
```

electron28之前是不支持esm的，目前默认安装的是v27，可以安装预览版

```bash
pnpm install electron@v28.0.0-alpha.2 -D
```

electron 安装完后需要从 github 下载文件，国内网络可能会出现 `Running postinstall script, failed in 21.3s` 的错误。

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

## 2. 结合 vite 使用

### 1. 创建electron窗口的代码

```typescript
// background.ts
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
});

// 当所有窗口都被关闭后退出应用
// electron官网的示例，darwin是macOS的内核名称
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

### 2. 编写开发时的插件

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

let electron_path: string = String(electron); // electron.exe 的绝对路径

// 启动electron前的准备工作
function beforeElectron() {
  // electron 无法识别ts文件，需要先编译成js文件
  esbuild.buildSync({
    entryPoints: ["src/background.ts"],
    bundle: true,
    outfile: "dist/background.js",
    platform: "node",
    target: "node12",
    format: "esm", // esm模块化
    external: ["electron"], // 不打包electron
  });
}

// vite插件对象必须有name属性
export const viteElectronDev = (): Plugin => {
  return {
    name: "electron-dev",
    // 配置 vite 开发服务器
    configureServer(server) {
      // 监听vite服务器的启动事件
      server.httpServer?.once("listening", () => {
        // 读取vite服务器的端口号
        const addressInfo = server.httpServer?.address() as AddressInfo;
        // IP地址
        const IP = `http://localhost:${addressInfo.port}`;

        // 通过子进程启动electron
        beforeElectron();
        let electronProcess = spawn(electron_path, ["./dist/background.js", IP]);

        // 监听窗口文件的变化，实现窗口热更新
        const fsWatchHandle = fs.watch("./src/background.ts", () => {
          // 重启electron
          if (electronProcess) {
            electronProcess.kill(); // 杀死当前electron进程
          }
          beforeElectron();
          electronProcess = spawn(electron_path, ["./dist/background.js", IP]);
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
};
```

将插件加入 vite 配置中

```typescript
import { viteElectronDev } from "./plugins/vite.electron.dev";
export default defineConfig({
  plugins: [viteElectronDev()],
});
```

### 2. 编写打包时的插件

