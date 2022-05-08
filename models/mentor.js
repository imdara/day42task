const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  students: [String],
});

module.exports = mongoose.model("Mentor", mentorSchema);
