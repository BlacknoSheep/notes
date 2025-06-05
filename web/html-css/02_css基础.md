# 一、直接看文档

[文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

# 二、外边距重叠、高度塌陷和 BFC

[外边距重叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing) 

高度塌陷：子元素全浮动，导致父元素不会被撑开。

通过设置`overflow: hidden;` 可以开启 [BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) ，解决高度塌陷的问题。

通过 `clearfix` 类可以同时解决外边距重叠和高度塌陷的问题。

```css
.clearfix::before,
.clearfix::after {
  content: " ";
  display: table;
  clear: both;
}
```

# 三、bem命名规范

块（block）、元素（element）、修饰符（modifier）

```css
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```
