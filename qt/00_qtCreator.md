# 创建项目

## 选择模板

1. Qt Widgets Application

   普通窗口，支持桌面平台，使用 C++ 编写。

2. Qt Quick Application

   支持所有平台（桌面、移动端、嵌入式），使用 QML 和 C++ 编写，可以创建特效丰富的窗口。

   难度低，整体更偏向前端。

## 选项

1. 构建系统：qt 项目选 qmake。

2. Details->Base class：要创建的窗口继承的基类

   QMainWindow：包含菜单栏、工具栏和状态栏的窗口（直接运行可能看不出和普通窗口的区别，预编译生成的 ui 头文件里可以看到区别）。

   QWidget：是所有界面组件的基类，也可以作为一个独立的窗口。普通空白窗口。

   QDialog：对话框。

3. Details->Generate form：是否生成 .ui 文件。

4. Translation：添加其他语言的翻译。

5. 选择编译器、Debugger 等，默认的 MinGW 就行。

## 项目文件

### .pro 文件

项目的配置文件，包含编译时需要的信息等。

### .ui 文件

可以双击 .ui 文件后在设计模式下可视化编辑窗口。

也可以不勾选 Generate form 进行纯代码开发。

