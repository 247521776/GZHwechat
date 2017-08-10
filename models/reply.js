/**
 * Created by boom on 2017/8/8.
 */
const Schema = mongoose.Schema;

const reply = new Schema({
    keywords: String,
    content: String
});

mongoose.model("news", reply);