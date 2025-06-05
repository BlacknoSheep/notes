基本模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

# 一、html 标签

## 0. tips

1. html 标签名不区分大小写。

2. 可以省略关闭空元素。（推荐不省略）

   ```html
   <hr />
   <hr>
   ```

3. 属性值只要不包含特殊字符，可以不加引号。

   ```html
   <img src="114514" onerror="alert('xss 114514')" />
   <!-- 编译器可能会检查有错，但是可以正常在浏览器中执行 -->
   <img src=2233 onerror=alert("xss_2233");>
   ```

4. 有些属性可以只有属性名，省略属性值。

   ```html
   <input type="checkbox" checked="checked">
   <input type="checkbox" checked>
   ```

   

## 1. `<meta>` 标签

编码格式

```html
<meta charset="UTF-8" />
```

兼容模式

```html
<!-- 有Chrome Frame就用chrome内核渲染，没有就用最高版本的IE进行渲染 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```

移动端适配

```html
<!-- 将页面宽度设置为设备宽度，初始缩放设置为1.0 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

页面重定向

```html
<!-- 3秒后重定向 -->
<meta http-equiv="refresh" content="3;url=https://www.baidu.com">
```

## 2. `<a>` 标签

```html
<a href="#" >回到顶部</a>
<a href="#bottom">去底部</a>
<a href="https://www.baidu.com" target="_self">当前标签页中打开（默认值）</a>
<a href="https://www.baidu.com" target="_blank">新标签页中打开</a>
<a href="javascript:;">这个超链接什么也不做</a>
```

# 二、BEM命名规范

块（block）、元素（element）、修饰符（modifier）

```css
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```
