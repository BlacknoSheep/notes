# 一、cookie

参考：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies

- 由于http是无状态协议（每次请求独立），服务器无法判断两次请求是否来自同一客户端。通过cookie可以对请求来源进行标识。
- 首次访问网站时，请求头中不携带cookie信息，当浏览器接收到服务端返回的cookie后，会保存cookie，并在下次访问该网站时，在请求头的 `Set-Cookie` 字段中带上cookie。（一个请求头可以有多个 `Set-Cookie` 字段）
- cookie**保存在客户端**。
- cookie与域名绑定，无法在不同域名下获取使用（如aaa.xxx.com下的cookie无法在bbb.xxx.com下访问）。但是，父域名的cookie也会被包含在子域名的cookie中（如xxx.com下的cookie会被包含在aaa.baidu.com的cookie中）。
- 一般浏览器会限制cookie的长度和每个域名下cookie的数量。
- cookie可以被用户禁用。
- cookie不安全。（可以轻易被读取和修改）

## 1. cookie 的格式

```
Set-Cookie: id=myId;path=/;max-age=60; // 可能不止一条
```

| 属性                        | 说明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `<name>=<value>`            | 第一项键值对。设置cookie的名称和对应的值。name不区分大小写。 |
| `Domain=<domain>`           | cookie生效的域名。若不指定，则默认为当前访问的域名，**且不包含其子域名**；若指定，则一般会包含子域名。 |
| `Path=<path>`               | 指定一个URL路径，该路径必须存在于请求的URL中（可以匹配子路径）。默认为`/`。 |
| `Expires=<data>`            | cookie过期时间。Date格式。当客户端浏览器的本地时间超过这个时间点后，该cookie失效。 |
| `Max-Age=<number>`          | cookie存活时间，单位：秒。若为负数，则在结束浏览器进程时失效；若为0，则删除该cookie。**优先级高于Expires**。若`Expires`和`Max-Age`均未设置，则`Max-Age=-1`。 |
| `Secure`                    | 仅在使用https协议时才会发送该cookie。                        |
| `SameSite=<samesite-value>` | 设置cookie不随跨站请求发出，用于防范CSRF攻击。<br/>取值：`Strict`、`Lax`（默认值）、`None`（必须同时设置`Secure`）。 |
| `HttpOnly`                  | 若设置了该属性，则客户端无法通过JavaScript的`Document.cookie`属性来访问cookie，用于防止XSS攻击。但是，仍然可以在浏览器控制台的Application选项中手动修改。 |
| `Priority=<priority>`       | 目前仅chrome支持该属性。当cookie数量超过限制时，优先清除低优先级的cookie。<br/>取值：`Low`, `Medium`（默认值）, `High` 。 |

- 除第一项固定为cookie的名称和值外，其他属性顺序任意。

## 2. 读取cookie

**客户端**

读取cookie时，会将所有cookie的**名值对**以字符串形式返回，用分号分隔不同cookie。

```javascript
document.cookie; // 如"id1=abc; cName=ggg"，包含两条cookie（即只能读取cookie名和值）
```

修改cookie时，实际上是在替换（或创建）**单条cookie**。

```javascript
// 修改cookie
// 实际只替换了对应名称的cookie，不会影响其他名称的cookie
document.cookie="id=000; Max-Age=3600;"; // 修改名为 id 的cookie
document.cookie="id2=222"; // 修改名为 id2 的cookie
```

**服务端**

如果使用的是express，需要安装解析cookie的插件并配置相应中间件。

```bash
pnpm install cookie-parser
pnpm install -D @types/cookie-parser
```

```javascript
req.cookies; // 读取
```

```javascript
// 修改
res.setHeader("Set-Cookie", "id=myId;path=/;max-age=60;");

// 设置多条cookie
res.setHeader("Set-Cookie", ["id=myId;path=/;max-age=60;", "cName=myName;path=/;max-age=60;"]);
```

# 二、Session

当客户端访问网站时，若客户端请求中不包含sessionId，则为该客户端创建一个session，用于储存用户信息（如是否已登录），并在响应时将sessionId返回给客户端。

- 用户信息**保存在服务端**，客户端只保存sessionId。sessionId一般保存在cookie中，以保证访问网站时会自动发送。
- sessions在服务器是以哈希表的形式保存的。
- 由于cookie可以被人为禁止，所以可以使用其他方式传递SessionId。
  - URL重写（常用）。将sessionId附在URL后面。（如查询字符串）
  - 表单隐藏字段（现在已很少使用）。为表单添加一个隐藏字段，提交表单时同时提交给服务器。
- session会增加服务器负担。由于session保存在服务器，但存在多台服务器时，必须进行负载均衡或session同步。
- 服务器需要为session设置失效时间。（因为服务端无法得知客户端是否已删除sessionId）

# 三、Token

最简单的token包含uid（用户唯一身份标识）、time（当前时间戳）、sign（签名，由token）。

客户端和服务端的交互流程：

1. 客户端将账号和密码提交给服务器。
2. 服务器校验账号密码，若通过则生成一个token返回给客户端。sign由加密算法和密钥生成。
3. 客户端收到token后，可以保存在本地，以后每次请求时携带该token。在index.ts中使用index.d.ts中定义的类型
4. 服务器收到请求后，根据相同的加密算法和密钥计算sign，与收到的进行比较。验证失败则拒绝服务。



- 一般将token放在请求头的`Authorization`字段中。（cookie可能会被用户禁止）。

  ```
  Authorization: Bearer <token>
  ```

- 用户信息保存在客户端，服务端只需要保存加密算法和密钥。

# 四、JSON Web Token（JWT）

参考：https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

文档：https://github.com/auth0/node-jsonwebtoken

JSON Web Token是目前最流行的跨域认证解决方案。

包含三部分。

```
Header.Payload.Signature
```

## 1. Header

Header部分是一个json对象，用于存放描述JWT的元数据。

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

上面代码中，`alg`属性表示签名的算法，默认是 HMAC SHA256（写成 HS256）；`typ`属性表示这个token的类型，JWT 令牌统一写为`JWT`。

这个 json 对象会使用 Base64URL 算法转成字符串。

## 2. Payload

Payload 部分也是一个 json 对象，用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用。

- iss (issuer)：签发人
- exp (expiration time)：过期时间
- sub (subject)：主题
- aud (audience)：受众
- nbf (Not Before)：生效时间
- iat (Issued At)：签发时间
- jti (JWT ID)：编号

除了上述官方字段外，还可以添加自定义字段，如：

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

这个 json 对象也会使用 Base64URL 算法转成字符串。

## 3. Signature

Signature 是对前面两部分的签名，以防止数据被篡改。

首先，需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

## 4. JWT 的使用

**客户端**

token 可以储存在 Cookie 中，也可以储存在 localStorage 中。

客户端向服务端发送请求时，需要带上这个token，可以放在 cookie 中，或者放在请求头的`Authorization`字段中。

```
Authorization: Bearer <token>
```

## 5. JWT 的特点

- 默认不加密，但是也可以加密。（不加密时不要写入秘密数据）
- 除了用于认证外，jwt也可以用于交换信息，减少服务器查询数据库的次数。
- JWT 最大的缺点在于服务器无法更改或废弃已签发的 token （在加密算法和密钥不变的情况下，已签发的 token 都能通过验证）。除非服务器部署额外的逻辑。
- 为了减少因 token 被盗用而引发的问题，JWT 的有效期要设置得比较短。
- 为了保证安全，JWT 不应该使用 http 协议明码传输，要使用 https 协议传输。
