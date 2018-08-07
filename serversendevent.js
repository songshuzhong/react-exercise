

var http = require("http");

http.createServer(function (req, res) {
  var fileName = "." + req.url;

  if (fileName === "./stream") {
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": '*',
    });
    res.write("retry: 10000n");
    res.write("event: connecttimen");
    res.write("data: " + (new Date()) + "nn");
    res.write("data: " + (new Date()) + "nn");

    interval = setInterval(function () {
      res.write("data: " + (new Date()) + "nn");
    }, 1000);

    req.connection.addListener("close", function () {
      clearInterval(interval);
    }, false);
  }
}).listen(8844, "127.0.0.1");