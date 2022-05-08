const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  mentor: String,
});

module.exports = mongoose.model("Student", studentSchema);
