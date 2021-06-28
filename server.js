const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename = q.pathname === "/" ? "./index.html" : `.${q.pathname}`;

    let page404 = fs.readFileSync("./404.html", function (err, data) {
      if (err) throw err;
      return data;
    });

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(page404);
        return res.end();
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
