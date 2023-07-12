const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const mongoose = require("mongoose");
const studentSchema = require("../schemas/studentSchema");
const Student = new mongoose.model("Student", studentSchema);

// Get all the users     .exec(err, data) এই method এর মধ্য err পাব callback এ
router.get("/", async (req, res) => {
  const filter = {};
  await Student.find(filter)
    .select({
      //   _id: 0,
      password: 0,
      role: 0,
      __v: 0,
    })
    // .limit(2)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Get student was find successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// Get the users by id
router.get("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await Student.find(id)
      .select({
        //   _id: 0,
        role: 0,
        __v: 0,
      })
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Student was find successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          message: "There was a server side error!",
        });
      });
  } catch (error) {}
});

// POST the users
router.post("/", async (req, res) => {
  const filter = { ID: req.body.ID };
  const hashPassword = await bcrypt.hash(req.body.password, 15);
  const newUser = new Student({ ...req.body, password: hashPassword });
  try {
    await Student.find(filter).then((result) => {
      if (Object.keys(result).length === 1) {
        res.status(200).json({
          data: result,
          message: "This Student ID already exists!",
        });
      } else {
        newUser
          .save()
          .then((result) => {
            res.status(200).json({
              data: result,
              message: "Student was created successfully!",
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
              message: "There was a server side error!",
            });
          });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error,

      message: "There was a server side error!",
    });
  }
});

// PUT  the users
router.put("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  const data = req.body;
  const updateData = { $set: data };
  const option = { new: true, upsert: true, setDefaultsOnInsert: true };
  try {
    await Student.updateOne(id, updateData, option)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Student was Updated successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          message: "There was a server side error!",
        });
      });
  } catch (error) {}
});

// DELETE the users
router.delete("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await Student.deleteOne(id)
      .then((data) => {
        res.status(200).json({
          data: data,
          message: "Student deleted successfully.",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          message: "There was a server side error!",
        });
      });
  } catch (error) {
    res.status(500).json({
      error: `error: ${error}`,
      message: "There was a server side error!",
    });
  }
});

module.exports = router;
