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
//挂在所有集合
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));
//添加所有路由
app.use(controllers);

//连接数据并启动项目
mongoose.connect(config.mongodb).connection
    .on("error", function(err) {
    console.log(err);
}).once("open", function() {
    app.listen(2999);
    console.log("启动成功");
});