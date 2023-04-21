/**
 * 请求url参数
 * port 服务端口号 必填
 * containerName  容器名称 必填
 * nameSpace  阿里云容器命名空间 选填
 * name  阿里云实例名称 选填
 * version  版本 选填
 */
const { exec, execSync  } = require("child_process");
const http = require("http");
const url = require("url");

const TYPE_POST = "POST";
const Type_GET = "GET";

const resolvePost = (req) => {
  return new Promise((resolve) => {
    let chunk = "";
    req.on("data", (data) => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });
};

http
  .createServer(async (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    const { pathname, query } = url.parse(req.url, true);
    if (req.method === Type_GET) {
      const response = {
        result: "Hello World!",
        url: req.url,
        method: req.method,
        pathname,
        query,
      };
      console.log(new Date().toLocaleString(), response);
      res.end(JSON.stringify(response));
    }
    if (req.method === TYPE_POST) {
      const result = await resolvePost(req);
      const response = {
        result,
        url: req.url,
        method: req.method,
        port: query.port || 8888,
        containerName: query.containerName,
      };
      console.log(new Date().toLocaleString(), response);

      const path = `${query.nameSpace || result.repository.nameSpace}/${
        query.name || result.repository.name
      }:${query.version || result.push_data.tag}`;

      const shell=` update.sh ${path}  ${response.port}  ${query.containerName}`
      console.log(shell,'shell')
      execSync(shell)


      res.end(JSON.stringify(response));
    }
  })
  .listen(3000, () => {
    console.log("server is ready");
  });
