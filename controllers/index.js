/**
 * Created by boom on 2017/8/9.
 */
const router = require("express").Router();
const reply = require("../models/reply");
const config = require("../config.json").wechat;
const wechat = require("wechat");

router.get("/api/reply", wechat(config, (req, res, next) => {
    const message = req.weixin;
    console.log(message, "----");
    reply.findAll(message.Content, function(err, data) {
        console.log(err, data);
        if (err) {
            return next(err);
        }
        res.reply(data[0].content);
    });
}));

module.exports = router;