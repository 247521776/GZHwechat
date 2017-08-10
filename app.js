/**
 * Created by boom on 2017/8/8.
 */
const express = require("express");
const config  = require("./config.json");
const app     = express();
const mongoose= require("mongoose");
const controllers = require("./controllers");

app.use(express.query());
require("./models/reply");
app.use(controllers);

const db = mongoose.connect(config.mongodb).connection;

db.on("error", function(err) {
    console.log(err);
});

db.once("open", function() {
    app.listen(2999);
    console.log("启动成功");
});