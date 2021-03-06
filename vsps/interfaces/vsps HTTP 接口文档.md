# vsps HTTP 接口文档

## ProblemController

**添加新题目，修改题目以及删除题目需要管理员身份**

#### 添加新题目

**URL**: `v1/problem/admin`

**Method**: `PUT`

**RequestBody**

```json
{
  "name": "problem1",
  "description": "add two numbers",
  "inputs": [{
    "name": "a",
    "dtype": "number",
    "description": "input a"
  }, {
    "name": "b",
    "dtype": "number",
    "description": "input b"
  }],
  "output": {
    "name": "c",
    "dtype": "number",
    "description": "output c"
  },
  "testCases": [{
  		"inputs": {
  			"a": 1,
  			"b": "2"
  		},
  		"expect": "2"
  	
  },{
  	"inputs": {
  		"a": 1,
  		"b": "2"
  	},
  	"expect": "2"}],
  "structInfo": "JSON String"
}
```

**Response**

```json
{
  "id": "f495aac3-c1d9-428d-9f36-02f60109e1ef",
  "name": "p1",
  "description": "d",
  "state": 1,
  "inpus": [
    {
      "name": "a",
      "dtype": "number",
      "description": "input a"
    },
    {
      "name": "b",
      "dtype": "number",
      "description": "input b"
    }
  ],
  "output": {
    "name": "c",
    "dtype": "number",
    "description": "output c"
  },
  "structInfo": "JSON String",
  "testCases": [
    {
      "inputs": {
        "a": 1,
        "b": "2"
      },
      "expect": "2"
    },
    {
      "inputs": {
        "a": 1,
        "b": "2"
      },
      "expect": "2"
    }
  ]
}
```

#### 删除一个题目

**URL**: `v1/problem/admin/${id}`

**Method**: `DELETE`

**Response**

```json
{
  "sucess": true
}
```

### 修改一个题目

**URL**: `v1/problem/admin`

**Method**: `POST`

**RequestBody**

```json
{
  "id": "1",
  "name": "problem1",
  "description": "add two numbers",
  "state": 2,
  "testCases": [
    {
      "inputs": {
        "a": 1,
        "b": "2"
      },
      "expect": "2"
    },
    {
      "inputs": {
        "a": 1,
        "b": "2"
      },
      "expect": "2"
    }
  ]
}
```

**Response**

```json
{
  "id": "f495aac3-c1d9-428d-9f36-02f60109e1ef",
  "name": "p1",
  "description": "d",
  "state": 1,
  "inpus": [
    {
      "name": "a",
      "dtype": "number",
      "description": "input a"
    },
    {
      "name": "b",
      "dtype": "number",
      "description": "input b"
    }
  ],
  "output": {
    "name": "c",
    "dtype": "number",
    "description": "output c"
  },
  "structInfo": "JSON String",
  "testCases": [
    {
      "inputs": {
        "a": 1,
        "b": "2"
      },
      "expect": "2"
    },
    {
      "inputs": {
        "a": 1,
        "b": "2"
      },
      "expect": "2"
    }
  ]
}
```

#### 获取一个题目（用户）

**URL**: `v1/problem/${id}`

**Method**: `GET`

**Response**

0 为未做题 
1 为进行中 
2 为已通过
3 为未通过

```json
{
  "id": "f495aac3-c1d9-428d-9f36-02f60109e1ef",
  "name": "p1",
  "description": "d",
  "structInfo": "JSON String",
  "state": 0,
  "rate": 0
}
```

#### 获取所有已发布的题目（用户）

**URL**: `v1/problem/all`

**Method**: `GET`

**Response**

0 为未做题 
1 为进行中 
2 为已通过
3 为未通过

```json
[
  {
    "id": "45d1336a-a29c-4e07-a4dc-a8c871a03bd9",
    "name": "problem1",
    "description": "add two numbers",
    "structInfo": null,
    "state": 0,
    "rate": 0
  },
  {
    "id": "8950ea30-91e9-4421-9b38-48268d30680b",
    "name": "problem1",
    "description": "add two numbers",
    "structInfo": null,
    "state": 0,
    "rate": 0
  },
  {
    "id": "f495aac3-c1d9-428d-9f36-02f60109e1ef",
    "name": "p1",
    "description": "d",
    "structInfo": "JSON String",
    "state": 0,
    "rate": 0
  }
]
```

#### 获取所有已发布的题目（管理员）

**URL**: `v1/problem/admin/all`

**Method**: `GET`

**Response**

0 为未发布

1 为已发布

```json
[
  {
    "id": "45d1336a-a29c-4e07-a4dc-a8c871a03bd9",
    "name": "problem1",
    "description": "add two numbers",
    "state": 1,
    "inpus": [
      {
        "name": "a",
        "dtype": "number",
        "description": "input a"
      },
      {
        "name": "b",
        "dtype": "number",
        "description": "input b"
      }
    ],
    "output": {
      "name": "c",
      "dtype": "number",
      "description": "output c"
    },
    "structInfo": "JSON String",
    "testCases": [
      {
        "inputs": {
          "a": 1,
          "b": "2"
        },
        "expect": "2"
      },
      {
        "inputs": {
          "a": 1,
          "b": "2"
        },
        "expect": "2"
      }
    ]
  },
  {
    "id": "8950ea30-91e9-4421-9b38-48268d30680b",
    "name": "problem1",
    "description": "add two numbers",
    "state": 1,
    "inpus": [
      {
        "name": "a",
        "dtype": "number",
        "description": "input a"
      },
      {
        "name": "b",
        "dtype": "number",
        "description": "input b"
      }
    ],
    "output": {
      "name": "c",
      "dtype": "number",
      "description": "output c"
    },
    "structInfo": "JSON String",
    "testCases": [
      {
        "inputs": {
          "a": 1,
          "b": "2"
        },
        "expect": "2"
      },
      {
        "inputs": {
          "a": 1,
          "b": "2"
        },
        "expect": "2"
      }
    ]
  },
  {
    "id": "f495aac3-c1d9-428d-9f36-02f60109e1ef",
    "name": "p1",
    "description": "d",
    "state": 1,
    "inpus": [
      {
        "name": "a",
        "dtype": "number",
        "description": "input a"
      },
      {
        "name": "b",
        "dtype": "number",
        "description": "input b"
      }
    ],
    "output": {
      "name": "c",
      "dtype": "number",
      "description": "output c"
    },
    "structInfo": "JSON String",
    "testCases": [
      {
        "inputs": {
          "a": 1,
          "b": "2"
        },
        "expect": "2"
      },
      {
        "inputs": {
          "a": 1,
          "b": "2"
        },
        "expect": "2"
      }
    ]
  },
  {
    "id": "f7683537-c8a4-4c66-9f97-396d7ca8e8af",
    "name": "problem1",
    "description": "add two numbers",
    "state": 0,
    "inpus": [
      {
        "name": "a",
        "dtype": "number",
        "description": "input a"
      },
      {
        "name": "b",
        "dtype": "number",
        "description": "input b"
      }
    ],
    "output": {
      "name": "c",
      "dtype": "number",
      "description": "output c"
    },
    "structInfo": "JSON String",
    "testCases": [
      {
        "inputs": {
          "a": 1,
          "b": "2"
        },
        "expect": "2"
      },
      {
        "inputs": {
          "a": 1,
          "b": "2"
        },
        "expect": "2"
      }
    ]
  }
][
  {
    "id": "45d1336a-a29c-4e07-a4dc-a8c871a03bd9",
    "name": "problem1",
    "description": "add two numbers",
    "structInfo": null,
    "state": 0,
    "rate": 0
  },
  {
    "id": "8950ea30-91e9-4421-9b38-48268d30680b",
    "name": "problem1",
    "description": "add two numbers",
    "structInfo": null,
    "state": 0,
    "rate": 0
  },
  {
    "id": "f495aac3-c1d9-428d-9f36-02f60109e1ef",
    "name": "p1",
    "description": "d",
    "structInfo": "JSON String",
    "state": 0,
    "rate": 0
  }
]
```



#### 获取一个题目（管理员）

**URL**: `v1/problem/admin/${id}`

**Method**: `GET`

**Response**

0 为未发布

1 为已发布

```json
{
  "id": "f495aac3-c1d9-428d-9f36-02f60109e1ef",
  "name": "p1",
  "description": "d",
  "state": 1,
  "inpus": [
    {
      "name": "a",
      "dtype": "number",
      "description": "input a"
    },
    {
      "name": "b",
      "dtype": "number",
      "description": "input b"
    }
  ],
  "output": {
    "name": "c",
    "dtype": "number",
    "description": "output c"
  },
  "structInfo": "JSON String",
  "testCases": [
    {
      "inputs": {
        "a": 1,
        "b": "2"
      },
      "expect": "2"
    },
    {
      "inputs": {
        "a": 1,
        "b": "2"
      },
      "expect": "2"
    }
  ]
}
```

#### 

## SolutionController

#### 获得某个问题的解决方案

**URL**: `v1/sol/${id}`

**Method**: `GET`

**Response**

```json
{
  "problemId": "f495aac3-c1d9-428d-9f36-02f60109e1ef",
  "userId": "test",
  "state": 0,
  "passRate": 0,
  "structInfo": "JSON String"
}
```

#### 执行解决方案

**URL**: `v1/sol/eval/${id}`

**Method**: `GET`

**Response**

```json
{
  "passRate": 100,
  "state": 2,
  "err": ""
}
```

#### 保存解决方案

**URL**: `v1/sol`

**Method**: `POST`

**RequestBody**:

```json
{
	"id": "f495aac3-c1d9-428d-9f36-02f60109e1ef",
	"structInfo": "JSON String"
}
```

**Response**

```json
{
  "problemId": "f495aac3-c1d9-428d-9f36-02f60109e1ef",
  "userId": "test",
  "state": 0,
  "passRate": 0,
  "structInfo": "JSON String"
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
            <label for="INPUT-1">a number inputs</label>
            <br />
            <inputs id="INPUT-1" type="text" />
        </div>
        <div>
            <p>a number output</p>
            <p id="OUTPUT-1" type="text"></p>
        </div>
    </body>
</html>
```