# 后端API接口文档

本文档整理了前端项目所需的所有后端API接口。

## 目录
1. [用户认证接口](#用户认证接口)
2. [剧本管理接口](#剧本管理接口)
3. [声音克隆接口](#声音克隆接口)
4. [首页内容接口](#首页内容接口)

## 用户认证接口

### 1.1 微信登录接口

**接口说明**: 用于小程序环境下，通过微信授权登录

**请求URL**: `/api/login/wechat`

**请求方式**: POST

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| code | string | 是 | 微信登录返回的code |
| userInfo | object | 是 | 用户信息对象 |
| userInfo.nickName | string | 是 | 用户昵称 |
| userInfo.avatarUrl | string | 是 | 用户头像地址 |

**响应结果**:

```json
{
  "code": 200,
  "msg": "登录成功",
  "data": {
    "token": "xxxxxxx",
    "openid": "xxxxxxx"
  }
}
```

### 1.2 用户信息获取接口

**接口说明**: 获取当前登录用户的详细信息

**请求URL**: `/api/user/info`

**请求方式**: GET

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |

**响应结果**:

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "nickName": "用户昵称",
    "avatarUrl": "头像URL",
    "openid": "用户openid",
    "balance": 100,
    "vipStatus": true,
    "vipExpireDate": "2024-12-31"
  }
}
```

### 1.3 退出登录接口

**接口说明**: 用户退出登录

**请求URL**: `/api/user/logout`

**请求方式**: POST

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |

**响应结果**:

```json
{
  "code": 200,
  "msg": "退出成功",
  "data": null
}
```

## 剧本管理接口

### 2.1 保存剧本接口

**接口说明**: 创建或更新用户剧本

**请求URL**: `/api/script/save`

**请求方式**: POST

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | number | 否 | 剧本ID，不传则为新建 |
| title | string | 是 | 剧本标题 |
| type | string | 是 | 剧本类型 |
| content | string | 是 | 剧本内容 |

**响应结果**:

```json
{
  "code": 200,
  "msg": "保存成功",
  "data": {
    "id": 1,
    "title": "剧本标题",
    "type": "剧本类型",
    "createTime": "2023-01-01 12:00:00"
  }
}
```

### 2.2 获取剧本列表接口

**接口说明**: 获取用户创建的剧本列表

**请求URL**: `/api/script/list`

**请求方式**: GET

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认10 |

**响应结果**:

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "total": 100,
    "list": [
      {
        "id": 1,
        "title": "剧本标题1",
        "type": "台词腔",
        "createTime": "2023-01-01 12:00:00"
      },
      {
        "id": 2,
        "title": "剧本标题2",
        "type": "人妻",
        "createTime": "2023-01-02 12:00:00"
      }
    ]
  }
}
```

### 2.3 获取剧本详情接口

**接口说明**: 获取单个剧本的详细信息

**请求URL**: `/api/script/detail`

**请求方式**: GET

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | number | 是 | 剧本ID |

**响应结果**:

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "id": 1,
    "title": "剧本标题",
    "type": "剧本类型",
    "content": "剧本内容",
    "createTime": "2023-01-01 12:00:00",
    "updateTime": "2023-01-01 12:00:00"
  }
}
```

### 2.4 删除剧本接口

**接口说明**: 删除用户创建的剧本

**请求URL**: `/api/script/delete`

**请求方式**: POST

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | number | 是 | 剧本ID |

**响应结果**:

```json
{
  "code": 200,
  "msg": "删除成功",
  "data": null
}
```

## 声音克隆接口

### 3.1 上传声音样本接口

**接口说明**: 上传用户录制的声音样本

**请求URL**: `/api/voice/upload`

**请求方式**: POST

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |
| Content-Type | string | 是 | multipart/form-data |

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| file | file | 是 | 声音文件，支持mp3、wav格式 |
| duration | number | 是 | 音频时长（秒） |

**响应结果**:

```json
{
  "code": 200,
  "msg": "上传成功",
  "data": {
    "sampleId": "sample123",
    "url": "https://example.com/samples/sample123.mp3",
    "duration": 25
  }
}
```

### 3.2 开始声音克隆接口

**接口说明**: 根据上传的样本开始声音克隆

**请求URL**: `/api/voice/clone`

**请求方式**: POST

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sampleIds | array | 是 | 样本ID数组 |
| name | string | 是 | 克隆声音名称 |

**响应结果**:

```json
{
  "code": 200,
  "msg": "克隆任务已提交",
  "data": {
    "taskId": "task123",
    "status": "processing",
    "estimatedTime": 300
  }
}
```

### 3.3 获取声音克隆状态接口

**接口说明**: 查询声音克隆任务状态

**请求URL**: `/api/voice/status`

**请求方式**: GET

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| taskId | string | 是 | 克隆任务ID |

**响应结果**:

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "taskId": "task123",
    "status": "completed", // processing, completed, failed
    "progress": 100,
    "result": {
      "voiceId": "voice123",
      "name": "我的声音",
      "previewUrl": "https://example.com/preview/voice123.mp3"
    }
  }
}
```

### 3.4 获取克隆声音列表接口

**接口说明**: 获取用户的声音克隆列表

**请求URL**: `/api/voice/list`

**请求方式**: GET

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认10 |

**响应结果**:

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "total": 5,
    "list": [
      {
        "voiceId": "voice123",
        "name": "我的声音1",
        "previewUrl": "https://example.com/preview/voice123.mp3",
        "createTime": "2023-01-01 12:00:00"
      },
      {
        "voiceId": "voice124",
        "name": "我的声音2",
        "previewUrl": "https://example.com/preview/voice124.mp3",
        "createTime": "2023-01-02 12:00:00"
      }
    ]
  }
}
```

## 首页内容接口

### 4.1 获取剧情角色列表接口

**接口说明**: 获取首页剧情角色列表

**请求URL**: `/api/home/drama`

**请求方式**: GET

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认10 |

**响应结果**:

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "total": 10,
    "list": [
      {
        "id": 1,
        "title": "白领女友的温柔早安",
        "tag": "台词腔",
        "cover": "https://example.com/images/drama1.jpg"
      },
      {
        "id": 2,
        "title": "豪门女主的秘密生活",
        "tag": "人妻",
        "cover": "https://example.com/images/drama2.jpg"
      }
    ]
  }
}
```

### 4.2 获取AI声音列表接口

**接口说明**: 获取首页AI声音列表

**请求URL**: `/api/home/voice`

**请求方式**: GET

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认10 |

**响应结果**:

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "total": 8,
    "list": [
      {
        "id": 1,
        "title": "甜美少女音",
        "tag": "少女",
        "cover": "https://example.com/images/voice1.jpg"
      },
      {
        "id": 2,
        "title": "性感成熟音",
        "tag": "成熟",
        "cover": "https://example.com/images/voice2.jpg"
      }
    ]
  }
}
```

### 4.3 获取角色详情接口

**接口说明**: 获取角色详细信息

**请求URL**: `/api/role/detail`

**请求方式**: GET

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | number | 是 | 角色ID |

**响应结果**:

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "id": 1,
    "title": "白领女友的温柔早安",
    "tag": "台词腔",
    "cover": "https://example.com/images/drama1.jpg",
    "description": "角色描述信息",
    "previewUrl": "https://example.com/preview/drama1.mp3",
    "scripts": [
      {
        "id": 101,
        "title": "脚本1"
      },
      {
        "id": 102,
        "title": "脚本2"
      }
    ]
  }
}
```

### 4.4 使用角色接口

**接口说明**: 用户使用特定角色

**请求URL**: `/api/role/use`

**请求方式**: POST

**请求头**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 用户token，格式为"Bearer {token}" |

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| roleId | number | 是 | 角色ID |
| scriptId | number | 是 | 脚本ID |

**响应结果**:

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "taskId": "task456",
    "status": "processing"
  }
}
``` 