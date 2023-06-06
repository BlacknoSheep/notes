// 引入 jwt
const jwt = require("jsonwebtoken");

// 使用 jwt 对 json 对象进行加密
const obj = {
  name: "Taffy",
  age: 17,
  gender: "女",
};
const token = jwt.sign(obj, "kyou123", {
  expiresIn: 10,
});
console.log(token);
console.log(token.length);

// 服务器收到token后，需要进行解密
try {
  const decoded_data = jwt.verify(token, "kyou123");
  console.log(decoded_data);
} catch (e) {
  // 若解码失败（如token过期），则会报错
  console.log("无效的token");
}
