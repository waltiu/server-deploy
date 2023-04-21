const http = require("http");

const TYPE_POST="POST"
const Type_GET='GET'

http
  .createServer((req, res) => {
    if (req.method === Type_GET ) {
      console.log(req.url);
      res.end(req);
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
