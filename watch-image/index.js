const { execSync } = require("child_process");
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
        port: query?.port || 8888,
        containerName:query?.containerName ,
      };
      const path =`${result.repository.nameSpace}/${result.repository.name}:${result.push_data.tag}`
      execSync(
        `./update.sh ${path} ${containerName} ${result.push_data.tag} ${response.port}`
      );
      console.log(new Date().toLocaleString(), response);
      res.end(JSON.stringify(response));
    }
  })
  .listen(3000, () => {
    console.log("server is ready");
  });
