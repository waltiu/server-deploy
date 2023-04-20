const http = require("http");

http
  .createServer((req, res) => {
    if (req.method === "get" && req.url === "/") {
      console.log(req.url);
      res.end(req.url);
      //...
    }
    if (req.method === "post" && req.url === "/") {
      console.log("post");
      //...
    }
  })
  .listen(3000, () => {
    console.log("server is ready");
  });
