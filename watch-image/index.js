const http = require("http");

http
  .createServer((req, res) => {
    console.log("receive request");
    console.log(req.url);
    if (req.method === "get" && req.url === "/") {
      res.end(req);
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
