/**
 * Created by boom on 2017/8/12.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
    username: String,
    password: String
});
mongoose.model("users", users);