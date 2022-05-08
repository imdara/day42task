require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//importing routes
const indexRoute = require("./routes/index");
const studentRoute = require("./routes/students");
const mentorRoute = require("./routes/mentors");
const createStudentRoute = require("./routes/create-student");
const createMentorRoute = require("./routes/create-mentor");
const editStudentRoute = require("./routes/edit-student");
const editMentorRoute = require("./routes/edit-mentor");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", indexRoute);
app.use("/students", studentRoute);
app.use("/mentors", mentorRoute);
app.use("/create-student", createStudentRoute);
app.use("/create-mentor", createMentorRoute);
app.use("/edit-student", editStudentRoute);
app.use("/edit-mentor", editMentorRoute);

app.listen(PORT, () => console.log("listening on port", PORT));
