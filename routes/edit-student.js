const express = require("express");
const router = express.Router();

// importing models
const Student = require("../models/student");
const Mentor = require("../models/mentor");

express().set("view engine", "ejs");

router
  .get("/:id", async (req, res) => {
    var mentors = await Mentor.find();
    var studentToEdit = await Student.findOne({ _id: req.params.id });
    res.render("editstudent.ejs", { studentToEdit, mentors });
  })
  .post("/:id", async (req, res) => {
    var { mentornew } = req.body;
    var currStudent = await Student.findOne({ _id: req.params.id });
    var currStudentName = currStudent.name;
    var currMentor = currStudent.mentor;
    var mentorToEdit = await Mentor.findOne({ name: currMentor });
    var studentsArray = mentorToEdit.students.filter(
      (student) => student != currStudentName
    );
    await Mentor.findOneAndUpdate(
      { name: currMentor },
      { students: studentsArray }
    );
    await Student.findOneAndUpdate(
      { _id: req.params.id },
      { mentor: mentornew }
    );
    var newMentor = await Mentor.findOne({ name: mentornew });
    var studentsOfNewMentor = [...newMentor.students, currStudentName];
    await Mentor.findOneAndUpdate(
      { name: mentornew },
      { students: studentsOfNewMentor }
    );
    res.redirect("/");
  });

module.exports = router;
