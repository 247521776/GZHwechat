/**
 * Created by boom on 2017/8/8.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reply = new Schema({
    keywords: String,
    content: String
});

reply.statics.findAll = function(keywords, cb) {
    return this.find({keywords}, cb);
};
mongoose.model("reply", reply);

module.exports = (db) => {
    return db.model("reply");
};