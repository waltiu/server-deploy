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
    if (req.method === Type_GET) {
      const { pathname, query } = url.parse(req.url, true);
      const response = {
        data: "Hello World!",
        url: req.url,
        method: req.method,
        pathname,
        query,
      };
      console.log(new Date().toLocaleString(),response)
      res.end(JSON.stringify(response));
    }
    if (req.method === TYPE_POST) {
      const data = await resolvePost(req);
      const response= {
        data,
        url: req.url,
        method: req.method,
      }
      console.log(new Date().toLocaleString(),response)
      res.end(
        JSON.stringify(response)
      );
    }
  })
  .listen(3000, () => {
    console.log("server is ready");
  });
