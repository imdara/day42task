const express = require("express");
const router = express.Router();

// importing models
const Student = require("../models/student");
const Mentor = require("../models/mentor");

express().set("view engine", "ejs");

router.get("/", async (req, res) => {
  var students = await Student.find();
  var mentors = await Mentor.find();
  res.render("index", { students, mentors });
});

module.exports = router;
