# 一、直接看[文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

# 二、[外边距重叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing) 、高度塌陷和 [BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

高度塌陷：子元素全浮动，导致父元素不会被撑开。

通过设置`overflow: hidden;` 可以开启 BFC ，解决高度塌陷的问题。

通过 `clearfix` 类可以同时解决外边距重叠和高度塌陷的问题。

```css
.clearfix::before,
.clearfix::after {
  content: " ";
  display: table;
  clear: both;
}
```

