/**
 * Created by boom on 2017/8/11.
 */
const config = require("../config.json").wechat;
const wechat = require("wechat");
const mongoose= require("mongoose");
const reply  = mongoose.model("news");

module.exports = {
    "/api/reply": {
        all: wechat(config, (req, res, next) => {
            const message = req.weixin;
            reply.find({
                keywords: message.Content
            }, function(err, data) {
                if (err) {
                    return next(err);
                }
                let content = "这个问题我无法回答";
                if (data.length > 0) {
                    content = data[0].content;
                }
                res.reply(content);
            });
        })
    }
};