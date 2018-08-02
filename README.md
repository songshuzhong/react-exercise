
# react-exercise

## 安装

### 环境配置

#### 安装 Node.js

若对 Node.js 不甚了解，可在 [nodejs.org](http://www.nodejs.org/) 获取相关资源，在其 [下载](https://nodejs.org/en/download/current/) 页面获取相应安装包。

```

### 安装相关依赖

进入 react-exercise 根目录

执行 `npm install` 安装已在 package.json 中列出的依赖项。
```

### 执行构建任务
```
$ npm run build
```

### 启动服务
```
$ npm start
```

### 运行
应用从 process.env.PORT 获取端口号配置，默认端口号为 `3000`。

```
http://localhost:3000
```
运行时改变端口号，可在服务启动时指定：
```
# MacOS or Linux
$ PORT=3000 npm start

# Windows
> set PORT=3000 & npm start
```


### 开发与调试

```
# MacOS or Linux
$ npm run start:dev

# Windows
>  npm run start:dev
```

接下来您就可以在 `http://localhost:3000/` 访问并进行开发调试。

### 更新日志
```
v 0.0.1
-- koa2 + react16 + react-router4 + es6 + webpack3
-- 支持客户端渲染
-- 支持代码分割
```
```
v 0.0.2
-- 支持服务器端渲染
-- 支持progress web application
```
```
v 0.0.3
-- 提供restful接口
```



