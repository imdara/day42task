const express = require("express");
const router = express.Router();

express().set("view engine", "ejs");

router.get("/", (req, res) => res.render("creatementor"));

module.exports = router;
