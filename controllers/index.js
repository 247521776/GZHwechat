/**
 * Created by boom on 2017/8/9.
 */
const router      = require("express").Router();
const fs          = require("fs");
const join        = require("path").join;
const controllers = __dirname;
const config      = require("../config.json").wechat;
const wechat      = require("wechat");
const mongoose    = require("mongoose");
const reply       = mongoose.model("news");
const jwt         = require("jsonwebtoken");
const users       = mongoose.model("users");
const md5         = require("md5");

fs.readdirSync(controllers)
    .filter(controllerPath => ~controllerPath.search(/^[^\.].*\.js$/))
    .forEach((controllerPath) => {
        if (controllerPath !== "index.js") {
            const controller = require(join(__dirname, controllerPath));
            for (let url in controller) {
                const methods = controller[url];
                for (let method in methods) {
                    router[method](url, methods[method]);
                }
            }
        }
    });

module.exports = (app) => {
    router.all("api/reply", wechat(config, (req, res, next) => {
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
    }));

    router.post("/api/login", (req, res, next) => {
        const body = req.body;
        const username = body.username;
        const password = body.password;
        users.find({
            username,
            password: md5(password)
        }, function(err, data) => {
            if (err) {
                next(err);
            }
            if (data.length > 0) {
                const user = data[0];
                const token = jwt.sign({
                    username: user.username
                }, "woshiyang", {
                    expiresIn: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60  // 24小时过期
                });
                res.json({
                    code: 200,
                    token: token,
                    user: {
                        username: user.username
                    }
                });
            }
            else {
                res.json({
                    code: 401,
                    msg: "请输入正确的账号/密码"
                });
            }
        });
    });

    app.all("*", (req, res, next) => {
        const token = req.query.token;
        if (token) {
            res.json({
                code: 401,
                msg: "请登录"
            });
        }
        else {
            jwt.verify(token, "woshiyang", (err, data) => {
                if (err) {
                    res.json({
                        code: 401,
                        msg: "请登录"
                    });
                }
                else {
                    next();
                }
            });
        }
    });
    app.use(router);
};