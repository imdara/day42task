const express = require("express");
const router = express.Router();

// importing models
const Mentor = require("../models/mentor");

express().set("view engine", "ejs");

router.get("/", async (req, res) => {
  var mentors = await Mentor.find();
  res.render("createstudent", { data: mentors });
});

module.exports = router;
