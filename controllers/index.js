/**
 * Created by boom on 2017/8/9.
 */
const router = require("express").Router();
const config = require("../config.json").wechat;
const wechat = require("wechat");
const reply  = require("../models/reply");

router.all("/api/reply", wechat(config, (req, res, next) => {
    const message = req.weixin;
    console.log(message, "----");
    console.log(reply);
    reply.find({
        keywords: message.Content
    }, function(err, data) {
        console.log(err, data);
        if (err) {
            return next(err);
        }
        let content = "这个问题我无法回答";
        if (data.length > 0) {
            content = data[0].content;
        }
        res.reply(content);
    });
}));

module.exports = router;