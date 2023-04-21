const http = require("http");

const TYPE_POST = "POST";
const Type_GET = "GET";

http
  .createServer((req, res) => {
    if (req.method === Type_GET) {
      res.writeHead(200, { "Content-Type": "application/json" });
      console.log(req);
      res.end(
        JSON.stringify({
          data: "Hello World!",
          url: req.url,
          method: req.method,
        })
      );
      //...
    }
    if (req.method === TYPE_POST) {
      console.log("post");
      //...
    }
  })
  .listen(3000, () => {
    console.log("server is ready");
  });
