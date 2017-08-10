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

// app.use((req, res, next) => {
//     console.log("coming");
//     next();
// })
// app.use(express.query());
const router = require("express").Router();
const reply = require("./models/reply");
const wechat = require("wechat");

app.use(wechat(config.wechat, function(req, res, next) {
    const message = req.weixin;
    console.log(message, "----");
    reply.findAll(message, (err, data) => {
        if (err) {
            return next(err);
        }
        res.reply(data[0].content);
    });
}));
app.use(router);

app.listen(2999);
console.log("启动成功");