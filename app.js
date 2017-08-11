/**
 * Created by boom on 2017/8/8.
 */
const express     = require("express");
const config      = require("./config.json");
const app         = express();
const mongoose    = require("mongoose");
const controllers = require("./controllers");
const fs          = require("fs");
const join        = require("path").join;
const models      = join(__dirname, "./models");

app.use(express.query());
app.use(controllers);

fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));

const db = mongoose.connect(config.mongodb).connection;

db.on("error", function(err) {
    console.log(err);
});

db.once("open", function() {
    app.listen(2999);
    console.log("启动成功");
});