# 一、cookie

- 由于http是无状态协议（每次请求独立），服务器无法判断两次请求是否来自同一客户端。通过cookie可以对请求来源进行标识。
- 首次访问网站时，请求头中不携带cookie信息，当浏览器接收到服务端返回的cookie后，会保存cookie，并在下次访问该网站时，在请求头的 `Set-Cookie` 字段中带上cookie。（一个请求头可以有多个 `Set-Cookie` 字段）
- cookie与域名绑定，无法在不同域名下获取使用（如aaa.xxx.com下的cookie无法在bbb.xxx.com下访问）。但是，父域名的cookie也会被包含在子域名的cookie中（如xxx.com下的cookie会被包含在aaa.baidu.com的cookie中）。
- 一般的浏览器会限制一次请求可发送的cookie的数量和长度。