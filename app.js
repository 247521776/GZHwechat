/**
 * Created by boom on 2017/8/8.
 */
const express = require("express");
const config  = require("./config.json");
const app     = express();
const mongoose= require("mongoose");

const db = mongoose.createConnection(config.mongodb, function(err) {
    console.log(err);
});
const controllers = require("./controllers");

db.on("error", (err) => {
    console.log(err);
});


app.use(express.query());
app.use(controllers);

app.listen(2999);
console.log("启动成功");