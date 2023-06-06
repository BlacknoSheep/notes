### CSRF（Cross Site Request Forgery，跨站域请求伪造）攻击
>参考 https://blog.csdn.net/weixin_44211968/article/details/124703525

![csrf](../imgs/csrf.png)


### 防御CSRF攻击
1. 大部分浏览器都不会再跨域的情况下自动发送cookie
2. 使用 referer 头来检查请求的来源
3. 使用验证码
4. 尽量使用post请求（结合token）

#### token（令牌）
可以在创建表单时随机生成一个令牌，然后将令牌存储到session中，并通过模板发送给用户。
用户在提交表单时，必须将token返回
