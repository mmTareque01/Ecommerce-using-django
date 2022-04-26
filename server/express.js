const express = require("express");
const app = express();
const http = require("http");
const fs = require('fs')
const paths = require('path')
const expressServer = http.createServer(app);
// const expressServer = http.createServer({
//     key : fs.readFileSync(paths.join(__dirname, '../cert', 'server.abroadinquiry.com.key')),
//     cert : fs.readFileSync(paths.join(__dirname, '../cert', 'server.abroadinquiry.com.crt'))
//   }, app);

module.exports = {expressServer, app};

