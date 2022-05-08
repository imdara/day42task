const express = require("express");
const router = express.Router();

// importing models
const Student = require("../models/student");
const Mentor = require("../models/mentor");

express().set("view engine", "ejs");

router
  .get("/", async (req, res) => {
    var students = await Student.find();
    res.render("students", { data: students });
  })
  .post("/", async (req, res) => {
    const { name, email, age, mentor } = await req.body;
    var student = await Student.create({
      name,
      email,
      age,
      mentor,
    });
    var selectedMentor = await Mentor.findOne({ name: student.mentor });
    await selectedMentor.students.push(student.name);
    await selectedMentor.save();
    res.redirect("students");
  });

module.exports = router;
