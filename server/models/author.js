const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: String,
  age: Number,
});

const Author = mongoose.model("author", AuthorSchema);

module.exports = Author;
