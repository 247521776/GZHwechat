/**
 * Created by boom on 2017/8/8.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reply = new Schema({
    keywords: String,
    content: String
});

module.exports = mongoose.model("news", reply);