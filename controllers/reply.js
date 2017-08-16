/**
 * Created by boom on 2017/8/12.
 */
const mongoose = require("mongoose");
const reply = mongoose.model("news");

module.exports = {
    "/api/reply": {
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
    "/api/reply/:keywords": {
        delete(req, res, next) {
            const keywords = req.params.keywords;
            reply.remove({
                keywords
            }, (err) => {
                if (err) next(err);
                res.json({
                    code: 200
                });
            });
        }
    },
    "/api/reply/:id": {
        put(req, res, next) {
            const body = req.body;
            const id = req.params.id;
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