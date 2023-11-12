# 一、vite.config.ts

## 1. 指定不需要打包的文件

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      "~": path.resolve("./"),
    },
  },
  // 使用相对路径，保证打包后路径的可用性
  base: "./",
  build: {
    rollupOptions: {
      // 外部化依赖，不会打包到库中 https://cn.rollupjs.org/configuration-options/#external
      external: ["vue", "element-plus", "element-plus/dist/index.css"],
      // output: {
      //   // https://cn.rollupjs.org/configuration-options/#output-globals
      //   // 实测并没有什么卵用
      //   globals: {
      //     vue: "Vue",
      //     "element-plus": "ElementPlus",
      //   },
      // },
    },
  },
});
```

## 2.简易的cdn引入插件：

如果改用cdn引入，需要自己写插件。

首先在 tsconfig.node.json 中添加：

```json
// tsconfig.node.json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./*"]
    }
  },
  "include": ["vite.config.ts", "plugins/**/*.ts", "plugins/**/*.d.ts"]
}
```

然后创建以下文件：

```typescript
// ./plugins/rollup-plugin-external-import-rewrite/index.ts
/*
通过字符串替换的方式，将打包好的js文件中的import语句改为全局变量，并在html文件中添加cdn链接
!!!: 请务必设置 viteconfig.build.minify:true（默认值），否则可能会替换失败
!!!: 使用前请确保先格式化代码
!!!: 由于是全局字符串替换，可能会导致对包含import语句的字符串进行更改
*/
import type { Plugin } from "~/node_modules/.pnpm/rollup@3.29.4/node_modules/rollup/dist/rollup.d.ts";

interface CdnImportMap {
  // key: 要从外部导入的包名
  [key: string]: {
    globalVal: string; // 对应的全局变量，""表示删除该import语句（如删除css）
    cdn?: string; // 对应的cdn地址
  };
}

export default function CdnImportPlugin(map: CdnImportMap): Plugin {
  const externals = Object.keys(map);
  return {
    name: "external-import-rewrite",
    version: "0.0.1",
    generateBundle(options, bundle) {
      for (const filename in bundle) {
        if (filename.endsWith(".js")) {
          // 将js文件中的import语句改为全局变量
          let code: string = bundle[filename]["code"];
          // 读取所有import语句
          const regex = RegExp(`import.+?";`, "g");
          const ipts = code.match(regex);
          const replaceMap = new Map<string, string>(); // 需要替换的import语句
          for (const ipt of ipts) {
            let replaceIpt: string = ipt; // 替换后的import语句
            const iptSource: string = ipt.split(`"`).at(-2);
            if (externals.includes(iptSource)) {
              if (!ipt.includes("from")) {
                replaceMap.set(ipt, map[iptSource].globalVal);
                continue;
              }
              const iptTarget: string = map[iptSource].globalVal;
              // 拆分如 import Vue, { createApp } from "vue"; 的语句
              replaceIpt = replaceIpt.replace(/,\s?{/, ` from"${iptSource}";import{`);
              // 删除与全局变量同名的import语句
              replaceIpt = replaceIpt.replace(new RegExp(`import ${iptTarget} from.+?";`, "g"), "");
              // 替换 as 为 :
              replaceIpt = replaceIpt.replace(/ as /g, ":");
              // 替换 import 为 const
              replaceIpt = replaceIpt.replace(/import([ {])/g, "const $1");
              // 替换 from 为 =
              replaceIpt = replaceIpt.replace(/from(\s?")/g, "=$1");
              // 替换external包名为全局变量
              replaceIpt = replaceIpt.replace(new RegExp(`['"]${iptSource}['"]`, "g"), iptTarget);
              replaceMap.set(ipt, replaceIpt);
            }
          }
          // console.log(replaceMap);
          // 对code进行替换
          console.log("\n");
          replaceMap.forEach((value, key) => {
            code = code.replace(key, value);
            // console.log(`\x1b[32m[external-import-rewrite]\x1b[0m ${key} => ${value}`);
          });
          bundle[filename]["code"] = code;
        } else if (filename == "index.html") {
          let code: string = bundle[filename]["source"];
          // title标签行的缩进
          const indent: string = code.match(/(?<=\n)(\s*)<title>/)?.[1];
          // 在html文件中添加cdn链接
          let replaceHtml: string = "</title>\n";
          for (const external of externals) {
            const cdn: string = map[external].cdn;
            if (cdn) {
              if (cdn.endsWith(".css")) {
                replaceHtml += `${indent}<link rel="stylesheet" href="${cdn}">\n`;
              } else {
                replaceHtml += `${indent}<script src="${cdn}"></script>\n`;
              }
            }
          }
          code = code.replace("</title>\n", replaceHtml);
          bundle[filename]["source"] = code;
        }
      }
    },
  };
}

export { CdnImportMap };
```

在 vite.config.ts 中配置

```typescript
// vite.config.ts
import { defineConfig } from "vite";
// 重写外部导入，以对接cdn导入
import CdnImportPlugin, { CdnImportMap } from "./plugins/rollup-plugin-cdn-import";

const externalMap: CdnImportMap = {
  vue: {
    globalVal: "Vue",
    cdn: "https://unpkg.com/vue@3/dist/vue.global.prod.js",
  },
  "element-plus": {
    globalVal: "ElementPlus",
    cdn: "https://unpkg.com/element-plus@2.4.2/dist/index.full.js",
  },
  "element-plus/dist/index.css": {
    globalVal: "",
    cdn: "https://unpkg.com/element-plus/dist/index.css",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // 外部化依赖，不会打包到库中 https://cn.rollupjs.org/configuration-options/#external
      external: [...Object.keys(externalMap)],
      plugins: [CdnImportPlugin(externalMap)],
    },
  },
});
```

# 二、[vite 环境变量](https://cn.vitejs.dev/guide/env-and-mode.html#env-variables-and-modes)

可通过 `import.meta.env` 获取当前的 vite 环境变量

在生产环境中，这些环境变量会在构建时被**静态替换**，因此，在引用它们时请使用完全静态的字符串。动态的 key 将无法生效。例如，动态 key 取值 `import.meta.env[key]` 是无效的。

可以在 `.env` 文件中添加自定义环境变量。

```bash
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略

# 开发环境：mode = development
# 生产环境：mode = production
```

自定义环境变量需要以 `VITE_` 开头，可以通过`$xxx` 引用其他环境变量，因此使用`$`时需要转义。

```bash
# 不会暴露给外部
KEY=123
NEW_KEY1=test$foo   # test
NEW_KEY2=test\$foo  # test$foo
NEW_KEY3=test$KEY   # test123

# 会暴露给外部
VITE_MODE=development
```



在运行 vite 命令时可以指定 mode ：`vite --mode development`

`vite.config.ts` 位于 node 环境而非 vite 环境，若想要读取 vite 环境变量：

```typescript
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default ({ mode }) => {
  console.log(loadEnv(mode, process.cwd()));

  return defineConfig({
    plugins: [vue()],
  });
};
```