const express = require("express");
const router = express.Router();

//importing model
const Mentor = require("../models/mentor");

express().set("view engine", "ejs");

router
  .get("/", async (req, res) => {
    var mentors = await Mentor.find();
    res.render("mentors", { data: mentors });
  })
  .post("/", async (req, res) => {
    const { name2, email2, age2 } = await req.body;
    var mentor = await Mentor.create({
      name: name2,
      email: email2,
      age: age2,
      students: [],
    });
    res.redirect("mentors");
  });

module.exports = router;
