const express = require("express");

const emojis = require("./emojis");
const studentHandler = require("./studentHandler");
const teacherHandler = require("./teacherHandler");
const videosHandler = require("./videosHandler");
const publicHandler = require("./publicHandler");
const assignmentsHandler = require("./assignmentsHandler");
const quizzesHandler = require("./quizzesHandler");
const assignmentMarkHandler = require("./assignmentMarkHandler");
const quizzesMarkHandler = require("./quizzesMarkHandler");

const router = express.Router();

router.use("/emojis", emojis);
router.use("/student", studentHandler);
router.use("/teacher", teacherHandler);
router.use("/videos", videosHandler);
router.use("/", publicHandler);
router.use("/assignments", assignmentsHandler);
router.use("/quizzes", quizzesHandler);
router.use("/quizzesMark", quizzesMarkHandler);
router.use("/assignmentMark", assignmentMarkHandler);

module.exports = router;
