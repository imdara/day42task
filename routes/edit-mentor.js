const express = require("express");
const router = express.Router();

// importing models
const Student = require("../models/student");
const Mentor = require("../models/mentor");

express().set("view engine", "ejs");

router
  .get("/:id", async (req, res) => {
    var mentorToEdit = await Mentor.findOne({ _id: req.params.id });
    var mentorName = await mentorToEdit.name;
    var students = await Student.find({ mentor: { $ne: mentorName } });
    res.render("editmentor.ejs", { mentorToEdit, students });
  })
  .post("/:id", async (req, res) => {
    const { studentsnew } = await req.body;
    var studentsArray = [],
      newStudentList,
      mentorToBeUpdated,
      newStudents;
    var mentor = await Mentor.findOne({ _id: req.params.id });
    var students = await Student.find({ mentor: mentor.name });
    var namesOfStudents = students.map((student) => student.name);
    if (typeof studentsnew === "string") {
      studentsArray[0] = studentsnew;
    }
    if (typeof studentsnew === "object") {
      studentsArray = [...studentsnew];
    }
    newStudentList = [...namesOfStudents, ...studentsArray];
    for (var i = 0; i < studentsArray.length; i++) {
      var mentorToBeUpdated = await Mentor.findOne({
        students: studentsArray[i],
      });
      if (mentorToBeUpdated) {
        newStudents = mentorToBeUpdated.students.filter(
          (student) => student != studentsArray[i]
        );
      }
      await Mentor.findOneAndUpdate(
        { students: studentsArray[i] },
        { students: newStudents }
      );
    }
    await Mentor.findOneAndUpdate(
      { _id: req.params.id },
      { students: newStudentList }
    );
    await Student.updateMany({ name: studentsArray }, { mentor: mentor.name });
    res.redirect("/");
  });

module.exports = router;
