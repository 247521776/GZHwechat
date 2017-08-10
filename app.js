/**
 * Created by boom on 2017/8/8.
 */
const express = require("express");
const config  = require("./config.json");
const app     = express();
const mongoose= require("mongoose");
const controllers = require("./controllers");

const db = mongoose.createConnection(config.mongodb);

db.on("error", (err) => {
    console.log(err);
});


app.use(express.query());
app.use(router);

app.listen(2999);
console.log("启动成功");