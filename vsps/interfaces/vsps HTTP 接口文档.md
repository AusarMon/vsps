# vsps HTTP 接口文档

## ProblemController

**管理员身份**

#### 添加新题目

**URL**: `v1/problem`

**Method**: `PUT`

**RequestBody**

```json
{
  "name": "problem1",
  "desc": "add two numbers",
  "inputs": [{
    "name": "a",
    "dtype": "number",
    "desc": "input a"
  }, {
    "name": "b",
    "dtype": "number",
    "desc": "input b"
  }],
  "output": {
    "name": "c",
    "dtype": "number",
    "desc": "output c"
  },
  "structInfo": "JSON String"
}
```

**Response**

```json
{
  "id": "1",
  "name": "problem1",
  "desc": "add two numbers",
  "inputs": [{
    "name": "a",
    "dtype": "number",
    "desc": "input a"
  }, {
    "name": "b",
    "dtype": "number",
    "desc": "input b"
  }],
  "output": {
    "name": "c",
    "dtype": "number",
    "desc": "output c"
  },
  "structInfo": "JSON String"
}
```

#### 删除一个题目

**URL**: `v1/problem/${id}`

**Method**: `DELETE`

**Response**

```json
{
  "id": "1",
  "sucess": true
}
```

#### 获取一个题目

**URL**: `v1/problem/${id}`

**Method**: `GET`

**Response**

```json
{
  "id": "1",
  "name": "add",
  "desc": "add two numbers",
  "inputs": [],
  "output": {},
  "structInfo": "JSON",
  "state": 0
}
```

#### 获取所有题目

**URL**: `v1/problem/all`

**Method**: `GET`

**Response**

0 为未发布

1 为已发布

```json
[
  {
    "id": "1",
    "name": "add",
    "desc": "add two numbers",
    "inputs": [],
    "output": {},
    "structInfo": "JSON",
    "state": 0
  },
  {},
  {}
]
```

**用户身份**

用户身份与管理员身份一些 URL 是相同的，但是返回不同的信息

#### 获取一个题目

state

0 为未做题

1 为进行中

2 为已通过

3 为未通过

rate 为通过率

**URL**: `v1/problem/${id}`

**Method**: `GET`

**Response**

```json
{
  "id": "1",
  "name": "add",
  "desc": "add two numbers",
  "structInfo": "JSON",
  "state": 2,
  "rate": 100
}
```

#### 获取所有题目

**URL**: `v1/problem/all`

**Method**: `GET`

**Response**

```json
[
  {
    "id": "1",
    "name": "add",
    "desc": "add two numbers",
    "structInfo": "JSON",
    "state": 2,
    "rate": 100
  },
  {},
  {}
]
```

#### 执行题目

**URL**: `v1/problem/exec/${id}`

**Method**: `GET`

**Response**

```json
{
  "id": "1",
  "rate": 100,
  "state": 2
}
```

#### 保存题目

**URL**: `v1/problem/exec/${id}`

**Method**: `POST`

**RequestBody**:

```json
{
  "id": "1",
  "structInfo": "JSON"
}
```

**Response**

```json
{
  "id": "1",
  "name": "add",
  "desc": "add two numbers",
  "structInfo": "JSON",
  "state": 2,
  "rate": 100
}
```

## UserController



#### 注册用户

**URL**：`v1/user/reg/`

**Method**：`PUT`

**RequestBody**：

```json
{
	"username": "test2",
	"password": "psw",
	"email": "email3"
}
```

**Response**：

```json
{
  "username": "test3",
  "password": "psw",
  "email": "email3",
  "enabled": true,
  "authorities": [
    {
      "authority": "USER"
    }
  ],
  "credentialsNonExpired": false,
  "accountNonExpired": false,
  "accountNonLocked": false
}
```



### 修改密码

**URL**：`v1/user/psw/`

**Method**：`POST`

**Head**：

```text
X-Authorization: Bearer {token}
```

**ReqeustBody**：

```json
{
	"oldPassword": "psw",
	"newPassword": "psw1"
}
```

**Response**：

```json
{
  
}
```



## AuthController



### 用户登录

**URL**：`v1/auth/login/`

**Method**：`POST`

**ReqeustBody**：

```json
{
	"username": "test2",
	"password": "psw"
}
```

**Response**：

```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MiIsInNjb3BlIjpbIlVTRVIiXSwiaXNzIjoiaHR0cDovL2FzaC5jb20iLCJpYXQiOjE0OTI2ODE3NjMsImV4cCI6MTQ5MjY4MjY2M30.Su4u1HqJ6_KF6m5ailJ4QS5VG6sPqF59gYV8viw7H_AjtVvXxmlW77h3mBkijN7dubq8lm-WzN-cseMYZjCTgg",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MiIsInNjb3BlIjpbIlJPTEVfUkVGUkVTSF9UT0tFTiJdLCJpc3MiOiJodHRwOi8vYXNoLmNvbSIsImp0aSI6IjhlZjk3YmQ0LTU0ZWUtNDU2My05ODdhLWU4ZWJiYTU0NTExZSIsImlhdCI6MTQ5MjY4MTc2NCwiZXhwIjoxNDkyNjg1MzY0fQ.31q7aryfhx9Spww5ACOe96twC9EPpymeQ0YJ7pE9bkMqXXDVrRCk0F_OLoIZ2y9UoXoIvmvr1GkW767Ms4LlqQ"
}
```





### 刷新 Token

**URL**：`v1/auth/token/`

**Method**：`POST`

**ReqeustBody**：

```json
{
	"refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0Iiwic2NvcGUiOlsiUk9MRV9SRUZSRVNIX1RPS0VOIl0sImlzcyI6Imh0dHA6Ly9hc2guY29tIiwianRpIjoiOTY1M2I3NDEtMDA4OS00ZjQ1LWI0N2MtMDVjYmQ2M2EwMjQ3IiwiaWF0IjoxNDkyNjgyOTc4LCJleHAiOjE0OTI2ODY1Nzh9.WwdUexxS481mnYBoH21VL8wSJILqDyHxEGF6OFj6kKLGC_MRwJk5J7kRq9JZ_v0IqU5V-4himWsqAlpFusMGdQ"
}
```

**Response**：

```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0Iiwic2NvcGUiOlsiUk9MRV9SRUZSRVNIX1RPS0VOIl0sImlzcyI6Imh0dHA6Ly9hc2guY29tIiwiaWF0IjoxNDkyNjgzMDU2LCJleHAiOjE0OTI2ODM5NTZ9.arxyqaVVr2sKsyThbUyke5DTBYtQk6n9dEhLr8z2mWo0kK7D6H_U5zwrO-hRO6sgfikjXom9ixM72riaMRytWg",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0Iiwic2NvcGUiOlsiUk9MRV9SRUZSRVNIX1RPS0VOIl0sImlzcyI6Imh0dHA6Ly9hc2guY29tIiwianRpIjoiODYwNjE4ZDgtYjA4MS00ZjczLWIyOTAtNDhkMzM5OTBkNjQ1IiwiaWF0IjoxNDkyNjgzMDU2LCJleHAiOjE0OTI2ODY2NTZ9.Rdw3ZjDq7OOkfObmO4vb64ouC-Loy-Noh2UnWzLxOBStO8sUqeOjG3HImPdW7Q1Ul6uIfemzI7rzSPqU1vTn3g"
}
```



## ProgramController



### 获取所有程序

**URL**：`/v1/program/all/`

**Method**：`GET`

**Head**：

```text
X-Authorization: Bearer {token}
```

**Response**：

```json
[
  {
    "programId": "e2ef9c56-b0a8-4014-b167-6bbc82bede01",
    "name": "newName"
  },
  {
    "programId": "p_id",
    "name": "test_p"
  },
  {
    "programId": "p_id1",
    "name": "new name"
  }
]
```



### 获取程序详细信息

**URL**：`v1/program/detail/{id}`

**Method**：`GET`

**Head**：

```text
X-Authorization: Bearer {token}
```

**Response**：

```json
{
  "programId": "p_id",
  "username": "test",
  "name": "newName",
  "structInfo": "jsonStructure"
}
```



### 添加新的程序

**URL**：`v1/program/`

**Method**：`PUT`

**Head**：

```text
X-Authorization: Bearer {token}
```

**ReqeustBody**：

```json
{
	"name": "newP",
	"structInfo": "sss"
}
```

**Response**：

```json
{
  "programId": "b822a3a1-a53e-4301-8f55-06c8b22d5ed2",
  "username": "test",
  "name": "newP",
  "structInfo": "sss"
}
```





### 修改程序信息

**URL**：`v1/program/`

**Method**：`PUT`

**Head**：

```text
X-Authorization: Bearer {token}
```

**ReqeustBody**：

```json
{
  "programId": "b822a3a1-a53e-4301-8f55-06c8b22d5ed2",
  "username": "test",
  "name": "newP",
  "structInfo": "sss"
}
```

**Response**：

```json
{
  "programId": "84a7e60a-fa53-41bd-bdc0-d6ea9c5e4515",
  "username": "test",
  "name": "newP",
  "structInfo": "sss"
}
```

### 删除现有程序

**URL**：`v1/del/{id}`

**Method**：`DELETE`

**Head**：

```text
X-Authorization: Bearer {token}
```

**Response**：

```json
{
  "success": "true",
}
```


### 生成 HTML 代码

**URL**：`v1/program/gen/{id}`

**Method**：`GET`

**Head**：

```text
X-Authorization: Bearer {token}
```

**Response**：
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>one</title>
        <script>function myFunction() { var VARIABLE=5; var INPUT=document.getElementById(&quot;INPUT-1&quot;).value; var OUTPUT; null}</script>
    </head>
    <body>
        <div class="form-control">
            <label for="INPUT-1">a number input</label>
            <br />
            <input id="INPUT-1" type="text" />
        </div>
        <div>
            <p>a number output</p>
            <p id="OUTPUT-1" type="text"></p>
        </div>
    </body>
</html>
```