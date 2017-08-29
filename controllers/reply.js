/**
 * Created by boom on 2017/8/12.
 */
const mongoose = require("mongoose");
const reply = mongoose.model("news");

module.exports = {
    "/api/replyList": {
        get(req, res, next) {
            reply.find({}, function(err, data) {
                if (err) {
                    next(err);
                }
                res.json({
                    code: 200,
                    data
                });
            })
        },
        post(req, res, next) {
            const body = req.body;
            const newReply = new reply({
                keywords: body.keywords,
                content: body.content
            });
            newReply.save(function(err, data) {
                if (err) {
                    next(err);
                }
                res.json({
                    code: 200,
                    data: {
                        _id: data._id,
                        keywords: body.keywords,
                        content: body.content
                    }
                });
            })
        }
    },
    "/api/reply/:id": {
        put(req, res, next) {
            const body = req.body;
            const id = req.params.id;
            if (!body.keywords || !body.content) {
                return res.json({
                    code: 403,
                    data: "关键字或者内容不能为空"
                })
            }
            reply.update({
                _id: id
            }, {
                keywords: body.keywords,
                content: body.content
            }, function(err, data) {
                if (err) {
                    next(err);
                }
                res.json({
                    code: 200,
                    data: body
                });
            })
        },
        delete(req, res, next) {
            const id = req.params.id;
            reply.remove({
                _id: id
            }, function(err) {
                if(err) {
                    next(err);
                }
                res.json({
                    code: 200
                });
            })
        }
    }
};