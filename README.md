# Memories Food Server

## 中间件

### 数据库中间件

```javascript
// 使用req.sql调用数据库方法

req.sql({ sql, options, type }, (error, result) => {
  // ...
});
```

## 环境

> 进入.env文件，将RUNNING_ENV=development放开,RUNNING_ENV=production注释掉即可在本地环境进行开发测试
> 提交代码是会自动忽略.env文件，本地开发更改一次后后续无需更改

## 开发

> 响应数据严格按照接口文档进行返回
> 请求数据验证，防止SQL注入
> 响应msg，需根据场景确定返回的信息

### 一期开发[2024/12/02 - 2024/12/10]

- 用户

  - 获取验证码接口 [/memories/verify]-[GET]
  - 验证码校验接口 [/memories/verify/{code}]-[POST]
  - 用户登录/注册接口 [/memories/auth]-[POST]
  - 查询用户接口 [/memories/auth/{id}]-[GET]
  - 修改用户信息接口 [/memories/auth/{id}]-[PUT]
  - 修改密码接口 [/memories/password/{auth}]-[PUT]
  - 修改密码验证接口 [/memories/password/{auth}]-[POST]
  - 注销用户接口 [/memories/auth/{id}]-[DELETE]

- 食谱

  - 获取食谱接口 [/memories/food/{id}]-[GET]
  - 搜索食谱接口 [/memories/food/list]-[GET]

### 二期开发[2024/12/15 - 2024/12/25]

> 待定...

## 代码提交

> 每次提交代码每个文件修改哪些需单独commit，不允许多个文件合并为一次commit，方便迭代和回退
> 代码commit说明，如果是新增接口或功能，格式为feat：[说明]，如果是修复bug，格式为fix：[说明]
> 代码提交后，联系管理员merge请求，并需通过[https://memories-food.online]测试接口是否正常
