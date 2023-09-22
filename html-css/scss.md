https://www.sass.hk/docs/

# 常用语法

1. 嵌套规则

   ```scss
   #main {
     color: red;
     .a {
       width: 100px;
     }
   }
   ```

   ```css
   #main {
     color: red;
   }
   #main .a {
     width: 100px;
   }
   ```

2. 父选择器 `&`

   ```scss
   #main {
     .a {
       &:hover {
         color: red;
       }
     }
   }
   ```

   ```css
   #main .a:hover {
     color: red;
   }
   ```

3. 变量 `$`

   ```scss
   $width: 100px;
   $color: blue;
   $color: red !default;  // !default 若变量之前已被赋值，则忽略，否则对该变量进行赋值
   #main {
     width: $width;
     color: $color;
   }
   ```

   ```css
   #main {
     width: 100px;
     color: blue;
   }
   ```

4. 插值语句 `#{}`

   ```scss
   $name: foo;
   $attr: border;
   p.#{$name}123 { // 可以插入选择器中
     #{$attr}-color: blue; // 也可以插入属性名中
   }
   ```

   ```css
   p.foo123 {
     border-color: blue;
   }
   ```

5. `@at-root` 跳出嵌套

   ```scss
   #main {
     .parent {
       .child {
         color: red;
       }
       @at-root .ccc {
         color: blue;
       }
       @at-root {
         .ddd {
           color: green;
         }
       }
     }
   }
   ```

   ```css
   #main .parent .child {
     color: red;
   }
   .ccc {
     color: blue;
   }
   
   .ddd {
     color: green;
   }
   ```

6. 混合指令 `@mixin`

   ```scss
   @mixin clearfix {
     &:before,
     &:after {
       content: "";
       display: table;
     }
     &:after {
       clear: both;
     }
   }
   #main {
     .container {
       @include clearfix;
     }
   }
   ```

   ```css
   #main .container:before, #main .container:after {
     content: "";
     display: table;
   }
   #main .container:after {
     clear: both;
   }
   ```

   可以接受参数

   ```scss
   @mixin bold-text($size) {
     font-weight: bold;
     font-size: $size;
   }
   #main {
     .title {
       @include bold-text(20px);
     }
   }
   ```

   ```css
   #main .title {
     font-weight: bold;
     font-size: 20px;
   }
   ```