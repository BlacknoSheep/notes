/*
    package.json
        - 是包的一个描述文件
        - node中通过该文件对项目进行描述
        - 每个node项目下都应该有一个package.json
        - 可以手动创建也可以通过 npm init 命令生成

    npm 命令
        npm init：初始化项目，创建package.json文件
        npm init -y：初始化项目，创建package.json文件（使用默认值）
        npm install 包名：将指定包下载到当前项目中
            1.会将包下载到node_modules目录下
            2.会在package.json的dependencies属性中添加一个新的属性
            3.会自动添加 package-lock.json 文件
        npm install：安装所有依赖包
        npm install -g：全局安装包

        npm uninstall 包名：卸载包
        npm uninstall -g：全局卸载包
*/

/*
    引入从 npm 下载的包时，不需要写路径，直接写包名即可
*/
const _ = require("lodash");
console.log(_)

