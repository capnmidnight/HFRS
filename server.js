/* global require, process, exp */
var http = require("http"),
  webServer = require("./server/webServer").webServer,
  appServer = http.createServer(webServer);

appServer.listen(process.env.PORT || 8383);