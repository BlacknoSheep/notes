# 一、脚本

## 1. clash for windows

```javascript
// parser.js
/*
clash 规则使用优先匹配方式，即从上到下依次匹配，匹配到则不再继续匹配。
*/

// DOMAIN 域名
// DOMAIN-SUFFIX 域名后缀
// DOMAIN-KEYWORD 域名关键字

// 直连
const rules_direct = {
  DOMAIN: [],
  "DOMAIN-SUFFIX": [],
  "DOMAIN-KEYWORD": [],
};

// 走第一个组（一般为“选择节点”）
const rules_group = {
  DOMAIN: [],
  "DOMAIN-SUFFIX": [],
  "DOMAIN-KEYWORD": [],
};

// 将规则对象组合为最终的规则
function toRules(obj, proxy = "DIRECT") {
  const rules = [];
  for (const [type, list] of Object.entries(obj)) {
    for (const item of list) {
      rules.push(`${type},${item},${proxy}`);
    }
  }
  return rules;
}

module.exports.parse = async (raw, { axios, yaml, notify, console }, { name, url, interval, selected }) => {
  const obj = yaml.parse(raw);

  // 生成规则
  const rd = toRules(rules_direct, "DIRECT");
  const rg = toRules(rules_group, obj["proxy-groups"][0]["name"]);
  // 将规则添加到开头
  obj["rules"] = [].concat(rd, rg, obj["rules"]);

  // throw new Error(obj.rules[1112]);
  return yaml.stringify(obj);
};
```

## 2. clash verge

```javascript
/*
clash 规则使用优先匹配方式，即从上到下依次匹配，匹配到则不再继续匹配。
*/

// DOMAIN 域名
// DOMAIN-SUFFIX 域名后缀
// DOMAIN-KEYWORD 域名关键字

// 直连
const rules_direct = {
  DOMAIN: [],
  "DOMAIN-SUFFIX": [],
  "DOMAIN-KEYWORD": [],
};

// 走第一个组（一般为“选择节点”）（组名不用写，动态获取）
const rules_group = {
  DOMAIN: [],
  "DOMAIN-SUFFIX": [],
  "DOMAIN-KEYWORD": [],
};

// 将规则对象组合为最终的规则
function toRules(obj, proxy = "DIRECT") {
  const rules = [];
  for (const [type, list] of Object.entries(obj)) {
    for (const item of list) {
      rules.push(`${type},${item},${proxy}`);
    }
  }
  return rules;
}

function main(params) {
  // 生成规则
  const rd = toRules(rules_direct, "DIRECT");
  const rg = toRules(rules_group, params["proxy-groups"][0]["name"]);
  // 将规则添加到开头
  params["rules"] = [].concat(rd, rg, params["rules"]);
  return params;
}
```

# 二、其他

## clash for linux

```bash
# 添加执行权限
chmod +x clash

# 启动clash，指定的目录下需要有 config.yaml 和 Country.mmdb 这两个文件
clash -d /.../clash
```

