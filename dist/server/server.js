"use strict";

//Setup server
var express = require("express");

var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log("Listening on port ".concat(port));
});
app.use(express["static"](__dirname + "/../client"));